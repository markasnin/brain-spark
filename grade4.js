// ══════════════════════════════════════════════
// GRADE 4 — כיתה ד
// Categories: all + fractions + shapes (unlocked from start)
// Numbers: up to 9999
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
    shapes: {
      // uses built-in shape question pool
    },
  },

  pts: { easy:6, medium:13, hard:22 },

  welcome: 'כיתה ד — שברים וגיאומטריה! 🔮',
  tip: 'שברים פתוחים! נסה אותם 🍕',

  generators: {
    add: null,
    sub: null,
    mul: null,
    div: null,
    word: null,
    shapes: null,
    fractions(diff) {
      const r = window.GRADE_CONFIG.ranges.fractions[diff];
      const [n, d] = pick(r.pairs);
      const total = rnd(d, r.totalMax / d) * d; // ensure clean multiple
      const part = (total / d) * n;
      const theme = pick(GAME_THEMES);
      return { type:'num', cat:'fractions', diff, label:theme.label, gameLabel:'',
        text:`כמה זה ${n}/${d} מתוך ${total}?`, answer:part,
        pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 חלק ${total} ל-${d} חלקים = ${total/d} לכל חלק. קח ${n} חלקים = ${part}`},
        showMul:false, dir:'rtl' };
    },
  },
};
