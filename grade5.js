// ══════════════════════════════════════════════
// GRADE 6 — כיתה ו
// All categories, maximum difficulty
// Numbers: up to 999,999
// Geometry: all shape categories + full coordinate plane (4 quadrants) + scale + transformations
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'ו',
  gradeName: 'כיתה ו',
  gradeEmoji: '🚀',
  gradeColor: '#ff4757',

  availableCategories: ['add', 'sub', 'mul', 'div', 'word', 'shapes', 'fractions',
                        'perimeter', 'area', 'angles', 'shapes3d', 'coordinates', 'measurement'],
  availableLearnTopics: ['division', 'shapes', 'fractions', 'measurement',
                         'perimeter_learn', 'area_learn', 'angles_learn', 'shapes3d_learn', 'coordinates_learn', 'measurement_learn'],
  availableExamTopics: ['add', 'sub', 'mul', 'div', 'word', 'shapes', 'fractions',
                        'perimeter', 'area', 'angles', 'shapes3d', 'coordinates', 'measurement'],

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

  welcome: 'כיתה ו — המתמטיקאים האמיתיים! גיאומטריה מלאה! 🚀',
  tip: '4 רביעים בקואורדינטות — גם מספרים שליליים! 🗺️',

  generators: {
    add(diff) {
      const r = window.GRADE_CONFIG.ranges.add[diff];
      const a = rnd(r.aMin, r.aMax), b = rnd(r.bMin, r.bMax);
      const theme = pick(GAME_THEMES);
      return { type:'num', cat:'add', diff, label:theme.label, gameLabel:brainrotLabel(),
        text:`${a.toLocaleString()} + ${b.toLocaleString()} = ?`, answer:a+b,
        pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'decompose',a,b}, showMul:false, dir:'ltr' };
    },
    sub(diff) {
      const r = window.GRADE_CONFIG.ranges.sub[diff];
      const a = rnd(r.aMin, r.aMax), b = rnd(1, Math.floor(a/2));
      const theme = pick(GAME_THEMES);
      return { type:'num', cat:'sub', diff, label:theme.label, gameLabel:brainrotLabel(),
        text:`${a.toLocaleString()} - ${b.toLocaleString()} = ?`, answer:a-b,
        pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${a.toLocaleString()} פחות ${b.toLocaleString()}`}, showMul:false, dir:'ltr' };
    },
    mul(diff) {
      const r = window.GRADE_CONFIG.ranges.mul[diff];
      const a = rnd(r.aMin, r.aMax), b = rnd(r.bMin, r.bMax);
      const theme = pick(GAME_THEMES);
      return { type:'num', cat:'mul', diff, label:theme.label, gameLabel:brainrotLabel(),
        text:`${a} × ${b} = ?`, answer:a*b, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${a} × ${b} = ${a*b}`}, showMul:false, dir:'ltr' };
    },
    div(diff) {
      const r = window.GRADE_CONFIG.ranges.div[diff];
      const b = rnd(r.bMin, r.bMax), q = rnd(r.qMin, r.qMax);
      const a = b * q;
      const theme = pick(GAME_THEMES);
      return { type:'num', cat:'div', diff, label:theme.label, gameLabel:brainrotLabel(),
        text:`${a.toLocaleString()} ÷ ${b} = ?`, answer:q, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${b} × ${q} = ${a}`}, showMul:false, dir:'ltr' };
    },
    word: null,
    shapes: null,
    fractions(diff) {
      const r = window.GRADE_CONFIG.ranges.fractions[diff];
      const [n, d] = pick(r.pairs);
      const total = rnd(d, Math.floor(r.totalMax / d)) * d;
      const part = (total / d) * n;
      const theme = pick(GAME_THEMES);
      return { type:'num', cat:'fractions', diff, label:theme.label, gameLabel:'',
        text:`כמה זה ${n}/${d} מתוך ${total.toLocaleString()}?`, answer:part,
        pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${total}÷${d}=${total/d} לחלק. ×${n}=${part}`},
        showMul:false, dir:'rtl' };
    },
    perimeter(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('perimeter', diff);
      const s = rnd(4, 20); const answer = 4*s;
      return { type:'num', cat:'perimeter', diff, label:'📏 היקף', gameLabel:'',
        text:`מה היקף הריבוע שצלעו ${s} ס"מ?`, answer,
        pts:window.GRADE_CONFIG.pts[diff], hint:{type:'text',msg:`💡 4×${s}=${answer}`}, showMul:false, dir:'rtl' };
    },
    area(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('area', diff);
      const w = rnd(4, 20), h = rnd(3, 15); const answer = w*h;
      return { type:'num', cat:'area', diff, label:'📐 שטח', gameLabel:'',
        text:`מה שטח המלבן? (${w} × ${h})`, answer,
        pts:window.GRADE_CONFIG.pts[diff], hint:{type:'text',msg:`💡 ${w}×${h}=${answer}`}, showMul:false, dir:'rtl' };
    },
    angles(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('angles', diff);
      return { type:'num', cat:'angles', diff, label:'📐 זוויות', gameLabel:'',
        text:'סכום זוויות מרובע = ?°', answer:360,
        pts:window.GRADE_CONFIG.pts[diff], hint:{type:'text',msg:'💡 (4-2)×180 = 360°'}, showMul:false, dir:'rtl' };
    },
    shapes3d(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('shapes3d', diff);
      return { type:'num', cat:'shapes3d', diff, label:'🧊 גופים 3D', gameLabel:'',
        text:'כמה קצוות יש לפירמידה ריבועית?', answer:8,
        pts:window.GRADE_CONFIG.pts[diff], hint:{type:'text',msg:'💡 פירמידה ריבועית: 5 פנים, 8 קצוות, 5 קודקודים'}, showMul:false, dir:'rtl' };
    },
    coordinates(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('coordinates', diff);
      return { type:'num', cat:'coordinates', diff, label:'🗺️ קואורדינטות', gameLabel:'',
        text:'הנקודה (−3, 2) — באיזה רביע היא?', answer:2,
        pts:window.GRADE_CONFIG.pts[diff], hint:{type:'text',msg:'💡 X שלילי, Y חיובי = רביע 2'}, showMul:false, dir:'rtl' };
    },
    measurement(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('measurement', diff);
      return { type:'num', cat:'measurement', diff, label:'📏 מדידה', gameLabel:'',
        text:"3 ק\"מ + 500 מ' = כמה מטר?", answer:3500,
        pts:window.GRADE_CONFIG.pts[diff], hint:{type:'text',msg:'💡 3×1000 + 500 = 3500'}, showMul:false, dir:'rtl' };
    },
  },
};
