// ══ תזכורת — QUICK REFERENCE SYSTEM ══
// Replaces the old "learn/lesson" system.
// No locking, no XP — just fast reference cards for any topic.

// ── All reference topics (filtered by grade) ──
const REMINDER_TOPICS = [
  { id:'r_add',       grade:['א','ב','ג','ד','ה','ו'], icon:'➕', name:'חיבור',             color:'#2ed573' },
  { id:'r_sub',       grade:['א','ב','ג','ד','ה','ו'], icon:'➖', name:'חיסור',             color:'#ff4757' },
  { id:'r_mul',       grade:['ב','ג','ד','ה','ו'],     icon:'✖️', name:'כפל',               color:'#ffd32a' },
  { id:'r_div',       grade:['ג','ד','ה','ו'],         icon:'➗', name:'חילוק',             color:'#1e90ff' },
  { id:'r_orderops',  grade:['ג','ד','ה','ו'],         icon:'🔢', name:'סדר פעולות',        color:'#a29bfe' },
  { id:'r_fractions', grade:['ג','ד','ה','ו'],         icon:'½',  name:'שברים',             color:'#54a0ff' },
  { id:'r_decimals',  grade:['ד','ה','ו'],             icon:'🔢', name:'שברים עשרוניים',    color:'#00cec9' },
  { id:'r_percents',  grade:['ה','ו'],                  icon:'💯', name:'אחוזים',            color:'#fd79a8' },
  { id:'r_ratio',     grade:['ו'],                      icon:'⚖️', name:'יחס',               color:'#e17055' },
  { id:'r_shapes2d',  grade:['א','ב','ג','ד','ה','ו'], icon:'🔷', name:'צורות 2D',          color:'#c77dff' },
  { id:'r_angles',    grade:['ג','ד','ה','ו'],         icon:'📐', name:'זוויות',            color:'#fdcb6e' },
  { id:'r_perimeter', grade:['ג','ד','ה','ו'],         icon:'📏', name:'היקף',              color:'#00cec9' },
  { id:'r_area',      grade:['ד','ה','ו'],             icon:'📐', name:'שטח',               color:'#6c5ce7' },
  { id:'r_shapes3d',  grade:['ד','ה','ו'],             icon:'🧊', name:'גופים 3D',          color:'#74b9ff' },
  { id:'r_volume',    grade:['ו'],                      icon:'🧊', name:'נפח',               color:'#0984e3' },
  { id:'r_circle',    grade:['ו'],                      icon:'⭕', name:'מעגל',              color:'#e84393' },
  { id:'r_measure',   grade:['א','ב','ג','ד','ה','ו'], icon:'📏', name:'מדידה ויחידות',     color:'#fab1a0' },
  { id:'r_time',      grade:['א','ב','ג','ד','ה','ו'], icon:'⏰', name:'זמן',               color:'#fdcb6e' },
  { id:'r_stats',     grade:['ב','ג','ד','ה','ו'],     icon:'📊', name:'נתונים וממוצע',     color:'#6c5ce7' },
  { id:'r_integers',  grade:['ו'],                      icon:'➖', name:'מספרים שלמים',      color:'#636e72' },
];

// ── Reference content ──
const REMINDERS = {

  r_add:{title:'➕ חיבור',color:'#2ed573',sections:[
    {head:'🔑 עיקרון',rows:[
      ['מה זה?','מחברים שני מספרים לסכום'],
      ['חוק חלפין','5+3 = 3+5 = 8 (הסדר לא משנה)'],
      ['חוק קיבוץ','(2+3)+4 = 2+(3+4) = 9'],
    ]},
    {head:'💡 טיפי חישוב',rows:[
      ['לכלל 10','9+6: קח 1 מ-6 → 10+5=15'],
      ['עשרות','47+30: 40+30=70, +7=77'],
      ['אמידה','37+42 ≈ 40+40=80'],
      ['בדיקה','תוצאה − מחוברת₂ = מחוברת₁'],
    ]},
    {head:'✏️ חיבור במאונך',rows:[
      ['247 + 138','מימין לשמאל'],
      ['7+8=15','כתוב 5, לווה 1'],
      ['4+3+1=8','כתוב 8'],
      ['2+1=3','כתוב 3 → 385'],
    ]},
  ]},

  r_sub:{title:'➖ חיסור',color:'#ff4757',sections:[
    {head:'🔑 עיקרון',rows:[
      ['מה זה?','לקחת מספר קטן ממספר גדול'],
      ['קשר לחיבור','8−3=5  ↔  5+3=8'],
      ['לא חלפין!','8−3 ≠ 3−8'],
    ]},
    {head:'💡 טיפי חישוב',rows:[
      ['עיגול','200−47: 200−50+3=153'],
      ['פירוק','83−27: 83−20=63, 63−7=56'],
      ['בדיקה','תוצאה + מחוסר = מוחסר-מ'],
    ]},
    {head:'✏️ חיסור במאונך',rows:[
      ['304 − 158','לווה מהעשרות'],
      ['14−8=6','כתוב 6'],
      ['9−5=4 (אחרי לווה)','כתוב 4'],
      ['2−1=1','כתוב 1 → 146'],
    ]},
  ]},

  r_mul:{title:'✖️ כפל',color:'#ffd32a',sections:[
    {head:'📊 לוח הכפל המלא',rows:[
      ['×2','2, 4, 6, 8, 10, 12, 14, 16, 18, 20'],
      ['×3','3, 6, 9, 12, 15, 18, 21, 24, 27, 30'],
      ['×4','4, 8, 12, 16, 20, 24, 28, 32, 36, 40'],
      ['×5','5, 10, 15, 20, 25, 30, 35, 40, 45, 50'],
      ['×6','6, 12, 18, 24, 30, 36, 42, 48, 54, 60'],
      ['×7','7, 14, 21, 28, 35, 42, 49, 56, 63, 70'],
      ['×8','8, 16, 24, 32, 40, 48, 56, 64, 72, 80'],
      ['×9','9, 18, 27, 36, 45, 54, 63, 72, 81, 90'],
      ['×10','10, 20, 30, 40, 50, 60, 70, 80, 90, 100'],
    ]},
    {head:'💡 כללים',rows:[
      ['חלפין','4×7 = 7×4 = 28'],
      ['×0','כל מספר × 0 = 0'],
      ['×1','כל מספר × 1 = אותו מספר'],
      ['×10','הוסף 0 בסוף: 8×10=80'],
      ['×100','הוסף 00 בסוף: 8×100=800'],
    ]},
  ]},

  r_div:{title:'➗ חילוק',color:'#1e90ff',sections:[
    {head:'🔑 עיקרון',rows:[
      ['מה זה?','לחלק לקבוצות שוות'],
      ['20 ÷ 4 = 5','כי 4 × 5 = 20'],
      ['קשר לכפל','a÷b=c  ↔  c×b=a'],
      ['÷1','כל מספר ÷ 1 = עצמו'],
      ['÷עצמו','כל מספר ÷ עצמו = 1'],
    ]},
    {head:'📋 סימני התחלקות',rows:[
      ['÷2','מסתיים בספרה זוגית (0,2,4,6,8)'],
      ['÷3','סכום הספרות מתחלק ב-3'],
      ['÷4','שתי הספרות האחרונות ÷4'],
      ['÷5','מסתיים ב-0 או 5'],
      ['÷9','סכום הספרות מתחלק ב-9'],
      ['÷10','מסתיים ב-0'],
    ]},
    {head:'✏️ חילוק ארוך: 248÷4',rows:[
      ['שלב 1','2÷4 לא הולך, ניקח 24'],
      ['שלב 2','24÷4=6 → כתוב 6'],
      ['שלב 3','48÷4=... שארית: 24−24=0'],
      ['שלב 4','8÷4=2 → כתוב 2'],
      ['תשובה','62'],
    ]},
  ]},

  r_orderops:{title:'🔢 סדר פעולות',color:'#a29bfe',sections:[
    {head:'📋 הסדר (חשוב!)',rows:[
      ['1️⃣','סוגריים ( ) — קודם כל'],
      ['2️⃣','חזקות (²) — אחרי'],
      ['3️⃣','כפל × וחילוק ÷ — משמאל לימין'],
      ['4️⃣','חיבור + וחיסור − — משמאל לימין'],
    ]},
    {head:'✏️ דוגמאות',rows:[
      ['2 + 3 × 4','= 2 + 12 = 14  ✓ (לא 20!)'],
      ['(2+3) × 4','= 5 × 4 = 20  ✓'],
      ['10 − 2 + 3','= 8 + 3 = 11  (משמאל לימין)'],
      ['20 ÷ 4 × 2','= 5 × 2 = 10  (משמאל לימין)'],
      ['3² + 4','= 9 + 4 = 13  ✓'],
    ]},
  ]},

  r_fractions:{title:'½ שברים',color:'#54a0ff',sections:[
    {head:'🔑 מה זה שבר?',rows:[
      ['מבנה','מנה ÷ מכנה'],
      ['מכנה','לכמה חלקים חולק השלם'],
      ['מנה','כמה חלקים לוקחים'],
      ['3/4','שלושה חלקים מתוך ארבעה'],
    ]},
    {head:'📊 שברים נפוצים',rows:[
      ['½ = 0.5 = 50%','חצי'],
      ['¼ = 0.25 = 25%','רבע'],
      ['¾ = 0.75 = 75%','שלושה רבעים'],
      ['⅓ ≈ 0.333 ≈ 33%','שליש'],
      ['⅕ = 0.2 = 20%','חמישית'],
      ['1/10 = 0.1 = 10%','עשירית'],
    ]},
    {head:'🎯 חלק של כמות',rows:[
      ['נוסחה','(כמות ÷ מכנה) × מנה'],
      ['¾ מ-20','(20÷4)×3 = 5×3 = 15'],
      ['⅖ מ-30','(30÷5)×2 = 6×2 = 12'],
      ['⅔ מ-24','(24÷3)×2 = 8×2 = 16'],
    ]},
    {head:'✂️ הרחבה וצמצום',rows:[
      ['הרחבה','כפול מנה ומכנה באותו מספר'],
      ['½=2/4=3/6','כולם שווים'],
      ['צמצום','חלק מנה ומכנה בגורם משותף'],
      ['6/9 → ÷3','= 2/3'],
    ]},
    {head:'➕ חיבור וחיסור',rows:[
      ['מכנה זהה','1/5 + 2/5 = 3/5'],
      ['מכנה שונה','1/2 + 1/3 = 3/6 + 2/6 = 5/6'],
    ]},
  ]},

  r_decimals:{title:'🔢 שברים עשרוניים',color:'#00cec9',sections:[
    {head:'📋 ערך המקום',rows:[
      ['5.374',''],
      ['5','יחידות'],
      ['3','עשיריות  (÷10)'],
      ['7','מאיות   (÷100)'],
      ['4','אלפיות  (÷1000)'],
    ]},
    {head:'💡 כפל וחילוק',rows:[
      ['×10','הזזת נקודה ימינה:  2.5 → 25'],
      ['×100','הזזה 2 מקומות:   2.5 → 250'],
      ['÷10','הזזת נקודה שמאלה: 25 → 2.5'],
      ['÷100','שתי הזזות:      250 → 2.5'],
    ]},
    {head:'📊 שברים ↔ עשרוניים',rows:[
      ['½ = 0.5','¼ = 0.25'],
      ['¾ = 0.75','⅕ = 0.2'],
      ['1/10 = 0.1','1/100 = 0.01'],
      ['1/8 = 0.125','⅔ ≈ 0.667'],
    ]},
    {head:'✏️ חיבור וחיסור',rows:[
      ['יישר נקודות!','3.40'],
      ['','+ 1.75'],
      ['','────'],
      ['','5.15'],
    ]},
  ]},

  r_percents:{title:'💯 אחוזים',color:'#fd79a8',sections:[
    {head:'🔑 מה זה אחוז?',rows:[
      ['%','חלק מתוך 100'],
      ['50%','50 מתוך 100 = חצי'],
      ['100%','השלם כולו'],
      ['0%','אפס — כלום'],
    ]},
    {head:'📊 אחוזים נפוצים',rows:[
      ['1%','÷100'],
      ['10%','÷10'],
      ['20%','÷5'],
      ['25%','÷4'],
      ['50%','÷2'],
      ['75%','÷4×3'],
    ]},
    {head:'🎯 ערך האחוז (כמה זה X%?)',rows:[
      ['נוסחה','סכום × אחוז ÷ 100'],
      ['30% מ-80','80×30÷100 = 24'],
      ['15% מ-200','200×15÷100 = 30'],
      ['קיצור 10%','200÷10 = 20'],
    ]},
    {head:'🎯 חישוב האחוז (מה האחוז?)',rows:[
      ['נוסחה','חלק ÷ שלם × 100'],
      ['12 מ-60','12÷60×100 = 20%'],
      ['25 מ-50','25÷50×100 = 50%'],
    ]},
  ]},

  r_ratio:{title:'⚖️ יחס',color:'#e17055',sections:[
    {head:'🔑 מה זה יחס?',rows:[
      ['הגדרה','השוואה בין שתי כמויות'],
      ['3:2','לכל 3 מהראשון יש 2 מהשני'],
      ['שקול','6:4 = 3:2 (מצמצמים כמו שבר)'],
    ]},
    {head:'🎯 חלוקה לפי יחס',rows:[
      ['דוגמה','60 ₪ ביחס 2:3'],
      ['1. סכום חלקים','2+3 = 5 חלקים'],
      ['2. ערך חלק','60÷5 = 12 ₪ לחלק'],
      ['3. חלוקה','ראשון: 2×12=24  שני: 3×12=36'],
    ]},
    {head:'🗺️ קנה מידה',rows:[
      ['1:100','1 ס"מ במפה = 1 מ\' במציאות'],
      ['1:1000','1 ס"מ במפה = 10 מ\' במציאות'],
      ['1:50000','1 ס"מ = 0.5 ק"מ במציאות'],
      ['חישוב','מרחק אמיתי = מרחק מפה × קנה'],
    ]},
  ]},

  r_shapes2d:{title:'🔷 צורות 2D',color:'#c77dff',sections:[
    {head:'📋 צורות וצלעות',rows:[
      ['🔺 משולש','3 צלעות | 3 פינות | סכום זוויות 180°'],
      ['⬜ ריבוע','4 צלעות שוות | 4 פינות ישרות (90°)'],
      ['▭ מלבן','4 צלעות | 2 זוגות שווים | 4×90°'],
      ['⬟ מעוין','4 צלעות שוות | אלכסונים מאונכים'],
      ['⬡ מקבילית','2 זוגות צלעות מקביליות'],
      ['梯 טרפז','זוג אחד צלעות מקביליות'],
      ['⬠ מחומש','5 צלעות | 5 פינות | 540°'],
      ['⬡ משושה','6 צלעות | 6 פינות | 720°'],
      ['⭕ עיגול','אין פינות | אין צלעות ישרות'],
    ]},
    {head:'💡 זיכרון מהיר',rows:[
      ['מ-שולש','3 צלעות'],
      ['ריב-וע','4 צלעות'],
      ['מ-חומש','5 צלעות'],
      ['מ-שושה','6 צלעות'],
    ]},
    {head:'🔁 סימטריה',rows:[
      ['ריבוע','4 צירי סימטריה'],
      ['מלבן','2 צירי סימטריה'],
      ['משולש שווה-צלעות','3 צירי סימטריה'],
      ['עיגול','אינסוף צירי סימטריה'],
    ]},
  ]},

  r_angles:{title:'📐 זוויות',color:'#fdcb6e',sections:[
    {head:'📋 סוגי זוויות',rows:[
      ['חדה','< 90°  (כמו V צר)'],
      ['ישרה','= 90°  (פינת ריבוע ◻)'],
      ['קהה','90°–180°  (V רחב)'],
      ['ישרה מלאה','= 180°  (קו ישר)'],
      ['שלמה','= 360°  (סיבוב מלא)'],
    ]},
    {head:'📐 סכום זוויות במצולע',rows:[
      ['משולש','180°'],
      ['מרובע (כל סוג)','360°'],
      ['מחומש','540°'],
      ['משושה','720°'],
      ['n-צלע','(n − 2) × 180°'],
    ]},
    {head:'💡 זוויות נוספות',rows:[
      ['צמודות','שתי זוויות על קו ישר = 180°'],
      ['קודקודיות','שתי זוויות מנוגדות — שוות'],
      ['מאונכות','בין שניים ניצבים = 90°'],
    ]},
  ]},

  r_perimeter:{title:'📏 היקף',color:'#00cec9',sections:[
    {head:'🔑 מה זה היקף?',rows:[
      ['הגדרה','המרחק מסביב לצורה (החוץ)'],
      ['יחידות','מ"מ, ס"מ, מ\', ק"מ'],
    ]},
    {head:'📋 נוסחאות',rows:[
      ['ריבוע','4 × a  (a = צלע)'],
      ['מלבן','2 × (a + b)'],
      ['משולש','a + b + c'],
      ['מקבילית','2 × (a + b)'],
      ['טרפז','a + b + c + d'],
      ['עיגול','2 × π × r  ≈  6.28 × r'],
    ]},
    {head:'✏️ דוגמאות',rows:[
      ['ריבוע a=7','4×7 = 28 ס"מ'],
      ['מלבן 8×5','2×(8+5) = 26 ס"מ'],
      ['משולש 3,4,5','3+4+5 = 12 ס"מ'],
      ['עיגול r=5','2×3.14×5 ≈ 31.4 ס"מ'],
    ]},
  ]},

  r_area:{title:'📐 שטח',color:'#6c5ce7',sections:[
    {head:'🔑 מה זה שטח?',rows:[
      ['הגדרה','כמה מקום תופסת הצורה'],
      ['יחידות','ס"מ², מ"ר, דונם, ק"מ²'],
      ['1 מ"ר','= 10,000 ס"מ²'],
      ['1 דונם','= 1,000 מ"ר'],
    ]},
    {head:'📋 נוסחאות',rows:[
      ['ריבוע','a × a = a²'],
      ['מלבן','אורך × רוחב'],
      ['משולש','(בסיס × גובה) ÷ 2'],
      ['מקבילית','בסיס × גובה'],
      ['טרפז','(ב₁ + ב₂) × גובה ÷ 2'],
      ['עיגול','π × r²  ≈  3.14 × r²'],
    ]},
    {head:'✏️ דוגמאות',rows:[
      ['מלבן 6×4','6×4 = 24 ס"מ²'],
      ['משולש ב=8 ג=5','(8×5)÷2 = 20 ס"מ²'],
      ['טרפז 6,4 ג=3','(6+4)×3÷2 = 15 ס"מ²'],
      ['עיגול r=3','3.14×9 ≈ 28.3 ס"מ²'],
    ]},
  ]},

  r_shapes3d:{title:'🧊 גופים 3D',color:'#74b9ff',sections:[
    {head:'📋 מושגים',rows:[
      ['פאה','משטח שטוח (פנים הגוף)'],
      ['קצה','שפה משותפת לשתי פאות'],
      ['קדקוד','נקודת פגישת קצוות'],
      ['נוסחת אוילר','פאות + קדקודים − קצוות = 2'],
    ]},
    {head:'📊 גופים עיקריים',rows:[
      ['🟦 תיבה','פ=6  ק"ע=12  קד=8'],
      ['🔺 פירמידה ריבועית','פ=5  ק"ע=8   קד=5'],
      ['🔺 פירמידה משולשת','פ=4  ק"ע=6   קד=4'],
      ['🔵 גליל','פ=3  ק"ע=2   קד=0'],
      ['🔔 חרוט','פ=2  ק"ע=1   קד=1'],
      ['⚽ כדור','פ=1  ק"ע=0   קד=0'],
    ]},
    {head:'💡 בדיקה עם אוילר',rows:[
      ['תיבה','6+8−12 = 2 ✓'],
      ['פירמידה ריבועית','5+5−8 = 2 ✓'],
      ['גליל','3+0−2 = 1 ✗ (עיגול לא חל)'],
    ]},
  ]},

  r_volume:{title:'🧊 נפח',color:'#0984e3',sections:[
    {head:'🔑 מה זה נפח?',rows:[
      ['הגדרה','כמה מקום תופס הגוף בתלת-מימד'],
      ['יחידות','ס"מ³, מ"ק, ל\' (ליטר)'],
      ['קשר','1 ל\' = 1000 ס"מ³ = 1 דמ³'],
    ]},
    {head:'📋 נוסחאות',rows:[
      ['תיבה','א × ר × ג (אורך × רוחב × גובה)'],
      ['גליל','π × r² × גובה'],
      ['חרוט','⅓ × π × r² × גובה'],
      ['כדור','⁴⁄₃ × π × r³'],
    ]},
    {head:'✏️ דוגמאות',rows:[
      ['תיבה 4×3×5','4×3×5 = 60 ס"מ³'],
      ['גליל r=2 ג=7','3.14×4×7 ≈ 88 ס"מ³'],
      ['בריכה 10×5×2','10×5×2 = 100 מ"ק'],
    ]},
  ]},

  r_circle:{title:'⭕ מעגל ועיגול',color:'#e84393',sections:[
    {head:'📋 מושגים',rows:[
      ['מרכז','הנקודה שוות-הרחק מכל השפה'],
      ['רדיוס r','מהמרכז לשפה'],
      ['קוטר d','מצד לצד דרך המרכז (d=2r)'],
      ['מעגל','הקו עצמו (ההיקף)'],
      ['עיגול','כל השטח כולל הפנים'],
      ['π (פאי)','≈ 3.14159...'],
    ]},
    {head:'📐 נוסחאות',rows:[
      ['היקף','2 × π × r  =  π × d'],
      ['שטח','π × r²'],
      ['רדיוס מקוטר','r = d ÷ 2'],
    ]},
    {head:'✏️ דוגמאות',rows:[
      ['r=5: היקף','2×3.14×5 = 31.4 ס"מ'],
      ['r=5: שטח','3.14×25 = 78.5 ס"מ²'],
      ['r=3: היקף','2×3.14×3 ≈ 18.8 ס"מ'],
      ['r=3: שטח','3.14×9 ≈ 28.3 ס"מ²'],
    ]},
  ]},

  r_measure:{title:'📏 מדידה ויחידות',color:'#fab1a0',sections:[
    {head:'📏 אורך',rows:[
      ['10 מ"מ','= 1 ס"מ (סנטימטר)'],
      ['100 ס"מ','= 1 מ\' (מטר)'],
      ['1000 מ\'','= 1 ק"מ (קילומטר)'],
      ['1 מ\'','= 100 ס"מ = 1000 מ"מ'],
      ['1 ק"מ','= 1000 מ\' = 100,000 ס"מ'],
    ]},
    {head:'⚖️ משקל',rows:[
      ['1000 מ"ג','= 1 גרם (ג)'],
      ['1000 גרם','= 1 ק"ג (קילוגרם)'],
      ['1000 ק"ג','= 1 טון'],
    ]},
    {head:'🧪 נפח ונוזלים',rows:[
      ['1000 מ"ל','= 1 ל\' (ליטר)'],
      ['1 ס"מ³','= 1 מ"ל'],
      ['1000 ל\'','= 1 מ"ק'],
    ]},
    {head:'📐 שטח',rows:[
      ['100 מ"מ²','= 1 ס"מ²'],
      ['10,000 ס"מ²','= 1 מ"ר'],
      ['1,000 מ"ר','= 1 דונם'],
      ['1,000,000 מ"ר','= 1 ק"מ²'],
    ]},
  ]},

  r_time:{title:'⏰ זמן',color:'#fdcb6e',sections:[
    {head:'⏰ יחידות זמן',rows:[
      ['60 שניות','= 1 דקה'],
      ['60 דקות','= 1 שעה (=3600 שניות)'],
      ['24 שעות','= 1 יום'],
      ['7 ימים','= 1 שבוע'],
      ['≈30 ימים','≈ 1 חודש'],
      ['12 חודשים','= 1 שנה (365 ימים, שנה מעוברת 366)'],
    ]},
    {head:'🔢 חישובים נפוצים',rows:[
      ['1 שעה','= 60 דקות = 3,600 שניות'],
      ['1 יום','= 24 שעות = 1,440 דקות = 86,400 שניות'],
      ['1 שבוע','= 7 ימים = 168 שעות'],
      ['1 שנה','= 52 שבועות = 8,760 שעות'],
    ]},
    {head:'✏️ חישוב הפרש זמן',rows:[
      ['8:20 → 10:05','1 שעה ו-45 דקות'],
      ['7:00 → 12:30','5 שעות ו-30 דקות'],
      ['שיטה','חשב שעות, חשב דקות, חבר'],
      ['טיפ','עבור דרך שעה עגולה קרובה'],
    ]},
  ]},

  r_stats:{title:'📊 נתונים וממוצע',color:'#6c5ce7',sections:[
    {head:'📋 מדדים סטטיסטיים',rows:[
      ['ממוצע','סכום כל הנתונים ÷ כמות הנתונים'],
      ['חציון','האמצעי לאחר מיון מקטן לגדול'],
      ['שכיח','הנתון שמופיע הכי הרבה פעמים'],
      ['טווח','ערך גדול ביותר − ערך קטן ביותר'],
    ]},
    {head:'✏️ דוגמה מלאה',rows:[
      ['נתונים','3, 7, 7, 10, 13'],
      ['מיון','3, 7, 7, 10, 13'],
      ['ממוצע','(3+7+7+10+13)÷5 = 40÷5 = 8'],
      ['חציון','7 (האמצעי — מקום 3 מבין 5)'],
      ['שכיח','7 (מופיע פעמיים)'],
      ['טווח','13 − 3 = 10'],
    ]},
    {head:'💡 טיפים',rows:[
      ['חציון זוגי','ממוצע שני האמצעיים'],
      ['ממוצע','מושפע מערכים קיצוניים'],
      ['חציון','פחות מושפע מקיצוניים'],
    ]},
  ]},

  r_integers:{title:'➖ מספרים שלמים',color:'#636e72',sections:[
    {head:'📏 ישר המספרים',rows:[
      ['שלמים','...−4, −3, −2, −1, 0, +1, +2, +3, +4...'],
      ['שליליים','קטנים מ-0 (משמאל לאפס)'],
      ['חיוביים','גדולים מ-0 (מימין לאפס)'],
    ]},
    {head:'🌡️ דוגמאות מהחיים',rows:[
      ['טמפרטורה','−5° = 5 מעלות מתחת לאפס'],
      ['קומות','B2 = קומה −2'],
      ['כסף','חייב 50 ₪ = −50 ₪'],
      ['גובה','מתחת לפני הים = שלילי'],
    ]},
    {head:'➕➖ חיבור וחיסור',rows:[
      ['(−3) + 7','= 4  (עלה 7 מ-3)'],
      ['(−4) + (−2)','= −6  (יותר שלילי)'],
      ['5 − 8','= −3  (ירד מתחת לאפס)'],
      ['(−3) − (−5)','= (−3) + 5 = 2  (מינוס מינוס = פלוס)'],
    ]},
    {head:'✖️ כפל וחילוק',rows:[
      ['+ × + = +','חיובי × חיובי = חיובי'],
      ['+ × − = −','חיובי × שלילי = שלילי'],
      ['− × − = +','שלילי × שלילי = חיובי!'],
      ['כלל','סימנים שווים = +  |  סימנים שונים = −'],
    ]},
  ]},
};

// ─────────────────────────────────────────
// STYLES — injected once
// ─────────────────────────────────────────
(function injectReminderStyles(){
  if (document.getElementById('rem-styles')) return;
  const s = document.createElement('style');
  s.id = 'rem-styles';
  s.textContent = `
    #remind-scr { padding:16px 16px 60px; }

    .rem-topbar {
      display:flex; align-items:center; justify-content:space-between;
      width:100%; max-width:440px; margin-bottom:16px;
    }
    .rem-title {
      font-family:'Fredoka',sans-serif; font-size:2rem; font-weight:700;
      background:linear-gradient(135deg,#fff 20%,#ffd32a 60%,#ff6348 100%);
      -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    }

    /* chips */
    .rem-chips {
      display:flex; flex-wrap:wrap; gap:7px;
      width:100%; max-width:440px; margin-bottom:18px;
    }
    .rem-chip {
      display:inline-flex; align-items:center; gap:5px;
      padding:6px 12px; border-radius:99px; cursor:pointer; border:none;
      font-family:'Rubik',sans-serif; font-size:.78rem; font-weight:700;
      background:rgba(255,255,255,.07); color:rgba(255,255,255,.75);
      border:1.5px solid rgba(255,255,255,.1);
      transition:all .16s cubic-bezier(.34,1.4,.64,1); white-space:nowrap;
    }
    .rem-chip:hover { transform:translateY(-2px); background:rgba(255,255,255,.12); color:#fff; }
    .rem-chip.active {
      background:var(--chip-color,#fff)22;
      color:var(--chip-color,#fff);
      border-color:var(--chip-color,#fff);
      box-shadow:0 0 14px var(--chip-color,#fff)44;
      transform:translateY(-1px);
    }

    /* reference card */
    .rem-card {
      width:100%; max-width:440px;
      background:linear-gradient(145deg,var(--card),var(--card2));
      border-radius:20px; overflow:hidden;
      border:1.5px solid var(--rem-color,rgba(255,255,255,.15));
      box-shadow:0 8px 40px rgba(0,0,0,.6), 0 0 20px var(--rem-glow,transparent);
      animation:rem-pop .22s cubic-bezier(.34,1.4,.64,1) both;
    }
    @keyframes rem-pop {
      from { opacity:0; transform:scale(.95) translateY(10px); }
      to   { opacity:1; transform:scale(1) translateY(0); }
    }

    .rem-card-head {
      padding:18px 20px 15px;
      background:linear-gradient(135deg,var(--rem-color,rgba(255,255,255,.05))11,transparent);
      border-bottom:1px solid rgba(255,255,255,.07);
      display:flex; align-items:center; gap:12px;
    }
    .rem-card-title {
      font-family:'Fredoka',sans-serif; font-size:1.6rem; font-weight:700;
      color:var(--rem-color,#fff);
      text-shadow:0 0 20px var(--rem-glow,transparent);
    }

    /* sections */
    .rem-sec { padding:14px 20px 12px; border-bottom:1px solid rgba(255,255,255,.05); }
    .rem-sec:last-child { border-bottom:none; padding-bottom:20px; }
    .rem-sec-head {
      font-size:.72rem; font-weight:800; letter-spacing:1.2px;
      color:var(--rem-color,#ffd32a); opacity:.9;
      text-transform:uppercase; margin-bottom:10px;
    }

    /* table */
    .rem-tbl { width:100%; border-collapse:collapse; }
    .rem-tbl tr { border-bottom:1px solid rgba(255,255,255,.04); }
    .rem-tbl tr:last-child { border-bottom:none; }
    .rem-tbl td { padding:6px 2px; vertical-align:top; line-height:1.45; }
    .rem-tbl td:first-child {
      font-family:'Rubik',sans-serif; font-weight:700; font-size:.84rem;
      color:var(--rem-color,#fff); white-space:nowrap;
      padding-left:0; padding-right:16px; width:40%;
    }
    .rem-tbl td:last-child {
      font-size:.82rem; color:rgba(255,255,255,.78);
    }

    /* empty state */
    .rem-empty {
      text-align:center; padding:40px 20px;
      color:var(--txt2); font-size:.95rem;
    }
  `;
  document.head.appendChild(s);
})();

// ─────────────────────────────────────────
// RENDER
// ─────────────────────────────────────────
function openLearn() { openReminder(); }

function openReminder() {
  _ensureReminderScreen();
  _buildReminderChips();
  // Auto-select first topic for current grade
  const grade = (window.GRADE_CONFIG || {}).gradeId || 'ו';
  const first = REMINDER_TOPICS.find(t => t.grade.includes(grade));
  if (first) _showReminderCard(first.id);
  show('remind-scr');
}

function _ensureReminderScreen() {
  if (document.getElementById('remind-scr')) return;
  const scr = document.createElement('div');
  scr.className = 'scr'; scr.id = 'remind-scr';
  scr.innerHTML = `
    <div class="rem-topbar">
      <span class="rem-title">📚 תזכורת</span>
      <button class="back" onclick="show('home')" style="margin-top:0">← חזרה</button>
    </div>
    <div class="rem-chips" id="remChips"></div>
    <div id="remCardWrap" style="width:100%;max-width:440px"></div>
  `;
  document.body.appendChild(scr);
}

function _buildReminderChips() {
  const container = document.getElementById('remChips');
  if (!container) return;
  container.innerHTML = '';
  const grade = (window.GRADE_CONFIG || {}).gradeId || 'ו';

  REMINDER_TOPICS.filter(t => t.grade.includes(grade)).forEach(t => {
    const chip = document.createElement('button');
    chip.className = 'rem-chip';
    chip.id = 'chip-' + t.id;
    chip.style.setProperty('--chip-color', t.color);
    chip.innerHTML = `${t.icon} ${t.name}`;
    chip.onclick = () => _showReminderCard(t.id);
    container.appendChild(chip);
  });
}

function _showReminderCard(id) {
  document.querySelectorAll('.rem-chip').forEach(c => c.classList.remove('active'));
  const chip = document.getElementById('chip-' + id);
  if (chip) chip.classList.add('active');

  const wrap = document.getElementById('remCardWrap');
  if (!wrap) return;

  const ref = REMINDERS[id];
  if (!ref) { wrap.innerHTML = `<div class="rem-empty">⚠️ אין מידע לנושא זה עדיין.</div>`; return; }

  const topic = REMINDER_TOPICS.find(t => t.id === id);
  const icon = topic?.icon || '📚';
  const color = ref.color;
  const glow = color + '44';

  let html = `<div class="rem-card" style="--rem-color:${color};--rem-glow:${glow}">`;
  html += `<div class="rem-card-head">
    <span style="font-size:2rem;line-height:1;filter:drop-shadow(0 0 12px ${color})">${icon}</span>
    <span class="rem-card-title">${ref.title}</span>
  </div>`;

  ref.sections.forEach(sec => {
    html += `<div class="rem-sec">`;
    html += `<div class="rem-sec-head">${sec.head}</div>`;
    html += `<table class="rem-tbl">`;
    sec.rows.forEach(([k, v]) => {
      html += `<tr><td>${k}</td><td>${v}</td></tr>`;
    });
    html += `</table></div>`;
  });
  html += `</div>`;
  wrap.innerHTML = html;
}

// ── Backward-compat stubs ──
function openLesson(id) { openReminder(); }
const LEARN_TOPICS = [];
const LESSONS = {};
