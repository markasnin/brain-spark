// ══════════════════════════════════════════════
// GRADE 2 — כיתה ב
// The "original" game level — everything up to what existed before
// Categories: add, sub, mul (intro), word problems
// Numbers: up to 99
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'ב',
  gradeName: 'כיתה ב',
  gradeEmoji: '📊',
  gradeColor: '#ffd32a',

  availableCategories: ['add', 'sub', 'mul', 'word'],
  availableLearnTopics: ['mul', 'word'],
  availableExamTopics: ['add', 'sub', 'mul', 'word'],

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

  welcome: 'ברוך הבא לכיתה ב! עכשיו גם כפל! ⚡',
  tip: 'כבר יודע חיבור? נסה כפל! ✖️',

  // null = use the default generator from the main game
  generators: {
    add: null,
    sub: null,
    mul: null,
    word: null,
  },
};
