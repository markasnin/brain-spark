// ══════════════════════════════════════════════
// GRADE 3 — כיתה ג
// Curriculum: all 4 operations (up to 10,000),
//   multiplication table up to 12×12,
//   geometry (angles, triangles classification, area),
//   measurement (km, conversions), data (bar charts,
//   drawing conclusions), fractions intro (½ ¼ ⅓),
//   estimation, word problems (including multi-step)
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'ג',
  gradeName: 'כיתה ג',
  gradeEmoji: '⚡',
  gradeColor: '#1e90ff',

  availableCategories: ['add', 'sub', 'mul', 'div', 'word', 'shapes'],
  availableLearnTopics: ['division', 'shapes'],
  availableExamTopics: ['add', 'sub', 'mul', 'div', 'word', 'shapes'],

  ranges: {
    add: {
      easy:   { aMin:10,  aMax:99,  bMin:10,  bMax:99  },
      medium: { aMin:100, aMax:500, bMin:100, bMax:500 },
      hard:   { aMin:200, aMax:999, bMin:200, bMax:999 },
    },
    sub: {
      easy:   { aMin:10,  aMax:99  },
      medium: { aMin:100, aMax:500 },
      hard:   { aMin:200, aMax:999 },
    },
    mul: {
      easy:   { aMin:2, aMax:6,  bMin:2, bMax:6  },
      medium: { aMin:3, aMax:9,  bMin:3, bMax:9  },
      hard:   { aMin:6, aMax:12, bMin:6, bMax:12 },
    },
    div: {
      easy:   { bMin:2, bMax:5,  qMin:1, qMax:5  },
      medium: { bMin:2, bMax:9,  qMin:2, qMax:9  },
      hard:   { bMin:3, bMax:12, qMin:3, qMax:12 },
    },
  },

  pts: { easy:5, medium:12, hard:20 },

  welcome: 'כיתה ג — עכשיו גם חילוק, זוויות ושברים! ➗',
  tip: 'חילוק זה רק כפל הפוך! ➗',

  generators: {
    add: null,
    sub: null,
    mul: null,

    div(diff) {
      const r = window.GRADE_CONFIG.ranges.div[diff];
      const b = rnd(r.bMin, r.bMax), q = rnd(r.qMin, r.qMax);
      const a = b * q;
      const theme = pick(GAME_THEMES);
      const emoji = pick(theme.items);
      return {
        type:'num', cat:'div', diff, label:theme.label, gameLabel:brainrotLabel(),
        text:`${a} ÷ ${b} = ?`, answer:q, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'groups',a:q,b,emoji}, showMul:true, mulA:q, mulB:b, mulEmoji:emoji, dir:'ltr'
      };
    },

    word: null,

    // ── Shapes / geometry / measurement / data / fractions for grade 3 ──
    shapes(diff) {
      const pts = window.GRADE_CONFIG.pts[diff];
      const theme = pick(GAME_THEMES);

      const easyPool = [
        // Angles
        { text:'כמה מעלות יש בזווית ישרה?',       answer:90,  hint:'💡 זווית ישרה = 90°!' },
        { text:'זווית גדולה מ-90° נקראת מה? (חדה=1 ישרה=2 קהה=3)', answer:3, hint:'💡 קהה = גדולה מ-90°!' },
        { text:'זווית קטנה מ-90° נקראת מה? (חדה=1 ישרה=2 קהה=3)', answer:1, hint:'💡 חדה = קטנה מ-90°!' },
        // Fractions
        { text:'כמה זה שליש מ-12?',   answer:4,  hint:'💡 12 ÷ 3 = 4' },
        { text:'כמה זה שליש מ-9?',    answer:3,  hint:'💡 9 ÷ 3 = 3' },
        { text:'כמה זה שליש מ-21?',   answer:7,  hint:'💡 21 ÷ 3 = 7' },
        { text:'כמה זה רבע מ-16?',    answer:4,  hint:'💡 16 ÷ 4 = 4' },
        { text:'כמה זה חצי מ-50?',    answer:25, hint:'💡 50 ÷ 2 = 25' },
        // Perimeter
        { text:'מה ההיקף של ריבוע שצלעו 6 ס"מ?',   answer:24, hint:'💡 4 × 6 = 24 ס"מ' },
        { text:'מה ההיקף של מלבן 8 ס"מ × 3 ס"מ?',  answer:22, hint:'💡 8+3+8+3 = 22 ס"מ' },
      ];

      const mediumPool = [
        // Area
        { text:'מה שטח המלבן: 7 ס"מ × 4 ס"מ?',    answer:28,  hint:'💡 שטח = 7 × 4 = 28 ס"מ²' },
        { text:'מה שטח הריבוע: צלע 8 ס"מ?',        answer:64,  hint:'💡 שטח = 8 × 8 = 64 ס"מ²' },
        { text:'מה שטח המלבן: 10 ס"מ × 5 ס"מ?',   answer:50,  hint:'💡 10 × 5 = 50 ס"מ²' },
        // Angles in triangles
        { text:'כמה זוויות ישרות יש במשולש ישר-זווית?', answer:1, hint:'💡 משולש ישר-זווית = זווית אחת של 90°' },
        { text:'סכום הזוויות במשולש הוא כמה מעלות?',    answer:180, hint:'💡 תמיד 180° בכל משולש!' },
        // Measurement conversions
        { text:'כמה מטרים ב-1 ק"מ?',   answer:1000, hint:'💡 קילומטר = 1000 מטר!' },
        { text:'כמה ס"מ ב-2 מטר?',     answer:200,  hint:'💡 2 × 100 = 200 ס"מ' },
        { text:'כמה מ"מ ב-1 ס"מ?',     answer:10,   hint:'💡 סנטימטר = 10 מ"מ!' },
        // Data
        { text:'ממוצע של 2, 4, 6 הוא כמה?', answer:4, hint:'💡 (2+4+6) ÷ 3 = 12 ÷ 3 = 4' },
        { text:'בכיתה הצביעו: כחול 8, ירוק 5, אדום 7. כמה ילדים הצביעו בסך הכל?', answer:20, hint:'💡 8+5+7 = 20' },
      ];

      const hardPool = [
        // Complex area and perimeter
        { text:'מלבן שהיקפו 36 ס"מ ורוחבו 7 ס"מ. מה ארכו?', answer:11, hint:'💡 ארך = (36÷2) - 7 = 18 - 7 = 11' },
        { text:'מה שטח המלבן: 12 ס"מ × 9 ס"מ?',  answer:108, hint:'💡 12 × 9 = 108 ס"מ²' },
        // Fractions multi-step
        { text:'בכיתה 30 ילדים. שליש מהם בנות. כמה בנות יש?', answer:10, hint:'💡 30 ÷ 3 = 10' },
        { text:'יש 24 תפוחים. שלושה רביעים נאכלו. כמה נאכלו?', answer:18, hint:'💡 רבע = 6, ×3 = 18' },
        // Angles
        { text:'בריבוע כמה זוויות ישרות יש?',        answer:4,  hint:'💡 כל פינה בריבוע = 90°, יש 4!' },
        { text:'שתי זוויות במשולש הן 60° ו-80°. מה הזווית השלישית?', answer:40, hint:'💡 180 - 60 - 80 = 40°' },
        { text:'זווית אחת של 130°. האם היא קהה? (כן=1 לא=0)', answer:1, hint:'💡 130 > 90, אז קהה!' },
        // Estimation
        { text:'370 + 230 = ? (הערך קרוב לאיזה עשרת?)', answer:600, hint:'💡 400 + 200 = 600!' },
        // Data
        { text:'ממוצע של 3, 7, 5, 9 הוא כמה?', answer:6, hint:'💡 (3+7+5+9)÷4 = 24÷4 = 6' },
        { text:'בשלושת הימים ירד גשם: 12, 8, 16 מ"מ. מה הממוצע היומי?', answer:12, hint:'💡 (12+8+16)÷3 = 36÷3 = 12' },
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
