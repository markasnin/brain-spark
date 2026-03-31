// ══════════════════════════════════════════════════════════════
// minigame-fishing.js  —  🎣 Fishing Math Adventure
// Cast your line, hook fish by solving math. Rarer fish = harder
// questions. Collect your catch in an aquarium you can visit!
// ══════════════════════════════════════════════════════════════

window.FishingGame = (function () {
  'use strict';

  // ── Persistent state (saved via main st.minigames) ──────────
  function mgSave(data) {
    if (!window.st) return;
    if (!window.st.minigames) window.st.minigames = {};
    window.st.minigames['fishing'] = data;
    if (window.save) window.save();
    else if (window.fbSave) window.fbSave();
  }
  function mgLoad() {
    return (window.st && window.st.minigames && window.st.minigames['fishing']) || null;
  }


  // ── Fish registry ─────────────────────────────────────────
  const FISH = [
    // common
    { id:'goldfish',   name:'דג זהב',     emoji:'🐠', rarity:'common',    color:'#ffa94d', pts:5,  diff:'easy'   },
    { id:'bluefish',   name:'דג כחול',    emoji:'🐟', rarity:'common',    color:'#74c0fc', pts:5,  diff:'easy'   },
    { id:'clownfish',  name:'דג ליצן',    emoji:'🐡', rarity:'common',    color:'#ff8c42', pts:8,  diff:'easy'   },
    // uncommon
    { id:'turtle',     name:'צב ים',      emoji:'🐢', rarity:'uncommon',  color:'#69db7c', pts:15, diff:'medium' },
    { id:'squid',      name:'דיונון',     emoji:'🦑', rarity:'uncommon',  color:'#cc5de8', pts:15, diff:'medium' },
    { id:'crab',       name:'סרטן',       emoji:'🦀', rarity:'uncommon',  color:'#fa5252', pts:18, diff:'medium' },
    // rare
    { id:'dolphin',    name:'דולפין',     emoji:'🐬', rarity:'rare',      color:'#4dabf7', pts:30, diff:'hard'   },
    { id:'shark',      name:'כריש',       emoji:'🦈', rarity:'rare',      color:'#74c0fc', pts:35, diff:'hard'   },
    { id:'octopus',    name:'תמנון',      emoji:'🐙', rarity:'rare',      color:'#f783ac', pts:35, diff:'hard'   },
    // legendary
    { id:'whale',      name:'לווייתן',    emoji:'🐳', rarity:'legendary', color:'#a5d8ff', pts:60, diff:'hard'   },
    { id:'narwhal',    name:'נרוואל',     emoji:'🦄', rarity:'legendary', color:'#e5dbff', pts:60, diff:'hard'   },
    { id:'mermaid',    name:'בת ים',      emoji:'🧜', rarity:'legendary', color:'#ffd43b', pts:80, diff:'hard'   },
    // trash
    { id:'boot',       name:'מגף ישן',   emoji:'👢', rarity:'trash',     color:'#868e96', pts:0,  diff:'easy'   },
    { id:'can',        name:'פחית',       emoji:'🥫', rarity:'trash',     color:'#adb5bd', pts:0,  diff:'easy'   },
  ];

  const RARITY_WEIGHTS = { common:45, uncommon:30, rare:15, legendary:5, trash:5 };
  const RARITY_COLORS  = { common:'#69db7c', uncommon:'#74b9ff', rare:'#a29bfe', legendary:'#ffd43b', trash:'#636e72' };
  const RARITY_NAMES   = { common:'נפוץ', uncommon:'לא נפוץ', rare:'נדיר', legendary:'אגדי', trash:'זבל' };

  // ── State ─────────────────────────────────────────────────
  let state = {
    aquarium: [],      // caught fish {id, name, emoji, color, rarity, pts, caughtAt, nickname}
    casts: 0,
    totalPts: 0,
    activeQ: null,
    hookedFish: null,
    phase: 'idle',     // idle | casting | question | result | aquarium
    castAnim: null,
    cancelCb: null,
  };


  // ── Grade-aware question generator ───────────────────────
  function _gradePool(diff) {
    const gc = window.GRADE_CONFIG;
    const avail = (gc && gc.availableCategories) || ['add','sub'];
    const math = ['add','sub','mul','div'].filter(c => avail.includes(c));
    let pool;
    if (diff === 'easy')   pool = math.filter(c => c === 'add' || c === 'sub');
    else if (diff === 'medium') pool = math.filter(c => c !== 'div');
    else pool = math;
    return (pool.length ? pool : math.length ? math : ['add']);
  }
  function makeQ(diff) {
    const pool = _gradePool(diff);
    const cat  = pool[Math.floor(Math.random() * pool.length)];
    if (window.genQ) { try { return window.genQ(cat, diff); } catch(e) {} }
    const r = (a,b) => Math.floor(Math.random()*(b-a+1))+a;
    const gr = window._grade || '\u05d1';
    const sm = (gr==='\u05d0'||gr==='\u05d1');
    const md = (gr==='\u05d2'||gr==='\u05d3');
    if (cat==='add') { const m=sm?15:md?60:250; const a=r(1,m),b=r(1,m); return {text:`${a} + ${b} = ?`, answer:a+b}; }
    if (cat==='sub') { const m=sm?15:md?60:250; const a=r(3,m),b=r(1,a); return {text:`${a} - ${b} = ?`, answer:a-b}; }
    if (cat==='mul') { const m=sm?5:md?9:12;    const a=r(2,m),b=r(2,m); return {text:`${a} \u00d7 ${b} = ?`, answer:a*b}; }
    const m=md?9:12; const b=r(2,m),q=r(1,m);  return {text:`${b*q} \u00f7 ${b} = ?`, answer:q};
  }


  function helpBtn(msg) {
    const safe = msg.replace(/'/g,"&#39;").replace(/"/g,"&quot;");
    return `<div style="text-align:center;margin-bottom:10px">
      <button onclick="window._showHelp('${safe}')" style="padding:6px 18px;background:rgba(255,211,42,.15);border:1px solid #ffd43b88;color:#ffd43b;border-radius:20px;font-family:'Rubik',sans-serif;font-size:.8rem;cursor:pointer;font-weight:700">
        💡 איך משחקים?
      </button>
    </div>`;
  }

  // ── Pick fish by rarity ───────────────────────────────────
  function pickFish() {
    let total = Object.values(RARITY_WEIGHTS).reduce((a,b)=>a+b,0);
    let r = Math.random()*total;
    let chosenRarity;
    for (const [rar, w] of Object.entries(RARITY_WEIGHTS)) { r -= w; if (r <= 0) { chosenRarity = rar; break; } }
    chosenRarity = chosenRarity || 'common';
    const pool = FISH.filter(f => f.rarity === chosenRarity);
    return _pick(pool);
  }

  function _pick(arr) { return arr[Math.floor(Math.random()*arr.length)]; }

  // ── Main render ───────────────────────────────────────────
  function render() {
    const el = document.getElementById('fishingGameWrap');
    if (!el) return;

    if (state.phase === 'aquarium') { renderAquarium(el); return; }

    const aquaCount = state.aquarium.length;
    el.innerHTML = `
      <div style="font-family:'Fredoka',sans-serif;font-size:1.6rem;color:#74c0fc;text-align:center;margin-bottom:6px">🎣 דיג מתמטי</div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;padding:0 4px">
        <span style="color:#ffd43b;font-size:.85rem;font-weight:700">🎣 הטלות: ${state.casts}</span>
        <span style="color:#69db7c;font-size:.85rem;font-weight:700">🐟 תפסת: ${aquaCount}</span>
        <span style="color:#a5d8ff;font-size:.85rem;font-weight:700">⭐ ${state.totalPts}</span>
      </div>
      <div id="fishOcean" style="position:relative;height:220px;background:linear-gradient(180deg,#0d3b6e,#1e6091,#1a5276);border-radius:16px;overflow:hidden;margin-bottom:10px;border:1px solid #1e6091">
        ${renderOceanBg()}
        <div id="fishLine" style="position:absolute;left:50%;top:0;width:2px;background:linear-gradient(180deg,#adb5bd,transparent);height:0;transform:translateX(-50%);transition:height .6s ease"></div>
        <div id="fishHook" style="position:absolute;left:50%;top:-20px;transform:translateX(-50%);font-size:1.4rem;transition:top .6s ease">🪝</div>
        <div id="fishCatch" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font-size:3rem;opacity:0;transition:opacity .4s">🐟</div>
      </div>
      ${state.phase === 'question' ? renderQuestion() : renderCastBtn()}
      ${aquaCount > 0 ? `<button onclick="window.FishingGame.showAquarium()" style="width:100%;margin-top:8px;padding:10px;background:linear-gradient(135deg,#1e6091,#0d3b6e);border:1px solid #74c0fc44;color:#74c0fc;border-radius:12px;font-family:'Rubik',sans-serif;font-size:.9rem;font-weight:700;cursor:pointer">🐠 האקווריום שלי (${aquaCount} דגים)</button>` : ''}
      <button onclick="window.FishingGame.exit()" style="width:100%;margin-top:6px;padding:8px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#adb5bd;border-radius:12px;font-family:'Rubik',sans-serif;font-size:.82rem;cursor:pointer">← חזרה לבית</button>
    `;
    if (state.phase === 'casting') animateCast();
  }

  function renderOceanBg() {
    const fish = ['🐟','🐠','🐡','🦀','🐙','🦑'];
    let bg = '';
    for (let i=0;i<6;i++) {
      const x=Math.random()*80+5, y=Math.random()*60+30, em=_pick(fish);
      const delay=Math.random()*4, dur=3+Math.random()*4, dir=Math.random()<.5?1:-1;
      bg += `<div style="position:absolute;left:${x}%;top:${y}%;font-size:1.6rem;opacity:.18;animation:fishSwim${dir>0?'R':'L'} ${dur}s ${delay}s infinite linear">${em}</div>`;
    }
    bg += `<style>
      @keyframes fishSwimR{0%{transform:translateX(-30px)}50%{transform:translateX(30px)}100%{transform:translateX(-30px)}}
      @keyframes fishSwimL{0%{transform:translateX(30px)}50%{transform:translateX(-30px)}100%{transform:translateX(30px)}}
    </style>`;
    return bg;
  }

  function renderCastBtn() {
    return helpBtn('🎣 דיג מתמטי\n\n• לחץ \'זרוק חכה!\' כדי להטיל\n• כשדג נתפס — פתור תרגיל\n• נכון → תתפוס את הדג \n• טעות → הדג בורח\n• דגים נדירים = תרגילים קשים\n• צבור דגים באקווריום שלך!') + `<button id="castBtn" onclick="window.FishingGame.cast()" style="width:100%;padding:16px;background:linear-gradient(135deg,#0d3b6e,#1e6091);border:2px solid #74c0fc;color:#fff;border-radius:16px;font-family:'Fredoka',sans-serif;font-size:1.3rem;cursor:pointer;letter-spacing:.5px;box-shadow:0 4px 20px #74c0fc44">
      🎣 זרוק חכה!
    </button>`;
  }

  function renderQuestion() {
    const q = state.activeQ, f = state.hookedFish;
    return `
      <div style="background:linear-gradient(135deg,${f.color}22,rgba(255,255,255,.04));border:2px solid ${f.color}66;border-radius:16px;padding:14px;text-align:center">
        <div style="font-size:2.5rem;margin-bottom:4px">${f.emoji}</div>
        <div style="font-family:'Fredoka',sans-serif;font-size:1.1rem;color:${f.color};margin-bottom:2px">${f.name}</div>
        <div style="font-size:.78rem;color:${RARITY_COLORS[f.rarity]};font-weight:700;margin-bottom:10px">${RARITY_NAMES[f.rarity]} • +${f.pts} נק'</div>
        <div style="font-family:'Rubik',sans-serif;font-size:1.15rem;color:#fff;font-weight:700;margin-bottom:12px;direction:ltr">${q.text}</div>
        <div style="display:flex;gap:8px">
          <input id="fishAns" type="number" placeholder="?" onkeydown="if(event.key==='Enter')window.FishingGame.submitAns()"
            style="flex:1;padding:12px;background:rgba(255,255,255,.1);border:2px solid ${f.color}66;color:#fff;border-radius:12px;font-size:1.2rem;font-family:'Rubik',sans-serif;text-align:center;outline:none">
          <button onclick="window.FishingGame.submitAns()" style="padding:12px 20px;background:${f.color};border:none;border-radius:12px;font-size:1.2rem;cursor:pointer;font-weight:900">✅</button>
        </div>
        <div style="margin-top:8px;color:#adb5bd;font-size:.75rem">פתור נכון כדי לתפוס את ה${f.name}!</div>
      </div>`;
  }

  // ── Aquarium renderer ─────────────────────────────────────
  function renderAquarium(el) {
    const aqua = state.aquarium;
    el.innerHTML = `
      <div style="font-family:'Fredoka',sans-serif;font-size:1.5rem;color:#74c0fc;text-align:center;margin-bottom:8px">🐠 האקווריום שלי</div>
      <div style="background:linear-gradient(180deg,#0d3b6e,#1a5276);border-radius:16px;padding:10px;min-height:180px;border:1px solid #1e6091;margin-bottom:10px">
        ${aqua.length === 0 ? '<div style="color:#adb5bd;text-align:center;padding:40px 0;font-family:Rubik,sans-serif">אין דגים עדיין! לך לדוג! 🎣</div>' :
          `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">${aqua.map((f,i) => `
            <div onclick="window.FishingGame.inspectFish(${i})" style="background:${f.color}22;border:1px solid ${f.color}55;border-radius:12px;padding:8px;text-align:center;cursor:pointer;transition:transform .15s" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
              <div style="font-size:2rem">${f.emoji}</div>
              <div style="font-size:.7rem;color:${f.color};font-weight:700;font-family:Rubik,sans-serif">${f.nickname||f.name}</div>
              <div style="font-size:.65rem;color:${RARITY_COLORS[f.rarity]};font-family:Rubik,sans-serif">${RARITY_NAMES[f.rarity]}</div>
            </div>`).join('')}
          </div>`
        }
      </div>
      <div style="display:flex;gap:8px">
        <button onclick="window.FishingGame.backToFishing()" style="flex:1;padding:11px;background:linear-gradient(135deg,#0d3b6e,#1e6091);border:2px solid #74c0fc;color:#74c0fc;border-radius:12px;font-family:'Rubik',sans-serif;font-size:.9rem;font-weight:700;cursor:pointer">🎣 המשך לדוג</button>
        <button onclick="window.FishingGame.exit()" style="padding:11px 16px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#adb5bd;border-radius:12px;font-family:'Rubik',sans-serif;font-size:.9rem;cursor:pointer">← חזרה</button>
      </div>`;
  }

  // ── Animation ─────────────────────────────────────────────
  function animateCast() {
    const line = document.getElementById('fishLine');
    const hook = document.getElementById('fishHook');
    if (!line || !hook) return;
    setTimeout(() => { line.style.height = '160px'; hook.style.top = '150px'; }, 50);
    setTimeout(() => {
      const f = state.hookedFish;
      if (!f) return;
      const catch_ = document.getElementById('fishCatch');
      if (catch_) { catch_.textContent = f.emoji; catch_.style.opacity = '1'; }
      if (f.rarity === 'trash') {
        setTimeout(() => { state.phase = 'idle'; render(); showToast('😅 רק זבל הפעם...'); }, 1500);
      } else {
        state.phase = 'question';
        setTimeout(() => render(), 1200);
      }
    }, 800);
  }

  // ── Public API ────────────────────────────────────────────
  function cast() {
    if (state.phase !== 'idle') return;
    state.phase = 'casting';
    state.casts++;
    state.hookedFish = pickFish();
    state.activeQ = state.hookedFish.rarity !== 'trash' ? makeQ(state.hookedFish.diff) : null;
    render();
  }

  function submitAns() {
    const inp = document.getElementById('fishAns');
    if (!inp) return;
    const ua = parseInt(inp.value);
    const q = state.activeQ, f = state.hookedFish;
    if (isNaN(ua)) { inp.style.borderColor = '#fa5252'; setTimeout(() => inp.style.borderColor = f.color+'66', 600); return; }
    if (ua === q.answer) {
      // Caught!
      const entry = { ...f, caughtAt: Date.now(), nickname: f.name };
      state.aquarium.push(entry);
      state.totalPts += f.pts;
      if (window.addPts) window.addPts(f.pts);
      if (window.showPtsPop) window.showPtsPop(f.pts);
      if (window.spawnConf && f.rarity === 'legendary') window.spawnConf(40);
      mgSave({ aquarium: state.aquarium, casts: state.casts, totalPts: state.totalPts });
      showToast(`🎉 תפסת ${f.emoji} ${f.name}! +${f.pts}`);
      state.phase = 'idle';
      render();
    } else {
      inp.value = '';
      inp.style.borderColor = '#fa5252';
      inp.style.animation = 'shake .3s';
      setTimeout(() => { inp.style.borderColor = f.color+'66'; inp.style.animation = ''; }, 500);
      showToast('❌ לא נכון — הדג ברח!');
      state.phase = 'idle';
      setTimeout(() => render(), 600);
    }
  }

  function inspectFish(i) {
    const f = state.aquarium[i];
    if (!f) return;
    const nick = prompt(`שם הדג שלך (${f.name}):`, f.nickname || f.name);
    if (nick !== null && nick.trim()) { state.aquarium[i].nickname = nick.trim(); mgSave({ aquarium: state.aquarium, casts: state.casts, totalPts: state.totalPts }); }
    renderAquarium(document.getElementById('fishingGameWrap'));
  }

  function showAquarium() { state.phase = 'aquarium'; render(); }
  function backToFishing() { state.phase = 'idle'; render(); }
  function exit() { if (window.show) window.show('home'); }

  function showToast(msg) { if (window.showToast) window.showToast(msg); }

  // ── Open ──────────────────────────────────────────────────
  function open() {
    const wrap = document.getElementById('minigameScreen');
    if (!wrap) return;
    wrap.innerHTML = `<div id="fishingGameWrap" style="max-width:420px;margin:0 auto;padding:12px"></div>`;
    document.querySelectorAll('.scr').forEach(s => s.classList.remove('on'));
    wrap.classList.add('on');
    // Restore saved state
    const saved = mgLoad();
    if (saved) {
      state.aquarium   = saved.aquarium   || [];
      state.casts      = saved.casts      || 0;
      state.totalPts   = saved.totalPts   || 0;
    }
    state.phase = 'idle';
    render();
  }

  return { open, cast, submitAns, inspectFish, showAquarium, backToFishing, exit };
})();