// ══════════════════════════════════════════════════════════════
// shapes.js v3 — Ultra Interactive Geometry
// Grade 2-6, 8+ question types per grade, 3D objects,
// drag-to-rotate, spin cubes, tangram, mirror drawing, and more
// ══════════════════════════════════════════════════════════════
(function () {
'use strict';

const _rnd  = (a,b) => Math.floor(Math.random()*(b-a+1))+a;
const _pick = arr => arr[Math.floor(Math.random()*arr.length)];
const PAL = {
  f:['#ff7eb3','#7ec8ff','#7effb2','#ffe07e','#c07eff','#ff9f7e','#7efff0','#ffeb7e','#ff6b6b','#a8edea'],
  s:['#e0006a','#0078c8','#00c85a','#c88000','#7800c8','#c84000','#00a8a8','#c8a000','#c83030','#00a89a'],
};
const pc = i => ({f:PAL.f[i%PAL.f.length],s:PAL.s[i%PAL.s.length]});

// ── SVG helpers ──────────────────────────────────────────────
const svgW=(w,h,b)=>`<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:${w}px;display:block;margin:0 auto;border-radius:16px;background:linear-gradient(135deg,rgba(255,255,255,.07),rgba(255,255,255,.02)),rgba(7,5,15,.7);border:1px solid rgba(255,255,255,.1)">${b}</svg>`;
const tx=(x,y,t,col,sz,anc,fw)=>`<text x="${x}" y="${y}" text-anchor="${anc||'middle'}" font-size="${sz||14}" font-family="Rubik,sans-serif" fill="${col||'#fff'}" font-weight="${fw||'700'}">${t}</text>`;
const dl=(x1,y1,x2,y2,l,col)=>{const mx=(x1+x2)/2,my=(y1+y2)/2,dx=x2-x1,dy=y2-y1,len=Math.sqrt(dx*dx+dy*dy)||1,nx=-dy/len*17,ny=dx/len*17;return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col||'#aaa'}" stroke-width="1.5" stroke-dasharray="5,3" opacity=".8"/>${tx(mx+nx,my+ny+5,l,col,12)}`;};
const rb=(x,y,s)=>{ s=s||10; return `<polyline points="${x+s},${y} ${x+s},${y+s} ${x},${y+s}" fill="none" stroke="#ffd32a" stroke-width="2"/>`; };
const gd=(col,id)=>`<defs><filter id="${id||'g1'}"><feGaussianBlur stdDeviation="3.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`;
const arc=(cx,cy,r,a1,a2,col)=>{const p=n=>n*Math.PI/180,x1=cx+r*Math.cos(p(a1)),y1=cy+r*Math.sin(p(a1)),x2=cx+r*Math.cos(p(a2)),y2=cy+r*Math.sin(p(a2)),lg=Math.abs(a2-a1)>180?1:0;return `<path d="M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${lg},1 ${x2},${y2} Z" fill="${col||'#ffd32a'}22" stroke="${col||'#ffd32a'}" stroke-width="1.8"/>`;};
const iW=(h,extra)=>`<div style="background:linear-gradient(135deg,rgba(255,255,255,.07),rgba(255,255,255,.02));border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:12px;margin:8px 0;overflow:hidden;${extra||''}">${h}</div>`;

// Auto-fill answer input
const WIRE=`window._sa=function(v){const e=document.getElementById('ansInp');if(e&&!window.qs?.done)e.value=Math.round(v);};`;

// ── 3D CUBE helper (isometric SVG) ───────────────────────────
function cube3D(cx,cy,sz,col,label){
  const c=col||'#7ec8ff';
  const s=sz||40;
  // isometric offsets
  const dx=s*0.866,dy=s*0.5;
  const pts={
    top:[cx,cy-s, cx+dx,cy-dy, cx,cy, cx-dx,cy-dy],
    right:[cx,cy, cx+dx,cy-dy, cx+dx,cy-dy+s, cx,cy+s],
    left:[cx,cy, cx-dx,cy-dy, cx-dx,cy-dy+s, cx,cy+s],
  };
  const toP=arr=>arr.reduce((a,v,i)=>a+(i%2===0?v+',':v+' '),'').trim();
  return `${gd(c,'cb'+sz)}
    <polygon points="${toP(pts.top)}" fill="${c}cc" stroke="${c}" stroke-width="1.5" filter="url(#cb${sz})"/>
    <polygon points="${toP(pts.right)}" fill="${c}66" stroke="${c}" stroke-width="1.5"/>
    <polygon points="${toP(pts.left)}" fill="${c}44" stroke="${c}" stroke-width="1.5"/>
    ${label?tx(cx,cy+s/2+10,label,'#ffffffcc',12):''}`;
}

// ── Rotating 3D shape (canvas-based HTML widget) ─────────────
function rot3DWidget(shape,label,answer,hint){
  const id='r3d'+Math.random().toString(36).slice(2,7);
  const shapeCode = shape==='cube'?`
    const v=[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
    const edges=[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
    const faces=[[0,1,2,3],[4,5,6,7],[0,1,5,4],[2,3,7,6],[1,2,6,5],[0,3,7,4]];
    const fc=['#7ec8ff44','#ff7eb344','#7effb244','#ffe07e44','#c07eff44','#ff9f7e44'];
  `:shape==='pyramid'?`
    const v=[[0,-1.5,0],[-1,1,-1],[1,1,-1],[1,1,1],[-1,1,1]];
    const faces=[[0,1,2],[0,2,3],[0,3,4],[0,4,1],[1,2,3,4]];
    const edges=[[0,1],[0,2],[0,3],[0,4],[1,2],[2,3],[3,4],[4,1]];
    const fc=['#ff7eb344','#7ec8ff44','#7effb244','#ffe07e44','#c07eff44'];
  `:shape==='prism'?`
    const v=[[-1,-1,-0.6],[1,-1,-0.6],[0,-1,0.8],[-1,1,-0.6],[1,1,-0.6],[0,1,0.8]];
    const faces=[[0,1,2],[3,4,5],[0,1,4,3],[1,2,5,4],[0,2,5,3]];
    const edges=[[0,1],[1,2],[2,0],[3,4],[4,5],[5,3],[0,3],[1,4],[2,5]];
    const fc=['#ffe07e44','#7ec8ff44','#ff7eb344','#7effb244','#c07eff44'];
  `:`
    const v=[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
    const edges=[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
    const faces=[[0,1,2,3],[4,5,6,7],[0,1,5,4],[2,3,7,6],[1,2,6,5],[0,3,7,4]];
    const fc=['#7ec8ff44','#ff7eb344','#7effb244','#ffe07e44','#c07eff44','#ff9f7e44'];
  `;
  const html=`<div style="text-align:center">
    <canvas id="${id}" width="280" height="185" style="display:block;margin:0 auto;border-radius:14px;background:rgba(7,5,15,.8);cursor:grab;touch-action:none"></canvas>
    <div style="color:#ffffff66;font-size:.75rem;font-family:Rubik,sans-serif;margin-top:5px">↔️ גרור לסובב! ${label||''}</div>
  </div>
  <script>(function(){
    const cv=document.getElementById('${id}'),ctx=cv.getContext('2d');
    ${shapeCode}
    let rx=0.3,ry=0.4,drag=false,lx=0,ly=0;
    function rot(v,rx,ry){
      let [x,y,z]=v;
      let y2=y*Math.cos(rx)-z*Math.sin(rx),z2=y*Math.sin(rx)+z*Math.cos(rx);
      let x3=x*Math.cos(ry)+z2*Math.sin(ry),z3=-x*Math.sin(ry)+z2*Math.cos(ry);
      return[x3,y2,z3];
    }
    function proj([x,y,z]){const d=4,sc=70;return[140+x*sc*d/(d+z+2),92+y*sc*d/(d+z+2)];}
    function draw(){
      ctx.clearRect(0,0,280,185);
      const vr=v.map(pt=>rot(pt,rx,ry));
      const pr=vr.map(proj);
      // draw faces
      if(typeof faces!=='undefined'&&typeof fc!=='undefined'){
        const sorted=[...faces.keys()].sort((a,b)=>{
          const za=faces[a].reduce((s,i)=>s+vr[i][2],0)/faces[a].length;
          const zb=faces[b].reduce((s,i)=>s+vr[b][2],0)/faces[b].length;
          return za-zb;
        });
        sorted.forEach(fi=>{
          const f=faces[fi];
          ctx.beginPath();ctx.moveTo(...pr[f[0]]);
          for(let i=1;i<f.length;i++)ctx.lineTo(...pr[f[i]]);
          ctx.closePath();ctx.fillStyle=fc[fi%fc.length];ctx.fill();
          ctx.strokeStyle='rgba(255,255,255,.3)';ctx.lineWidth=1.2;ctx.stroke();
        });
      }
      // draw edges
      if(typeof edges!=='undefined'){
        edges.forEach(([a,b])=>{
          ctx.beginPath();ctx.moveTo(...pr[a]);ctx.lineTo(...pr[b]);
          ctx.strokeStyle='rgba(255,255,255,.55)';ctx.lineWidth=1.5;ctx.stroke();
        });
      }
      // draw vertices
      vr.forEach((_,i)=>{ctx.beginPath();ctx.arc(...pr[i],3,0,2*Math.PI);ctx.fillStyle='rgba(255,255,255,.6)';ctx.fill();});
    }
    let anim;function loop(){rx+=0.003;ry+=0.007;draw();anim=requestAnimationFrame(loop);}loop();
    cv.addEventListener('mousedown',e=>{drag=true;cancelAnimationFrame(anim);lx=e.clientX;ly=e.clientY;cv.style.cursor='grabbing';});
    cv.addEventListener('touchstart',e=>{drag=true;cancelAnimationFrame(anim);lx=e.touches[0].clientX;ly=e.touches[0].clientY;e.preventDefault();},{passive:false});
    cv.addEventListener('mousemove',e=>{if(!drag)return;ry+=(e.clientX-lx)*.012;rx+=(e.clientY-ly)*.012;lx=e.clientX;ly=e.clientY;draw();});
    cv.addEventListener('touchmove',e=>{if(!drag)return;ry+=(e.touches[0].clientX-lx)*.012;rx+=(e.touches[0].clientY-ly)*.012;lx=e.touches[0].clientX;ly=e.touches[0].clientY;draw();e.preventDefault();},{passive:false});
    ['mouseup','mouseleave','touchend'].forEach(ev=>cv.addEventListener(ev,()=>{if(drag){drag=false;cv.style.cursor='grab';loop();}}));
  })();<\/script>`;
  return {shapeHtml:iW(html), hint};
}

// ── GRADE 2 question functions ───────────────────────────────

function g2_countSides(diff){
  const pool=[
    {n:'משולש',s:3,pts:'150,30 260,200 40,200',ci:0},
    {n:'ריבוע',s:4,pts:'70,50 230,50 230,190 70,190',ci:1},
    {n:'מחומש',s:5,pts:'150,25 245,95 210,205 90,205 55,95',ci:3},
    {n:'משושה',s:6,pts:'150,22 233,68 233,162 150,208 67,162 67,68',ci:4},
    {n:'מלבן',s:4,pts:'50,70 250,70 250,165 50,165',ci:2},
    {n:'מעוין',s:4,pts:'150,25 255,110 150,195 45,110',ci:6},
    {n:'משולש ישר-זווית',s:3,pts:'50,190 250,190 50,50',ci:5},
    {n:'מרובע לא סדיר',s:4,pts:'80,40 240,70 210,200 60,190',ci:7},
  ];
  const sh=_pick(pool),c=pc(sh.ci);
  const ask=diff==='hard'&&Math.random()<.5?'corners':'sides';
  const ptsArr=sh.pts.split(' ').map(p=>p.split(',').map(Number));
  let markers='';
  for(let i=0;i<ptsArr.length;i++){
    const a=ptsArr[i],b=ptsArr[(i+1)%ptsArr.length],mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2;
    markers+=`<circle cx="${mx}" cy="${my}" r="14" fill="${c.s}" opacity=".9" style="cursor:pointer" onclick="this.style.fill='#ffd32a';this.style.r='16'"/>`;
    markers+=tx(mx,my+5,i+1,'#fff',12);
  }
  return mk('shapes',diff,
    ask==='sides'?`כמה צלעות יש ל${sh.n}? לחץ על כל צלע!`:`כמה פינות יש ל${sh.n}?`,
    sh.s,
    svgW(300,240,`${gd(c.f,'g2s')}<polygon points="${sh.pts}" fill="${c.f}88" stroke="${c.s}" stroke-width="3.5" filter="url(#g2s)"><animate attributeName="opacity" values="0;1" dur=".4s" fill="freeze"/></polygon>${markers}${tx(150,232,'לחץ כל צלע לספור','#ffffff44',10)}`),
    '💡 ספור את הנקודות — לחץ כל אחת!');
}

function g2_3dSpin(diff){
  const shapes3d=[
    {s:'cube',n:'קובייה',v:8,e:12,f:6,ask:diff==='easy'?'v':diff==='medium'?'e':'f'},
    {s:'pyramid',n:'פירמידה',v:5,e:8,f:5,ask:diff==='easy'?'f':diff==='medium'?'v':'e'},
    {s:'prism',n:'מנסרה משולשת',v:6,e:9,f:5,ask:diff==='easy'?'v':diff==='medium'?'f':'e'},
  ];
  const sh=_pick(shapes3d);
  const propMap={'v':'קודקודים','e':'קצוות','f':'פנים'};
  const prop=propMap[sh.ask];
  const answer={'v':sh.v,'e':sh.e,'f':sh.f}[sh.ask];
  const w=rot3DWidget(sh.s,`סובב את ה${sh.n} — ספור את ה${prop}!`,answer,`💡 ${sh.n}: ${sh.v} קודקודים, ${sh.e} קצוות, ${sh.f} פנים`);
  return mk('shapes',diff,`כמה ${prop} יש ל${sh.n}? (סובב וספור!)`,answer,w.shapeHtml,w.hint);
}

function g2_symmetry(diff){
  const pool=[
    {n:'ריבוע',axes:4,pts:'80,60 220,60 220,180 80,180',ci:1},
    {n:'מלבן',axes:2,pts:'40,80 260,80 260,165 40,165',ci:2},
    {n:'משולש שווה-צלעות',axes:3,pts:'150,30 255,195 45,195',ci:0},
    {n:'מעוין',axes:2,pts:'150,25 255,110 150,195 45,110',ci:6},
    {n:'מחומש',axes:5,pts:'150,25 245,95 210,205 90,205 55,95',ci:3},
  ];
  const sh=_pick(pool),c=pc(sh.ci);
  const axC=['#ffd32a','#7ec8ff','#7effb2','#c07eff','#ff9f7e'];
  let ax='';
  const axDefs=[[150,20,150,215],[25,113,275,113],[50,45,260,185],[255,45,45,185],[150,20,50,195]];
  for(let i=0;i<sh.axes;i++) ax+=`<line x1="${axDefs[i][0]}" y1="${axDefs[i][1]}" x2="${axDefs[i][2]}" y2="${axDefs[i][3]}" stroke="${axC[i]}" stroke-width="2" stroke-dasharray="7,4" opacity=".8"/>`;
  return mk('shapes',diff,`כמה צירי סימטריה יש ל${sh.n}?`,sh.axes,
    svgW(300,230,`<polygon points="${sh.pts}" fill="${c.f}88" stroke="${c.s}" stroke-width="3"/>${ax}`),
    '💡 ציר סימטריה חוצה הצורה לשני חצאים שווים');
}

function g2_tangram(diff){
  // Tangram piece count — visual puzzle
  const puzzles=[
    {name:'בית',pieces:7,img:svgW(300,200,`<polygon points="150,30 240,100 240,185 60,185 60,100" fill="#ff7eb388" stroke="#e0006a" stroke-width="2"/><polygon points="150,30 90,100 210,100" fill="#7ec8ff88" stroke="#0078c8" stroke-width="2"/><rect x="115" y="140" width="40" height="45" fill="#7effb288" stroke="#00c85a" stroke-width="2"/><polygon points="60,100 130,100 60,185" fill="#ffe07e88" stroke="#c88000" stroke-width="2"/><polygon points="210,100 240,100 240,185 170,185" fill="#c07eff88" stroke="#7800c8" stroke-width="2"/>${tx(150,220,'7 חלקים בסך הכל','#ffffff55',10)}`)},
    {name:'דג',pieces:5,img:svgW(300,200,`<polygon points="180,100 80,60 80,140" fill="#7ec8ff88" stroke="#0078c8" stroke-width="2"/><polygon points="80,60 80,140 160,130 160,70" fill="#ff7eb388" stroke="#e0006a" stroke-width="2"/><polygon points="160,70 160,130 220,100" fill="#7effb288" stroke="#00c85a" stroke-width="2"/><polygon points="220,100 250,80 250,120" fill="#ffe07e88" stroke="#c88000" stroke-width="2"/>`)},
  ];
  const pz=_pick(puzzles);
  const asked=diff==='easy'?pz.pieces:diff==='medium'?_rnd(3,pz.pieces-1):_rnd(2,pz.pieces);
  return mk('shapes',diff,`כמה חלקים יש ב${pz.name} הטנגרם? ספור את הצורות הצבעוניות!`,pz.pieces,pz.img,'💡 ספור כל צורה צבעונית בנפרד');
}

function g2_mirrorDraw(diff){
  // Show half a shape, ask what's the missing half's count of sides
  const shapes=[
    {n:'משולש',half:`<polygon points="150,30 260,200 150,200" fill="#ff7eb388" stroke="#e0006a" stroke-width="3"/>`,full:3},
    {n:'ריבוע',half:`<rect x="150" y="50" width="130" height="140" fill="#7ec8ff88" stroke="#0078c8" stroke-width="3"/>`,full:4},
    {n:'מחומש',half:`<polygon points="150,25 245,95 210,205 150,205" fill="#7effb288" stroke="#00c85a" stroke-width="3"/>`,full:5},
  ];
  const sh=_pick(shapes);
  const body=`${sh.half}<line x1="150" y1="10" x2="150" y2="220" stroke="#ffd32a" stroke-width="2.5" stroke-dasharray="8,5"/>${tx(75,115,'?','#ffd32a',36)}${tx(150,230,'ציר הסימטריה','#ffffff55',10)}`;
  return mk('shapes',diff,`זה חצי מ${sh.n}. כמה צלעות יש ל${sh.n} השלם?`,sh.full,svgW(300,235,body),'💡 השלם את הצורה בדמיון ואז ספור צלעות');
}

function g2_angleSlider(diff){
  const targets=diff==='easy'?[90]:diff==='medium'?[45,90,135]:[30,60,90,120,150];
  const target=_pick(targets);
  const id='as'+Math.random().toString(36).slice(2,6);
  const html=`<div style="text-align:center;padding:4px">
    <canvas id="${id}" width="280" height="155" style="display:block;margin:0 auto;border-radius:12px;background:rgba(7,5,15,.8)"></canvas>
    <div style="margin-top:8px"><input type="range" id="${id}s" min="5" max="175" value="90" step="5" style="width:85%;accent-color:#ffd32a" oninput="window['_d${id}'](this.value)"></div>
    <div id="${id}v" style="color:#ffd32a;font-family:Rubik,sans-serif;font-size:1.4rem;font-weight:900;margin-top:3px">90°</div>
    <div style="color:#ffffff55;font-size:.75rem;font-family:Rubik,sans-serif">גרור → זווית ${target}° → כתוב ${target} למטה</div>
  </div>
  <script>
  ${WIRE}
  window['_d${id}']=function(deg){
    deg=parseInt(deg);document.getElementById('${id}v').textContent=deg+'°';
    const cv=document.getElementById('${id}');if(!cv)return;
    const ctx=cv.getContext('2d'),cx=140,cy=130,r=95;
    ctx.clearRect(0,0,280,155);
    // bg grid
    ctx.strokeStyle='rgba(255,255,255,.06)';ctx.lineWidth=1;
    for(let a=0;a<360;a+=15){const rr=a*Math.PI/180;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+r*Math.cos(-rr),cy+r*Math.sin(-rr));ctx.stroke();}
    // degree markers
    for(let a=0;a<=360;a+=30){ctx.fillStyle='rgba(255,255,255,.3)';ctx.font='9px Rubik';ctx.textAlign='center';ctx.fillText(a+'°',cx+(r+13)*Math.cos(-a*Math.PI/180),cy+(r+13)*Math.sin(-a*Math.PI/180)+4);}
    const rad=deg*Math.PI/180;
    // filled sector
    ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,-rad,0,true);ctx.closePath();
    const grad=ctx.createRadialGradient(cx,cy,0,cx,cy,r);
    grad.addColorStop(0,'rgba(255,211,42,.25)');grad.addColorStop(1,'rgba(255,211,42,.05)');
    ctx.fillStyle=grad;ctx.fill();
    // arms
    ctx.strokeStyle='#7ec8ff';ctx.lineWidth=5;ctx.lineCap='round';
    ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+r,cy);ctx.stroke();
    ctx.strokeStyle='#ff7eb3';ctx.lineWidth=5;
    ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+r*Math.cos(-rad),cy+r*Math.sin(-rad));ctx.stroke();
    // arc
    ctx.beginPath();ctx.arc(cx,cy,42,-rad,0,true);ctx.strokeStyle='#ffd32a';ctx.lineWidth=3;ctx.stroke();
    ctx.fillStyle='#ffd32a';ctx.font='bold 15px Rubik';ctx.textAlign='center';
    ctx.fillText(deg+'°',cx+58*Math.cos(-rad/2),cy+58*Math.sin(-rad/2)-4);
    // center dot
    ctx.beginPath();ctx.arc(cx,cy,6,0,2*Math.PI);ctx.fillStyle='#ffd32a';ctx.fill();
    window._sa&&window._sa(deg);
  };window['_d${id}'](90);
  <\/script>`;
  return mk('shapes',diff,`גרור לזווית ${target}°, אחר כך כתוב ${target}`,target,iW(html),'💡 ישרה=90°, חדה<90°, קהה>90°');
}

function g2_colorFill(diff){
  // Count colored regions / shapes in a fun scene
  const scenes=[
    {q:'כמה עיגולים יש בתמונה?',count:4,
     svg:svgW(300,200,`<circle cx="60" cy="80" r="35" fill="#ff7eb388" stroke="#e0006a" stroke-width="2"/><circle cx="160" cy="60" r="28" fill="#7ec8ff88" stroke="#0078c8" stroke-width="2"/><circle cx="240" cy="90" r="40" fill="#7effb288" stroke="#00c85a" stroke-width="2"/><circle cx="120" cy="155" r="32" fill="#ffe07e88" stroke="#c88000" stroke-width="2"/>`)},
    {q:'כמה משולשים יש?',count:3,
     svg:svgW(300,200,`<polygon points="70,170 130,70 190,170" fill="#ff7eb388" stroke="#e0006a" stroke-width="2"/><polygon points="150,160 210,70 260,160" fill="#7ec8ff88" stroke="#0078c8" stroke-width="2"/><polygon points="20,180 80,100 140,180" fill="#7effb288" stroke="#00c85a" stroke-width="2"/>`)},
  ];
  const sc=_pick(scenes);
  return mk('shapes',diff,sc.q,sc.count,sc.svg,'💡 ספור בזהירות כל צורה');
}

function g2_oddShape(diff){
  const fams=[
    {name:'משולשים',shapes:['▲','△','🔺'],odd:'⬛'},
    {name:'מרובעים',shapes:['⬜','▭','◻'],odd:'▲'},
    {name:'עיגולים',shapes:['⭕','🔵','⚪'],odd:'⬜'},
    {name:'מחומשים',shapes:['⬠','🔷','⬟'],odd:'⭕'},
  ];
  const fam=_pick(fams),all=[...fam.shapes,fam.odd].sort(()=>Math.random()-.5);
  const oddIdx=all.indexOf(fam.odd),answer=oddIdx+1;
  const xs=[50,120,190,260];
  let body='';
  all.forEach((s,i)=>{body+=tx(xs[i],95,s,'#fff',36)+tx(xs[i],120,i+1,'#ffffff88',11);});
  return mk('shapes',diff,`איזו צורה לא שייכת ל${fam.name}? כתוב את מספרה.`,answer,
    svgW(310,135,`${body}${tx(155,132,'כתוב מספר הצורה השונה','#ffffff44',10)}`),
    '💡 חפש הצורה שנראית שונה מהשאר');
}

// ── GRADE 3 question functions ───────────────────────────────

function g3_perimeter(diff){
  const type=_pick(['square','rect','triangle','pentagon']);
  let answer,body,text,hint;
  if(type==='square'){
    const s=diff==='easy'?_rnd(2,8):diff==='medium'?_rnd(5,15):_rnd(8,25);
    answer=4*s;text=`מה היקף הריבוע שצלעו ${s}?`;hint=`💡 4×${s}=${answer}`;
    const sd=140,ox=80,oy=40;
    body=`<rect x="${ox}" y="${oy}" width="${sd}" height="${sd}" fill="${PAL.f[1]}88" stroke="${PAL.s[1]}" stroke-width="3" rx="4">
      <animate attributeName="stroke-dashoffset" from="560" to="0" dur="1s" fill="freeze"/>
    </rect>${rb(ox,oy+sd-10)}${rb(ox+sd-10,oy)}${rb(ox,oy)}${rb(ox+sd-10,oy+sd-10)}
    ${dl(ox,oy-16,ox+sd,oy-16,s+' ס"מ',PAL.s[1])}${dl(ox+sd+10,oy,ox+sd+10,oy+sd,s+' ס"מ',PAL.s[1])}
    ${tx(ox+sd/2,oy+sd/2+7,'?','#ffffffcc',22)}`;
  }else if(type==='rect'){
    const w=diff==='easy'?_rnd(3,8):diff==='medium'?_rnd(5,15):_rnd(6,22);
    const h=_rnd(2,Math.max(3,w-1));
    answer=2*(w+h);text=`מה היקף המלבן? (${w}×${h})`;hint=`💡 2×(${w}+${h})=${answer}`;
    const pw=Math.min(w*12,200),ph=Math.min(Math.max(h*12,50),140),ox=(300-pw)/2,oy=(210-ph)/2;
    body=`<rect x="${ox}" y="${oy}" width="${pw}" height="${ph}" fill="${PAL.f[2]}88" stroke="${PAL.s[2]}" stroke-width="3" rx="4"/>
    ${dl(ox,oy-16,ox+pw,oy-16,w+' ס"מ',PAL.s[2])}${dl(ox-18,oy,ox-18,oy+ph,h+' ס"מ',PAL.s[2])}
    ${tx(ox+pw/2,oy+ph/2+7,'?','#ffffffcc',20)}`;
  }else if(type==='triangle'){
    const a=_rnd(3,diff==='hard'?18:10),b=_rnd(3,diff==='hard'?15:10),c=_rnd(3,diff==='hard'?14:9);
    answer=a+b+c;text=`מה היקף המשולש? (${a}, ${b}, ${c})`;hint=`💡 ${a}+${b}+${c}=${answer}`;
    body=`<polygon points="150,25 265,195 35,195" fill="${PAL.f[0]}88" stroke="${PAL.s[0]}" stroke-width="3"/>
    ${dl(35,205,265,205,a+' ס"מ',PAL.s[0])}${dl(268,195,152,25,b+' ס"מ',PAL.s[0])}${dl(148,25,32,195,c+' ס"מ',PAL.s[0])}`;
  }else{
    const s=diff==='easy'?_rnd(3,7):diff==='medium'?_rnd(4,12):_rnd(5,18);
    answer=5*s;text=`מה היקף המחומש השווה-צלעות שצלעו ${s}?`;hint=`💡 5×${s}=${answer}`;
    body=`<polygon points="150,25 245,95 210,205 90,205 55,95" fill="${PAL.f[3]}88" stroke="${PAL.s[3]}" stroke-width="3"/>
    ${dl(55,95,150,25,s+'',PAL.s[3])}${dl(150,25,245,95,s+'',PAL.s[3])}${tx(150,120,'?','#ffffffcc',24)}`;
  }
  return mk('shapes',diff,text,answer,svgW(300,225,body),hint);
}

function g3_gridArea(diff){
  const cols=diff==='easy'?_rnd(2,5):diff==='medium'?_rnd(3,8):_rnd(4,11);
  const rows=diff==='easy'?_rnd(2,5):diff==='medium'?_rnd(2,7):_rnd(3,9);
  const answer=cols*rows;
  const cell=Math.min(Math.floor(210/Math.max(cols,rows)),28);
  const gw=cols*cell,gh=rows*cell,ox=(300-gw)/2,oy=(225-gh)/2;
  let grid='';
  for(let r=0;r<rows;r++) for(let c=0;c<cols;c++){
    const hue=((r*cols+c)/(rows*cols)*80+160)|0;
    grid+=`<rect x="${ox+c*cell}" y="${oy+r*cell}" width="${cell}" height="${cell}" fill="hsla(${hue},65%,65%,.55)" stroke="rgba(255,255,255,.22)" stroke-width="1"/>`;
  }
  return mk('shapes',diff,'ספור ריבועים בגריד — כמה יש?',answer,
    svgW(300,225,`${grid}<rect x="${ox}" y="${oy}" width="${gw}" height="${gh}" fill="none" stroke="${PAL.s[1]}" stroke-width="2.5" rx="3"/>${dl(ox,oy-14,ox+gw,oy-14,cols+'',PAL.s[1])}${dl(ox-14,oy,ox-14,oy+gh,rows+'',PAL.s[2])}`),
    `💡 ${rows}×${cols}=${answer}`);
}

function g3_angleType(diff){
  const cases=[{deg:90,name:'ישרה',col:'#7ec8ff'},{deg:45,name:'חדה',col:'#7effb2'},{deg:30,name:'חדה',col:'#7effb2'},{deg:60,name:'חדה',col:'#7effb2'},{deg:120,name:'קהה',col:'#ff7eb3'},{deg:135,name:'קהה',col:'#ff7eb3'},{deg:150,name:'קהה',col:'#ff7eb3'}];
  const filtered=diff==='easy'?cases.filter(c=>c.deg===90||c.deg===45):cases;
  const ch=_pick(filtered);
  const ansMap={'חדה':1,'ישרה':2,'קהה':3},answer=ansMap[ch.name];
  const cx=150,cy=155,r=100,rad=ch.deg*Math.PI/180;
  return mk('shapes',diff,'איזה סוג זווית? (1=חדה, 2=ישרה, 3=קהה)',answer,
    svgW(300,200,`${gd(ch.col,'ag3')}
      <line x1="${cx}" y1="${cy}" x2="${cx+r}" y2="${cy}" stroke="${ch.col}" stroke-width="5" stroke-linecap="round" filter="url(#ag3)"/>
      <line x1="${cx}" y1="${cy}" x2="${cx+r*Math.cos(-rad)}" y2="${cy+r*Math.sin(-rad)}" stroke="${ch.col}" stroke-width="5" stroke-linecap="round" filter="url(#ag3)"/>
      ${arc(cx,cy,40,-ch.deg,0,ch.col)}
      ${ch.deg===90?rb(cx,cy-11,11):''}
      ${tx(cx+62*Math.cos(-rad/2),cy+62*Math.sin(-rad/2),ch.deg+'°','#ffd32a',17)}
      <circle cx="${cx}" cy="${cy}" r="6" fill="${ch.col}"/>
      ${tx(55,192,'1=חדה','#7effb2',11,'start')}${tx(150,192,'2=ישרה','#7ec8ff',11)}${tx(245,192,'3=קהה','#ff7eb3',11,'end')}`),
    '💡 חדה<90°, ישרה=90°, קהה>90°');
}

function g3_dragAngle(diff){
  const target=diff==='easy'?_pick([45,90,135]):diff==='medium'?_pick([30,60,90,120,150]):_rnd(2,17)*10;
  const id='da'+Math.random().toString(36).slice(2,6);
  const html=`<div style="text-align:center">
    <canvas id="${id}" width="280" height="165" style="display:block;margin:0 auto;border-radius:12px;background:rgba(7,5,15,.8);cursor:crosshair;touch-action:none"></canvas>
    <div id="${id}i" style="color:#ffd32a;font-family:Rubik,sans-serif;font-size:1.3rem;font-weight:900;margin-top:5px">0°</div>
    <div style="color:#ffffff55;font-size:.75rem;font-family:Rubik,sans-serif">גרור הנקודה הצהובה ל-${target}°</div>
  </div>
  <script>
  ${WIRE}
  (function(){
    const cv=document.getElementById('${id}'),ctx=cv.getContext('2d'),cx=100,cy=130,r=90;
    let drag=false,cur=45;
    function draw(deg){
      ctx.clearRect(0,0,280,165);
      const rad=deg*Math.PI/180;
      ctx.strokeStyle='rgba(255,255,255,.08)';ctx.lineWidth=1;
      for(let a=0;a<360;a+=15){const rr=a*Math.PI/180;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+r*Math.cos(-rr),cy+r*Math.sin(-rr));ctx.stroke();}
      // sector fill
      ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,-rad,0,true);ctx.closePath();
      const g=ctx.createRadialGradient(cx,cy,0,cx,cy,r);
      g.addColorStop(0,'rgba(255,211,42,.2)');g.addColorStop(1,'rgba(255,211,42,.03)');
      ctx.fillStyle=g;ctx.fill();
      ctx.strokeStyle='#7ec8ff';ctx.lineWidth=5;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+r,cy);ctx.stroke();
      ctx.strokeStyle='#ff7eb3';ctx.lineWidth=5;
      ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+r*Math.cos(-rad),cy+r*Math.sin(-rad));ctx.stroke();
      ctx.beginPath();ctx.arc(cx,cy,38,-rad,0,true);ctx.strokeStyle='#ffd32a';ctx.lineWidth=2.5;ctx.stroke();
      ctx.fillStyle='rgba(255,255,255,.3)';ctx.font='9px Rubik';ctx.textAlign='left';
      for(let a=0;a<=180;a+=30)ctx.fillText(a+'°',cx+(r+13)*Math.cos(-a*Math.PI/180)-5,cy+(r+13)*Math.sin(-a*Math.PI/180)+4);
      const px=cx+r*Math.cos(-rad),py=cy+r*Math.sin(-rad);
      ctx.beginPath();ctx.arc(px,py,12,0,2*Math.PI);
      const g2=ctx.createRadialGradient(px,py,0,px,py,12);
      g2.addColorStop(0,'#ffd32a');g2.addColorStop(1,'#ff9f00');
      ctx.fillStyle=g2;ctx.fill();
      document.getElementById('${id}i').textContent=Math.round(deg)+'°';
      window._sa&&window._sa(Math.round(deg));
    }
    function ga(e){const rect=cv.getBoundingClientRect(),ex=(e.touches?e.touches[0].clientX:e.clientX)-rect.left,ey=(e.touches?e.touches[0].clientY:e.clientY)-rect.top;return Math.max(1,Math.min(179,Math.round(Math.atan2(-(ey-cy),ex-cx)*180/Math.PI)));}
    cv.addEventListener('mousedown',e=>{drag=true;draw(ga(e));});
    cv.addEventListener('touchstart',e=>{drag=true;draw(ga(e));e.preventDefault();},{passive:false});
    cv.addEventListener('mousemove',e=>{if(drag){cur=ga(e);draw(cur);}});
    cv.addEventListener('touchmove',e=>{if(drag){cur=ga(e);draw(cur);}e.preventDefault();},{passive:false});
    ['mouseup','mouseleave','touchend'].forEach(ev=>cv.addEventListener(ev,()=>drag=false));
    draw(45);
  })();
  <\/script>`;
  return mk('shapes',diff,`גרור לזווית ${target}°, אחר כך כתוב ${target}`,target,iW(html),`💡 גרור עד ${target}°`);
}

function g3_missingDim(diff){
  const isRect=Math.random()<.5;
  let answer,text,hint,body;
  if(!isRect){
    const s=diff==='easy'?_rnd(3,8):diff==='medium'?_rnd(5,15):_rnd(7,25);
    const perim=4*s;answer=s;text=`היקף ריבוע=${perim}. מה צלע?`;hint=`💡 ${perim}÷4=${s}`;
    const sd=140,ox=80,oy=38;
    body=`<rect x="${ox}" y="${oy}" width="${sd}" height="${sd}" fill="${PAL.f[1]}88" stroke="${PAL.s[1]}" stroke-width="3" rx="4"/>
    ${tx(ox+sd/2,oy-10,'?','#ffd32a',18)}${tx(ox+sd+14,oy+sd/2,'?','#ffd32a',18)}
    ${tx(ox+sd/2,oy+sd/2+8,'היקף='+perim,'#ffffffcc',15)}`;
  }else{
    const w=diff==='easy'?_rnd(3,9):_rnd(5,18),h=_rnd(2,Math.max(3,w-1)),perim=2*(w+h);
    answer=h;text=`היקף מלבן=${perim}, רוחב=${w}. מה גובהו?`;hint=`💡 ${perim}÷2-${w}=${h}`;
    const pw=Math.min(w*11,200),ph=Math.min(Math.max(h*11,55),140),ox=(300-pw)/2,oy=(215-ph)/2;
    body=`<rect x="${ox}" y="${oy}" width="${pw}" height="${ph}" fill="${PAL.f[2]}88" stroke="${PAL.s[2]}" stroke-width="3" rx="4"/>
    ${dl(ox,oy-15,ox+pw,oy-15,w+'',PAL.s[2])}${tx(ox-14,oy+ph/2,'?','#ffd32a',18)}
    ${tx(ox+pw/2,oy+ph/2+8,'היקף='+perim,'#ffffffcc',13)}`;
  }
  return mk('shapes',diff,text,answer,svgW(300,225,body),hint);
}

function g3_pattern(diff){
  const seq=[3,4,5,6,7,8];
  const start=_rnd(0,3),shown=seq.slice(start,start+3),next=seq[start+3];
  const polys=['150,30 260,200 40,200','70,50 230,50 230,190 70,190','150,25 245,95 210,205 90,205 55,95','150,22 233,68 233,162 150,208 67,162 67,68','150,20 224,65 242,155 196,210 104,210 58,155 76,65','150,18 211,48 240,113 223,183 150,210 77,183 60,113 89,48'];
  const names=['משולש','ריבוע','מחומש','משושה','משבע','משומן'];
  let body='';
  shown.forEach((s,i)=>{const ci=s-3,c=pc(ci),sc=0.38,pts=polys[ci].split(' ').map(p=>p.split(',').map(Number)),shifted=pts.map(([x,y])=>`${x*sc+i*96+8},${y*sc+18}`).join(' ');body+=`<polygon points="${shifted}" fill="${c.f}88" stroke="${c.s}" stroke-width="2"/>`;body+=tx(i*96+50,118,s+'','#ffffff99',12);});
  body+=tx(300,68,'?','#ffd32a',34)+tx(300,118,'?','#ffffff99',12)+tx(155,140,'כמה צלעות הבאה?','#ffffff55',11);
  return mk('shapes',diff,`דפוס: ${shown.map(s=>names[s-3]).join(' → ')} → ? כמה צלעות?`,next,svgW(340,155,body),'💡 כל פעם מוסיפים צלע');
}

function g3_3dFaces(diff){
  const w=rot3DWidget(
    _pick(['cube','pyramid','prism']),
    'סובב לראות כל הפנים!',
    diff==='easy'?6:diff==='medium'?5:9,
    '💡 קובייה=6, פירמידה=5, מנסרה=5'
  );
  const shapes3d=[{s:'cube',n:'קובייה',v:8,e:12,f:6},{s:'pyramid',n:'פירמידה',v:5,e:8,f:5},{s:'prism',n:'מנסרה משולשת',v:6,e:9,f:5}];
  const sh=_pick(shapes3d);
  const ask=_pick(['v','e','f']);
  const propMap={'v':'קודקודים','e':'קצוות','f':'פנים'};
  const answer={'v':sh.v,'e':sh.e,'f':sh.f}[ask];
  const w2=rot3DWidget(sh.s,`סובב וספור ${propMap[ask]}!`,answer,`💡 ${sh.n}: ${sh.v} קודקודים, ${sh.e} קצוות, ${sh.f} פנים`);
  return mk('shapes',diff,`כמה ${propMap[ask]} יש ל${sh.n}? (סובב וספור)`,answer,w2.shapeHtml,w2.hint);
}

function g3_foldedArea(diff){
  const s=diff==='easy'?_rnd(2,6):diff==='medium'?_rnd(4,10):_rnd(6,14);
  const full=s*s,half=full/2;
  const folds=diff==='easy'?1:diff==='medium'?2:3;
  const answer=folds===1?half:folds===2?full/4:full/8;
  const cell=Math.min(Math.floor(160/s),25);
  const gw=s*cell,gh=s*cell,ox=(300-gw)/2,oy=(220-gh)/2;
  let grid='';
  const colored=folds===1?s*Math.ceil(s/2):folds===2?Math.ceil(s/2)*Math.ceil(s/2):Math.ceil(s/4)*Math.ceil(s/4);
  for(let r=0;r<s;r++) for(let c=0;c<s;c++){
    const visible=(folds===1&&c<s/2)||(folds===2&&c<s/2&&r<s/2)||(folds===3&&c<s/4&&r<s/4);
    grid+=`<rect x="${ox+c*cell}" y="${oy+r*cell}" width="${cell}" height="${cell}" fill="${visible?PAL.f[3]+'99':'rgba(255,255,255,.06)' }" stroke="rgba(255,255,255,.2)" stroke-width="1"/>`;
  }
  const foldLine=folds>=1?`<line x1="${ox+gw/2}" y1="${oy}" x2="${ox+gw/2}" y2="${oy+gh}" stroke="#ffd32a" stroke-width="2.5" stroke-dasharray="8,4"/>`:'';
  const foldLine2=folds>=2?`<line x1="${ox}" y1="${oy+gh/2}" x2="${ox+gw}" y2="${oy+gh/2}" stroke="#7ec8ff" stroke-width="2.5" stroke-dasharray="8,4"/>`:'';
  return mk('shapes',diff,`ניר ${s}×${s} קופל ${folds} פעמים. כמה ריבועים נראים (הצהובים)?`,answer,
    svgW(300,225,`${grid}${foldLine}${foldLine2}${tx(ox+gw/2,oy-8,'קו קיפול','#ffd32a',10)}`),
    `💡 ${full} ÷ ${Math.pow(2,folds)} = ${answer}`);
}

// ── GRADE 4 question functions ───────────────────────────────

function g4_rectArea(diff){
  const w=diff==='easy'?_rnd(3,9):diff==='medium'?_rnd(5,16):_rnd(7,25);
  const h=diff==='easy'?_rnd(2,8):diff==='medium'?_rnd(4,14):_rnd(5,20);
  const ask=diff==='hard'?_pick(['area','perim']):'area';
  const answer=ask==='area'?w*h:2*(w+h);
  const pw=Math.min(w*11,200),ph=Math.min(Math.max(h*11,55),150),ox=(300-pw)/2,oy=(215-ph)/2;
  return mk('shapes',diff,ask==='area'?`שטח מלבן ${w}×${h}?`:`היקף מלבן ${w}×${h}?`,answer,
    svgW(300,215,`${gd(PAL.f[2],'rg4')}<rect x="${ox}" y="${oy}" width="${pw}" height="${ph}" fill="${PAL.f[2]}88" stroke="${PAL.s[2]}" stroke-width="3" rx="5" filter="url(#rg4)"><animate attributeName="fill-opacity" values=".35;.72;.35" dur="2.5s" repeatCount="indefinite"/></rect>${dl(ox,oy-16,ox+pw,oy-16,w+' ס"מ',PAL.s[2])}${dl(ox-18,oy,ox-18,oy+ph,h+' ס"מ',PAL.s[2])}${tx(ox+pw/2,oy+ph/2+7,w+'×'+h+'=?','#ffffffdd',17)}`),
    ask==='area'?`💡 ${w}×${h}=${answer}`:`💡 2×(${w}+${h})=${answer}`);
}

function g4_triArea(diff){
  let base,height;
  do{base=diff==='easy'?_rnd(2,8)*2:diff==='medium'?_rnd(3,12)*2:_rnd(4,18)*2;height=diff==='easy'?_rnd(2,7):diff==='medium'?_rnd(3,12):_rnd(4,18);}
  while((base*height)%2!==0);
  const answer=base*height/2;
  const bpx=Math.min(base*10,210),hpx=Math.min(Math.max(height*10,60),160),ox=(300-bpx)/2,oy=18,tipX=ox+_rnd(bpx*.3|0,bpx*.7|0);
  return mk('shapes',diff,`שטח משולש (בסיס ${base}, גובה ${height})?`,answer,
    svgW(300,225,`${gd(PAL.f[0],'tg4')}<polygon points="${tipX},${oy} ${ox+bpx},${oy+hpx} ${ox},${oy+hpx}" fill="${PAL.f[0]}88" stroke="${PAL.s[0]}" stroke-width="3" filter="url(#tg4)"><animate attributeName="fill-opacity" values=".4;.78;.4" dur="2s" repeatCount="indefinite"/></polygon><line x1="${tipX}" y1="${oy}" x2="${tipX}" y2="${oy+hpx}" stroke="#ffd32a" stroke-width="2" stroke-dasharray="6,3"/>${dl(ox,oy+hpx+14,ox+bpx,oy+hpx+14,base+'',PAL.s[0])}${tx(tipX+14,oy+hpx/2,height+'','#ffd32a',13,'start')}${tx(ox+bpx/2,oy+hpx/2+7,'?','#ffffffcc',22)}`),
    `💡 (${base}×${height})÷2=${answer}`);
}

function g4_dragResize(diff){
  const fw=diff==='easy'?_rnd(3,6):diff==='medium'?_rnd(4,10):_rnd(5,14);
  const th=diff==='easy'?_rnd(2,6):diff==='medium'?_rnd(3,10):_rnd(4,15);
  const answer=fw*th;
  const id='rz'+Math.random().toString(36).slice(2,6);
  const html=`<div style="text-align:center;padding:4px">
    <canvas id="${id}" width="280" height="145" style="display:block;margin:0 auto;border-radius:12px;background:rgba(7,5,15,.8)"></canvas>
    <div style="margin-top:8px;display:flex;align-items:center;gap:8px;justify-content:center">
      <span style="color:#7effb2;font-family:Rubik,sans-serif;font-size:.8rem">גובה:</span>
      <input type="range" id="${id}s" min="1" max="20" value="4" step="1" style="flex:1;max-width:160px;accent-color:#7effb2" oninput="window['_r${id}'](this.value)">
      <span id="${id}v" style="color:#ffd32a;font-weight:900;font-family:Rubik,sans-serif;min-width:22px">4</span>
    </div>
    <div id="${id}a" style="color:#7ec8ff;font-family:Rubik,sans-serif;font-size:1rem;font-weight:700;margin-top:3px"></div>
    <div style="color:#ffffff44;font-size:.72rem;font-family:Rubik,sans-serif">כשהשטח=${answer}, כתוב אותו למטה</div>
  </div>
  <script>
  ${WIRE}
  window['_r${id}']=function(h){h=parseInt(h);
    const cv=document.getElementById('${id}');if(!cv)return;
    const ctx=cv.getContext('2d'),W=${fw},sc=Math.min(Math.floor(140/Math.max(W,h)),14);
    const pw=W*sc,ph=Math.min(h*sc,130),ox=(280-pw)/2,oy=8;
    ctx.clearRect(0,0,280,145);
    const gr=ctx.createLinearGradient(ox,oy,ox+pw,oy+ph);
    gr.addColorStop(0,'${PAL.f[2]}dd');gr.addColorStop(1,'${PAL.f[1]}77');
    ctx.fillStyle=gr;ctx.beginPath();ctx.roundRect(ox,oy,pw,ph,6);ctx.fill();
    ctx.strokeStyle='${PAL.s[2]}';ctx.lineWidth=2.5;ctx.stroke();
    // grid lines
    ctx.strokeStyle='rgba(255,255,255,.1)';ctx.lineWidth=.8;
    for(let i=1;i<W;i++){ctx.beginPath();ctx.moveTo(ox+i*sc,oy);ctx.lineTo(ox+i*sc,oy+ph);ctx.stroke();}
    for(let i=1;i<h;i++){ctx.beginPath();ctx.moveTo(ox,oy+i*sc);ctx.lineTo(ox+pw,oy+i*sc);ctx.stroke();}
    ctx.fillStyle='#fff';ctx.font='bold 14px Rubik';ctx.textAlign='center';
    ctx.fillText(W+'×'+h+'='+W*h,ox+pw/2,oy+ph/2+(ph>28?6:-8));
    document.getElementById('${id}v').textContent=h;
    document.getElementById('${id}a').textContent='שטח='+W*h+(W*h===${answer}?' ✅':'');
    window._sa&&window._sa(W*h);
  };window['_r${id}'](4);
  <\/script>`;
  return mk('shapes',diff,`שנה גובה עד שטח=${answer} (רוחב ${fw}). כתוב ${answer}.`,answer,iW(html),`💡 ${fw}×גובה=${answer} → גובה=${th}`);
}

function g4_angleSumTri(diff){
  const a=_rnd(35,80),b=_rnd(25,100-a),c=180-a-b;
  if(c<=5||c>=170) return g4_angleSumTri(diff);
  const hide=_pick([0,1,2]),vals=[a,b,c],answer=vals[hide];
  const lbPos=[[150,58],[235,183],[62,183]];
  return mk('shapes',diff,'סכום זוויות משולש=180°. מצא החסרה.',answer,
    svgW(300,212,`${gd(PAL.f[0],'atg')}<polygon points="150,28 268,192 32,192" fill="${PAL.f[0]}88" stroke="${PAL.s[0]}" stroke-width="3" filter="url(#atg)"/>${vals.map((v,i)=>tx(lbPos[i][0],lbPos[i][1],i===hide?'?°':v+'°','#ffd32a',17)).join('')}${tx(150,118,'סכום=180°','#ffffff44',12)}`),
    `💡 ${vals.filter((_,i)=>i!==hide).join('+')}+?=180`);
}

function g4_coordGrid(diff){
  const x=_rnd(1,diff==='easy'?5:diff==='medium'?8:10),y=_rnd(1,diff==='easy'?5:diff==='medium'?8:10);
  const askX=Math.random()<.5,answer=askX?x:y;
  const cell=22,gW=10,gH=8,ox=32,oy=10;
  let grid='',nums='';
  for(let i=0;i<=gW;i++){grid+=`<line x1="${ox+i*cell}" y1="${oy}" x2="${ox+i*cell}" y2="${oy+gH*cell}" stroke="rgba(255,255,255,.1)" stroke-width="1"/>`;if(i>0)nums+=tx(ox+i*cell,oy+gH*cell+14,i,'#ffffff55',9);}
  for(let j=0;j<=gH;j++){grid+=`<line x1="${ox}" y1="${oy+j*cell}" x2="${ox+gW*cell}" y2="${oy+j*cell}" stroke="rgba(255,255,255,.1)" stroke-width="1"/>`;if(j>0)nums+=tx(ox-10,oy+(gH-j)*cell+5,j,'#ffffff55',9);}
  const px=ox+x*cell,py=oy+(gH-y)*cell;
  return mk('shapes',diff,`מה ה${askX?'X':'Y'} של הנקודה?`,answer,
    svgW(300,218,`${grid}${nums}<line x1="${px}" y1="${oy}" x2="${px}" y2="${oy+gH*cell}" stroke="${PAL.s[1]}" stroke-width="1.5" stroke-dasharray="4,3" opacity=".5"/><line x1="${ox}" y1="${py}" x2="${ox+gW*cell}" y2="${py}" stroke="${PAL.s[2]}" stroke-width="1.5" stroke-dasharray="4,3" opacity=".5"/><circle cx="${px}" cy="${py}" r="8" fill="#ffd32a"><animate attributeName="r" values="6;11;6" dur="1.2s" repeatCount="indefinite"/></circle>${tx(ox-8,oy+gH*cell+14,'0','#ffffff55',9)}${tx(ox+gW*cell/2,oy+gH*cell+26,'X →','#7ec8ff',10)}${tx(14,oy+gH*cell/2,'Y','#7effb2',10)}`),
    `💡 הנקודה=(${x},${y})`);
}

function g4_3dVolume(diff){
  // Count unit cubes in a structure (visual 3D stacking)
  const id='vc'+Math.random().toString(36).slice(2,6);
  const rows=diff==='easy'?_rnd(1,2):diff==='medium'?_rnd(1,3):_rnd(2,4);
  const cols=diff==='easy'?_rnd(1,2):diff==='medium'?_rnd(1,3):_rnd(2,4);
  const depth=diff==='easy'?_rnd(1,2):diff==='medium'?_rnd(1,3):_rnd(1,4);
  const answer=rows*cols*depth;
  const html=`<div style="text-align:center">
    <canvas id="${id}" width="280" height="180" style="display:block;margin:0 auto;border-radius:12px;background:rgba(7,5,15,.8);cursor:grab;touch-action:none"></canvas>
    <div style="color:#ffe07e;font-family:Rubik,sans-serif;font-size:.85rem;margin-top:5px;font-weight:700">↔️ גרור לסובב! ספור את הקוביות</div>
  </div>
  <script>(function(){
    const cv=document.getElementById('${id}'),ctx=cv.getContext('2d');
    let rx=0.4,ry=0.5,drag=false,lx=0,ly=0;
    const R=${rows},C=${cols},D=${depth};
    function drawCube(ax,ay,sc,col){
      const dx=sc*.866,dy=sc*.5;
      ctx.fillStyle=col+'cc';ctx.strokeStyle='rgba(255,255,255,.4)';ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(ax,ay-sc);ctx.lineTo(ax+dx,ay-dy);ctx.lineTo(ax,ay);ctx.lineTo(ax-dx,ay-dy);ctx.closePath();ctx.fill();ctx.stroke();
      ctx.fillStyle=col+'88';ctx.beginPath();ctx.moveTo(ax,ay);ctx.lineTo(ax+dx,ay-dy);ctx.lineTo(ax+dx,ay-dy+sc);ctx.lineTo(ax,ay+sc);ctx.closePath();ctx.fill();ctx.stroke();
      ctx.fillStyle=col+'55';ctx.beginPath();ctx.moveTo(ax,ay);ctx.lineTo(ax-dx,ay-dy);ctx.lineTo(ax-dx,ay-dy+sc);ctx.lineTo(ax,ay+sc);ctx.closePath();ctx.fill();ctx.stroke();
    }
    const colors=['#7ec8ff','#7effb2','#ffe07e','#ff7eb3','#c07eff'];
    function draw(){
      ctx.clearRect(0,0,280,180);
      const sc=Math.min(22,Math.floor(60/Math.max(R,C,D)));
      const ox=140,oy=160;
      for(let d=D-1;d>=0;d--) for(let r=R-1;r>=0;r--) for(let c=0;c<C;c++){
        const ax=ox+(c-d)*.866*sc*Math.cos(ry)-(r)*.866*sc*Math.sin(ry);
        const ay=oy+(c-d)*.866*sc*Math.sin(ry)*0.3+(r)*.866*sc*Math.cos(ry)*0.3-d*sc*0.5;
        drawCube(ax,ay,sc,colors[(r+c+d)%colors.length]);
      }
    }
    let anim;function loop(){ry+=0.008;draw();anim=requestAnimationFrame(loop);}loop();
    cv.addEventListener('mousedown',e=>{drag=true;cancelAnimationFrame(anim);lx=e.clientX;cv.style.cursor='grabbing';});
    cv.addEventListener('touchstart',e=>{drag=true;cancelAnimationFrame(anim);lx=e.touches[0].clientX;e.preventDefault();},{passive:false});
    cv.addEventListener('mousemove',e=>{if(!drag)return;ry+=(e.clientX-lx)*.015;lx=e.clientX;draw();});
    cv.addEventListener('touchmove',e=>{if(!drag)return;ry+=(e.touches[0].clientX-lx)*.015;lx=e.touches[0].clientX;draw();e.preventDefault();},{passive:false});
    ['mouseup','mouseleave','touchend'].forEach(ev=>cv.addEventListener(ev,()=>{if(drag){drag=false;cv.style.cursor='grab';loop();}}));
  })();
  <\/script>`;
  return mk('shapes',diff,`כמה קוביות יש במבנה? (${R}×${C}×${D}) סובב לראות!`,answer,iW(html),`💡 שורות×עמודות×עומק = ${R}×${C}×${D}=${answer}`);
}

function g4_areaOnGrid(diff){
  // Irregular shape on grid — count squares
  const shapes=[
    {name:'צורת L',cells:[[0,0],[0,1],[0,2],[1,2],[2,2]],area:5},
    {name:'צורת T',cells:[[0,0],[0,1],[0,2],[1,1],[2,1]],area:5},
    {name:'צורת Z',cells:[[0,0],[0,1],[1,1],[1,2],[2,2]],area:5},
    {name:'צורת +',cells:[[0,1],[1,0],[1,1],[1,2],[2,1]],area:5},
    {name:'מלבן עם חור',cells:[[0,0],[0,1],[0,2],[1,0],[1,2],[2,0],[2,1],[2,2]],area:8},
  ];
  const sh=_pick(shapes);
  const extra=diff==='hard'?_rnd(1,3):diff==='medium'?_rnd(1,2):0;
  const answer=sh.area+extra;
  const cell=40,ox=50,oy=30;
  let grid='';
  const allCells=[...sh.cells];
  if(extra>0){for(let i=0;i<extra;i++) allCells.push([_rnd(0,2),_rnd(0,2)]);}
  const unique=[...new Set(allCells.map(c=>c.join(',')))].map(s=>s.split(',').map(Number));
  unique.forEach(([r,c])=>{grid+=`<rect x="${ox+c*cell}" y="${oy+r*cell}" width="${cell}" height="${cell}" fill="${PAL.f[1]}99" stroke="rgba(255,255,255,.3)" stroke-width="1.5" rx="3"/>`;});
  // grid bg
  for(let r=0;r<=3;r++) for(let c=0;c<=3;c++){
    grid=`<line x1="${ox}" y1="${oy+r*cell}" x2="${ox+3*cell}" y2="${oy+r*cell}" stroke="rgba(255,255,255,.08)" stroke-width="1"/><line x1="${ox+c*cell}" y1="${oy}" x2="${ox+c*cell}" y2="${oy+3*cell}" stroke="rgba(255,255,255,.08)" stroke-width="1"/>`+grid;
  }
  return mk('shapes',diff,`ספור כמה ריבועים צבועים יש ב${sh.name}`,unique.length,svgW(300,200,grid),'💡 ספור כל ריבוע כחול');
}

function g4_reflectShape(diff){
  // Show shape, ask about its reflection
  const shapes=[{n:'משולש',orig:[150,30,260,190,40,190],ref:[150,30,40,190,260,190],sides:3},{n:'ריבוע',orig:[80,50,180,50,180,180,80,180],ref:[120,50,220,50,220,180,120,180],sides:4}];
  const sh=_pick(shapes),answer=sh.sides;
  const origPts=sh.orig,refPts=sh.ref;
  return mk('shapes',diff,`כמה צלעות לצורה המשוקפת?`,answer,
    svgW(300,220,`<line x1="150" y1="10" x2="150" y2="215" stroke="#ffd32a" stroke-width="2.5" stroke-dasharray="8,5" opacity=".8"/>
      <polygon points="${origPts.join(' ')}" fill="${PAL.f[1]}88" stroke="${PAL.s[1]}" stroke-width="3"/>
      <polygon points="${refPts.join(' ')}" fill="${PAL.f[0]}55" stroke="${PAL.s[0]}" stroke-width="2.5" stroke-dasharray="8,4"/>
      ${tx(75,200,'מקורי','#7ec8ff',11)}${tx(220,200,'השתקפות','#ff7eb3',11)}${tx(150,10,'מראה','#ffd32a',10)}`),
    `💡 ההשתקפות זהה לצורה המקורית`);
}

// ── GRADE 5 question functions ───────────────────────────────

function g5_lShape(diff){
  const W=diff==='hard'?_rnd(7,16):_rnd(5,12),H=_rnd(4,W),w=_rnd(2,W-2),h=_rnd(2,H-2);
  if(w>=W||h>=H) return g5_lShape(diff);
  const answer=W*H-w*h;
  const sc=Math.min(14,Math.floor(160/Math.max(W,H))),Wp=W*sc,Hp=H*sc,wp=w*sc,hp=h*sc,ox=(300-Wp)/2,oy=(225-Hp)/2;
  return mk('shapes',diff,`שטח צורת L? (${W}×${H} פחות ${w}×${h})`,answer,
    svgW(300,225,`<rect x="${ox}" y="${oy}" width="${Wp}" height="${Hp}" fill="${PAL.f[3]}77" stroke="${PAL.s[3]}" stroke-width="3" rx="4"/><rect x="${ox+Wp-wp}" y="${oy}" width="${wp}" height="${hp}" fill="#0d0a20" stroke="${PAL.s[0]}" stroke-width="2" stroke-dasharray="6,3" rx="3"/>${dl(ox,oy-16,ox+Wp,oy-16,W+'',PAL.s[3])}${dl(ox-18,oy,ox-18,oy+Hp,H+'',PAL.s[3])}${tx(ox+Wp-wp/2,oy+hp/2+6,w+'×'+h,'#ffffff44',11)}${tx(ox+Wp/3,oy+Hp/2+7,'?','#ffffffcc',22)}`),
    `💡 ${W}×${H}-${w}×${h}=${W*H}-${w*h}=${answer}`);
}

function g5_circleCirc(diff){
  const r=diff==='easy'?_rnd(2,5):diff==='medium'?_rnd(3,9):_rnd(4,14);
  const d=2*r,circ=Math.round(d*314)/100;
  const ask=Math.random()<.7;const answer=ask?Math.round(circ):d;
  const cr=90,cx=150,cy=112;
  return mk('shapes',diff,ask?`היקף עיגול רדיוס ${r}? (π=3.14)`:`קוטר עיגול רדיוס ${r}?`,answer,
    svgW(300,220,`${gd(PAL.f[4],'cg5')}<circle cx="${cx}" cy="${cy}" r="${cr}" fill="${PAL.f[4]}44" stroke="${PAL.s[4]}" stroke-width="3" filter="url(#cg5)"><animate attributeName="fill-opacity" values=".3;.65;.3" dur="2s" repeatCount="indefinite"/></circle><line x1="${cx}" y1="${cy}" x2="${cx+cr}" y2="${cy}" stroke="#ffd32a" stroke-width="2.5"/><line x1="${cx-cr}" y1="${cy}" x2="${cx+cr}" y2="${cy}" stroke="#7ec8ff" stroke-width="1.5" stroke-dasharray="4,4" opacity=".6"/>${tx(cx+cr/2,cy-10,'r='+r,'#ffd32a',14)}${tx(cx,cy+18,'d='+d,'#7ec8ff',12)}${ask?tx(cx,cy+cr+18,'π×d=?','#ffffff77',13):''}${gd(PAL.f[4],'cg5a')}<circle cx="${cx}" cy="${cy}" r="4" fill="#ffd32a"/>`),
    ask?`💡 3.14×${d}≈${Math.round(circ)}`:`💡 d=2×${r}=${d}`);
}

function g5_protractor(diff){
  const targets=diff==='easy'?[30,45,60,90,120]:diff==='medium'?[35,55,75,105,125,145]:[25,40,65,80,110,130,155];
  const target=_pick(targets);
  const id='pr'+Math.random().toString(36).slice(2,6);
  const html=`<div style="text-align:center">
    <canvas id="${id}" width="280" height="165" style="display:block;margin:0 auto;border-radius:12px;background:rgba(7,5,15,.85);cursor:crosshair;touch-action:none"></canvas>
    <div id="${id}v" style="color:#ffd32a;font-family:Rubik,sans-serif;font-size:1.3rem;font-weight:900;margin-top:5px">45°</div>
    <div style="color:#ffffff55;font-size:.75rem;font-family:Rubik,sans-serif">גרור לנקודה הצהובה ל-${target}°, כתוב ${target}</div>
  </div>
  <script>
  ${WIRE}
  (function(){
    const cv=document.getElementById('${id}'),ctx=cv.getContext('2d'),cx=140,cy=155,r=120;
    let drag=false,cur=45;
    function draw(deg){
      ctx.clearRect(0,0,280,165);
      // protractor arc
      ctx.beginPath();ctx.arc(cx,cy,r,-Math.PI,0);ctx.closePath();
      const g=ctx.createRadialGradient(cx,cy,0,cx,cy,r);
      g.addColorStop(0,'rgba(120,90,255,.16)');g.addColorStop(1,'rgba(120,90,255,.03)');
      ctx.fillStyle=g;ctx.fill();ctx.strokeStyle='rgba(255,255,255,.22)';ctx.lineWidth=2;ctx.stroke();
      // tick marks + labels
      for(let a=0;a<=180;a+=5){
        const len=a%30===0?16:a%10===0?10:5,rad=a*Math.PI/180;
        const ix=cx+r*Math.cos(Math.PI-rad),iy=cy-r*Math.sin(rad);
        ctx.beginPath();ctx.moveTo(ix,iy);ctx.lineTo(cx+(r-len)*Math.cos(Math.PI-rad),cy-(r-len)*Math.sin(rad));
        ctx.strokeStyle=a%30===0?'rgba(255,255,255,.6)':'rgba(255,255,255,.22)';ctx.lineWidth=a%30===0?1.5:1;ctx.stroke();
        if(a%30===0){ctx.fillStyle='rgba(255,255,255,.5)';ctx.font='9px Rubik';ctx.textAlign='center';ctx.fillText(a,cx+(r+12)*Math.cos(Math.PI-rad),cy-(r+12)*Math.sin(rad)+4);}
      }
      const rad=deg*Math.PI/180;
      // base arm
      ctx.strokeStyle='#7ec8ff';ctx.lineWidth=3.5;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx-r*.9,cy);ctx.stroke();
      // rotating arm
      ctx.strokeStyle='#ff7eb3';ctx.lineWidth=3.5;
      ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+(r*.9)*Math.cos(Math.PI-rad),cy-(r*.9)*Math.sin(rad));ctx.stroke();
      // arc fill
      ctx.beginPath();ctx.arc(cx,cy,38,Math.PI-rad,Math.PI);
      ctx.strokeStyle='#ffd32a';ctx.lineWidth=2.5;ctx.stroke();ctx.fillStyle='#ffd32a22';ctx.fill();
      ctx.fillStyle='#ffd32a';ctx.font='bold 13px Rubik';ctx.textAlign='center';
      ctx.fillText(deg+'°',cx-52*Math.cos(rad/2),cy-52*Math.sin(rad/2)-2);
      // draggable dot
      const ex=cx+(r*.9)*Math.cos(Math.PI-rad),ey=cy-(r*.9)*Math.sin(rad);
      const dg=ctx.createRadialGradient(ex,ey,0,ex,ey,12);
      dg.addColorStop(0,'#ffd32a');dg.addColorStop(1,'#ff9f00');
      ctx.beginPath();ctx.arc(ex,ey,12,0,2*Math.PI);ctx.fillStyle=dg;ctx.fill();
      document.getElementById('${id}v').textContent=deg+'°';
      window._sa&&window._sa(deg);
    }
    function ga(e){const rect=cv.getBoundingClientRect(),ex=(e.touches?e.touches[0].clientX:e.clientX)-rect.left,ey=(e.touches?e.touches[0].clientY:e.clientY)-rect.top,dx=ex-cx,dy=cy-ey;if(dy<-10)return null;return Math.max(1,Math.min(179,Math.round(Math.atan2(dy,dx)*180/Math.PI)));}
    cv.addEventListener('mousedown',e=>{drag=true;const d=ga(e);if(d)draw(d);});
    cv.addEventListener('touchstart',e=>{drag=true;const d=ga(e);if(d)draw(d);e.preventDefault();},{passive:false});
    cv.addEventListener('mousemove',e=>{if(!drag)return;const d=ga(e);if(d){cur=d;draw(d);}});
    cv.addEventListener('touchmove',e=>{if(!drag)return;const d=ga(e);if(d){cur=d;draw(d);}e.preventDefault();},{passive:false});
    ['mouseup','mouseleave','touchend'].forEach(ev=>cv.addEventListener(ev,()=>drag=false));
    draw(45);
  })();
  <\/script>`;
  return mk('shapes',diff,`גרור למד-זווית ל-${target}°, כתוב ${target}`,target,iW(html),`💡 גרור הקצה הורוד עד ${target}°`);
}

function g5_pythagorasIntro(diff){
  const triples=[[3,4,5],[5,12,13],[8,15,17],[6,8,10],[9,12,15]];
  const sc=diff==='easy'?1:diff==='medium'?_rnd(1,2):_rnd(1,3);
  const [a,b,c]=_pick(triples).map(v=>v*sc);
  const hideC=Math.random()<.65,answer=hideC?c:a;
  const bpx=Math.min(b*11,200),apx=Math.min(a*11,155),ox=45,oy=22;
  return mk('shapes',diff,hideC?`a=${a}, b=${b}. מה c (היתר)?`:`c=${c}, b=${b}. מה a?`,answer,
    svgW(300,225,`${gd(PAL.f[5],'pyg')}<polygon points="${ox},${oy+apx} ${ox+bpx},${oy+apx} ${ox},${oy}" fill="${PAL.f[5]}77" stroke="${PAL.s[5]}" stroke-width="3" filter="url(#pyg)"/>${rb(ox,oy+apx-11)}${dl(ox,oy+apx+14,ox+bpx,oy+apx+14,'b='+b,PAL.s[5])}${dl(ox-18,oy,ox-18,oy+apx,hideC?'a='+a:'a=?',PAL.s[5])}${tx((ox+(ox+bpx))/2-8,oy+apx/2,hideC?'c=?':'c='+c,'#ffd32a',17)}${tx(155,210,'a²+b²=c²','#ffffff44',12)}`),
    hideC?`💡 c=√(${a}²+${b}²)=${c}`:`💡 a=√(${c}²-${b}²)=${a}`);
}

function g5_extAngle(diff){
  const a=_rnd(40,80),b=_rnd(30,100-a),c=180-a-b;
  if(c<=5) return g5_extAngle(diff);
  const ext=a+b;
  return mk('shapes',diff,'זווית חיצונית = סכום 2 הזוויות הרחוקות. מה הזווית החיצונית?',ext,
    svgW(300,222,`<polygon points="50,192 250,192 150,52" fill="${PAL.f[0]}77" stroke="${PAL.s[0]}" stroke-width="3"/>${tx(145,74,a+'°','#ffd32a',15)}${tx(218,182,b+'°','#ffd32a',15)}${tx(62,182,c+'°','#7ec8ff',15)}<line x1="50" y1="192" x2="10" y2="192" stroke="${PAL.s[3]}" stroke-width="2.5" stroke-dasharray="5,3"/>${arc(50,192,32,180,180+ext,PAL.f[3])}${tx(18,172,'?°','#ff7eb3',17)}${tx(150,148,a+'+'+b+'=?','#ffffff55',12)}`),
    `💡 ${a}+${b}=${ext}`);
}

function g5_rotateCube(diff){
  // 3D cube nets — how many faces
  const shapeOpts=[{sh:'cube',q:'כמה פנים לקובייה?',ans:6},{sh:'prism',q:'כמה קצוות למנסרה משולשת?',ans:9},{sh:'pyramid',q:'כמה קודקודים לפירמידה?',ans:5}];
  const opt=_pick(shapeOpts);
  const w=rot3DWidget(opt.sh,'סובב וספור!',opt.ans,'💡 ספור בזהירות תוך כדי סיבוב');
  return mk('shapes',diff,opt.q,opt.ans,w.shapeHtml,w.hint);
}

function g5_compoundPerim(diff){
  const rW=diff==='easy'?_rnd(4,8):diff==='medium'?_rnd(5,12):_rnd(6,16);
  const rH=diff==='easy'?_rnd(3,7):diff==='medium'?_rnd(4,10):_rnd(5,14);
  const tH=diff==='easy'?_rnd(2,5):diff==='medium'?_rnd(3,8):_rnd(4,10);
  // house = rectangle bottom + triangle top
  const slant=Math.round(Math.sqrt((rW/2)**2+tH**2)*10)/10;
  const answer=diff==='hard'?Math.round(rH*2+rW+2*slant):rW+2*rH+2*Math.round(slant);
  const sc=12,rWp=rW*sc,rHp=rH*sc,tHp=tH*sc,ox=(300-rWp)/2,oy=20;
  return mk('shapes',diff,`מה היקף הבית (מלבן+משולש)?`,answer,
    svgW(300,220,`<rect x="${ox}" y="${oy+tHp}" width="${rWp}" height="${rHp}" fill="${PAL.f[1]}88" stroke="${PAL.s[1]}" stroke-width="3" rx="3"/><polygon points="${ox+rWp/2},${oy} ${ox+rWp},${oy+tHp} ${ox},${oy+tHp}" fill="${PAL.f[3]}88" stroke="${PAL.s[3]}" stroke-width="3"/>${dl(ox,oy+tHp+rHp+14,ox+rWp,oy+tHp+rHp+14,rW+'',PAL.s[1])}${dl(ox-18,oy+tHp,ox-18,oy+tHp+rHp,rH+'',PAL.s[1])}${tx(ox+rWp/2,oy+tHp/2+4,'גובה '+tH,'#ffe07e',12)}`),
    `💡 תחתון: ${rW}+2×${rH}, גג: 2×${Math.round(slant)}`);
}

function g5_circleArea(diff){
  const r=diff==='easy'?_rnd(2,5):diff==='medium'?_rnd(3,9):_rnd(4,14);
  const answer=Math.round(r*r*314)/100|0;
  const cr=Math.min(r*9,100),cx=150,cy=115;
  return mk('shapes',diff,`שטח עיגול רדיוס ${r}? (π=3.14, שלם)`,answer,
    svgW(300,225,`${gd(PAL.f[4],'ca5')}<circle cx="${cx}" cy="${cy}" r="${cr}" fill="${PAL.f[4]}55" stroke="${PAL.s[4]}" stroke-width="3" filter="url(#ca5)"><animate attributeName="fill-opacity" values=".3;.65;.3" dur="2s" repeatCount="indefinite"/></circle><line x1="${cx}" y1="${cy}" x2="${cx+cr}" y2="${cy}" stroke="#ffd32a" stroke-width="2.5"/>${tx(cx+cr/2,cy-10,'r='+r,'#ffd32a',14)}${tx(cx,cy+cr+18,'π×r²=?','#ffffff77',13)}<circle cx="${cx}" cy="${cy}" r="4" fill="#ffd32a"/>`),
    `💡 3.14×${r}²=3.14×${r*r}≈${answer}`);
}

// ── GRADE 6 question functions ───────────────────────────────

function g6_circleArea(diff){
  const r=diff==='easy'?_rnd(2,6):diff==='medium'?_rnd(3,10):_rnd(4,14);
  const answer=Math.round(r*r*314)/100|0;
  const cr=Math.min(r*9,100),cx=150,cy=115;
  return mk('shapes',diff,`שטח עיגול רדיוס ${r}? (π=3.14, שלם)`,answer,
    svgW(300,225,`${gd(PAL.f[4],'cag6')}<circle cx="${cx}" cy="${cy}" r="${cr}" fill="${PAL.f[4]}55" stroke="${PAL.s[4]}" stroke-width="3" filter="url(#cag6)"><animate attributeName="fill-opacity" values=".3;.65;.3" dur="2s" repeatCount="indefinite"/></circle><line x1="${cx}" y1="${cy}" x2="${cx+cr}" y2="${cy}" stroke="#ffd32a" stroke-width="2.5"/>${tx(cx+cr/2,cy-10,'r='+r,'#ffd32a',14)}${tx(cx,cy+cr+18,'π×r²=?','#ffffff77',13)}<circle cx="${cx}" cy="${cy}" r="4" fill="#ffd32a"/>`),
    `💡 3.14×${r}²≈${answer}`);
}

function g6_pythagoras(diff){
  const triples=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29]];
  const sc=diff==='easy'?1:diff==='medium'?_rnd(1,3):_rnd(2,4);
  const [a,b,c]=_pick(triples).map(v=>v*sc);
  const hideC=Math.random()<.6,answer=hideC?c:a;
  const bpx=Math.min(b*8,190),apx=Math.min(a*8,155),ox=48,oy=18;
  return mk('shapes',diff,hideC?`a=${a}, b=${b}. חשב c (פיתגורס).`:`c=${c}, b=${b}. חשב a.`,answer,
    svgW(300,228,`${gd(PAL.f[5],'fpg6')}<polygon points="${ox},${oy+apx} ${ox+bpx},${oy+apx} ${ox},${oy}" fill="${PAL.f[5]}77" stroke="${PAL.s[5]}" stroke-width="3" filter="url(#fpg6)"/>${rb(ox,oy+apx-11)}${dl(ox,oy+apx+14,ox+bpx,oy+apx+14,'b='+b,PAL.s[5])}${dl(ox-18,oy,ox-18,oy+apx,hideC?'a='+a:'a=?',PAL.s[5])}${tx((ox+(ox+bpx))/2-10,oy+apx/2,hideC?'c=?':'c='+c,'#ffd32a',17)}${tx(155,212,'a²+b²=c²','#ffffff44',12)}`),
    hideC?`💡 c=√(${a*a}+${b*b})=${c}`:`💡 a=√(${c*c}-${b*b})=${a}`);
}

function g6_polyAngleSum(diff){
  const n=diff==='easy'?_pick([4,5]):diff==='medium'?_pick([5,6,7]):_pick([6,7,8,9]);
  const total=(n-2)*180;
  const answer=diff==='easy'?Math.floor(total/n):_rnd(Math.floor(total*.12),Math.floor(total*.42));
  const rest=total-answer;
  const polys=['','60,40 240,40 270,185 30,185','150,25 245,95 210,205 90,205 55,95','150,22 233,68 233,162 150,208 67,162 67,68','150,20 224,55 252,135 214,200 86,200 48,135 76,55','150,18 211,42 248,108 234,185 150,215 66,185 52,108 89,42','150,15 203,38 240,90 240,155 203,207 150,225 97,207 60,155 60,90 97,38'];
  const poly=polys[Math.min(n,9)-1]||polys[6];
  return mk('shapes',diff,`סכום זוויות ${n}-צלע=${total}°. שאר=${rest}°. מה החסרה?`,answer,
    svgW(300,240,`<polygon points="${poly}" fill="${PAL.f[6]}77" stroke="${PAL.s[6]}" stroke-width="3"/>${tx(150,118,'סכום='+total+'°','#ffffff55',13)}${tx(150,145,rest+'+?='+total,'#ffd32a',14)}${tx(150,228,n+' צלעות','#ffffff44',11)}`),
    `💡 ?=${total}-${rest}=${answer}`);
}

function g6_dragLShape(diff){
  const W=diff==='hard'?_rnd(7,16):_rnd(5,12),H=_rnd(4,W),w=_rnd(2,W-2),h=_rnd(2,H-2);
  if(w>=W||h>=H) return g6_dragLShape(diff);
  const answer=W*H-w*h;
  const id='ls'+Math.random().toString(36).slice(2,6);
  const html=`<div style="text-align:center;padding:4px">
    <canvas id="${id}" width="280" height="155" style="display:block;margin:0 auto;border-radius:12px;background:rgba(7,5,15,.8)"></canvas>
    <div style="display:flex;gap:8px;margin-top:6px;justify-content:center;flex-wrap:wrap">
      <label style="color:#ffe07e;font-family:Rubik,sans-serif;font-size:.78rem;display:flex;align-items:center;gap:4px">רוחב:<input type="range" id="${id}w" min="1" max="${W-1}" value="${w}" step="1" style="accent-color:#ffe07e;width:70px" oninput="window['_l${id}']()">&nbsp;<span id="${id}wv">${w}</span></label>
      <label style="color:#7ec8ff;font-family:Rubik,sans-serif;font-size:.78rem;display:flex;align-items:center;gap:4px">גובה:<input type="range" id="${id}h" min="1" max="${H-1}" value="${h}" step="1" style="accent-color:#7ec8ff;width:70px" oninput="window['_l${id}']()">&nbsp;<span id="${id}hv">${h}</span></label>
    </div>
    <div id="${id}a" style="color:#ffd32a;font-weight:900;font-family:Rubik,sans-serif;font-size:1rem;margin-top:3px"></div>
    <div style="color:#ffffff44;font-size:.72rem;font-family:Rubik,sans-serif">כשהשטח=${answer}, כתוב אותו</div>
  </div>
  <script>
  ${WIRE}
  window['_l${id}']=function(){
    const cv=document.getElementById('${id}');if(!cv)return;
    const ctx=cv.getContext('2d'),W=${W},H=${H},sc=Math.min(Math.floor(140/Math.max(W,H)),14);
    const cw=parseInt(document.getElementById('${id}w').value)||1,ch=parseInt(document.getElementById('${id}h').value)||1;
    document.getElementById('${id}wv').textContent=cw;document.getElementById('${id}hv').textContent=ch;
    const ox=20,oy=8,Wp=W*sc,Hp=H*sc,wp=cw*sc,hp=ch*sc;
    ctx.clearRect(0,0,280,155);
    const g=ctx.createLinearGradient(ox,oy,ox+Wp,oy+Hp);g.addColorStop(0,'${PAL.f[3]}cc');g.addColorStop(1,'${PAL.f[3]}66');
    ctx.fillStyle=g;ctx.strokeStyle='${PAL.s[3]}';ctx.lineWidth=2.5;
    ctx.beginPath();ctx.rect(ox,oy,Wp,Hp);ctx.fill();ctx.stroke();
    ctx.fillStyle='rgba(7,5,15,.95)';ctx.setLineDash([4,3]);ctx.strokeStyle='${PAL.s[0]}';ctx.lineWidth=1.5;
    ctx.beginPath();ctx.rect(ox+Wp-wp,oy,wp,hp);ctx.fill();ctx.stroke();ctx.setLineDash([]);
    ctx.fillStyle='#ffffffee';ctx.font='bold 12px Rubik';ctx.textAlign='center';ctx.fillText(W+'×'+H,ox+Wp/2,oy+Hp/2+(Hp>35?7:-4));
    ctx.fillStyle='rgba(255,255,255,.4)';ctx.font='10px Rubik';ctx.fillText(cw+'×'+ch,ox+Wp-wp/2,oy+hp/2+(hp>18?5:-3));
    const area=W*H-cw*ch;
    document.getElementById('${id}a').textContent='שטח='+W*H+'-'+cw*ch+'='+area+(area===${answer}?' ✅':'');
    window._sa&&window._sa(area);
  };window['_l${id}']();
  <\/script>`;
  return mk('shapes',diff,`שנה סליידרים עד שטח=${answer}, כתוב ${answer}`,answer,iW(html),`💡 ${W}×${H}-חיסור=${answer}`);
}

function g6_scaleFactor(diff){
  const oW=_rnd(3,8),oH=_rnd(2,7),sc=diff==='easy'?_rnd(2,3):diff==='medium'?_rnd(2,4):_rnd(2,5);
  const ask=Math.random()<.5,nW=oW*sc,nH=oH*sc;
  const answer=ask?nW*nH:2*(nW+nH);
  const pw=Math.min(nW*9,200),ph=Math.min(nH*9,130),ox=(300-pw)/2,oy=(215-ph)/2;
  const spw=Math.min(oW*9,90),sph=Math.min(oH*9,65);
  return mk('shapes',diff,ask?`מלבן ${oW}×${oH} הוגדל פי ${sc}. שטח חדש?`:`מלבן ${oW}×${oH} הוגדל פי ${sc}. היקף חדש?`,answer,
    svgW(300,215,`<rect x="${ox}" y="${oy}" width="${pw}" height="${ph}" fill="${PAL.f[1]}77" stroke="${PAL.s[1]}" stroke-width="3" rx="5"/><rect x="${ox-spw-10}" y="${oy}" width="${spw}" height="${sph}" fill="${PAL.f[3]}77" stroke="${PAL.s[3]}" stroke-width="2" rx="3"/><line x1="${ox-10}" y1="${oy+sph/2}" x2="${ox-5}" y2="${oy+ph/2}" stroke="#ffd32a" stroke-width="1.5" stroke-dasharray="4,3"/>${tx(ox-spw/2-10,oy+sph+12,oW+'×'+oH,'#ffe07e',10)}${dl(ox,oy-16,ox+pw,oy-16,nW+'',PAL.s[1])}${dl(ox-18,oy,ox-18,oy+ph,nH+'',PAL.s[1])}${tx(ox+pw/2,oy+ph/2+7,'?','#ffffffcc',20)}${tx(ox+pw/2,oy+ph+18,'×'+sc+' מכל מימד','#ffd32a',11)}`),
    ask?`💡 ${nW}×${nH}=${answer}`:`💡 2×(${nW}+${nH})=${answer}`);
}

function g6_3dSurface(diff){
  // Surface area of a cube
  const side=diff==='easy'?_rnd(2,5):diff==='medium'?_rnd(3,8):_rnd(4,12);
  const answer=6*side*side;
  const w=rot3DWidget('cube',`כל פנים = ${side}×${side}. כמה שטח פנים לקובייה?`,answer,`💡 קובייה: 6 פנים × ${side}² = ${answer}`);
  return mk('shapes',diff,`שטח פנים לקובייה שצלעה ${side}? (סובב לראות כל הפנים!)`,answer,w.shapeHtml,w.hint);
}

function g6_coordDist(diff){
  // Distance between two points (simple integer cases)
  const x1=_rnd(0,5),y1=_rnd(0,5),x2=_rnd(x1+1,x1+diff==='easy'?4:8),y2=diff==='easy'?y1:_rnd(0,5);
  const dist=diff==='easy'?x2-x1:Math.round(Math.sqrt((x2-x1)**2+(y2-y1)**2));
  const answer=dist;
  const cell=22,ox=30,oy=10,gW=10,gH=8;
  let grid='',nums='';
  for(let i=0;i<=gW;i++){grid+=`<line x1="${ox+i*cell}" y1="${oy}" x2="${ox+i*cell}" y2="${oy+gH*cell}" stroke="rgba(255,255,255,.09)" stroke-width="1"/>`;if(i>0)nums+=tx(ox+i*cell,oy+gH*cell+14,i,'#ffffff44',9);}
  for(let j=0;j<=gH;j++){grid+=`<line x1="${ox}" y1="${oy+j*cell}" x2="${ox+gW*cell}" y2="${oy+j*cell}" stroke="rgba(255,255,255,.09)" stroke-width="1"/>`;if(j>0)nums+=tx(ox-10,oy+(gH-j)*cell+5,j,'#ffffff44',9);}
  const px1=ox+x1*cell,py1=oy+(gH-y1)*cell,px2=ox+x2*cell,py2=oy+(gH-y2)*cell;
  return mk('shapes',diff,diff==='easy'?`מה המרחק בין (${x1},${y1}) ל-(${x2},${y2})?`:`מה המרחק (עגל שלם) בין (${x1},${y1}) ל-(${x2},${y2})?`,answer,
    svgW(300,218,`${grid}${nums}<line x1="${px1}" y1="${py1}" x2="${px2}" y2="${py2}" stroke="#ffd32a" stroke-width="2.5" stroke-dasharray="6,3"/><circle cx="${px1}" cy="${py1}" r="7" fill="#7ec8ff"/>${tx(px1,py1-10,'A','#7ec8ff',10)}<circle cx="${px2}" cy="${py2}" r="7" fill="#ff7eb3"/>${tx(px2,py2-10,'B','#ff7eb3',10)}${tx(ox+gW*cell/2,oy+gH*cell+26,'X →','#7ec8ff',10)}`),
    diff==='easy'?`💡 ספור ריבועים על הקו הצהוב`:`💡 √((${x2}-${x1})²+(${y2}-y1}²)≈${answer}`);
}

function g6_pyramidVolume(diff){
  // Volume of pyramid: (1/3)×base×height
  const b=diff==='easy'?_rnd(3,6):diff==='medium'?_rnd(4,9):_rnd(5,12);
  const h=diff==='easy'?_rnd(3,6):diff==='medium'?_rnd(4,10):_rnd(5,14);
  const vol=Math.round(b*b*h/3);
  const answer=vol;
  const w=rot3DWidget('pyramid',`בסיס ${b}×${b}, גובה ${h}`,answer,`💡 נפח=(⅓)×${b}²×${h}=${answer}`);
  return mk('shapes',diff,`נפח פירמידה (בסיס ריבוע ${b}×${b}, גובה ${h})? סובב לראות!`,answer,w.shapeHtml,w.hint);
}

// ── helper to build question object ─────────────────────────
function mk(cat,diff,text,answer,shapeHtml,hintMsg){
  return {type:'shapes',cat,diff,text,answer,pts:ptsForQ(cat,diff),shapeHtml,hint:{type:'text',msg:hintMsg||'💡 חשוב!'},showMul:false,dir:'rtl',label:'📐 גיאומטריה',gameLabel:''};
}

// ── ROUTER ───────────────────────────────────────────────────
window.genShapesInteractive=function(diff){
  const grade=window._grade||'ב';
  if(grade==='ב'){
    const p=[g2_countSides,g2_3dSpin,g2_symmetry,g2_tangram,g2_mirrorDraw,g2_angleSlider,g2_colorFill,g2_oddShape];
    return _wp(p,diff==='easy'?[4,1,2,2,2,1,3,2]:diff==='medium'?[2,2,2,2,2,2,2,2]:[1,2,1,1,1,3,1,2])(diff);
  }
  if(grade==='ג'){
    const p=[g3_perimeter,g3_gridArea,g3_angleType,g3_dragAngle,g3_missingDim,g3_pattern,g3_3dFaces,g3_foldedArea];
    return _wp(p,diff==='easy'?[3,3,2,1,2,2,1,1]:diff==='medium'?[2,2,2,2,2,2,2,2]:[2,1,2,3,2,1,2,2])(diff);
  }
  if(grade==='ד'){
    const p=[g4_rectArea,g4_triArea,g4_dragResize,g4_angleSumTri,g4_coordGrid,g4_3dVolume,g4_areaOnGrid,g4_reflectShape];
    return _wp(p,diff==='easy'?[3,1,2,2,2,1,2,1]:diff==='medium'?[2,2,2,2,2,2,2,2]:[1,2,2,3,2,3,2,1])(diff);
  }
  if(grade==='ה'){
    const p=[g5_lShape,g5_circleCirc,g5_protractor,g5_pythagorasIntro,g5_extAngle,g5_rotateCube,g5_compoundPerim,g5_circleArea];
    return _wp(p,diff==='easy'?[2,2,2,1,1,2,1,2]:diff==='medium'?[2,2,2,2,2,2,2,2]:[1,2,2,3,2,2,2,2])(diff);
  }
  if(grade==='ו'){
    const p=[g6_circleArea,g6_pythagoras,g6_polyAngleSum,g6_dragLShape,g6_scaleFactor,g6_3dSurface,g6_coordDist,g6_pyramidVolume];
    return _wp(p,diff==='easy'?[3,1,2,1,2,2,2,1]:diff==='medium'?[2,2,2,2,2,2,2,2]:[2,2,3,2,3,2,2,3])(diff);
  }
  return g2_countSides('easy');
};

function _wp(arr,w){const t=w.reduce((a,b)=>a+b,0);let r=Math.random()*t;for(let i=0;i<arr.length;i++){r-=w[i];if(r<=0)return arr[i];}return arr[arr.length-1];}

})();
