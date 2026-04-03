// ══ LEARN TOPICS & LESSONS ══

const LEARN_TOPICS = [
  { id: 'division',         n: 'חילוק',          icon: '➗', desc: 'לחלק שווה בשווה' },
  { id: 'shapes',           n: 'גיאומטריה',       icon: '📐', desc: 'צורות אינטראקטיביות' },
  { id: 'fractions',        n: 'שברים',           icon: '½',  desc: 'חלקים של שלם' },
  { id: 'measurement',      n: 'מדידה',           icon: '📏', desc: 'אורך, משקל, זמן, נפח' },
  // ── New geometry learn topics ──
  { id: 'shapes2d_learn',   n: 'צורות 2D',        icon: '🔷', desc: 'זיהוי צורות דו-מימדיות' },
  { id: 'symmetry_learn',   n: 'סימטריה',         icon: '🔁', desc: 'צירי סימטריה בצורות' },
  { id: 'perimeter_learn',  n: 'היקף',            icon: '📏', desc: 'חישוב היקף צורות' },
  { id: 'area_learn',       n: 'שטח',             icon: '📐', desc: 'חישוב שטח צורות' },
  { id: 'angles_learn',     n: 'זוויות',          icon: '📐', desc: 'סוגי זוויות ומדידה' },
  { id: 'shapes3d_learn',   n: 'גופים 3D',        icon: '🧊', desc: 'פנים, קצוות, קודקודים' },
  { id: 'coordinates_learn',n: 'קואורדינטות',     icon: '🗺️', desc: 'נקודות על מישור הקואורדינטות' },
  { id: 'measurement_learn',n: 'מדידה',           icon: '📏', desc: 'יחידות מידה והמרות' },
];

const LESSONS = {
  division: {
    title: '➗ חילוק',
    html: `
      <div class="lesson-title">➗ חילוק!</div>
      <div class="lsec"><h3>🤔 מה זה חילוק?</h3><p>לחלק דברים בשווה!</p>
        <div class="lexample">🍕🍕🍕🍕🍕🍕 ÷ 2 = 🍕🍕🍕</div>
      </div>
      <div class="lsec"><h3>💡 הקשר לכפל</h3>
        <div class="lexample">3 × 4 = 12 ↔ 12 ÷ 4 = 3</div>
      </div>
      <div class="lsec"><h3>🎯 דוגמאות</h3>
        <div class="lstep"><div class="lstepn">1</div><div>10 ÷ 2 = <strong>5</strong></div></div>
        <div class="lstep"><div class="lstepn">2</div><div>15 ÷ 3 = <strong>5</strong></div></div>
        <div class="lstep"><div class="lstepn">3</div><div>24 ÷ 6 = <strong>4</strong></div></div>
      </div>`
  },
  shapes: {
    title: '📐 גיאומטריה',
    html: `
      <div class="lesson-title">📐 צורות</div>
      <div class="lsec"><h3>🔺 משולש</h3><p>3 צלעות, 3 פינות</p></div>
      <div class="lsec"><h3>⬜ ריבוע</h3><p>4 צלעות שוות</p></div>
      <div class="lsec"><h3>▭ מלבן</h3><p>4 צלעות, 2 זוגות</p></div>
      <div class="lsec"><h3>⭕ עיגול</h3><p>אין פינות!</p></div>
      <div class="lsec"><div class="lexample rtl">מחומש=5, משושה=6</div></div>`
  },
  fractions: {
    title: '½ שברים',
    html: `
      <div class="lesson-title">½ שברים</div>
      <div class="lsec"><h3>🍕 מה זה שבר?</h3>
        <div class="lexample">1/2 = חצי | 1/4 = רבע</div>
      </div>
      <div class="lsec"><h3>🎯 חישוב</h3>
        <div class="lstep"><div class="lstepn">1</div><div>1/2 מ-8: 8÷2=<strong>4</strong></div></div>
        <div class="lstep"><div class="lstepn">2</div><div>3/4 מ-12: (12÷4)×3=<strong>9</strong></div></div>
      </div>`
  },
  measurement: {
    title: '📏 מדידה',
    html: `
      <div class="lesson-title">📏 מדידה</div>
      <div class="lsec"><h3>📏 אורך</h3>
        <div class="lstep"><div class="lstepn">📐</div><div>1מ'=100ס"מ | 1ק"מ=1000מ'</div></div>
      </div>
      <div class="lsec"><h3>⚖️ משקל</h3>
        <div class="lstep"><div class="lstepn">⚖️</div><div>1ק"ג=1000גרם</div></div>
      </div>
      <div class="lsec"><h3>⏰ זמן</h3>
        <div class="lstep"><div class="lstepn">⏰</div><div>שעה=60דקות | דקה=60שניות</div></div>
      </div>`
  },

  // ══ NEW GEOMETRY LESSONS ══

  shapes2d_learn: {
    title: '🔷 צורות 2D',
    html: `
      <div class="lesson-title">🔷 צורות דו-מימדיות</div>
      <div class="lsec"><h3>🔺 משולש</h3><p>3 צלעות, 3 פינות (זוויות)</p></div>
      <div class="lsec"><h3>⬜ ריבוע</h3><p>4 צלעות שוות, 4 זוויות ישרות</p></div>
      <div class="lsec"><h3>▭ מלבן</h3><p>4 צלעות, 2 זוגות של צלעות שוות</p></div>
      <div class="lsec"><h3>⭕ עיגול</h3><p>אין פינות, אין צלעות ישרות</p></div>
      <div class="lsec"><h3>⬠ מחומש</h3><p>5 צלעות, 5 פינות</p></div>
      <div class="lsec"><h3>⬡ משושה</h3><p>6 צלעות, 6 פינות</p></div>
      <div class="lsec"><h3>💡 טיפ</h3>
        <div class="lexample">שם הצורה = מספר הצלעות!<br>מחומש=5, משושה=6, משבע=7</div>
      </div>`
  },

  symmetry_learn: {
    title: '🔁 סימטריה',
    html: `
      <div class="lesson-title">🔁 סימטריה</div>
      <div class="lsec"><h3>🤔 מה זה ציר סימטריה?</h3>
        <p>קו שחוצה צורה לשני חצאים <strong>שווים ומשוקפים</strong></p>
      </div>
      <div class="lsec"><h3>📏 דוגמאות</h3>
        <div class="lstep"><div class="lstepn">⬜</div><div>ריבוע: <strong>4 צירים</strong></div></div>
        <div class="lstep"><div class="lstepn">▭</div><div>מלבן: <strong>2 צירים</strong></div></div>
        <div class="lstep"><div class="lstepn">🔺</div><div>משולש שווה-צלעות: <strong>3 צירים</strong></div></div>
        <div class="lstep"><div class="lstepn">⭕</div><div>עיגול: <strong>אינסוף צירים</strong></div></div>
      </div>
      <div class="lsec"><h3>💡 כיצד לבדוק</h3>
        <div class="lexample">קפל את הצורה — אם שני הצדדים זהים, מצאת ציר!</div>
      </div>`
  },

  perimeter_learn: {
    title: '📏 היקף',
    html: `
      <div class="lesson-title">📏 היקף</div>
      <div class="lsec"><h3>🤔 מה זה היקף?</h3>
        <p>סכום כל הצלעות של הצורה — המרחק סביב הצורה!</p>
      </div>
      <div class="lsec"><h3>🎯 נוסחאות</h3>
        <div class="lstep"><div class="lstepn">⬜</div><div>ריבוע: <strong>4 × צלע</strong></div></div>
        <div class="lstep"><div class="lstepn">▭</div><div>מלבן: <strong>2 × (אורך + רוחב)</strong></div></div>
        <div class="lstep"><div class="lstepn">🔺</div><div>משולש: <strong>צלע₁ + צלע₂ + צלע₃</strong></div></div>
        <div class="lstep"><div class="lstepn">⭕</div><div>עיגול: <strong>2 × π × r</strong> (כיתה ה+)</div></div>
      </div>
      <div class="lsec"><h3>✏️ דוגמה</h3>
        <div class="lexample">מלבן 5×3: 2×(5+3) = 2×8 = <strong>16 ס"מ</strong></div>
      </div>`
  },

  area_learn: {
    title: '📐 שטח',
    html: `
      <div class="lesson-title">📐 שטח</div>
      <div class="lsec"><h3>🤔 מה זה שטח?</h3>
        <p>כמה מקום תופסת הצורה — נמדד ב-ס"מ² (סנטימטר רבוע)</p>
      </div>
      <div class="lsec"><h3>🎯 נוסחאות</h3>
        <div class="lstep"><div class="lstepn">⬜</div><div>ריבוע: <strong>צלע × צלע</strong></div></div>
        <div class="lstep"><div class="lstepn">▭</div><div>מלבן: <strong>אורך × רוחב</strong></div></div>
        <div class="lstep"><div class="lstepn">🔺</div><div>משולש: <strong>(בסיס × גובה) ÷ 2</strong></div></div>
        <div class="lstep"><div class="lstepn">⬟</div><div>מקבילית: <strong>בסיס × גובה</strong></div></div>
        <div class="lstep"><div class="lstepn">⭕</div><div>עיגול: <strong>π × r²</strong> (π≈3.14)</div></div>
      </div>
      <div class="lsec"><h3>✏️ דוגמה</h3>
        <div class="lexample">מלבן 6×4: 6×4 = <strong>24 ס"מ²</strong></div>
      </div>`
  },

  angles_learn: {
    title: '📐 זוויות',
    html: `
      <div class="lesson-title">📐 זוויות</div>
      <div class="lsec"><h3>🤔 מה זה זווית?</h3>
        <p>זווית נוצרת בין שני קווים שנפגשים. נמדדת במעלות (°)</p>
      </div>
      <div class="lsec"><h3>📏 סוגי זוויות</h3>
        <div class="lstep"><div class="lstepn">🟢</div><div>חדה: <strong>פחות מ-90°</strong></div></div>
        <div class="lstep"><div class="lstepn">🔵</div><div>ישרה: <strong>בדיוק 90°</strong> (כמו פינת ריבוע)</div></div>
        <div class="lstep"><div class="lstepn">🔴</div><div>קהה: <strong>יותר מ-90°</strong></div></div>
        <div class="lstep"><div class="lstepn">⭐</div><div>ישרה (straight): <strong>180°</strong></div></div>
      </div>
      <div class="lsec"><h3>🔺 סכומי זוויות</h3>
        <div class="lstep"><div class="lstepn">3</div><div>משולש: <strong>180° סכום</strong></div></div>
        <div class="lstep"><div class="lstepn">4</div><div>מרובע: <strong>360° סכום</strong></div></div>
        <div class="lstep"><div class="lstepn">n</div><div>n-צלע: <strong>(n-2)×180°</strong></div></div>
      </div>`
  },

  shapes3d_learn: {
    title: '🧊 גופים 3D',
    html: `
      <div class="lesson-title">🧊 גופים תלת-מימדיים</div>
      <div class="lsec"><h3>🤔 מושגים בסיסיים</h3>
        <div class="lstep"><div class="lstepn">P</div><div><strong>פנים (Faces)</strong>: משטחים שטוחים</div></div>
        <div class="lstep"><div class="lstepn">K</div><div><strong>קצוות (Edges)</strong>: הצלעות שבין פנים</div></div>
        <div class="lstep"><div class="lstepn">Q</div><div><strong>קודקודים (Vertices)</strong>: נקודות פגישה</div></div>
      </div>
      <div class="lsec"><h3>📊 טבלה</h3>
        <div class="lstep"><div class="lstepn">🟦</div><div>קוביה: פנים=<strong>6</strong>, קצוות=<strong>12</strong>, קודקודים=<strong>8</strong></div></div>
        <div class="lstep"><div class="lstepn">🔺</div><div>פירמידה ריבועית: פנים=<strong>5</strong>, קצוות=<strong>8</strong>, קודקודים=<strong>5</strong></div></div>
        <div class="lstep"><div class="lstepn">⭕</div><div>גליל: פנים=<strong>3</strong>, קצוות=<strong>2</strong>, קודקודים=<strong>0</strong></div></div>
        <div class="lstep"><div class="lstepn">🔔</div><div>חרוט: פנים=<strong>2</strong>, קצוות=<strong>1</strong>, קודקודים=<strong>1</strong></div></div>
        <div class="lstep"><div class="lstepn">⚽</div><div>כדור: פנים=<strong>1</strong>, קצוות=<strong>0</strong>, קודקודים=<strong>0</strong></div></div>
      </div>
      <div class="lsec"><h3>💡 נוסחת אוילר</h3>
        <div class="lexample">פנים + קודקודים − קצוות = 2</div>
      </div>`
  },

  coordinates_learn: {
    title: '🗺️ קואורדינטות',
    html: `
      <div class="lesson-title">🗺️ קואורדינטות</div>
      <div class="lsec"><h3>🤔 מהו מישור הקואורדינטות?</h3>
        <p>רשת עם ציר X (אופקי) וציר Y (אנכי) שחוצים אחד את השני</p>
      </div>
      <div class="lsec"><h3>📍 כיצד מציינים נקודה?</h3>
        <div class="lexample">(X, Y) — תמיד X ראשון, Y שני!<br>דוגמה: (3, 4) → 3 ימינה, 4 למעלה</div>
      </div>
      <div class="lsec"><h3>🗺️ 4 הרביעים (כיתה ו)</h3>
        <div class="lstep"><div class="lstepn">1</div><div>רביע 1: X חיובי, Y חיובי (+,+)</div></div>
        <div class="lstep"><div class="lstepn">2</div><div>רביע 2: X שלילי, Y חיובי (−,+)</div></div>
        <div class="lstep"><div class="lstepn">3</div><div>רביע 3: X שלילי, Y שלילי (−,−)</div></div>
        <div class="lstep"><div class="lstepn">4</div><div>רביע 4: X חיובי, Y שלילי (+,−)</div></div>
      </div>
      <div class="lsec"><h3>💡 טיפ</h3>
        <div class="lexample">תמיד עובר על ציר X קודם (ימינה/שמאלה), אחר כך Y (למעלה/למטה)!</div>
      </div>`
  },

  measurement_learn: {
    title: '📏 מדידה',
    html: `
      <div class="lesson-title">📏 מדידה</div>
      <div class="lsec"><h3>📏 אורך</h3>
        <div class="lstep"><div class="lstepn">📐</div><div>10 מ"מ = 1 ס"מ</div></div>
        <div class="lstep"><div class="lstepn">📐</div><div>100 ס"מ = 1 מ'</div></div>
        <div class="lstep"><div class="lstepn">📐</div><div>1000 מ' = 1 ק"מ</div></div>
      </div>
      <div class="lsec"><h3>⚖️ משקל</h3>
        <div class="lstep"><div class="lstepn">⚖️</div><div>1000 גרם = 1 ק"ג</div></div>
        <div class="lstep"><div class="lstepn">⚖️</div><div>1000 ק"ג = 1 טון</div></div>
      </div>
      <div class="lsec"><h3>⏰ זמן</h3>
        <div class="lstep"><div class="lstepn">⏰</div><div>60 שניות = 1 דקה</div></div>
        <div class="lstep"><div class="lstepn">⏰</div><div>60 דקות = 1 שעה</div></div>
        <div class="lstep"><div class="lstepn">⏰</div><div>24 שעות = 1 יום</div></div>
        <div class="lstep"><div class="lstepn">⏰</div><div>7 ימים = שבוע | 12 חודשים = שנה</div></div>
      </div>
      <div class="lsec"><h3>🧪 נפח</h3>
        <div class="lstep"><div class="lstepn">🧪</div><div>1000 מ"ל = 1 ליטר</div></div>
      </div>`
  },
};

function openLearn() {
  const c = document.getElementById('learnTopics');
  c.innerHTML = '';
  // Only show topics available for current grade
  const gc = window.GRADE_CONFIG;
  const available = gc?.availableLearnTopics || LEARN_TOPICS.map(t=>t.id);
  const topicsToShow = LEARN_TOPICS.filter(t => available.includes(t.id));

  topicsToShow.forEach(t => {
    const done = st.learnedTopics.includes(t.id);
    const el = document.createElement('div');
    el.className = 'ltopic' + (done ? ' ltdone' : '');
    el.innerHTML = `<div class="lt-icon">${t.icon}</div><div class="lt-info"><div class="lt-name">${t.n}</div><div class="lt-desc">${t.desc}</div></div><span class="lt-badge ${done?'ltdone-b':'ltnew'}">${done?'✅ למדת':'🆕 חדש'}</span>`;
    el.onclick = () => openLesson(t.id);
    c.appendChild(el);
  });
  show('learn-scr');
}

function openLesson(id) {
  const lesson = LESSONS[id];
  if (!lesson) return;
  const c = document.getElementById('lessonContent');
  c.innerHTML = lesson.html;
  const btn = document.createElement('button');
  btn.className = 'lgo';
  btn.textContent = '✅ הבנתי! פתח לתרגול';
  btn.onclick = () => {
    if (!st.learnedTopics.includes(id)) {
      st.learnedTopics.push(id);
      save();
      addPts(15);
      showPtsPop(15);
      showToast(`🎉 +15! ${lesson.title} נפתח!`);
    }
    show('home');
    setTimeout(updateHome, 100);
  };
  c.appendChild(btn);
  show('lesson-scr');
}
