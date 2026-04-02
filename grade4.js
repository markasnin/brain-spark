// ══════════════════════════════════════════════
// GRADE 4 — כיתה ד
// Curriculum: 4 ops with large numbers (up to 9999),
//   fractions (equivalent, add/sub same denominator,
//   fraction of whole), geometry (parallelogram, area,
//   angles with protractor, parallel/perpendicular lines),
//   measurement (unit conversions), statistics (mean),
//   data research, word problems (multi-step)
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'ד',
  gradeName: 'כיתה ד',
  gradeEmoji: '🔮',
  gradeColor: '#9b59b6',

  availableCategories: ['add', 'sub', 'mul', 'div', 'word', 'shapes', 'fractions'],
  availableLearnTopics: ['division', 'shapes', 'fractions'],
  availableExamTopics: ['add', 'sub', 'mul', 'div', 'word', 'shapes', 'fractions'],

  ranges: {
    add: {
      easy:   { aMin:100, aMax:999,  bMin:100, bMax:999  },
      medium: { aMin:500, aMax:4999, bMin:500, bMax:4999 },
      hard:   { aMin:1000,aMax:9999, bMin:1000,bMax:9999 },
    },
    sub: {
      easy:   { aMin:100, aMax:999  },
      medium: { aMin:500, aMax:4999 },
      hard:   { aMin:1000,aMax:9999 },
    },
    mul: {
      easy:   { aMin:2,  aMax:9,  bMin:2,  bMax:9  },
      medium: { aMin:5,  aMax:12, bMin:5,  bMax:12 },
      hard:   { aMin:10, aMax:25, bMin:10, bMax:25 },
    },
    div: {
      easy:   { bMin:2, bMax:9,  qMin:2, qMax:9  },
      medium: { bMin:3, bMax:12, qMin:3, qMax:12 },
      hard:   { bMin:4, bMax:15, qMin:4, qMax:15 },
    },
    fractions: {
      easy:   { pairs:[[1,2],[1,4],[3,4]], totalMax:20 },
      medium: { pairs:[[1,3],[2,3],[1,5],[2,5]], totalMax:40 },
      hard:   { pairs:[[3,5],[1,6],[5,6],[1,8],[3,8]], totalMax:80 },
    },
    shapes: {},
  },

  pts: { easy:6, medium:13, hard:22 },

  welcome: 'כיתה ד — שברים, גיאומטריה וסטטיסטיקה! 🔮',
  tip: 'שברים פתוחים! נסה אותם 🍕',

  generators: {
    add: null,
    sub: null,
    mul: null,
    div: null,
    word: null,

    fractions(diff) {
      const r = window.GRADE_CONFIG.ranges.fractions[diff];
      const [n, d] = pick(r.pairs);
      const total = rnd(d, r.totalMax / d) * d;
      const part = (total / d) * n;
      const theme = pick(GAME_THEMES);
      return {
        type:'num', cat:'fractions', diff, label:theme.label, gameLabel:'',
        text:`כמה זה ${n}/${d} מתוך ${total}?`, answer:part,
        pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 חלק ${total} ל-${d} חלקים = ${total/d} לכל חלק. קח ${n} חלקים = ${part}`},
        showMul:false, dir:'rtl'
      };
    },

    // ── Shapes / geometry / measurement / data for grade 4 ──
    shapes(diff) {
      const pts = window.GRADE_CONFIG.pts[diff];
      const theme = pick(GAME_THEMES);

      const easyPool = [
        // Area of rectangles and squares
        { text:'מה שטח ריבוע שצלעו 9 ס"מ?',         answer:81,  hint:'💡 9 × 9 = 81 ס"מ²' },
        { text:'מה שטח מלבן 6 ס"מ × 8 ס"מ?',       answer:48,  hint:'💡 6 × 8 = 48 ס"מ²' },
        { text:'מה ההיקף של מלבן 11 ס"מ × 4 ס"מ?', answer:30,  hint:'💡 (11+4)×2 = 30 ס"מ' },
        // Angles
        { text:'כמה מעלות בזווית ישרה?',              answer:90,  hint:'💡 זווית ישרה = 90°!' },
        { text:'סכום הזוויות במשולש?',                 answer:180, hint:'💡 תמיד 180°!' },
        { text:'סכום הזוויות במרובע (4 צלעות)?',       answer:360, hint:'💡 4 × 90 = 360°!' },
        // Fractions — equivalent
        { text:'2/4 שווה לכמה מתוך 1? (כתוב מונה אם מכנה 2)', answer:1, hint:'💡 2/4 = 1/2!' },
        { text:'3/6 שווה לאיזה שבר? (מונה אם מכנה 2)', answer:1, hint:'💡 3/6 = 1/2!' },
        // Measurement
        { text:'כמה ס"מ ב-3 מטר?',   answer:300,  hint:'💡 3 × 100 = 300 ס"מ' },
        { text:'כמה גרם ב-2.5 ק"ג?', answer:2500, hint:'💡 2.5 × 1000 = 2500 גרם' },
      ];

      const mediumPool = [
        // Area — parallelogram, triangle
        { text:'מה שטח המקבילית: בסיס 8 ס"מ, גובה 5 ס"מ?', answer:40, hint:'💡 שטח = בסיס × גובה = 8×5 = 40' },
        { text:'מה שטח המשולש: בסיס 10 ס"מ, גובה 6 ס"מ?',  answer:30, hint:'💡 שטח = (10×6)÷2 = 30 ס"מ²' },
        { text:'מה שטח המשולש: בסיס 8 ס"מ, גובה 7 ס"מ?',   answer:28, hint:'💡 (8×7)÷2 = 28 ס"מ²' },
        // Angles
        { text:'שתי זוויות במשולש הן 70° ו-50°. מה השלישית?', answer:60, hint:'💡 180-70-50 = 60°' },
        { text:'שלוש זוויות במרובע: 90°, 85°, 100°. מה הרביעית?', answer:85, hint:'💡 360-90-85-100 = 85°' },
        // Statistics
        { text:'ממוצע של 4, 8, 12, 8 הוא?',        answer:8,  hint:'💡 (4+8+12+8)÷4 = 32÷4 = 8' },
        { text:'ממוצע של 10, 20, 30 הוא?',         answer:20, hint:'💡 (10+20+30)÷3 = 60÷3 = 20' },
        { text:'השכיח של: 3, 7, 3, 5, 3, 7 הוא?', answer:3,  hint:'💡 3 מופיע 3 פעמים — הכי הרבה!' },
        // Measurement
        { text:'כמה שניות ב-5 דקות?', answer:300, hint:'💡 5 × 60 = 300 שניות' },
        { text:'כמה דקות ב-2 שעות?',  answer:120, hint:'💡 2 × 60 = 120 דקות' },
      ];

      const hardPool = [
        // Complex area
        { text:'מה שטח המשולש: בסיס 14 ס"מ, גובה 9 ס"מ?',  answer:63, hint:'💡 (14×9)÷2 = 63 ס"מ²' },
        { text:'ריבוע שהיקפו 40 ס"מ. מה שטחו?',            answer:100, hint:'💡 צלע = 10, שטח = 10×10 = 100' },
        { text:'מלבן ששטחו 60 ס"מ² ורוחבו 6 ס"מ. מה ארכו?', answer:10, hint:'💡 60 ÷ 6 = 10 ס"מ' },
        // Parallel and perpendicular
        { text:'כמה זוגות קווים מקבילים יש במלבן?', answer:2, hint:'💡 שתי זוגות: שני האורכות וזוג הרוחבות!' },
        // Statistics advanced
        { text:'ממוצע של 5 מספרים הוא 8. סכומם הוא?', answer:40, hint:'💡 ממוצע × כמות = 8×5 = 40' },
        { text:'4 ציונים: 7, 9, ?, 8. הממוצע 8. מה הציון החסר?', answer:8, hint:'💡 סכום = 32, 32-7-9-8 = 8' },
        // Fractions — add/sub with same denominator
        { text:'1/4 + 2/4 = ? (כתוב מונה בלבד, מכנה = 4)', answer:3, hint:'💡 1+2=3, התשובה 3/4!' },
        { text:'5/6 - 2/6 = ? (כתוב מונה בלבד, מכנה = 6)', answer:3, hint:'💡 5-2=3, התשובה 3/6 = 1/2!' },
        // Unit conversions
        { text:'מרחק 2.5 ק"מ = כמה מטרים?', answer:2500, hint:'💡 2.5 × 1000 = 2500 מטר' },
        { text:'6000 מ"ל = כמה ליטרים?',    answer:6,    hint:'💡 6000 ÷ 1000 = 6 ליטר' },
      ];

      const pool = diff==='easy' ? easyPool : diff==='medium' ? mediumPool : hardPool;
      const q = pick(pool);
      return {
        type:'num', cat:'shapes', diff,
        label: theme.label, gameLabel: '',
        text: q.text, answer: q.answer,
        pts,
        hint: { type:'text', msg: q.hint },
        showMul: false, dir:'rtl'
      };
    },
  },
};
