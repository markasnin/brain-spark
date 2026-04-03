// ══════════════════════════════════════════════════════════════
// geometry.js — Separate Geometry Category Generators
// Categories: shapes2d, symmetry, perimeter, area, angles,
//             shapes3d, coordinates, measurement
// Each category is fully independent with its own generator.
// ══════════════════════════════════════════════════════════════
(function () {

const _rnd  = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const _pick = arr => arr[Math.floor(Math.random() * arr.length)];

const PAL = {
  f: ['#ff7eb3','#7ec8ff','#7effb2','#ffe07e','#c07eff','#ff9f7e','#7efff0','#ffeb7e'],
  s: ['#e0006a','#0078c8','#00c85a','#c88000','#7800c8','#c84000','#00a8a8','#c8a000'],
};
const pc = i => ({ f: PAL.f[i % PAL.f.length], s: PAL.s[i % PAL.s.length] });

function svgWrap(w, h, body) {
  return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg"
    style="width:100%;max-width:${w}px;display:block;margin:0 auto;border-radius:16px;
    background:linear-gradient(135deg,rgba(255,255,255,.06),rgba(255,255,255,.02)),rgba(7,5,15,.6);
    border:1px solid rgba(255,255,255,.09)">${body}</svg>`;
}
function tx(x,y,t,col,sz,anc,fw){
  col=col||'#fff';sz=sz||14;anc=anc||'middle';fw=fw||'700';
  return `<text x="${x}" y="${y}" text-anchor="${anc}" font-size="${sz}" font-family="Rubik,sans-serif" fill="${col}" font-weight="${fw}">${t}</text>`;
}
function dimLine(x1,y1,x2,y2,lbl,col){
  col=col||'#aaa';
  const mx=(x1+x2)/2,my=(y1+y2)/2,dx=x2-x1,dy=y2-y1,len=Math.sqrt(dx*dx+dy*dy)||1;
  const nx=-dy/len*16,ny=dx/len*16;
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="1.5" stroke-dasharray="5,3" opacity=".8"/>
    ${tx(mx+nx,my+ny+5,lbl,col,12)}`;
}
function rightBox(x,y,sz){ sz=sz||10;
  return `<polyline points="${x+sz},${y} ${x+sz},${y+sz} ${x},${y+sz}" fill="none" stroke="#ffd32a" stroke-width="2"/>`;
}
function arcPath(cx,cy,r,a1,a2,col){
  col=col||'#ffd32a';
  const r1=a1*Math.PI/180,r2=a2*Math.PI/180;
  const x1=cx+r*Math.cos(r1),y1=cy+r*Math.sin(r1);
  const x2=cx+r*Math.cos(r2),y2=cy+r*Math.sin(r2);
  const lg=Math.abs(a2-a1)>180?1:0;
  return `<path d="M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${lg},1 ${x2},${y2} Z" fill="${col}22" stroke="${col}" stroke-width="1.5"/>`;
}
function glowDef(col,id){ col=col||'#fff';id=id||'g1';
  return `<defs><filter id="${id}"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`;
}
function iWidget(html){
  return `<div style="background:linear-gradient(135deg,rgba(255,255,255,.06),rgba(255,255,255,.02));border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:12px;margin:8px 0;position:relative;overflow:hidden">${html}</div>`;
}
function ptsFor(diff){ const gc=window.GRADE_CONFIG; return gc?.pts?.[diff]||(diff==='easy'?5:diff==='medium'?10:18); }
function mkQ(cat,diff,text,answer,shapeHtml,hint,label){
  label=label||'📐 גיאומטריה';
  return {type:'shapes',cat,diff,text,answer,pts:ptsFor(diff),shapeHtml,hint:{type:'text',msg:hint},showMul:false,dir:'rtl',label,gameLabel:''};
}

// ══════════════════════════════════════════════
// SHAPES2D — זיהוי צורות דו-מימדיות
// ══════════════════════════════════════════════
const SHAPES2D_POOL = [
  {n:'משולש',        s:3, pts:'150,30 265,205 35,205',   ci:0, sides:3, corners:3},
  {n:'ריבוע',        s:4, pts:'75,55 225,55 225,195 75,195', ci:1, sides:4, corners:4},
  {n:'מלבן',         s:4, pts:'45,70 255,70 255,170 45,170', ci:2, sides:4, corners:4},
  {n:'מחומש',        s:5, pts:'150,25 245,95 210,205 90,205 55,95', ci:3, sides:5, corners:5},
  {n:'משושה',        s:6, pts:'150,22 233,68 233,162 150,208 67,162 67,68', ci:4, sides:6, corners:6},
  {n:'מעוין',        s:4, pts:'150,25 255,110 150,195 45,110', ci:5, sides:4, corners:4},
  {n:'טרפז',         s:4, pts:'90,55 210,55 255,185 45,185', ci:6, sides:4, corners:4},
  {n:'משולש ישר-זווית',s:3, pts:'50,195 250,195 50,45', ci:7, sides:3, corners:3},
];

function gen_shapes2d(diff) {
  const grade = window._grade || 'א';
  const pool = grade==='א' ? SHAPES2D_POOL.slice(0,4) :
               grade==='ב' ? SHAPES2D_POOL.slice(0,6) : SHAPES2D_POOL;
  const sh = _pick(pool);
  const c = pc(sh.ci);
  // Easy: count sides, Medium: count corners, Hard: name the shape (answer = number of sides)
  const modes = diff==='easy' ? ['sides'] : diff==='medium' ? ['sides','corners'] : ['sides','corners'];
  const mode = _pick(modes);
  const answer = mode==='sides' ? sh.sides : sh.corners;
  const text = mode==='sides'
    ? `כמה צלעות יש ל${sh.n}?`
    : `כמה פינות יש ל${sh.n}?`;
  const hint = mode==='sides'
    ? `💡 ספור כל קו צד של ${sh.n} — יש ${sh.sides}`
    : `💡 ספור כל פינה (זווית) של ${sh.n} — יש ${sh.corners}`;
  // Mark side midpoints
  const ptsArr = sh.pts.split(' ').map(p=>p.split(',').map(Number));
  let markers='';
  for(let i=0;i<ptsArr.length;i++){
    const a=ptsArr[i],b=ptsArr[(i+1)%ptsArr.length];
    const mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2;
    if(mode==='sides'){
      markers+=`<circle cx="${mx}" cy="${my}" r="10" fill="${c.s}" opacity=".85"/>`;
      markers+=tx(mx,my+4,i+1,'#fff',10);
    } else {
      markers+=`<circle cx="${a[0]}" cy="${a[1]}" r="10" fill="${c.s}" opacity=".85"/>`;
      markers+=tx(a[0],a[1]+4,i+1,'#fff',10);
    }
  }
  const svgBody = `${glowDef(c.f,'s2d')}
    <polygon points="${sh.pts}" fill="${c.f}77" stroke="${c.s}" stroke-width="3.5" filter="url(#s2d)">
      <animate attributeName="opacity" values="0;1" dur=".4s" fill="freeze"/>
    </polygon>${markers}
    ${tx(150,228,sh.n,'#ffffff66',11)}`;
  return mkQ('shapes2d',diff,text,answer,svgWrap(300,240,svgBody),hint,'🔷 צורות 2D');
}

// ══════════════════════════════════════════════
// SYMMETRY — סימטריה
// ══════════════════════════════════════════════
const SYM_POOL = [
  {n:'ריבוע',       axes:4, pts:'80,60 220,60 220,180 80,180',       ci:1},
  {n:'מלבן',        axes:2, pts:'40,80 260,80 260,165 40,165',        ci:2},
  {n:'משולש שווה-צלעות',axes:3, pts:'150,30 255,195 45,195',         ci:0},
  {n:'מעוין',       axes:2, pts:'150,25 255,110 150,195 45,110',      ci:6},
  {n:'עיגול',       axes:999,pts:'',                                  ci:4},
  {n:'משושה',       axes:6, pts:'150,22 233,68 233,162 150,208 67,162 67,68', ci:3},
  {n:'מחומש שווה-צלעות',axes:5,pts:'150,25 245,95 210,205 90,205 55,95',ci:5},
  {n:'חץ',          axes:1, pts:'150,25 185,90 170,90 170,205 130,205 130,90 115,90', ci:7},
];

function gen_symmetry(diff) {
  const easyPool = SYM_POOL.slice(0,4);
  const pool = diff==='easy' ? easyPool : SYM_POOL;
  const sh = _pick(pool);
  const displayAxes = sh.axes===999 ? '∞' : sh.axes;
  const answerAxes = sh.axes===999 ? 99 : sh.axes; // use 99 as answer for infinite
  const text = sh.axes===999
    ? `לעיגול יש אינסוף צירי סימטריה. כמה זה? (כתוב 99)`
    : `כמה צירי סימטריה יש ל${sh.n}?`;
  const c = pc(sh.ci);
  const axisColors = ['#ffd32a','#7ec8ff','#7effb2','#c07eff','#ff9f7e','#ff7eb3'];
  let axLines='', shapeBody='';
  if(sh.pts){
    shapeBody = `<polygon points="${sh.pts}" fill="${c.f}77" stroke="${c.s}" stroke-width="3"/>`;
    if(sh.axes>=1) axLines+=`<line x1="150" y1="15" x2="150" y2="215" stroke="${axisColors[0]}" stroke-width="2" stroke-dasharray="7,4" opacity=".8"/>`;
    if(sh.axes>=2) axLines+=`<line x1="25" y1="115" x2="275" y2="115" stroke="${axisColors[1]}" stroke-width="2" stroke-dasharray="7,4" opacity=".8"/>`;
    if(sh.axes>=3) axLines+=`<line x1="40" y1="40" x2="260" y2="190" stroke="${axisColors[2]}" stroke-width="2" stroke-dasharray="7,4" opacity=".8"/>`;
    if(sh.axes>=4) axLines+=`<line x1="260" y1="40" x2="40" y2="190" stroke="${axisColors[3]}" stroke-width="2" stroke-dasharray="7,4" opacity=".8"/>`;
    if(sh.axes>=5) axLines+=`<line x1="80" y1="20" x2="220" y2="210" stroke="${axisColors[4]}" stroke-width="2" stroke-dasharray="7,4" opacity=".7"/>`;
    if(sh.axes>=6) axLines+=`<line x1="220" y1="20" x2="80" y2="210" stroke="${axisColors[5]}" stroke-width="2" stroke-dasharray="7,4" opacity=".7"/>`;
  } else {
    shapeBody = `<circle cx="150" cy="115" r="90" fill="${c.f}77" stroke="${c.s}" stroke-width="3"/>`;
    for(let a=0;a<180;a+=30)
      axLines+=`<line x1="${150+95*Math.cos(a*Math.PI/180)}" y1="${115+95*Math.sin(a*Math.PI/180)}" x2="${150-95*Math.cos(a*Math.PI/180)}" y2="${115-95*Math.sin(a*Math.PI/180)}" stroke="${axisColors[a/30%6]}" stroke-width="1.5" stroke-dasharray="5,3" opacity=".6"/>`;
  }
  const hint = sh.axes===999 ? '💡 עיגול סימטרי מכל כיוון — צירים אינסופיים! כתוב 99'
                             : `💡 ציר סימטריה חוצה הצורה לשני חצאים שווים — ${sh.n} יש ${sh.axes} צירים`;
  const svgBody = `${shapeBody}${axLines}${tx(150,232,sh.n,'#ffffff55',11)}`;
  return mkQ('symmetry',diff,text,answerAxes,svgWrap(300,240,svgBody),hint,'🔁 סימטריה');
}

// ══════════════════════════════════════════════
// PERIMETER — היקף
// ══════════════════════════════════════════════
function gen_perimeter(diff) {
  const grade = window._grade || 'ג';
  const types = grade==='ג' ? ['square','rect','tri'] :
                grade==='ד' ? ['square','rect','tri','para'] :
                              ['square','rect','tri','para','hex'];
  const type = _pick(types);
  const c = pc(_rnd(0,7));
  let answer, text, hint, body;

  if(type==='square'){
    const s = diff==='easy'?_rnd(2,8):diff==='medium'?_rnd(5,18):_rnd(8,30);
    answer = 4*s;
    text = `מה היקף הריבוע שצלעו ${s} ס"מ?`;
    hint = `💡 4 × ${s} = ${answer}`;
    const sd=140,ox=80,oy=40;
    body=`<rect x="${ox}" y="${oy}" width="${sd}" height="${sd}" fill="${c.f}77" stroke="${c.s}" stroke-width="3" rx="4"/>
      ${rightBox(ox,oy+sd-10)}${rightBox(ox+sd-10,oy)}${rightBox(ox,oy)}${rightBox(ox+sd-10,oy+sd-10)}
      ${dimLine(ox,oy-16,ox+sd,oy-16,s+' ס"מ',c.s)}
      ${dimLine(ox+sd+10,oy,ox+sd+10,oy+sd,s+' ס"מ',c.s)}
      ${tx(ox+sd/2,oy+sd/2+7,'היקף=?','#ffffffcc',16)}`;
  } else if(type==='rect'){
    const w=diff==='easy'?_rnd(3,10):diff==='medium'?_rnd(5,18):_rnd(6,28);
    const h=_rnd(2,Math.max(3,w-1));
    answer=2*(w+h);
    text=`מה היקף המלבן? (רוחב ${w} ס"מ, גובה ${h} ס"מ)`;
    hint=`💡 2 × (${w} + ${h}) = 2 × ${w+h} = ${answer}`;
    const pw=Math.min(w*12,200),ph=Math.min(Math.max(h*12,50),140);
    const ox=(300-pw)/2,oy=(215-ph)/2;
    body=`<rect x="${ox}" y="${oy}" width="${pw}" height="${ph}" fill="${c.f}77" stroke="${c.s}" stroke-width="3" rx="4"/>
      ${dimLine(ox,oy-16,ox+pw,oy-16,w+' ס"מ',c.s)}
      ${dimLine(ox-18,oy,ox-18,oy+ph,h+' ס"מ',c.s)}
      ${tx(ox+pw/2,oy+ph/2+7,'היקף=?','#ffffffcc',16)}`;
  } else if(type==='tri'){
    const a=_rnd(3,diff==='hard'?20:12);
    const b=_rnd(3,diff==='hard'?18:10);
    const c2=_rnd(3,diff==='hard'?16:9);
    answer=a+b+c2;
    text=`מה היקף המשולש? (צלעות: ${a}, ${b}, ${c2} ס"מ)`;
    hint=`💡 ${a} + ${b} + ${c2} = ${answer}`;
    body=`<polygon points="150,25 265,195 35,195" fill="${c.f}77" stroke="${c.s}" stroke-width="3"/>
      ${dimLine(35,210,265,210,a+' ס"מ',c.s)}
      ${dimLine(268,193,153,25,b+' ס"מ',c.s)}
      ${dimLine(147,25,32,193,c2+' ס"מ',c.s)}
      ${tx(150,125,'היקף=?','#ffffffcc',16)}`;
  } else if(type==='para'){
    const base=_rnd(4,diff==='hard'?20:12);
    const side=_rnd(2,diff==='hard'?12:8);
    answer=2*(base+side);
    text=`מה היקף המקבילית? (בסיס ${base} ס"מ, צלע ${side} ס"מ)`;
    hint=`💡 2 × (${base} + ${side}) = ${answer}`;
    const bpx=Math.min(base*10,180),spx=Math.min(side*9,110),off=30;
    const ox=(300-bpx)/2,oy=70;
    body=`<polygon points="${ox+off},${oy} ${ox+off+bpx},${oy} ${ox+bpx},${oy+spx} ${ox},${oy+spx}" fill="${c.f}77" stroke="${c.s}" stroke-width="3"/>
      ${dimLine(ox+off,oy-16,ox+off+bpx,oy-16,base+' ס"מ',c.s)}
      ${dimLine(ox-18,oy,ox-18,oy+spx,side+' ס"מ',c.s)}
      ${tx((ox*2+bpx+off)/2,oy+spx/2+7,'היקף=?','#ffffffcc',15)}`;
  } else {
    const s=_rnd(2,diff==='hard'?12:8);
    answer=6*s;
    text=`מה היקף המשושה שווה-צלעות? (כל צלע ${s} ס"מ)`;
    hint=`💡 6 × ${s} = ${answer}`;
    body=`<polygon points="150,22 233,68 233,162 150,208 67,162 67,68" fill="${c.f}77" stroke="${c.s}" stroke-width="3"/>
      ${dimLine(150,22,233,68,s+' ס"מ',c.s)}
      ${tx(150,122,'היקף=?','#ffffffcc',16)}`;
  }
  return mkQ('perimeter',diff,text,answer,svgWrap(300,225,body),hint,'📏 היקף');
}

// ══════════════════════════════════════════════
// AREA — שטח
// ══════════════════════════════════════════════
function gen_area(diff) {
  const grade = window._grade || 'ג';
  const types = grade==='ג' ? ['grid','rect','square'] :
                grade==='ד' ? ['rect','square','tri','grid'] :
                grade==='ה' ? ['rect','tri','para','trap','circle'] :
                              ['rect','tri','para','trap','circle','lshape'];
  const type = _pick(types);
  const c = pc(_rnd(0,7));
  let answer, text, hint, body;

  if(type==='grid'){
    const cols=diff==='easy'?_rnd(2,5):_rnd(3,9);
    const rows=diff==='easy'?_rnd(2,5):_rnd(2,8);
    answer=cols*rows;
    text=`כמה ריבועים בגריד? (שטח הצורה)`;
    hint=`💡 שורות × עמודות = ${rows} × ${cols} = ${answer}`;
    const cell=Math.min(Math.floor(200/Math.max(cols,rows)),26);
    const gw=cols*cell,gh=rows*cell,ox=(300-gw)/2,oy=(220-gh)/2;
    let grid='';
    for(let r=0;r<rows;r++) for(let cl=0;cl<cols;cl++){
      const hue=((r*cols+cl)/(rows*cols)*80+160)|0;
      grid+=`<rect x="${ox+cl*cell}" y="${oy+r*cell}" width="${cell}" height="${cell}" fill="hsla(${hue},65%,62%,.55)" stroke="rgba(255,255,255,.22)" stroke-width="1"/>`;
    }
    body=`${grid}<rect x="${ox}" y="${oy}" width="${gw}" height="${gh}" fill="none" stroke="${c.s}" stroke-width="2.5" rx="2"/>
      ${dimLine(ox,oy-14,ox+gw,oy-14,cols+'',c.s)}
      ${dimLine(ox-14,oy,ox-14,oy+gh,rows+'',PAL.s[2])}`;
  } else if(type==='square'){
    const s=diff==='easy'?_rnd(2,8):diff==='medium'?_rnd(4,14):_rnd(5,20);
    answer=s*s;
    text=`מה שטח הריבוע? (צלע ${s} ס"מ)`;
    hint=`💡 צלע² = ${s} × ${s} = ${answer} ס"מ²`;
    const sd=140,ox=80,oy=40;
    body=`<rect x="${ox}" y="${oy}" width="${sd}" height="${sd}" fill="${c.f}77" stroke="${c.s}" stroke-width="3" rx="4"/>
      ${dimLine(ox,oy-16,ox+sd,oy-16,s+' ס"מ',c.s)}
      ${dimLine(ox+sd+10,oy,ox+sd+10,oy+sd,s+' ס"מ',c.s)}
      ${tx(ox+sd/2,oy+sd/2,'שטח=?','#ffffffcc',17)}`;
  } else if(type==='rect'){
    const w=diff==='easy'?_rnd(2,10):diff==='medium'?_rnd(4,18):_rnd(5,25);
    const h=_rnd(2,Math.max(3,w-1));
    answer=w*h;
    text=`מה שטח המלבן? (${w} ס"מ × ${h} ס"מ)`;
    hint=`💡 אורך × רוחב = ${w} × ${h} = ${answer} ס"מ²`;
    const pw=Math.min(w*11,200),ph=Math.min(Math.max(h*11,50),140);
    const ox=(300-pw)/2,oy=(215-ph)/2;
    body=`<rect x="${ox}" y="${oy}" width="${pw}" height="${ph}" fill="${c.f}77" stroke="${c.s}" stroke-width="3" rx="4"/>
      ${dimLine(ox,oy-16,ox+pw,oy-16,w+' ס"מ',c.s)}
      ${dimLine(ox-18,oy,ox-18,oy+ph,h+' ס"מ',c.s)}
      ${tx(ox+pw/2,oy+ph/2+7,'שטח=?','#ffffffcc',17)}`;
  } else if(type==='tri'){
    const base=diff==='easy'?_rnd(4,12):diff==='medium'?_rnd(4,20):_rnd(4,28);
    const height=diff==='easy'?_rnd(3,10):diff==='medium'?_rnd(3,16):_rnd(3,22);
    answer=(base*height)/2;
    if(!Number.isInteger(answer)){return gen_area(diff);}
    text=`מה שטח המשולש? (בסיס ${base} ס"מ, גובה ${height} ס"מ)`;
    hint=`💡 (בסיס × גובה) ÷ 2 = (${base} × ${height}) ÷ 2 = ${answer} ס"מ²`;
    const bpx=Math.min(base*9,200),hpx=Math.min(height*9,160);
    const ox=(300-bpx)/2,oy=220-hpx;
    body=`<polygon points="${ox},${oy+hpx} ${ox+bpx},${oy+hpx} ${ox+bpx/2},${oy}" fill="${c.f}77" stroke="${c.s}" stroke-width="3"/>
      <line x1="${ox+bpx/2}" y1="${oy}" x2="${ox+bpx/2}" y2="${oy+hpx}" stroke="#ffd32a" stroke-width="1.5" stroke-dasharray="5,3"/>
      ${dimLine(ox,oy+hpx+14,ox+bpx,oy+hpx+14,base+' ס"מ',c.s)}
      ${dimLine(ox+bpx/2+8,oy,ox+bpx/2+8,oy+hpx,height+' ס"מ','#ffd32a')}
      ${tx(ox+bpx/2,oy+hpx/2,'שטח=?','#ffffffcc',15)}`;
  } else if(type==='para'){
    const base=diff==='easy'?_rnd(4,12):diff==='medium'?_rnd(4,20):_rnd(4,28);
    const height=diff==='easy'?_rnd(2,8):diff==='medium'?_rnd(3,14):_rnd(3,20);
    answer=base*height;
    text=`מה שטח המקבילית? (בסיס ${base} ס"מ, גובה ${height} ס"מ)`;
    hint=`💡 בסיס × גובה = ${base} × ${height} = ${answer} ס"מ²`;
    const bpx=Math.min(base*9,190),hpx=Math.min(height*9,140),off=25;
    const ox=(300-bpx)/2,oy=70;
    body=`<polygon points="${ox+off},${oy} ${ox+off+bpx},${oy} ${ox+bpx},${oy+hpx} ${ox},${oy+hpx}" fill="${c.f}77" stroke="${c.s}" stroke-width="3"/>
      <line x1="${ox+off+bpx/2}" y1="${oy}" x2="${ox+bpx/2}" y2="${oy+hpx}" stroke="#ffd32a" stroke-width="1.5" stroke-dasharray="5,3"/>
      ${dimLine(ox+off,oy-16,ox+off+bpx,oy-16,base+' ס"מ',c.s)}
      ${dimLine(ox+bpx+8,oy,ox+bpx+8,oy+hpx,height+' ס"מ','#ffd32a')}
      ${tx(ox+bpx/2+off/2,oy+hpx/2+7,'שטח=?','#ffffffcc',15)}`;
  } else if(type==='trap'){
    const b1=diff==='easy'?_rnd(4,10):_rnd(4,18);
    const b2=_rnd(2,b1-1);
    const h=diff==='easy'?_rnd(3,8):_rnd(3,15);
    answer=Math.round((b1+b2)*h/2);
    if(!Number.isInteger((b1+b2)*h/2)){return gen_area(diff);}
    text=`מה שטח הטרפז? (בסיסים ${b1} ו-${b2} ס"מ, גובה ${h} ס"מ)`;
    hint=`💡 (${b1} + ${b2}) × ${h} ÷ 2 = ${answer} ס"מ²`;
    const b1px=Math.min(b1*10,200),b2px=Math.min(b2*10,120),hpx=Math.min(h*10,110);
    const ox=(300-b1px)/2,oy=70;
    const off=(b1px-b2px)/2;
    body=`<polygon points="${ox},${oy+hpx} ${ox+b1px},${oy+hpx} ${ox+off+b2px},${oy} ${ox+off},${oy}" fill="${c.f}77" stroke="${c.s}" stroke-width="3"/>
      ${dimLine(ox,oy+hpx+14,ox+b1px,oy+hpx+14,b1+' ס"מ',c.s)}
      ${dimLine(ox+off,oy-14,ox+off+b2px,oy-14,b2+' ס"מ',c.s)}
      ${dimLine(ox-18,oy,ox-18,oy+hpx,h+' ס"מ','#ffd32a')}
      ${tx(ox+b1px/2,oy+hpx/2+7,'שטח=?','#ffffffcc',15)}`;
  } else if(type==='circle'){
    const r=diff==='easy'?_rnd(2,5):diff==='medium'?_rnd(3,8):_rnd(4,11);
    answer=Math.round(3.14*r*r);
    text=`מה שטח העיגול? (רדיוס ${r} ס"מ) השתמש ב-π≈3.14`;
    hint=`💡 π × r² = 3.14 × ${r}² = 3.14 × ${r*r} ≈ ${answer} ס"מ²`;
    const cx=150,cy=118,cr=Math.min(r*14,95);
    body=`<circle cx="${cx}" cy="${cy}" r="${cr}" fill="${c.f}77" stroke="${c.s}" stroke-width="3"/>
      <line x1="${cx}" y1="${cy}" x2="${cx+cr}" y2="${cy}" stroke="#ffd32a" stroke-width="2.5"/>
      ${tx(cx+cr/2,cy-10,'r='+r,'#ffd32a',14)}
      ${tx(cx,cy+cr+18,'π×r²=?','#ffffff77',13)}
      <circle cx="${cx}" cy="${cy}" r="4" fill="#ffd32a"/>`;
  } else { // lshape
    const W=_rnd(5,10),H=_rnd(4,W),w=_rnd(2,W-2),h=_rnd(2,H-2);
    if(w>=W||h>=H){return gen_area(diff);}
    answer=W*H-w*h;
    text=`מה שטח הצורה (מלבן גדול פחות חלק חסר)?`;
    hint=`💡 ${W}×${H} − ${w}×${h} = ${W*H} − ${w*h} = ${answer} ס"מ²`;
    const sc=18,ox=20,oy=15;
    body=`<polygon points="${ox},${oy} ${ox+W*sc},${oy} ${ox+W*sc},${oy+(H-h)*sc} ${ox+(W-w)*sc},${oy+(H-h)*sc} ${ox+(W-w)*sc},${oy+H*sc} ${ox},${oy+H*sc}" fill="${c.f}77" stroke="${c.s}" stroke-width="3"/>
      ${dimLine(ox,oy-14,ox+W*sc,oy-14,W+' ס"מ',c.s)}
      ${dimLine(ox-14,oy,ox-14,oy+H*sc,H+' ס"מ',c.s)}
      ${dimLine(ox+(W-w)*sc,oy+(H-h)*sc-12,ox+W*sc,oy+(H-h)*sc-12,w+' ס"מ',PAL.s[0])}
      ${dimLine(ox+W*sc+10,oy,ox+W*sc+10,oy+(H-h)*sc,h+' ס"מ',PAL.s[0])}
      ${tx(ox+W*sc/2,oy+H*sc/2+5,'שטח=?','#ffffffcc',15)}`;
  }
  return mkQ('area',diff,text,answer,svgWrap(300,230,body),hint,'📐 שטח');
}

// ══════════════════════════════════════════════
// ANGLES — זוויות
// ══════════════════════════════════════════════
function gen_angles(diff) {
  const grade = window._grade || 'ג';
  const types = grade==='ג' ? ['type','measure'] :
                grade==='ד' ? ['type','measure','missing_tri'] :
                grade==='ה' ? ['type','measure','missing_tri','missing_poly','exterior'] :
                              ['measure','missing_tri','missing_poly','exterior','sum_poly'];
  const type = _pick(types);
  const c = pc(_rnd(0,7));
  let answer, text, hint, body;

  if(type==='type'){
    const cases=[
      {deg:90,name:'ישרה',num:2},{deg:45,name:'חדה',num:1},{deg:30,name:'חדה',num:1},
      {deg:60,name:'חדה',num:1},{deg:120,name:'קהה',num:3},{deg:135,name:'קהה',num:3},{deg:150,name:'קהה',num:3},
    ];
    const filtered = diff==='easy' ? cases.filter(c=>c.deg===90||c.deg===45) : cases;
    const ch = _pick(filtered);
    answer = ch.num;
    text = `איזה סוג זווית? (1=חדה  2=ישרה  3=קהה)`;
    hint = `💡 חדה < 90°, ישרה = 90°, קהה > 90°. הזווית היא ${ch.deg}° — ${ch.name}`;
    const cx=150,cy=160,r=100,rad=ch.deg*Math.PI/180;
    const x2=cx+r*Math.cos(-rad),y2=cy+r*Math.sin(-rad);
    body=`${glowDef(ch.num===2?'#7ec8ff':ch.num===1?'#7effb2':'#ff7eb3','agt')}
      <line x1="${cx}" y1="${cy}" x2="${cx+r}" y2="${cy}" stroke="${ch.num===2?'#7ec8ff':ch.num===1?'#7effb2':'#ff7eb3'}" stroke-width="5" stroke-linecap="round" filter="url(#agt)"/>
      <line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="${ch.num===2?'#7ec8ff':ch.num===1?'#7effb2':'#ff7eb3'}" stroke-width="5" stroke-linecap="round" filter="url(#agt)"/>
      ${arcPath(cx,cy,42,-rad,0,ch.num===2?'#7ec8ff':ch.num===1?'#7effb2':'#ff7eb3')}
      ${ch.deg===90?rightBox(cx,cy-12,12):''}
      ${tx(cx+65*Math.cos(-rad/2),cy+65*Math.sin(-rad/2),ch.deg+'°','#ffd32a',18)}
      <circle cx="${cx}" cy="${cy}" r="6" fill="#ffd32a"/>
      ${tx(55,200,'1=חדה','#7effb2',11,'start')}${tx(150,200,'2=ישרה','#7ec8ff',11)}${tx(245,200,'3=קהה','#ff7eb3',11,'end')}`;
  } else if(type==='measure'){
    const angles = diff==='easy'?[30,45,60,90]:diff==='medium'?[30,45,60,90,120,135]:[30,45,60,90,120,135,150];
    const deg = _pick(angles);
    answer = deg;
    text = `מה גודל הזווית? (בדרגות)`;
    hint = `💡 הזווית היא ${deg}°`;
    const cx=150,cy=165,r=95,rad=deg*Math.PI/180;
    const x2=cx+r*Math.cos(-rad),y2=cy+r*Math.sin(-rad);
    body=`<line x1="${cx}" y1="${cy}" x2="${cx+r}" y2="${cy}" stroke="${c.s}" stroke-width="5" stroke-linecap="round"/>
      <line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="${c.s}" stroke-width="5" stroke-linecap="round"/>
      ${arcPath(cx,cy,42,-rad,0,c.f)}
      ${deg===90?rightBox(cx,cy-13,13):''}
      <text x="${cx+68*Math.cos(-rad/2)}" y="${cy+68*Math.sin(-rad/2)+5}" text-anchor="middle" font-size="20" fill="#ffd32a" font-weight="900">?°</text>
      <circle cx="${cx}" cy="${cy}" r="6" fill="#ffd32a"/>
      ${tx(150,225,'קרא את הזווית','#ffffff55',11)}`;
  } else if(type==='missing_tri'){
    const a=diff==='easy'?_rnd(40,70):_rnd(20,80);
    const b=_rnd(20,Math.min(80,160-a-20));
    answer=180-a-b;
    text=`במשולש שתי זוויות הן ${a}° ו-${b}°. מה הזווית השלישית?`;
    hint=`💡 סכום זוויות משולש = 180°. ${a} + ${b} + ? = 180. ? = ${answer}°`;
    const p1=[150,30],p2=[50,195],p3=[250,195];
    const arc1=arcPath(p1[0],p1[1],30,-0.5,-1.2+a*Math.PI/180,c.f);
    body=`<polygon points="${p1} ${p2} ${p3}" fill="${c.f}77" stroke="${c.s}" stroke-width="3"/>
      ${tx(p1[0],p1[1]-12,a+'°','#ffe07e',13)}
      ${tx(p2[0]-14,p2[1]+14,b+'°','#ffe07e',13)}
      ${tx(p3[0]+14,p3[1]+14,'?°','#ffd32a',15)}
      ${tx(150,135,'180° סכום','#ffffff44',12)}`;
  } else if(type==='missing_poly'){
    const n=diff==='easy'?4:diff==='medium'?_pick([4,5]):_pick([4,5,6]);
    const total=(n-2)*180;
    const knownCount=n-1;
    const maxPer=Math.floor(total*0.7/knownCount);
    let known=[],sum=0;
    for(let i=0;i<knownCount;i++){
      const v=(i===knownCount-1)?total-sum-_rnd(20,60):_rnd(20,Math.min(maxPer,total-sum-(knownCount-i)*20));
      if(v<10||v>180){return gen_angles(diff);}
      known.push(v);sum+=v;
    }
    answer=total-sum;
    if(answer<10||answer>180){return gen_angles(diff);}
    text=`ב-${n}־צלע (סכום=${total}°): זוויות: ${known.join('°, ')}°, ?°. מה הזווית החסרה?`;
    hint=`💡 ${total} - (${known.join('+')} ) = ${total} - ${sum} = ${answer}°`;
    const polys={4:'70,50 230,50 250,185 50,185',5:'150,25 245,95 210,205 90,205 55,95',6:'150,22 233,68 233,162 150,208 67,162 67,68'};
    body=`<polygon points="${polys[n]}" fill="${c.f}77" stroke="${c.s}" stroke-width="3"/>
      ${tx(150,118,'סכום='+total+'°','#ffffff55',13)}
      ${tx(150,145,total-sum+'°=?','#ffd32a',16)}`;
  } else if(type==='exterior'){
    const inner=_rnd(30,130);
    answer=180-inner;
    text=`זווית פנימית במשולש היא ${inner}°. מה הזווית המתאימה החיצונית?`;
    hint=`💡 זווית פנימית + זווית חיצונית = 180°. ${inner} + ? = 180. ? = ${answer}°`;
    body=`<polygon points="150,30 260,190 40,190" fill="${c.f}77" stroke="${c.s}" stroke-width="3"/>
      <line x1="260" y1="190" x2="310" y2="190" stroke="#7ec8ff" stroke-width="3" stroke-dasharray="6,3"/>
      ${arcPath(260,190,40,Math.PI,Math.PI+inner*Math.PI/180,c.f)}
      ${tx(265,175,inner+'°','#ffe07e',13)}
      ${tx(290,178,'?°','#ffd32a',14)}
      ${tx(150,130,'זווית חיצונית','#ffffff55',12)}`;
  } else { // sum_poly
    const n=diff==='easy'?_pick([4,5]):diff==='medium'?_pick([5,6,7]):_pick([6,7,8,9]);
    answer=(n-2)*180;
    text=`מה סכום הזוויות הפנימיות של ${n}־צלע?`;
    hint=`💡 (${n} - 2) × 180° = ${n-2} × 180° = ${answer}°`;
    const polys={4:'70,50 230,50 250,185 50,185',5:'150,25 245,95 210,205 90,205 55,95',6:'150,22 233,68 233,162 150,208 67,162 67,68',7:'150,20 220,50 255,120 235,195 150,218 65,195 45,120',8:'150,18 210,40 248,100 248,148 210,200 150,218 90,200 52,148 52,100 90,40'};
    const pts=polys[Math.min(n,8)]||polys[6];
    body=`<polygon points="${pts}" fill="${c.f}77" stroke="${c.s}" stroke-width="3"/>
      ${tx(150,118,n+'–צלע','#ffffff66',14)}
      ${tx(150,148,'סכום=?°','#ffd32a',18)}`;
  }
  return mkQ('angles',diff,text,answer,svgWrap(300,230,body),hint,'📐 זוויות');
}

// ══════════════════════════════════════════════
// SHAPES3D — גופים תלת-מימדיים
// ══════════════════════════════════════════════
const SHAPES3D = [
  {n:'קוביה (cube)',     faces:6, edges:12, vertices:8,  shape:'cube'},
  {n:'קובייד (מלבן)',   faces:6, edges:12, vertices:8,  shape:'cuboid'},
  {n:'פירמידה משולשת',  faces:4, edges:6,  vertices:4,  shape:'tetra'},
  {n:'פירמידה ריבועית', faces:5, edges:8,  vertices:5,  shape:'pyramid'},
  {n:'גליל (cylinder)', faces:3, edges:2,  vertices:0,  shape:'cylinder'},
  {n:'חרוט (cone)',      faces:2, edges:1,  vertices:1,  shape:'cone'},
  {n:'כדור (sphere)',    faces:1, edges:0,  vertices:0,  shape:'sphere'},
  {n:'פריזמה משולשת',   faces:5, edges:9,  vertices:6,  shape:'prism'},
];

function draw3D(shape,c){
  if(shape==='cube'||shape==='cuboid'){
    const w=shape==='cube'?100:140,h=shape==='cube'?100:80,d=30;
    const ox=80,oy=60;
    return `<polygon points="${ox},${oy} ${ox+w},${oy} ${ox+w},${oy+h} ${ox},${oy+h}" fill="${c.f}88" stroke="${c.s}" stroke-width="2.5"/>
      <polygon points="${ox+w},${oy} ${ox+w+d},${oy-d} ${ox+w+d},${oy+h-d} ${ox+w},${oy+h}" fill="${c.f}55" stroke="${c.s}" stroke-width="2.5"/>
      <polygon points="${ox},${oy} ${ox+d},${oy-d} ${ox+w+d},${oy-d} ${ox+w},${oy}" fill="${c.f}66" stroke="${c.s}" stroke-width="2.5"/>`;
  } else if(shape==='pyramid'||shape==='tetra'){
    const pts=shape==='pyramid'?'150,30 60,195 240,195':'150,30 50,200 250,200';
    return `<polygon points="${pts}" fill="${c.f}88" stroke="${c.s}" stroke-width="2.5"/>
      <line x1="150" y1="30" x2="${shape==='pyramid'?'170,160':'190,160'}" stroke="${c.s}" stroke-width="2" stroke-dasharray="5,3" opacity=".6"/>`;
  } else if(shape==='cylinder'){
    return `<ellipse cx="150" cy="75" rx="70" ry="22" fill="${c.f}88" stroke="${c.s}" stroke-width="2.5"/>
      <rect x="80" y="75" width="140" height="110" fill="${c.f}66" stroke="${c.s}" stroke-width="2.5"/>
      <ellipse cx="150" cy="185" rx="70" ry="22" fill="${c.f}55" stroke="${c.s}" stroke-width="2.5"/>`;
  } else if(shape==='cone'){
    return `<polygon points="150,30 65,195 235,195" fill="${c.f}88" stroke="${c.s}" stroke-width="2.5"/>
      <ellipse cx="150" cy="195" rx="85" ry="20" fill="${c.f}55" stroke="${c.s}" stroke-width="2.5"/>`;
  } else if(shape==='sphere'){
    return `<circle cx="150" cy="118" r="90" fill="${c.f}77" stroke="${c.s}" stroke-width="2.5"/>
      <ellipse cx="150" cy="118" rx="90" ry="30" fill="none" stroke="${c.s}" stroke-width="1.5" stroke-dasharray="5,3" opacity=".5"/>`;
  } else if(shape==='prism'){
    return `<polygon points="70,185 70,75 150,30 230,75 230,185" fill="${c.f}66" stroke="${c.s}" stroke-width="2.5"/>
      <polygon points="70,75 150,30 230,75 230,185 70,185" fill="${c.f}44" stroke="${c.s}" stroke-width="2" stroke-dasharray="5,3"/>
      <line x1="150" y1="30" x2="150" y2="185" stroke="${c.s}" stroke-width="2" stroke-dasharray="4,3" opacity=".5"/>`;
  }
  return `<rect x="80" y="60" width="140" height="120" fill="${c.f}77" stroke="${c.s}" stroke-width="2.5"/>`;
}

function gen_shapes3d(diff) {
  const grade = window._grade || 'ד';
  const pool = grade==='ד' ? SHAPES3D.slice(0,5) :
               grade==='ה' ? SHAPES3D.slice(0,7) : SHAPES3D;
  const sh = _pick(pool);
  const c = pc(_rnd(0,7));
  const modes = diff==='easy' ? ['faces'] : diff==='medium' ? ['faces','edges'] : ['faces','edges','vertices'];
  const mode = _pick(modes);
  const answer = sh[mode];
  const modeHe = mode==='faces'?'פנים':mode==='edges'?'קצוות':'קודקודים';
  const text = `כמה ${modeHe} יש ל${sh.n}?`;
  const hint = `💡 ל${sh.n} יש: פנים=${sh.faces}, קצוות=${sh.edges}, קודקודים=${sh.vertices}`;
  const body = `${glowDef(c.f,'s3d')}${draw3D(sh.shape,c)}
    ${tx(150,228,sh.n,'#ffffff66',11)}`;
  return mkQ('shapes3d',diff,text,answer,svgWrap(300,240,body),hint,'🧊 גופים 3D');
}

// ══════════════════════════════════════════════
// COORDINATES — קואורדינטות
// ══════════════════════════════════════════════
function gen_coordinates(diff) {
  const grade = window._grade || 'ה';
  const allQuadrants = grade==='ו' || diff==='hard';
  const size=5, cell=28, ox=30, oy=20;
  const gridW=cell*size*2, gridH=cell*size*2;

  let px, py;
  if(allQuadrants){
    px=_rnd(-size,size); py=_rnd(-size,size);
    while(px===0&&py===0){px=_rnd(-size,size);py=_rnd(-size,size);}
  } else {
    px=_rnd(1,size); py=_rnd(1,size);
  }

  const modes = diff==='easy'?['identify']:diff==='medium'?['identify','quadrant']:['identify','quadrant','distance'];
  const mode = _pick(modes);

  // For identify: ask x or y coordinate
  const askX = Math.random()<0.5;
  const answer = mode==='identify' ? (askX ? px : py) :
                 mode==='quadrant' ? (px>0&&py>0?1:px<0&&py>0?2:px<0&&py<0?3:4) :
                 Math.abs(px)+Math.abs(py); // Manhattan distance from origin

  const text = mode==='identify'
    ? `הנקודה היא (${px}, ${py}). מה ה${askX?'X':'Y'} שלה?`
    : mode==='quadrant'
    ? `הנקודה (${px}, ${py}) נמצאת ברביע כמה? (1=ימין-מעלה, 2=שמאל-מעלה, 3=שמאל-מטה, 4=ימין-מטה)`
    : `מה המרחק המנהטן של (${px}, ${py}) מהראשית? (|x|+|y|)`;

  const hint = mode==='identify' ? `💡 הנקודה (${px},${py}): X=${px}, Y=${py}`
             : mode==='quadrant' ? `💡 רביע 1: (+,+), רביע 2: (−,+), רביע 3: (−,−), רביע 4: (+,−)`
             : `💡 |${px}| + |${py}| = ${Math.abs(px)} + ${Math.abs(py)} = ${answer}`;

  // Draw grid
  const cx=ox+size*cell, cy=oy+size*cell;
  let grid='';
  for(let i=-size;i<=size;i++){
    const x=cx+i*cell, y=cy+i*cell;
    grid+=`<line x1="${x}" y1="${oy}" x2="${x}" y2="${oy+gridH}" stroke="rgba(255,255,255,.1)" stroke-width="1"/>`;
    grid+=`<line x1="${ox}" y1="${y}" x2="${ox+gridW}" y2="${y}" stroke="rgba(255,255,255,.1)" stroke-width="1"/>`;
    if(i!==0){
      grid+=tx(x,cy+16,i,'rgba(255,255,255,.4)',9);
      grid+=tx(cx-14,y+4,i,'rgba(255,255,255,.4)',9);
    }
  }
  // Axes
  grid+=`<line x1="${ox}" y1="${cy}" x2="${ox+gridW}" y2="${cy}" stroke="rgba(255,255,255,.5)" stroke-width="2"/>`;
  grid+=`<line x1="${cx}" y1="${oy}" x2="${cx}" y2="${oy+gridH}" stroke="rgba(255,255,255,.5)" stroke-width="2"/>`;
  grid+=tx(ox+gridW+8,cy+4,'X','#7ec8ff',11,'start');
  grid+=tx(cx,oy-6,'Y','#7ec8ff',11);
  // Point
  const dotX=cx+px*cell, dotY=cy-py*cell;
  grid+=`<circle cx="${dotX}" cy="${dotY}" r="8" fill="#ffd32a" stroke="#fff" stroke-width="2"/>`;
  grid+=tx(dotX+14,dotY-5,`(${px},${py})`,'#ffd32a',11,'start');

  return mkQ('coordinates',diff,text,answer,svgWrap(300,260,grid),hint,'🗺️ קואורדינטות');
}

// ══════════════════════════════════════════════
// MEASUREMENT — מדידה (אורך, משקל, זמן, נפח)
// ══════════════════════════════════════════════
function gen_measurement(diff) {
  const grade = window._grade || 'ב';
  const types = grade==='א'||grade==='ב' ? ['length','time'] :
                grade==='ג' ? ['length','weight','time'] :
                grade==='ד' ? ['length','weight','time','volume'] :
                              ['length','weight','time','volume','convert'];
  const type = _pick(types);
  const c = pc(_rnd(0,7));
  let answer, text, hint, body;

  if(type==='length'){
    const units=[
      {from:'מ\'',to:'ס"מ',factor:100},
      {from:'ק"מ',to:'מ\'',factor:1000},
      {from:'ס"מ',to:'מ"מ',factor:10},
    ];
    const u=diff==='easy'?units[0]:_pick(units);
    const val=diff==='easy'?_rnd(1,8):diff==='medium'?_rnd(1,12):_rnd(1,20);
    answer=val*u.factor;
    text=`${val} ${u.from} = כמה ${u.to}?`;
    hint=`💡 1 ${u.from} = ${u.factor} ${u.to}. ${val} × ${u.factor} = ${answer}`;
    body=`${tx(150,80,'📏 מדידה','#7ec8ff',22)}
      ${tx(150,130,val+' '+u.from,'#fff',28)}
      ${tx(150,165,'= ? '+u.to,'#ffd32a',24)}
      ${tx(150,200,'×'+u.factor,'#ffffff66',16)}`;
  } else if(type==='weight'){
    const u=diff==='easy'||diff==='medium'?{from:'ק"ג',to:'גרם',factor:1000}:{from:'ק"ג',to:'מ"ג',factor:1000000};
    const val=_rnd(1,diff==='easy'?5:diff==='medium'?10:20);
    answer=val*u.factor;
    text=`${val} ${u.from} = כמה ${u.to}?`;
    hint=`💡 1 ק"ג = 1000 גרם. ${val} × ${u.factor} = ${answer}`;
    body=`${tx(150,80,'⚖️ משקל','#7effb2',22)}
      ${tx(150,130,val+' '+u.from,'#fff',28)}
      ${tx(150,165,'= ? '+u.to,'#ffd32a',24)}
      ${tx(150,200,'1 ק"ג = 1000 גרם','#ffffff55',14)}`;
  } else if(type==='time'){
    const cases=[
      {q:'שעה = כמה דקות?',a:60,h:'1 שעה = 60 דקות'},
      {q:'דקה = כמה שניות?',a:60,h:'1 דקה = 60 שניות'},
      {q:'שעה = כמה שניות?',a:3600,h:'60 × 60 = 3600 שניות'},
      {q:'יום = כמה שעות?',a:24,h:'1 יום = 24 שעות'},
      {q:'שבוע = כמה ימים?',a:7,h:'1 שבוע = 7 ימים'},
      {q:'שנה = כמה חודשים?',a:12,h:'1 שנה = 12 חודשים'},
    ];
    const pool = diff==='easy'?cases.slice(0,3):diff==='medium'?cases.slice(0,5):cases;
    const ch=_pick(pool);
    answer=ch.a;
    text=ch.q;
    hint=`💡 ${ch.h}`;
    const mins=_rnd(1,5),hrs=_rnd(1,12);
    body=`${tx(150,80,'⏰ זמן','#ffe07e',22)}
      ${tx(150,125,ch.q,'#fff',16)}
      ${tx(150,165,'= ?','#ffd32a',28)}
      ${tx(150,205,ch.h,'#ffffff55',13)}`;
  } else if(type==='volume'){
    const val=_rnd(1,diff==='easy'?5:diff==='medium'?10:20);
    const toLitre=Math.random()<0.5;
    answer=toLitre?val*1000:val;
    text=toLitre?`${val} ליטר = כמה מיליליטר?`:`${val*1000} מ"ל = כמה ליטר?`;
    hint=toLitre?`💡 1 ליטר = 1000 מ"ל. ${val} × 1000 = ${answer}`:`💡 ${val*1000} ÷ 1000 = ${val} ליטר`;
    if(!toLitre) answer=val;
    body=`${tx(150,80,'🧪 נפח','#c07eff',22)}
      ${tx(150,130,text.split('=')[0],'#fff',20)}
      ${tx(150,165,'= ? '+(toLitre?'מ"ל':'ליטר'),'#ffd32a',24)}
      ${tx(150,200,'1 ליטר = 1000 מ"ל','#ffffff55',14)}`;
  } else { // convert (multi-step)
    const from=_rnd(1,5),m=_rnd(1,5);
    answer=from*1000+m*100;
    text=`${from} ק"מ ו-${m} מאות מטר = כמה מטר בסך הכל?`;
    hint=`💡 ${from}ק"מ = ${from*1000}מ'. עוד ${m*100}מ'. סך הכל = ${answer}מ'`;
    body=`${tx(150,80,'📐 המרה','#ff9f7e',22)}
      ${tx(150,125,from+' ק"מ + '+m*100+' מ\'','#fff',18)}
      ${tx(150,165,'= ? מ\'','#ffd32a',24)}
      ${tx(150,200,'1 ק"מ = 1000 מ\'','#ffffff55',14)}`;
  }
  return mkQ('measurement',diff,text,answer,svgWrap(300,230,body),hint,'📏 מדידה');
}

// ══════════════════════════════════════════════
// ROUTER
// ══════════════════════════════════════════════
window.genGeometryCategory = function(cat, diff) {
  diff = diff || 'easy';
  switch(cat) {
    case 'shapes2d':    return gen_shapes2d(diff);
    case 'symmetry':    return gen_symmetry(diff);
    case 'perimeter':   return gen_perimeter(diff);
    case 'area':        return gen_area(diff);
    case 'angles':      return gen_angles(diff);
    case 'shapes3d':    return gen_shapes3d(diff);
    case 'coordinates': return gen_coordinates(diff);
    case 'measurement': return gen_measurement(diff);
    default:            return gen_shapes2d(diff);
  }
};

})();
