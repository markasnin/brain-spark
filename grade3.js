// ══════════════════════════════════════════════
// GRADE 3 — כיתה ג  |  תוכנית משרד החינוך תשס"ו
// ────────────────────────────────────────────
// מספרים: עד 10,000, מבנה עשרוני, ישר מספרים
// פעולות: 4 פעולות, סדר פעולות+סוגריים, עיגול+אומדן
//          כפל דו-ספרתי בחד-ספרתי, חילוק עם שארית
// גאומטריה (מישור): זוויות, מאונכות, מקביליות
//                    משולשים+מרובעים — תכונות צלעות וזוויות
// מדידה: אורך (כל יחידות), נפח (השוואה), משקל+זמן ביחידות מקובלות
// שברים: שברי יחידה (½⅓¼...) — היכרות ללא סמלים פורמליים מלאים
//         חלק של כמות (כמה הוא שליש של 21?)
// חקר נתונים: דיאגרמת עמודות — בניה וקריאה
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'ג',
  gradeName: 'כיתה ג',
  gradeEmoji: '⚡',
  gradeColor: '#1e90ff',

  availableCategories: ['add','sub','mul','div','word','fractions_unit','angles','measurement','data','rounding'],
  availableLearnTopics: ['division','shapes','angles_learn','measurement_learn'],
  availableExamTopics:  ['add','sub','mul','div','word','fractions_unit','angles','measurement','data','rounding'],

  ranges: {
    add: {
      easy:   { aMin:20,  aMax:99,   bMin:10,  bMax:99  },
      medium: { aMin:100, aMax:999,  bMin:50,  bMax:999 },
      hard:   { aMin:500, aMax:5000, bMin:100, bMax:4999},
    },
    sub: {
      easy:   { aMin:20,  aMax:99   },
      medium: { aMin:100, aMax:999  },
      hard:   { aMin:500, aMax:5000 },
    },
    mul: {
      // כפל: דו-ספרתי × חד-ספרתי; לוח עד 100
      easy:   { aMin:2, aMax:9,  bMin:2, bMax:5  },
      medium: { aMin:2, aMax:9,  bMin:2, bMax:9  },
      hard:   { aMin:10,aMax:30, bMin:2, bMax:9  },  // דו-ספרתי בחד-ספרתי
    },
    div: {
      // חילוק: חד-ספרתי (עם שארית)
      easy:   { bMin:2, bMax:5,  qMin:1, qMax:6  },
      medium: { bMin:2, bMax:9,  qMin:2, qMax:9  },
      hard:   { bMin:2, bMax:9,  qMin:3, qMax:12 },
    },
  },

  pts: { easy:5, medium:12, hard:20 },
  welcome: 'כיתה ג — 4 פעולות, שברי יחידה, זוויות ואומדן! ⚡',
  tip: 'שלישית מ-21: 21÷3=7 💡',

  generators: {
    add(diff) {
      const r = window.GRADE_CONFIG.ranges.add[diff];
      const a = rnd(r.aMin,r.aMax), b = rnd(r.bMin,r.bMax);
      const th = pick(GAME_THEMES);
      return { type:'num',cat:'add',diff,label:th.label,gameLabel:brainrotLabel(),
        text:`${a} + ${b} = ?`,answer:a+b,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'decompose',a,b},showMul:false,dir:'ltr' };
    },
    sub(diff) {
      const r = window.GRADE_CONFIG.ranges.sub[diff];
      const total = rnd(r.aMin,r.aMax), b = rnd(1,Math.floor(total/2)), a=total-b;
      const th = pick(GAME_THEMES);
      return { type:'num',cat:'sub',diff,label:th.label,gameLabel:brainrotLabel(),
        text:`${total} - ${b} = ?`,answer:a,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${total} - ${b} = ${a}`},showMul:false,dir:'ltr' };
    },
    mul(diff) {
      const r = window.GRADE_CONFIG.ranges.mul[diff];
      const a=rnd(r.aMin,r.aMax), b=rnd(r.bMin,r.bMax);
      const th=pick(GAME_THEMES); const emoji=pick(th.items);
      return { type:'num',cat:'mul',diff,label:th.label,gameLabel:brainrotLabel(),
        text:`${a} × ${b} = ?`,answer:a*b,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'groups',a,b,emoji},showMul:true,mulA:a,mulB:b,mulEmoji:emoji,dir:'ltr' };
    },
    div(diff) {
      const r = window.GRADE_CONFIG.ranges.div[diff];
      const b=rnd(r.bMin,r.bMax), q=rnd(r.qMin,r.qMax);
      const remainder = diff==='hard' ? rnd(0,b-1) : 0;
      const a=b*q+remainder;
      const th=pick(GAME_THEMES); const emoji=pick(th.items);
      const txt = remainder > 0 ? `${a} ÷ ${b} = ? (שארית)` : `${a} ÷ ${b} = ?`;
      return { type:'num',cat:'div',diff,label:th.label,gameLabel:brainrotLabel(),
        text:txt,answer:q,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'groups',a:q,b,emoji},showMul:true,mulA:q,mulB:b,mulEmoji:emoji,dir:'ltr' };
    },
    word: null,
    fractions_unit(diff) {
      // שברי יחידה — חלק של כמות (תוכנית כיתה ג): כמה הוא שליש של 21?
      const cases = {
        easy: [
          ()=>{const d=pick([2,4]);const tot=d*rnd(2,5);const ans=tot/d;return{text:`חצי מ-${tot} = ?`,answer:ans,hint:`💡 ${tot}÷2=${ans}`};},
          ()=>{const d=4;const tot=d*rnd(1,4);const ans=tot/d;return{text:`רבע מ-${tot} = ?`,answer:ans,hint:`💡 ${tot}÷4=${ans}`};},
          ()=>{const d=3;const tot=d*rnd(2,5);const ans=tot/d;return{text:`שליש מ-${tot} = ?`,answer:ans,hint:`💡 ${tot}÷3=${ans}`};},
        ],
        medium: [
          ()=>{const d=pick([3,5,6]);const tot=d*rnd(2,6);const ans=tot/d;return{text:`חמישית מ-${tot} = ?`,answer:ans,hint:`💡 ${tot}÷${d}=${ans}`};},
          ()=>{const d=pick([3,4,5]);const tot=d*rnd(2,5);const ans=tot/d;return{text:`כמה זה שישית של ${d*rnd(2,4)*1}? (בעצם: שישית מ-${tot})`,answer:tot/6>0?Math.floor(tot/6):ans,hint:`💡 ${tot}÷6=${Math.floor(tot/6)}`};},
          ()=>{const d=5;const tot=d*rnd(2,7);const ans=tot/d;return{text:`חמישית מ-${tot} = ?`,answer:ans,hint:`💡 ${tot}÷5=${ans}`};},
        ],
        hard: [
          ()=>{const d=pick([6,7,8,9,10]);const tot=d*rnd(2,6);const ans=tot/d;return{text:`כמה זה אחד מ-${d} של ${tot}?`,answer:ans,hint:`💡 ${tot}÷${d}=${ans}`};},
          ()=>{const d=pick([4,6,8]);const tot=d*rnd(3,8);const ans=tot/d;return{text:`בשעה יש 60 דקות. איזה חלק של שעה הוא ${ans} דקות? (כמה חלקים מ-${d})`,answer:1,hint:`💡 ${ans} דקות = 1/${d} שעה`};},
        ],
      };
      const pool=cases[diff]||cases.easy;
      const item=pick(pool); const q=item();
      return { type:'num',cat:'fractions_unit',diff,label:'½ שברי יחידה',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:q.hint},showMul:false,dir:'rtl' };
    },
    angles(diff) {
      // זוויות ומאונכות ומקביליות — כיתה ג
      if (window.genGeometryCategory) return window.genGeometryCategory('angles',diff);
      const qs=[
        {text:'זווית ישרה = כמה מעלות?',answer:90,hint:'💡 זווית ישרה = 90°'},
        {text:'זווית קהה — היא גדולה או קטנה מ-90°? (כתוב 1 לגדולה, 2 לקטנה)',answer:1,hint:'💡 קהה > 90°'},
        {text:'זווית חדה — היא גדולה או קטנה מ-90°? (כתוב 1 לגדולה, 2 לקטנה)',answer:2,hint:'💡 חדה < 90°'},
        {text:'כמה זוויות יש למשולש?',answer:3,hint:'💡 משולש = 3 זוויות'},
      ];
      const q=pick(qs);
      return { type:'num',cat:'angles',diff,label:'📐 זוויות',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:q.hint},showMul:false,dir:'rtl' };
    },
    rounding(diff) {
      // עיגול ואומדן — כיתה ג
      const tens=[10,100];
      const to=diff==='easy'?10:diff==='medium'?100:pick(tens);
      const n=rnd(diff==='easy'?11:diff==='medium'?101:11, diff==='easy'?99:diff==='medium'?999:999);
      const rounded=Math.round(n/to)*to;
      return { type:'num',cat:'rounding',diff,label:'🔢 עיגול',gameLabel:'',
        text:`עגל את ${n} ל${to===10?'עשרה':'מאה'} הקרוב`,
        answer:rounded,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${n} קרוב יותר ל-${rounded}`},showMul:false,dir:'rtl' };
    },
    measurement(diff) {
      // כל יחידות המידה — כיתה ג
      if (window.genGeometryCategory) return window.genGeometryCategory('measurement',diff);
      const qs={
        easy:[
          {text:"1 ק\"מ = כמה מ'?",answer:1000,hint:"💡 1 ק\"מ = 1000 מ'"},
          {text:"1 ק\"ג = כמה גרם?",answer:1000,hint:"💡 1 ק\"ג = 1000 גרם"},
          {text:"כמה דקות בשעה?",answer:60,hint:"💡 1 שעה = 60 דקות"},
          {text:"1 מ' = כמה ס\"מ?",answer:100,hint:"💡 1 מ' = 100 ס\"מ"},
        ],
        medium:[
          {text:"2 ק\"מ = כמה מ'?",answer:2000,hint:"💡 2×1000=2000 מ'"},
          {text:"3 ק\"ג = כמה גרם?",answer:3000,hint:"💡 3×1000=3000 גרם"},
          {text:"כמה דקות ב-2 שעות?",answer:120,hint:"💡 2×60=120 דקות"},
          {text:"500 גרם = כמה חצאי ק\"ג?",answer:1,hint:"💡 500 גרם = חצי ק\"ג"},
        ],
        hard:[
          {text:"2500 מ' = כמה ק\"מ ועוד כמה מ'? (כתוב המ' שנשארים)",answer:500,hint:"💡 2500=2ק\"מ ו-500מ'"},
          {text:"3 שעות ו-30 דקות = כמה דקות בסך הכל?",answer:210,hint:"💡 3×60+30=210 דקות"},
          {text:"1.5 ק\"ג = כמה גרם?",answer:1500,hint:"💡 1.5×1000=1500 גרם"},
        ],
      };
      const q=pick(qs[diff]||qs.easy);
      return { type:'num',cat:'measurement',diff,label:'📏 מדידה',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:q.hint},showMul:false,dir:'rtl' };
    },
    data(diff) {
      const items=['ספרים','כדורים','תפוחים','מחברות','עטים'];
      const n=rnd(3,5);
      const chosen=items.slice(0,n);
      const vals=chosen.map(()=>rnd(diff==='easy'?2:diff==='medium'?10:20, diff==='easy'?15:diff==='medium'?40:80));
      const sum=vals.reduce((s,v)=>s+v,0);
      const mx=Math.max(...vals);
      const type=diff==='easy'?'max':diff==='medium'?'sum':'diff';
      const rows=chosen.map((c,i)=>`${c}: ${vals[i]}`).join(', ');
      const q=type==='max'
        ?{text:`דיאגרמת עמודות: ${rows}. מה הערך הגדול ביותר?`,answer:mx,hint:`💡 הגדול ביותר: ${mx}`}
        :type==='sum'
        ?{text:`הנתונים: ${rows}. מה הסכום?`,answer:sum,hint:`💡 ${vals.join('+')}=${sum}`}
        :{text:`הנתונים: ${rows}. מה ההפרש בין הגדול לקטן ביותר?`,answer:mx-Math.min(...vals),hint:`💡 ${mx}-${Math.min(...vals)}=${mx-Math.min(...vals)}`};
      return { type:'num',cat:'data',diff,label:'📊 חקר נתונים',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:q.hint},showMul:false,dir:'rtl' };
    },
  },
};
