// ══ LEARN TOPICS & LESSONS ══

const LEARN_TOPICS = [
  // כיתה א-ב
  { id:'shapes2d_learn',    n:'צורות 2D',          icon:'🔷', desc:'זיהוי צורות דו-מימדיות' },
  { id:'measurement_learn', n:'מדידה',             icon:'📏', desc:'אורך, משקל, זמן, נפח' },
  // כיתה ב-ג
  { id:'mul',               n:'כפל',               icon:'✖️', desc:'לוח הכפל ורעיון הכפל' },
  { id:'division',          n:'חילוק',             icon:'➗', desc:'לחלק שווה בשווה' },
  { id:'symmetry_learn',    n:'סימטריה',           icon:'🔁', desc:'צירי סימטריה בצורות' },
  // כיתה ג-ד
  { id:'shapes',            n:'גיאומטריה',         icon:'📐', desc:'צורות אינטראקטיביות' },
  { id:'fractions',         n:'שברים',             icon:'½',  desc:'חלקים של שלם' },
  { id:'perimeter_learn',   n:'היקף',              icon:'📏', desc:'חישוב היקף צורות' },
  { id:'area_learn',        n:'שטח',               icon:'📐', desc:'חישוב שטח צורות' },
  { id:'angles_learn',      n:'זוויות',            icon:'📐', desc:'סוגי זוויות ומדידה' },
  { id:'shapes3d_learn',    n:'גופים 3D',          icon:'🧊', desc:'פנים, קצוות, קודקודים' },
  // כיתה ה-ו
  { id:'percentages_learn', n:'אחוזים',            icon:'💯', desc:'חלקים מתוך 100' },
  { id:'ratio_learn',       n:'יחס ופרופורציה',    icon:'⚖️', desc:'יחס בין כמויות' },
  { id:'coordinates_learn', n:'קואורדינטות',       icon:'🗺️', desc:'נקודות על מישור הקואורדינטות' },
  { id:'negative_learn',    n:'מספרים שליליים',    icon:'➖', desc:'מספרים מתחת לאפס' },
  { id:'statistics_learn',  n:'סטטיסטיקה',        icon:'📊', desc:'ממוצע, חציון, טווח' },
];

const LESSONS = {
  mul: {
    title:'✖️ כפל',
    html:`<div class="lesson-title">✖️ כפל</div>
      <div class="lsec"><h3>🤔 מה זה כפל?</h3><p>חיבור חוזר של אותו מספר!</p>
        <div class="lexample">3 × 4 = 4 + 4 + 4 = 12</div></div>
      <div class="lsec"><h3>📊 לוח הכפל עד 5</h3>
        <div class="lstep"><div class="lstepn">2</div><div>2,4,6,8,10,12...</div></div>
        <div class="lstep"><div class="lstepn">3</div><div>3,6,9,12,15,18...</div></div>
        <div class="lstep"><div class="lstepn">5</div><div>5,10,15,20,25...</div></div></div>
      <div class="lsec"><h3>💡 טיפ</h3><div class="lexample">סדר לא משנה! 3×4 = 4×3 = 12</div></div>`
  },
  division: {
    title:'➗ חילוק',
    html:`<div class="lesson-title">➗ חילוק</div>
      <div class="lsec"><h3>🤔 מה זה חילוק?</h3><p>לחלק דברים בשווה!</p>
        <div class="lexample">🍕🍕🍕🍕🍕🍕 ÷ 2 = 🍕🍕🍕</div></div>
      <div class="lsec"><h3>💡 הקשר לכפל</h3>
        <div class="lexample">3 × 4 = 12 ↔ 12 ÷ 4 = 3 ↔ 12 ÷ 3 = 4</div></div>
      <div class="lsec"><h3>🎯 דוגמאות</h3>
        <div class="lstep"><div class="lstepn">1</div><div>10 ÷ 2 = <strong>5</strong></div></div>
        <div class="lstep"><div class="lstepn">2</div><div>15 ÷ 3 = <strong>5</strong></div></div>
        <div class="lstep"><div class="lstepn">3</div><div>24 ÷ 6 = <strong>4</strong></div></div></div>`
  },
  shapes: {
    title:'📐 גיאומטריה',
    html:`<div class="lesson-title">📐 צורות</div>
      <div class="lsec"><h3>🔺 משולש</h3><p>3 צלעות, 3 פינות</p></div>
      <div class="lsec"><h3>⬜ ריבוע</h3><p>4 צלעות שוות, 4 זוויות ישרות</p></div>
      <div class="lsec"><h3>▭ מלבן</h3><p>4 צלעות, 2 זוגות</p></div>
      <div class="lsec"><h3>⭕ עיגול</h3><p>אין פינות!</p></div>
      <div class="lsec"><div class="lexample">מחומש=5, משושה=6, משבע=7</div></div>`
  },
  fractions: {
    title:'½ שברים',
    html:`<div class="lesson-title">½ שברים</div>
      <div class="lsec"><h3>🍕 מה זה שבר?</h3>
        <div class="lexample">1/2 = חצי | 1/4 = רבע | 3/4 = שלושה רבעים</div></div>
      <div class="lsec"><h3>🎯 חישוב</h3>
        <div class="lstep"><div class="lstepn">1</div><div>1/2 מ-8: 8÷2=<strong>4</strong></div></div>
        <div class="lstep"><div class="lstepn">2</div><div>3/4 מ-12: (12÷4)×3=<strong>9</strong></div></div>
        <div class="lstep"><div class="lstepn">3</div><div>2/5 מ-20: (20÷5)×2=<strong>8</strong></div></div></div>
      <div class="lsec"><h3>💡 נוסחה</h3><div class="lexample">n/d מ-total = (total÷d)×n</div></div>`
  },
  shapes2d_learn: {
    title:'🔷 צורות 2D',
    html:`<div class="lesson-title">🔷 צורות דו-מימדיות</div>
      <div class="lsec"><h3>📋 טבלת צורות</h3>
        <div class="lstep"><div class="lstepn">🔺</div><div>משולש: 3 צלעות, 3 פינות</div></div>
        <div class="lstep"><div class="lstepn">⬜</div><div>ריבוע: 4 צלעות שוות, 4 זוויות ישרות</div></div>
        <div class="lstep"><div class="lstepn">▭</div><div>מלבן: 4 צלעות, שני זוגות שווים</div></div>
        <div class="lstep"><div class="lstepn">⬟</div><div>מעוין: 4 צלעות שוות, לא בהכרח ישרות</div></div>
        <div class="lstep"><div class="lstepn">⬠</div><div>מחומש: 5 צלעות</div></div>
        <div class="lstep"><div class="lstepn">⬡</div><div>משושה: 6 צלעות</div></div></div>
      <div class="lsec"><h3>💡 טיפ</h3><div class="lexample">שם הצורה = מספר הצלעות! מש-3, ריב-4...</div></div>`
  },
  symmetry_learn: {
    title:'🔁 סימטריה',
    html:`<div class="lesson-title">🔁 סימטריה</div>
      <div class="lsec"><h3>🤔 מה זה ציר סימטריה?</h3>
        <p>קו שחוצה צורה לשני חצאים <strong>שווים ומשוקפים</strong></p></div>
      <div class="lsec"><h3>📏 מספר צירים</h3>
        <div class="lstep"><div class="lstepn">⬜</div><div>ריבוע: <strong>4 צירים</strong></div></div>
        <div class="lstep"><div class="lstepn">▭</div><div>מלבן: <strong>2 צירים</strong></div></div>
        <div class="lstep"><div class="lstepn">🔺</div><div>משולש שווה-צלעות: <strong>3 צירים</strong></div></div>
        <div class="lstep"><div class="lstepn">⭕</div><div>עיגול: <strong>אינסוף צירים</strong></div></div></div>`
  },
  measurement_learn: {
    title:'📏 מדידה',
    html:`<div class="lesson-title">📏 מדידה</div>
      <div class="lsec"><h3>📏 אורך</h3>
        <div class="lstep"><div class="lstepn">📐</div><div>10 מ"מ = 1 ס"מ</div></div>
        <div class="lstep"><div class="lstepn">📐</div><div>100 ס"מ = 1 מ'</div></div>
        <div class="lstep"><div class="lstepn">📐</div><div>1000 מ' = 1 ק"מ</div></div></div>
      <div class="lsec"><h3>⚖️ משקל</h3>
        <div class="lstep"><div class="lstepn">⚖️</div><div>1000 גרם = 1 ק"ג</div></div></div>
      <div class="lsec"><h3>⏰ זמן</h3>
        <div class="lstep"><div class="lstepn">⏰</div><div>60 שניות = 1 דקה</div></div>
        <div class="lstep"><div class="lstepn">⏰</div><div>60 דקות = 1 שעה</div></div>
        <div class="lstep"><div class="lstepn">⏰</div><div>24 שעות = 1 יום | 7 ימים = שבוע</div></div></div>
      <div class="lsec"><h3>🧪 נפח</h3>
        <div class="lstep"><div class="lstepn">🧪</div><div>1000 מ"ל = 1 ליטר</div></div></div>`
  },
  perimeter_learn: {
    title:'📏 היקף',
    html:`<div class="lesson-title">📏 היקף</div>
      <div class="lsec"><h3>🤔 מה זה היקף?</h3><p>סכום כל הצלעות — המרחק סביב הצורה!</p></div>
      <div class="lsec"><h3>🎯 נוסחאות</h3>
        <div class="lstep"><div class="lstepn">⬜</div><div>ריבוע: <strong>4 × צלע</strong></div></div>
        <div class="lstep"><div class="lstepn">▭</div><div>מלבן: <strong>2 × (אורך + רוחב)</strong></div></div>
        <div class="lstep"><div class="lstepn">🔺</div><div>משולש: <strong>א + ב + ג</strong></div></div>
        <div class="lstep"><div class="lstepn">⭕</div><div>עיגול: <strong>2 × π × r ≈ 2×3.14×r</strong></div></div></div>
      <div class="lsec"><h3>✏️ דוגמה</h3>
        <div class="lexample">מלבן 5×3: 2×(5+3) = 16 ס"מ</div></div>`
  },
  area_learn: {
    title:'📐 שטח',
    html:`<div class="lesson-title">📐 שטח</div>
      <div class="lsec"><h3>🤔 מה זה שטח?</h3><p>כמה מקום תופסת הצורה — ב-ס"מ²</p></div>
      <div class="lsec"><h3>🎯 נוסחאות</h3>
        <div class="lstep"><div class="lstepn">⬜</div><div>ריבוע: <strong>צלע²</strong></div></div>
        <div class="lstep"><div class="lstepn">▭</div><div>מלבן: <strong>אורך × רוחב</strong></div></div>
        <div class="lstep"><div class="lstepn">🔺</div><div>משולש: <strong>(בסיס × גובה) ÷ 2</strong></div></div>
        <div class="lstep"><div class="lstepn">⬟</div><div>מקבילית: <strong>בסיס × גובה</strong></div></div>
        <div class="lstep"><div class="lstepn">⭕</div><div>עיגול: <strong>π × r² ≈ 3.14×r²</strong></div></div></div>`
  },
  angles_learn: {
    title:'📐 זוויות',
    html:`<div class="lesson-title">📐 זוויות</div>
      <div class="lsec"><h3>📏 סוגי זוויות</h3>
        <div class="lstep"><div class="lstepn">🟢</div><div>חדה: פחות מ-<strong>90°</strong></div></div>
        <div class="lstep"><div class="lstepn">🔵</div><div>ישרה: בדיוק <strong>90°</strong></div></div>
        <div class="lstep"><div class="lstepn">🔴</div><div>קהה: יותר מ-<strong>90°</strong></div></div>
        <div class="lstep"><div class="lstepn">⭐</div><div>ישרה מלאה: <strong>180°</strong></div></div></div>
      <div class="lsec"><h3>🔺 סכומי זוויות</h3>
        <div class="lstep"><div class="lstepn">3</div><div>משולש: <strong>180°</strong></div></div>
        <div class="lstep"><div class="lstepn">4</div><div>מרובע: <strong>360°</strong></div></div>
        <div class="lstep"><div class="lstepn">n</div><div>n-צלע: <strong>(n−2)×180°</strong></div></div></div>`
  },
  shapes3d_learn: {
    title:'🧊 גופים 3D',
    html:`<div class="lesson-title">🧊 גופים תלת-מימדיים</div>
      <div class="lsec"><h3>📋 מושגים</h3>
        <div class="lstep"><div class="lstepn">P</div><div><strong>פנים</strong>: משטחים שטוחים</div></div>
        <div class="lstep"><div class="lstepn">K</div><div><strong>קצוות</strong>: שוליים בין פנים</div></div>
        <div class="lstep"><div class="lstepn">Q</div><div><strong>קודקודים</strong>: נקודות פגישה</div></div></div>
      <div class="lsec"><h3>📊 טבלה</h3>
        <div class="lstep"><div class="lstepn">🟦</div><div>קוביה: P=6, K=12, Q=8</div></div>
        <div class="lstep"><div class="lstepn">🔺</div><div>פירמידה ריבועית: P=5, K=8, Q=5</div></div>
        <div class="lstep"><div class="lstepn">⭕</div><div>גליל: P=3, K=2, Q=0</div></div>
        <div class="lstep"><div class="lstepn">🔔</div><div>חרוט: P=2, K=1, Q=1</div></div></div>
      <div class="lsec"><h3>💡 נוסחת אוילר</h3><div class="lexample">P + Q − K = 2</div></div>`
  },
  coordinates_learn: {
    title:'🗺️ קואורדינטות',
    html:`<div class="lesson-title">🗺️ קואורדינטות</div>
      <div class="lsec"><h3>📍 כיצד מציינים נקודה?</h3>
        <div class="lexample">(X, Y) — תמיד X ראשון, Y שני!<br>דוגמה: (3, 4) → 3 ימינה, 4 למעלה</div></div>
      <div class="lsec"><h3>🗺️ 4 הרביעים</h3>
        <div class="lstep"><div class="lstepn">1</div><div>ימין-מעלה: X חיובי, Y חיובי (+,+)</div></div>
        <div class="lstep"><div class="lstepn">2</div><div>שמאל-מעלה: X שלילי, Y חיובי (−,+)</div></div>
        <div class="lstep"><div class="lstepn">3</div><div>שמאל-מטה: X שלילי, Y שלילי (−,−)</div></div>
        <div class="lstep"><div class="lstepn">4</div><div>ימין-מטה: X חיובי, Y שלילי (+,−)</div></div></div>`
  },
  percentages_learn: {
    title:'💯 אחוזים',
    html:`<div class="lesson-title">💯 אחוזים</div>
      <div class="lsec"><h3>🤔 מה זה אחוז?</h3>
        <p>אחוז = חלק מתוך 100. הסימן: %</p>
        <div class="lexample">50% = 50/100 = מחצית | 25% = ¼ | 10% = 1/10</div></div>
      <div class="lsec"><h3>🎯 חישוב אחוזים</h3>
        <div class="lstep"><div class="lstepn">1</div><div>20% מ-80: 80×20÷100 = <strong>16</strong></div></div>
        <div class="lstep"><div class="lstepn">2</div><div>25% מ-120: 120÷4 = <strong>30</strong></div></div>
        <div class="lstep"><div class="lstepn">3</div><div>10% מ-350: 350÷10 = <strong>35</strong></div></div></div>
      <div class="lsec"><h3>💰 הנחה</h3>
        <div class="lexample">מחיר 200, הנחה 20%: 200×0.8 = 160 ש"ח</div></div>
      <div class="lsec"><h3>💡 קיצורים שימושיים</h3>
        <div class="lstep"><div class="lstepn">10%</div><div>חלק ב-10</div></div>
        <div class="lstep"><div class="lstepn">25%</div><div>חלק ב-4</div></div>
        <div class="lstep"><div class="lstepn">50%</div><div>חלק ב-2</div></div></div>`
  },
  ratio_learn: {
    title:'⚖️ יחס ופרופורציה',
    html:`<div class="lesson-title">⚖️ יחס ופרופורציה</div>
      <div class="lsec"><h3>🤔 מה זה יחס?</h3>
        <p>השוואה בין שתי כמויות באמצעות חלוקה</p>
        <div class="lexample">יחס 3:2 אומר שלכל 3 מהראשון יש 2 מהשני</div></div>
      <div class="lsec"><h3>🎯 חישוב יחס</h3>
        <div class="lstep"><div class="lstepn">1</div><div>יחס בנות:בנים = 2:3, יש 50 ילדים</div></div>
        <div class="lstep"><div class="lstepn">2</div><div>5 חלקים: בנות = 50×2/5 = <strong>20</strong></div></div></div>
      <div class="lsec"><h3>🗺️ סולם מפה</h3>
        <div class="lexample">סולם 1:1000 → 1 ס"מ במפה = 1000 ס"מ (10 מ') במציאות</div></div>`
  },
  negative_learn: {
    title:'➖ מספרים שליליים',
    html:`<div class="lesson-title">➖ מספרים שליליים</div>
      <div class="lsec"><h3>🌡️ דוגמאות מהחיים</h3>
        <div class="lexample">טמפרטורה: −5° = 5 מתחת לאפס<br>קומה תת-קרקעית: −1, −2<br>חוב: −50 ש"ח</div></div>
      <div class="lsec"><h3>➕ חיבור</h3>
        <div class="lstep"><div class="lstepn">1</div><div>(−3) + 5 = <strong>2</strong> (קרב לאפס ועבר)</div></div>
        <div class="lstep"><div class="lstepn">2</div><div>(−4) + (−2) = <strong>−6</strong> (יותר שלילי)</div></div></div>
      <div class="lsec"><h3>✖️ כפל</h3>
        <div class="lstep"><div class="lstepn">+×+</div><div>חיובי × חיובי = <strong>חיובי</strong></div></div>
        <div class="lstep"><div class="lstepn">−×+</div><div>שלילי × חיובי = <strong>שלילי</strong></div></div>
        <div class="lstep"><div class="lstepn">−×−</div><div>שלילי × שלילי = <strong>חיובי!</strong></div></div></div>`
  },
  statistics_learn: {
    title:'📊 סטטיסטיקה',
    html:`<div class="lesson-title">📊 סטטיסטיקה</div>
      <div class="lsec"><h3>📋 מדדים סטטיסטיים</h3>
        <div class="lstep"><div class="lstepn">📊</div><div><strong>ממוצע</strong>: סכום ÷ כמות</div></div>
        <div class="lstep"><div class="lstepn">📊</div><div><strong>חציון</strong>: האמצעי לאחר מיון</div></div>
        <div class="lstep"><div class="lstepn">📊</div><div><strong>טווח</strong>: מקסימום פחות מינימום</div></div>
        <div class="lstep"><div class="lstepn">📊</div><div><strong>שכיח</strong>: המספר שמופיע הכי הרבה</div></div></div>
      <div class="lsec"><h3>✏️ דוגמה</h3>
        <div class="lexample">נתונים: 3, 7, 7, 10, 13<br>ממוצע: (3+7+7+10+13)÷5 = 8<br>חציון: 7 (האמצעי)<br>טווח: 13−3 = 10<br>שכיח: 7</div></div>`
  },
};

function openLearn() {
  const c=document.getElementById('learnTopics');
  c.innerHTML='';
  const gc=window.GRADE_CONFIG;
  const available=gc?.availableLearnTopics||LEARN_TOPICS.map(t=>t.id);
  LEARN_TOPICS.filter(t=>available.includes(t.id)).forEach(t=>{
    const done=st.learnedTopics.includes(t.id);
    const el=document.createElement('div');
    el.className='ltopic'+(done?' ltdone':'');
    el.innerHTML=`<div class="lt-icon">${t.icon}</div><div class="lt-info"><div class="lt-name">${t.n}</div><div class="lt-desc">${t.desc}</div></div><span class="lt-badge ${done?'ltdone-b':'ltnew'}">${done?'✅ למדת':'🆕 חדש'}</span>`;
    el.onclick=()=>openLesson(t.id);
    c.appendChild(el);
  });
  show('learn-scr');
}

function openLesson(id) {
  const lesson=LESSONS[id];
  if(!lesson) return;
  const c=document.getElementById('lessonContent');
  c.innerHTML=lesson.html;
  const btn=document.createElement('button');
  btn.className='lgo';
  btn.textContent='✅ הבנתי! פתח לתרגול';
  btn.onclick=()=>{
    if(!st.learnedTopics.includes(id)){
      st.learnedTopics.push(id);
      save();addPts(15);showPtsPop(15);
      showToast(`🎉 +15! ${lesson.title} נפתח!`);
    }
    show('home');
    setTimeout(updateHome,100);
  };
  c.appendChild(btn);
  show('lesson-scr');
}
