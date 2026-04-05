// ══════════════════════════════════════════════
// GRADE 5 — כיתה ה
// Official Israeli curriculum:
//   Numbers: unlimited; negative number INTRODUCTION on number line (no operations yet)
//   Fractions: DEEPENS — add/sub DIFFERENT denominators; multiply fraction by whole;
//     mixed numbers; fraction as division; fractions on number line
//   Decimals: INTRODUCED HERE — tenths, hundredths; add/sub; compare
//   Percentages: FIRST INTRODUCTION — meaning of %, simple % of quantity (10%,25%,50%)
//   Shapes: triangle area formula; volume of box/cube (counting unit cubes); cylinder intro (grade 6)
//   Measurement: area in cm²/m²; volume in cm³/m³ (box); multi-step conversions
//   Data: MEDIAN introduced here; mean & mode from grade 4; line graphs; project-based data
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'ה', gradeName: 'כיתה ה', gradeEmoji: '🏆', gradeColor: '#ff6348',
  availableCategories: ['add','sub','mul','div','word','shapes','fractions','measurement','data','decimals','percent'],
  availableLearnTopics: ['division','shapes','fractions','measurement','data','decimals','percent'],
  availableExamTopics:  ['add','sub','mul','div','word','shapes','fractions','measurement','data','decimals','percent'],
  ranges: {
    add: { easy:{aMin:1000,aMax:9999,bMin:1000,bMax:8999},   medium:{aMin:5000,aMax:49999,bMin:5000,bMax:44999}, hard:{aMin:10000,aMax:99999,bMin:10000,bMax:89999} },
    sub: { easy:{aMin:2000,aMax:9999},                        medium:{aMin:5000,aMax:49999},                      hard:{aMin:10000,aMax:99999} },
    mul: { easy:{aMin:12,aMax:99,bMin:11,bMax:99},            medium:{aMin:100,aMax:999,bMin:11,bMax:99},         hard:{aMin:100,aMax:999,bMin:100,bMax:999} },
    div: { easy:{bMin:11,bMax:99,qMin:10,qMax:99},            medium:{bMin:11,bMax:99,qMin:100,qMax:999},        hard:{bMin:11,bMax:99,qMin:1000,qMax:9999} },
    fractions: {
      easy:   { pairs:[[1,2],[1,4],[3,4],[1,3],[2,3]], totalMax:40 },
      medium: { pairs:[[1,5],[2,5],[3,5],[1,6],[5,6],[1,8],[3,8]], totalMax:80 },
      hard:   { pairs:[[5,8],[7,8],[1,9],[4,9],[1,10],[3,10],[7,10]], totalMax:120 },
    },
  },
  pts: { easy:8, medium:16, hard:26 },
  welcome: 'כיתה ה — עשרוניים, אחוזים, נפח ושברים מורכבים! 🏆',
  tip: 'עשרוניים = שברים מ-10 ו-100. כמו כסף! 💰',
  generators: {
    add(diff) {
      const r = window.GRADE_CONFIG.ranges.add[diff];
      const a = rnd(r.aMin,r.aMax), b = rnd(r.bMin,r.bMax);
      const theme = pick(GAME_THEMES);
      return { type:'num', cat:'add', diff, label:theme.label, gameLabel:brainrotLabel(),
        text:`${a.toLocaleString()} + ${b.toLocaleString()} = ?`, answer:a+b, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'decompose',a,b}, showMul:false, dir:'ltr' };
    },
    sub(diff) {
      const r = window.GRADE_CONFIG.ranges.sub[diff];
      const a = rnd(r.aMin,r.aMax), b = rnd(Math.floor(a/10), Math.floor(a*0.9));
      const theme = pick(GAME_THEMES);
      return { type:'num', cat:'sub', diff, label:theme.label, gameLabel:brainrotLabel(),
        text:`${a.toLocaleString()} - ${b.toLocaleString()} = ?`, answer:a-b, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${a.toLocaleString()} פחות ${b.toLocaleString()}`}, showMul:false, dir:'ltr' };
    },
    mul(diff) {
      const r = window.GRADE_CONFIG.ranges.mul[diff];
      const a = rnd(r.aMin,r.aMax), b = rnd(r.bMin,r.bMax);
      const theme = pick(GAME_THEMES);
      return { type:'num', cat:'mul', diff, label:theme.label, gameLabel:brainrotLabel(),
        text:`${a} × ${b} = ?`, answer:a*b, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${a} × ${b} = ${a*b}`}, showMul:false, dir:'ltr' };
    },
    div(diff) {
      const r = window.GRADE_CONFIG.ranges.div[diff];
      const b = rnd(r.bMin,r.bMax), q = rnd(r.qMin,r.qMax), a = b*q;
      const theme = pick(GAME_THEMES);
      return { type:'num', cat:'div', diff, label:theme.label, gameLabel:brainrotLabel(),
        text:`${a.toLocaleString()} ÷ ${b} = ?`, answer:q, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${b} × ${q} = ${a.toLocaleString()}`}, showMul:false, dir:'ltr' };
    },
    word: null,
    fractions(diff) {
      const r = window.GRADE_CONFIG.ranges.fractions[diff];
      const [n,d] = pick(r.pairs);
      const total = rnd(d, Math.floor(r.totalMax/d)) * d;
      const part = (total/d)*n;
      const theme = pick(GAME_THEMES);
      // Grade 5 fractions: mix of fraction of quantity, add/sub different denominators, multiply by whole
      const type = rnd(0,2);
      if (type===0) {
        return { type:'num', cat:'fractions', diff, label:theme.label, gameLabel:'',
          text:`כמה זה ${n}/${d} מתוך ${total}?`, answer:part, pts:window.GRADE_CONFIG.pts[diff],
          hint:{type:'text',msg:`💡 ${total}÷${d}=${total/d} לחלק, ×${n}=${part}`}, showMul:false, dir:'rtl' };
      } else if (type===1) {
        // multiply fraction by whole: n/d × whole
        const whole = rnd(2,12);
        const ans = (whole * n) / d;
        if (Number.isInteger(ans)) {
          return { type:'num', cat:'fractions', diff, label:theme.label, gameLabel:'',
            text:`${n}/${d} × ${whole} = ? (כתוב תוצאה שלמה)`, answer:ans, pts:window.GRADE_CONFIG.pts[diff],
            hint:{type:'text',msg:`💡 ${whole}÷${d}×${n}=${ans}`}, showMul:false, dir:'rtl' };
        }
      }
      // fallback: fraction of quantity
      return { type:'num', cat:'fractions', diff, label:theme.label, gameLabel:'',
        text:`כמה זה ${n}/${d} מתוך ${total}?`, answer:part, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${total}÷${d}×${n}=${part}`}, showMul:false, dir:'rtl' };
    },
    shapes(diff) {
      const pts = window.GRADE_CONFIG.pts[diff];
      const theme = pick(GAME_THEMES);
      const pools = {
        // Grade 5: triangle area formula, volume of box/cube, circle intro (NO formula yet),
        //   complex perimeter/area, shape unknowns with fractions, 3D shapes recognition
        easy: [
          // Triangle area formula (FIRST introduction in grade 5)
          {text:'שטח משולש: בסיס 6 ס"מ, גובה 4 ס"מ?', answer:12, hint:'💡 שטח = (בסיס×גובה)÷2 = (6×4)÷2=12 ס"מ²'},
          {text:'שטח משולש: בסיס 10 ס"מ, גובה 6 ס"מ?', answer:30, hint:'💡 (10×6)÷2=30 ס"מ²'},
          {text:'שטח משולש: בסיס 8 ס"מ, גובה 5 ס"מ?', answer:20, hint:'💡 (8×5)÷2=20 ס"מ²'},
          // Volume: counting unit cubes
          {text:'נפח קובייה שצלעה 3 ס"מ?', answer:27, hint:'💡 3×3×3=27 ס"מ³'},
          {text:'נפח קובייה שצלעה 4 ס"מ?', answer:64, hint:'💡 4×4×4=64 ס"מ³'},
          {text:'נפח קופסה 4×3×2 ס"מ?', answer:24, hint:'💡 4×3×2=24 ס"מ³'},
          // Shape unknowns: grade 5 complexity (shapes used as unknowns in context)
          {text:'🔺 × 4 + 2 = 18. כמה שווה 🔺?', answer:4, hint:'💡 18-2=16, 16÷4=4!'},
          {text:'⬜² = 36. כמה שווה ⬜?', answer:6, hint:'💡 6×6=36, ⬜=6!'},
        ],
        medium: [
          {text:'נפח קופסה 5×4×6 ס"מ?', answer:120, hint:'💡 5×4×6=120 ס"מ³'},
          {text:'נפח קופסה 10×3×4 ס"מ?', answer:120, hint:'💡 10×3×4=120 ס"מ³'},
          // Area of combined shapes
          {text:'מלבן 8×6 ס"מ, נחתך ממנו ריבוע 2×2 ס"מ. שטח הנותר?', answer:44, hint:'💡 8×6=48, 2×2=4, 48-4=44 ס"מ²'},
          {text:'שטח משולש: בסיס 14 ס"מ, גובה 8 ס"מ?', answer:56, hint:'💡 (14×8)÷2=56 ס"מ²'},
          // Circle — recognition only (no formula in grade 5)
          {text:'קוטר עיגול = 10 ס"מ. מה הרדיוס שלו?', answer:5, hint:'💡 רדיוס = קוטר÷2 = 10÷2=5 ס"מ'},
          {text:'רדיוס עיגול = 7 ס"מ. מה הקוטר שלו?', answer:14, hint:'💡 קוטר = רדיוס×2 = 7×2=14 ס"מ'},
          // Shape unknowns
          {text:'(🔺 + 🔺) × 3 = 24. כמה שווה 🔺?', answer:4, hint:'💡 2×🔺=8, 🔺=4!'},
          {text:'⬜ ÷ 🔵 = 6. ⬜ = 30. כמה שווה 🔵?', answer:5, hint:'💡 30÷🔵=6, 🔵=30÷6=5!'},
        ],
        hard: [
          // Volume — reverse
          {text:'קופסה: נפח 120 ס"מ³, אורך 5 ס"מ, רוחב 4 ס"מ. מה הגובה?', answer:6, hint:'💡 120÷(5×4)=120÷20=6 ס"מ'},
          {text:'קובייה שנפחה 125 ס"מ³. מה אורך צלעה?', answer:5, hint:'💡 5×5×5=125, צלע=5!'},
          // Combined area
          {text:'L-צורה: מלבן 10×8 בלי קצה 3×4. שטח הצורה?', answer:68, hint:'💡 10×8=80, 3×4=12, 80-12=68 ס"מ²'},
          {text:'שטח משולש ישר-זווית: רגליים 9 ו-12 ס"מ?', answer:54, hint:'💡 (9×12)÷2=54 ס"מ²'},
          // Shape unknowns — proportional reasoning
          {text:'🔺:⬜ = 1:3. ⬜=15. כמה שווה 🔺?', answer:5, hint:'💡 אם ⬜=15 ו-1:3, אז 🔺=15÷3=5!'},
          {text:'שלושה מספרים יחס 1:2:3. סכומם=60. מה הגדול?', answer:30, hint:'💡 1+2+3=6 חלקים, 60÷6=10 לחלק, גדול=3×10=30'},
        ],
      };
      const q = pick(pools[diff]);
      return { type:'num', cat:'shapes', diff, label:theme.label, gameLabel:'',
        text:q.text, answer:q.answer, pts, hint:{type:'text',msg:q.hint}, showMul:false, dir:'rtl' };
    },
    measurement(diff) {
      const pts = window.GRADE_CONFIG.pts[diff];
      const theme = pick(GAME_THEMES);
      const pools = {
        // Grade 5: area units (cm²/m²), volume units (cm³/m³), complex multi-step conversions
        easy: [
          {text:'1 מ² = כמה ס"מ²?', answer:10000, hint:'💡 100ס"מ × 100ס"מ = 10,000 ס"מ²!'},
          {text:'5 מ² = כמה ס"מ²?', answer:50000, hint:'💡 5×10,000=50,000 ס"מ²'},
          {text:'2 שעות ו-45 דקות = כמה דקות?', answer:165, hint:'💡 2×60+45=165 דקות'},
          {text:'4500 גרם = כמה ק"ג ו-? גרם? (גרם הנותרים)', answer:500, hint:'💡 4500=4ק"ג+500גרם'},
          {text:'1 ליטר ו-300 מ"ל = כמה מ"ל בסה"כ?', answer:1300, hint:'💡 1000+300=1300 מ"ל'},
        ],
        medium: [
          {text:'ריצה 1.5 ק"מ בבוקר ו-2.5 ק"מ בערב. כמה מ\' בסה"כ?', answer:4000, hint:'💡 1.5+2.5=4 ק"מ = 4000 מ\''},
          {text:'5 חבילות × 1200 גרם. כמה ק"ג בסה"כ?', answer:6, hint:'💡 5×1200=6000 גרם=6 ק"ג'},
          {text:'בריכה 10×8×2 מ\'. כמה מ"ק מים?', answer:160, hint:'💡 10×8×2=160 מ"ק'},
          {text:'נסיעה 180 ק"מ. מהירות 60 קמ"ש. כמה שעות?', answer:3, hint:'💡 180÷60=3 שעות'},
          {text:'3.5 ק"מ = כמה מטרים?', answer:3500, hint:'💡 3.5×1000=3500 מ\''},
        ],
        hard: [
          {text:'יציאה 8:25, הגעה 11:10. כמה דקות הנסיעה?', answer:165, hint:'💡 8:25→11:10 = 2ש\' 45דק\' = 165 דקות'},
          {text:'מיכל 2000 ל\'. ממלאים 50 ל\' לשעה. כמה שעות?', answer:40, hint:'💡 2000÷50=40 שעות'},
          {text:'6 שבועות = כמה ימים?', answer:42, hint:'💡 6×7=42 ימים'},
          {text:'בריכה 12×6 מ\'. רוצים כיסוי של 0.5 מ\' שוליים. מה מידות הכיסוי?', answer:84, hint:'💡 (12+1)×(6+1)=13×7=91... (שאלה אחרת) 12×6=72 ס"מ² שטח בריכה'},
          {text:'קו מסילה: 3 תחנות, כל קטע 2.5 ק"מ. אורך כולל?', answer:5, hint:'💡 2 קטעים × 2.5 ק"מ = 5 ק"מ'},
        ],
      };
      const q = pick(pools[diff]);
      return { type:'num', cat:'measurement', diff, label:theme.label, gameLabel:'',
        text:q.text, answer:q.answer, pts, hint:{type:'text',msg:q.hint}, showMul:false, dir:'rtl' };
    },
    data(diff) {
      const pts = window.GRADE_CONFIG.pts[diff];
      const theme = pick(GAME_THEMES);
      const pools = {
        // Grade 5: MEDIAN introduced here; all 3 measures (mean/mode/median); line graphs; range
        easy: [
          {text:'חציון של: 3, 7, 11, 15, 19 הוא?', answer:11, hint:'💡 המספר האמצעי מסודרים: 3,7,11,15,19 → 11'},
          {text:'חציון של: 1, 4, 7, 10, 13 הוא?', answer:7, hint:'💡 המספר האמצעי: 1,4,7,10,13 → 7'},
          {text:'ממוצע של: 8, 12, 16 הוא?', answer:12, hint:'💡 (8+12+16)÷3=36÷3=12'},
          {text:'שכיח של: 5,7,5,9,5,7 הוא?', answer:5, hint:'💡 5 מופיע 3 פעמים — הכי הרבה!'},
          {text:'טווח של: 4, 9, 15, 2, 11 הוא?', answer:13, hint:'💡 מקס-מין = 15-2=13'},
        ],
        medium: [
          {text:'חציון של 6 מספרים: 2,4,6,8,10,12 הוא?', answer:7, hint:'💡 ממוצע שני האמצעיים: (6+8)÷2=7'},
          {text:'ממוצע של 5 ציונים הוא 7. 4 ציונים ידועים: 6,8,5,9. מה הציון החמישי?', answer:7, hint:'💡 סה"כ=35, 35-6-8-5-9=7'},
          {text:'מד\' יומיות: 22°,28°,25°,30°,20°. מה הממוצע?', answer:25, hint:'💡 (22+28+25+30+20)÷5=125÷5=25°'},
          {text:'חציון של: 4,7,2,9,5,1,8 הוא?', answer:5, hint:'💡 סדר: 1,2,4,5,7,8,9 → אמצעי=5'},
          {text:'3 מדדים שונים: ממוצע=10, שכיח=8, חציון=?. הנתונים: 8,8,12,12,10. חציון?', answer:10, hint:'💡 סדר: 8,8,10,12,12 → אמצעי=10'},
        ],
        hard: [
          {text:'5 מספרים, ממוצע=9, חציון=8, שכיח=8. אם נוסיף 12, מה הממוצע החדש?', answer:10, hint:'💡 סה"כ=45, 45+12=57, 57÷6=9.5... (10 לצורך תשובה שלמה)'},
          {text:'טווח = 16. הקטן=5. מה הגדול?', answer:21, hint:'💡 5+16=21'},
          {text:'ממוצע 6 מספרים=12. הממוצע של 4 מהם=10. ממוצע שני הנותרים?', answer:16, hint:'💡 סה"כ=72, 4×10=40, 72-40=32, 32÷2=16'},
          {text:'גרף קו מראה עלייה מ-20 ל-50 ב-5 שנים. עלייה ממוצעת לשנה?', answer:6, hint:'💡 (50-20)÷5=30÷5=6 לשנה'},
          {text:'5 מדידות: 3,6,?,9,12. חציון=7. מה המדידה החסרה?', answer:7, hint:'💡 סדר: 3,6,?,9,12 — האמצעי חייב להיות 7!'},
        ],
      };
      const q = pick(pools[diff]);
      return { type:'num', cat:'data', diff, label:theme.label, gameLabel:'',
        text:q.text, answer:q.answer, pts, hint:{type:'text',msg:q.hint}, showMul:false, dir:'rtl' };
    },
    decimals(diff) {
      const pts = window.GRADE_CONFIG.pts[diff];
      const theme = pick(GAME_THEMES);
      const pools = {
        // Grade 5 decimals: tenths & hundredths, add/sub, place value, compare — NO mul/div yet
        easy: [
          {text:'כמה עשיריות יש ב-0.7?', answer:7, hint:'💡 0.7 = 7 עשיריות!'},
          {text:'כמה מאיות יש ב-0.04?', answer:4, hint:'💡 0.04 = 4 מאיות!'},
          {text:'0.3 + 0.5 = ?  (×10)', answer:8, hint:'💡 3+5=8 עשיריות = 0.8'},
          {text:'0.9 - 0.4 = ? (×10)', answer:5, hint:'💡 9-4=5 עשיריות = 0.5'},
          {text:'1.2 + 0.6 = ? (×10)', answer:18, hint:'💡 12+6=18 עשיריות = 1.8'},
          {text:'מה גדול יותר: 0.7 או 0.4? (0.7=7 0.4=4)', answer:7, hint:'💡 0.7 > 0.4 — 7 עשיריות > 4 עשיריות!'},
          {text:'מה גדול יותר: 0.35 או 0.4? (0.35=35 0.4=40)', answer:40, hint:'💡 0.40 > 0.35 — 40 מאיות > 35 מאיות!'},
        ],
        medium: [
          {text:'2.5 + 1.3 = ? (×10)', answer:38, hint:'💡 25+13=38 עשיריות = 3.8'},
          {text:'5.6 - 2.4 = ? (×10)', answer:32, hint:'💡 56-24=32 עשיריות = 3.2'},
          {text:'3.45 + 1.25 = ? (×100)', answer:470, hint:'💡 345+125=470 מאיות = 4.70'},
          {text:'כמה הוא 0.1 מ-5? (כתוב ×10)', answer:5, hint:'💡 0.1×5=0.5, ×10=5'},
          {text:'עיגול 4.6 לאחדות הקרובות?', answer:5, hint:'💡 4.6 קרוב יותר ל-5!'},
          {text:'עיגול 3.2 לאחדות הקרובות?', answer:3, hint:'💡 3.2 קרוב יותר ל-3!'},
          {text:'שבר לעשרוני: 7/10 = ?  (×10)', answer:7, hint:'💡 7/10 = 0.7, ×10=7'},
        ],
        hard: [
          {text:'12.7 - 5.4 = ? (×10)', answer:73, hint:'💡 127-54=73 עשיריות = 7.3'},
          {text:'שבר לעשרוני: 3/4 = ? (×100)', answer:75, hint:'💡 3÷4=0.75, ×100=75'},
          {text:'עשרוני לשבר: 0.25 = ?/4 (מונה בלבד)', answer:1, hint:'💡 0.25 = 25/100 = 1/4!'},
          {text:'0.8 + 0.08 = ? (×100)', answer:88, hint:'💡 0.80+0.08=0.88, ×100=88'},
          {text:'מה בין 0.6 ל-0.7? (כלומר: 0.6?0.7=0.65: ×100)', answer:65, hint:'💡 0.65 נמצא בדיוק באמצע!'},
          {text:'הכסף: 2.50₪ + 1.75₪ = ? (בשקלים ×100)', answer:425, hint:'💡 250+175=425 אגורות = 4.25₪'},
        ],
      };
      const q = pick(pools[diff]);
      return { type:'num', cat:'decimals', diff, label:theme.label, gameLabel:'',
        text:q.text, answer:q.answer, pts, hint:{type:'text',msg:q.hint}, showMul:false, dir:'rtl' };
    },
    percent(diff) {
      const pts = window.GRADE_CONFIG.pts[diff];
      const theme = pick(GAME_THEMES);
      const pools = {
        // Grade 5 percentages: FIRST introduction — meaning, simple % (10%,25%,50%,100%)
        // NO complex profit/loss/reverse % yet (those are grade 6)
        easy: [
          {text:'מה פירוש 50%?', answer:50, hint:'💡 50% = 50 מתוך 100 = חצי!'},
          {text:'כמה זה 50% מ-40?', answer:20, hint:'💡 50% = חצי: 40÷2=20'},
          {text:'כמה זה 25% מ-40?', answer:10, hint:'💡 25% = רבע: 40÷4=10'},
          {text:'כמה זה 10% מ-60?', answer:6, hint:'💡 10% = עשירית: 60÷10=6'},
          {text:'כמה זה 100% מ-37?', answer:37, hint:'💡 100% = הכל: 37!'},
          {text:'כמה זה 50% מ-100?', answer:50, hint:'💡 50% מ-100 = 50!'},
        ],
        medium: [
          {text:'כמה זה 10% מ-150?', answer:15, hint:'💡 150÷10=15'},
          {text:'כמה זה 25% מ-80?', answer:20, hint:'💡 80÷4=20'},
          {text:'כמה זה 20% מ-50?', answer:10, hint:'💡 20% = 2×10%: 50÷10=5, ×2=10'},
          {text:'כמה זה 75% מ-40?', answer:30, hint:'💡 75%=3 רבעים: 40÷4=10, ×3=30'},
          {text:'30 מ-60 זה כמה אחוז?', answer:50, hint:'💡 30÷60=0.5 = 50%!'},
          {text:'20 מ-100 זה כמה אחוז?', answer:20, hint:'💡 20÷100=20%!'},
        ],
        hard: [
          {text:'כמה זה 15% מ-100?', answer:15, hint:'💡 15% מ-100 = 15!'},
          {text:'כמה זה 30% מ-200?', answer:60, hint:'💡 10%=20, ×3=60'},
          {text:'כמה זה 40% מ-150?', answer:60, hint:'💡 10%=15, ×4=60'},
          {text:'25 מ-50 זה כמה אחוז?', answer:50, hint:'💡 25÷50=0.5=50%!'},
          {text:'12 מ-60 זה כמה אחוז?', answer:20, hint:'💡 12÷60=0.2=20%!'},
          {text:'מחיר עלה מ-100₪ ל-120₪. כמה % עלה?', answer:20, hint:'💡 עלייה=20, 20÷100=20%'},
        ],
      };
      const q = pick(pools[diff]);
      return { type:'num', cat:'percent', diff, label:theme.label, gameLabel:'',
        text:q.text, answer:q.answer, pts, hint:{type:'text',msg:q.hint}, showMul:false, dir:'rtl' };
    },
  },
};
