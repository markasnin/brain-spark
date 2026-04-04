// ══════════════════════════════════════════════
// GRADE 1 — כיתה א  |  תוכנית משרד החינוך תשס"ו
// ────────────────────────────────────────────
// מספרים: ספירה ומנייה עד 100, זוגיות ואי-זוגיות, ישר המספרים
// פעולות: חיבור וחיסור עד 20 (ויותר לפי יכולת), עשרות שלמות
//          מבוא לכפל וחילוק עד 20
// גאומטריה: מצולעים (היכרות גלובלית), הזזה ושיקוף
// מדידה: אורך בס"מ, זמן בשעות שלמות
// שברים: היכרות עם חצי (ללא סמל פורמלי)
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'א',
  gradeName: 'כיתה א',
  gradeEmoji: '🌱',
  gradeColor: '#2ed573',

  availableCategories: ['add', 'sub', 'evens', 'shapes2d', 'measurement'],
  availableLearnTopics: ['shapes2d_learn', 'measurement_learn'],
  availableExamTopics:  ['add', 'sub', 'evens', 'shapes2d', 'measurement'],

  ranges: {
    add: {
      easy:   { aMin:1, aMax:9,  bMin:1, bMax:9  },   // חיבור עד 20
      medium: { aMin:5, aMax:15, bMin:3, bMax:15 },
      hard:   { aMin:8, aMax:18, bMin:2, bMax:18 },
    },
    sub: {
      easy:   { aMin:2, aMax:10 },   // חיסור עד 20
      medium: { aMin:6, aMax:18 },
      hard:   { aMin:10,aMax:20 },
    },
  },

  pts: { easy:3, medium:6, hard:10 },
  welcome: 'ברוכים הבאים לכיתה א! נלמד חיבור, חיסור וצורות! 🌱',
  tip: 'ספור על האצבעות — זה עוזר! 🖐️',

  generators: {
    add(diff) {
      const r = window.GRADE_CONFIG.ranges.add[diff];
      const a = rnd(r.aMin, r.aMax), b = rnd(r.bMin, r.bMax);
      if (a + b > 20 && diff === 'easy') return window.GRADE_CONFIG.generators.add(diff);
      const th = pick(GAME_THEMES);
      return { type:'num', cat:'add', diff, label:th.label, gameLabel:brainrotLabel(),
        text:`${a} + ${b} = ?`, answer:a+b, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'decompose',a,b}, showMul:false, dir:'ltr' };
    },
    sub(diff) {
      const r = window.GRADE_CONFIG.ranges.sub[diff];
      const total = rnd(r.aMin, r.aMax);
      const b = rnd(1, total - 1);
      const a = total - b;
      const th = pick(GAME_THEMES);
      return { type:'num', cat:'sub', diff, label:th.label, gameLabel:brainrotLabel(),
        text:`${total} - ${b} = ?`, answer:a, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'cubes',total,remove:b}, showMul:false, dir:'ltr' };
    },
    evens(diff) {
      // זוגיות ואי-זוגיות — תוכנית כיתה א
      const max = diff==='easy' ? 10 : diff==='medium' ? 20 : 30;
      const n = rnd(1, max);
      const isEven = n % 2 === 0;
      const types = [
        { text:`האם ${n} הוא מספר זוגי? (1=כן, 2=לא)`, answer: isEven?1:2,
          hint:`💡 ${isEven ? `${n} זוגי — מתחלק ב-2 בדיוק` : `${n} אי-זוגי — לא מתחלק ב-2 בדיוק`}` },
        { text:`כמה אחד לפני ${n}?`, answer: n-1, hint:`💡 לפני ${n} בא ${n-1}` },
        { text:`כמה אחד אחרי ${n}?`, answer: n+1, hint:`💡 אחרי ${n} בא ${n+1}` },
        { text:`מה המספר שבין ${n-1} ל-${n+1}?`, answer: n, hint:`💡 בין ${n-1} ל-${n+1} נמצא ${n}` },
      ];
      const q = pick(types);
      const gc = window.GRADE_CONFIG;
      return { type:'num', cat:'evens', diff, label:'🔢 מספרים', gameLabel:'',
        text:q.text, answer:q.answer, pts:gc.pts[diff],
        hint:{type:'text',msg:q.hint}, showMul:false, dir:'rtl' };
    },
    shapes2d(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('shapes2d', diff);
      const qs = [
        {text:'כמה פינות יש למשולש?', answer:3, hint:'💡 משולש = 3 פינות ו-3 צלעות'},
        {text:'כמה צלעות יש לריבוע?', answer:4, hint:'💡 ריבוע = 4 צלעות שוות'},
        {text:'כמה פינות יש למלבן?', answer:4, hint:'💡 מלבן = 4 פינות ו-4 צלעות'},
        {text:'לעיגול יש כמה פינות?', answer:0, hint:'💡 לעיגול אין פינות כלל!'},
      ];
      const q = pick(qs);
      return { type:'num', cat:'shapes2d', diff, label:'🔷 צורות', gameLabel:'',
        text:q.text, answer:q.answer, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:q.hint}, showMul:false, dir:'rtl' };
    },
    measurement(diff) {
      // מדידת אורך בס"מ וזמן בשעות שלמות — תוכנית כיתה א
      const qs = {
        easy: [
          {text:'כמה שעות ביום שלם?', answer:24, hint:'💡 יום = 24 שעות'},
          {text:'כמה ימים יש בשבוע?', answer:7, hint:'💡 7 ימים בשבוע'},
          {text:'אצבע אחת ארוכה בערך כמה ס"מ? (כתוב 1)', answer:1, hint:'💡 אצבע ≈ 1 ס"מ'},
        ],
        medium: [
          {text:'עיפרון ארוך 15 ס"מ. קשרו עוד 5 ס"מ. מה האורך?', answer:20, hint:'💡 15+5=20 ס"מ'},
          {text:'כמה שעות מ-8 בבוקר עד 12 בצהריים?', answer:4, hint:'💡 12-8=4 שעות'},
        ],
        hard: [
          {text:'חוט ארוך 20 ס"מ. חתכו 8 ס"מ. כמה נשאר?', answer:12, hint:'💡 20-8=12 ס"מ'},
          {text:'כמה שעות מ-7 בבוקר עד 3 אחר הצהריים?', answer:8, hint:'💡 15-7=8 שעות'},
        ],
      };
      const q = pick(qs[diff] || qs.easy);
      return { type:'num', cat:'measurement', diff, label:'📏 מדידה', gameLabel:'',
        text:q.text, answer:q.answer, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:q.hint}, showMul:false, dir:'rtl' };
    },
  },
};
