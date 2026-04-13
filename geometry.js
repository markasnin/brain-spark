// ══════════════════════════════════════════════════════════════════════
// geometry.js — Unified Geometry & Measurement Engine
// Israeli elementary curriculum (משרד החינוך) grades א–ו
// Every single question has a rich animated SVG visual.
// Patches grade-file generators at runtime so all shapes/measurement
// questions get beautiful visuals too.
// ══════════════════════════════════════════════════════════════════════
(function () {
'use strict';

// ──────────────────────────────────────────────────────────
// UTILS
// ──────────────────────────────────────────────────────────
const rnd  = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick = arr   => arr[Math.floor(Math.random() * arr.length)];
const clamp = (v,lo,hi) => Math.max(lo, Math.min(hi, v));

// Palette — 10 fill/stroke pairs
const FILLS   = ['#ff7eb3','#7ec8ff','#7effb2','#ffe07e','#c07eff','#ff9f7e','#7efff0','#ffeb7e','#ff6b9d','#a8edea'];
const STROKES = ['#e0006a','#0078c8','#00c85a','#c88000','#7800c8','#c84000','#00a8a8','#c8a000','#cc0055','#20b2aa'];
const cf = i => FILLS  [Math.abs(i) % FILLS.length];
const cs = i => STROKES[Math.abs(i) % STROKES.length];

// ──────────────────────────────────────────────────────────
// SVG PRIMITIVES
// ──────────────────────────────────────────────────────────
function svgWrap(w, h, body) {
  return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg"
    style="width:100%;max-width:${w}px;display:block;margin:4px auto 8px;
    border-radius:20px;background:linear-gradient(135deg,#1a1040,#0d0820);
    border:2px solid rgba(255,255,255,.13);box-shadow:0 8px 32px rgba(0,0,0,.5)">${body}</svg>`;
}

function T(x, y, t, col, sz, anc, fw) {
  return `<text x="${x}" y="${y}" text-anchor="${anc||'middle'}"
    font-size="${sz||14}" font-family="Fredoka,Rubik,sans-serif"
    fill="${col||'#fff'}" font-weight="${fw||'700'}">${t}</text>`;
}

function dimLine(x1, y1, x2, y2, label, col, perp) {
  col = col || '#ffd32a';
  const dx=x2-x1, dy=y2-y1, len=Math.sqrt(dx*dx+dy*dy)||1;
  const nx=-dy/len, ny=dx/len;
  const off = (perp===undefined ? 18 : perp);
  const ox1=x1+nx*off, oy1=y1+ny*off, ox2=x2+nx*off, oy2=y2+ny*off;
  const mx=(ox1+ox2)/2, my=(oy1+oy2)/2;
  const lw = String(label).length*7+16;
  return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${(x1+nx*(off+4)).toFixed(1)}" y2="${(y1+ny*(off+4)).toFixed(1)}" stroke="${col}" stroke-width="1.2" opacity=".5"/>
<line x1="${x2.toFixed(1)}" y1="${y2.toFixed(1)}" x2="${(x2+nx*(off+4)).toFixed(1)}" y2="${(y2+ny*(off+4)).toFixed(1)}" stroke="${col}" stroke-width="1.2" opacity=".5"/>
<line x1="${ox1.toFixed(1)}" y1="${oy1.toFixed(1)}" x2="${ox2.toFixed(1)}" y2="${oy2.toFixed(1)}" stroke="${col}" stroke-width="2" opacity=".9"/>
<rect x="${(mx-lw/2).toFixed(1)}" y="${(my-10).toFixed(1)}" width="${lw}" height="20" rx="10" fill="${col}" opacity=".95"/>
${T(mx, my+5, label, '#111', 12)}`;
}

function RA(x, y, sz, col) { // right-angle marker
  sz=sz||11; col=col||'#ffd32a';
  return `<polyline points="${x+sz},${y} ${x+sz},${y+sz} ${x},${y+sz}" fill="none" stroke="${col}" stroke-width="2.2"/>`;
}

function arcSec(cx, cy, r, a1deg, a2deg, col) { // filled arc sector
  col=col||'#ffd32a';
  const a1=a1deg*Math.PI/180, a2=a2deg*Math.PI/180;
  const x1=cx+r*Math.cos(-a1), y1=cy+r*Math.sin(-a1);
  const x2=cx+r*Math.cos(-a2), y2=cy+r*Math.sin(-a2);
  return `<path d="M${cx},${cy} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${Math.abs(a2deg-a1deg)>180?1:0},0 ${x2.toFixed(1)},${y2.toFixed(1)} Z" fill="${col}33" stroke="${col}" stroke-width="1.8"/>`;
}

function glowDef(id, col) {
  return `<defs><filter id="${id||'g1'}"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`;
}

function dotGrid(ox, oy, cols, rows, cell, col) {
  col=col||'rgba(255,255,255,.07)'; let g='';
  for(let r=0;r<=rows;r++) g+=`<line x1="${ox}" y1="${oy+r*cell}" x2="${ox+cols*cell}" y2="${oy+r*cell}" stroke="${col}" stroke-width="1"/>`;
  for(let c=0;c<=cols;c++) g+=`<line x1="${ox+c*cell}" y1="${oy}" x2="${ox+c*cell}" y2="${oy+rows*cell}" stroke="${col}" stroke-width="1"/>`;
  return g;
}

// ──────────────────────────────────────────────────────────
// SHAPE DRAWING FUNCTIONS
// Each returns a full SVG string (no outer wrapper needed).
// ──────────────────────────────────────────────────────────

function drawSquare(side, ci, label) {
  const f=cf(ci), s=cs(ci), sd=140, ox=80, oy=40;
  return svgWrap(300, 230,
    glowDef('gSq') +
    dotGrid(ox, oy, Math.min(side,8), Math.min(side,8), sd/Math.min(side,8)) +
    `<rect x="${ox}" y="${oy}" width="${sd}" height="${sd}" fill="${f}44" stroke="${s}" stroke-width="3.5" rx="3" filter="url(#gSq)">
      <animate attributeName="opacity" values="0;1" dur=".45s" fill="freeze"/>
    </rect>` +
    RA(ox, oy+sd-11) + RA(ox+sd-11, oy) + RA(ox, oy) + RA(ox+sd-11, oy+sd-11) +
    dimLine(ox, oy-20, ox+sd, oy-20, side+' ס"מ', s, 0) +
    dimLine(ox+sd+16, oy, ox+sd+16, oy+sd, side+' ס"מ', s, 0) +
    T(ox+sd/2, oy+sd/2+6, label||'שטח=?', '#ffffffdd', 17)
  );
}

function drawRect(w, h, ci, label) {
  const f=cf(ci), s=cs(ci);
  const pw=clamp(w*11,60,195), ph=clamp(h*11,45,135);
  const ox=(300-pw)/2, oy=(210-ph)/2;
  return svgWrap(300, 210,
    glowDef('gRe') +
    `<rect x="${ox}" y="${oy}" width="${pw}" height="${ph}" fill="${f}44" stroke="${s}" stroke-width="3.5" rx="3" filter="url(#gRe)">
      <animate attributeName="opacity" values="0;1" dur=".45s" fill="freeze"/>
    </rect>` +
    RA(ox, oy+ph-11) + RA(ox+pw-11, oy) +
    dimLine(ox, oy-20, ox+pw, oy-20, w+' ס"מ', s, 0) +
    dimLine(ox+pw+16, oy, ox+pw+16, oy+ph, h+' ס"מ', s, 0) +
    T(ox+pw/2, oy+ph/2+6, label||'היקף=?', '#ffffffdd', 16)
  );
}

function drawTriangle(base, sideB, sideC, ci, heightVal, showHeight) {
  const f=cf(ci), s=cs(ci);
  const bpx=clamp(base*9,80,210), hpx=clamp((sideB||base)*8,60,150);
  const ox=(300-bpx)/2, oy=195-hpx;
  const apex=[ox+bpx/2, oy], bl=[ox, oy+hpx], br=[ox+bpx, oy+hpx];
  let body = glowDef('gTr') +
    `<polygon points="${apex} ${bl} ${br}" fill="${f}44" stroke="${s}" stroke-width="3.5" filter="url(#gTr)">
      <animate attributeName="opacity" values="0;1" dur=".45s" fill="freeze"/>
    </polygon>`;
  if (showHeight && heightVal) {
    body += `<line x1="${apex[0]}" y1="${apex[1]}" x2="${apex[0]}" y2="${bl[1]}" stroke="#ff9f7e" stroke-width="2" stroke-dasharray="5,3"/>`;
    body += dimLine(apex[0]+14, apex[1], apex[0]+14, bl[1], heightVal+' ס"מ', '#ff9f7e', 0);
  }
  body += dimLine(bl[0], bl[1]+18, br[0], br[1]+18, base+' ס"מ', s, 0);
  if (sideC && !showHeight) body += T((apex[0]+bl[0])/2-18, (apex[1]+bl[1])/2, sideC+' ס"מ', s, 12);
  if (sideB && !showHeight) body += T((apex[0]+br[0])/2+18, (apex[1]+br[1])/2, sideB+' ס"מ', s, 12);
  return svgWrap(300, 220, body);
}

function drawRightTriangle(leg1, leg2, ci) {
  const f=cf(ci), s=cs(ci);
  const px1=clamp(leg1*11,60,200), px2=clamp(leg2*11,50,160);
  const ox=50, oy=60;
  return svgWrap(300, 230,
    glowDef('gRt') +
    `<polygon points="${ox},${oy+px2} ${ox+px1},${oy+px2} ${ox},${oy}" fill="${f}44" stroke="${s}" stroke-width="3.5" filter="url(#gRt)">
      <animate attributeName="opacity" values="0;1" dur=".45s" fill="freeze"/>
    </polygon>` +
    RA(ox, oy+px2-11) +
    dimLine(ox, oy+px2+18, ox+px1, oy+px2+18, leg1+' ס"מ', s, 0) +
    dimLine(ox-18, oy, ox-18, oy+px2, leg2+' ס"מ', s, 0)
  );
}

function drawCircle(r, ci, mode) {
  // mode: 'radius' | 'diameter' | null
  const f=cf(ci), s=cs(ci), cr=clamp(r*11,35,95), cx=150, cy=118;
  let body = glowDef('gCi') +
    `<circle cx="${cx}" cy="${cy}" r="${cr}" fill="${f}44" stroke="${s}" stroke-width="3.5" filter="url(#gCi)">
      <animate attributeName="opacity" values="0;1" dur=".45s" fill="freeze"/>
    </circle>`;
  if (mode==='radius') {
    body += `<line x1="${cx}" y1="${cy}" x2="${cx+cr}" y2="${cy}" stroke="#ffd32a" stroke-width="3"/>
      <circle cx="${cx}" cy="${cy}" r="4" fill="#ffd32a"/>` +
      dimLine(cx, cy-14, cx+cr, cy-14, 'r='+r+' ס"מ', '#ffd32a', 0);
  } else if (mode==='diameter') {
    body += `<line x1="${cx-cr}" y1="${cy}" x2="${cx+cr}" y2="${cy}" stroke="#ffd32a" stroke-width="3"/>
      <circle cx="${cx}" cy="${cy}" r="4" fill="#ffd32a"/>` +
      dimLine(cx-cr, cy-14, cx+cr, cy-14, 'ø='+(2*r)+' ס"מ', '#ffd32a', 0);
  }
  return svgWrap(300, 230, body);
}

function drawParallelogram(base, height, ci) {
  const f=cf(ci), s=cs(ci), off=28;
  const bpx=clamp(base*9,80,180), hpx=clamp(height*9,45,130);
  const ox=(300-bpx-off)/2, oy=50;
  return svgWrap(300, 210,
    glowDef('gPa') +
    `<polygon points="${ox+off},${oy} ${ox+off+bpx},${oy} ${ox+bpx},${oy+hpx} ${ox},${oy+hpx}" fill="${f}44" stroke="${s}" stroke-width="3.5" filter="url(#gPa)">
      <animate attributeName="opacity" values="0;1" dur=".45s" fill="freeze"/>
    </polygon>` +
    `<line x1="${ox+off+bpx/2}" y1="${oy}" x2="${ox+bpx/2}" y2="${oy+hpx}" stroke="#ff9f7e" stroke-width="2" stroke-dasharray="5,3"/>` +
    dimLine(ox+off, oy-18, ox+off+bpx, oy-18, base+' ס"מ', s, 0) +
    dimLine(ox+bpx+off+14, oy, ox+bpx+14, oy+hpx, height+' ס"מ', '#ff9f7e', 0) +
    T(ox+bpx/2+off/2, oy+hpx/2+6, 'שטח=?', '#ffffffdd', 15)
  );
}

function drawTrapezoid(b1, b2, h, ci) {
  const f=cf(ci), s=cs(ci);
  const b1px=clamp(b1*10,80,210), b2px=clamp(b2*10,50,160), hpx=clamp(h*10,45,120);
  const ox=(300-b1px)/2, oy=70, off=(b1px-b2px)/2;
  return svgWrap(300, 225,
    glowDef('gTz') +
    `<polygon points="${ox},${oy+hpx} ${ox+b1px},${oy+hpx} ${ox+off+b2px},${oy} ${ox+off},${oy}" fill="${f}44" stroke="${s}" stroke-width="3.5" filter="url(#gTz)">
      <animate attributeName="opacity" values="0;1" dur=".45s" fill="freeze"/>
    </polygon>` +
    `<line x1="${ox+off}" y1="${oy}" x2="${ox+off}" y2="${oy+hpx}" stroke="#ff9f7e" stroke-width="2" stroke-dasharray="5,3"/>` +
    dimLine(ox, oy+hpx+16, ox+b1px, oy+hpx+16, b1+' ס"מ', s, 0) +
    dimLine(ox+off, oy-16, ox+off+b2px, oy-16, b2+' ס"מ', s, 0) +
    T(clamp(ox-5,8,50), oy+hpx/2, h+' ס"מ', '#ff9f7e', 12, 'end')
  );
}

function drawRegularPoly(n, ci, label) {
  const f=cf(ci), s=cs(ci), r=90, cx=150, cy=118;
  let pts='';
  for(let i=0;i<n;i++){const a=(i*2*Math.PI/n)-Math.PI/2; pts+=`${(cx+r*Math.cos(a)).toFixed(1)},${(cy+r*Math.sin(a)).toFixed(1)} `;}
  return svgWrap(300, 235,
    glowDef('gPo') +
    `<polygon points="${pts}" fill="${f}44" stroke="${s}" stroke-width="3.5" filter="url(#gPo)">
      <animate attributeName="opacity" values="0;1" dur=".45s" fill="freeze"/>
    </polygon>` +
    T(cx, cy+5, label||n+'–צלע', '#ffffff99', 14)
  );
}

function drawLShape(W, H, w, h, ci) {
  const f=cf(ci), s=cs(ci), sc=16, ox=28, oy=22;
  return svgWrap(300, 250,
    glowDef('gLS') +
    `<polygon points="${ox},${oy} ${ox+W*sc},${oy} ${ox+W*sc},${oy+(H-h)*sc} ${ox+(W-w)*sc},${oy+(H-h)*sc} ${ox+(W-w)*sc},${oy+H*sc} ${ox},${oy+H*sc}" fill="${f}44" stroke="${s}" stroke-width="3.5" filter="url(#gLS)">
      <animate attributeName="opacity" values="0;1" dur=".45s" fill="freeze"/>
    </polygon>` +
    dimLine(ox, oy-16, ox+W*sc, oy-16, W+' ס"מ', s, 0) +
    dimLine(ox-16, oy, ox-16, oy+H*sc, H+' ס"מ', s, 0) +
    dimLine(ox+(W-w)*sc, oy+(H-h)*sc-14, ox+W*sc, oy+(H-h)*sc-14, w+' ס"מ', '#ff9f7e', 0) +
    dimLine(ox+W*sc+12, oy, ox+W*sc+12, oy+(H-h)*sc, h+' ס"מ', '#ff9f7e', 0)
  );
}

function drawAngle(deg, ci, showValue) {
  const f=cf(ci), s=cs(ci), cx=130, cy=178, r=115;
  const rad=deg*Math.PI/180;
  const x2=(cx+r*Math.cos(-rad)).toFixed(1), y2=(cy+r*Math.sin(-rad)).toFixed(1);
  return svgWrap(300, 220,
    glowDef('gAg') +
    `<line x1="${cx}" y1="${cy}" x2="${cx+r}" y2="${cy}" stroke="${s}" stroke-width="5.5" stroke-linecap="round" filter="url(#gAg)"/>
    <line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="${s}" stroke-width="5.5" stroke-linecap="round" filter="url(#gAg)"/>` +
    arcSec(cx, cy, 46, 0, deg, f) +
    (deg===90 ? RA(cx, cy-13, 13) : '') +
    `<circle cx="${cx}" cy="${cy}" r="5.5" fill="#ffd32a"/>` +
    T(cx+72*Math.cos(-rad/2), cy+72*Math.sin(-rad/2)+4,
      showValue ? deg+'°' : '?°', '#ffd32a', 22)
  );
}

function drawSymmetry(shape, axes, ci) {
  const f=cf(ci), s=cs(ci);
  const AC=['#ffd32a','#7ec8ff','#7effb2','#c07eff','#ff9f7e','#ff7eb3'];
  const PTS={
    square:'75,55 225,55 225,185 75,185',
    rect:'42,72 258,72 258,162 42,162',
    triangle:'150,28 255,195 45,195',
    hexagon:'150,22 233,68 233,162 150,208 67,162 67,68',
    diamond:'150,25 258,110 150,195 42,110',
    pentagon:'150,25 248,92 210,205 90,205 52,92',
  };
  let body='', axLines='';
  if (shape==='circle') {
    body=`<circle cx="150" cy="115" r="90" fill="${f}44" stroke="${s}" stroke-width="3.5"/>`;
    for(let a=0;a<180;a+=30) axLines+=`<line x1="${(150+96*Math.cos(a*Math.PI/180)).toFixed(1)}" y1="${(115+96*Math.sin(a*Math.PI/180)).toFixed(1)}" x2="${(150-96*Math.cos(a*Math.PI/180)).toFixed(1)}" y2="${(115-96*Math.sin(a*Math.PI/180)).toFixed(1)}" stroke="${AC[a/30%6]}" stroke-width="1.8" stroke-dasharray="6,4" opacity=".7"/>`;
  } else {
    body=`<polygon points="${PTS[shape]||PTS.square}" fill="${f}44" stroke="${s}" stroke-width="3.5"/>`;
    if(axes>=1) axLines+=`<line x1="150" y1="10" x2="150" y2="220" stroke="${AC[0]}" stroke-width="2" stroke-dasharray="7,4" opacity=".85"/>`;
    if(axes>=2) axLines+=`<line x1="20" y1="115" x2="280" y2="115" stroke="${AC[1]}" stroke-width="2" stroke-dasharray="7,4" opacity=".85"/>`;
    if(axes>=3) axLines+=`<line x1="35" y1="35" x2="265" y2="195" stroke="${AC[2]}" stroke-width="2" stroke-dasharray="7,4" opacity=".78"/>`;
    if(axes>=4) axLines+=`<line x1="265" y1="35" x2="35" y2="195" stroke="${AC[3]}" stroke-width="2" stroke-dasharray="7,4" opacity=".78"/>`;
    if(axes>=5) axLines+=`<line x1="82" y1="15" x2="218" y2="215" stroke="${AC[4]}" stroke-width="2" stroke-dasharray="7,4" opacity=".7"/>`;
    if(axes>=6) axLines+=`<line x1="218" y1="15" x2="82" y2="215" stroke="${AC[5]}" stroke-width="2" stroke-dasharray="7,4" opacity=".7"/>`;
  }
  return svgWrap(300, 235, glowDef('gSy')+body+axLines);
}

function drawGrid(cols, rows, ci) {
  const f=cf(ci), s=cs(ci);
  const cell=Math.min(Math.floor(180/Math.max(cols,rows)),30);
  const gw=cols*cell, gh=rows*cell, ox=(300-gw)/2, oy=(215-gh)/2;
  let g='';
  for(let r=0;r<rows;r++) for(let c=0;c<cols;c++){
    const hue=((r*cols+c)/(rows*cols)*80+160)|0;
    g+=`<rect x="${ox+c*cell}" y="${oy+r*cell}" width="${cell}" height="${cell}" fill="hsla(${hue},65%,62%,.55)" stroke="rgba(255,255,255,.18)" stroke-width="1"/>`;
  }
  g+=`<rect x="${ox}" y="${oy}" width="${gw}" height="${gh}" fill="none" stroke="${s}" stroke-width="2.5" rx="2"/>`;
  g+=dimLine(ox, oy-16, ox+gw, oy-16, cols+'', '#7ec8ff', 0);
  g+=dimLine(ox-16, oy, ox-16, oy+gh, rows+'', '#7effb2', 0);
  return svgWrap(300, 220, glowDef('gGr')+g);
}

function drawNumberLine(val, lo, hi, ci, marks) {
  const f=cf(ci), s=cs(ci), ox=30, oy=100, W=240, range=hi-lo||1;
  const xOf=v=>ox+(v-lo)/range*W;
  let body = glowDef('gNL') +
    `<line x1="${ox}" y1="${oy}" x2="${ox+W}" y2="${oy}" stroke="${s}" stroke-width="3"/>
    <polygon points="${ox+W+2},${oy} ${ox+W-9},${oy-5} ${ox+W-9},${oy+5}" fill="${s}"/>
    <polygon points="${ox-2},${oy} ${ox+9},${oy-5} ${ox+9},${oy+5}" fill="${s}"/>`;
  for(let v=lo;v<=hi;v++){
    const x=xOf(v), major=(v%5===0||range<=10);
    body+=`<line x1="${x}" y1="${oy-(major?11:6)}" x2="${x}" y2="${oy+(major?11:6)}" stroke="${s}" stroke-width="${major?2:1.2}" opacity="${major?1:.6}"/>`;
    if(major||range<=12) body+=T(x, oy+22, v, 'rgba(255,255,255,.7)', 11);
  }
  if(marks) marks.forEach(m=>{
    body+=`<circle cx="${xOf(m)}" cy="${oy}" r="9" fill="#ffd32a" stroke="#fff" stroke-width="2">
      <animate attributeName="r" values="9;12;9" dur="1.4s" repeatCount="indefinite"/></circle>`;
    body+=T(xOf(m), oy-18, m, '#ffd32a', 13);
  });
  return svgWrap(300, 150, body);
}

function drawCoordPlane(px, py, size, ci) {
  const f=cf(ci), cell=22, cx=150, cy=130;
  let body = glowDef('gCP');
  for(let i=-size;i<=size;i++){
    const x=cx+i*cell, y=cy+i*cell;
    body+=`<line x1="${x}" y1="${cy-size*cell}" x2="${x}" y2="${cy+size*cell}" stroke="rgba(255,255,255,.09)" stroke-width="1"/>`;
    body+=`<line x1="${cx-size*cell}" y1="${y}" x2="${cx+size*cell}" y2="${y}" stroke="rgba(255,255,255,.09)" stroke-width="1"/>`;
    if(i!==0){body+=T(x,cy+14,i,'rgba(255,255,255,.4)',9);body+=T(cx-14,y+4,i,'rgba(255,255,255,.4)',9);}
  }
  body+=`<line x1="${cx-size*cell}" y1="${cy}" x2="${cx+size*cell}" y2="${cy}" stroke="rgba(255,255,255,.5)" stroke-width="2.5"/>`;
  body+=`<line x1="${cx}" y1="${cy-size*cell}" x2="${cx}" y2="${cy+size*cell}" stroke="rgba(255,255,255,.5)" stroke-width="2.5"/>`;
  body+=T(cx+size*cell+10, cy+4, 'X', '#7ec8ff', 11, 'start');
  body+=T(cx, cy-size*cell-5, 'Y', '#7ec8ff', 11);
  const dotX=cx+px*cell, dotY=cy-py*cell;
  body+=`<circle cx="${dotX}" cy="${dotY}" r="9" fill="#ffd32a" stroke="#fff" stroke-width="2.5">
    <animate attributeName="r" values="9;12;9" dur="1.4s" repeatCount="indefinite"/></circle>`;
  body+=T(dotX+(px>=0?14:-14), dotY-9, `(${px},${py})`, '#ffd32a', 11, px>=0?'start':'end');
  return svgWrap(300, 280, body);
}

function drawRuler(maxCm, ci) {
  const f=cf(ci), ox=20, oy=72, W=260, H=48;
  let body = glowDef('gRu') +
    `<rect x="${ox}" y="${oy}" width="${W}" height="${H}" fill="${f}44" stroke="#ffd32a" stroke-width="2.5" rx="6"/>`;
  const ticks=Math.min(maxCm,26);
  for(let i=0;i<=ticks;i++){
    const x=ox+i*(W/ticks), major=i%5===0;
    body+=`<line x1="${x}" y1="${oy}" x2="${x}" y2="${oy+(major?H*.55:H*.35)}" stroke="#ffd32a" stroke-width="${major?2:1}" opacity="${major?1:.7}"/>`;
    if(major) body+=T(x, oy+H+16, i, '#ffd32a', 11);
  }
  return svgWrap(300, 165, body);
}

function drawClock(hours, minutes, ci) {
  const f=cf(ci), s=cs(ci), cx=150, cy=120, r=90;
  let body = glowDef('gCl') +
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}22" stroke="${s}" stroke-width="3"/>
    <circle cx="${cx}" cy="${cy}" r="5" fill="#ffd32a"/>`;
  for(let h=1;h<=12;h++){const a=(h*30-90)*Math.PI/180; body+=T(cx+76*Math.cos(a), cy+76*Math.sin(a)+4, h, '#ffffffcc', 11);}
  const ha=((hours%12+minutes/60)*30-90)*Math.PI/180;
  const ma=(minutes*6-90)*Math.PI/180;
  body+=`<line x1="${cx}" y1="${cy}" x2="${(cx+60*Math.cos(ha)).toFixed(1)}" y2="${(cy+60*Math.sin(ha)).toFixed(1)}" stroke="#fff" stroke-width="5.5" stroke-linecap="round"/>`;
  body+=`<line x1="${cx}" y1="${cy}" x2="${(cx+78*Math.cos(ma)).toFixed(1)}" y2="${(cy+78*Math.sin(ma)).toFixed(1)}" stroke="#ffd32a" stroke-width="3" stroke-linecap="round"/>`;
  return svgWrap(300, 245, body);
}

function drawScales(left, right, ci) {
  const f=cf(ci), s=cs(ci), tilt=(left>right?12:left<right?-12:0);
  const c=(90+tilt)*Math.PI/180, d=(90-tilt)*Math.PI/180;
  const lx=(150+Math.cos(c)*110).toFixed(0), ly=(120+Math.sin(c)*110).toFixed(0);
  const rx=(150+Math.cos(d)*110).toFixed(0), ry=(120+Math.sin(d)*110).toFixed(0);
  const body = glowDef('gSc') +
    `<line x1="150" y1="30" x2="150" y2="118" stroke="${s}" stroke-width="4"/>
    <polygon points="150,30 140,46 160,46" fill="#ffd32a"/>
    <line x1="${lx}" y1="${ly}" x2="${rx}" y2="${ry}" stroke="${s}" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="${lx}" cy="${ly}" r="32" fill="${f}44" stroke="${s}" stroke-width="2.5"/>
    <circle cx="${rx}" cy="${ry}" r="32" fill="${f}44" stroke="${s}" stroke-width="2.5"/>` +
    T(lx, (+ly+6)+'', left, '#fff', 13) +
    T(rx, (+ry+6)+'', right, '#fff', 13);
  return svgWrap(300, 245, body);
}

function drawBeaker(ml, maxMl, ci) {
  const f=cf(ci), s=cs(ci), ox=105, oy=30, W=90, H=160;
  const fh=Math.min((ml/maxMl)*H, H);
  const body = glowDef('gBk') +
    `<rect x="${ox}" y="${oy}" width="${W}" height="${H}" fill="rgba(255,255,255,.07)" stroke="${s}" stroke-width="3" rx="6"/>
    <rect x="${ox+2}" y="${oy+H-fh+2}" width="${W-4}" height="${fh-2}" fill="${f}77" rx="4">
      <animate attributeName="height" from="0" to="${fh-2}" dur=".6s" fill="freeze"/>
    </rect>` +
    dimLine(ox+W+12, oy+H, ox+W+12, oy+H-fh, ml+' מ"ל', s, 0) +
    T(ox+W/2, oy+H+20, 'מ"ל', 'rgba(255,255,255,.5)', 12);
  return svgWrap(300, 225, body);
}

function drawFracBar(n, d, ci) {
  const f=cf(ci), s=cs(ci), ox=30, oy=78, W=240, H=52;
  const cw=W/d;
  let body = glowDef('gFB');
  for(let i=0;i<d;i++){
    body+=`<rect x="${ox+i*cw+1}" y="${oy}" width="${cw-2}" height="${H}" fill="${i<n ? f+'88' : 'rgba(255,255,255,.07)'}" stroke="${s}" stroke-width="1.8" rx="3"/>`;
    if(i<n) body+=T(ox+i*cw+cw/2, oy+H/2+5, '✓', '#fff', 16);
  }
  body+=T(150, oy+H+22, `${n}/${d}`, '#ffd32a', 18);
  return svgWrap(300, 200, body);
}

function drawPie(n, d, ci) {
  const cx=150, cy=115, r=88;
  let body = glowDef('gPi');
  for(let i=0;i<d;i++){
    const a1=(i/d*2*Math.PI-Math.PI/2), a2=((i+1)/d*2*Math.PI-Math.PI/2);
    const x1=(cx+r*Math.cos(a1)).toFixed(1), y1=(cy+r*Math.sin(a1)).toFixed(1);
    const x2=(cx+r*Math.cos(a2)).toFixed(1), y2=(cy+r*Math.sin(a2)).toFixed(1);
    body+=`<path d="M${cx},${cy} L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z" fill="${i<n ? cf(i) : 'rgba(255,255,255,.07)'}" stroke="#1a1040" stroke-width="2.5"/>`;
  }
  return svgWrap(300, 235, body);
}

function drawBox3D(shape, ci) {
  const f=cf(ci), s=cs(ci);
  let body = glowDef('g3D');
  if(shape==='cube'){
    const sd=120,d=35,ox=70,oy=52;
    body+=`<polygon points="${ox},${oy} ${ox+sd},${oy} ${ox+sd},${oy+sd} ${ox},${oy+sd}" fill="${f}55" stroke="${s}" stroke-width="2.5"/>
    <polygon points="${ox+sd},${oy} ${ox+sd+d},${oy-d} ${ox+sd+d},${oy+sd-d} ${ox+sd},${oy+sd}" fill="${f}33" stroke="${s}" stroke-width="2.5"/>
    <polygon points="${ox},${oy} ${ox+d},${oy-d} ${ox+sd+d},${oy-d} ${ox+sd},${oy}" fill="${f}44" stroke="${s}" stroke-width="2.5"/>`;
  } else if(shape==='cylinder'){
    body+=`<ellipse cx="150" cy="72" rx="72" ry="22" fill="${f}55" stroke="${s}" stroke-width="2.5"/>
    <rect x="78" y="72" width="144" height="108" fill="${f}44" stroke="${s}" stroke-width="2.5"/>
    <ellipse cx="150" cy="180" rx="72" ry="22" fill="${f}33" stroke="${s}" stroke-width="2.5"/>`;
  } else if(shape==='cone'){
    body+=`<polygon points="150,28 62,196 238,196" fill="${f}55" stroke="${s}" stroke-width="2.5"/>
    <ellipse cx="150" cy="196" rx="88" ry="20" fill="${f}33" stroke="${s}" stroke-width="2.5"/>`;
  } else if(shape==='sphere'){
    body+=`<circle cx="150" cy="118" r="90" fill="${f}44" stroke="${s}" stroke-width="2.5"/>
    <ellipse cx="150" cy="118" rx="90" ry="30" fill="none" stroke="${s}" stroke-width="1.5" stroke-dasharray="5,3" opacity=".6"/>`;
  } else if(shape==='pyramid'){
    body+=`<polygon points="150,28 55,196 245,196" fill="${f}55" stroke="${s}" stroke-width="2.5"/>
    <line x1="150" y1="28" x2="185" y2="165" stroke="${s}" stroke-width="1.8" stroke-dasharray="5,3" opacity=".6"/>`;
  } else { // prism
    body+=`<polygon points="68,188 68,80 150,32 232,80 232,188" fill="${f}44" stroke="${s}" stroke-width="2.5"/>
    <line x1="150" y1="32" x2="150" y2="188" stroke="${s}" stroke-width="1.8" stroke-dasharray="4,3" opacity=".55"/>`;
  }
  return svgWrap(300, 235, body);
}

// ──────────────────────────────────────────────────────────
// QUESTION FACTORY HELPER
// ──────────────────────────────────────────────────────────
function ptsFor(diff){
  const gc=window.GRADE_CONFIG;
  return gc?.pts?.[diff]||(diff==='easy'?5:diff==='medium'?10:18);
}
function Q(cat, diff, text, answer, visual, hint, label){
  return {type:'num',cat,diff,
    label:label||'📐 גיאומטריה',gameLabel:'',
    text,answer,pts:ptsFor(diff),
    shapeHtml:visual,
    hint:{type:'text',msg:hint},showMul:false,dir:'rtl'};
}

// ══════════════════════════════════════════════════════════
//  GRADE א  —  כיתה א
//  Topics: shape recognition, sides/corners, even/odd, number line
// ══════════════════════════════════════════════════════════
function g1_shapes(diff){
  const ci=rnd(0,9);
  const pools={
    easy:[
      ()=>Q('shapes',diff,'כמה צלעות יש למשולש?',3,drawTriangle(5,4,3,ci,0,false),'💡 ספור את 3 הקווים!','🔺 צורות'),
      ()=>Q('shapes',diff,'כמה פינות יש למשולש?',3,drawTriangle(5,4,3,ci,0,false),'💡 3 צלעות = 3 פינות!','🔺 צורות'),
      ()=>Q('shapes',diff,'כמה צלעות יש לריבוע?',4,drawSquare(5,ci,''),'💡 4 צלעות שוות!','🟦 צורות'),
      ()=>Q('shapes',diff,'כמה פינות יש לריבוע?',4,drawSquare(5,ci,''),'💡 4 פינות ישרות!','🟦 צורות'),
      ()=>Q('shapes',diff,'כמה צלעות יש למלבן?',4,drawRect(7,4,ci,''),'💡 2 ארוכות + 2 קצרות = 4!','📐 צורות'),
      ()=>Q('shapes',diff,'לעיגול יש כמה צלעות?',0,drawCircle(5,ci,null),'💡 לעיגול אין צלעות — הוא עגול!','⭕ צורות'),
      ()=>{const n=rnd(1,9);return Q('shapes',diff,`האם ${n*2} זוגי? (כן=1 לא=0)`,1,drawNumberLine(n*2,0,20,ci,[n*2]),'💡 זוגי = מתחלק ב-2!','🔢 זוגי')},
      ()=>{const n=rnd(0,8);return Q('shapes',diff,`האם ${n*2+1} זוגי? (כן=1 לא=0)`,0,drawNumberLine(n*2+1,0,20,ci,[n*2+1]),'💡 אי-זוגי!','🔢 זוגי')},
    ],
    medium:[
      ()=>Q('shapes',diff,'כמה צלעות יש למחומש?',5,drawRegularPoly(5,ci,'מחומש'),'💡 חמש = 5 צלעות!','⭐ צורות'),
      ()=>Q('shapes',diff,'כמה צלעות יש למשושה?',6,drawRegularPoly(6,ci,'משושה'),'💡 שש = 6 צלעות!','🔷 צורות'),
      ()=>{const v=rnd(11,29);return Q('shapes',diff,`כמה עשרות יש ב-${v}?`,Math.floor(v/10),drawNumberLine(v,0,30,ci,[v]),`💡 ${v}=${Math.floor(v/10)} עשרות+${v%10}`,'🔢 ספרות')},
      ()=>{const v=rnd(11,29);return Q('shapes',diff,`כמה יחידות יש ב-${v}?`,v%10,drawNumberLine(v,0,30,ci,[v]),`💡 ${v}=${Math.floor(v/10)} עשרות+${v%10}`,'🔢 ספרות')},
      ()=>{const a=rnd(2,5);return Q('shapes',diff,`🔺 + 🔺 = ${a*2}. כמה שווה 🔺?`,a,drawNumberLine(a*2,0,12,ci,[a]),`💡 ${a*2}÷2=${a}!`,'❓ אתגר')},
      ()=>{const a=rnd(2,5);return Q('shapes',diff,`⬜ + ⬜ = ${a*2}. כמה שווה ⬜?`,a,drawNumberLine(a*2,0,12,ci,[a]),`💡 ${a*2}÷2=${a}!`,'❓ אתגר')},
      ()=>{const v=rnd(10,50);return Q('shapes',diff,`המספר שאחרי ${v} הוא?`,v+1,drawNumberLine(v,v-2,v+4,ci,[v+1]),`💡 ${v}+1=${v+1}!`,'🔢 סרגל')},
      ()=>{const v=rnd(5,49);return Q('shapes',diff,`המספר שלפני ${v} הוא?`,v-1,drawNumberLine(v,v-3,v+2,ci,[v-1]),`💡 ${v}-1=${v-1}!`,'🔢 סרגל')},
    ],
    hard:[
      ()=>{const a=rnd(3,6),b=rnd(1,3);return Q('shapes',diff,`🔺 + ${b} = ${a+b}. כמה שווה 🔺?`,a,drawNumberLine(a+b,0,12,ci,[a]),`💡 ${a+b}-${b}=${a}!`,'❓ אתגר')},
      ()=>{const a=rnd(3,8);return Q('shapes',diff,`⬜ - 2 = ${a}. כמה שווה ⬜?`,a+2,drawNumberLine(a+2,0,14,ci,[a,a+2]),`💡 ${a}+2=${a+2}!`,'❓ אתגר')},
      ()=>{const a=rnd(2,4);return Q('shapes',diff,`🔵+🔵+🔵=${a*3}. כמה שווה 🔵?`,a,drawNumberLine(a*3,0,Math.max(a*3+2,12),ci,[a]),`💡 ${a*3}÷3=${a}!`,'❓ אתגר')},
      ()=>{const t=rnd(20,50),s=rnd(10,t-10);return Q('shapes',diff,`${t}+?=${t+s}. מה החסר?`,s,drawNumberLine(s,0,Math.ceil((t+s)/10)*10,ci,[s]),`💡 ${t+s}-${t}=${s}!`,'➕ חיבור')},
      ()=>Q('shapes',diff,'כמה פינות ישרות לריבוע?',4,drawSquare(5,ci,''),'💡 כל 4 פינות הריבוע הן ישרות!','🟦 זוויות'),
      ()=>Q('shapes',diff,'כמה פינות יש למחומש?',5,drawRegularPoly(5,ci,'מחומש'),'💡 מחומש = 5 פינות!','⭐ צורות'),
      ()=>{const n=rnd(30,90);return Q('shapes',diff,`כמה עשרות יש ב-${n}?`,Math.floor(n/10),drawNumberLine(n,0,100,ci,[n]),`💡 ${n}=${Math.floor(n/10)} עשרות!`,'🔢 ספרות')},
    ],
  };
  return pick(pools[diff])();
}

// ══════════════════════════════════════════════════════════
//  GRADE ב  —  כיתה ב
//  Topics: perimeter by counting/adding, area intro (grid), ½ & ¼, shape unknowns
// ══════════════════════════════════════════════════════════
function g2_shapes(diff){
  const ci=rnd(0,9);
  const pools={
    easy:[
      ()=>Q('shapes',diff,'כמה צלעות יש למשולש?',3,drawTriangle(5,4,3,ci,0,false),'💡 3 קווים!','🔺 צורות'),
      ()=>Q('shapes',diff,'כמה צלעות יש לריבוע?',4,drawSquare(4,ci,''),'💡 4 צלעות שוות!','🟦 צורות'),
      ()=>Q('shapes',diff,'כמה פינות יש למלבן?',4,drawRect(6,3,ci,''),'💡 4 פינות ישרות!','📐 צורות'),
      ()=>Q('shapes',diff,'כמה צלעות יש למחומש?',5,drawRegularPoly(5,ci,''),'💡 חמש = 5!','⭐ צורות'),
      ()=>Q('shapes',diff,'לעיגול יש כמה פינות?',0,drawCircle(4,ci,null),'💡 לעיגול אין פינות!','⭕ צורות'),
      ()=>Q('shapes',diff,'כמה צלעות יש למשושה?',6,drawRegularPoly(6,ci,''),'💡 שש = 6!','🔷 צורות'),
      ()=>Q('shapes',diff,'🍕 חולקה ל-2 חלקים שווים. מה שם כל חלק? (חצי=2 רבע=4)',2,drawPie(1,2,ci),'💡 2 חלקים שווים = חצי!','🍕 שברים'),
      ()=>Q('shapes',diff,'🍕 חולקה ל-4 חלקים שווים. מה שם כל חלק? (חצי=2 רבע=4)',4,drawPie(1,4,ci),'💡 4 חלקים שווים = רבע!','🍕 שברים'),
    ],
    medium:[
      ()=>{const s=rnd(3,8);return Q('shapes',diff,`ריבוע שכל צלע ${s} ס"מ. היקף=?`,4*s,drawSquare(s,ci,''),`💡 4×${s}=${4*s} ס"מ`,'📏 היקף')},
      ()=>{const w=rnd(4,9),h=rnd(2,w-1);return Q('shapes',diff,`מלבן ${w}×${h} ס"מ. היקף=?`,2*(w+h),drawRect(w,h,ci,''),`💡 ${w}+${h}+${w}+${h}=${2*(w+h)} ס"מ`,'📏 היקף')},
      ()=>{const s=rnd(2,7);return Q('shapes',diff,`משולש שווה-צלעות, צלע=${s} ס"מ. היקף=?`,3*s,drawTriangle(s,s,s,ci,0,false),`💡 ${s}×3=${3*s} ס"מ`,'📏 היקף')},
      ()=>{const a=rnd(3,7),b=rnd(1,a-1);return Q('shapes',diff,`⬜+${b}=${a+b}. כמה שווה ⬜?`,a,drawNumberLine(a+b,0,14,ci,[a]),`💡 ${a+b}-${b}=${a}!`,'❓ אתגר')},
      ()=>{const a=rnd(4,9);return Q('shapes',diff,`⬜-3=${a}. כמה שווה ⬜?`,a+3,drawNumberLine(a+3,0,16,ci,[a,a+3]),`💡 ${a}+3=${a+3}!`,'❓ אתגר')},
      ()=>{const a=rnd(2,5);return Q('shapes',diff,`🔺+🔺=${a*2}. כמה שווה 🔺?`,a,drawNumberLine(a*2,0,12,ci,[a]),`💡 ${a*2}÷2=${a}!`,'❓ אתגר')},
    ],
    hard:[
      ()=>{const c=rnd(3,7),r=rnd(2,5);return Q('shapes',diff,`ספור ריבועים בגריד ${c}×${r}. שטח=?`,c*r,drawGrid(c,r,ci),`💡 ${c}×${r}=${c*r} ס"מ²`,'📐 שטח')},
      ()=>{const s=rnd(2,7);return Q('shapes',diff,`ריבוע צלע=${s} ס"מ. כמה ריבועי ס"מ בשטחו?`,s*s,drawGrid(Math.min(s,8),Math.min(s,8),ci),`💡 ${s}×${s}=${s*s} ס"מ²`,'📐 שטח')},
      ()=>{const n=rnd(2,5),sides=pick([3,4,5,6]);const names={3:'משולש',4:'ריבוע',5:'מחומש',6:'משושה'};return Q('shapes',diff,`ל${names[sides]} יש ${sides} צלעות. ל-${n} כאלה?`,n*sides,drawRegularPoly(sides,ci,''),`💡 ${sides}×${n}=${n*sides}!`,'✖️ כפל')},
      ()=>{const w=rnd(3,8),h=rnd(2,5);return Q('shapes',diff,`מלבן ${w}×${h} — כמה ריבועים בשטחו?`,w*h,drawGrid(Math.min(w,9),Math.min(h,7),ci),`💡 ${w}×${h}=${w*h} ס"מ²`,'📐 שטח')},
    ],
  };
  return pick(pools[diff])();
}

// ══════════════════════════════════════════════════════════
//  GRADE ג  —  כיתה ג
//  Topics: angle types, area formulas (rect/square), triangle types,
//          unit fractions of quantity, perimeter all shapes
// ══════════════════════════════════════════════════════════
function g3_shapes(diff){
  const ci=rnd(0,9);
  const pools={
    easy:[
      ()=>Q('shapes',diff,'כמה מעלות בזווית ישרה?',90,drawAngle(90,ci,true),'💡 זווית ישרה = 90°!','📐 זוויות'),
      ()=>Q('shapes',diff,'זווית < 90° נקראת: (חדה=1 ישרה=2 קהה=3)',1,drawAngle(45,ci,true),'💡 חדה < 90°!','📐 זוויות'),
      ()=>Q('shapes',diff,'זווית > 90° נקראת: (חדה=1 ישרה=2 קהה=3)',3,drawAngle(120,ci,true),'💡 קהה > 90°!','📐 זוויות'),
      ()=>Q('shapes',diff,'כמה זוויות ישרות בריבוע?',4,drawSquare(5,ci,''),'💡 4 פינות = 4 זוויות ישרות!','🟦 זוויות'),
      ()=>{const n=rnd(2,6);return Q('shapes',diff,`שליש מ-${n*3} = ?`,n,drawFracBar(1,3,ci),`💡 ${n*3}÷3=${n}!`,'🍕 שברים')},
      ()=>{const n=rnd(2,7);return Q('shapes',diff,`חצי מ-${n*2} = ?`,n,drawFracBar(1,2,ci),`💡 ${n*2}÷2=${n}!`,'🍕 שברים')},
      ()=>{const n=rnd(2,5);return Q('shapes',diff,`רבע מ-${n*4} = ?`,n,drawFracBar(1,4,ci),`💡 ${n*4}÷4=${n}!`,'🍕 שברים')},
      ()=>{const c=rnd(2,5),r=rnd(2,4);return Q('shapes',diff,`ספור ריבועים בגריד: ${c}×${r}=?`,c*r,drawGrid(c,r,ci),`💡 שורות×עמודות=${c*r}!`,'📐 שטח')},
    ],
    medium:[
      ()=>{const s=rnd(3,10);return Q('shapes',diff,`היקף ריבוע (צלע ${s} ס"מ)?`,4*s,drawSquare(s,ci,''),`💡 4×${s}=${4*s} ס"מ`,'📏 היקף')},
      ()=>{const w=rnd(4,12),h=rnd(2,w-1);return Q('shapes',diff,`היקף מלבן ${w}×${h}?`,2*(w+h),drawRect(w,h,ci,''),`💡 2×(${w}+${h})=${2*(w+h)} ס"מ`,'📏 היקף')},
      ()=>{const a=rnd(3,8),b=rnd(2,7),c=rnd(2,6);return Q('shapes',diff,`היקף משולש: ${a},${b},${c} ס"מ?`,a+b+c,drawTriangle(a,b,c,ci,0,true),`💡 ${a}+${b}+${c}=${a+b+c} ס"מ`,'📏 היקף')},
      ()=>{const s=rnd(3,9);return Q('shapes',diff,`שטח ריבוע (צלע ${s} ס"מ)?`,s*s,drawSquare(s,ci,'שטח=?'),`💡 ${s}²=${s*s} ס"מ²`,'📐 שטח')},
      ()=>{const w=rnd(3,10),h=rnd(2,w-1);return Q('shapes',diff,`שטח מלבן ${w}×${h}?`,w*h,drawRect(w,h,ci,'שטח=?'),`💡 ${w}×${h}=${w*h} ס"מ²`,'📐 שטח')},
      ()=>{const c=rnd(3,7),r=rnd(2,5);return Q('shapes',diff,`שטח גריד ${c}×${r}?`,c*r,drawGrid(c,r,ci),`💡 ${c}×${r}=${c*r} ס"מ²`,'📐 שטח')},
      ()=>{const deg=pick([45,60,30,120,135]);return Q('shapes',diff,`זווית ${deg}° — חדה(1) ישרה(2) קהה(3)?`,deg<90?1:deg===90?2:3,drawAngle(deg,ci,true),`💡 ${deg<90?'חדה <90°':deg===90?'ישרה =90°':'קהה >90°'}!`,'📐 זוויות')},
    ],
    hard:[
      ()=>{const base=rnd(4,12),h=rnd(3,10);const ans=(base*h)/2;if(!Number.isInteger(ans))return g3_shapes(diff);return Q('shapes',diff,`שטח משולש: בסיס ${base}, גובה ${h}?`,ans,drawTriangle(base,h,0,ci,h,true),`💡 (${base}×${h})÷2=${ans} ס"מ²`,'📐 שטח')},
      ()=>{const w=rnd(4,12),h=rnd(2,w);return Q('shapes',diff,`מלבן ${w}×${h}: היקף+שטח=?`,2*(w+h)+w*h,drawRect(w,h,ci,''),`💡 היקף=${2*(w+h)}, שטח=${w*h}, סכום=${2*(w+h)+w*h}`,'📐 שטח+היקף')},
      ()=>{const s=rnd(3,9);return Q('shapes',diff,`ריבוע היקף=${4*s} ס"מ. מה שטחו?`,s*s,drawSquare(s,ci,''),`💡 צלע=${s}, שטח=${s*s} ס"מ²`,'📐 שטח')},
      ()=>{const n=rnd(1,3),d=pick([3,4,6,8]);return Q('shapes',diff,`${n}/${d} מ-${n*d*2}=?`,(n*d*2/d)*n,drawFracBar(n,d,ci),`💡 ${n*d*2}÷${d}×${n}=${(n*d*2/d)*n}`,'🍕 שברים')},
      ()=>{const a=pick([30,45,60]),b=pick([20,30,40,60]);if(a+b>=180)return g3_shapes(diff);return Q('shapes',diff,`סכום זוויות ${a}° ו-${b}°?`,a+b,drawAngle(Math.min(a+b,175),ci,true),`💡 ${a}+${b}=${a+b}°`,'📐 זוויות')},
      ()=>{const s=pick([3,4,5,6]);return Q('shapes',diff,`סכום כל הזוויות בריבוע?`,360,drawSquare(s,ci,'360°?'),'💡 4×90°=360°!','📐 זוויות')},
    ],
  };
  return pick(pools[diff])();
}

// ══════════════════════════════════════════════════════════
//  GRADE ד  —  כיתה ד
//  Topics: area rect/square/parallelogram/triangle/trapezoid,
//          angle sums in polygons, symmetry, parallel/perpendicular
// ══════════════════════════════════════════════════════════
function g4_shapes(diff){
  const ci=rnd(0,9);
  const pools={
    easy:[
      ()=>{const s=rnd(3,10);return Q('shapes',diff,`שטח ריבוע (צלע ${s} ס"מ)?`,s*s,drawSquare(s,ci,'שטח=?'),`💡 ${s}²=${s*s} ס"מ²`,'📐 שטח')},
      ()=>{const w=rnd(4,14),h=rnd(2,w-1);return Q('shapes',diff,`שטח מלבן ${w}×${h}?`,w*h,drawRect(w,h,ci,'שטח=?'),`💡 ${w}×${h}=${w*h} ס"מ²`,'📐 שטח')},
      ()=>{const b=rnd(4,12),h=rnd(3,10);return Q('shapes',diff,`שטח מקבילית: בסיס ${b}, גובה ${h}?`,b*h,drawParallelogram(b,h,ci),`💡 בסיס×גובה=${b*h} ס"מ²`,'📐 שטח')},
      ()=>Q('shapes',diff,'כמה צירי סימטריה לריבוע?',4,drawSymmetry('square',4,ci),'💡 ריבוע: 4 צירים!','🔁 סימטריה'),
      ()=>Q('shapes',diff,'כמה צירי סימטריה למלבן?',2,drawSymmetry('rect',2,ci),'💡 מלבן: 2 צירים!','🔁 סימטריה'),
      ()=>Q('shapes',diff,'כמה צירי סימטריה למשולש שווה-צלעות?',3,drawSymmetry('triangle',3,ci),'💡 3 צירים!','🔁 סימטריה'),
      ()=>{const deg=pick([45,60,30,120,135,150]);return Q('shapes',diff,`זווית ${deg}°: חדה(1) ישרה(2) קהה(3)?`,deg<90?1:deg===90?2:3,drawAngle(deg,ci,true),`💡 ${deg<90?'חדה':deg===90?'ישרה':'קהה'}!`,'📐 זוויות')},
    ],
    medium:[
      ()=>{const base=rnd(4,14),h=rnd(3,12);const ans=(base*h)/2;if(!Number.isInteger(ans))return g4_shapes(diff);return Q('shapes',diff,`שטח משולש: בסיס ${base}, גובה ${h}?`,ans,drawTriangle(base,h,0,ci,h,true),`💡 (${base}×${h})÷2=${ans} ס"מ²`,'📐 שטח')},
      ()=>{const b1=rnd(5,12),b2=rnd(2,b1-2),h=rnd(3,9);if((b1+b2)*h%2!==0)return g4_shapes(diff);const ans=(b1+b2)*h/2;return Q('shapes',diff,`שטח טרפז: בסיסים ${b1},${b2} גובה ${h}?`,ans,drawTrapezoid(b1,b2,h,ci),`💡 (${b1}+${b2})×${h}÷2=${ans} ס"מ²`,'📐 שטח')},
      ()=>{const a=rnd(40,80),b=rnd(20,70);if(a+b>=180)return g4_shapes(diff);return Q('shapes',diff,`במשולש: ${a}° ו-${b}°. הזווית השלישית?`,180-a-b,drawTriangle(8,6,5,ci,0,false),`💡 180-(${a}+${b})=${180-a-b}°`,'📐 זוויות')},
      ()=>Q('shapes',diff,'כמה צירי סימטריה למשושה שווה-צלעות?',6,drawSymmetry('hexagon',6,ci),'💡 משושה: 6 צירים!','🔁 סימטריה'),
      ()=>Q('shapes',diff,'כמה צירי סימטריה למחומש שווה-צלעות?',5,drawSymmetry('pentagon',5,ci),'💡 מחומש: 5 צירים!','🔁 סימטריה'),
      ()=>{const s=rnd(3,12);return Q('shapes',diff,`היקף ריבוע=${4*s}. מה שטחו?`,s*s,drawSquare(s,ci,'שטח=?'),`💡 צלע=${s}, שטח=${s*s} ס"מ²`,'📐 שטח')},
    ],
    hard:[
      ()=>{const W=rnd(5,10),H=rnd(4,W),w=rnd(2,W-2),h=rnd(2,H-2);return Q('shapes',diff,`שטח צורת L: ${W}×${H} פחות ${w}×${h}?`,W*H-w*h,drawLShape(W,H,w,h,ci),`💡 ${W*H}-${w*h}=${W*H-w*h} ס"מ²`,'📐 שטח')},
      ()=>{const n=rnd(4,6);const total=(n-2)*180;return Q('shapes',diff,`סכום זוויות פנימיות ${n}–צלע?`,total,drawRegularPoly(n,ci,''),`💡 (${n}-2)×180°=${total}°`,'📐 זוויות')},
      ()=>Q('shapes',diff,'לעיגול כמה צירי סימטריה? (אינסוף=99)',99,drawSymmetry('circle',999,ci),'💡 עיגול — אינסוף צירים! כתוב 99','🔁 סימטריה'),
      ()=>{const b1=rnd(6,14),b2=rnd(3,b1-2),h=rnd(4,10);if((b1+b2)*h%2!==0)return g4_shapes(diff);const ans=(b1+b2)*h/2;return Q('shapes',diff,`שטח טרפז (${b1}+${b2})×${h}÷2?`,ans,drawTrapezoid(b1,b2,h,ci),`💡 ${b1+b2}×${h}÷2=${ans} ס"מ²`,'📐 שטח')},
      ()=>{const a=rnd(40,80),b=rnd(20,60),c=rnd(20,50);if(a+b+c!==180)return g4_shapes(diff);return Q('shapes',diff,`זוויות משולש: ${a}°,${b}°,${c}°. האם הסכום נכון? (כן=1 לא=0)`,1,drawTriangle(8,6,5,ci,0,false),`💡 ${a}+${b}+${c}=180°!`,'📐 זוויות')},
    ],
  };
  return pick(pools[diff])();
}

// ══════════════════════════════════════════════════════════
//  GRADE ה  —  כיתה ה
//  Topics: triangle area, trapezoid, volume box/cube, circle (π),
//          coordinate plane, L-shape, surface area
// ══════════════════════════════════════════════════════════
function g5_shapes(diff){
  const ci=rnd(0,9);
  const pools={
    easy:[
      ()=>{const base=rnd(4,14),h=rnd(3,12);const ans=(base*h)/2;if(!Number.isInteger(ans))return g5_shapes(diff);return Q('shapes',diff,`שטח משולש: בסיס ${base}, גובה ${h}?`,ans,drawTriangle(base,h,0,ci,h,true),`💡 (${base}×${h})÷2=${ans} ס"מ²`,'📐 שטח')},
      ()=>{const s=rnd(2,7);return Q('shapes',diff,`נפח קוביה (צלע ${s} ס"מ)?`,s*s*s,drawBox3D('cube',ci),`💡 ${s}³=${s*s*s} ס"מ³`,'📦 נפח')},
      ()=>{const l=rnd(2,8),w=rnd(2,8),h=rnd(2,6);return Q('shapes',diff,`נפח קובייד ${l}×${w}×${h}?`,l*w*h,drawBox3D('cube',ci),`💡 ${l}×${w}×${h}=${l*w*h} ס"מ³`,'📦 נפח')},
      ()=>{const r=rnd(2,6);return Q('shapes',diff,`היקף עיגול, רדיוס ${r} ס"מ (π≈3.14)?`,Math.round(2*3.14*r),drawCircle(r,ci,'radius'),`💡 2×3.14×${r}≈${Math.round(2*3.14*r)} ס"מ`,'⭕ עיגול')},
      ()=>{const px=rnd(1,5),py=rnd(1,5);return Q('shapes',diff,`הנקודה (${px},${py}) — מה ה-X?`,px,drawCoordPlane(px,py,5,ci),`💡 X של (${px},${py}) הוא ${px}`,'🗺️ קואורדינטות')},
    ],
    medium:[
      ()=>{const r=rnd(2,7);return Q('shapes',diff,`שטח עיגול, רדיוס ${r} ס"מ (π≈3.14)?`,Math.round(3.14*r*r),drawCircle(r,ci,'radius'),`💡 3.14×${r*r}≈${Math.round(3.14*r*r)} ס"מ²`,'⭕ עיגול')},
      ()=>{const b1=rnd(5,14),b2=rnd(3,b1-1),h=rnd(3,10);if((b1+b2)*h%2!==0)return g5_shapes(diff);const ans=(b1+b2)*h/2;return Q('shapes',diff,`שטח טרפז: (${b1}+${b2})×${h}÷2?`,ans,drawTrapezoid(b1,b2,h,ci),`💡 ${b1+b2}×${h}÷2=${ans} ס"מ²`,'📐 שטח')},
      ()=>{const px=rnd(-4,4),py=rnd(-4,4);return Q('shapes',diff,`הנקודה (${px},${py}) — מה ה-Y?`,py,drawCoordPlane(px,py,5,ci),`💡 Y של (${px},${py}) הוא ${py}`,'🗺️ קואורדינטות')},
      ()=>{const W=rnd(5,10),H=rnd(4,W),w=rnd(2,W-2),h=rnd(2,H-2);return Q('shapes',diff,`שטח L: ${W}×${H} פחות ${w}×${h}?`,W*H-w*h,drawLShape(W,H,w,h,ci),`💡 ${W*H}-${w*h}=${W*H-w*h} ס"מ²`,'📐 שטח')},
      ()=>{const l=rnd(3,10),w=rnd(2,8),h=rnd(2,7);return Q('shapes',diff,`נפח ארגז ${l}×${w}×${h}?`,l*w*h,drawBox3D('cube',ci),`💡 ${l}×${w}×${h}=${l*w*h} ס"מ³`,'📦 נפח')},
      ()=>{const base=rnd(4,14),h=rnd(4,14);const ans=(base*h)/2;if(!Number.isInteger(ans))return g5_shapes(diff);return Q('shapes',diff,`שטח משולש ישר-זווית: רגליים ${base} ו-${h}?`,ans,drawRightTriangle(base,h,ci),`💡 (${base}×${h})÷2=${ans} ס"מ²`,'📐 שטח')},
    ],
    hard:[
      ()=>{const r=rnd(3,9);return Q('shapes',diff,`היקף עיגול≈${Math.round(2*3.14*r)} ס"מ. מה הרדיוס?`,r,drawCircle(r,ci,'radius'),`💡 ÷(2×3.14)≈${r} ס"מ`,'⭕ עיגול')},
      ()=>{const l=rnd(3,9),w=rnd(3,9),h=rnd(3,9);const sa=2*(l*w+l*h+w*h);return Q('shapes',diff,`שטח פנים ארגז ${l}×${w}×${h}?`,sa,drawBox3D('cube',ci),`💡 2(${l*w}+${l*h}+${w*h})=${sa} ס"מ²`,'📦 שטח פנים')},
      ()=>{const px=rnd(-4,4),py=rnd(-4,4);while(px===0||py===0){}const q=px>0&&py>0?1:px<0&&py>0?2:px<0&&py<0?3:4;return Q('shapes',diff,`(${px},${py}) — ברביע כמה? (1=ימין-מעלה 2=שמאל-מעלה 3=שמאל-מטה 4=ימין-מטה)`,q,drawCoordPlane(px,py,5,ci),`💡 רביע ${q}`,'🗺️ קואורדינטות')},
      ()=>{const r=rnd(2,7);return Q('shapes',diff,`שטח עיגול≈${Math.round(3.14*r*r)} ס"מ². מה הרדיוס?`,r,drawCircle(r,ci,'radius'),`💡 √(${Math.round(3.14*r*r)}÷3.14)≈${r}`,'⭕ עיגול')},
      ()=>{const n=rnd(4,8);return Q('shapes',diff,`סכום זוויות פנימיות ${n}–צלע?`,(n-2)*180,drawRegularPoly(n,ci,''),`💡 (${n}-2)×180°=${(n-2)*180}°`,'📐 זוויות')},
    ],
  };
  return pick(pools[diff])();
}

// ══════════════════════════════════════════════════════════
//  GRADE ו  —  כיתה ו
//  Topics: full circle (area+perimeter+radius/diameter),
//          cylinder volume, surface area box, coordinate plane operations,
//          angle calculations, ring area
// ══════════════════════════════════════════════════════════
function g6_shapes(diff){
  const ci=rnd(0,9);
  const pools={
    easy:[
      ()=>{const r=rnd(2,8);return Q('shapes',diff,`היקף עיגול: רדיוס ${r} ס"מ (π≈3.14)?`,Math.round(2*3.14*r),drawCircle(r,ci,'radius'),`💡 2×3.14×${r}≈${Math.round(2*3.14*r)} ס"מ`,'⭕ עיגול')},
      ()=>{const r=rnd(2,8);return Q('shapes',diff,`שטח עיגול: רדיוס ${r} ס"מ (π≈3.14)?`,Math.round(3.14*r*r),drawCircle(r,ci,'radius'),`💡 3.14×${r*r}≈${Math.round(3.14*r*r)} ס"מ²`,'⭕ עיגול')},
      ()=>{const r=rnd(2,8);return Q('shapes',diff,`קוטר עיגול עם רדיוס ${r} ס"מ?`,r*2,drawCircle(r,ci,'diameter'),`💡 קוטר=2×רדיוס=${r*2} ס"מ`,'⭕ עיגול')},
      ()=>{const r=rnd(2,7);const d=r*2;return Q('shapes',diff,`רדיוס עיגול עם קוטר ${d} ס"מ?`,r,drawCircle(r,ci,'diameter'),`💡 רדיוס=קוטר÷2=${r} ס"מ`,'⭕ עיגול')},
      ()=>{const px=rnd(-4,4),py=rnd(-4,4);const q=px>0&&py>0?1:px<0&&py>0?2:px<0&&py<0?3:4;return Q('shapes',diff,`(${px},${py}) — ברביע כמה? (1=ימין-מעלה)`,q,drawCoordPlane(px,py,5,ci),`💡 רביע ${q}`,'🗺️ קואורדינטות')},
    ],
    medium:[
      ()=>{const r=rnd(2,6),h=rnd(3,8);return Q('shapes',diff,`נפח גליל: r=${r}, h=${h} (π≈3.14)?`,Math.round(3.14*r*r*h),drawBox3D('cylinder',ci),`💡 π×r²×h≈${Math.round(3.14*r*r*h)} ס"מ³`,'📦 גליל')},
      ()=>{const r=rnd(3,9);return Q('shapes',diff,`היקף עיגול≈${Math.round(2*3.14*r)} ס"מ. מה הרדיוס?`,r,drawCircle(r,ci,'radius'),`💡 ÷(2π)≈${r}`,'⭕ עיגול')},
      ()=>{const l=rnd(3,9),w=rnd(3,9),h=rnd(3,9);const sa=2*(l*w+l*h+w*h);return Q('shapes',diff,`שטח פנים ארגז ${l}×${w}×${h}?`,sa,drawBox3D('cube',ci),`💡 2(${l*w}+${l*h}+${w*h})=${sa} ס"מ²`,'📦 שטח פנים')},
      ()=>{const px=rnd(-5,5),py=rnd(-5,5);return Q('shapes',diff,`מרחק מנהטן של (${px},${py}) מהראשית? (|x|+|y|)`,Math.abs(px)+Math.abs(py),drawCoordPlane(px,py,5,ci),`💡 |${px}|+|${py}|=${Math.abs(px)+Math.abs(py)}`,'🗺️ קואורדינטות')},
      ()=>{const b1=rnd(6,16),b2=rnd(3,b1-2),h=rnd(4,12);if((b1+b2)*h%2!==0)return g6_shapes(diff);const ans=(b1+b2)*h/2;return Q('shapes',diff,`שטח טרפז: (${b1}+${b2})×${h}÷2?`,ans,drawTrapezoid(b1,b2,h,ci),`💡 ${b1+b2}×${h}÷2=${ans} ס"מ²`,'📐 שטח')},
      ()=>{const W=rnd(5,10),H=rnd(4,W),w=rnd(2,W-2),h=rnd(2,H-2);return Q('shapes',diff,`שטח L: ${W}×${H} פחות ${w}×${h}?`,W*H-w*h,drawLShape(W,H,w,h,ci),`💡 ${W*H}-${w*h}=${W*H-w*h} ס"מ²`,'📐 שטח')},
    ],
    hard:[
      ()=>{const r1=rnd(4,9),r2=rnd(1,r1-2);const ans=Math.round(3.14*(r1*r1-r2*r2));return Q('shapes',diff,`שטח טבעת: R=${r1}, r=${r2} (π≈3.14)?`,ans,drawCircle(r1,ci,'radius'),`💡 π(${r1}²-${r2}²)=3.14×${r1*r1-r2*r2}≈${ans} ס"מ²`,'⭕ טבעת')},
      ()=>{const r=rnd(2,6),h=rnd(3,10);const vol=Math.round(3.14*r*r*h);return Q('shapes',diff,`נפח גליל: r=${r}, h=${h}?`,vol,drawBox3D('cylinder',ci),`💡 π×${r}²×${h}≈${vol} ס"מ³`,'📦 גליל')},
      ()=>{const n=rnd(4,9);return Q('shapes',diff,`סכום זוויות פנימיות ${n}–צלע?`,(n-2)*180,drawRegularPoly(n,ci,''),`💡 (${n}-2)×180=${(n-2)*180}°`,'📐 זוויות')},
      ()=>{const r=rnd(3,8);const area=Math.round(3.14*r*r);return Q('shapes',diff,`שטח עיגול≈${area} ס"מ². מה הרדיוס?`,r,drawCircle(r,ci,'radius'),`💡 √(${area}÷3.14)≈${r}`,'⭕ עיגול')},
      ()=>{const px1=rnd(-4,-1),py1=rnd(1,4),px2=rnd(1,4),py2=rnd(-4,-1);const dx=Math.abs(px2-px1),dy=Math.abs(py2-py1);return Q('shapes',diff,`מרחק מנהטן בין (${px1},${py1}) ל-(${px2},${py2})?`,dx+dy,drawCoordPlane(px2,py2,5,ci),`💡 ${dx}+${dy}=${dx+dy}`,'🗺️ קואורדינטות')},
    ],
  };
  return pick(pools[diff])();
}

// ══════════════════════════════════════════════════════════
//  MEASUREMENT GENERATORS (all grades)
// ══════════════════════════════════════════════════════════
function g1_measurement(diff){
  const ci=rnd(0,9);
  const pools={
    easy:[
      ()=>Q('measurement',diff,'מה ארוך יותר: עיפרון 10 ס"מ או סרגל 15 ס"מ? (עיפרון=1 סרגל=2)',2,drawRuler(15,ci),'💡 15>10, הסרגל ארוך יותר!','📏 מדידה'),
      ()=>Q('measurement',diff,'שעה = כמה דקות?',60,drawClock(3,0,ci),'💡 1 שעה = 60 דקות!','⏰ זמן'),
      ()=>Q('measurement',diff,'דקה = כמה שניות?',60,drawClock(12,1,ci),'💡 1 דקה = 60 שניות!','⏰ זמן'),
    ],
    medium:[
      ()=>{const cm=rnd(5,20);return Q('measurement',diff,`${cm} ס"מ = כמה מ"מ?`,cm*10,drawRuler(cm,ci),`💡 1 ס"מ=10 מ"מ. ${cm}×10=${cm*10}!`,'📏 מדידה')},
      ()=>Q('measurement',diff,'יום = כמה שעות?',24,drawClock(12,0,ci),'💡 1 יום = 24 שעות!','📅 זמן'),
      ()=>Q('measurement',diff,'שבוע = כמה ימים?',7,drawRuler(7,ci),'💡 1 שבוע = 7 ימים!','📅 זמן'),
    ],
    hard:[
      ()=>{const h=rnd(1,4),m=pick([0,15,30,45]);return Q('measurement',diff,`${h}:${String(m).padStart(2,'0')} — כמה דקות אחרי חצות?`,h*60+m,drawClock(h,m,ci),`💡 ${h}×60+${m}=${h*60+m} דקות`,'⏰ זמן')},
      ()=>Q('measurement',diff,'שנה = כמה חודשים?',12,drawClock(12,0,ci),'💡 1 שנה = 12 חודשים!','📅 זמן'),
    ],
  };
  return pick(pools[diff])();
}

function g2_measurement(diff){
  const ci=rnd(0,9);
  const pools={
    easy:[
      ()=>{const m=rnd(1,8);return Q('measurement',diff,`${m} מ' = כמה ס"מ?`,m*100,drawRuler(Math.min(m*5,25),ci),`💡 1 מ'=100 ס"מ. ${m}×100=${m*100}!`,'📏 מדידה')},
      ()=>{const kg=rnd(1,5);return Q('measurement',diff,`${kg} ק"ג = כמה גרם?`,kg*1000,drawScales(kg,kg,ci),`💡 1 ק"ג=1000 גרם. ${kg}×1000=${kg*1000}!`,'⚖️ מדידה')},
      ()=>Q('measurement',diff,'שבוע = כמה ימים?',7,drawRuler(7,ci),'💡 7 ימים!','📅 זמן'),
    ],
    medium:[
      ()=>{const l=rnd(1,5);return Q('measurement',diff,`${l} ליטר = כמה מ"ל?`,l*1000,drawBeaker(l*500,l*1000,ci),`💡 1 ליטר=1000 מ"ל. ${l}×1000=${l*1000}!`,'🧪 נפח')},
      ()=>{const h=rnd(1,6),m=rnd(1,5);return Q('measurement',diff,`${h} שעות ו-${m} דקות = כמה דקות?`,h*60+m,drawClock(h,m*12,ci),`💡 ${h}×60+${m}=${h*60+m} דקות`,'⏰ זמן')},
      ()=>{const cm=pick([100,200,300,500]);return Q('measurement',diff,`${cm} ס"מ = כמה מ'?`,cm/100,drawRuler(Math.min(cm/10,25),ci),`💡 ${cm}÷100=${cm/100} מ'`,'📏 מדידה')},
    ],
    hard:[
      ()=>{const km=rnd(1,4),m=rnd(1,9)*100;return Q('measurement',diff,`${km} ק"מ ו-${m} מ' = כמה מ'?`,km*1000+m,drawRuler(25,ci),`💡 ${km*1000}+${m}=${km*1000+m} מ'`,'📏 מדידה')},
      ()=>{const g=pick([500,1500,2500]);return Q('measurement',diff,`${g} גרם = כמה ק"ג?`,g/1000,drawScales(g/1000,g/1000,ci),`💡 ${g}÷1000=${g/1000} ק"ג`,'⚖️ מדידה')},
    ],
  };
  return pick(pools[diff])();
}

function g3_measurement(diff){
  const ci=rnd(0,9);
  const pools={
    easy:[
      ()=>{const m=rnd(1,10);return Q('measurement',diff,`${m} מ' = כמה ס"מ?`,m*100,drawRuler(Math.min(m*5,25),ci),`💡 ${m}×100=${m*100} ס"מ`,'📏 מדידה')},
      ()=>{const kg=rnd(1,8);return Q('measurement',diff,`${kg} ק"ג = כמה גרם?`,kg*1000,drawScales(kg,kg,ci),`💡 ${kg}×1000=${kg*1000} גרם`,'⚖️ מדידה')},
      ()=>Q('measurement',diff,'שנה = כמה חודשים?',12,drawClock(12,0,ci),'💡 12 חודשים!','📅 זמן'),
    ],
    medium:[
      ()=>{const km=rnd(2,8);return Q('measurement',diff,`${km} ק"מ = כמה מ'?`,km*1000,drawRuler(25,ci),`💡 ${km}×1000=${km*1000} מ'`,'📏 מדידה')},
      ()=>{const l=rnd(2,8);return Q('measurement',diff,`${l} ליטר = כמה מ"ל?`,l*1000,drawBeaker(l*300,l*1000,ci),`💡 ${l}×1000=${l*1000} מ"ל`,'🧪 נפח')},
      ()=>{const cm=rnd(200,800);return Q('measurement',diff,`${cm} ס"מ = כמה מ'?`,cm/100,drawRuler(Math.min(cm/20,25),ci),`💡 ${cm}÷100=${cm/100} מ'`,'📏 מדידה')},
    ],
    hard:[
      ()=>{const km=rnd(2,7),m=rnd(1,9)*100;return Q('measurement',diff,`${km} ק"מ ו-${m} מ' = כמה מ'?`,km*1000+m,drawRuler(25,ci),`💡 ${km*1000}+${m}=${km*1000+m} מ'`,'📏 מדידה')},
      ()=>{const h1=rnd(1,4),m1=rnd(10,30),m2=rnd(10,30);const tot=h1*60+m1+m2;return Q('measurement',diff,`${h1}h${m1}m + ${m2}m = כמה דקות?`,tot,drawClock(Math.floor(tot/60)%12,tot%60,ci),`💡 ${h1*60+m1}+${m2}=${tot} דקות`,'⏰ זמן')},
    ],
  };
  return pick(pools[diff])();
}

// ══════════════════════════════════════════════════════════
//  PUBLIC ROUTER
// ══════════════════════════════════════════════════════════
function routeShape(diff){
  const grade=window._grade||'ג';
  switch(grade){
    case 'א': return g1_shapes(diff);
    case 'ב': return g2_shapes(diff);
    case 'ג': return g3_shapes(diff);
    case 'ד': return g4_shapes(diff);
    case 'ה': return g5_shapes(diff);
    case 'ו': return g6_shapes(diff);
    default:  return g3_shapes(diff);
  }
}
function routeMeasurement(diff){
  const grade=window._grade||'ג';
  switch(grade){
    case 'א': return g1_measurement(diff);
    case 'ב': return g2_measurement(diff);
    default:  return g3_measurement(diff);
  }
}

window.genGeometryCategory = function(cat, diff){
  diff=diff||'easy';
  if(cat==='shapes')      return routeShape(diff);
  if(cat==='measurement') return routeMeasurement(diff);
  return routeShape(diff);
};

// Override the genShapes function used in questions.js
window.genShapes = function(diff){
  return routeShape(diff||'easy');
};

// ──────────────────────────────────────────────────────────
// PATCH grade GRADE_CONFIG generators so EVERY shapes/measurement
// question in every grade gets a visual.
// ──────────────────────────────────────────────────────────
function patchGrade(){
  const gc=window.GRADE_CONFIG;
  if(!gc||!gc.generators) return;

  if(gc.generators.shapes){
    gc.generators.shapes = function(diff){
      try{ return routeShape(diff||'easy'); }
      catch(e){ return routeShape('easy'); }
    };
  }
  if(gc.generators.measurement){
    gc.generators.measurement = function(diff){
      try{ return routeMeasurement(diff||'easy'); }
      catch(e){ return routeMeasurement('easy'); }
    };
  }
}

// Run after grade file has set GRADE_CONFIG
setTimeout(patchGrade, 0);
window.patchGeometryGenerators = patchGrade;

})();
