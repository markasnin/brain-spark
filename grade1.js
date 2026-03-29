// ══════════════════════════════════════════════
// GRADE 1 — כיתה א
// Categories: addition, subtraction only
// Numbers: small, up to 30 max
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'א',
  gradeName: 'כיתה א',
  gradeEmoji: '🌱',
  gradeColor: '#2ed573',

  availableCategories: ['add', 'sub'],
  availableLearnTopics: [],
  availableExamTopics: ['add', 'sub'],

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

  welcome: 'ברוך הבא לכיתה א! נלמד חיבור וחיסור! 🌱',
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
  },
};
