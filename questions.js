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

// ══════════════════════════════════════════════════════════════
// genShapes v4 — Real drawn shapes, dimension arrows, kid-friendly
// ══════════════════════════════════════════════════════════════
function genShapes(diff, th) {
    var grade = window._grade || 'ג';
  var pts = ptsForQ('shapes', diff);

  // ── Core SVG builder ──
  function svg(w,h,body){
    return '<svg width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:0 auto;overflow:visible">'+body+'</svg>';
  }
  function txt(x,y,t,col,sz,anc,bold){
    return '<text x="'+x+'" y="'+y+'" text-anchor="'+(anc||'middle')+'" font-size="'+(sz||14)+'" font-family="Fredoka,Rubik,sans-serif" fill="'+(col||'#e2e8f0')+'" font-weight="'+(bold?'900':'600')+'">'+t+'</text>';
  }
  function glow(id){
    return '<defs><filter id="'+id+'" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>';
  }

  // ── Dimension arrow: double-headed arrow with label ──
  // Draws a proper engineering dimension line between two points
  function dimArrow(x1,y1,x2,y2,label,col,offset){
    col=col||'#ffd32a'; offset=offset||20;
    var dx=x2-x1, dy=y2-y1, len=Math.sqrt(dx*dx+dy*dy)||1;
    var nx=-dy/len, ny=dx/len;  // normal (perpendicular)
    var ux=dx/len, uy=dy/len;   // unit along line
    // Offset points
    var ox1=x1+nx*offset, oy1=y1+ny*offset;
    var ox2=x2+nx*offset, oy2=y2+ny*offset;
    // Extension lines from shape to dimension line
    var ext='<line x1="'+x1.toFixed(1)+'" y1="'+y1.toFixed(1)+'" x2="'+(x1+nx*(offset+6)).toFixed(1)+'" y2="'+(y1+ny*(offset+6)).toFixed(1)+'" stroke="'+col+'" stroke-width="1.2" opacity=".5"/>'
           +'<line x1="'+x2.toFixed(1)+'" y1="'+y2.toFixed(1)+'" x2="'+(x2+nx*(offset+6)).toFixed(1)+'" y2="'+(y2+ny*(offset+6)).toFixed(1)+'" stroke="'+col+'" stroke-width="1.2" opacity=".5"/>';
    // Main dimension line
    var line='<line x1="'+ox1.toFixed(1)+'" y1="'+oy1.toFixed(1)+'" x2="'+ox2.toFixed(1)+'" y2="'+oy2.toFixed(1)+'" stroke="'+col+'" stroke-width="1.8" opacity=".85"/>';
    // Arrow heads
    var ah=7, aw=3.5;
    function arrowHead(px,py,dirx,diry){
      var p1x=px-dirx*ah+diry*aw, p1y=py-diry*ah-dirx*aw;
      var p2x=px-dirx*ah-diry*aw, p2y=py-diry*ah+dirx*aw;
      return '<polygon points="'+px.toFixed(1)+','+py.toFixed(1)+' '+p1x.toFixed(1)+','+p1y.toFixed(1)+' '+p2x.toFixed(1)+','+p2y.toFixed(1)+'" fill="'+col+'" opacity=".9"/>';
    }
    var arrows=arrowHead(ox1,oy1,-ux,-uy)+arrowHead(ox2,oy2,ux,uy);
    // Label pill background
    var mx=(ox1+ox2)/2, my=(oy1+oy2)/2;
    var lw=label.length*7+14;
    var pill='<rect x="'+(mx-lw/2).toFixed(1)+'" y="'+(my-11).toFixed(1)+'" width="'+lw+'" height="21" rx="10" fill="'+col+'" opacity=".95"/>'
            +txt(mx,my+5,label,'#111',12,'middle','700');
    return ext+line+arrows+pill;
  }

  // ── Right angle marker ──
  function rightAngle(x,y,sz,rot){
    sz=sz||12; rot=rot||0;
    var pts=[(x)+','+y, (x+sz)+','+y, (x+sz)+','+(y+sz)].join(' ');
    if(rot===90)  pts=[x+','+y, x+','+(y+sz), (x-sz)+','+(y+sz)].join(' ');
    if(rot===180) pts=[(x)+','+y, (x-sz)+','+y, (x-sz)+','+(y-sz)].join(' ');
    if(rot===270) pts=[x+','+y, x+','+(y-sz), (x+sz)+','+(y-sz)].join(' ');
    return '<polyline points="'+pts+'" fill="none" stroke="#ffd32a" stroke-width="2" opacity=".9"/>'
          +'<circle cx="'+(x+(rot===90?-sz/2:rot===180?-sz/2:sz/2))+'" cy="'+(y+(rot===270?-sz/2:rot===0?sz/2:sz/2))+'" r="2.5" fill="#ffd32a" opacity=".8"/>';
  }

  // ── Card wrapper ──
  function card(body,accent,q,formula){
    accent=accent||'#1e90ff';
    var fbox=formula?'<div style="background:'+accent+'15;border:1.5px solid '+accent+'44;border-radius:10px;padding:7px 12px;margin-bottom:10px;font-family:Fredoka,sans-serif;font-size:.95rem;color:'+accent+';text-align:center;direction:ltr">'+formula+'</div>':'';
    return '<div style="background:linear-gradient(145deg,rgba(255,255,255,.07),rgba(255,255,255,.02));border:2px solid '+accent+'55;border-radius:20px;padding:16px 14px 14px;box-shadow:0 8px 32px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.07)">'
      +fbox
      +'<div style="text-align:center;padding:4px 0 10px">'+body+'</div>'
      +'</div>';
  }

  function mkQ(question,answer,shapeHtml,hint){
    return {type:'num',cat:'shapes',diff,label:'📐 גיאומטריה ומדידה',gameLabel:'',
      text:question,answer:answer,pts:pts,shapeHtml:shapeHtml,
      hint:{type:'text',msg:hint},showMul:false,dir:'rtl'};
  }

  // ══════════════════════════════════════════════════════
  // QUESTION TYPES
  // ══════════════════════════════════════════════════════

  // 1. PERIMETER OF SQUARE — real square with 4 labeled sides
  function qPerimSquare(){
    var s=diff==='easy'?rnd(2,8):diff==='medium'?rnd(5,15):rnd(8,25);
    var answer=4*s;
    var c='#54a0ff', fill='#54a0ff';
    var W=300,H=260, sx=80,sy=35,sd=140;
    var body=glow('g1')
      // Subtle grid inside
      +'<rect x="'+sx+'" y="'+sy+'" width="'+sd+'" height="'+sd+'" fill="'+fill+'15" stroke="none"/>';
    // Grid lines inside
    var step=sd/Math.min(s,7);
    for(var i=1;i<Math.min(s,7);i++){
      body+='<line x1="'+(sx+i*step).toFixed(1)+'" y1="'+sy+'" x2="'+(sx+i*step).toFixed(1)+'" y2="'+(sy+sd)+'" stroke="'+c+'" stroke-width=".5" opacity=".2"/>';
      body+='<line x1="'+sx+'" y1="'+(sy+i*step).toFixed(1)+'" x2="'+(sx+sd)+'" y2="'+(sy+i*step).toFixed(1)+'" stroke="'+c+'" stroke-width=".5" opacity=".2"/>';
    }
    // Shape border
    body+='<rect x="'+sx+'" y="'+sy+'" width="'+sd+'" height="'+sd+'" fill="none" stroke="'+c+'" stroke-width="4" rx="4" filter="url(#g1)"/>';
    // Right angle markers on all corners
    body+=rightAngle(sx,sy,12,0)+rightAngle(sx+sd,sy,12,90)+rightAngle(sx+sd,sy+sd,12,180)+rightAngle(sx,sy+sd,12,270);
    // Dimension arrows on all 4 sides
    body+=dimArrow(sx,sy,sx+sd,sy,s+' ס"מ',c,-22);
    body+=dimArrow(sx+sd,sy,sx+sd,sy+sd,s+' ס"מ',c,22);
    body+=dimArrow(sx,sy+sd,sx+sd,sy+sd,s+' ס"מ',c,22);
    body+=dimArrow(sx,sy,sx,sy+sd,s+' ס"מ',c,-22);
    // Question mark center
    body+=txt(sx+sd/2,sy+sd/2+10,'?','#fff',36,'middle',true);
    var html=card(svg(W,H,body),'#54a0ff','','4 × '+s+' = ?');
    return mkQ('מה היקף הריבוע שצלעו '+s+' ס"מ?',answer,html,'💡 4 × '+s+' = '+answer+' ס"מ');
  }

  // 2. PERIMETER OF RECTANGLE — real rect, 2 different side labels
  function qPerimRect(){
    var w=diff==='easy'?rnd(3,8):diff==='medium'?rnd(5,16):rnd(6,24);
    var h=rnd(2,Math.max(3,w-1));
    var answer=2*(w+h);
    var c='#2ed573';
    var pw=Math.min(w*13,200), ph=Math.min(Math.max(h*13,55),140);
    var ox=(300-pw)/2, oy=(230-ph)/2+10;
    var body=glow('g2')
      +'<rect x="'+ox+'" y="'+oy+'" width="'+pw+'" height="'+ph+'" fill="'+c+'18" stroke="none"/>';
    // Subtle grid
    var sw=pw/Math.min(w,8), sh2=ph/Math.min(h,8);
    for(var i=1;i<Math.min(w,8);i++) body+='<line x1="'+(ox+i*sw).toFixed(1)+'" y1="'+oy+'" x2="'+(ox+i*sw).toFixed(1)+'" y2="'+(oy+ph)+'" stroke="'+c+'" stroke-width=".4" opacity=".25"/>';
    for(var j=1;j<Math.min(h,8);j++) body+='<line x1="'+ox+'" y1="'+(oy+j*sh2).toFixed(1)+'" x2="'+(ox+pw)+'" y2="'+(oy+j*sh2).toFixed(1)+'" stroke="'+c+'" stroke-width=".4" opacity=".25"/>';
    body+='<rect x="'+ox+'" y="'+oy+'" width="'+pw+'" height="'+ph+'" fill="none" stroke="'+c+'" stroke-width="4" rx="4" filter="url(#g2)"/>';
    body+=rightAngle(ox,oy,12,0); body+=rightAngle(ox+pw,oy,12,90);
    body+=rightAngle(ox+pw,oy+ph,12,180); body+=rightAngle(ox,oy+ph,12,270);
    // Width labels (top & bottom)
    body+=dimArrow(ox,oy,ox+pw,oy,w+' ס"מ',c,-22);
    body+=dimArrow(ox,oy+ph,ox+pw,oy+ph,w+' ס"מ',c,22);
    // Height labels (left & right)
    body+=dimArrow(ox,oy,ox,oy+ph,h+' ס"מ','#ffd32a',-22);
    body+=dimArrow(ox+pw,oy,ox+pw,oy+ph,h+' ס"מ','#ffd32a',22);
    body+=txt(ox+pw/2,oy+ph/2+10,'?','#fff',34,'middle',true);
    var html=card(svg(300,240,body),'#2ed573','','2 × ('+w+' + '+h+') = ?');
    return mkQ('מה היקף המלבן? (רוחב '+w+' ס"מ, גובה '+h+' ס"מ)',answer,html,'💡 2×('+w+'+'+h+') = '+answer+' ס"מ');
  }

  // 3. PERIMETER OF TRIANGLE — triangle with labeled sides in different colors
  function qPerimTri(){
    var a=rnd(3,diff==='hard'?18:11), b=rnd(3,diff==='hard'?15:10), c2=rnd(3,diff==='hard'?14:9);
    var answer=a+b+c2;
    var c='#ff6348';
    // Triangle points: tip top, bottom right, bottom left
    var p1x=150,p1y=30, p2x=262,p2y=200, p3x=38,p3y=200;
    var body=glow('g3')
      +'<polygon points="'+p1x+','+p1y+' '+p2x+','+p2y+' '+p3x+','+p3y+'" fill="'+c+'18" stroke="'+c+'" stroke-width="4" stroke-linejoin="round" filter="url(#g3)"/>';
    // Colored dots at vertices
    [[p1x,p1y],[p2x,p2y],[p3x,p3y]].forEach(function(pt){
      body+='<circle cx="'+pt[0]+'" cy="'+pt[1]+'" r="6" fill="'+c+'" opacity=".8"/>';
    });
    // Each side labeled with different color, proper offset
    body+=dimArrow(p3x,p3y,p2x,p2y,a+' ס"מ',c,24);       // bottom
    body+=dimArrow(p2x,p2y,p1x,p1y,b+' ס"מ','#ffd32a',24); // right
    body+=dimArrow(p1x,p1y,p3x,p3y,c2+' ס"מ','#c77dff',-24);// left
    body+=txt(150,132,'?','#fff',34,'middle',true);
    var html=card(svg(300,238,body),'#ff6348','',a+' + '+b+' + '+c2+' = ?');
    return mkQ('מה היקף המשולש?',answer,html,'💡 '+a+'+'+b+'+'+c2+' = '+answer+' ס"מ');
  }

  // 4. AREA OF RECTANGLE — grid fill, dimension labels
  function qAreaRect(){
    var w=diff==='easy'?rnd(2,6):diff==='medium'?rnd(4,12):rnd(5,18);
    var h=rnd(2,Math.max(3,w-1));
    var answer=w*h;
    var c='#ff9f43';
    var pw=Math.min(w*16,210), ph=Math.min(Math.max(h*16,55),150);
    var ox=(300-pw)/2, oy=(235-ph)/2+5;
    var body=glow('g4');
    // Checkered grid fill
    var cw=pw/w, chh=ph/h;
    for(var ri=0;ri<h;ri++) for(var ci=0;ci<w;ci++){
      var shade=(ri+ci)%2===0?'55':'33';
      body+='<rect x="'+(ox+ci*cw).toFixed(1)+'" y="'+(oy+ri*chh).toFixed(1)+'" width="'+cw.toFixed(1)+'" height="'+chh.toFixed(1)+'" fill="'+c+shade+'" rx="1"/>';
    }
    // Grid lines
    for(var i=0;i<=w;i++) body+='<line x1="'+(ox+i*cw).toFixed(1)+'" y1="'+oy+'" x2="'+(ox+i*cw).toFixed(1)+'" y2="'+(oy+ph)+'" stroke="'+c+'" stroke-width=".8" opacity=".4"/>';
    for(var j=0;j<=h;j++) body+='<line x1="'+ox+'" y1="'+(oy+j*chh).toFixed(1)+'" x2="'+(ox+pw)+'" y2="'+(oy+j*chh).toFixed(1)+'" stroke="'+c+'" stroke-width=".8" opacity=".4"/>';
    body+='<rect x="'+ox+'" y="'+oy+'" width="'+pw+'" height="'+ph+'" fill="none" stroke="'+c+'" stroke-width="4" rx="5" filter="url(#g4)"/>';
    body+=rightAngle(ox,oy,12,0); body+=rightAngle(ox+pw,oy+ph,12,180);
    body+=dimArrow(ox,oy-4,ox+pw,oy-4,w+' ס"מ',c,-24);
    body+=dimArrow(ox-4,oy,ox-4,oy+ph,h+' ס"מ','#ffd32a',-24);
    // Cell count label
    body+=txt(ox+pw/2,oy+ph/2+6,'?','#fff',36,'middle',true);
    // Small cell counter
    if(w<=8&&h<=6) body+=txt(ox+pw/2,oy+ph-10,w+'×'+h+' = ?',c+'88',10,'middle','600');
    var html=card(svg(300,248,body),'#ff9f43','',w+' × '+h+' = ?');
    return mkQ('מה שטח המלבן? ('+w+' ס"מ × '+h+' ס"מ)',answer,html,'💡 '+w+' × '+h+' = '+answer+' ס"מ²');
  }

  // 5. AREA OF SQUARE with grid
  function qAreaSquare(){
    var s=diff==='easy'?rnd(2,7):diff==='medium'?rnd(4,12):rnd(6,18);
    var answer=s*s;
    var c='#54a0ff';
    var sd=Math.min(s*18,175);
    var ox=(300-sd)/2, oy=(240-sd)/2+10;
    var body=glow('g5');
    var cs=sd/s;
    for(var ri=0;ri<s;ri++) for(var ci=0;ci<s;ci++){
      body+='<rect x="'+(ox+ci*cs).toFixed(1)+'" y="'+(oy+ri*cs).toFixed(1)+'" width="'+(cs-.8).toFixed(1)+'" height="'+(cs-.8).toFixed(1)+'" fill="'+c+((ri+ci)%2===0?'55':'33')+'" rx="2"/>';
    }
    for(var i=0;i<=s;i++){
      body+='<line x1="'+(ox+i*cs).toFixed(1)+'" y1="'+oy+'" x2="'+(ox+i*cs).toFixed(1)+'" y2="'+(oy+sd)+'" stroke="'+c+'" stroke-width=".8" opacity=".4"/>';
      body+='<line x1="'+ox+'" y1="'+(oy+i*cs).toFixed(1)+'" x2="'+(ox+sd)+'" y2="'+(oy+i*cs).toFixed(1)+'" stroke="'+c+'" stroke-width=".8" opacity=".4"/>';
    }
    body+='<rect x="'+ox+'" y="'+oy+'" width="'+sd+'" height="'+sd+'" fill="none" stroke="'+c+'" stroke-width="4" rx="4" filter="url(#g5)"/>';
    body+=rightAngle(ox,oy,12,0); body+=rightAngle(ox+sd,oy+sd,12,180);
    body+=dimArrow(ox,oy-4,ox+sd,oy-4,s+' ס"מ',c,-24);
    body+=dimArrow(ox+sd+4,oy,ox+sd+4,oy+sd,s+' ס"מ',c,24);
    body+=txt(ox+sd/2,oy+sd/2+6,'?','#fff',36,'middle',true);
    var html=card(svg(300,250,body),'#54a0ff','',s+'² = ?');
    return mkQ('מה שטח הריבוע? (צלע '+s+' ס"מ)',answer,html,'💡 '+s+' × '+s+' = '+answer+' ס"מ²');
  }

  // 6. AREA OF TRIANGLE — with height line, base label
  function qAreaTri(){
    var base, height;
    do { base=rnd(4,16)*2; height=rnd(3,12); } while((base*height)%2!==0);
    var answer=base*height/2;
    var c='#c77dff';
    var bpx=Math.min(base*11,210), hpx=Math.min(Math.max(height*11,65),155);
    var ox=(300-bpx)/2, oy=18, tipX=ox+bpx/2;
    var body=glow('g6')
      +'<polygon points="'+tipX+','+oy+' '+(ox+bpx)+','+(oy+hpx)+' '+ox+','+(oy+hpx)+'" fill="'+c+'25" stroke="'+c+'" stroke-width="4" stroke-linejoin="round" filter="url(#g6)"/>';
    // Height dashed line
    body+='<line x1="'+tipX+'" y1="'+oy+'" x2="'+tipX+'" y2="'+(oy+hpx)+'" stroke="#ffd32a" stroke-width="2.5" stroke-dasharray="8,5"/>';
    // Right angle at base of height
    body+=rightAngle(tipX,oy+hpx-12,12,270);
    // Height label inline
    body+='<rect x="'+(tipX+8)+'" y="'+(oy+hpx/2-11)+'" width="'+(height<10?42:50)+'" height="22" rx="10" fill="#ffd32a" opacity=".95"/>';
    body+=txt(tipX+(height<10?29:31),oy+hpx/2+5,height+' ס"מ','#111',11,'middle','700');
    // Base dimension arrow
    body+=dimArrow(ox,oy+hpx,ox+bpx,oy+hpx,base+' ס"מ',c,24);
    // Vertex dots
    [[tipX,oy],[ox+bpx,oy+hpx],[ox,oy+hpx]].forEach(function(p){
      body+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="5" fill="'+c+'"/>';
    });
    body+=txt(tipX-25,oy+hpx/2,'?','#fff',36,'middle',true);
    var html=card(svg(300,232,body),'#c77dff','','('+base+' × '+height+') ÷ 2 = ?');
    return mkQ('מה שטח המשולש? (בסיס '+base+' ס"מ, גובה '+height+' ס"מ)',answer,html,'💡 ('+base+'×'+height+')÷2 = '+answer+' ס"מ²');
  }

  // 7. CIRCLE — radius line, arc, dimension
  function qCircle(){
    var r=diff==='easy'?rnd(2,5):diff==='medium'?rnd(3,9):rnd(4,13);
    var askDiam=diff==='easy'||Math.random()<.5;
    var answer=askDiam?2*r:Math.round(3.14*r*r);
    var c='#ff6eb4';
    var cr=Math.min(r*10,100), cx=150, cy=122;
    var body=glow('g7');
    // Concentric rings for depth
    body+='<circle cx="'+cx+'" cy="'+cy+'" r="'+cr+'" fill="'+c+'20" stroke="'+c+'" stroke-width="4" filter="url(#g7)"/>';
    body+='<circle cx="'+cx+'" cy="'+cy+'" r="'+(cr*.7).toFixed(0)+'" fill="none" stroke="'+c+'" stroke-width=".8" opacity=".2"/>';
    body+='<circle cx="'+cx+'" cy="'+cy+'" r="'+(cr*.4).toFixed(0)+'" fill="none" stroke="'+c+'" stroke-width=".8" opacity=".15"/>';
    // Radius line
    body+='<line x1="'+cx+'" y1="'+cy+'" x2="'+(cx+cr)+'" y2="'+cy+'" stroke="#ffd32a" stroke-width="3" stroke-linecap="round"/>';
    body+='<circle cx="'+cx+'" cy="'+cy+'" r="6" fill="#ffd32a"/>';
    body+='<circle cx="'+(cx+cr)+'" cy="'+cy+'" r="4" fill="'+c+'"/>';
    // Radius label
    body+='<rect x="'+(cx+cr/2-20)+'" y="'+(cy-22)+'" width="40" height="19" rx="9" fill="#ffd32a" opacity=".95"/>';
    body+=txt(cx+cr/2,cy-8,'r = '+r,'#111',11,'middle','700');
    if(!askDiam){
      // Diameter line (dashed)
      body+='<line x1="'+(cx-cr)+'" y1="'+cy+'" x2="'+(cx+cr)+'" y2="'+cy+'" stroke="#a29bfe" stroke-width="1.5" stroke-dasharray="5,4" opacity=".5"/>';
    }
    // Question
    if(askDiam){
      // Arrow showing full diameter
      body+=dimArrow(cx-cr,cy,cx+cr,cy,'d = ?','#a29bfe',28);
    } else {
      body+=txt(cx,cy+cr+22,'שטח = π × r² = ?','#fff',13,'middle','600');
    }
    var html=card(svg(300,245,body),'#ff6eb4','',askDiam?'d = 2 × r = 2 × '+r+' = ?':'π × '+r+'² = 3.14 × '+r*r+' ≈ ?');
    return mkQ(askDiam?'מה הקוטר של העיגול? (רדיוס '+r+' ס"מ)':'מה שטח העיגול? (r='+r+' ס"מ, π=3.14, עגל שלם)',
      answer,html,askDiam?'💡 2 × '+r+' = '+(2*r):'💡 3.14 × '+r*r+' ≈ '+answer+' ס"מ²');
  }

  // 8. RULER — object drawn above ruler, count cm
  function qRuler(){
    var len=diff==='easy'?rnd(2,7):diff==='medium'?rnd(4,13):rnd(6,18);
    var ppc=Math.min(Math.floor(240/(len+3)),22); // pixels per cm
    var totalW=(len+3)*ppc;
    var ox=20, oy=100;
    var body='';
    // Ruler body — yellow/tan colored
    body+='<rect x="'+ox+'" y="'+oy+'" width="'+(totalW)+'" height="38" fill="#b8860b33" stroke="#ffd32a" stroke-width="2.5" rx="4"/>';
    body+='<rect x="'+ox+'" y="'+oy+'" width="'+(totalW)+'" height="10" fill="#ffd32a22" rx="4"/>';
    // Tick marks + numbers
    for(var i=0;i<=len+2;i++){
      var tx2=ox+i*ppc;
      var isBig=i%5===0;
      body+='<line x1="'+tx2+'" y1="'+oy+'" x2="'+tx2+'" y2="'+(oy-(isBig?16:9))+'" stroke="#ffd32a" stroke-width="'+(isBig?2:1)+'" opacity=".9"/>';
      if(i%2===0&&i<=len+2) body+=txt(tx2,oy-19,i,'#ffd32a',10);
    }
    // "cm" unit label
    body+=txt(ox+totalW/2,oy+28,'ס"מ','#ffd32a55',10);
    // Object above ruler — a nice pencil shape
    var pencilW=len*ppc;
    // Pencil body
    body+='<rect x="'+ox+'" y="'+(oy-52)+'" width="'+(pencilW*.85)+'" height="24" fill="#54a0ff66" stroke="#54a0ff" stroke-width="2" rx="3"/>';
    // Pencil tip (triangle)
    var tipX=ox+pencilW*.85;
    body+='<polygon points="'+tipX+','+(oy-52)+' '+tipX+','+(oy-28)+' '+(ox+pencilW)+','+(oy-40)+'" fill="#ff9f4388" stroke="#ff9f43" stroke-width="1.5"/>';
    // Pencil eraser
    body+='<rect x="'+ox+'" y="'+(oy-52)+'" width="14" height="24" fill="#ff6eb466" stroke="#ff6eb4" stroke-width="1.5" rx="3"/>';
    // Label
    body+=txt(ox+pencilW/2,oy-62,'✏️ עיפרון','#fff',11);
    // Start/end dotted lines down to ruler
    body+='<line x1="'+ox+'" y1="'+(oy-52)+'" x2="'+ox+'" y2="'+oy+'" stroke="#54a0ff" stroke-width="1.5" stroke-dasharray="4,3" opacity=".5"/>';
    body+='<line x1="'+(ox+pencilW)+'" y1="'+(oy-40)+'" x2="'+(ox+pencilW)+'" y2="'+oy+'" stroke="#ff9f43" stroke-width="1.5" stroke-dasharray="4,3" opacity=".5"/>';
    // Brace above pencil showing length
    body+='<line x1="'+ox+'" y1="'+(oy-70)+'" x2="'+(ox+pencilW)+'" y2="'+(oy-70)+'" stroke="#2ed573" stroke-width="2.5"/>';
    body+='<line x1="'+ox+'" y1="'+(oy-70)+'" x2="'+ox+'" y2="'+(oy-62)+'" stroke="#2ed573" stroke-width="2"/>';
    body+='<line x1="'+(ox+pencilW)+'" y1="'+(oy-70)+'" x2="'+(ox+pencilW)+'" y2="'+(oy-62)+'" stroke="#2ed573" stroke-width="2"/>';
    body+='<rect x="'+(ox+pencilW/2-14)+'" y="'+(oy-83)+'" width="28" height="18" rx="9" fill="#2ed573" opacity=".95"/>';
    body+=txt(ox+pencilW/2,oy-70,'? ס"מ','#111',10,'middle','700');

    var svgW=totalW+50;
    var html='<div style="background:linear-gradient(145deg,rgba(255,255,255,.07),rgba(255,255,255,.02));border:2px solid #2ed57355;border-radius:20px;padding:16px 14px 14px;box-shadow:0 8px 32px rgba(0,0,0,.45)">'
      +'<div style="background:#2ed57315;border:1.5px solid #2ed57344;border-radius:10px;padding:7px 12px;margin-bottom:10px;font-family:Fredoka,sans-serif;font-size:.95rem;color:#2ed573;text-align:center">📏 קרא את הסרגל — כמה ס"מ?</div>'
      +'<div style="text-align:center;overflow-x:auto;padding:4px 0 10px">'
      +'<svg width="'+svgW+'" height="115" viewBox="0 0 '+svgW+' 115" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:0 auto">'
      +body+'</svg></div></div>';
    return mkQ('כמה ס"מ ארוך העיפרון?',len,html,'💡 מ-0 עד הנקודה האדומה = '+len+' ס"מ');
  }

  // 9. COUNT SIDES — shape with numbered tick on each side
  function qCountSides(){
    var shapes=[
      {name:'משולש',n:3,pts:'150,32 264,202 36,202',col:'#2ed573'},
      {name:'ריבוע',n:4,pts:'72,50 228,50 228,192 72,192',col:'#54a0ff'},
      {name:'מלבן',n:4,pts:'45,80 255,80 255,168 45,168',col:'#00d2d3'},
      {name:'מחומש',n:5,pts:'150,28 244,98 210,208 90,208 56,98',col:'#c77dff'},
      {name:'משושה',n:6,pts:'150,25 231,70 231,162 150,210 69,162 69,70',col:'#ff9f43'},
    ];
    var sh=pick(shapes), c=sh.col;
    var pArr=sh.pts.split(' ').map(function(p){return p.split(',').map(Number);});
    var body=glow('g8')+'<polygon points="'+sh.pts+'" fill="'+c+'22" stroke="'+c+'" stroke-width="4" stroke-linejoin="round" filter="url(#g8)"/>';
    // Draw each side with a colored segment highlight and numbered badge
    var sideColors=['#ff6348','#ffd32a','#2ed573','#54a0ff','#c77dff','#ff9f43'];
    for(var i=0;i<pArr.length;i++){
      var a=pArr[i], b2=pArr[(i+1)%pArr.length];
      var mx=(a[0]+b2[0])/2, my=(a[1]+b2[1])/2;
      var sc=sideColors[i%sideColors.length];
      // Highlight the side
      body+='<line x1="'+a[0]+'" y1="'+a[1]+'" x2="'+b2[0]+'" y2="'+b2[1]+'" stroke="'+sc+'" stroke-width="5" stroke-linecap="round" opacity=".7"/>';
      // Number badge
      body+='<circle cx="'+mx.toFixed(1)+'" cy="'+my.toFixed(1)+'" r="15" fill="'+sc+'" stroke="#fff" stroke-width="2"/>';
      body+=txt(mx,my+5,i+1,'#fff',13,'middle','900');
    }
    // Vertex dots
    pArr.forEach(function(p){ body+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="5" fill="'+c+'"/>'; });
    var html='<div style="background:linear-gradient(145deg,rgba(255,255,255,.07),rgba(255,255,255,.02));border:2px solid '+c+'55;border-radius:20px;padding:16px 14px 14px;box-shadow:0 8px 32px rgba(0,0,0,.45)">'
      +'<div style="background:'+c+'15;border:1.5px solid '+c+'44;border-radius:10px;padding:7px 12px;margin-bottom:10px;font-family:Fredoka,sans-serif;font-size:.95rem;color:'+c+';text-align:center">ספור את הצלעות הצבעוניות! 🔢</div>'
      +'<div style="text-align:center;padding:4px 0 10px">'+svg(300,245,body)+'</div></div>';
    return mkQ('כמה צלעות יש ל'+sh.name+'?',sh.n,html,'💡 '+sh.n+' צלעות — ספור העיגולים הצבעוניים');
  }

  // 10. MISSING ANGLE IN TRIANGLE
  function qMissingAngle(){
    var a=rnd(35,80), b=rnd(25,100-a), c2=180-a-b;
    if(c2<=8||c2>=172) return qMissingAngle();
    var hide=pick([0,1,2]), vals=[a,b,c2];
    var c='#ff6348';
    var p1x=150,p1y=30, p2x=262,p2y=200, p3x=38,p3y=200;
    var body=glow('g9')
      +'<polygon points="'+p1x+','+p1y+' '+p2x+','+p2y+' '+p3x+','+p3y+'" fill="'+c+'20" stroke="'+c+'" stroke-width="4" stroke-linejoin="round" filter="url(#g9)"/>';
    var lbPos=[[p1x,p1y-8],[p2x+18,p2y+8],[p3x-18,p3y+8]];
    var arcColors=['#ff6348','#ffd32a','#2ed573'];
    vals.forEach(function(v,i){
      var isHide=i===hide;
      var lbl=isHide?'?°':v+'°';
      var col=isHide?'#ffd32a':arcColors[i];
      // Angle arc
      var corners=[[p1x,p1y],[p2x,p2y],[p3x,p3y]];
      var prev=corners[(i+2)%3], curr=corners[i], next=corners[(i+1)%3];
      var d1x=prev[0]-curr[0], d1y=prev[1]-curr[1], l1=Math.sqrt(d1x*d1x+d1y*d1y)||1;
      var d2x=next[0]-curr[0], d2y=next[1]-curr[1], l2=Math.sqrt(d2x*d2x+d2y*d2y)||1;
      var ar=22;
      var ax1=curr[0]+d1x/l1*ar, ay1=curr[1]+d1y/l1*ar;
      var ax2=curr[0]+d2x/l2*ar, ay2=curr[1]+d2y/l2*ar;
      body+='<path d="M'+ax1.toFixed(1)+','+ay1.toFixed(1)+' Q'+curr[0]+','+curr[1]+' '+ax2.toFixed(1)+','+ay2.toFixed(1)+'" fill="none" stroke="'+col+'" stroke-width="2.5" opacity="0.7"/>';
      // Angle badge
      body+='<rect x="'+(lbPos[i][0]-20)+'" y="'+(lbPos[i][1]-12)+'" width="40" height="24" rx="12" fill="'+(isHide?'#ffd32a':col)+'" opacity="'+(isHide?'1':'.85')+'"/>';
      body+=txt(lbPos[i][0],lbPos[i][1]+5,lbl,isHide?'#111':'#fff',13,'middle','900');
    });
    // Vertex dots
    [[p1x,p1y],[p2x,p2y],[p3x,p3y]].forEach(function(p){ body+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="5" fill="'+c+'"/>'; });
    body+=txt(150,132,'סכום = 180°','#ffffff33',11);
    var known=vals.filter(function(_,i){return i!==hide;});
    var html=card(svg(300,235,body),'#ff6348','','180° - '+known[0]+'° - '+known[1]+'° = ?');
    return mkQ('מצא את הזווית החסרה (?) במשולש',vals[hide],html,'💡 180 - '+known[0]+' - '+known[1]+' = '+vals[hide]+'°');
  }

  // 11. ANGLE TYPE — ray with arc, identify type
  function qAngleType(){
    var cases=[
      {deg:90,name:'ישרה',num:2,col:'#00d2d3'},{deg:45,name:'חדה',num:1,col:'#2ed573'},
      {deg:60,name:'חדה',num:1,col:'#2ed573'},{deg:120,name:'קהה',num:3,col:'#ff9f43'},
      {deg:135,name:'קהה',num:3,col:'#ff9f43'},{deg:30,name:'חדה',num:1,col:'#2ed573'},
    ];
    var pool=diff==='easy'?cases.slice(0,3):cases;
    var ch=pick(pool), c=ch.col;
    var vx=80, vy=175, r=110;
    var rad=ch.deg*Math.PI/180;
    var rx=vx+r, ry=vy; // first ray end
    var rx2=vx+r*Math.cos(-rad), ry2=vy+r*Math.sin(-rad); // second ray end
    var body=glow('ga')
      // Rays
      +'<line x1="'+vx+'" y1="'+vy+'" x2="'+rx+'" y2="'+ry+'" stroke="'+c+'" stroke-width="5" stroke-linecap="round" filter="url(#ga)"/>'
      +'<line x1="'+vx+'" y1="'+vy+'" x2="'+rx2.toFixed(1)+'" y2="'+ry2.toFixed(1)+'" stroke="'+c+'" stroke-width="5" stroke-linecap="round" filter="url(#ga)"/>';
    // Arc
    var arcR=40;
    var ax1=vx+arcR, ay1=vy;
    var ax2=vx+arcR*Math.cos(-rad), ay2=vy+arcR*Math.sin(-rad);
    var sweep=ch.deg>180?1:0;
    body+='<path d="M'+ax1+','+ay1+' A'+arcR+','+arcR+' 0 '+sweep+',0 '+ax2.toFixed(1)+','+ay2.toFixed(1)+'" fill="'+c+'25" stroke="'+c+'" stroke-width="2.5"/>';
    // Right angle marker
    if(ch.deg===90) body+='<polyline points="'+(vx+14)+','+vy+' '+(vx+14)+','+(vy-14)+' '+vx+','+(vy-14)+'" fill="none" stroke="'+c+'" stroke-width="2.5" opacity=".9"/>';
    // Degree badge
    var midRad=rad/2;
    var bx=vx+68*Math.cos(-midRad), by=vy+68*Math.sin(-midRad);
    body+='<rect x="'+(bx-22)+'" y="'+(by-13)+'" width="44" height="26" rx="13" fill="'+c+'" opacity=".95"/>';
    body+=txt(bx,by+6,ch.deg+'°','#fff',14,'middle','900');
    // Vertex dot
    body+='<circle cx="'+vx+'" cy="'+vy+'" r="7" fill="'+c+'"/>';
    // Ray end dots
    body+='<circle cx="'+rx+'" cy="'+ry+'" r="4" fill="'+c+'" opacity=".5"/>';
    body+='<circle cx="'+rx2.toFixed(1)+'" cy="'+ry2.toFixed(1)+'" r="4" fill="'+c+'" opacity=".5"/>';
    var optBox='<div style="display:flex;gap:8px;justify-content:center;margin-top:10px;flex-wrap:wrap">'
      +'<div style="background:#2ed57322;border:2px solid #2ed57366;border-radius:12px;padding:8px 14px;font-family:Fredoka,sans-serif;font-size:.88rem;color:#2ed573;text-align:center"><b style="font-size:1.1rem">1</b><br>⚡ חדה<br><span style="font-size:.72rem;opacity:.7">&lt; 90°</span></div>'
      +'<div style="background:#00d2d322;border:2px solid #00d2d366;border-radius:12px;padding:8px 14px;font-family:Fredoka,sans-serif;font-size:.88rem;color:#00d2d3;text-align:center"><b style="font-size:1.1rem">2</b><br>⬜ ישרה<br><span style="font-size:.72rem;opacity:.7">= 90°</span></div>'
      +'<div style="background:#ff9f4322;border:2px solid #ff9f4366;border-radius:12px;padding:8px 14px;font-family:Fredoka,sans-serif;font-size:.88rem;color:#ff9f43;text-align:center"><b style="font-size:1.1rem">3</b><br>🔔 קהה<br><span style="font-size:.72rem;opacity:.7">&gt; 90°</span></div>'
      +'</div>';
    var html='<div style="background:linear-gradient(145deg,rgba(255,255,255,.07),rgba(255,255,255,.02));border:2px solid '+c+'55;border-radius:20px;padding:16px 14px 14px;box-shadow:0 8px 32px rgba(0,0,0,.45)">'
      +'<div style="background:'+c+'15;border:1.5px solid '+c+'44;border-radius:10px;padding:7px 12px;margin-bottom:10px;font-family:Fredoka,sans-serif;font-size:.95rem;color:'+c+';text-align:center">📐 איזה סוג זווית?</div>'
      +'<div style="text-align:center;padding:4px 0 6px">'+svg(280,195,body)+'</div>'
      +optBox+'</div>';
    return mkQ('איזה סוג זווית? (1=חדה  2=ישרה  3=קהה)',ch.num,html,'💡 '+ch.deg+'° → זווית '+ch.name);
  }

  // 12. SYMMETRY
  function qSymmetry(){
    var shapes=[
      {name:'ריבוע',axes:4,pts:'75,55 225,55 225,185 75,185',col:'#54a0ff'},
      {name:'מלבן',axes:2,pts:'40,82 260,82 260,168 40,168',col:'#00d2d3'},
      {name:'משולש שווה-צלעות',axes:3,pts:'150,30 255,195 45,195',col:'#2ed573'},
      {name:'מעוין',axes:2,pts:'150,25 255,112 150,195 45,112',col:'#c77dff'},
    ];
    var sh=pick(shapes), c=sh.col;
    var axC=['#ffd32a','#ff6eb4','#a8e063','#54a0ff'];
    var axLines='';
    if(sh.axes>=1) axLines+='<line x1="150" y1="20" x2="150" y2="218" stroke="'+axC[0]+'" stroke-width="3" stroke-dasharray="9,5" opacity=".85"/>';
    if(sh.axes>=2) axLines+='<line x1="25" y1="118" x2="275" y2="118" stroke="'+axC[1]+'" stroke-width="3" stroke-dasharray="9,5" opacity=".85"/>';
    if(sh.axes>=3) axLines+='<line x1="40" y1="40" x2="260" y2="196" stroke="'+axC[2]+'" stroke-width="2.5" stroke-dasharray="7,4" opacity=".75"/>';
    if(sh.axes>=4) axLines+='<line x1="260" y1="40" x2="40" y2="196" stroke="'+axC[3]+'" stroke-width="2.5" stroke-dasharray="7,4" opacity=".75"/>';
    var body=glow('gs')+'<polygon points="'+sh.pts+'" fill="'+c+'25" stroke="'+c+'" stroke-width="4" stroke-linejoin="round" filter="url(#gs)"/>'+axLines;
    // Mirror icon at center
    body+=txt(150,118,'🪞','',22);
    var legendItems='';
    for(var i=0;i<sh.axes;i++) legendItems+='<div style="display:flex;align-items:center;gap:5px;font-family:Rubik,sans-serif;font-size:.8rem;color:'+axC[i]+'"><div style="width:20px;height:3px;background:'+axC[i]+';border-radius:2px"></div>ציר '+(i+1)+'</div>';
    var html='<div style="background:linear-gradient(145deg,rgba(255,255,255,.07),rgba(255,255,255,.02));border:2px solid '+c+'55;border-radius:20px;padding:16px 14px 14px;box-shadow:0 8px 32px rgba(0,0,0,.45)">'
      +'<div style="background:'+c+'15;border:1.5px solid '+c+'44;border-radius:10px;padding:7px 12px;margin-bottom:10px;font-family:Fredoka,sans-serif;font-size:.95rem;color:'+c+';text-align:center">🪞 ספור צירי סימטריה</div>'
      +'<div style="text-align:center;padding:4px 0 8px">'+svg(300,240,body)+'</div>'
      +'<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">'+legendItems+'</div></div>';
    return mkQ('כמה צירי סימטריה יש ל'+sh.name+'?',sh.axes,html,'💡 '+sh.axes+' צירי סימטריה — ספור הקווים הצבעוניים');
  }

  // ── Grade-based pool ──
  var easyPool, medPool, hardPool;
  if(grade==='א'||grade==='ב'){
    easyPool=[qCountSides,qRuler,qSymmetry];
    medPool=[qCountSides,qSymmetry,qRuler,qPerimSquare];
    hardPool=[qSymmetry,qAngleType,qPerimSquare,qRuler];
  } else if(grade==='ג'){
    easyPool=[qPerimSquare,qPerimRect,qCountSides,qRuler];
    medPool=[qPerimRect,qPerimTri,qMissingAngle,qRuler];
    hardPool=[qPerimTri,qMissingAngle,qAreaRect,qAngleType];
  } else if(grade==='ד'){
    easyPool=[qAreaRect,qAreaSquare,qPerimRect,qRuler];
    medPool=[qAreaRect,qAreaTri,qMissingAngle,qPerimTri];
    hardPool=[qAreaTri,qMissingAngle,qCircle,qAreaSquare];
  } else if(grade==='ה'){
    easyPool=[qAreaRect,qAreaTri,qCircle,qAngleType];
    medPool=[qAreaTri,qCircle,qMissingAngle,qAreaSquare];
    hardPool=[qCircle,qMissingAngle,qAreaTri,qAreaRect];
  } else {
    easyPool=[qAreaRect,qAreaTri,qCircle,qMissingAngle];
    medPool=[qCircle,qMissingAngle,qAreaTri,qAreaSquare];
    hardPool=[qCircle,qMissingAngle,qAreaTri,qAreaRect];
  }
  var pool=diff==='easy'?easyPool:diff==='medium'?medPool:hardPool;
  return pick(pool)();
}


function genFrac(diff, th) {
  const pairs = [[1,2],[1,4],[3,4],[1,3],[2,3]];
  const [n,d] = pick(pairs);
  const total = rnd(4,20)*d;
  const part  = total*n/d;
  return { type:'num', cat:'fractions', diff, label:th.label, gameLabel:'', text:`כמה זה ${n}/${d} מתוך ${total}?`, answer:part, pts:ptsForQ('fractions',diff), hint:{type:'text',msg:`💡 ${total}÷${d}=${total/d} לחלק. ×${n}=${part}`}, showMul:false, dir:'rtl' };
}
