// ══════════════════════════════════════════════
// GRADE 4 — כיתה ד
// Categories: add,sub,mul,div,word,shapes,fractions,measurement,data
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'ד', gradeName: 'כיתה ד', gradeEmoji: '🔮', gradeColor: '#9b59b6',
  availableCategories: ['add','sub','mul','div','word','shapes','fractions','measurement','data'],
  availableLearnTopics: ['division','shapes','fractions','measurement','data'],
  availableExamTopics:  ['add','sub','mul','div','word','shapes','fractions','measurement','data'],
  ranges: {
    add: { easy:{aMin:100,aMax:999,bMin:100,bMax:999}, medium:{aMin:500,aMax:4999,bMin:500,bMax:4999}, hard:{aMin:1000,aMax:9999,bMin:1000,bMax:9999} },
    sub: { easy:{aMin:100,aMax:999}, medium:{aMin:500,aMax:4999}, hard:{aMin:1000,aMax:9999} },
    mul: { easy:{aMin:2,aMax:9,bMin:2,bMax:9}, medium:{aMin:5,aMax:12,bMin:5,bMax:12}, hard:{aMin:10,aMax:25,bMin:10,bMax:25} },
    div: { easy:{bMin:2,bMax:9,qMin:2,qMax:9}, medium:{bMin:3,bMax:12,qMin:3,qMax:12}, hard:{bMin:4,bMax:15,qMin:4,qMax:15} },
    fractions: {
      easy:{pairs:[[1,2],[1,4],[3,4]],totalMax:20},
      medium:{pairs:[[1,3],[2,3],[1,5],[2,5]],totalMax:40},
      hard:{pairs:[[3,5],[1,6],[5,6],[1,8],[3,8]],totalMax:80},
    },
  },
  pts: { easy:6, medium:13, hard:22 },
  welcome: 'כיתה ד — שברים, גיאומטריה, נתונים ומדידה! 🔮',
  tip: 'שברים פתוחים! נסה אותם 🍕',
  generators: {
    add: null, sub: null, mul: null, div: null, word: null,
    fractions(diff) {
      const r = window.GRADE_CONFIG.ranges.fractions[diff];
      const [n,d] = pick(r.pairs);
      const total = rnd(d, r.totalMax/d)*d;
      const part = (total/d)*n;
      const theme = pick(GAME_THEMES);
      return { type:'num',cat:'fractions',diff,label:theme.label,gameLabel:'',
        text:`כמה זה ${n}/${d} מתוך ${total}?`,answer:part,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${total}÷${d}=${total/d} לכל חלק. ×${n}=${part}`},showMul:false,dir:'rtl' };
    },
    shapes(diff) {
      const pts = window.GRADE_CONFIG.pts[diff];
      const theme = pick(GAME_THEMES);
      const pools = {
        easy:[
          {text:'מה שטח ריבוע שצלעו 9 ס"מ?',answer:81,hint:'💡 9×9=81 ס"מ²'},
          {text:'מה שטח מלבן 6×8 ס"מ?',answer:48,hint:'💡 6×8=48 ס"מ²'},
          {text:'מה ההיקף של מלבן 11×4 ס"מ?',answer:30,hint:'💡 (11+4)×2=30 ס"מ'},
          {text:'כמה מעלות בזווית ישרה?',answer:90,hint:'💡 זווית ישרה=90°!'},
          {text:'סכום הזוויות במשולש?',answer:180,hint:'💡 תמיד 180°!'},
          {text:'סכום הזוויות במרובע?',answer:360,hint:'💡 4×90=360°!'},
        ],
        medium:[
          {text:'שטח מקבילית: בסיס 8 ס"מ, גובה 5 ס"מ?',answer:40,hint:'💡 8×5=40 ס"מ²'},
          {text:'שטח משולש: בסיס 10 ס"מ, גובה 6 ס"מ?',answer:30,hint:'💡 (10×6)÷2=30 ס"מ²'},
          {text:'שטח משולש: בסיס 8 ס"מ, גובה 7 ס"מ?',answer:28,hint:'💡 (8×7)÷2=28 ס"מ²'},
          {text:'שתי זוויות במשולש: 70° ו-50°. מה השלישית?',answer:60,hint:'💡 180-70-50=60°'},
          {text:'3 זוויות במרובע: 90°,85°,100°. מה הרביעית?',answer:85,hint:'💡 360-90-85-100=85°'},
          {text:'כמה זוגות קווים מקבילים יש במלבן?',answer:2,hint:'💡 שני זוגות!'},
        ],
        hard:[
          {text:'שטח משולש: בסיס 14 ס"מ, גובה 9 ס"מ?',answer:63,hint:'💡 (14×9)÷2=63 ס"מ²'},
          {text:'ריבוע שהיקפו 40 ס"מ. מה שטחו?',answer:100,hint:'💡 צלע=10, שטח=10×10=100'},
          {text:'מלבן ששטחו 60 ס"מ², רוחב 6 ס"מ. מה ארכו?',answer:10,hint:'💡 60÷6=10 ס"מ'},
          {text:'שבר שווה ל-½: 2/? הוא?',answer:4,hint:'💡 2/4=½!'},
          {text:'שבר שווה ל-⅓: 2/? הוא?',answer:6,hint:'💡 2/6=⅓!'},
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
          {text:'כמה ס"מ ב-3 מטר?',answer:300,hint:'💡 3×100=300 ס"מ'},
          {text:'כמה גרם ב-2.5 ק"ג?',answer:2500,hint:'💡 2.5×1000=2500 גרם'},
          {text:'כמה דקות ב-3 שעות?',answer:180,hint:'💡 3×60=180 דקות'},
          {text:'כמה שניות ב-5 דקות?',answer:300,hint:'💡 5×60=300 שניות'},
          {text:'1 ליטר ו-500 מ"ל = כמה מ"ל?',answer:1500,hint:'💡 1000+500=1500 מ"ל'},
        ],
        medium:[
          {text:'5 ק"מ = כמה מטרים?',answer:5000,hint:'💡 5×1000=5000 מ\''},
          {text:'3600 שניות = כמה שעות?',answer:1,hint:'💡 3600÷60=60 דקות=1 שעה'},
          {text:'2.5 ק"מ = כמה מטרים?',answer:2500,hint:'💡 2.5×1000=2500 מ\''},
          {text:'שעתיים ו-20 דקות = כמה דקות?',answer:140,hint:'💡 120+20=140 דקות'},
          {text:'4000 גרם = כמה ק"ג?',answer:4,hint:'💡 4000÷1000=4 ק"ג'},
        ],
        hard:[
          {text:'6000 מ"ל = כמה ליטרים?',answer:6,hint:'💡 6000÷1000=6 ליטר'},
          {text:'מרחק 2.5 ק"מ = כמה מטרים?',answer:2500,hint:'💡 2.5×1000=2500 מ\''},
          {text:'יום = כמה שניות?',answer:86400,hint:'💡 24×60×60=86400 שניות'},
          {text:'1.75 ק"ג = כמה גרם?',answer:1750,hint:'💡 1.75×1000=1750 גרם'},
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
          {text:'ממוצע של 4,8,12,8 הוא?',answer:8,hint:'💡 (4+8+12+8)÷4=32÷4=8'},
          {text:'ממוצע של 10,20,30 הוא?',answer:20,hint:'💡 (10+20+30)÷3=20'},
          {text:'שכיח של: 3,7,3,5,3,7 הוא?',answer:3,hint:'💡 3 מופיע 3 פעמים!'},
          {text:'חציון של: 1,3,5,7,9 הוא?',answer:5,hint:'💡 המספר האמצעי=5!'},
        ],
        medium:[
          {text:'ממוצע של 5 מספרים הוא 8. מה סכומם?',answer:40,hint:'💡 8×5=40'},
          {text:'4 ציונים: 7,9,?,8. ממוצע=8. ציון חסר?',answer:8,hint:'💡 32-7-9-8=8'},
          {text:'שכיח של: 2,4,4,6,6,6,8 הוא?',answer:6,hint:'💡 6 מופיע 3 פעמים!'},
          {text:'טווח של: 3,15,7,20,1 הוא?',answer:19,hint:'💡 20-1=19'},
        ],
        hard:[
          {text:'חציון של: 4,7,2,9,5,1,8 הוא?',answer:5,hint:'💡 סדר: 1,2,4,5,7,8,9 — אמצעי=5'},
          {text:'ממוצע 4 מספרים הוא 7. אחד הוא 11. ממוצע השאר?',answer:6,hint:'💡 סה"כ=28, 28-11=17, 17÷3≈5.7, נסה שוב'},
          {text:'5 מספרים, ממוצע 6, סכום השניים הראשונים=8. ממוצע השלושה הנותרים?',answer:7,hint:'💡 סה"כ=30, 30-8=22, 22÷3≈7'},
          {text:'שלושה ממוצעים: 5,10,15. הממוצע של הממוצעים?',answer:10,hint:'💡 (5+10+15)÷3=10'},
        ],
      };
      const q = pick(pools[diff]);
      return { type:'num',cat:'data',diff,label:theme.label,gameLabel:'',
        text:q.text,answer:q.answer,pts,hint:{type:'text',msg:q.hint},showMul:false,dir:'rtl' };
    },
  },
};
