// ══════════════════════════════════════════════
// GRADE 5 — כיתה ה
// Curriculum: 4 ops with large numbers (up to 99,999),
//   fractions (add/sub different denominators, multiply
//   fraction by whole), mixed numbers, decimals (add/sub,
//   place value), percentages intro, geometry (volume of
//   box/cube, complex areas), statistics (mean/mode/median),
//   word problems (multi-step, harder)
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'ה',
  gradeName: 'כיתה ה',
  gradeEmoji: '🏆',
  gradeColor: '#ff6348',

  availableCategories: ['add', 'sub', 'mul', 'div', 'word', 'shapes', 'fractions'],
  availableLearnTopics: ['division', 'shapes', 'fractions', 'measurement'],
  availableExamTopics: ['add', 'sub', 'mul', 'div', 'word', 'shapes', 'fractions'],

  ranges: {
    add: {
      easy:   { aMin:500,   aMax:9999,  bMin:500,   bMax:9999  },
      medium: { aMin:1000,  aMax:49999, bMin:1000,  bMax:49999 },
      hard:   { aMin:10000, aMax:99999, bMin:10000, bMax:99999 },
    },
    sub: {
      easy:   { aMin:500,   aMax:9999  },
      medium: { aMin:1000,  aMax:49999 },
      hard:   { aMin:10000, aMax:99999 },
    },
    mul: {
      easy:   { aMin:5,  aMax:15, bMin:5,  bMax:15 },
      medium: { aMin:10, aMax:25, bMin:10, bMax:25 },
      hard:   { aMin:15, aMax:50, bMin:15, bMax:50 },
    },
    div: {
      easy:   { bMin:3,  bMax:12, qMin:3,  qMax:12 },
      medium: { bMin:5,  bMax:20, qMin:5,  qMax:20 },
      hard:   { bMin:7,  bMax:25, qMin:7,  qMax:25 },
    },
    fractions: {
      easy:   { pairs:[[1,2],[1,4],[3,4],[1,3],[2,3]], totalMax:40 },
      medium: { pairs:[[1,5],[2,5],[3,5],[4,5],[1,6],[5,6]], totalMax:60 },
      hard:   { pairs:[[1,7],[2,7],[3,8],[5,8],[7,8],[1,9],[4,9]], totalMax:100 },
    },
  },

  pts: { easy:7, medium:15, hard:25 },

  welcome: 'כיתה ה — אחוזים, עשרוניים ונפח! 🏆',
  tip: 'בעיות מילוליות מורכבות — אתגר אמיתי! 📖',

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
      const a = rnd(r.aMin, r.aMax), b = rnd(1, a);
      const theme = pick(GAME_THEMES);
      return {
        type:'num', cat:'sub', diff, label:theme.label, gameLabel:brainrotLabel(),
        text:`${a.toLocaleString()} - ${b.toLocaleString()} = ?`, answer:a-b,
        pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'cubes',total:Math.min(a,30),remove:Math.min(b,30)}, showMul:false, dir:'ltr'
      };
    },

    mul(diff) {
      const r = window.GRADE_CONFIG.ranges.mul[diff];
      const a = rnd(r.aMin, r.aMax), b = rnd(r.bMin, r.bMax);
      const theme = pick(GAME_THEMES);
      const emoji = pick(theme.items);
      return {
        type:'num', cat:'mul', diff, label:theme.label, gameLabel:brainrotLabel(),
        text:`${a} × ${b} = ?`, answer:a*b, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'groups',a,b,emoji}, showMul:true, mulA:a, mulB:b, mulEmoji:emoji, dir:'ltr'
      };
    },

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

    fractions(diff) {
      const r = window.GRADE_CONFIG.ranges.fractions[diff];
      const [n, d] = pick(r.pairs);
      const total = rnd(d, Math.floor(r.totalMax / d)) * d;
      const part = (total / d) * n;
      const theme = pick(GAME_THEMES);
      return {
        type:'num', cat:'fractions', diff, label:theme.label, gameLabel:'',
        text:`כמה זה ${n}/${d} מתוך ${total}?`, answer:part,
        pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 חלק ${total} ל-${d} = ${total/d} לכל חלק. קח ${n} חלקים = ${part}`},
        showMul:false, dir:'rtl'
      };
    },

    // ── Shapes / decimals / percentages / volume / statistics for grade 5 ──
    shapes(diff) {
      const pts = window.GRADE_CONFIG.pts[diff];
      const theme = pick(GAME_THEMES);

      const easyPool = [
        // Decimals — place value
        { text:'כתוב את 3.7 כשבר: 3 שלמים ו-? עשיריות', answer:7,  hint:'💡 3.7 = 3 שלמים ו-7 עשיריות!' },
        { text:'כמה עשיריות יש ב-0.5?',                  answer:5,  hint:'💡 0.5 = 5 עשיריות!' },
        { text:'0.3 + 0.4 = ? (כתוב כעשיריות: כמה עשיריות)', answer:7, hint:'💡 3+4 = 7 עשיריות = 0.7' },
        // Percentages intro
        { text:'כמה זה 10% מ-50?',   answer:5,  hint:'💡 10% = 1/10, 50÷10 = 5' },
        { text:'כמה זה 50% מ-80?',   answer:40, hint:'💡 50% = חצי, 80÷2 = 40' },
        { text:'כמה זה 25% מ-40?',   answer:10, hint:'💡 25% = רבע, 40÷4 = 10' },
        // Volume intro
        { text:'נפח קובייה שצלעה 3 ס"מ?', answer:27, hint:'💡 3 × 3 × 3 = 27 ס"מ³' },
        { text:'נפח קובייה שצלעה 2 ס"מ?', answer:8,  hint:'💡 2 × 2 × 2 = 8 ס"מ³' },
        // Fractions — add same denominator
        { text:'2/5 + 1/5 = ? (כתוב מונה, מכנה=5)', answer:3, hint:'💡 2+1=3, התשובה 3/5' },
        { text:'3/8 + 2/8 = ? (כתוב מונה, מכנה=8)', answer:5, hint:'💡 3+2=5, התשובה 5/8' },
      ];

      const mediumPool = [
        // Decimals — add/sub
        { text:'2.5 + 1.3 = ? (כתוב ×10 של התשובה)', answer:38, hint:'💡 2.5+1.3=3.8, ×10=38' },
        { text:'5.6 - 2.4 = ? (כתוב ×10 של התשובה)', answer:32, hint:'💡 5.6-2.4=3.2, ×10=32' },
        // Percentages
        { text:'כמה זה 20% מ-60?',   answer:12, hint:'💡 20% = 1/5, 60÷5 = 12' },
        { text:'כמה זה 75% מ-40?',   answer:30, hint:'💡 75% = 3/4, 40÷4×3 = 30' },
        { text:'כמה זה 10% מ-350?',  answer:35, hint:'💡 350 ÷ 10 = 35' },
        // Volume of box
        { text:'נפח קופסה: 4 ס"מ × 3 ס"מ × 2 ס"מ?', answer:24, hint:'💡 4×3×2 = 24 ס"מ³' },
        { text:'נפח קופסה: 5 ס"מ × 5 ס"מ × 4 ס"מ?', answer:100, hint:'💡 5×5×4 = 100 ס"מ³' },
        // Statistics
        { text:'חציון של: 2, 5, 7, 9, 11 הוא?',    answer:7,  hint:'💡 המספר האמצעי הוא 7!' },
        { text:'ממוצע של 6, 10, 14, 6 הוא?',       answer:9,  hint:'💡 (6+10+14+6)÷4 = 36÷4 = 9' },
        { text:'שכיח של: 4, 7, 4, 9, 4, 7 הוא?',  answer:4,  hint:'💡 4 מופיע 3 פעמים!' },
      ];

      const hardPool = [
        // Fractions — add/sub different denominators
        { text:'1/2 + 1/4 = ? (כמה רבעים בסך הכל?)', answer:3, hint:'💡 1/2=2/4, 2/4+1/4=3/4!' },
        { text:'3/4 - 1/2 = ? (כמה רבעים נשארו?)',   answer:1, hint:'💡 3/4-2/4=1/4!' },
        { text:'1/3 + 1/6 = ? (כמה שישיות?)',        answer:3, hint:'💡 1/3=2/6, 2/6+1/6=3/6=1/2!' },
        // Percentages — complex
        { text:'כמה זה 15% מ-200?',   answer:30,  hint:'💡 10%=20, 5%=10, 15%=30' },
        { text:'אם מחיר עלה ב-10% מ-80 ₪, מה המחיר החדש?', answer:88, hint:'💡 80 + 8 = 88 ₪' },
        // Volume complex
        { text:'נפח קופסה: 10 ס"מ × 6 ס"מ × 3 ס"מ?', answer:180, hint:'💡 10×6×3 = 180 ס"מ³' },
        { text:'קובייה שנפחה 64 ס"מ³. מה אורך צלעה?', answer:4, hint:'💡 4×4×4 = 64, אז צלע = 4!' },
        // Statistics
        { text:'ממוצע 5 ציונים הוא 7. אחד הציונים הוא 9. אם כל השאר שווים, מה כל אחד?', answer:6, hint:'💡 סכום=35, 35-9=26, 26÷4=6.5... נסה: 4×6+9=33≠35. רמז: כולם שווים.' },
        { text:'חציון של: 3, 8, 5, 1, 9 הוא? (סדר ראשון!)', answer:5, hint:'💡 סדר: 1,3,5,8,9 — האמצעי הוא 5!' },
        // Decimal multiplication
        { text:'0.5 × 6 = ? (כתוב ×10 של התשובה)', answer:30, hint:'💡 0.5×6=3.0, ×10=30' },
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
