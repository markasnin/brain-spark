// ══════════════════════════════════════════════════════════════
// minigame-dungeon.js  —  ⚔️ Math Dungeon
// Walk through rooms, fight monsters by solving math fast.
// Harder monsters = harder questions. Collect gold & level up.
// ══════════════════════════════════════════════════════════════

window.DungeonGame = (function () {
  'use strict';

  // ── Persistent state (saved via main st.minigames) ──────────
  function mgSave(data) {
    if (!window.st) return;
    if (!window.st.minigames) window.st.minigames = {};
    window.st.minigames['dungeon'] = data;
    if (window.save) window.save();
    else if (window.fbSave) window.fbSave();
  }
  function mgLoad() {
    return (window.st && window.st.minigames && window.st.minigames['dungeon']) || null;
  }


  const _rnd  = (a,b) => Math.floor(Math.random()*(b-a+1))+a;
  const _pick = arr  => arr[Math.floor(Math.random()*arr.length)];


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
        \u{1F4A1} \u05d0\u05d9\u05da \u05de\u05e9\u05d7\u05e7\u05d9\u05dd?
      </button>
    </div>`;
  }

  // ── Monsters ──────────────────────────────────────────────
  const MONSTERS = [
    { id:'slime',   name:'סלייים',    emoji:'🟢', hp:2, gold:5,  xp:3,  diff:'easy',   color:'#69db7c' },
    { id:'bat',     name:'עטלף',      emoji:'🦇', hp:2, gold:6,  xp:4,  diff:'easy',   color:'#a9b8c3' },
    { id:'rat',     name:'עכברוש',    emoji:'🐀', hp:3, gold:8,  xp:5,  diff:'easy',   color:'#adb5bd' },
    { id:'goblin',  name:'גובלין',    emoji:'👺', hp:3, gold:12, xp:8,  diff:'medium', color:'#69db7c' },
    { id:'zombie',  name:'זומבי',     emoji:'🧟', hp:4, gold:14, xp:10, diff:'medium', color:'#8eb994' },
    { id:'witch',   name:'מכשפה',     emoji:'🧙', hp:4, gold:16, xp:12, diff:'medium', color:'#cc5de8' },
    { id:'knight',  name:'אביר רע',   emoji:'🗡️', hp:5, gold:22, xp:18, diff:'hard',   color:'#74c0fc' },
    { id:'dragon',  name:'דרקון',     emoji:'🐲', hp:6, gold:35, xp:28, diff:'hard',   color:'#ff8c42' },
    { id:'boss',    name:'הבוס הגדול',emoji:'👹', hp:8, gold:60, xp:50, diff:'hard',   color:'#ff6b6b' },
  ];

  const ROOMS = ['חדר הכניסה','המסדרון האפל','קרן האחים','חדר הכבוד','מגדל המכשף','כלא הדרקון','האולם הסודי','חדר האוצר'];
  const ROOM_BG = ['#1a1a2e','#16213e','#0f3460','#1a1a2e','#2d1b69','#1a0a0a','#0a1a0a','#1a1500'];
  const HERO_MAX_HP = 5;

  let st = {
    phase: 'map', room: 0, heroHp: HERO_MAX_HP,
    gold: 0, xp: 0, heroLv: 1,
    monster: null, monsterHp: 0, activeQ: null,
    qTimer: null, qTimeLeft: 0, streak: 0,
    inventory: [], log: [],
  };

  function hpBar(cur,max,col){const p=Math.max(0,Math.min(100,(cur/max)*100));return `<div style="background:rgba(255,255,255,.1);border-radius:6px;height:10px;overflow:hidden"><div style="width:${p}%;height:100%;background:${col};border-radius:6px;transition:width .3s"></div></div>`;}

  function heroStatus(){return `<div style="display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.06);border-radius:12px;padding:8px 12px;margin-bottom:8px"><div style="font-size:1.8rem">🧙‍♂️</div><div style="flex:1"><div style="display:flex;justify-content:space-between;margin-bottom:3px"><span style="color:#fff;font-family:'Fredoka',sans-serif;font-size:.95rem">גיבור Lv.${st.heroLv}</span><span style="color:#ffd43b;font-size:.8rem">🪙 ${st.gold} | ✨ ${st.xp}</span></div>${hpBar(st.heroHp,HERO_MAX_HP,'#ff6b6b')}<div style="font-size:.7rem;color:#adb5bd;margin-top:2px">❤️ ${st.heroHp}/${HERO_MAX_HP}</div></div></div>`;}

  function render(){
    const el=document.getElementById('dungeonWrap');if(!el)return;
    if(st.phase==='map')      renderMap(el);
    else if(st.phase==='fight')   renderFight(el);
    else if(st.phase==='treasure')renderTreasure(el);
    else if(st.phase==='gameover')renderGameOver(el);
    else if(st.phase==='victory') renderVictory(el);
  }

  function renderMap(el){
    const bgColor=ROOM_BG[st.room%ROOM_BG.length],roomName=ROOMS[st.room%ROOMS.length],isLast=st.room>=7;
    el.innerHTML=`
      <div style="font-family:'Fredoka',sans-serif;font-size:1.5rem;color:#ffd43b;text-align:center;margin-bottom:6px">⚔️ מבוך המתמטיקה</div>
      ${helpBtn("⚔️ מבוך המתמטיקה\\n\\n• בחר: קרב מפלצת או חיפוש אוצר\\n• קרב: פתור תרגיל לפני שהזמן נגמר\\n• נכון → פוגע במפלצת | שגוי → אתה נפגע\\n• נגמר הזמן → אתה נפגע אוטומטית\\n• אוצר: פתור תרגיל להשיג זהב\\n• 8 חדרים להשלים — בהצלחה!")}
      ${heroStatus()}
      <div style="background:${bgColor};border-radius:16px;padding:16px;text-align:center;margin-bottom:10px;border:1px solid rgba(255,255,255,.1)">
        <div style="font-size:3rem;margin-bottom:4px">${isLast?'🏆':'🚪'}</div>
        <div style="font-family:'Fredoka',sans-serif;font-size:1.1rem;color:#fff;margin-bottom:4px">${roomName}</div>
        <div style="color:#adb5bd;font-size:.78rem">חדר ${st.room+1} מתוך 8</div>
        <div style="display:flex;gap:6px;justify-content:center;margin-top:10px">
          ${[0,1,2,3,4,5,6,7].map(i=>`<div style="width:10px;height:10px;border-radius:50%;background:${i<=st.room?'#ffd43b':'rgba(255,255,255,.15)'}"></div>`).join('')}
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">
        <button onclick="window.DungeonGame.enterRoom('monster')" style="padding:14px;background:linear-gradient(135deg,#7f1d1d,#991b1b);border:2px solid #ef4444;color:#fff;border-radius:14px;font-family:'Fredoka',sans-serif;font-size:1rem;cursor:pointer">⚔️ הילחם במפלצת</button>
        <button onclick="window.DungeonGame.enterRoom('treasure')" style="padding:14px;background:linear-gradient(135deg,#713f12,#92400e);border:2px solid #fbbf24;color:#fff;border-radius:14px;font-family:'Fredoka',sans-serif;font-size:1rem;cursor:pointer">🎁 חפש אוצר</button>
      </div>
      ${st.inventory.includes('potion')?`<button onclick="window.DungeonGame.usePotion()" style="width:100%;padding:10px;background:rgba(239,68,68,.15);border:1px solid #ef4444;color:#fca5a5;border-radius:12px;font-family:'Rubik',sans-serif;font-size:.85rem;cursor:pointer;margin-bottom:6px">🧪 כוס מרפא (❤️+1)</button>`:''}
      <button onclick="window.DungeonGame.exit()" style="width:100%;padding:8px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#6b7280;border-radius:12px;font-family:'Rubik',sans-serif;font-size:.82rem;cursor:pointer">← עזוב מבוך</button>
      ${st.log.length?`<div style="margin-top:8px;color:#6b7280;font-size:.72rem;font-family:Rubik,sans-serif;text-align:center">${st.log[st.log.length-1]}</div>`:''}
    `;
  }

  function renderFight(el){
    const m=st.monster,q=st.activeQ;
    const timeColor=st.qTimeLeft>5?'#69db7c':st.qTimeLeft>2?'#ffd43b':'#ff6b6b';
    el.innerHTML=`
      <div style="font-family:'Fredoka',sans-serif;font-size:1.5rem;color:#ff6b6b;text-align:center;margin-bottom:6px">⚔️ קרב!</div>
      ${heroStatus()}
      <div style="background:linear-gradient(135deg,${m.color}22,rgba(0,0,0,.3));border:2px solid ${m.color}55;border-radius:16px;padding:14px;text-align:center;margin-bottom:10px">
        <div style="font-size:3.5rem;margin-bottom:4px">${m.emoji}</div>
        <div style="font-family:'Fredoka',sans-serif;font-size:1.2rem;color:${m.color};margin-bottom:4px">${m.name}</div>
        ${hpBar(st.monsterHp,m.hp,m.color)}
        <div style="font-size:.7rem;color:#adb5bd;margin-top:2px">❤️ ${st.monsterHp}/${m.hp}</div>
      </div>
      <div style="background:rgba(255,255,255,.06);border-radius:14px;padding:12px;margin-bottom:10px">
        <div style="display:flex;justify-content:space-between;margin-bottom:8px">
          <span style="color:#fff;font-family:'Rubik',sans-serif;font-size:1.05rem;font-weight:700;direction:ltr">${q.text}</span>
          <span style="color:${timeColor};font-family:'Fredoka',sans-serif;font-size:1.2rem;font-weight:900" id="qTimer">⏱️${st.qTimeLeft}</span>
        </div>
        <div style="display:flex;gap:8px">
          <input id="dungAns" type="number" placeholder="?" onkeydown="if(event.key==='Enter')window.DungeonGame.submitAns()" autofocus
            style="flex:1;padding:11px;background:rgba(255,255,255,.1);border:2px solid ${m.color}66;color:#fff;border-radius:12px;font-size:1.2rem;font-family:'Rubik',sans-serif;text-align:center;outline:none">
          <button onclick="window.DungeonGame.submitAns()" style="padding:11px 18px;background:${m.color};border:none;border-radius:12px;font-size:1.2rem;cursor:pointer;font-weight:900">⚔️</button>
        </div>
      </div>
      <div style="text-align:center;color:#6b7280;font-size:.75rem;font-family:Rubik,sans-serif">נכון=פוגע | שגוי=נפגע | זמן נגמר=נפגע</div>
    `;
    setTimeout(()=>{const i=document.getElementById('dungAns');if(i)i.focus();},100);
    startTimer();
  }

  function renderTreasure(el){
    el.innerHTML=`
      <div style="font-family:'Fredoka',sans-serif;font-size:1.5rem;color:#ffd43b;text-align:center;margin-bottom:6px">💰 חיפוש אוצר!</div>
      ${heroStatus()}
      <div style="background:linear-gradient(135deg,#713f12,#92400e);border:2px solid #fbbf24;border-radius:16px;padding:20px;text-align:center;margin-bottom:10px">
        <div style="font-size:3rem;margin-bottom:8px">🎁</div>
        <div style="font-family:'Fredoka',sans-serif;font-size:1.1rem;color:#fbbf24;margin-bottom:10px">פתח את הארגז! פתור:</div>
        <div style="font-family:'Rubik',sans-serif;font-size:1.1rem;color:#fff;font-weight:700;margin-bottom:12px;direction:ltr">${st.activeQ.text}</div>
        <div style="display:flex;gap:8px;justify-content:center">
          <input id="treasAns" type="number" placeholder="?" onkeydown="if(event.key==='Enter')window.DungeonGame.submitTreasure()" autofocus
            style="width:120px;padding:12px;background:rgba(255,255,255,.15);border:2px solid #fbbf2466;color:#fff;border-radius:12px;font-size:1.2rem;font-family:'Rubik',sans-serif;text-align:center;outline:none">
          <button onclick="window.DungeonGame.submitTreasure()" style="padding:12px 20px;background:#fbbf24;border:none;border-radius:12px;font-size:1.2rem;cursor:pointer;font-weight:900">🔓</button>
        </div>
      </div>`;
    setTimeout(()=>{const i=document.getElementById('treasAns');if(i)i.focus();},100);
  }

  function renderGameOver(el){el.innerHTML=`<div style="text-align:center;padding:20px"><div style="font-size:4rem;margin-bottom:12px">💀</div><div style="font-family:'Fredoka',sans-serif;font-size:1.8rem;color:#ff6b6b;margin-bottom:8px">נפלת בקרב!</div><div style="color:#adb5bd;font-family:Rubik,sans-serif;font-size:.9rem;margin-bottom:20px">הגעת עד חדר ${st.room+1} עם ${st.gold} 🪙</div><button onclick="window.DungeonGame.restart()" style="width:100%;padding:14px;background:linear-gradient(135deg,#991b1b,#7f1d1d);border:2px solid #ef4444;color:#fff;border-radius:14px;font-family:'Fredoka',sans-serif;font-size:1.1rem;cursor:pointer;margin-bottom:8px">🔄 נסה שוב</button><button onclick="window.DungeonGame.exit()" style="width:100%;padding:10px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#6b7280;border-radius:12px;font-family:'Rubik',sans-serif;font-size:.85rem;cursor:pointer">← עזוב</button></div>`;}

  function renderVictory(el){el.innerHTML=`<div style="text-align:center;padding:20px"><div style="font-size:4rem;margin-bottom:12px">🏆</div><div style="font-family:'Fredoka',sans-serif;font-size:1.8rem;color:#ffd43b;margin-bottom:8px">ניצחת את המבוך!</div><div style="color:#adb5bd;font-family:Rubik,sans-serif;font-size:.9rem;margin-bottom:4px">זהב: 🪙 ${st.gold} | XP: ✨ ${st.xp}</div><div style="color:#69db7c;font-family:Rubik,sans-serif;font-size:.9rem;margin-bottom:20px">כל הכבוד!</div><button onclick="window.DungeonGame.restart()" style="width:100%;padding:14px;background:linear-gradient(135deg,#713f12,#92400e);border:2px solid #fbbf24;color:#fff;border-radius:14px;font-family:'Fredoka',sans-serif;font-size:1.1rem;cursor:pointer;margin-bottom:8px">🔄 שחק שוב</button><button onclick="window.DungeonGame.exit()" style="width:100%;padding:10px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#6b7280;border-radius:12px;font-family:'Rubik',sans-serif;font-size:.85rem;cursor:pointer">← חזרה לבית</button></div>`;if(window.spawnConf)window.spawnConf(50);if(window.addPts)window.addPts(st.gold);if(window.showPtsPop)window.showPtsPop(st.gold);}

  function startTimer(){clearTimer();const diff=st.monster?.diff||'medium';st.qTimeLeft=diff==='easy'?12:diff==='medium'?8:5;st.qTimer=setInterval(()=>{st.qTimeLeft--;const el=document.getElementById('qTimer');if(el)el.textContent='⏱️'+st.qTimeLeft;if(st.qTimeLeft<=0){clearTimer();heroHit();}},1000);}
  function clearTimer(){if(st.qTimer){clearInterval(st.qTimer);st.qTimer=null;}}

  function heroHit(){st.heroHp--;log('💥 המפלצת פגעה! HP:'+st.heroHp);if(st.heroHp<=0){st.phase='gameover';render();return;}st.activeQ=makeQ(st.monster.diff);render();}

  function monsterHit(){st.monsterHp--;st.streak++;log('⚔️ פגעת ב'+st.monster.name+'! HP:'+st.monsterHp);if(st.monsterHp<=0){clearTimer();const gold=st.monster.gold+(st.streak>=3?5:0);st.gold+=gold;st.xp+=st.monster.xp;if(window.addPts)window.addPts(gold);if(Math.random()<.25){st.inventory.push('potion');window.showToast&&window.showToast('🧪 מצאת כוס מרפא!');}window.showToast&&window.showToast('🎉 ניצחת! +'+gold+'🪙');st.room++;mgSave({room:st.room,gold:st.gold,xp:st.xp,heroHp:st.heroHp,inventory:st.inventory});if(st.room>=8)st.phase='victory';else st.phase='map';st.streak=0;render();}else{st.activeQ=makeQ(st.monster.diff);render();}}

  function log(msg){st.log.push(msg);if(st.log.length>10)st.log.shift();}

  function enterRoom(type){
    if(type==='monster'){const pool=st.room<3?MONSTERS.slice(0,3):st.room<6?MONSTERS.slice(0,6):MONSTERS;st.monster=_pick(pool);st.monsterHp=st.monster.hp;st.activeQ=makeQ(st.monster.diff);st.streak=0;st.phase='fight';}
    else{st.activeQ=makeQ(st.room<3?'easy':st.room<6?'medium':'hard');st.phase='treasure';}
    render();
  }

  function submitAns(){clearTimer();const inp=document.getElementById('dungAns');if(!inp)return;const ua=parseInt(inp.value);if(isNaN(ua)){startTimer();return;}if(ua===st.activeQ.answer)monsterHit();else heroHit();}

  function submitTreasure(){const inp=document.getElementById('treasAns');if(!inp)return;const ua=parseInt(inp.value);if(isNaN(ua))return;if(ua===st.activeQ.answer){const gold=_rnd(5,20+st.room*4);st.gold+=gold;if(Math.random()<.3)st.inventory.push('potion');window.addPts&&window.addPts(gold);window.showToast&&window.showToast('🎁 מצאת '+gold+'🪙!');st.room++;if(st.room>=8)st.phase='victory';else st.phase='map';}else{window.showToast&&window.showToast('🔒 שגוי — הארגז נשאר נעול!');st.phase='map';}render();}

  function usePotion(){const idx=st.inventory.indexOf('potion');if(idx<0)return;st.inventory.splice(idx,1);st.heroHp=Math.min(HERO_MAX_HP,st.heroHp+1);window.showToast&&window.showToast('🧪 +1 ❤️');render();}

  function restart(){clearTimer();st={phase:'map',room:0,heroHp:HERO_MAX_HP,gold:0,xp:0,heroLv:1,monster:null,monsterHp:0,activeQ:null,qTimer:null,qTimeLeft:0,streak:0,inventory:[],log:[]};render();}
  function exit(){clearTimer();if(window.show)window.show('home');}

  function open(){const wrap=document.getElementById('minigameScreen');if(!wrap)return;wrap.innerHTML=`<div id="dungeonWrap" style="max-width:420px;margin:0 auto;padding:12px"></div>`;document.querySelectorAll('.scr').forEach(s=>s.classList.remove('on'));wrap.classList.add('on');const saved=mgLoad();if(saved&&saved.room>0){st.room=saved.room||0;st.gold=saved.gold||0;st.xp=saved.xp||0;st.heroHp=saved.heroHp||5;st.inventory=saved.inventory||[];}else{restart();return;}render();}

  return {open,enterRoom,submitAns,submitTreasure,usePotion,restart,exit};
})();