// ══════════════════════════════════════════════
// GRADE 6 — כיתה ו
// Curriculum: 4 ops up to 999,999,
//   negative numbers (intro, add/sub),
//   ratio and proportion ("כלל שלושה"),
//   scale, percentages (increase/decrease, profit/loss),
//   decimals (multiply/divide), fractions (all ops),
//   geometry (circle area & perimeter, cylinder volume,
//   surface area), algebra intro (expressions, equations),
//   statistics (mean/median/mode, graphs),
//   number sets (natural, whole, fractions), calculator allowed
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'ו',
  gradeName: 'כיתה ו',
  gradeEmoji: '🚀',
  gradeColor: '#ff4757',

  availableCategories: ['add', 'sub', 'mul', 'div', 'word', 'shapes', 'fractions'],
  availableLearnTopics: ['division', 'shapes', 'fractions', 'measurement'],
  availableExamTopics: ['add', 'sub', 'mul', 'div', 'word', 'shapes', 'fractions'],

  ranges: {
    add: {
      easy:   { aMin:1000,  aMax:99999,  bMin:1000,  bMax:99999  },
      medium: { aMin:10000, aMax:499999, bMin:10000, bMax:499999 },
      hard:   { aMin:100000,aMax:999999, bMin:100000,bMax:999999 },
    },
    sub: {
      easy:   { aMin:1000,  aMax:99999  },
      medium: { aMin:10000, aMax:499999 },
      hard:   { aMin:100000,aMax:999999 },
    },
    mul: {
      easy:   { aMin:10, aMax:50,  bMin:10, bMax:50  },
      medium: { aMin:20, aMax:99,  bMin:20, bMax:99  },
      hard:   { aMin:50, aMax:200, bMin:50, bMax:200 },
    },
    div: {
      easy:   { bMin:5,  bMax:20, qMin:5,  qMax:20 },
      medium: { bMin:10, bMax:30, qMin:10, qMax:30 },
      hard:   { bMin:15, bMax:50, qMin:15, qMax:50 },
    },
    fractions: {
      easy:   { pairs:[[1,2],[1,4],[3,4],[1,3],[2,3],[1,5],[2,5]], totalMax:60 },
      medium: { pairs:[[3,5],[4,5],[1,6],[5,6],[1,7],[2,7],[3,7]], totalMax:120 },
      hard:   { pairs:[[5,7],[6,7],[1,8],[3,8],[5,8],[7,8],[1,9],[4,9],[7,9]], totalMax:200 },
    },
  },

  pts: { easy:8, medium:18, hard:30 },

  welcome: 'כיתה ו — המתמטיקאים האמיתיים! 🚀',
  tip: 'מספרים ענקיים — תוכיח שאתה מקצוען! 💪',

  generators: {
    add(diff) {
      const r = window.GRADE_CONFIG.ranges.add[diff];
      const a = rnd(r.aMin, r.aMax), b = rnd(r.bMin, r.bMax);
      const theme = pick(GAME_THEMES);
      return {
        type:'num', cat:'add', diff, label:theme.label, gameLabel:brainrotLabel(),
        text:`${a.toLocaleString()} + ${b.toLocaleString()} = ?`, answer:a+b,
        pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'decompose',a,b}, showMul:false, dir:'ltr'
      };
    },

    sub(diff) {
      const r = window.GRADE_CONFIG.ranges.sub[diff];
      const a = rnd(r.aMin, r.aMax), b = rnd(1, Math.floor(a/2));
      const theme = pick(GAME_THEMES);
      return {
        type:'num', cat:'sub', diff, label:theme.label, gameLabel:brainrotLabel(),
        text:`${a.toLocaleString()} - ${b.toLocaleString()} = ?`, answer:a-b,
        pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${a.toLocaleString()} פחות ${b.toLocaleString()}`},
        showMul:false, dir:'ltr'
      };
    },

    mul(diff) {
      const r = window.GRADE_CONFIG.ranges.mul[diff];
      const a = rnd(r.aMin, r.aMax), b = rnd(r.bMin, r.bMax);
      const theme = pick(GAME_THEMES);
      return {
        type:'num', cat:'mul', diff, label:theme.label, gameLabel:brainrotLabel(),
        text:`${a} × ${b} = ?`, answer:a*b, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${a} × ${b} = ${a*b}`}, showMul:false, dir:'ltr'
      };
    },

    div(diff) {
      const r = window.GRADE_CONFIG.ranges.div[diff];
      const b = rnd(r.bMin, r.bMax), q = rnd(r.qMin, r.qMax);
      const a = b * q;
      const theme = pick(GAME_THEMES);
      return {
        type:'num', cat:'div', diff, label:theme.label, gameLabel:brainrotLabel(),
        text:`${a.toLocaleString()} ÷ ${b} = ?`, answer:q, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${b} × ${q} = ${a}`}, showMul:false, dir:'ltr'
      };
    },

    word: null,

    fractions(diff) {
      const r = window.GRADE_CONFIG.ranges.fractions[diff];
      const [n, d] = pick(r.pairs);
      const total = rnd(d, Math.floor(r.totalMax / d)) * d;
      const part = (total / d) * n;
      const theme = pick(GAME_THEMES);
      return {
        type:'num', cat:'fractions', diff, label:theme.label, gameLabel:'',
        text:`כמה זה ${n}/${d} מתוך ${total.toLocaleString()}?`, answer:part,
        pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${total}÷${d}=${total/d} לחלק. ×${n}=${part}`},
        showMul:false, dir:'rtl'
      };
    },

    // ── Shapes / full grade-6 curriculum pool ──
    shapes(diff) {
      const pts = window.GRADE_CONFIG.pts[diff];
      const theme = pick(GAME_THEMES);

      // π ≈ 3 for easy mental math; more precise for harder
      const easyPool = [
        // Circle basics (π ≈ 3)
        { text:'היקף עיגול שרדיוסו 5 ס"מ? (השתמש ב-π≈3)', answer:30, hint:'💡 היקף = 2×π×r = 2×3×5 = 30 ס"מ' },
        { text:'שטח עיגול שרדיוסו 4 ס"מ? (השתמש ב-π≈3)', answer:48, hint:'💡 שטח = π×r² = 3×16 = 48 ס"מ²' },
        // Negative numbers intro
        { text:'5 - 8 = ?',    answer:-3, hint:'💡 5-8 = -3 (מספר שלילי!)' },
        { text:'-3 + 7 = ?',   answer:4,  hint:'💡 -3+7 = 4' },
        { text:'-6 + 6 = ?',   answer:0,  hint:'💡 מספר ועצמו השלילי = 0!' },
        { text:'-4 - 2 = ?',   answer:-6, hint:'💡 -4-2 = -6' },
        // Ratio
        { text:'יחס 2:3. אם הראשון הוא 10, מה השני?', answer:15, hint:'💡 10÷2×3 = 15' },
        { text:'יחס 1:4. אם הראשון הוא 5, מה השני?',  answer:20, hint:'💡 5×4 = 20' },
        // Percentages — increase
        { text:'מחיר 100 ₪ עלה ב-20%. מה המחיר החדש?', answer:120, hint:'💡 100+20=120 ₪' },
        { text:'מחיר 50 ₪ ירד ב-10%. מה המחיר החדש?',  answer:45, hint:'💡 50-5=45 ₪' },
      ];

      const mediumPool = [
        // Circle (π≈3.14 — use integer-friendly)
        { text:'רדיוס עיגול 7 ס"מ. היקפו? (π≈3, תשובה בס"מ)', answer:44, hint:'💡 2×3.14×7≈44 ס"מ (קרוב)' },
        // Negative numbers
        { text:'-10 + 4 = ?',  answer:-6, hint:'💡 -10+4 = -6' },
        { text:'3 - 11 = ?',   answer:-8, hint:'💡 3-11 = -8' },
        { text:'-7 + 12 = ?',  answer:5,  hint:'💡 12-7 = 5' },
        // Ratio and proportion
        { text:'אם 3 עוגות עולות 90 ₪, כמה עולות 5 עוגות?', answer:150, hint:'💡 90÷3=30 לאחת, ×5=150 ₪' },
        { text:'יחס בנות לבנים 2:3. יש 15 בנים. כמה בנות?',  answer:10, hint:'💡 15÷3×2 = 10 בנות' },
        // Scale
        { text:'במפה 1:1000. מרחק 5 ס"מ על המפה = כמה מ\' במציאות?', answer:50, hint:'💡 5 × 1000 ס"מ = 5000 ס"מ = 50 מ\'' },
        // Percentages
        { text:'כמה זה 15% מ-200?',    answer:30, hint:'💡 10%=20, 5%=10, 15%=30' },
        { text:'כמה זה 35% מ-100?',    answer:35, hint:'💡 35% מ-100 = 35!' },
        { text:'מחיר לפני הנחה 200 ₪, הנחה 25%. מחיר אחרי?', answer:150, hint:'💡 200×0.75 = 150 ₪' },
        // Algebra intro
        { text:'x + 5 = 12. מה x?',  answer:7,  hint:'💡 x = 12 - 5 = 7!' },
        { text:'3x = 18. מה x?',     answer:6,  hint:'💡 x = 18 ÷ 3 = 6!' },
      ];

      const hardPool = [
        // Circle — area and perimeter (π≈3)
        { text:'שטח עיגול שקוטרו 10 ס"מ? (π≈3)', answer:75, hint:'💡 r=5, שטח=3×25=75 ס"מ²' },
        { text:'היקף עיגול שקוטרו 14 ס"מ? (π≈3)', answer:42, hint:'💡 r=7, היקף=2×3×7=42 ס"מ' },
        // Cylinder volume
        { text:'נפח גליל: r=3, גובה=5 ס"מ? (π≈3)', answer:135, hint:'💡 π×r²×h = 3×9×5 = 135 ס"מ³' },
        // Negative numbers — multi-step
        { text:'-5 + 3 - 4 = ?',   answer:-6, hint:'💡 -5+3=-2, -2-4=-6' },
        { text:'(-3) × 4 = ?',     answer:-12, hint:'💡 שלילי × חיובי = שלילי!' },
        { text:'(-6) × (-2) = ?',  answer:12,  hint:'💡 שלילי × שלילי = חיובי!' },
        // Ratio / proportion advanced
        { text:'מתכון ל-4 אנשים: 200 גרם קמח. לכמה גרם צריך ל-10 אנשים?', answer:500, hint:'💡 200÷4×10 = 500 גרם' },
        { text:'מהירות 60 קמ"ש. בשעה וחצי, כמה ק"מ?', answer:90, hint:'💡 60×1.5=90 ק"מ' },
        // Percentages — profit/loss
        { text:'קניתי ב-80 ₪ ומכרתי ב-100 ₪. כמה % רווח?', answer:25, hint:'💡 רווח=20, 20÷80×100=25%' },
        { text:'אחוז שינוי מ-50 ל-60 הוא כמה?', answer:20, hint:'💡 (60-50)÷50×100 = 20%' },
        // Algebra
        { text:'2x + 3 = 11. מה x?',  answer:4, hint:'💡 2x=8, x=4!' },
        { text:'x/3 = 5. מה x?',      answer:15, hint:'💡 x = 5 × 3 = 15!' },
        // Statistics
        { text:'ממוצע של: 5, 10, 15, 20. הוסף מספר כך שהממוצע יהיה 12. מה המספר?', answer:10, hint:'💡 סכום נדרש=60, 5+10+15+20=50, חסר 10!' },
        { text:'חציון של: 4, 7, 2, 9, 5, 1, 8 הוא?', answer:5, hint:'💡 סדר: 1,2,4,5,7,8,9 — האמצעי הוא 5!' },
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
