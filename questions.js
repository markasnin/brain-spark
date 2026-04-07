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
// genFrac — SPECTACULAR interactive fraction questions
// Handwritten-style fractions, animated SVG shapes, tap-to-answer
// ══════════════════════════════════════════════════════════════
function genFrac(diff, th) {

  var pts = ptsForQ('fractions', diff);

  // ── Handwritten-style fraction using SVG path curves ──────
  // Mimics pencil-drawn numerator/vinculum/denominator
  function fracSvg(num, den, opts) {
    opts = opts || {};
    var color   = opts.color   || '#fff';
    var size    = opts.size    || 1;
    var shake   = opts.shake   || false; // wobble animation
    var W = Math.round(54*size), H = Math.round(70*size);
    var fs = Math.round(26*size); // font size for digits
    var lineY = Math.round(35*size);
    // Slightly wobbly line — hand-drawn feel
    var x1 = Math.round(6*size), x2 = Math.round(48*size);
    var c1y = lineY + Math.round(rnd(-2,2)*size);
    var c2y = lineY + Math.round(rnd(-2,2)*size);
    var pathD = 'M '+x1+','+lineY+' C '+(x1+8*size)+','+c1y+' '+(x2-8*size)+','+c2y+' '+x2+','+lineY;
    var animStyle = shake ? 'animation:fracWiggle 0.4s ease-in-out;' : '';
    return '<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" style="display:inline-block;vertical-align:middle;'+animStyle+'">'
      + '<style>@keyframes fracWiggle{0%{transform:rotate(0deg)}25%{transform:rotate(-3deg)}75%{transform:rotate(3deg)}100%{transform:rotate(0deg)}}</style>'
      + '<text x="'+(W/2)+'" y="'+(lineY-4)+'" text-anchor="middle" dominant-baseline="auto"'
        + ' font-family="Caveat,Patrick Hand,cursive" font-size="'+fs+'" font-weight="700" fill="'+color+'">'+num+'</text>'
      + '<path d="'+pathD+'" stroke="'+color+'" stroke-width="'+(2.8*size)+'" stroke-linecap="round" fill="none"/>'
      + '<text x="'+(W/2)+'" y="'+(lineY+6)+'" text-anchor="middle" dominant-baseline="hanging"'
        + ' font-family="Caveat,Patrick Hand,cursive" font-size="'+fs+'" font-weight="700" fill="'+color+'">'+den+'</text>'
      + '</svg>';
  }

  // ── Interactive pizza with tappable slices ────────────────
  // Clicking a slice toggles it; answer updates live
  function interactivePizza(totalSlices, preShaded, color, size) {
    color = color || '#ff6348';
    size  = size  || 140;
    var cx = size/2, cy = size/2, r = size/2 - 6;
    var crust = '#b85c1a';
    var id = 'pizza_' + Math.floor(Math.random()*99999);

    // Pre-compute slice paths
    var slicePaths = [];
    for (var i = 0; i < totalSlices; i++) {
      var a1 = (i/totalSlices)*2*Math.PI - Math.PI/2;
      var a2 = ((i+1)/totalSlices)*2*Math.PI - Math.PI/2;
      var x1 = cx + r*Math.cos(a1), y1 = cy + r*Math.sin(a1);
      var x2 = cx + r*Math.cos(a2), y2 = cy + r*Math.sin(a2);
      var large = (1/totalSlices) > 0.5 ? 1 : 0;
      slicePaths.push({x1:x1.toFixed(1),y1:y1.toFixed(1),x2:x2.toFixed(1),y2:y2.toFixed(1),large:large});
    }

    var sliceSvg = '';
    for (var i = 0; i < totalSlices; i++) {
      var sp = slicePaths[i];
      var isShaded = i < preShaded;
      sliceSvg += '<path id="'+id+'_s'+i+'" '
        + 'd="M'+cx+','+cy+' L'+sp.x1+','+sp.y1+' A'+r+','+r+' 0 '+sp.large+',1 '+sp.x2+','+sp.y2+' Z" '
        + 'fill="'+(isShaded?color:'#1e1e2e')+'" stroke="#fff" stroke-width="2.5" '
        + 'style="cursor:pointer;transition:fill .18s,transform .18s;transform-origin:'+cx+'px '+cy+'px" '
        + 'onclick="window._fracPizzaClick(\''+id+'\','+i+','+totalSlices+')" '
        + 'onmouseover="this.style.transform=\'scale(1.06)\';this.style.filter=\'brightness(1.3)\'" '
        + 'onmouseout="this.style.transform=\'scale(1)\';this.style.filter=\'none\'"/>';
    }
    // Topping dots on shaded slices
    var toppings = '';
    for (var i = 0; i < Math.min(preShaded, totalSlices); i++) {
      var midA = ((i+0.5)/totalSlices)*2*Math.PI - Math.PI/2;
      var tr = r*0.55;
      var tx = cx + tr*Math.cos(midA), ty = cy + tr*Math.sin(midA);
      toppings += '<circle cx="'+tx.toFixed(1)+'" cy="'+ty.toFixed(1)+'" r="4" fill="#8b0000" opacity="0.7"/>';
    }

    var svg = '<svg id="'+id+'" width="'+size+'" height="'+size+'" viewBox="0 0 '+size+' '+size+'" style="display:block;margin:0 auto;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.5))">'
      + '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="'+crust+'" stroke="#fff" stroke-width="2"/>'
      + sliceSvg + toppings
      + '<text id="'+id+'_lbl" x="'+cx+'" y="'+(size+20)+'" text-anchor="middle" font-family="Caveat,cursive" font-size="16" fill="#adb5bd">'+preShaded+' / '+totalSlices+'</text>'
      + '</svg>';

    var script = '<script>window._fracPizzaState=window._fracPizzaState||{};'
      + 'window._fracPizzaState["'+id+'"]={count:'+preShaded+',total:'+totalSlices+',color:"'+color+'"};'
      + 'window._fracPizzaClick=function(id,idx,total){'
      + 'var st=window._fracPizzaState[id];if(!st)return;'
      + 'var el=document.getElementById(id+"_s"+idx);'
      + 'var on=el.getAttribute("fill")!=="'+color.replace('#','\\x23')+'";'  // toggled
      // Simpler: count shaded
      + 'var shaded=0;for(var i=0;i<total;i++){var s=document.getElementById(id+"_s"+i);if(s&&s.getAttribute("fill")!=="#1e1e2e")shaded++;}'
      + 'el.setAttribute("fill",on?"'+color+'"+"":"#1e1e2e");'
      + 'shaded=0;for(var i=0;i<total;i++){var s=document.getElementById(id+"_s"+i);if(s&&s.getAttribute("fill")!=="#1e1e2e")shaded++;}'
      + 'st.count=shaded;'
      + 'var lbl=document.getElementById(id+"_lbl");if(lbl)lbl.textContent=shaded+" / "+total;'
      + 'window._shapeAnswer(shaded);'
      + '};'
      + '<\/script>';

    return svg + script;
  }

  // Simpler non-interactive pizza (for display)
  function staticPizza(n, d, color, size) {
    color = color || '#ff6348';
    size  = size  || 130;
    var cx=size/2, cy=size/2, r=size/2-6;
    var slices='';
    for(var i=0;i<d;i++){
      var a1=(i/d)*2*Math.PI-Math.PI/2, a2=((i+1)/d)*2*Math.PI-Math.PI/2;
      var x1=cx+r*Math.cos(a1),y1=cy+r*Math.sin(a1),x2=cx+r*Math.cos(a2),y2=cy+r*Math.sin(a2);
      var lg=(1/d)>.5?1:0;
      var fill=i<n?color:'#1e1e2e';
      // Topping on shaded slice
      var topping='';
      if(i<n){var ma=((i+.5)/d)*2*Math.PI-Math.PI/2,tr=r*.55;topping='<circle cx="'+(cx+tr*Math.cos(ma)).toFixed(1)+'" cy="'+(cy+tr*Math.sin(ma)).toFixed(1)+'" r="3.5" fill="#8b0000" opacity=".7"/>';}
      slices+='<path d="M'+cx+','+cy+' L'+x1.toFixed(1)+','+y1.toFixed(1)+' A'+r+','+r+' 0 '+lg+',1 '+x2.toFixed(1)+','+y2.toFixed(1)+' Z" fill="'+fill+'" stroke="#fff" stroke-width="2.5"/>'+topping;
    }
    return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 '+size+' '+size+'" style="display:block;margin:0 auto;filter:drop-shadow(0 4px 14px rgba(0,0,0,.5))">'
      +'<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="#b85c1a" stroke="#fff" stroke-width="2"/>'+slices+'</svg>';
  }

  // ── Interactive bar — tap segments to shade ───────────────
  function interactiveBar(d, preShaded, color, w, h) {
    color = color || '#54a0ff';
    w = w || 260; h = h || 48;
    var id = 'bar_' + Math.floor(Math.random()*99999);
    var cw = w/d;
    var cells = '';
    for(var i=0;i<d;i++){
      var filled=i<preShaded;
      cells+='<rect id="'+id+'_c'+i+'" x="'+(i*cw+2).toFixed(1)+'" y="2" width="'+(cw-4).toFixed(1)+'" height="'+(h-4)+'"'
        +' fill="'+(filled?color:'#1e1e2e')+'" stroke="'+color+'" stroke-width="2" rx="6"'
        +' style="cursor:pointer;transition:fill .15s,filter .15s"'
        +' onclick="window._fracBarClick(\''+id+'\','+i+','+d+',\''+color+'\')"'
        +' onmouseover="this.style.filter=\'brightness(1.4)\'" onmouseout="this.style.filter=\'none\'"/>';
    }
    var svg='<svg id="'+id+'" width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'" style="display:block;margin:0 auto">'
      +cells+'</svg>';
    var script='<script>window._fracBarClick=function(id,idx,total,color){'
      +'var el=document.getElementById(id+"_c"+idx);if(!el)return;'
      +'var on=el.getAttribute("fill")!==color;'
      +'el.setAttribute("fill",on?color:"#1e1e2e");'
      +'var count=0;for(var i=0;i<total;i++){var c=document.getElementById(id+"_c"+i);if(c&&c.getAttribute("fill")===color)count++;}'
      +'window._shapeAnswer(count);'
      +'};'
      +'<\/script>';
    return svg+script;
  }

  // Static bar (display only)
  function staticBar(n, d, color, w, h) {
    color=color||'#54a0ff'; w=w||240; h=h||42;
    var cw=w/d, cells='';
    for(var i=0;i<d;i++){
      cells+='<rect x="'+(i*cw+2).toFixed(1)+'" y="2" width="'+(cw-4).toFixed(1)+'" height="'+(h-4)+'"'
        +' fill="'+(i<n?color:'#1e1e2e')+'" stroke="'+color+'" stroke-width="2" rx="5"/>';
    }
    return '<svg width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'" style="display:block;margin:0 auto">'+cells+'</svg>';
  }

  // ── Interactive grid — tap to shade squares ───────────────
  function interactiveGrid(total, preShaded, color) {
    color=color||'#2ed573';
    var cols=Math.min(total,6), rows=Math.ceil(total/cols);
    var cw=40,ch=40,gap=6;
    var W=cols*(cw+gap)-gap, H=rows*(ch+gap)-gap;
    var id='grid_'+Math.floor(Math.random()*99999);
    var cells='';
    for(var i=0;i<total;i++){
      var col=i%cols,row=Math.floor(i/cols);
      var x=col*(cw+gap),y=row*(ch+gap);
      var filled=i<preShaded;
      cells+='<rect id="'+id+'_g'+i+'" x="'+x+'" y="'+y+'" width="'+cw+'" height="'+ch+'"'
        +' fill="'+(filled?color:'#1e1e2e')+'" stroke="'+color+'" stroke-width="2" rx="8"'
        +' style="cursor:pointer;transition:fill .15s,transform .15s;transform-origin:'+(x+cw/2)+'px '+(y+ch/2)+'px"'
        +' onclick="window._fracGridClick(\''+id+'\','+i+','+total+',\''+color+'\')"'
        +' onmouseover="this.style.transform=\'scale(1.12)\'" onmouseout="this.style.transform=\'scale(1)\'"/>';
    }
    var svg='<svg id="'+id+'" width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" style="display:block;margin:0 auto">'+cells+'</svg>';
    var script='<script>window._fracGridClick=function(id,idx,total,color){'
      +'var el=document.getElementById(id+"_g"+idx);if(!el)return;'
      +'var on=el.getAttribute("fill")!==color;'
      +'el.setAttribute("fill",on?color:"#1e1e2e");'
      +'var count=0;for(var i=0;i<total;i++){var c=document.getElementById(id+"_g"+i);if(c&&c.getAttribute("fill")===color)count++;}'
      +'window._shapeAnswer(count);'
      +'};'
      +'<\/script>';
    return svg+script;
  }

  // Static grid
  function staticGrid(n, total, color) {
    color=color||'#2ed573';
    var cols=Math.min(total,6), rows=Math.ceil(total/cols);
    var cw=36,ch=36,gap=5;
    var W=cols*(cw+gap)-gap, H=rows*(ch+gap)-gap;
    var cells='';
    for(var i=0;i<total;i++){
      var col=i%cols,row=Math.floor(i/cols);
      cells+='<rect x="'+(col*(cw+gap))+'" y="'+(row*(ch+gap))+'" width="'+cw+'" height="'+ch+'"'
        +' fill="'+(i<n?color:'#1e1e2e')+'" stroke="'+color+'" stroke-width="2" rx="7"/>';
    }
    return '<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" style="display:block;margin:0 auto">'+cells+'</svg>';
  }

  // ── Interactive chocolate bar ─────────────────────────────
  function chocoBar(rows, cols, preShaded, color) {
    color=color||'#8b4513';
    var cw=36,ch=28,gap=4;
    var W=cols*(cw+gap)-gap, H=rows*(ch+gap)-gap;
    var total=rows*cols;
    var id='choco_'+Math.floor(Math.random()*99999);
    var cells='';
    for(var i=0;i<total;i++){
      var col=i%cols, row=Math.floor(i/cols);
      var x=col*(cw+gap), y=row*(ch+gap);
      var filled=i<preShaded;
      cells+='<rect id="'+id+'_ch'+i+'" x="'+x+'" y="'+y+'" width="'+cw+'" height="'+ch+'"'
        +' fill="'+(filled?color:'#2d1b0a')+'" stroke="#5c2d0a" stroke-width="2.5" rx="5"'
        +' style="cursor:pointer;transition:fill .15s"'
        +' onclick="window._fracGridClick(\''+id+'_ch\','+i+','+total+',\''+color+'\')"'
        +' onmouseover="this.style.filter=\'brightness(1.3)\'" onmouseout="this.style.filter=\'none\'"/>';
      // Shine detail on filled squares
      if(filled)cells+='<rect x="'+(x+4)+'" y="'+(y+3)+'" width="'+(cw-8)+'" height="4" fill="rgba(255,255,255,.12)" rx="2"/>';
    }
    var svg='<svg id="'+id+'" width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" style="display:block;margin:0 auto;filter:drop-shadow(0 3px 8px rgba(0,0,0,.5))">'+cells+'</svg>';
    var script='<script>window._fracGridClick=window._fracGridClick||function(id,idx,total,color){'
      +'var el=document.getElementById(id+idx);if(!el)return;'
      +'var on=el.getAttribute("fill")!==color;el.setAttribute("fill",on?color:"#2d1b0a");'
      +'var count=0;for(var i=0;i<total;i++){var c=document.getElementById(id+i);if(c&&c.getAttribute("fill")===color)count++;}'
      +'window._shapeAnswer(count);'
      +'};'
      +'<\/script>';
    return svg+script;
  }

  // ── Animated number line ──────────────────────────────────
  function numberLine(n, d, w) {
    w=w||280;
    var h=60, pad=20;
    var iw=w-pad*2;
    var tickY=30, labelY=50;
    var segments='';
    // Shaded region
    var shadeW=iw*(n/d);
    segments+='<rect x="'+pad+'" y="'+(tickY-8)+'" width="'+shadeW.toFixed(1)+'" height="16" fill="rgba(84,160,255,.3)" rx="4"/>';
    // Line
    segments+='<line x1="'+pad+'" y1="'+tickY+'" x2="'+(pad+iw)+'" y2="'+tickY+'" stroke="#fff" stroke-width="2.5"/>';
    // Arrow
    segments+='<polygon points="'+(pad+iw)+','+(tickY-5)+' '+(pad+iw+10)+','+tickY+' '+(pad+iw)+','+(tickY+5)+'" fill="#fff"/>';
    // Ticks + labels
    for(var i=0;i<=d;i++){
      var x=pad+iw*(i/d);
      segments+='<line x1="'+x.toFixed(1)+'" y1="'+(tickY-7)+'" x2="'+x.toFixed(1)+'" y2="'+(tickY+7)+'" stroke="#fff" stroke-width="2"/>';
      segments+='<text x="'+x.toFixed(1)+'" y="'+labelY+'" text-anchor="middle" font-family="Caveat,cursive" font-size="14" fill="#adb5bd">'+i+'/'+d+'</text>';
    }
    // Marker
    var markerX=pad+iw*(n/d);
    segments+='<circle cx="'+markerX.toFixed(1)+'" cy="'+tickY+'" r="8" fill="#ffd32a" stroke="#fff" stroke-width="2"/>';
    segments+='<text x="'+markerX.toFixed(1)+'" y="'+(tickY-14)+'" text-anchor="middle" font-family="Caveat,cursive" font-size="13" font-weight="700" fill="#ffd32a">'+n+'/'+d+'</text>';
    return '<svg width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'" style="display:block;margin:0 auto">'+segments+'</svg>';
  }

  // ── Card wrapper with decorative border ──────────────────
  function card(inner, accent) {
    accent=accent||'#54a0ff';
    return '<div style="background:linear-gradient(135deg,rgba(255,255,255,.05),rgba(255,255,255,.02));'
      +'border:2px solid '+accent+'44;border-radius:18px;padding:14px 10px 10px;margin:6px 0;'
      +'box-shadow:0 4px 24px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.06)">'
      +inner+'</div>';
  }

  // ── Instruction chip ─────────────────────────────────────
  function chip(text, color) {
    color=color||'#ffd32a';
    return '<div style="display:inline-block;background:'+color+'22;border:1.5px solid '+color+'66;'
      +'border-radius:99px;padding:4px 14px;font-family:Caveat,cursive;font-size:.95rem;color:'+color+';margin-bottom:10px">'
      +text+'</div>';
  }

  // ── Handwriting-style hint arrow ─────────────────────────
  function arrowHint(text, color) {
    color=color||'#adb5bd';
    return '<div style="color:'+color+';font-family:Caveat,cursive;font-size:.9rem;margin-top:8px;opacity:.85">'
      +'&#x2197; '+text+'</div>';
  }

  // Load Caveat font (handwriting) once
  var fontLink='<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap" rel="stylesheet">';

  // Determine question type pool
  var easyTypes   = ['pizza_tap','bar_tap','grid_tap','pizza_identify','pizza_word_simple'];
  var medTypes    = ['compare_bar','missing_eq','bar_add','pizza_word_hard','chocolate_tap','numline'];
  var hardTypes   = ['equivalent_drag','add_visual','subtract_visual','mixed_bars','word_story_grid','compare_pizza'];
  var pool = diff==='easy' ? easyTypes : diff==='medium' ? medTypes : hardTypes;
  var qtype = pick(pool);

  var colors6 = ['#ff6348','#54a0ff','#2ed573','#ffd32a','#c77dff','#ff9f43'];

  // ════════════════════════════════════════════════════════════
  // TYPE 1: TAP PIZZA SLICES — interactive, tap to select answer
  if (qtype === 'pizza_tap') {
    var pairs=[[1,2],[1,4],[3,4],[1,3],[2,3],[1,6],[5,6],[2,4]];
    var fr=pick(pairs); var n=fr[0],d=fr[1];
    var color=pick(['#ff6348','#ee5a24','#ff9f43']);
    var things=['\u05e4\u05d9\u05e6\u05d4','\u05e2\u05d5\u05d2\u05d4','\u05d8\u05d0\u05e8\u05d8'];
    var thing=pick(things);
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: fontLink
        + card(
            chip('\u05dc\u05d7\u05e5 \u05e2\u05dc \u05d4\u05d7\u05ea\u05d9\u05db\u05d5\u05ea \u05e9\u05e8\u05d5\u05e6\u05d4 \u05dc\u05e6\u05d1\u05d5\u05e2!','#ffd32a')
          + '<div style="direction:ltr;text-align:center;font-family:Caveat,cursive;font-size:1.15rem;color:#fff;margin-bottom:12px">'
          + 'Shade <span style="color:#ffd32a;font-size:1.3em;font-weight:700">' + fracSvg(n,d,{color:'#ffd32a',size:1.1}) + '</span> of the '+thing
          + '</div>'
          + interactivePizza(d, 0, color, 140)
          + arrowHint('\u05db\u05de\u05d4 \u05d7\u05ea\u05d9\u05db\u05d5\u05ea \u05e6\u05d1\u05e2\u05ea?')
          ,'#ff6348')
        + '<div style="font-size:.75rem;color:#636e72;text-align:center;margin-top:4px;font-family:Caveat,cursive">\u05d4\u05ea\u05e9\u05d5\u05d1\u05d4 \u05de\u05ea\u05e2\u05d3\u05db\u05e0\u05ea \u05d0\u05d5\u05d8\u05d5\u05de\u05d8\u05d9\u05ea \u05d1\u05dc\u05d7\u05d9\u05e6\u05d4</div>',
      answer:n, hint:{type:'text',msg:'&#x1F4A1; \u05e6\u05d1\u05e2 '+n+' \u05d7\u05ea\u05d9\u05db\u05d5\u05ea \u05de\u05ea\u05d5\u05da '+d}, showMul:false, dir:'rtl'};
  }

  // TYPE 2: TAP BAR SEGMENTS
  if (qtype === 'bar_tap') {
    var pairs=[[1,2],[1,4],[3,4],[1,3],[2,3],[1,5],[2,5],[3,5],[4,5],[1,6],[5,6]];
    var fr=pick(pairs); var n=fr[0],d=fr[1];
    var color=pick(colors6);
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: fontLink
        + card(
            chip('\u05dc\u05d7\u05e5 \u05e2\u05dc \u05ea\u05d0\u05d9\u05dd \u05dc\u05e6\u05d1\u05d9\u05e2\u05d4!','#ffd32a')
          + '<div style="direction:ltr;text-align:center;font-family:Caveat,cursive;font-size:1.1rem;color:#fff;margin-bottom:12px">'
          + 'Color ' + fracSvg(n,d,{color:'#ffd32a',size:1.1}) + ' of the bar'
          + '</div>'
          + interactiveBar(d, 0, color, 260, 50)
          + arrowHint('\u05db\u05de\u05d4 \u05ea\u05d0\u05d9\u05dd \u05e6\u05d1\u05e2\u05ea?')
          , color)
        + '<div style="font-size:.75rem;color:#636e72;text-align:center;margin-top:4px;font-family:Caveat,cursive">\u05d4\u05ea\u05e9\u05d5\u05d1\u05d4 \u05de\u05ea\u05e2\u05d3\u05db\u05e0\u05ea \u05d0\u05d5\u05d2\u05de\u05d8\u05d9\u05ea</div>',
      answer:n, hint:{type:'text',msg:'&#x1F4A1; \u05e6\u05d1\u05e2 '+n+' \u05ea\u05d0\u05d9\u05dd \u05de\u05ea\u05d5\u05da '+d}, showMul:false, dir:'rtl'};
  }

  // TYPE 3: TAP GRID SQUARES
  if (qtype === 'grid_tap') {
    var totals=[4,6,8,9,10,12];
    var total=pick(totals);
    var n=rnd(1,total-1);
    var color=pick(colors6);
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: fontLink
        + card(
            chip('\u05dc\u05d7\u05e5 \u05e2\u05dc \u05e8\u05d9\u05d1\u05d5\u05e2\u05d9\u05dd \u05dc\u05e6\u05d1\u05d9\u05e2\u05d4!','#ffd32a')
          + '<div style="direction:ltr;text-align:center;font-family:Caveat,cursive;font-size:1.1rem;color:#fff;margin-bottom:12px">'
          + 'Color ' + fracSvg(n,total,{color:'#ffd32a',size:1.05}) + ' of the squares'
          + '</div>'
          + interactiveGrid(total, 0, color)
          + arrowHint('\u05db\u05de\u05d4 \u05e8\u05d9\u05d1\u05d5\u05e2\u05d9\u05dd \u05e6\u05d1\u05e2\u05ea?')
          , color)
        + '<div style="font-size:.75rem;color:#636e72;text-align:center;margin-top:4px;font-family:Caveat,cursive">\u05d4\u05ea\u05e9\u05d5\u05d1\u05d4 \u05de\u05ea\u05e2\u05d3\u05db\u05e0\u05ea \u05d0\u05d5\u05d8\u05d5\u05de\u05d8\u05d9\u05ea</div>',
      answer:n, hint:{type:'text',msg:'&#x1F4A1; \u05e6\u05d1\u05e2 '+n+' \u05de\u05ea\u05d5\u05da '+total+' \u05e8\u05d9\u05d1\u05d5\u05e2\u05d9\u05dd'}, showMul:false, dir:'rtl'};
  }

  // TYPE 4: IDENTIFY — what fraction is the shaded pizza?
  if (qtype === 'pizza_identify') {
    var pairs=[[1,2],[1,4],[3,4],[1,3],[2,3],[1,6],[5,6],[1,8],[3,8]];
    var fr=pick(pairs); var n=fr[0],d=fr[1];
    var color=pick(['#ff6348','#ee5a24']);
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: fontLink
        + card(
            chip('\u05de\u05d4 \u05d4\u05e9\u05d1\u05e8? \u05db\u05ea\u05d5\u05d1 \u05d0\u05ea \u05d4\u05e0\u05d5\u05de\u05e8\u05d8\u05d5\u05e8 (\u05d4\u05de\u05e1\u05e4\u05e8 \u05d4\u05e2\u05dc\u05d9\u05d5\u05df)!','#2ed573')
          + staticPizza(n,d,color,135)
          + '<div style="direction:ltr;text-align:center;font-family:Caveat,cursive;font-size:1.1rem;color:#adb5bd;margin-top:10px">'
          + 'The pizza is cut into <span style="color:#ffd32a;font-size:1.2em;font-weight:700">'+d+'</span> equal slices.'
          + '</div>'
          + '<div style="direction:ltr;text-align:center;font-family:Caveat,cursive;font-size:1.05rem;color:#fff;margin-top:6px">'
          + fracSvg('?',d,{color:'#2ed573',size:1.1}) + ' <span style="color:#adb5bd">of the pizza is shaded</span>'
          + '</div>'
          , '#2ed573')
        + arrowHint('\u05db\u05ea\u05d5\u05d1 \u05d0\u05ea \u05d4\u05e0\u05d5\u05de\u05e8\u05d8\u05d5\u05e8'),
      answer:n, hint:{type:'text',msg:'&#x1F4A1; \u05e1\u05e4\u05d5\u05e8 \u05d0\u05ea \u05d4\u05d7\u05ea\u05d9\u05db\u05d5\u05ea \u05d4\u05e6\u05d1\u05d5\u05e2\u05d5\u05ea: '+n}, showMul:false, dir:'rtl'};
  }

  // TYPE 5: SIMPLE PIZZA WORD
  if (qtype === 'pizza_word_simple') {
    var d=pick([4,6,8]);
    var ate=rnd(1,d-1);
    var left=d-ate;
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: fontLink
        + card(
            staticPizza(left,d,'#ff6348',130)
          + '<div style="direction:rtl;text-align:center;font-family:Caveat,cursive;font-size:1.05rem;color:#fff;margin-top:10px;line-height:1.8">'
          + '\u05e4\u05d9\u05e6\u05d4 \u05e9\u05dc <span style="color:#ffd32a;font-size:1.2em">'+d+'</span> \u05d7\u05ea\u05d9\u05db\u05d5\u05ea. \u05d0\u05db\u05dc\u05d5 <span style="color:#ff6348;font-size:1.2em">'+ate+'</span> \u05d7\u05ea\u05d9\u05db\u05d5\u05ea.'
          + '<br>\u05db\u05de\u05d4 \u05d7\u05ea\u05d9\u05db\u05d5\u05ea <span style="color:#2ed573;font-size:1.3em">\u05e0\u05e9\u05d0\u05e8\u05d5</span>?'
          + '</div>'
          , '#ff6348'),
      answer:left, hint:{type:'text',msg:'&#x1F4A1; '+d+' - '+ate+' = '+left}, showMul:false, dir:'rtl'};
  }

  // TYPE 6: COMPARE TWO BARS — which is bigger?
  if (qtype === 'compare_bar') {
    var allP=[[1,2],[1,4],[3,4],[1,3],[2,3],[1,6],[5,6],[2,5],[3,5]];
    var fr1=pick(allP); var n1=fr1[0],d1=fr1[1];
    var fr2=pick(allP.filter(function(p){return !(p[0]===n1&&p[1]===d1);}));
    var n2=fr2[0],d2=fr2[1];
    if(Math.abs(n1/d1-n2/d2)<0.05){n2=n1+1;d2=d1*2;}
    var bigger=(n1/d1>=n2/d2)?1:2;
    var pct1=Math.round(n1/d1*100),pct2=Math.round(n2/d2*100);
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: fontLink
        + card(
            chip('\u05d0\u05d9\u05d6\u05d4 \u05e9\u05d1\u05e8 \u05d2\u05d3\u05d5\u05dc \u05d9\u05d5\u05ea\u05e8? \u05db\u05ea\u05d5\u05d1 1 \u05d0\u05d5 2','#c77dff')
          + '<div style="display:flex;gap:14px;align-items:flex-end;justify-content:center;margin-bottom:8px">'
          + '<div style="text-align:center">'
            + '<div style="font-family:Caveat,cursive;font-size:1rem;color:#adb5bd;margin-bottom:4px">1</div>'
            + staticBar(n1,d1,'#54a0ff',120,38)
            + '<div style="margin-top:6px">' + fracSvg(n1,d1,{color:'#54a0ff',size:1}) + '</div>'
          + '</div>'
          + '<div style="font-family:Caveat,cursive;font-size:1.8rem;color:#fff;font-weight:700;padding-bottom:16px">VS</div>'
          + '<div style="text-align:center">'
            + '<div style="font-family:Caveat,cursive;font-size:1rem;color:#adb5bd;margin-bottom:4px">2</div>'
            + staticBar(n2,d2,'#ff6348',120,38)
            + '<div style="margin-top:6px">' + fracSvg(n2,d2,{color:'#ff6348',size:1}) + '</div>'
          + '</div>'
          + '</div>'
          + '<div style="direction:ltr;text-align:center;font-family:Caveat,cursive;font-size:.85rem;color:#636e72">'
          + '(1)='+pct1+'%  (2)='+pct2+'%</div>'
          , '#c77dff'),
      answer:bigger, hint:{type:'text',msg:'&#x1F4A1; '+n1+'/'+d1+' = '+pct1+'%  |  '+n2+'/'+d2+' = '+pct2+'%'}, showMul:false, dir:'rtl'};
  }

  // TYPE 7: MISSING NUMERATOR (equivalent fraction shown visually)
  if (qtype === 'missing_eq') {
    var bases=[[1,2],[1,4],[1,3],[2,3],[3,4]];
    var fr=pick(bases); var n=fr[0],d=fr[1];
    var mult=rnd(2,4);
    var n2=n*mult,d2=d*mult;
    var askNum=Math.random()<.5;
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: fontLink
        + card(
            chip('\u05e9\u05e0\u05d9 \u05d4\u05e9\u05d1\u05e8\u05d9\u05dd \u05e9\u05d5\u05d5\u05d9\u05dd! \u05de\u05e6\u05d0 \u05d0\u05ea ?','#ffd32a')
          + '<div style="display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;margin-bottom:6px">'
          + '<div style="text-align:center">'
            + staticBar(n,d,'#54a0ff',120,36)
            + '<div style="margin-top:5px">' + fracSvg(n,d,{color:'#54a0ff',size:1}) + '</div>'
          + '</div>'
          + '<div style="font-family:Caveat,cursive;font-size:2rem;color:#fff">=</div>'
          + '<div style="text-align:center">'
            + staticBar(n2,d2,'#ffd32a',120,36)
            + '<div style="margin-top:5px">' + fracSvg(askNum?'?':n2, askNum?d2:'?', {color:'#ffd32a',size:1}) + '</div>'
          + '</div>'
          + '</div>'
          + '<div style="direction:ltr;text-align:center;font-family:Caveat,cursive;font-size:.88rem;color:#636e72;margin-top:4px">× '+mult+' / × '+mult+'</div>'
          , '#ffd32a'),
      answer:askNum?n2:d2, hint:{type:'text',msg:'&#x1F4A1; \u05db\u05e4\u05d5\u05dc '+mult+': '+n+'×'+mult+'='+n2+', '+d+'×'+mult+'='+d2}, showMul:false, dir:'rtl'};
  }

  // TYPE 8: ADD FRACTIONS with bar animation
  if (qtype === 'bar_add') {
    var d=pick([2,3,4,5,6,8]);
    var n1=rnd(1,d-2);
    var n2=rnd(1,d-n1);
    var ans=n1+n2;
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: fontLink
        + card(
            chip('\u05d7\u05d1\u05e8 \u05e9\u05d1\u05e8\u05d9\u05dd \u05e2\u05dd \u05d0\u05d5\u05ea\u05d5 \u05de\u05db\u05e0\u05d4!','#2ed573')
          + '<div style="direction:ltr;font-family:Caveat,cursive;font-size:1.1rem;text-align:center;margin-bottom:10px;color:#fff">'
          + fracSvg(n1,d,{color:'#54a0ff',size:1.05}) + ' + ' + fracSvg(n2,d,{color:'#ff6348',size:1.05}) + ' = ' + fracSvg('?',d,{color:'#2ed573',size:1.05})
          + '</div>'
          + '<div style="display:flex;align-items:center;gap:6px;justify-content:center;flex-wrap:wrap">'
          + staticBar(n1,d,'#54a0ff',120,36)
          + '<span style="color:#fff;font-family:Caveat,cursive;font-size:1.4rem">+</span>'
          + staticBar(n2,d,'#ff6348',120,36)
          + '</div>'
          + '<div style="font-family:Caveat,cursive;font-size:.85rem;color:#636e72;text-align:center;margin-top:6px">'
          + n1+' + '+n2+' = ? (\u05d4\u05de\u05db\u05e0\u05d4 \u05e0\u05e9\u05d0\u05e8 '+d+')'
          + '</div>'
          , '#2ed573'),
      answer:ans, hint:{type:'text',msg:'&#x1F4A1; '+n1+' + '+n2+' = '+ans}, showMul:false, dir:'rtl'};
  }

  // TYPE 9: PIZZA WORD HARD — fraction eaten, how many left
  if (qtype === 'pizza_word_hard') {
    var d=pick([6,8,12]);
    var fr=pick([[1,3],[2,3],[1,4],[3,4],[1,2]]);
    var n=fr[0],base=fr[1];
    // Find total divisible by base
    var total=d;
    while(total%base!==0)total++;
    var ate=total*n/base;
    var left=total-ate;
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: fontLink
        + card(
            staticPizza(left, total, '#ff6348', 130)
          + '<div style="direction:rtl;text-align:center;font-family:Caveat,cursive;font-size:1rem;color:#fff;line-height:1.9;margin-top:10px">'
          + '\u05e4\u05d9\u05e6\u05d4 \u05e9\u05dc <span style="color:#ffd32a;font-weight:700">'+total+'</span> \u05d7\u05ea\u05d9\u05db\u05d5\u05ea.'
          + '<br>\u05d0\u05db\u05dc\u05d5 ' + fracSvg(n,base,{color:'#ff6348',size:.95}) + ' \u05de\u05d4\u05e4\u05d9\u05e6\u05d4.'
          + '<br>\u05db\u05de\u05d4 \u05d7\u05ea\u05d9\u05db\u05d5\u05ea <span style="color:#2ed573">\u05e0\u05e9\u05d0\u05e8\u05d5</span>?'
          + '</div>'
          , '#ff6348'),
      answer:left, hint:{type:'text',msg:'&#x1F4A1; '+total+' × '+n+'/'+base+' = '+ate+' \u05e0\u05d0\u05db\u05dc. '+total+' - '+ate+' = '+left}, showMul:false, dir:'rtl'};
  }

  // TYPE 10: CHOCOLATE BAR (interactive grid)
  if (qtype === 'chocolate_tap') {
    var configs=[[2,4],[3,4],[2,6],[3,6]];
    var cfg=pick(configs); var rows=cfg[0],cols=cfg[1];
    var total=rows*cols;
    var n=rnd(1,total-1);
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: fontLink
        + card(
            chip('\u05dc\u05d7\u05e5 \u05e2\u05dc \u05e7\u05d5\u05d1\u05d9\u05d5\u05ea \u05e9\u05d5\u05e7\u05d5\u05dc\u05d3 \u05dc\u05e6\u05d1\u05d9\u05e2\u05d4!','#ff9f43')
          + '<div style="direction:ltr;text-align:center;font-family:Caveat,cursive;font-size:1.05rem;color:#fff;margin-bottom:10px">'
          + 'Color ' + fracSvg(n,total,{color:'#ff9f43',size:1.05}) + ' of the chocolate'
          + '</div>'
          + chocoBar(rows,cols,0,'#8b4513')
          + arrowHint('\u05db\u05de\u05d4 \u05e7\u05d5\u05d1\u05d9\u05d5\u05ea \u05e6\u05d1\u05e2\u05ea?')
          , '#ff9f43')
        + '<div style="font-size:.75rem;color:#636e72;text-align:center;margin-top:4px;font-family:Caveat,cursive">\u05d4\u05ea\u05e9\u05d5\u05d1\u05d4 \u05de\u05ea\u05e2\u05d3\u05db\u05e0\u05ea \u05d0\u05d5\u05d8\u05d5\u05de\u05d8\u05d9\u05ea</div>',
      answer:n, hint:{type:'text',msg:'&#x1F4A1; \u05e6\u05d1\u05e2 '+n+' \u05e7\u05d5\u05d1\u05d9\u05d5\u05ea \u05de\u05ea\u05d5\u05da '+total}, showMul:false, dir:'rtl'};
  }

  // TYPE 11: NUMBER LINE
  if (qtype === 'numline') {
    var d=pick([2,3,4,5,6]);
    var n=rnd(1,d-1);
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: fontLink
        + card(
            chip('\u05d0\u05d9\u05e4\u05d4 \u05e2\u05dc \u05e6\u05d9\u05e8 \u05d4\u05de\u05e1\u05e4\u05e8\u05d9\u05dd \u05e0\u05de\u05e6\u05d0 \u05d4\u05e9\u05d1\u05e8?','#54a0ff')
          + numberLine(n,d,270)
          + '<div style="direction:ltr;text-align:center;font-family:Caveat,cursive;font-size:1.05rem;color:#fff;margin-top:10px">'
          + 'The marker shows ' + fracSvg(n,d,{color:'#ffd32a',size:1.05})
          + '</div>'
          + '<div style="direction:rtl;text-align:center;font-family:Caveat,cursive;font-size:.95rem;color:#adb5bd;margin-top:4px">'
          + '\u05db\u05ea\u05d5\u05d1 \u05d0\u05ea \u05d4\u05e0\u05d5\u05de\u05e8\u05d8\u05d5\u05e8'
          + '</div>'
          , '#54a0ff'),
      answer:n, hint:{type:'text',msg:'&#x1F4A1; \u05d4\u05e1\u05de\u05df \u05e0\u05de\u05e6\u05d0 \u05d1 '+n+'/'+d}, showMul:false, dir:'rtl'};
  }

  // TYPE 12: EQUIVALENT DRAG — show two bars, find missing value
  if (qtype === 'equivalent_drag' || qtype === 'equivalent') {
    var bases=[[1,2],[1,3],[2,3],[1,4],[3,4]];
    var fr=pick(bases); var n=fr[0],d=fr[1];
    var mult=rnd(2,5);
    var n2=n*mult,d2=d*mult;
    var askN=Math.random()<.5;
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: fontLink
        + card(
            chip('\u05e9\u05d1\u05e8\u05d9\u05dd \u05e9\u05d5\u05d5\u05d9\u05dd — \u05de\u05e6\u05d0 ?','#c77dff')
          + '<div style="display:flex;align-items:center;justify-content:center;gap:12px;margin:8px 0;flex-wrap:wrap">'
          + '<div style="text-align:center">'
            + staticBar(n,d,'#54a0ff',120,36)
            + '<div style="margin-top:5px">' + fracSvg(n,d,{color:'#54a0ff',size:1}) + '</div>'
          + '</div>'
          + '<div style="font-family:Caveat,cursive;font-size:2rem;color:#fff;font-weight:700">=</div>'
          + '<div style="text-align:center">'
            + staticBar(n2,d2,'#c77dff',120,36)
            + '<div style="margin-top:5px">' + fracSvg(askN?'?':n2, askN?d2:'?', {color:'#c77dff',size:1}) + '</div>'
          + '</div>'
          + '</div>'
          + '<div style="direction:ltr;text-align:center;font-family:Caveat,cursive;color:#636e72;font-size:.85rem">multiply top and bottom by <span style="color:#ffd32a">'+mult+'</span></div>'
          , '#c77dff'),
      answer:askN?n2:d2, hint:{type:'text',msg:'&#x1F4A1; '+n+'×'+mult+'='+n2+', '+d+'×'+mult+'='+d2}, showMul:false, dir:'rtl'};
  }

  // TYPE 13: ADD VISUAL — animated bar fill
  if (qtype === 'add_visual') {
    var d=pick([2,3,4,5,6,8]);
    var n1=rnd(1,d-2);
    var n2=rnd(1,d-n1);
    var ans=n1+n2;
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: fontLink
        + card(
            chip('\u05d7\u05d1\u05e8 \u05e9\u05d1\u05e8\u05d9\u05dd!','#2ed573')
          + '<div style="direction:ltr;text-align:center;font-family:Caveat,cursive;font-size:1.1rem;color:#fff;margin-bottom:12px">'
          + fracSvg(n1,d,{color:'#54a0ff',size:1.05})
          + '<span style="font-size:1.4rem;vertical-align:middle"> + </span>'
          + fracSvg(n2,d,{color:'#ff6348',size:1.05})
          + '<span style="font-size:1.4rem;vertical-align:middle"> = </span>'
          + fracSvg('?',d,{color:'#2ed573',size:1.05})
          + '</div>'
          + '<div style="display:flex;gap:4px;justify-content:center">'
          + staticBar(n1,d,'#54a0ff',125,38)
          + staticBar(n2,d,'#ff6348',125,38)
          + '</div>'
          + '<div style="margin-top:8px;text-align:center">' + staticBar(ans,d,'#2ed573',260,38) + '</div>'
          + '<div style="direction:ltr;text-align:center;font-family:Caveat,cursive;color:#636e72;font-size:.85rem;margin-top:4px">'
          + n1+' + '+n2+' = ? (denominator stays '+d+')'
          + '</div>'
          , '#2ed573'),
      answer:ans, hint:{type:'text',msg:'&#x1F4A1; '+n1+' + '+n2+' = '+ans}, showMul:false, dir:'rtl'};
  }

  // TYPE 14: SUBTRACT VISUAL
  if (qtype === 'subtract_visual') {
    var d=pick([2,3,4,5,6,8]);
    var n1=rnd(2,d);
    var n2=rnd(1,n1-1);
    var ans=n1-n2;
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: fontLink
        + card(
            chip('\u05d7\u05e1\u05e8 \u05e9\u05d1\u05e8\u05d9\u05dd!','#ff6348')
          + '<div style="direction:ltr;text-align:center;font-family:Caveat,cursive;font-size:1.1rem;color:#fff;margin-bottom:12px">'
          + fracSvg(n1,d,{color:'#2ed573',size:1.05})
          + '<span style="font-size:1.4rem;vertical-align:middle"> &#x2212; </span>'
          + fracSvg(n2,d,{color:'#ff6348',size:1.05})
          + '<span style="font-size:1.4rem;vertical-align:middle"> = </span>'
          + fracSvg('?',d,{color:'#ffd32a',size:1.05})
          + '</div>'
          + '<div style="text-align:center">' + staticBar(n1,d,'#2ed573',260,38) + '</div>'
          + '<div style="display:flex;gap:4px;justify-content:center;margin-top:4px">'
          + staticBar(ans,d,'#ffd32a',125,38)
          + staticBar(n2,d,'#ff6348',125,38)
          + '</div>'
          , '#ff6348'),
      answer:ans, hint:{type:'text',msg:'&#x1F4A1; '+n1+' &#x2212; '+n2+' = '+ans}, showMul:false, dir:'rtl'};
  }

  // TYPE 15: MIXED BARS — count total unit fractions
  if (qtype === 'mixed_bars') {
    var d=pick([2,3,4]);
    var whole=rnd(1,3);
    var num=rnd(1,d-1);
    var total=whole*d+num;
    var mixC=['#54a0ff','#2ed573','#ffd32a','#ff6348'];
    var barsHtml='<div style="display:flex;flex-direction:column;gap:6px;align-items:center;margin-bottom:10px">';
    for(var i=0;i<whole;i++) barsHtml+=staticBar(d,d,mixC[i%mixC.length],220,34);
    barsHtml+=staticBar(num,d,'#c77dff',220,34)+'</div>';
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: fontLink
        + card(
            chip('\u05db\u05de\u05d4 \u05d7\u05dc\u05e7\u05d9\u05dd \u05d1\u05e1\u05da \u05d4\u05db\u05dc?','#c77dff')
          + barsHtml
          + '<div style="direction:ltr;text-align:center;font-family:Caveat,cursive;font-size:1rem;color:#fff">'
          + whole+' whole bars + ' + fracSvg(num,d,{color:'#c77dff',size:.95}) + ' = how many ' + fracSvg(1,d,{color:'#adb5bd',size:.85}) + ' pieces?'
          + '</div>'
          , '#c77dff'),
      answer:total, hint:{type:'text',msg:'&#x1F4A1; '+whole+'\u05e9\u05dc\u05de\u05d9\u05dd × '+d+' = '+(whole*d)+'. +'+num+' = '+total}, showMul:false, dir:'rtl'};
  }

  // TYPE 16: WORD STORY with grid
  if (qtype === 'word_story_grid') {
    var pairs=[[1,2],[1,4],[3,4],[1,3],[2,3]];
    var fr=pick(pairs); var n=fr[0],d=fr[1];
    var mults=[12,16,20,24].filter(function(t){return t%d===0;});
    var total=pick(mults)||d*4;
    var part=total*n/d;
    var color=pick(colors6);
    var stories=[
      '\u05d1\u05db\u05d9\u05ea\u05d4 \u05d9\u05e9 '+total+' \u05ea\u05dc\u05de\u05d9\u05d3\u05d9\u05dd. '+fracSvg(n,d,{color:'#ffd32a',size:.95})+' \u05de\u05d4\u05dd \u05de\u05d1\u05d9\u05d0\u05d9\u05dd \u05db\u05e8\u05d9\u05da.',
      '\u05d1\u05e4\u05d0\u05e8\u05e7 \u05d4\u05d9\u05d5 '+total+' \u05e6\u05d9\u05e4\u05d5\u05e8\u05d9\u05dd. '+fracSvg(n,d,{color:'#54a0ff',size:.95})+' \u05de\u05d4\u05df \u05e2\u05e4\u05d5.',
      '\u05dc\u05d3\u05e0\u05d9 \u05d9\u05e9 '+total+' \u05de\u05d8\u05d1\u05e2\u05d5\u05ea. \u05d4\u05d5\u05d0 \u05e0\u05ea\u05df '+fracSvg(n,d,{color:'#ff6348',size:.95})+' \u05dc\u05d0\u05d7\u05d5\u05ea\u05d5.',
    ];
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: fontLink
        + card(
            staticGrid(part,total,color)
          + '<div style="direction:rtl;text-align:center;font-family:Caveat,cursive;font-size:1rem;color:#fff;line-height:1.9;margin-top:10px">'
          + pick(stories)
          + '<br><span style="color:#2ed573">\u05db\u05de\u05d4?</span>'
          + '</div>'
          , color),
      answer:part, hint:{type:'text',msg:'&#x1F4A1; '+total+' ÷ '+d+' = '+(total/d)+'. × '+n+' = '+part}, showMul:false, dir:'rtl'};
  }

  // TYPE 17: COMPARE TWO PIZZAS
  if (qtype === 'compare_pizza') {
    var allP=[[1,2],[1,4],[3,4],[1,3],[2,3],[1,6],[5,6]];
    var fr1=pick(allP); var n1=fr1[0],d1=fr1[1];
    var fr2=pick(allP.filter(function(p){return !(p[0]===n1&&p[1]===d1);}));
    var n2=fr2[0],d2=fr2[1];
    if(Math.abs(n1/d1-n2/d2)<0.05){n2=n1;d2=d1+2;}
    var bigger=(n1/d1>=n2/d2)?1:2;
    return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
      shapeHtml: fontLink
        + card(
            chip('\u05d0\u05d9\u05d6\u05d4 \u05e4\u05d9\u05e6\u05d4 \u05d2\u05d3\u05d5\u05dc\u05d4 \u05d9\u05d5\u05ea\u05e8? \u05db\u05ea\u05d5\u05d1 1 \u05d0\u05d5 2','#ff6348')
          + '<div style="display:flex;gap:16px;justify-content:center;align-items:flex-end">'
          + '<div style="text-align:center">'
            + '<div style="font-family:Caveat,cursive;color:#adb5bd;font-size:1rem;margin-bottom:4px">1</div>'
            + staticPizza(n1,d1,'#ff6348',110)
            + '<div style="margin-top:6px">' + fracSvg(n1,d1,{color:'#ff6348',size:.95}) + '</div>'
          + '</div>'
          + '<div style="font-family:Caveat,cursive;font-size:1.8rem;color:#fff;font-weight:700;padding-bottom:12px">VS</div>'
          + '<div style="text-align:center">'
            + '<div style="font-family:Caveat,cursive;color:#adb5bd;font-size:1rem;margin-bottom:4px">2</div>'
            + staticPizza(n2,d2,'#54a0ff',110)
            + '<div style="margin-top:6px">' + fracSvg(n2,d2,{color:'#54a0ff',size:.95}) + '</div>'
          + '</div>'
          + '</div>'
          , '#ff6348'),
      answer:bigger, hint:{type:'text',msg:'&#x1F4A1; '+n1+'/'+d1+' = '+Math.round(n1/d1*100)+'%  vs  '+n2+'/'+d2+' = '+Math.round(n2/d2*100)+'%'}, showMul:false, dir:'rtl'};
  }

  // Fallback — interactive pizza
  var fr=pick([[1,2],[1,4],[3,4],[1,3],[2,3]]);
  var n=fr[0],d=fr[1];
  return {type:'num',cat:'fractions',diff,label:th.label,gameLabel:'',text:'',pts,
    shapeHtml: fontLink
      + card(
          chip('\u05e6\u05d1\u05e2 '+n+' \u05d7\u05ea\u05d9\u05db\u05d5\u05ea!','#ffd32a')
        + interactivePizza(d,0,'#ff6348',140)
        , '#ff6348'),
    answer:n, hint:{type:'text',msg:'&#x1F4A1; \u05e6\u05d1\u05e2 '+n+' \u05d7\u05ea\u05d9\u05db\u05d5\u05ea'}, showMul:false, dir:'rtl'};
}
