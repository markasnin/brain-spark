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

// ══════════════════════════════════════════════════════════════
// genFrac v3 — SPECTACULAR interactive fraction questions
// Handwritten SVG fractions · Tap-to-answer shapes · 17 types
// ══════════════════════════════════════════════════════════════
function genFrac(diff, th) {

  var pts = ptsForQ('fractions', diff);

  // ── 1. HANDWRITTEN fraction (SVG with Caveat font + wobbly line) ─
  function frac(n, d, color, sz) {
    color = color || '#fff';
    sz    = sz    || 1;
    var W = Math.round(52*sz), H = Math.round(68*sz);
    var fs = Math.round(24*sz);
    var mid = Math.round(H/2);
    var x1 = Math.round(5*sz), x2 = Math.round(47*sz);
    // Wobbly hand-drawn line using cubic bezier
    var cy1 = mid + (Math.random()<.5?-1:1)*Math.round(rnd(1,3)*sz);
    var cy2 = mid + (Math.random()<.5?-1:1)*Math.round(rnd(1,3)*sz);
    var d_attr = 'M'+x1+' '+mid+' C '+(x1+10*sz)+' '+cy1+' '+(x2-10*sz)+' '+cy2+' '+x2+' '+mid;
    return '<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H
      +'" style="display:inline-block;vertical-align:middle;overflow:visible">'
      // Numerator
      +'<text x="'+(W/2)+'" y="'+(mid-5)+'" text-anchor="middle" dominant-baseline="auto"'
      +' font-family="Caveat,\'Patrick Hand\',cursive" font-size="'+fs+'" font-weight="700" fill="'+color+'">'+n+'</text>'
      // Wobbly vinculum
      +'<path d="'+d_attr+'" stroke="'+color+'" stroke-width="'+(2.5*sz)+'" stroke-linecap="round" fill="none"/>'
      // Denominator
      +'<text x="'+(W/2)+'" y="'+(mid+5)+'" text-anchor="middle" dominant-baseline="hanging"'
      +' font-family="Caveat,\'Patrick Hand\',cursive" font-size="'+fs+'" font-weight="700" fill="'+color+'">'+d+'</text>'
      +'</svg>';
  }

  // ── 2. PIZZA SVG (static display) ───────────────────────────
  function pizza(n, d, col, size) {
    col  = col  || '#ff6348';
    size = size || 130;
    var cx=size/2, cy=size/2, r=size/2-5;
    var s='';
    for(var i=0;i<d;i++){
      var a1=(i/d)*2*Math.PI-Math.PI/2, a2=((i+1)/d)*2*Math.PI-Math.PI/2;
      var x1=cx+r*Math.cos(a1), y1=cy+r*Math.sin(a1);
      var x2=cx+r*Math.cos(a2), y2=cy+r*Math.sin(a2);
      var lg=(1/d)>.5?1:0;
      var fill=i<n?col:'#16213e';
      // pepperoni dot on filled slices
      var dot='';
      if(i<n){var ma=((i+.5)/d)*2*Math.PI-Math.PI/2;
        dot='<circle cx="'+(cx+r*.55*Math.cos(ma)).toFixed(1)+'" cy="'+(cy+r*.55*Math.sin(ma)).toFixed(1)+'" r="4" fill="#8b0000" opacity=".75"/>';}
      s+='<path d="M'+cx+','+cy+' L'+x1.toFixed(1)+','+y1.toFixed(1)
        +' A'+r+','+r+' 0 '+lg+',1 '+x2.toFixed(1)+','+y2.toFixed(1)+' Z"'
        +' fill="'+fill+'" stroke="#fff" stroke-width="2.5"/>'+dot;
    }
    return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 '+size+' '+size
      +'" style="display:block;margin:0 auto;filter:drop-shadow(0 5px 15px rgba(0,0,0,.55))">'
      +'<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="#c97c1e" stroke="#fff" stroke-width="2"/>'+s+'</svg>';
  }

  // ── 3. INTERACTIVE PIZZA (tap slices, auto-fills answer) ────
  function pizzaTap(d, pre, col, size) {
    col  = col  || '#ff6348';
    size = size || 140;
    var id='pz'+Math.floor(Math.random()*99999);
    var cx=size/2, cy=size/2, r=size/2-5;
    var paths='';
    for(var i=0;i<d;i++){
      var a1=(i/d)*2*Math.PI-Math.PI/2, a2=((i+1)/d)*2*Math.PI-Math.PI/2;
      var x1=cx+r*Math.cos(a1), y1=cy+r*Math.sin(a1);
      var x2=cx+r*Math.cos(a2), y2=cy+r*Math.sin(a2);
      var lg=(1/d)>.5?1:0;
      var fill=i<pre?col:'#16213e';
      paths+='<path id="'+id+'s'+i+'" d="M'+cx+','+cy
        +' L'+x1.toFixed(1)+','+y1.toFixed(1)+' A'+r+','+r+' 0 '+lg+',1 '+x2.toFixed(1)+','+y2.toFixed(1)+' Z"'
        +' fill="'+fill+'" stroke="#fff" stroke-width="2.5"'
        +' style="cursor:pointer;transition:all .2s;transform-origin:'+cx+'px '+cy+'px"'
        +' onclick="_pzClick(\''+id+'\','+i+','+d+',\''+col+'\')"'
        +' onmouseover="this.style.filter=\'brightness(1.35)\';this.style.transform=\'scale(1.07)\'"'
        +' onmouseout="this.style.filter=\'\';this.style.transform=\'\'"/>';
    }
    var svg='<svg id="'+id+'" width="'+size+'" height="'+size+'" viewBox="0 0 '+size+' '+size
      +'" style="display:block;margin:0 auto;filter:drop-shadow(0 5px 15px rgba(0,0,0,.5))">'
      +'<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="#c97c1e" stroke="#fff" stroke-width="2"/>'+paths
      +'<text id="'+id+'lb" x="'+cx+'" y="'+(size+18)+'" text-anchor="middle"'
      +' font-family="Caveat,cursive" font-size="15" fill="#8892b0">'+pre+' / '+d+'</text>'
      +'</svg>';
    // Inline script — safe because shapeHtml is innerHTML'd into the DOM
    var scr='<script>window._pzClick=function(id,i,d,col){'
      +'var el=document.getElementById(id+"s"+i);if(!el)return;'
      +'var on=el.getAttribute("fill")!==col;'
      +'el.setAttribute("fill",on?col:"#16213e");'
      +'var c=0;for(var j=0;j<d;j++){var s=document.getElementById(id+"s"+j);if(s&&s.getAttribute("fill")===col)c++;}'
      +'var lb=document.getElementById(id+"lb");if(lb)lb.textContent=c+" / "+d;'
      +'window._shapeAnswer&&window._shapeAnswer(c);'
      +'};<\/script>';
    return svg+scr;
  }

  // ── 4. BAR (static) ─────────────────────────────────────────
  function bar(n, d, col, w, h) {
    col=col||'#54a0ff'; w=w||240; h=h||42;
    var cw=w/d, cells='';
    for(var i=0;i<d;i++)
      cells+='<rect x="'+(i*cw+2).toFixed(1)+'" y="2" width="'+(cw-4).toFixed(1)+'" height="'+(h-4)+'"'
        +' fill="'+(i<n?col:'#16213e')+'" stroke="'+col+'" stroke-width="2" rx="5"/>';
    return '<svg width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'" style="display:block;margin:0 auto">'+cells+'</svg>';
  }

  // ── 5. BAR (interactive tap) ─────────────────────────────────
  function barTap(d, pre, col, w, h) {
    col=col||'#54a0ff'; w=w||260; h=h||48;
    var id='br'+Math.floor(Math.random()*99999);
    var cw=w/d, cells='';
    for(var i=0;i<d;i++)
      cells+='<rect id="'+id+'c'+i+'" x="'+(i*cw+2).toFixed(1)+'" y="2" width="'+(cw-4).toFixed(1)+'" height="'+(h-4)+'"'
        +' fill="'+(i<pre?col:'#16213e')+'" stroke="'+col+'" stroke-width="2" rx="6"'
        +' style="cursor:pointer;transition:fill .15s"'
        +' onclick="_brClick(\''+id+'\','+i+','+d+',\''+col+'\')"'
        +' onmouseover="this.style.filter=\'brightness(1.4)\'" onmouseout="this.style.filter=\'\'"/>';
    var svg='<svg id="'+id+'" width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'" style="display:block;margin:0 auto">'+cells+'</svg>';
    var scr='<script>window._brClick=function(id,i,d,col){'
      +'var el=document.getElementById(id+"c"+i);if(!el)return;'
      +'var on=el.getAttribute("fill")!==col;el.setAttribute("fill",on?col:"#16213e");'
      +'var c=0;for(var j=0;j<d;j++){var b=document.getElementById(id+"c"+j);if(b&&b.getAttribute("fill")===col)c++;}'
      +'window._shapeAnswer&&window._shapeAnswer(c);'
      +'};<\/script>';
    return svg+scr;
  }

  // ── 6. GRID (static) ────────────────────────────────────────
  function grid(n, tot, col) {
    col=col||'#2ed573';
    var cols=Math.min(tot,6), rows=Math.ceil(tot/cols);
    var cw=36,ch=36,gap=5;
    var W=cols*(cw+gap)-gap, H=rows*(ch+gap)-gap, cells='';
    for(var i=0;i<tot;i++){
      var c=i%cols, r=Math.floor(i/cols);
      cells+='<rect x="'+(c*(cw+gap))+'" y="'+(r*(ch+gap))+'" width="'+cw+'" height="'+ch+'"'
        +' fill="'+(i<n?col:'#16213e')+'" stroke="'+col+'" stroke-width="2" rx="7"/>';
    }
    return '<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" style="display:block;margin:0 auto">'+cells+'</svg>';
  }

  // ── 7. GRID (interactive tap) ────────────────────────────────
  function gridTap(tot, pre, col) {
    col=col||'#2ed573';
    var cols=Math.min(tot,6), rows=Math.ceil(tot/cols);
    var cw=40,ch=40,gap=6;
    var W=cols*(cw+gap)-gap, H=rows*(ch+gap)-gap;
    var id='gd'+Math.floor(Math.random()*99999);
    var cells='';
    for(var i=0;i<tot;i++){
      var c=i%cols, r=Math.floor(i/cols);
      var x=c*(cw+gap), y=r*(ch+gap);
      cells+='<rect id="'+id+'g'+i+'" x="'+x+'" y="'+y+'" width="'+cw+'" height="'+ch+'"'
        +' fill="'+(i<pre?col:'#16213e')+'" stroke="'+col+'" stroke-width="2" rx="8"'
        +' style="cursor:pointer;transition:all .15s;transform-origin:'+(x+cw/2)+'px '+(y+ch/2)+'px"'
        +' onclick="_gdClick(\''+id+'\','+i+','+tot+',\''+col+'\')"'
        +' onmouseover="this.style.transform=\'scale(1.1)\'" onmouseout="this.style.transform=\'\'"/>';
    }
    var svg='<svg id="'+id+'" width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" style="display:block;margin:0 auto">'+cells+'</svg>';
    var scr='<script>window._gdClick=function(id,i,tot,col){'
      +'var el=document.getElementById(id+"g"+i);if(!el)return;'
      +'var on=el.getAttribute("fill")!==col;el.setAttribute("fill",on?col:"#16213e");'
      +'var c=0;for(var j=0;j<tot;j++){var g=document.getElementById(id+"g"+j);if(g&&g.getAttribute("fill")===col)c++;}'
      +'window._shapeAnswer&&window._shapeAnswer(c);'
      +'};<\/script>';
    return svg+scr;
  }

  // ── 8. CHOCOLATE BAR (interactive) ──────────────────────────
  function choco(rows, cols, pre) {
    var cw=36,ch=26,gap=4;
    var W=cols*(cw+gap)-gap, H=rows*(ch+gap)-gap;
    var tot=rows*cols;
    var id='ch'+Math.floor(Math.random()*99999);
    var col='#a0522d';
    var cells='';
    for(var i=0;i<tot;i++){
      var c=i%cols, r=Math.floor(i/cols);
      var x=c*(cw+gap), y=r*(ch+gap);
      var fill=i<pre?col:'#1a0a00';
      cells+='<rect id="'+id+'k'+i+'" x="'+x+'" y="'+y+'" width="'+cw+'" height="'+ch+'"'
        +' fill="'+fill+'" stroke="#3d1800" stroke-width="2.5" rx="4"'
        +' style="cursor:pointer;transition:fill .15s"'
        +' onclick="_gdClick(\''+id+'k\','+i+','+tot+',\''+col+'\')"'
        +' onmouseover="this.style.filter=\'brightness(1.3)\'" onmouseout="this.style.filter=\'\'"/>';
      // shine
      cells+='<rect x="'+(x+3)+'" y="'+(y+2)+'" width="'+(cw-6)+'" height="3" rx="1" fill="rgba(255,255,255,.1)"/>';
    }
    var svg='<svg id="'+id+'" width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H
      +'" style="display:block;margin:0 auto;filter:drop-shadow(0 3px 8px rgba(0,0,0,.5))">'+cells+'</svg>';
    var scr='<script>window._gdClick=window._gdClick||function(id,i,tot,col){'
      +'var el=document.getElementById(id+i);if(!el)return;'
      +'var on=el.getAttribute("fill")!==col;el.setAttribute("fill",on?col:"#1a0a00");'
      +'var c=0;for(var j=0;j<tot;j++){var g=document.getElementById(id+j);if(g&&g.getAttribute("fill")===col)c++;}'
      +'window._shapeAnswer&&window._shapeAnswer(c);'
      +'};<\/script>';
    return svg+scr;
  }

  // ── 9. NUMBER LINE ───────────────────────────────────────────
  function numLine(n, d, w) {
    w=w||270;
    var h=58, pad=22, iw=w-pad*2, ty=28;
    var out='';
    out+='<rect x="'+pad+'" y="'+(ty-7)+'" width="'+(iw*(n/d)).toFixed(1)+'" height="14" fill="rgba(84,160,255,.25)" rx="3"/>';
    out+='<line x1="'+pad+'" y1="'+ty+'" x2="'+(pad+iw)+'" y2="'+ty+'" stroke="#e2e8f0" stroke-width="2.5"/>';
    out+='<polygon points="'+(pad+iw)+','+(ty-5)+' '+(pad+iw+10)+','+ty+' '+(pad+iw)+','+(ty+5)+'" fill="#e2e8f0"/>';
    for(var i=0;i<=d;i++){
      var x=(pad+iw*(i/d)).toFixed(1);
      out+='<line x1="'+x+'" y1="'+(ty-7)+'" x2="'+x+'" y2="'+(ty+7)+'" stroke="#e2e8f0" stroke-width="2"/>';
      out+='<text x="'+x+'" y="'+(ty+22)+'" text-anchor="middle" font-family="Caveat,cursive" font-size="13" fill="#8892b0">'+i+'/'+d+'</text>';
    }
    var mx=(pad+iw*(n/d)).toFixed(1);
    out+='<circle cx="'+mx+'" cy="'+ty+'" r="8" fill="#ffd32a" stroke="#fff" stroke-width="2"/>';
    out+='<text x="'+mx+'" y="'+(ty-14)+'" text-anchor="middle" font-family="Caveat,cursive" font-size="13" font-weight="700" fill="#ffd32a">'+n+'/'+d+'</text>';
    return '<svg width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'" style="display:block;margin:0 auto">'+out+'</svg>';
  }

  // ── UI helpers ───────────────────────────────────────────────
  function wrap(inner, accent) {
    accent=accent||'#54a0ff';
    return '<div style="background:linear-gradient(160deg,rgba(255,255,255,.05) 0%,rgba(255,255,255,.02) 100%);'
      +'border:2px solid '+accent+'55;border-radius:18px;padding:14px 12px 12px;'
      +'box-shadow:0 6px 28px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.08)">'+inner+'</div>';
  }
  function pill(txt, col) {
    col=col||'#ffd32a';
    return '<div style="display:inline-flex;align-items:center;gap:5px;background:'+col+'1a;'
      +'border:1.5px solid '+col+'55;border-radius:99px;padding:4px 14px;'
      +'font-family:Caveat,cursive;font-size:.95rem;color:'+col+';margin-bottom:10px">'+txt+'</div>';
  }
  function row(els, gap) { // flex row
    gap=gap||'10px';
    return '<div style="display:flex;align-items:center;justify-content:center;gap:'+gap+';flex-wrap:wrap">'+els+'</div>';
  }
  function hbr(txt, col) { // Hebrew hint text below shape
    col=col||'#8892b0';
    return '<div style="direction:rtl;text-align:center;font-family:Caveat,cursive;font-size:.92rem;color:'+col+';margin-top:8px;line-height:1.6">'+txt+'</div>';
  }
  function lbr(txt, col) { // LTR label
    col=col||'#e2e8f0';
    return '<div style="direction:ltr;text-align:center;font-family:Caveat,cursive;font-size:1rem;color:'+col+';margin-bottom:10px;line-height:1.7">'+txt+'</div>';
  }
  function autotip() {
    return '<div style="font-family:Caveat,cursive;font-size:.75rem;color:#4a5568;text-align:center;margin-top:5px">'
      +'\u05d4\u05ea\u05e9\u05d5\u05d1\u05d4 \u05de\u05ea\u05e2\u05d3\u05db\u05e0\u05ea \u05d0\u05d5\u05d8\u05d5\u05de\u05d8\u05d9\u05ea &#x1F447;</div>';
  }

  // Font loader (once)
  var FL='<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap" rel="stylesheet">';

  // Colour palette
  var PAL=['#ff6348','#54a0ff','#2ed573','#ffd32a','#c77dff','#ff9f43','#00d2d3','#ff4dac'];

  // Helper: pick fraction pairs per difficulty
  function pairs(hard) {
    if(!hard) return [[1,2],[1,4],[3,4],[1,3],[2,3],[1,6],[5,6],[2,4]];
    return [[2,3],[3,4],[2,5],[3,5],[4,5],[5,6],[3,8],[5,8],[7,8]];
  }

  // ═══════════════════════════════════════════════════════════
  // QUESTION TYPES
  // ═══════════════════════════════════════════════════════════

  var easyPool  = ['pizza_tap','bar_tap','grid_tap','pizza_read','bar_read','pizza_word_simple','grid_count'];
  var medPool   = ['bar_compare','missing_num','bar_add','choco_tap','numline_read','pizza_word_hard','grid_of_total'];
  var hardPool  = ['add_visual','sub_visual','mixed_bars','equivalent','word_story','compare_pizza','bar_compare'];
  var pool      = diff==='easy'?easyPool:diff==='medium'?medPool:hardPool;
  var qt        = pick(pool);

  // ── EASY 1: Tap pizza to shade ───────────────────────────────
  if(qt==='pizza_tap'){
    var fr=pick([[1,2],[1,4],[3,4],[1,3],[2,3],[1,6],[5,6]]);
    var n=fr[0],d=fr[1]; var col=pick(['#ff6348','#ee5a24','#ff9f43']);
    var things=['\u05e4\u05d9\u05e6\u05d4','\u05e2\u05d5\u05d2\u05d4','\u05d8\u05d0\u05e8\u05d8'];
    var thing=pick(things);
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: FL+wrap(
        pill('\u05dc\u05d7\u05e5 \u05e2\u05dc \u05d7\u05ea\u05d9\u05db\u05d5\u05ea \u05db\u05d3\u05d9 \u05dc\u05e6\u05d1\u05d5\u05e2 \u05d0\u05d5\u05ea\u05df!','#ffd32a')
        +lbr('Shade '+frac(n,d,'#ffd32a',1.1)+' of the '+thing)
        +pizzaTap(d,0,col,148)
        +autotip()
      ,col),
      answer:n,hint:{type:'text',msg:'&#x1F4A1; \u05e6\u05d1\u05e2 '+n+' \u05d7\u05ea\u05d9\u05db\u05d5\u05ea \u05de\u05ea\u05d5\u05da '+d},showMul:false,dir:'rtl'};
  }

  // ── EASY 2: Tap bar segments ─────────────────────────────────
  if(qt==='bar_tap'){
    var fr=pick([[1,2],[1,4],[3,4],[1,3],[2,3],[1,5],[2,5],[3,5],[4,5],[1,6],[5,6]]);
    var n=fr[0],d=fr[1]; var col=pick(PAL);
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: FL+wrap(
        pill('\u05dc\u05d7\u05e5 \u05e2\u05dc \u05ea\u05d0\u05d9\u05dd \u05dc\u05e6\u05d1\u05d9\u05e2\u05d4!','#ffd32a')
        +lbr('Color '+frac(n,d,'#ffd32a',1.1)+' of the bar')
        +barTap(d,0,col,264,50)
        +autotip()
      ,col),
      answer:n,hint:{type:'text',msg:'&#x1F4A1; \u05e6\u05d1\u05e2 '+n+' \u05ea\u05d0\u05d9\u05dd \u05de\u05ea\u05d5\u05da '+d},showMul:false,dir:'rtl'};
  }

  // ── EASY 3: Tap grid squares ─────────────────────────────────
  if(qt==='grid_tap'){
    var tot=pick([4,6,8,9,10,12]);
    var n=rnd(1,tot-1); var col=pick(PAL);
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: FL+wrap(
        pill('\u05dc\u05d7\u05e5 \u05e2\u05dc \u05e8\u05d9\u05d1\u05d5\u05e2\u05d9\u05dd \u05dc\u05e6\u05d1\u05d9\u05e2\u05d4!','#ffd32a')
        +lbr('Color '+frac(n,tot,'#ffd32a',1.05)+' of the squares')
        +gridTap(tot,0,col)
        +autotip()
      ,col),
      answer:n,hint:{type:'text',msg:'&#x1F4A1; \u05e6\u05d1\u05e2 '+n+' \u05de\u05ea\u05d5\u05da '+tot+' \u05e8\u05d9\u05d1\u05d5\u05e2\u05d9\u05dd'},showMul:false,dir:'rtl'};
  }

  // ── EASY 4: Read pizza — what fraction is shaded? ────────────
  if(qt==='pizza_read'){
    var fr=pick([[1,2],[1,4],[3,4],[1,3],[2,3],[1,6],[5,6],[1,8],[3,8]]);
    var n=fr[0],d=fr[1]; var col=pick(['#ff6348','#ee5a24']);
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: FL+wrap(
        pill('\u05db\u05ea\u05d5\u05d1 \u05d0\u05ea \u05d4\u05e0\u05d5\u05de\u05e8\u05d8\u05d5\u05e8 (\u05d4\u05de\u05e1\u05e4\u05e8 \u05dc\u05de\u05e2\u05dc\u05d4)','#2ed573')
        +pizza(n,d,col,138)
        +lbr('Pizza cut into <b style="color:#ffd32a">'+d+'</b> equal slices &nbsp;→&nbsp; '+frac('?',d,'#2ed573',1.05)+' are shaded')
      ,'#2ed573'),
      answer:n,hint:{type:'text',msg:'&#x1F4A1; \u05e1\u05e4\u05d5\u05e8 \u05d7\u05ea\u05d9\u05db\u05d5\u05ea \u05e6\u05d1\u05d5\u05e2\u05d5\u05ea: '+n},showMul:false,dir:'rtl'};
  }

  // ── EASY 5: Read bar — write numerator ───────────────────────
  if(qt==='bar_read'){
    var fr=pick([[1,2],[1,4],[3,4],[1,3],[2,3],[1,5],[2,5],[3,5],[4,5]]);
    var n=fr[0],d=fr[1]; var col=pick(PAL);
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: FL+wrap(
        pill('\u05db\u05ea\u05d5\u05d1 \u05d0\u05ea \u05d4\u05e0\u05d5\u05de\u05e8\u05d8\u05d5\u05e8','#2ed573')
        +bar(n,d,col,256,46)
        +lbr(frac('?',d,'#2ed573',1.05)+' of the bar is colored')
      ,'#2ed573'),
      answer:n,hint:{type:'text',msg:'&#x1F4A1; '+n+' \u05ea\u05d0\u05d9\u05dd \u05e6\u05d1\u05d5\u05e2\u05d9\u05dd \u05de\u05ea\u05d5\u05da '+d},showMul:false,dir:'rtl'};
  }

  // ── EASY 6: Pizza word simple ────────────────────────────────
  if(qt==='pizza_word_simple'){
    var d=pick([4,6,8]);
    var ate=rnd(1,d-1); var left=d-ate;
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: FL+wrap(
        pizza(left,d,'#ff6348',132)
        +'<div style="direction:rtl;text-align:center;font-family:Caveat,cursive;font-size:1.05rem;color:#e2e8f0;margin-top:10px;line-height:1.9">'
        +'\u05e4\u05d9\u05e6\u05d4 \u05e9\u05dc <span style="color:#ffd32a;font-size:1.25em;font-weight:700">'+d+'</span> \u05d7\u05ea\u05d9\u05db\u05d5\u05ea.'
        +' \u05d0\u05db\u05dc\u05d5 <span style="color:#ff6348;font-size:1.25em;font-weight:700">'+ate+'</span> \u05d7\u05ea\u05d9\u05db\u05d5\u05ea.'
        +'<br>\u05db\u05de\u05d4 \u05d7\u05ea\u05d9\u05db\u05d5\u05ea <span style="color:#2ed573;font-weight:700">\u05e0\u05e9\u05d0\u05e8\u05d5</span>?'
        +'</div>'
      ,'#ff6348'),
      answer:left,hint:{type:'text',msg:'&#x1F4A1; '+d+' - '+ate+' = '+left},showMul:false,dir:'rtl'};
  }

  // ── EASY 7: Count shaded grid squares ────────────────────────
  if(qt==='grid_count'){
    var tot=pick([4,6,8,9,12]); var n=rnd(1,tot-1); var col=pick(PAL);
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: FL+wrap(
        pill('\u05db\u05de\u05d4 \u05e8\u05d9\u05d1\u05d5\u05e2\u05d9\u05dd \u05e6\u05d1\u05d5\u05e2\u05d9\u05dd?','#2ed573')
        +grid(n,tot,col)
        +lbr(frac('?',tot,'#2ed573',1.05)+' of the grid is shaded')
      ,'#2ed573'),
      answer:n,hint:{type:'text',msg:'&#x1F4A1; \u05e1\u05e4\u05d5\u05e8: '+n+' \u05e6\u05d1\u05d5\u05e2\u05d9\u05dd \u05de\u05ea\u05d5\u05da '+tot},showMul:false,dir:'rtl'};
  }

  // ── MEDIUM 1: Compare two bars ───────────────────────────────
  if(qt==='bar_compare'||qt==='compare_pizza'){
    var allP=[[1,2],[1,4],[3,4],[1,3],[2,3],[1,6],[5,6],[2,5],[3,5]];
    var fr1=pick(allP); var n1=fr1[0],d1=fr1[1];
    var fr2=pick(allP.filter(function(p){return !(p[0]===n1&&p[1]===d1);}));
    var n2=fr2[0],d2=fr2[1];
    if(Math.abs(n1/d1-n2/d2)<0.05){n2++;d2+=2;}
    var bigger=(n1/d1>=n2/d2)?1:2;
    var p1=Math.round(n1/d1*100), p2=Math.round(n2/d2*100);
    var useP=(qt==='compare_pizza');
    var shape1=useP?pizza(n1,d1,'#54a0ff',100):bar(n1,d1,'#54a0ff',118,36);
    var shape2=useP?pizza(n2,d2,'#ff6348',100):bar(n2,d2,'#ff6348',118,36);
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: FL+wrap(
        pill('\u05d0\u05d9\u05d6\u05d4 \u05e9\u05d1\u05e8 \u05d2\u05d3\u05d5\u05dc \u05d9\u05d5\u05ea\u05e8? \u05db\u05ea\u05d5\u05d1 1 \u05d0\u05d5 2','#c77dff')
        +'<div style="display:flex;gap:16px;justify-content:center;align-items:flex-end;margin-bottom:6px">'
        +'<div style="text-align:center"><div style="font-family:Caveat,cursive;color:#8892b0;font-size:1rem;margin-bottom:4px">1</div>'+shape1+'<div style="margin-top:5px">'+frac(n1,d1,'#54a0ff',1)+'</div></div>'
        +'<div style="font-family:Caveat,cursive;font-size:1.8rem;color:#e2e8f0;font-weight:700;padding-bottom:14px">VS</div>'
        +'<div style="text-align:center"><div style="font-family:Caveat,cursive;color:#8892b0;font-size:1rem;margin-bottom:4px">2</div>'+shape2+'<div style="margin-top:5px">'+frac(n2,d2,'#ff6348',1)+'</div></div>'
        +'</div>'
        +'<div style="direction:ltr;text-align:center;font-family:Caveat,cursive;color:#4a5568;font-size:.82rem">(1)='+p1+'%&nbsp;&nbsp;(2)='+p2+'%</div>'
      ,'#c77dff'),
      answer:bigger,hint:{type:'text',msg:'&#x1F4A1; '+n1+'/'+d1+'='+p1+'%  |  '+n2+'/'+d2+'='+p2+'%'},showMul:false,dir:'rtl'};
  }

  // ── MEDIUM 2: Missing numerator / denominator ────────────────
  if(qt==='missing_num'){
    var bases=[[1,2],[1,4],[1,3],[2,3],[3,4]];
    var fr=pick(bases); var n=fr[0],d=fr[1];
    var mult=rnd(2,4); var n2=n*mult,d2=d*mult;
    var askN=Math.random()<.5;
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: FL+wrap(
        pill('\u05e9\u05e0\u05d9 \u05e9\u05d1\u05e8\u05d9\u05dd \u05e9\u05d5\u05d5\u05d9\u05dd — \u05de\u05e6\u05d0 ?','#ffd32a')
        +row(
          '<div style="text-align:center">'+bar(n,d,'#54a0ff',118,34)+'<div style="margin-top:4px">'+frac(n,d,'#54a0ff',1)+'</div></div>'
          +'<div style="font-family:Caveat,cursive;font-size:2rem;color:#e2e8f0;font-weight:700">=</div>'
          +'<div style="text-align:center">'+bar(n2,d2,'#ffd32a',118,34)+'<div style="margin-top:4px">'+frac(askN?'?':n2,askN?d2:'?','#ffd32a',1)+'</div></div>'
        )
        +'<div style="direction:ltr;text-align:center;font-family:Caveat,cursive;color:#4a5568;font-size:.85rem;margin-top:4px">× '+mult+' on top and bottom</div>'
      ,'#ffd32a'),
      answer:askN?n2:d2,hint:{type:'text',msg:'&#x1F4A1; '+n+'×'+mult+'='+n2+', '+d+'×'+mult+'='+d2},showMul:false,dir:'rtl'};
  }

  // ── MEDIUM 3: Add fractions (same denominator) ───────────────
  if(qt==='bar_add'){
    var d=pick([2,3,4,5,6,8]);
    var n1=rnd(1,d-2); var n2=rnd(1,d-n1); var ans=n1+n2;
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: FL+wrap(
        pill('\u05d7\u05d1\u05e8 \u05e9\u05d1\u05e8\u05d9\u05dd!','#2ed573')
        +'<div style="direction:ltr;text-align:center;font-family:Caveat,cursive;font-size:1.1rem;color:#e2e8f0;margin-bottom:10px">'
        +frac(n1,d,'#54a0ff',1.05)
        +'<span style="font-size:1.3rem;vertical-align:middle"> + </span>'
        +frac(n2,d,'#ff6348',1.05)
        +'<span style="font-size:1.3rem;vertical-align:middle"> = </span>'
        +frac('?',d,'#2ed573',1.05)
        +'</div>'
        +row(bar(n1,d,'#54a0ff',122,36)+'<span style="font-family:Caveat,cursive;font-size:1.3rem;color:#e2e8f0">+</span>'+bar(n2,d,'#ff6348',122,36))
        +'<div style="direction:ltr;text-align:center;font-family:Caveat,cursive;color:#4a5568;font-size:.85rem;margin-top:5px">'+n1+' + '+n2+' = ? (denominator stays '+d+')</div>'
      ,'#2ed573'),
      answer:ans,hint:{type:'text',msg:'&#x1F4A1; '+n1+' + '+n2+' = '+ans},showMul:false,dir:'rtl'};
  }

  // ── MEDIUM 4: Chocolate bar tap ──────────────────────────────
  if(qt==='choco_tap'){
    var cfg=pick([[2,4],[3,4],[2,6],[3,6]]); var rows=cfg[0],cols=cfg[1];
    var tot=rows*cols; var n=rnd(1,tot-1);
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: FL+wrap(
        pill('\u05dc\u05d7\u05e5 \u05e2\u05dc \u05e7\u05d5\u05d1\u05d9\u05d5\u05ea \u05e9\u05d5\u05e7\u05d5\u05dc\u05d3 \u05dc\u05e6\u05d1\u05d9\u05e2\u05d4!','#ff9f43')
        +lbr('Color '+frac(n,tot,'#ff9f43',1.05)+' of the chocolate bar')
        +choco(rows,cols,0)
        +autotip()
      ,'#ff9f43'),
      answer:n,hint:{type:'text',msg:'&#x1F4A1; \u05e6\u05d1\u05e2 '+n+' \u05e7\u05d5\u05d1\u05d9\u05d5\u05ea \u05de\u05ea\u05d5\u05da '+tot},showMul:false,dir:'rtl'};
  }

  // ── MEDIUM 5: Number line ─────────────────────────────────────
  if(qt==='numline_read'){
    var d=pick([2,3,4,5,6]); var n=rnd(1,d-1);
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: FL+wrap(
        pill('\u05d0\u05d9\u05e4\u05d4 \u05e2\u05dc \u05e6\u05d9\u05e8 \u05d4\u05de\u05e1\u05e4\u05e8\u05d9\u05dd?','#54a0ff')
        +numLine(n,d,272)
        +lbr('The marker shows '+frac(n,d,'#ffd32a',1.05)+'&nbsp;— write the numerator')
      ,'#54a0ff'),
      answer:n,hint:{type:'text',msg:'&#x1F4A1; \u05d4\u05e1\u05de\u05df \u05e0\u05de\u05e6\u05d0 \u05d1 '+n+'/'+d},showMul:false,dir:'rtl'};
  }

  // ── MEDIUM 6: Pizza word hard ─────────────────────────────────
  if(qt==='pizza_word_hard'){
    var d=pick([6,8,12]);
    var fr=pick([[1,3],[2,3],[1,4],[3,4],[1,2]]); var n=fr[0],base=fr[1];
    var tot=d; while(tot%base!==0)tot++;
    var ate=tot*n/base; var left=tot-ate;
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: FL+wrap(
        pizza(left,tot,'#ff6348',130)
        +'<div style="direction:rtl;text-align:center;font-family:Caveat,cursive;font-size:1rem;color:#e2e8f0;line-height:1.9;margin-top:10px">'
        +'\u05e4\u05d9\u05e6\u05d4 \u05e9\u05dc <span style="color:#ffd32a;font-weight:700">'+tot+'</span> \u05d7\u05ea\u05d9\u05db\u05d5\u05ea.'
        +'<br>\u05d0\u05db\u05dc\u05d5 '+frac(n,base,'#ff6348',.9)+' \u05de\u05d4\u05e4\u05d9\u05e6\u05d4.'
        +'<br>\u05db\u05de\u05d4 \u05d7\u05ea\u05d9\u05db\u05d5\u05ea <span style="color:#2ed573">\u05e0\u05e9\u05d0\u05e8\u05d5</span>?'
        +'</div>'
      ,'#ff6348'),
      answer:left,hint:{type:'text',msg:'&#x1F4A1; '+tot+'×'+n+'/'+base+'='+ate+' \u05e0\u05d0\u05db\u05dc. '+tot+'-'+ate+'='+left},showMul:false,dir:'rtl'};
  }

  // ── MEDIUM 7: Grid of total ───────────────────────────────────
  if(qt==='grid_of_total'){
    var fr=pick([[1,2],[1,4],[3,4],[1,3],[2,3],[1,5],[1,6]]);
    var n=fr[0],d=fr[1];
    var tot=rnd(2,5)*d; var part=tot*n/d; var col=pick(PAL);
    var things=['\u05ea\u05e4\u05d5\u05d7\u05d9\u05dd','\u05db\u05d5\u05db\u05d1\u05d9\u05dd','\u05e2\u05d5\u05d2\u05d9\u05d5\u05ea','\u05dc\u05d1\u05d1\u05d5\u05ea','\u05e4\u05e8\u05d7\u05d9\u05dd'];
    var thing=pick(things);
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: FL+wrap(
        grid(part,tot,col)
        +'<div style="direction:rtl;text-align:center;font-family:Caveat,cursive;font-size:1rem;color:#e2e8f0;margin-top:10px;line-height:1.8">'
        +frac(n,d,'#ffd32a',.95)+' \u05de\u05ea\u05d5\u05da '+tot+' '+thing+'. \u05db\u05de\u05d4 '+thing+' \u05e6\u05d1\u05d5\u05e2\u05d9\u05dd?'
        +'</div>'
      ,col),
      answer:part,hint:{type:'text',msg:'&#x1F4A1; '+tot+'÷'+d+'='+(tot/d)+'. ×'+n+'='+part},showMul:false,dir:'rtl'};
  }

  // ── HARD 1: Add fractions visual with result bar ─────────────
  if(qt==='add_visual'){
    var d=pick([2,3,4,5,6,8]);
    var n1=rnd(1,d-2); var n2=rnd(1,d-n1); var ans=n1+n2;
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: FL+wrap(
        pill('\u05d7\u05d1\u05e8 \u05e9\u05d1\u05e8\u05d9\u05dd!','#2ed573')
        +'<div style="direction:ltr;text-align:center;font-family:Caveat,cursive;font-size:1.1rem;color:#e2e8f0;margin-bottom:10px">'
        +frac(n1,d,'#54a0ff',1.05)+'<span style="font-size:1.3rem;vertical-align:middle"> + </span>'
        +frac(n2,d,'#ff6348',1.05)+'<span style="font-size:1.3rem;vertical-align:middle"> = </span>'
        +frac('?',d,'#2ed573',1.05)+'</div>'
        +row(bar(n1,d,'#54a0ff',124,36)+'<span style="font-family:Caveat,cursive;font-size:1.2rem;color:#e2e8f0">+</span>'+bar(n2,d,'#ff6348',124,36))
        +'<div style="text-align:center;margin-top:6px">'+bar(ans,d,'#2ed573',258,38)+'</div>'
        +'<div style="direction:ltr;text-align:center;font-family:Caveat,cursive;color:#4a5568;font-size:.83rem;margin-top:4px">'+n1+' + '+n2+' = ? (denominator '+d+')</div>'
      ,'#2ed573'),
      answer:ans,hint:{type:'text',msg:'&#x1F4A1; '+n1+' + '+n2+' = '+ans},showMul:false,dir:'rtl'};
  }

  // ── HARD 2: Subtract fractions visual ────────────────────────
  if(qt==='sub_visual'){
    var d=pick([2,3,4,5,6,8]);
    var n1=rnd(2,d); var n2=rnd(1,n1-1); var ans=n1-n2;
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: FL+wrap(
        pill('\u05d7\u05e1\u05e8 \u05e9\u05d1\u05e8\u05d9\u05dd!','#ff6348')
        +'<div style="direction:ltr;text-align:center;font-family:Caveat,cursive;font-size:1.1rem;color:#e2e8f0;margin-bottom:10px">'
        +frac(n1,d,'#2ed573',1.05)+'<span style="font-size:1.3rem;vertical-align:middle"> − </span>'
        +frac(n2,d,'#ff6348',1.05)+'<span style="font-size:1.3rem;vertical-align:middle"> = </span>'
        +frac('?',d,'#ffd32a',1.05)+'</div>'
        +'<div style="text-align:center;margin-bottom:5px">'+bar(n1,d,'#2ed573',258,36)+'</div>'
        +row(bar(ans,d,'#ffd32a',124,36)+'<span style="font-family:Caveat,cursive;font-size:1.2rem;color:#e2e8f0">+</span>'+bar(n2,d,'#ff6348',124,36))
      ,'#ff6348'),
      answer:ans,hint:{type:'text',msg:'&#x1F4A1; '+n1+' − '+n2+' = '+ans},showMul:false,dir:'rtl'};
  }

  // ── HARD 3: Mixed number — count unit fractions ───────────────
  if(qt==='mixed_bars'){
    var d=pick([2,3,4]); var whole=rnd(1,3); var num=rnd(1,d-1);
    var tot=whole*d+num;
    var mc=['#54a0ff','#2ed573','#ffd32a','#ff6348'];
    var bs='<div style="display:flex;flex-direction:column;gap:5px;align-items:center;margin-bottom:10px">';
    for(var i=0;i<whole;i++) bs+=bar(d,d,mc[i%mc.length],224,32);
    bs+=bar(num,d,'#c77dff',224,32)+'</div>';
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: FL+wrap(
        pill('\u05db\u05de\u05d4 \u05d7\u05dc\u05e7\u05d9\u05dd \u05d1\u05e1\u05da \u05d4\u05db\u05dc?','#c77dff')
        +bs
        +'<div style="direction:ltr;text-align:center;font-family:Caveat,cursive;font-size:.97rem;color:#e2e8f0">'
        +whole+' whole bars + '+frac(num,d,'#c77dff',.93)+' = how many '+frac(1,d,'#8892b0',.82)+' pieces?'
        +'</div>'
      ,'#c77dff'),
      answer:tot,hint:{type:'text',msg:'&#x1F4A1; '+whole+'×'+d+'='+(whole*d)+'. +'+num+'='+tot},showMul:false,dir:'rtl'};
  }

  // ── HARD 4: Equivalent fraction ──────────────────────────────
  if(qt==='equivalent'){
    var bases=[[1,2],[1,3],[2,3],[1,4],[3,4]];
    var fr=pick(bases); var n=fr[0],d=fr[1];
    var mult=rnd(2,5); var n2=n*mult,d2=d*mult;
    var askN=Math.random()<.5;
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: FL+wrap(
        pill('\u05e9\u05d1\u05e8\u05d9\u05dd \u05e9\u05d5\u05d5\u05d9\u05dd — \u05de\u05e6\u05d0 ?','#c77dff')
        +'<div style="display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;margin-bottom:6px">'
        +'<div style="text-align:center">'+bar(n,d,'#54a0ff',118,34)+'<div style="margin-top:4px">'+frac(n,d,'#54a0ff',1)+'</div></div>'
        +'<div style="font-family:Caveat,cursive;font-size:2rem;color:#e2e8f0;font-weight:700">=</div>'
        +'<div style="text-align:center">'+bar(n2,d2,'#c77dff',118,34)+'<div style="margin-top:4px">'+frac(askN?'?':n2,askN?d2:'?','#c77dff',1)+'</div></div>'
        +'</div>'
        +'<div style="direction:ltr;text-align:center;font-family:Caveat,cursive;color:#4a5568;font-size:.85rem">multiply by '+mult+'/'+mult+'</div>'
      ,'#c77dff'),
      answer:askN?n2:d2,hint:{type:'text',msg:'&#x1F4A1; '+n+'×'+mult+'='+n2+', '+d+'×'+mult+'='+d2},showMul:false,dir:'rtl'};
  }

  // ── HARD 5: Word story with grid ─────────────────────────────
  if(qt==='word_story'){
    var fr=pick([[1,2],[1,4],[3,4],[1,3],[2,3]]); var n=fr[0],d=fr[1];
    var mults=[12,16,20,24].filter(function(t){return t%d===0;}); var tot=pick(mults)||d*4;
    var part=tot*n/d; var col=pick(PAL);
    var stories=[
      '\u05d1\u05db\u05d9\u05ea\u05d4 \u05d9\u05e9 '+tot+' \u05ea\u05dc\u05de\u05d9\u05d3\u05d9\u05dd. '+frac(n,d,'#ffd32a',.9)+' \u05de\u05d4\u05dd \u05de\u05d1\u05d9\u05d0\u05d9\u05dd \u05db\u05e8\u05d9\u05da. \u05db\u05de\u05d4?',
      '\u05d1\u05e4\u05d0\u05e8\u05e7 \u05d4\u05d9\u05d5 '+tot+' \u05e6\u05d9\u05e4\u05d5\u05e8\u05d9\u05dd. '+frac(n,d,'#54a0ff',.9)+' \u05de\u05d4\u05df \u05e2\u05e4\u05d5. \u05db\u05de\u05d4?',
      '\u05dc\u05d3\u05e0\u05d9 '+tot+' \u05de\u05d8\u05d1\u05e2\u05d5\u05ea. \u05e0\u05ea\u05df '+frac(n,d,'#ff6348',.9)+' \u05dc\u05d0\u05d7\u05d5\u05ea\u05d5. \u05db\u05de\u05d4?',
    ];
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: FL+wrap(
        grid(part,tot,col)
        +'<div style="direction:rtl;text-align:center;font-family:Caveat,cursive;font-size:1rem;color:#e2e8f0;margin-top:10px;line-height:1.9">'+pick(stories)+'</div>'
      ,col),
      answer:part,hint:{type:'text',msg:'&#x1F4A1; '+tot+'÷'+d+'='+(tot/d)+'. ×'+n+'='+part},showMul:false,dir:'rtl'};
  }

  // ── Fallback ─────────────────────────────────────────────────
  var fr=pick([[1,2],[1,4],[3,4],[1,3],[2,3]]); var n=fr[0],d=fr[1];
  return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
    shapeHtml: FL+wrap(
      pill('\u05e6\u05d1\u05e2 '+n+' \u05d7\u05ea\u05d9\u05db\u05d5\u05ea!','#ffd32a')
      +pizzaTap(d,0,'#ff6348',142)
      +autotip()
    ,'#ff6348'),
    answer:n,hint:{type:'text',msg:'&#x1F4A1; \u05e6\u05d1\u05e2 '+n+' \u05d7\u05ea\u05d9\u05db\u05d5\u05ea \u05de\u05ea\u05d5\u05da '+d},showMul:false,dir:'rtl'};
}
