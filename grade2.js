// ══════════════════════════════════════════════
// GRADE 2 — כיתה ב
// Categories: add, sub, mul, word, shapes, measurement, data
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'ב', gradeName: 'כיתה ב', gradeEmoji: '📊', gradeColor: '#ffd32a',
  availableCategories: ['add','sub','mul','word','shapes','measurement','data'],
  availableLearnTopics: ['mul','word','shapes','measurement','data'],
  availableExamTopics:  ['add','sub','mul','word','shapes','measurement','data'],
  ranges: {
    add: { easy:{aMin:1,aMax:20,bMin:1,bMax:20}, medium:{aMin:10,aMax:99,bMin:10,bMax:99}, hard:{aMin:50,aMax:200,bMin:50,bMax:200} },
    sub: { easy:{aMin:5,aMax:20}, medium:{aMin:20,aMax:99}, hard:{aMin:50,aMax:200} },
    mul: { easy:{aMin:2,aMax:5,bMin:1,bMax:5}, medium:{aMin:2,aMax:9,bMin:2,bMax:9}, hard:{aMin:3,aMax:10,bMin:5,bMax:10} },
  },
  pts: { easy:5, medium:10, hard:18 },
  welcome: 'ברוך הבא לכיתה ב! כפל, צורות, נתונים ומדידה! ⚡',
  tip: 'כבר יודע חיבור? נסה כפל! ✖️',
  generators: {
    add: null, sub: null, mul: null, word: null,
    shapes(diff) {
      const pts = window.GRADE_CONFIG.pts[diff];
      const theme = pick(GAME_THEMES);
      const pools = {
        easy:[
          {text:'כמה צלעות יש למשולש?',answer:3,hint:'💡 ספור את הקווים!'},
          {text:'כמה צלעות יש לריבוע?',answer:4,hint:'💡 4 צלעות שוות!'},
          {text:'כמה פינות יש למלבן?',answer:4,hint:'💡 פינות = כמו צלעות!'},
          {text:'כמה צלעות יש למחומש?',answer:5,hint:'💡 "חמש"=5 צלעות!'},
          {text:'כמה פינות יש למשושה?',answer:6,hint:'💡 "שש"=6 פינות!'},
          {text:'כמה זה חצי מ-10?',answer:5,hint:'💡 10÷2=5'},
          {text:'כמה זה חצי מ-20?',answer:10,hint:'💡 20÷2=10'},
          {text:'כמה זה חצי מ-14?',answer:7,hint:'💡 14÷2=7'},
        ],
        medium:[
          {text:'כמה זה רבע מ-8?',answer:2,hint:'💡 8÷4=2'},
          {text:'כמה זה רבע מ-12?',answer:3,hint:'💡 12÷4=3'},
          {text:'כמה זה רבע מ-20?',answer:5,hint:'💡 20÷4=5'},
          {text:'כמה זה שלושה רבעים מ-8?',answer:6,hint:'💡 רבע=2, ×3=6'},
          {text:'מה ההיקף של ריבוע שצלעו 5 ס"מ?',answer:20,hint:'💡 4×5=20 ס"מ'},
          {text:'מה ההיקף של מלבן 6×3 ס"מ?',answer:18,hint:'💡 6+3+6+3=18 ס"מ'},
          {text:'מה ההיקף של משולש שצלעותיו 7 ס"מ?',answer:21,hint:'💡 3×7=21 ס"מ'},
        ],
        hard:[
          {text:'בכיתה 24 ילדים. חצי מהם בנות. כמה בנות?',answer:12,hint:'💡 24÷2=12'},
          {text:'בכיתה 20 ילדים. רבע הגיעו באופניים. כמה?',answer:5,hint:'💡 20÷4=5'},
          {text:'16 תפוחים, שלושה רבעים נאכלו. כמה נאכלו?',answer:12,hint:'💡 רבע=4, ×3=12'},
          {text:'ריבוע שצלעו 3 ס"מ. כמה ריבועי ס"מ בשטחו?',answer:9,hint:'💡 3×3=9 ס"מ²'},
          {text:'מלבן 4 ס"מ × 2 ס"מ. כמה ריבועי ס"מ בשטחו?',answer:8,hint:'💡 4×2=8 ס"מ²'},
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
          {text:'כמה ס"מ יש ב-1 מטר?',answer:100,hint:'💡 מטר=100 ס"מ!'},
          {text:'כמה גרם יש ב-1 ק"ג?',answer:1000,hint:'💡 ק"ג=1000 גרם!'},
          {text:'כמה מ"ל יש ב-1 ליטר?',answer:1000,hint:'💡 ליטר=1000 מ"ל!'},
          {text:'כמה דקות יש בשעה?',answer:60,hint:'💡 שעה=60 דקות!'},
          {text:'כמה שניות יש בדקה?',answer:60,hint:'💡 דקה=60 שניות!'},
        ],
        medium:[
          {text:'כמה ס"מ ב-3 מטר?',answer:300,hint:'💡 3×100=300 ס"מ'},
          {text:'שקית קמח 2 ק"ג = כמה גרם?',answer:2000,hint:'💡 2×1000=2000 גרם'},
          {text:'500 מ"ל = כמה בקבוקים של 500? (ב-1 ליטר)',answer:2,hint:'💡 1000÷500=2'},
          {text:'כמה דקות ב-2 שעות?',answer:120,hint:'💡 2×60=120 דקות'},
          {text:'5 ס"מ = כמה מ"מ?',answer:50,hint:'💡 5×10=50 מ"מ'},
        ],
        hard:[
          {text:'ריצה 300 מ\' ועוד 450 מ\'. כמה בסך הכל?',answer:750,hint:'💡 300+450=750 מ\''},
          {text:'3 ספרים × 400 גרם = כמה גרם?',answer:1200,hint:'💡 3×400=1200 גרם'},
          {text:'2.5 ליטר = כמה מ"ל?',answer:2500,hint:'💡 2.5×1000=2500 מ"ל'},
          {text:'שעה ורבע = כמה דקות?',answer:75,hint:'💡 60+15=75 דקות'},
        ],
      };
      const q = pick(pools[diff]);
      return { type:'num',cat:'measurement',diff,label:theme.label,gameLabel:'',
        text:q.text,answer:q.answer,pts,hint:{type:'text',msg:q.hint},showMul:false,dir:'rtl' };
    },
    data(diff) {
      const pts = window.GRADE_CONFIG.pts[diff];
      const theme = pick(GAME_THEMES);
      const pools = {
        easy:[
          {text:'בגרף: שירה 8 מדבקות, דן 5. כמה בסך הכל?',answer:13,hint:'💡 8+5=13'},
          {text:'כמה ילדים הצביעו? כחול:6 אדום:4 ירוק:3',answer:13,hint:'💡 6+4+3=13'},
          {text:'מי אסף יותר: 7 כדורים או 9 כדורים? (כתוב כמות גדולה)',answer:9,hint:'💡 9>7!'},
          {text:'בגרף 3 עמודות: 4, 6, 2. מה הסכום?',answer:12,hint:'💡 4+6+2=12'},
        ],
        medium:[
          {text:'ממוצע של 2, 4, 6 הוא?',answer:4,hint:'💡 (2+4+6)÷3=12÷3=4'},
          {text:'שכיח של: 3, 5, 3, 7, 3 הוא?',answer:3,hint:'💡 3 מופיע הכי הרבה!'},
          {text:'בטבלה: ג\'לי=3, שוקולד=4, וופל=2. מה הכי אהוב? (ג\'לי=1 שוקו=2 וופל=3)',answer:2,hint:'💡 שוקולד=4, הכי הרבה!'},
          {text:'ציוני 4 ילדים: 7,8,9,8. מה הציון שהופיע הכי הרבה?',answer:8,hint:'💡 8 מופיע פעמיים!'},
        ],
        hard:[
          {text:'ממוצע של 5, 7, 9 הוא?',answer:7,hint:'💡 (5+7+9)÷3=21÷3=7'},
          {text:'בשני ימים ירד גשם 15 ו-25 מ"מ. כמה ירד בסך הכל?',answer:40,hint:'💡 15+25=40 מ"מ'},
          {text:'ממוצע של 10, 20, 30 הוא?',answer:20,hint:'💡 (10+20+30)÷3=60÷3=20'},
          {text:'חציון של: 1, 3, 5, 7, 9 הוא?',answer:5,hint:'💡 המספר האמצעי=5!'},
        ],
      };
      const q = pick(pools[diff]);
      return { type:'num',cat:'data',diff,label:theme.label,gameLabel:'',
        text:q.text,answer:q.answer,pts,hint:{type:'text',msg:q.hint},showMul:false,dir:'rtl' };
    },
  },
};
