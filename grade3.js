// ══════════════════════════════════════════════
// GRADE 3 — כיתה ג
// Categories: add, sub, mul, div (unlocked from start), word
// Numbers: up to 500, mul up to 12x12
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'ג',
  gradeName: 'כיתה ג',
  gradeEmoji: '⚡',
  gradeColor: '#1e90ff',

  availableCategories: ['add', 'sub', 'mul', 'div', 'word'],
  // division unlocked from the start for grade 3+
  availableLearnTopics: ['division'],
  availableExamTopics: ['add', 'sub', 'mul', 'div', 'word'],

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

  welcome: 'כיתה ג — עכשיו גם חילוק! ➗',
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
      return { type:'num', cat:'div', diff, label:theme.label, gameLabel:brainrotLabel(),
        text:`${a} ÷ ${b} = ?`, answer:q, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'groups',a:q,b,emoji}, showMul:true, mulA:q, mulB:b, mulEmoji:emoji, dir:'ltr' };
    },
    word: null,
  },
};
