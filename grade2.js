// ══════════════════════════════════════════════
// GRADE 2 — כיתה ב
// Curriculum: add/sub up to 1000, intro multiplication,
//   fractions (½, ¼), geometry (shapes, perimeter),
//   measurement (cm, m, kg, g, l, ml),
//   data research (tables, bar charts), word problems
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'ב',
  gradeName: 'כיתה ב',
  gradeEmoji: '📊',
  gradeColor: '#ffd32a',

  availableCategories: ['add', 'sub', 'mul', 'word', 'shapes'],
  availableLearnTopics: ['mul', 'word', 'shapes'],
  availableExamTopics: ['add', 'sub', 'mul', 'word', 'shapes'],

  ranges: {
    add: {
      easy:   { aMin:1,  aMax:20, bMin:1,  bMax:20 },
      medium: { aMin:10, aMax:99, bMin:10, bMax:99 },
      hard:   { aMin:50, aMax:200, bMin:50, bMax:200 },
    },
    sub: {
      easy:   { aMin:5,  aMax:20 },
      medium: { aMin:20, aMax:99 },
      hard:   { aMin:50, aMax:200 },
    },
    mul: {
      easy:   { aMin:2, aMax:5,  bMin:1, bMax:5  },
      medium: { aMin:2, aMax:9,  bMin:2, bMax:9  },
      hard:   { aMin:3, aMax:10, bMin:5, bMax:10 },
    },
  },

  pts: { easy:5, medium:10, hard:18 },

  welcome: 'ברוך הבא לכיתה ב! עכשיו גם כפל, צורות ושברים! ⚡',
  tip: 'כבר יודע חיבור? נסה כפל! ✖️',

  generators: {
    add: null,
    sub: null,
    mul: null,
    word: null,

    // ── Shapes / geometry / measurement / data / fractions for grade 2 ──
    shapes(diff) {
      const pts = window.GRADE_CONFIG.pts[diff];
      const theme = pick(GAME_THEMES);

      const easyPool = [
        // Basic shapes
        { text:'כמה צלעות יש למשולש?',      answer:3,  hint:'💡 ספור את הקווים!' },
        { text:'כמה צלעות יש לריבוע?',       answer:4,  hint:'💡 4 צלעות שוות!' },
        { text:'כמה פינות יש למלבן?',        answer:4,  hint:'💡 פינות = כמו צלעות במלבן!' },
        { text:'כמה צלעות יש למחומש?',       answer:5,  hint:'💡 "חמש" → 5 צלעות!' },
        { text:'כמה פינות יש למשושה?',       answer:6,  hint:'💡 "שש" → 6 פינות!' },
        // Fractions ½
        { text:'כמה זה חצי מ-10?',           answer:5,  hint:'💡 10 ÷ 2 = 5' },
        { text:'כמה זה חצי מ-20?',           answer:10, hint:'💡 20 ÷ 2 = 10' },
        { text:'כמה זה חצי מ-14?',           answer:7,  hint:'💡 14 ÷ 2 = 7' },
        // Measurement (simple)
        { text:'כמה ס"מ יש ב-1 מטר?',       answer:100, hint:'💡 מטר = 100 סנטימטר!' },
        { text:'כמה גרם יש ב-1 ק"ג?',       answer:1000, hint:'💡 קילוגרם = 1000 גרם!' },
        { text:'אם חבל הוא 4 ס"מ, מה ההיקף של ריבוע שצלעו 4 ס"מ?', answer:16, hint:'💡 4 צלעות × 4 ס"מ = 16' },
      ];

      const mediumPool = [
        // Fractions ¼
        { text:'כמה זה רבע מ-8?',            answer:2,  hint:'💡 8 ÷ 4 = 2' },
        { text:'כמה זה רבע מ-12?',           answer:3,  hint:'💡 12 ÷ 4 = 3' },
        { text:'כמה זה רבע מ-20?',           answer:5,  hint:'💡 20 ÷ 4 = 5' },
        { text:'כמה זה שלושה רבעים מ-8?',   answer:6,  hint:'💡 רבע מ-8 = 2, ×3 = 6' },
        // Perimeter
        { text:'מה ההיקף של ריבוע שצלעו 5 ס"מ?',     answer:20, hint:'💡 4 × 5 = 20 ס"מ' },
        { text:'מה ההיקף של מלבן 6 ס"מ על 3 ס"מ?',   answer:18, hint:'💡 6+3+6+3 = 18 ס"מ' },
        { text:'מה ההיקף של משולש שכל צלעותיו 7 ס"מ?', answer:21, hint:'💡 3 × 7 = 21 ס"מ' },
        // Data reading
        { text:'בגרף: שירה אספה 8 מדבקות, דן אסף 5. כמה בסך הכל?', answer:13, hint:'💡 חבר: 8 + 5 = 13' },
        { text:'בטבלה: יש 3 ילדים שאוהבים ג\'לי, 4 שוקולד, 2 וופל. מה הכי אהוב? (ג\'לי=1 שוקולד=2 וופל=3)', answer:2, hint:'💡 4 > 3 > 2, אז שוקולד!' },
        // Measurement
        { text:'שקית קמח שוקלת 2 ק"ג. כמה גרם זה?', answer:2000, hint:'💡 2 × 1000 = 2000 גרם' },
        { text:'בקבוק שמן 500 מ"ל. כמה בקבוקים ב-1 ליטר?', answer:2, hint:'💡 1000 ÷ 500 = 2' },
      ];

      const hardPool = [
        // Fractions in context
        { text:'בכיתה 24 ילדים. חצי מהם בנות. כמה בנות?',        answer:12, hint:'💡 24 ÷ 2 = 12' },
        { text:'בכיתה 20 ילדים. רבע הגיעו עם אופניים. כמה?',    answer:5,  hint:'💡 20 ÷ 4 = 5' },
        { text:'יש 16 תפוחים. שלושה רבעים נאכלו. כמה נאכלו?',  answer:12, hint:'💡 רבע = 4, ×3 = 12' },
        // Area intro (counting squares)
        { text:'ריבוע שצלעו 3 ס"מ. כמה ריבועי ס"מ בשטחו?',     answer:9,  hint:'💡 3 × 3 = 9 ריבועי ס"מ' },
        { text:'מלבן 4 ס"מ × 2 ס"מ. כמה ריבועי ס"מ בשטחו?',   answer:8,  hint:'💡 4 × 2 = 8 ריבועי ס"מ' },
        // Multi-step measurement
        { text:'ריצה ראשונה 300 מ\', שנייה 450 מ\'. כמה ריצו בסך הכל?', answer:750, hint:'💡 300 + 450 = 750 מטר' },
        { text:'ספר שוקל 400 גרם. 3 ספרים כמה ק"ג? (כתוב גרם)', answer:1200, hint:'💡 3 × 400 = 1200 גרם' },
        // Data / statistics
        { text:'ציוני 4 ילדים: 7, 8, 9, 8. מה הציון שהופיע הכי הרבה?', answer:8, hint:'💡 8 מופיע פעמיים — הוא השכיח!' },
        { text:'בטבלה: בשני ימים ירד גשם 15 מ"מ ו-25 מ"מ. כמה ירד בסך הכל?', answer:40, hint:'💡 15 + 25 = 40 מ"מ' },
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
