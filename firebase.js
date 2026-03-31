// ══ FIREBASE CONFIG & AUTH ══
// This file handles: init, auth state, login, register, save/load, friends, password reset.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  onAuthStateChanged, signOut, updatePassword, EmailAuthProvider,
  reauthenticateWithCredential, sendPasswordResetEmail }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc,
  collection, getDocs, query, where }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCT4liZo4u4Fs8DJ2jTImtUPG0yJFOdn5Y",
  authDomain: "brain-sprak.firebaseapp.com",
  projectId: "brain-sprak",
  storageBucket: "brain-sprak.firebasestorage.app",
  messagingSenderId: "829015668389",
  appId: "1:829015668389:web:525c91b159f1bb248fbf4c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Access globals from non-module scripts
// config.js exposes st and cfg on window - reference them via window to be safe
// We use a getter so we always have the latest reference
const getState = () => window.st;
const getCfg   = () => window.cfg;

// Expose to non-module scripts
window._fb = {
  auth, db, doc, setDoc, getDoc, updateDoc,
  collection, getDocs, query, where,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
  updatePassword, EmailAuthProvider, reauthenticateWithCredential
};

// ── AUTH STATE ──
onAuthStateChanged(auth, async (user) => {
  if (user) {
    window._fbUser = user;
    await fbLoad(user.uid);
    document.getElementById('auth-scr').classList.remove('on');
    if (!window._username) {
      document.querySelectorAll('.scr').forEach(s => s.classList.remove('on'));
      document.getElementById('username-setup-scr').classList.add('on');
    } else if (!window._grade) {
      document.querySelectorAll('.scr').forEach(s => s.classList.remove('on'));
      document.getElementById('grade-select-scr').classList.add('on');
    } else {
      await window.loadGradeConfig(window._grade);
      document.getElementById('home').classList.add('on');
      window.updateHome();
    }
  } else {
    window._fbUser = null;
    document.querySelectorAll('.scr').forEach(s => s.classList.remove('on'));
    document.getElementById('auth-scr').classList.add('on');
  }
});

// ── LOGIN ──
window.fbLogin = async function() {
  const usernameVal = document.getElementById('loginUsername').value.trim();
  const pass        = document.getElementById('loginPass').value;
  const err         = document.getElementById('loginErr');
  const btn         = document.getElementById('loginBtn');
  err.style.display = 'none';

  if (!usernameVal || !pass) {
    err.textContent = 'נא למלא שם משתמש וסיסמה';
    err.style.display = 'block';
    return;
  }

  btn.disabled = true;
  btn.textContent = 'נכנס...';

  try {
    // Build synthetic email directly — no pre-auth Firestore query needed
    const syntheticEmail = window.cleanUsername(usernameVal) + '@brainspark.local';
    try {
      await signInWithEmailAndPassword(auth, syntheticEmail, pass);
      return; // success — onAuthStateChanged handles navigation
    } catch(innerErr) {
      if (innerErr.code === 'auth/wrong-password' || innerErr.code === 'auth/invalid-credential') {
        err.textContent = 'סיסמה שגויה';
        err.style.display = 'block';
        btn.disabled = false; btn.textContent = '🚀 כניסה';
        return;
      }
      if (innerErr.code === 'auth/too-many-requests') {
        err.textContent = 'יותר מדי ניסיונות, נסה שוב מאוחר יותר';
        err.style.display = 'block';
        btn.disabled = false; btn.textContent = '🚀 כניסה';
        return;
      }
      // user-not-found on synthetic = registered with real email, fall through
    }
    // Fallback for real-email registrations
    const snap = await getDocs(query(collection(db, 'users'), where('username', '==', window.cleanUsername(usernameVal))));
    if (snap.empty) {
      err.textContent = 'שם משתמש לא קיים';
      err.style.display = 'block';
      btn.disabled = false; btn.textContent = '🚀 כניסה';
      return;
    }
    const userDoc = snap.docs[0].data();
    const email = userDoc.loginEmail || userDoc.email;
    if (!email) {
      err.textContent = 'לא נמצא מייל לחשבון זה';
      err.style.display = 'block';
      btn.disabled = false; btn.textContent = '🚀 כניסה';
      return;
    }
    await signInWithEmailAndPassword(auth, email, pass);
  } catch(e) {
    const msg = (e.code === 'auth/wrong-password' || e.code === 'auth/invalid-credential')
      ? 'סיסמה שגויה'
      : e.code === 'auth/user-not-found'
      ? 'משתמש לא קיים'
      : e.code === 'auth/too-many-requests'
      ? 'יותר מדי ניסיונות, נסה שוב מאוחר יותר'
      : 'שגיאה: ' + e.message;
    err.textContent = msg;
    err.style.display = 'block';
    btn.disabled = false; btn.textContent = '🚀 כניסה';
  }
};

// ── REGISTER ──
window.fbRegister = async function() {
  const displayName = document.getElementById('regDisplayName').value.trim();
  const username    = window.cleanUsername(document.getElementById('regUsername').value);
  const grade       = document.getElementById('regGrade').value;
  const gender      = window.getSelectedGender ? window.getSelectedGender('reg') : '';
  const email       = document.getElementById('regEmail').value.trim();
  const pass        = document.getElementById('regPass').value;
  const pass2       = document.getElementById('regPass2').value;
  const err         = document.getElementById('authErr');
  const btn         = document.getElementById('authBtn');
  const termsChecked = document.getElementById('regTermsChk')?.classList.contains('checked');

  err.style.display = 'none';

  if (!displayName || displayName.length < 2) { err.textContent='נא להכניס שם תצוגה'; err.style.display='block'; return; }
  if (!username || username.length < 2)        { err.textContent='שם משתמש חייב לפחות 2 תווים'; err.style.display='block'; return; }
  if (!grade)                                  { err.textContent='נא לבחור כיתה'; err.style.display='block'; return; }
  if (pass.length < 6)                         { err.textContent='סיסמה לפחות 6 תווים'; err.style.display='block'; return; }
  if (pass !== pass2)                          { err.textContent='הסיסמאות לא תואמות'; err.style.display='block'; return; }
  if (!termsChecked)                           { err.textContent='נא לאשר את תנאי השימוש'; err.style.display='block'; return; }

  // Email is optional — generate a synthetic one if not provided
  const loginEmail = email || (username + '@brainspark.local');

  btn.disabled = true; btn.textContent = 'יוצר חשבון...';

  try {
    // Check username uniqueness first
    const snap = await getDocs(query(collection(db, 'users'), where('username', '==', username)));
    if (!snap.empty) {
      err.textContent = 'שם משתמש זה תפוס, נסה אחר';
      err.style.display = 'block';
      btn.disabled = false; btn.textContent = '✅ צור חשבון!';
      return;
    }

    const cred = await createUserWithEmailAndPassword(auth, loginEmail, pass);
    const uid  = cred.user.uid;

    // Save initial user document to Firestore
    await setDoc(doc(db, 'users', uid), {
      displayName,
      username,
      grade,
      gender:       gender || '',
      contactEmail: email ? email.toLowerCase() : '',
      loginEmail:   loginEmail.toLowerCase(),
      termsAccepted: true,
      friends: [],
      st:  window.st,
      cfg: window.cfg,
      lastSaved: Date.now(),
    });

    window._displayName = displayName;
    window._username    = username;
    window._grade       = grade;
    window._gender      = gender;
    if (window.applyGenderTheme) window.applyGenderTheme(gender);
    if (email) window._contactEmail = email.toLowerCase();

    // onAuthStateChanged fires and handles navigation
  } catch(e) {
    const msg = e.code === 'auth/email-already-in-use'
      ? 'שם משתמש זה כבר קיים, נסה אחר'
      : e.code === 'auth/invalid-email'
      ? 'מייל לא תקין'
      : 'שגיאה: ' + e.message;
    err.textContent = msg;
    err.style.display = 'block';
    btn.disabled = false; btn.textContent = '✅ צור חשבון!';
  }
};

// ── LOGOUT ──
window.fbLogout = async function() {
  if (!confirm('להתנתק?')) return;
  try {
    if (window.fbSave) window.fbSave();
    await signOut(auth);
    window._fbUser      = null;
    window._username    = null;
    window._displayName = null;
    window._grade       = null;
    window._friends     = [];
    Object.assign(window.st, {
      score:0, level:0, xp:0, streak:0, maxStreak:0,
      learnedTopics:[], dailyDone:false, dailyDate:'',
      history:[], examTopics:['add','sub','mul'], examDiff:'mix',
      totalSolved:0, correctCount:0, minigames:{},
      specialGlowColor:null, specialBadgeColor:null
    });
  } catch(e) {
    console.error('Logout error:', e);
  }
};

// ── LOAD USER DATA ──
window.fbLoad = async function(uid) {
  console.log('[BrainSpark] fbLoad START, uid=', uid);
  try {
    const snap = await getDoc(doc(db, 'users', uid));
    console.log('[BrainSpark] fbLoad snap.exists=', snap.exists());
    if (snap.exists()) {
      const d = snap.data();
      console.log('[BrainSpark] cloud data keys:', Object.keys(d));
      console.log('[BrainSpark] cloud st.score=', d.st?.score, 'cloud st._savedAt=', d.st?._savedAt);
      if (d.displayName)   window._displayName   = d.displayName;
      if (d.grade)         window._grade         = d.grade;
      if (d.username)      window._username      = d.username;
      if (d.friends)       window._friends       = d.friends;
      if (d.gender) { window._gender = d.gender; if (window.applyGenderTheme) window.applyGenderTheme(d.gender); }
      if (d.contactEmail)  window._contactEmail  = d.contactEmail;
      if (d.termsAccepted) window._termsAccepted = d.termsAccepted;

      const cloudSt  = d.st  || {};
      const localRaw = JSON.parse(localStorage.getItem('yanMath2') || '{}');
      const localSt  = localRaw.st || {};
      const cloudSaved = cloudSt._savedAt || 0;
      const localSaved = localSt._savedAt || 0;
      console.log('[BrainSpark] cloud _savedAt=', cloudSaved, 'local _savedAt=', localSaved);
      const useSt = (localSaved > cloudSaved) ? localSt : cloudSt;
      console.log('[BrainSpark] using:', localSaved > cloudSaved ? 'LOCAL' : 'CLOUD', 'score=', useSt.score);
      Object.assign(window.st, useSt);
      if (d.cfg) Object.assign(window.cfg, d.cfg);
      if (!window.st.minigames) window.st.minigames = {};
      try { localStorage.setItem('yanMath2', JSON.stringify({st: window.st, cfg: window.cfg})); } catch(e) {}
    } else {
      console.log('[BrainSpark] NO cloud doc — using localStorage only');
      try {
        const localRaw = JSON.parse(localStorage.getItem('yanMath2') || '{}');
        if (localRaw.st)  Object.assign(window.st,  localRaw.st);
        if (localRaw.cfg) Object.assign(window.cfg, localRaw.cfg);
      } catch(e) {}
    }
    if (!window._friends) window._friends = [];
    if (!window.st.history)      window.st.history = [];
    if (!st.minigames)    st.minigames = {};
    const today = new Date().toDateString();
    if (window.st.dailyDate !== today) { window.st.dailyDone = false; window.st.dailyDate = today; }
    console.log('[BrainSpark] fbLoad DONE. st.score=', window.st.score, 'grade=', window._grade);
  } catch(e) {
    console.error('[BrainSpark] fbLoad ERROR:', e.code, e.message);
    try {
      const localRaw = JSON.parse(localStorage.getItem('yanMath2') || '{}');
      if (localRaw.st)  Object.assign(window.st,  localRaw.st);
      if (localRaw.cfg) Object.assign(window.cfg, localRaw.cfg);
    } catch(e2) {}
  }
};

// ── SAVE USERNAME (setup screen) ──
window.fbSaveUsername = async function() {
  const val  = document.getElementById('setupUsername').value.trim();
  const err  = document.getElementById('setupErr');
  const btn  = document.getElementById('setupBtn');
  err.style.display = 'none';
  const clean = window.cleanUsername(val);
  if (!clean || clean.length < 2) { err.textContent='שם משתמש חייב להיות לפחות 2 תווים'; err.style.display='block'; return; }
  btn.disabled = true; btn.textContent = 'שומר...';
  try {
    const snap = await getDocs(query(collection(db, 'users'), where('username', '==', clean)));
    if (!snap.empty) { err.textContent='שם משתמש זה תפוס, נסה אחר'; err.style.display='block'; btn.disabled=false; btn.textContent='✅ שמור והמשך'; return; }
    window._username = clean;
    await updateDoc(doc(db, 'users', window._fbUser.uid), { username: clean });
    document.querySelectorAll('.scr').forEach(s => s.classList.remove('on'));
    if (!window._grade) {
      document.getElementById('grade-select-scr').classList.add('on');
    } else {
      await window.loadGradeConfig(window._grade);
      document.getElementById('home').classList.add('on');
      window.updateHome();
    }
  } catch(e) {
    try {
      await setDoc(doc(db, 'users', window._fbUser.uid), { username: clean }, { merge: true });
      window._username = clean;
      document.querySelectorAll('.scr').forEach(s => s.classList.remove('on'));
      document.getElementById('grade-select-scr').classList.add('on');
    } catch(e2) {
      err.textContent = 'שגיאה: ' + e2.message; err.style.display='block';
      btn.disabled=false; btn.textContent='✅ שמור והמשך';
    }
  }
};

// ── PASSWORD RESET ──
window.fbSendPasswordReset = async function() {
  const contactEmail = window._contactEmail;
  const err = document.getElementById('passErr');
  err.style.display = 'none';
  if (!contactEmail) {
    err.textContent = 'לא קיים מייל מחובר לחשבון. הוסף מייל בהגדרות כדי לאפס סיסמה.';
    err.style.display = 'block'; return;
  }
  try {
    await sendPasswordResetEmail(auth, contactEmail);
    window.showToast(`✅ קישור לאיפוס סיסמה נשלח ל-${contactEmail}`);
  } catch(e) {
    err.textContent = (e.code === 'auth/user-not-found' || e.code === 'auth/invalid-email')
      ? 'המייל לא מזוהה על ידי Firebase. עדכן את המייל בהגדרות ושמור שוב — ואז נסה מחדש.'
      : 'שגיאה: ' + e.message;
    err.style.display = 'block';
  }
};

// ── CHANGE PASSWORD ──
window.fbChangePassword = async function() {
  const oldPass = document.getElementById('oldPass').value;
  const newPass = document.getElementById('newPass').value;
  const err     = document.getElementById('passErr');
  err.style.display = 'none';
  if (newPass.length < 6) { err.textContent='סיסמה חדשה לפחות 6 תווים'; err.style.display='block'; return; }
  try {
    const cred = EmailAuthProvider.credential(window._fbUser.email, oldPass);
    await reauthenticateWithCredential(window._fbUser, cred);
    await updatePassword(window._fbUser, newPass);
    window.showToast('✅ סיסמה עודכנה!');
    document.getElementById('oldPass').value = '';
    document.getElementById('newPass').value  = '';
  } catch(e) {
    err.textContent = e.code === 'auth/wrong-password' ? 'סיסמה ישנה שגויה' : 'שגיאה: ' + e.message;
    err.style.display = 'block';
  }
};

// ── CHANGE DISPLAY NAME ──
window.fbChangeDisplayName = async function() {
  const newName = document.getElementById('newDisplayName').value.trim();
  const err     = document.getElementById('nameErr');
  err.style.display = 'none';
  if (!newName || newName.length < 2) { err.textContent='שם חייב להיות לפחות 2 תווים'; err.style.display='block'; return; }
  window._displayName = newName;
  window.fbSave();
  window.updateHome();
  window.showToast('✅ שם עודכן!');
};

// ── CHANGE GRADE ──
window.fbChangeGrade = async function() {
  const grade = document.getElementById('setGrade').value;
  if (!grade) return;
  if (!confirm(`לעבור לכיתה ${grade}? זה ישנה את רמת השאלות!`)) return;
  window._grade = grade;
  window.fbSave();
  await window.loadGradeConfig(grade);
  window.updateHome();
  window.showToast(`✅ עברת לכיתה ${grade}!`);
};

// ── SAVE PROFILE SETTINGS (email + gender) ──
window.fbSaveProfileSettings = async function() {
  if (!window._fbUser) return;
  const gender   = window.getSelectedGender ? window.getSelectedGender('set') : '';
  const emailEl  = document.getElementById('setContactEmail');
  const email    = emailEl ? emailEl.value.trim() : '';
  const err      = document.getElementById('profileFieldsErr');
  if (err) err.style.display = 'none';
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    if (err) { err.textContent='כתובת מייל לא תקינה'; err.style.display='block'; }
    return;
  }
  try {
    const update = {};
    if (gender) { update.gender = gender; window._gender = gender; if (window.applyGenderTheme) window.applyGenderTheme(gender); }
    if (email)  { update.contactEmail = email.toLowerCase(); window._contactEmail = email.toLowerCase(); }
    if (Object.keys(update).length > 0)
      await updateDoc(doc(db, 'users', window._fbUser.uid), update);
    window.showToast('✅ פרטים עודכנו!');
  } catch(e) {
    if (err) { err.textContent='שגיאה בשמירה'; err.style.display='block'; }
  }
};

// ── REGISTRATION UI HELPERS ──
window.toggleRegTerms = function() {
  const chk = document.getElementById('regTermsChk');
  const row = document.getElementById('regTermsRow');
  if (chk) chk.classList.toggle('checked');
  if (row) row.classList.toggle('accepted', !!(chk && chk.classList.contains('checked')));
};

window.showTermsModal = function() {
  const m = document.getElementById('termsModal');
  if (m) m.style.display = 'flex';
};

window.closeTermsModal = function() {
  const m = document.getElementById('termsModal');
  if (m) m.style.display = 'none';
};

window.selectRegGrade = function(grade) {
  document.getElementById('regGrade').value = grade;
  document.querySelectorAll('.reg-grade-card').forEach(c => {
    c.classList.toggle('selected', c.dataset.grade === grade);
  });
};

let _usernameCheckTimer = null;
window.scheduleUsernameCheck = function(immediate) {
  clearTimeout(_usernameCheckTimer);
  _usernameCheckTimer = setTimeout(async () => {
    const val = window.cleanUsername(document.getElementById('regUsername').value);
    const badge = document.getElementById('regUsernameBadge');
    if (!badge) return;
    if (!val || val.length < 2) { badge.style.display='none'; return; }
    try {
      const snap = await getDocs(query(collection(db, 'users'), where('username', '==', val)));
      badge.style.display = 'inline';
      if (snap.empty) {
        badge.textContent = '✅ זמין!';
        badge.style.color = 'var(--a3)';
      } else {
        badge.textContent = '❌ תפוס';
        badge.style.color = 'var(--a1)';
      }
    } catch(e) { badge.style.display='none'; }
  }, immediate ? 0 : 600);
};

window.regGoStep = function(step) {
  const err = document.getElementById('authErr');
  err.style.display = 'none';
  if (step === 2) {
    const name = document.getElementById('regDisplayName').value.trim();
    const user = window.cleanUsername(document.getElementById('regUsername').value);
    if (!name || name.length < 2) { err.textContent='נא להכניס שם תצוגה'; err.style.display='block'; return; }
    if (!user || user.length < 2) { err.textContent='שם משתמש חייב לפחות 2 תווים'; err.style.display='block'; return; }
  }
  if (step === 3) {
    const grade = document.getElementById('regGrade').value;
    if (!grade) { err.textContent='נא לבחור כיתה'; err.style.display='block'; return; }
  }
  [1,2,3].forEach(i => {
    document.getElementById('regStep'+i).classList.toggle('on', i===step);
    document.getElementById('rdot'+i).classList.toggle('active', i<=step);
    if (i < 3) document.getElementById('rline'+i).classList.toggle('active', i<step);
  });
};

window.switchAuthTab = function(tab) {
  document.getElementById('loginForm').classList.toggle('on', tab==='login');
  document.getElementById('regForm').classList.toggle('on', tab==='reg');
  document.getElementById('tabLogin').classList.toggle('active', tab==='login');
  document.getElementById('tabReg').classList.toggle('active', tab==='reg');
};

// ── FRIENDS ──
window.fbSearchUser = async function() {
  const q   = window.cleanUsername(document.getElementById('friendSearch').value);
  const res = document.getElementById('friendResults');
  res.innerHTML = '<div style="color:var(--txt2)">מחפש...</div>';
  try {
    const snap = await getDocs(query(collection(db, 'users'), where('username', '==', q)));
    if (snap.empty) { res.innerHTML='<div style="color:var(--txt2)">לא נמצא משתמש</div>'; return; }
    snap.forEach(docSnap => {
      const d = docSnap.data();
      if (docSnap.id === window._fbUser.uid) { res.innerHTML='<div style="color:var(--txt2)">זה אתה 😄</div>'; return; }
      const alreadyFriend = (window._friends||[]).includes(docSnap.id);
      res.innerHTML = `<div class="friend-result-card"><div><div style="font-weight:700;color:var(--a2)">${d.displayName}</div><div style="font-size:.8rem;color:var(--txt2)">@${d.username} • כיתה ${d.grade||'?'} • ${d.st?.score||0} נקודות</div></div>${alreadyFriend?'<span style="color:var(--a3);font-size:.85rem">✅ חבר</span>':`<button class="auth-btn" style="width:auto;padding:8px 16px;font-size:.85rem" onclick="fbAddFriend('${docSnap.id}','${d.displayName}')">+ הוסף</button>`}</div>`;
    });
  } catch(e) { res.innerHTML='<div style="color:var(--a1)">שגיאה בחיפוש</div>'; }
};

window.fbAddFriend = async function(uid, name) {
  if (!window._friends) window._friends = [];
  if (window._friends.includes(uid)) return;
  window._friends.push(uid);
  window.fbSave();
  window.showToast(`✅ ${name} נוסף לחברים!`);
  openFriends();
};

window.fbRemoveFriend = async function(uid, name) {
  if (!confirm(`להסיר את ${name} מהחברים?`)) return;
  window._friends = (window._friends||[]).filter(id => id !== uid);
  window.fbSave();
  window.showToast(`🗑️ ${name} הוסר מהחברים`);
  renderFriendsList();
  loadMiniLeaderboard();
};

window.fbLoadLeaderboard = async function() {
  const board  = document.getElementById('leaderboardList');
  board.innerHTML = '<div style="color:var(--txt2);text-align:center">טוען...</div>';
  try {
    const myUid  = window._fbUser?.uid;
    const allIds = [myUid, ...(window._friends||[])];
    const results= [];
    for (const uid of allIds) {
      if (!uid) continue;
      const snap = await getDoc(doc(db, 'users', uid));
      if (snap.exists()) {
        const d = snap.data();
        results.push({ name: d.displayName, score: d.st?.score||0, level: d.st?.level||0, uid, grade: d.grade||'?', username: d.username||'', glowColor: d.st?.specialGlowColor||null, badgeColor: d.st?.specialBadgeColor||null });
      }
    }
    sortLeaderboard(results);
    board.innerHTML = '';
    results.forEach((r, i) => {
      const medals   = ['🥇','🥈','🥉'];
      const isMe     = r.uid === myUid;
      const special  = SPECIAL_USERS[(r.username||'').toLowerCase()];
      const glowColor  = r.glowColor  || special?.glowColor  || '#00d362';
      const badgeColor = r.badgeColor || special?.badgeColor || special?.color || '#00d362';
      const nameHtml = special
        ? `<span style="color:${glowColor};font-family:'Fredoka',sans-serif;font-weight:700;text-shadow:0 0 8px ${glowColor},0 0 20px ${glowColor}99,0 0 40px ${glowColor}66;">${r.name}${isMe?' (אתה)':''}</span><span class="special-badge" style="--sc:${badgeColor};font-size:.7rem;padding:2px 8px;">${special.badge}</span>`
        : `<span style="color:${isMe?'var(--a2)':'var(--txt)'}">${r.name}${isMe?' (אתה)':''}</span>`;
      board.innerHTML += `<div class="lb-row ${isMe?'lb-me':''}"><div class="lb-rank">${medals[i]||`#${i+1}`}</div><div class="lb-info"><div style="font-weight:700;display:flex;align-items:center;gap:6px;flex-wrap:wrap;">${nameHtml}</div><div style="font-size:.78rem;color:var(--txt2)">רמה ${r.level+1} • כיתה ${r.grade}</div></div><div style="font-weight:900;color:var(--a3);font-size:1.1rem">${special?.scoreDisplay?special.scoreDisplay(r.score):r.score.toLocaleString()}</div></div>`;
    });
    if (results.length === 0) board.innerHTML='<div style="color:var(--txt2);text-align:center">אין חברים עדיין 😢</div>';
  } catch(e) { board.innerHTML='<div style="color:var(--a1)">שגיאה בטעינה</div>'; }
};

// ── SAVE TO FIRESTORE ──
let _saveTimer = null;
window.fbSave = function() {
  if (!window._fbUser) {
    console.log('[BrainSpark] fbSave skipped — not logged in');
    return;
  }
  if (window.st) window.st._savedAt = Date.now();
  try { localStorage.setItem('yanMath2', JSON.stringify({st: window.st, cfg: window.cfg})); } catch(e) {}
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(async () => {
    try {
      console.log('[BrainSpark] fbSave START, uid=', window._fbUser.uid, 'score=', window.st && window.st.score);
      await setDoc(doc(db, 'users', window._fbUser.uid), {
        st: window.st, cfg: window.cfg,
        displayName:  window._displayName  || '',
        username:     window._username     || '',
        grade:        window._grade        || '',
        friends:      window._friends      || [],
        lastSaved:    Date.now(),
      }, { merge: true });
      console.log('[BrainSpark] fbSave SUCCESS');
    } catch(e) {
      console.error('[BrainSpark] fbSave ERROR:', e.code, e.message);
    }
  }, 800);
};
