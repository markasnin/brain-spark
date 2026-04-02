// ══ QUESTION GENERATION ══

// ── Grade-aware word story banks ──
// validOps: array of { a, op, b } — the correct equation(s) for this question
// For multi-step questions, ALL steps are listed in order

const WORD_STORIES = {

  // ── Grade 2: only + and -, single step, small numbers ──
  grade2: {
    easy: [
      ({a,b},th) => ({ text:`לדני יש ${a} ${th.loot}. החבר שלו נתן לו עוד ${b}. כמה יש לו עכשיו?`,
        answer:a+b, validOps:[{a,op:'+',b},{a:b,op:'+',b:a}],
        exampleAnswer:`יש לו ${a+b} ${th.loot} בסך הכל.`, hint:`חבר: ${a} + ${b}` }),
      ({a,b},th) => ({ text:`בחנות ${th.name} יש ${a} ${th.loot} על המדף העליון ו-${b} על המדף התחתון. כמה יש בחנות?`,
        answer:a+b, validOps:[{a,op:'+',b},{a:b,op:'+',b:a}],
        exampleAnswer:`יש בחנות ${a+b} ${th.loot}.`, hint:`חבר: ${a} + ${b}` }),
      ({a,b},th) => ({ text:`לשירה היו ${a+b} ${th.loot}. השתמשה ב-${b}. כמה נשאר?`,
        answer:a, validOps:[{a:a+b,op:'-',b}],
        exampleAnswer:`נשאר ${a} ${th.loot}.`, hint:`חסר: ${a+b} - ${b}` }),
      ({a,b},th) => ({ text:`בגן יש ${a} ילדים ובכיתה יש ${b} ילדים. כמה ילדים יש בסך הכל?`,
        answer:a+b, validOps:[{a,op:'+',b},{a:b,op:'+',b:a}],
        exampleAnswer:`יש ${a+b} ילדים.`, hint:`חבר: ${a} + ${b}` }),
    ],
    medium: [
      ({a,b},th) => ({ text:`לרון היו ${a+b} ${th.loot}. נתן ${b} לאחותו. כמה נשאר לו?`,
        answer:a, validOps:[{a:a+b,op:'-',b}],
        exampleAnswer:`נשאר לרון ${a} ${th.loot}.`, hint:`חסר: ${a+b} - ${b}` }),
      ({a,b},th) => ({ text:`קבוצת ${th.name} אספה ${a} ${th.loot} ביום ראשון ו-${b} ביום שני. כמה אספה בסך הכל?`,
        answer:a+b, validOps:[{a,op:'+',b},{a:b,op:'+',b:a}],
        exampleAnswer:`הקבוצה אספה ${a+b} ${th.loot}.`, hint:`חבר שני הימים` }),
      ({a,b},th) => ({ text:`היו ${a+b} ${th.loot} בקופסה. הוצאו ${b}. כמה נשארו?`,
        answer:a, validOps:[{a:a+b,op:'-',b}],
        exampleAnswer:`נשארו ${a} ${th.loot}.`, hint:`חסר: ${a+b} - ${b}` }),
    ],
    hard: [
      ({a,b},th) => ({ text:`בחנות ${th.name} היו ${a+b} ${th.loot}. נמכרו ${b} ואז הגיעו עוד ${b} חדשים. כמה יש עכשיו?`,
        answer:a+b, validOps:[{a:a+b,op:'-',b},{a,op:'+',b}],
        multiStep:true, steps:[`שלב 1: ${a+b} - ${b} = ${a}`,`שלב 2: ${a} + ${b} = ${a+b}`],
        exampleAnswer:`יש עכשיו ${a+b} ${th.loot}.`, hint:`קודם חסר, אחר כך חבר` }),
    ],
  },

  // ── Grade 3: + - × ÷ ──
  grade3: {
    easy: [
      ({a,b},th) => ({ text:`${a} ילדים, לכל אחד ${b} ${th.loot}. כמה בסך הכל?`,
        answer:a*b, validOps:[{a,op:'×',b},{a:b,op:'×',b:a}],
        exampleAnswer:`יש ${a*b} ${th.loot} בסך הכל.`, hint:`כפל: ${a} × ${b}` }),
      ({a,b},th) => ({ text:`${a*b} ${th.loot} מחולקים ל-${a} ילדים שווה בשווה. כמה קיבל כל ילד?`,
        answer:b, validOps:[{a:a*b,op:'÷',b:a}],
        exampleAnswer:`כל ילד קיבל ${b} ${th.loot}.`, hint:`חלק: ${a*b} ÷ ${a}` }),
      ({a,b},th) => ({ text:`קבוצת ${th.name} אספה ${a} ${th.loot} ביום ראשון ו-${b} ביום שני. כמה בסך הכל?`,
        answer:a+b, validOps:[{a,op:'+',b},{a:b,op:'+',b:a}],
        exampleAnswer:`הקבוצה אספה ${a+b} ${th.loot}.`, hint:`חבר: ${a} + ${b}` }),
    ],
    medium: [
      ({a,b},th) => ({ text:`ב${th.name} יש ${a} שחקנים. לכל אחד יש ${b} ${th.loot}. כמה בסך הכל?`,
        answer:a*b, validOps:[{a,op:'×',b},{a:b,op:'×',b:a}],
        exampleAnswer:`יש ${a*b} ${th.loot} בסך הכל.`, hint:`כפל: ${a} × ${b}` }),
      ({a,b,c},th) => ({ text:`לאלי היו ${a} ${th.loot}. קנה עוד ${b} ואז נתן ${c} לחבר. כמה יש לו?`,
        answer:a+b-c, validOps:[{a,op:'+',b},{a:a+b,op:'-',b:c}],
        multiStep:true, steps:[`שלב 1: ${a} + ${b} = ${a+b}`,`שלב 2: ${a+b} - ${c} = ${a+b-c}`],
        exampleAnswer:`יש לו ${a+b-c} ${th.loot}.`, hint:`קודם חבר, אחר כך חסר` }),
    ],
    hard: [
      ({a,b,c},th) => ({ text:`${a} שחקנים אספו ${b} ${th.loot} כל אחד. אחר כך מצאו עוד ${c}. כמה בסך הכל?`,
        answer:a*b+c, validOps:[{a,op:'×',b},{a:a*b,op:'+',b:c}],
        multiStep:true, steps:[`שלב 1: ${a} × ${b} = ${a*b}`,`שלב 2: ${a*b} + ${c} = ${a*b+c}`],
        exampleAnswer:`יש ${a*b+c} ${th.loot}.`, hint:`קודם כפל, אחר כך חבר` }),
      ({a,b,c},th) => ({ text:`היו ${a*b} ${th.loot}. חילקו ל-${a} ילדים. כל ילד נתן ${c} בחזרה. כמה נשאר לכל ילד?`,
        answer:b-c, validOps:[{a:a*b,op:'÷',b:a},{a:b,op:'-',b:c}],
        multiStep:true, steps:[`שלב 1: ${a*b} ÷ ${a} = ${b}`,`שלב 2: ${b} - ${c} = ${b-c}`],
        exampleAnswer:`נשאר לכל ילד ${b-c} ${th.loot}.`, hint:`קודם חלק, אחר כך חסר` }),
    ],
  },

  // ── Grades 4-6: all ops, multi-step, bigger numbers ──
  grade456: {
    easy: [
      ({a,b},th) => ({ text:`ב${th.name} יש ${a} ${th.loot}. הגיעו עוד ${b}. כמה יש עכשיו?`,
        answer:a+b, validOps:[{a,op:'+',b},{a:b,op:'+',b:a}],
        exampleAnswer:`יש עכשיו ${a+b} ${th.loot}.`, hint:`חבר: ${a} + ${b}` }),
      ({a,b},th) => ({ text:`${a} ילדים, לכל אחד ${b} ${th.loot}. כמה בסך הכל?`,
        answer:a*b, validOps:[{a,op:'×',b},{a:b,op:'×',b:a}],
        exampleAnswer:`יש ${a*b} ${th.loot}.`, hint:`כפל: ${a} × ${b}` }),
      ({a,b},th) => ({ text:`${a*b} ${th.loot} מחולקים ל-${b} קבוצות שוות. כמה בכל קבוצה?`,
        answer:a, validOps:[{a:a*b,op:'÷',b}],
        exampleAnswer:`יש ${a} ${th.loot} בכל קבוצה.`, hint:`חלק: ${a*b} ÷ ${b}` }),
    ],
    medium: [
      ({a,b,c},th) => ({ text:`לדוד יש ${a} ${th.loot}. אחיו נתן עוד ${b}. אחר כך חילק בין ${c} חברים. כמה קיבל כל חבר?`,
        answer:(a+b)/c, validOps:[{a,op:'+',b},{a:a+b,op:'÷',b:c}],
        multiStep:true, steps:[`שלב 1: ${a} + ${b} = ${a+b}`,`שלב 2: ${a+b} ÷ ${c} = ${(a+b)/c}`],
        exampleAnswer:`כל חבר קיבל ${(a+b)/c} ${th.loot}.`, hint:`קודם חבר, אחר כך חלק` }),
      ({a,b,c},th) => ({ text:`${a} שחקנים אספו ${b} ${th.loot} כל אחד. אחר כך מצאו עוד ${c}. כמה בסך הכל?`,
        answer:a*b+c, validOps:[{a,op:'×',b},{a:a*b,op:'+',b:c}],
        multiStep:true, steps:[`שלב 1: ${a} × ${b} = ${a*b}`,`שלב 2: ${a*b} + ${c} = ${a*b+c}`],
        exampleAnswer:`יש ${a*b+c} ${th.loot}.`, hint:`קודם כפל, אחר כך חבר` }),
    ],
    hard: [
      ({a,b,c},th) => ({ text:`חנות ${th.name} קנתה ${a} ארגזים עם ${b} ${th.loot} בכל ארגז. מכרה ${c}. כמה נשאר?`,
        answer:a*b-c, validOps:[{a,op:'×',b},{a:a*b,op:'-',b:c}],
        multiStep:true, steps:[`שלב 1: ${a} × ${b} = ${a*b}`,`שלב 2: ${a*b} - ${c} = ${a*b-c}`],
        exampleAnswer:`נשאר ${a*b-c} ${th.loot}.`, hint:`קודם כפל, אחר כך חסר` }),
    ],
  },
};

function brainrotLabel() { return rnd(0,3)===0 ? pick(BRAINROT_LABELS) : ''; }

function ptsForQ(cat, diff) {
  const gc = window.GRADE_CONFIG;
  if (gc?.pts) return gc.pts[diff] || (diff==='easy'?cfg.ptsEasy:diff==='medium'?cfg.ptsMed:cfg.ptsHard);
  const base = { easy:cfg.ptsEasy, medium:cfg.ptsMed, hard:cfg.ptsHard };
  const bonus = cat==='word' ? cfg.ptsWordBonus : 0;
  return (base[diff] || cfg.ptsEasy) + bonus;
}

function genPool(cat, diff, n) {
  const pool = [];
  for (let i=0; i<n; i++) {
    const d = diff==='mix' ? pick(['easy','medium','hard']) : diff;
    pool.push(genQ(cat, d));
  }
  return pool;
}

function genQ(cat, diff) {
  const gc = window.GRADE_CONFIG;
  if (gc?.generators?.[cat]) return gc.generators[cat](diff);
  const theme = pick(GAME_THEMES);
  switch(cat) {
    case 'add':         return genAdd(diff, theme);
    case 'sub':         return genSub(diff, theme);
    case 'mul':         return genMul(diff, theme);
    case 'div':         return genDiv(diff, theme);
    case 'word':        return genWord(diff, theme);
    case 'shapes':      return genShapes(diff, theme);
    case 'fractions':   return genFrac(diff, theme);
    case 'measurement': return genMeasurement(diff, theme);
    case 'data':        return genData(diff, theme);
    case 'decimals':    return genDecimals(diff, theme);
    case 'percent':     return genPercent(diff, theme);
    case 'negatives':   return genNegatives(diff, theme);
    case 'ratio':       return genRatio(diff, theme);
    default:            return genAdd(diff, theme);
  }
}

function genAdd(diff, th) {
  let a, b;
  if (diff==='easy')        { a=rnd(1,20);   b=rnd(1,20); }
  else if (diff==='medium') { a=rnd(10,99);  b=rnd(10,99); }
  else                      { a=rnd(100,500); b=rnd(100,500); }
  return { type:'num', cat:'add', diff, label:th.label, gameLabel:brainrotLabel(), text:`${a} + ${b} = ?`, answer:a+b, pts:ptsForQ('add',diff), hint:{type:'decompose',a,b}, showMul:false, dir:'ltr' };
}

function genSub(diff, th) {
  let a, b;
  if (diff==='easy')        { a=rnd(5,20);   b=rnd(1,a); }
  else if (diff==='medium') { a=rnd(20,99);  b=rnd(1,a); }
  else                      { a=rnd(100,500); b=rnd(1,a); }
  return { type:'num', cat:'sub', diff, label:th.label, gameLabel:brainrotLabel(), text:`${a} - ${b} = ?`, answer:a-b, pts:ptsForQ('sub',diff), hint:{type:'cubes',total:a,remove:b}, showMul:false, dir:'ltr' };
}

function genMul(diff, th) {
  let a, b;
  if (diff==='easy')        { a=rnd(2,5);  b=rnd(1,10); }
  else if (diff==='medium') { a=rnd(3,9);  b=rnd(2,10); }
  else                      { a=rnd(6,12); b=rnd(6,12); }
  const emoji = pick(th.items);
  return { type:'num', cat:'mul', diff, label:th.label, gameLabel:brainrotLabel(), text:`${a} × ${b} = ?`, answer:a*b, pts:ptsForQ('mul',diff), hint:{type:'groups',a,b,emoji}, showMul:true, mulA:a, mulB:b, mulEmoji:emoji, dir:'ltr' };
}

function genDiv(diff, th) {
  let b, q;
  if (diff==='easy')        { b=rnd(2,5);  q=rnd(1,5);  }
  else if (diff==='medium') { b=rnd(2,9);  q=rnd(2,9);  }
  else                      { b=rnd(3,12); q=rnd(3,12); }
  const a = b*q;
  const emoji = pick(th.items);
  return { type:'num', cat:'div', diff, label:th.label, gameLabel:brainrotLabel(), text:`${a} ÷ ${b} = ?`, answer:q, pts:ptsForQ('div',diff), hint:{type:'groups',a:q,b,emoji}, showMul:true, mulA:q, mulB:b, mulEmoji:emoji, dir:'ltr' };
}

// ── Pick the right story bank for the current grade ──
function _getWordBank(diff) {
  const grade = window._grade || 'ב';
  if (grade === 'ב') return WORD_STORIES.grade2[diff] || WORD_STORIES.grade2.easy;
  if (grade === 'ג') return WORD_STORIES.grade3[diff] || WORD_STORIES.grade3.easy;
  return WORD_STORIES.grade456[diff] || WORD_STORIES.grade456.easy;
}

// ── Number ranges per grade ──
function _wordNums(diff) {
  const grade = window._grade || 'ב';
  if (grade === 'ב') {
    if (diff==='easy')   return { a:rnd(2,10),  b:rnd(2,10) };
    if (diff==='medium') return { a:rnd(5,20),  b:rnd(5,20) };
    return                      { a:rnd(10,25), b:rnd(3,12) };
  }
  if (grade === 'ג') {
    if (diff==='easy')   return { a:rnd(2,6), b:rnd(2,6) };
    if (diff==='medium') { const a=rnd(2,7), b=rnd(2,7), c=rnd(2,Math.min(a*b-1,8)); return {a,b,c}; }
    const c=rnd(2,5), b=rnd(2,6), a=c*rnd(2,4); return {a,b,c};
  }
  // grades 4-6
  if (diff==='easy')   return { a:rnd(3,8), b:rnd(3,8) };
  if (diff==='medium') { const c=rnd(2,5), b=rnd(2,7), a=c*rnd(2,4); return {a,b,c}; }
  const c=rnd(2,5), b=rnd(2,7), a=c*rnd(2,4); return {a,b,c};
}

function genWord(diff, th) {
  const loot = pick(THEME_LOOT[th.name] || ['פריטים']);
  th = Object.assign({}, th, { loot });
  const bank = _getWordBank(diff);
  let tried=0, story=null;
  while (tried < 12) {
    tried++;
    const tmpl = pick(bank);
    const nums = _wordNums(diff);
    try {
      story = tmpl(nums, th);
      if (!Number.isFinite(story.answer) || !Number.isInteger(story.answer) || story.answer <= 0) continue;
      // All validOps results must also be positive integers
      if (story.validOps) {
        let ok = true;
        for (const v of story.validOps) {
          const r = evalOp(v.a, v.op, v.b);
          if (!Number.isFinite(r) || !Number.isInteger(r) || r <= 0) { ok=false; break; }
        }
        if (!ok) continue;
      }
      break;
    } catch(e) { continue; }
  }
  if (!story) {
    const a=rnd(2,12), b=rnd(2,12);
    story = {
      text:`ב${th.name} יש ${a} ${loot} ועוד ${b}. כמה יש בסך הכל?`,
      answer:a+b, validOps:[{a,op:'+',b},{a:b,op:'+',b:a}],
      exampleAnswer:`יש ${a+b} ${loot}.`, hint:'חבר'
    };
  }
  return {
    type:'word', cat:'word', diff,
    label:th.label, gameLabel:brainrotLabel(),
    text:story.text,
    answer:story.answer,
    pts:ptsForQ('word',diff),
    validOps: story.validOps || [],
    multiStep: story.multiStep || false,
    steps: story.steps || [],
    exampleAnswer: story.exampleAnswer || `${story.answer}`,
    hint:{ type:'word', hint:story.hint, steps:story.steps||[] },
    showMul:false, dir:'rtl'
  };
}

// ── Evaluate a single operation ──
function evalOp(a, op, b) {
  if (op==='+') return a+b;
  if (op==='-') return a-b;
  if (op==='×'||op==='*') return a*b;
  if (op==='÷'||op==='/') return b!==0 ? a/b : NaN;
  return NaN;
}

// ── Check if a user equation matches any valid equation for this question ──
// Returns: 'correct' | 'right-answer-wrong-equation' | 'wrong'
function checkWordEquation(userA, userOp, userB, q) {
  if (isNaN(userA) || isNaN(userB) || !userOp) return 'wrong';
  const userResult = evalOp(userA, userOp, userB);
  const validOps = q.validOps || [];

  for (const v of validOps) {
    const commutative = (v.op === '+' || v.op === '×');
    if (v.op === userOp) {
      if (v.a === userA && v.b === userB) return 'correct';
      if (commutative && v.a === userB && v.b === userA) return 'correct';
    }
  }

  // Right number, wrong equation
  if (Number.isInteger(userResult) && userResult === q.answer) return 'right-answer-wrong-equation';

  return 'wrong';
}

function genShapes(diff, th) {
  if (window.genShapesInteractive) {
    return window.genShapesInteractive(diff);
  }
  // Fallback if shapes.js not loaded
  const shapes = [
    {q:'כמה צלעות יש למשולש?',a:3},{q:'כמה פינות יש לריבוע?',a:4},
    {q:'כמה צלעות יש למלבן?',a:4},{q:'כמה פינות יש לעיגול?',a:0},
    {q:'כמה צלעות יש למחומש?',a:5},{q:'כמה צלעות יש למשושה?',a:6}
  ];
  const s = pick(shapes);
  return { type:'num', cat:'shapes', diff, label:th.label, gameLabel:'', text:s.q, answer:s.a, pts:ptsForQ('shapes',diff), hint:{type:'text',msg:'💡 ספור את הקצוות!'}, showMul:false, dir:'rtl' };
}

function genFrac(diff, th) {
  const pairs = [[1,2],[1,4],[3,4],[1,3],[2,3]];
  const [n,d] = pick(pairs);
  const total = rnd(4,20)*d;
  const part  = total*n/d;
  return { type:'num', cat:'fractions', diff, label:th.label, gameLabel:'', text:`כמה זה ${n}/${d} מתוך ${total}?`, answer:part, pts:ptsForQ('fractions',diff), hint:{type:'text',msg:`💡 ${total}÷${d}=${total/d} לחלק. ×${n}=${part}`}, showMul:false, dir:'rtl' };
}

// ── Measurement ──
function genMeasurement(diff, th) {
  const gc = window.GRADE_CONFIG;
  if (gc?.generators?.measurement) return gc.generators.measurement(diff);
  const pts = ptsForQ('measurement', diff);

  const easyPool = [
    { text:'כמה ס"מ יש ב-1 מטר?',         answer:100,  hint:'💡 1 מטר = 100 ס"מ' },
    { text:'כמה גרם יש ב-1 ק"ג?',          answer:1000, hint:'💡 1 ק"ג = 1000 גרם' },
    { text:'כמה מ"מ יש ב-1 ס"מ?',          answer:10,   hint:'💡 1 ס"מ = 10 מ"מ' },
    { text:'כמה דקות יש בשעה אחת?',        answer:60,   hint:'💡 שעה = 60 דקות' },
    { text:'כמה שניות יש בדקה אחת?',       answer:60,   hint:'💡 דקה = 60 שניות' },
    { text:'כמה מ"ל יש ב-1 ליטר?',         answer:1000, hint:'💡 1 ליטר = 1000 מ"ל' },
  ];
  const mediumPool = [
    { text:'כמה ס"מ יש ב-3 מטר?',          answer:300,  hint:'💡 3 × 100 = 300 ס"מ' },
    { text:'כמה גרם יש ב-2.5 ק"ג?',        answer:2500, hint:'💡 2.5 × 1000 = 2500 גרם' },
    { text:'כמה מטרים ב-1 ק"מ?',           answer:1000, hint:'💡 1 ק"מ = 1000 מטר' },
    { text:'כמה דקות יש ב-3 שעות?',        answer:180,  hint:'💡 3 × 60 = 180 דקות' },
    { text:'כמה שניות ב-5 דקות?',          answer:300,  hint:'💡 5 × 60 = 300 שניות' },
    { text:'500 מ"ל = כמה חצאי ליטר?',     answer:1,    hint:'💡 ½ ליטר = 500 מ"ל!' },
    { text:'250 ס"מ = כמה מטרים וחצי?',    answer:2,    hint:'💡 250÷100=2.5 → 2 מטרים ו...' },
  ];
  const hardPool = [
    { text:'2.5 ק"מ = כמה מטרים?',         answer:2500, hint:'💡 2.5 × 1000 = 2500 מ\'' },
    { text:'3600 שניות = כמה שעות?',        answer:1,    hint:'💡 3600÷60=60 דקות=1 שעה' },
    { text:'6000 מ"ל = כמה ליטרים?',        answer:6,    hint:'💡 6000÷1000=6 ליטר' },
    { text:'ריצה של 2 שעות ו-30 דקות. כמה דקות בסך הכל?', answer:150, hint:'💡 120+30=150 דקות' },
    { text:'חבל 3.5 מטר. כמה ס"מ?',        answer:350,  hint:'💡 3.5×100=350 ס"מ' },
  ];

  const pool = diff==='easy' ? easyPool : diff==='medium' ? mediumPool : hardPool;
  const q = pick(pool);
  return { type:'num', cat:'measurement', diff, label:th.label, gameLabel:'', text:q.text, answer:q.answer, pts, hint:{type:'text',msg:q.hint}, showMul:false, dir:'rtl' };
}

// ── Data / Statistics ──
function genData(diff, th) {
  const gc = window.GRADE_CONFIG;
  if (gc?.generators?.data) return gc.generators.data(diff);
  const pts = ptsForQ('data', diff);

  const easyPool = [
    { text:'ממוצע של 2, 4, 6 הוא?',                           answer:4,  hint:'💡 (2+4+6)÷3=12÷3=4' },
    { text:'ממוצע של 10, 20, 30 הוא?',                        answer:20, hint:'💡 (10+20+30)÷3=60÷3=20' },
    { text:'שכיח של: 3, 5, 3, 7, 3 הוא?',                    answer:3,  hint:'💡 3 מופיע הכי הרבה!' },
    { text:'בגרף: שירה 8 נק\', דן 5 נק\'. כמה בסך הכל?',    answer:13, hint:'💡 8+5=13' },
    { text:'כמה ילדים הצביעו? כחול:6 אדום:4 ירוק:3',         answer:13, hint:'💡 6+4+3=13' },
  ];
  const mediumPool = [
    { text:'ממוצע של 4, 8, 12, 8 הוא?',                       answer:8,  hint:'💡 (4+8+12+8)÷4=32÷4=8' },
    { text:'חציון של: 1, 3, 5, 7, 9 הוא?',                   answer:5,  hint:'💡 המספר האמצעי הוא 5!' },
    { text:'שכיח של: 4, 7, 4, 9, 4, 7 הוא?',                 answer:4,  hint:'💡 4 מופיע 3 פעמים!' },
    { text:'בטבלה: יש 3 ספרים, 6 עפרונות, 2 מחשבונים. כמה פריטים?', answer:11, hint:'💡 3+6+2=11' },
    { text:'ממוצע של 5 מספרים הוא 6. מה סכומם?',             answer:30, hint:'💡 ממוצע×כמות=6×5=30' },
  ];
  const hardPool = [
    { text:'חציון של: 4, 7, 2, 9, 5, 1, 8 הוא?',             answer:5,  hint:'💡 סדר: 1,2,4,5,7,8,9 — אמצעי=5' },
    { text:'ממוצע של 4 ציונים הוא 8. אחד הוא 12. הסכום של השאר?', answer:20, hint:'💡 סה"כ=32, 32-12=20' },
    { text:'5 מספרים, ממוצע 10, סכום השניים הראשונים 12. ממוצע השלושה הנותרים?', answer:16, hint:'💡 סה"כ=50, 50-12=38, 38÷3≈12.67... (תשובה: 12.67 — נעגל ל-13)' },
    { text:'שכיח של: 2,4,4,6,6,6,8 הוא?',                    answer:6,  hint:'💡 6 מופיע 3 פעמים!' },
    { text:'טווח של: 3, 15, 7, 20, 1 הוא?',                  answer:19, hint:'💡 טווח = מקס-מין = 20-1 = 19' },
  ];

  const pool = diff==='easy' ? easyPool : diff==='medium' ? mediumPool : hardPool;
  const q = pick(pool);
  return { type:'num', cat:'data', diff, label:th.label, gameLabel:'', text:q.text, answer:q.answer, pts, hint:{type:'text',msg:q.hint}, showMul:false, dir:'rtl' };
}

// ── Decimals ──
function genDecimals(diff, th) {
  const gc = window.GRADE_CONFIG;
  if (gc?.generators?.decimals) return gc.generators.decimals(diff);
  const pts = ptsForQ('decimals', diff);

  // All answers encoded ×10 to stay integer
  const easyPool = [
    { text:'0.3 + 0.4 = ? (×10)',   answer:7,  hint:'💡 3+4=7 עשיריות = 0.7' },
    { text:'0.5 + 0.2 = ? (×10)',   answer:7,  hint:'💡 5+2=7 עשיריות = 0.7' },
    { text:'0.8 - 0.3 = ? (×10)',   answer:5,  hint:'💡 8-3=5 עשיריות = 0.5' },
    { text:'1.2 + 0.5 = ? (×10)',   answer:17, hint:'💡 12+5=17 עשיריות = 1.7' },
    { text:'כמה עשיריות יש ב-0.6?', answer:6,  hint:'💡 0.6 = 6 עשיריות!' },
  ];
  const mediumPool = [
    { text:'2.5 + 1.3 = ? (×10)',   answer:38, hint:'💡 25+13=38 עשיריות = 3.8' },
    { text:'5.6 - 2.4 = ? (×10)',   answer:32, hint:'💡 56-24=32 עשיריות = 3.2' },
    { text:'0.5 × 6 = ? (×10)',     answer:30, hint:'💡 0.5×6=3.0, ×10=30' },
    { text:'3.0 ÷ 5 = ? (×10)',     answer:6,  hint:'💡 3÷5=0.6, ×10=6' },
    { text:'1.5 × 4 = ? (×10)',     answer:60, hint:'💡 1.5×4=6.0, ×10=60' },
  ];
  const hardPool = [
    { text:'4.8 × 5 = ? (×10)',     answer:240, hint:'💡 4.8×5=24.0, ×10=240' },
    { text:'7.2 ÷ 4 = ? (×10)',     answer:18,  hint:'💡 7.2÷4=1.8, ×10=18' },
    { text:'12.5 + 7.5 = ? (×10)',  answer:200, hint:'💡 12.5+7.5=20.0, ×10=200' },
    { text:'9.6 - 4.8 = ? (×10)',   answer:48,  hint:'💡 9.6-4.8=4.8, ×10=48' },
    { text:'0.25 × 4 = ? (×10)',    answer:10,  hint:'💡 0.25×4=1.0, ×10=10' },
  ];

  const pool = diff==='easy' ? easyPool : diff==='medium' ? mediumPool : hardPool;
  const q = pick(pool);
  return { type:'num', cat:'decimals', diff, label:th.label, gameLabel:'', text:q.text, answer:q.answer, pts, hint:{type:'text',msg:q.hint}, showMul:false, dir:'rtl' };
}

// ── Percent ──
function genPercent(diff, th) {
  const gc = window.GRADE_CONFIG;
  if (gc?.generators?.percent) return gc.generators.percent(diff);
  const pts = ptsForQ('percent', diff);

  const easyPool = [
    { text:'כמה זה 10% מ-50?',         answer:5,   hint:'💡 50÷10=5' },
    { text:'כמה זה 50% מ-80?',         answer:40,  hint:'💡 80÷2=40' },
    { text:'כמה זה 25% מ-40?',         answer:10,  hint:'💡 40÷4=10' },
    { text:'כמה זה 10% מ-200?',        answer:20,  hint:'💡 200÷10=20' },
    { text:'כמה זה 100% מ-75?',        answer:75,  hint:'💡 100% = הכל!' },
  ];
  const mediumPool = [
    { text:'כמה זה 20% מ-60?',         answer:12,  hint:'💡 60÷5=12' },
    { text:'כמה זה 75% מ-40?',         answer:30,  hint:'💡 40÷4×3=30' },
    { text:'כמה זה 15% מ-200?',        answer:30,  hint:'💡 10%=20, 5%=10, 15%=30' },
    { text:'מחיר 100₪, עלה 20%. מחיר חדש?', answer:120, hint:'💡 100+20=120₪' },
    { text:'מחיר 80₪, ירד 25%. מחיר חדש?',  answer:60,  hint:'💡 80÷4=20, 80-20=60₪' },
    { text:'כמה זה 35% מ-100?',        answer:35,  hint:'💡 35% מ-100 = 35!' },
  ];
  const hardPool = [
    { text:'קניתי ב-80₪ מכרתי ב-100₪. כמה % רווח?', answer:25, hint:'💡 רווח=20, 20÷80×100=25%' },
    { text:'אחוז שינוי מ-50 ל-60?',   answer:20,  hint:'💡 (60-50)÷50×100=20%' },
    { text:'מחיר לאחר 10% הנחה = 90₪. מה המחיר המקורי?', answer:100, hint:'💡 90÷0.9=100₪' },
    { text:'כמה זה 15% מ-120?',        answer:18,  hint:'💡 10%=12, 5%=6, 15%=18' },
    { text:'כמה זה 35% מ-200?',        answer:70,  hint:'💡 10%=20, 35%=70' },
  ];

  const pool = diff==='easy' ? easyPool : diff==='medium' ? mediumPool : hardPool;
  const q = pick(pool);
  return { type:'num', cat:'percent', diff, label:th.label, gameLabel:'', text:q.text, answer:q.answer, pts, hint:{type:'text',msg:q.hint}, showMul:false, dir:'rtl' };
}

// ── Negatives ──
function genNegatives(diff, th) {
  const gc = window.GRADE_CONFIG;
  if (gc?.generators?.negatives) return gc.generators.negatives(diff);
  const pts = ptsForQ('negatives', diff);

  const easyPool = [
    { text:'5 - 8 = ?',    answer:-3,  hint:'💡 5-8=-3 (מספר שלילי!)' },
    { text:'-3 + 7 = ?',   answer:4,   hint:'💡 -3+7=4' },
    { text:'-6 + 6 = ?',   answer:0,   hint:'💡 מספר ועצמו השלילי=0!' },
    { text:'-4 - 2 = ?',   answer:-6,  hint:'💡 -4-2=-6' },
    { text:'0 - 5 = ?',    answer:-5,  hint:'💡 0-5=-5' },
    { text:'-2 + 9 = ?',   answer:7,   hint:'💡 9-2=7' },
  ];
  const mediumPool = [
    { text:'-10 + 4 = ?',      answer:-6,  hint:'💡 -10+4=-6' },
    { text:'3 - 11 = ?',       answer:-8,  hint:'💡 3-11=-8' },
    { text:'-7 + 12 = ?',      answer:5,   hint:'💡 12-7=5' },
    { text:'-5 + 3 - 4 = ?',   answer:-6,  hint:'💡 -5+3=-2, -2-4=-6' },
    { text:'-8 - (-3) = ?',    answer:-5,  hint:'💡 פחות שלילי = חיבור! -8+3=-5' },
    { text:'(-3) × 4 = ?',     answer:-12, hint:'💡 שלילי × חיובי = שלילי!' },
  ];
  const hardPool = [
    { text:'(-6) × (-2) = ?',  answer:12,  hint:'💡 שלילי × שלילי = חיובי!' },
    { text:'(-4) × 5 = ?',     answer:-20, hint:'💡 שלילי × חיובי = שלילי!' },
    { text:'-3 × (-3) = ?',    answer:9,   hint:'💡 שלילי × שלילי = חיובי!' },
    { text:'12 ÷ (-4) = ?',    answer:-3,  hint:'💡 חיובי ÷ שלילי = שלילי!' },
    { text:'(-15) ÷ (-3) = ?', answer:5,   hint:'💡 שלילי ÷ שלילי = חיובי!' },
    { text:'-2 × 3 + 10 = ?',  answer:4,   hint:'💡 -6+10=4' },
  ];

  const pool = diff==='easy' ? easyPool : diff==='medium' ? mediumPool : hardPool;
  const q = pick(pool);
  return { type:'num', cat:'negatives', diff, label:th.label, gameLabel:'', text:q.text, answer:q.answer, pts, hint:{type:'text',msg:q.hint}, showMul:false, dir:'ltr' };
}

// ── Ratio & Proportion ──
function genRatio(diff, th) {
  const gc = window.GRADE_CONFIG;
  if (gc?.generators?.ratio) return gc.generators.ratio(diff);
  const pts = ptsForQ('ratio', diff);

  const easyPool = [
    { text:'יחס 1:2. אם ראשון=4, מה שני?',    answer:8,   hint:'💡 4×2=8' },
    { text:'יחס 1:3. אם ראשון=5, מה שני?',    answer:15,  hint:'💡 5×3=15' },
    { text:'יחס 2:4. האם שווה ל-1:2? (כן=1 לא=0)', answer:1, hint:'💡 2:4=1:2 — כן!' },
    { text:'3 תפוחים עולים 9₪. כמה עולה 1?',  answer:3,   hint:'💡 9÷3=3₪' },
    { text:'5 ספרים עולים 50₪. כמה 2 ספרים?', answer:20,  hint:'💡 50÷5=10₪ לאחד, ×2=20₪' },
  ];
  const mediumPool = [
    { text:'אם 3 עוגות עולות 90₪, כמה 5 עוגות?', answer:150, hint:'💡 90÷3=30₪, ×5=150₪' },
    { text:'יחס בנות לבנים 2:3. יש 15 בנים. כמה בנות?', answer:10, hint:'💡 15÷3×2=10' },
    { text:'מתכון ל-4: 200 גרם קמח. ל-6 אנשים?',        answer:300, hint:'💡 200÷4×6=300 גרם' },
    { text:'מהירות 60 קמ"ש. ב-2 שעות כמה ק"מ?',         answer:120, hint:'💡 60×2=120 ק"מ' },
    { text:'במפה 1:1000. 5 ס"מ על המפה = כמה מ\'?',     answer:50,  hint:'💡 5×1000=5000 ס"מ=50 מ\'' },
  ];
  const hardPool = [
    { text:'מתכון ל-4: 200 גרם קמח. ל-10 אנשים?',       answer:500, hint:'💡 200÷4×10=500 גרם' },
    { text:'מהירות 80 קמ"ש. ב-1.5 שעות כמה ק"מ?',       answer:120, hint:'💡 80×1.5=120 ק"מ' },
    { text:'יחס ארוך לרחב 3:2. ארוך=15 ס"מ. שטח=?',    answer:150, hint:'💡 רחב=10, 15×10=150' },
    { text:'נסיעה 240 ק"מ ב-3 שעות. מהירות ממוצעת?',    answer:80,  hint:'💡 240÷3=80 קמ"ש' },
    { text:'קנה 6 ק"ג ב-54₪. מחיר ל-10 ק"ג?',          answer:90,  hint:'💡 54÷6=9₪/ק"ג, ×10=90₪' },
  ];

  const pool = diff==='easy' ? easyPool : diff==='medium' ? mediumPool : hardPool;
  const q = pick(pool);
  return { type:'num', cat:'ratio', diff, label:th.label, gameLabel:'', text:q.text, answer:q.answer, pts, hint:{type:'text',msg:q.hint}, showMul:false, dir:'rtl' };
}
