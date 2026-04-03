// ══════════════════════════════════════════════
// GRADE 1 — כיתה א
// Categories: addition, subtraction, shapes2d (basic), measurement (basic)
// Numbers: small, up to 30 max
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'א',
  gradeName: 'כיתה א',
  gradeEmoji: '🌱',
  gradeColor: '#2ed573',

  availableCategories: ['add', 'sub', 'shapes2d', 'measurement'],
  availableLearnTopics: ['shapes2d_learn', 'measurement_learn'],
  availableExamTopics: ['add', 'sub', 'shapes2d', 'measurement'],

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
      return { type:'num', cat:'add', diff, label:theme.label, gameLabel:brainrotLabel(),
        text:`${a} + ${b} = ?`, answer:a+b, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'decompose',a,b}, showMul:false, dir:'ltr' };
    },
    sub(diff) {
      const r = window.GRADE_CONFIG.ranges.sub[diff];
      const a = rnd(r.aMin, r.aMax), b = rnd(1, a);
      const theme = pick(GAME_THEMES);
      return { type:'num', cat:'sub', diff, label:theme.label, gameLabel:brainrotLabel(),
        text:`${a} - ${b} = ?`, answer:a-b, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'cubes',total:a,remove:b}, showMul:false, dir:'ltr' };
    },
    shapes2d(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('shapes2d', diff);
      return { type:'num', cat:'shapes2d', diff, label:'🔷 צורות 2D', gameLabel:'',
        text:'כמה צלעות יש למשולש?', answer:3, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:'💡 ספור את הצלעות!'}, showMul:false, dir:'rtl' };
    },
    measurement(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('measurement', diff);
      return { type:'num', cat:'measurement', diff, label:'📏 מדידה', gameLabel:'',
        text:"כמה דקות יש בשעה?", answer:60, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:"💡 1 שעה = 60 דקות"}, showMul:false, dir:'rtl' };
    },
  },
};
