// ══════════════════════════════════════════════
// GRADE 4 — כיתה ד
// חיבור, חיסור, כפל, חילוק, שברים, גיאומטריה, אחוזים (מבוא),
// כסף, נתונים, מדידה, זמן
// מספרים: עד 10,000
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'ד',
  gradeName: 'כיתה ד',
  gradeEmoji: '🔮',
  gradeColor: '#9b59b6',

  availableCategories: ['add','sub','mul','div','word','fractions','perimeter','area','angles','shapes3d','patterns1','time','money','data','measurement'],
  availableLearnTopics: ['division','shapes','fractions','perimeter_learn','area_learn','angles_learn','shapes3d_learn','measurement_learn'],
  availableExamTopics:  ['add','sub','mul','div','word','fractions','perimeter','area','angles','shapes3d','time','money','measurement'],

  ranges: {
    add: { easy:{aMin:100,aMax:999,bMin:50,bMax:999}, medium:{aMin:500,aMax:4999,bMin:200,bMax:4999}, hard:{aMin:1000,aMax:9999,bMin:500,bMax:9999} },
    sub: { easy:{aMin:100,aMax:999}, medium:{aMin:500,aMax:4999}, hard:{aMin:1000,aMax:9999} },
    mul: { easy:{aMin:2,aMax:9,bMin:2,bMax:9}, medium:{aMin:5,aMax:12,bMin:5,bMax:12}, hard:{aMin:10,aMax:25,bMin:10,bMax:25} },
    div: { easy:{bMin:2,bMax:9,qMin:2,qMax:9}, medium:{bMin:3,bMax:12,qMin:3,qMax:12}, hard:{bMin:4,bMax:15,qMin:4,qMax:15} },
    fractions: { easy:{pairs:[[1,2],[1,4],[3,4]],totalMax:20}, medium:{pairs:[[1,3],[2,3],[1,5],[2,5],[3,4]],totalMax:40}, hard:{pairs:[[3,5],[1,6],[5,6],[1,8],[3,8],[2,5]],totalMax:80} },
  },

  pts: { easy:6, medium:13, hard:22 },
  welcome: 'כיתה ד — שברים, גיאומטריה, נתונים וכסף! 🔮',
  tip: 'שברים שווי-ערך: 1/2 = 2/4 = 3/6 🍕',

  generators: {
    add(diff) {
      const r=window.GRADE_CONFIG.ranges.add[diff];
      const a=rnd(r.aMin,r.aMax), b=rnd(r.bMin,r.bMax);
      const th=pick(GAME_THEMES);
      const stories=[
        `${a.toLocaleString()} + ${b.toLocaleString()} = ?`,
        `בעיר גרים ${a.toLocaleString()} איש. הגיעו עוד ${b.toLocaleString()}. כמה גרים עכשיו?`,
        `ספרייה יש ${a.toLocaleString()} ספרים. נוספו ${b.toLocaleString()}. כמה בסך הכל?`,
      ];
      return {type:'num',cat:'add',diff,label:th.label,gameLabel:brainrotLabel(),
        text:pick(stories),answer:a+b,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'decompose',a,b},showMul:false,dir:'rtl'};
    },
    sub(diff) {
      const r=window.GRADE_CONFIG.ranges.sub[diff];
      const total=rnd(r.aMin,r.aMax), b=rnd(1,Math.floor(total/2)), a=total-b;
      const th=pick(GAME_THEMES);
      const stories=[
        `${total.toLocaleString()} - ${b.toLocaleString()} = ?`,
        `היו ${total.toLocaleString()} מוצרים במחסן. נמכרו ${b.toLocaleString()}. כמה נשאר?`,
        `מרחק הטיול ${total.toLocaleString()} מ'. עברנו ${b.toLocaleString()} מ'. כמה נותר?`,
      ];
      return {type:'num',cat:'sub',diff,label:th.label,gameLabel:brainrotLabel(),
        text:pick(stories),answer:a,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${total} - ${b} = ${a}`},showMul:false,dir:'rtl'};
    },
    mul(diff) {
      const r=window.GRADE_CONFIG.ranges.mul[diff];
      const a=rnd(r.aMin,r.aMax), b=rnd(r.bMin,r.bMax);
      const th=pick(GAME_THEMES); const emoji=pick(th.items);
      const stories=[
        `${a} × ${b} = ?`,
        `${a} חבילות, בכל חבילה ${b} פריטים. כמה פריטים בסך הכל?`,
        `${b} ימים × ${a} שעות ביום = כמה שעות?`,
      ];
      return {type:'num',cat:'mul',diff,label:th.label,gameLabel:brainrotLabel(),
        text:pick(stories),answer:a*b,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'groups',a,b,emoji},showMul:true,mulA:a,mulB:b,mulEmoji:emoji,dir:'rtl'};
    },
    div(diff) {
      const r=window.GRADE_CONFIG.ranges.div[diff];
      const b=rnd(r.bMin,r.bMax), q=rnd(r.qMin,r.qMax), a=b*q;
      const th=pick(GAME_THEMES); const emoji=pick(th.items);
      const stories=[
        `${a} ÷ ${b} = ?`,
        `${a} פריטים מחולקים ל-${b} קבוצות שוות. כמה בכל קבוצה?`,
        `${a} ק"מ ב-${b} ימים שווה. כמה ק"מ ביום?`,
      ];
      return {type:'num',cat:'div',diff,label:th.label,gameLabel:brainrotLabel(),
        text:pick(stories),answer:q,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'groups',a:q,b,emoji},showMul:true,mulA:q,mulB:b,mulEmoji:emoji,dir:'rtl'};
    },
    word: null,
    fractions(diff) {
      const r=window.GRADE_CONFIG.ranges.fractions[diff];
      const [n,d]=pick(r.pairs);
      const total=rnd(d,Math.floor(r.totalMax/d))*d;
      const part=(total/d)*n;
      const th=pick(GAME_THEMES);
      const stories=[
        `כמה זה ${n}/${d} מתוך ${total}?`,
        `יש ${total} ${pick(th.items)}. ${n}/${d} מהם אדומים. כמה אדומים?`,
        `מ-${total} תלמידים, ${n}/${d} בנות. כמה בנות יש?`,
      ];
      return {type:'num',cat:'fractions',diff,label:'½ שברים',gameLabel:'',
        text:pick(stories),answer:part,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${total}÷${d}=${total/d} לחלק. קח ${n} חלקים = ${part}`},showMul:false,dir:'rtl'};
    },
    perimeter(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('perimeter',diff);
      const s=rnd(3,12); return {type:'num',cat:'perimeter',diff,label:'📏 היקף',gameLabel:'',
        text:`היקף ריבוע עם צלע ${s} ס"מ = ?`,answer:4*s,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 4×${s}=${4*s}`},showMul:false,dir:'rtl'};
    },
    area(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('area',diff);
      const w=rnd(3,12),h=rnd(2,8); return {type:'num',cat:'area',diff,label:'📐 שטח',gameLabel:'',
        text:`שטח מלבן ${w}×${h} ס"מ = ?`,answer:w*h,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${w}×${h}=${w*h} ס"מ²`},showMul:false,dir:'rtl'};
    },
    angles(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('angles',diff);
      return {type:'num',cat:'angles',diff,label:'📐 זוויות',gameLabel:'',
        text:'סכום זוויות כל משולש = ?°',answer:180,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:'💡 סכום = 180°'},showMul:false,dir:'rtl'};
    },
    shapes3d(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('shapes3d',diff);
      return {type:'num',cat:'shapes3d',diff,label:'🧊 גופים 3D',gameLabel:'',
        text:'כמה פנים לקוביה?',answer:6,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:'💡 קוביה = 6 פנים'},showMul:false,dir:'rtl'};
    },
    patterns1(diff) {
      const pools={
        easy:[{seq:'5,10,15,20,25',next:30,hint:'ספירה ב-5'},{seq:'100,200,300,400',next:500,hint:'ספירה ב-100'}],
        medium:[{seq:'1,2,4,8,16',next:32,hint:'כופלים ב-2'},{seq:'1000,900,800,700',next:600,hint:'יורדים ב-100'}],
        hard:[{seq:'1,1,2,3,5,8',next:13,hint:'כל מספר = סכום שניים לפניו (פיבונאצ׳י)'},{seq:'2,6,18,54',next:162,hint:'כופלים ב-3'}],
      };
      const p=pick(pools[diff]||pools.easy);
      return {type:'num',cat:'patterns1',diff,label:'🔄 דפוסים',gameLabel:'',
        text:`הסדרה: ${p.seq} , ___ — מה הבא?`,answer:p.next,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${p.hint}`},showMul:false,dir:'rtl'};
    },
    time(diff) {
      const qs={
        easy:[
          {text:'כמה דקות ב-3 שעות?',answer:180,hint:'3 × 60 = 180'},
          {text:'כמה שעות ב-2 ימים?',answer:48,hint:'2 × 24 = 48'},
          {text:'שיעור מ-8:20 עד 9:05. כמה דקות?',answer:45,hint:'מ-8:20 ל-9:05 = 45 דקות'},
        ],
        medium:[
          {text:'טיסה ארכה 3 שעות ו-40 דקות. כמה דקות בסך הכל?',answer:220,hint:'3×60+40=180+40=220'},
          {text:'כמה דקות ב-2 ימים?',answer:2880,hint:'2×24×60=2880'},
        ],
        hard:[
          {text:'הטיול ארך 5 ימים ו-6 שעות. כמה שעות בסך הכל?',answer:126,hint:'5×24+6=120+6=126'},
          {text:'כמה שניות ב-1 שעה?',answer:3600,hint:'60×60=3600'},
        ],
      };
      const q=pick(qs[diff]||qs.easy);
      return {type:'num',cat:'time',diff,label:'⏰ זמן',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${q.hint}`},showMul:false,dir:'rtl'};
    },
    money(diff) {
      const fns={
        easy:[
          ()=>{const p=rnd(10,50),n=rnd(2,6);return{text:`${n} ספרים ב-${p} ש"ח כל אחד. כמה שילמתי?`,answer:p*n,hint:`${n}×${p}=${p*n}`};},
          ()=>{const t=rnd(50,200),s=rnd(10,Math.floor(t/2));return{text:`יש לי ${t} ש"ח. קניתי ב-${s} ש"ח. כמה נשאר?`,answer:t-s,hint:`${t}-${s}=${t-s}`};},
        ],
        medium:[
          ()=>{const p=rnd(15,40),n=rnd(3,8),disc=rnd(5,15);return{text:`${n} פריטים ב-${p} ש"ח + הנחה ${disc}% (כתוב את הסכום אחרי הנחה). ראשית: ${n}×${p}=${n*p}, ואז חסר ${disc}% = ${Math.round(n*p*disc/100)} ש"ח`,answer:Math.round(n*p*(1-disc/100)),hint:`${n}×${p}=${n*p}, הנחה ${disc}%=${Math.round(n*p*disc/100)}, נשאר ${Math.round(n*p*(1-disc/100))}`};},
        ],
        hard:[
          ()=>{const d=rnd(5,10),p=rnd(8,15),n=rnd(4,8);return{text:`קניתי ${n} פריטים ב-${p} ש"ח. שילמתי עם שטר של ${d*p+rnd(1,10)} ש"ח. כמה עודף?`,answer:((d*p+rnd(1,10))-(n*p)),hint:`שטר - עלות = עודף`};},
        ],
      };
      const pool=fns[diff]||fns.easy; const q=pick(pool)();
      return {type:'num',cat:'money',diff,label:'💰 כסף',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${q.hint}`},showMul:false,dir:'rtl'};
    },
    data(diff) {
      // קריאת נתונים פשוטה — ממוצע, מינימום, מקסימום
      const n=rnd(3,5);
      const vals=Array.from({length:n},()=>rnd(diff==='easy'?2:diff==='medium'?5:10, diff==='easy'?10:diff==='medium'?20:50));
      const sum=vals.reduce((a,b)=>a+b,0);
      const avg=Math.round(sum/n);
      const mx=Math.max(...vals), mn=Math.min(...vals);
      const type=diff==='easy'?'max':diff==='medium'?'min':'avg';
      const text=type==='max'?`הציונים: ${vals.join(', ')}. מה הציון הגבוה ביותר?`
               :type==='min'?`המדידות: ${vals.join(', ')}. מה הקטן ביותר?`
               :`הציונים: ${vals.join(', ')}. מה הממוצע (עגל למספר שלם)?`;
      const answer=type==='max'?mx:type==='min'?mn:avg;
      const hint=type==='max'?`💡 הגדול ביותר מבין: ${vals.join(', ')} הוא ${mx}`
               :type==='min'?`💡 הקטן ביותר: ${mn}`
               :`💡 סכום: ${sum}, מחולק ב-${n} = ${avg}`;
      return {type:'num',cat:'data',diff,label:'📊 נתונים',gameLabel:'',
        text,answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:hint},showMul:false,dir:'rtl'};
    },
    measurement(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('measurement',diff);
      return {type:'num',cat:'measurement',diff,label:'📏 מדידה',gameLabel:'',
        text:"1 ק\"ג = כמה גרם?",answer:1000,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:'💡 1 ק"ג = 1000 גרם'},showMul:false,dir:'rtl'};
    },
  },
};
