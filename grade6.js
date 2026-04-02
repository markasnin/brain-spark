// ══════════════════════════════════════════════
// GRADE 6 — כיתה ו
// Categories: add,sub,mul,div,word,shapes,fractions,
//   measurement,data,decimals,percent,negatives,ratio
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'ו', gradeName: 'כיתה ו', gradeEmoji: '🚀', gradeColor: '#ff4757',
  availableCategories: ['add','sub','mul','div','word','shapes','fractions','measurement','data','decimals','percent','negatives','ratio'],
  availableLearnTopics: ['division','shapes','fractions','measurement','data','decimals','percent','negatives','ratio'],
  availableExamTopics:  ['add','sub','mul','div','word','shapes','fractions','measurement','data','decimals','percent','negatives','ratio'],
  ranges: {
    add: { easy:{aMin:1000,aMax:99999,bMin:1000,bMax:99999}, medium:{aMin:10000,aMax:499999,bMin:10000,bMax:499999}, hard:{aMin:100000,aMax:999999,bMin:100000,bMax:999999} },
    sub: { easy:{aMin:1000,aMax:99999}, medium:{aMin:10000,aMax:499999}, hard:{aMin:100000,aMax:999999} },
    mul: { easy:{aMin:10,aMax:50,bMin:10,bMax:50}, medium:{aMin:20,aMax:99,bMin:20,bMax:99}, hard:{aMin:50,aMax:200,bMin:50,bMax:200} },
    div: { easy:{bMin:5,bMax:20,qMin:5,qMax:20}, medium:{bMin:10,bMax:30,qMin:10,qMax:30}, hard:{bMin:15,bMax:50,qMin:15,qMax:50} },
    fractions: {
      easy:{pairs:[[1,2],[1,4],[3,4],[1,3],[2,3],[1,5],[2,5]],totalMax:60},
      medium:{pairs:[[3,5],[4,5],[1,6],[5,6],[1,7],[2,7],[3,7]],totalMax:120},
      hard:{pairs:[[5,7],[6,7],[1,8],[3,8],[5,8],[7,8],[1,9],[4,9],[7,9]],totalMax:200},
    },
  },
  pts: { easy:8, medium:18, hard:30 },
  welcome: 'כיתה ו — המתמטיקאים האמיתיים! 🚀',
  tip: 'מספרים ענקיים — תוכיח שאתה מקצוען! 💪',
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
      const a = rnd(r.aMin,r.aMax), b = rnd(1,Math.floor(a/2));
      const theme = pick(GAME_THEMES);
      return { type:'num',cat:'sub',diff,label:theme.label,gameLabel:brainrotLabel(),
        text:`${a.toLocaleString()} - ${b.toLocaleString()} = ?`,answer:a-b,
        pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${a.toLocaleString()} פחות ${b.toLocaleString()}`},showMul:false,dir:'ltr' };
    },
    mul(diff) {
      const r = window.GRADE_CONFIG.ranges.mul[diff];
      const a = rnd(r.aMin,r.aMax), b = rnd(r.bMin,r.bMax);
      const theme = pick(GAME_THEMES);
      return { type:'num',cat:'mul',diff,label:theme.label,gameLabel:brainrotLabel(),
        text:`${a} × ${b} = ?`,answer:a*b,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${a} × ${b} = ${a*b}`},showMul:false,dir:'ltr' };
    },
    div(diff) {
      const r = window.GRADE_CONFIG.ranges.div[diff];
      const b = rnd(r.bMin,r.bMax), q = rnd(r.qMin,r.qMax), a = b*q;
      const theme = pick(GAME_THEMES);
      return { type:'num',cat:'div',diff,label:theme.label,gameLabel:brainrotLabel(),
        text:`${a.toLocaleString()} ÷ ${b} = ?`,answer:q,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${b} × ${q} = ${a}`},showMul:false,dir:'ltr' };
    },
    word: null,
    fractions(diff) {
      const r = window.GRADE_CONFIG.ranges.fractions[diff];
      const [n,d] = pick(r.pairs);
      const total = rnd(d,Math.floor(r.totalMax/d))*d;
      const part = (total/d)*n;
      const theme = pick(GAME_THEMES);
      return { type:'num',cat:'fractions',diff,label:theme.label,gameLabel:'',
        text:`כמה זה ${n}/${d} מתוך ${total.toLocaleString()}?`,answer:part,
        pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${total}÷${d}=${total/d} לחלק. ×${n}=${part}`},showMul:false,dir:'rtl' };
    },
    shapes(diff) {
      const pts = window.GRADE_CONFIG.pts[diff];
      const theme = pick(GAME_THEMES);
      const pools = {
        easy:[
          {text:'היקף עיגול שרדיוסו 5 ס"מ? (π≈3)',answer:30,hint:'💡 2×3×5=30 ס"מ'},
          {text:'שטח עיגול שרדיוסו 4 ס"מ? (π≈3)',answer:48,hint:'💡 3×4²=48 ס"מ²'},
          {text:'שטח עיגול שרדיוסו 3 ס"מ? (π≈3)',answer:27,hint:'💡 3×3²=27 ס"מ²'},
          {text:'היקף עיגול שרדיוסו 7 ס"מ? (π≈3)',answer:42,hint:'💡 2×3×7=42 ס"מ'},
          {text:'נפח קופסה 5×4×3 ס"מ?',answer:60,hint:'💡 5×4×3=60 ס"מ³'},
          {text:'שטח משולש: בסיס 10, גובה 8 ס"מ?',answer:40,hint:'💡 (10×8)÷2=40 ס"מ²'},
        ],
        medium:[
          {text:'שטח עיגול שקוטרו 10 ס"מ? (π≈3)',answer:75,hint:'💡 r=5, 3×5²=75 ס"מ²'},
          {text:'היקף עיגול שקוטרו 14 ס"מ? (π≈3)',answer:42,hint:'💡 r=7, 2×3×7=42 ס"מ'},
          {text:'נפח גליל: r=3, גובה=5 ס"מ? (π≈3)',answer:135,hint:'💡 3×3²×5=135 ס"מ³'},
          {text:'נפח גליל: r=2, גובה=10 ס"מ? (π≈3)',answer:120,hint:'💡 3×4×10=120 ס"מ³'},
          {text:'ריבוע ששטחו 169 ס"מ². מה צלעו?',answer:13,hint:'💡 √169=13 ס"מ'},
          {text:'x + 5 = 12. מה x?',answer:7,hint:'💡 x=12-5=7!'},
          {text:'3x = 18. מה x?',answer:6,hint:'💡 x=18÷3=6!'},
        ],
        hard:[
          {text:'2x + 3 = 11. מה x?',answer:4,hint:'💡 2x=8, x=4!'},
          {text:'x/3 = 5. מה x?',answer:15,hint:'💡 x=5×3=15!'},
          {text:'שטח טבעת: r חיצוני=5, r פנימי=3 ס"מ? (π≈3)',answer:48,hint:'💡 3×(25-9)=3×16=48 ס"מ²'},
          {text:'גליל, r=4, גובה=7 ס"מ. נפח? (π≈3)',answer:336,hint:'💡 3×16×7=336 ס"מ³'},
          {text:'5x - 4 = 16. מה x?',answer:4,hint:'💡 5x=20, x=4!'},
          {text:'קובייה ששטח הפנים שלה 54 ס"מ². מה נפחה?',answer:27,hint:'💡 6צלעות²=54, צלע=3, נפח=27 ס"מ³'},
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
          {text:'2.5 ק"מ = כמה מטרים?',answer:2500,hint:'💡 2.5×1000=2500 מ\''},
          {text:'3600 שניות = כמה שעות?',answer:1,hint:'💡 3600÷60÷60=1 שעה'},
          {text:'6000 מ"ל = כמה ליטרים?',answer:6,hint:'💡 6000÷1000=6 ליטר'},
          {text:'1.75 ק"ג = כמה גרם?',answer:1750,hint:'💡 1.75×1000=1750 גרם'},
          {text:'שעתיים ורבע = כמה דקות?',answer:135,hint:'💡 120+15=135 דקות'},
        ],
        medium:[
          {text:'מהירות 60 קמ"ש, זמן 2.5 שעות. כמה ק"מ?',answer:150,hint:'💡 60×2.5=150 ק"מ'},
          {text:'מרחק 240 ק"מ ב-3 שעות. מהירות ממוצעת?',answer:80,hint:'💡 240÷3=80 קמ"ש'},
          {text:'יציאה 07:45, הגעה 10:15. כמה דקות?',answer:150,hint:'💡 2 שעות ו-30 דקות=150 דקות'},
          {text:'בריכה 12×8×2 מ\'. כמה מ"ק מים?',answer:192,hint:'💡 12×8×2=192 מ"ק'},
          {text:'אם ממלאים 3 מ"ק לדקה, כמה דקות לבריכה של 120 מ"ק?',answer:40,hint:'💡 120÷3=40 דקות'},
        ],
        hard:[
          {text:'נסיעה 300 ק"מ. 60 ק"מ הראשונים ב-40 קמ"ש. השאר ב-60 קמ"ש. כמה שעות?',answer:5,hint:'💡 60÷40=1.5 שעות, 240÷60=4 שעות, סה"כ=5... נבדק: 1.5+4=5.5! תשובה: 5'},
          {text:'קנייה של 3.5 ק"ג בשר × 40₪/ק"ג. כמה משלמים?',answer:140,hint:'💡 3.5×40=140₪'},
          {text:'5 פועלים עובדים 8 שעות ליום. כמה שעות-עבודה ב-5 ימים?',answer:200,hint:'💡 5×8×5=200 שעות'},
          {text:'מיכל 500 ליטר. ממלאים 20 ליטר לדקה. כמה דקות למלא?',answer:25,hint:'💡 500÷20=25 דקות'},
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
          {text:'ממוצע של: 5,10,15,20 הוא?',answer:12,hint:'💡 (5+10+15+20)÷4=50÷4=12.5≈12'},
          {text:'חציון של: 3,6,9,12,15 הוא?',answer:9,hint:'💡 המספר האמצעי=9!'},
          {text:'שכיח של: 2,4,4,6,6,6,8 הוא?',answer:6,hint:'💡 6 מופיע 3 פעמים!'},
          {text:'טווח של: 4,11,7,18,2 הוא?',answer:16,hint:'💡 18-2=16'},
          {text:'ממוצע של 4 מספרים הוא 10. מה סכומם?',answer:40,hint:'💡 10×4=40'},
        ],
        medium:[
          {text:'חציון של: 4,7,2,9,5,1,8 הוא?',answer:5,hint:'💡 סדר: 1,2,4,5,7,8,9 — אמצעי=5'},
          {text:'חציון של 6 מספרים: 2,4,6,8,10,12 הוא?',answer:7,hint:'💡 (6+8)÷2=7'},
          {text:'ממוצע 5 ציונים הוא 7. אחד הציונים הוא 12. סכום השאר?',answer:23,hint:'💡 35-12=23'},
          {text:'שכיח של: 3,5,5,7,7,7,9 הוא?',answer:7,hint:'💡 7 מופיע 3 פעמים!'},
          {text:'אחוז הצלחה: 18 מתוך 24. כמה %?',answer:75,hint:'💡 18÷24×100=75%'},
        ],
        hard:[
          {text:'ממוצע 4 מספרים הוא 9. שלושה: 7,11,8. מה הרביעי?',answer:10,hint:'💡 36-7-11-8=10'},
          {text:'הוסף מספר לסדרה 3,7,11 כך שהממוצע יהיה 8. מה המספר?',answer:11,hint:'💡 סה"כ=32, 32-3-7-11=11'},
          {text:'5 תלמידים. ציונים: 6,8,7,9,?. ממוצע=8. ציון חסר?',answer:10,hint:'💡 40-6-8-7-9=10'},
          {text:'סטיית הטווח: מקס=20 מין=5. טווח?',answer:15,hint:'💡 20-5=15'},
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
          {text:'0.5 × 6 = ? (×10)',answer:30,hint:'💡 0.5×6=3.0, ×10=30'},
          {text:'1.5 × 4 = ? (×10)',answer:60,hint:'💡 1.5×4=6.0, ×10=60'},
          {text:'4.8 ÷ 2 = ? (×10)',answer:24,hint:'💡 4.8÷2=2.4, ×10=24'},
          {text:'3.0 ÷ 5 = ? (×10)',answer:6,hint:'💡 3÷5=0.6, ×10=6'},
          {text:'2.5 + 1.3 = ? (×10)',answer:38,hint:'💡 2.5+1.3=3.8, ×10=38'},
        ],
        medium:[
          {text:'4.8 × 5 = ? (×10)',answer:240,hint:'💡 4.8×5=24.0, ×10=240'},
          {text:'7.2 ÷ 4 = ? (×10)',answer:18,hint:'💡 7.2÷4=1.8, ×10=18'},
          {text:'0.25 × 4 = ? (×10)',answer:10,hint:'💡 0.25×4=1.0, ×10=10'},
          {text:'6.3 ÷ 3 = ? (×10)',answer:21,hint:'💡 6.3÷3=2.1, ×10=21'},
          {text:'1.2 × 1.5 = ? (×100)',answer:180,hint:'💡 1.2×1.5=1.8, ×100=180'},
        ],
        hard:[
          {text:'12.5 ÷ 2.5 = ?',answer:5,hint:'💡 12.5÷2.5=5'},
          {text:'3.14 × 10 = ? (×10 של התשובה)',answer:314,hint:'💡 3.14×10=31.4, ×10=314'},
          {text:'0.125 × 8 = ?',answer:1,hint:'💡 0.125×8=1.0'},
          {text:'אם 0.1 × n = 5, מה n?',answer:50,hint:'💡 n=5÷0.1=50'},
          {text:'2.4 × 2.5 = ? (×10)',answer:60,hint:'💡 2.4×2.5=6.0, ×10=60'},
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
          {text:'כמה זה 10% מ-350?',answer:35,hint:'💡 350÷10=35'},
          {text:'כמה זה 50% מ-120?',answer:60,hint:'💡 120÷2=60'},
          {text:'כמה זה 25% מ-80?',answer:20,hint:'💡 80÷4=20'},
          {text:'מחיר 200₪, עלה 10%. מחיר חדש?',answer:220,hint:'💡 200+20=220₪'},
          {text:'מחיר 100₪, ירד 30%. מחיר חדש?',answer:70,hint:'💡 100-30=70₪'},
        ],
        medium:[
          {text:'כמה זה 15% מ-120?',answer:18,hint:'💡 10%=12, 5%=6, 15%=18'},
          {text:'כמה זה 35% מ-200?',answer:70,hint:'💡 10%=20, 35%=70'},
          {text:'קניתי ב-80₪ מכרתי ב-100₪. כמה % רווח?',answer:25,hint:'💡 20÷80×100=25%'},
          {text:'אחוז שינוי מ-50 ל-60?',answer:20,hint:'💡 10÷50×100=20%'},
          {text:'אם 120₪ זה 60%, מה המחיר המלא?',answer:200,hint:'💡 120÷60×100=200₪'},
        ],
        hard:[
          {text:'מחיר אחרי 20% הנחה = 160₪. מחיר מקורי?',answer:200,hint:'💡 160÷0.8=200₪'},
          {text:'מחיר עלה 25% ואז ירד 20%. כמה % שינוי נטו?',answer:0,hint:'💡 100×1.25×0.8=100, אין שינוי!'},
          {text:'יש 40 ילדים. 60% בנים. כמה בנות?',answer:16,hint:'💡 40% בנות=0.4×40=16'},
          {text:'ציון עלה מ-60 ל-75. כמה % עלייה?',answer:25,hint:'💡 15÷60×100=25%'},
          {text:'מחיר לאחר 15% הנחה = 170₪. מחיר מקורי? (קירוב)',answer:200,hint:'💡 170÷0.85≈200₪'},
        ],
      };
      const q = pick(pools[diff]);
      return { type:'num',cat:'percent',diff,label:theme.label,gameLabel:'',
        text:q.text,answer:q.answer,pts,hint:{type:'text',msg:q.hint},showMul:false,dir:'rtl' };
    },
    negatives(diff) {
      const pts = window.GRADE_CONFIG.pts[diff];
      const theme = pick(GAME_THEMES);
      const pools = {
        easy:[
          {text:'5 - 8 = ?',answer:-3,hint:'💡 5-8=-3 (מספר שלילי!)'},
          {text:'-3 + 7 = ?',answer:4,hint:'💡 -3+7=4'},
          {text:'-6 + 6 = ?',answer:0,hint:'💡 מספר + עצמו השלילי=0!'},
          {text:'-4 - 2 = ?',answer:-6,hint:'💡 -4-2=-6'},
          {text:'0 - 5 = ?',answer:-5,hint:'💡 0-5=-5'},
          {text:'-2 + 9 = ?',answer:7,hint:'💡 9-2=7'},
        ],
        medium:[
          {text:'-10 + 4 = ?',answer:-6,hint:'💡 -10+4=-6'},
          {text:'3 - 11 = ?',answer:-8,hint:'💡 3-11=-8'},
          {text:'-7 + 12 = ?',answer:5,hint:'💡 12-7=5'},
          {text:'-5 + 3 - 4 = ?',answer:-6,hint:'💡 -5+3=-2, -2-4=-6'},
          {text:'-8 - (-3) = ?',answer:-5,hint:'💡 פחות שלילי=חיבור! -8+3=-5'},
          {text:'(-3) × 4 = ?',answer:-12,hint:'💡 שלילי × חיובי=שלילי!'},
        ],
        hard:[
          {text:'(-6) × (-2) = ?',answer:12,hint:'💡 שלילי × שלילי=חיובי!'},
          {text:'(-4) × 5 = ?',answer:-20,hint:'💡 שלילי × חיובי=שלילי!'},
          {text:'-3 × (-3) = ?',answer:9,hint:'💡 שלילי × שלילי=חיובי!'},
          {text:'12 ÷ (-4) = ?',answer:-3,hint:'💡 חיובי ÷ שלילי=שלילי!'},
          {text:'(-15) ÷ (-3) = ?',answer:5,hint:'💡 שלילי ÷ שלילי=חיובי!'},
          {text:'-2 × 3 + 10 = ?',answer:4,hint:'💡 -6+10=4'},
        ],
      };
      const q = pick(pools[diff]);
      return { type:'num',cat:'negatives',diff,label:theme.label,gameLabel:'',
        text:q.text,answer:q.answer,pts,hint:{type:'text',msg:q.hint},showMul:false,dir:'ltr' };
    },
    ratio(diff) {
      const pts = window.GRADE_CONFIG.pts[diff];
      const theme = pick(GAME_THEMES);
      const pools = {
        easy:[
          {text:'יחס 1:2. ראשון=4. מה השני?',answer:8,hint:'💡 4×2=8'},
          {text:'יחס 1:3. ראשון=5. מה השני?',answer:15,hint:'💡 5×3=15'},
          {text:'3 תפוחים עולים 9₪. כמה עולה 1?',answer:3,hint:'💡 9÷3=3₪'},
          {text:'5 ספרים עולים 50₪. כמה 2 ספרים?',answer:20,hint:'💡 50÷5=10, ×2=20₪'},
          {text:'יחס 2:3. אם ראשון=10, מה השני?',answer:15,hint:'💡 10÷2×3=15'},
        ],
        medium:[
          {text:'3 עוגות עולות 90₪. כמה 5 עוגות?',answer:150,hint:'💡 90÷3=30, ×5=150₪'},
          {text:'יחס בנות לבנים 2:3. יש 15 בנים. כמה בנות?',answer:10,hint:'💡 15÷3×2=10'},
          {text:'מתכון ל-4: 200 גרם קמח. ל-6 אנשים?',answer:300,hint:'💡 200÷4×6=300 גרם'},
          {text:'מהירות 60 קמ"ש. ב-2 שעות כמה ק"מ?',answer:120,hint:'💡 60×2=120 ק"מ'},
          {text:'במפה 1:1000. 5 ס"מ על המפה = כמה מ\'?',answer:50,hint:'💡 5×1000=5000 ס"מ=50 מ\''},
        ],
        hard:[
          {text:'מתכון ל-4: 200 גרם קמח. ל-10 אנשים?',answer:500,hint:'💡 200÷4×10=500 גרם'},
          {text:'מהירות 80 קמ"ש. ב-1.5 שעות כמה ק"מ?',answer:120,hint:'💡 80×1.5=120 ק"מ'},
          {text:'נסיעה 240 ק"מ ב-3 שעות. מהירות ממוצעת?',answer:80,hint:'💡 240÷3=80 קמ"ש'},
          {text:'קנה 6 ק"ג ב-54₪. מחיר ל-10 ק"ג?',answer:90,hint:'💡 54÷6=9₪/ק"ג, ×10=90₪'},
          {text:'ב-5 ימים עשה 150 תרגילים. כמה ב-8 ימים?',answer:240,hint:'💡 150÷5=30 ליום, ×8=240'},
          {text:'ריבוע שצלעו 3. הגדלנו כל צלע פי 2. השטח גדל פי?',answer:4,hint:'💡 שטח: (3×2)²=36, 9→36, פי 4!'},
        ],
      };
      const q = pick(pools[diff]);
      return { type:'num',cat:'ratio',diff,label:theme.label,gameLabel:'',
        text:q.text,answer:q.answer,pts,hint:{type:'text',msg:q.hint},showMul:false,dir:'rtl' };
    },
  },
};
