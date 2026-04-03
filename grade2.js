// ══════════════════════════════════════════════
// GRADE 2 — כיתה ב
// Categories: add, sub, mul (intro), word, shapes2d, symmetry, measurement
// Numbers: up to 99
// New geometry: identifying 2D shapes, symmetry axes, basic measurement
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'ב',
  gradeName: 'כיתה ב',
  gradeEmoji: '📊',
  gradeColor: '#ffd32a',

  availableCategories: ['add', 'sub', 'mul', 'word', 'shapes', 'shapes2d', 'symmetry', 'measurement'],
  availableLearnTopics: ['mul', 'word', 'shapes', 'shapes2d_learn', 'symmetry_learn', 'measurement_learn'],
  availableExamTopics: ['add', 'sub', 'mul', 'word', 'shapes', 'shapes2d', 'symmetry', 'measurement'],

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

  welcome: 'ברוך הבא לכיתה ב! עכשיו גם כפל וצורות! ⚡',
  tip: 'כבר יודע חיבור? נסה צורות 2D! 🔷',

  generators: {
    add: null,
    sub: null,
    mul: null,
    word: null,
    shapes: null,
    shapes2d(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('shapes2d', diff);
      return { type:'num', cat:'shapes2d', diff, label:'🔷 צורות 2D', gameLabel:'',
        text:'כמה צלעות יש למשולש?', answer:3, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:'💡 ספור את הצלעות!'}, showMul:false, dir:'rtl' };
    },
    symmetry(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('symmetry', diff);
      return { type:'num', cat:'symmetry', diff, label:'🔁 סימטריה', gameLabel:'',
        text:'כמה צירי סימטריה לריבוע?', answer:4, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:'💡 ציר סימטריה חוצה הצורה לשני חצאים שווים'}, showMul:false, dir:'rtl' };
    },
    measurement(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('measurement', diff);
      return { type:'num', cat:'measurement', diff, label:'📏 מדידה', gameLabel:'',
        text:"כמה דקות יש בשעה?", answer:60, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:"💡 1 שעה = 60 דקות"}, showMul:false, dir:'rtl' };
    },
  },
};
