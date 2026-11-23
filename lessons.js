// ══ תזכורת — QUICK REFERENCE SYSTEM ══
// Replaces the old "learn/lesson" system.
// No locking, no XP — just fast reference cards for any topic.

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

const guideText = [
  ['מדריך הלימוד','Study guide','Справочник','دليل التعلّم','Guide de révision','Навчальний довідник'],
  ['נושאים','Topics','Темы','المواضيع','Thèmes','Теми'],
  ['בחרו נושא, קראו את הכלל ונסו דוגמה.','Choose a topic, review the rule and try an example.','Выберите тему, прочитайте правило и попробуйте решить пример.','اختاروا موضوعًا واقرؤوا القاعدة وجرّبوا مثالًا.','Choisis un thème, lis la règle et essaie un exemple.','Оберіть тему, прочитайте правило й розв’яжіть приклад.'],
  ['איך פותרים?','How to solve it','Как решать','كيف نحلّ؟','Comment résoudre ?','Як розв’язати?'],
  ['נסו בעצמכם','Try it yourself','Решите сами','جرّبوا بأنفسكم','À toi de jouer','Спробуйте самі'],
  ['הצגת הפתרון','Show solution','Показать решение','عرض الحل','Voir la solution','Показати розв’язок'],
  ['תשובה','Answer','Ответ','الإجابة','Réponse','Відповідь'],
  ['תרגול בנושא','Practice this topic','Тренировка по теме','التدرّب على الموضوع','Pratiquer ce thème','Тренуватися з цієї теми'],
  ['טבלת הכפל','Times table','Таблица умножения','جدول الضرب','Table de multiplication','Таблиця множення'],
  ['בחרו משבצת. המספר בראש העמודה כפול המספר בתחילת השורה נותן את המכפלה.','Pick a cell. Multiply its column number by its row number to find the product.','Выберите клетку. Умножьте число столбца на число строки.','اختاروا خانة. اضربوا رقم العمود في رقم الصف لإيجاد حاصل الضرب.','Choisis une case. Multiplie le nombre de sa colonne par celui de sa ligne.','Оберіть клітинку. Помножте число стовпця на число рядка.'],
  ['בחרו נושא למעבר לדוגמאות','Choose a topic to see examples','Выберите тему, чтобы увидеть примеры','اختاروا موضوعًا لرؤية الأمثلة','Choisis un thème pour voir les exemples','Оберіть тему, щоб побачити приклади'],
  ['בשעה שלמה המחוג הארוך מצביע על 12. המחוג הקצר מצביע על השעה.','On the hour, the long hand points to 12. The short hand shows the hour.','В ровный час длинная стрелка указывает на 12, а короткая показывает час.','عند تمام الساعة يشير العقرب الطويل إلى 12، ويبيّن العقرب القصير الساعة.','À l’heure pile, la grande aiguille pointe sur 12. La petite indique l’heure.','У рівну годину довга стрілка показує на 12, а коротка показує годину.'],
  ['המחוג הקצר מצביע על המספר שבתשובה.','The short hand points to the answer.','Короткая стрелка указывает на ответ.','يشير العقرب القصير إلى الإجابة.','La petite aiguille pointe sur la réponse.','Коротка стрілка вказує на відповідь.'],
  ['מספר שלם מחולק לחלקים שווים. בחצי יש חלק אחד מתוך שניים, וברבע יש חלק אחד מתוך ארבעה.','Split a whole into equal parts. A half is one of two parts, and a quarter is one of four.','Разделите целое на равные части. Половина — одна из двух частей, четверть — одна из четырёх.','قسّموا الكل إلى أجزاء متساوية. النصف جزء من جزأين، والربع جزء من أربعة.','Partage le tout en parts égales. Une moitié est une part sur deux et un quart une part sur quatre.','Поділіть ціле на рівні частини. Половина — одна з двох частин, а чверть — одна з чотирьох.'],
  ['ספרו כמה חלקים שווים יש. המונה הוא מספר החלקים שלוקחים, והמכנה הוא מספר החלקים בשלם.','Count the equal parts. The numerator tells how many you take. The denominator tells how many make the whole.','Посчитайте равные части. Числитель показывает, сколько берём, а знаменатель — сколько частей в целом.','عدّوا الأجزاء المتساوية. يبيّن البسط عدد الأجزاء المأخوذة، والمقام عدد أجزاء الكل.','Compte les parts égales. Le numérateur indique combien tu en prends. Le dénominateur indique combien forment le tout.','Порахуйте рівні частини. Чисельник показує, скільки беремо, а знаменник — скільки частин у цілому.']
];
for (const [he, ...translations] of guideText) uiTranslations.set(he, translations);

const guideReferenceIds = {
  add:'r_add', sub:'r_sub', mul:'r_mul', div:'r_div', order:'r_orderops',
  fractions:'r_fractions', fractions_unit:'r_fractions', decimals:'r_decimals',
  percent:'r_percents', ratio:'r_ratio', shapes:'r_shapes2d', angles:'r_angles',
  area:'r_area', volume:'r_volume', circle:'r_circle', measurement:'r_measure',
  data:'r_stats', negatives:'r_integers'
};
const guideRules = {
  clock:'בשעה שלמה המחוג הארוך מצביע על 12. המחוג הקצר מצביע על השעה.',
  fractions_half:'מספר שלם מחולק לחלקים שווים. בחצי יש חלק אחד מתוך שניים, וברבע יש חלק אחד מתוך ארבעה.',
  fractions_unit:'ספרו כמה חלקים שווים יש. המונה הוא מספר החלקים שלוקחים, והמכנה הוא מספר החלקים בשלם.',
};

for (const [topic, he, ...labels] of [
  ["add", "התחילו במספר הראשון. הוסיפו את המספר השני.", "Start with the first number. Add the second.", "Начни с первого числа. Прибавь второе.", "ابدأ بالعدد الأول. أضف إليه العدد الثاني.", "Pars du premier nombre. Ajoute le deuxième.", "Почни з першого числа. Додай друге."],
  ["sub", "התחילו במספר הראשון. הורידו ממנו את המספר השני. כמה נשאר?", "Start with the first number. Take away the second. How much is left?", "Начни с первого числа. Вычти второе. Сколько осталось?", "ابدأ بالعدد الأول. اطرح منه العدد الثاني. كم بقي؟", "Pars du premier nombre. Retire le deuxième. Combien reste-t-il ?", "Почни з першого числа. Відніми друге. Скільки залишилось?"],
  ["mul", "יש 3 קבוצות של 4? כופלים 3 ב־4 ומקבלים 12.", "Have 3 groups of 4? Multiply 3 by 4 to get 12.", "Есть 3 группы по 4? Умножь 3 на 4. Получится 12.", "لديك 3 مجموعات، في كل منها 4؟ اضرب 3 في 4 لتحصل على 12.", "Tu as 3 groupes de 4 ? Multiplie 3 par 4 pour obtenir 12.", "Є 3 групи по 4? Помнож 3 на 4. Вийде 12."],
  ["div", "חלקו שווה בשווה. מה שנשאר אחרי החלוקה נקרא שארית.", "Share equally. Anything left over is called the remainder.", "Раздели поровну. То, что осталось, называется остатком.", "وزّع بالتساوي. ما يتبقى بعد القسمة يسمى الباقي.", "Partage en parts égales. Ce qui reste s’appelle le reste.", "Поділи порівну. Те, що залишилося, називають остачею."],
  ["unknown", "מצאו מה חסר. למשל ⁦3 + ▲ = 7⁩. מה צריך להוסיף ל־3 כדי להגיע ל־7?", "Find what is missing. In ⁦3 + ▲ = 7⁩, what do you add to 3 to make 7?", "Найди пропуск. В ⁦3 + ▲ = 7⁩ что нужно прибавить к 3, чтобы получить 7?", "أوجد العدد الناقص. في ⁦3 + ▲ = 7⁩، ماذا تضيف إلى 3 لتحصل على 7؟", "Trouve le nombre manquant. Dans ⁦3 + ▲ = 7⁩, qu’ajoutes-tu à 3 pour obtenir 7 ?", "Знайди пропущене число. У ⁦3 + ▲ = 7⁩ що треба додати до 3, щоб отримати 7?"],
  ["place", "במספר 253 יש 2 מאות, 5 עשרות ו־3 יחידות.", "In 253, there are 2 hundreds, 5 tens and 3 ones.", "В числе 253 есть 2 сотни, 5 десятков и 3 единицы.", "في العدد 253 مئتان و5 عشرات و3 آحاد.", "Dans 253, il y a 2 centaines, 5 dizaines et 3 unités.", "У числі 253 є 2 сотні, 5 десятків і 3 одиниці."],
  ["rounding", "בעיגול בוחרים את המספר העגול הקרוב יותר. למשל 28 קרוב יותר ל־30 מאשר ל־20.", "When rounding, pick the closer round number. For example, 28 is closer to 30 than to 20.", "При округлении выбери ближайшее круглое число. 28 ближе к 30, чем к 20.", "عند التقريب اختر العدد المستدير الأقرب. مثلًا 28 أقرب إلى 30 منه إلى 20.", "Pour arrondir, choisis le nombre rond le plus proche. 28 est plus près de 30 que de 20.", "Для округлення обери ближче кругле число. 28 ближче до 30, ніж до 20."],
  ["divisibility", "ספרת היחידות עוזרת לבדוק חלוקה ב־2, ב־5 וב־10. בחלוקה ב־3 או ב־9 מחברים את הספרות.", "Check the last digit for 2, 5 or 10. For 3 or 9, add the digits.", "Для 2, 5 и 10 посмотри на последнюю цифру. Для 3 и 9 сложи цифры.", "انظر إلى الرقم الأخير للقسمة على 2 أو 5 أو 10. للقسمة على 3 أو 9 اجمع الأرقام.", "Regarde le dernier chiffre pour 2, 5 ou 10. Pour 3 ou 9, additionne les chiffres.", "Для 2, 5 і 10 подивись на останню цифру. Для 3 і 9 додай цифри."],
  ["shapes", "ספרו את הצלעות אחת אחת. המקום שבו שתי צלעות נפגשות נקרא קודקוד.", "Count the sides one at a time. The corner where two sides meet is called a vertex.", "Посчитай стороны по одной. Точка, где встречаются две стороны, называется вершиной.", "عدّ الأضلاع واحدًا واحدًا. نقطة التقاء ضلعين تسمى رأسًا.", "Compte les côtés un par un. Le coin où deux côtés se rejoignent s’appelle un sommet.", "Полічи сторони по одній. Точка, де сходяться дві сторони, називається вершиною."],
  ["angles", "זווית ישרה נראית כמו פינה של דף. זווית חדה קטנה ממנה. זווית קהה גדולה ממנה וקטנה מ־180°.", "A right angle looks like the corner of a page. An acute angle is smaller. An obtuse angle is bigger but less than 180°.", "Прямой угол похож на угол листа. Острый угол меньше. Тупой угол больше прямого, но меньше 180°.", "الزاوية القائمة مثل زاوية الورقة. الحادة أصغر منها. المنفرجة أكبر منها وأقل من 180°.", "Un angle droit ressemble au coin d’une feuille. Un angle aigu est plus petit. Un angle obtus est plus grand mais inférieur à 180°.", "Прямий кут схожий на кут аркуша. Гострий кут менший. Тупий кут більший за прямий, але менший за 180°."],
  ["data", "קראו את הכותרת. בדקו מה כל עמודה או משבצת מראה.", "Read the title. Check what each bar or box shows.", "Прочитай заголовок. Посмотри, что показывает каждый столбик или клетка.", "اقرأ العنوان. انظر ماذا يمثّل كل عمود أو مربع.", "Lis le titre. Regarde ce que montre chaque barre ou case.", "Прочитай заголовок. Подивись, що показує кожен стовпчик чи клітинка."],
  ["word", "מה כבר יודעים? מה צריך למצוא? בחרו פעולה שתעזור לענות.", "What do you know? What do you need to find? Pick an operation that helps.", "Что уже известно? Что нужно найти? Выбери подходящее действие.", "ماذا تعرف؟ ماذا تريد أن تجد؟ اختر العملية التي تساعدك.", "Que sais-tu déjà ? Que dois-tu trouver ? Choisis l’opération qui t’aide.", "Що вже відомо? Що потрібно знайти? Обери дію, яка допоможе."],
  ["order", "קודם סוגריים, אחר כך חזקות, כפל וחילוק, ואז חיבור וחיסור. באותה דרגה עובדים משמאל לימין.", "Start with brackets, then powers, then multiply and divide, then add and subtract. At the same step, go left to right.", "Сначала скобки, затем степени, потом умножение и деление, в конце сложение и вычитание. Равные по порядку действия выполняй слева направо.", "ابدأ بالأقواس، ثم القوى، ثم الضرب والقسمة، ثم الجمع والطرح. في المرتبة نفسها اعمل من اليسار إلى اليمين.", "Commence par les parenthèses, puis les puissances, puis les multiplications et divisions, puis les additions et soustractions. Au même niveau, avance de gauche à droite.", "Спочатку дужки, потім степені, далі множення й ділення, потім додавання й віднімання. Дії одного рівня виконуй зліва направо."],
  ["powers", "⁦3² = 3 × 3 = 9⁩. לכן השורש הריבועי של 9 הוא 3.", "⁦3² = 3 × 3 = 9⁩. So the square root of 9 is 3.", "⁦3² = 3 × 3 = 9⁩. Значит, квадратный корень из 9 равен 3.", "⁦3² = 3 × 3 = 9⁩. إذن الجذر التربيعي للعدد 9 هو 3.", "⁦3² = 3 × 3 = 9⁩. La racine carrée de 9 est donc 3.", "⁦3² = 3 × 3 = 9⁩. Отже, квадратний корінь із 9 дорівнює 3."],
  ["equations", "עשו אותה פעולה בשני הצדדים של סימן השוויון עד ש־x נשאר לבד.", "Do the same thing to both sides of the equals sign until x is on its own.", "Выполняй одно и то же действие с обеих сторон знака равенства, пока x не останется один.", "نفّذ العملية نفسها على جانبي علامة المساواة حتى يبقى x وحده.", "Fais la même opération des deux côtés du signe égal jusqu’à ce que x soit seul.", "Виконуй однакову дію з обох боків знака рівності, поки x не залишиться сам."],
  ["coordinates", "בזוג ⁦(3, 2)⁩ המספר 3 שייך לציר האופקי, והמספר 2 לציר האנכי.", "In ⁦(3, 2)⁩, 3 goes on the horizontal axis and 2 goes on the vertical axis.", "В паре ⁦(3, 2)⁩ число 3 относится к горизонтальной оси, а 2 — к вертикальной.", "في ⁦(3, 2)⁩، العدد 3 على المحور الأفقي والعدد 2 على المحور الرأسي.", "Dans ⁦(3, 2)⁩, 3 se lit sur l’axe horizontal et 2 sur l’axe vertical.", "У парі ⁦(3, 2)⁩ число 3 належить горизонтальній осі, а 2 — вертикальній."],
  ["graphs", "מצאו את המספר על הציר. עקבו עד לנקודה בגרף, ואז קראו את המספר בציר השני.", "Find the number on the axis. Follow it to the point, then read the number on the other axis.", "Найди число на оси. Дойди до точки и прочитай число на другой оси.", "جد العدد على المحور. اتبعه حتى النقطة، ثم اقرأ العدد على المحور الآخر.", "Trouve le nombre sur l’axe. Va jusqu’au point, puis lis le nombre sur l’autre axe.", "Знайди число на осі. Дійди до точки, потім прочитай число на іншій осі."],
  ["probability", "אם לכל תוצאה יש אותו סיכוי, חלקו את מספר התוצאות הרצויות במספר כל התוצאות.", "If every outcome is equally likely, divide the number you want by the total number of outcomes.", "Если все исходы равновероятны, раздели число подходящих исходов на число всех исходов.", "إذا كانت النتائج متساوية في فرصها، اقسم عدد النتائج المطلوبة على عدد النتائج كلها.", "Si chaque résultat a la même chance, divise le nombre de résultats cherchés par le nombre total.", "Якщо всі результати однаково можливі, поділи кількість потрібних результатів на загальну кількість."],
  ["transforms", "בהזזה מחליקים את הצורה. בשיקוף הופכים אותה כמו במראה.", "A translation slides a shape. A reflection flips it like a mirror.", "Параллельный перенос сдвигает фигуру. Отражение переворачивает её, как в зеркале.", "الإزاحة تحرّك الشكل من دون تدويره. الانعكاس يقلبه مثل المرآة.", "Une translation fait glisser la figure. Une symétrie la retourne comme dans un miroir.", "Паралельне перенесення зсуває фігуру. Відбиття перевертає її, як у дзеркалі."],
  ["pythagoras", "במשולש ישר־זווית, מעלים את שני הניצבים בריבוע ומחברים. מוציאים שורש כדי למצוא את אורך היתר.", "In a right triangle, square both short sides and add. Take the square root to get the longest side, called the hypotenuse.", "В прямоугольном треугольнике сложи квадраты катетов. Извлеки корень и получишь гипотенузу.", "في المثلث القائم، ربّع طولي الضلعين حول الزاوية القائمة واجمعهما. خذ الجذر التربيعي لتحصل على طول الوتر.", "Dans un triangle rectangle, additionne les carrés des deux côtés de l’angle droit. Prends la racine carrée pour trouver l’hypoténuse.", "У прямокутному трикутнику додай квадрати катетів. Знайди квадратний корінь, щоб отримати гіпотенузу."],
  ["fractions", "המכנה אומר לכמה חלקים שווים חילקו את השלם. המונה אומר כמה חלקים לוקחים.", "The bottom number tells how many equal parts make the whole. The top number tells how many parts you take.", "Знаменатель показывает, на сколько равных частей разделили целое. Числитель показывает, сколько частей взяли.", "المقام يبيّن عدد الأجزاء المتساوية في الكل. البسط يبيّن عدد الأجزاء التي نأخذها.", "Le nombre du bas indique en combien de parts égales on coupe le tout. Celui du haut indique combien on en prend.", "Знаменник показує, на скільки рівних частин поділили ціле. Чисельник показує, скільки частин узяли."],
  ["decimals", "בחיבור ובחיסור, כתבו את הנקודות העשרוניות זו מתחת לזו.", "When adding or subtracting, line up the decimal points.", "При сложении и вычитании пиши десятичные запятые друг под другом.", "عند الجمع أو الطرح، ضع الفواصل العشرية تحت بعضها.", "Pour additionner ou soustraire, aligne les virgules.", "Для додавання й віднімання запиши десяткові коми одна під одною."],
  ["percent", "אחוז אחד הוא חלק אחד מתוך 100. חצי הוא 50%.", "One percent means 1 out of 100. Half is 50%.", "Один процент — это 1 часть из 100. Половина — 50%.", "واحد في المئة يعني 1 من 100. النصف يساوي 50%.", "Un pour cent, c’est 1 sur 100. La moitié, c’est 50 %.", "Один відсоток — це 1 зі 100. Половина — це 50%."],
  ["ratio", "יחס משווה כמויות. ביחס ⁦1:3⁩ יש 3 חלקים מהכמות השנייה על כל חלק מהראשונה.", "A ratio compares amounts. In ⁦1:3⁩, there are 3 parts of the second amount for every part of the first.", "Отношение сравнивает количества. В ⁦1:3⁩ на одну часть первой величины приходятся 3 части второй.", "النسبة تقارن بين كميتين. في ⁦1:3⁩، لكل جزء من الكمية الأولى 3 أجزاء من الثانية.", "Un rapport compare des quantités. Dans ⁦1:3⁩, il y a 3 parts de la deuxième quantité pour une part de la première.", "Відношення порівнює кількості. У ⁦1:3⁩ на одну частину першої кількості припадає 3 частини другої."],
  ["area", "שטח אומר כמה מקום יש בתוך צורה. במלבן כופלים אורך ברוחב.", "Area tells how much space is inside a shape. For a rectangle, multiply length by width.", "Площадь показывает, сколько места внутри фигуры. Для прямоугольника умножь длину на ширину.", "المساحة تبيّن مقدار الحيّز داخل الشكل. في المستطيل اضرب الطول في العرض.", "L’aire indique la place à l’intérieur d’une figure. Pour un rectangle, multiplie la longueur par la largeur.", "Площа показує, скільки місця всередині фігури. Для прямокутника помнож довжину на ширину."],
  ["volume", "נפח אומר כמה מקום גוף תופס. בתיבה כופלים אורך, רוחב וגובה.", "Volume tells how much space a solid takes up. For a box, multiply length, width and height.", "Объём показывает, сколько места занимает тело. Для прямоугольной коробки перемножь длину, ширину и высоту.", "الحجم يبيّن مقدار الحيّز الذي يشغله الجسم. للصندوق، اضرب الطول في العرض في الارتفاع.", "Le volume indique la place qu’occupe un solide. Pour une boîte, multiplie la longueur, la largeur et la hauteur.", "Об’єм показує, скільки місця займає тіло. Для коробки перемнож довжину, ширину й висоту."],
  ["circle", "הרדיוס הוא המרחק מהמרכז לשפת המעגל. הקוטר הוא פי 2 מהרדיוס.", "The radius goes from the centre to the edge. The diameter is twice the radius.", "Радиус идёт от центра до края. Диаметр в два раза длиннее радиуса.", "نصف القطر يصل المركز بحافة الدائرة. القطر يساوي ضعفي نصف القطر.", "Le rayon va du centre au bord. Le diamètre vaut deux fois le rayon.", "Радіус іде від центра до краю. Діаметр удвічі довший за радіус."],
  ["measurement", "בדקו באיזו יחידה נתונה המידה ובאיזו יחידה צריך לענות. לדוגמה, מטר אחד הוא 100 ס״מ.", "Check the unit given and the unit you need in your answer. For example, 1 metre is 100 cm.", "Посмотри, в каких единицах даны числа и в каких нужен ответ. Например, 1 метр — это 100 см.", "انتبه إلى الوحدة المعطاة والوحدة المطلوبة. مثلًا، المتر الواحد يساوي 100 سم.", "Regarde l’unité de départ et celle demandée. Par exemple, 1 mètre vaut 100 cm.", "Перевір, у яких одиницях дано число і в яких треба відповісти. Наприклад, 1 метр — це 100 см."],
  ["negatives", "על ישר המספרים, מספרים שליליים נמצאים משמאל ל־0. ככל שזזים שמאלה, המספר קטן יותר.", "Negative numbers are to the left of 0 on the number line. The farther left you go, the smaller the number.", "Отрицательные числа находятся слева от 0. Чем левее число, тем оно меньше.", "الأعداد السالبة تقع يسار 0 على خط الأعداد. كلما اتجهت يسارًا صغر العدد.", "Les nombres négatifs sont à gauche de 0. Plus on va à gauche, plus le nombre est petit.", "Від’ємні числа розташовані ліворуч від 0. Що лівіше число, то воно менше."],
  ["algebra", "חברו רק איברים עם אותו חלק של אותיות. למשל ⁦2x + 3x = 5x⁩.", "Add terms with the same letter part. For example, ⁦2x + 3x = 5x⁩.", "Складывай слагаемые с одинаковой буквенной частью. Например, ⁦2x + 3x = 5x⁩.", "اجمع الحدود التي لها الجزء الحرفي نفسه. مثلًا ⁦2x + 3x = 5x⁩.", "Additionne les termes qui ont la même partie avec des lettres. Par exemple, ⁦2x + 3x = 5x⁩.", "Додавай доданки з однаковою буквеною частиною. Наприклад, ⁦2x + 3x = 5x⁩."],
]) {
  guideRules[topic] = he;
  uiTranslations.set(he, labels);
}

function openLearn() { openReminder(); }

function openReminder() {
  let screen = document.getElementById('remind-scr');
  if (!screen) {
    screen = document.createElement('div');
    screen.className = 'scr';
    screen.id = 'remind-scr';
    document.body.append(screen);
  }
  const config = window.GRADE_CONFIG;
  const topics = ALL_CATS.filter(topic => config?.availableCategories.includes(topic.id));
  if (config?.gradeId !== 'א') topics.unshift({id:'timesTable', icon:'×', name:'טבלת הכפל'});

  screen.innerHTML = `
    <div class="study-guide">
      <header class="study-banner">
        <div><h1>מדריך הלימוד</h1><p>בחרו נושא, קראו את הכלל ונסו דוגמה.</p></div>
        <button type="button" class="back" onclick="show('home')">← חזרה</button>
      </header>
      <div class="study-layout">
        <aside class="study-nav">
          <h2>נושאים</h2>
          <label class="study-select"><span>בחרו נושא למעבר לדוגמאות</span><select id="study-topic-select"></select></label>
          <div class="study-topics"></div>
        </aside>
        <section class="study-content" id="study-topic" aria-labelledby="study-topic-heading"></section>
      </div>
    </div>`;
  const nav = screen.querySelector('.study-topics');
  const select = screen.querySelector('select');
  const content = screen.querySelector('.study-content');
  const buttons = new Map();
  function selectTopic(topic) {
    select.value = topic.id;
    buttons.forEach((button,id) => button.setAttribute('aria-pressed', String(id === topic.id)));
    renderStudyTopic(content, topic, config.gradeId);
  }
  for (const topic of topics) {
    select.add(new Option(topic.name, topic.id));
    const button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = `<span aria-hidden="true">${topic.icon}</span><span>${topic.name}</span>`;
    button.setAttribute('aria-controls',content.id);
    button.onclick = () => selectTopic(topic);
    nav.append(button);
    buttons.set(topic.id,button);
  }
  select.onchange = () => selectTopic(topics.find(topic => topic.id === select.value));
  if (topics.length) selectTopic(topics[0]);
  show(screen.id);
  screen.scrollIntoView({block:'start'});
}

function renderStudyTopic(content, topic, grade) {
  content.innerHTML = `<h2 id="study-topic-heading"><span aria-hidden="true">${topic.icon}</span> <span>${topic.name}</span></h2>`;
  if (topic.id === 'timesTable') {
    renderStudyTimesTable(content);
    return;
  }
  const rule = guideRules[topic.id];
  const reference = REMINDERS[guideReferenceIds[topic.id]];
  const sample = curriculum[grade]?.[topic.id] && curriculumQuestion(grade, topic.id, 'easy', 4);
  const tips = rule ? [['',rule]] : reference?.sections[0]?.rows.slice(0,3) ||
    (sample?.explanation ? [['',sample.explanation]] : []);
  if (tips.length) {
    const rulePanel = document.createElement('div');
    rulePanel.className = 'study-rule';
    rulePanel.innerHTML = '<h3>איך פותרים?</h3><ul>'+tips.map(([label, explanation]) =>
      `<li>${label ? '<strong>'+label+'</strong> ' : ''}<span>${explanation}</span></li>`).join('')+'</ul>';
    content.append(rulePanel);
  }
  const choices = practiceChoices(grade, topic.id).filter(choice => choice.make);
  const examples = document.createElement('div');
  examples.className = 'study-examples';
  examples.innerHTML = '<h3>נסו בעצמכם</h3>';
  content.append(examples);
  const make = choices.length === 1 ? choices[0].make : undefined;
  const questions = genPool(topic.id, 'easy', 2, [], make);
  if (choices.length > 1) {
    questions[0] = choices[0].make();
    questions[1] = choices.find(choice => choice.diff === 'medium')?.make() || choices[1].make();
  }
  for (const [index, q] of questions.entries()) {
    const card = document.createElement('article');
    card.className = 'study-example';
    const genericHint = q.explanation === variantHint[0] ? '' : q.explanation;
    let explanation = q.cat === 'clock' ? 'המחוג הקצר מצביע על המספר שבתשובה.' : genericHint;
    if (!explanation && ['add','sub','mul','div'].includes(q.cat)) {
      const operands = q.text.match(/^(\d+)\s*[+−×÷]\s*(\d+)\s*=/);
      if (operands) {
        const [,first,second] = operands;
        explanation = {add:`${first} + ${second} = ${q.answer}`, sub:`${q.answer} + ${second} = ${first}`,
          mul:`${first} × ${second} = ${q.answer}`, div:`${second} × ${q.answer} = ${first}`}[q.cat];
      }
    }
    card.innerHTML = `
      <div class="study-question" dir="${q.dir || 'auto'}">${questionPrompt(q)}</div>
      <div class="question-visual study-visual"></div>
      <details ${index === 0 ? 'open' : ''}>
        <summary>הצגת הפתרון</summary>
        ${explanation ? `<p>${explanation}</p>` : ''}
        <p><strong>תשובה</strong> <bdi>${worksheetAnswerLabel(q)}</bdi></p>
      </details>`;
    examples.append(card);
    const visual = card.querySelector('.study-visual');
    mountQuestionVisual(visual, q);
    const cells = visual.querySelectorAll('.fraction-cell-grid button');
    if (cells.length) {
      visual.inert = true;
      const solution = card.querySelector('details');
      const showShading = () => cells.forEach((cell,i) => cell.setAttribute('aria-pressed', String(solution.open && i < q.answer)));
      solution.addEventListener('toggle', showShading);
      showShading();
    }
  }
  const practice = document.createElement('button');
  practice.className = 'auth-btn study-practice';
  practice.type = 'button';
  practice.textContent = 'תרגול בנושא';
  practice.onclick = () => openCat(topic.id);
  content.append(practice);
}

function renderStudyTimesTable(content) {
  const size = 10;
  const cells = Array.from({length:size}, (_,i) => i+1);
  const table = document.createElement('table');
  table.className = 'study-times-table';
  table.setAttribute('aria-labelledby','study-topic-heading');
  table.dir = 'ltr';
  table.innerHTML = `<thead><tr><th scope="col">×</th>${cells.map(col => `<th scope="col">${col}</th>`).join('')}</tr></thead>
    <tbody>${cells.map(row => `<tr><th scope="row">${row}</th>${cells.map(col =>
      `<td><button type="button" aria-label="${row} × ${col} = ${row*col}" aria-pressed="false">${row*col}</button></td>`).join('')}</tr>`).join('')}</tbody>`;
  const hint = document.createElement('p');
  hint.className = 'study-table-hint';
  hint.textContent = 'בחרו משבצת. המספר בראש העמודה כפול המספר בתחילת השורה נותן את המכפלה.';
  const result = document.createElement('output');
  result.className = 'study-table-result';
  result.dir = 'ltr';
  result.setAttribute('aria-live','polite');
  const selectCell = button => {
    const cell = button.parentElement;
    const row = table.rows[cell.parentElement.rowIndex];
    table.querySelector('[aria-pressed="true"]')?.setAttribute('aria-pressed','false');
    table.querySelectorAll('.study-highlight').forEach(el => el.classList.remove('study-highlight'));
    for (const item of row.cells) item.classList.add('study-highlight');
    for (const item of table.rows) item.cells[cell.cellIndex].classList.add('study-highlight');
    button.setAttribute('aria-pressed','true');
    result.textContent = button.getAttribute('aria-label');
  };
  table.onclick = event => {
    const button = event.target.closest('button');
    if (button) selectCell(button);
  };
  const example = document.createElement('article');
  example.className = 'study-example study-table-example';
  example.innerHTML = `<h3>נסו בעצמכם</h3><p dir="ltr">7 × 8 = ?</p>
    <details><summary>הצגת הפתרון</summary><p dir="ltr">7 × 8 = 56</p></details>`;
  content.append(hint, result, table, example);
  selectCell(table.rows[3].cells[4].firstElementChild);
}

// Backward compatibility for callers of the old lessons screen.
function openLesson() { openReminder(); }
const LEARN_TOPICS = [];
const LESSONS = {};
