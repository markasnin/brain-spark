// ══════════════════════════════════════════════════════════════
// minigame-builder.js  —  &#x1F3D7;&#xFE0F; City Builder Math
// (emoji-safe version: all emojis replaced with HTML entities)
// ══════════════════════════════════════════════════════════════

window.BuilderGame = (function () {
  'use strict';

  function mgSave(data) {
    if (!window.st) return;
    if (!window.st.minigames) window.st.minigames = {};
    window.st.minigames['builder'] = data;
    if (window.save) window.save();
    else if (window.fbSave) window.fbSave();
  }
  function mgLoad() {
    return (window.st && window.st.minigames && window.st.minigames['builder']) || null;
  }

  const _rnd = (a,b) => Math.floor(Math.random()*(b-a+1))+a;
  const _pick = arr => arr[Math.floor(Math.random()*arr.length)];

  function _gradePool(diff) {
    const gc = window.GRADE_CONFIG;
    const avail = (gc && gc.availableCategories) || ['add','sub'];
    const math = ['add','sub','mul','div'].filter(c => avail.includes(c));
    let pool;
    if (diff === 'easy')        pool = math.filter(c => c === 'add' || c === 'sub');
    else if (diff === 'medium') pool = math.filter(c => c !== 'div');
    else                        pool = math;
    return pool.length ? pool : math.length ? math : ['add'];
  }
  function makeQ(diff) {
    const pool = _gradePool(diff);
    const cat  = pool[Math.floor(Math.random() * pool.length)];
    if (window.genQ) { try { return window.genQ(cat, diff); } catch(e) {} }
    const r = (a,b) => Math.floor(Math.random()*(b-a+1))+a;
    const gr = window._grade || '\u05d1';
    const sm = (gr==='\u05d0'||gr==='\u05d1'), md = (gr==='\u05d2'||gr==='\u05d3');
    if (cat==='add') { const m=sm?15:md?60:250; const a=r(1,m),b=r(1,m); return {text:a+' + '+b+' = ?', answer:a+b}; }
    if (cat==='sub') { const m=sm?15:md?60:250; const a=r(3,m),b=r(1,a); return {text:a+' - '+b+' = ?', answer:a-b}; }
    if (cat==='mul') { const m=sm?5:md?9:12;    const a=r(2,m),b=r(2,m); return {text:a+' \xd7 '+b+' = ?', answer:a*b}; }
    const m=md?9:12; const b=r(2,m),q=r(1,m); return {text:(b*q)+' \xf7 '+b+' = ?', answer:q};
  }
  function helpBtn(msg) {
    return '<div style="text-align:center;margin-bottom:10px"><button onclick="window._showHelp(this.dataset.msg)" data-msg="' + msg.replace(/"/g,'&quot;') + '" style="padding:6px 18px;background:rgba(255,211,42,.15);border:1px solid #ffd43b88;color:#ffd43b;border-radius:20px;font-family:Rubik,sans-serif;font-size:.8rem;cursor:pointer;font-weight:700">&#x1F4A1; \u05d0\u05d9\u05da \u05de\u05e9\u05d7\u05e7\u05d9\u05dd?</button></div>';
  }

  const BUILDINGS = [
    {name:'\u05d1\u05e7\u05ea\u05d4',        emoji:'&#x1F6D6;', cost:5,  reward:8,  color:'#c47b2b', diff:'easy',   w:1,h:1},
    {name:'\u05d1\u05d9\u05ea',         emoji:'&#x1F3E0;', cost:10, reward:15, color:'#74c0fc', diff:'easy',   w:1,h:2},
    {name:'\u05d7\u05e0\u05d5\u05ea',        emoji:'&#x1F3EA;', cost:15, reward:22, color:'#69db7c', diff:'medium', w:2,h:2},
    {name:'\u05de\u05d2\u05d3\u05dc',        emoji:'&#x1F3E2;', cost:25, reward:38, color:'#ff8c42', diff:'medium', w:1,h:4},
    {name:'\u05de\u05e4\u05e2\u05dc',        emoji:'&#x1F3ED;', cost:30, reward:45, color:'#adb5bd', diff:'hard',   w:3,h:2},
    {name:'\u05de\u05d2\u05d3\u05dc \u05d6\u05d4\u05d1', emoji:'&#x1F3C6;', cost:50, reward:80, color:'#ffd43b', diff:'hard', w:2,h:5},
    {name:'\u05e4\u05d0\u05e8\u05e7',        emoji:'&#x1F333;', cost:8,  reward:12, color:'#69db7c', diff:'easy',   w:2,h:1},
    {name:'\u05d1\u05d9\u05ea \u05d7\u05d5\u05dc\u05d9\u05dd', emoji:'&#x1F3E5;', cost:35, reward:55, color:'#ff6b6b', diff:'hard', w:2,h:3},
  ];

  const GRID_W = 8, GRID_H = 5;

  let st = {
    phase: 'city',
    resources: 20, score: 0, turn: 0, maxTurns: 15,
    grid: Array(GRID_H).fill(null).map(()=>Array(GRID_W).fill(null)),
    selectedBuilding: null, activeQ: null, population: 0, happiness: 80, streak: 0,
  };

  function render() {
    const el = document.getElementById('builderWrap'); if (!el) return;
    if (st.phase === 'city')          renderCity(el);
    else if (st.phase === 'build')    renderBuild(el);
    else if (st.phase === 'question') renderQuestion(el);
    else if (st.phase === 'win')      renderWin(el);
  }

  function renderCity(el) {
    el.innerHTML = `
      <div style="font-family:'Fredoka',sans-serif;font-size:1.5rem;color:#69db7c;text-align:center;margin-bottom:4px">&#x1F3D7;&#xFE0F; \u05d1\u05e0\u05d4 \u05d0\u05ea \u05d4\u05e2\u05d9\u05e8 \u05e9\u05dc\u05da!</div>
      ${helpBtn('\u05d1\u05e0\u05d0\u05d9 \u05d4\u05de\u05ea\u05de\u05d8\u05d9\u05e7\u05d4!\\n\\n\u2022 \u05dc\u05d7\u05e5 "\u05d1\u05e0\u05d4 \u05de\u05d1\u05e0\u05d4" \u05dc\u05d1\u05d7\u05d5\u05e8 \u05de\u05d4 \u05dc\u05d1\u05e0\u05d5\u05ea\\n\u2022 \u05e4\u05ea\u05d5\u05e8 \u05ea\u05e8\u05d2\u05d9\u05dc \u05de\u05ea\u05de\u05d8\u05d9\u05e7\u05d4 \u05dc\u05e7\u05d1\u05dc \u05d7\u05d5\u05de\u05e8\u05d9 \u05d1\u05e0\u05d9\u05d9\u05d4\\n\u2022 \u05e8\u05d0\u05d4 \u05d0\u05ea \u05d4\u05e2\u05d9\u05e8 \u05d2\u05d3\u05dc\u05ea!\\n\u2022 15 \u05ea\u05d5\u05e8\u05d5\u05ea \u05dc\u05d1\u05e0\u05d5\u05ea \u05e2\u05d9\u05e8 \u05de\u05d3\u05d4\u05d9\u05de\u05d4!')}
      <div style="display:flex;justify-content:space-between;background:rgba(255,255,255,.06);border-radius:12px;padding:8px 12px;margin-bottom:8px">
        <span style="color:#69db7c;font-family:'Fredoka',sans-serif">&#x1F9F1; ${st.resources} \u05d7\u05d5\u05de\u05e8\u05d9\u05dd</span>
        <span style="color:#ffd43b;font-family:'Fredoka',sans-serif">&#x2B50; ${st.score}</span>
        <span style="color:#74c0fc;font-family:'Fredoka',sans-serif">&#x1F465; ${st.population}</span>
        <span style="color:#ff8c42;font-family:'Fredoka',sans-serif">&#x1F3AF; ${st.turn}/${st.maxTurns}</span>
      </div>
      <div style="position:relative;background:linear-gradient(180deg,#1a3a1a,#0d2a0d);border-radius:16px;border:1px solid #2d4a2d;overflow:hidden;margin-bottom:10px">
        ${renderCityCanvas()}
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">
        <button onclick="window.BuilderGame.startBuild()" style="padding:13px;background:linear-gradient(135deg,#1a3a1a,#2d5a2d);border:2px solid #69db7c;color:#69db7c;border-radius:14px;font-family:'Fredoka',sans-serif;font-size:1rem;cursor:pointer">
          &#x1F3D7;&#xFE0F; \u05d1\u05e0\u05d4 \u05de\u05d1\u05e0\u05d4
        </button>
        <button onclick="window.BuilderGame.collectResources()" style="padding:13px;background:linear-gradient(135deg,#3a2a00,#5a4200);border:2px solid #ffd43b;color:#ffd43b;border-radius:14px;font-family:'Fredoka',sans-serif;font-size:1rem;cursor:pointer">
          &#x1F9F1; \u05d0\u05e1\u05d5\u05e3 \u05d7\u05d5\u05de\u05e8\u05d9\u05dd
        </button>
      </div>
      <button onclick="window.BuilderGame.exit()" style="width:100%;padding:8px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);color:#6b7280;border-radius:12px;font-family:'Rubik',sans-serif;font-size:.78rem;cursor:pointer">&#x2190; \u05d7\u05d6\u05e8\u05d4 \u05dc\u05d1\u05d9\u05ea</button>
    `;
  }

  function renderCityCanvas() {
    const cellW = Math.floor(100 / GRID_W);
    let rows = '';
    for (let r = GRID_H-1; r >= 0; r--) {
      let cols = '';
      for (let c = 0; c < GRID_W; c++) {
        const cell = st.grid[r][c];
        const bg = r === 0 ? '#2d4a1a' : r === 1 ? '#1a3a0a' : 'transparent';
        cols += `<div style="width:${cellW}%;aspect-ratio:1;display:flex;align-items:center;justify-content:center;background:${bg};font-size:${cell?'1.5rem':'.5rem'};position:relative">
          ${cell ? cell.emoji : (r===0?'&#x1F33F;':'') }
          ${cell ? `<div style="position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:100%;height:${Math.min(cell.h*20,80)}%;background:${cell.color}44;border-radius:4px 4px 0 0"></div>` : ''}
        </div>`;
      }
      rows += `<div style="display:flex;width:100%">${cols}</div>`;
    }
    return `<div style="position:relative;padding:8px;min-height:150px">
      <div style="background:linear-gradient(180deg,#0a1628,#1a2840);border-radius:8px;overflow:hidden;margin-bottom:4px;padding:4px">
        ${rows}
      </div>
      <div style="text-align:center;color:#2d4a2d;font-size:.7rem;font-family:Rubik,sans-serif">\u05d4\u05e2\u05d9\u05e8 \u05e9\u05dc\u05da &#x1F306;</div>
    </div>`;
  }

  function renderBuild(el) {
    el.innerHTML = `
      <div style="font-family:'Fredoka',sans-serif;font-size:1.5rem;color:#69db7c;text-align:center;margin-bottom:8px">&#x1F3D7;&#xFE0F; \u05d1\u05d7\u05e8 \u05de\u05d1\u05e0\u05d4 \u05dc\u05d1\u05e0\u05d5\u05ea</div>
      <div style="color:#adb5bd;font-size:.8rem;font-family:Rubik,sans-serif;text-align:center;margin-bottom:10px">&#x1F9F1; \u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05d6\u05de\u05d9\u05e0\u05d9\u05dd: ${st.resources}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;max-height:340px;overflow-y:auto;margin-bottom:10px">
        ${BUILDINGS.map((b,i) => `
          <div onclick="window.BuilderGame.selectBuilding(${i})" style="background:${b.color}18;border:1.5px solid ${b.color}${st.resources>=b.cost?'66':'22'};border-radius:14px;padding:10px;text-align:center;cursor:${st.resources>=b.cost?'pointer':'not-allowed'};opacity:${st.resources>=b.cost?1:.5};transition:transform .1s" ${st.resources>=b.cost?'onmouseover="this.style.transform=\'scale(1.04)\'" onmouseout="this.style.transform=\'scale(1)\'"':''}>
            <div style="font-size:2rem;margin-bottom:4px">${b.emoji}</div>
            <div style="font-family:'Fredoka',sans-serif;font-size:.9rem;color:${b.color}">${b.name}</div>
            <div style="font-size:.75rem;color:#adb5bd;font-family:Rubik,sans-serif">&#x1F9F1; ${b.cost} &#x2192; &#x2B50; ${b.reward}</div>
          </div>
        `).join('')}
      </div>
      <button onclick="window.BuilderGame.cancelBuild()" style="width:100%;padding:10px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#6b7280;border-radius:12px;font-family:'Rubik',sans-serif;font-size:.85rem;cursor:pointer">&#x2190; \u05d7\u05d6\u05e8\u05d4</button>
    `;
  }

  function renderQuestion(el) {
    const q = st.activeQ, ctx = st.qContext, isBuild = ctx === 'build', b = st.selectedBuilding;
    el.innerHTML = `
      <div style="font-family:'Fredoka',sans-serif;font-size:1.5rem;color:${isBuild?'#69db7c':'#ffd43b'};text-align:center;margin-bottom:8px">
        ${isBuild ? '&#x1F3D7;&#xFE0F; \u05d1\u05e0\u05d4 \u05d0\u05ea \u05d4'+b.name : '&#x1F9F1; \u05d0\u05e1\u05d5\u05e3 \u05d7\u05d5\u05de\u05e8\u05d9\u05dd!'}
      </div>
      <div style="background:${isBuild?b.color+'22':'rgba(255,211,42,.1)'};border:2px solid ${isBuild?b.color+'66':'#ffd43b66'};border-radius:18px;padding:18px;text-align:center;margin-bottom:12px">
        <div style="font-size:3rem;margin-bottom:8px">${isBuild ? b.emoji : '&#x1F9F1;'}</div>
        ${isBuild ? `<div style="color:#adb5bd;font-size:.85rem;font-family:Rubik,sans-serif;margin-bottom:10px">\u05e2\u05dc\u05d5\u05ea: ${b.cost}&#x1F9F1; | \u05ea\u05e8\u05d5\u05d5\u05d9\u05d7: ${b.reward}&#x2B50;</div>` : `<div style="color:#adb5bd;font-size:.85rem;font-family:Rubik,sans-serif;margin-bottom:10px">\u05e4\u05ea\u05d5\u05e8 \u05e0\u05db\u05d5\u05df &#x2192; +\u05d7\u05d5\u05de\u05e8\u05d9\u05dd!</div>`}
        <div style="color:#fff;font-family:'Rubik',sans-serif;font-size:1.4rem;font-weight:900;direction:ltr;margin-bottom:14px">${q.text}</div>
        <div style="display:flex;gap:8px">
          <input id="bldAns" type="number" placeholder="?" onkeydown="if(event.key==='Enter')window.BuilderGame.submit()" autofocus
            style="flex:1;padding:13px;background:rgba(255,255,255,.12);border:2px solid ${isBuild?b.color+'88':'#ffd43b88'};color:#fff;border-radius:12px;font-size:1.3rem;font-family:'Rubik',sans-serif;text-align:center;outline:none">
          <button onclick="window.BuilderGame.submit()" style="padding:13px 22px;background:${isBuild?b.color:'#ffd43b'};border:none;border-radius:12px;font-size:1.4rem;cursor:pointer;font-weight:900">${isBuild?'&#x1F3D7;&#xFE0F;':'&#x2714;'}</button>
        </div>
      </div>
      <button onclick="window.BuilderGame.cancelQ()" style="width:100%;padding:9px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#6b7280;border-radius:12px;font-family:'Rubik',sans-serif;font-size:.82rem;cursor:pointer">&#x2190; \u05d1\u05d9\u05d8\u05d5\u05dc</button>
    `;
    setTimeout(()=>{const i=document.getElementById('bldAns');if(i)i.focus();},80);
  }

  function renderWin(el) {
    const rating = st.score > 200 ? '&#x1F3C6; \u05de\u05d3\u05d9\u05e0\u05d4' : st.score > 100 ? '&#x1F306; \u05e2\u05d9\u05e8' : st.score > 50 ? '&#x1F3D8;&#xFE0F; \u05db\u05e4\u05e8' : '&#x1F6D6; \u05d1\u05e7\u05ea\u05d4';
    el.innerHTML = `
      <div style="text-align:center;padding:20px">
        <div style="font-size:4rem;margin-bottom:10px">&#x1F306;</div>
        <div style="font-family:'Fredoka',sans-serif;font-size:1.8rem;color:#69db7c;margin-bottom:8px">\u05d1\u05e0\u05d9\u05ea \u05e2\u05d9\u05e8!</div>
        <div style="color:#ffd43b;font-family:'Fredoka',sans-serif;font-size:1.3rem;margin-bottom:6px">${rating}</div>
        <div style="color:#adb5bd;font-family:Rubik,sans-serif;font-size:.9rem;margin-bottom:20px">\u05e0\u05d9\u05e7\u05d5\u05d3: ${st.score} | \u05ea\u05d5\u05e9\u05d1\u05d9\u05dd: ${st.population}</div>
        <button onclick="window.BuilderGame.restart()" style="width:100%;padding:14px;background:linear-gradient(135deg,#1a3a1a,#2d5a2d);border:2px solid #69db7c;color:#69db7c;border-radius:14px;font-family:'Fredoka',sans-serif;font-size:1.1rem;cursor:pointer;margin-bottom:8px">&#x1F504; \u05d1\u05e0\u05d4 \u05e9\u05d5\u05d1</button>
        <button onclick="window.BuilderGame.exit()" style="width:100%;padding:10px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#6b7280;border-radius:12px;font-family:'Rubik',sans-serif;font-size:.85rem;cursor:pointer">&#x2190; \u05d7\u05d6\u05e8\u05d4 \u05dc\u05d1\u05d9\u05ea</button>
      </div>`;
    if(window.addPts) window.addPts(st.score);
    if(window.showPtsPop) window.showPtsPop(st.score);
    if(st.score > 100 && window.spawnConf) window.spawnConf(40);
  }

  function startBuild() { st.phase = 'build'; render(); }

  function selectBuilding(i) {
    const b = BUILDINGS[i];
    if (st.resources < b.cost) { window.showToast && window.showToast('\u05d0\u05d9\u05df \u05de\u05e1\u05e4\u05d9\u05e7 \u05d7\u05d5\u05de\u05e8\u05d9\u05dd! \u05d0\u05e1\u05d5\u05e3 \u05e7\u05d5\u05d3\u05dd &#x1F9F1;'); return; }
    st.selectedBuilding = b; st.activeQ = makeQ(b.diff); st.qContext = 'build'; st.phase = 'question'; render();
  }

  function collectResources() {
    st.selectedBuilding = null; st.activeQ = makeQ('easy'); st.qContext = 'collect'; st.phase = 'question'; render();
  }

  function submit() {
    const inp = document.getElementById('bldAns'); if (!inp) return;
    const ua = parseInt(inp.value);
    if (isNaN(ua)) { inp.style.borderColor='#ff6b6b'; setTimeout(()=>inp.style.borderColor='',500); return; }
    const q = st.activeQ;
    if (ua === q.answer) {
      st.streak++;
      if (st.qContext === 'build') {
        const b = st.selectedBuilding;
        st.resources -= b.cost; st.score += b.reward + (st.streak > 2 ? 5 : 0);
        st.population += _rnd(3, 12); placeBuildingInGrid(b); st.turn++;
        window.showToast && window.showToast('&#x1F3D7;&#xFE0F; ' + b.name + ' \u05e0\u05d1\u05e0\u05d4! +' + b.reward + '&#x2B50;');
      } else {
        const gained = _rnd(8, 20) + st.streak * 2; st.resources += gained; st.turn++;
        window.showToast && window.showToast('&#x1F9F1; +' + gained + ' \u05d7\u05d5\u05de\u05e8\u05d9\u05dd!');
      }
      mgSave({ score: st.score, resources: st.resources, turn: st.turn, population: st.population, grid: st.grid.map(r=>r.map(c=>c?{name:c.name,emoji:c.emoji,color:c.color}:null)) });
      if (st.turn >= st.maxTurns) { st.phase = 'win'; render(); return; }
      st.phase = 'city';
    } else {
      st.streak = 0; inp.value = ''; inp.style.borderColor = '#ff6b6b';
      setTimeout(()=>{ inp.style.borderColor=''; inp.focus(); },500);
      window.showToast && window.showToast('&#x274C; \u05dc\u05d0 \u05e0\u05db\u05d5\u05df \u2014 \u05d0\u05d1\u05d3\u05d5 2 \u05d7\u05d5\u05de\u05e8\u05d9\u05dd!');
      st.resources = Math.max(0, st.resources - 2); return;
    }
    render();
  }

  function placeBuildingInGrid(b) {
    for (let attempt = 0; attempt < 20; attempt++) {
      const r = _rnd(0, GRID_H-1), c = _rnd(0, GRID_W-1);
      if (!st.grid[r][c]) { st.grid[r][c] = b; return; }
    }
    for (let r = 0; r < GRID_H; r++)
      for (let c = 0; c < GRID_W; c++)
        if (!st.grid[r][c]) { st.grid[r][c] = b; return; }
  }

  function cancelBuild() { st.phase = 'city'; render(); }
  function cancelQ()     { st.phase = 'city'; render(); }

  function restart() {
    st = {phase:'city',resources:20,score:0,turn:0,maxTurns:15,grid:Array(GRID_H).fill(null).map(()=>Array(GRID_W).fill(null)),selectedBuilding:null,activeQ:null,population:0,happiness:80,streak:0};
    render();
  }

  function exit() { if(window.show) window.show('home'); }

  function open() {
    const wrap = document.getElementById('minigameScreen'); if (!wrap) return;
    wrap.innerHTML = `<div id="builderWrap" style="max-width:420px;margin:0 auto;padding:12px"></div>`;
    document.querySelectorAll('.scr').forEach(s => s.classList.remove('on'));
    wrap.classList.add('on');
    const _sv = mgLoad();
    if (_sv && _sv.turn > 0) {
      st.score=_sv.score||0; st.resources=_sv.resources||20; st.turn=_sv.turn||0; st.population=_sv.population||0;
      if(_sv.grid) st.grid=_sv.grid.map(r=>r.map(c=>c||null));
      render();
    } else { restart(); }
  }

  return { open, startBuild, selectBuilding, collectResources, submit, cancelBuild, cancelQ, restart, exit };
})();
