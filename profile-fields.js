// ══════════════════════════════════════════════
// profile-fields.js
// Handles: gender selection, email (optional), terms & conditions
// Used in: registration form + parent settings
// ══════════════════════════════════════════════

// ── Gender options ──────────────────────────────
window.GENDER_OPTIONS = [
  { value: 'boy',   label: 'ילד',           emoji: '👦' },
  { value: 'girl',  label: 'ילדה',          emoji: '👧' },
  { value: 'other', label: 'לא רוצה להגיד', emoji: '🌟' },
];

// ── Render gender picker (returns HTML string) ──
window.renderGenderPicker = function(idPrefix, selectedValue = '') {
  return `
    <div class="gender-picker" id="${idPrefix}GenderPicker">
      ${window.GENDER_OPTIONS.map(opt => `
        <button type="button"
          class="gender-btn${selectedValue === opt.value ? ' selected' : ''}"
          data-value="${opt.value}"
          onclick="selectGender('${idPrefix}', '${opt.value}')"
          aria-pressed="${selectedValue === opt.value}">
          <span class="gender-emoji">${opt.emoji}</span>
          <span class="gender-label">${opt.label}</span>
        </button>
      `).join('')}
    </div>
  `;
};

// ── Select a gender in a picker ─────────────────
window.selectGender = function(idPrefix, value) {
  const picker = document.getElementById(idPrefix + 'GenderPicker');
  if (!picker) return;
  picker.querySelectorAll('.gender-btn').forEach(btn => {
    const isSelected = btn.dataset.value === value;
    btn.classList.toggle('selected', isSelected);
    btn.setAttribute('aria-pressed', isSelected);
  });
};

// ── Get selected gender from a picker ───────────
window.getSelectedGender = function(idPrefix) {
  const picker = document.getElementById(idPrefix + 'GenderPicker');
  if (!picker) return '';
  const sel = picker.querySelector('.gender-btn.selected');
  return sel ? sel.dataset.value : '';
};

// ── Save profile fields to Firestore ────────────
window.fbSaveProfileFields = async function(uid, gender, email, termsAccepted) {
  try {
    const { db, doc, updateDoc } = window._fb;
    const update = {};
    if (gender)        update.gender       = gender;
    if (email)         update.contactEmail = email.toLowerCase().trim();
    if (termsAccepted) update.termsAccepted = true;
    if (Object.keys(update).length > 0) {
      await updateDoc(doc(db, 'users', uid), update);
    }
  } catch (e) {
    console.warn('fbSaveProfileFields error', e);
  }
};

// ── Load profile fields from user data ──────────
window.loadProfileFieldsIntoSettings = function(userData) {
  // Gender
  const gender = userData?.gender || '';
  if (gender) window.selectGender('set', gender);

  // Email
  const emailEl = document.getElementById('setContactEmail');
  if (emailEl && userData?.contactEmail) {
    emailEl.value = userData.contactEmail;
  }
};

// ── Save profile fields from settings panel ──────
window.fbSaveProfileSettings = async function() {
  if (!window._fbUser) return;
  const gender = window.getSelectedGender('set');
  const emailEl = document.getElementById('setContactEmail');
  const email = emailEl ? emailEl.value.trim() : '';
  const err = document.getElementById('profileFieldsErr');
  if (err) err.style.display = 'none';

  // Basic email validation if provided
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    if (err) { err.textContent = 'כתובת מייל לא תקינה'; err.style.display = 'block'; }
    return;
  }

  try {
    await window.fbSaveProfileFields(window._fbUser.uid, gender, email, null);
    showToast('✅ פרטים עודכנו!');
  } catch(e) {
    if (err) { err.textContent = 'שגיאה בשמירה'; err.style.display = 'block'; }
  }
};