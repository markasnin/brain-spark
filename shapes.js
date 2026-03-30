// ══════════════════════════════════════════════════════════════
// shapes.js — Interactive Geometry Questions
// Generates questions of type 'shapes' with an interactive SVG
// canvas rendered inside the question card.
//
// Question object gets two extra fields:
//   shapeHtml  — the SVG/HTML string injected into #shapeCanvas
//   shapeCheck — function(userAnswer) => bool  (for special cases)
//
// Grade mapping:
//   ד (4): sides/corners, simple area (squares), perimeter
//   ה (5): area rectangles/triangles, perimeter, angle types
//   ו (6): compound shapes, full area+perimeter, angle sums
// ══════════════════════════════════════════════════════════════

(function() {

// ── helpers ──────────────────────────────────────────────────
const _rnd = (a,b) => Math.floor(Math.random()*(b-a+1))+a;
const _pick = arr => arr[Math.floor(Math.random()*arr.length)];

// Pastel palette for shapes
const COLORS = {
  fill:   ['#ff9f9f','#9fd3ff','#9fffc1','#ffe09f','#d09fff','#ff9fd0','#9fffff'],
  stroke: ['#e05555','#3a8fd4','#2eb870','#d4920a','#8040d0','#d04090','#00aaaa'],
};
function shapeColor(i) {
  i = i % COLORS.fill.length;
  return { fill: COLORS.fill[i], stroke: COLORS.stroke[i] };
}

// SVG wrapper
function svg(w, h, content, extra='') {
  return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg"
    style="width:100%;max-width:${w}px;display:block;margin:0 auto;border-radius:12px;background:rgba(255,255,255,0.04);" ${extra}>
    ${content}
  </svg>`;
}

// Label helper
function label(x, y, txt, color='var(--txt)', size=14, anchor='middle') {
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}"
    font-family="Rubik,sans-serif" fill="${color}" font-weight="700">${txt}</text>`;
}

// Animated dashed dimension line
function dimLine(x1,y1,x2,y2,lbl,color='#aaa') {
  const mx=(x1+x2)/2, my=(y1+y2)/2;
  const dx=x2-x1, dy=y2-y1;
  const len=Math.sqrt(dx*dx+dy*dy);
  const nx=-dy/len*14, ny=dx/len*14; // normal offset
  return `
    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
      stroke="${color}" stroke-width="1.5" stroke-dasharray="5,3" opacity="0.7"/>
    ${label(mx+nx, my+ny+5, lbl, color, 13)}`;
}

// Angle arc indicator
function angleArc(cx,cy,r,startDeg,endDeg,color='#ffd32a') {
  const toR = d => d*Math.PI/180;
  const x1=cx+r*Math.cos(toR(startDeg)), y1=cy+r*Math.sin(toR(startDeg));
  const x2=cx+r*Math.cos(toR(endDeg)),   y2=cy+r*Math.sin(toR(endDeg));
  const large = (endDeg-startDeg)>180?1:0;
  return `<path d="M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z"
    fill="${color}33" stroke="${color}" stroke-width="1.5"/>`;
}

// Right-angle box
function rightAngle(x,y,size=10,rotate=0) {
  return `<rect x="${x}" y="${y}" width="${size}" height="${size}"
    fill="none" stroke="#ffd32a" stroke-width="2"
    transform="rotate(${rotate},${x+size/2},${y+size/2})"/>`;
}

// ── GRADE 4: sides, corners, simple perimeter, intro area ────

function g4_sides(diff) {
  const shapes = [
    { name:'משולש', sides:3, corners:3,
      poly:'150,40 260,190 40,190', color:0 },
    { name:'ריבוע', sides:4, corners:4,
      poly:'60,60 240,60 240,180 60,180', color:1 },
    { name:'מלבן', sides:4, corners:4,
      poly:'40,80 260,80 260,160 40,160', color:2 },
    { name:'מחומש', sides:5, corners:5,
      poly:'150,30 250,100 210,200 90,200 50,100', color:3 },
    { name:'משושה', sides:6, corners:6,
      poly:'150,25 235,72 235,168 150,215 65,168 65,72', color:4 },
    { name:'מרובע', sides:4, corners:4,
      poly:'80,50 230,70 210,190 60,180', color:5 },
  ];
  const s = _pick(shapes);
  const c = shapeColor(s.color);
  const askSides = diff==='hard' ? (_rnd(0,1)===0) : true;
  const question = askSides ? `כמה צלעות יש ל${s.name}?` : `כמה פינות יש ל${s.name}?`;
  const answer   = askSides ? s.sides : s.corners;

  // Build SVG with animated fill + side-count labels
  const pts = s.poly.split(' ').map(p=>p.split(',').map(Number));
  let sideLabels = '';
  for(let i=0;i<pts.length;i++){
    const a=pts[i], b=pts[(i+1)%pts.length];
    const mx=(a[0]+b[0])/2, my=(a[1]+b[1])/2;
    sideLabels += `<circle cx="${mx}" cy="${my}" r="10" fill="${c.stroke}cc"/>`;
    sideLabels += label(mx, my+4, i+1, '#fff', 11);
  }

  const shapeHtml = svg(300, 240, `
    <polygon points="${s.poly}"
      fill="${c.fill}cc" stroke="${c.stroke}" stroke-width="3"
      style="filter:drop-shadow(0 4px 12px ${c.stroke}66)">
      <animate attributeName="opacity" values="0;1" dur="0.4s" fill="freeze"/>
    </polygon>
    ${sideLabels}
  `);

  return {
    type:'shapes', cat:'shapes', diff,
    text: question, answer,
    pts: ptsForQ('shapes',diff),
    shapeHtml,
    hint:{ type:'text', msg:`💡 ספור את הצלעות הממוספרות על הצורה!` },
    showMul:false, dir:'rtl', label:'📐 גיאומטריה', gameLabel:''
  };
}

function g4_perimeter(diff) {
  let w, h, shape, answer, dimSvg, question;
  if (diff==='easy') {
    // Square perimeter
    const s = _rnd(2,9);
    answer = 4*s;
    question = `מה היקף הריבוע שצלעו ${s} ס"מ?`;
    const px=60, side=150;
    dimSvg = svg(300,220, `
      <rect x="${px}" y="30" width="${side}" height="${side}"
        fill="${COLORS.fill[1]}cc" stroke="${COLORS.stroke[1]}" stroke-width="3" rx="4"/>
      ${dimLine(px,25,px+side,25,`${s} ס"מ`,'#9fd3ff')}
      ${dimLine(px+side+5,30,px+side+5,30+side,`${s} ס"מ`,'#9fd3ff')}
      ${rightAngle(px,30)}
      ${rightAngle(px+side-10,30,10,90)}
      ${rightAngle(px,30+side-10,10,-90)}
      ${rightAngle(px+side-10,30+side-10,10,180)}
    `);
  } else if (diff==='medium') {
    // Rectangle perimeter
    w = _rnd(3,12); h = _rnd(2, w-1)||2;
    answer = 2*(w+h);
    question = `מה היקף המלבן? (רוחב ${w}, גובה ${h})`;
    const pw=180, ph=Math.round(ph = h/w*pw); // scale
    const phh = Math.min(Math.max(ph,60),130);
    const ox=(300-pw)/2, oy=(200-phh)/2;
    dimSvg = svg(300,200, `
      <rect x="${ox}" y="${oy}" width="${pw}" height="${phh}"
        fill="${COLORS.fill[2]}cc" stroke="${COLORS.stroke[2]}" stroke-width="3" rx="4"/>
      ${dimLine(ox,oy-15,ox+pw,oy-15,`${w} ס"מ`,'#9fffc1')}
      ${dimLine(ox-15,oy,ox-15,oy+phh,`${h} ס"מ`,'#9fffc1')}
    `);
  } else {
    // Triangle perimeter (3-4-5)
    const a=_rnd(3,8), b=_rnd(3,8), c=_rnd(3,8);
    answer = a+b+c;
    question = `מה היקף המשולש עם צלעות ${a}, ${b}, ${c}?`;
    dimSvg = svg(300,220, `
      <polygon points="150,30 260,190 40,190"
        fill="${COLORS.fill[0]}cc" stroke="${COLORS.stroke[0]}" stroke-width="3"/>
      ${dimLine(40,190,260,190,`${a} ס"מ`,'#ff9f9f')}
      ${dimLine(260,190,150,30,`${b} ס"מ`,'#ff9f9f')}
      ${dimLine(150,30,40,190,`${c} ס"מ`,'#ff9f9f')}
    `);
  }

  return {
    type:'shapes', cat:'shapes', diff,
    text: question, answer,
    pts: ptsForQ('shapes',diff),
    shapeHtml: dimSvg,
    hint:{ type:'text', msg:`💡 היקף = סכום כל הצלעות!` },
    showMul:false, dir:'rtl', label:'📐 גיאומטריה', gameLabel:''
  };
}

function g4_area_squares(diff) {
  const s = diff==='easy' ? _rnd(2,6) : diff==='medium' ? _rnd(4,10) : _rnd(6,15);
  const answer = s*s;
  const question = `מה שטח הריבוע שצלעו ${s} ס"מ?`;
  const gridSize = Math.min(s, 8); // cap display grid
  const cell = Math.floor(160/gridSize);
  const ox = (300 - cell*gridSize)/2;
  const oy = (220 - cell*gridSize)/2;
  let gridLines = '';
  for(let r=0;r<=gridSize;r++) {
    gridLines += `<line x1="${ox}" y1="${oy+r*cell}" x2="${ox+gridSize*cell}" y2="${oy+r*cell}" stroke="#ffffff30" stroke-width="1"/>`;
    gridLines += `<line x1="${ox+r*cell}" y1="${oy}" x2="${ox+r*cell}" y2="${oy+gridSize*cell}" stroke="#ffffff30" stroke-width="1"/>`;
  }
  const shapeHtml = svg(300, 220, `
    <rect x="${ox}" y="${oy}" width="${gridSize*cell}" height="${gridSize*cell}"
      fill="${COLORS.fill[1]}99" stroke="${COLORS.stroke[1]}" stroke-width="3" rx="4"/>
    ${gridLines}
    ${dimLine(ox, oy-15, ox+gridSize*cell, oy-15, `${s} ס"מ`, '#9fd3ff')}
    ${dimLine(ox+gridSize*cell+8, oy, ox+gridSize*cell+8, oy+gridSize*cell, `${s} ס"מ`, '#9fd3ff')}
    ${s>8 ? label(ox+gridSize*cell/2, oy+gridSize*cell/2+6, `${s}×${s}=${answer}`, '#ffffffaa', 14) : ''}
  `);
  return {
    type:'shapes', cat:'shapes', diff,
    text: question, answer,
    pts: ptsForQ('shapes',diff),
    shapeHtml,
    hint:{ type:'text', msg:`💡 שטח ריבוע = צלע × צלע = ${s}×${s}` },
    showMul:false, dir:'rtl', label:'📐 גיאומטריה', gameLabel:''
  };
}

// ── GRADE 5: rectangle area, triangle area, angle types ──────

function g5_rect_area(diff) {
  let w, h;
  if(diff==='easy')        { w=_rnd(3,8);  h=_rnd(2,7); }
  else if(diff==='medium') { w=_rnd(5,15); h=_rnd(4,12); }
  else                     { w=_rnd(8,20); h=_rnd(6,18); }
  const answer = w*h;
  const pw=Math.min(w*14,200), ph=Math.min(h*14,150);
  const ox=(300-pw)/2, oy=(210-ph)/2;
  const shapeHtml = svg(300,210,`
    <rect x="${ox}" y="${oy}" width="${pw}" height="${ph}"
      fill="${COLORS.fill[2]}bb" stroke="${COLORS.stroke[2]}" stroke-width="3" rx="6">
      <animate attributeName="fill-opacity" values="0.4;0.75;0.4" dur="2s" repeatCount="indefinite"/>
    </rect>
    ${dimLine(ox,oy-15,ox+pw,oy-15,`${w} ס"מ`,'#9fffc1')}
    ${dimLine(ox-18,oy,ox-18,oy+ph,`${h} ס"מ`,'#9fffc1')}
    ${label(ox+pw/2, oy+ph/2+6, `${w}×${h}=?`, '#ffffffcc', 16)}
  `);
  return {
    type:'shapes', cat:'shapes', diff,
    text:`מה שטח המלבן? (רוחב ${w}, גובה ${h})`, answer,
    pts: ptsForQ('shapes',diff),
    shapeHtml,
    hint:{type:'text', msg:`💡 שטח מלבן = רוחב × גובה = ${w}×${h}`},
    showMul:false, dir:'rtl', label:'📐 גיאומטריה', gameLabel:''
  };
}

function g5_triangle_area(diff) {
  // base × height / 2, keep answer integer
  let base, height;
  do {
    base   = diff==='easy' ? _rnd(2,8)*2 : diff==='medium' ? _rnd(3,12)*2 : _rnd(5,16)*2;
    height = diff==='easy' ? _rnd(2,8)   : diff==='medium' ? _rnd(3,12)   : _rnd(5,16);
  } while ((base*height)%2 !== 0);
  const answer = base*height/2;
  const bpx=200, hpx=Math.round(height/base*bpx);
  const hpxC=Math.min(Math.max(hpx,50),160);
  const ox=(300-bpx)/2, oy=30;
  const tipX=ox+_rnd(Math.round(bpx*0.3),Math.round(bpx*0.7));
  const shapeHtml = svg(300,220,`
    <polygon points="${tipX},${oy} ${ox+bpx},${oy+hpxC} ${ox},${oy+hpxC}"
      fill="${COLORS.fill[0]}bb" stroke="${COLORS.stroke[0]}" stroke-width="3">
      <animate attributeName="fill-opacity" values="0.5;0.8;0.5" dur="2s" repeatCount="indefinite"/>
    </polygon>
    <line x1="${tipX}" y1="${oy}" x2="${tipX}" y2="${oy+hpxC}"
      stroke="#ffd32a" stroke-width="1.5" stroke-dasharray="5,3"/>
    ${dimLine(ox, oy+hpxC+15, ox+bpx, oy+hpxC+15, `${base} ס"מ`, '#ff9f9f')}
    ${label(tipX+14, oy+hpxC/2+5, `${height} ס"מ`, '#ffd32a', 13, 'start')}
    ${label(ox+bpx/2, oy+hpxC/2+6, '?', '#ffffffcc', 22)}
  `);
  return {
    type:'shapes', cat:'shapes', diff,
    text:`מה שטח המשולש? (בסיס ${base}, גובה ${height})`, answer,
    pts: ptsForQ('shapes',diff),
    shapeHtml,
    hint:{type:'text', msg:`💡 שטח משולש = (בסיס × גובה) ÷ 2 = (${base}×${height})÷2`},
    showMul:false, dir:'rtl', label:'📐 גיאומטריה', gameLabel:''
  };
}

function g5_angles(diff) {
  const types = [
    { name:'זווית ישרה', deg:90,  desc:'בדיוק 90°', color:1 },
    { name:'זווית חדה',  deg:45,  desc:'קטנה מ-90°', color:3 },
    { name:'זווית קהה',  deg:120, desc:'גדולה מ-90°', color:0 },
    { name:'זווית ישרה', deg:180, desc:'בדיוק 180° — קו ישר', color:2 },
  ];
  const t = _pick(types);
  // Question: "What is this angle type?" — multiple choice via number input
  // Instead: ask the degree value of a labeled angle
  const knownAngles = [30,45,60,90,120,135,150];
  const deg = diff==='easy' ? 90 : diff==='medium' ? _pick([45,60,120,135]) : _pick(knownAngles);
  const answer = deg;
  const r=80, cx=150, cy=150;
  const toR = d=>d*Math.PI/180;
  const x1=cx+r, y1=cy; // 0°
  const x2=cx+r*Math.cos(toR(-deg)), y2=cy+r*Math.sin(toR(-deg));
  const c = shapeColor(deg===90?1:deg<90?3:0);
  const arcR=40;
  const ax=cx+arcR*Math.cos(toR(-deg/2)), ay=cy+arcR*Math.sin(toR(-deg/2));
  const shapeHtml = svg(300,220,`
    <line x1="${cx}" y1="${cy}" x2="${x1}" y2="${y1}" stroke="${c.stroke}" stroke-width="4" stroke-linecap="round"/>
    <line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="${c.stroke}" stroke-width="4" stroke-linecap="round"/>
    ${angleArc(cx,cy,arcR,(-deg),0,c.fill)}
    ${deg===90 ? rightAngle(cx,cy-10,10,0) : ''}
    ${label(ax, ay+5, `?°`, '#ffd32a', 18)}
    <circle cx="${cx}" cy="${cy}" r="5" fill="${c.stroke}"/>
  `);
  return {
    type:'shapes', cat:'shapes', diff,
    text:`מה גודל הזווית (במעלות)?`, answer,
    pts: ptsForQ('shapes',diff),
    shapeHtml,
    hint:{type:'text', msg:`💡 זווית ישרה=90°, חדה<90°, קהה>90°`},
    showMul:false, dir:'rtl', label:'📐 גיאומטריה', gameLabel:''
  };
}

function g5_perimeter_mixed(diff) {
  // Perimeter of triangle or rectangle, grade-5 numbers
  const isRect = _rnd(0,1)===0;
  if(isRect) {
    const w=_rnd(diff==='easy'?4:6, diff==='hard'?20:12);
    const h=_rnd(diff==='easy'?3:4, diff==='hard'?15:10);
    const answer=2*(w+h);
    const pw=Math.min(w*12,200), ph=Math.min(h*12,150);
    const ox=(300-pw)/2,oy=(210-ph)/2;
    return {
      type:'shapes',cat:'shapes',diff,
      text:`מה היקף המלבן? (רוחב ${w}, גובה ${h})`, answer,
      pts:ptsForQ('shapes',diff),
      shapeHtml: svg(300,210,`
        <rect x="${ox}" y="${oy}" width="${pw}" height="${ph}"
          fill="${COLORS.fill[2]}99" stroke="${COLORS.stroke[2]}" stroke-width="3" rx="6"/>
        ${dimLine(ox,oy-15,ox+pw,oy-15,`${w} ס"מ`,'#9fffc1')}
        ${dimLine(ox-18,oy,ox-18,oy+ph,`${h} ס"מ`,'#9fffc1')}
      `),
      hint:{type:'text',msg:`💡 היקף = 2×(רוחב+גובה) = 2×(${w}+${h})`},
      showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''
    };
  } else {
    const a=_rnd(4,12),b=_rnd(4,12),c=_rnd(4,12);
    const answer=a+b+c;
    return {
      type:'shapes',cat:'shapes',diff,
      text:`מה היקף המשולש עם צלעות ${a}, ${b}, ${c}?`, answer,
      pts:ptsForQ('shapes',diff),
      shapeHtml: svg(300,220,`
        <polygon points="150,30 260,190 40,190"
          fill="${COLORS.fill[0]}99" stroke="${COLORS.stroke[0]}" stroke-width="3"/>
        ${dimLine(40,190,260,190,`${a} ס"מ`,'#ff9f9f')}
        ${dimLine(260,190,150,30,`${b} ס"מ`,'#ff9f9f')}
        ${dimLine(150,30,40,190,`${c} ס"מ`,'#ff9f9f')}
      `),
      hint:{type:'text',msg:`💡 היקף = ${a}+${b}+${c}`},
      showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''
    };
  }
}

// ── GRADE 6: compound shapes, angle sums, full area+perimeter ─

function g6_compound(diff) {
  // L-shape or T-shape area
  if(diff==='easy') {
    // L-shape = big rect minus small rect
    const W=_rnd(6,12), H=_rnd(6,12);
    const w=_rnd(2,W-2), h=_rnd(2,H-2);
    const answer = W*H - w*h;
    const scale=14;
    const Wp=W*scale, Hp=H*scale, wp=w*scale, hp=h*scale;
    const ox=(300-Wp)/2, oy=(220-Hp)/2;
    return {
      type:'shapes',cat:'shapes',diff,
      text:`מה שטח הצורה? (מלבן גדול ${W}×${H} פחות פינה ${w}×${h})`, answer,
      pts:ptsForQ('shapes',diff),
      shapeHtml: svg(300,220,`
        <rect x="${ox}" y="${oy}" width="${Wp}" height="${Hp}"
          fill="${COLORS.fill[3]}99" stroke="${COLORS.stroke[3]}" stroke-width="3" rx="4"/>
        <rect x="${ox+Wp-wp}" y="${oy}" width="${wp}" height="${hp}"
          fill="#07050f" stroke="${COLORS.stroke[0]}" stroke-width="2" stroke-dasharray="6,3" rx="4"/>
        ${dimLine(ox,oy-15,ox+Wp,oy-15,`${W}`,COLORS.stroke[3])}
        ${dimLine(ox-18,oy,ox-18,oy+Hp,`${H}`,COLORS.stroke[3])}
        ${label(ox+Wp-wp/2, oy+hp/2+5, `${w}×${h}`, '#aaaaaa', 12)}
      `),
      hint:{type:'text',msg:`💡 חשב שטח המלבן הגדול ופחות הפינה שחסרה: ${W}×${H} - ${w}×${h}`},
      showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''
    };
  } else if(diff==='medium') {
    // Rectangle + triangle on top
    const rW=_rnd(6,12), rH=_rnd(4,8), tH=_rnd(3,7);
    const answer = rW*rH + Math.round(rW*tH/2);
    if((rW*tH)%2!==0) return g6_compound('medium'); // retry
    const scale=13;
    const rWp=rW*scale, rHp=rH*scale, tHp=tH*scale;
    const ox=(300-rWp)/2, oy=20;
    return {
      type:'shapes',cat:'shapes',diff,
      text:`מה שטח הצורה? (מלבן ${rW}×${rH} + משולש בסיס ${rW} גובה ${tH})`, answer,
      pts:ptsForQ('shapes',diff),
      shapeHtml: svg(300,220,`
        <rect x="${ox}" y="${oy+tHp}" width="${rWp}" height="${rHp}"
          fill="${COLORS.fill[1]}bb" stroke="${COLORS.stroke[1]}" stroke-width="3" rx="4"/>
        <polygon points="${ox+rWp/2},${oy} ${ox+rWp},${oy+tHp} ${ox},${oy+tHp}"
          fill="${COLORS.fill[4]}bb" stroke="${COLORS.stroke[4]}" stroke-width="3"/>
        ${dimLine(ox,oy+tHp+rHp+15,ox+rWp,oy+tHp+rHp+15,`${rW}`,COLORS.stroke[1])}
        ${dimLine(ox-18,oy+tHp,ox-18,oy+tHp+rHp,`${rH}`,COLORS.stroke[1])}
        ${label(ox+rWp/2, oy+tHp/2+5, `גובה ${tH}`, '#d09fff', 12)}
      `),
      hint:{type:'text',msg:`💡 שטח = מלבן + משולש = ${rW}×${rH} + (${rW}×${tH}÷2)`},
      showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''
    };
  } else {
    // Full compound: two rectangles forming a plus/cross
    const a=_rnd(4,8), b=_rnd(3,6), c=_rnd(4,8), d=_rnd(3,6);
    const answer = a*b + c*d;
    const sc=14;
    const ox=50, oy=20;
    return {
      type:'shapes',cat:'shapes',diff,
      text:`מה שטח הצורה המורכבת? (מלבן ${a}×${b} + מלבן ${c}×${d})`, answer,
      pts:ptsForQ('shapes',diff),
      shapeHtml: svg(300,220,`
        <rect x="${ox}" y="${oy+40}" width="${a*sc}" height="${b*sc}"
          fill="${COLORS.fill[2]}bb" stroke="${COLORS.stroke[2]}" stroke-width="3" rx="4"/>
        <rect x="${ox+a*sc+10}" y="${oy}" width="${c*sc}" height="${d*sc}"
          fill="${COLORS.fill[5]}bb" stroke="${COLORS.stroke[5]}" stroke-width="3" rx="4"/>
        ${dimLine(ox,oy+40-15,ox+a*sc,oy+40-15,`${a}`,COLORS.stroke[2])}
        ${dimLine(ox-18,oy+40,ox-18,oy+40+b*sc,`${b}`,COLORS.stroke[2])}
        ${dimLine(ox+a*sc+10,oy-15,ox+a*sc+10+c*sc,oy-15,`${c}`,COLORS.stroke[5])}
        ${dimLine(ox+a*sc+10+c*sc+8,oy,ox+a*sc+10+c*sc+8,oy+d*sc,`${d}`,COLORS.stroke[5])}
        ${label(ox+a*sc/2,oy+40+b*sc/2+5,'?','#ffffffaa',14)}
      `),
      hint:{type:'text',msg:`💡 חשב כל מלבן בנפרד ואז חבר: ${a}×${b} + ${c}×${d}`},
      showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''
    };
  }
}

function g6_angle_sum(diff) {
  if(diff==='easy') {
    // Triangle angle sum: give 2, find 3rd
    const a=_rnd(30,80), b=_rnd(20,80-a+20);
    const c=180-a-b;
    if(c<=0||c>=180) return g6_angle_sum('easy');
    const shapeHtml = svg(300,210,`
      <polygon points="150,25 260,185 40,185"
        fill="${COLORS.fill[0]}99" stroke="${COLORS.stroke[0]}" stroke-width="3"/>
      ${label(150,55,`${a}°`,'#ffd32a',16)}
      ${label(230,175,`${b}°`,'#ffd32a',16)}
      ${label(65,175,`?°`,'#ff9f9f',18)}
      ${label(150,120,'סכום = 180°','#ffffffaa',13)}
    `);
    return {
      type:'shapes',cat:'shapes',diff,
      text:`סכום זוויות משולש הוא 180°. שתי זוויות הן ${a}° ו-${b}°. מה הזווית השלישית?`,
      answer:c, pts:ptsForQ('shapes',diff), shapeHtml,
      hint:{type:'text',msg:`💡 ${a} + ${b} + ? = 180 → ? = 180 - ${a} - ${b}`},
      showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''
    };
  } else if(diff==='medium') {
    // Quadrilateral angle sum: give 3, find 4th
    const a=_rnd(60,110), b=_rnd(60,110), c=_rnd(60,110);
    const d=360-a-b-c;
    if(d<=0||d>=360) return g6_angle_sum('medium');
    const shapeHtml = svg(300,210,`
      <polygon points="60,40 240,40 270,180 30,180"
        fill="${COLORS.fill[5]}99" stroke="${COLORS.stroke[5]}" stroke-width="3"/>
      ${label(80,65,`${a}°`,'#ffd32a',15)}
      ${label(215,65,`${b}°`,'#ffd32a',15)}
      ${label(240,170,`${c}°`,'#ffd32a',15)}
      ${label(55,170,`?°`,'#ff9f9f',18)}
      ${label(155,115,'סכום = 360°','#ffffffaa',13)}
    `);
    return {
      type:'shapes',cat:'shapes',diff,
      text:`סכום זוויות מרובע הוא 360°. שלוש זוויות הן ${a}°, ${b}°, ${c}°. מה הזווית הרביעית?`,
      answer:d, pts:ptsForQ('shapes',diff), shapeHtml,
      hint:{type:'text',msg:`💡 ${a}+${b}+${c}+? = 360 → ? = 360-${a}-${b}-${c}`},
      showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''
    };
  } else {
    // Perimeter + area of triangle (3-4-5 right triangle)
    const scale=_rnd(2,5);
    const a=3*scale,b=4*scale,c=5*scale;
    const answer=a+b+c;
    const shapeHtml = svg(300,220,`
      <polygon points="50,180 230,180 50,60"
        fill="${COLORS.fill[4]}99" stroke="${COLORS.stroke[4]}" stroke-width="3"/>
      ${rightAngle(50,170,10,0)}
      ${dimLine(50,195,230,195,`${a} ס"מ`,COLORS.stroke[4])}
      ${dimLine(35,60,35,180,`${b} ס"מ`,COLORS.stroke[4])}
      ${dimLine(230,180,50,60,`${c} ס"מ`,COLORS.stroke[4])}
      ${label(155,130,'?','#ffffffaa',22)}
    `);
    return {
      type:'shapes',cat:'shapes',diff,
      text:`מה היקף משולש ישר-זווית עם צלעות ${a}, ${b}, ${c}?`,
      answer, pts:ptsForQ('shapes',diff), shapeHtml,
      hint:{type:'text',msg:`💡 היקף = ${a}+${b}+${c}`},
      showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''
    };
  }
}

// ── MAIN ENTRY POINT ─────────────────────────────────────────
// Called from questions.js genShapes(diff, theme)
window.genShapesInteractive = function(diff) {
  const grade = window._grade || 'ד';

  if (grade === 'ד') {
    // Grade 4: sides/corners, simple perimeter, square area
    const pool = [g4_sides, g4_perimeter, g4_area_squares];
    const weights = diff==='easy'  ? [3,1,0] :
                    diff==='medium' ? [1,2,1] : [0,2,2];
    return _weightedPick(pool, weights)(diff);
  }

  if (grade === 'ה') {
    // Grade 5: rect area, triangle area, angles, perimeter
    const pool = [g5_rect_area, g5_triangle_area, g5_angles, g5_perimeter_mixed];
    const weights = diff==='easy'  ? [2,1,1,1] :
                    diff==='medium' ? [1,2,1,1] : [1,2,2,1];
    return _weightedPick(pool, weights)(diff);
  }

  if (grade === 'ו') {
    // Grade 6: compound shapes, angle sums, advanced perimeter
    const pool = [g6_compound, g6_angle_sum];
    return _pick(pool)(diff);
  }

  // Fallback for grades א-ג (shapes shouldn't appear but safety net)
  return g4_sides('easy');
};

function _weightedPick(arr, weights) {
  const total = weights.reduce((a,b)=>a+b,0);
  let r = Math.random()*total;
  for(let i=0;i<arr.length;i++) { r-=weights[i]; if(r<=0) return arr[i]; }
  return arr[arr.length-1];
}

})(); // end IIFE
