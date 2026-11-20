window._showHelp = function(elOrMsg) {
  const msg = typeof elOrMsg === 'string' ? elOrMsg
    : (elOrMsg && elOrMsg.dataset ? elOrMsg.dataset.msg : String(elOrMsg||''));
  const old = document.getElementById('_hp');
  if (old) { old.remove(); return; }
  const d = document.createElement('div');
  d.id = '_hp';
  d.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.78)';
  const clean = (msg||'').replace(/&quot;/g,'"').replace(/&#39;/g,"'");
  d.innerHTML = '<div class="game-help-panel">'
    + '<div style="font-family:Fredoka,sans-serif;font-size:1.4rem;color:#ffd43b;margin-bottom:10px;text-align:center">💡 איך משחקים?</div>'
    + '<div style="color:#e2e8f0;font-size:.93rem;line-height:1.8;white-space:pre-line">' + clean + '</div>'
    + '<button onclick="document.getElementById(\'_hp\').remove()" class="game-help-dismiss">הבנתי! ✅</button>'
    + '</div>';
  d.onclick = e => { if(e.target===d) d.remove(); };
  document.body.appendChild(d);
};

const arcadeGames = [
    {
      id:'fishing', name:'דיג מתמטי', emoji:'🎣',
      color:'#74c0fc',
      desc:'הטל חכה, פתור תרגיל, תפוס דגים נדירים!',

    },
    {
      id:'dungeon', name:'מבוך המתמטיקה', emoji:'⚔️',
      color:'#ff8c42',
      desc:'לחם במפלצות, פתח ארגזי אוצר, צבור זהב!',

    },
    {
      id:'rocket', name:'מרוץ החלל', emoji:'🚀',
      color:'#a5d8ff',
      desc:'עוף לכוכבות, התחמק מאסטרואידים, נצח בוס!',

    },
    {
      id:'chef', name:'מאפיית המתמטיקה', emoji:'🍪',
      color:'#ffa94d',
      desc:'נהל מאפייה — פתור תרגיל, אפה, הגש ללקוחות!',

    },
    {
      id:'builder', name:'בנאי העיר', emoji:'🏗️',
      color:'#69db7c',
      desc:'פתור תרגילים, אסוף חומרים, בנה עיר שלמה!',

    },
    {id:'trail',name:'שביל המספרים',emoji:'🧭',color:'#7ce7be',desc:'בחרו תשובות והתקדמו לאורך השביל עד האוצר.'},
    {id:'vault',name:'כספת המספרים',emoji:'🔐',color:'#c5a1ff',desc:'פתרו ארבעה תרגילים כדי לפצח את הקוד ולפתוח את הכספת.'},
  ];


const arcadeLaunchers = {
  fishing:'FishingGame', dungeon:'DungeonGame', rocket:'RocketGame', chef:'ChefGame',
  builder:'BuilderGame', trail:'TrailGame', vault:'VaultGame',
};

window._launchGame = id => window[arcadeLaunchers[id]]?.open();

window.openMinigames = function () {
  show('minigameScreen');
  const screen = document.getElementById('minigameScreen');
  screen.innerHTML = `<section class="arcade" aria-labelledby="arcade-title">
    <header class="arcade-heading">
      <h1 id="arcade-title">🎮 מיני-משחקים</h1>
      <button type="button" class="back" data-arcade-home>← חזרה לבית</button>
    </header>
    <div class="arcade-grid">
      ${arcadeGames.map(game=>`<button type="button" class="minigame-menu-card" data-game="${game.id}" style="--arcade-accent:${game.color}">
        <span class="arcade-art" aria-hidden="true"><span>${game.emoji}</span></span>
        <span class="arcade-title">${game.name}</span>
        <span class="arcade-description">${game.desc}</span>
        <span class="arcade-play">שחקו <span aria-hidden="true">›</span></span>
      </button>`).join('')}
    </div>
  </section>`;
  for (const card of screen.querySelectorAll('[data-game]')) {
    card.addEventListener('click',()=>window._launchGame(card.dataset.game));
  }
  screen.querySelector('[data-arcade-home]').addEventListener('click',()=>show('home'));
};
