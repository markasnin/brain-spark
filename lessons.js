// ══ LEARN TOPICS & LESSONS ══
const LEARN_TOPICS = [
  // כיתה א
  { id:'shapes2d_learn',    n:'צורות 2D',          icon:'🔷', desc:'משולש, ריבוע, מלבן, עיגול' },
  { id:'measurement_learn', n:'מדידה',             icon:'📏', desc:'אורך בס"מ, זמן בשעות' },
  // כיתה ב
  { id:'mul',               n:'כפל',               icon:'✖️', desc:'לוח הכפל ומשמעות הכפל' },
  // כיתה ג
  { id:'division',          n:'חילוק',             icon:'➗', desc:'לחלק שווה בשווה' },
  { id:'shapes',            n:'גיאומטריה',         icon:'📐', desc:'צורות וזוויות' },
  { id:'angles_learn',      n:'זוויות',            icon:'📐', desc:'חדה, ישרה, קהה' },
  // כיתה ד
  { id:'fractions',         n:'שברים',             icon:'½',  desc:'חלקים של שלם וכמות' },
  { id:'perimeter_learn',   n:'היקף',              icon:'📏', desc:'סכום כל הצלעות' },
  { id:'area_learn',        n:'שטח',               icon:'📐', desc:'שטח צורות' },
  { id:'shapes3d_learn',    n:'גופים',             icon:'🧊', desc:'תיבות, פירמידות, גלילים' },
  // כיתה ה
  { id:'percentages_learn', n:'אחוזים',            icon:'💯', desc:'חלקים מתוך 100' },
  // כיתה ו
  { id:'ratio_learn',       n:'יחס',               icon:'⚖️', desc:'חלוקת כמות לפי יחס' },
  { id:'negative_learn',    n:'מספרים שלמים',      icon:'➖', desc:'מספרים שליליים על ישר המספרים' },
  { id:'statistics_learn',  n:'סטטיסטיקה',        icon:'📊', desc:'ממוצע, חציון, שכיח, טווח' },
  { id:'coordinates_learn', n:'קואורדינטות',       icon:'🗺️', desc:'נקודות על מישור הקואורדינטות' },
];

const LESSONS = {
  mul:{title:'✖️ כפל',html:`<div class="lesson-title">✖️ כפל</div>
    <div class="lsec"><h3>🤔 מה זה כפל?</h3><p>חיבור חוזר של אותו מספר!</p>
      <div class="lexample">3 × 4 = 4 + 4 + 4 = 12</div></div>
    <div class="lsec"><h3>📊 לוח הכפל עד 5</h3>
      <div class="lstep"><div class="lstepn">×2</div><div>2,4,6,8,10,12...</div></div>
      <div class="lstep"><div class="lstepn">×3</div><div>3,6,9,12,15,18...</div></div>
      <div class="lstep"><div class="lstepn">×5</div><div>5,10,15,20,25...</div></div></div>
    <div class="lsec"><h3>💡 כלל</h3><div class="lexample">סדר לא משנה! 3×4 = 4×3 = 12</div></div>`},
  division:{title:'➗ חילוק',html:`<div class="lesson-title">➗ חילוק</div>
    <div class="lsec"><h3>🤔 מה זה חילוק?</h3><p>לחלק דברים בשווה!</p>
      <div class="lexample">🍕🍕🍕🍕🍕🍕 ÷ 2 = 🍕🍕🍕</div></div>
    <div class="lsec"><h3>💡 הקשר לכפל</h3>
      <div class="lexample">3 × 4 = 12 ↔ 12 ÷ 4 = 3 ↔ 12 ÷ 3 = 4</div></div>
    <div class="lsec"><h3>🎯 דוגמאות</h3>
      <div class="lstep"><div class="lstepn">1</div><div>10 ÷ 2 = <strong>5</strong></div></div>
      <div class="lstep"><div class="lstepn">2</div><div>15 ÷ 3 = <strong>5</strong></div></div>
      <div class="lstep"><div class="lstepn">3</div><div>24 ÷ 6 = <strong>4</strong></div></div></div>`},
  shapes:{title:'📐 גיאומטריה',html:`<div class="lesson-title">📐 צורות</div>
    <div class="lsec"><h3>🔺 משולש</h3><p>3 צלעות, 3 פינות (זוויות)</p></div>
    <div class="lsec"><h3>⬜ ריבוע</h3><p>4 צלעות שוות, 4 זוויות ישרות</p></div>
    <div class="lsec"><h3>▭ מלבן</h3><p>4 צלעות, 2 זוגות שווים</p></div>
    <div class="lsec"><h3>⭕ עיגול</h3><p>אין פינות, אין צלעות ישרות</p></div>
    <div class="lsec"><div class="lexample">מחומש=5 צלעות, משושה=6 צלעות</div></div>`},
  shapes2d_learn:{title:'🔷 צורות 2D',html:`<div class="lesson-title">🔷 צורות דו-מימדיות</div>
    <div class="lsec"><h3>📋 הצורות הבסיסיות</h3>
      <div class="lstep"><div class="lstepn">🔺</div><div>משולש: 3 צלעות, 3 פינות</div></div>
      <div class="lstep"><div class="lstepn">⬜</div><div>ריבוע: 4 צלעות שוות</div></div>
      <div class="lstep"><div class="lstepn">▭</div><div>מלבן: 2 זוגות צלעות</div></div>
      <div class="lstep"><div class="lstepn">⭕</div><div>עיגול: אין פינות</div></div></div>
    <div class="lsec"><h3>💡 טיפ</h3><div class="lexample">שם הצורה בא מהצלעות: מש-3=3, מח-5=5, מש-6=6</div></div>`},
  measurement_learn:{title:'📏 מדידה',html:`<div class="lesson-title">📏 מדידה</div>
    <div class="lsec"><h3>📏 אורך</h3>
      <div class="lstep"><div class="lstepn">📐</div><div>10 מ"מ = 1 ס"מ</div></div>
      <div class="lstep"><div class="lstepn">📐</div><div>100 ס"מ = 1 מ'</div></div>
      <div class="lstep"><div class="lstepn">📐</div><div>1000 מ' = 1 ק"מ</div></div></div>
    <div class="lsec"><h3>⚖️ משקל</h3>
      <div class="lstep"><div class="lstepn">⚖️</div><div>1000 גרם = 1 ק"ג</div></div></div>
    <div class="lsec"><h3>⏰ זמן</h3>
      <div class="lstep"><div class="lstepn">⏰</div><div>60 שניות = דקה | 60 דקות = שעה | 24 שעות = יום</div></div></div>
    <div class="lsec"><h3>🧪 נפח</h3>
      <div class="lstep"><div class="lstepn">🧪</div><div>1000 מ"ל = 1 ליטר</div></div></div>`},
  fractions:{title:'½ שברים',html:`<div class="lesson-title">½ שברים</div>
    <div class="lsec"><h3>🍕 מה זה שבר?</h3>
      <div class="lexample">1/2 = חצי | 1/4 = רבע | 3/4 = שלושה רבעים</div></div>
    <div class="lsec"><h3>🎯 שתי משמעויות</h3>
      <div class="lstep"><div class="lstepn">1</div><div>חלק מהשלם: 3/4 מהפיצה</div></div>
      <div class="lstep"><div class="lstepn">2</div><div>חלק מכמות: 3/4 מ-12 = 9</div></div></div>
    <div class="lsec"><h3>🎯 חישוב</h3>
      <div class="lexample">n/d מ-total: (total÷d)×n</div>
      <div class="lstep"><div class="lstepn">✏️</div><div>3/4 מ-12: (12÷4)×3 = 3×3 = <strong>9</strong></div></div></div>`},
  angles_learn:{title:'📐 זוויות',html:`<div class="lesson-title">📐 זוויות</div>
    <div class="lsec"><h3>📏 סוגי זוויות</h3>
      <div class="lstep"><div class="lstepn">🟢</div><div>חדה: פחות מ-<strong>90°</strong></div></div>
      <div class="lstep"><div class="lstepn">🔵</div><div>ישרה: בדיוק <strong>90°</strong> (כמו פינת ריבוע)</div></div>
      <div class="lstep"><div class="lstepn">🔴</div><div>קהה: יותר מ-<strong>90°</strong></div></div></div>
    <div class="lsec"><h3>🔺 סכומי זוויות</h3>
      <div class="lstep"><div class="lstepn">3</div><div>משולש: סכום הזוויות = <strong>180°</strong></div></div>
      <div class="lstep"><div class="lstepn">4</div><div>מרובע: סכום הזוויות = <strong>360°</strong></div></div>
      <div class="lstep"><div class="lstepn">n</div><div>n-צלע: <strong>(n-2)×180°</strong></div></div></div>`},
  perimeter_learn:{title:'📏 היקף',html:`<div class="lesson-title">📏 היקף</div>
    <div class="lsec"><h3>🤔 מה זה היקף?</h3><p>סכום כל הצלעות — המרחק מסביב לצורה!</p></div>
    <div class="lsec"><h3>🎯 נוסחאות</h3>
      <div class="lstep"><div class="lstepn">⬜</div><div>ריבוע: <strong>4 × צלע</strong></div></div>
      <div class="lstep"><div class="lstepn">▭</div><div>מלבן: <strong>2 × (אורך + רוחב)</strong></div></div>
      <div class="lstep"><div class="lstepn">🔺</div><div>משולש: <strong>צלע₁ + צלע₂ + צלע₃</strong></div></div>
      <div class="lstep"><div class="lstepn">⭕</div><div>עיגול (כיתה ו): <strong>2 × π × r ≈ 2×3.14×r</strong></div></div></div>
    <div class="lsec"><h3>✏️ דוגמה</h3><div class="lexample">מלבן 5×3: 2×(5+3)=16 ס"מ</div></div>`},
  area_learn:{title:'📐 שטח',html:`<div class="lesson-title">📐 שטח</div>
    <div class="lsec"><h3>🤔 מה זה שטח?</h3><p>כמה מקום תופסת הצורה — ב-ס"מ²</p></div>
    <div class="lsec"><h3>🎯 נוסחאות (לפי כיתה)</h3>
      <div class="lstep"><div class="lstepn">ד</div><div>מלבן+ריבוע: <strong>אורך × רוחב</strong></div></div>
      <div class="lstep"><div class="lstepn">ה</div><div>משולש: <strong>(בסיס × גובה) ÷ 2</strong></div></div>
      <div class="lstep"><div class="lstepn">ה</div><div>מקבילית: <strong>בסיס × גובה</strong></div></div>
      <div class="lstep"><div class="lstepn">ו</div><div>עיגול: <strong>π × r² ≈ 3.14×r²</strong></div></div></div>`},
  shapes3d_learn:{title:'🧊 גופים',html:`<div class="lesson-title">🧊 גופים תלת-מימדיים</div>
    <div class="lsec"><h3>📋 מושגים</h3>
      <div class="lstep"><div class="lstepn">P</div><div><strong>פאות (פנים)</strong>: משטחים שטוחים</div></div>
      <div class="lstep"><div class="lstepn">K</div><div><strong>קצוות</strong>: שוליים בין פאות</div></div>
      <div class="lstep"><div class="lstepn">Q</div><div><strong>קדקודים</strong>: נקודות פגישה</div></div></div>
    <div class="lsec"><h3>📊 טבלה — כיתה ד</h3>
      <div class="lstep"><div class="lstepn">🟦</div><div>תיבה (קוביה): פאות=6, קצוות=12, קדקודים=8</div></div>
      <div class="lstep"><div class="lstepn">🔺</div><div>פירמידה ריבועית: פאות=5, קצוות=8, קדקודים=5</div></div>
      <div class="lstep"><div class="lstepn">⭕</div><div>גליל: פאות=3, קצוות=2, קדקודים=0</div></div></div>
    <div class="lsec"><h3>💡 נוסחת אוילר</h3><div class="lexample">פאות + קדקודים − קצוות = 2</div></div>`},
  percentages_learn:{title:'💯 אחוזים',html:`<div class="lesson-title">💯 אחוזים</div>
    <div class="lsec"><h3>🤔 מה זה אחוז?</h3>
      <p>אחוז = חלק מתוך 100. הסימן: %</p>
      <div class="lexample">50% = 50/100 = מחצית | 25% = ¼ | 10% = 1/10</div></div>
    <div class="lsec"><h3>🎯 ערך האחוז (כיתה ה–ו)</h3>
      <div class="lstep"><div class="lstepn">✏️</div><div>20% מ-80: 80×20÷100 = <strong>16</strong></div></div>
      <div class="lstep"><div class="lstepn">✏️</div><div>25% מ-120: 120÷4 = <strong>30</strong></div></div></div>
    <div class="lsec"><h3>🎯 חישוב האחוז (כיתה ו)</h3>
      <div class="lexample">16 מ-80 = כמה%? 16÷80×100 = 20%</div></div>
    <div class="lsec"><h3>💡 קיצורים</h3>
      <div class="lstep"><div class="lstepn">10%</div><div>חלק ב-10</div></div>
      <div class="lstep"><div class="lstepn">25%</div><div>חלק ב-4</div></div>
      <div class="lstep"><div class="lstepn">50%</div><div>חלק ב-2</div></div></div>`},
  ratio_learn:{title:'⚖️ יחס',html:`<div class="lesson-title">⚖️ יחס</div>
    <div class="lsec"><h3>🤔 מה זה יחס?</h3>
      <p>השוואה בין שתי כמויות</p>
      <div class="lexample">יחס 3:2 — לכל 3 מהסוג הראשון יש 2 מהשני</div></div>
    <div class="lsec"><h3>🎯 חלוקה לפי יחס (כיתה ו)</h3>
      <div class="lstep"><div class="lstepn">✏️</div><div>חולקים 50 ש"ח ביחס 2:3</div></div>
      <div class="lstep"><div class="lstepn">1</div><div>סכום החלקים: 2+3=5</div></div>
      <div class="lstep"><div class="lstepn">2</div><div>כל חלק: 50÷5=10 ש"ח</div></div>
      <div class="lstep"><div class="lstepn">3</div><div>ראשון: 2×10=20, שני: 3×10=30</div></div></div>
    <div class="lsec"><h3>🗺️ קנה מידה</h3>
      <div class="lexample">1:1000 → 2 ס"מ במפה = 2000 ס"מ = 20 מ' במציאות</div></div>`},
  negative_learn:{title:'➖ מספרים שלמים',html:`<div class="lesson-title">➖ מספרים שלמים</div>
    <div class="lsec"><h3>🌡️ דוגמאות מחיי יום-יום</h3>
      <div class="lexample">טמפרטורה: −5° = 5 מעלות מתחת לאפס<br>קומה: −1 = קומה תת-קרקעית<br>חוב: −50 ש"ח</div></div>
    <div class="lsec"><h3>📏 ישר המספרים</h3>
      <div class="lexample">...−3, −2, −1, 0, +1, +2, +3...</div></div>
    <div class="lsec"><h3>➕ חיבור</h3>
      <div class="lstep"><div class="lstepn">1</div><div>(−3) + 5 = <strong>2</strong></div></div>
      <div class="lstep"><div class="lstepn">2</div><div>(−4) + (−2) = <strong>−6</strong></div></div></div>`},
  statistics_learn:{title:'📊 סטטיסטיקה',html:`<div class="lesson-title">📊 סטטיסטיקה (כיתה ו)</div>
    <div class="lsec"><h3>📋 מדדים</h3>
      <div class="lstep"><div class="lstepn">📊</div><div><strong>ממוצע</strong>: סכום ÷ כמות</div></div>
      <div class="lstep"><div class="lstepn">📊</div><div><strong>חציון</strong>: האמצעי לאחר מיון</div></div>
      <div class="lstep"><div class="lstepn">📊</div><div><strong>שכיח</strong>: המספר שמופיע הכי הרבה</div></div>
      <div class="lstep"><div class="lstepn">📊</div><div><strong>טווח</strong>: מקסימום פחות מינימום</div></div></div>
    <div class="lsec"><h3>✏️ דוגמה</h3>
      <div class="lexample">נתונים: 3, 7, 7, 10, 13<br>ממוצע: 40÷5=8 | חציון: 7 | שכיח: 7 | טווח: 10</div></div>`},
  coordinates_learn:{title:'🗺️ קואורדינטות',html:`<div class="lesson-title">🗺️ קואורדינטות</div>
    <div class="lsec"><h3>📍 כיצד מציינים נקודה?</h3>
      <div class="lexample">(X, Y) — תמיד X ראשון, Y שני!<br>(3, 4) → 3 ימינה, 4 למעלה</div></div>
    <div class="lsec"><h3>📏 הצירים</h3>
      <div class="lstep"><div class="lstepn">X</div><div>ציר אופקי (ימין/שמאל)</div></div>
      <div class="lstep"><div class="lstepn">Y</div><div>ציר אנכי (למעלה/למטה)</div></div></div>`},
};

function openLearn(){
  const c=document.getElementById('learnTopics');c.innerHTML='';
  const gc=window.GRADE_CONFIG;
  const available=gc?.availableLearnTopics||LEARN_TOPICS.map(t=>t.id);
  LEARN_TOPICS.filter(t=>available.includes(t.id)).forEach(t=>{
    const done=st.learnedTopics.includes(t.id);
    const el=document.createElement('div');el.className='ltopic'+(done?' ltdone':'');
    el.innerHTML=`<div class="lt-icon">${t.icon}</div><div class="lt-info"><div class="lt-name">${t.n}</div><div class="lt-desc">${t.desc}</div></div><span class="lt-badge ${done?'ltdone-b':'ltnew'}">${done?'✅ למדת':'🆕 חדש'}</span>`;
    el.onclick=()=>openLesson(t.id);c.appendChild(el);
  });
  show('learn-scr');
}
function openLesson(id){
  const lesson=LESSONS[id];if(!lesson)return;
  const c=document.getElementById('lessonContent');c.innerHTML=lesson.html;
  const btn=document.createElement('button');btn.className='lgo';btn.textContent='✅ הבנתי! פתח לתרגול';
  btn.onclick=()=>{
    if(!st.learnedTopics.includes(id)){st.learnedTopics.push(id);save();addPts(15);showPtsPop(15);showToast(`🎉 +15! ${lesson.title} נפתח!`);}
    show('home');setTimeout(updateHome,100);
  };
  c.appendChild(btn);show('lesson-scr');
}
