// ══════════════════════════════════════════════
// GRADE 2 — כיתה ב
// Official Israeli curriculum:
//   Numbers: up to 1,000; place value; number line; skip counting
//   Operations: add/sub up to 100 (and beyond), intro to mul/div (meaning only, up to 100)
//   Fractions: ONLY ½ and ¼ — recognising, not computing
//   Shapes: 2D shapes (sorting, properties), intro to perimeter (counting)
//   Measurement: cm, m, kg, g, l, ml — comparing and simple sums only
//   Data: reading pictographs & bar charts, collecting & organising data (NO mean/median yet)
//   Simple equations: □ + 3 = 7 style (box/shape unknown)
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'ב', gradeName: 'כיתה ב', gradeEmoji: '📊', gradeColor: '#ffd32a',
  availableCategories: ['add','sub','mul','word','shapes','measurement','data'],
  availableLearnTopics: ['mul','word','shapes','measurement','data'],
  availableExamTopics:  ['add','sub','mul','word','shapes','measurement','data'],
  ranges: {
    add: { easy:{aMin:5,aMax:30,bMin:1,bMax:20},  medium:{aMin:20,aMax:99,bMin:10,bMax:79}, hard:{aMin:50,aMax:500,bMin:50,bMax:499} },
    sub: { easy:{aMin:5,aMax:30},                   medium:{aMin:20,aMax:99},                  hard:{aMin:50,aMax:500} },
    mul: { easy:{aMin:2,aMax:4,bMin:1,bMax:5},      medium:{aMin:2,aMax:7,bMin:2,bMax:7},      hard:{aMin:3,aMax:10,bMin:3,bMax:9} },
  },
  pts: { easy:5, medium:10, hard:18 },
  welcome: 'ברוך הבא לכיתה ב! כפל, צורות, נתונים ומדידה! ⚡',
  tip: 'כבר יודע חיבור? נסה כפל! ✖️',
  generators: {
    add: null, sub: null, mul: null, word: null,
    shapes(diff) {
      const pts = window.GRADE_CONFIG.pts[diff];
      const theme = pick(GAME_THEMES);
      const pools = {
        // Grade 2: properties of shapes, perimeter by counting, ½ & ¼ recognition, shape unknowns
        easy: [
          {text:'כמה צלעות יש למשולש?', answer:3, hint:'💡 ספור את הקווים!'},
          {text:'כמה צלעות יש לריבוע?', answer:4, hint:'💡 4 צלעות שוות!'},
          {text:'כמה פינות יש למלבן?', answer:4, hint:'💡 4 פינות ישרות!'},
          {text:'כמה צלעות יש למחומש?', answer:5, hint:'💡 חמש = 5!'},
          {text:'לעיגול יש כמה פינות?', answer:0, hint:'💡 עיגול עגול — אין לו פינות!'},
          {text:'צורה עם 3 צלעות שוות — איזו צורה? (משולש=3 ריבוע=4)', answer:3, hint:'💡 3 צלעות שוות = משולש שווה-צלעות!'},
          // Box-unknown equations (Israeli style grade 2)
          {text:'⬜ + 4 = 9. כמה שווה ⬜?', answer:5, hint:'💡 9-4=5!'},
          {text:'⬜ - 3 = 6. כמה שווה ⬜?', answer:9, hint:'💡 6+3=9!'},
          {text:'🔺 + 🔺 = 10. כמה שווה 🔺?', answer:5, hint:'💡 10÷2=5!'},
        ],
        medium: [
          // Perimeter (counting sides, grade 2 level — add up given sides)
          {text:'ריבוע שכל צלע שלו 4 ס"מ. מה היקפו?', answer:16, hint:'💡 4+4+4+4=16 ס"מ'},
          {text:'מלבן: אורך 6 ס"מ, רוחב 2 ס"מ. מה היקפו?', answer:16, hint:'💡 6+2+6+2=16 ס"מ'},
          {text:'משולש שוה-צלעות, כל צלע 5 ס"מ. מה היקפו?', answer:15, hint:'💡 5+5+5=15 ס"מ'},
          // ½ and ¼ recognition (grade 2 — not formal computation)
          {text:'🍕 חולקה ל-2 חלקים שווים. מה שם כל חלק? (חצי=2 רבע=4)', answer:2, hint:'💡 2 חלקים שווים = חצי!'},
          {text:'🍕 חולקה ל-4 חלקים שווים. מה שם כל חלק? (חצי=2 רבע=4)', answer:4, hint:'💡 4 חלקים שווים = רבע!'},
          {text:'כמה חצאים יש בשלם?', answer:2, hint:'💡 שלם = 2 חצאים!'},
          {text:'כמה רבעים יש בשלם?', answer:4, hint:'💡 שלם = 4 רבעים!'},
          // Shape unknowns — slightly harder
          {text:'⬜ + ⬜ + ⬜ = 12. כמה שווה ⬜?', answer:4, hint:'💡 12÷3=4!'},
          {text:'🔺 + 5 = 13. כמה שווה 🔺?', answer:8, hint:'💡 13-5=8!'},
        ],
        hard: [
          // Perimeter with different side lengths
          {text:'מרובע: צלעות 3,5,3,5 ס"מ. מה היקפו?', answer:16, hint:'💡 3+5+3+5=16 ס"מ'},
          {text:'משולש: צלעות 4,6,5 ס"מ. מה היקפו?', answer:15, hint:'💡 4+6+5=15 ס"מ'},
          // ½ of a quantity (grade 2: concrete, no formal symbols)
          {text:'יש 8 עוגיות. חצי מהן — כמה?', answer:4, hint:'💡 8÷2=4 עוגיות!'},
          {text:'יש 12 גולות. רבע מהן — כמה?', answer:3, hint:'💡 12÷4=3 גולות!'},
          // Shape unknowns — two unknowns, simple
          {text:'🔵 + 🔺 = 10. 🔺 = 3. כמה שווה 🔵?', answer:7, hint:'💡 10-3=7!'},
          {text:'⬜ × 2 = 14. כמה שווה ⬜?', answer:7, hint:'💡 14÷2=7!'},
          {text:'חצי מ-⬜ = 6. כמה שווה ⬜?', answer:12, hint:'💡 6×2=12!'},
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
        // Grade 2: standard units (cm, m, kg, g, l, ml), simple sums, no decimal conversions
        easy: [
          {text:'כמה ס"מ יש ב-1 מטר?', answer:100, hint:'💡 מטר = 100 ס"מ!'},
          {text:'כמה גרם יש ב-1 ק"ג?', answer:1000, hint:'💡 קילוגרם = 1000 גרם!'},
          {text:'כמה מ"ל יש ב-1 ליטר?', answer:1000, hint:'💡 ליטר = 1000 מ"ל!'},
          {text:'עיפרון = 12 ס"מ. ממחק = 5 ס"מ. מה ביחד?', answer:17, hint:'💡 12+5=17 ס"מ'},
          {text:'מה ארוך יותר: 45 ס"מ או 1 מטר? (1מ=1)', answer:1, hint:'💡 מטר=100 ס"מ > 45 ס"מ!'},
        ],
        medium: [
          {text:'כמה ס"מ ב-2 מטר?', answer:200, hint:'💡 2×100=200 ס"מ'},
          {text:'כמה ס"מ ב-3 מטר?', answer:300, hint:'💡 3×100=300 ס"מ'},
          {text:'500 מ"ל + 500 מ"ל = כמה מ"ל?', answer:1000, hint:'💡 500+500=1000 מ"ל = 1 ליטר!'},
          {text:'3 ספרים × 300 גרם לכל ספר = כמה גרם?', answer:900, hint:'💡 3×300=900 גרם'},
          {text:'שעה = כמה דקות? ', answer:60, hint:'💡 שעה = 60 דקות!'},
          {text:'2 שעות = כמה דקות?', answer:120, hint:'💡 2×60=120 דקות'},
        ],
        hard: [
          {text:'4 מטר = כמה ס"מ?', answer:400, hint:'💡 4×100=400 ס"מ'},
          {text:'ריצה: 200 מ׳ בבוקר + 350 מ׳ אחה"צ. כמה מ׳?', answer:550, hint:'💡 200+350=550 מ\''},
          {text:'בקבוק = 750 מ"ל. שני בקבוקים = כמה מ"ל?', answer:1500, hint:'💡 750×2=1500 מ"ל'},
          {text:'3 ק"ג חול + 2 ק"ג אבנים = כמה ק"ג?', answer:5, hint:'💡 3+2=5 ק"ג'},
          {text:'שעה ורבע = כמה דקות?', answer:75, hint:'💡 60+15=75 דקות'},
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
        // Grade 2 data: ONLY reading pictographs/bar charts and counting — NO mean/median/mode yet
        easy: [
          {text:'בגרף תמונות: 🐶×4, 🐱×3, 🐠×2. כמה חיות בסך הכל?', answer:9, hint:'💡 4+3+2=9 חיות'},
          {text:'בגרף: אדום=5, כחול=3, ירוק=4. מה עמודת הצבע הגבוהה? (א=1 כ=2 י=3)', answer:1, hint:'💡 אדום=5, הכי גבוה!'},
          {text:'תלמידים שאוהבים: כדורגל=8, כדורסל=5. כמה יותר אוהבים כדורגל?', answer:3, hint:'💡 8-5=3 תלמידים'},
          {text:'בגרף עמודות: ינואר=30 מ"מ גשם, פברואר=20 מ"מ. כמה גשם בסך הכל?', answer:50, hint:'💡 30+20=50 מ"מ'},
          {text:'סקר: עוגיות שוקולד=6 קולות, וניל=4 קולות. מה הפופולרי? (שוקו=1 וניל=2)', answer:1, hint:'💡 6>4, שוקולד יותר פופולרי!'},
        ],
        medium: [
          {text:'בגרף: שני ימי גשם, 15 מ"מ ו-25 מ"מ. כמה גשם בסך הכל?', answer:40, hint:'💡 15+25=40 מ"מ'},
          {text:'ספרים שנקראו: דן=7, נועה=9, אורי=5. כמה נקראו בסך הכל?', answer:21, hint:'💡 7+9+5=21 ספרים'},
          {text:'טבלה: כדורים אדומים=8, כחולים=6, ירוקים=4. כמה כדורים שאינם אדומים?', answer:10, hint:'💡 6+4=10 כדורים'},
          {text:'בגרף 4 עמודות: 3,6,2,5. מה סכום כל הנתונים?', answer:16, hint:'💡 3+6+2+5=16'},
          {text:'בגרף: ילדים שאוהבים חתולים=12, כלבים=18. כמה בסך הכל?', answer:30, hint:'💡 12+18=30 ילדים'},
        ],
        hard: [
          {text:'טבלה: פרחים שנקטפו: יום א=12, יום ב=9, יום ג=15. כמה פרחים בסך הכל?', answer:36, hint:'💡 12+9+15=36 פרחים'},
          {text:'בגרף: כיתה א=25 תלמידים, כיתה ב=23, כיתה ג=27. מה סך כל התלמידים?', answer:75, hint:'💡 25+23+27=75 תלמידים'},
          {text:'שאלנו 20 ילדים: 8 בחרו פיצה, שאר בחרו המבורגר. כמה בחרו המבורגר?', answer:12, hint:'💡 20-8=12 ילדים'},
          {text:'בטבלה: מכוניות: אדום=45, לבן=30, שחור=25. כמה מכוניות שאינן אדומות?', answer:55, hint:'💡 30+25=55 מכוניות'},
        ],
      };
      const q = pick(pools[diff]);
      return { type:'num', cat:'data', diff, label:theme.label, gameLabel:'',
        text:q.text, answer:q.answer, pts, hint:{type:'text',msg:q.hint}, showMul:false, dir:'rtl' };
    },
  },
};
