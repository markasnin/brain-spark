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
// genFrac — rich visual fraction questions with SVG shapes
// Types: pizza, bar, circle, grid, compare, word problems, 
//        add/subtract, equivalent, missing numerator, mixed
// ══════════════════════════════════════════════════════════════
function genFrac(diff, th) {

  // Pool of question types per difficulty
  const easyTypes   = ['pizza','bar','identify','of_total','circle_shade','shape_grid'];
  const medTypes    = ['compare','bar_shade','of_total','pizza_word','missing_num','shape_grid','add_frac'];
  const hardTypes   = ['mixed_num','add_frac','of_total_hard','subtract_frac','word_frac','equivalent','compare'];
  const pool = diff==='easy' ? easyTypes : diff==='medium' ? medTypes : hardTypes;
  const type = pick(pool);

  // ── Fraction rendered as a proper stacked fraction (numerator/line/denominator) ──
  function fracHtml(n, d, color) {
    color = color || '#fff';
    return '<span style="display:inline-flex;flex-direction:column;align-items:center;line-height:1.1;margin:0 5px;vertical-align:middle">'
      + '<span style="font-size:1.25em;font-weight:900;color:' + color + '">' + n + '</span>'
      + '<span style="border-top:3px solid ' + color + ';width:100%;min-width:20px;display:block;margin:2px 0"></span>'
      + '<span style="font-size:1.25em;font-weight:900;color:' + color + '">' + d + '</span>'
      + '</span>';
  }

  // ── Pizza / Circle SVG (d slices, n shaded) ──
  function pizzaSvg(n, d, color, size) {
    color = color || '#ff6348';
    size  = size  || 120;
    var cx = size/2, cy = size/2, r = size/2 - 5;
    var slices = '';
    for (var i = 0; i < d; i++) {
      var a1 = (i/d)*2*Math.PI - Math.PI/2;
      var a2 = ((i+1)/d)*2*Math.PI - Math.PI/2;
      var x1 = cx + r*Math.cos(a1), y1 = cy + r*Math.sin(a1);
      var x2 = cx + r*Math.cos(a2), y2 = cy + r*Math.sin(a2);
      var large = (1/d) > 0.5 ? 1 : 0;
      var fill = i < n ? color : '#2d2d2d';
      slices += '<path d="M' + cx + ',' + cy + ' L' + x1.toFixed(2) + ',' + y1.toFixed(2)
        + ' A' + r + ',' + r + ' 0 ' + large + ',1 ' + x2.toFixed(2) + ',' + y2.toFixed(2) + ' Z"'
        + ' fill="' + fill + '" stroke="#fff" stroke-width="2.5"/>';
    }
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:0 auto">'
      + '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#c97c22" stroke="#fff" stroke-width="2"/>'
      + slices + '</svg>';
  }

  // ── Bar SVG (d segments, n filled) ──
  function barSvg(n, d, color, w, h) {
    color = color || '#54a0ff';
    w = w || 240; h = h || 42;
    var cw = w/d;
    var cells = '';
    for (var i = 0; i < d; i++) {
      cells += '<rect x="' + (i*cw+1).toFixed(1) + '" y="1" width="' + (cw-2).toFixed(1) + '" height="' + (h-2) + '"'
        + ' fill="' + (i < n ? color : '#2d2d2d') + '" stroke="#fff" stroke-width="2" rx="5"/>';
    }
    return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:0 auto">'
      + cells + '</svg>';
  }

  // ── Grid of squares (total squares, n shaded) ──
  function gridSvg(n, total, color) {
    color = color || '#2ed573';
    var cols = Math.min(total, 6);
    var rows = Math.ceil(total/cols);
    var cw = 36, ch = 36, gap = 5;
    var W = cols*(cw+gap), H = rows*(ch+gap);
    var cells = '';
    for (var i = 0; i < total; i++) {
      var col = i%cols, row = Math.floor(i/cols);
      cells += '<rect x="' + (col*(cw+gap)) + '" y="' + (row*(ch+gap)) + '" width="' + cw + '" height="' + ch + '"'
        + ' fill="' + (i < n ? color : '#2d2d2d') + '" stroke="#fff" stroke-width="2" rx="7"/>';
    }
    return '<svg width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:0 auto">'
      + cells + '</svg>';
  }

  var pts = ptsForQ('fractions', diff);
  var colors = ['#ff6348','#54a0ff','#2ed573','#ffd32a','#c77dff','#ff9f43'];

  // ════════════════════════════════════════════════════════════
  // 1. PIZZA — identify shaded slices
  if (type === 'pizza' || type === 'identify') {
    var pairs = [[1,2],[1,4],[3,4],[1,3],[2,3],[1,6],[5,6],[1,8],[3,8],[5,8],[2,4]];
    var frac = pick(pairs); var n = frac[0], d = frac[1];
    var color = pick(['#ff6348','#ee5a24','#ff9f43','#e55039']);
    var things = ['\u05e4\u05d9\u05e6\u05d4','  \u05e2\u05d5\u05d2\u05d4','\u05d8\u05d0\u05e8\u05d8'];
    var thing = pick(things);
    return {type:'num', cat:'fractions', diff, label:th.label, gameLabel:'', text:'', shapeHtml:
      '<div style="text-align:center;padding:8px 0">'
      + '<div style="font-size:.82rem;color:#adb5bd;margin-bottom:6px">&#x1F355; ' + thing + ' \u05d7\u05ea\u05d5\u05db\u05d4 \u05dc-' + d + ' \u05d7\u05dc\u05e7\u05d9\u05dd \u05e9\u05d5\u05d5\u05d9\u05dd</div>'
      + pizzaSvg(n, d, color)
      + '<div style="margin-top:10px;font-size:.9rem;color:#fff">\u05db\u05de\u05d4 \u05d7\u05dc\u05e7\u05d9\u05dd <strong style="color:' + color + '">\u05e6\u05d1\u05d5\u05e2\u05d9\u05dd</strong>? (\u05d4\u05e0\u05d5\u05de\u05e8\u05d8\u05d5\u05e8)</div>'
      + '</div>',
      answer: n, pts, hint:{type:'text',msg:'&#x1F4A1; \u05e1\u05e4\u05d5\u05e8 \u05d0\u05ea \u05d4\u05d7\u05dc\u05e7\u05d9\u05dd \u05d4\u05e6\u05d1\u05d5\u05e2\u05d9\u05dd: ' + n + ' \u05d7\u05dc\u05e7\u05d9\u05dd \u05de\u05ea\u05d5\u05da ' + d}, showMul:false, dir:'rtl'};
  }

  // 2. BAR — identify shaded segments
  if (type === 'bar' || type === 'bar_shade') {
    var pairs = [[1,2],[1,4],[3,4],[2,3],[1,3],[1,5],[2,5],[3,5],[4,5],[1,6],[5,6],[1,8],[3,8]];
    var frac = pick(pairs); var n = frac[0], d = frac[1];
    var color = pick(colors);
    return {type:'num', cat:'fractions', diff, label:th.label, gameLabel:'', text:'', shapeHtml:
      '<div style="text-align:center;padding:8px 0">'
      + '<div style="font-size:.82rem;color:#adb5bd;margin-bottom:8px">\u05de\u05d4 \u05d4\u05e9\u05d1\u05e8 \u05e9\u05de\u05d9\u05d5\u05e6\u05d2 \u05d1\u05e4\u05e1?</div>'
      + barSvg(n, d, color)
      + '<div style="margin-top:10px;font-size:.9rem;color:#fff">\u05d4\u05db\u05e0\u05e1 \u05d0\u05ea \u05d4\u05e0\u05d5\u05de\u05e8\u05d8\u05d5\u05e8 (\u05d4\u05de\u05e1\u05e4\u05e8 \u05d4\u05e2\u05dc\u05d9\u05d5\u05df):</div>'
      + '</div>',
      answer: n, pts, hint:{type:'text',msg:'&#x1F4A1; ' + n + ' \u05e4\u05e1\u05d9\u05dd \u05e6\u05d1\u05d5\u05e2\u05d9\u05dd \u05de\u05ea\u05d5\u05da ' + d}, showMul:false, dir:'rtl'};
  }

  // 3. OF_TOTAL — fraction of a number, shown with grid
  if (type === 'of_total' || type === 'of_total_hard' || type === 'circle_shade') {
    var pairs = diff==='hard'
      ? [[2,3],[3,4],[2,5],[3,5],[4,5],[5,6],[3,8],[5,8]]
      : [[1,2],[1,4],[3,4],[1,3],[2,3],[1,5],[1,6]];
    var frac = pick(pairs); var n = frac[0], d = frac[1];
    var total = rnd(2,6)*d;
    var part = total*n/d;
    var things = ['\u05ea\u05e4\u05d5\u05d7\u05d9\u05dd','\u05db\u05d5\u05db\u05d1\u05d9\u05dd','\u05e2\u05d5\u05d2\u05d9\u05d5\u05ea','\u05de\u05d8\u05d1\u05e2\u05d5\u05ea','\u05d1\u05dc\u05d5\u05e0\u05d9\u05dd','\u05e4\u05e8\u05d7\u05d9\u05dd'];
    var thing = pick(things);
    var color = pick(colors);
    return {type:'num', cat:'fractions', diff, label:th.label, gameLabel:'', text:'', shapeHtml:
      '<div style="text-align:center;padding:8px 0">'
      + gridSvg(part, total, color)
      + '<div style="margin-top:10px;font-size:1rem;color:#fff;direction:rtl">'
      + fracHtml(n, d, '#ffd32a') + ' \u05de\u05ea\u05d5\u05da ' + total + ' ' + thing + '. \u05db\u05de\u05d4 ' + thing + ' \u05e6\u05d1\u05d5\u05e2\u05d9\u05dd?'
      + '</div></div>',
      answer: part, pts, hint:{type:'text',msg:'&#x1F4A1; ' + total + ' ÷ ' + d + ' = ' + (total/d) + '. × ' + n + ' = ' + part}, showMul:false, dir:'rtl'};
  }

  // 4. PIZZA WORD — slices eaten, slices left
  if (type === 'pizza_word') {
    var denoms = [4, 6, 8];
    var d = pick(denoms);
    var ate = rnd(1, d-1);
    var left = d - ate;
    var color = pick(['#ff6348','#ee5a24']);
    return {type:'num', cat:'fractions', diff, label:th.label, gameLabel:'', text:'', shapeHtml:
      '<div style="text-align:center;padding:8px 0">'
      + pizzaSvg(left, d, color)
      + '<div style="margin-top:10px;font-size:1rem;color:#fff;direction:rtl">'
      + '\u05de\u05e4\u05d9\u05e6\u05d4 \u05e9\u05dc ' + d + ' \u05d7\u05ea\u05d9\u05db\u05d5\u05ea, \u05d0\u05db\u05dc\u05d5 ' + ate + ' \u05d7\u05ea\u05d9\u05db\u05d5\u05ea.<br>'
      + '\u05db\u05de\u05d4 \u05d7\u05ea\u05d9\u05db\u05d5\u05ea <strong style="color:#2ed573">\u05e0\u05e9\u05d0\u05e8\u05d5</strong>?'
      + '</div></div>',
      answer: left, pts, hint:{type:'text',msg:'&#x1F4A1; ' + d + ' - ' + ate + ' = ' + left + ' \u05d7\u05ea\u05d9\u05db\u05d5\u05ea'}, showMul:false, dir:'rtl'};
  }

  // 5. COMPARE — which fraction is larger?
  if (type === 'compare') {
    var allPairs = [[1,2],[1,4],[3,4],[1,3],[2,3],[1,6],[5,6],[2,5],[3,5],[1,8],[5,8]];
    var frac1 = pick(allPairs); var n1 = frac1[0], d1 = frac1[1];
    var frac2 = pick(allPairs.filter(function(p){ return !(p[0]===n1 && p[1]===d1); }));
    var n2 = frac2[0], d2 = frac2[1];
    if (n1/d1 === n2/d2) { n2 = n1+1; d2 = d1*2; } // ensure different
    var bigger = (n1/d1 >= n2/d2) ? 1 : 2;
    var pct1 = Math.round(n1/d1*100), pct2 = Math.round(n2/d2*100);
    return {type:'num', cat:'fractions', diff, label:th.label, gameLabel:'', text:'', shapeHtml:
      '<div style="text-align:center;padding:8px 0">'
      + '<div style="font-size:.82rem;color:#adb5bd;margin-bottom:10px">\u05d0\u05d9\u05d6\u05d4 \u05e9\u05d1\u05e8 <strong>\u05d2\u05d3\u05d5\u05dc \u05d9\u05d5\u05ea\u05e8</strong>?</div>'
      + '<div style="display:flex;justify-content:center;gap:18px;align-items:center;flex-wrap:wrap">'
      + '<div>' + barSvg(n1,d1,'#54a0ff',130,36) + '<div style="margin-top:5px">' + fracHtml(n1,d1,'#54a0ff') + '</div></div>'
      + '<div style="color:#fff;font-size:1.4rem;font-family:Fredoka,sans-serif;font-weight:700">VS</div>'
      + '<div>' + barSvg(n2,d2,'#ff6348',130,36) + '<div style="margin-top:5px">' + fracHtml(n2,d2,'#ff6348') + '</div></div>'
      + '</div>'
      + '<div style="margin-top:12px;color:#adb5bd;font-size:.82rem">\u05d4\u05db\u05e0\u05e1 1 \u05d0\u05dd \u05d4\u05e8\u05d0\u05e9\u05d5\u05df \u05d2\u05d3\u05d5\u05dc, 2 \u05d0\u05dd \u05d4\u05e9\u05e0\u05d9</div>'
      + '</div>',
      answer: bigger, pts, hint:{type:'text',msg:'&#x1F4A1; ' + n1 + '/' + d1 + ' = ' + pct1 + '% | ' + n2 + '/' + d2 + ' = ' + pct2 + '%'}, showMul:false, dir:'rtl'};
  }

  // 6. MISSING NUMERATOR — find the equivalent fraction
  if (type === 'missing_num') {
    var bases = [[1,2],[1,4],[1,3],[2,3],[3,4]];
    var frac = pick(bases); var n = frac[0], d = frac[1];
    var mult = rnd(2,4);
    var n2 = n*mult, d2 = d*mult;
    var askNum = Math.random() < 0.5;
    return {type:'num', cat:'fractions', diff, label:th.label, gameLabel:'', text:'', shapeHtml:
      '<div style="text-align:center;padding:8px 0">'
      + '<div style="display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap">'
      + '<div>' + barSvg(n,d,'#54a0ff',120,34) + '<div style="margin-top:5px">' + fracHtml(n,d,'#54a0ff') + '</div></div>'
      + '<span style="color:#fff;font-size:1.4rem">=</span>'
      + '<div>' + barSvg(n2,d2,'#ffd32a',120,34) + '<div style="margin-top:5px">' + fracHtml(askNum?'?':n2, askNum?d2:'?', '#ffd32a') + '</div></div>'
      + '</div>'
      + '<div style="margin-top:12px;color:#adb5bd;font-size:.82rem">\u05e9\u05e0\u05d9 \u05d4\u05e9\u05d1\u05e8\u05d9\u05dd \u05e9\u05d5\u05d5\u05d9\u05dd \u2014 \u05de\u05e6\u05d0 \u05d0\u05ea ?</div>'
      + '</div>',
      answer: askNum ? n2 : d2, pts, hint:{type:'text',msg:'&#x1F4A1; \u05db\u05e4\u05d5\u05dc ' + mult + ': ' + n + '×' + mult + '=' + n2 + ', ' + d + '×' + mult + '=' + d2}, showMul:false, dir:'rtl'};
  }

  // 7. SHAPE GRID — count shaded squares, write as fraction
  if (type === 'shape_grid') {
    var totals = [4,6,8,9,12];
    var total = pick(totals);
    var n = rnd(1, total-1);
    var color = pick(colors);
    return {type:'num', cat:'fractions', diff, label:th.label, gameLabel:'', text:'', shapeHtml:
      '<div style="text-align:center;padding:8px 0">'
      + gridSvg(n, total, color)
      + '<div style="margin-top:10px;color:#fff;font-size:.95rem;direction:rtl">'
      + '\u05db\u05de\u05d4 \u05e8\u05d9\u05d1\u05d5\u05e2\u05d9\u05dd <strong style="color:' + color + '">\u05e6\u05d1\u05d5\u05e2\u05d9\u05dd</strong> \u05de\u05ea\u05d5\u05da ' + total + '?<br>'
      + '<span style="font-size:.8rem;color:#adb5bd">(\u05d4\u05db\u05e0\u05e1 \u05d0\u05ea \u05d4\u05e0\u05d5\u05de\u05e8\u05d8\u05d5\u05e8)</span>'
      + '</div></div>',
      answer: n, pts, hint:{type:'text',msg:'&#x1F4A1; \u05e1\u05e4\u05d5\u05e8 \u05d0\u05ea \u05d4\u05e6\u05d1\u05d5\u05e2\u05d9\u05dd: ' + n + ' \u05de\u05ea\u05d5\u05da ' + total}, showMul:false, dir:'rtl'};
  }

  // 8. MIXED NUMBER — count total unit-fractions
  if (type === 'mixed_num') {
    var d = pick([2,3,4]);
    var whole = rnd(1,3);
    var num = rnd(1,d-1);
    var total = whole*d + num;
    var mixColors = ['#54a0ff','#2ed573','#ffd32a','#ff6348'];
    var bars = '';
    for (var i=0; i<whole; i++) bars += '<div style="margin:3px">' + barSvg(d,d,mixColors[i%mixColors.length],90,30) + '</div>';
    bars += '<div style="margin:3px">' + barSvg(num,d,'#c77dff',90,30) + '</div>';
    return {type:'num', cat:'fractions', diff, label:th.label, gameLabel:'', text:'', shapeHtml:
      '<div style="text-align:center;padding:8px 0">'
      + '<div style="display:flex;justify-content:center;flex-wrap:wrap;gap:4px">' + bars + '</div>'
      + '<div style="color:#fff;font-size:.95rem;direction:rtl;margin-top:10px">'
      + '\u05db\u05de\u05d4 \u05d7\u05dc\u05e7\u05d9\u05dd \u05e9\u05dc ' + fracHtml(1,d,'#adb5bd') + ' \u05d9\u05e9 \u05d1\u05e1\u05da \u05d4\u05db\u05dc?'
      + '</div></div>',
      answer: total, pts, hint:{type:'text',msg:'&#x1F4A1; ' + whole + ' \u05e9\u05dc\u05de\u05d9\u05dd × ' + d + ' = ' + (whole*d) + '. \u05d5\u05e2\u05d5\u05d3 ' + num + ' = ' + total}, showMul:false, dir:'rtl'};
  }

  // 9. ADD FRACTIONS (same denominator)
  if (type === 'add_frac') {
    var d = pick([2,3,4,5,6,8]);
    var n1 = rnd(1, d-2);
    var n2 = rnd(1, d-n1);
    var ans = n1 + n2;
    return {type:'num', cat:'fractions', diff, label:th.label, gameLabel:'', text:'', shapeHtml:
      '<div style="text-align:center;padding:8px 0">'
      + '<div style="display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap">'
      + barSvg(n1,d,'#54a0ff',130,36)
      + '<span style="color:#fff;font-size:1.3rem">+</span>'
      + barSvg(n2,d,'#ff6348',130,36)
      + '</div>'
      + '<div style="margin-top:12px;font-size:1.05rem;color:#fff;direction:rtl">'
      + fracHtml(n1,d,'#54a0ff') + ' + ' + fracHtml(n2,d,'#ff6348') + ' = ' + fracHtml('?',d,'#2ed573')
      + '<br><span style="font-size:.8rem;color:#adb5bd">\u05de\u05d4 \u05d4\u05e0\u05d5\u05de\u05e8\u05d8\u05d5\u05e8?</span>'
      + '</div></div>',
      answer: ans, pts, hint:{type:'text',msg:'&#x1F4A1; ' + n1 + ' + ' + n2 + ' = ' + ans + ' (\u05d4\u05de\u05db\u05e0\u05d4 \u05e0\u05e9\u05d0\u05e8 ' + d + ')'}, showMul:false, dir:'rtl'};
  }

  // 10. SUBTRACT FRACTIONS
  if (type === 'subtract_frac') {
    var d = pick([2,3,4,5,6,8]);
    var n1 = rnd(2, d);
    var n2 = rnd(1, n1-1);
    var ans = n1 - n2;
    return {type:'num', cat:'fractions', diff, label:th.label, gameLabel:'', text:'', shapeHtml:
      '<div style="text-align:center;padding:8px 0">'
      + '<div style="display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap">'
      + barSvg(n1,d,'#2ed573',130,36)
      + '<span style="color:#fff;font-size:1.3rem">&#x2212;</span>'
      + barSvg(n2,d,'#ff6348',130,36)
      + '</div>'
      + '<div style="margin-top:12px;font-size:1.05rem;color:#fff;direction:rtl">'
      + fracHtml(n1,d,'#2ed573') + ' &#x2212; ' + fracHtml(n2,d,'#ff6348') + ' = ' + fracHtml('?',d,'#c77dff')
      + '</div></div>',
      answer: ans, pts, hint:{type:'text',msg:'&#x1F4A1; ' + n1 + ' &#x2212; ' + n2 + ' = ' + ans}, showMul:false, dir:'rtl'};
  }

  // 11. EQUIVALENT
  if (type === 'equivalent') {
    var bases = [[1,2],[1,3],[2,3],[1,4],[3,4]];
    var frac = pick(bases); var n = frac[0], d = frac[1];
    var mult = rnd(2,4);
    var n2 = n*mult, d2 = d*mult;
    var askN = Math.random() < 0.5;
    return {type:'num', cat:'fractions', diff, label:th.label, gameLabel:'', text:'', shapeHtml:
      '<div style="text-align:center;padding:8px 0">'
      + '<div style="display:flex;align-items:center;justify-content:center;gap:16px;flex-wrap:wrap">'
      + '<div>' + barSvg(n,d,'#54a0ff',130,34) + '<div style="margin-top:5px">' + fracHtml(n,d,'#54a0ff') + '</div></div>'
      + '<span style="color:#fff;font-size:1.4rem">=</span>'
      + '<div>' + barSvg(n2,d2,'#ffd32a',130,34) + '<div style="margin-top:5px">' + fracHtml(askN?'?':n2, askN?d2:'?', '#ffd32a') + '</div></div>'
      + '</div>'
      + '<div style="color:#adb5bd;font-size:.82rem;margin-top:10px">\u05e9\u05d1\u05e8\u05d9\u05dd \u05e9\u05d5\u05d5\u05d9\u05dd \u2014 \u05de\u05e6\u05d0 \u05d0\u05ea ?</div>'
      + '</div>',
      answer: askN ? n2 : d2, pts, hint:{type:'text',msg:'&#x1F4A1; \u05db\u05e4\u05d5\u05dc ' + mult + ': ' + n + '×' + mult + '=' + n2 + ', ' + d + '×' + mult + '=' + d2}, showMul:false, dir:'rtl'};
  }

  // 12. WORD FRACTION STORY
  if (type === 'word_frac') {
    var pairs = [[1,2],[1,4],[3,4],[1,3],[2,3]];
    var frac = pick(pairs); var n = frac[0], d = frac[1];
    var mults = [12,16,20,24,30].filter(function(t){ return t%d===0; });
    var total = pick(mults) || d*4;
    var part = total*n/d;
    var stories = [
      '\u05d1\u05db\u05d9\u05ea\u05d4 \u05d9\u05e9 ' + total + ' \u05ea\u05dc\u05de\u05d9\u05d3\u05d9\u05dd. ' + fracHtml(n,d,'#ffd32a') + ' \u05de\u05d4\u05dd \u05de\u05d1\u05d9\u05d0\u05d9\u05dd \u05db\u05e8\u05d9\u05da. \u05db\u05de\u05d4 \u05ea\u05dc\u05de\u05d9\u05d3\u05d9\u05dd \u05de\u05d1\u05d9\u05d0\u05d9\u05dd \u05db\u05e8\u05d9\u05da?',
      '\u05d1\u05e4\u05d0\u05e8\u05e7 \u05d4\u05d9\u05d5 ' + total + ' \u05e6\u05d9\u05e4\u05d5\u05e8\u05d9\u05dd. ' + fracHtml(n,d,'#54a0ff') + ' \u05de\u05d4\u05df \u05e2\u05e4\u05d5. \u05db\u05de\u05d4 \u05e6\u05d9\u05e4\u05d5\u05e8\u05d9\u05dd \u05e2\u05e4\u05d5?',
      '\u05dc\u05d3\u05e0\u05d9 \u05d9\u05e9 ' + total + ' \u05de\u05d8\u05d1\u05e2\u05d5\u05ea. \u05d4\u05d5\u05d0 \u05e0\u05ea\u05df ' + fracHtml(n,d,'#ff6348') + ' \u05dc\u05d0\u05d7\u05d5\u05ea\u05d5. \u05db\u05de\u05d4 \u05de\u05d8\u05d1\u05e2\u05d5\u05ea \u05e0\u05ea\u05df?',
    ];
    return {type:'num', cat:'fractions', diff, label:th.label, gameLabel:'', text:'', shapeHtml:
      '<div style="text-align:center;padding:8px 0">'
      + gridSvg(part, total, '#ffd32a')
      + '<div style="margin-top:10px;font-size:.95rem;color:#fff;direction:rtl;line-height:1.8">' + pick(stories) + '</div>'
      + '</div>',
      answer: part, pts, hint:{type:'text',msg:'&#x1F4A1; ' + total + ' ÷ ' + d + ' = ' + (total/d) + '. × ' + n + ' = ' + part}, showMul:false, dir:'rtl'};
  }

  // Fallback: simple pizza
  var frac = pick([[1,2],[1,4],[3,4],[1,3],[2,3]]);
  var n = frac[0], d = frac[1];
  var total = rnd(4,20)*d, part = total*n/d;
  return {type:'num', cat:'fractions', diff, label:th.label, gameLabel:'', text:'', shapeHtml:
    '<div style="text-align:center;padding:8px 0">'
    + pizzaSvg(n, d, '#ff6348')
    + '<div style="margin-top:10px;color:#fff;font-size:1rem">\u05db\u05de\u05d4 \u05d6\u05d4 '
    + fracHtml(n,d,'#ffd32a') + ' \u05de\u05ea\u05d5\u05da ' + total + '?</div></div>',
    answer: part, pts, hint:{type:'text',msg:'&#x1F4A1; ' + total + '÷' + d + '=' + (total/d) + '. ×' + n + '=' + part}, showMul:false, dir:'rtl'};
}
