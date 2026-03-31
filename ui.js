// ══ UI HELPERS ══

const rnd  = (a,b) => Math.floor(Math.random()*(b-a+1))+a;
const pick = arr => arr[Math.floor(Math.random()*arr.length)];

function cleanUsername(val) {
  return val.trim().toLowerCase().replace(/[^\u05d0-\u05eaa-z0-9]/g, '');
}

function show(id) {
  document.querySelectorAll('.scr').forEach(s => s.classList.remove('on'));
  document.getElementById(id).classList.add('on');
  if (id === 'home') updateHome();
  if (qs.hintInterval)  { clearInterval(qs.hintInterval);  qs.hintInterval  = null; }
  if (qs.examTimer)     { clearInterval(qs.examTimer);     qs.examTimer     = null; }
}

function showToast(msg) {
  const t = document.createElement('div');
  t.className   = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}

function load() {
  try {
    const d = JSON.parse(localStorage.getItem('yanMath2') || '{}');
    if (d.st)  Object.assign(st, d.st);
    if (d.cfg) Object.assign(cfg, d.cfg);
    const today = new Date().toDateString();
    if (st.dailyDate !== today) { st.dailyDone = false; st.dailyDate = today; }
    if (!st.history) st.history = [];
  } catch(e) {}
  // Note: Firebase fbLoad() will run after login and will merge/override with cloud data
  // So local data here is just a fast initial load — Firebase is the source of truth
}

function save() {
  st._savedAt = Date.now(); // timestamp for cross-device sync comparison
  try { localStorage.setItem('yanMath2', JSON.stringify({st, cfg})); } catch(e) {}
  if (window.fbSave) window.fbSave();
}

function sortLeaderboard(results) {
  return results.sort((a, b) => {
    const aPin = !!(SPECIAL_USERS[(a.username||'').toLowerCase()]?.pinTop);
    const bPin = !!(SPECIAL_USERS[(b.username||'').toLowerCase()]?.pinTop);
    if (aPin && !bPin) return -1;
    if (!aPin && bPin) return 1;
    return b.score - a.score;
  });
}

// ══ HOME ══
function updateHome() {
  const lv = LEVELS[Math.min(st.level, LEVELS.length-1)];
  const playerDisplayName = window._displayName || (window._fbUser ? (window._fbUser.email?.split('@')[0]||'שחקן') : 'שחקן');
  const uname   = (window._username||'').toLowerCase();
  const special = SPECIAL_USERS[uname];
  const gc      = window.GRADE_CONFIG;

  if (special) {
    const glowColor  = st.specialGlowColor  || special.glowColor  || '#00d362';
    const badgeColor = st.specialBadgeColor || special.badgeColor || special.color;
    document.getElementById('playerName').innerHTML = `<span class="name-glow-blue" style="color:${glowColor};animation:none;text-shadow:0 0 8px ${glowColor},0 0 20px ${glowColor}99,0 0 40px ${glowColor}66">${playerDisplayName}</span><span class="special-badge" style="--sc:${badgeColor}">${special.badge} ${special.title}</span>`;
    document.getElementById('levelDisplay').textContent = `${special.badge} ${special.title}`;
  } else {
    document.getElementById('playerName').innerHTML = `⭐ ${playerDisplayName}${st.level>0?`<span class="nickname-badge">${lv.n}</span>`:''}`;
    document.getElementById('levelDisplay').textContent = `${lv.e} רמה ${st.level+1} — ${lv.n}`;
  }

  const gbw = document.getElementById('gradeBadgeWrap');
  if (special) {
    const glowColor  = st.specialGlowColor || special.glowColor || '#00d362';
    const gradeLabel = st.specialGradeLabel != null ? st.specialGradeLabel : (special.defaultGradeLabel||'');
    gbw.innerHTML = gradeLabel ? `<div class="grade-chip" style="color:${glowColor};border-color:${glowColor}40;background:${glowColor}15;font-family:'Fredoka',sans-serif;">${gradeLabel}</div>` : '';
  } else if (gc) {
    gbw.innerHTML = `<div class="grade-chip" style="color:${gc.gradeColor};border-color:${gc.gradeColor}40;background:${gc.gradeColor}15;">${gc.gradeEmoji} ${gc.gradeName}</div>${gc.tip?`<div style="font-size:.78rem;color:var(--txt2);margin-top:5px;">${gc.tip}</div>`:''}`;
  } else gbw.innerHTML = '';

  const pct = st.level >= LEVELS.length-1 ? 100 : Math.round(st.xp/lv.xp*100);
  document.getElementById('xpBar').style.width = pct + '%';
  document.getElementById('xpTxt').textContent = st.level >= LEVELS.length-1 ? `${st.xp} נקודות 🔥` : `${st.xp} / ${lv.xp} לרמה ${st.level+2}`;

  const existingScoreLbl = document.getElementById('specialScoreLbl');
  if (existingScoreLbl) existingScoreLbl.remove();
  if (special?.scoreDisplay) {
    const lbl = document.createElement('div');
    lbl.id = 'specialScoreLbl';
    lbl.style.cssText = 'font-family:"Fredoka",sans-serif;font-size:1.1rem;font-weight:700;margin-top:6px;';
    lbl.style.color = st.specialGlowColor || special.glowColor || '#00d362';
    lbl.textContent = special.scoreDisplay(st.score);
    document.getElementById('xpTxt').insertAdjacentElement('afterend', lbl);
  }

  if (st.streak >= 3) {
    document.getElementById('streakBadge').style.display = 'inline-flex';
    if (special?.streakDisplay) document.getElementById('streakBadge').innerHTML = special.streakDisplay(st.streak);
    else document.getElementById('streakBadge').innerHTML = `🔥 <span id="streakCount">${st.streak}</span> ברצף!`;
  } else document.getElementById('streakBadge').style.display = 'none';

  if (st.dailyDone) { document.getElementById('dailyBanner').classList.add('done'); document.getElementById('dailyDesc').textContent='✅ המשימה היומית הושלמה! 🎉'; }
  else { document.getElementById('dailyBanner').classList.remove('done'); document.getElementById('dailyDesc').textContent='2 שאלות מיוחדות מחכות לך'; }

  buildRecommendation();
  buildGrid();
  loadMiniLeaderboard();

  const dn = document.getElementById('newDisplayName'); if (dn) dn.placeholder = playerDisplayName;
  if (window._grade) selectSetGrade(window._grade);
}

// ══ GRID ══
function buildGrid() {
  const gc        = window.GRADE_CONFIG;
  const available = gc ? gc.availableCategories : ['add','sub','mul','word'];
  const grid      = document.getElementById('mainGrid');
  grid.innerHTML  = '';
  ALL_CATS.forEach(cat => {
    if (!cat.special && !available.includes(cat.id)) return;
    const div = document.createElement('div');
    div.className = 'cbt' + (cat.cls ? ' '+cat.cls : '');
    if (cat.borderColor) div.style.borderColor = cat.borderColor + '40';
    const onclick = cat.special
      ? ({'learn':'openLearn()','history':'openHistory()','mistakes':'openMistakes()','exam':'openExamPre()','friends':'openFriends()','settings':'openSettings()'}[cat.special]||'')
      : `openCat('${cat.id}')`;
    div.setAttribute('onclick', onclick);
    div.id = cat.id + 'Btn';
    div.innerHTML = `<span class="ci">${cat.icon}</span><div class="cn">${cat.name}</div><div class="cs">${cat.sub}</div>`;
    grid.appendChild(div);
  });
  lockCat('divBtn',       !st.learnedTopics.includes('division'));
  lockCat('shapesBtn',    !st.learnedTopics.includes('shapes'));
  lockCat('fractionsBtn', !st.learnedTopics.includes('fractions'));
}

function lockCat(id, locked) {
  const el = document.getElementById(id);
  if (!el) return;
  if (locked) el.classList.add('locked'); else el.classList.remove('locked');
}

function buildRecommendation() {
  const box = document.getElementById('recommendBox');
  const txt = document.getElementById('recommendText');
  if (st.history.length < 5) { box.style.display='none'; return; }
  const cats = {};
  st.history.slice(-30).forEach(h => {
    if (!cats[h.cat]) cats[h.cat]={ok:0,bad:0};
    if (h.correct) cats[h.cat].ok++; else cats[h.cat].bad++;
  });
  let worstCat=null, worstRatio=0;
  for (const [c,v] of Object.entries(cats)) {
    const total = v.ok+v.bad; if (total<2) continue;
    const ratio = v.bad/total; if (ratio>worstRatio) { worstRatio=ratio; worstCat=c; }
  }
  if (!worstCat || worstRatio<0.3) { box.style.display='none'; return; }
  const catNames = {add:'חיבור',sub:'חיסור',mul:'כפל',div:'חילוק',word:'מילוליות'};
  box.style.display='flex';
  txt.innerHTML = `💡 ממליץ לתרגל: <strong>${catNames[worstCat]||worstCat}</strong> — טועה ${Math.round(worstRatio*100)}% מהפעמים!`;
}

// ══ FRIENDS ══
async function openFriends() {
  show('friends-scr');
  if (window.fbLoadLeaderboard) await window.fbLoadLeaderboard();
  renderFriendsList();
}

async function loadMiniLeaderboard() {
  const el = document.getElementById('homeLbList');
  if (!el || !window._fbUser) return;
  try {
    const { db:dbInst, doc:docFn, getDoc:gdoc } = window._fb;
    const myUid  = window._fbUser.uid;
    const allIds = [myUid, ...(window._friends||[])];
    const results= [];
    for (const uid of allIds.slice(0,5)) {
      if (!uid) continue;
      const snap = await gdoc(docFn(dbInst,'users',uid));
      if (snap.exists()) {
        const d = snap.data();
        results.push({ name:d.displayName, score:d.st?.score||0, uid, username:d.username||'', glowColor:d.st?.specialGlowColor||null, badgeColor:d.st?.specialBadgeColor||null });
      }
    }
    sortLeaderboard(results);
    const medals = ['🥇','🥈','🥉'];
    el.innerHTML = results.slice(0,3).map((r,i) => {
      const isMe       = r.uid === myUid;
      const special    = SPECIAL_USERS[(r.username||'').toLowerCase()];
      const glowColor  = r.glowColor  || special?.glowColor  || '#00d362';
      const badgeColor = r.badgeColor || special?.badgeColor || special?.color || '#00d362';
      const nameHtml   = special
        ? `<span style="color:${glowColor};font-family:'Fredoka',sans-serif;font-weight:700;text-shadow:0 0 8px ${glowColor},0 0 16px ${glowColor}99;">${r.name}${isMe?' 👤':''}</span><span class="special-badge" style="--sc:${badgeColor};font-size:.65rem;padding:1px 6px;">${special.badge}</span>`
        : `<span style="color:${isMe?'var(--a2)':'var(--txt)'};">${r.name}${isMe?' 👤':''}</span>`;
      return `<div class="lb-row" style="padding:7px 8px;${isMe?'background:rgba(255,211,42,.08);border-radius:10px;':''}"><div class="lb-rank" style="font-size:1rem">${medals[i]||`#${i+1}`}</div><div style="flex:1;font-size:.88rem;font-weight:700;display:flex;align-items:center;gap:5px;flex-wrap:wrap;">${nameHtml}</div><div style="font-weight:900;color:var(--a3);font-size:.9rem">${special?.scoreDisplay?special.scoreDisplay(r.score):r.score.toLocaleString()}</div></div>`;
    }).join('') || '<div style="color:var(--txt2);font-size:.85rem;text-align:center">הוסף חברים לראות לוח!</div>';
  } catch(e) { el.innerHTML='<div style="color:var(--txt2);font-size:.85rem">—</div>'; }
}

async function renderFriendsList() {
  const el = document.getElementById('friendsList');
  if (!el) return;
  el.innerHTML = '';
  if (!window._friends || window._friends.length===0) {
    el.innerHTML='<div style="color:var(--txt2);text-align:center;padding:16px">אין חברים עדיין!</div>'; return;
  }
  for (const uid of window._friends) {
    try {
      const { db:dbInst, doc:docFn, getDoc:gdoc } = window._fb;
      const snap = await gdoc(docFn(dbInst,'users',uid));
      if (!snap.exists()) continue;
      const d   = snap.data();
      const lv  = LEVELS[Math.min(d.st?.level||0, LEVELS.length-1)];
      const card= document.createElement('div');
      card.className = 'friend-card';
      card.innerHTML = `<div class="friend-avatar">${(d.displayName||'?')[0].toUpperCase()}</div><div style="flex:1"><div style="font-weight:700;color:var(--a2)">${d.displayName}</div><div style="font-size:.8rem;color:var(--txt2)">כיתה ${d.grade||'?'} • רמה ${(d.st?.level||0)+1} • ${d.st?.totalSolved||0} תרגילים</div></div><div style="display:flex;align-items:center;gap:8px;"><div style="font-weight:900;color:var(--a3)">${(d.st?.score||0).toLocaleString()} ⭐</div><button onclick="event.stopPropagation();fbRemoveFriend('${uid}','${d.displayName}')" style="padding:5px 10px;background:rgba(255,71,87,.15);border:1px solid var(--a1);color:var(--a1);border-radius:8px;cursor:pointer;font-size:.75rem;font-family:'Rubik',sans-serif;white-space:nowrap;">הסר</button></div>`;
      card.onclick = () => openFriendProfile(d, uid);
      el.appendChild(card);
    } catch(e) {}
  }
}

function openFriendProfile(d, uid) {
  const lv = LEVELS[Math.min(d.st?.level||0, LEVELS.length-1)];
  document.getElementById('fprofileContent').innerHTML = `<div class="profile-avatar">${(d.displayName||'?')[0].toUpperCase()}</div><div style="font-family:'Fredoka',sans-serif;font-size:1.8rem;color:var(--a2);margin-bottom:4px">${d.displayName}</div><div style="color:var(--txt2);font-size:.9rem;margin-bottom:20px">@${d.username||''} • כיתה ${d.grade||'?'} • ${lv.e} ${lv.n}</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;width:100%"><div class="profile-stat"><div class="profile-stat-val" style="color:var(--a2)">${(d.st?.score||0).toLocaleString()}</div><div class="profile-stat-lbl">נקודות</div></div><div class="profile-stat"><div class="profile-stat-val" style="color:var(--a4)">${(d.st?.level||0)+1}</div><div class="profile-stat-lbl">רמה</div></div><div class="profile-stat"><div class="profile-stat-val" style="color:var(--a3)">${d.st?.totalSolved||0}</div><div class="profile-stat-lbl">תרגילים</div></div></div>`;
  show('fprofile-scr');
}

// ══ SETTINGS ══
let gateA, gateB;
function openSettings() {
  const uname2    = (window._username||'').toLowerCase();
  const isSpecial = !!SPECIAL_USERS[uname2];
  document.getElementById('settingsTopTabs').style.display = isSpecial ? 'flex' : 'none';

  const opts = [
    () => { const n=pick([4,9,16,25,36,49,64]); gateA=n; gateB=Math.sqrt(n); return `√${n} = ?`; },
    () => { const a=rnd(20,99),b=rnd(2,9),r=a%b; gateA=a; gateB=r; return `שארית של ${a} ÷ ${b} = ?`; },
    () => { const a=rnd(11,25),b=rnd(11,25); gateA=a*b; gateB=a*b; return `${a} × ${b} = ?`; }
  ];
  const gen = pick(opts);
  document.getElementById('pgateQ').textContent = gen();
  document.getElementById('pgateInp').value  = '';
  document.getElementById('pgateErr').style.display = 'none';
  switchSettingsTab('parents');

  document.getElementById('setPtsEasy').value      = cfg.ptsEasy;
  document.getElementById('setPtsMed').value       = cfg.ptsMed;
  document.getElementById('setPtsHard').value      = cfg.ptsHard;
  document.getElementById('setPtsWordBonus').value = cfg.ptsWordBonus;
  document.getElementById('setPtsWrong').value     = cfg.ptsWrong;
  document.getElementById('setPtsHint').value      = cfg.ptsHint;
  document.getElementById('setMaxAttempts').value  = cfg.maxAttempts;
  document.getElementById('setHintTime').value     = cfg.hintTime;
  document.getElementById('setStreakBonus3').value = cfg.streakBonus3;
  document.getElementById('setStreakBonus5').value = cfg.streakBonus5;
  document.getElementById('setStreakBonus10').value= cfg.streakBonus10;

  const dn = document.getElementById('newDisplayName'); if (dn) dn.placeholder = window._displayName||'שם חדש';
  if (window._gender && window.selectGender) window.selectGender('set', window._gender);
  const emailEl = document.getElementById('setContactEmail'); if (emailEl && window._contactEmail) emailEl.value = window._contactEmail;
  if (window._grade) selectSetGrade(window._grade);
  show('settings-scr');
}

function checkGate() {
  const v = parseInt(document.getElementById('pgateInp').value);
  if (v === gateB) {
    document.getElementById('pgateWrap').style.display    = 'none';
    document.getElementById('settingsContent').style.display = 'block';
  } else {
    document.getElementById('pgateErr').style.display = 'block';
    document.getElementById('pgateInp').value = '';
    document.getElementById('pgateInp').focus();
  }
}

function saveSettings() {
  cfg.ptsEasy      = parseInt(document.getElementById('setPtsEasy').value)      || 5;
  cfg.ptsMed       = parseInt(document.getElementById('setPtsMed').value)       || 10;
  cfg.ptsHard      = parseInt(document.getElementById('setPtsHard').value)      || 18;
  cfg.ptsWordBonus = parseInt(document.getElementById('setPtsWordBonus').value) || 8;
  cfg.ptsWrong     = parseInt(document.getElementById('setPtsWrong').value)     || 1;
  cfg.ptsHint      = parseInt(document.getElementById('setPtsHint').value)      || 2;
  cfg.maxAttempts  = parseInt(document.getElementById('setMaxAttempts').value)  || 3;
  cfg.hintTime     = parseInt(document.getElementById('setHintTime').value)     || 180;
  cfg.streakBonus3 = parseInt(document.getElementById('setStreakBonus3').value) || 5;
  cfg.streakBonus5 = parseInt(document.getElementById('setStreakBonus5').value) || 10;
  cfg.streakBonus10= parseInt(document.getElementById('setStreakBonus10').value)|| 20;
  save();
  showToast('💾 הגדרות נשמרו!');
  show('home');
}

function clearHistory() {
  if (!confirm('בטוח למחוק?')) return;
  st.history=[]; st.totalSolved=0; st.correctCount=0;
  save(); showToast('🗑️ היסטוריה נמחקה');
}

function resetAll() {
  if (!confirm('בטוח לאפס הכל?')) return;
  st.score=0; st.level=0; st.xp=0; st.streak=0;
  st.history=[]; st.learnedTopics=[]; st.totalSolved=0; st.correctCount=0;
  save(); showToast('🔄 הכל אופס'); show('home');
}

// ── Admin Settings ──
function switchSettingsTab(tab) {
  const ps = document.getElementById('settingsParentsSection');
  const as = document.getElementById('settingsAdminSection');
  const pb = document.getElementById('parentsTabBtn');
  const ab = document.getElementById('adminTabBtn');
  if (tab==='parents') {
    ps.style.display='block'; as.style.display='none';
    document.getElementById('pgateWrap').style.display    = 'block';
    document.getElementById('settingsContent').style.display = 'none';
    pb?.classList.add('active'); ab?.classList.remove('active');
  } else {
    ps.style.display='none'; as.style.display='block';
    pb?.classList.remove('active'); ab?.classList.add('active');
    const gc2=st.specialGlowColor||'#00d362', bc2=st.specialBadgeColor||'#00d362';
    document.getElementById('glowColorCustom').value  = gc2;
    document.getElementById('badgeColorCustom').value = bc2;
    updateGlowPreview(gc2); updateBadgePreview(bc2);
    highlightSelected('glowColorPicker', gc2); highlightSelected('badgeColorPicker', bc2);
  }
}

function highlightSelected(pickerId, color) {
  const picker = document.getElementById(pickerId);
  if (!picker) return;
  picker.querySelectorAll('div[data-color]').forEach(el => {
    el.style.border     = el.dataset.color.toLowerCase()===color.toLowerCase() ? '3px solid #fff' : '3px solid transparent';
    el.style.transform  = el.dataset.color.toLowerCase()===color.toLowerCase() ? 'scale(1.2)' : 'scale(1)';
  });
}
function pickGlowColor(color)  { st.specialGlowColor=color;  document.getElementById('glowColorCustom').value=color;  updateGlowPreview(color);  highlightSelected('glowColorPicker',color); }
function pickBadgeColor(color) { st.specialBadgeColor=color; document.getElementById('badgeColorCustom').value=color; updateBadgePreview(color); highlightSelected('badgeColorPicker',color); }
function updateGlowPreview(color)  { const el=document.getElementById('glowPreview');  if(!el)return; el.textContent=window._displayName||'השם שלך'; el.style.color=color; el.style.animation='none'; el.style.textShadow=`0 0 8px ${color},0 0 20px ${color}99,0 0 40px ${color}66,0 0 60px ${color}33`; }
function updateBadgePreview(color) { const el=document.getElementById('badgePreview'); if(!el)return; const uname=(window._username||'').toLowerCase(); const special=SPECIAL_USERS[uname]; el.textContent=(special?.badge||'⚡')+' '+(special?.title||'מיוחד'); el.style.setProperty('--sc',color); el.style.color=color; el.style.borderColor=color; el.style.boxShadow=`0 0 12px ${color}40`; }
function saveAdminSettings()   { save(); updateHome(); showToast('✨ המראה שלך עודכן!'); }
function resetAdminSettings()  { const uname=(window._username||'').toLowerCase(); const special=SPECIAL_USERS[uname]; if(special){st.specialGlowColor=special.glowColor||'#00d362';st.specialBadgeColor=special.badgeColor||special.color;save();updateHome();switchSettingsTab('admin');showToast('↩️ אופס לברירת מחדל!');} }

// ── Registration helpers ──
window.selectGender = function(idPrefix, value) {
  const picker = document.getElementById(idPrefix+'GenderPicker');
  if (!picker) return;
  picker.querySelectorAll('.gender-btn').forEach(btn => {
    const isSel = btn.dataset.value === value;
    btn.classList.toggle('selected', isSel);
    btn.setAttribute('aria-pressed', isSel);
  });
};
window.getSelectedGender = function(idPrefix) {
  const picker = document.getElementById(idPrefix+'GenderPicker');
  if (!picker) return '';
  const sel = picker.querySelector('.gender-btn.selected');
  return sel ? sel.dataset.value : '';
};

function showTermsModal()  { const m=document.getElementById('termsModal'); if(m) m.style.display='flex'; }
function closeTermsModal() { const m=document.getElementById('termsModal'); if(m) m.style.display='none'; }
function toggleRegTerms()  { const r=document.getElementById('regTermsRow'); if(r) r.classList.toggle('accepted'); }

// ── Multi-step registration ──
let _regCurrentStep = 1;
function regGoStep(step) {
  const err = document.getElementById('authErr');
  err.style.display = 'none';
  if (step > _regCurrentStep) {
    if (_regCurrentStep===1) {
      const name = document.getElementById('regDisplayName').value.trim();
      const user = document.getElementById('regUsername').value.trim();
      if (!name||name.length<2) { err.textContent='שם תצוגה חייב להיות לפחות 2 תווים'; err.style.display='block'; document.getElementById('regDisplayName').focus(); return; }
      if (!user||user.length<2) { err.textContent='שם משתמש חייב להיות לפחות 2 תווים'; err.style.display='block'; document.getElementById('regUsername').focus(); return; }
      const badge = document.getElementById('regUsernameBadge');
      if (badge && badge.textContent.includes('תפוס')) { err.textContent='שם המשתמש הזה תפוס — בחר שם אחר'; err.style.display='block'; document.getElementById('regUsername').focus(); return; }
    }
    if (_regCurrentStep===2) {
      if (!document.getElementById('regGrade').value) { err.textContent='בחר כיתה להמשיך'; err.style.display='block'; return; }
    }
  }
  document.querySelectorAll('.reg-step-panel').forEach(p => p.classList.remove('on'));
  document.getElementById('regStep'+step).classList.add('on');
  for (let i=1;i<=3;i++) {
    const dot=document.getElementById('rdot'+i);
    dot.classList.remove('active','done');
    if (i<step) { dot.classList.add('done'); dot.textContent='✓'; }
    else if (i===step) { dot.classList.add('active'); dot.textContent=i; }
    else dot.textContent=i;
  }
  for (let i=1;i<=2;i++) document.getElementById('rline'+i).classList.toggle('done',step>i);
  _regCurrentStep = step;
}

function selectSetGrade(grade) {
  document.getElementById('setGrade').value = grade;
  document.querySelectorAll('#setGradeGrid .reg-grade-card').forEach(c => c.classList.toggle('selected', c.dataset.grade===grade));
}
function selectRegGrade(grade) {
  document.getElementById('regGrade').value = grade;
  document.querySelectorAll('.reg-grade-card').forEach(c => c.classList.toggle('selected', c.dataset.grade===grade));
}

function resetRegForm() {
  regGoStep(1);
  ['regDisplayName','regUsername','regEmail','regPass','regPass2'].forEach(id => { const el=document.getElementById(id); if(el) el.value=''; });
  document.getElementById('regGrade').value='';
  document.querySelectorAll('.reg-grade-card').forEach(c=>c.classList.remove('selected'));
  document.querySelectorAll('#regGenderPicker .gender-btn').forEach(b=>{b.classList.remove('selected');b.setAttribute('aria-pressed','false');});
  const tr=document.getElementById('regTermsRow'); if(tr) tr.classList.remove('accepted');
  document.getElementById('authErr').style.display='none';
}

function switchAuthTab(tab) {
  document.getElementById('loginForm').classList.toggle('on', tab==='login');
  document.getElementById('regForm').classList.toggle('on',   tab==='reg');
  document.getElementById('tabLogin').classList.toggle('active', tab==='login');
  document.getElementById('tabReg').classList.toggle('active',   tab==='reg');
  if (tab==='reg') resetRegForm();
}

// ══ STARS ══
function createStars() {
  const bg = document.getElementById('bg');
  for (let i=0; i<90; i++) {
    const s    = document.createElement('div');
    s.className= 'star';
    const size = rnd(1,3);
    s.style.cssText = `left:${rnd(0,100)}%;top:${rnd(0,100)}%;width:${size}px;height:${size}px;--d:${2+rnd(0,30)/10}s;animation-delay:${rnd(0,30)/10}s;`;
    bg.appendChild(s);
  }
}
