// ══════════════════════════════════════════════
// GRADE 6 — כיתה ו
// כל הנושאים + אחוזים מתקדמים, יחס ופרופורציה,
// מספרים שליליים, סדר פעולות, סטטיסטיקה, מהירות-זמן-מרחק,
// נפח גופים, גיאומטריה מתקדמת, דפוסים מתקדמים
// מספרים: עד 1,000,000
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'ו',
  gradeName: 'כיתה ו',
  gradeEmoji: '🚀',
  gradeColor: '#ff4757',

  availableCategories: [
    'add','sub','mul','div','word','fractions',
    'percentages','ratio','negative_numbers','order_of_ops',
    'perimeter','area','angles','shapes3d','coordinates',
    'data','speed','volume3d','money','measurement'
  ],
  availableLearnTopics: [
    'division','shapes','fractions','measurement',
    'perimeter_learn','area_learn','angles_learn','shapes3d_learn','coordinates_learn','measurement_learn',
    'percentages_learn','ratio_learn','negative_learn','statistics_learn'
  ],
  availableExamTopics: [
    'add','sub','mul','div','word','fractions',
    'percentages','ratio','negative_numbers','order_of_ops',
    'perimeter','area','angles','shapes3d','coordinates',
    'data','speed','volume3d','measurement'
  ],

  ranges: {
    add: { easy:{aMin:1000,aMax:99999,bMin:500,bMax:99999}, medium:{aMin:10000,aMax:499999,bMin:5000,bMax:499999}, hard:{aMin:100000,aMax:999999,bMin:50000,bMax:999999} },
    sub: { easy:{aMin:1000,aMax:99999}, medium:{aMin:10000,aMax:499999}, hard:{aMin:100000,aMax:999999} },
    mul: { easy:{aMin:10,aMax:50,bMin:10,bMax:50}, medium:{aMin:20,aMax:99,bMin:20,bMax:99}, hard:{aMin:50,aMax:200,bMin:50,bMax:200} },
    div: { easy:{bMin:5,bMax:20,qMin:5,qMax:20}, medium:{bMin:10,bMax:30,qMin:10,qMax:30}, hard:{bMin:15,bMax:50,qMin:15,qMax:50} },
    fractions: { easy:{pairs:[[1,2],[1,4],[3,4],[1,3],[2,3],[1,5],[2,5]],totalMax:60}, medium:{pairs:[[3,5],[4,5],[1,6],[5,6],[1,7],[2,7],[3,7]],totalMax:120}, hard:{pairs:[[5,7],[6,7],[1,8],[3,8],[5,8],[7,8],[1,9],[4,9],[7,9]],totalMax:200} },
  },

  pts: { easy:8, medium:18, hard:30 },
  welcome: 'כיתה ו — המתמטיקאים האמיתיים! 🚀',
  tip: 'אחוזים, יחסים, מהירות — כיתה ו מלאה! 💪',

  generators: {
    add(diff) {
      const r=window.GRADE_CONFIG.ranges.add[diff];
      const a=rnd(r.aMin,r.aMax), b=rnd(r.bMin,r.bMax);
      const th=pick(GAME_THEMES);
      const stories=[
        `${a.toLocaleString()} + ${b.toLocaleString()} = ?`,
        `אוכלוסיית עיר א: ${a.toLocaleString()}. עיר ב: ${b.toLocaleString()}. כמה בשתי הערים?`,
        `קופה א: ${a.toLocaleString()} ש"ח. קופה ב: ${b.toLocaleString()} ש"ח. כמה בסך הכל?`,
      ];
      return {type:'num',cat:'add',diff,label:th.label,gameLabel:brainrotLabel(),
        text:pick(stories),answer:a+b,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'decompose',a,b},showMul:false,dir:'rtl'};
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
      const th=pick(GAME_THEMES);
      return {type:'num',cat:'mul',diff,label:th.label,gameLabel:brainrotLabel(),
        text:`${a} × ${b} = ?`,answer:a*b,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${a} × ${b} = ${a*b}`},showMul:false,dir:'ltr'};
    },
    div(diff) {
      const r=window.GRADE_CONFIG.ranges.div[diff];
      const b=rnd(r.bMin,r.bMax), q=rnd(r.qMin,r.qMax), a=b*q;
      const th=pick(GAME_THEMES);
      return {type:'num',cat:'div',diff,label:th.label,gameLabel:brainrotLabel(),
        text:`${a.toLocaleString()} ÷ ${b} = ?`,answer:q,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${b} × ${q} = ${a}`},showMul:false,dir:'ltr'};
    },
    word: null,
    fractions(diff) {
      const r=window.GRADE_CONFIG.ranges.fractions[diff];
      const [n,d]=pick(r.pairs);
      const total=rnd(d,Math.floor(r.totalMax/d))*d; const part=(total/d)*n;
      const th=pick(GAME_THEMES);
      const stories=[
        `${n}/${d} מתוך ${total.toLocaleString()} = ?`,
        `מ-${total} תלמידים, ${n}/${d} הגיעו לטיול. כמה הגיעו?`,
        `${n}/${d} מ-${total} ק"מ עברנו. כמה ק"מ עברנו?`,
      ];
      return {type:'num',cat:'fractions',diff,label:'½ שברים',gameLabel:'',
        text:pick(stories),answer:part,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${total}÷${d}=${total/d}. ×${n}=${part}`},showMul:false,dir:'rtl'};
    },

    // ══ אחוזים ══
    percentages(diff) {
      const cases={
        easy:[
          ()=>{const tot=rnd(2,10)*10;const pct=pick([10,20,25,50]);const ans=Math.round(tot*pct/100);return{text:`${pct}% מ-${tot} = ?`,answer:ans,hint:`${tot}×${pct}/100=${ans}`};},
          ()=>{const p=rnd(50,200)/10*10;const pct=pick([10,25,50]);const ans=Math.round(p*pct/100);return{text:`ספר עולה ${p} ש"ח. הנחה ${pct}%. כמה תשלם?`,answer:Math.round(p-ans),hint:`הנחה: ${ans} ש"ח. תשלם: ${Math.round(p-ans)}`};},
        ],
        medium:[
          ()=>{const tot=rnd(2,20)*10;const pct=pick([15,20,30,35,40,60,75]);const ans=Math.round(tot*pct/100);return{text:`${pct}% מ-${tot} = ?`,answer:ans,hint:`${tot}×${pct}/100=${ans}`};},
          ()=>{const part=rnd(1,9)*5;const tot=rnd(2,8)*25;const pct=Math.round(part/tot*100);return{text:`${part} מתוך ${tot} — כמה אחוזים? (עגל)`,answer:pct,hint:`${part}/${tot}×100≈${pct}%`};},
          ()=>{const orig=rnd(5,20)*10;const pct=pick([10,20,30]);const after=Math.round(orig*(1+pct/100));return{text:`מחיר עלה ב-${pct}%. היה ${orig} ש"ח. מה המחיר החדש?`,answer:after,hint:`${orig}×${100+pct}/100=${after}`};},
        ],
        hard:[
          ()=>{const after=rnd(4,16)*10;const pct=pick([20,25,50]);const orig=after*100/(100-pct);return Number.isInteger(orig)?{text:`אחרי הנחה ${pct}% מחיר הוא ${after} ש"ח. מה היה המחיר המקורי?`,answer:orig,hint:`${after}÷${(100-pct)/100}=${orig}`}:{text:`${pct}% מ-${after*5} = ?`,answer:after*pct/100*5,hint:`${after*5}×${pct}/100=${after*pct/100*5}`};},
          ()=>{const a=rnd(3,9)*10,b=rnd(2,8)*10;const gain=Math.round((b-a)/a*100);return gain>0?{text:`מחיר עלה מ-${a} ל-${b} ש"ח. מה אחוז העלייה? (עגל)`,answer:gain,hint:`(${b}-${a})/${a}×100=${gain}%`}:{text:`${a}% מ-${b*10} = ?`,answer:Math.round(a*b*10/100),hint:`${a}/100×${b*10}=${Math.round(a*b*10/100)}`};},
          ()=>{const classes=rnd(3,6),avg=rnd(25,35);const total=classes*avg;const absentPct=pick([10,20,25]);const absent=Math.round(total*absentPct/100);return{text:`${classes} כיתות עם ממוצע ${avg} תלמידים. ${absentPct}% נעדרו. כמה נעדרו?`,answer:absent,hint:`${classes}×${avg}=${total} תלמידים. ${absentPct}% = ${absent}`};},
        ],
      };
      const pool=cases[diff]||cases.easy; const q=pick(pool)();
      return {type:'num',cat:'percentages',diff,label:'💯 אחוזים',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${q.hint}`},showMul:false,dir:'rtl'};
    },

    // ══ יחס ופרופורציה ══
    ratio(diff) {
      const cases={
        easy:[
          ()=>{const a=rnd(1,4),b=rnd(1,4),k=rnd(2,5);return{text:`יחס בנים לבנות ${a}:${b}. יש ${(a+b)*k} ילדים. כמה בנים?`,answer:a*k,hint:`${a*k} בנים (${a}×${k})`};},
          ()=>{const r=rnd(2,5),tot=r*rnd(3,8);return{text:`לכל ${r} שקלים שחסכת, תקבל עוד 1 ש"ח בונוס. חסכת ${tot} ש"ח. כמה בונוס?`,answer:Math.floor(tot/r),hint:`${tot}÷${r}=${Math.floor(tot/r)} ש"ח בונוס`};},
        ],
        medium:[
          ()=>{const a=rnd(2,5),b=rnd(2,5);const tot=(a+b)*rnd(3,7);const pA=tot*a/(a+b);return Number.isInteger(pA)?{text:`יחס ${a}:${b}. יש ${tot} פריטים בסך הכל. כמה פריטים ביחס ה-${a}?`,answer:pA,hint:`${tot}×${a}/(${a+b})=${pA}`}:{text:`יחס 3:2, יש 50 פריטים. כמה ב-3?`,answer:30,hint:`50×3/5=30`};},
          ()=>{const scale=pick([100,200,250,500,1000]);const map=rnd(2,8);return{text:`מפה בסולם 1:${scale}. מרחק על המפה ${map} ס"מ. מה המרחק האמיתי בס"מ?`,answer:map*scale,hint:`${map}×${scale}=${map*scale} ס"מ`};},
        ],
        hard:[
          ()=>{const a=rnd(2,5),b=rnd(2,5),c=rnd(2,4);const tot=(a+b+c)*rnd(2,5);const pA=tot*a/(a+b+c);return Number.isInteger(pA)?{text:`יחס שלושה חלקים: ${a}:${b}:${c}. סך הכל ${tot}. כמה ב-${a}?`,answer:pA,hint:`${tot}×${a}/${a+b+c}=${pA}`}:{text:`יחס 2:3:5. סך 100. כמה ב-2?`,answer:20,hint:`100×2/10=20`};},
          ()=>{const kmh=rnd(3,8)*10,hrs=rnd(2,5);return{text:`מכונית נוסעת ${kmh} קמ"ש. תוך ${hrs} שעות כמה ק"מ?`,answer:kmh*hrs,hint:`${kmh}×${hrs}=${kmh*hrs} ק"מ`};},
        ],
      };
      const pool=cases[diff]||cases.easy; const q=pick(pool)();
      return {type:'num',cat:'ratio',diff,label:'⚖️ יחס',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${q.hint}`},showMul:false,dir:'rtl'};
    },

    // ══ מספרים שליליים ══
    negative_numbers(diff) {
      const cases={
        easy:[
          ()=>{const a=rnd(1,10),b=rnd(1,a);return{text:`0 - ${a} = ?`,answer:-a,hint:`מתחת לאפס: -${a}`};},
          ()=>{const a=rnd(1,8),b=rnd(1,8);return{text:`(-${a}) + ${a+b} = ?`,answer:b,hint:`-${a}+${a+b}=${b}`};},
          ()=>{const t=rnd(-5,0);const b=rnd(1,10);return{text:`טמפרטורה ${t}°. עלתה ב-${b}°. מה הטמפרטורה עכשיו?`,answer:t+b,hint:`${t}+${b}=${t+b}`};},
        ],
        medium:[
          ()=>{const a=rnd(2,10),b=rnd(2,10);return{text:`(-${a}) + (-${b}) = ?`,answer:-(a+b),hint:`שני שליליים: -(${a}+${b})=-${a+b}`};},
          ()=>{const a=rnd(5,15),b=rnd(2,a-1);return{text:`(-${a}) - (-${b}) = ?`,answer:b-a,hint:`-${a}+${b}=${b-a}`};},
          ()=>{const temps=[-3,-1,2,0,-5,4,-2];const t1=pick(temps),t2=pick(temps);return{text:`טמפרטורה בבוקר ${t1}°. בערב ${t2}°. כמה השתנתה (יכולה להיות שלילית)?`,answer:t2-t1,hint:`${t2}-(${t1})=${t2-t1}`};},
        ],
        hard:[
          ()=>{const a=rnd(2,8),b=rnd(2,8);return{text:`(-${a}) × ${b} = ?`,answer:-a*b,hint:`שלילי כפול חיובי = שלילי: -${a*b}`};},
          ()=>{const a=rnd(2,6),b=rnd(2,6);return{text:`(-${a}) × (-${b}) = ?`,answer:a*b,hint:`שלילי כפול שלילי = חיובי: ${a*b}`};},
          ()=>{const a=rnd(3,9),b=rnd(2,4);return{text:`(-${a*b}) ÷ ${b} = ?`,answer:-a,hint:`שלילי חלקי חיובי = שלילי: -${a}`};},
        ],
      };
      const pool=cases[diff]||cases.easy; const q=pick(pool)();
      return {type:'num',cat:'negative_numbers',diff,label:'➖ מספרים שליליים',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${q.hint}`},showMul:false,dir:'rtl'};
    },

    // ══ סדר פעולות ══
    order_of_ops(diff) {
      const cases={
        easy:[
          ()=>{const a=rnd(2,8),b=rnd(2,5),c=rnd(1,5);const ans=a+b*c;return{text:`${a} + ${b} × ${c} = ? (קודם כפל!)`,answer:ans,hint:`קודם: ${b}×${c}=${b*c}, אחר כך: ${a}+${b*c}=${ans}`};},
          ()=>{const a=rnd(2,8),b=rnd(2,5),c=rnd(1,5);const ans=a-b+c;return{text:`${a} - ${b} + ${c} = ?`,answer:ans,hint:`משמאל לימין: ${a}-${b}=${a-b}, +${c}=${ans}`};},
        ],
        medium:[
          ()=>{const a=rnd(2,6),b=rnd(2,5),c=rnd(1,4),d=rnd(1,4);const ans=a*b+c*d;return{text:`${a} × ${b} + ${c} × ${d} = ?`,answer:ans,hint:`קודם כפלים: ${a*b}+${c*d}=${ans}`};},
          ()=>{const a=rnd(2,5),b=rnd(2,5);const inner=rnd(2,4),add=rnd(1,4);const ans=(a+inner)*b;return{text:`(${a} + ${inner}) × ${b} = ?`,answer:ans,hint:`קודם סוגריים: ${a+inner}×${b}=${ans}`};},
        ],
        hard:[
          ()=>{const a=rnd(2,5),b=rnd(2,4),c=rnd(2,4),d=rnd(2,3);const ans=a*(b+c)-d;return{text:`${a} × (${b} + ${c}) - ${d} = ?`,answer:ans,hint:`סוגריים: ${b+c}, כפל: ${a*(b+c)}, פחות ${d} = ${ans}`};},
          ()=>{const sq=rnd(2,5);const a=rnd(1,5);const ans=sq*sq+a;return{text:`${sq}² + ${a} = ?`,answer:ans,hint:`${sq}²=${sq*sq}, +${a}=${ans}`};},
        ],
      };
      const pool=cases[diff]||cases.easy; const q=pick(pool)();
      return {type:'num',cat:'order_of_ops',diff,label:'🔢 סדר פעולות',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${q.hint}`},showMul:false,dir:'rtl'};
    },

    // ══ מהירות-זמן-מרחק ══
    speed(diff) {
      const cases={
        easy:[
          ()=>{const kmh=rnd(3,8)*10,hrs=rnd(1,5);return{text:`מכונית נוסעת ${kmh} קמ"ש. תוך ${hrs} שעות עברה כמה ק"מ?`,answer:kmh*hrs,hint:`מהירות × זמן = מרחק: ${kmh}×${hrs}=${kmh*hrs}`};},
          ()=>{const km=rnd(4,15)*10,hrs=rnd(2,5);const kmh=km/hrs;return Number.isInteger(kmh)?{text:`רכיבה של ${km} ק"מ תוך ${hrs} שעות. מה המהירות הממוצעת?`,answer:kmh,hint:`מרחק÷זמן=${km}÷${hrs}=${kmh} קמ"ש`}:{text:`נסיעה של 120 ק"מ תוך 3 שעות. מה המהירות?`,answer:40,hint:`120÷3=40 קמ"ש`};},
        ],
        medium:[
          ()=>{const kmh=rnd(4,12)*10,km=kmh*rnd(1,4);const hrs=km/kmh;return{text:`נסיעה של ${km} ק"מ במהירות ${kmh} קמ"ש. כמה זמן (שעות)?`,answer:hrs,hint:`זמן=מרחק÷מהירות: ${km}÷${kmh}=${hrs}`};},
          ()=>{const kmh1=rnd(4,8)*10,kmh2=rnd(4,8)*10,hrs=rnd(1,3);return{text:`רכב א' נוסע ${kmh1} קמ"ש ורכב ב' ${kmh2} קמ"ש. בעוד ${hrs} שעות — כמה ק"מ הפרש ביניהם?`,answer:Math.abs(kmh1-kmh2)*hrs,hint:`|${kmh1}-${kmh2}|×${hrs}=${Math.abs(kmh1-kmh2)*hrs}`};},
        ],
        hard:[
          ()=>{const d=rnd(3,8)*50,r1=rnd(4,8)*10,r2=rnd(4,8)*10;const t=d/(r1+r2);return Number.isInteger(t)?{text:`שני רכבים יוצאים לקראת זה לזה. מרחק ${d} ק"מ. מהירויות ${r1} ו-${r2} קמ"ש. תוך כמה שעות ייפגשו?`,answer:t,hint:`${d}÷(${r1}+${r2})=${d}÷${r1+r2}=${t}`}:{text:`מרחק 300 ק"מ. מהירות 60 קמ"ש. כמה שעות?`,answer:5,hint:`300÷60=5`};},
        ],
      };
      const pool=cases[diff]||cases.easy; const q=pick(pool)();
      return {type:'num',cat:'speed',diff,label:'🚗 מהירות-זמן-מרחק',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${q.hint}`},showMul:false,dir:'rtl'};
    },

    // ══ נפח גופים ══
    volume3d(diff) {
      const cases={
        easy:[
          ()=>{const l=rnd(2,8),w=rnd(2,6),h=rnd(2,5);return{text:`נפח קובייד (מלבן תלת-מימדי): ${l}×${w}×${h} = ?`,answer:l*w*h,hint:`${l}×${w}×${h}=${l*w*h} יח' נפח`};},
          ()=>{const s=rnd(2,6);return{text:`נפח קוביה עם צלע ${s} ס"מ = ?`,answer:s*s*s,hint:`${s}³=${s*s*s} ס"מ³`};},
        ],
        medium:[
          ()=>{const r=rnd(2,5),h=rnd(3,8);const v=Math.round(3.14*r*r*h);return{text:`נפח גליל: רדיוס ${r} ס"מ, גובה ${h} ס"מ. (π≈3.14, עגל)`,answer:v,hint:`π×${r}²×${h}≈${v} ס"מ³`};},
          ()=>{const l=rnd(3,10),w=rnd(3,8);const waterH=rnd(1,4);return{text:`בריכה ${l}×${w} מטר מלאה מים לגובה ${waterH} מ'. כמה מ"ק מים?`,answer:l*w*waterH,hint:`${l}×${w}×${waterH}=${l*w*waterH} מ"ק`};},
        ],
        hard:[
          ()=>{const r=rnd(2,5),h=rnd(4,10);const vc=Math.round(3.14*r*r*h/3);return{text:`נפח חרוט: רדיוס ${r} ס"מ, גובה ${h} ס"מ. (π≈3.14, עגל)`,answer:vc,hint:`⅓×π×${r}²×${h}≈${vc} ס"מ³`};},
          ()=>{const s=rnd(3,7);const v=s*s*s;const boxes=rnd(2,5);return{text:`קוביות עם צלע ${s} ס"מ. יש ${boxes} קוביות. כמה נפח כולל?`,answer:v*boxes,hint:`${s}³×${boxes}=${v}×${boxes}=${v*boxes} ס"מ³`};},
        ],
      };
      const pool=cases[diff]||cases.easy; const q=pick(pool)();
      return {type:'num',cat:'volume3d',diff,label:'🧊 נפח',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${q.hint}`},showMul:false,dir:'rtl'};
    },

    // ══ סטטיסטיקה ══
    data(diff) {
      const n=rnd(4,7);
      const vals=Array.from({length:n},()=>rnd(diff==='easy'?10:diff==='medium'?20:30,diff==='easy'?40:diff==='medium'?80:100));
      const sum=vals.reduce((a,b)=>a+b,0);
      const avg=Math.round(sum/n);
      const mx=Math.max(...vals),mn=Math.min(...vals),range=mx-mn;
      const sorted=[...vals].sort((a,b)=>a-b);
      const median=n%2===0?(sorted[n/2-1]+sorted[n/2])/2:sorted[Math.floor(n/2)];
      const type=pick(diff==='easy'?['max','min','avg']:diff==='medium'?['avg','median','range']:['avg','median','range','sum']);
      const q=type==='max'?{text:`הנתונים: ${vals.join(', ')}. מה הגדול ביותר?`,answer:mx,hint:`גדול ביותר: ${mx}`}
              :type==='min'?{text:`הנתונים: ${vals.join(', ')}. מה הקטן ביותר?`,answer:mn,hint:`קטן ביותר: ${mn}`}
              :type==='avg'?{text:`הנתונים: ${vals.join(', ')}. מה הממוצע? (עגל למספר שלם)`,answer:avg,hint:`סכום ${sum}÷${n}≈${avg}`}
              :type==='median'?{text:`הנתונים: ${vals.join(', ')}. מה החציון? (עגל)`,answer:Math.round(median),hint:`מסודר: ${sorted.join(',')}. חציון: ${Math.round(median)}`}
              :type==='range'?{text:`הנתונים: ${vals.join(', ')}. מה הטווח?`,answer:range,hint:`${mx}-${mn}=${range}`}
              :{text:`הנתונים: ${vals.join(', ')}. מה הסכום?`,answer:sum,hint:`סכום: ${sum}`};
      return {type:'num',cat:'data',diff,label:'📊 סטטיסטיקה',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${q.hint}`},showMul:false,dir:'rtl'};
    },

    // גיאומטריה
    perimeter(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('perimeter',diff);
      const r=rnd(4,12); return {type:'num',cat:'perimeter',diff,label:'📏 היקף',gameLabel:'',
        text:`היקף עיגול רדיוס ${r} (π≈3.14, עגל)`,answer:Math.round(2*3.14*r),pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 2×3.14×${r}≈${Math.round(2*3.14*r)}`},showMul:false,dir:'rtl'};
    },
    area(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('area',diff);
      const r=rnd(3,8); return {type:'num',cat:'area',diff,label:'📐 שטח',gameLabel:'',
        text:`שטח עיגול רדיוס ${r} ס"מ (π≈3.14, עגל)`,answer:Math.round(3.14*r*r),pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 3.14×${r}²≈${Math.round(3.14*r*r)}`},showMul:false,dir:'rtl'};
    },
    angles(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('angles',diff);
      const n=rnd(4,8); return {type:'num',cat:'angles',diff,label:'📐 זוויות',gameLabel:'',
        text:`סכום זוויות ${n}-צלע = ?°`,answer:(n-2)*180,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 (${n}-2)×180=${(n-2)*180}°`},showMul:false,dir:'rtl'};
    },
    shapes3d(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('shapes3d',diff);
      return {type:'num',cat:'shapes3d',diff,label:'🧊 גופים 3D',gameLabel:'',
        text:'כמה קצוות לפירמידה ריבועית?',answer:8,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:'💡 פירמידה ריבועית: 5 פנים, 8 קצוות, 5 קודקודים'},showMul:false,dir:'rtl'};
    },
    coordinates(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('coordinates',diff);
      return {type:'num',cat:'coordinates',diff,label:'🗺️ קואורדינטות',gameLabel:'',
        text:'נקודה (-3, 2) — באיזה רביע?',answer:2,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:'💡 X שלילי, Y חיובי = רביע 2'},showMul:false,dir:'rtl'};
    },
    money(diff) {
      const fns={
        easy:[()=>{const p=rnd(50,200),pct=pick([10,20,25]);const d=Math.round(p*pct/100);return{text:`מוצר עולה ${p} ש"ח. הנחה ${pct}%. כמה משלמים?`,answer:p-d,hint:`${p}-${d}=${p-d}`};},],
        medium:[()=>{const d=rnd(5,15),rate=rnd(8,15)/100,months=rnd(6,24);const interest=Math.round(d*rate*months/12);return{text:`הלוואה ${d*100} ש"ח בריבית ${Math.round(rate*100)}% לשנה. ל-${months} חודשים. כמה ריבית?`,answer:interest,hint:`${d*100}×${Math.round(rate*100)}/100×${months}/12≈${interest}`};},],
        hard:[()=>{const buy=rnd(5,15)*10,sell=buy+rnd(2,6)*5;const pct=Math.round((sell-buy)/buy*100);return{text:`קנינו ב-${buy} ש"ח ומכרנו ב-${sell} ש"ח. מה אחוז הרווח? (עגל)`,answer:pct,hint:`(${sell}-${buy})/${buy}×100=${pct}%`};},],
      };
      const pool=fns[diff]||fns.easy; const q=pick(pool)();
      return {type:'num',cat:'money',diff,label:'💰 כסף ועסקים',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${q.hint}`},showMul:false,dir:'rtl'};
    },
    measurement(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('measurement',diff);
      return {type:'num',cat:'measurement',diff,label:'📏 מדידה',gameLabel:'',
        text:"3 ק\"מ + 750 מ' = כמה מ'?",answer:3750,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:"💡 3×1000+750=3750 מ'"},showMul:false,dir:'rtl'};
    },
  },
};
