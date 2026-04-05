// ══════════════════════════════════════════════
// GRADE 3 — כיתה ג
// Official Israeli curriculum:
//   Numbers: up to 10,000; decimal structure; estimation
//   Operations: all 4 ops — mul table up to 10×10, div with remainder intro
//   Order of operations, parentheses
//   Fractions: unit fractions ½ ⅓ ¼ ⅕ ⅙ ⅛ 1/10 — recognition, ordering (NO addition yet)
//   Fractions of a quantity (e.g. ⅓ of 21) — without formal notation at first
//   Shapes: angles (right/acute/obtuse), triangles by type, area by counting squares
//   Measurement: km, mm; time; conversions within a unit (600cm = 6m)
//   Data: bar charts, collecting data, drawing conclusions — NO mean formula yet
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'ג', gradeName: 'כיתה ג', gradeEmoji: '⚡', gradeColor: '#1e90ff',
  availableCategories: ['add','sub','mul','div','word','shapes','measurement','data'],
  availableLearnTopics: ['division','shapes','measurement','data'],
  availableExamTopics:  ['add','sub','mul','div','word','shapes','measurement','data'],
  ranges: {
    add: { easy:{aMin:10,aMax:99,bMin:10,bMax:89},   medium:{aMin:100,aMax:999,bMin:100,bMax:899}, hard:{aMin:500,aMax:4999,bMin:500,bMax:4999} },
    sub: { easy:{aMin:15,aMax:99},                    medium:{aMin:100,aMax:999},                   hard:{aMin:500,aMax:4999} },
    mul: { easy:{aMin:2,aMax:5,bMin:2,bMax:9},        medium:{aMin:3,aMax:8,bMin:3,bMax:9},         hard:{aMin:6,aMax:10,bMin:6,bMax:10} },
    div: { easy:{bMin:2,bMax:5,qMin:2,qMax:8},        medium:{bMin:2,bMax:9,qMin:2,qMax:9},         hard:{bMin:3,bMax:10,qMin:3,qMax:10} },
  },
  pts: { easy:6, medium:12, hard:20 },
  welcome: 'כיתה ג — ארבע פעולות, זוויות ושברים! ⚡',
  tip: 'חילוק זה כפל הפוך — שני דברים אחד! ➗',
  generators: {
    add: null, sub: null, mul: null,
    div(diff) {
      const r = window.GRADE_CONFIG.ranges.div[diff];
      const b = rnd(r.bMin,r.bMax), q = rnd(r.qMin,r.qMax), a = b*q;
      const theme = pick(GAME_THEMES), emoji = pick(theme.items);
      return { type:'num', cat:'div', diff, label:theme.label, gameLabel:brainrotLabel(),
        text:`${a} ÷ ${b} = ?`, answer:q, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'groups',a:q,b,emoji}, showMul:true, mulA:q, mulB:b, mulEmoji:emoji, dir:'ltr' };
    },
    word: null,
    shapes(diff) {
      const pts = window.GRADE_CONFIG.pts[diff];
      const theme = pick(GAME_THEMES);
      const pools = {
        // Grade 3: angles, triangle types, area by counting, unit fractions, shape unknowns
        easy: [
          {text:'כמה מעלות יש בזווית ישרה?', answer:90, hint:'💡 זווית ישרה = 90 מעלות!'},
          {text:'זווית קטנה מ-90° נקראת? (חדה=1 ישרה=2 קהה=3)', answer:1, hint:'💡 חדה = פחות מ-90°!'},
          {text:'זווית גדולה מ-90° נקראת? (חדה=1 ישרה=2 קהה=3)', answer:3, hint:'💡 קהה = יותר מ-90°!'},
          {text:'כמה זוויות ישרות יש בריבוע?', answer:4, hint:'💡 כל 4 פינות הריבוע = זוויות ישרות!'},
          // Unit fractions of quantity — grade 3 style
          {text:'שליש מ-12 = ?', answer:4, hint:'💡 12÷3=4!'},
          {text:'שליש מ-9 = ?', answer:3, hint:'💡 9÷3=3!'},
          {text:'רבע מ-16 = ?', answer:4, hint:'💡 16÷4=4!'},
          {text:'חצי מ-14 = ?', answer:7, hint:'💡 14÷2=7!'},
          // Perimeter
          {text:'ריבוע שצלעו 7 ס"מ. מה היקפו?', answer:28, hint:'💡 4×7=28 ס"מ'},
        ],
        medium: [
          // Area by counting squares
          {text:'מלבן 5 ריבועים × 3 ריבועים. כמה ריבועים בשטחו?', answer:15, hint:'💡 5×3=15 ריבועים'},
          {text:'ריבוע 4 ריבועים × 4 ריבועים. כמה ריבועים בשטחו?', answer:16, hint:'💡 4×4=16 ריבועים'},
          // Triangle types
          {text:'משולש שכל זוויותיו חדות — איזה משולש? (חד=1 ישר=2 קהה=3)', answer:1, hint:'💡 כל הזוויות חדות = משולש חד-זווית!'},
          {text:'משולש עם זווית של 90° — איזה משולש? (חד=1 ישר=2 קהה=3)', answer:2, hint:'💡 יש זווית ישרה = משולש ישר-זווית!'},
          {text:'סכום הזוויות של כל משולש = כמה מעלות?', answer:180, hint:'💡 תמיד 180° בכל משולש!'},
          // Fraction ordering (which is bigger)
          {text:'מה גדול יותר: ½ או ¼? (½=2 ¼=4)', answer:2, hint:'💡 ½>¼ — חצי גדול מרבע!'},
          {text:'מה קטן יותר: ⅓ או ½? (⅓=3 ½=2)', answer:3, hint:'💡 ⅓<½ — שליש קטן מחצי!'},
          // Shape unknowns (grade 3: more abstract)
          {text:'🔺 × 3 = 15. כמה שווה 🔺?', answer:5, hint:'💡 15÷3=5!'},
          {text:'⬜ ÷ 4 = 6. כמה שווה ⬜?', answer:24, hint:'💡 6×4=24!'},
        ],
        hard: [
          // Area of rectangles (cm² level)
          {text:'מלבן 6 ס"מ × 4 ס"מ. מה שטחו?', answer:24, hint:'💡 6×4=24 ס"מ²'},
          {text:'ריבוע שצלעו 7 ס"מ. מה שטחו?', answer:49, hint:'💡 7×7=49 ס"מ²'},
          {text:'מלבן 9 ס"מ × 3 ס"מ. מה שטחו?', answer:27, hint:'💡 9×3=27 ס"מ²'},
          // Angle calculation
          {text:'שתי זוויות במשולש: 60° ו-70°. מה הזווית השלישית?', answer:50, hint:'💡 180-60-70=50°'},
          {text:'זווית אחת 110°. האם היא קהה? (כן=1 לא=0)', answer:1, hint:'💡 110>90 = קהה!'},
          // Fraction of a quantity — harder
          {text:'חמישית מ-30 = ?', answer:6, hint:'💡 30÷5=6!'},
          {text:'שמינית מ-24 = ?', answer:3, hint:'💡 24÷8=3!'},
          // Shape unknowns — multi-step
          {text:'🔵 + 🔵 = 🔺. 🔺 = 20. כמה שווה 🔵?', answer:10, hint:'💡 20÷2=10!'},
          {text:'⬜ + 🔺 = 18. ⬜ = 10. כמה שווה 🔺?', answer:8, hint:'💡 18-10=8!'},
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
        // Grade 3: km, mm, unit conversions, time calculations, weight in context
        easy: [
          {text:'כמה מ"מ יש ב-1 ס"מ?', answer:10, hint:'💡 ס"מ = 10 מ"מ!'},
          {text:'כמה מטרים יש ב-1 ק"מ?', answer:1000, hint:'💡 ק"מ = 1000 מ\'!'},
          {text:'כמה ס"מ יש ב-4 מטר?', answer:400, hint:'💡 4×100=400 ס"מ'},
          {text:'שעה אחת = כמה שניות?', answer:3600, hint:'💡 60 דקות × 60 שניות = 3600!'},
          {text:'3 שעות = כמה דקות?', answer:180, hint:'💡 3×60=180 דקות'},
        ],
        medium: [
          {text:'600 ס"מ = כמה מטרים?', answer:6, hint:'💡 600÷100=6 מטרים!'},
          {text:'5000 מ\' = כמה ק"מ?', answer:5, hint:'💡 5000÷1000=5 ק"מ!'},
          {text:'כמה מ"מ ב-3 ס"מ?', answer:30, hint:'💡 3×10=30 מ"מ'},
          {text:'נסיעה 2 שעות ו-30 דקות. כמה דקות?', answer:150, hint:'💡 2×60+30=150 דקות'},
          {text:'שני ק"מ = כמה מטרים?', answer:2000, hint:'💡 2×1000=2000 מ\''},
        ],
        hard: [
          {text:'3500 מ\' = כמה ק"מ וחצי? (כמה ק"מ שלמים)', answer:3, hint:'💡 3500÷1000=3.5, שלמים=3 ק"מ'},
          {text:'מסלול 2 ק"מ + 800 מ\'. כמה מ\' בסך הכל?', answer:2800, hint:'💡 2000+800=2800 מ\''},
          {text:'יציאה 8:00, הגעה 10:30. כמה דקות הנסיעה?', answer:150, hint:'💡 2×60+30=150 דקות'},
          {text:'קנינו 2.5 ק"ג תפוחים. כמה גרם?', answer:2500, hint:'💡 2.5×1000=2500 גרם'},
          {text:'ריצה: 400מ\', 600מ\', 1ק"מ. כמה מ\' בסך הכל?', answer:2000, hint:'💡 400+600+1000=2000 מ\''},
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
        // Grade 3: reading and constructing bar charts, drawing conclusions — still NO mean formula
        easy: [
          {text:'בגרף: גשם בינואר=40מ"מ, פברואר=25מ"מ, מרץ=35מ"מ. כמה סה"כ?', answer:100, hint:'💡 40+25+35=100 מ"מ'},
          {text:'ספרים שנקראו: שרה=15, אחמד=12, ליאת=18. מי קרא הכי הרבה? (שרה=1 אחמד=2 ליאת=3)', answer:3, hint:'💡 18>15>12 — ליאת קראה הכי הרבה!'},
          {text:'טבלה: כיתה א=28 ילדים, כיתה ב=31 ילדים. כמה ילדים בסך הכל?', answer:59, hint:'💡 28+31=59 ילדים'},
          {text:'בגרף: ציפורים שנספרו: ינשוף=3, ציפורית=8, דרור=5. כמה נספרו בסה"כ?', answer:16, hint:'💡 3+8+5=16 ציפורים'},
        ],
        medium: [
          {text:'4 ילדים אספו: 12, 8, 15, 9 מדבקות. כמה אספו בסה"כ?', answer:44, hint:'💡 12+8+15+9=44 מדבקות'},
          {text:'בסקר: 60% בחרו כחול, 40% בחרו אדום. בכיתה של 30 — כמה בחרו כחול?', answer:18, hint:'💡 30×60÷100=18 ילדים'},
          {text:'טמפ\' יומית: 22°,25°,21°,27°,20°. מה הטמפרטורה הגבוהה ביותר?', answer:27, hint:'💡 27° הגבוה ביותר!'},
          {text:'מכירות: שני=50, שלישי=70, רביעי=60. כמה נמכרו בסה"כ?', answer:180, hint:'💡 50+70+60=180'},
        ],
        hard: [
          {text:'גרף עמודות: 4 חודשים, ממוצע גשם 30מ"מ. סכום כל החודשים?', answer:120, hint:'💡 4×30=120 מ"מ (הוא הסכום הכולל)'},
          {text:'בטבלה: כיתות א,ב,ג,ד,ה — 25 ילדים בכל כיתה. כמה ילדים בסה"כ?', answer:125, hint:'💡 5×25=125 ילדים'},
          {text:'בגרף: 3 קבוצות ספורט. כדורגל=35, כדורסל=20, שחייה=25. כמה יותר ילדים בכדורגל מאשר שחייה?', answer:10, hint:'💡 35-25=10 ילדים'},
          {text:'נאספו נתונים על 40 תלמידים. 15 הביאו ארוחת בוקר. כמה לא הביאו?', answer:25, hint:'💡 40-15=25 תלמידים'},
        ],
      };
      const q = pick(pools[diff]);
      return { type:'num', cat:'data', diff, label:theme.label, gameLabel:'',
        text:q.text, answer:q.answer, pts, hint:{type:'text',msg:q.hint}, showMul:false, dir:'rtl' };
    },
  },
};
