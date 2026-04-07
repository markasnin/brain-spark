// ══════════════════════════════════════════════════════════════
// collectibles-patch.js  —  ✏️ Rename icon for all collectibles
//
// HOW TO USE:
//   Add this ONE line to index.html, after all minigame scripts:
//   <script src="collectibles-patch.js"></script>
//
// What it does:
//   🎣 Fishing  — adds ✏️ pencil to every fish in the aquarium
//   🚀 Rocket   — adds ✏️ + rename to collected planets (win/gameover)
//   🏗️ Builder  — adds ✏️ + rename to buildings placed in the city
//   ⚔️ Dungeon  — adds ✏️ + rename to inventory potions
// ══════════════════════════════════════════════════════════════
(function () {

// ── Shared CSS ───────────────────────────────────────────────
var s = document.createElement('style');
s.textContent = `
  .coll-card { position:relative!important; cursor:pointer!important; }
  .coll-pencil {
    position:absolute; top:4px; left:5px; z-index:3;
    font-size:.82rem; line-height:1; pointer-events:none;
    opacity:.65; transition:opacity .15s, transform .18s;
  }
  .coll-card:hover .coll-pencil { opacity:1; transform:scale(1.25) rotate(-12deg); }
  .coll-card:hover { box-shadow:0 5px 20px rgba(0,0,0,.55)!important; }
`;
document.head.appendChild(s);

function addPencil(el) {
  if (el.querySelector('.coll-pencil')) return;
  el.classList.add('coll-card');
  var p = document.createElement('span');
  p.className = 'coll-pencil';
  p.textContent = '✏️';
  el.insertBefore(p, el.firstChild);
}

// ── Generic rename helper ────────────────────────────────────
function doRename(el, emoji) {
  var label = el.querySelector('.coll-label');
  var current = label ? label.textContent : (el.dataset.defaultName || '');
  var nick = prompt('✏️ שם ל' + emoji + ':', current);
  if (nick !== null && nick.trim()) {
    if (label) label.textContent = nick.trim();
    el.dataset.renamed = nick.trim();
  }
}

// ── FISHING ──────────────────────────────────────────────────
function patchFishing() {
  if (!window.FishingGame) return;

  // After aquarium renders, enhance fish cards
  function enhance() {
    var wrap = document.getElementById('fishingGameWrap');
    if (!wrap) return;

    // Add hint below header
    var title = wrap.querySelector('[style*="האקווריום"]');
    if (title && !wrap.querySelector('.rnm-tip')) {
      var tip = Object.assign(document.createElement('div'), {className:'rnm-tip', textContent:'לחץ על ✏️ לתת שם לדג'});
      Object.assign(tip.style, {color:'#74c0fc', fontSize:'.72rem', fontFamily:'Rubik,sans-serif', textAlign:'center', marginBottom:'8px', opacity:'.8'});
      title.insertAdjacentElement('afterend', tip);
    }

    // Add ✏️ to every fish card
    wrap.querySelectorAll('[onclick*="inspectFish"]').forEach(function(card) {
      addPencil(card);
    });
  }

  ['showAquarium','backToFishing','open','submitAns'].forEach(function(fn) {
    var orig = window.FishingGame[fn];
    if (orig) window.FishingGame[fn] = function() {
      var r = orig.apply(this, arguments);
      setTimeout(enhance, 80);
      return r;
    };
  });
  setTimeout(enhance, 200);
}

// ── ROCKET ───────────────────────────────────────────────────
function patchRocket() {
  if (!window.RocketGame) return;

  // Internal collection storage with nicknames
  if (!window._rktPlanets) window._rktPlanets = [];

  window.RocketGame.renamePlanet = function(idx) {
    var pl = window._rktPlanets[idx];
    if (!pl) return;
    var nick = prompt('✏️ שם לכוכב ' + pl.emoji + ':', pl.nick || pl.name);
    if (nick !== null && nick.trim()) {
      pl.nick = nick.trim();
      // update DOM label
      var card = document.querySelector('[data-rkt="' + idx + '"]');
      if (card) { var lbl = card.querySelector('.coll-label'); if (lbl) lbl.textContent = nick.trim(); }
    }
  };

  // Patch submit to track collected planet
  var _sub = window.RocketGame.submit;
  window.RocketGame.submit = function() {
    var prevLen = (window._rktPlanets || []).length;
    _sub.apply(this, arguments);
    setTimeout(function() { enhanceRocket(); }, 200);
  };

  var _rst = window.RocketGame.restart;
  window.RocketGame.restart = function() {
    window._rktPlanets = [];
    _rst.apply(this, arguments);
  };

  // Watch rocketWrap for win/gameover screens
  var obs = new MutationObserver(function() { setTimeout(enhanceRocket, 80); });
  function watch() {
    var w = document.getElementById('rocketWrap');
    if (w) obs.observe(w, {childList:true, subtree:true});
    else setTimeout(watch, 400);
  }
  watch();

  function enhanceRocket() {
    var wrap = document.getElementById('rocketWrap');
    if (!wrap) return;
    // Find planet emoji cards (emojis like 🔴🪐⭐🌟 in small boxes)
    // These appear in win/gameover screens as small inline divs
    wrap.querySelectorAll('[style*="cursor:pointer"][style*="border-radius:12px"]').forEach(function(card) {
      if (card.querySelector('.coll-pencil')) return;
      // only target planet-sized cards (have a large emoji child)
      var emojiDiv = card.querySelector('[style*="font-size:2rem"]') || card.querySelector('[style*="font-size:1.8rem"]');
      if (!emojiDiv) return;
      addPencil(card);
    });
  }
}

// ── BUILDER ──────────────────────────────────────────────────
function patchBuilder() {
  if (!window.BuilderGame) return;

  // Watch builderWrap
  var obs = new MutationObserver(function() { setTimeout(enhanceBuilder, 80); });
  function watch() {
    var w = document.getElementById('builderWrap');
    if (w) obs.observe(w, {childList:true, subtree:true});
    else setTimeout(watch, 400);
  }
  watch();

  function enhanceBuilder() {
    var wrap = document.getElementById('builderWrap');
    if (!wrap) return;
    // Building cells in city grid — they have emoji + hover events
    wrap.querySelectorAll('[style*="font-size:1.5rem"][onclick*="rename"], [style*="cursor:pointer"][style*="aspect-ratio"]').forEach(function(cell) {
      if (!cell.textContent.trim() || cell.querySelector('.coll-pencil')) return;
      // Check it contains a building emoji
      var text = cell.textContent.trim();
      if (text && text.length < 5 && /\p{Emoji}/u.test(text)) {
        addPencil(cell);
        if (!cell.getAttribute('data-bld-patched')) {
          cell.setAttribute('data-bld-patched', '1');
          var orig = cell.getAttribute('onclick') || '';
          cell.setAttribute('onclick', orig + ';event.stopPropagation();window._bldRename&&window._bldRename(this)');
        }
      }
    });
  }

  window._bldRename = function(cell) {
    var emoji = cell.dataset.bldEmoji || cell.textContent.replace(/✏️/g,'').trim().charAt(0) || '🏗️';
    var current = cell.dataset.bldNick || emoji;
    var nick = prompt('✏️ שם למבנה ' + emoji + ':', current);
    if (nick !== null && nick.trim()) {
      cell.dataset.bldNick = nick.trim();
      var lbl = cell.querySelector('.bld-nick-lbl');
      if (!lbl) {
        lbl = document.createElement('div');
        lbl.className = 'bld-nick-lbl';
        Object.assign(lbl.style, {fontSize:'.5rem', color:'#fff', opacity:'.8', lineHeight:'1.2', textAlign:'center', wordBreak:'break-all'});
        cell.appendChild(lbl);
      }
      lbl.textContent = nick.trim();
    }
  };
}

// ── DUNGEON ──────────────────────────────────────────────────
function patchDungeon() {
  if (!window.DungeonGame) return;

  var obs = new MutationObserver(function() { setTimeout(enhanceDungeon, 80); });
  function watch() {
    var w = document.getElementById('dungeonWrap');
    if (w) obs.observe(w, {childList:true, subtree:true});
    else setTimeout(watch, 400);
  }
  watch();

  function enhanceDungeon() {
    var wrap = document.getElementById('dungeonWrap');
    if (!wrap) return;
    // Inventory potion button
    wrap.querySelectorAll('[onclick*="usePotion"]').forEach(function(btn) {
      if (btn.querySelector('.coll-pencil') || btn.tagName !== 'BUTTON') return;
      // Wrap in a container with pencil
      addPencil(btn);
    });
  }
}

// ── Init ─────────────────────────────────────────────────────
function init() {
  patchFishing();
  patchRocket();
  patchBuilder();
  patchDungeon();
}

if (document.readyState !== 'loading') init();
else document.addEventListener('DOMContentLoaded', init);

// Also retry a few times to catch late-loading games
[500, 1500, 3000].forEach(function(d) { setTimeout(init, d); });

})();
