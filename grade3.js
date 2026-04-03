// ══════════════════════════════════════════════
// GRADE 3 — כיתה ג
// Categories: add, sub, mul, div, word, shapes, perimeter, area, angles, measurement
// Numbers: up to 500, mul up to 12x12
// New geometry: perimeter, grid area, angle types, measurement units
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'ג',
  gradeName: 'כיתה ג',
  gradeEmoji: '⚡',
  gradeColor: '#1e90ff',

  availableCategories: ['add', 'sub', 'mul', 'div', 'word', 'shapes', 'perimeter', 'area', 'angles', 'measurement'],
  availableLearnTopics: ['division', 'shapes', 'perimeter_learn', 'area_learn', 'angles_learn', 'measurement_learn'],
  availableExamTopics: ['add', 'sub', 'mul', 'div', 'word', 'shapes', 'perimeter', 'area', 'angles', 'measurement'],

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

  welcome: 'כיתה ג — גם חילוק, היקף, שטח וזוויות! ⚡',
  tip: 'היקף = סכום כל הצלעות! 📏',

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
    shapes: null,
    perimeter(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('perimeter', diff);
      const s = rnd(2, 10); const answer = 4*s;
      return { type:'num', cat:'perimeter', diff, label:'📏 היקף', gameLabel:'',
        text:`מה היקף הריבוע שצלעו ${s} ס"מ?`, answer,
        pts:window.GRADE_CONFIG.pts[diff], hint:{type:'text',msg:`💡 4×${s}=${answer}`}, showMul:false, dir:'rtl' };
    },
    area(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('area', diff);
      const w = rnd(2, 8), h = rnd(2, 6); const answer = w*h;
      return { type:'num', cat:'area', diff, label:'📐 שטח', gameLabel:'',
        text:`מה שטח המלבן? (${w} × ${h})`, answer,
        pts:window.GRADE_CONFIG.pts[diff], hint:{type:'text',msg:`💡 ${w}×${h}=${answer}`}, showMul:false, dir:'rtl' };
    },
    angles(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('angles', diff);
      return { type:'num', cat:'angles', diff, label:'📐 זוויות', gameLabel:'',
        text:'זווית ישרה = כמה מעלות?', answer:90,
        pts:window.GRADE_CONFIG.pts[diff], hint:{type:'text',msg:'💡 זווית ישרה = 90°'}, showMul:false, dir:'rtl' };
    },
    measurement(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('measurement', diff);
      return { type:'num', cat:'measurement', diff, label:'📏 מדידה', gameLabel:'',
        text:"1 מטר = כמה ס\"מ?", answer:100,
        pts:window.GRADE_CONFIG.pts[diff], hint:{type:'text',msg:'💡 1 מ\' = 100 ס"מ'}, showMul:false, dir:'rtl' };
    },
  },
};
