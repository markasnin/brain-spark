// ══════════════════════════════════════════════
// GRADE 5 — כיתה ה  |  תוכנית משרד החינוך תשס"ו
// ────────────────────────────────────────────
// מספרים: ללא הגבלה, 4 פעולות, סדר פעולות, אומדן
// שברים פשוטים: הרחבה וצמצום, חיבור+חיסור (עם מכנים קרובים),
//               מספרים מעורבים, כפל שלם×שבר,
//               משמעויות: חלק מהשלם, חלק מכמות, נקודה על ישר מספרים
// שברים עשרוניים: קריאה, ייצוגים שונים, חיבור+חיסור, השוואה, עיגול
//                  שבר עשרוני כשבר שמכנהו 10/100/1000
// אחוזים: היכרות ראשונה בלבד (לא חישובי אחוז מלאים!)
// גאומטריה (מישור — כיתה ה!): מרובעים (תכונות, מיון, קשרי הכלה)
//                               ריצוף, גבהים במשולש ובמקבילית
//                               שטחים והיקפים של מצולעים
//                               סימטריה במרובעים
// חקר נתונים: ממוצע (חישוב, תכונות), טבלאות
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'ה',
  gradeName: 'כיתה ה',
  gradeEmoji: '🏆',
  gradeColor: '#ff6348',

  availableCategories: ['add','sub','mul','div','word','fractions','decimals','percentages_intro','perimeter','area','data','measurement'],
  availableLearnTopics: ['division','shapes','fractions','perimeter_learn','area_learn','measurement_learn','percentages_learn'],
  availableExamTopics:  ['add','sub','mul','div','word','fractions','decimals','percentages_intro','perimeter','area','data','measurement'],

  ranges: {
    add: {
      easy:   { aMin:500,   aMax:9999,  bMin:200,  bMax:9999  },
      medium: { aMin:5000,  aMax:99999, bMin:1000, bMax:99999 },
      hard:   { aMin:10000, aMax:999999,bMin:5000, bMax:999999},
    },
    sub: {
      easy:   { aMin:500,   aMax:9999   },
      medium: { aMin:5000,  aMax:99999  },
      hard:   { aMin:10000, aMax:999999 },
    },
    mul: {
      easy:   { aMin:10, aMax:99,  bMin:2,  bMax:9  },
      medium: { aMin:10, aMax:99,  bMin:10, bMax:99 },
      hard:   { aMin:20, aMax:999, bMin:10, bMax:99 },
    },
    div: {
      easy:   { bMin:2,  bMax:9,  qMin:5,  qMax:30 },
      medium: { bMin:10, bMax:99, qMin:2,  qMax:9  },
      hard:   { bMin:10, bMax:99, qMin:10, qMax:99 },
    },
    fractions: {
      easy:   { pairs:[[1,2],[1,4],[3,4],[1,3],[2,3]],             totalMax:40  },
      medium: { pairs:[[1,5],[2,5],[3,5],[4,5],[1,6],[5,6],[1,8]], totalMax:80  },
      hard:   { pairs:[[3,8],[5,8],[7,8],[2,7],[4,9],[7,9]],       totalMax:120 },
    },
  },

  pts: { easy:7, medium:15, hard:25 },
  welcome: 'כיתה ה — שברים, עשרוניים, שטחים ואחוזים ראשונים! 🏆',
  tip: 'הרחבת שבר: ½ = 2/4 = 3/6 = 4/8 🔢',

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
      const th=pick(GAME_THEMES); const emoji=pick(th.items);
      const stories=[
        `${a} × ${b} = ?`,
        `${a} שורות של ${b} עצים. כמה עצים?`,
        `${b} ימים × ${a} ש"ח = כמה ש"ח?`,
      ];
      return { type:'num',cat:'mul',diff,label:th.label,gameLabel:brainrotLabel(),
        text:pick(stories),answer:a*b,pts:window.GRADE_CONFIG.pts[diff],
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
      // שברים פשוטים — כולל הרחבה וצמצום, חיבור/חיסור, מספרים מעורבים, כפל שלם×שבר
      const r=window.GRADE_CONFIG.ranges.fractions[diff];
      const [n,d]=pick(r.pairs);
      const total=rnd(d,Math.floor(r.totalMax/d))*d;
      const part=(total/d)*n;
      const th=pick(GAME_THEMES);
      const mulWhole=rnd(2,8); // לכפל שלם × שבר
      const mulResult=mulWhole*n; // כפל שלם בשבר (מנה)
      const stories=[
        // חלק מכמות
        `${n}/${d} מתוך ${total} = ?`,
        `מ-${total} תלמידים, ${n}/${d} בנות. כמה בנות?`,
        // חיבור שברים (מכנה זהה)
        `${n}/${d} + ${n}/${d} = ${2*n}/${d} = ? (כתוב מנה בלבד)`,
        // כפל שלם × שבר: 3 × (2/5) = 6/5 — שלב א' פשוט
        `${mulWhole} × (1/${d}) = ?/${d}   (כתוב מנה)`,
      ];
      const idx=Math.floor(Math.random()*stories.length);
      let answer, hint;
      if(idx===0||idx===1){answer=part;hint=`💡 ${total}÷${d}=${total/d}. ×${n}=${part}`;}
      else if(idx===2){answer=2*n;hint=`💡 ${n}+${n}=${2*n} (מנה), מכנה ${d} אותו`;}
      else{answer=mulWhole;hint=`💡 ${mulWhole}×1=${mulWhole} (מנה), מכנה ${d} אותו`;}
      return { type:'num',cat:'fractions',diff,label:'½ שברים',gameLabel:'',
        text:stories[idx],answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:hint},showMul:false,dir:'rtl' };
    },
    decimals(diff) {
      // שברים עשרוניים — חיבור, חיסור, השוואה, עיגול (כיתה ה)
      const qs={
        easy:[
          ()=>{const a=rnd(1,9),b=rnd(1,9-a);return{text:`0.${a} + 0.${b} = 0.?`,answer:a+b,hint:`💡 ${a}+${b}=${a+b}`};},
          ()=>{const a=rnd(2,9),b=rnd(1,a-1);return{text:`0.${a} - 0.${b} = 0.?`,answer:a-b,hint:`💡 ${a}-${b}=${a-b}`};},
          ()=>{const n=rnd(1,5);return{text:`${n}.5 = כמה חצאים? (${n} + ½)`,answer:n,hint:`💡 ${n}.5 = ${n} שלמים ועוד ½`};},
          ()=>{const a=rnd(1,4),b=rnd(1,5);return{text:`${a}.${b} — עגל לשלם הקרוב`,answer:b>=5?a+1:a,hint:`💡 ${b>=5?'מעל 0.5 → עגל למעלה':'מתחת 0.5 → עגל למטה'}`};},
        ],
        medium:[
          ()=>{const a=rnd(10,90)/10, b=rnd(10,90-Math.round(a*10))/10;return{text:`${a.toFixed(1)} + ${b.toFixed(1)} = ?`,answer:Math.round((a+b)*10)/10,hint:`💡 ${a}+${b}=${Math.round((a+b)*10)/10}`};},
          ()=>{const a=rnd(20,90)/10, b=rnd(10,Math.round(a*10)-1)/10;return{text:`${a.toFixed(1)} - ${b.toFixed(1)} = ?`,answer:Math.round((a-b)*10)/10,hint:`💡 ${a}-${b}=${Math.round((a-b)*10)/10}`};},
          ()=>{const a=rnd(1,9),b=rnd(1,9);const bigger=a>b?1:a<b?2:0;if(bigger===0)return window.GRADE_CONFIG.generators.decimals(diff)();return{text:`מה גדול יותר: 0.${a} או 0.${b}? (כתוב 1 לראשון, 2 לשני)`,answer:bigger,hint:`💡 0.${Math.max(a,b)} > 0.${Math.min(a,b)}`};},
        ],
        hard:[
          ()=>{const a=rnd(10,99)/100,b=rnd(10,99)/100;const s=Math.round((a+b)*100)/100;return{text:`${a.toFixed(2)} + ${b.toFixed(2)} = ?  (כתוב 100×התשובה)`,answer:Math.round(s*100),hint:`💡 ${(a+b).toFixed(2)} → ×100=${Math.round(s*100)}`};},
          ()=>{const n=rnd(10,99)/10;return{text:`${n.toFixed(1)} — כמה שברי 10? (×10)`,answer:Math.round(n*10),hint:`💡 ${n}×10=${Math.round(n*10)}`};},
        ],
      };
      const pool=qs[diff]||qs.easy;
      const fn=pick(pool); const q=typeof fn==='function'?fn():fn;
      return { type:'num',cat:'decimals',diff,label:'🔢 שברים עשרוניים',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:q.hint},showMul:false,dir:'rtl' };
    },
    percentages_intro(diff) {
      // היכרות ראשונה בלבד (לפי תוכנית כיתה ה) — לא חישובי אחוז מלאים!
      // רק מה זה אחוז, הקשר לשברים פשוטים ועשרוניים
      const qs={
        easy:[
          {text:'50% = כמה חלקים מתוך 100?',answer:50,hint:'💡 אחוז = חלק מ-100. 50%=50 מתוך 100'},
          {text:'100% = כמה השלם? (כתוב 1)',answer:1,hint:'💡 100% = שלם אחד שלם'},
          {text:'25% = רבע. ¼ מ-100 = ?',answer:25,hint:'💡 100÷4=25'},
          {text:'10% מ-100 = ?',answer:10,hint:'💡 10%=10 מ-100'},
        ],
        medium:[
          {text:'10% מ-50 = ?',answer:5,hint:'💡 50×10÷100=5'},
          {text:'50% מ-80 = ?',answer:40,hint:'💡 80÷2=40'},
          {text:'25% מ-40 = ?',answer:10,hint:'💡 40÷4=10'},
          {text:'0.5 = כמה אחוזים?',answer:50,hint:'💡 0.5 = 50%'},
        ],
        hard:[
          {text:'20% מ-50 = ?',answer:10,hint:'💡 50×20÷100=10'},
          {text:'10% מ-200 = ?',answer:20,hint:'💡 200÷10=20'},
          {text:'75% מ-40 = ?',answer:30,hint:'💡 40×3÷4=30'},
          {text:'30% מ-100 = ?',answer:30,hint:'💡 30%=30 מ-100'},
        ],
      };
      const q=pick(qs[diff]||qs.easy);
      return { type:'num',cat:'percentages_intro',diff,label:'💯 אחוזים (מבוא)',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:q.hint},showMul:false,dir:'rtl' };
    },
    perimeter(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('perimeter',diff);
      const b=rnd(3,diff==='hard'?20:12), h=rnd(2,b);
      const ans=Math.floor(b*h/2);
      return { type:'num',cat:'perimeter',diff,label:'📏 היקף',gameLabel:'',
        text:`היקף מקבילית: בסיס ${b} ס"מ, צלע ${h} ס"מ = ?`,answer:2*(b+h),pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 2×(${b}+${h})=${2*(b+h)}`},showMul:false,dir:'rtl' };
    },
    area(diff) {
      // שטחים: מלבן, משולש, מקבילית — כיתה ה
      if (window.genGeometryCategory) return window.genGeometryCategory('area',diff);
      const type=pick(['rect','tri','para']);
      if(type==='tri'){const b=rnd(4,diff==='hard'?20:12),h=rnd(3,10);const ans=Math.floor(b*h/2);
        return { type:'num',cat:'area',diff,label:'📐 שטח',gameLabel:'',
          text:`שטח משולש: בסיס ${b} ס"מ, גובה ${h} ס"מ = ?`,answer:ans,pts:window.GRADE_CONFIG.pts[diff],
          hint:{type:'text',msg:`💡 (${b}×${h})÷2=${ans}`},showMul:false,dir:'rtl' };}
      const w=rnd(3,15),h=rnd(2,10);
      return { type:'num',cat:'area',diff,label:'📐 שטח',gameLabel:'',
        text:`שטח ${type==='rect'?'מלבן':'מקבילית'}: ${w}×${h} ס"מ = ?`,answer:w*h,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${w}×${h}=${w*h} ס"מ²`},showMul:false,dir:'rtl' };
    },
    data(diff) {
      const n=rnd(4,6);
      const vals=Array.from({length:n},()=>rnd(diff==='easy'?5:diff==='medium'?10:20,diff==='easy'?30:diff==='medium'?60:100));
      const sum=vals.reduce((a,b)=>a+b,0);
      const avg=Math.round(sum/n);
      const mx=Math.max(...vals);
      const type=diff==='easy'?'max':diff==='medium'?'avg':'avg';
      const q=type==='max'
        ?{text:`הנתונים: ${vals.join(', ')}. מה הגדול?`,answer:mx,hint:`💡 ${mx}`}
        :{text:`הנתונים: ${vals.join(', ')}. מה הממוצע? (עגל)`,answer:avg,hint:`💡 סכום ${sum}÷${n}≈${avg}`};
      return { type:'num',cat:'data',diff,label:'📊 ממוצע',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:q.hint},showMul:false,dir:'rtl' };
    },
    measurement(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('measurement',diff);
      const qs={
        easy:[
          {text:"1 ליטר = כמה מ\"ל?",answer:1000,hint:"💡 1 ליטר = 1000 מ\"ל"},
          {text:"2.5 ק\"ג = כמה גרם?",answer:2500,hint:"💡 2.5×1000=2500 גרם"},
          {text:"0.5 ליטר = כמה מ\"ל?",answer:500,hint:"💡 0.5×1000=500 מ\"ל"},
        ],
        medium:[
          {text:"3.5 ק\"מ = כמה מ'?",answer:3500,hint:"💡 3.5×1000=3500 מ'"},
          {text:"כמה ס\"מ² ב-1 מ\"ר?",answer:10000,hint:"💡 100×100=10,000 ס\"מ²"},
          {text:"2 ליטר 250 מ\"ל = כמה מ\"ל?",answer:2250,hint:"💡 2×1000+250=2250"},
        ],
        hard:[
          {text:"שטח ריבוע 1 מ' = כמה ס\"מ²?",answer:10000,hint:"💡 100×100=10,000 ס\"מ²"},
          {text:"4500 מ' = כמה ק\"מ ועוד מ'? (כתוב מ' שנשארו)",answer:500,hint:"💡 4500=4ק\"מ + 500מ'"},
        ],
      };
      const q=pick(qs[diff]||qs.easy);
      return { type:'num',cat:'measurement',diff,label:'📏 מדידה',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:q.hint},showMul:false,dir:'rtl' };
    },
  },
};
