// ══════════════════════════════════════════════
// GRADE 1 — כיתה א
// Curriculum: addition, subtraction, basic geometry,
//   number sense (up to 100), even/odd, half concept,
//   simple measurement, basic data reading
// Numbers: small, up to 30 for arithmetic
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'א',
  gradeName: 'כיתה א',
  gradeEmoji: '🌱',
  gradeColor: '#2ed573',

  availableCategories: ['add', 'sub', 'shapes'],
  availableLearnTopics: [],
  availableExamTopics: ['add', 'sub', 'shapes'],

  ranges: {
    add: {
      easy:   { aMin:1,  aMax:10, bMin:1,  bMax:10 },
      medium: { aMin:5,  aMax:20, bMin:5,  bMax:20 },
      hard:   { aMin:10, aMax:30, bMin:10, bMax:30 },
    },
    sub: {
      easy:   { aMin:2,  aMax:10 },
      medium: { aMin:5,  aMax:20 },
      hard:   { aMin:10, aMax:30 },
    },
  },

  pts: { easy:3, medium:6, hard:10 },

  welcome: 'ברוך הבא לכיתה א! נלמד חיבור, חיסור וצורות! 🌱',
  tip: 'התחל בחיבור — קל להתחיל משם! ➕',

  generators: {
    add(diff) {
      const r = window.GRADE_CONFIG.ranges.add[diff];
      const a = rnd(r.aMin, r.aMax), b = rnd(r.bMin, r.bMax);
      const theme = pick(GAME_THEMES);
      return {
        type:'num', cat:'add', diff, label:theme.label, gameLabel:brainrotLabel(),
        text:`${a} + ${b} = ?`, answer:a+b, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'decompose',a,b}, showMul:false, dir:'ltr'
      };
    },

    sub(diff) {
      const r = window.GRADE_CONFIG.ranges.sub[diff];
      const a = rnd(r.aMin, r.aMax), b = rnd(1, Math.max(1, a - 1));
      const theme = pick(GAME_THEMES);
      return {
        type:'num', cat:'sub', diff, label:theme.label, gameLabel:brainrotLabel(),
        text:`${a} - ${b} = ?`, answer:a-b, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'cubes',total:a,remove:b}, showMul:false, dir:'ltr'
      };
    },

    // ── Shapes / number-sense / measurement pool for grade 1 ──
    shapes(diff) {
      const pts = window.GRADE_CONFIG.pts[diff];
      const theme = pick(GAME_THEMES);

      // Pool split by difficulty
      const easyPool = [
        // Basic shape sides / corners
        { text:'כמה צלעות יש למשולש?',        answer:3,  hint:'💡 ספור את הקווים שמסביב!' },
        { text:'כמה צלעות יש לריבוע?',         answer:4,  hint:'💡 לריבוע 4 צלעות שוות!' },
        { text:'כמה פינות יש לריבוע?',         answer:4,  hint:'💡 כמו הצלעות — 4 פינות!' },
        { text:'כמה צלעות יש למלבן?',          answer:4,  hint:'💡 2 ארוכות + 2 קצרות = 4' },
        { text:'כמה פינות יש למשולש?',         answer:3,  hint:'💡 ספור את הפינות החדות!' },
        // Even / odd — up to 10
        { text:'האם 4 הוא מספר זוגי? (כן=1 לא=0)', answer:1, hint:'💡 זוגי = מתחלק ב-2 בלי שארית!' },
        { text:'האם 7 הוא מספר זוגי? (כן=1 לא=0)', answer:0, hint:'💡 7 הוא אי-זוגי!' },
        { text:'האם 10 הוא מספר זוגי? (כן=1 לא=0)',answer:1, hint:'💡 10 ÷ 2 = 5 — אז הוא זוגי!' },
        // Simple number-line / ordering
        { text:'מה המספר שאחרי 9?',   answer:10, hint:'💡 ספור צעד אחד קדימה: 9... 10!' },
        { text:'מה המספר שלפני 5?',   answer:4,  hint:'💡 ספור צעד אחורה: 5... 4!' },
        { text:'מה המספר שאחרי 19?',  answer:20, hint:'💡 19 + 1 = 20!' },
      ];

      const mediumPool = [
        // Half concept
        { text:'כמה זה חצי מ-10?',   answer:5,  hint:'💡 10 ÷ 2 = 5' },
        { text:'כמה זה חצי מ-8?',    answer:4,  hint:'💡 8 ÷ 2 = 4' },
        { text:'כמה זה חצי מ-20?',   answer:10, hint:'💡 20 ÷ 2 = 10' },
        { text:'כמה זה חצי מ-16?',   answer:8,  hint:'💡 16 ÷ 2 = 8' },
        // More shape sides
        { text:'כמה צלעות יש למחומש?',  answer:5, hint:'💡 "חמש" → 5 צלעות!' },
        { text:'כמה צלעות יש למשושה?',  answer:6, hint:'💡 "שש" → 6 צלעות!' },
        // Even / odd
        { text:'האם 15 הוא מספר זוגי? (כן=1 לא=0)', answer:0, hint:'💡 מספרים זוגיים מסתיימים ב-0,2,4,6,8' },
        { text:'האם 18 הוא מספר זוגי? (כן=1 לא=0)', answer:1, hint:'💡 18 מסתיים ב-8 — זוגי!' },
        // Measurement: which is longer (encode as number)
        { text:'בחדר יש שולחן ועיפרון. מה ארוך יותר? (שולחן=1 עיפרון=2)', answer:1, hint:'💡 שולחן גדול הרבה יותר מעיפרון!' },
        { text:'מה כבד יותר — כדור ברזל או בלון? (ברזל=1 בלון=2)', answer:1, hint:'💡 ברזל כבד, בלון קל מאוד!' },
        // Ordering
        { text:'מה המספר הגדול יותר: 13 או 8?', answer:13, hint:'💡 13 נמצא ימינה יותר בסרגל המספרים!' },
        { text:'מה המספר הקטן יותר: 17 או 9?',  answer:9,  hint:'💡 9 קטן יותר מ-17!' },
      ];

      const hardPool = [
        // Half of larger numbers
        { text:'כמה זה חצי מ-30?',   answer:15, hint:'💡 30 ÷ 2 = 15' },
        { text:'כמה זה חצי מ-14?',   answer:7,  hint:'💡 14 ÷ 2 = 7' },
        { text:'כמה זה חצי מ-24?',   answer:12, hint:'💡 24 ÷ 2 = 12' },
        // Shapes composed
        { text:'לצורה יש 3 צלעות ו-3 פינות. איזו צורה זו? (משולש=3 ריבוע=4)', answer:3, hint:'💡 3 צלעות = משולש!' },
        { text:'לצורה יש 4 צלעות שוות. מה זה? (ריבוע=4 מלבן=5)', answer:4, hint:'💡 4 צלעות שוות = ריבוע!' },
        // Data: simple pictograph reading
        { text:'בכיתה יש 5 ילדים שאוהבים כדורגל ו-3 שאוהבים כדורסל. כמה ילדים סקרנו בסך הכל?', answer:8, hint:'💡 חבר: 5 + 3 = 8!' },
        { text:'בגרף יש 4 כוכבות בשורה של שני. כמה כוכבות יש בסך הכל בשתי השורות?', answer:8, hint:'💡 4 + 4 = 8!' },
        // Tens and ones
        { text:'כמה עשרות ויחידות יש ב-23? (כתוב את מספר העשרות)', answer:2, hint:'💡 23 = 2 עשרות + 3 יחידות' },
        { text:'כמה יחידות יש ב-37?', answer:7, hint:'💡 37 = 3 עשרות + 7 יחידות' },
        { text:'10 + 7 = ?',  answer:17, hint:'💡 עשרה ועוד שבע!' },
        { text:'20 + 5 = ?',  answer:25, hint:'💡 עשרים ועוד חמש!' },
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
