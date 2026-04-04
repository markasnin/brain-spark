// ══════════════════════════════════════════════
// GRADE 4 — כיתה ד  |  תוכנית משרד החינוך תשס"ו
// ────────────────────────────────────────────
// מספרים: ללא הגבלה, מבנה עשרוני, ישר מספרים, אינסופיות
// פעולות: 4 פעולות, כפל במאונך, חילוק ארוך, סדר פעולות+סוגריים, אומדן
// שברים: מגוון רחב, שתי משמעויות (חלק מהשלם + חלק מכמות)
//         שברים עשרוניים — היכרות ראשונה
//         ** אין אחוזים בכיתה ד! **
// גאומטריה (גופים — כיתה ד!): תיבות — קדקודים, צלעות, פאות, פריסות, אלכסונים
//                                ריבוע+מלבן — הגדרות ותכונות, אלכסון
//                                תכונות צלעות ופינות במשולש
//                                סימטריה (תיבה)
// מדידה: שטח ביחידות מקובלות, נוסחאות שטח+היקף מלבן, נפח תיבה, חישובי זמן
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'ד',
  gradeName: 'כיתה ד',
  gradeEmoji: '🔮',
  gradeColor: '#9b59b6',

  availableCategories: ['add','sub','mul','div','word','fractions','decimal_intro','perimeter','area','shapes3d','measurement','data'],
  availableLearnTopics: ['division','shapes','fractions','perimeter_learn','area_learn','shapes3d_learn','measurement_learn'],
  availableExamTopics:  ['add','sub','mul','div','word','fractions','decimal_intro','perimeter','area','shapes3d','measurement','data'],

  ranges: {
    add: {
      easy:   { aMin:100,  aMax:9999,  bMin:50,  bMax:9999  },
      medium: { aMin:1000, aMax:99999, bMin:500, bMax:99999 },
      hard:   { aMin:10000,aMax:999999,bMin:1000,bMax:999999},
    },
    sub: {
      easy:   { aMin:100,  aMax:9999   },
      medium: { aMin:1000, aMax:99999  },
      hard:   { aMin:10000,aMax:999999 },
    },
    mul: {
      // כפל במאונך: דו-ספרתי × חד-ספרתי, דו × דו
      easy:   { aMin:10, aMax:99, bMin:2,  bMax:9  },
      medium: { aMin:10, aMax:99, bMin:10, bMax:99 },
      hard:   { aMin:20, aMax:999,bMin:10, bMax:99 },
    },
    div: {
      // חילוק ארוך
      easy:   { bMin:2,  bMax:9,  qMin:2, qMax:20 },
      medium: { bMin:2,  bMax:9,  qMin:10,qMax:99 },
      hard:   { bMin:10, bMax:99, qMin:2, qMax:9  },
    },
    fractions: {
      // מגוון רחב — לא רק שברי יחידה
      easy:   { pairs:[[1,2],[1,4],[3,4],[2,3],[1,3]],       totalMax:40  },
      medium: { pairs:[[1,5],[2,5],[3,5],[4,5],[1,6],[5,6]], totalMax:60  },
      hard:   { pairs:[[3,8],[5,8],[2,7],[3,7],[4,9],[7,9]], totalMax:120 },
    },
  },

  pts: { easy:6, medium:13, hard:22 },
  welcome: 'כיתה ד — שברים, מבנה עשרוני, שטח וגופים! 🔮',
  tip: 'שבר = חלק מהשלם וגם חלק מכמות! 🍕',

  generators: {
    add(diff) {
      const r=window.GRADE_CONFIG.ranges.add[diff];
      const a=rnd(r.aMin,r.aMax), b=rnd(r.bMin,r.bMax);
      const th=pick(GAME_THEMES);
      return { type:'num',cat:'add',diff,label:th.label,gameLabel:brainrotLabel(),
        text:`${a.toLocaleString()} + ${b.toLocaleString()} = ?`,answer:a+b,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'decompose',a,b},showMul:false,dir:'ltr' };
    },
    sub(diff) {
      const r=window.GRADE_CONFIG.ranges.sub[diff];
      const total=rnd(r.aMin,r.aMax), b=rnd(1,Math.floor(total/2)), a=total-b;
      const th=pick(GAME_THEMES);
      return { type:'num',cat:'sub',diff,label:th.label,gameLabel:brainrotLabel(),
        text:`${total.toLocaleString()} - ${b.toLocaleString()} = ?`,answer:a,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${total.toLocaleString()} - ${b.toLocaleString()} = ${a.toLocaleString()}`},showMul:false,dir:'ltr' };
    },
    mul(diff) {
      const r=window.GRADE_CONFIG.ranges.mul[diff];
      const a=rnd(r.aMin,r.aMax), b=rnd(r.bMin,r.bMax);
      const th=pick(GAME_THEMES); const emoji=pick(th.items);
      return { type:'num',cat:'mul',diff,label:th.label,gameLabel:brainrotLabel(),
        text:`${a} × ${b} = ?`,answer:a*b,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'groups',a,b,emoji},showMul:true,mulA:a,mulB:b,mulEmoji:emoji,dir:'ltr' };
    },
    div(diff) {
      const r=window.GRADE_CONFIG.ranges.div[diff];
      const b=rnd(r.bMin,r.bMax), q=rnd(r.qMin,r.qMax), a=b*q;
      const th=pick(GAME_THEMES); const emoji=pick(th.items);
      return { type:'num',cat:'div',diff,label:th.label,gameLabel:brainrotLabel(),
        text:`${a.toLocaleString()} ÷ ${b} = ?`,answer:q,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'groups',a:q,b,emoji},showMul:true,mulA:q,mulB:b,mulEmoji:emoji,dir:'ltr' };
    },
    word: null,
    fractions(diff) {
      const r=window.GRADE_CONFIG.ranges.fractions[diff];
      const [n,d]=pick(r.pairs);
      const total=rnd(d,Math.floor(r.totalMax/d))*d;
      const part=(total/d)*n;
      const th=pick(GAME_THEMES);
      const stories=[
        `${n}/${d} מתוך ${total} = ?`,
        `מ-${total} תלמידים, ${n}/${d} בנות. כמה בנות?`,
        `${n}/${d} מ-${total} ק"מ עברנו. כמה ק"מ?`,
        `${total} ש"ח. ${n}/${d} מהם הוצאו. כמה הוצא?`,
      ];
      return { type:'num',cat:'fractions',diff,label:'½ שברים',gameLabel:'',
        text:pick(stories),answer:part,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${total}÷${d}=${total/d} לכל חלק. ×${n}=${part}`},showMul:false,dir:'rtl' };
    },
    decimal_intro(diff) {
      // שברים עשרוניים — היכרות ראשונה (כיתה ד)
      // עשיריות ומאיות — המרה משבר לעשרוני
      const qs={
        easy:[
          {text:'כתוב כמספר עשרוני: שלושה עשרוניות (0._ ?) — 3 עשיריות',answer:3,hint:'💡 3 עשיריות = 0.3 (כתוב 3)'},
          {text:'5 עשיריות = 0._  (כתוב הספרה)',answer:5,hint:'💡 5 עשיריות = 0.5'},
          {text:'0.7 = כמה עשיריות?',answer:7,hint:'💡 0.7 = 7 עשיריות'},
          {text:'½ = 0._ (כתוב הספרה)',answer:5,hint:'💡 1/2 = 0.5'},
        ],
        medium:[
          {text:'0.25 = כמה מאיות?',answer:25,hint:'💡 0.25 = 25 מאיות'},
          {text:'0.3 + 0.4 = 0.?',answer:7,hint:'💡 0.3+0.4=0.7 (כתוב 7)'},
          {text:'0.5 + 0.5 = ?',answer:1,hint:'💡 0.5+0.5=1'},
          {text:'¼ = 0.?5 (כתוב 25)',answer:25,hint:'💡 1/4 = 0.25'},
        ],
        hard:[
          {text:'1.5 - 0.7 = 0.?',answer:8,hint:'💡 1.5-0.7=0.8'},
          {text:'0.6 + 0.7 = 1.?',answer:3,hint:'💡 0.6+0.7=1.3'},
          {text:'מה גדול יותר: 0.8 או 0.75? (כתוב 1 ל-0.8, כתוב 2 ל-0.75)',answer:1,hint:'💡 0.80 > 0.75'},
        ],
      };
      const q=pick(qs[diff]||qs.easy);
      return { type:'num',cat:'decimal_intro',diff,label:'🔢 שברים עשרוניים',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:q.hint},showMul:false,dir:'rtl' };
    },
    perimeter(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('perimeter',diff);
      const w=rnd(3,diff==='hard'?20:12), h=rnd(2,w-1);
      return { type:'num',cat:'perimeter',diff,label:'📏 היקף',gameLabel:'',
        text:`היקף מלבן ${w}×${h} ס"מ = ?`,answer:2*(w+h),pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 2×(${w}+${h})=${2*(w+h)}`},showMul:false,dir:'rtl' };
    },
    area(diff) {
      // שטח ביחידות מקובלות + נוסחת שטח מלבן — כיתה ד
      if (window.genGeometryCategory) return window.genGeometryCategory('area',diff);
      const w=rnd(3,diff==='hard'?15:10), h=rnd(2,w);
      return { type:'num',cat:'area',diff,label:'📐 שטח',gameLabel:'',
        text:`שטח מלבן ${w}×${h} ס"מ = ?`,answer:w*h,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${w}×${h}=${w*h} ס"מ²`},showMul:false,dir:'rtl' };
    },
    shapes3d(diff) {
      // תיבות: קדקודים, צלעות, פאות — כיתה ד (גופים!)
      if (window.genGeometryCategory) return window.genGeometryCategory('shapes3d',diff);
      const qs=[
        {text:'כמה פאות (פנים) לתיבה (קוביה)?',answer:6,hint:'💡 תיבה = 6 פאות'},
        {text:'כמה קדקודים לתיבה?',answer:8,hint:'💡 תיבה = 8 קדקודים'},
        {text:'כמה צלעות לתיבה?',answer:12,hint:'💡 תיבה = 12 צלעות'},
        {text:'כמה פאות יש לפירמידה ריבועית?',answer:5,hint:'💡 4 פאות משולשות + 1 בסיס = 5 פאות'},
      ];
      const q=pick(qs);
      return { type:'num',cat:'shapes3d',diff,label:'🧊 גופים',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:q.hint},showMul:false,dir:'rtl' };
    },
    measurement(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('measurement',diff);
      const qs={
        easy:[
          {text:"1 מ' = כמה מ\"מ?",answer:1000,hint:"💡 1 מ' = 100 ס\"מ = 1000 מ\"מ"},
          {text:"נפח תיבה 3×4×2 ס\"מ = ?",answer:24,hint:"💡 3×4×2=24 ס\"מ³"},
          {text:"כמה שניות ב-1 דקה?",answer:60,hint:"💡 1 דקה = 60 שניות"},
        ],
        medium:[
          {text:"נפח תיבה 5×5×5 ס\"מ = ?",answer:125,hint:"💡 5×5×5=125 ס\"מ³"},
          {text:"שטח ריבוע עם צלע 8 ס\"מ = ?",answer:64,hint:"💡 8×8=64 ס\"מ²"},
          {text:"3 שעות = כמה שניות?",answer:10800,hint:"💡 3×60×60=10800 שניות"},
        ],
        hard:[
          {text:"נפח תיבה 12×8×5 ס\"מ = ?",answer:480,hint:"💡 12×8×5=480 ס\"מ³"},
          {text:"שטח מלבן 15×9 ס\"מ = ?",answer:135,hint:"💡 15×9=135 ס\"מ²"},
        ],
      };
      const q=pick(qs[diff]||qs.easy);
      return { type:'num',cat:'measurement',diff,label:'📏 מדידה',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:q.hint},showMul:false,dir:'rtl' };
    },
    data(diff) {
      const n=rnd(3,5);
      const vals=Array.from({length:n},()=>rnd(diff==='easy'?5:diff==='medium'?10:20,diff==='easy'?25:diff==='medium'?50:100));
      const sum=vals.reduce((a,b)=>a+b,0);
      const avg=Math.round(sum/n);
      const mx=Math.max(...vals), mn=Math.min(...vals);
      const type=diff==='easy'?'max':diff==='medium'?'avg':'range';
      const q=type==='max'
        ?{text:`הנתונים: ${vals.join(', ')}. מה הגדול ביותר?`,answer:mx,hint:`💡 הגדול: ${mx}`}
        :type==='avg'
        ?{text:`הנתונים: ${vals.join(', ')}. מה הממוצע? (עגל)`,answer:avg,hint:`💡 ${sum}÷${n}≈${avg}`}
        :{text:`הנתונים: ${vals.join(', ')}. מה הטווח (מקס פחות מינ)?`,answer:mx-mn,hint:`💡 ${mx}-${mn}=${mx-mn}`};
      return { type:'num',cat:'data',diff,label:'📊 נתונים',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:q.hint},showMul:false,dir:'rtl' };
    },
  },
};
