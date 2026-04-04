// ══════════════════════════════════════════════
// GRADE 6 — כיתה ו  |  תוכנית משרד החינוך תשס"ו
// ────────────────────────────────────────────
// מספרים: כל הקבוצות (טבעיים, שלמים, שברים), יחסי הכלה
// שברים פשוטים: כפל שבר×שבר (כולל מעורבים), חילוק שברים
//               חלק של כמות (מציאת ערך החלק, חישוב החלק, מציאת הכמות הבסיסית)
// שברים עשרוניים: ×10/100/1000, כפל, חילוק
//                  שבר עשרוני מחזורי (היכרות)
// אחוזים: ערך האחוז + חישוב האחוז (לא "מחיר מקורי" — זה כיתה ז+)
// יחס: הגדרה + תכונות + חלוקת כמות לפי יחס
// מספרים שלמים: מיקום על ישר מספרים, חיבור וחיסור בסיסי
// גאומטריה (גופים — כיתה ו!): מיון גופים, פריסות, גופים משוכללים
//                               חישובי נפחים (תיבה, גליל)
//                               מעגל ועיגול: היקף ושטח
// קנה מידה (פרופורציה)
// חקר נתונים: ממוצע, חציון, שכיח, טווח (פרטים — כיתה ו)
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'ו',
  gradeName: 'כיתה ו',
  gradeEmoji: '🚀',
  gradeColor: '#ff4757',

  availableCategories: [
    'add','sub','mul','div','word',
    'fractions_mul','fractions_div','fractions_part',
    'decimals_mul','percentages','ratio',
    'integers_intro','perimeter','area','volume','circle',
    'data','scale','measurement'
  ],
  availableLearnTopics: [
    'division','shapes','fractions','measurement',
    'perimeter_learn','area_learn','shapes3d_learn','coordinates_learn',
    'percentages_learn','ratio_learn','negative_learn','statistics_learn'
  ],
  availableExamTopics: [
    'add','sub','mul','div','word',
    'fractions_mul','fractions_div','fractions_part',
    'decimals_mul','percentages','ratio',
    'integers_intro','perimeter','area','volume','circle',
    'data','scale','measurement'
  ],

  ranges: {
    add: { easy:{aMin:1000,aMax:99999,bMin:500,bMax:99999}, medium:{aMin:10000,aMax:499999,bMin:5000,bMax:499999}, hard:{aMin:100000,aMax:999999,bMin:50000,bMax:999999} },
    sub: { easy:{aMin:1000,aMax:99999}, medium:{aMin:10000,aMax:499999}, hard:{aMin:100000,aMax:999999} },
    mul: { easy:{aMin:10,aMax:50,bMin:10,bMax:50}, medium:{aMin:20,aMax:99,bMin:20,bMax:99}, hard:{aMin:50,aMax:200,bMin:50,bMax:200} },
    div: { easy:{bMin:5,bMax:20,qMin:5,qMax:20}, medium:{bMin:10,bMax:30,qMin:10,qMax:30}, hard:{bMin:15,bMax:50,qMin:15,qMax:50} },
    fractions: { easy:{pairs:[[1,2],[1,4],[3,4],[1,3],[2,3]]}, medium:{pairs:[[1,5],[2,5],[3,5],[4,5],[1,6],[5,6]]}, hard:{pairs:[[3,8],[5,8],[7,8],[2,7],[4,9],[7,9]]} },
  },

  pts: { easy:8, medium:18, hard:30 },
  welcome: 'כיתה ו — שברים מלאים, אחוזים, יחס, גופים ועיגול! 🚀',
  tip: 'חילוק שברים: הפוך וכפול! ½÷¼ = ½×4 = 2 💡',

  generators: {
    add(diff) {
      const r=window.GRADE_CONFIG.ranges.add[diff];
      const a=rnd(r.aMin,r.aMax), b=rnd(r.bMin,r.bMax);
      const th=pick(GAME_THEMES);
      return { type:'num',cat:'add',diff,label:th.label,gameLabel:brainrotLabel(),
        text:`${a.toLocaleString()} + ${b.toLocaleString()} = ?`,answer:a+b,
        pts:window.GRADE_CONFIG.pts[diff],hint:{type:'decompose',a,b},showMul:false,dir:'ltr' };
    },
    sub(diff) {
      const r=window.GRADE_CONFIG.ranges.sub[diff];
      const a=rnd(r.aMin,r.aMax), b=rnd(1,Math.floor(a/2));
      const th=pick(GAME_THEMES);
      return { type:'num',cat:'sub',diff,label:th.label,gameLabel:brainrotLabel(),
        text:`${a.toLocaleString()} - ${b.toLocaleString()} = ?`,answer:a-b,
        pts:window.GRADE_CONFIG.pts[diff],hint:{type:'text',msg:`💡 ${(a-b).toLocaleString()}`},showMul:false,dir:'ltr' };
    },
    mul(diff) {
      const r=window.GRADE_CONFIG.ranges.mul[diff];
      const a=rnd(r.aMin,r.aMax), b=rnd(r.bMin,r.bMax);
      const th=pick(GAME_THEMES);
      return { type:'num',cat:'mul',diff,label:th.label,gameLabel:brainrotLabel(),
        text:`${a} × ${b} = ?`,answer:a*b,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${a}×${b}=${a*b}`},showMul:false,dir:'ltr' };
    },
    div(diff) {
      const r=window.GRADE_CONFIG.ranges.div[diff];
      const b=rnd(r.bMin,r.bMax), q=rnd(r.qMin,r.qMax), a=b*q;
      const th=pick(GAME_THEMES);
      return { type:'num',cat:'div',diff,label:th.label,gameLabel:brainrotLabel(),
        text:`${a.toLocaleString()} ÷ ${b} = ?`,answer:q,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${b}×${q}=${a}`},showMul:false,dir:'ltr' };
    },
    word: null,

    // ══ כפל שברים (כיתה ו) ══
    fractions_mul(diff) {
      const pairs={easy:[[1,2],[1,4],[2,3],[3,4]],medium:[[1,3],[2,5],[3,5],[3,4],[2,3]],hard:[[3,8],[5,8],[4,7],[3,7]]};
      const pool=pairs[diff]||pairs.easy;
      const [n1,d1]=pick(pool), [n2,d2]=pick(pool);
      const rn=n1*n2, rd=d1*d2;
      const gcd=(a,b)=>b===0?a:gcd(b,a%b);
      const g=gcd(rn,rd);
      const ansN=rn/g, ansD=rd/g;
      const stories=[
        `${n1}/${d1} × ${n2}/${d2} = ? (כתוב מנה×מכנה ψ כתוב ${ansN} אם ${ansD}=1, אחרת כתוב מנה בלבד)`,
        `${n1}/${d1} מ-${n2}/${d2} = ?`,
      ];
      // פשוט נשאל על המנה
      return { type:'num',cat:'fractions_mul',diff,label:'½ כפל שברים',gameLabel:'',
        text:`${n1}/${d1} × ${n2}/${d2} = ?/${ansD}  (כתוב את המנה)`,
        answer:ansN,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 מנה: ${n1}×${n2}=${rn}, מכנה: ${d1}×${d2}=${rd}. מצמצמים÷${g}: ${ansN}/${ansD}`},
        showMul:false,dir:'rtl' };
    },

    // ══ חילוק שברים (כיתה ו) ══
    fractions_div(diff) {
      const pairs={easy:[[1,2],[1,4],[2,3],[3,4]],medium:[[1,3],[2,5],[3,5]],hard:[[3,8],[5,8],[4,7]]};
      const pool=pairs[diff]||pairs.easy;
      const [n1,d1]=pick(pool), [n2,d2]=pick(pool);
      // a÷b = a×(1/b) = (n1/d1)÷(n2/d2) = (n1×d2)/(d1×n2)
      const rn=n1*d2, rd=d1*n2;
      const gcd=(a,b)=>b===0?a:gcd(b,a%b);
      const g=gcd(rn,rd);
      const ansN=rn/g, ansD=rd/g;
      return { type:'num',cat:'fractions_div',diff,label:'½ חילוק שברים',gameLabel:'',
        text:`${n1}/${d1} ÷ ${n2}/${d2} = ?/${ansD}  (כתוב את המנה)`,
        answer:ansN,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 הפוך וכפול: ${n1}/${d1} × ${d2}/${n2} = ${rn}/${rd} = ${ansN}/${ansD}`},
        showMul:false,dir:'rtl' };
    },

    // ══ חלק של כמות (כיתה ו) — מציאת כמות הבסיס ══
    fractions_part(diff) {
      const cases={
        easy:[
          ()=>{const d=pick([2,4]),tot=d*rnd(2,8),n=rnd(1,d-1),part=(tot/d)*n;return{text:`${n}/${d} מ-${tot} = ?`,answer:part,hint:`💡 ${tot}÷${d}=${tot/d}. ×${n}=${part}`};},
          ()=>{const d=pick([3,5]),tot=d*rnd(2,6),n=rnd(1,d-1),part=(tot/d)*n;return{text:`${n}/${d} מ-${tot} = ?`,answer:part,hint:`💡 ${tot}÷${d}×${n}=${part}`};},
        ],
        medium:[
          ()=>{const part=rnd(2,8)*2,n=2,d=4,tot=part*d/n;return{text:`2/4 מ-? = ${part}. מצא את הכמות הבסיסית`,answer:tot,hint:`💡 כמות×2/4=${part} → כמות=${part}÷2×4=${tot}`};},
          ()=>{const d=pick([3,5,6]),n=rnd(1,d-1),tot=d*rnd(3,8),part=(tot/d)*n;return{text:`${n}/${d} מ-${tot} = ?`,answer:part,hint:`💡 ${tot}÷${d}×${n}=${part}`};},
        ],
        hard:[
          ()=>{const d=pick([4,5,8]),n=rnd(1,d-1),part=rnd(2,8)*n,tot=part*d/n;return{text:`${n}/${d} מ-? = ${part}. מה הכמות הבסיסית?`,answer:tot,hint:`💡 ${part}÷${n}×${d}=${tot}`};},
          ()=>{const d=pick([3,6,9]),n=rnd(1,d-1),tot=d*rnd(4,10),part=(tot/d)*n;const pct=Math.round(n/d*100);return{text:`${n}/${d} (כלומר ${pct}%) מ-${tot} = ?`,answer:part,hint:`💡 ${tot}×${n}/${d}=${part}`};},
        ],
      };
      const pool=cases[diff]||cases.easy;
      const q=pick(pool)();
      return { type:'num',cat:'fractions_part',diff,label:'½ חלק של כמות',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:q.hint},showMul:false,dir:'rtl' };
    },

    // ══ שברים עשרוניים — כפל וחילוק (כיתה ו) ══
    decimals_mul(diff) {
      const qs={
        easy:[
          ()=>{const n=rnd(2,9),f=pick([10,100]);return{text:`0.${n} × ${f} = ?`,answer:n*(f/10),hint:`💡 0.${n}×${f}=${n*(f/10)}`};},
          ()=>{const n=rnd(2,9);return{text:`0.${n} × 10 = ?`,answer:n,hint:`💡 הזזת נקודה: 0.${n}×10=${n}`};},
          ()=>{const n=rnd(10,90);return{text:`${n} ÷ 10 = ?`,answer:n/10,hint:`💡 ${n}÷10=${n/10}`};},
        ],
        medium:[
          ()=>{const a=rnd(2,8),b=rnd(2,5);return{text:`${a}.${b} × 10 = ?`,answer:parseFloat((a*10+b).toFixed(1)),hint:`💡 ${a}.${b}×10=${a*10+b}`};},
          ()=>{const a=rnd(10,50);return{text:`${a} ÷ 100 = 0.?? (כתוב 100×התשובה)`,answer:a,hint:`💡 ${a}÷100=0.${a<10?'0'+a:a}`};},
          ()=>{const a=rnd(2,5),b=rnd(2,5);return{text:`${a}.${b} × 2 = ?`,answer:parseFloat(((a*10+b)*2/10).toFixed(1)),hint:`💡 ${a}.${b}×2=${((a*10+b)*2/10).toFixed(1)}`};},
        ],
        hard:[
          ()=>{const a=rnd(2,9),b=rnd(2,9);return{text:`0.${a} × 0.${b} = ? (×100 לתשובה)`,answer:a*b,hint:`💡 0.${a}×0.${b}=0.0${a*b<10?'0'+a*b:a*b}`};},
          ()=>{const n=rnd(100,900);return{text:`${n} ÷ 1000 = 0.??? (כתוב 1000×התשובה)`,answer:n,hint:`💡 ${n}÷1000=0.${n}`};},
        ],
      };
      const pool=qs[diff]||qs.easy; const fn=pick(pool); const q=fn();
      return { type:'num',cat:'decimals_mul',diff,label:'🔢 שברים עשרוניים ×÷',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:q.hint},showMul:false,dir:'rtl' };
    },

    // ══ אחוזים (כיתה ו) — ערך האחוז + חישוב האחוז ══
    percentages(diff) {
      const cases={
        easy:[
          // ערך האחוז: מה הוא X% מ-Y?
          ()=>{const tot=pick([100,200,50,400]);const pct=pick([10,25,50]);const ans=tot*pct/100;return{text:`${pct}% מ-${tot} = ?`,answer:ans,hint:`💡 ${tot}×${pct}/100=${ans}`};},
          ()=>{const tot=pick([100,80,40,20]);const pct=pick([50,25,10]);const ans=tot*pct/100;return{text:`${pct}% מ-${tot} = ?`,answer:ans,hint:`💡 ${tot}÷${100/pct}=${ans}`};},
        ],
        medium:[
          // ערך האחוז: מספרים לא עגולים
          ()=>{const tot=rnd(2,10)*20;const pct=pick([10,20,25,50]);const ans=tot*pct/100;return{text:`${pct}% מ-${tot} = ?`,answer:ans,hint:`💡 ${tot}×${pct}/100=${ans}`};},
          // חישוב האחוז: X מ-Y זה כמה אחוז?
          ()=>{const pct=pick([10,20,25,50]);const tot=pick([100,200,80,40]);const part=tot*pct/100;return{text:`${part} מ-${tot} = כמה אחוזים?`,answer:pct,hint:`💡 ${part}/${tot}×100=${pct}%`};},
          ()=>{const tot=rnd(2,8)*25;const pct=pick([10,20,40,50]);const ans=tot*pct/100;return{text:`${pct}% מ-${tot} = ?`,answer:ans,hint:`💡 ${tot}×${pct}/100=${ans}`};},
        ],
        hard:[
          // חישוב אחוז מורכב יותר
          ()=>{const pct=pick([15,20,30,40]);const tot=rnd(2,8)*10;const ans=Math.round(tot*pct/100);return{text:`${pct}% מ-${tot} = ?`,answer:ans,hint:`💡 ${tot}×${pct}/100=${ans}`};},
          ()=>{const tot=rnd(2,10)*20;const part=rnd(1,tot/4)*4;const pct=Math.round(part/tot*100);return Number.isInteger(pct)?{text:`${part} מ-${tot} זה כמה אחוזים?`,answer:pct,hint:`💡 ${part}/${tot}×100=${pct}%`}:{text:`20% מ-${tot} = ?`,answer:tot/5,hint:`💡 ${tot}/5=${tot/5}`};},
          ()=>{const tot=rnd(3,9)*20;const pct=pick([10,20,25,30,40,50]);const ans=tot*pct/100;return{text:`${pct}% מ-${tot} = ?`,answer:ans,hint:`💡 ${tot}×${pct}/100=${ans}`};},
        ],
      };
      const pool=cases[diff]||cases.easy; const q=pick(pool)();
      return { type:'num',cat:'percentages',diff,label:'💯 אחוזים',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:q.hint},showMul:false,dir:'rtl' };
    },

    // ══ יחס (כיתה ו) — הגדרה + חלוקת כמות לפי יחס ══
    ratio(diff) {
      const cases={
        easy:[
          ()=>{const a=rnd(1,4),b=rnd(1,4),k=rnd(2,5),tot=(a+b)*k;const pA=a*k;return{text:`יחס בנים לבנות ${a}:${b}. סך הכל ${tot} ילדים. כמה בנים?`,answer:pA,hint:`💡 ${tot}×${a}/(${a}+${b})=${pA}`};},
          ()=>{const r=rnd(2,4),tot=r*rnd(3,8);return{text:`יחס מיץ למים 1:${r}. יש ${tot} ל' מים. כמה ל' מיץ?`,answer:tot/r,hint:`💡 ${tot}÷${r}=${tot/r}`};},
        ],
        medium:[
          ()=>{const a=rnd(2,4),b=rnd(2,4);const k=rnd(2,5);const tot=(a+b)*k;const pA=a*k;return Number.isInteger(pA)?{text:`חולקים ${tot} ש"ח ביחס ${a}:${b}. הראשון מקבל כמה?`,answer:pA,hint:`💡 ${tot}×${a}/${a+b}=${pA}`}:{text:`יחס 2:3, סך 50 ש"ח. הראשון מקבל?`,answer:20,hint:`💡 50×2/5=20`};},
          ()=>{const scale=pick([100,1000,500]);const map=rnd(2,8);return{text:`קנה מידה 1:${scale}. מרחק במפה: ${map} ס"מ. מרחק אמיתי בס"מ?`,answer:map*scale,hint:`💡 ${map}×${scale}=${map*scale} ס"מ`};},
        ],
        hard:[
          ()=>{const a=rnd(2,4),b=rnd(2,4),c=rnd(2,3);const k=rnd(2,4);const tot=(a+b+c)*k;const pA=a*k;return Number.isInteger(pA)?{text:`חולקים ${tot} ביחס ${a}:${b}:${c}. חלק הראשון?`,answer:pA,hint:`💡 ${tot}×${a}/${a+b+c}=${pA}`}:{text:`חולקים 60 ביחס 2:3:1. חלק הראשון?`,answer:20,hint:`💡 60×2/6=20`};},
          ()=>{const tot=rnd(4,12)*10;const pct=pick([20,25,40,50]);const part=tot*pct/100;return{text:`מ-${tot} תלמידים, ${part} נעדרו. מה יחס הנוכחים לנעדרים? (כתוב נוכחים)`,answer:tot-part,hint:`💡 נוכחים: ${tot}-${part}=${tot-part}`};},
        ],
      };
      const pool=cases[diff]||cases.easy; const q=pick(pool)();
      return { type:'num',cat:'ratio',diff,label:'⚖️ יחס',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:q.hint},showMul:false,dir:'rtl' };
    },

    // ══ מספרים שלמים — מבוא (כיתה ו) ══
    integers_intro(diff) {
      const qs={
        easy:[
          ()=>{const a=rnd(1,8),b=rnd(1,10);return{text:`(-${a}) + ${a+b} = ?`,answer:b,hint:`💡 -${a}+${a+b}=${b}`};},
          ()=>{const t=rnd(-10,-1),r=rnd(1,15);return{text:`טמפרטורה ${t}°. עלתה ב-${r}°. כמה עכשיו?`,answer:t+r,hint:`💡 ${t}+${r}=${t+r}`};},
          ()=>{const a=rnd(1,10);return{text:`מה קטן מ-0 ב-${a}? (מספר שלילי)`,answer:-a,hint:`💡 0-${a}=-${a}`};},
        ],
        medium:[
          ()=>{const a=rnd(2,8),b=rnd(2,8);return{text:`(-${a}) + (-${b}) = ?`,answer:-(a+b),hint:`💡 שני שליליים: -(${a}+${b})=-${a+b}`};},
          ()=>{const a=rnd(3,10),b=rnd(2,a-1);return{text:`(-${a}) + ${b} = ?`,answer:b-a,hint:`💡 -${a}+${b}=${b-a}`};},
          ()=>{const a=rnd(-5,5),b=rnd(1,8);return{text:`מספר ${a} על ישר המספרים. 3 צעדים ימינה = ?`,answer:a+3,hint:`💡 ${a}+3=${a+3}`};},
        ],
        hard:[
          ()=>{const a=rnd(2,6),b=rnd(2,6);return{text:`${a} - ${a+b} = ?`,answer:-b,hint:`💡 ${a}-${a+b}=-${b}`};},
          ()=>{const temps=[-5,-2,0,3,-8,4,-1];const t1=pick(temps),t2=pick(temps);return{text:`טמפרטורה שינתה מ-${t1}° ל-${t2}°. מה השינוי?`,answer:t2-t1,hint:`💡 ${t2}-(${t1})=${t2-t1}`};},
          ()=>{const a=rnd(2,6),b=rnd(2,6);return{text:`(-${a}) - (-${b}) = ?`,answer:b-a,hint:`💡 -${a}+${b}=${b-a}`};},
        ],
      };
      const pool=qs[diff]||qs.easy; const q=pick(pool)();
      return { type:'num',cat:'integers_intro',diff,label:'➖ מספרים שלמים',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:q.hint},showMul:false,dir:'rtl' };
    },

    // ══ גאומטריה ══
    perimeter(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('perimeter',diff);
      const r=rnd(3,diff==='hard'?12:7);
      return { type:'num',cat:'perimeter',diff,label:'📏 היקף',gameLabel:'',
        text:`היקף עיגול רדיוס ${r} ס"מ. (π≈3.14, עגל למספר שלם)`,
        answer:Math.round(2*3.14*r),pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 2×3.14×${r}≈${Math.round(2*3.14*r)}`},showMul:false,dir:'rtl' };
    },
    area(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('area',diff);
      const r=rnd(2,diff==='hard'?8:5);
      return { type:'num',cat:'area',diff,label:'📐 שטח',gameLabel:'',
        text:`שטח עיגול רדיוס ${r} ס"מ. (π≈3.14, עגל)`,
        answer:Math.round(3.14*r*r),pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 3.14×${r}²≈${Math.round(3.14*r*r)}`},showMul:false,dir:'rtl' };
    },
    volume(diff) {
      // נפחי גופים — כיתה ו (תיבה + גליל)
      const type=diff==='easy'?'box':pick(['box','cylinder']);
      if(type==='cylinder'){
        const r=rnd(2,6),h=rnd(3,10);
        const v=Math.round(3.14*r*r*h);
        return { type:'num',cat:'volume',diff,label:'🧊 נפח',gameLabel:'',
          text:`נפח גליל: רדיוס ${r} ס"מ, גובה ${h} ס"מ (π≈3.14, עגל)`,
          answer:v,pts:window.GRADE_CONFIG.pts[diff],
          hint:{type:'text',msg:`💡 π×${r}²×${h}≈${v} ס"מ³`},showMul:false,dir:'rtl' };
      }
      const l=rnd(2,diff==='hard'?10:8),w=rnd(2,8),h=rnd(2,6);
      return { type:'num',cat:'volume',diff,label:'🧊 נפח',gameLabel:'',
        text:`נפח תיבה: ${l}×${w}×${h} ס"מ = ?`,answer:l*w*h,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${l}×${w}×${h}=${l*w*h} ס"מ³`},showMul:false,dir:'rtl' };
    },
    circle(diff) {
      // מעגל ועיגול — היקף + שטח
      const r=rnd(2,diff==='hard'?10:7);
      const circ=Math.round(2*3.14*r);
      const area=Math.round(3.14*r*r);
      const q=Math.random()<0.5
        ?{text:`היקף עיגול עם רדיוס ${r} ס"מ (π≈3.14, עגל)`,answer:circ,hint:`💡 2×π×r=2×3.14×${r}≈${circ} ס"מ`}
        :{text:`שטח עיגול עם רדיוס ${r} ס"מ (π≈3.14, עגל)`,answer:area,hint:`💡 π×r²=3.14×${r*r}≈${area} ס"מ²`};
      return { type:'num',cat:'circle',diff,label:'⭕ מעגל',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:q.hint},showMul:false,dir:'rtl' };
    },
    scale(diff) {
      const scales=diff==='easy'?[100,200]:diff==='medium'?[500,1000]:pick([[2000,5000,10000]]);
      const scale=typeof scales==='number'?scales:pick(scales);
      const mapDist=rnd(2,diff==='easy'?5:diff==='medium'?8:12);
      const realDist=mapDist*scale;
      const q=Math.random()<0.6
        ?{text:`קנה מידה 1:${scale}. מרחק במפה: ${mapDist} ס"מ. מרחק אמיתי בס"מ?`,answer:realDist,hint:`💡 ${mapDist}×${scale}=${realDist} ס"מ`}
        :{text:`קנה מידה 1:${scale}. מרחק אמיתי: ${realDist} ס"מ. במפה כמה ס"מ?`,answer:mapDist,hint:`💡 ${realDist}÷${scale}=${mapDist} ס"מ`};
      return { type:'num',cat:'scale',diff,label:'🗺️ קנה מידה',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:q.hint},showMul:false,dir:'rtl' };
    },
    data(diff) {
      // ממוצע, חציון, שכיח, טווח — כיתה ו
      const n=rnd(4,7);
      const vals=Array.from({length:n},()=>rnd(diff==='easy'?5:diff==='medium'?10:20,diff==='easy'?30:diff==='medium'?60:100));
      const sum=vals.reduce((a,b)=>a+b,0);
      const avg=Math.round(sum/n);
      const sorted=[...vals].sort((a,b)=>a-b);
      const median=n%2===0?(sorted[n/2-1]+sorted[n/2])/2:sorted[Math.floor(n/2)];
      const mx=Math.max(...vals), mn=Math.min(...vals), range=mx-mn;
      const type=pick(diff==='easy'?['max','avg']:diff==='medium'?['avg','median']:['avg','median','range']);
      const q=type==='max'?{text:`הנתונים: ${vals.join(', ')}. מה הגדול?`,answer:mx,hint:`💡 ${mx}`}
              :type==='avg'?{text:`הנתונים: ${vals.join(', ')}. מה הממוצע? (עגל)`,answer:avg,hint:`💡 ${sum}÷${n}≈${avg}`}
              :type==='median'?{text:`הנתונים: ${vals.join(', ')}. מה החציון?`,answer:Math.round(median),hint:`💡 מסודר: ${sorted.join(',')}. אמצע: ${Math.round(median)}`}
              :{text:`הנתונים: ${vals.join(', ')}. מה הטווח?`,answer:range,hint:`💡 ${mx}-${mn}=${range}`};
      return { type:'num',cat:'data',diff,label:'📊 נתונים וסטטיסטיקה',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:q.hint},showMul:false,dir:'rtl' };
    },
    measurement(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('measurement',diff);
      const qs={
        easy:[
          {text:"מעבר בין יחידות: 2.5 מ' = כמה ס\"מ?",answer:250,hint:"💡 2.5×100=250 ס\"מ"},
          {text:"3.5 ק\"ג = כמה גרם?",answer:3500,hint:"💡 3.5×1000=3500 גרם"},
          {text:"0.75 ליטר = כמה מ\"ל?",answer:750,hint:"💡 0.75×1000=750 מ\"ל"},
        ],
        medium:[
          {text:"1 דונם = 1000 מ\"ר. שדה 3.5 דונם = כמה מ\"ר?",answer:3500,hint:"💡 3.5×1000=3500 מ\"ר"},
          {text:"כמה ס\"מ² ב-0.5 מ\"ר?",answer:5000,hint:"💡 0.5×10000=5000 ס\"מ²"},
        ],
        hard:[
          {text:"ריצוף חדר 6×4 מ' עם אריחים 30×30 ס\"מ. כמה אריחים?",answer:Math.round(6*4/(0.3*0.3)),hint:"💡 24מ\"ר÷0.09מ\"ר="+Math.round(6*4/(0.3*0.3))+" אריחים"},
          {text:"1 מ\"ר = כמה ס\"מ²?",answer:10000,hint:"💡 100×100=10,000 ס\"מ²"},
        ],
      };
      const q=pick(qs[diff]||qs.easy);
      return { type:'num',cat:'measurement',diff,label:'📏 מדידה',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:q.hint},showMul:false,dir:'rtl' };
    },
  },
};
