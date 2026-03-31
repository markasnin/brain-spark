// ══════════════════════════════════════════════════════════════
// minigame-rocket.js  —  🚀 Math Space Race
// Pilot your rocket through space. Solve math to gain fuel.
// Answer fast = boost speed. Hit asteroids on wrong answers.
// Collect planets. Boss fight at the end!
// ══════════════════════════════════════════════════════════════

window.RocketGame = (function () {
  'use strict';

  const _rnd  = (a,b) => Math.floor(Math.random()*(b-a+1))+a;
  const _pick = arr  => arr[Math.floor(Math.random()*arr.length)];

  // ── Config ────────────────────────────────────────────────
  const PLANETS = [
    { name:'כוכב לכת אש',    emoji:'🔴', dist:1, reward:10, diff:'easy',   color:'#ff6b6b' },
    { name:'כוכב הקרח',       emoji:'🔵', dist:2, reward:15, diff:'easy',   color:'#74c0fc' },
    { name:'ענן הגז',         emoji:'🟤', dist:3, reward:20, diff:'medium', color:'#d4a574' },
    { name:'הירח הכסוף',      emoji:'🌕', dist:4, reward:25, diff:'medium', color:'#dee2e6' },
    { name:'שבת הטבעות',      emoji:'🪐', dist:5, reward:35, diff:'medium', color:'#fab005' },
    { name:'ענקית הקרח הכחול',emoji:'🌀', dist:6, reward:45, diff:'hard',   color:'#4dabf7' },
    { name:'כוכב הנוגה',      emoji:'⭐', dist:7, reward:60, diff:'hard',   color:'#ffd43b' },
    { name:'השמש הסגולה',     emoji:'🌟', dist:8, reward:80, diff:'hard',   color:'#cc5de8' },
  ];

  const MAX_FUEL = 10;
  const MAX_HP   = 5;

  // ── State ─────────────────────────────────────────────────
  let st = {
    phase: 'cockpit',  // cockpit | flying | question | planet | asteroid | boss | gameover | win
    planetIdx: 0,
    fuel: MAX_FUEL,
    hp: MAX_HP,
    pts: 0,
    streak: 0,
    collected: [],
    activeQ: null,
    questionCtx: null, // 'fuel'|'planet'|'asteroid'|'boss'
    bossHp: 8,
    bossMaxHp: 8,
    qTimer: null,
    qTimeLeft: 0,
    animFrame: null,
  };

  // ── Question generator ────────────────────────────────────

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

  // ── Canvas rocket animation ───────────────────────────────
  let canvasCtx = null;
  let stars = [];
  let rocketY = 200;

  function initCanvas() {
    const cv = document.getElementById('rocketCanvas');
    if (!cv) return;
    canvasCtx = cv.getContext('2d');
    stars = Array.from({length:80},()=>({x:_rnd(0,400),y:_rnd(0,220),s:Math.random()*2,sp:_rnd(1,3)}));
    rocketY = 110;
    animFrame && cancelAnimationFrame(animFrame);
    drawFrame();
  }

  function drawFrame() {
    const cv = document.getElementById('rocketCanvas');
    if (!cv || !canvasCtx) return;
    const ctx = canvasCtx, W=400, H=220;
    ctx.clearRect(0,0,W,H);
    // space bg
    const g = ctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0,'#020817');g.addColorStop(1,'#0d1b2a');
    ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    // stars scroll
    stars.forEach(s=>{
      s.x -= s.sp * (st.fuel/MAX_FUEL+.3);
      if(s.x<0) s.x=W;
      ctx.beginPath();ctx.arc(s.x,s.y,s.s,0,2*Math.PI);
      ctx.fillStyle=`rgba(255,255,255,${.4+s.s*.3})`;ctx.fill();
    });
    // planet ahead
    if (st.planetIdx < PLANETS.length) {
      const pl = PLANETS[st.planetIdx];
      ctx.font = '32px serif';
      ctx.fillText(pl.emoji, W-60, 60);
    }
    // rocket
    const rx=60, ry=rocketY;
    ctx.font='36px serif';ctx.fillText('🚀',rx,ry);
    // fuel bar
    ctx.fillStyle='rgba(255,255,255,.08)';ctx.fillRect(10,H-20,180,10);
    ctx.fillStyle=st.fuel>5?'#69db7c':st.fuel>2?'#ffd43b':'#ff6b6b';
    ctx.fillRect(10,H-20,Math.max(0,180*(st.fuel/MAX_FUEL)),10);
    ctx.fillStyle='rgba(255,255,255,.5)';ctx.font='9px Rubik,sans-serif';ctx.fillText('⛽ דלק',14,H-6);
    // hp
    for(let i=0;i<MAX_HP;i++){
      ctx.font='12px serif';ctx.fillText(i<st.hp?'❤️':'🖤',W-28-i*18,H-6);
    }
    animFrame = requestAnimationFrame(drawFrame);
  }

  // ── Render ─────────────────────────────────────────────────
  function render() {
    const el = document.getElementById('rocketWrap');
    if (!el) return;
    if (st.phase==='cockpit')   { renderCockpit(el);   return; }
    if (st.phase==='flying')    { renderFlying(el);    return; }
    if (st.phase==='question')  { renderQuestion(el);  return; }
    if (st.phase==='planet')    { renderPlanet(el);    return; }
    if (st.phase==='asteroid')  { renderAsteroid(el);  return; }
    if (st.phase==='boss')      { renderBoss(el);      return; }
    if (st.phase==='gameover')  { renderGameOver(el);  return; }
    if (st.phase==='win')       { renderWin(el);       return; }
  }

  function spaceCard(body) {
    return `<div style="background:linear-gradient(180deg,#020817,#0d1b2a);border:1px solid rgba(255,255,255,.12);border-radius:18px;padding:14px;margin-bottom:10px">${body}</div>`;
  }

  function renderCockpit(el) {
    el.innerHTML = `
      <div style="font-family:'Fredoka',sans-serif;font-size:1.6rem;color:#a5d8ff;text-align:center;margin-bottom:8px">🚀 מרוץ החלל</div>
      ${helpBtn("🚀 מרוץ החלל\n\n• תדלק → פתור תרגיל קל לדלק\n• גש לכוכב → פתור תרגיל לכבוש\n• אסטרואידים פוגעים בפתאום — פתור מהר!\n• טעות = חיים פחות\n• הבס את הבוס הסופי לנצחון! 👾")}
      ${spaceCard(`
        <canvas id="rocketCanvas" width="400" height="220" style="width:100%;border-radius:12px;display:block"></canvas>
      `)}
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:8px;text-align:center">
        <div style="background:rgba(255,255,255,.06);border-radius:10px;padding:8px"><div style="font-size:1.3rem">⛽</div><div style="color:#69db7c;font-size:.8rem;font-family:Rubik,sans-serif">${st.fuel}/${MAX_FUEL}</div></div>
        <div style="background:rgba(255,255,255,.06);border-radius:10px;padding:8px"><div style="font-size:1.3rem">❤️</div><div style="color:#ff6b6b;font-size:.8rem;font-family:Rubik,sans-serif">${st.hp}/${MAX_HP}</div></div>
        <div style="background:rgba(255,255,255,.06);border-radius:10px;padding:8px"><div style="font-size:1.3rem">⭐</div><div style="color:#ffd43b;font-size:.8rem;font-family:Rubik,sans-serif">${st.pts}</div></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">
        <button onclick="window.RocketGame.fly('fuel')" style="padding:14px;background:linear-gradient(135deg,#0c4a6e,#0369a1);border:2px solid #38bdf8;color:#fff;border-radius:14px;font-family:'Fredoka',sans-serif;font-size:1rem;cursor:pointer">⛽ תדלק</button>
        <button onclick="window.RocketGame.fly('planet')" style="padding:14px;background:linear-gradient(135deg,#4c1d95,#6d28d9);border:2px solid #a78bfa;color:#fff;border-radius:14px;font-family:'Fredoka',sans-serif;font-size:1rem;cursor:pointer">🪐 גש לכוכב</button>
      </div>
      ${st.planetIdx>=PLANETS.length ? `<button onclick="window.RocketGame.startBoss()" style="width:100%;padding:14px;background:linear-gradient(135deg,#7f1d1d,#991b1b);border:2px solid #ef4444;color:#fff;border-radius:14px;font-family:'Fredoka',sans-serif;font-size:1.1rem;cursor:pointer;margin-bottom:8px">👾 קרב הבוס!</button>` : ''}
      <button onclick="window.RocketGame.exit()" style="width:100%;padding:8px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#6b7280;border-radius:12px;font-family:'Rubik',sans-serif;font-size:.82rem;cursor:pointer">← עזוב חלל</button>
    `;
    setTimeout(initCanvas, 50);
  }

  function qCard(title,color,q,ctx,btnLabel) {
    return `
      <div style="font-family:'Fredoka',sans-serif;font-size:1.4rem;color:${color};text-align:center;margin-bottom:8px">${title}</div>
      ${spaceCard(`
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
          <span style="color:#fff;font-family:'Rubik',sans-serif;font-size:1.15rem;font-weight:700;direction:ltr">${q.text} = ?</span>
          <span id="rqTimer" style="color:#ffd43b;font-family:'Fredoka',sans-serif;font-size:1.4rem;font-weight:900">⏱${st.qTimeLeft}</span>
        </div>
        <div style="display:flex;gap:8px">
          <input id="rktAns" type="number" placeholder="?" onkeydown="if(event.key==='Enter')window.RocketGame.submit()"
            autofocus
            style="flex:1;padding:12px;background:rgba(255,255,255,.1);border:2px solid ${color}66;color:#fff;border-radius:12px;font-size:1.2rem;font-family:'Rubik',sans-serif;text-align:center;outline:none">
          <button onclick="window.RocketGame.submit()" style="padding:12px 18px;background:${color};border:none;border-radius:12px;font-size:1.2rem;cursor:pointer;font-weight:900">${btnLabel}</button>
        </div>
      `)}
      <button onclick="window.RocketGame.skip()" style="width:100%;padding:8px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);color:#6b7280;border-radius:12px;font-family:'Rubik',sans-serif;font-size:.78rem;cursor:pointer;margin-top:4px">דלג (עלות: -1❤️)</button>
    `;
  }

  function renderQuestion(el) {
    const q=st.activeQ, ctx=st.questionCtx;
    const titles={'fuel':'⛽ תדלוק','planet':'🪐 קרב כוכב','asteroid':'☄️ אסטרואיד!','boss':'👾 הבוס תוקף!'};
    const colors={'fuel':'#38bdf8','planet':'#a78bfa','asteroid':'#ff6b6b','boss':'#ff8c42'};
    const btns={'fuel':'⛽','planet':'🪐','asteroid':'🛡️','boss':'⚔️'};
    el.innerHTML = qCard(titles[ctx]||'❓',colors[ctx]||'#fff',q,ctx,btns[ctx]||'✅');
    setTimeout(()=>{const i=document.getElementById('rktAns');if(i)i.focus();},80);
    startTimer();
  }

  function renderPlanet(el) {
    const pl = PLANETS[Math.min(st.planetIdx, PLANETS.length-1)];
    el.innerHTML = `
      <div style="text-align:center;padding:20px">
        <div style="font-size:5rem;margin-bottom:8px">${pl.emoji}</div>
        <div style="font-family:'Fredoka',sans-serif;font-size:1.5rem;color:${pl.color};margin-bottom:4px">${pl.name}</div>
        <div style="color:#69db7c;font-size:1rem;font-family:Rubik,sans-serif;margin-bottom:16px">+${pl.reward} נקודות! 🎉</div>
        <button onclick="window.RocketGame.continueFlying()" style="width:100%;padding:14px;background:linear-gradient(135deg,#0c4a6e,#0369a1);border:2px solid #38bdf8;color:#fff;border-radius:14px;font-family:'Fredoka',sans-serif;font-size:1.1rem;cursor:pointer">🚀 המשך לעוף!</button>
      </div>`;
  }

  function renderAsteroid(el) {
    el.innerHTML = `
      <div style="text-align:center;padding:16px">
        <div style="font-size:3.5rem;margin-bottom:8px">☄️</div>
        <div style="font-family:'Fredoka',sans-serif;font-size:1.4rem;color:#ff6b6b;margin-bottom:4px">אסטרואיד!!!</div>
        <div style="color:#adb5bd;font-size:.85rem;font-family:Rubik,sans-serif;margin-bottom:12px">פתור מהר כדי להתחמק!</div>
        ${qCard('☄️ התחמק!','#ff6b6b',st.activeQ,'asteroid','🛡️')}
      </div>`;
    setTimeout(()=>{const i=document.getElementById('rktAns');if(i)i.focus();},80);
    startTimer();
  }

  function renderBoss(el) {
    const bpct = Math.max(0,(st.bossHp/st.bossMaxHp)*100);
    el.innerHTML = `
      <div style="font-family:'Fredoka',sans-serif;font-size:1.5rem;color:#ff8c42;text-align:center;margin-bottom:8px">👾 ספינת הבוס!</div>
      <div style="background:rgba(255,140,66,.1);border:2px solid #ff8c42;border-radius:14px;padding:12px;margin-bottom:10px;text-align:center">
        <div style="font-size:3rem;margin-bottom:6px">👾</div>
        <div style="background:rgba(255,255,255,.1);border-radius:6px;height:12px;overflow:hidden;margin-bottom:4px">
          <div style="width:${bpct}%;height:100%;background:#ff6b6b;border-radius:6px;transition:width .3s"></div>
        </div>
        <div style="font-size:.75rem;color:#adb5bd;font-family:Rubik,sans-serif">HP: ${st.bossHp}/${st.bossMaxHp}</div>
      </div>
      ${qCard('⚔️ תקוף!','#ff8c42',st.activeQ,'boss','💥')}
    `;
    setTimeout(()=>{const i=document.getElementById('rktAns');if(i)i.focus();},80);
    startTimer();
  }

  function renderGameOver(el) {
    el.innerHTML = `
      <div style="text-align:center;padding:20px">
        <div style="font-size:4rem;margin-bottom:12px">💥</div>
        <div style="font-family:'Fredoka',sans-serif;font-size:1.8rem;color:#ff6b6b;margin-bottom:8px">הרקטה נהרסה!</div>
        <div style="color:#adb5bd;font-family:Rubik,sans-serif;font-size:.9rem;margin-bottom:20px">הגעת ל-${st.pts} נקודות ובקרת ${st.collected.length} כוכבים</div>
        <button onclick="window.RocketGame.restart()" style="width:100%;padding:14px;background:linear-gradient(135deg,#0c4a6e,#0369a1);border:2px solid #38bdf8;color:#fff;border-radius:14px;font-family:'Fredoka',sans-serif;font-size:1.1rem;cursor:pointer;margin-bottom:8px">🔄 שחק שוב</button>
        <button onclick="window.RocketGame.exit()" style="width:100%;padding:10px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#6b7280;border-radius:12px;font-family:'Rubik',sans-serif;font-size:.85rem;cursor:pointer">← יציאה</button>
      </div>`;
  }

  function renderWin(el) {
    el.innerHTML = `
      <div style="text-align:center;padding:20px">
        <div style="font-size:4rem;margin-bottom:8px">🌟</div>
        <div style="font-family:'Fredoka',sans-serif;font-size:1.8rem;color:#ffd43b;margin-bottom:8px">כיבשת את הגלקסיה!</div>
        <div style="color:#69db7c;font-family:Rubik,sans-serif;font-size:1rem;margin-bottom:4px">${st.pts} נקודות 🌠</div>
        <div style="color:#adb5bd;font-family:Rubik,sans-serif;font-size:.85rem;margin-bottom:20px">הבקרת ${st.collected.length} כוכבים!</div>
        <button onclick="window.RocketGame.restart()" style="width:100%;padding:14px;background:linear-gradient(135deg,#4c1d95,#6d28d9);border:2px solid #a78bfa;color:#fff;border-radius:14px;font-family:'Fredoka',sans-serif;font-size:1.1rem;cursor:pointer;margin-bottom:8px">🚀 עוף שוב!</button>
        <button onclick="window.RocketGame.exit()" style="width:100%;padding:10px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#6b7280;border-radius:12px;font-family:'Rubik',sans-serif;font-size:.85rem;cursor:pointer">← חזרה לבית</button>
      </div>`;
    if (window.spawnConf) window.spawnConf(60);
    if (window.addPts)    window.addPts(st.pts);
    if (window.showPtsPop) window.showPtsPop(st.pts);
  }

  // ── Timer ─────────────────────────────────────────────────
  function startTimer() {
    clearTimer();
    const ctx = st.questionCtx;
    st.qTimeLeft = ctx==='fuel'?15 : ctx==='planet'?10 : ctx==='asteroid'?6 : 7;
    st.qTimer = setInterval(()=>{
      st.qTimeLeft--;
      const el = document.getElementById('rqTimer');
      if(el) el.textContent='⏱'+st.qTimeLeft;
      if(st.qTimeLeft<=0){ clearTimer(); timeOut(); }
    },1000);
  }

  function clearTimer() { if(st.qTimer){clearInterval(st.qTimer);st.qTimer=null;} }

  function timeOut() {
    const ctx = st.questionCtx;
    if (ctx==='fuel')    { window.showToast&&window.showToast('⏱️ פג הזמן! לא תדלקת'); st.phase='cockpit'; render(); }
    if (ctx==='planet')  { window.showToast&&window.showToast('⏱️ פספסת את הכוכב!'); st.phase='cockpit'; render(); }
    if (ctx==='asteroid'){ st.hp--; window.showToast&&window.showToast('💥 נפגעת מאסטרואיד!'); if(st.hp<=0){st.phase='gameover';}else{st.phase='cockpit';} render(); }
    if (ctx==='boss')    { st.hp--; if(st.hp<=0){st.phase='gameover';}else{ st.activeQ=makeQ('hard'); render(); } }
  }

  // ── Actions ───────────────────────────────────────────────
  function fly(ctx) {
    if (ctx==='fuel' && st.fuel>=MAX_FUEL) { window.showToast&&window.showToast('⛽ הדלק מלא!'); return; }
    const pl = PLANETS[Math.min(st.planetIdx, PLANETS.length-1)];
    const diff = ctx==='planet' ? pl.diff : ctx==='asteroid' ? 'medium' : 'easy';
    st.activeQ = makeQ(diff);
    st.questionCtx = ctx;
    // random asteroid encounter when flying
    if (ctx==='planet' && Math.random()<.3 && st.planetIdx>1) {
      st.activeQ = makeQ('medium');
      st.questionCtx = 'asteroid';
      st.phase = 'asteroid';
    } else {
      st.phase = 'question';
    }
    render();
  }

  function submit() {
    clearTimer();
    const inp = document.getElementById('rktAns');
    if (!inp) return;
    const ua = parseInt(inp.value);
    const ctx = st.questionCtx;
    if (isNaN(ua)) { startTimer(); return; }
    const correct = ua === st.activeQ.answer;
    if (correct) {
      st.streak++;
      if (ctx==='fuel')   { st.fuel=Math.min(MAX_FUEL, st.fuel+_rnd(2,3)); window.showToast&&window.showToast(`⛽ +${_rnd(2,3)} דלק!`); st.phase='cockpit'; }
      if (ctx==='planet') { const pl=PLANETS[st.planetIdx]; st.pts+=pl.reward; st.collected.push(pl); window.addPts&&window.addPts(pl.reward); st.planetIdx++; st.phase='planet'; }
      if (ctx==='asteroid'){ window.showToast&&window.showToast('🛡️ התחמקת!'); st.phase='cockpit'; }
      if (ctx==='boss')   {
        st.bossHp--;
        if(st.bossHp<=0){ const bonus=60; st.pts+=bonus; window.addPts&&window.addPts(bonus); st.phase='win'; }
        else{ st.activeQ=makeQ('hard'); render(); return; }
      }
    } else {
      st.streak=0;
      if (ctx==='fuel')   { window.showToast&&window.showToast('❌ לא תדלקת!'); st.phase='cockpit'; }
      if (ctx==='planet') { window.showToast&&window.showToast('💫 פספסת את הכוכב!'); st.phase='cockpit'; }
      if (ctx==='asteroid'){ st.hp--; window.showToast&&window.showToast('💥 אסטרואיד פגע!'); if(st.hp<=0){st.phase='gameover';}else{st.phase='cockpit';} }
      if (ctx==='boss')   { st.hp--; window.showToast&&window.showToast('👾 הבוס פגע בך!'); if(st.hp<=0){st.phase='gameover';}else{ st.activeQ=makeQ('hard'); render(); return; } }
    }
    render();
  }

  function skip() {
    clearTimer();
    st.hp = Math.max(0, st.hp-1);
    if (st.hp<=0) { st.phase='gameover'; render(); return; }
    window.showToast&&window.showToast('⏭️ דלגת — -1❤️');
    st.phase='cockpit';
    render();
  }

  function startBoss() {
    st.bossHp = st.bossMaxHp = 8;
    st.activeQ = makeQ('hard');
    st.questionCtx = 'boss';
    st.phase = 'boss';
    render();
  }

  function continueFlying() { st.phase='cockpit'; render(); }

  function restart() {
    clearTimer();
    animFrame && cancelAnimationFrame(animFrame);
    st = {phase:'cockpit',planetIdx:0,fuel:MAX_FUEL,hp:MAX_HP,pts:0,streak:0,collected:[],activeQ:null,questionCtx:null,bossHp:8,bossMaxHp:8,qTimer:null,qTimeLeft:0,animFrame:null};
    render();
    setTimeout(initCanvas,50);
  }

  function exit() { clearTimer(); animFrame&&cancelAnimationFrame(animFrame); if(window.show)window.show('home'); }

  function open() {
    const wrap = document.getElementById('minigameScreen');
    if(!wrap) return;
    wrap.innerHTML=`<div id="rocketWrap" style="max-width:420px;margin:0 auto;padding:12px"></div>`;
    document.querySelectorAll('.scr').forEach(s=>s.classList.remove('on'));
    wrap.classList.add('on');
    restart();
  }

  return { open, fly, submit, skip, startBoss, continueFlying, restart, exit };
})();
