// ══════════════════════════════════════════════
// GRADE 5 — כיתה ה
// All categories unlocked, harder multi-step word problems
// Numbers: up to 99,999
// New geometry: circle area/circumference, L-shapes, coordinates (1st quadrant), exterior angles
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'ה',
  gradeName: 'כיתה ה',
  gradeEmoji: '🏆',
  gradeColor: '#ff6348',

  availableCategories: ['add', 'sub', 'mul', 'div', 'word', 'shapes', 'fractions',
                        'perimeter', 'area', 'angles', 'shapes3d', 'coordinates', 'measurement'],
  availableLearnTopics: ['division', 'shapes', 'fractions', 'measurement',
                         'perimeter_learn', 'area_learn', 'angles_learn', 'shapes3d_learn', 'coordinates_learn', 'measurement_learn'],
  availableExamTopics: ['add', 'sub', 'mul', 'div', 'word', 'shapes', 'fractions',
                        'perimeter', 'area', 'angles', 'shapes3d', 'coordinates', 'measurement'],

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

  welcome: 'כיתה ה — מספרים ענקיים, שברים, עיגולים וקואורדינטות! 🏆',
  tip: 'קואורדינטות חדשות — מצא נקודות על הגריד! 🗺️',

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
      const a = rnd(r.aMin, r.aMax), b = rnd(1, a);
      const theme = pick(GAME_THEMES);
      return { type:'num', cat:'sub', diff, label:theme.label, gameLabel:brainrotLabel(),
        text:`${a.toLocaleString()} - ${b.toLocaleString()} = ?`, answer:a-b,
        pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'cubes',total:Math.min(a,30),remove:Math.min(b,30)}, showMul:false, dir:'ltr' };
    },
    mul(diff) {
      const r = window.GRADE_CONFIG.ranges.mul[diff];
      const a = rnd(r.aMin, r.aMax), b = rnd(r.bMin, r.bMax);
      const theme = pick(GAME_THEMES);
      const emoji = pick(theme.items);
      return { type:'num', cat:'mul', diff, label:theme.label, gameLabel:brainrotLabel(),
        text:`${a} × ${b} = ?`, answer:a*b, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'groups',a,b,emoji}, showMul:true, mulA:a, mulB:b, mulEmoji:emoji, dir:'ltr' };
    },
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
    fractions(diff) {
      const r = window.GRADE_CONFIG.ranges.fractions[diff];
      const [n, d] = pick(r.pairs);
      const total = rnd(d, Math.floor(r.totalMax / d)) * d;
      const part = (total / d) * n;
      const theme = pick(GAME_THEMES);
      return { type:'num', cat:'fractions', diff, label:theme.label, gameLabel:'',
        text:`כמה זה ${n}/${d} מתוך ${total}?`, answer:part,
        pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 חלק ${total} ל-${d} = ${total/d} לכל חלק. קח ${n} חלקים = ${part}`},
        showMul:false, dir:'rtl' };
    },
    perimeter(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('perimeter', diff);
      const s = rnd(3, 15); const answer = 4*s;
      return { type:'num', cat:'perimeter', diff, label:'📏 היקף', gameLabel:'',
        text:`מה היקף הריבוע שצלעו ${s} ס"מ?`, answer,
        pts:window.GRADE_CONFIG.pts[diff], hint:{type:'text',msg:`💡 4×${s}=${answer}`}, showMul:false, dir:'rtl' };
    },
    area(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('area', diff);
      const w = rnd(3, 15), h = rnd(2, 10); const answer = w*h;
      return { type:'num', cat:'area', diff, label:'📐 שטח', gameLabel:'',
        text:`מה שטח המלבן? (${w} × ${h})`, answer,
        pts:window.GRADE_CONFIG.pts[diff], hint:{type:'text',msg:`💡 ${w}×${h}=${answer}`}, showMul:false, dir:'rtl' };
    },
    angles(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('angles', diff);
      return { type:'num', cat:'angles', diff, label:'📐 זוויות', gameLabel:'',
        text:'סכום זוויות משולש = ?°', answer:180,
        pts:window.GRADE_CONFIG.pts[diff], hint:{type:'text',msg:'💡 סכום זוויות = 180°'}, showMul:false, dir:'rtl' };
    },
    shapes3d(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('shapes3d', diff);
      return { type:'num', cat:'shapes3d', diff, label:'🧊 גופים 3D', gameLabel:'',
        text:'כמה פנים יש לקוביה?', answer:6,
        pts:window.GRADE_CONFIG.pts[diff], hint:{type:'text',msg:'💡 קוביה = 6 פנים'}, showMul:false, dir:'rtl' };
    },
    coordinates(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('coordinates', diff);
      return { type:'num', cat:'coordinates', diff, label:'🗺️ קואורדינטות', gameLabel:'',
        text:'הנקודה (3, 5) — מה ה-X שלה?', answer:3,
        pts:window.GRADE_CONFIG.pts[diff], hint:{type:'text',msg:'💡 (X, Y) — המספר הראשון הוא X'}, showMul:false, dir:'rtl' };
    },
    measurement(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('measurement', diff);
      return { type:'num', cat:'measurement', diff, label:'📏 מדידה', gameLabel:'',
        text:"1 ליטר = כמה מיליליטר?", answer:1000,
        pts:window.GRADE_CONFIG.pts[diff], hint:{type:'text',msg:'💡 1 ליטר = 1000 מ"ל'}, showMul:false, dir:'rtl' };
    },
  },
};
