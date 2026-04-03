// ══════════════════════════════════════════════
// GRADE 4 — כיתה ד
// Categories: all + fractions + shapes + perimeter + area + angles + shapes3d + measurement
// Numbers: up to 9999
// New geometry: triangle area, angle sums, 3D shapes (faces/edges/vertices), measurement conversions
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'ד',
  gradeName: 'כיתה ד',
  gradeEmoji: '🔮',
  gradeColor: '#9b59b6',

  availableCategories: ['add', 'sub', 'mul', 'div', 'word', 'shapes', 'fractions',
                        'perimeter', 'area', 'angles', 'shapes3d', 'measurement'],
  availableLearnTopics: ['division', 'shapes', 'fractions',
                         'perimeter_learn', 'area_learn', 'angles_learn', 'shapes3d_learn', 'measurement_learn'],
  availableExamTopics: ['add', 'sub', 'mul', 'div', 'word', 'shapes', 'fractions',
                        'perimeter', 'area', 'angles', 'shapes3d', 'measurement'],

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
  },

  pts: { easy:6, medium:13, hard:22 },

  welcome: 'כיתה ד — שברים, גיאומטריה וגופים! 🔮',
  tip: 'גופים 3D — ספור פנים, קצוות, קודקודים! 🧊',

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
      const total = rnd(d, r.totalMax / d) * d;
      const part = (total / d) * n;
      const theme = pick(GAME_THEMES);
      return { type:'num', cat:'fractions', diff, label:theme.label, gameLabel:'',
        text:`כמה זה ${n}/${d} מתוך ${total}?`, answer:part,
        pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 חלק ${total} ל-${d} חלקים = ${total/d} לכל חלק. קח ${n} חלקים = ${part}`},
        showMul:false, dir:'rtl' };
    },
    perimeter(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('perimeter', diff);
      const s = rnd(3, 12); const answer = 4*s;
      return { type:'num', cat:'perimeter', diff, label:'📏 היקף', gameLabel:'',
        text:`מה היקף הריבוע שצלעו ${s} ס"מ?`, answer,
        pts:window.GRADE_CONFIG.pts[diff], hint:{type:'text',msg:`💡 4×${s}=${answer}`}, showMul:false, dir:'rtl' };
    },
    area(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('area', diff);
      const w = rnd(3, 12), h = rnd(2, 8); const answer = w*h;
      return { type:'num', cat:'area', diff, label:'📐 שטח', gameLabel:'',
        text:`מה שטח המלבן? (${w} × ${h})`, answer,
        pts:window.GRADE_CONFIG.pts[diff], hint:{type:'text',msg:`💡 ${w}×${h}=${answer}`}, showMul:false, dir:'rtl' };
    },
    angles(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('angles', diff);
      return { type:'num', cat:'angles', diff, label:'📐 זוויות', gameLabel:'',
        text:'סכום זוויות משולש = ?°', answer:180,
        pts:window.GRADE_CONFIG.pts[diff], hint:{type:'text',msg:'💡 סכום זוויות משולש = 180°'}, showMul:false, dir:'rtl' };
    },
    shapes3d(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('shapes3d', diff);
      return { type:'num', cat:'shapes3d', diff, label:'🧊 גופים 3D', gameLabel:'',
        text:'כמה פנים יש לקוביה?', answer:6,
        pts:window.GRADE_CONFIG.pts[diff], hint:{type:'text',msg:'💡 קוביה = 6 פנים, 12 קצוות, 8 קודקודים'}, showMul:false, dir:'rtl' };
    },
    measurement(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('measurement', diff);
      return { type:'num', cat:'measurement', diff, label:'📏 מדידה', gameLabel:'',
        text:"1 ק\"מ = כמה מטר?", answer:1000,
        pts:window.GRADE_CONFIG.pts[diff], hint:{type:'text',msg:'💡 1 ק"מ = 1000 מ\''}, showMul:false, dir:'rtl' };
    },
  },
};
