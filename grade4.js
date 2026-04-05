// ══════════════════════════════════════════════
// GRADE 4 — כיתה ד
// Official Israeli curriculum:
//   Numbers: unlimited range; estimation; rounding
//   Operations: 4 ops including long division; order of operations + parentheses
//   Fractions: BEGINS HERE formally — equivalent fractions, ordering, add/sub SAME denominator
//     fraction as part of whole AND part of quantity; mixed numbers intro
//   NO percentages yet, NO decimals (those start grade 5)
//   Shapes: area formulas for rectangle/square; parallelogram area; angles with protractor
//     parallel & perpendicular lines; symmetry
//   Measurement: unit conversions (km↔m↔cm↔mm, kg↔g, l↔ml, hours↔min↔sec)
//   Data: mean (average) introduced HERE; bar charts, reading tables
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'ד', gradeName: 'כיתה ד', gradeEmoji: '🔮', gradeColor: '#9b59b6',
  availableCategories: ['add','sub','mul','div','word','shapes','fractions','measurement','data'],
  availableLearnTopics: ['division','shapes','fractions','measurement','data'],
  availableExamTopics:  ['add','sub','mul','div','word','shapes','fractions','measurement','data'],
  ranges: {
    add: { easy:{aMin:100,aMax:999,bMin:100,bMax:899}, medium:{aMin:500,aMax:9999,bMin:500,bMax:9499}, hard:{aMin:1000,aMax:99999,bMin:1000,bMax:98999} },
    sub: { easy:{aMin:200,aMax:999}, medium:{aMin:500,aMax:9999}, hard:{aMin:1000,aMax:99999} },
    mul: { easy:{aMin:2,aMax:9,bMin:11,bMax:99},   medium:{aMin:11,aMax:99,bMin:11,bMax:99},  hard:{aMin:11,aMax:99,bMin:100,bMax:999} },
    div: { easy:{bMin:2,bMax:9,qMin:10,qMax:99},   medium:{bMin:3,bMax:12,qMin:10,qMax:99},  hard:{bMin:4,bMax:12,qMin:100,qMax:999} },
    fractions: {
      easy:   { pairs:[[1,2],[1,4],[3,4],[1,3],[2,3]], totalMax:24 },
      medium: { pairs:[[1,5],[2,5],[3,5],[1,6],[5,6],[1,8],[3,8]], totalMax:48 },
      hard:   { pairs:[[5,8],[7,8],[2,9],[4,9],[7,9],[1,10],[3,10]], totalMax:90 },
    },
  },
  pts: { easy:7, medium:14, hard:22 },
  welcome: 'כיתה ד — שברים, שטח, ממוצע וחילוק ארוך! 🔮',
  tip: 'שברים מתחילים כאן — נלמד ביחד! 🍕',
  generators: {
    add: null, sub: null,
    mul(diff) {
      // Grade 4: multi-digit multiplication
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
        text:`${a} ÷ ${b} = ?`, answer:q, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${b} × ${q} = ${a}`}, showMul:false, dir:'ltr' };
    },
    word: null,
    fractions(diff) {
      const r = window.GRADE_CONFIG.ranges.fractions[diff];
      const [n,d] = pick(r.pairs);
      const total = rnd(d, Math.floor(r.totalMax/d)) * d;
      const part = (total/d)*n;
      const theme = pick(GAME_THEMES);
      // Mix: sometimes "fraction of quantity", sometimes "add/sub same denominator"
      const type = rnd(0,1);
      if (type === 0) {
        return { type:'num', cat:'fractions', diff, label:theme.label, gameLabel:'',
          text:`כמה זה ${n}/${d} מתוך ${total}?`, answer:part, pts:window.GRADE_CONFIG.pts[diff],
          hint:{type:'text',msg:`💡 ${total}÷${d}=${total/d} לכל חלק, ×${n}=${part}`}, showMul:false, dir:'rtl' };
      } else {
        // Add/sub fractions with SAME denominator
        const n2 = rnd(1, d-1);
        if (n + n2 <= d) {
          return { type:'num', cat:'fractions', diff, label:theme.label, gameLabel:'',
            text:`${n}/${d} + ${n2}/${d} = ? (כתוב את המונה, המכנה=${d})`, answer:n+n2, pts:window.GRADE_CONFIG.pts[diff],
            hint:{type:'text',msg:`💡 מכנים שווים: ${n}+${n2}=${n+n2}, תשובה: ${n+n2}/${d}`}, showMul:false, dir:'rtl' };
        }
        const nSub = rnd(1,n-1)||1;
        return { type:'num', cat:'fractions', diff, label:theme.label, gameLabel:'',
          text:`${n}/${d} - ${nSub}/${d} = ? (כתוב את המונה, המכנה=${d})`, answer:n-nSub, pts:window.GRADE_CONFIG.pts[diff],
          hint:{type:'text',msg:`💡 מכנים שווים: ${n}-${nSub}=${n-nSub}, תשובה: ${n-nSub}/${d}`}, showMul:false, dir:'rtl' };
      }
    },
    shapes(diff) {
      const pts = window.GRADE_CONFIG.pts[diff];
      const theme = pick(GAME_THEMES);
      const pools = {
        // Grade 4: area formulas, angles with measurements, parallel/perpendicular, symmetry, shape unknowns
        easy: [
          {text:'שטח מלבן 8 ס"מ × 5 ס"מ?', answer:40, hint:'💡 שטח=אורך×רוחב = 8×5=40 ס"מ²'},
          {text:'שטח ריבוע שצלעו 6 ס"מ?', answer:36, hint:'💡 6×6=36 ס"מ²'},
          {text:'שטח מלבן 10 ס"מ × 4 ס"מ?', answer:40, hint:'💡 10×4=40 ס"מ²'},
          {text:'היקף מלבן 9 ס"מ × 3 ס"מ?', answer:24, hint:'💡 (9+3)×2=24 ס"מ'},
          {text:'כמה מעלות בזווית ישרה?', answer:90, hint:'💡 זווית ישרה=90°!'},
          {text:'סכום זוויות המשולש?', answer:180, hint:'💡 תמיד 180°!'},
          {text:'סכום זוויות מרובע?', answer:360, hint:'💡 4×90=360°!'},
          // Equivalent fractions
          {text:'2/4 שווה ל-?/2 (כתוב את המונה)', answer:1, hint:'💡 2/4 = 1/2!'},
          {text:'3/6 שווה ל-?/2 (כתוב את המונה)', answer:1, hint:'💡 3/6 = 1/2!'},
        ],
        medium: [
          // Area of parallelogram
          {text:'שטח מקבילית: בסיס 8 ס"מ, גובה 5 ס"מ?', answer:40, hint:'💡 שטח=בסיס×גובה=8×5=40 ס"מ²'},
          {text:'שטח מקבילית: בסיס 12 ס"מ, גובה 4 ס"מ?', answer:48, hint:'💡 12×4=48 ס"מ²'},
          // Angles
          {text:'שתי זוויות במשולש: 65° ו-75°. מה השלישית?', answer:40, hint:'💡 180-65-75=40°'},
          {text:'שלוש זוויות במרובע: 90°,100°,80°. מה הרביעית?', answer:90, hint:'💡 360-90-100-80=90°'},
          // Parallel/perpendicular lines
          {text:'כמה זוגות קווים מקבילים יש במלבן?', answer:2, hint:'💡 שני אורכות מקבילים + שני רוחבות מקבילים = 2 זוגות!'},
          {text:'כמה ציר/י סימטריה יש לריבוע?', answer:4, hint:'💡 לריבוע 4 צירי סימטריה!'},
          {text:'כמה ציר/י סימטריה יש למלבן (שאינו ריבוע)?', answer:2, hint:'💡 למלבן 2 צירי סימטריה!'},
          // Shape unknowns — grade 4 complexity
          {text:'🔺 × 🔺 = 49. כמה שווה 🔺?', answer:7, hint:'💡 7×7=49!'},
          {text:'⬜ × 6 = 72. כמה שווה ⬜?', answer:12, hint:'💡 72÷6=12!'},
        ],
        hard: [
          // Area reverse problems
          {text:'מלבן ששטחו 48 ס"מ², אורכו 8 ס"מ. מה רוחבו?', answer:6, hint:'💡 48÷8=6 ס"מ'},
          {text:'ריבוע שהיקפו 36 ס"מ. מה שטחו?', answer:81, hint:'💡 צלע=36÷4=9, שטח=9×9=81 ס"מ²'},
          {text:'מלבן שהיקפו 30 ס"מ, רוחבו 7 ס"מ. מה אורכו?', answer:8, hint:'💡 30÷2=15, 15-7=8 ס"מ'},
          // Complex angles
          {text:'זווית אחת 140°. האם היא קהה? (כן=1 לא=0)', answer:1, hint:'💡 140>90 = קהה!'},
          {text:'שתי זוויות שלמות משלימות (=180°). אחת 115°. מה השנייה?', answer:65, hint:'💡 180-115=65°'},
          // Shape unknowns
          {text:'🔵 + 🔺 + 🔺 = 20. 🔺 = 6. כמה שווה 🔵?', answer:8, hint:'💡 6+6=12, 20-12=8!'},
          {text:'(⬜ + 3) × 2 = 18. כמה שווה ⬜?', answer:6, hint:'💡 18÷2=9, 9-3=6!'},
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
        // Grade 4: full unit conversions, time arithmetic, multi-step
        easy: [
          {text:'5 ק"מ = כמה מטרים?', answer:5000, hint:'💡 5×1000=5000 מ\''},
          {text:'3000 מ\' = כמה ק"מ?', answer:3, hint:'💡 3000÷1000=3 ק"מ'},
          {text:'4 ק"ג = כמה גרם?', answer:4000, hint:'💡 4×1000=4000 גרם'},
          {text:'2500 גרם = כמה ק"ג וחצי? (ק"ג שלמים)', answer:2, hint:'💡 2500÷1000=2.5, שלמים=2 ק"ג'},
          {text:'שעה וחצי = כמה דקות?', answer:90, hint:'💡 60+30=90 דקות'},
        ],
        medium: [
          {text:'2 שעות ו-20 דקות = כמה דקות?', answer:140, hint:'💡 2×60+20=140 דקות'},
          {text:'3600 שניות = כמה שעות?', answer:1, hint:'💡 3600÷60=60 דקות÷60=1 שעה'},
          {text:'7500 מ\' = כמה ק"מ + כמה מ\'? (מ\' הנותרים)', answer:500, hint:'💡 7500=7 ק"מ + 500 מ\''},
          {text:'רכיבת אופניים: 15 ק"מ בבוקר + 8 ק"מ בערב. כמה מ\' בסה"כ?', answer:23000, hint:'💡 15+8=23 ק"מ = 23000 מ\''},
          {text:'6 ליטר = כמה מ"ל?', answer:6000, hint:'💡 6×1000=6000 מ"ל'},
        ],
        hard: [
          {text:'יציאה 7:45, הגעה 10:15. כמה דקות?', answer:150, hint:'💡 7:45→10:15 = 2ש\' 30דק\' = 150 דקות'},
          {text:'5 חבילות, כל אחת 800 גרם. כמה ק"ג בסה"כ?', answer:4, hint:'💡 5×800=4000 גרם = 4 ק"ג'},
          {text:'מיכל 8 ליטר מים. שתינו 2500 מ"ל. כמה מ"ל נשאר?', answer:5500, hint:'💡 8000-2500=5500 מ"ל'},
          {text:'נסיעה 120 ק"מ בשעתיים. כמה ק"מ בשעה?', answer:60, hint:'💡 120÷2=60 ק"מ לשעה'},
          {text:'3 שבועות = כמה ימים?', answer:21, hint:'💡 3×7=21 ימים'},
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
        // Grade 4: MEAN (ממוצע) introduced here; mode (שכיח) introduced here; NO median yet
        easy: [
          {text:'ממוצע של 4, 6, 8 הוא?', answer:6, hint:'💡 (4+6+8)÷3=18÷3=6'},
          {text:'ממוצע של 10, 20, 30 הוא?', answer:20, hint:'💡 (10+20+30)÷3=60÷3=20'},
          {text:'ממוצע של 5, 5, 5, 5 הוא?', answer:5, hint:'💡 כל המספרים שווים — הממוצע הוא 5!'},
          {text:'שכיח של: 3,5,3,7,3 הוא?', answer:3, hint:'💡 3 מופיע הכי הרבה — הוא השכיח!'},
          {text:'שכיח של: 4,7,4,9,4,7 הוא?', answer:4, hint:'💡 4 מופיע 3 פעמים — הכי הרבה!'},
        ],
        medium: [
          {text:'ממוצע של 6, 8, 10, 12 הוא?', answer:9, hint:'💡 (6+8+10+12)÷4=36÷4=9'},
          {text:'ממוצע של 15, 25, 35 הוא?', answer:25, hint:'💡 (15+25+35)÷3=75÷3=25'},
          {text:'4 ציונים: 7, 9, 8, 8. מהו הממוצע?', answer:8, hint:'💡 (7+9+8+8)÷4=32÷4=8'},
          {text:'שכיח של: 2,4,4,6,6,6,8 הוא?', answer:6, hint:'💡 6 מופיע 3 פעמים!'},
          {text:'ממוצע של 3 מספרים הוא 8. מה סכומם?', answer:24, hint:'💡 ממוצע×כמות = 8×3=24'},
        ],
        hard: [
          {text:'ממוצע של 4 ציונים הוא 9. שלושה: 8, 11, 7. מה הציון הרביעי?', answer:10, hint:'💡 סה"כ=36, 36-8-11-7=10'},
          {text:'3 ציונים: 6,8,10. איזה ציון להוסיף כדי שהממוצע יהיה 8?', answer:8, hint:'💡 סה"כ צריך 32, 6+8+10=24, 32-24=8'},
          {text:'5 ספרים: עמודים 120,150,90,180,210. מה הממוצע?', answer:150, hint:'💡 (120+150+90+180+210)÷5=750÷5=150'},
          {text:'שכיח של: 2,4,6,6,8,8,8,10 הוא?', answer:8, hint:'💡 8 מופיע 3 פעמים — הכי הרבה!'},
          {text:'ממוצע של 6 מספרים הוא 10. הממוצע של 4 מהם הוא 8. מה ממוצע השניים הנותרים?', answer:14, hint:'💡 סה"כ=60, 4×8=32, 60-32=28, 28÷2=14'},
        ],
      };
      const q = pick(pools[diff]);
      return { type:'num', cat:'data', diff, label:theme.label, gameLabel:'',
        text:q.text, answer:q.answer, pts, hint:{type:'text',msg:q.hint}, showMul:false, dir:'rtl' };
    },
  },
};
