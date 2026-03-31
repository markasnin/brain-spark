// ══════════════════════════════════════════════════════════════
// minigames.js  —  Minigame Hub
// Shows the minigame selection screen and routes to each game.
// ══════════════════════════════════════════════════════════════

window.openMinigames = function () {
  const wrap = document.getElementById('minigameScreen');
  if (!wrap) return;
  document.querySelectorAll('.scr').forEach(s => s.classList.remove('on'));
  wrap.classList.add('on');

  const GAMES = [
    {
      id: 'fishing',
      name: 'דיג מתמטי',
      emoji: '🎣',
      desc: 'הטל חכה, פתור תרגיל, תפוס דג! דגים נדירים = תרגילים קשים יותר. בנה אקווריום!',
      color: '#74c0fc',
      bg: 'linear-gradient(135deg,#0d3b6e,#1e6091)',
      border: '#74c0fc',
      launch: () => window.FishingGame?.open(),
    },
    {
      id: 'dungeon',
      name: 'מבוך המתמטיקה',
      emoji: '⚔️',
      desc: 'לחם במפלצות, פתח ארגזי אוצר, עלה ברמות. ענה מהר לפני שהמפלצת תפגע!',
      color: '#ff8c42',
      bg: 'linear-gradient(135deg,#1a0a0a,#3d1515)',
      border: '#ff8c42',
      launch: () => window.DungeonGame?.open(),
    },
    {
      id: 'rocket',
      name: 'מרוץ החלל',
      emoji: '🚀',
      desc: 'עוף לכוכבים! פתור תרגילים לתדלוק, כבוש כוכבות ותלחם בבוס הגלקסיה!',
      color: '#a5d8ff',
      bg: 'linear-gradient(135deg,#020817,#0d1b2a)',
      border: '#a5d8ff',
      launch: () => window.RocketGame?.open(),
    },
  ];

  wrap.innerHTML = `
    <div style="max-width:420px;margin:0 auto;padding:12px">
      <div style="font-family:'Fredoka',sans-serif;font-size:1.8rem;color:#ffd43b;text-align:center;margin-bottom:4px">🎮 מיני-משחקים</div>
      <div style="color:#adb5bd;text-align:center;font-size:.82rem;font-family:Rubik,sans-serif;margin-bottom:16px">בחר משחק ותאמן מתמטיקה!</div>
      ${GAMES.map(g=>`
        <div onclick="window._launchGame('${g.id}')" style="background:${g.bg};border:2px solid ${g.border}44;border-radius:18px;padding:16px;margin-bottom:10px;cursor:pointer;transition:transform .15s,border-color .15s" onmouseover="this.style.transform='scale(1.02)';this.style.borderColor='${g.border}'" onmouseout="this.style.transform='scale(1)';this.style.borderColor='${g.border}44'">
          <div style="display:flex;align-items:center;gap:12px">
            <div style="font-size:2.8rem;min-width:52px;text-align:center">${g.emoji}</div>
            <div style="flex:1">
              <div style="font-family:'Fredoka',sans-serif;font-size:1.2rem;color:${g.color};margin-bottom:3px">${g.name}</div>
              <div style="color:#9ca3af;font-size:.78rem;font-family:Rubik,sans-serif;line-height:1.4">${g.desc}</div>
            </div>
            <div style="color:${g.color};font-size:1.4rem;opacity:.7">›</div>
          </div>
        </div>
      `).join('')}
      <button onclick="show('home')" style="width:100%;padding:10px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#6b7280;border-radius:12px;font-family:'Rubik',sans-serif;font-size:.85rem;cursor:pointer;margin-top:4px">← חזרה לבית</button>
    </div>`;
};

window._launchGame = function(id) {
  if (id==='fishing') window.FishingGame?.open();
  if (id==='dungeon') window.DungeonGame?.open();
  if (id==='rocket')  window.RocketGame?.open();
};
