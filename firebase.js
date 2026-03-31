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
      if (d.gender)        window._gender        = d.gender;
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
      Object.assign(st, useSt);
      if (d.cfg) Object.assign(cfg, d.cfg);
      if (!st.minigames) st.minigames = {};
      try { localStorage.setItem('yanMath2', JSON.stringify({st, cfg})); } catch(e) {}
    } else {
      console.log('[BrainSpark] NO cloud doc — using localStorage only');
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
    console.log('[BrainSpark] fbLoad DONE. st.score=', st.score, 'grade=', window._grade);
  } catch(e) {
    console.error('[BrainSpark] fbLoad ERROR:', e.code, e.message);
    try {
      const localRaw = JSON.parse(localStorage.getItem('yanMath2') || '{}');
      if (localRaw.st)  Object.assign(st,  localRaw.st);
      if (localRaw.cfg) Object.assign(cfg, localRaw.cfg);
    } catch(e2) {}
  }
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
};window.fbSave = function() {
  if (!window._fbUser) {
    console.log('[BrainSpark] fbSave skipped — not logged in');
    return;
  }
  st._savedAt = Date.now();
  try { localStorage.setItem('yanMath2', JSON.stringify({st, cfg})); } catch(e) {}
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(async () => {
    try {
      console.log('[BrainSpark] fbSave START, uid=', window._fbUser.uid, 'score=', st.score);
      await setDoc(doc(db, 'users', window._fbUser.uid), {
        st, cfg,
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

// ── USERNAMEFIG & AUTH ══
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
      if (d.gender)        window._gender        = d.gender;
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
      Object.assign(st, useSt);
      if (d.cfg) Object.assign(cfg, d.cfg);
      if (!st.minigames) st.minigames = {};
      try { localStorage.setItem('yanMath2', JSON.stringify({st, cfg})); } catch(e) {}
    } else {
      console.log('[BrainSpark] NO cloud doc — using localStorage only');
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
    console.log('[BrainSpark] fbLoad DONE. st.score=', st.score, 'grade=', window._grade);
  } catch(e) {
    console.error('[BrainSpark] fbLoad ERROR:', e.code, e.message);
    try {
      const localRaw = JSON.parse(localStorage.getItem('yanMath2') || '{}');
      if (localRaw.st)  Object.assign(st,  localRaw.st);
      if (localRaw.cfg) Object.assign(cfg, localRaw.cfg);
    } catch(e2) {}
  }
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
