// ══════════════════════════════════════════════
// GRADE 2 — כיתה ב
// חיבור, חיסור, כפל (מבוא), בעיות מילוליות, צורות, סימטריה,
// כסף, זמן, דפוסים, מדידה
// מספרים: עד 200
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'ב',
  gradeName: 'כיתה ב',
  gradeEmoji: '📊',
  gradeColor: '#ffd32a',

  availableCategories: ['add','sub','mul','word','shapes2d','symmetry','patterns1','time','money','measurement'],
  availableLearnTopics: ['mul','shapes2d_learn','symmetry_learn','measurement_learn'],
  availableExamTopics:  ['add','sub','mul','word','shapes2d','symmetry','time','money','measurement'],

  ranges: {
    add: { easy:{aMin:5,aMax:30,bMin:5,bMax:30}, medium:{aMin:20,aMax:99,bMin:10,bMax:99}, hard:{aMin:50,aMax:150,bMin:50,bMax:150} },
    sub: { easy:{aMin:5,aMax:30}, medium:{aMin:20,aMax:99}, hard:{aMin:50,aMax:200} },
    mul: { easy:{aMin:2,aMax:5,bMin:1,bMax:5}, medium:{aMin:2,aMax:9,bMin:2,bMax:9}, hard:{aMin:3,aMax:10,bMin:5,bMax:10} },
  },

  pts: { easy:5, medium:10, hard:18 },
  welcome: 'ברוך הבא לכיתה ב! כפל, כסף, זמן וצורות! ⚡',
  tip: 'כפל הוא חיבור חוזר! 2×3 = 2+2+2 ✖️',

  generators: {
    add(diff) {
      const r=window.GRADE_CONFIG.ranges.add[diff];
      const a=rnd(r.aMin,r.aMax), b=rnd(r.bMin,r.bMax);
      const th=pick(GAME_THEMES); const e=pick(th.items);
      const stories=[
        `לרועי יש ${a} ${e} ולשרה יש ${b}. כמה יש להם ביחד?`,
        `בשוק יש ${a} ${e} בבוקר. הגיעו עוד ${b}. כמה יש עכשיו?`,
        `ביום ראשון אספנו ${a} ${e} וביום שני ${b}. כמה בסך הכל?`,
        `${a} + ${b} = ?`,
      ];
      return {type:'num',cat:'add',diff,label:th.label,gameLabel:brainrotLabel(),
        text:pick(stories),answer:a+b,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'decompose',a,b},showMul:false,dir:'rtl'};
    },
    sub(diff) {
      const r=window.GRADE_CONFIG.ranges.sub[diff];
      const total=rnd(r.aMin,r.aMax), b=rnd(1,Math.floor(total/2)), a=total-b;
      const th=pick(GAME_THEMES); const e=pick(th.items);
      const stories=[
        `היו ${total} ${e}. מכרו ${b}. כמה נשאר?`,
        `לטל היו ${total} שקלים. הוציאה ${b}. כמה נשאר?`,
        `${total} - ${b} = ?`,
        `מספר גדול: ${total}. חסרים ${b}. מה התשובה?`,
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
        `${a} ילדים, לכל אחד ${b} ${e}. כמה ${e} בסך הכל?`,
        `${a} קופסאות, בכל קופסה ${b} ${e}. כמה בסך הכל?`,
        `${a} × ${b} = ?`,
        `${b} קבוצות של ${a}. כמה בסך הכל?`,
      ];
      const emoji=pick(th.items);
      return {type:'num',cat:'mul',diff,label:th.label,gameLabel:brainrotLabel(),
        text:pick(stories),answer:a*b,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'groups',a,b,emoji},showMul:true,mulA:a,mulB:b,mulEmoji:emoji,dir:'rtl'};
    },
    word: null,
    shapes2d(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('shapes2d',diff);
      return {type:'num',cat:'shapes2d',diff,label:'🔷 צורות 2D',gameLabel:'',
        text:'כמה צלעות יש לריבוע?',answer:4,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:'💡 ריבוע = 4 צלעות שוות'},showMul:false,dir:'rtl'};
    },
    symmetry(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('symmetry',diff);
      return {type:'num',cat:'symmetry',diff,label:'🔁 סימטריה',gameLabel:'',
        text:'כמה צירי סימטריה לריבוע?',answer:4,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:'💡 ריבוע = 4 צירים'},showMul:false,dir:'rtl'};
    },
    patterns1(diff) {
      const pools={
        easy:[
          {seq:'2 , 4 , 6 , 8',next:10,hint:'ספירה ב-2'},
          {seq:'5 , 10 , 15 , 20',next:25,hint:'ספירה ב-5'},
          {seq:'10 , 20 , 30',next:40,hint:'ספירה ב-10'},
        ],
        medium:[
          {seq:'3 , 6 , 9 , 12',next:15,hint:'לוח ה-3'},
          {seq:'4 , 8 , 12 , 16',next:20,hint:'לוח ה-4'},
          {seq:'50 , 45 , 40 , 35',next:30,hint:'יורדים ב-5'},
        ],
        hard:[
          {seq:'1 , 2 , 4 , 8 , 16',next:32,hint:'כופלים ב-2 כל פעם'},
          {seq:'100 , 90 , 80 , 70',next:60,hint:'יורדים ב-10'},
          {seq:'7 , 14 , 21 , 28',next:35,hint:'לוח ה-7'},
        ],
      };
      const p=pick(pools[diff]||pools.easy);
      return {type:'num',cat:'patterns1',diff,label:'🔄 דפוסים',gameLabel:'',
        text:`מה יבוא אחר כך? ${p.seq} , ___`,answer:p.next,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${p.hint}`},showMul:false,dir:'rtl'};
    },
    time(diff) {
      const qs={
        easy:[
          {text:'כמה דקות יש בשעה?',answer:60,hint:'1 שעה = 60 דקות'},
          {text:'כמה שעות יש ביום?',answer:24,hint:'יום = 24 שעות'},
          {text:'כמה ימים יש בשבוע?',answer:7,hint:'7 ימים בשבוע'},
        ],
        medium:[
          {text:'שיעור התחיל ב-8:00 ונגמר ב-8:45. כמה דקות ארך?',answer:45,hint:'מ-8:00 עד 8:45 = 45 דקות'},
          {text:'אם עכשיו 3:00, מה השעה בעוד 2 שעות?',answer:5,hint:'3 + 2 = 5 (כתוב 5)'},
          {text:'כמה שניות יש בדקה?',answer:60,hint:'1 דקה = 60 שניות'},
        ],
        hard:[
          {text:'סרט התחיל ב-6:00 וארך 90 דקות. מתי נגמר? (כתוב את השעה)',answer:730,hint:'6:00 + 90 דקות = 7:30 (730)'},
          {text:'כמה דקות יש ב-2 שעות?',answer:120,hint:'2 × 60 = 120 דקות'},
          {text:'כמה שעות יש ב-3 ימים?',answer:72,hint:'3 × 24 = 72 שעות'},
        ],
      };
      const q=pick(qs[diff]||qs.easy);
      return {type:'num',cat:'time',diff,label:'⏰ זמן',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${q.hint}`},showMul:false,dir:'rtl'};
    },
    money(diff) {
      const qs={
        easy:[
          () => { const a=rnd(5,20),b=rnd(5,20); return {text:`קניתי ב-${a} ש"ח ועוד ב-${b} ש"ח. כמה שילמתי בסך הכל?`,answer:a+b,hint:`${a}+${b}=${a+b}`}; },
          () => { const total=rnd(20,50),paid=rnd(10,total-1); return {text:`קניתי ב-${paid} ש"ח ונתתי ${total} ש"ח. כמה עודף קיבלתי?`,answer:total-paid,hint:`${total}-${paid}=${total-paid}`}; },
        ],
        medium:[
          () => { const price=rnd(3,9),n=rnd(2,5); return {text:`קניתי ${n} ממתקים במחיר ${price} ש"ח כל אחד. כמה שילמתי?`,answer:price*n,hint:`${n}×${price}=${price*n}`}; },
          () => { const total=rnd(30,80),paid=rnd(10,Math.floor(total/2)); return {text:`יש לי ${total} ש"ח. קניתי ב-${paid} ש"ח. כמה נשאר?`,answer:total-paid,hint:`${total}-${paid}=${total-paid}`}; },
        ],
        hard:[
          () => { const price=rnd(4,8),n=rnd(3,7),discount=rnd(2,price*n-1); return {text:`קניתי ${n} חפצים ב-${price} ש"ח כל אחד, וקיבלתי הנחה של ${discount} ש"ח. כמה שילמתי?`,answer:price*n-discount,hint:`${n}×${price}=${price*n}, פחות ${discount} = ${price*n-discount}`}; },
        ],
      };
      const pool=qs[diff]||qs.easy; const fn=pick(pool); const q=fn();
      return {type:'num',cat:'money',diff,label:'💰 כסף',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${q.hint}`},showMul:false,dir:'rtl'};
    },
    measurement(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('measurement',diff);
      return {type:'num',cat:'measurement',diff,label:'📏 מדידה',gameLabel:'',
        text:"1 מ' = כמה ס\"מ?",answer:100,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:"💡 1 מטר = 100 סנטימטר"},showMul:false,dir:'rtl'};
    },
  },
};
