// ══════════════════════════════════════════════
// GRADE 3 — כיתה ג
// חיבור, חיסור, כפל, חילוק, שברים פשוטים, היקף, שטח, זוויות,
// כסף, זמן, דפוסים, מדידה
// מספרים: עד 1000
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'ג',
  gradeName: 'כיתה ג',
  gradeEmoji: '⚡',
  gradeColor: '#1e90ff',

  availableCategories: ['add','sub','mul','div','word','fractions_intro','perimeter','area','angles','patterns1','time','money','measurement'],
  availableLearnTopics: ['division','shapes','perimeter_learn','area_learn','angles_learn','measurement_learn'],
  availableExamTopics:  ['add','sub','mul','div','word','fractions_intro','perimeter','area','angles','time','money','measurement'],

  ranges: {
    add: { easy:{aMin:20,aMax:99,bMin:10,bMax:99}, medium:{aMin:100,aMax:500,bMin:50,bMax:500}, hard:{aMin:200,aMax:999,bMin:100,bMax:999} },
    sub: { easy:{aMin:20,aMax:99}, medium:{aMin:100,aMax:500}, hard:{aMin:200,aMax:999} },
    mul: { easy:{aMin:2,aMax:6,bMin:2,bMax:6}, medium:{aMin:3,aMax:9,bMin:3,bMax:9}, hard:{aMin:6,aMax:12,bMin:6,bMax:12} },
    div: { easy:{bMin:2,bMax:5,qMin:1,qMax:6}, medium:{bMin:2,bMax:9,qMin:2,qMax:9}, hard:{bMin:3,bMax:12,qMin:3,qMax:12} },
  },

  pts: { easy:5, medium:12, hard:20 },
  welcome: 'כיתה ג — גם חילוק, שברים, היקף ושטח! ⚡',
  tip: 'היקף = סכום כל הצלעות! 📏',

  generators: {
    add(diff) {
      const r=window.GRADE_CONFIG.ranges.add[diff];
      const a=rnd(r.aMin,r.aMax), b=rnd(r.bMin,r.bMax);
      const th=pick(GAME_THEMES); const e=pick(th.items);
      const stories=[
        `${a} + ${b} = ?`,
        `בספריה יש ${a} ספרים בעברית ו-${b} בערבית. כמה ספרים יש?`,
        `אספנו ${a} קילוגרם אשפה ביום ראשון ו-${b} ביום שני. כמה בסך הכל?`,
        `בעיר יש ${a} ילדים בגן וביסודי ${b}. כמה ילדים בסך הכל?`,
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
        `${total} - ${b} = ?`,
        `היו ${total} ספרים. הושאלו ${b}. כמה נשארו?`,
        `מרחק הטיול ${total} מטר. עברנו ${b}. כמה נותר?`,
      ];
      return {type:'num',cat:'sub',diff,label:th.label,gameLabel:brainrotLabel(),
        text:pick(stories),answer:a,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'cubes',total,remove:b},showMul:false,dir:'rtl'};
    },
    mul(diff) {
      const r=window.GRADE_CONFIG.ranges.mul[diff];
      const a=rnd(r.aMin,r.aMax), b=rnd(r.bMin,r.bMax);
      const th=pick(GAME_THEMES); const e=pick(th.items);
      const stories=[
        `${a} שורות של ${b} ${e} כל שורה. כמה בסך הכל?`,
        `${b} ימים, בכל יום ${a} שעות לימוד. כמה שעות בסך הכל?`,
        `${a} × ${b} = ?`,
        `כל אחד מ-${a} ילדים הביא ${b} ${e}. כמה ${e} יש?`,
      ];
      const emoji=pick(th.items);
      return {type:'num',cat:'mul',diff,label:th.label,gameLabel:brainrotLabel(),
        text:pick(stories),answer:a*b,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'groups',a,b,emoji},showMul:true,mulA:a,mulB:b,mulEmoji:emoji,dir:'rtl'};
    },
    div(diff) {
      const r=window.GRADE_CONFIG.ranges.div[diff];
      const b=rnd(r.bMin,r.bMax), q=rnd(r.qMin,r.qMax), a=b*q;
      const th=pick(GAME_THEMES); const e=pick(th.items);
      const stories=[
        `${a} ÷ ${b} = ?`,
        `${a} ${e} מחולקים שווה ל-${b} ילדים. כמה קיבל כל ילד?`,
        `${a} ממתקים מחולקים ל-${b} קבוצות שוות. כמה בכל קבוצה?`,
        `לכל ילד מגיע ${q} ${e}. יש ${b} ילדים. כמה ${e} נחלק? (כתוב ${a}÷${b})`,
      ];
      const emoji=pick(th.items);
      return {type:'num',cat:'div',diff,label:th.label,gameLabel:brainrotLabel(),
        text:pick(stories),answer:q,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'groups',a:q,b,emoji},showMul:true,mulA:q,mulB:b,mulEmoji:emoji,dir:'rtl'};
    },
    word: null,
    fractions_intro(diff) {
      // שברים פשוטים — מה החלק מהשלם
      const cases={
        easy:[
          {text:'חילקנו פיצה ל-2 חתיכות שוות. אכלתי חתיכה אחת. מה החלק שאכלתי? (כתוב 1 מתוך 2)',answer:1,hint:'1/2 = חצי'},
          {text:'עוגה חולקה ל-4 חלקים שווים. לקחתי חלק אחד. כמה חלקים מ-4 לקחתי?',answer:1,hint:'1 מתוך 4'},
          {text:'מה גדול יותר: 1/2 או 1/4? (כתוב 2 אם 1/2, כתוב 4 אם 1/4)',answer:2,hint:'½ גדול מ-¼'},
        ],
        medium:[
          () => { const d=pick([2,4,3]); const n=rnd(1,d-1); const tot=d*rnd(2,6); return {text:`${n}/${d} מתוך ${tot} = ?`,answer:(tot/d)*n,hint:`${tot}÷${d}=${tot/d}, כפול ${n} = ${(tot/d)*n}`}; },
          () => { const d=4; const tot=rnd(2,6)*d; const n=3; return {text:`3/4 מתוך ${tot} = ?`,answer:3*tot/4,hint:`${tot}÷4=${tot/4}, כפול 3 = ${3*tot/4}`}; },
        ],
        hard:[
          () => { const d=pick([3,5,6]); const n=rnd(1,d-1); const tot=d*rnd(3,8); return {text:`${n}/${d} מתוך ${tot} = ?`,answer:(tot/d)*n,hint:`${tot}÷${d}=${tot/d}, ×${n}=${(tot/d)*n}`}; },
        ],
      };
      const pool=cases[diff]||cases.easy;
      const item=pick(pool); const q=typeof item==='function'?item():item;
      return {type:'num',cat:'fractions_intro',diff,label:'½ שברים',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${q.hint}`},showMul:false,dir:'rtl'};
    },
    perimeter(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('perimeter',diff);
      const s=rnd(2,10); return {type:'num',cat:'perimeter',diff,label:'📏 היקף',gameLabel:'',
        text:`היקף ריבוע עם צלע ${s} ס"מ = ?`,answer:4*s,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 4×${s}=${4*s}`},showMul:false,dir:'rtl'};
    },
    area(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('area',diff);
      const w=rnd(2,8),h=rnd(2,6); return {type:'num',cat:'area',diff,label:'📐 שטח',gameLabel:'',
        text:`שטח מלבן ${w}×${h} = ?`,answer:w*h,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${w}×${h}=${w*h}`},showMul:false,dir:'rtl'};
    },
    angles(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('angles',diff);
      return {type:'num',cat:'angles',diff,label:'📐 זוויות',gameLabel:'',
        text:'זווית ישרה = כמה מעלות?',answer:90,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:'💡 זווית ישרה = 90°'},showMul:false,dir:'rtl'};
    },
    patterns1(diff) {
      const pools={
        easy:[{seq:'3,6,9,12',next:15,hint:'לוח ה-3'},{seq:'4,8,12,16',next:20,hint:'לוח ה-4'},{seq:'100,200,300',next:400,hint:'ספירה ב-100'}],
        medium:[{seq:'1,3,9,27',next:81,hint:'כופלים ב-3 כל פעם'},{seq:'5,10,20,40',next:80,hint:'כופלים ב-2'},{seq:'50,45,40,35',next:30,hint:'יורדים ב-5'}],
        hard:[{seq:'1,4,9,16,25',next:36,hint:'מספרים ריבועיים: 6²=36'},{seq:'2,6,18,54',next:162,hint:'כופלים ב-3'},{seq:'500,400,300,200',next:100,hint:'יורדים ב-100'}],
      };
      const p=pick(pools[diff]||pools.easy);
      return {type:'num',cat:'patterns1',diff,label:'🔄 דפוסים',gameLabel:'',
        text:`הסדרה: ${p.seq} , ___ — מה הבא?`,answer:p.next,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${p.hint}`},showMul:false,dir:'rtl'};
    },
    time(diff) {
      const qs={
        easy:[
          {text:'שיעור ארך 45 דקות. התחיל ב-8:00. מתי נגמר? (כתוב 845 עבור 8:45)',answer:845,hint:'8:00 + 45 דקות = 8:45'},
          {text:'כמה דקות ב-3 שעות?',answer:180,hint:'3 × 60 = 180'},
          {text:'כמה שעות מ-9:00 עד 14:00?',answer:5,hint:'14 - 9 = 5 שעות'},
        ],
        medium:[
          {text:'הסרט ארך שעה ו-20 דקות. כמה דקות זה?',answer:80,hint:'60 + 20 = 80 דקות'},
          {text:'ממתינים מ-10:15 עד 11:00. כמה דקות?',answer:45,hint:'מ-10:15 עד 11:00 = 45 דקות'},
          {text:'כמה דקות ב-2.5 שעות?',answer:150,hint:'2.5 × 60 = 150 דקות'},
        ],
        hard:[
          {text:'הטיול התחיל ב-7:30 וארך 4 שעות ו-15 דקות. מתי נגמר? (כתוב 1145 עבור 11:45)',answer:1145,hint:'7:30 + 4ש 15ד = 11:45'},
          {text:'כמה שניות ב-3 דקות?',answer:180,hint:'3 × 60 = 180 שניות'},
          {text:'כמה דקות ב-2 ימים?',answer:2880,hint:'2 × 24 × 60 = 2880'},
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
          ()=>{const p=rnd(5,20),n=rnd(2,5);return{text:`קניתי ${n} ${pick(['מדבקות','ממתקים','עפרונות'])} ב-${p} ש"ח כל אחד. כמה שילמתי?`,answer:p*n,hint:`${n}×${p}=${p*n}`};},
          ()=>{const t=rnd(20,50),s=rnd(5,Math.floor(t/2));return{text:`קניתי ב-${s} ש"ח ונתתי ${t} ש"ח. כמה עודף?`,answer:t-s,hint:`${t}-${s}=${t-s}`};},
        ],
        medium:[
          ()=>{const p=rnd(8,20),n=rnd(3,7),disc=rnd(2,5);return{text:`קניתי ${n} פריטים ב-${p} ש"ח כל אחד והנחה ${disc} ש"ח. כמה שילמתי?`,answer:p*n-disc,hint:`${n}×${p}=${p*n}, פחות ${disc}=${p*n-disc}`};},
          ()=>{const pp=rnd(5,15),b=rnd(2,4),c=rnd(3,6);return{text:`${b} ספרים ב-${pp} ש"ח ו-${c} עטים ב-3 ש"ח. כמה בסך הכל?`,answer:b*pp+c*3,hint:`${b}×${pp}+${c}×3=${b*pp+c*3}`};},
        ],
        hard:[
          ()=>{const budget=rnd(50,100),p=rnd(8,15),n=Math.floor(budget/p);const left=budget-n*p;return{text:`יש לי ${budget} ש"ח. כרטיס עולה ${p} ש"ח. כמה עודף ישאר אחרי שאקנה כמה שאפשר?`,answer:left,hint:`${budget}÷${p}=${n} כרטיסים, ${n}×${p}=${n*p}, עודף ${left}`};},
        ],
      };
      const pool=fns[diff]||fns.easy; const q=pick(pool)();
      return {type:'num',cat:'money',diff,label:'💰 כסף',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${q.hint}`},showMul:false,dir:'rtl'};
    },
    measurement(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('measurement',diff);
      return {type:'num',cat:'measurement',diff,label:'📏 מדידה',gameLabel:'',
        text:"1 ק\"מ = כמה מ'?",answer:1000,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:"💡 1 ק\"מ = 1000 מ'"},showMul:false,dir:'rtl'};
    },
  },
};
