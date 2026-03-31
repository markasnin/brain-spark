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
      await loadGradeConfig(window._grade);
      document.getElementById('home').classList.add('on');
      updateHome();
    }
  } else {
    window._fbUser = null;
    document.querySelectorAll('.scr').forEach(s => s.classList.remove('on'));
    document.getElementById('auth-scr').classList.add('on');
  }
});

// ── LOAD USER DATA ──
window.fbLoad = async function(uid) {
  try {
    const snap = await getDoc(doc(db, 'users', uid));
    if (snap.exists()) {
      const d = snap.data();
      if (d.displayName)   window._displayName   = d.displayName;
      if (d.grade)         window._grade         = d.grade;
      if (d.username)      window._username      = d.username;
      if (d.friends)       window._friends       = d.friends;
      if (d.gender)        window._gender        = d.gender;
      if (d.contactEmail)  window._contactEmail  = d.contactEmail;
      if (d.termsAccepted) window._termsAccepted = d.termsAccepted;

      // ── Firestore is the source of truth ──
      // Only use localStorage if cloud has a strictly lower score AND
      // local has more recent activity (user played offline)
      const cloudSt  = d.st  || {};
      const localRaw = JSON.parse(localStorage.getItem('yanMath2') || '{}');
      const localSt  = localRaw.st || {};

      const cloudScore  = cloudSt.score  || 0;
      const localScore  = localSt.score  || 0;
      const cloudSaved  = cloudSt._savedAt || 0;
      const localSaved  = localSt._savedAt || 0;

      // Use whichever was saved more recently (or cloud if equal)
      const useSt = (localSaved > cloudSaved && localScore >= cloudScore) ? localSt : cloudSt;
      Object.assign(st, useSt);

      // Always pull cfg from cloud
      if (d.cfg) Object.assign(cfg, d.cfg);

      // Write the winner back to localStorage so offline works
      try { localStorage.setItem('yanMath2', JSON.stringify({st, cfg})); } catch(e) {}
    } else {
      // No cloud data — use localStorage if it exists
      try {
        const localRaw = JSON.parse(localStorage.getItem('yanMath2') || '{}');
        if (localRaw.st)  Object.assign(st,  localRaw.st);
        if (localRaw.cfg) Object.assign(cfg, localRaw.cfg);
      } catch(e) {}
    }
    if (!window._friends) window._friends = [];
    if (!st.history)      st.history = [];
    if (!st.minigames)    st.minigames = {};
    const today = new Date().toDateString();
    if (st.dailyDate !== today) { st.dailyDone = false; st.dailyDate = today; }
  } catch(e) {
    console.warn('fbLoad error', e);
    // If Firebase fails, fall back to localStorage silently
    try {
      const localRaw = JSON.parse(localStorage.getItem('yanMath2') || '{}');
      if (localRaw.st)  Object.assign(st,  localRaw.st);
      if (localRaw.cfg) Object.assign(cfg, localRaw.cfg);
    } catch(e2) {}
  }
};


// ── SAVE USER DATA ──
let _saveTimer = null;
window.fbSave = function() {
  if (!window._fbUser) return;
  // Stamp the save time so devices can compare recency
  st._savedAt = Date.now();
  // Always sync localStorage immediately (for offline use)
  try { localStorage.setItem('yanMath2', JSON.stringify({st, cfg})); } catch(e) {}
  // Debounce cloud save
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(async () => {
    try {
      await setDoc(doc(db, 'users', window._fbUser.uid), {
        st, cfg,
        displayName:  window._displayName  || '',
        username:     window._username     || '',
        grade:        window._grade        || '',
        friends:      window._friends      || [],
        lastSaved:    Date.now(),
      }, { merge: true });
    } catch(e) { console.warn('fbSave error', e); }
  }, 800);
};


// ── USERNAME AVAILABILITY CHECK ──
let _unameCheckTimer = null;
window.scheduleUsernameCheck = function(immediate = false) {
  clearTimeout(_unameCheckTimer);
  _unameCheckTimer = setTimeout(async () => {
    const val   = document.getElementById('regUsername').value.trim();
    const badge = document.getElementById('regUsernameBadge');
    if (!badge) return;
    const clean = val.toLowerCase().replace(/[^\u05d0-\u05eaa-z0-9]/g, '');
    if (!clean || clean.length < 2) { badge.style.display = 'none'; return; }
    badge.style.cssText = 'display:inline-flex;padding:3px 10px;border-radius:99px;font-size:.78rem;font-weight:700;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.08);color:var(--txt2);margin-top:-8px;margin-bottom:10px;';
    badge.textContent = '⏳ בודק...';
    try {
      const snap = await getDocs(query(collection(db, 'users'), where('username', '==', clean)));
      if (snap.empty) {
        badge.style.cssText = 'display:inline-flex;padding:3px 10px;border-radius:99px;font-size:.78rem;font-weight:700;border:1px solid rgba(46,213,115,.4);background:rgba(46,213,115,.12);color:var(--a3);margin-top:-8px;margin-bottom:10px;';
        badge.textContent = '✅ פנוי!';
      } else {
        badge.style.cssText = 'display:inline-flex;padding:3px 10px;border-radius:99px;font-size:.78rem;font-weight:700;border:1px solid rgba(255,71,87,.4);background:rgba(255,71,87,.12);color:var(--a1);margin-top:-8px;margin-bottom:10px;';
        badge.textContent = '❌ תפוס — נסה שם אחר';
      }
    } catch(e) { badge.style.display = 'none'; }
  }, immediate ? 0 : 600);
};

// ── REGISTER ──
window.fbRegister = async function() {
  const username    = document.getElementById('regUsername').value.trim();
  const pass        = document.getElementById('regPass').value;
  const pass2       = document.getElementById('regPass2').value;
  const grade       = document.getElementById('regGrade').value;
  const displayName = document.getElementById('regDisplayName').value.trim();
  const gender      = window.getSelectedGender ? window.getSelectedGender('reg') : '';
  const contactEmail= document.getElementById('regEmail')?.value.trim() || '';
  const termsAccepted = document.getElementById('regTermsRow')?.classList.contains('accepted') || false;
  const err = document.getElementById('authErr');
  err.style.display = 'none';

  if (!displayName || displayName.length < 2) { err.textContent='שם תצוגה חייב להיות לפחות 2 תווים'; err.style.display='block'; return; }
  if (!username    || username.length < 2)    { err.textContent='שם משתמש חייב להיות לפחות 2 תווים'; err.style.display='block'; return; }
  if (!grade)  { err.textContent='בחר כיתה'; err.style.display='block'; return; }
  if (pass.length < 6) { err.textContent='סיסמה חייבת להיות לפחות 6 תווים'; err.style.display='block'; return; }
  if (pass !== pass2)  { err.textContent='הסיסמאות לא תואמות'; err.style.display='block'; return; }
  if (!termsAccepted)  {
    err.textContent='יש לאשר את תנאי השימוש כדי להמשיך'; err.style.display='block';
    document.getElementById('regTermsRow').style.animation='shk .4s';
    setTimeout(()=>document.getElementById('regTermsRow').style.animation='',400); return;
  }
  if (contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
    err.textContent='כתובת מייל לא תקינה'; err.style.display='block'; return;
  }

  const cleanU    = cleanUsername(username);
  const fakeEmail = contactEmail ? contactEmail.toLowerCase() : cleanU + '@brainspark.local';

  try {
    document.getElementById('authBtn').disabled = true;
    document.getElementById('authBtn').textContent = 'נרשם...';
    const cred = await createUserWithEmailAndPassword(auth, fakeEmail, pass);
    const userData = { displayName, username: cleanU, grade, createdAt: Date.now(), friends: [], st, cfg, termsAccepted: true };
    if (gender)       userData.gender       = gender;
    if (contactEmail) userData.contactEmail = contactEmail.toLowerCase();
    await setDoc(doc(db, 'users', cred.user.uid), userData, { merge: true });
    window._displayName = displayName;
    window._username    = cleanU;
    window._grade       = grade;
    window._friends     = [];
  } catch(e) {
    document.getElementById('authBtn').disabled = false;
    document.getElementById('authBtn').textContent = 'הרשמה ✅';
    err.textContent = e.code === 'auth/email-already-in-use' ? 'שם משתמש זה כבר תפוס, בחר אחר' : 'שגיאה: ' + e.message;
    err.style.display = 'block';
  }
};

// ── LOGIN ──
window.fbLogin = async function() {
  const username = document.getElementById('loginUsername').value.trim();
  const pass     = document.getElementById('loginPass').value;
  const err      = document.getElementById('loginErr');
  err.style.display = 'none';
  if (!username || !pass) { err.textContent='מלא שם משתמש וסיסמה'; err.style.display='block'; return; }
  try {
    document.getElementById('loginBtn').disabled = true;
    document.getElementById('loginBtn').textContent = 'נכנס...';
    const clean     = username.trim().toLowerCase().replace(/[^\u05d0-\u05eaa-z0-9]/g, '');
    const fakeEmail = clean + '@brainspark.local';
    await signInWithEmailAndPassword(auth, fakeEmail, pass);
  } catch(e) {
    document.getElementById('loginBtn').disabled = false;
    document.getElementById('loginBtn').textContent = '🚀 כניסה';
    err.textContent = 'שם משתמש או סיסמה שגויים';
    err.style.display = 'block';
  }
};

// ── LOGOUT ──
window.fbLogout = async function() {
  if (!confirm('להתנתק?')) return;
  await signOut(auth);
};

// ── SAVE USERNAME (setup screen) ──
window.fbSaveUsername = async function() {
  const val  = document.getElementById('setupUsername').value.trim();
  const err  = document.getElementById('setupErr');
  const btn  = document.getElementById('setupBtn');
  err.style.display = 'none';
  const clean = cleanUsername(val);
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
      await loadGradeConfig(window._grade);
      document.getElementById('home').classList.add('on');
      updateHome();
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
    showToast(`✅ קישור לאיפוס סיסמה נשלח ל-${contactEmail}`);
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
    showToast('✅ סיסמה עודכנה!');
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
  updateHome();
  showToast('✅ שם עודכן!');
};

// ── CHANGE GRADE ──
window.fbChangeGrade = async function() {
  const grade = document.getElementById('setGrade').value;
  if (!grade) return;
  if (!confirm(`לעבור לכיתה ${grade}? זה ישנה את רמת השאלות!`)) return;
  window._grade = grade;
  window.fbSave();
  await loadGradeConfig(grade);
  updateHome();
  showToast(`✅ עברת לכיתה ${grade}!`);
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
    if (gender) { update.gender = gender; window._gender = gender; }
    if (email)  { update.contactEmail = email.toLowerCase(); window._contactEmail = email.toLowerCase(); }
    if (Object.keys(update).length > 0)
      await updateDoc(doc(db, 'users', window._fbUser.uid), update);

    // Try updating Firebase Auth email too
    if (email && window._fbUser) {
      try {
        const { updateEmail } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js');
        await updateEmail(window._fbUser, email.toLowerCase());
      } catch(e) {
        if (e.code === 'auth/requires-recent-login') {
          const pass = prompt('כדי לעדכן מייל, הכנס סיסמה:');
          if (pass) {
            try {
              const { reauthenticateWithCredential: reauth, EmailAuthProvider: EAP, updateEmail: ue }
                = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js');
              const cred = EAP.credential(window._fbUser.email, pass);
              await reauth(window._fbUser, cred);
              await ue(window._fbUser, email.toLowerCase());
            } catch(e2) { console.log('reauth error:', e2.code, e2.message); }
          }
        } else { console.log('updateEmail error:', e.code, e.message); }
      }
    }
    showToast('✅ פרטים עודכנו!');
  } catch(e) {
    if (err) { err.textContent='שגיאה בשמירה'; err.style.display='block'; }
  }
};

// ── FRIENDS ──
window.fbSearchUser = async function() {
  const q   = cleanUsername(document.getElementById('friendSearch').value);
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
  showToast(`✅ ${name} נוסף לחברים!`);
  openFriends();
};

window.fbRemoveFriend = async function(uid, name) {
  if (!confirm(`להסיר את ${name} מהחברים?`)) return;
  window._friends = (window._friends||[]).filter(id => id !== uid);
  window.fbSave();
  showToast(`🗑️ ${name} הוסר מהחברים`);
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
