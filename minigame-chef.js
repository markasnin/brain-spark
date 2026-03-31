// ══════════════════════════════════════════════════════════════
// minigame-chef.js  —  🍪 Math Chef: Cookie Bakery
// Run your own cookie shop! Customers arrive with orders.
// Solve math to bake the right amount. Serve fast to earn coins!
// The oven upgrades, customers get impatient, chaos ensues! 🍪
// ══════════════════════════════════════════════════════════════

window.ChefGame = (function () {
  'use strict';

  // ── Persistent state (saved via main st.minigames) ──────────
  function mgSave(data) {
    if (!window.st) return;
    if (!window.st.minigames) window.st.minigames = {};
    window.st.minigames['chef'] = data;
    if (window.save) window.save();
    else if (window.fbSave) window.fbSave();
  }
  function mgLoad() {
    return (window.st && window.st.minigames && window.st.minigames['chef']) || null;
  }

  const _rnd = (a,b) => Math.floor(Math.random()*(b-a+1))+a;
  const _pick = arr => arr[Math.floor(Math.random()*arr.length)];


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
    if (cat==='add') { const m=sm?15:md?60:250; const a=r(1,m),b=r(1,m); return {text:a+' + '+b+' = ?', answer:a+b}; }
    if (cat==='sub') { const m=sm?15:md?60:250; const a=r(3,m),b=r(1,a); return {text:a+' - '+b+' = ?', answer:a-b}; }
    if (cat==='mul') { const m=sm?5:md?9:12;    const a=r(2,m),b=r(2,m); return {text:a+' \xd7 '+b+' = ?', answer:a*b}; }
    const m=md?9:12; const b=r(2,m),q=r(1,m);  return {text:(b*q)+' \xf7 '+b+' = ?', answer:q};
  }
  function helpBtn(msg) {
    return '<div style="text-align:center;margin-bottom:10px"><button onclick="window._showHelp(this.dataset.msg)" data-msg="' + msg.replace(/"/g,'&quot;') + '" style="padding:6px 18px;background:rgba(255,211,42,.15);border:1px solid #ffd43b88;color:#ffd43b;border-radius:20px;font-family:Rubik,sans-serif;font-size:.8rem;cursor:pointer;font-weight:700">\u{1F4A1} \u05d0\u05d9\u05da \u05de\u05e9\u05d7\u05e7\u05d9\u05dd?</button></div>';
  }

  // ── Recipes ───────────────────────────────────────────────
  const RECIPES = [
    {name:'עוגיות שוקולד', emoji:'🍪', color:'#c47b2b', base:5,  diff:'easy'},
    {name:'עוגת תות',      emoji:'🍰', color:'#ff6b6b', base:8,  diff:'easy'},
    {name:'קאפקייק',       emoji:'🧁', color:'#ff9ff3', base:10, diff:'medium'},
    {name:'מאפה מקרון',    emoji:'🍬', color:'#cc5de8', base:12, diff:'medium'},
    {name:'עוגת שוקולד',  emoji:'🎂', color:'#854d0e', base:15, diff:'hard'},
    {name:'פרלינים',       emoji:'🍫', color:'#78350f', base:20, diff:'hard'},
  ];

  const CUSTOMERS = [
    {name:'ילד קטן',    emoji:'👦', patience:18, tip:2, color:'#74c0fc'},
    {name:'אמא',        emoji:'👩', patience:15, tip:5, color:'#f783ac'},
    {name:'מורה',       emoji:'👩‍🏫', patience:12, tip:8, color:'#69db7c'},
    {name:'בוס',        emoji:'👔', patience:8,  tip:15,color:'#ffd43b'},
    {name:'שף מפורסם', emoji:'👨‍🍳', patience:6,  tip:25,color:'#ff8c42'},
  ];

  const MAX_COINS = 999, OVEN_SLOTS = 3;

  let st = {
    phase: 'bakery',
    coins: 0, day: 1, served: 0, failed: 0,
    customers: [],   // [{recipe, amount, patienceLeft, patienceMax, timer, tip, name, emoji, color, q, id}]
    nextId: 0,
    activeOrder: null,
    ovenLevel: 1,
    activeQ: null,
    spawnTimer: null,
  };

  function render() {
    const el = document.getElementById('chefWrap');
    if (!el) return;
    if (st.phase === 'bakery')   renderBakery(el);
    else if (st.phase === 'question') renderQuestion(el);
    else if (st.phase === 'dayend') renderDayEnd(el);
  }

  function renderBakery(el) {
    const qLen = st.customers.length;
    el.innerHTML = `
      <div style="font-family:'Fredoka',sans-serif;font-size:1.6rem;color:#ffa94d;text-align:center;margin-bottom:4px">🍪 המאפייה של המתמטיקה</div>
      ${helpBtn('🍪 המאפייה שלך!\\n\\n• לקוחות מגיעים עם הזמנות\\n• לחץ על לקוח כדי לקחת הזמנה\\n• פתור את תרגיל המתמטיקה כדי לאפות!\\n• אם תקח זמן רב מדי — הלקוח הולך :\\n• הגש מהר לקבל טיפ גדול יותר!\\n• שרת 10 לקוחות ביום להסתיים!')}
      <div style="display:flex;justify-content:space-between;align-items:center;background:rgba(255,255,255,.06);border-radius:14px;padding:8px 14px;margin-bottom:10px">
        <span style="color:#ffd43b;font-family:'Fredoka',sans-serif;font-size:1rem">🪙 ${st.coins}</span>
        <span style="color:#ffa94d;font-family:'Fredoka',sans-serif;font-size:1rem">יום ${st.day}</span>
        <span style="color:#69db7c;font-family:'Fredoka',sans-serif;font-size:.9rem">✅ ${st.served} | ❌ ${st.failed}</span>
      </div>
      <div style="background:linear-gradient(180deg,#3d1a00,#5d2d00);border-radius:18px;padding:12px;margin-bottom:10px;border:2px solid #c47b2b44;min-height:160px">
        <div style="color:#ffa94d;font-family:'Fredoka',sans-serif;font-size:.95rem;margin-bottom:8px;text-align:center">🏪 תור לקוחות (${qLen}/3 מקסימום)</div>
        ${qLen === 0 ? '<div style="text-align:center;padding:20px;color:#8b5e3c;font-family:Rubik,sans-serif;font-size:.85rem">⏳ מחכים ללקוחות...</div>' :
          st.customers.map(c => renderCustomer(c)).join('')
        }
      </div>
      <div style="text-align:center;color:#8b5e3c;font-size:.75rem;font-family:Rubik,sans-serif">לחץ על לקוח כדי לקחת הזמנה!</div>
      <button onclick="window.ChefGame.endDay()" style="width:100%;padding:10px;background:rgba(255,169,77,.1);border:1px solid #ffa94d55;color:#ffa94d;border-radius:12px;font-family:'Rubik',sans-serif;font-size:.82rem;cursor:pointer;margin-top:8px">🌙 סיים יום</button>
      <button onclick="window.ChefGame.exit()" style="width:100%;padding:8px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);color:#6b7280;border-radius:12px;font-family:'Rubik',sans-serif;font-size:.78rem;cursor:pointer;margin-top:4px">← חזרה לבית</button>
    `;
  }

  function renderCustomer(c) {
    const pct = Math.max(0, (c.patienceLeft / c.patienceMax) * 100);
    const barColor = pct > 60 ? '#69db7c' : pct > 30 ? '#ffd43b' : '#ff6b6b';
    return `<div onclick="window.ChefGame.takeOrder(${c.id})" style="background:${c.color}18;border:1.5px solid ${c.color}44;border-radius:14px;padding:10px;margin-bottom:7px;cursor:pointer;display:flex;align-items:center;gap:10px;transition:transform .12s" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform=''">
      <div style="font-size:2.2rem">${c.emoji}</div>
      <div style="flex:1">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px">
          <span style="color:${c.color};font-family:'Fredoka',sans-serif;font-size:.95rem">${c.name}</span>
          <span style="color:#ffd43b;font-size:.8rem">+${c.tip}🪙</span>
        </div>
        <div style="color:#e2e8f0;font-size:.82rem;font-family:Rubik,sans-serif;margin-bottom:4px">${c.recipe.emoji} ${c.amount} ${c.recipe.name}</div>
        <div style="background:rgba(255,255,255,.1);border-radius:4px;height:6px"><div style="width:${pct}%;height:100%;background:${barColor};border-radius:4px;transition:width .5s"></div></div>
      </div>
    </div>`;
  }

  function renderQuestion(el) {
    const c = st.activeOrder, q = st.activeQ;
    el.innerHTML = `
      <div style="font-family:'Fredoka',sans-serif;font-size:1.5rem;color:#ffa94d;text-align:center;margin-bottom:8px">👨‍🍳 אתה אופה!</div>
      <div style="background:linear-gradient(135deg,${c.color}22,rgba(255,255,255,.04));border:2px solid ${c.color}66;border-radius:18px;padding:18px;text-align:center;margin-bottom:10px">
        <div style="font-size:3rem;margin-bottom:6px">${c.emoji}</div>
        <div style="font-family:'Fredoka',sans-serif;font-size:1rem;color:${c.color};margin-bottom:2px">${c.name} מזמין:</div>
        <div style="font-size:2rem;margin-bottom:6px">${c.recipe.emoji}</div>
        <div style="color:#fff;font-family:'Rubik',sans-serif;font-size:.95rem;margin-bottom:14px">${c.amount} יחידות של ${c.recipe.name}</div>
        <div style="background:rgba(255,255,255,.08);border-radius:14px;padding:14px;margin-bottom:4px">
          <div style="color:#ffd43b;font-family:'Fredoka',sans-serif;font-size:.9rem;margin-bottom:8px">🧮 פתור את התרגיל:</div>
          <div style="color:#fff;font-family:'Rubik',sans-serif;font-size:1.4rem;font-weight:900;direction:ltr;margin-bottom:12px">${q.text}</div>
          <div style="display:flex;gap:8px">
            <input id="chefAns" type="number" placeholder="?" onkeydown="if(event.key==='Enter')window.ChefGame.submit()" autofocus
              style="flex:1;padding:13px;background:rgba(255,255,255,.12);border:2px solid ${c.color}88;color:#fff;border-radius:12px;font-size:1.3rem;font-family:'Rubik',sans-serif;text-align:center;outline:none">
            <button onclick="window.ChefGame.submit()" style="padding:13px 22px;background:${c.color};border:none;border-radius:12px;font-size:1.4rem;cursor:pointer;font-weight:900">🍳</button>
          </div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <button onclick="window.ChefGame.cancelOrder()" style="padding:10px;background:rgba(255,107,107,.15);border:1px solid #ff6b6b66;color:#ff6b6b;border-radius:12px;font-family:'Rubik',sans-serif;font-size:.85rem;cursor:pointer">❌ ביטול (-1🪙)</button>
        <button onclick="window.ChefGame.hint()" style="padding:10px;background:rgba(255,211,42,.1);border:1px solid #ffd43b55;color:#ffd43b;border-radius:12px;font-family:'Rubik',sans-serif;font-size:.85rem;cursor:pointer">💡 רמז (-2🪙)</button>
      </div>
    `;
    setTimeout(()=>{const i=document.getElementById('chefAns');if(i)i.focus();},80);
  }

  function renderDayEnd(el) {
    const bonus = Math.max(0, st.served - st.failed) * 5;
    el.innerHTML = `
      <div style="text-align:center;padding:16px">
        <div style="font-size:3.5rem;margin-bottom:8px">${st.failed>st.served?'😓':'🎉'}</div>
        <div style="font-family:'Fredoka',sans-serif;font-size:1.6rem;color:#ffa94d;margin-bottom:10px">סוף יום ${st.day}!</div>
        <div style="background:rgba(255,255,255,.06);border-radius:14px;padding:14px;margin-bottom:14px">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;text-align:center">
            <div><div style="font-size:1.8rem;color:#69db7c;font-weight:900">${st.served}</div><div style="color:#adb5bd;font-size:.8rem;font-family:Rubik,sans-serif">הוגשו</div></div>
            <div><div style="font-size:1.8rem;color:#ff6b6b;font-weight:900">${st.failed}</div><div style="color:#adb5bd;font-size:.8rem;font-family:Rubik,sans-serif">נכשלו</div></div>
          </div>
          ${bonus>0?`<div style="margin-top:10px;color:#ffd43b;font-family:'Fredoka',sans-serif;font-size:1rem">🏅 בונוס יום: +${bonus}🪙</div>`:''}
          <div style="margin-top:6px;color:#69db7c;font-family:'Fredoka',sans-serif;font-size:1.1rem">סה"כ: ${st.coins}🪙</div>
        </div>
        <button onclick="window.ChefGame.nextDay()" style="width:100%;padding:14px;background:linear-gradient(135deg,#7c3500,#c47b2b);border:2px solid #ffa94d;color:#fff;border-radius:14px;font-family:'Fredoka',sans-serif;font-size:1.1rem;cursor:pointer;margin-bottom:8px">☀️ יום ${st.day+1} ←</button>
        <button onclick="window.ChefGame.exit()" style="width:100%;padding:10px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#6b7280;border-radius:12px;font-family:'Rubik',sans-serif;font-size:.85rem;cursor:pointer">← צא מהמאפייה</button>
      </div>`;
    if(window.addPts) window.addPts(st.coins + bonus);
    if(window.showPtsPop && st.coins > 0) window.showPtsPop(st.coins + bonus);
    if(bonus > 0 && window.spawnConf) window.spawnConf(20);
    mgSave({ coins: st.coins, day: st.day });
  }

  // ── Spawn customers ───────────────────────────────────────
  function spawnCustomer() {
    if (st.customers.length >= OVEN_SLOTS || st.phase !== 'bakery') return;
    const recipe  = _pick(RECIPES);
    const cust    = _pick(CUSTOMERS);
    const amount  = _rnd(1, 8 + st.day * 2);
    const q       = makeQ(recipe.diff);
    const pat     = cust.patience + (st.ovenLevel * 2);
    st.customers.push({
      id: st.nextId++,
      recipe, amount, name: cust.name, emoji: cust.emoji, color: cust.color,
      tip: cust.tip + st.day,
      patienceLeft: pat, patienceMax: pat,
      q,
    });
    render();
    // patience countdown
    const cid = st.customers[st.customers.length-1].id;
    const timer = setInterval(() => {
      const c = st.customers.find(x=>x.id===cid);
      if (!c) { clearInterval(timer); return; }
      c.patienceLeft--;
      if (c.patienceLeft <= 0) {
        clearInterval(timer);
        st.customers = st.customers.filter(x=>x.id!==cid);
        st.failed++;
        if(window.showToast) window.showToast('😢 ' + c.name + ' עזב! אין זמן להיות איטיים!');
        if(st.phase==='bakery') render();
      } else {
        if(st.phase==='bakery') render();
      }
    }, 1000);
  }

  function startSpawning() {
    if (st.spawnTimer) clearInterval(st.spawnTimer);
    const interval = Math.max(4000, 9000 - st.day * 500);
    spawnCustomer(); // immediate first
    st.spawnTimer = setInterval(() => {
      if (st.phase === 'bakery') spawnCustomer();
    }, interval);
  }

  // ── Actions ───────────────────────────────────────────────
  function takeOrder(id) {
    const c = st.customers.find(x=>x.id===id);
    if (!c || st.phase !== 'bakery') return;
    st.activeOrder = c;
    st.activeQ = c.q;
    st.phase = 'question';
    render();
  }

  function submit() {
    const inp = document.getElementById('chefAns');
    if (!inp) return;
    const ua = parseInt(inp.value);
    const c  = st.activeOrder;
    if (isNaN(ua)) { inp.style.borderColor='#ff6b6b'; setTimeout(()=>inp.style.borderColor=c.color+'88',500); return; }
    if (ua === st.activeQ.answer) {
      st.customers = st.customers.filter(x=>x.id!==c.id);
      const earn = c.tip + Math.ceil(c.patienceLeft / 3);
      st.coins += earn;
      st.served++;
      if(window.addPts) window.addPts(earn);
      if(window.showToast) window.showToast('🎉 ' + c.emoji + ' שולם! +' + earn + '🪙');
      if(st.served >= 10) { endDay(); return; }
      st.phase = 'bakery';
    } else {
      inp.value = '';
      inp.style.borderColor = '#ff6b6b';
      inp.style.animation = 'shake .3s';
      setTimeout(()=>{ inp.style.borderColor = c.color+'88'; inp.style.animation=''; if(inp)inp.focus(); },500);
      if(window.showToast) window.showToast('❌ לא נכון — נסה שוב!');
      return;
    }
    render();
  }

  function cancelOrder() {
    if (!st.activeOrder) return;
    st.customers = st.customers.filter(x=>x.id!==st.activeOrder.id);
    st.coins = Math.max(0, st.coins - 1);
    st.failed++;
    st.activeOrder = null;
    st.phase = 'bakery';
    render();
  }

  function hint() {
    if (st.coins < 2) { window.showToast&&window.showToast('אין מספיק מטבעות לרמז!'); return; }
    st.coins -= 2;
    const a = st.activeQ.answer;
    window.showToast && window.showToast('💡 התשובה בין ' + Math.max(0,a-3) + ' ל-' + (a+3));
  }

  function endDay() {
    if (st.spawnTimer) { clearInterval(st.spawnTimer); st.spawnTimer = null; }
    st.customers = [];
    st.activeOrder = null;
    st.phase = 'dayend';
    render();
  }

  function nextDay() {
    st.day++;
    st.served = 0;
    st.failed = 0;
    st.phase = 'bakery';
    render();
    setTimeout(startSpawning, 500);
  }

  function restart() {
    if (st.spawnTimer) clearInterval(st.spawnTimer);
    st = {phase:'bakery',coins:0,day:1,served:0,failed:0,customers:[],nextId:0,activeOrder:null,ovenLevel:1,activeQ:null,spawnTimer:null};
    render();
    setTimeout(startSpawning, 800);
  }

  function exit() {
    if (st.spawnTimer) clearInterval(st.spawnTimer);
    if (window.show) window.show('home');
  }

  function open() {
    const wrap = document.getElementById('minigameScreen');
    if (!wrap) return;
    wrap.innerHTML = `<div id="chefWrap" style="max-width:420px;margin:0 auto;padding:12px"></div>`;
    document.querySelectorAll('.scr').forEach(s => s.classList.remove('on'));
    wrap.classList.add('on');
    const saved = mgLoad();
    if (saved && saved.day > 1) {
      st.coins = saved.coins || 0;
      st.day   = saved.day   || 1;
    } else {
      restart();
      return;
    }
    render();
    setTimeout(startSpawning, 800);
  }

  return { open, takeOrder, submit, cancelOrder, hint, endDay, nextDay, restart, exit };
})();
