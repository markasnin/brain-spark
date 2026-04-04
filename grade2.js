// ══════════════════════════════════════════════
// GRADE 2 — כיתה ב  |  תוכנית משרד החינוך תשס"ו
// ────────────────────────────────────────────
// מספרים: עד 1,000, ספירה בדילוגים, ערך המקום, זוגיות, ישר מספרים
// פעולות: חיבור+חיסור עד 100+, כפל+חילוק (משמעות, עד 100), סוגריים
// גאומטריה: גופים (היכרות גלובלית), שיקוף/הזזה, מדידת שטח בהשוואה
// מדידה: אורך בס"מ ומ', שטח בהשוואה, משקל (השוואה), זמן ברבעי שעה
// שברים: חצי ורבע ללא סמלים פורמליים
// חקר נתונים: דיאגרמת עמודות בסיסית (מכיתה ב)
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'ב',
  gradeName: 'כיתה ב',
  gradeEmoji: '📊',
  gradeColor: '#ffd32a',

  availableCategories: ['add', 'sub', 'mul', 'word', 'shapes2d', 'fractions_half', 'measurement', 'data'],
  availableLearnTopics: ['mul', 'shapes2d_learn', 'measurement_learn'],
  availableExamTopics:  ['add', 'sub', 'mul', 'word', 'shapes2d', 'fractions_half', 'measurement'],

  ranges: {
    add: {
      easy:   { aMin:5,  aMax:30, bMin:5,  bMax:30 },   // עד 100
      medium: { aMin:20, aMax:80, bMin:10, bMax:80 },
      hard:   { aMin:50, aMax:200,bMin:30, bMax:150 },   // "ויותר לפי יכולת"
    },
    sub: {
      easy:   { aMin:5,  aMax:30 },
      medium: { aMin:20, aMax:80 },
      hard:   { aMin:50, aMax:200 },
    },
    mul: {
      // כפל עד 100 — משמעות הפעולה (לוח 2,3,4,5)
      easy:   { aMin:2, aMax:5, bMin:1, bMax:5 },
      medium: { aMin:2, aMax:9, bMin:2, bMax:9 },
      hard:   { aMin:3, aMax:10,bMin:3, bMax:10 },
    },
  },

  pts: { easy:5, medium:10, hard:18 },
  welcome: 'ברוכים הבאים לכיתה ב! כפל, חילוק וצורות! ⚡',
  tip: 'כפל = חיבור חוזר! 3×4 = 4+4+4 ✖️',

  generators: {
    add(diff) {
      const r = window.GRADE_CONFIG.ranges.add[diff];
      const a = rnd(r.aMin, r.aMax), b = rnd(r.bMin, r.bMax);
      const th = pick(GAME_THEMES);
      return { type:'num', cat:'add', diff, label:th.label, gameLabel:brainrotLabel(),
        text:`${a} + ${b} = ?`, answer:a+b, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'decompose',a,b}, showMul:false, dir:'ltr' };
    },
    sub(diff) {
      const r = window.GRADE_CONFIG.ranges.sub[diff];
      const total = rnd(r.aMin, r.aMax), b = rnd(1, Math.floor(total/2)), a = total-b;
      const th = pick(GAME_THEMES);
      return { type:'num', cat:'sub', diff, label:th.label, gameLabel:brainrotLabel(),
        text:`${total} - ${b} = ?`, answer:a, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'cubes',total,remove:b}, showMul:false, dir:'ltr' };
    },
    mul(diff) {
      const r = window.GRADE_CONFIG.ranges.mul[diff];
      const a = rnd(r.aMin, r.aMax), b = rnd(r.bMin, r.bMax);
      const th = pick(GAME_THEMES); const emoji = pick(th.items);
      return { type:'num', cat:'mul', diff, label:th.label, gameLabel:brainrotLabel(),
        text:`${a} × ${b} = ?`, answer:a*b, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'groups',a,b,emoji}, showMul:true, mulA:a, mulB:b, mulEmoji:emoji, dir:'ltr' };
    },
    word: null,
    shapes2d(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('shapes2d', diff);
      return { type:'num', cat:'shapes2d', diff, label:'🔷 צורות', gameLabel:'',
        text:'כמה צלעות יש לריבוע?', answer:4, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:'💡 ריבוע = 4 צלעות שוות'}, showMul:false, dir:'rtl' };
    },
    fractions_half(diff) {
      // חצי ורבע — כיתה ב (ללא סמלים פורמליים לפי תוכנית)
      const qs = {
        easy: [
          {text:'חיתכנו עוגה לשני חלקים שווים. כמה חלקים יש?', answer:2, hint:'💡 חצי = 2 חלקים שווים'},
          {text:'יש לי 8 ממתקים. חצי שלהם = כמה?', answer:4, hint:'💡 חצי מ-8 = 8÷2 = 4'},
          {text:'פיצה חולקה ל-4 חלקים שווים. כמה חלקים לכל ילד אם יש 4 ילדים?', answer:1, hint:'💡 4÷4=1 חלק לכל אחד'},
        ],
        medium: [
          {text:'חצי מ-12 = ?', answer:6, hint:'💡 12÷2 = 6'},
          {text:'רבע מ-16 = ?', answer:4, hint:'💡 16÷4 = 4'},
          {text:'חצי מ-20 = ?', answer:10, hint:'💡 20÷2 = 10'},
          {text:'חצי מ-10 = ?', answer:5, hint:'💡 10÷2 = 5'},
        ],
        hard: [
          {text:'רבע מ-20 = ?', answer:5, hint:'💡 20÷4 = 5'},
          {text:'חצי מ-30 = ?', answer:15, hint:'💡 30÷2 = 15'},
          {text:'רבע מ-24 = ?', answer:6, hint:'💡 24÷4 = 6'},
        ],
      };
      const q = pick(qs[diff] || qs.easy);
      return { type:'num', cat:'fractions_half', diff, label:'½ חצי ורבע', gameLabel:'',
        text:q.text, answer:q.answer, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:q.hint}, showMul:false, dir:'rtl' };
    },
    measurement(diff) {
      // אורך, שטח (השוואה), משקל (השוואה), זמן — כיתה ב
      const qs = {
        easy: [
          {text:"1 מ' = כמה ס\"מ?", answer:100, hint:"💡 1 מטר = 100 סנטימטר"},
          {text:'כמה דקות ב-חצי שעה?', answer:30, hint:'💡 שעה=60 דקות, חצי שעה=30 דקות'},
          {text:'כמה דקות ברבע שעה?', answer:15, hint:'💡 שעה=60 דקות, רבע=60÷4=15'},
          {text:'כמה ימים יש בשבוע?', answer:7, hint:'💡 7 ימים בשבוע'},
        ],
        medium: [
          {text:'עיפרון ארוך 15 ס"מ. שליט\'ר ארוך 30 ס"מ. כמה יותר ארוך השליט\'ר?', answer:15, hint:'💡 30-15=15 ס"מ'},
          {text:'השיעור מתחיל ב-8:00 ונמשך חצי שעה. מתי נגמר? (כתוב 830)', answer:830, hint:'💡 8:00+30 דקות=8:30'},
          {text:"2 מ' = כמה ס\"מ?", answer:200, hint:"💡 2×100=200 ס\"מ"},
        ],
        hard: [
          {text:'שולחן ארוך 120 ס"מ. כמה מטר ועוד כמה ס"מ זה? (כתוב ס"מ שנשארים)', answer:20, hint:'💡 120 ס"מ = 1 מ\' ועוד 20 ס"מ'},
          {text:'השיעור מתחיל ב-9:00 ונמשך שעה ורבע. מה השעה בסוף? (כתוב 1015)', answer:1015, hint:'💡 9:00+75 דקות=10:15'},
        ],
      };
      const q = pick(qs[diff] || qs.easy);
      return { type:'num', cat:'measurement', diff, label:'📏 מדידה', gameLabel:'',
        text:q.text, answer:q.answer, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:q.hint}, showMul:false, dir:'rtl' };
    },
    data(diff) {
      // דיאגרמת עמודות — קריאת נתונים פשוטה (מכיתה ב)
      const items = ['תפוחים','בננות','תפוזים','אגסים','ענבים'];
      const n = rnd(3, 4);
      const chosen = items.slice(0, n);
      const vals = chosen.map(() => rnd(2, diff==='easy'?8:diff==='medium'?15:20));
      const maxI = vals.indexOf(Math.max(...vals));
      const minI = vals.indexOf(Math.min(...vals));
      const total = vals.reduce((s,v)=>s+v,0);
      const type = diff==='easy' ? 'max' : diff==='medium' ? 'total' : 'diff';
      const rows = chosen.map((c,i)=>`${c}:${vals[i]}`).join(', ');
      const q = type==='max'
        ? {text:`הנתונים: ${rows}. כמה יש מהפרי הכי נפוץ?`, answer:vals[maxI], hint:`💡 הכי הרבה: ${chosen[maxI]}=${vals[maxI]}`}
        : type==='total'
        ? {text:`הנתונים: ${rows}. כמה פירות יש בסך הכל?`, answer:total, hint:`💡 סכום: ${vals.join('+')}=${total}`}
        : {text:`הנתונים: ${rows}. מה ההפרש בין הכי הרבה לכי הפחות?`, answer:vals[maxI]-vals[minI], hint:`💡 ${vals[maxI]}-${vals[minI]}=${vals[maxI]-vals[minI]}`};
      return { type:'num', cat:'data', diff, label:'📊 נתונים', gameLabel:'',
        text:q.text, answer:q.answer, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:q.hint}, showMul:false, dir:'rtl' };
    },
  },
};
