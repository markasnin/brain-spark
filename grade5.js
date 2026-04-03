// ══════════════════════════════════════════════
// GRADE 5 — כיתה ה
// כל הנושאים + אחוזים, יחס, מספרים שליליים (מבוא),
// נפח, קואורדינטות, נתונים וממוצע, כסף מתקדם
// מספרים: עד 100,000
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'ה',
  gradeName: 'כיתה ה',
  gradeEmoji: '🏆',
  gradeColor: '#ff6348',

  availableCategories: ['add','sub','mul','div','word','fractions','percentages','ratio','perimeter','area','angles','shapes3d','coordinates','data','patterns1','time','money','measurement'],
  availableLearnTopics: ['division','shapes','fractions','measurement','perimeter_learn','area_learn','angles_learn','shapes3d_learn','coordinates_learn','measurement_learn','percentages_learn','ratio_learn'],
  availableExamTopics:  ['add','sub','mul','div','word','fractions','percentages','ratio','perimeter','area','angles','shapes3d','coordinates','data','measurement'],

  ranges: {
    add: { easy:{aMin:500,aMax:9999,bMin:200,bMax:9999}, medium:{aMin:5000,aMax:49999,bMin:1000,bMax:49999}, hard:{aMin:10000,aMax:99999,bMin:5000,bMax:99999} },
    sub: { easy:{aMin:500,aMax:9999}, medium:{aMin:5000,aMax:49999}, hard:{aMin:10000,aMax:99999} },
    mul: { easy:{aMin:5,aMax:20,bMin:5,bMax:20}, medium:{aMin:10,aMax:50,bMin:10,bMax:50}, hard:{aMin:20,aMax:100,bMin:20,bMax:100} },
    div: { easy:{bMin:3,bMax:12,qMin:3,qMax:12}, medium:{bMin:5,bMax:20,qMin:5,qMax:20}, hard:{bMin:7,bMax:25,qMin:7,qMax:25} },
    fractions: { easy:{pairs:[[1,2],[1,4],[3,4],[1,3],[2,3]],totalMax:40}, medium:{pairs:[[1,5],[2,5],[3,5],[4,5],[1,6],[5,6]],totalMax:60}, hard:{pairs:[[1,7],[2,7],[3,8],[5,8],[7,8],[1,9],[4,9]],totalMax:100} },
  },

  pts: { easy:7, medium:15, hard:25 },
  welcome: 'כיתה ה — אחוזים, יחסים, קואורדינטות ועוד! 🏆',
  tip: 'אחוז = חלק מתוך 100. 50% = מחצית! 💯',

  generators: {
    add(diff) {
      const r=window.GRADE_CONFIG.ranges.add[diff];
      const a=rnd(r.aMin,r.aMax), b=rnd(r.bMin,r.bMax);
      const th=pick(GAME_THEMES);
      return {type:'num',cat:'add',diff,label:th.label,gameLabel:brainrotLabel(),
        text:`${a.toLocaleString()} + ${b.toLocaleString()} = ?`,answer:a+b,
        pts:window.GRADE_CONFIG.pts[diff],hint:{type:'decompose',a,b},showMul:false,dir:'ltr'};
    },
    sub(diff) {
      const r=window.GRADE_CONFIG.ranges.sub[diff];
      const a=rnd(r.aMin,r.aMax), b=rnd(1,Math.floor(a/2));
      const th=pick(GAME_THEMES);
      return {type:'num',cat:'sub',diff,label:th.label,gameLabel:brainrotLabel(),
        text:`${a.toLocaleString()} - ${b.toLocaleString()} = ?`,answer:a-b,
        pts:window.GRADE_CONFIG.pts[diff],hint:{type:'text',msg:`💡 ${a.toLocaleString()} - ${b.toLocaleString()} = ${(a-b).toLocaleString()}`},showMul:false,dir:'ltr'};
    },
    mul(diff) {
      const r=window.GRADE_CONFIG.ranges.mul[diff];
      const a=rnd(r.aMin,r.aMax), b=rnd(r.bMin,r.bMax);
      const th=pick(GAME_THEMES); const emoji=pick(th.items);
      return {type:'num',cat:'mul',diff,label:th.label,gameLabel:brainrotLabel(),
        text:`${a} × ${b} = ?`,answer:a*b,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'groups',a,b,emoji},showMul:true,mulA:a,mulB:b,mulEmoji:emoji,dir:'ltr'};
    },
    div(diff) {
      const r=window.GRADE_CONFIG.ranges.div[diff];
      const b=rnd(r.bMin,r.bMax), q=rnd(r.qMin,r.qMax), a=b*q;
      const th=pick(GAME_THEMES); const emoji=pick(th.items);
      return {type:'num',cat:'div',diff,label:th.label,gameLabel:brainrotLabel(),
        text:`${a} ÷ ${b} = ?`,answer:q,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'groups',a:q,b,emoji},showMul:true,mulA:q,mulB:b,mulEmoji:emoji,dir:'ltr'};
    },
    word: null,
    fractions(diff) {
      const r=window.GRADE_CONFIG.ranges.fractions[diff];
      const [n,d]=pick(r.pairs);
      const total=rnd(d,Math.floor(r.totalMax/d))*d; const part=(total/d)*n;
      const th=pick(GAME_THEMES);
      const stories=[
        `כמה זה ${n}/${d} מתוך ${total}?`,
        `מ-${total} תלמידים, ${n}/${d} בנות. כמה בנות?`,
        `${n}/${d} מ-${total} ק"ג = כמה ק"ג?`,
      ];
      return {type:'num',cat:'fractions',diff,label:'½ שברים',gameLabel:'',
        text:pick(stories),answer:part,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${total}÷${d}=${total/d}. ×${n}=${part}`},showMul:false,dir:'rtl'};
    },
    percentages(diff) {
      const cases={
        easy:[
          ()=>{const tot=pick([100,200,50]);const pct=pick([10,20,25,50]);const ans=tot*pct/100;return{text:`כמה זה ${pct}% מתוך ${tot}?`,answer:ans,hint:`${pct}% מ-${tot} = ${ans}`};},
          ()=>{const tot=pick([100,80,40]);const pct=pick([25,50,10]);const ans=tot*pct/100;return{text:`${pct}% מ-${tot} = ?`,answer:ans,hint:`${tot}×${pct}÷100=${ans}`};},
        ],
        medium:[
          ()=>{const tot=rnd(2,9)*10;const pct=pick([10,20,25,30,40,50]);const ans=tot*pct/100;return{text:`${pct}% מ-${tot} = ?`,answer:ans,hint:`${tot}×${pct}/100=${ans}`};},
          ()=>{const pct=pick([10,20,25,50]);const tot=rnd(2,10)*20;const ans=tot*pct/100;return{text:`ספר עלה ${tot} ש"ח. הנחה ${pct}%. כמה שילמת?`,answer:tot-ans,hint:`הנחה: ${ans} ש"ח, משלמים ${tot-ans}`};},
          ()=>{const part=rnd(1,9)*5;const tot=rnd(part+1,20)*5;const pct=Math.round(part/tot*100);return{text:`${part} מתוך ${tot} זה כמה אחוזים? (עגל למספר שלם)`,answer:pct,hint:`${part}÷${tot}×100=${pct}%`};},
        ],
        hard:[
          ()=>{const orig=rnd(4,20)*10;const pct=pick([10,15,20,25,30]);const after=orig*(1-pct/100);return{text:`מחיר מקורי ${orig} ש"ח, הנחה ${pct}%. מה המחיר אחרי הנחה?`,answer:Math.round(after),hint:`${orig}×(1-${pct}/100)=${Math.round(after)}`};},
          ()=>{const tot=rnd(2,8)*50;const pct=pick([15,20,30,35,40]);const ans=Math.round(tot*pct/100);return{text:`${pct}% מ-${tot} = ?`,answer:ans,hint:`${tot}×${pct}÷100=${ans}`};},
          ()=>{const after=rnd(3,9)*10;const pct=pick([20,25,50]);const orig=after*100/(100-pct);return Number.isInteger(orig)?{text:`מחיר אחרי הנחה ${pct}% הוא ${after} ש"ח. מה המחיר המקורי?`,answer:orig,hint:`${after}÷(1-${pct}/100)=${orig}`}:{text:`כמה זה 20% מ-${after*5}?`,answer:after,hint:`${after*5}×20/100=${after}`};},
        ],
      };
      const pool=cases[diff]||cases.easy; const q=pick(pool)();
      return {type:'num',cat:'percentages',diff,label:'💯 אחוזים',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${q.hint}`},showMul:false,dir:'rtl'};
    },
    ratio(diff) {
      const cases={
        easy:[
          ()=>{const a=rnd(1,5),b=rnd(1,5),tot=(a+b)*rnd(2,4);return{text:`יחס בנים לבנות הוא ${a}:${b}. יש בסך הכל ${tot} ילדים. כמה בנים?`,answer:tot*a/(a+b),hint:`${tot}×${a}/(${a}+${b})=${tot*a/(a+b)}`};},
        ],
        medium:[
          ()=>{const a=rnd(2,5),b=rnd(2,5);const tot=(a+b)*rnd(3,6);const bA=tot*a/(a+b);return Number.isInteger(bA)?{text:`יחס מלח לסוכר במתכון ${a}:${b}. יש ${tot} כפות בסך הכל. כמה כפות מלח?`,answer:bA,hint:`${tot}×${a}/(${a+b})=${bA}`}:{text:`יחס 2:3. יש 10 חתיכות. כמה מהחלק הגדול?`,answer:6,hint:`10×3/5=6`};},
        ],
        hard:[
          ()=>{const scale=rnd(2,5);const real=rnd(3,8)*scale*100;const map=real/scale;return{text:`במפה 1:${scale}, קטע על המפה הוא ${map} מ"מ. מה המרחק האמיתי במ"מ?`,answer:real,hint:`${map}×${scale}=${real}`};},
        ],
      };
      const pool=cases[diff]||cases.easy; const q=pick(pool)();
      return {type:'num',cat:'ratio',diff,label:'⚖️ יחס',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${q.hint}`},showMul:false,dir:'rtl'};
    },
    perimeter(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('perimeter',diff);
      const r=rnd(3,10); return {type:'num',cat:'perimeter',diff,label:'📏 היקף',gameLabel:'',
        text:`היקף עיגול עם רדיוס ${r} ס"מ (π≈3)? (עגל)`,answer:2*3*r,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 2×π×r ≈ 2×3×${r}=${2*3*r}`},showMul:false,dir:'rtl'};
    },
    area(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('area',diff);
      const b=rnd(4,12),h=rnd(3,10); return {type:'num',cat:'area',diff,label:'📐 שטח',gameLabel:'',
        text:`שטח משולש: בסיס ${b} ס"מ, גובה ${h} ס"מ = ?`,answer:Math.floor(b*h/2),pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 (${b}×${h})÷2=${Math.floor(b*h/2)}`},showMul:false,dir:'rtl'};
    },
    angles(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('angles',diff);
      return {type:'num',cat:'angles',diff,label:'📐 זוויות',gameLabel:'',
        text:'סכום זוויות מחומש = ?°',answer:540,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:'💡 (5-2)×180=540°'},showMul:false,dir:'rtl'};
    },
    shapes3d(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('shapes3d',diff);
      return {type:'num',cat:'shapes3d',diff,label:'🧊 גופים 3D',gameLabel:'',
        text:'כמה פנים לגליל?',answer:3,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:'💡 גליל: 2 מעגלים + 1 משטח עקום = 3 פנים'},showMul:false,dir:'rtl'};
    },
    coordinates(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('coordinates',diff);
      return {type:'num',cat:'coordinates',diff,label:'🗺️ קואורדינטות',gameLabel:'',
        text:'נקודה (4,3) — מה ה-Y שלה?',answer:3,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:'💡 (X,Y) — המספר השני הוא Y=3'},showMul:false,dir:'rtl'};
    },
    data(diff) {
      const n=rnd(4,6);
      const vals=Array.from({length:n},()=>rnd(diff==='easy'?10:diff==='medium'?20:30,diff==='easy'?30:diff==='medium'?60:100));
      const sum=vals.reduce((a,b)=>a+b,0);
      const avg=Math.round(sum/n);
      const mx=Math.max(...vals), mn=Math.min(...vals), range=mx-mn;
      const type=pick(diff==='easy'?['max','min']:diff==='medium'?['avg','range']:['avg','range','sum']);
      const text=type==='max'?`הנתונים: ${vals.join(', ')}. מה הגדול ביותר?`
               :type==='min'?`הנתונים: ${vals.join(', ')}. מה הקטן ביותר?`
               :type==='avg'?`הנתונים: ${vals.join(', ')}. מה הממוצע? (עגל)`
               :type==='range'?`הנתונים: ${vals.join(', ')}. מה הטווח (מקס פחות מינ)?`
               :`הנתונים: ${vals.join(', ')}. מה הסכום?`;
      const answer=type==='max'?mx:type==='min'?mn:type==='avg'?avg:type==='range'?range:sum;
      return {type:'num',cat:'data',diff,label:'📊 נתונים',gameLabel:'',
        text,answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${type==='avg'?`סכום ${sum}÷${n}=${avg}`:type==='range'?`${mx}-${mn}=${range}`:type==='sum'?`סכום=${sum}`:`הגבוה=${mx}, הנמוך=${mn}`}`},showMul:false,dir:'rtl'};
    },
    patterns1(diff) {
      const pools={
        easy:[{seq:'1,3,6,10',next:15,hint:'מוסיפים 2,3,4,5... (מספרים משולשיים)'},{seq:'2,4,8,16,32',next:64,hint:'כופלים ב-2'}],
        medium:[{seq:'1,1,2,3,5,8,13',next:21,hint:'פיבונאצ׳י: כל מספר = סכום שניים לפניו'},{seq:'100,50,25',next:12.5,hint:'מחלקים ב-2. אבל אפשר גם 12 כהקרבה'}],
        hard:[{seq:'1,4,9,16,25,36',next:49,hint:'ריבועים: 7²=49'},{seq:'2,3,5,7,11,13',next:17,hint:'מספרים ראשוניים'}],
      };
      const p=pick(pools[diff]||pools.easy);
      const ans=typeof p.next==='number'&&!Number.isInteger(p.next)?Math.floor(p.next):p.next;
      return {type:'num',cat:'patterns1',diff,label:'🔄 דפוסים',gameLabel:'',
        text:`הסדרה: ${p.seq} , ___ — מה הבא?`,answer:ans,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${p.hint}`},showMul:false,dir:'rtl'};
    },
    time(diff) {
      const qs={
        easy:[{text:'כמה שעות ב-3 ימים?',answer:72,hint:'3×24=72'},{text:'כמה דקות ב-4 שעות?',answer:240,hint:'4×60=240'}],
        medium:[{text:'טיסה מ-6:45 ל-10:15. כמה שעות ודקות? (כתוב 330 עבור 3 שעות ו-30 דקות)',answer:330,hint:'3 שעות ו-30 דקות = 210 דקות'},{text:'כמה שניות ב-2.5 דקות?',answer:150,hint:'2.5×60=150'}],
        hard:[{text:'כמה שניות ב-2 שעות?',answer:7200,hint:'2×60×60=7200'},{text:'1000 דקות = כמה שעות ודקות? (כתוב שעות בלבד, עגל)',answer:16,hint:'1000÷60=16 שעות ו-40 דקות'}],
      };
      const q=pick(qs[diff]||qs.easy);
      return {type:'num',cat:'time',diff,label:'⏰ זמן',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${q.hint}`},showMul:false,dir:'rtl'};
    },
    money(diff) {
      const fns={
        easy:[()=>{const p=rnd(20,100),pct=pick([10,20,25,50]);const disc=p*pct/100;return{text:`מחיר ${p} ש"ח, הנחה ${pct}%. כמה משלמים?`,answer:p-disc,hint:`${p}-${disc}=${p-disc}`};},],
        medium:[()=>{const p=rnd(50,200),pct=pick([15,20,30]);const disc=Math.round(p*pct/100);return{text:`מחיר מקורי ${p} ש"ח, ירד ב-${pct}%. מה המחיר החדש?`,answer:p-disc,hint:`${p}×${100-pct}/100=${p-disc}`};},],
        hard:[()=>{const daily=rnd(5,15),days=rnd(20,30);const tax=10;const net=daily*days;const total=Math.round(net*(1+tax/100));return{text:`עובד מרוויח ${daily} ש"ח ביום. עבד ${days} ימים. יש מס ${tax}%. כמה משלמים בסך הכל?`,answer:total,hint:`${daily}×${days}=${net}, ועם ${tax}% מס = ${total}`};},],
      };
      const pool=fns[diff]||fns.easy; const q=pick(pool)();
      return {type:'num',cat:'money',diff,label:'💰 כסף',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${q.hint}`},showMul:false,dir:'rtl'};
    },
    measurement(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('measurement',diff);
      return {type:'num',cat:'measurement',diff,label:'📏 מדידה',gameLabel:'',
        text:"1 ליטר = כמה מ\"ל?",answer:1000,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:"💡 1 ליטר = 1000 מ\"ל"},showMul:false,dir:'rtl'};
    },
  },
};
