window._showHelp = function(elOrMsg) {
  const msg = typeof elOrMsg === 'string' ? elOrMsg
    : (elOrMsg && elOrMsg.dataset ? elOrMsg.dataset.msg : String(elOrMsg||''));
  const old = document.getElementById('_hp');
  if (old) { old.remove(); return; }
  const d = document.createElement('div');
  d.id = '_hp';
  d.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.78)';
  const clean = (msg||'').replace(/&quot;/g,'"').replace(/&#39;/g,"'");
  d.innerHTML = '<div style="max-width:320px;width:90%;background:linear-gradient(135deg,#1e1b4b,#312e81);border:2px solid #ffd43b;border-radius:22px;padding:22px;text-align:right;font-family:Rubik,sans-serif;box-shadow:0 20px 60px rgba(0,0,0,.9)">'
    + '<div style="font-family:Fredoka,sans-serif;font-size:1.4rem;color:#ffd43b;margin-bottom:10px;text-align:center">💡 איך משחקים?</div>'
    + '<div style="color:#e2e8f0;font-size:.93rem;line-height:1.8;white-space:pre-line">' + clean + '</div>'
    + '<button onclick="document.getElementById(\'_hp\').remove()" style="margin-top:16px;width:100%;padding:11px;background:linear-gradient(135deg,#ffd43b,#fab005);border:none;border-radius:12px;font-family:Fredoka,sans-serif;font-size:1.1rem;cursor:pointer;font-weight:700;color:#000">הבנתי! ✅</button>'
    + '</div>';
  d.onclick = e => { if(e.target===d) d.remove(); };
  document.body.appendChild(d);
};

window._launchGame = function(id) {
  if (id==='fishing') window.FishingGame && window.FishingGame.open();
  if (id==='dungeon') window.DungeonGame && window.DungeonGame.open();
  if (id==='rocket')  window.RocketGame  && window.RocketGame.open();
  if (id==='chef')    window.ChefGame    && window.ChefGame.open();
  if (id==='builder') window.BuilderGame && window.BuilderGame.open();
};

window.openMinigames = function () {
  const wrap = document.getElementById('minigameScreen');
  if (!wrap) return;
  document.querySelectorAll('.scr').forEach(s => s.classList.remove('on'));
  wrap.classList.add('on');

  const GAMES = [
    { id:'fishing', name:'דיג מתמטי',          emoji:'🎣',  color:'#74c0fc', bg:'linear-gradient(135deg,#0d3b6e,#1e6091)', desc:'הטל חכה, תפוס דגים! דגים נדירים = תרגילים קשים. צבור אקווריום מרשים!' },
    { id:'dungeon', name:'מבוך המתמטיקה',       emoji:'⚔️',  color:'#ff8c42', bg:'linear-gradient(135deg,#1a0a0a,#3d1515)', desc:'לחם במפלצות, פתח ארגזי אוצר! ענה מהר לפני שהזמן נגמר.' },
    { id:'rocket',  name:'מרוץ החלל',           emoji:'🚀',  color:'#a5d8ff', bg:'linear-gradient(135deg,#020817,#0d1b2a)', desc:'עוף לכוכבים! תדלק, כבוש כוכבות ותלחם בבוס הגלקסיה!' },
    { id:'chef',    name:'מאפיית המתמטיקה',     emoji:'🍪',  color:'#ffa94d', bg:'linear-gradient(135deg,#3d1a00,#7c3500)', desc:'נהל מאפייה! לקוחות מגיעים — פתור תרגיל כדי לאפות ולהגיש!' },
    { id:'builder', name:'בנאי העיר',           emoji:'🏗️', color:'#69db7c', bg:'linear-gradient(135deg,#0a1a0a,#1a3a1a)', desc:'בנה עיר שלמה! פתור תרגילים, אסוף חומרים, צפה בעיר גדלה!' },
  ];

  wrap.innerHTML = '<div style="max-width:420px;margin:0 auto;padding:12px">'
    + '<div style="font-family:\'Fredoka\',sans-serif;font-size:1.9rem;color:#ffd43b;text-align:center;margin-bottom:4px">🎮 מיני-משחקים</div>'
    + '<div style="color:#adb5bd;text-align:center;font-size:.82rem;font-family:Rubik,sans-serif;margin-bottom:14px">בחר משחק ותאמן מתמטיקה!</div>'
    + GAMES.map(g =>
        '<div onclick="window._launchGame(\'' + g.id + '\')" '
        + 'style="background:' + g.bg + ';border:2px solid ' + g.color + '44;border-radius:18px;padding:15px;margin-bottom:10px;cursor:pointer;transition:transform .15s,border-color .15s" '
        + 'onmouseover="this.style.transform=\'scale(1.02)\';this.style.borderColor=\'' + g.color + '\'" '
        + 'onmouseout="this.style.transform=\'scale(1)\';this.style.borderColor=\'' + g.color + '44\'">'
        + '<div style="display:flex;align-items:center;gap:12px">'
        + '<div style="font-size:2.8rem;min-width:52px;text-align:center">' + g.emoji + '</div>'
        + '<div style="flex:1">'
        + '<div style="font-family:\'Fredoka\',sans-serif;font-size:1.2rem;color:' + g.color + ';margin-bottom:3px">' + g.name + '</div>'
        + '<div style="color:#9ca3af;font-size:.78rem;font-family:Rubik,sans-serif;line-height:1.4">' + g.desc + '</div>'
        + '</div>'
        + '<div style="color:' + g.color + ';font-size:1.5rem;opacity:.7">›</div>'
        + '</div></div>'
      ).join('')
    + '<button onclick="window.show && window.show(\'home\')" style="width:100%;padding:10px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#6b7280;border-radius:12px;font-family:\'Rubik\',sans-serif;font-size:.85rem;cursor:pointer;margin-top:4px">← חזרה לבית</button>'
    + '</div>';
};