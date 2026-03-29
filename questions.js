// ══ QUESTION GENERATION ══

const WORD_STORIES = {
  easy: [
    ({a,b},th) => ({ text:`לדני יש ${a} ${th.loot} מ${th.name}. החבר שלו נתן לו עוד ${b}. כמה יש לו עכשיו?`, answer:a+b, op:'+', nums:[a,b], exampleAnswer:`יש לו ${a+b} ${th.loot} בסך הכל.`, hint:`חבר: ${a} + ${b}` }),
    ({a,b},th) => ({ text:`בחנות ${th.name} יש ${a} ${th.loot} על המדף העליון ו-${b} על המדף התחתון. כמה יש בחנות?`, answer:a+b, op:'+', nums:[a,b], exampleAnswer:`יש בחנות ${a+b} ${th.loot}.`, hint:`חבר: ${a} + ${b}` }),
    ({a,b},th) => ({ text:`לשירה היו ${a+b} ${th.loot}. השתמשה ב-${b}. כמה נשאר?`, answer:a, op:'-', nums:[a+b,b], exampleAnswer:`נשאר ${a} ${th.loot}.`, hint:`חסר: ${a+b} - ${b}` })
  ],
  medium: [
    ({a,b},th) => ({ text:`קבוצת ${th.name} אספה ${a} ${th.loot} ביום ראשון ו-${b} ביום שני. כמה אספה בסך הכל?`, answer:a+b, op:'+', nums:[a,b], exampleAnswer:`הקבוצה אספה ${a+b} ${th.loot}.`, hint:`חבר שני הימים` }),
    ({a,b},th) => ({ text:`ב${th.name} יש ${a} שחקנים. לכל אחד יש ${b} ${th.loot}. כמה בסך הכל?`, answer:a*b, op:'×', nums:[a,b], exampleAnswer:`יש ${a*b} ${th.loot} בסך הכל.`, hint:`כפל: ${a} × ${b}` }),
    ({a,b,c},th) => ({ text:`לאלי היו ${a} ${th.loot}. קנה עוד ${b} ואז נתן ${c} לחבר. כמה יש לו?`, answer:a+b-c, op:'+', nums:[a,b,c], multiStep:true, steps:[`שלב 1: ${a} + ${b} = ${a+b}`,`שלב 2: ${a+b} - ${c} = ${a+b-c}`], exampleAnswer:`יש לו ${a+b-c} ${th.loot}.`, hint:`קודם חבר, אחר כך חסר` })
  ],
  hard: [
    ({a,b,c},th) => ({ text:`לדוד יש ${a} ${th.loot}. אחיו נתן עוד ${b}. אחר כך חילק בין ${c} חברים. כמה קיבל כל חבר?`, answer:(a+b)/c, op:'+', nums:[a,b,c], multiStep:true, steps:[`שלב 1: ${a} + ${b} = ${a+b}`,`שלב 2: ${a+b} ÷ ${c} = ${(a+b)/c}`], exampleAnswer:`כל חבר קיבל ${(a+b)/c} ${th.loot}.`, hint:`קודם חבר, אחר כך חלק` }),
    ({a,b,c},th) => ({ text:`${a} שחקנים אספו ${b} ${th.loot} כל אחד. אחר כך מצאו עוד ${c}. כמה בסך הכל?`, answer:a*b+c, op:'×', nums:[a,b,c], multiStep:true, steps:[`שלב 1: ${a} × ${b} = ${a*b}`,`שלב 2: ${a*b} + ${c} = ${a*b+c}`], exampleAnswer:`יש ${a*b+c} ${th.loot}.`, hint:`קודם כפל, אחר כך חבר` })
  ]
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
    case 'add':       return genAdd(diff, theme);
    case 'sub':       return genSub(diff, theme);
    case 'mul':       return genMul(diff, theme);
    case 'div':       return genDiv(diff, theme);
    case 'word':      return genWord(diff, theme);
    case 'shapes':    return genShapes(diff, theme);
    case 'fractions': return genFrac(diff, theme);
    default:          return genAdd(diff, theme);
  }
}

function genAdd(diff, th) {
  let a, b;
  if (diff==='easy')   { a=rnd(1,20);   b=rnd(1,20); }
  else if (diff==='medium') { a=rnd(10,99);  b=rnd(10,99); }
  else                 { a=rnd(100,500); b=rnd(100,500); }
  return { type:'num', cat:'add', diff, label:th.label, gameLabel:brainrotLabel(), text:`${a} + ${b} = ?`, answer:a+b, pts:ptsForQ('add',diff), hint:{type:'decompose',a,b}, showMul:false, dir:'ltr' };
}

function genSub(diff, th) {
  let a, b;
  if (diff==='easy')   { a=rnd(5,20);   b=rnd(1,a); }
  else if (diff==='medium') { a=rnd(20,99);  b=rnd(1,a); }
  else                 { a=rnd(100,500); b=rnd(1,a); }
  return { type:'num', cat:'sub', diff, label:th.label, gameLabel:brainrotLabel(), text:`${a} - ${b} = ?`, answer:a-b, pts:ptsForQ('sub',diff), hint:{type:'cubes',total:a,remove:b}, showMul:false, dir:'ltr' };
}

function genMul(diff, th) {
  let a, b;
  if (diff==='easy')   { a=rnd(2,5);  b=rnd(1,10); }
  else if (diff==='medium') { a=rnd(3,9);  b=rnd(2,10); }
  else                 { a=rnd(6,12); b=rnd(6,12); }
  const emoji = pick(th.items);
  return { type:'num', cat:'mul', diff, label:th.label, gameLabel:brainrotLabel(), text:`${a} × ${b} = ?`, answer:a*b, pts:ptsForQ('mul',diff), hint:{type:'groups',a,b,emoji}, showMul:true, mulA:a, mulB:b, mulEmoji:emoji, dir:'ltr' };
}

function genDiv(diff, th) {
  let b, q;
  if (diff==='easy')   { b=rnd(2,5);  q=rnd(1,5);  }
  else if (diff==='medium') { b=rnd(2,9);  q=rnd(2,9);  }
  else                 { b=rnd(3,12); q=rnd(3,12); }
  const a = b*q;
  const emoji = pick(th.items);
  return { type:'num', cat:'div', diff, label:th.label, gameLabel:brainrotLabel(), text:`${a} ÷ ${b} = ?`, answer:q, pts:ptsForQ('div',diff), hint:{type:'groups',a:q,b,emoji}, showMul:true, mulA:q, mulB:b, mulEmoji:emoji, dir:'ltr' };
}

function genWord(diff, th) {
  const loot = pick(THEME_LOOT[th.name] || ['פריטים']);
  th = Object.assign({}, th, { loot });
  const bank = WORD_STORIES[diff] || WORD_STORIES.easy;
  let tried=0, story=null;
  while (tried < 8) {
    tried++;
    const tmpl = pick(bank);
    let nums = {};
    if (diff==='easy')        nums = { a:rnd(2,12), b:rnd(2,12) };
    else if (diff==='medium') nums = { a:rnd(3,15), b:rnd(3,15), c:rnd(2,8) };
    else { const c=rnd(2,5); const b=rnd(2,8); const a=c*rnd(2,4); nums={a,b,c}; }
    try {
      story = tmpl(nums, th);
      if (!Number.isInteger(story.answer) || story.answer <= 0) continue;
      break;
    } catch(e) { continue; }
  }
  if (!story) {
    const a=rnd(2,12), b=rnd(2,12);
    story = { text:`ב${th.name} יש ${a} ${loot} ועוד ${b}. כמה יש בסך הכל?`, answer:a+b, op:'+', nums:[a,b], exampleAnswer:`יש ${a+b} ${loot}.`, hint:'חבר' };
  }
  return { type:'word', cat:'word', diff, label:th.label, gameLabel:brainrotLabel(), text:story.text, answer:story.answer, pts:ptsForQ('word',diff), nums4expr:story.nums||[], op4expr:story.op||'+', exampleAnswer:story.exampleAnswer||`${story.answer}`, multiStep:story.multiStep||false, steps:story.steps||[], hint:{type:'word',op:story.op,hint:story.hint,steps:story.steps}, showMul:false, dir:'rtl' };
}

function genShapes(diff, th) {
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
