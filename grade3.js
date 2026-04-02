// ══════════════════════════════════════════════
// GRADE 3 — כיתה ג
// Categories: add, sub, mul, div, word, shapes, measurement, data
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'ג', gradeName: 'כיתה ג', gradeEmoji: '⚡', gradeColor: '#1e90ff',
  availableCategories: ['add','sub','mul','div','word','shapes','measurement','data'],
  availableLearnTopics: ['division','shapes','measurement','data'],
  availableExamTopics:  ['add','sub','mul','div','word','shapes','measurement','data'],
  ranges: {
    add: { easy:{aMin:10,aMax:99,bMin:10,bMax:99}, medium:{aMin:100,aMax:500,bMin:100,bMax:500}, hard:{aMin:200,aMax:999,bMin:200,bMax:999} },
    sub: { easy:{aMin:10,aMax:99}, medium:{aMin:100,aMax:500}, hard:{aMin:200,aMax:999} },
    mul: { easy:{aMin:2,aMax:6,bMin:2,bMax:6}, medium:{aMin:3,aMax:9,bMin:3,bMax:9}, hard:{aMin:6,aMax:12,bMin:6,bMax:12} },
    div: { easy:{bMin:2,bMax:5,qMin:1,qMax:5}, medium:{bMin:2,bMax:9,qMin:2,qMax:9}, hard:{bMin:3,bMax:12,qMin:3,qMax:12} },
  },
  pts: { easy:5, medium:12, hard:20 },
  welcome: 'כיתה ג — חילוק, זוויות, נתונים ומדידה! ➗',
  tip: 'חילוק זה רק כפל הפוך! ➗',
  generators: {
    add: null, sub: null, mul: null,
    div(diff) {
      const r = window.GRADE_CONFIG.ranges.div[diff];
      const b = rnd(r.bMin,r.bMax), q = rnd(r.qMin,r.qMax), a = b*q;
      const theme = pick(GAME_THEMES), emoji = pick(theme.items);
      return { type:'num',cat:'div',diff,label:theme.label,gameLabel:brainrotLabel(),
        text:`${a} ÷ ${b} = ?`,answer:q,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'groups',a:q,b,emoji},showMul:true,mulA:q,mulB:b,mulEmoji:emoji,dir:'ltr' };
    },
    word: null,
    shapes(diff) {
      const pts = window.GRADE_CONFIG.pts[diff];
      const theme = pick(GAME_THEMES);
      const pools = {
        easy:[
          {text:'כמה מעלות יש בזווית ישרה?',answer:90,hint:'💡 זווית ישרה=90°!'},
          {text:'זווית גדולה מ-90° היא? (חדה=1 ישרה=2 קהה=3)',answer:3,hint:'💡 קהה=גדולה מ-90°!'},
          {text:'זווית קטנה מ-90° היא? (חדה=1 ישרה=2 קהה=3)',answer:1,hint:'💡 חדה=קטנה מ-90°!'},
          {text:'כמה זה שליש מ-12?',answer:4,hint:'💡 12÷3=4'},
          {text:'כמה זה שליש מ-9?',answer:3,hint:'💡 9÷3=3'},
          {text:'כמה זה רבע מ-16?',answer:4,hint:'💡 16÷4=4'},
          {text:'כמה זה חצי מ-50?',answer:25,hint:'💡 50÷2=25'},
          {text:'מה ההיקף של ריבוע שצלעו 6 ס"מ?',answer:24,hint:'💡 4×6=24 ס"מ'},
        ],
        medium:[
          {text:'מה שטח המלבן 7×4 ס"מ?',answer:28,hint:'💡 7×4=28 ס"מ²'},
          {text:'מה שטח הריבוע שצלעו 8 ס"מ?',answer:64,hint:'💡 8×8=64 ס"מ²'},
          {text:'מה שטח המלבן 10×5 ס"מ?',answer:50,hint:'💡 10×5=50 ס"מ²'},
          {text:'סכום הזוויות במשולש?',answer:180,hint:'💡 תמיד 180°!'},
          {text:'כמה זוויות ישרות יש במשולש ישר-זווית?',answer:1,hint:'💡 זווית אחת של 90°!'},
          {text:'בכיתה 30 ילדים. שליש הם בנות. כמה בנות?',answer:10,hint:'💡 30÷3=10'},
        ],
        hard:[
          {text:'מלבן שהיקפו 36 ס"מ ורוחבו 7 ס"מ. מה ארכו?',answer:11,hint:'💡 (36÷2)-7=18-7=11'},
          {text:'שתי זוויות במשולש: 60° ו-80°. מה השלישית?',answer:40,hint:'💡 180-60-80=40°'},
          {text:'סכום הזוויות במרובע?',answer:360,hint:'💡 4×90=360°!'},
          {text:'24 תפוחים. שלושה רבעים נאכלו. כמה נאכלו?',answer:18,hint:'💡 רבע=6, ×3=18'},
          {text:'כמה ריבועי ס"מ בשטח מלבן 12×9 ס"מ?',answer:108,hint:'💡 12×9=108 ס"מ²'},
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
          {text:'כמה מ"מ יש ב-1 ס"מ?',answer:10,hint:'💡 ס"מ=10 מ"מ!'},
          {text:'כמה מטרים ב-1 ק"מ?',answer:1000,hint:'💡 ק"מ=1000 מ\'!'},
          {text:'כמה ס"מ ב-2 מטר?',answer:200,hint:'💡 2×100=200 ס"מ'},
          {text:'כמה דקות ב-2 שעות?',answer:120,hint:'💡 2×60=120 דקות'},
          {text:'כמה שניות ב-3 דקות?',answer:180,hint:'💡 3×60=180 שניות'},
        ],
        medium:[
          {text:'2.5 ק"מ = כמה מטרים?',answer:2500,hint:'💡 2.5×1000=2500 מ\''},
          {text:'3 ק"ג = כמה גרם?',answer:3000,hint:'💡 3×1000=3000 גרם'},
          {text:'4 מטר = כמה מ"מ?',answer:4000,hint:'💡 4×100×10=4000 מ"מ'},
          {text:'שעה וחצי = כמה דקות?',answer:90,hint:'💡 60+30=90 דקות'},
          {text:'300 ס"מ = כמה מטרים?',answer:3,hint:'💡 300÷100=3 מ\''},
        ],
        hard:[
          {text:'3600 שניות = כמה שעות?',answer:1,hint:'💡 3600÷60=60 דקות=1 שעה'},
          {text:'2 שעות ו-45 דקות = כמה דקות?',answer:165,hint:'💡 120+45=165 דקות'},
          {text:'5500 מטר = כמה ק"מ וחצי? (ק"מ שלמים)',answer:5,hint:'💡 5500÷1000=5.5, שלמים=5'},
          {text:'ריצה 1.5 ק"מ בבוקר ו-2.5 ק"מ בערב. כמה בסך הכל?',answer:4,hint:'💡 1.5+2.5=4 ק"מ'},
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
          {text:'ממוצע של 2, 4, 6 הוא?',answer:4,hint:'💡 (2+4+6)÷3=4'},
          {text:'ממוצע של 10, 20, 30 הוא?',answer:20,hint:'💡 (10+20+30)÷3=20'},
          {text:'שכיח של: 3,5,3,7,3 הוא?',answer:3,hint:'💡 3 מופיע הכי הרבה!'},
          {text:'הצביעו: כחול=8, ירוק=5, אדום=7. כמה בסך הכל?',answer:20,hint:'💡 8+5+7=20'},
        ],
        medium:[
          {text:'ממוצע של 4,8,12,8 הוא?',answer:8,hint:'💡 (4+8+12+8)÷4=32÷4=8'},
          {text:'חציון של: 1,3,5,7,9 הוא?',answer:5,hint:'💡 המספר האמצעי=5!'},
          {text:'שכיח של: 4,7,4,9,4,7 הוא?',answer:4,hint:'💡 4 מופיע 3 פעמים!'},
          {text:'ממוצע שלושת ימי גשם: 12, 8, 16 מ"מ?',answer:12,hint:'💡 (12+8+16)÷3=36÷3=12'},
        ],
        hard:[
          {text:'ממוצע של 3,7,5,9 הוא?',answer:6,hint:'💡 (3+7+5+9)÷4=24÷4=6'},
          {text:'ממוצע 5 מספרים הוא 8. מה סכומם?',answer:40,hint:'💡 8×5=40'},
          {text:'4 ציונים: 7,9,?,8. ממוצע=8. ציון חסר?',answer:8,hint:'💡 סכום=32, 32-7-9-8=8'},
          {text:'טווח של: 3,15,7,20,1 הוא?',answer:19,hint:'💡 מקס-מין=20-1=19'},
        ],
      };
      const q = pick(pools[diff]);
      return { type:'num',cat:'data',diff,label:theme.label,gameLabel:'',
        text:q.text,answer:q.answer,pts,hint:{type:'text',msg:q.hint},showMul:false,dir:'rtl' };
    },
  },
};
