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
// genShapes — INLINE geometry questions with full SVG visuals
// No external file dependency — works always!
// ══════════════════════════════════════════════════════════════
function genShapes(diff, th) {
  // Forward to shapes.js if loaded (higher quality)
  if (window.genShapesInteractive) return window.genShapesInteractive(diff);

  var grade = window._grade || 'ג';
  var pts = ptsForQ('shapes', diff);

  // ── SVG helpers ──
  function S(w,h,body){ return '<svg width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:0 auto;overflow:visible">'+body+'</svg>'; }
  function T(x,y,t,col,sz,anc){ return '<text x="'+x+'" y="'+y+'" text-anchor="'+(anc||'middle')+'" font-size="'+(sz||13)+'" font-family="Fredoka,Rubik,sans-serif" fill="'+(col||'#e2e8f0')+'" font-weight="700">'+t+'</text>'; }
  function glow(id,col){ return '<defs><filter id="'+id+'"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>'; }
  // Dimension label with dashed line + pill
  function DIM(x1,y1,x2,y2,lbl,col,off){
    col=col||'#ffd32a'; off=off||16;
    var mx=(x1+x2)/2, my=(y1+y2)/2;
    var dx=x2-x1, dy=y2-y1, len=Math.sqrt(dx*dx+dy*dy)||1;
    var nx=-dy/len, ny=dx/len;
    var lx=mx+nx*off, ly=my+ny*off;
    return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+col+'" stroke-width="1.2" stroke-dasharray="4,3" opacity=".6"/>'
      +'<rect x="'+(lx-17)+'" y="'+(ly-9)+'" width="34" height="17" rx="8" fill="'+col+'22" stroke="'+col+'44" stroke-width="1"/>'
      +T(lx,ly+4,lbl,col,10);
  }
  // Right-angle box
  function RA(x,y){ return '<polyline points="'+(x+10)+','+y+' '+(x+10)+','+(y+10)+' '+x+','+(y+10)+'" fill="none" stroke="#ffd32a" stroke-width="1.8" opacity=".8"/>'; }
  // Card wrapper
  function CARD(inner,accent){
    return '<div style="background:linear-gradient(145deg,rgba(255,255,255,.06),rgba(255,255,255,.02));border:2px solid '+accent+'55;border-radius:18px;padding:14px 12px 12px;box-shadow:0 6px 28px rgba(0,0,0,.4)">'+inner+'</div>';
  }
  function CHIP(txt,col){ return '<div style="display:inline-flex;align-items:center;gap:5px;background:'+col+'1a;border:1.5px solid '+col+'55;border-radius:99px;padding:4px 13px;font-family:Fredoka,sans-serif;font-size:.9rem;color:'+col+';margin-bottom:10px">'+txt+'</div>'; }
  function FACT(emoji,txt){ return '<div style="display:flex;align-items:center;gap:7px;font-family:Rubik,sans-serif;font-size:.82rem;color:#8892b0;margin-top:4px"><span>'+emoji+'</span><span>'+txt+'</span></div>'; }

  var PAL = ['#1e90ff','#2ed573','#ff6348','#ffd32a','#c77dff','#ff9f43','#00d2d3','#ff6eb4'];
  function pc(i){ return PAL[i%PAL.length]; }
  function mkQ(text,answer,shapeHtml,hint){ return {type:'num',cat:'shapes',diff,label:'📐 גיאומטריה ומדידה',gameLabel:'',text:text,answer:answer,pts:pts,shapeHtml:shapeHtml,hint:{type:'text',msg:hint},showMul:false,dir:'rtl'}; }

  // ══ POOL of question generators ══

  // 1. Count sides — interactive click dots on each side
  function qCountSides(){
    var shapes=[
      {name:'משולש',n:3,pts:'150,35 262,200 38,200',col:'#2ed573',emoji:'🔺'},
      {name:'ריבוע',n:4,pts:'72,52 228,52 228,192 72,192',col:'#1e90ff',emoji:'🟦'},
      {name:'מלבן',n:4,pts:'48,78 252,78 252,172 48,172',col:'#00d2d3',emoji:'▭'},
      {name:'מחומש',n:5,pts:'150,28 244,96 210,208 90,208 56,96',col:'#c77dff',emoji:'⬠'},
      {name:'משושה',n:6,pts:'150,25 231,70 231,162 150,210 69,162 69,70',col:'#ff9f43',emoji:'⬡'},
    ];
    var sh=pick(shapes), c=sh.col;
    var pArr=sh.pts.split(' ').map(function(p){return p.split(',').map(Number);});
    var body=glow('gsh',c)+'<polygon points="'+sh.pts+'" fill="'+c+'22" stroke="'+c+'" stroke-width="3.5" filter="url(#gsh)"/>';
    for(var i=0;i<pArr.length;i++){
      var a=pArr[i],b=pArr[(i+1)%pArr.length];
      var mx=(a[0]+b[0])/2, my=(a[1]+b[1])/2;
      body+='<circle cx="'+mx+'" cy="'+my+'" r="14" fill="'+c+'" opacity=".95"/>';
      body+=T(mx,my+5,i+1,'#111',11);
    }
    body+=T(150,125,sh.emoji,'',28);
    var html=CARD(CHIP(sh.emoji+' ספור את הצלעות!','#ffd32a')+'<div style="text-align:center;margin-bottom:8px">'+S(300,240,body)+'</div>'+FACT('💡','כל עיגול = צלע אחת. כמה עיגולים?'),'#ffd32a');
    return mkQ('כמה צלעות יש ל'+sh.name+'?',sh.n,html,'💡 '+sh.n+' צלעות — ספור העיגולים');
  }

  // 2. Perimeter of square — labeled sides
  function qPerimSquare(){
    var s=diff==='easy'?rnd(2,8):diff==='medium'?rnd(5,15):rnd(8,25);
    var answer=4*s; var c='#1e90ff';
    var sx=75,sy=38,sd=150;
    var body=glow('gsq',c)+'<rect x="'+sx+'" y="'+sy+'" width="'+sd+'" height="'+sd+'" fill="'+c+'22" stroke="'+c+'" stroke-width="3.5" rx="5" filter="url(#gsq)"/>';
    body+=RA(sx,sy+sd-10); body+=RA(sx+sd-10,sy); body+=RA(sx,sy); body+=RA(sx+sd-10,sy+sd-10);
    body+=DIM(sx,sy-2,sx+sd,sy-2,s+' ס"מ',c,18);
    body+=DIM(sx+sd+2,sy,sx+sd+2,sy+sd,s+' ס"מ',c,18);
    body+=DIM(sx,sy+sd+2,sx+sd,sy+sd+2,s+' ס"מ','#54a0ff',-18);
    body+=DIM(sx-2,sy,sx-2,sy+sd,s+' ס"מ','#54a0ff',-18);
    body+=T(sx+sd/2,sy+sd/2+8,'?','#fff',28);
    var html=CARD(CHIP('🟦 ריבוע — 4 צלעות שוות!',c)+'<div style="text-align:center;margin-bottom:8px">'+S(300,255,body)+'</div>'+FACT('🧮','היקף = 4 × '+s+' = '+answer+' ס"מ'),c);
    return mkQ('מה היקף הריבוע שצלעו '+s+' ס"מ?',answer,html,'💡 4 × '+s+' = '+answer);
  }

  // 3. Perimeter of rectangle — labeled sides
  function qPerimRect(){
    var w=diff==='easy'?rnd(3,8):diff==='medium'?rnd(5,16):rnd(6,24);
    var h=rnd(2,Math.max(3,w-1));
    var answer=2*(w+h); var c='#00d2d3';
    var pw=Math.min(w*12,200), ph=Math.min(Math.max(h*12,55),140);
    var ox=(300-pw)/2, oy=(220-ph)/2+10;
    var body=glow('grc',c)+'<rect x="'+ox+'" y="'+oy+'" width="'+pw+'" height="'+ph+'" fill="'+c+'22" stroke="'+c+'" stroke-width="3.5" rx="5" filter="url(#grc)"/>';
    body+=RA(ox,oy); body+=RA(ox+pw-10,oy);
    body+=DIM(ox,oy-4,ox+pw,oy-4,w+' ס"מ',c,18);
    body+=DIM(ox-4,oy,ox-4,oy+ph,h+' ס"מ','#ffd32a',18);
    body+=T(ox+pw/2,oy+ph/2+8,'?','#fff',26);
    var html=CARD(CHIP('▭ מלבן — 2 זוגות שווים!',c)+'<div style="text-align:center;margin-bottom:8px">'+S(300,230,body)+'</div>'+FACT('🧮','2 × ('+w+' + '+h+') = 2 × '+(w+h)+' = '+answer+' ס"מ'),c);
    return mkQ('מה היקף המלבן? ('+w+' ס"מ × '+h+' ס"מ)',answer,html,'💡 2×('+w+'+'+h+') = '+answer);
  }

  // 4. Perimeter of triangle — all sides labeled
  function qPerimTri(){
    var a=rnd(3,diff==='hard'?18:10), b=rnd(3,diff==='hard'?16:10), c2=rnd(3,diff==='hard'?14:9);
    var answer=a+b+c2; var c='#2ed573';
    var body=glow('gtr',c)+'<polygon points="150,30 262,198 38,198" fill="'+c+'22" stroke="'+c+'" stroke-width="3.5" filter="url(#gtr)"/>';
    body+=DIM(38,198,262,198,a+' ס"מ',c,-20);
    body+=DIM(262,198,150,30,b+' ס"מ','#ff9f43',20);
    body+=DIM(150,30,38,198,c2+' ס"מ','#c77dff',-20);
    body+=T(150,130,'?','#fff',26);
    var html=CARD(CHIP('🔺 משולש — 3 צלעות!',c)+'<div style="text-align:center;margin-bottom:8px">'+S(300,235,body)+'</div>'+FACT('🧮',a+' + '+b+' + '+c2+' = '+answer+' ס"מ'),c);
    return mkQ('מה היקף המשולש? (צלעות: '+a+', '+b+', '+c2+' ס"מ)',answer,html,'💡 '+a+'+'+b+'+'+c2+' = '+answer);
  }

  // 5. Area of rectangle — grid fill
  function qAreaRect(){
    var w=diff==='easy'?rnd(2,7):diff==='medium'?rnd(4,14):rnd(5,20);
    var h=rnd(2,Math.max(3,w-1));
    var answer=w*h; var c='#ff6348';
    var pw=Math.min(w*12,200), ph=Math.min(Math.max(h*12,55),145);
    var ox=(300-pw)/2, oy=(220-ph)/2+8;
    var body=''; var cw2=pw/Math.min(w,7), ch2=ph/Math.min(h,7);
    for(var ri=0;ri<Math.min(h,7);ri++) for(var ci=0;ci<Math.min(w,7);ci++)
      body+='<rect x="'+(ox+ci*cw2).toFixed(1)+'" y="'+(oy+ri*ch2).toFixed(1)+'" width="'+(cw2-1).toFixed(1)+'" height="'+(ch2-1).toFixed(1)+'" fill="'+c+((ri+ci)%2===0?'44':'22')+'" rx="1"/>';
    body+=glow('gar',c)+'<rect x="'+ox+'" y="'+oy+'" width="'+pw+'" height="'+ph+'" fill="none" stroke="'+c+'" stroke-width="3.5" rx="5" filter="url(#gar)"/>';
    body+=DIM(ox,oy-5,ox+pw,oy-5,w+' ס"מ',c,18);
    body+=DIM(ox-5,oy,ox-5,oy+ph,h+' ס"מ','#ffd32a',18);
    body+=T(ox+pw/2,oy+ph/2+8,'?','#fff',28);
    var html=CARD(CHIP('📐 שטח = אורך × רוחב',c)+'<div style="text-align:center;margin-bottom:8px">'+S(300,240,body)+'</div>'+FACT('🧮',w+' × '+h+' = '+answer+' ס"מ²'),c);
    return mkQ('מה שטח המלבן? ('+w+' × '+h+' ס"מ)',answer,html,'💡 '+w+' × '+h+' = '+answer);
  }

  // 6. Area of triangle — height line shown
  function qAreaTri(){
    var base, height;
    do { base=rnd(4,16)*2; height=rnd(3,12); } while((base*height)%2!==0);
    var answer=base*height/2; var c='#c77dff';
    var bpx=Math.min(base*9,210), hpx=Math.min(Math.max(height*9,60),155);
    var ox=(300-bpx)/2, oy=16, tipX=ox+bpx/2;
    var body=glow('gta',c)+'<polygon points="'+tipX+','+oy+' '+(ox+bpx)+','+(oy+hpx)+' '+ox+','+(oy+hpx)+'" fill="'+c+'22" stroke="'+c+'" stroke-width="3.5" filter="url(#gta)"/>';
    body+='<line x1="'+tipX+'" y1="'+oy+'" x2="'+tipX+'" y2="'+(oy+hpx)+'" stroke="#ffd32a" stroke-width="2" stroke-dasharray="6,4"/>';
    body+=RA(tipX,oy+hpx-10);
    body+=DIM(ox,oy+hpx+6,ox+bpx,oy+hpx+6,base+' ס"מ',c,-20);
    body+=T(tipX+14,oy+hpx/2,height+' ס"מ','#ffd32a',12,'start');
    body+=T(tipX,oy+hpx/2,'?','#fff',26);
    var html=CARD(CHIP('🔺 שטח = (בסיס × גובה) ÷ 2',c)+'<div style="text-align:center;margin-bottom:8px">'+S(300,230,body)+'</div>'+FACT('🧮','('+base+' × '+height+') ÷ 2 = '+answer+' ס"מ²'),c);
    return mkQ('מה שטח המשולש? (בסיס '+base+', גובה '+height+' ס"מ)',answer,html,'💡 ('+base+'×'+height+')÷2 = '+answer);
  }

  // 7. Grid area — count squares
  function qGridArea(){
    var cols=diff==='easy'?rnd(2,5):rnd(3,9), rows=diff==='easy'?rnd(2,5):rnd(2,8);
    var answer=cols*rows; var c='#ff9f43';
    var cell=Math.min(Math.floor(200/Math.max(cols,rows)),30);
    var gw=cols*cell, gh=rows*cell, ox=(300-gw)/2, oy=Math.max((220-gh)/2,16);
    var body='';
    for(var r2=0;r2<rows;r2++) for(var c2=0;c2<cols;c2++){
      var hue=((r2*cols+c2)/(rows*cols)*90+180)|0;
      body+='<rect x="'+(ox+c2*cell)+'" y="'+(oy+r2*cell)+'" width="'+(cell-1)+'" height="'+(cell-1)+'" fill="hsla('+hue+',65%,62%,.5)" stroke="rgba(255,255,255,.2)" stroke-width="1" rx="2"/>';
      if(cell>=24) body+=T(ox+c2*cell+cell/2,oy+r2*cell+cell/2+4,r2*cols+c2+1,'rgba(0,0,0,.6)',cell>=26?9:8);
    }
    body+='<rect x="'+ox+'" y="'+oy+'" width="'+gw+'" height="'+gh+'" fill="none" stroke="'+c+'" stroke-width="2.5" rx="3"/>';
    body+=DIM(ox,oy-6,ox+gw,oy-6,cols+'',c,16);
    body+=DIM(ox-6,oy,ox-6,oy+gh,rows+'',c,16);
    var html=CARD(CHIP('⬛ ספור ריבועים! '+cols+' × '+rows,c)+'<div style="text-align:center;margin-bottom:8px">'+S(300,240,body)+'</div>'+FACT('🧮','שורות × עמודות = '+rows+' × '+cols+' = '+answer),c);
    return mkQ('כמה ריבועים בגריד?',answer,html,'💡 '+rows+' × '+cols+' = '+answer);
  }

  // 8. Angle type — identify acute/right/obtuse
  function qAngleType(){
    var cases=[
      {deg:90,name:'ישרה',num:2,col:'#00d2d3'},{deg:45,name:'חדה',num:1,col:'#2ed573'},
      {deg:60,name:'חדה',num:1,col:'#2ed573'},{deg:120,name:'קהה',num:3,col:'#ff9f43'},
      {deg:135,name:'קהה',num:3,col:'#ff9f43'},{deg:30,name:'חדה',num:1,col:'#2ed573'},
    ];
    var pool=diff==='easy'?cases.slice(0,3):cases;
    var ch=pick(pool); var c=ch.col;
    var cx=140,cy=158,r=100;
    var rad=ch.deg*Math.PI/180;
    var x2=cx+r*Math.cos(-rad), y2=cy+r*Math.sin(-rad);
    var body=glow('gag',c)
      +'<line x1="'+cx+'" y1="'+cy+'" x2="'+(cx+r)+'" y2="'+cy+'" stroke="'+c+'" stroke-width="5" stroke-linecap="round" filter="url(#gag)"/>'
      +'<line x1="'+cx+'" y1="'+cy+'" x2="'+x2.toFixed(1)+'" y2="'+y2.toFixed(1)+'" stroke="'+c+'" stroke-width="5" stroke-linecap="round" filter="url(#gag)"/>';
    var arad=rad; var ax1=cx+40*Math.cos(-arad), ay1=cy+40*Math.sin(-arad);
    body+='<path d="M'+(cx+40)+','+cy+' A40,40 0 0,0 '+ax1.toFixed(1)+','+ay1.toFixed(1)+'" fill="'+c+'22" stroke="'+c+'" stroke-width="2.5"/>';
    if(ch.deg===90) body+=RA(cx,cy-10);
    var midRad=ch.deg/2*Math.PI/180;
    body+=T(cx+62*Math.cos(-midRad),cy+62*Math.sin(-midRad)+4,ch.deg+'°','#ffd32a',17);
    body+='<circle cx="'+cx+'" cy="'+cy+'" r="7" fill="'+c+'"/>';
    var html=CARD(CHIP('📐 זיהוי זוויות!',c)+'<div style="text-align:center;margin-bottom:8px">'+S(280,190,body)+'</div>'
      +'<div style="display:flex;gap:7px;justify-content:center">'
      +'<div style="background:#2ed57322;border:1.5px solid #2ed57366;border-radius:9px;padding:6px 10px;font-size:.75rem;color:#2ed573;font-family:Rubik,sans-serif">1 ⚡ חדה<br>&lt;90°</div>'
      +'<div style="background:#00d2d322;border:1.5px solid #00d2d366;border-radius:9px;padding:6px 10px;font-size:.75rem;color:#00d2d3;font-family:Rubik,sans-serif">2 🔲 ישרה<br>=90°</div>'
      +'<div style="background:#ff9f4322;border:1.5px solid #ff9f4366;border-radius:9px;padding:6px 10px;font-size:.75rem;color:#ff9f43;font-family:Rubik,sans-serif">3 🔔 קהה<br>&gt;90°</div>'
      +'</div>',c);
    return mkQ('איזה סוג זווית? (1=חדה  2=ישרה  3=קהה)',ch.num,html,'💡 '+ch.deg+'° → זווית '+ch.name);
  }

  // 9. Missing angle in triangle
  function qMissingAngle(){
    var a=rnd(35,80), b=rnd(25,100-a), c2=180-a-b;
    if(c2<=5||c2>=170) return qMissingAngle();
    var hide=pick([0,1,2]), vals=[a,b,c2]; var c='#ff6348';
    var lbPos=[[150,58],[238,192],[58,192]];
    var body=glow('gat',c)+'<polygon points="150,30 268,198 32,198" fill="'+c+'22" stroke="'+c+'" stroke-width="3.5" filter="url(#gat)"/>';
    vals.forEach(function(v,i){
      var lbl=i===hide?'?°':v+'°'; var col=i===hide?'#ffd32a':'#e2e8f0';
      body+='<circle cx="'+lbPos[i][0]+'" cy="'+(lbPos[i][1]-10)+'" r="20" fill="'+(i===hide?'#ffd32a33':c+'22')+'" stroke="'+(i===hide?'#ffd32a':c)+'66" stroke-width="1.5"/>';
      body+=T(lbPos[i][0],lbPos[i][1]-4,lbl,col,13);
    });
    body+=T(150,130,'180°','#8892b0',11);
    var known=vals.filter(function(_,i){return i!==hide;});
    var html=CARD(CHIP('🔺 סכום זוויות משולש = 180°',c)+'<div style="text-align:center;margin-bottom:8px">'+S(300,225,body)+'</div>'+FACT('🧮',known.join('° + ')+'° + ? = 180°')+FACT('💡','? = 180 - '+(known[0]+known[1])+' = '+vals[hide]+'°'),c);
    return mkQ('מצא את הזווית החסרה במשולש',vals[hide],html,'💡 180 - '+(known[0]+known[1])+' = '+vals[hide]);
  }

  // 10. Circle — identify diameter or circumference
  function qCircle(){
    var r=diff==='easy'?rnd(2,5):diff==='medium'?rnd(3,9):rnd(4,14);
    var d=2*r; var c='#ff6eb4';
    var askD=diff==='easy'||Math.random()<.5;
    var answer=askD?d:Math.round(3.14*r*r);
    var cr=Math.min(r*9,95), cx2=150, cy2=115;
    var body=glow('gcr',c)+'<circle cx="'+cx2+'" cy="'+cy2+'" r="'+cr+'" fill="'+c+'28" stroke="'+c+'" stroke-width="3.5" filter="url(#gcr)"/>';
    body+='<circle cx="'+cx2+'" cy="'+cy2+'" r="'+(cr*.65).toFixed(0)+'" fill="none" stroke="'+c+'22" stroke-width="1.5"/>';
    body+='<line x1="'+cx2+'" y1="'+cy2+'" x2="'+(cx2+cr)+'" y2="'+cy2+'" stroke="#ffd32a" stroke-width="2.5"/>';
    body+='<circle cx="'+cx2+'" cy="'+cy2+'" r="5" fill="#ffd32a"/>';
    body+=T(cx2+cr/2+2,cy2-10,'r = '+r,'#ffd32a',13);
    if(!askD){ body+='<line x1="'+(cx2-cr)+'" y1="'+cy2+'" x2="'+(cx2+cr)+'" y2="'+cy2+'" stroke="#c77dff" stroke-width="1.5" stroke-dasharray="5,4" opacity=".5"/>'; }
    body+=T(cx2,cy2+(askD?10:5),askD?'d = ?':'π×r²=?','#fff',22);
    var label=askD?'הקוטר = 2 × רדיוס':'שטח = π × r²';
    var html=CARD(CHIP('⭕ '+label,c)+'<div style="text-align:center;margin-bottom:8px">'+S(300,228,body)+'</div>'+FACT('🧮',askD?'d = 2 × '+r+' = '+d:'3.14 × '+r+'² = '+answer+' ס"מ²'),c);
    return mkQ(askD?'קוטר עיגול עם רדיוס '+r+' ס"מ?':'שטח עיגול עם רדיוס '+r+' ס"מ? (π=3.14)',answer,html,askD?'💡 2 × '+r+' = '+d:'💡 3.14 × '+r*r+' ≈ '+answer);
  }

  // 11. Measurement — ruler reading
  function qRuler(){
    var len=diff==='easy'?rnd(2,8):diff==='medium'?rnd(5,15):rnd(8,25);
    var unit=diff==='hard'?pick(['מ"מ','ס"מ']):'ס"מ';
    var objs=['עיפרון ✏️','גזר 🥕','ספר 📚','שרביט 🪄','חרב ⚔️'];
    var obj=pick(objs);
    var pixPerCm=Math.min(Math.floor(240/Math.max(len+2,8)),22);
    var rulerW=(len+2)*pixPerCm, ox=20, oy=92;
    var body='';
    body+='<rect x="'+ox+'" y="'+oy+'" width="'+rulerW+'" height="32" fill="#ffd32a22" stroke="#ffd32a" stroke-width="2" rx="4"/>';
    for(var i=0;i<=len+1;i++){
      var tx4=ox+i*pixPerCm;
      body+='<line x1="'+tx4+'" y1="'+oy+'" x2="'+tx4+'" y2="'+(i%5===0?oy-13:oy-6)+'" stroke="#ffd32a" stroke-width="'+(i%5===0?2:1)+'" opacity=".8"/>';
      if(i%2===0) body+=T(tx4,oy-16,i,'#8892b0',9);
    }
    body+=T(ox+rulerW/2,oy+20,'ס"מ','#ffd32a88',10);
    body+='<rect x="'+ox+'" y="'+(oy-46)+'" width="'+(len*pixPerCm)+'" height="30" rx="8" fill="#2ed57355" stroke="#2ed573" stroke-width="2.5"/>';
    body+=T(ox+len*pixPerCm/2,oy-24,obj,'',20);
    body+='<line x1="'+ox+'" y1="'+(oy-49)+'" x2="'+ox+'" y2="'+(oy-6)+'" stroke="#2ed573" stroke-width="1.5" stroke-dasharray="3,2" opacity=".6"/>';
    body+='<line x1="'+(ox+len*pixPerCm)+'" y1="'+(oy-49)+'" x2="'+(ox+len*pixPerCm)+'" y2="'+(oy-6)+'" stroke="#2ed573" stroke-width="1.5" stroke-dasharray="3,2" opacity=".6"/>';
    var html=CARD(CHIP('📏 קרא את הסרגל!','#2ed573')+'<div style="text-align:center;margin-bottom:8px;overflow-x:auto">'+S(rulerW+50,135,body)+'</div>'+FACT('💡','מתחיל מ-0, הקצה הימני = ?'),'#2ed573');
    return mkQ('כמה ס"מ ארוך ה'+obj+'?',len,html,'💡 '+len+' ס"מ');
  }

  // 12. Symmetry axes
  function qSymmetry(){
    var shapes=[
      {name:'ריבוע',axes:4,pts:'75,55 225,55 225,185 75,185',col:'#1e90ff'},
      {name:'מלבן',axes:2,pts:'40,80 260,80 260,170 40,170',col:'#00d2d3'},
      {name:'משולש שווה-צלעות',axes:3,pts:'150,30 255,195 45,195',col:'#2ed573'},
      {name:'מעוין',axes:2,pts:'150,25 255,112 150,195 45,112',col:'#c77dff'},
    ];
    var sh=pick(shapes); var c=sh.col;
    var axC=['#ffd32a','#ff6eb4','#a8e063','#00d2d3'];
    var axLines='';
    if(sh.axes>=1) axLines+='<line x1="150" y1="22" x2="150" y2="215" stroke="'+axC[0]+'" stroke-width="2.5" stroke-dasharray="8,5" opacity=".8"/>';
    if(sh.axes>=2) axLines+='<line x1="28" y1="118" x2="272" y2="118" stroke="'+axC[1]+'" stroke-width="2.5" stroke-dasharray="8,5" opacity=".8"/>';
    if(sh.axes>=3) axLines+='<line x1="42" y1="42" x2="258" y2="194" stroke="'+axC[2]+'" stroke-width="2.5" stroke-dasharray="6,4" opacity=".7"/>';
    if(sh.axes>=4) axLines+='<line x1="258" y1="42" x2="42" y2="194" stroke="'+axC[3]+'" stroke-width="2.5" stroke-dasharray="6,4" opacity=".7"/>';
    var body=glow('gsym',c)+'<polygon points="'+sh.pts+'" fill="'+c+'28" stroke="'+c+'" stroke-width="3" filter="url(#gsym)"/>'+axLines;
    var html=CARD(CHIP('🪞 ספור צירי סימטריה!',c)+'<div style="text-align:center;margin-bottom:8px">'+S(300,240,body)+'</div>'+FACT('💡','כל קו צבעוני = ציר סימטריה אחד'),c);
    return mkQ('כמה צירי סימטריה יש ל'+sh.name+'?',sh.axes,html,'💡 '+sh.axes+' צירי סימטריה');
  }

  // 13. L-shape area
  function qLShape(){
    var W, H, w, h;
    do { W=rnd(5,12); H=rnd(4,W); w=rnd(2,W-2); h=rnd(2,H-2); } while(w>=W||h>=H);
    var answer=W*H-w*h; var c='#ff9f43';
    var sc=Math.min(14,Math.floor(160/Math.max(W,H)));
    var Wp=W*sc, Hp=H*sc, wp=w*sc, hp=h*sc;
    var ox=Math.max((300-Wp)/2,22), oy=Math.max((230-Hp)/2,18);
    var pts=[ox+','+oy,(ox+Wp)+','+oy,(ox+Wp)+','+(oy+hp),(ox+Wp-wp)+','+(oy+hp),(ox+Wp-wp)+','+(oy+Hp),ox+','+(oy+Hp)].join(' ');
    var body='';
    for(var ri2=0;ri2<H;ri2++) for(var ci2=0;ci2<W;ci2++){
      if(ci2>=W-w&&ri2<h) continue;
      body+='<rect x="'+(ox+ci2*sc)+'" y="'+(oy+ri2*sc)+'" width="'+(sc-1)+'" height="'+(sc-1)+'" fill="'+c+((ri2+ci2)%2===0?'44':'22')+'" rx="1"/>';
    }
    body+=glow('gls',c)+'<polygon points="'+pts+'" fill="none" stroke="'+c+'" stroke-width="3.5" filter="url(#gls)"/>';
    body+='<rect x="'+(ox+Wp-wp)+'" y="'+oy+'" width="'+wp+'" height="'+hp+'" fill="#ff475711" stroke="#ff4757" stroke-width="1.5" stroke-dasharray="5,3" rx="3"/>';
    body+=T(ox+Wp-wp/2,oy+hp/2+5,'🚫','',15);
    body+=T(ox+Wp/4,oy+Hp/2+8,'?','#fff',26);
    var html=CARD(CHIP('🔡 צורת L',c)+'<div style="text-align:center;margin-bottom:8px">'+S(300,240,body)+'</div>'+FACT('🧮',W+'×'+H+' - '+w+'×'+h+' = '+(W*H)+' - '+(w*h)+' = '+answer+' ס"מ²'),c);
    return mkQ('מה שטח הצורה? ('+W+'×'+H+' פחות '+w+'×'+h+')',answer,html,'💡 '+W*H+' - '+w*h+' = '+answer);
  }

  // ── Pick pool by grade ──
  var easyPool, medPool, hardPool;
  if(grade==='א'||grade==='ב'){
    easyPool=[qCountSides,qCountSides,qRuler,qSymmetry];
    medPool=[qCountSides,qSymmetry,qRuler,qPerimSquare];
    hardPool=[qSymmetry,qAngleType,qPerimSquare,qRuler];
  } else if(grade==='ג'){
    easyPool=[qPerimSquare,qPerimRect,qGridArea,qCountSides,qRuler];
    medPool=[qPerimRect,qPerimTri,qGridArea,qAngleType,qRuler];
    hardPool=[qPerimTri,qMissingAngle,qAreaRect,qAngleType,qRuler];
  } else if(grade==='ד'){
    easyPool=[qAreaRect,qPerimRect,qGridArea,qAngleType,qRuler];
    medPool=[qAreaRect,qAreaTri,qMissingAngle,qPerimTri,qGridArea];
    hardPool=[qAreaTri,qMissingAngle,qCircle,qLShape,qAreaRect];
  } else if(grade==='ה'){
    easyPool=[qAreaRect,qAreaTri,qCircle,qGridArea,qAngleType];
    medPool=[qAreaTri,qCircle,qMissingAngle,qLShape,qPerimTri];
    hardPool=[qCircle,qLShape,qMissingAngle,qAreaTri,qAreaRect];
  } else {
    easyPool=[qAreaRect,qAreaTri,qCircle,qMissingAngle,qGridArea];
    medPool=[qCircle,qLShape,qMissingAngle,qAreaTri,qPerimTri];
    hardPool=[qCircle,qLShape,qMissingAngle,qAreaTri,qGridArea];
  }
  var pool=diff==='easy'?easyPool:diff==='medium'?medPool:hardPool;
  return pick(pool)(diff);
}


function genFrac(diff, th) {
  const pairs = [[1,2],[1,4],[3,4],[1,3],[2,3]];
  const [n,d] = pick(pairs);
  const total = rnd(4,20)*d;
  const part  = total*n/d;
  return { type:'num', cat:'fractions', diff, label:th.label, gameLabel:'', text:`כמה זה ${n}/${d} מתוך ${total}?`, answer:part, pts:ptsForQ('fractions',diff), hint:{type:'text',msg:`💡 ${total}÷${d}=${total/d} לחלק. ×${n}=${part}`}, showMul:false, dir:'rtl' };
}
