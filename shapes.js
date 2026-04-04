// ══════════════════════════════════════════════════════════════
// shapes.js — Interactive Geometry Questions v2
// Unlocks from Grade 2. 5+ question types per grade.
// Drag, slider, and live interactive HTML questions.
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

// ────────────────────────────────────────────────────────────
// GRADE 2
// ────────────────────────────────────────────────────────────
function g2_countSides(diff){
  const pool=[
    {n:'משולש',s:3,pts:'150,30 260,200 40,200',ci:0},
    {n:'ריבוע',s:4,pts:'70,50 230,50 230,190 70,190',ci:1},
    {n:'מחומש',s:5,pts:'150,25 245,95 210,205 90,205 55,95',ci:3},
    {n:'משושה',s:6,pts:'150,22 233,68 233,162 150,208 67,162 67,68',ci:4},
    {n:'מלבן',s:4,pts:'50,70 250,70 250,170 50,170',ci:2},
    {n:'מעוין',s:4,pts:'150,25 255,110 150,195 45,110',ci:6},
    {n:'משולש ישר-זווית',s:3,pts:'50,190 250,190 50,50',ci:5},
  ];
  const sh=_pick(pool),c=pc(sh.ci);
  const ask=diff==='hard'&&Math.random()<.5?'corners':'sides';
  const answer=sh.s;
  const ptsArr=sh.pts.split(' ').map(p=>p.split(',').map(Number));
  let markers='';
  for(let i=0;i<ptsArr.length;i++){
    const a=ptsArr[i],b=ptsArr[(i+1)%ptsArr.length];
    const mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2;
    markers+=`<circle cx="${mx}" cy="${my}" r="13" fill="${c.s}" opacity=".92" style="cursor:pointer" onclick="this.style.fill='#ffd32a';this.nextSibling.style.fill='#000'"/>`;
    markers+=tx(mx,my+5,i+1,'#fff',12);
  }
  return {type:'shapes',cat:'shapes',diff,
    text:ask==='sides'?`כמה צלעות יש ל${sh.n}? (לחץ על הצלעות לספור!)`:`כמה פינות יש ל${sh.n}?`,
    answer,pts:ptsForQ('shapes',diff),
    shapeHtml:svgWrap(300,240,`${glowDef(c.f,'g2s')}
      <polygon points="${sh.pts}" fill="${c.f}88" stroke="${c.s}" stroke-width="3.5" filter="url(#g2s)">
        <animate attributeName="opacity" values="0;1" dur=".4s" fill="freeze"/>
      </polygon>${markers}
      ${tx(150,232,'לחץ על כל צלע לספור','#ffffff55',10)}`),
    hint:{type:'text',msg:'💡 ספור את הנקודות — לחץ כל אחת!'},
    showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''};
}

function g2_symmetry(diff){
  const pool=[
    {n:'ריבוע',axes:4,pts:'80,60 220,60 220,180 80,180',ci:1},
    {n:'מלבן',axes:2,pts:'40,80 260,80 260,165 40,165',ci:2},
    {n:'משולש שווה-צלעות',axes:3,pts:'150,30 255,195 45,195',ci:0},
    {n:'מעוין',axes:2,pts:'150,25 255,110 150,195 45,110',ci:6},
  ];
  const sh=_pick(pool),c=pc(sh.ci);
  const answer=sh.axes;
  let axisLines='';
  const axisColors=['#ffd32a','#7ec8ff','#7effb2','#c07eff'];
  if(sh.axes>=1) axisLines+=`<line x1="150" y1="20" x2="150" y2="215" stroke="${axisColors[0]}" stroke-width="2" stroke-dasharray="7,4" opacity=".7"/>`;
  if(sh.axes>=2) axisLines+=`<line x1="25" y1="113" x2="275" y2="113" stroke="${axisColors[1]}" stroke-width="2" stroke-dasharray="7,4" opacity=".7"/>`;
  if(sh.axes>=3) axisLines+=`<line x1="45" y1="45" x2="255" y2="185" stroke="${axisColors[2]}" stroke-width="2" stroke-dasharray="7,4" opacity=".7"/>`;
  if(sh.axes>=4) axisLines+=`<line x1="255" y1="45" x2="45" y2="185" stroke="${axisColors[3]}" stroke-width="2" stroke-dasharray="7,4" opacity=".7"/>`;
  return {type:'shapes',cat:'shapes',diff,
    text:`כמה צירי סימטריה יש ל${sh.n}?`,answer,
    pts:ptsForQ('shapes',diff),
    shapeHtml:svgWrap(300,230,`
      <polygon points="${sh.pts}" fill="${c.f}88" stroke="${c.s}" stroke-width="3"/>
      ${axisLines}`),
    hint:{type:'text',msg:'💡 ציר סימטריה חוצה הצורה לשני חצאים שווים'},
    showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''};
}

function g2_equalParts(diff){
  const total=diff==='easy'?_pick([2,4]):diff==='medium'?_pick([3,4,6]):_pick([3,5,6,8]);
  const asked=_rnd(1,total-1);
  const html=`<div style="text-align:center;padding:8px 0">
    <canvas id="eqC" width="280" height="150" style="border-radius:12px;background:rgba(255,255,255,.04);display:block;margin:0 auto"></canvas>
    <div style="margin-top:8px;color:#ffd32a;font-family:Rubik,sans-serif;font-size:.88rem;font-weight:700">
      🍕 ${total} חתיכות — כמה מסומנות?
    </div>
  </div>
  <script>(function(){
    const cv=document.getElementById('eqC');if(!cv)return;
    const ctx=cv.getContext('2d'),cx=140,cy=80,r=65,t=${total},k=${asked};
    const cols=['#ff7eb388','#7ec8ff88','#7effb288','#ffe07e88','#c07eff88','#ff9f7e88','#7efff088','#ffeb7e88'];
    for(let i=0;i<t;i++){
      const a1=-Math.PI/2+i*(2*Math.PI/t),a2=a1+2*Math.PI/t;
      ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,a1,a2);ctx.closePath();
      ctx.fillStyle=i<k?cols[i%cols.length]:'rgba(255,255,255,.06)';ctx.fill();
      ctx.strokeStyle='rgba(255,255,255,.3)';ctx.lineWidth=2;ctx.stroke();
    }
    ctx.beginPath();ctx.arc(cx,cy,r,0,2*Math.PI);ctx.strokeStyle='rgba(255,255,255,.4)';ctx.lineWidth=3;ctx.stroke();
  })();<\/script>`;
  return {type:'shapes',cat:'shapes',diff,
    text:`הפיצה מחולקת ל-${total} חתיכות שוות. ${asked} חסומנות. כמה מסומנות?`,
    answer:asked,pts:ptsForQ('shapes',diff),
    shapeHtml:iWidget(html),
    hint:{type:'text',msg:'💡 ספור את החתיכות הצבעוניות'},
    showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''};
}

function g2_compareAreas(diff){
  const a=diff==='easy'?_rnd(2,5):_rnd(2,8);
  const b=diff==='easy'?_rnd(2,5):_rnd(2,8);
  const answer=Math.max(a,b)*Math.max(a,b);
  const cell=22,aS=a*cell,bS=b*cell;
  let gA='',gB='';
  for(let r=0;r<a;r++) for(let c=0;c<a;c++)
    gA+=`<rect x="${c*cell+15}" y="${r*cell+10}" width="${cell}" height="${cell}" fill="${PAL.f[1]}99" stroke="rgba(255,255,255,.3)" stroke-width="1"/>`;
  for(let r=0;r<b;r++) for(let c=0;c<b;c++)
    gB+=`<rect x="${c*cell+165}" y="${r*cell+10}" width="${cell}" height="${cell}" fill="${PAL.f[3]}99" stroke="rgba(255,255,255,.3)" stroke-width="1"/>`;
  const svgH=Math.max(a,b)*cell+45;
  return {type:'shapes',cat:'shapes',diff,
    text:`כמה ריבועים יש לצורה הגדולה יותר?`,answer,
    pts:ptsForQ('shapes',diff),
    shapeHtml:svgWrap(310,svgH,`${gA}${gB}
      ${tx(15+aS/2,svgH-8,`${a}×${a}=${a*a}`,'#7ec8ff',11)}
      ${tx(165+bS/2,svgH-8,`${b}×${b}=${b*b}`,'#ffe07e',11)}`),
    hint:{type:'text',msg:'💡 ספור ריבועים בכל צורה'},
    showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''};
}

function g2_angleSlider(diff){
  const targets=diff==='easy'?[90]:diff==='medium'?[45,90,135]:[30,60,90,120,150];
  const target=_pick(targets);
  const html=`<div style="text-align:center;padding:4px">
    <canvas id="asC" width="280" height="160" style="display:block;margin:0 auto;border-radius:12px;background:rgba(255,255,255,.04)"></canvas>
    <div style="margin-top:8px">
      <input type="range" id="asSlider" min="5" max="175" value="90" step="5"
        style="width:85%;accent-color:#ffd32a" oninput="window._drawAS(this.value)">
    </div>
    <div id="asVal" style="color:#ffd32a;font-family:Rubik,sans-serif;font-size:1.3rem;font-weight:900;margin-top:4px">90°</div>
    <div style="color:#ffffff55;font-size:.75rem;font-family:Rubik,sans-serif">גרור לזווית הנכונה, אז כתוב את המספר למטה</div>
  </div>
  <script>
  window._drawAS=function(deg){
    deg=parseInt(deg);document.getElementById('asVal').textContent=deg+'°';
    const cv=document.getElementById('asC');if(!cv)return;
    const ctx=cv.getContext('2d'),cx=140,cy=130,r=95;
    ctx.clearRect(0,0,280,160);
    const rad=deg*Math.PI/180;
    ctx.strokeStyle='rgba(255,255,255,.1)';ctx.lineWidth=1;
    for(let a=0;a<360;a+=15){const rr=a*Math.PI/180;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+r*Math.cos(-rr),cy+r*Math.sin(-rr));ctx.stroke();}
    ctx.strokeStyle='#7ec8ff';ctx.lineWidth=5;ctx.lineCap='round';
    ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+r,cy);ctx.stroke();
    ctx.strokeStyle='#ff7eb3';ctx.lineWidth=5;
    ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+r*Math.cos(-rad),cy+r*Math.sin(-rad));ctx.stroke();
    ctx.beginPath();ctx.arc(cx,cy,38,-rad,0,true);
    ctx.strokeStyle='#ffd32a';ctx.lineWidth=2.5;ctx.stroke();ctx.fillStyle='#ffd32a22';ctx.fill();
    ctx.fillStyle='#ffd32a';ctx.font='bold 14px Rubik';ctx.textAlign='center';
    ctx.fillText(deg+'°',cx+55*Math.cos(-rad/2),cy+55*Math.sin(-rad/2)-4);
    for(let a=0;a<=360;a+=30){ctx.fillStyle='rgba(255,255,255,.35)';ctx.font='9px Rubik';ctx.textAlign='center';ctx.fillText(a+'°',cx+(r+12)*Math.cos(-a*Math.PI/180),cy+(r+12)*Math.sin(-a*Math.PI/180)+4);}
    window._shapeAnswer&&window._shapeAnswer(deg);
  };window._drawAS(90);
  <\/script>`;
  return {type:'shapes',cat:'shapes',diff,
    text:`גרור לזווית ${target}°, אחר כך כתוב ${target}`,answer:target,
    pts:ptsForQ('shapes',diff),
    shapeHtml:iWidget(html),
    hint:{type:'text',msg:'💡 זווית ישרה=90°, חדה<90°, קהה>90°'},
    showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''};
}

function g2_oddShape(diff){
  const fams=[
    {name:'משולשים',shapes:['▲','△','🔺'],odd:'⬛',oddName:'ריבוע'},
    {name:'מרובעים',shapes:['⬜','▭','◻'],odd:'▲',oddName:'משולש'},
    {name:'עיגולים',shapes:['⭕','🔵','⚪'],odd:'⬜',oddName:'ריבוע'},
  ];
  const fam=_pick(fams);
  const all=[...fam.shapes,fam.odd].sort(()=>Math.random()-.5);
  const oddIdx=all.indexOf(fam.odd);
  const answer=oddIdx+1;
  const xs=[50,120,190,260];
  let body='';
  all.forEach((s,i)=>{body+=tx(xs[i],95,s,'#fff',34)+tx(xs[i],120,i+1,'#ffffff88',11);});
  return {type:'shapes',cat:'shapes',diff,
    text:`איזו צורה לא שייכת? (${fam.name}) — כתוב את מספרה`,answer,
    pts:ptsForQ('shapes',diff),
    shapeHtml:svgWrap(310,135,`${body}${tx(155,132,'כתוב מספר הצורה השונה','#ffffff44',10)}`),
    hint:{type:'text',msg:'💡 חפש צורה שנראית שונה מהשאר'},
    showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''};
}

// ────────────────────────────────────────────────────────────
// GRADE 3
// ────────────────────────────────────────────────────────────
function g3_perimeter(diff){
  const type=_pick(['square','rect','triangle']);
  let answer,body,text,hint;
  if(type==='square'){
    const s=diff==='easy'?_rnd(2,8):diff==='medium'?_rnd(5,15):_rnd(8,25);
    answer=4*s;text=`מה היקף הריבוע שצלעו ${s} ס"מ?`;hint=`💡 4×${s}=${answer}`;
    const side=140,ox=80,oy=40;
    body=`<rect x="${ox}" y="${oy}" width="${side}" height="${side}" fill="${PAL.f[1]}88" stroke="${PAL.s[1]}" stroke-width="3" rx="4"/>
      ${rightBox(ox,oy+side-10)}${rightBox(ox+side-10,oy)}${rightBox(ox,oy)}${rightBox(ox+side-10,oy+side-10)}
      ${dimLine(ox,oy-16,ox+side,oy-16,s+' ס"מ',PAL.s[1])}
      ${dimLine(ox+side+10,oy,ox+side+10,oy+side,s+' ס"מ',PAL.s[1])}
      ${tx(ox+side/2,oy+side/2+7,'?','#ffffffcc',22)}`;
  }else if(type==='rect'){
    const w=diff==='easy'?_rnd(3,8):diff==='medium'?_rnd(5,15):_rnd(6,22);
    const h=_rnd(2,Math.max(3,w-1));
    answer=2*(w+h);text=`מה היקף המלבן? (רוחב ${w}, גובה ${h})`;hint=`💡 2×(${w}+${h})=${answer}`;
    const pw=Math.min(w*12,200),ph=Math.min(Math.max(h*12,50),140);
    const ox=(300-pw)/2,oy=(210-ph)/2;
    body=`<rect x="${ox}" y="${oy}" width="${pw}" height="${ph}" fill="${PAL.f[2]}88" stroke="${PAL.s[2]}" stroke-width="3" rx="4"/>
      ${dimLine(ox,oy-16,ox+pw,oy-16,w+' ס"מ',PAL.s[2])}
      ${dimLine(ox-18,oy,ox-18,oy+ph,h+' ס"מ',PAL.s[2])}
      ${tx(ox+pw/2,oy+ph/2+7,'?','#ffffffcc',20)}`;
  }else{
    const a=_rnd(3,diff==='hard'?18:10),b=_rnd(3,diff==='hard'?15:10),c=_rnd(3,diff==='hard'?14:9);
    answer=a+b+c;text=`מה היקף המשולש? (${a}, ${b}, ${c})`;hint=`💡 ${a}+${b}+${c}=${answer}`;
    body=`<polygon points="150,28 262,198 38,198" fill="${PAL.f[0]}88" stroke="${PAL.s[0]}" stroke-width="3"/>
      ${tx(150,220,a+' ס"מ',PAL.s[0],13)}
      ${tx(215,108,b+' ס"מ',PAL.s[0],13,'middle')}
      ${tx(85,108,c+' ס"מ',PAL.s[0],13,'middle')}
      ${tx(150,130,'?','#ffffffcc',22)}`;
  }
  return {type:'shapes',cat:'shapes',diff,text,answer,pts:ptsForQ('shapes',diff),
    shapeHtml:svgWrap(300,240,body),hint:{type:'text',msg:hint},
    showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''};
}

function g3_gridArea(diff){
  const cols=diff==='easy'?_rnd(2,5):diff==='medium'?_rnd(3,8):_rnd(4,11);
  const rows=diff==='easy'?_rnd(2,5):diff==='medium'?_rnd(2,7):_rnd(3,9);
  const answer=cols*rows;
  const cell=Math.min(Math.floor(200/Math.max(cols,rows)),28);
  const gw=cols*cell,gh=rows*cell,ox=(300-gw)/2,oy=Math.max((220-gh)/2,20);
  let grid='';
  for(let r=0;r<rows;r++) for(let c=0;c<cols;c++){
    const hue=((r*cols+c)/(rows*cols)*80+160)|0;
    grid+=`<rect x="${ox+c*cell}" y="${oy+r*cell}" width="${cell}" height="${cell}" fill="hsla(${hue},65%,62%,.55)" stroke="rgba(255,255,255,.22)" stroke-width="1"/>`;
  }
  return {type:'shapes',cat:'shapes',diff,
    text:`ספור ריבועים בגריד — כמה בסך הכל?`,answer,
    pts:ptsForQ('shapes',diff),
    shapeHtml:svgWrap(300,230,`${grid}
      <rect x="${ox}" y="${oy}" width="${gw}" height="${gh}" fill="none" stroke="${PAL.s[1]}" stroke-width="2.5" rx="3"/>
      ${tx(ox+gw/2,oy-6,cols+'',PAL.s[1],12)}
      ${tx(ox-6,oy+gh/2,rows+'',PAL.s[2],12,'end')}`),
    hint:{type:'text',msg:`💡 שורות×עמודות = ${rows}×${cols}`},
    showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''};
}

function g3_angleType(diff){
  const cases=[
    {deg:90,name:'ישרה',col:'#7ec8ff'},{deg:45,name:'חדה',col:'#7effb2'},
    {deg:30,name:'חדה',col:'#7effb2'},{deg:60,name:'חדה',col:'#7effb2'},
    {deg:120,name:'קהה',col:'#ff7eb3'},{deg:135,name:'קהה',col:'#ff7eb3'},
    {deg:150,name:'קהה',col:'#ff7eb3'},
  ];
  const filtered=diff==='easy'?cases.filter(c=>c.deg===90||c.deg===45):cases;
  const ch=_pick(filtered);
  const ansMap={'חדה':1,'ישרה':2,'קהה':3};
  const answer=ansMap[ch.name];
  const cx=150,cy=155,r=100,rad=ch.deg*Math.PI/180;
  const x2=cx+r*Math.cos(-rad),y2=cy+r*Math.sin(-rad);
  return {type:'shapes',cat:'shapes',diff,
    text:`איזה סוג זווית? (1=חדה, 2=ישרה, 3=קהה)`,answer,
    pts:ptsForQ('shapes',diff),
    shapeHtml:svgWrap(300,200,`${glowDef(ch.col,'ag3')}
      <line x1="${cx}" y1="${cy}" x2="${cx+r}" y2="${cy}" stroke="${ch.col}" stroke-width="5" stroke-linecap="round" filter="url(#ag3)"/>
      <line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="${ch.col}" stroke-width="5" stroke-linecap="round" filter="url(#ag3)"/>
      ${arcPath(cx,cy,40,-rad,0,ch.col)}
      ${ch.deg===90?rightBox(cx,cy-11,11):''}
      ${tx(cx+60*Math.cos(-rad/2),cy+60*Math.sin(-rad/2),ch.deg+'°','#ffd32a',17)}
      <circle cx="${cx}" cy="${cy}" r="6" fill="${ch.col}"/>
      ${tx(55,190,'1=חדה','#7effb2',11,'start')}${tx(150,190,'2=ישרה','#7ec8ff',11)}${tx(245,190,'3=קהה','#ff7eb3',11,'end')}`),
    hint:{type:'text',msg:'💡 חדה<90°, ישרה=90°, קהה>90°'},
    showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''};
}

function g3_dragAngle(diff){
  const target=diff==='easy'?_pick([45,90,135]):diff==='medium'?_pick([30,60,90,120,150]):_rnd(2,17)*10;
  const html=`<div style="text-align:center">
    <canvas id="daC" width="280" height="165" style="display:block;margin:0 auto;border-radius:12px;background:rgba(255,255,255,.04);cursor:crosshair"></canvas>
    <div id="daInfo" style="color:#ffd32a;font-family:Rubik,sans-serif;font-size:1.2rem;font-weight:900;margin-top:6px">0°</div>
    <div style="color:#ffffff55;font-size:.75rem;font-family:Rubik,sans-serif">גרור הנקודה הצהובה ל-${target}°, אחר כך כתוב ${target} למטה</div>
  </div>
  <script>(function(){
    const cv=document.getElementById('daC'),ctx=cv.getContext('2d'),cx=100,cy=130,r=90;
    let drag=false,cur=45;
    function draw(deg){
      ctx.clearRect(0,0,280,165);
      const rad=deg*Math.PI/180;
      ctx.strokeStyle='rgba(255,255,255,.1)';ctx.lineWidth=1;
      for(let a=0;a<360;a+=15){const rr=a*Math.PI/180;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+r*Math.cos(-rr),cy+r*Math.sin(-rr));ctx.stroke();}
      ctx.strokeStyle='#7ec8ff';ctx.lineWidth=4.5;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+r,cy);ctx.stroke();
      ctx.strokeStyle='#ff7eb3';ctx.lineWidth=4.5;
      ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+r*Math.cos(-rad),cy+r*Math.sin(-rad));ctx.stroke();
      ctx.beginPath();ctx.arc(cx,cy,38,-rad,0,true);ctx.strokeStyle='#ffd32a';ctx.lineWidth=2.5;ctx.stroke();ctx.fillStyle='#ffd32a22';ctx.fill();
      const px=cx+r*Math.cos(-rad),py=cy+r*Math.sin(-rad);
      ctx.beginPath();ctx.arc(px,py,11,0,2*Math.PI);ctx.fillStyle='#ffd32a';ctx.fill();
      ctx.fillStyle='rgba(255,255,255,.35)';ctx.font='9px Rubik';ctx.textAlign='left';
      for(let a=0;a<=180;a+=30)ctx.fillText(a+'°',cx+(r+13)*Math.cos(-a*Math.PI/180)-5,cy+(r+13)*Math.sin(-a*Math.PI/180)+4);
      document.getElementById('daInfo').textContent=Math.round(deg)+'°';
      window._shapeAnswer&&window._shapeAnswer(Math.round(deg));
    }
    function ga(e){const rect=cv.getBoundingClientRect();const ex=(e.touches?e.touches[0].clientX:e.clientX)-rect.left,ey=(e.touches?e.touches[0].clientY:e.clientY)-rect.top;return Math.max(1,Math.min(179,Math.round(Math.atan2(-(ey-cy),ex-cx)*180/Math.PI)));}
    cv.addEventListener('mousedown',e=>{drag=true;draw(ga(e));});
    cv.addEventListener('touchstart',e=>{drag=true;draw(ga(e));e.preventDefault();},{passive:false});
    cv.addEventListener('mousemove',e=>{if(drag){cur=ga(e);draw(cur);}});
    cv.addEventListener('touchmove',e=>{if(drag){cur=ga(e);draw(cur);}e.preventDefault();},{passive:false});
    ['mouseup','mouseleave','touchend'].forEach(ev=>cv.addEventListener(ev,()=>drag=false));
    draw(45);
  })();<\/script>`;
  return {type:'shapes',cat:'shapes',diff,
    text:`גרור הנקודה הצהובה לזווית ${target}°, אחר כך כתוב ${target}`,answer:target,
    pts:ptsForQ('shapes',diff),shapeHtml:iWidget(html),
    hint:{type:'text',msg:`💡 גרור עד שתראה ${target}° על המסך`},
    showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''};
}

function g3_missingDim(diff){
  const isRect=Math.random()<.5;
  let answer,text,hint,body;
  if(!isRect){
    const s=diff==='easy'?_rnd(3,8):diff==='medium'?_rnd(5,15):_rnd(7,25);
    const perim=4*s;answer=s;
    text=`היקף ריבוע הוא ${perim}. מה אורך צלע?`;hint=`💡 ${perim}÷4=${s}`;
    const sd=140,ox=80,oy=38;
    body=`<rect x="${ox}" y="${oy}" width="${sd}" height="${sd}" fill="${PAL.f[1]}88" stroke="${PAL.s[1]}" stroke-width="3" rx="4"/>
      ${tx(ox+sd/2,oy-10,'?','#ffd32a',18)}
      ${tx(ox+sd+14,oy+sd/2,'?','#ffd32a',18)}
      ${tx(ox+sd/2,oy+sd/2+8,'היקף='+perim,'#ffffffcc',15)}`;
  }else{
    const w=diff==='easy'?_rnd(3,9):_rnd(5,18);
    const h=_rnd(2,Math.max(3,w-1));const perim=2*(w+h);answer=h;
    text=`היקף מלבן הוא ${perim}, רוחב=${w}. מה גובהו?`;hint=`💡 ${perim}÷2-${w}=${h}`;
    const pw=Math.min(w*11,200),ph=Math.min(Math.max(h*11,55),140);
    const ox=(300-pw)/2,oy=(215-ph)/2;
    body=`<rect x="${ox}" y="${oy}" width="${pw}" height="${ph}" fill="${PAL.f[2]}88" stroke="${PAL.s[2]}" stroke-width="3" rx="4"/>
      ${dimLine(ox,oy-15,ox+pw,oy-15,w+'',PAL.s[2])}
      ${tx(ox-14,oy+ph/2,'?','#ffd32a',18)}
      ${tx(ox+pw/2,oy+ph/2+8,'היקף='+perim,'#ffffffcc',13)}`;
  }
  return {type:'shapes',cat:'shapes',diff,text,answer,pts:ptsForQ('shapes',diff),
    shapeHtml:svgWrap(300,225,body),hint:{type:'text',msg:hint},
    showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''};
}

function g3_pattern(diff){
  const seq=[3,4,5,6,7,8];
  const start=_rnd(0,3),shown=seq.slice(start,start+3),next=seq[start+3];
  const polys=['150,30 260,200 40,200','70,50 230,50 230,190 70,190','150,25 245,95 210,205 90,205 55,95','150,22 233,68 233,162 150,208 67,162 67,68','150,20 224,65 242,155 196,210 104,210 58,155 76,65','150,18 211,48 240,113 223,183 150,210 77,183 60,113 89,48'];
  const names=['משולש','ריבוע','מחומש','משושה','משבע','משומן'];
  let body='';
  shown.forEach((s,i)=>{
    const ci=s-3,c=pc(ci),sc=0.38,pts=polys[ci].split(' ').map(p=>p.split(',').map(Number));
    const shifted=pts.map(([x,y])=>`${x*sc+i*96+8},${y*sc+18}`).join(' ');
    body+=`<polygon points="${shifted}" fill="${c.f}88" stroke="${c.s}" stroke-width="2"/>`;
    body+=tx(i*96+50,118,s+'','#ffffff99',12);
  });
  body+=tx(300,68,'?','#ffd32a',34)+tx(300,118,'?','#ffffff99',12);
  body+=tx(155,140,'כמה צלעות לצורה הבאה?','#ffffff55',11);
  return {type:'shapes',cat:'shapes',diff,
    text:`דפוס: ${shown.map(s=>names[s-3]).join(' → ')} → ? כמה צלעות?`,answer:next,
    pts:ptsForQ('shapes',diff),shapeHtml:svgWrap(340,155,body),
    hint:{type:'text',msg:'💡 כל פעם מוסיפים צלע אחת'},
    showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''};
}

// ────────────────────────────────────────────────────────────
// GRADE 4
// ────────────────────────────────────────────────────────────
function g4_rectArea(diff){
  const w=diff==='easy'?_rnd(3,9):diff==='medium'?_rnd(5,16):_rnd(7,25);
  const h=diff==='easy'?_rnd(2,8):diff==='medium'?_rnd(4,14):_rnd(5,20);
  const ask=diff==='hard'?_pick(['area','perim']):'area';
  const answer=ask==='area'?w*h:2*(w+h);
  const pw=Math.min(w*11,200),ph=Math.min(Math.max(h*11,55),150);
  const ox=(300-pw)/2,oy=(215-ph)/2;
  return {type:'shapes',cat:'shapes',diff,
    text:ask==='area'?`מה שטח המלבן? (${w}×${h})`:`מה היקף המלבן? (${w},${h})`,answer,
    pts:ptsForQ('shapes',diff),
    shapeHtml:svgWrap(300,215,`<rect x="${ox}" y="${oy}" width="${pw}" height="${ph}"
        fill="${PAL.f[2]}88" stroke="${PAL.s[2]}" stroke-width="3" rx="5">
        <animate attributeName="fill-opacity" values=".35;.72;.35" dur="2.5s" repeatCount="indefinite"/>
      </rect>
      ${dimLine(ox,oy-16,ox+pw,oy-16,w+' ס"מ',PAL.s[2])}
      ${dimLine(ox-18,oy,ox-18,oy+ph,h+' ס"מ',PAL.s[2])}
      ${tx(ox+pw/2,oy+ph/2+7,w+'×'+h+'=?','#ffffffdd',17)}`),
    hint:{type:'text',msg:ask==='area'?`💡 שטח=${w}×${h}`:`💡 היקף=2×(${w}+${h})`},
    showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''};
}

function g4_triArea(diff){
  let base,height;
  do{base=diff==='easy'?_rnd(2,8)*2:diff==='medium'?_rnd(3,12)*2:_rnd(4,18)*2;
    height=diff==='easy'?_rnd(2,7):diff==='medium'?_rnd(3,12):_rnd(4,18);}
  while((base*height)%2!==0);
  const answer=base*height/2;
  const bpx=Math.min(base*10,210),hpx=Math.min(Math.max(height*10,60),160);
  const ox=(300-bpx)/2,oy=18,tipX=ox+_rnd(bpx*.3|0,bpx*.7|0);
  return {type:'shapes',cat:'shapes',diff,
    text:`מה שטח המשולש? (בסיס ${base}, גובה ${height})`,answer,
    pts:ptsForQ('shapes',diff),
    shapeHtml:svgWrap(300,225,`${glowDef(PAL.f[0],'tg4')}
      <polygon points="${tipX},${oy} ${ox+bpx},${oy+hpx} ${ox},${oy+hpx}"
        fill="${PAL.f[0]}88" stroke="${PAL.s[0]}" stroke-width="3" filter="url(#tg4)">
        <animate attributeName="fill-opacity" values=".4;.78;.4" dur="2s" repeatCount="indefinite"/>
      </polygon>
      <line x1="${tipX}" y1="${oy}" x2="${tipX}" y2="${oy+hpx}" stroke="#ffd32a" stroke-width="2" stroke-dasharray="6,3"/>
      ${dimLine(ox,oy+hpx+14,ox+bpx,oy+hpx+14,base+'',PAL.s[0])}
      ${tx(tipX+14,oy+hpx/2,height+'','#ffd32a',13,'start')}
      ${tx(ox+bpx/2,oy+hpx/2+7,'?','#ffffffcc',22)}`),
    hint:{type:'text',msg:`💡 (${base}×${height})÷2=${answer}`},
    showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''};
}

function g4_dragResize(diff){
  const fw=diff==='easy'?_rnd(3,6):diff==='medium'?_rnd(4,10):_rnd(5,14);
  const th=diff==='easy'?_rnd(2,6):diff==='medium'?_rnd(3,10):_rnd(4,15);
  const answer=fw*th;
  const html=`<div style="text-align:center;padding:4px">
    <canvas id="rzC" width="280" height="145" style="display:block;margin:0 auto;border-radius:12px;background:rgba(255,255,255,.04)"></canvas>
    <div style="margin-top:8px;display:flex;align-items:center;gap:8px;justify-content:center">
      <span style="color:#7effb2;font-family:Rubik,sans-serif;font-size:.8rem">גובה:</span>
      <input type="range" id="rzSl" min="1" max="20" value="4" step="1"
        style="flex:1;max-width:160px;accent-color:#7effb2" oninput="window._rzD(this.value)">
      <span id="rzV" style="color:#ffd32a;font-weight:900;font-family:Rubik,sans-serif;min-width:22px">4</span>
    </div>
    <div id="rzA" style="color:#7ec8ff;font-family:Rubik,sans-serif;font-size:1rem;font-weight:700;margin-top:3px"></div>
    <div style="color:#ffffff44;font-size:.72rem;font-family:Rubik,sans-serif">כשהשטח=${answer}, כתוב אותו למטה</div>
  </div>
  <script>
  window._rzD=function(h){h=parseInt(h);
    const cv=document.getElementById('rzC');if(!cv)return;
    const ctx=cv.getContext('2d'),W=${fw},sc=Math.min(Math.floor(140/Math.max(W,h)),14);
    const pw=W*sc,ph=Math.min(h*sc,130),ox=(280-pw)/2,oy=8;
    ctx.clearRect(0,0,280,145);
    const g=ctx.createLinearGradient(ox,oy,ox+pw,oy+ph);
    g.addColorStop(0,'${PAL.f[2]}cc');g.addColorStop(1,'${PAL.f[1]}66');
    ctx.fillStyle=g;ctx.beginPath();ctx.roundRect(ox,oy,pw,ph,6);ctx.fill();
    ctx.strokeStyle='${PAL.s[2]}';ctx.lineWidth=2.5;ctx.stroke();
    ctx.fillStyle='#fff';ctx.font='bold 14px Rubik';ctx.textAlign='center';
    ctx.fillText(W+'×'+h+'='+W*h,ox+pw/2,oy+ph/2+(ph>28?6:-8));
    document.getElementById('rzV').textContent=h;
    document.getElementById('rzA').textContent='שטח = '+W+'×'+h+' = '+W*h;
    window._shapeAnswer&&window._shapeAnswer(W*h);
  };window._rzD(4);
  <\/script>`;
  return {type:'shapes',cat:'shapes',diff,
    text:`שנה גובה המלבן עד שהשטח יהיה ${answer} (רוחב קבוע ${fw}). כתוב ${answer}.`,answer,
    pts:ptsForQ('shapes',diff),shapeHtml:iWidget(html),
    hint:{type:'text',msg:`💡 ${fw}×גובה=${answer} → גובה=${th}`},
    showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''};
}

function g4_angleSumTri(diff){
  const a=_rnd(35,80),b=_rnd(25,100-a);const c=180-a-b;
  if(c<=5||c>=170) return g4_angleSumTri(diff);
  const hide=_pick([0,1,2]),vals=[a,b,c];
  const answer=vals[hide];
  const lbPos=[[150,58],[235,183],[62,183]];
  return {type:'shapes',cat:'shapes',diff,
    text:`סכום זוויות משולש = 180°. מצא את הזווית החסרה.`,answer,
    pts:ptsForQ('shapes',diff),
    shapeHtml:svgWrap(300,212,`${glowDef(PAL.f[0],'atg')}
      <polygon points="150,28 268,192 32,192" fill="${PAL.f[0]}88" stroke="${PAL.s[0]}" stroke-width="3" filter="url(#atg)"/>
      ${vals.map((v,i)=>tx(lbPos[i][0],lbPos[i][1],i===hide?'?°':v+'°','#ffd32a',17)).join('')}
      ${tx(150,118,'סכום = 180°','#ffffff44',12)}`),
    hint:{type:'text',msg:`💡 ${vals.filter((_,i)=>i!==hide).join('+')}+?=180`},
    showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''};
}

function g4_coordGrid(diff){
  const x=_rnd(1,diff==='easy'?5:diff==='medium'?8:10);
  const y=_rnd(1,diff==='easy'?5:diff==='medium'?8:10);
  const askX=Math.random()<.5,answer=askX?x:y;
  const cell=22,gW=10,gH=8,ox=32,oy=10;
  let grid='',nums='';
  for(let i=0;i<=gW;i++){grid+=`<line x1="${ox+i*cell}" y1="${oy}" x2="${ox+i*cell}" y2="${oy+gH*cell}" stroke="rgba(255,255,255,.1)" stroke-width="1"/>`;if(i>0)nums+=tx(ox+i*cell,oy+gH*cell+14,i,'#ffffff55',9);}
  for(let j=0;j<=gH;j++){grid+=`<line x1="${ox}" y1="${oy+j*cell}" x2="${ox+gW*cell}" y2="${oy+j*cell}" stroke="rgba(255,255,255,.1)" stroke-width="1"/>`;if(j>0)nums+=tx(ox-10,oy+(gH-j)*cell+5,j,'#ffffff55',9);}
  const px=ox+x*cell,py=oy+(gH-y)*cell;
  return {type:'shapes',cat:'shapes',diff,
    text:`מה ה${askX?'X':'Y'} של הנקודה על הגריד?`,answer,
    pts:ptsForQ('shapes',diff),
    shapeHtml:svgWrap(300,218,`${grid}${nums}
      <line x1="${px}" y1="${oy}" x2="${px}" y2="${oy+gH*cell}" stroke="${PAL.s[1]}" stroke-width="1.5" stroke-dasharray="4,3" opacity=".5"/>
      <line x1="${ox}" y1="${py}" x2="${ox+gW*cell}" y2="${py}" stroke="${PAL.s[2]}" stroke-width="1.5" stroke-dasharray="4,3" opacity=".5"/>
      <circle cx="${px}" cy="${py}" r="8" fill="#ffd32a"><animate attributeName="r" values="6;10;6" dur="1.2s" repeatCount="indefinite"/></circle>
      ${tx(ox-8,oy+gH*cell+14,'0','#ffffff55',9)}
      ${tx(ox+gW*cell/2,oy+gH*cell+26,'X →','#7ec8ff',10)}
      ${tx(14,oy+gH*cell/2,'Y','#7effb2',10)}`),
    hint:{type:'text',msg:`💡 הנקודה היא (${x},${y})`},
    showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''};
}

// ────────────────────────────────────────────────────────────
// GRADE 5
// ────────────────────────────────────────────────────────────
function g5_lShape(diff){
  const W=diff==='hard'?_rnd(7,16):_rnd(5,12),H=_rnd(4,W);
  const w=_rnd(2,W-2),h=_rnd(2,H-2);
  if(w>=W||h>=H) return g5_lShape(diff);
  const answer=W*H-w*h;
  const sc=Math.min(14,Math.floor(160/Math.max(W,H)));
  const Wp=W*sc,Hp=H*sc,wp=w*sc,hp=h*sc,ox=Math.max((300-Wp)/2,22),oy=Math.max((220-Hp)/2,18);
  return {type:'shapes',cat:'shapes',diff,
    text:`מה שטח צורת L? (${W}×${H} פחות ${w}×${h})`,answer,
    pts:ptsForQ('shapes',diff),
    shapeHtml:svgWrap(300,230,`
      <rect x="${ox}" y="${oy}" width="${Wp}" height="${Hp}" fill="${PAL.f[3]}77" stroke="${PAL.s[3]}" stroke-width="3" rx="4"/>
      <rect x="${ox+Wp-wp}" y="${oy}" width="${wp}" height="${hp}" fill="#0d0a20" stroke="${PAL.s[0]}" stroke-width="2" stroke-dasharray="6,3" rx="3"/>
      ${tx(ox+Wp/2,oy-6,W+'',PAL.s[3],12)}
      ${tx(ox-5,oy+Hp/2,H+'',PAL.s[3],12,'end')}
      ${tx(ox+Wp-wp/2,oy+hp/2+6,w+'×'+h,'#ffffff44',11)}
      ${tx(ox+Wp/3,oy+Hp/2+7,'?','#ffffffcc',22)}`),
    hint:{type:'text',msg:`💡 ${W}×${H}-${w}×${h}=${W*H}-${w*h}=${answer}`},
    showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''};
}

function g5_circleCirc(diff){
  const r=diff==='easy'?_rnd(2,5):diff==='medium'?_rnd(3,9):_rnd(4,14);
  const d=2*r,circ=Math.round(d*314)/100;
  const ask=Math.random()<.7;
  const answer=ask?Math.round(circ):d;
  const cr=90,cx=150,cy=112;
  return {type:'shapes',cat:'shapes',diff,
    text:ask?`היקף עיגול, רדיוס ${r} (π=3.14, עגל שלם)?`:`קוטר עיגול עם רדיוס ${r}?`,answer,
    pts:ptsForQ('shapes',diff),
    shapeHtml:svgWrap(300,220,`${glowDef(PAL.f[4],'cg5')}
      <circle cx="${cx}" cy="${cy}" r="${cr}" fill="${PAL.f[4]}44" stroke="${PAL.s[4]}" stroke-width="3" filter="url(#cg5)">
        <animate attributeName="fill-opacity" values=".3;.65;.3" dur="2s" repeatCount="indefinite"/>
      </circle>
      <line x1="${cx}" y1="${cy}" x2="${cx+cr}" y2="${cy}" stroke="#ffd32a" stroke-width="2.5"/>
      <line x1="${cx-cr}" y1="${cy}" x2="${cx+cr}" y2="${cy}" stroke="#7ec8ff" stroke-width="1.5" stroke-dasharray="4,4" opacity=".6"/>
      ${tx(cx+cr/2,cy-10,'r='+r,'#ffd32a',14)}
      ${tx(cx,cy+18,'d='+d,'#7ec8ff',12)}
      ${ask?tx(cx,cy+cr+18,'π×d=?','#ffffff77',13):''}
      <circle cx="${cx}" cy="${cy}" r="4" fill="#ffd32a"/>`),
    hint:{type:'text',msg:ask?`💡 3.14×${d}≈${Math.round(circ)}`:`💡 d=2×${r}=${d}`},
    showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''};
}

function g5_protractor(diff){
  const targets=diff==='easy'?[30,45,60,90,120]:diff==='medium'?[35,55,75,105,125,145]:[25,40,65,80,110,130,155];
  const target=_pick(targets);
  const html=`<div style="text-align:center">
    <canvas id="prtC" width="280" height="165" style="display:block;margin:0 auto;border-radius:12px;background:rgba(255,255,255,.04);cursor:crosshair"></canvas>
    <div id="prtV" style="color:#ffd32a;font-family:Rubik,sans-serif;font-size:1.2rem;font-weight:900;margin-top:5px">45°</div>
    <div style="color:#ffffff55;font-size:.75rem;font-family:Rubik,sans-serif">גרור לנקודה הצהובה ל-${target}°, כתוב ${target} למטה</div>
  </div>
  <script>(function(){
    const cv=document.getElementById('prtC'),ctx=cv.getContext('2d'),cx=140,cy=155,r=120;
    let drag=false,cur=45;
    function draw(deg){
      ctx.clearRect(0,0,280,165);
      ctx.beginPath();ctx.arc(cx,cy,r,-Math.PI,0);ctx.closePath();
      const g=ctx.createRadialGradient(cx,cy,0,cx,cy,r);
      g.addColorStop(0,'rgba(120,90,255,.14)');g.addColorStop(1,'rgba(120,90,255,.03)');
      ctx.fillStyle=g;ctx.fill();ctx.strokeStyle='rgba(255,255,255,.2)';ctx.lineWidth=2;ctx.stroke();
      for(let a=0;a<=180;a+=5){
        const len=a%30===0?16:a%10===0?10:5,rad=a*Math.PI/180;
        const ix=cx+r*Math.cos(Math.PI-rad),iy=cy-r*Math.sin(rad);
        const ox2=cx+(r-len)*Math.cos(Math.PI-rad),oy2=cy-(r-len)*Math.sin(rad);
        ctx.beginPath();ctx.moveTo(ix,iy);ctx.lineTo(ox2,oy2);
        ctx.strokeStyle=a%30===0?'rgba(255,255,255,.55)':'rgba(255,255,255,.2)';
        ctx.lineWidth=a%30===0?1.5:1;ctx.stroke();
        if(a%30===0){ctx.fillStyle='rgba(255,255,255,.5)';ctx.font='9px Rubik';ctx.textAlign='center';ctx.fillText(a,cx+(r+12)*Math.cos(Math.PI-rad),cy-(r+12)*Math.sin(rad)+4);}
      }
      ctx.strokeStyle='#7ec8ff';ctx.lineWidth=3.5;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx-r*.9,cy);ctx.stroke();
      const rad=deg*Math.PI/180;
      ctx.strokeStyle='#ff7eb3';ctx.lineWidth=3.5;
      ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+(r*.9)*Math.cos(Math.PI-rad),cy-(r*.9)*Math.sin(rad));ctx.stroke();
      ctx.beginPath();ctx.arc(cx,cy,36,Math.PI-rad,Math.PI);
      ctx.strokeStyle='#ffd32a';ctx.lineWidth=2.5;ctx.stroke();ctx.fillStyle='#ffd32a22';ctx.fill();
      ctx.fillStyle='#ffd32a';ctx.font='bold 13px Rubik';ctx.textAlign='center';
      ctx.fillText(deg+'°',cx-52*Math.cos(rad/2),cy-52*Math.sin(rad/2)-2);
      const ex=cx+(r*.9)*Math.cos(Math.PI-rad),ey=cy-(r*.9)*Math.sin(rad);
      ctx.beginPath();ctx.arc(ex,ey,11,0,2*Math.PI);ctx.fillStyle='#ffd32a';ctx.fill();
      document.getElementById('prtV').textContent=deg+'°';
      window._shapeAnswer&&window._shapeAnswer(deg);
    }
    function ga(e){const rect=cv.getBoundingClientRect();const ex=(e.touches?e.touches[0].clientX:e.clientX)-rect.left,ey=(e.touches?e.touches[0].clientY:e.clientY)-rect.top;const dx=ex-cx,dy=cy-ey;if(dy<-5)return null;return Math.max(1,Math.min(179,Math.round(Math.atan2(dy,dx)*180/Math.PI)));}
    cv.addEventListener('mousedown',e=>{drag=true;const d=ga(e);if(d)draw(d);});
    cv.addEventListener('touchstart',e=>{drag=true;const d=ga(e);if(d)draw(d);e.preventDefault();},{passive:false});
    cv.addEventListener('mousemove',e=>{if(!drag)return;const d=ga(e);if(d){cur=d;draw(d);}});
    cv.addEventListener('touchmove',e=>{if(!drag)return;const d=ga(e);if(d){cur=d;draw(d);}e.preventDefault();},{passive:false});
    ['mouseup','mouseleave','touchend'].forEach(ev=>cv.addEventListener(ev,()=>drag=false));
    draw(45);
  })();<\/script>`;
  return {type:'shapes',cat:'shapes',diff,
    text:`גרור הנקודה הצהובה על המד-זווית ל-${target}°, כתוב ${target}`,answer:target,
    pts:ptsForQ('shapes',diff),shapeHtml:iWidget(html),
    hint:{type:'text',msg:`💡 גרור הקצה הורוד עד ${target}°`},
    showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''};
}

function g5_pythagorasIntro(diff){
  const triples=[[3,4,5],[5,12,13],[8,15,17],[6,8,10],[9,12,15]];
  const sc=diff==='easy'?1:diff==='medium'?_rnd(1,2):_rnd(1,3);
  const [a,b,c]=_pick(triples).map(v=>v*sc);
  const hideC=Math.random()<.65;const answer=hideC?c:a;
  const bpx=Math.min(b*11,200),apx=Math.min(a*11,155),ox=45,oy=22;
  return {type:'shapes',cat:'shapes',diff,
    text:hideC?`a=${a}, b=${b}. מה c (היתר)?`:`c=${c}, b=${b}. מה a?`,answer,
    pts:ptsForQ('shapes',diff),
    shapeHtml:svgWrap(300,225,`${glowDef(PAL.f[5],'pyg')}
      <polygon points="${ox},${oy+apx} ${ox+bpx},${oy+apx} ${ox},${oy}" fill="${PAL.f[5]}77" stroke="${PAL.s[5]}" stroke-width="3" filter="url(#pyg)"/>
      ${rightBox(ox,oy+apx-11)}
      ${dimLine(ox,oy+apx+14,ox+bpx,oy+apx+14,'b='+b,PAL.s[5])}
      ${dimLine(ox-18,oy,ox-18,oy+apx,hideC?'a='+a:'a=?',PAL.s[5])}
      ${tx((ox+(ox+bpx))/2-8,oy+apx/2,hideC?'c=?':'c='+c,'#ffd32a',17)}
      ${tx(155,210,'a²+b²=c²','#ffffff44',12)}`),
    hint:{type:'text',msg:hideC?`💡 c=√(${a}²+${b}²)=${c}`:`💡 a=√(${c}²-${b}²)=${a}`},
    showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''};
}

function g5_extAngle(diff){
  const a=_rnd(40,80),b=_rnd(30,100-a);const c=180-a-b;
  if(c<=5) return g5_extAngle(diff);
  const ext=a+b;
  return {type:'shapes',cat:'shapes',diff,
    text:`זווית חיצונית של משולש = סכום 2 הזוויות הרחוקות. מה הזווית החיצונית?`,answer:ext,
    pts:ptsForQ('shapes',diff),
    shapeHtml:svgWrap(300,222,`
      <polygon points="50,192 250,192 150,52" fill="${PAL.f[0]}77" stroke="${PAL.s[0]}" stroke-width="3"/>
      ${tx(145,74,a+'°','#ffd32a',15)}${tx(218,182,b+'°','#ffd32a',15)}${tx(62,182,c+'°','#7ec8ff',15)}
      <line x1="50" y1="192" x2="10" y2="192" stroke="${PAL.s[3]}" stroke-width="2.5" stroke-dasharray="5,3"/>
      ${arcPath(50,192,32,180,180+ext,PAL.f[3])}
      ${tx(18,172,'?°','#ff7eb3',17)}
      ${tx(150,148,a+'+'+b+'=?','#ffffff55',12)}`),
    hint:{type:'text',msg:`💡 ${a}+${b}=${ext}`},
    showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''};
}

// ────────────────────────────────────────────────────────────
// GRADE 6
// ────────────────────────────────────────────────────────────
function g6_circleArea(diff){
  const r=diff==='easy'?_rnd(2,6):diff==='medium'?_rnd(3,10):_rnd(4,14);
  const answer=Math.round(r*r*314)/100|0;
  const cr=Math.min(r*9,100),cx=150,cy=115;
  return {type:'shapes',cat:'shapes',diff,
    text:`שטח עיגול רדיוס ${r} (π=3.14, עגל שלם)?`,answer,
    pts:ptsForQ('shapes',diff),
    shapeHtml:svgWrap(300,225,`${glowDef(PAL.f[4],'cag6')}
      <circle cx="${cx}" cy="${cy}" r="${cr}" fill="${PAL.f[4]}55" stroke="${PAL.s[4]}" stroke-width="3" filter="url(#cag6)">
        <animate attributeName="fill-opacity" values=".3;.65;.3" dur="2s" repeatCount="indefinite"/>
      </circle>
      <line x1="${cx}" y1="${cy}" x2="${cx+cr}" y2="${cy}" stroke="#ffd32a" stroke-width="2.5"/>
      ${tx(cx+cr/2,cy-10,'r='+r,'#ffd32a',14)}${tx(cx,cy+cr+18,'π×r²=?','#ffffff77',13)}
      <circle cx="${cx}" cy="${cy}" r="4" fill="#ffd32a"/>`),
    hint:{type:'text',msg:`💡 π×${r}²=3.14×${r*r}≈${answer}`},
    showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''};
}

function g6_pythagoras(diff){
  const triples=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29]];
  const sc=diff==='easy'?1:diff==='medium'?_rnd(1,3):_rnd(2,4);
  const [a,b,c]=_pick(triples).map(v=>v*sc);
  const hideC=Math.random()<.6;const answer=hideC?c:a;
  const bpx=Math.min(b*8,190),apx=Math.min(a*8,155),ox=48,oy=18;
  return {type:'shapes',cat:'shapes',diff,
    text:hideC?`a=${a}, b=${b}. חשב c לפי פיתגורס.`:`c=${c}, b=${b}. חשב a לפי פיתגורס.`,answer,
    pts:ptsForQ('shapes',diff),
    shapeHtml:svgWrap(300,228,`${glowDef(PAL.f[5],'fpg6')}
      <polygon points="${ox},${oy+apx} ${ox+bpx},${oy+apx} ${ox},${oy}" fill="${PAL.f[5]}77" stroke="${PAL.s[5]}" stroke-width="3" filter="url(#fpg6)"/>
      ${rightBox(ox,oy+apx-11)}
      ${dimLine(ox,oy+apx+14,ox+bpx,oy+apx+14,'b='+b,PAL.s[5])}
      ${dimLine(ox-18,oy,ox-18,oy+apx,hideC?'a='+a:'a=?',PAL.s[5])}
      ${tx((ox+(ox+bpx))/2-10,oy+apx/2,hideC?'c=?':'c='+c,'#ffd32a',17)}
      ${tx(155,212,'a²+b²=c²','#ffffff44',12)}`),
    hint:{type:'text',msg:hideC?`💡 c=√(${a*a}+${b*b})=${c}`:`💡 a=√(${c*c}-${b*b})=${a}`},
    showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''};
}

function g6_polyAngleSum(diff){
  const n=diff==='easy'?_pick([4,5]):diff==='medium'?_pick([5,6,7]):_pick([6,7,8,9]);
  const total=(n-2)*180;
  const answer=diff==='easy'?Math.floor(total/n):_rnd(Math.floor(total*.12),Math.floor(total*.42));
  const rest=total-answer;
  const polys=['','60,40 240,40 270,185 30,185','150,25 245,95 210,205 90,205 55,95','150,22 233,68 233,162 150,208 67,162 67,68','150,20 224,55 252,135 214,200 86,200 48,135 76,55','150,18 211,42 248,108 234,185 150,215 66,185 52,108 89,42','150,15 203,38 240,90 240,155 203,207 150,225 97,207 60,155 60,90 97,38'];
  const poly=polys[Math.min(n,9)-1]||polys[6];
  return {type:'shapes',cat:'shapes',diff,
    text:`סכום זוויות ${n}-צלע=${total}°. שאר=${rest}°. מה הזווית החסרה?`,answer,
    pts:ptsForQ('shapes',diff),
    shapeHtml:svgWrap(300,240,`
      <polygon points="${poly}" fill="${PAL.f[6]}77" stroke="${PAL.s[6]}" stroke-width="3"/>
      ${tx(150,118,'סכום='+total+'°','#ffffff55',13)}
      ${tx(150,145,rest+'°+?='+total+'°','#ffd32a',14)}
      ${tx(150,228,n+' צלעות','#ffffff44',11)}`),
    hint:{type:'text',msg:`💡 ?=${total}-${rest}=${answer}`},
    showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''};
}

function g6_dragLShape(diff){
  const W=diff==='hard'?_rnd(7,16):_rnd(5,12),H=_rnd(4,W),w=_rnd(2,W-2),h=_rnd(2,H-2);
  if(w>=W||h>=H) return g6_dragLShape(diff);
  const answer=W*H-w*h;
  const html=`<div style="text-align:center;padding:4px">
    <canvas id="lsC" width="280" height="155" style="display:block;margin:0 auto;border-radius:12px;background:rgba(255,255,255,.04)"></canvas>
    <div style="display:flex;gap:8px;margin-top:6px;justify-content:center;flex-wrap:wrap">
      <label style="color:#ffe07e;font-family:Rubik,sans-serif;font-size:.78rem;display:flex;align-items:center;gap:4px">
        רוחב חיסור:<input type="range" id="lsW2" min="1" max="${W-1}" value="${w}" step="1" style="accent-color:#ffe07e;width:70px" oninput="window._lsD2()">
        <span id="lsWv2">${w}</span></label>
      <label style="color:#7ec8ff;font-family:Rubik,sans-serif;font-size:.78rem;display:flex;align-items:center;gap:4px">
        גובה חיסור:<input type="range" id="lsH2" min="1" max="${H-1}" value="${h}" step="1" style="accent-color:#7ec8ff;width:70px" oninput="window._lsD2()">
        <span id="lsHv2">${h}</span></label>
    </div>
    <div id="lsA2" style="color:#ffd32a;font-weight:900;font-family:Rubik,sans-serif;font-size:1rem;margin-top:3px"></div>
    <div style="color:#ffffff44;font-size:.72rem;font-family:Rubik,sans-serif">כשהשטח=${answer}, כתוב אותו למטה</div>
  </div>
  <script>
  window._lsD2=function(){
    const cv=document.getElementById('lsC');if(!cv)return;
    const ctx=cv.getContext('2d');
    const W=${W},H=${H},sc=Math.min(Math.floor(140/Math.max(W,H)),14);
    const cw=parseInt(document.getElementById('lsW2').value)||1;
    const ch=parseInt(document.getElementById('lsH2').value)||1;
    document.getElementById('lsWv2').textContent=cw;
    document.getElementById('lsHv2').textContent=ch;
    const ox=20,oy=8,Wp=W*sc,Hp=H*sc,wp=cw*sc,hp=ch*sc;
    ctx.clearRect(0,0,280,155);
    ctx.fillStyle='${PAL.f[3]}99';ctx.strokeStyle='${PAL.s[3]}';ctx.lineWidth=2.5;
    ctx.beginPath();ctx.rect(ox,oy,Wp,Hp);ctx.fill();ctx.stroke();
    ctx.fillStyle='#0d0a20';ctx.setLineDash([4,3]);ctx.strokeStyle='${PAL.s[0]}';ctx.lineWidth=1.5;
    ctx.beginPath();ctx.rect(ox+Wp-wp,oy,wp,hp);ctx.fill();ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle='#ffffffee';ctx.font='bold 12px Rubik';ctx.textAlign='center';
    ctx.fillText(W+'×'+H+'='+W*H,ox+Wp/2,oy+Hp/2+(Hp>35?7:-4));
    ctx.fillStyle='rgba(255,255,255,.4)';ctx.font='10px Rubik';
    ctx.fillText(cw+'×'+ch+'='+cw*ch,ox+Wp-wp/2,oy+hp/2+(hp>18?5:-3));
    const area=W*H-cw*ch;
    document.getElementById('lsA2').textContent='שטח='+W*H+'-'+cw*ch+'='+area;
    window._shapeAnswer&&window._shapeAnswer(area);
  };window._lsD2();
  <\/script>`;
  return {type:'shapes',cat:'shapes',diff,
    text:`שנה הסליידרים עד שטח=‎${answer}, כתוב ${answer}`,answer,
    pts:ptsForQ('shapes',diff),shapeHtml:iWidget(html),
    hint:{type:'text',msg:`💡 ${W}×${H}-חיסור=${answer} → נסה ${w} ו-${h}`},
    showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''};
}

function g6_scaleFactor(diff){
  const oW=_rnd(3,8),oH=_rnd(2,7),sc=diff==='easy'?_rnd(2,3):diff==='medium'?_rnd(2,4):_rnd(2,5);
  const ask=Math.random()<.5;
  const nW=oW*sc,nH=oH*sc;
  const answer=ask?nW*nH:2*(nW+nH);
  const pw=Math.min(nW*9,180),ph=Math.min(nH*9,120);
  const ox=80,oy=Math.max((215-ph)/2,20);
  const spw=Math.min(oW*9,70),sph=Math.min(oH*9,55);
  return {type:'shapes',cat:'shapes',diff,
    text:ask?`מלבן ${oW}×${oH} הוגדל פי ${sc}. שטח חדש?`:`מלבן ${oW}×${oH} הוגדל פי ${sc}. היקף חדש?`,answer,
    pts:ptsForQ('shapes',diff),
    shapeHtml:svgWrap(300,220,`
      <rect x="${ox}" y="${oy}" width="${pw}" height="${ph}" fill="${PAL.f[1]}77" stroke="${PAL.s[1]}" stroke-width="3" rx="5"/>
      <rect x="${ox}" y="${oy}" width="${spw}" height="${sph}" fill="${PAL.f[3]}77" stroke="${PAL.s[3]}" stroke-width="2" stroke-dasharray="5,3" rx="3"/>
      ${tx(ox+spw/2,oy+sph+12,oW+'×'+oH,'#ffe07e',10)}
      ${tx(ox+pw/2,oy-10,nW+'',PAL.s[1],12)}
      ${tx(ox+pw+12,oy+ph/2,nH+'',PAL.s[1],12,'start')}
      ${tx(ox+pw/2,oy+ph/2+7,'?','#ffffffcc',20)}
      ${tx(ox+pw/2,oy+ph+14,'×'+sc+' מכל מימד','#ffd32a',11)}`),
    hint:{type:'text',msg:ask?`💡 ${nW}×${nH}=${answer}`:`💡 2×(${nW}+${nH})=${answer}`},
    showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''};
}

// ────────────────────────────────────────────────────────────
// ROUTER
// ────────────────────────────────────────────────────────────
window.genShapesInteractive=function(diff){
  const grade=window._grade||'ב';
  if(grade==='ב'){const p=[g2_countSides,g2_symmetry,g2_equalParts,g2_compareAreas,g2_angleSlider,g2_oddShape];return _wp(p,diff==='easy'?[4,2,3,2,1,2]:diff==='medium'?[2,2,2,2,2,2]:[1,2,1,1,3,2])(diff);}
  if(grade==='ג'){const p=[g3_perimeter,g3_gridArea,g3_angleType,g3_dragAngle,g3_missingDim,g3_pattern];return _wp(p,diff==='easy'?[3,3,2,1,2,2]:diff==='medium'?[2,2,2,2,2,2]:[2,1,2,3,2,1])(diff);}
  if(grade==='ד'){const p=[g4_rectArea,g4_triArea,g4_dragResize,g4_angleSumTri,g4_coordGrid];return _wp(p,diff==='easy'?[3,1,2,2,2]:diff==='medium'?[2,2,2,2,2]:[1,2,2,3,2])(diff);}
  if(grade==='ה'){const p=[g5_lShape,g5_circleCirc,g5_protractor,g5_pythagorasIntro,g5_extAngle];return _wp(p,diff==='easy'?[2,2,2,1,1]:diff==='medium'?[2,2,2,2,2]:[1,2,2,3,2])(diff);}
  if(grade==='ו'){const p=[g6_circleArea,g6_pythagoras,g6_polyAngleSum,g6_dragLShape,g6_scaleFactor];return _wp(p,diff==='easy'?[3,1,2,1,2]:diff==='medium'?[2,2,2,2,2]:[2,2,3,2,3])(diff);}
  return g2_countSides('easy');
};
function _wp(arr,w){const t=w.reduce((a,b)=>a+b,0);let r=Math.random()*t;for(let i=0;i<arr.length;i++){r-=w[i];if(r<=0)return arr[i];}return arr[arr.length-1];}

})();
