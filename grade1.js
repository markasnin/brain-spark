// ══════════════════════════════════════════════
// GRADE 1 — כיתה א
// חיבור, חיסור, ספירה, השוואה, דפוסים, צורות, מדידה
// מספרים: עד 30
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'א',
  gradeName: 'כיתה א',
  gradeEmoji: '🌱',
  gradeColor: '#2ed573',

  availableCategories: ['add', 'sub', 'counting', 'compare', 'shapes2d', 'patterns1', 'measurement'],
  availableLearnTopics: ['shapes2d_learn', 'measurement_learn'],
  availableExamTopics:  ['add', 'sub', 'counting', 'compare', 'shapes2d', 'measurement'],

  ranges: {
    add: { easy:{aMin:1,aMax:9,bMin:1,bMax:9}, medium:{aMin:5,aMax:15,bMin:3,bMax:15}, hard:{aMin:10,aMax:20,bMin:5,bMax:20} },
    sub: { easy:{aMin:2,aMax:10}, medium:{aMin:6,aMax:18}, hard:{aMin:10,aMax:30} },
  },

  pts: { easy:3, medium:6, hard:10 },
  welcome: 'ברוך הבא לכיתה א! נלמד חיבור, חיסור, ספירה וצורות! 🌱',
  tip: 'ספור על האצבעות — זה עוזר! 🖐️',

  generators: {
    add(diff) {
      const r = window.GRADE_CONFIG.ranges.add[diff];
      const a = rnd(r.aMin, r.aMax), b = rnd(r.bMin, r.bMax);
      const th = pick(GAME_THEMES); const e = pick(th.items);
      const stories = [
        `יש ${a} ${e} ועוד ${b} ${e}. כמה יש בסך הכל?`,
        `${a} ילדים בגן ועוד ${b} הגיעו. כמה ילדים יש עכשיו?`,
        `אכלתי ${a} תפוחים ועוד ${b}. כמה אכלתי בסך הכל?`,
        `יש ${a} כדורים אדומים ו-${b} כחולים. כמה כדורים יש?`,
        `לנועה יש ${a} מדבקות. קיבלה עוד ${b}. כמה יש לה?`,
      ];
      return {type:'num',cat:'add',diff,label:th.label,gameLabel:brainrotLabel(),
        text:pick(stories),answer:a+b,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'decompose',a,b},showMul:false,dir:'rtl'};
    },
    sub(diff) {
      const r = window.GRADE_CONFIG.ranges.sub[diff];
      const total = rnd(r.aMin, r.aMax), b = rnd(1, total-1), a = total-b;
      const th = pick(GAME_THEMES); const e = pick(th.items);
      const stories = [
        `היו ${total} ${e}. לקחו ${b}. כמה נשאר?`,
        `${total} ילדים בגן. ${b} הלכו הביתה. כמה נשארו?`,
        `היו ${total} עוגיות. נאכלו ${b}. כמה נשארו?`,
        `יש ${total} בלונים. ${b} התפוצצו. כמה נשארו?`,
        `לדן היו ${total} שקלים. הוציא ${b}. כמה נשאר?`,
      ];
      return {type:'num',cat:'sub',diff,label:th.label,gameLabel:brainrotLabel(),
        text:pick(stories),answer:a,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'cubes',total,remove:b},showMul:false,dir:'rtl'};
    },
    counting(diff) {
      if (diff==='easy') {
        const n = rnd(2,9); const e = pick(['⭐','🍎','🐶','🌸','🚗','🎈','🍕','🐱','🌟']);
        return {type:'num',cat:'counting',diff,label:'🔢 ספירה',gameLabel:'',
          text:`ספור: ${e.repeat(n)} — כמה יש?`,answer:n,pts:window.GRADE_CONFIG.pts[diff],
          hint:{type:'text',msg:`💡 ספור אחד-אחד: יש ${n}`},showMul:false,dir:'rtl'};
      }
      const start=rnd(1,5), step=rnd(1,3), len=4;
      const seq = Array.from({length:len},(_,i)=>start+i*step);
      const next = seq[len-1]+step;
      return {type:'num',cat:'counting',diff,label:'🔢 ספירה',gameLabel:'',
        text:`המספר הבא בסדרה: ${seq.join(' , ')} , ___`,answer:next,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 כל פעם מוסיפים ${step}. אחרי ${seq[len-1]} בא ${next}`},showMul:false,dir:'rtl'};
    },
    compare(diff) {
      const max = diff==='easy'?10:diff==='medium'?20:30;
      const a=rnd(1,max), b=rnd(1,max);
      if(a===b) return window.GRADE_CONFIG.generators.compare(diff);
      const big=Math.max(a,b), small=Math.min(a,b);
      const text = Math.random()<0.5
        ? `${big} גדול מ-${small} בכמה?`
        : `${small} קטן מ-${big} בכמה?`;
      return {type:'num',cat:'compare',diff,label:'⚖️ השוואה',gameLabel:'',
        text,answer:big-small,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${big} - ${small} = ${big-small}`},showMul:false,dir:'rtl'};
    },
    shapes2d(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('shapes2d',diff);
      return {type:'num',cat:'shapes2d',diff,label:'🔷 צורות 2D',gameLabel:'',
        text:'כמה צלעות יש למשולש?',answer:3,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:'💡 ספור את הצלעות!'},showMul:false,dir:'rtl'};
    },
    patterns1(diff) {
      const pools = {
        easy:[
          {seq:'🔴 🔵 🔴 🔵 🔴',next:1,hint:'חוזר: אדום, כחול... (🔵=1)'},
          {seq:'⭐ 🌙 ⭐ 🌙 ⭐',next:6,hint:'חוזר: כוכב, ירח... (🌙=6)'},
          {seq:'2 , 4 , 6 , 8',next:10,hint:'ספירה בקפיצות של 2. אחרי 8 בא 10'},
          {seq:'5 , 10 , 15 , 20',next:25,hint:'ספירה ב-5. אחרי 20 בא 25'},
        ],
        medium:[
          {seq:'1 , 3 , 5 , 7',next:9,hint:'מוסיפים 2 כל פעם. אחרי 7 בא 9'},
          {seq:'10 , 20 , 30 , 40',next:50,hint:'מוסיפים 10 כל פעם'},
          {seq:'3 , 6 , 9 , 12',next:15,hint:'לוח השלוש! אחרי 12 בא 15'},
          {seq:'🔺 🔺 ⬜ 🔺 🔺 ⬜ 🔺 🔺',next:3,hint:'שני משולשים, ריבוע, חוזר. הבא הוא ⬜=3'},
        ],
        hard:[
          {seq:'1 , 2 , 4 , 8 , 16',next:32,hint:'כל פעם כופלים ב-2. אחרי 16 בא 32'},
          {seq:'100 , 90 , 80 , 70',next:60,hint:'יורדים ב-10. אחרי 70 בא 60'},
          {seq:'1 , 4 , 9 , 16',next:25,hint:'מספרים ריבועיים: 1,4,9,16,25...'},
        ],
      };
      const p = pick(pools[diff]||pools.easy);
      return {type:'num',cat:'patterns1',diff,label:'🔄 דפוסים',gameLabel:'',
        text:`מה יבוא אחר כך? ${p.seq} , ___`,answer:p.next,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${p.hint}`},showMul:false,dir:'rtl'};
    },
    measurement(diff) {
      if (window.genGeometryCategory) return window.genGeometryCategory('measurement',diff);
      const qs=[
        {text:'כמה דקות יש בשעה?',answer:60,hint:'1 שעה = 60 דקות'},
        {text:'כמה ימים יש בשבוע?',answer:7,hint:'א׳ ב׳ ג׳ ד׳ ה׳ ו׳ שבת = 7 ימים'},
        {text:"1 מ' = כמה ס\"מ?",answer:100,hint:"1 מטר = 100 סנטימטר"},
      ];
      const q=pick(qs);
      return {type:'num',cat:'measurement',diff,label:'📏 מדידה',gameLabel:'',
        text:q.text,answer:q.answer,pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${q.hint}`},showMul:false,dir:'rtl'};
    },
  },
};
