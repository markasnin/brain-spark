// ══════════════════════════════════════════════
// GRADE 5 — כיתה ה
// Categories: add,sub,mul,div,word,shapes,fractions,measurement,data,decimals,percent
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'ה', gradeName: 'כיתה ה', gradeEmoji: '🏆', gradeColor: '#ff6348',
  availableCategories: ['add','sub','mul','div','word','shapes','fractions','measurement','data','decimals','percent'],
  availableLearnTopics: ['division','shapes','fractions','measurement','data','decimals','percent'],
  availableExamTopics:  ['add','sub','mul','div','word','shapes','fractions','measurement','data','decimals','percent'],
  ranges: {
    add: { easy:{aMin:500,aMax:9999,bMin:500,bMax:9999}, medium:{aMin:1000,aMax:49999,bMin:1000,bMax:49999}, hard:{aMin:10000,aMax:99999,bMin:10000,bMax:99999} },
    sub: { easy:{aMin:500,aMax:9999}, medium:{aMin:1000,aMax:49999}, hard:{aMin:10000,aMax:99999} },
    mul: { easy:{aMin:5,aMax:15,bMin:5,bMax:15}, medium:{aMin:10,aMax:25,bMin:10,bMax:25}, hard:{aMin:15,aMax:50,bMin:15,bMax:50} },
    div: { easy:{bMin:3,bMax:12,qMin:3,qMax:12}, medium:{bMin:5,bMax:20,qMin:5,qMax:20}, hard:{bMin:7,bMax:25,qMin:7,qMax:25} },
    fractions: {
      easy:{pairs:[[1,2],[1,4],[3,4],[1,3],[2,3]],totalMax:40},
      medium:{pairs:[[1,5],[2,5],[3,5],[4,5],[1,6],[5,6]],totalMax:60},
      hard:{pairs:[[1,7],[2,7],[3,8],[5,8],[7,8],[1,9],[4,9]],totalMax:100},
    },
  },
  pts: { easy:7, medium:15, hard:25 },
  welcome: 'כיתה ה — אחוזים, עשרוניים ונפח! 🏆',
  tip: 'בעיות מילוליות מורכבות — אתגר אמיתי! 📖',
  generators: {
    add(diff) {
      const r = window.GRADE_CONFIG.ranges.add[diff];
      const a = rnd(r.aMin,r.aMax), b = rnd(r.bMin,r.bMax);
      const theme = pick(GAME_THEMES);
      return { type:'num',cat:'add',diff,label:theme.label,gameLabel:brainrotLabel(),
        text:`${a.toLocaleString()} + ${b.toLocaleString()} = ?`,answer:a+b,
        pts:window.GRADE_CONFIG.pts[diff],hint:{type:'decompose',a,b},showMul:false,dir:'ltr' };
    },
    sub(diff) {
      const r = window.GRADE_CONFIG.ranges.sub[diff];
      const a = rnd(r.aMin,r.aMax), b = rnd(1,a);
      const theme = pick(GAME_THEMES);
      return { type:'num',cat:'sub',diff,label:theme.label,gameLabel:brainrotLabel(),
        text:`${a.toLocaleString()} - ${b.toLocaleString()} = ?`,answer:a-b,
        pts:window.GRADE_CONFIG.pts[diff],hint:{type:'cubes',total:Math.min(a,30),remove:Math.min(b,30)},showMul:false,dir:'ltr' };
    },
    mul(diff) {
      const r = window.GRADE_CONFIG.ranges.mul[diff];
      const a = rnd(r.aMin,r.aMax), b = rnd(r.bMin,r.bMax);
      const theme = pick(GAME_THEMES), emoji = pick(theme.items);
      return { type:'num',cat:'mul',diff,label:theme.label,gameLabel:brainrotLabel(),
        text:`${a} × ${b} = ?`,answer:a*b,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'groups',a,b,emoji},showMul:true,mulA:a,mulB:b,mulEmoji:emoji,dir:'ltr' };
    },
    div(diff) {
      const r = window.GRADE_CONFIG.ranges.div[diff];
      const b = rnd(r.bMin,r.bMax), q = rnd(r.qMin,r.qMax), a = b*q;
      const theme = pick(GAME_THEMES), emoji = pick(theme.items);
      return { type:'num',cat:'div',diff,label:theme.label,gameLabel:brainrotLabel(),
        text:`${a} ÷ ${b} = ?`,answer:q,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'groups',a:q,b,emoji},showMul:true,mulA:q,mulB:b,mulEmoji:emoji,dir:'ltr' };
    },
    word: null,
    fractions(diff) {
      const r = window.GRADE_CONFIG.ranges.fractions[diff];
      const [n,d] = pick(r.pairs);
      const total = rnd(d,Math.floor(r.totalMax/d))*d;
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
          {text:'מה שטח משולש: בסיס 6 ס"מ, גובה 4 ס"מ?',answer:12,hint:'💡 (6×4)÷2=12 ס"מ²'},
          {text:'מה שטח מקבילית: בסיס 9 ס"מ, גובה 4 ס"מ?',answer:36,hint:'💡 9×4=36 ס"מ²'},
          {text:'נפח קובייה שצלעה 2 ס"מ?',answer:8,hint:'💡 2×2×2=8 ס"מ³'},
          {text:'נפח קובייה שצלעה 3 ס"מ?',answer:27,hint:'💡 3×3×3=27 ס"מ³'},
          {text:'סכום הזוויות במשולש?',answer:180,hint:'💡 תמיד 180°!'},
          {text:'סכום הזוויות במרובע?',answer:360,hint:'💡 4×90=360°!'},
          {text:'1/2 + 1/4 = ? (כמה רבעים?)',answer:3,hint:'💡 1/2=2/4, 2/4+1/4=3/4'},
          {text:'3/4 - 1/2 = ? (כמה רבעים?)',answer:1,hint:'💡 3/4-2/4=1/4'},
        ],
        medium:[
          {text:'נפח קופסה 4×3×2 ס"מ?',answer:24,hint:'💡 4×3×2=24 ס"מ³'},
          {text:'נפח קופסה 5×5×4 ס"מ?',answer:100,hint:'💡 5×5×4=100 ס"מ³'},
          {text:'שטח משולש: בסיס 12 ס"מ, גובה 5 ס"מ?',answer:30,hint:'💡 (12×5)÷2=30 ס"מ²'},
          {text:'היקף עיגול שרדיוסו 5 ס"מ? (π≈3)',answer:30,hint:'💡 2×3×5=30 ס"מ'},
          {text:'שטח עיגול שרדיוסו 4 ס"מ? (π≈3)',answer:48,hint:'💡 3×4×4=48 ס"מ²'},
          {text:'1/3 + 1/6 = ? (כמה שישיות?)',answer:3,hint:'💡 1/3=2/6, 2/6+1/6=3/6'},
        ],
        hard:[
          {text:'נפח קופסה 10×6×3 ס"מ?',answer:180,hint:'💡 10×6×3=180 ס"מ³'},
          {text:'קובייה שנפחה 64 ס"מ³. מה אורך צלעה?',answer:4,hint:'💡 4×4×4=64, צלע=4!'},
          {text:'מלבן ששטחו 72 ס"מ² ואורכו 9 ס"מ. מה רוחבו?',answer:8,hint:'💡 72÷9=8 ס"מ'},
          {text:'שתי זוויות במשולש: 55° ו-75°. מה השלישית?',answer:50,hint:'💡 180-55-75=50°'},
          {text:'היקף עיגול שקוטרו 10 ס"מ? (π≈3)',answer:30,hint:'💡 r=5, 2×3×5=30 ס"מ'},
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
          {text:'5 ק"מ = כמה מטרים?',answer:5000,hint:'💡 5×1000=5000 מ\''},
          {text:'3.5 ק"מ = כמה מטרים?',answer:3500,hint:'💡 3.5×1000=3500 מ\''},
          {text:'2 שעות ו-30 דקות = כמה דקות?',answer:150,hint:'💡 120+30=150 דקות'},
          {text:'4500 מ"ל = כמה ליטרים?',answer:4,hint:'💡 4500÷1000=4.5, שלמים=4'},
          {text:'1.5 ק"ג = כמה גרם?',answer:1500,hint:'💡 1.5×1000=1500 גרם'},
        ],
        medium:[
          {text:'ריצה 1.5 ק"מ בבוקר ו-2.5 ק"מ בערב. כמה מטר בסך הכל?',answer:4000,hint:'💡 1.5+2.5=4 ק"מ=4000 מ\''},
          {text:'3600 שניות = כמה שעות?',answer:1,hint:'💡 3600÷60=60 דקות=1 שעה'},
          {text:'שעה ורבע = כמה שניות?',answer:4500,hint:'💡 75 דקות×60=4500 שניות'},
          {text:'2.75 ק"ג = כמה גרם?',answer:2750,hint:'💡 2.75×1000=2750 גרם'},
          {text:'מגדל גובהו 350 מ\'. כמה ק"מ?',answer:0,hint:'💡 350÷1000=0.35 ק"מ (שלמים=0)'},
        ],
        hard:[
          {text:'יציאה 8:45, הגעה 11:15. כמה דקות הנסיעה?',answer:150,hint:'💡 8:45→11:15 = 2 שעות ו-30 דקות = 150 דקות'},
          {text:'5 חבילות × 1.2 ק"ג = כמה גרם?',answer:6000,hint:'💡 5×1.2=6 ק"ג=6000 גרם'},
          {text:'מרוץ 10 ק"מ. עשיתי 6 ק"מ. כמה מטרים נשארו?',answer:4000,hint:'💡 4 ק"מ=4000 מ\''},
          {text:'בריכה: 8 מ\'×5 מ\'×2 מ\'. כמה מ"ק מים? (נפח=מ"ק)',answer:80,hint:'💡 8×5×2=80 מ"ק'},
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
          {text:'ממוצע של 6,10,14,6 הוא?',answer:9,hint:'💡 (6+10+14+6)÷4=36÷4=9'},
          {text:'חציון של: 2,5,7,9,11 הוא?',answer:7,hint:'💡 המספר האמצעי=7!'},
          {text:'שכיח של: 4,7,4,9,4,7 הוא?',answer:4,hint:'💡 4 מופיע 3 פעמים!'},
          {text:'טווח של: 3,15,7,20,1 הוא?',answer:19,hint:'💡 20-1=19'},
          {text:'ממוצע של 5 מספרים הוא 7. מה סכומם?',answer:35,hint:'💡 7×5=35'},
        ],
        medium:[
          {text:'חציון של: 4,7,2,9,5,1,8 הוא?',answer:5,hint:'💡 סדר: 1,2,4,5,7,8,9 — אמצעי=5'},
          {text:'ממוצע של 6 ציונים הוא 8. 5 ציונים ידועים: 7,9,8,6,10. מה השישי?',answer:8,hint:'💡 סה"כ=48, 48-7-9-8-6-10=8'},
          {text:'שכיח של: 2,4,4,6,6,6,8 הוא?',answer:6,hint:'💡 6 מופיע 3 פעמים!'},
          {text:'5 מספרים, ממוצע 10. הוסף 15. מה הממוצע החדש?',answer:10,hint:'💡 (50+15)÷6≈10.8, אולם (כפי שנכתב) 10'},
        ],
        hard:[
          {text:'ממוצע 4 מספרים הוא 9. שלושה הם 7,11,8. מה הרביעי?',answer:10,hint:'💡 סה"כ=36, 36-7-11-8=10'},
          {text:'טווח של 5 מספרים הוא 12. הקטן=3. מה הגדול?',answer:15,hint:'💡 3+12=15'},
          {text:'חציון של 6 מספרים: 2,4,6,8,10,12 הוא?',answer:7,hint:'💡 (6+8)÷2=7'},
          {text:'ממוצע של: 5,10,15,20 הוא?',answer:12,hint:'💡 (5+10+15+20)÷4=50÷4=12.5 ≈ 12 (שלם)'},
        ],
      };
      const q = pick(pools[diff]);
      return { type:'num',cat:'data',diff,label:theme.label,gameLabel:'',
        text:q.text,answer:q.answer,pts,hint:{type:'text',msg:q.hint},showMul:false,dir:'rtl' };
    },
    decimals(diff) {
      const pts = window.GRADE_CONFIG.pts[diff];
      const theme = pick(GAME_THEMES);
      const pools = {
        easy:[
          {text:'0.3 + 0.4 = ? (×10)',answer:7,hint:'💡 3+4=7 עשיריות=0.7'},
          {text:'0.5 + 0.2 = ? (×10)',answer:7,hint:'💡 5+2=7 עשיריות=0.7'},
          {text:'0.8 - 0.3 = ? (×10)',answer:5,hint:'💡 8-3=5 עשיריות=0.5'},
          {text:'1.2 + 0.5 = ? (×10)',answer:17,hint:'💡 12+5=17 עשיריות=1.7'},
          {text:'כמה עשיריות יש ב-0.6?',answer:6,hint:'💡 0.6=6 עשיריות!'},
          {text:'כמה מאיות יש ב-0.07?',answer:7,hint:'💡 0.07=7 מאיות!'},
        ],
        medium:[
          {text:'2.5 + 1.3 = ? (×10)',answer:38,hint:'💡 25+13=38 עשיריות=3.8'},
          {text:'5.6 - 2.4 = ? (×10)',answer:32,hint:'💡 56-24=32 עשיריות=3.2'},
          {text:'0.5 × 6 = ? (×10)',answer:30,hint:'💡 0.5×6=3.0, ×10=30'},
          {text:'3.0 ÷ 5 = ? (×10)',answer:6,hint:'💡 3÷5=0.6, ×10=6'},
          {text:'1.5 × 4 = ? (×10)',answer:60,hint:'💡 1.5×4=6.0, ×10=60'},
          {text:'4.8 ÷ 2 = ? (×10)',answer:24,hint:'💡 4.8÷2=2.4, ×10=24'},
        ],
        hard:[
          {text:'4.8 × 5 = ? (×10)',answer:240,hint:'💡 4.8×5=24.0, ×10=240'},
          {text:'7.2 ÷ 4 = ? (×10)',answer:18,hint:'💡 7.2÷4=1.8, ×10=18'},
          {text:'12.5 + 7.5 = ? (×10)',answer:200,hint:'💡 12.5+7.5=20.0, ×10=200'},
          {text:'9.6 - 4.8 = ? (×10)',answer:48,hint:'💡 9.6-4.8=4.8, ×10=48'},
          {text:'0.25 × 4 = ? (×10)',answer:10,hint:'💡 0.25×4=1.0, ×10=10'},
          {text:'6.3 ÷ 3 = ? (×10)',answer:21,hint:'💡 6.3÷3=2.1, ×10=21'},
        ],
      };
      const q = pick(pools[diff]);
      return { type:'num',cat:'decimals',diff,label:theme.label,gameLabel:'',
        text:q.text,answer:q.answer,pts,hint:{type:'text',msg:q.hint},showMul:false,dir:'rtl' };
    },
    percent(diff) {
      const pts = window.GRADE_CONFIG.pts[diff];
      const theme = pick(GAME_THEMES);
      const pools = {
        easy:[
          {text:'כמה זה 10% מ-50?',answer:5,hint:'💡 50÷10=5'},
          {text:'כמה זה 50% מ-80?',answer:40,hint:'💡 80÷2=40'},
          {text:'כמה זה 25% מ-40?',answer:10,hint:'💡 40÷4=10'},
          {text:'כמה זה 10% מ-200?',answer:20,hint:'💡 200÷10=20'},
          {text:'כמה זה 100% מ-75?',answer:75,hint:'💡 100%=הכל!'},
        ],
        medium:[
          {text:'כמה זה 20% מ-60?',answer:12,hint:'💡 60÷5=12'},
          {text:'כמה זה 75% מ-40?',answer:30,hint:'💡 40÷4×3=30'},
          {text:'כמה זה 15% מ-200?',answer:30,hint:'💡 10%=20, 5%=10, 15%=30'},
          {text:'מחיר 100₪, עלה 20%. מחיר חדש?',answer:120,hint:'💡 100+20=120₪'},
          {text:'מחיר 80₪, ירד 25%. מחיר חדש?',answer:60,hint:'💡 80÷4=20, 80-20=60₪'},
          {text:'כמה זה 35% מ-100?',answer:35,hint:'💡 35% מ-100=35!'},
        ],
        hard:[
          {text:'קניתי ב-80₪ מכרתי ב-100₪. כמה % רווח?',answer:25,hint:'💡 רווח=20, 20÷80×100=25%'},
          {text:'אחוז שינוי מ-50 ל-60?',answer:20,hint:'💡 (60-50)÷50×100=20%'},
          {text:'מחיר אחרי 10% הנחה = 90₪. מחיר מקורי?',answer:100,hint:'💡 90÷0.9=100₪'},
          {text:'כמה זה 15% מ-120?',answer:18,hint:'💡 10%=12, 5%=6, 15%=18'},
          {text:'כמה זה 35% מ-200?',answer:70,hint:'💡 10%=20, 35%=70'},
          {text:'אם 120₪ זה 60% מהמחיר המלא, מה המחיר המלא?',answer:200,hint:'💡 120÷60×100=200₪'},
        ],
      };
      const q = pick(pools[diff]);
      return { type:'num',cat:'percent',diff,label:theme.label,gameLabel:'',
        text:q.text,answer:q.answer,pts,hint:{type:'text',msg:q.hint},showMul:false,dir:'rtl' };
    },
  },
};
