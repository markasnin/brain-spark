// ══════════════════════════════════════════════
// GRADE 1 — כיתה א
// Categories: add, sub, shapes, measurement
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'א', gradeName: 'כיתה א', gradeEmoji: '🌱', gradeColor: '#2ed573',
  availableCategories: ['add', 'sub', 'shapes', 'measurement'],
  availableLearnTopics: ['measurement'],
  availableExamTopics:  ['add', 'sub', 'shapes', 'measurement'],
  ranges: {
    add: { easy:{aMin:1,aMax:10,bMin:1,bMax:10}, medium:{aMin:5,aMax:20,bMin:5,bMax:20}, hard:{aMin:10,aMax:30,bMin:10,bMax:30} },
    sub: { easy:{aMin:2,aMax:10}, medium:{aMin:5,aMax:20}, hard:{aMin:10,aMax:30} },
  },
  pts: { easy:3, medium:6, hard:10 },
  welcome: 'ברוך הבא לכיתה א! חיבור, חיסור, צורות ומדידה! 🌱',
  tip: 'התחל בחיבור — קל להתחיל משם! ➕',
  generators: {
    add(diff) {
      const r = window.GRADE_CONFIG.ranges.add[diff];
      const a = rnd(r.aMin,r.aMax), b = rnd(r.bMin,r.bMax);
      const theme = pick(GAME_THEMES);
      return { type:'num',cat:'add',diff,label:theme.label,gameLabel:brainrotLabel(),
        text:`${a} + ${b} = ?`,answer:a+b,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'decompose',a,b},showMul:false,dir:'ltr' };
    },
    sub(diff) {
      const r = window.GRADE_CONFIG.ranges.sub[diff];
      const a = rnd(r.aMin,r.aMax), b = rnd(1,Math.max(1,a-1));
      const theme = pick(GAME_THEMES);
      return { type:'num',cat:'sub',diff,label:theme.label,gameLabel:brainrotLabel(),
        text:`${a} - ${b} = ?`,answer:a-b,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'cubes',total:a,remove:b},showMul:false,dir:'ltr' };
    },
    shapes(diff) {
      const pts = window.GRADE_CONFIG.pts[diff];
      const theme = pick(GAME_THEMES);
      const pools = {
        easy:[
          {text:'כמה צלעות יש למשולש?',answer:3,hint:'💡 ספור את הקווים!'},
          {text:'כמה צלעות יש לריבוע?',answer:4,hint:'💡 4 צלעות שוות!'},
          {text:'כמה פינות יש לריבוע?',answer:4,hint:'💡 כמו הצלעות — 4!'},
          {text:'כמה צלעות יש למלבן?',answer:4,hint:'💡 2 ארוכות + 2 קצרות!'},
          {text:'כמה פינות יש למשולש?',answer:3,hint:'💡 ספור את הפינות!'},
          {text:'האם 4 זוגי? (כן=1 לא=0)',answer:1,hint:'💡 4÷2=2, כן זוגי!'},
          {text:'האם 7 זוגי? (כן=1 לא=0)',answer:0,hint:'💡 7 הוא אי-זוגי!'},
          {text:'מה המספר שאחרי 9?',answer:10,hint:'💡 9+1=10!'},
          {text:'מה המספר שלפני 5?',answer:4,hint:'💡 5-1=4!'},
        ],
        medium:[
          {text:'כמה זה חצי מ-10?',answer:5,hint:'💡 10÷2=5'},
          {text:'כמה זה חצי מ-8?',answer:4,hint:'💡 8÷2=4'},
          {text:'כמה זה חצי מ-20?',answer:10,hint:'💡 20÷2=10'},
          {text:'כמה צלעות יש למחומש?',answer:5,hint:'💡 "חמש" = 5 צלעות!'},
          {text:'כמה צלעות יש למשושה?',answer:6,hint:'💡 "שש" = 6 צלעות!'},
          {text:'האם 15 זוגי? (כן=1 לא=0)',answer:0,hint:'💡 מסתיים ב-5 = אי-זוגי!'},
          {text:'מה גדול יותר: 13 או 8?',answer:13,hint:'💡 13 > 8!'},
        ],
        hard:[
          {text:'כמה זה חצי מ-30?',answer:15,hint:'💡 30÷2=15'},
          {text:'כמה זה חצי מ-24?',answer:12,hint:'💡 24÷2=12'},
          {text:'5 אוהבים כדורגל, 3 כדורסל. כמה בסך הכל?',answer:8,hint:'💡 5+3=8'},
          {text:'כמה עשרות יש ב-23?',answer:2,hint:'💡 23=2 עשרות+3 יחידות'},
          {text:'כמה יחידות יש ב-37?',answer:7,hint:'💡 37=3 עשרות+7 יחידות'},
          {text:'10 + 7 = ?',answer:17,hint:'💡 עשרה ועוד שבע!'},
          {text:'20 + 5 = ?',answer:25,hint:'💡 עשרים ועוד חמש!'},
        ],
      };
      const q = pick(pools[diff]);
      return { type:'num',cat:'shapes',diff,label:theme.label,gameLabel:'',
        text:q.text,answer:q.answer,pts,hint:{type:'text',msg:q.hint},showMul:false,dir:'rtl' };
    },
    measurement(diff) {
      const pts = window.GRADE_CONFIG.pts[diff];
      const theme = pick(GAME_THEMES);
      const pools = {
        easy:[
          {text:'כמה ס"מ יש ב-1 מטר?',answer:100,hint:'💡 מטר = 100 ס"מ!'},
          {text:'כמה גרם יש ב-1 ק"ג?',answer:1000,hint:'💡 ק"ג = 1000 גרם!'},
          {text:'כמה דקות יש בשעה?',answer:60,hint:'💡 שעה = 60 דקות!'},
          {text:'כמה שניות יש בדקה?',answer:60,hint:'💡 דקה = 60 שניות!'},
          {text:'כמה מ"ל יש ב-1 ליטר?',answer:1000,hint:'💡 ליטר = 1000 מ"ל!'},
        ],
        medium:[
          {text:'כמה ס"מ ב-2 מטר?',answer:200,hint:'💡 2×100=200 ס"מ'},
          {text:'500 מ"ל + 500 מ"ל = כמה ליטר?',answer:1,hint:'💡 1000 מ"ל=1 ליטר!'},
          {text:'שני עפרונות, כל אחד 10 ס"מ. כמה ביחד?',answer:20,hint:'💡 10+10=20 ס"מ'},
          {text:'מה ארוך יותר: 50 ס"מ או 1 מ\'? (מ=1)',answer:1,hint:'💡 1 מ\'=100 ס"מ > 50 ס"מ!'},
        ],
        hard:[
          {text:'3 מטר = כמה ס"מ?',answer:300,hint:'💡 3×100=300'},
          {text:'2 שעות = כמה דקות?',answer:120,hint:'💡 2×60=120'},
          {text:'חצי שעה = כמה דקות?',answer:30,hint:'💡 60÷2=30 דקות'},
          {text:'1.5 ליטר = כמה מ"ל?',answer:1500,hint:'💡 1.5×1000=1500'},
        ],
      };
      const q = pick(pools[diff]);
      return { type:'num',cat:'measurement',diff,label:theme.label,gameLabel:'',
        text:q.text,answer:q.answer,pts,hint:{type:'text',msg:q.hint},showMul:false,dir:'rtl' };
    },
  },
};
