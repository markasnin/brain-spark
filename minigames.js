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
  wrap.style.cssText = 'overflow-y:auto;padding:16px 12px 40px;align-items:center;';

  const GAMES = [
    {
      id:'fishing', name:'דיג מתמטי', emoji:'🎣',
      color:'#74c0fc', bg:'linear-gradient(135deg,#0d3b6e,#1e6091)',
      desc:'הטל חכה, פתור תרגיל, תפוס דגים נדירים!',
      collectibles:'🐠 דג זהב  ·  🐢 צב ים  ·  🦈 כריש  ·  🐳 לווייתן  ·  🧜 בת ים',
      collectLabel:'🏆 האקווריום שלך',
    },
    {
      id:'dungeon', name:'מבוך המתמטיקה', emoji:'⚔️',
      color:'#ff8c42', bg:'linear-gradient(135deg,#1a0a0a,#3d1515)',
      desc:'לחם במפלצות, פתח ארגזי אוצר, צבור זהב!',
      collectibles:'🪙 זהב  ·  ✨ ניסיון  ·  🧪 כוסות מרפא  ·  🏆 ניצחון',
      collectLabel:'💰 הכנסות הגיבור',
    },
    {
      id:'rocket', name:'מרוץ החלל', emoji:'🚀',
      color:'#a5d8ff', bg:'linear-gradient(135deg,#020817,#0d1b2a)',
      desc:'עוף לכוכבות, התחמק מאסטרואידים, נצח בוס!',
      collectibles:'🔴 כוכב אש  ·  🪐 שבת הטבעות  ·  ⭐ כוכב הנוגה  ·  🌟 השמש הסגולה',
      collectLabel:'🌌 כוכבים שכבשת',
    },
    {
      id:'chef', name:'מאפיית המתמטיקה', emoji:'🍪',
      color:'#ffa94d', bg:'linear-gradient(135deg,#3d1a00,#7c3500)',
      desc:'נהל מאפייה — פתור תרגיל, אפה, הגש ללקוחות!',
      collectibles:'🍪 עוגיות  ·  🧁 קאפקייק  ·  🎂 עוגת שוקולד  ·  🍫 פרלינים',
      collectLabel:'🍽️ מה שאפית ומכרת',
    },
    {
      id:'builder', name:'בנאי העיר', emoji:'🏗️',
      color:'#69db7c', bg:'linear-gradient(135deg,#0a1a0a,#1a3a1a)',
      desc:'פתור תרגילים, אסוף חומרים, בנה עיר שלמה!',
      collectibles:'🛖 בקתה  ·  🏠 בית  ·  🏢 בנין  ·  🏗️ מגדל  ·  🏰 ארמון',
      collectLabel:'🌆 העיר שלך',
    },
  ];

  wrap.innerHTML = '<div style="width:100%;max-width:420px;margin:0 auto">'
    + '<div style="font-family:Fredoka,sans-serif;font-size:2rem;color:#ffd43b;text-align:center;margin-bottom:2px">🎮 מיני-משחקים</div>'
    + '<div style="color:#adb5bd;text-align:center;font-size:.8rem;font-family:Rubik,sans-serif;margin-bottom:16px">בחר משחק ותאמן מתמטיקה תוך כדי משחק!</div>'
    + GAMES.map(g => ''
      + '<div onclick="window._launchGame(\'' + g.id + '\')"'
      + ' style="background:' + g.bg + ';border:2px solid ' + g.color + '44;border-radius:20px;padding:16px;margin-bottom:12px;cursor:pointer;transition:transform .15s,border-color .15s;position:relative"'
      + ' onmouseover="this.style.transform=\'scale(1.02)\';this.style.borderColor=\'' + g.color + '\'"'
      + ' onmouseout="this.style.transform=\'scale(1)\';this.style.borderColor=\'' + g.color + '44\'">'
      + '  <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">'
      + '    <div style="font-size:2.8rem;min-width:52px;text-align:center;filter:drop-shadow(0 0 8px ' + g.color + '88)">' + g.emoji + '</div>'
      + '    <div style="flex:1">'
      + '      <div style="font-family:Fredoka,sans-serif;font-size:1.25rem;color:' + g.color + ';margin-bottom:3px">' + g.name + '</div>'
      + '      <div style="color:#9ca3af;font-size:.78rem;font-family:Rubik,sans-serif">' + g.desc + '</div>'
      + '    </div>'
      + '    <div style="color:' + g.color + ';font-size:1.4rem;opacity:.6">›</div>'
      + '  </div>'
      + '  <div style="background:rgba(0,0,0,.35);border-radius:12px;padding:8px 12px;border:1px solid ' + g.color + '22">'
      + '    <div style="font-size:.67rem;color:' + g.color + ';font-weight:700;letter-spacing:.8px;text-transform:uppercase;margin-bottom:4px;opacity:.85">' + g.collectLabel + '</div>'
      + '    <div style="font-size:.8rem;color:rgba(255,255,255,.6);font-family:Rubik,sans-serif;line-height:1.7">' + g.collectibles + '</div>'
      + '  </div>'
      + '</div>'
    ).join('')
    + '<button onclick="window.show&&window.show(\'home\')" style="width:100%;padding:10px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#6b7280;border-radius:12px;font-family:Rubik,sans-serif;font-size:.85rem;cursor:pointer;margin-top:4px">← חזרה לבית</button>'
    + '</div>';
};
