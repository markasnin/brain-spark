// ══════════════════════════════════════════════════════════════
// shapes.js v3 — SPECTACULAR Interactive Geometry & Measurement
// Rich SVG shapes, labeled dimensions, animations, drag/tap UI
// Grades 2-6 with grade-appropriate content
// ══════════════════════════════════════════════════════════════
(function () {

const _rnd  = (a,b) => Math.floor(Math.random()*(b-a+1))+a;
const _pick = arr   => arr[Math.floor(Math.random()*arr.length)];

// ── Colour palette ──
const C = {
  red:'#ff4757', orange:'#ff6348', yellow:'#ffd32a', green:'#2ed573',
  blue:'#1e90ff', purple:'#9b59b6', pink:'#ff6eb4', teal:'#00d2d3',
  lime:'#a8e063', coral:'#ff8090',
  bg:'#0d1033', card:'rgba(255,255,255,.06)',
  white:'#e2e8f0', dim:'#8892b0', faint:'rgba(255,255,255,.08)'
};
const PALETTES = [
  [C.blue, C.teal], [C.green, C.lime], [C.orange, C.yellow],
  [C.purple, C.pink], [C.red, C.coral], [C.teal, C.green]
];
function pal(i){ return PALETTES[i % PALETTES.length]; }

// ── SVG helpers ──
function svg(w,h,body,extra){
  extra=extra||'';
  return '<svg width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h
    +'" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:0 auto;overflow:visible;'+extra+'">'+body+'</svg>';
}
function tx(x,y,t,col,sz,anchor,weight){
  col=col||C.white; sz=sz||13; anchor=anchor||'middle'; weight=weight||'600';
  return '<text x="'+x+'" y="'+y+'" text-anchor="'+anchor+'" font-size="'+sz+'"'
    +' font-family="Fredoka,Rubik,sans-serif" fill="'+col+'" font-weight="'+weight+'">'+t+'</text>';
}
// Dimension label on a line with tick marks
function dimLabel(x1,y1,x2,y2,lbl,col,offset){
  col=col||C.yellow; offset=offset||14;
  var mx=(x1+x2)/2, my=(y1+y2)/2;
  var dx=x2-x1, dy=y2-y1, len=Math.sqrt(dx*dx+dy*dy)||1;
  var nx=-dy/len, ny=dx/len;
  var lx=mx+nx*offset, ly=my+ny*offset;
  // Ticks
  var tk='<line x1="'+(x1+nx*4)+'" y1="'+(y1+ny*4)+'" x2="'+(x1-nx*4)+'" y2="'+(y1-ny*4)+'"'
    +' stroke="'+col+'" stroke-width="1.5" opacity=".7"/>';
  tk+='<line x1="'+(x2+nx*4)+'" y1="'+(y2+ny*4)+'" x2="'+(x2-nx*4)+'" y2="'+(y2-ny*4)+'"'
    +' stroke="'+col+'" stroke-width="1.5" opacity=".7"/>';
  // Dashed line
  var dl='<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'"'
    +' stroke="'+col+'" stroke-width="1.2" stroke-dasharray="4,3" opacity=".6"/>';
  // Pill background for label
  var pill='<rect x="'+(lx-18)+'" y="'+(ly-9)+'" width="36" height="17" rx="8" fill="'+col+'22" stroke="'+col+'44" stroke-width="1"/>';
  return tk+dl+pill+tx(lx,ly+4,lbl,col,11,'middle','700');
}
// Right angle box
function rightAngle(x,y,sz,rot){
  sz=sz||10; rot=rot||0;
  return '<rect x="'+x+'" y="'+y+'" width="'+sz+'" height="'+sz+'"'
    +' fill="none" stroke="'+C.yellow+'" stroke-width="1.8"'
    +' transform="rotate('+rot+' '+(x+sz/2)+' '+(y+sz/2)+')" opacity=".85"/>';
}
// Glow filter def
function glowFilter(id,col,blur){
  blur=blur||4;
  return '<defs><filter id="'+id+'" x="-30%" y="-30%" width="160%" height="160%">'
    +'<feGaussianBlur in="SourceGraphic" stdDeviation="'+blur+'" result="b"/>'
    +'<feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>'
    +'</filter></defs>';
}
// Animated entrance
function fadeIn(el){ return el.replace('<','<').replace('>','>'); } // SVG handles animation

// Card wrapper with gradient border
function card(inner,accent,title,emoji){
  accent=accent||C.blue;
  var header='';
  if(title){
    header='<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;'
      +'border-bottom:1px solid '+accent+'33;padding-bottom:10px">'
      +'<span style="font-size:1.6rem">'+emoji+'</span>'
      +'<span style="font-family:Fredoka,sans-serif;font-size:1rem;font-weight:700;color:'+accent+'">'+title+'</span>'
      +'</div>';
  }
  return '<div style="background:linear-gradient(145deg,rgba(255,255,255,.06),rgba(255,255,255,.02));'
    +'border:2px solid '+accent+'44;border-radius:20px;padding:16px;'
    +'box-shadow:0 8px 32px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.06)">'+header+inner+'</div>';
}
// Instruction chip
function chip(txt,col){
  col=col||C.yellow;
  return '<div style="display:inline-flex;align-items:center;gap:6px;background:'+col+'1a;'
    +'border:1.5px solid '+col+'55;border-radius:99px;padding:5px 14px;margin-bottom:12px;'
    +'font-family:Fredoka,sans-serif;font-size:.92rem;color:'+col+'">'+txt+'</div>';
}
// Fact row (emoji + text)
function fact(emoji,txt,col){
  col=col||C.dim;
  return '<div style="display:flex;align-items:center;gap:8px;padding:6px 0;'
    +'font-family:Rubik,sans-serif;font-size:.88rem;color:'+col+'">'
    +'<span style="font-size:1.2rem">'+emoji+'</span><span>'+txt+'</span></div>';
}

function ptsFor(diff){ const gc=window.GRADE_CONFIG; return gc&&gc.pts?gc.pts[diff]||(diff==='easy'?5:diff==='medium'?10:18):(diff==='easy'?5:diff==='medium'?10:18); }

function mkQ(diff, text, answer, shapeHtml, hintMsg, label){
  label=label||'📐 גיאומטריה ומדידה';
  return {
    type:'shapes', cat:'shapes', diff,
    text:text, answer:answer,
    pts:ptsFor(diff), shapeHtml:shapeHtml,
    hint:{type:'text', msg:hintMsg},
    showMul:false, dir:'rtl', label:label, gameLabel:''
  };
}

// ════════════════════════════════════════════════════════════════
// GRADE 2 — Count sides, basic shapes, simple symmetry
// ════════════════════════════════════════════════════════════════

function g2_countSides(diff){
  var shapes=[
    {name:'משולש',n:3,pts:'150,40 260,200 40,200',col:C.green,emoji:'🔺'},
    {name:'ריבוע',n:4,pts:'70,55 230,55 230,195 70,195',col:C.blue,emoji:'🟦'},
    {name:'מלבן',n:4,pts:'45,75 255,75 255,175 45,175',col:C.teal,emoji:'▭'},
    {name:'מחומש',n:5,pts:'150,28 245,98 210,210 90,210 55,98',col:C.purple,emoji:'⬠'},
    {name:'משושה',n:6,pts:'150,25 232,72 232,164 150,212 68,164 68,72',col:C.orange,emoji:'⬡'},
  ];
  var sh=_pick(shapes), c=sh.col;
  var ask=diff==='hard'?'פינות':'צלעות';
  var ptsArr=sh.pts.split(' ').map(function(p){return p.split(',').map(Number);});
  // Draw shape with glowing fill
  var body=glowFilter('gsh',c)
    +'<polygon points="'+sh.pts+'" fill="'+c+'22" stroke="'+c+'" stroke-width="3" filter="url(#gsh)"/>';
  // Number each side midpoint with a circle
  for(var i=0;i<ptsArr.length;i++){
    var a=ptsArr[i], b=ptsArr[(i+1)%ptsArr.length];
    var mx=(a[0]+b[0])/2, my=(a[1]+b[1])/2;
    body+='<circle cx="'+mx+'" cy="'+my+'" r="13" fill="'+c+'" opacity=".95"/>';
    body+=tx(mx,my+5,i+1,'#111',11);
  }
  // Center emoji
  var cx=150, cy=130;
  body+=tx(cx,cy+5,sh.emoji,'',28);

  var html=card(
    chip(sh.emoji+' לחץ לספור את ה'+ask+'!',c)
    +'<div style="text-align:center;margin-bottom:10px">'+svg(300,240,body)+'</div>'
    +fact('💡','כל עיגול מסמן '+( ask==='צלעות'?'צלע אחת':'פינה אחת'),C.dim)
  ,c,'ספור ה'+ask+': '+sh.name,'🔷');

  return mkQ(diff,
    'כמה '+ask+' יש ל'+sh.name+'?',
    sh.n, html,
    '💡 ספור את העיגולים: '+sh.n+' '+ask,
    '📐 גיאומטריה');
}

function g2_shapeFamily(diff){
  // Match a shape to its name — 4 options shown
  var all=[
    {name:'משולש',pts:'100,30 170,130 30,130',col:C.green},
    {name:'ריבוע',pts:'40,40 140,40 140,140 40,140',col:C.blue},
    {name:'עיגול',col:C.orange,isCircle:true,cx:90,cy:90,r:60},
    {name:'מחומש',pts:'90,25 155,70 130,145 50,145 25,70',col:C.purple},
  ];
  var target=_pick(all);
  // Draw 4 shapes
  var shapes=all.slice();
  // Shuffle
  shapes.sort(function(){return Math.random()-.5;});
  var rows='<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">';
  var correctIdx=-1;
  shapes.forEach(function(sh,i){
    if(sh.name===target.name) correctIdx=i+1;
    var s;
    if(sh.isCircle){
      s='<circle cx="'+sh.cx+'" cy="'+sh.cy+'" r="'+sh.r+'" fill="'+sh.col+'33" stroke="'+sh.col+'" stroke-width="3"/>';
    } else {
      s='<polygon points="'+sh.pts+'" fill="'+sh.col+'33" stroke="'+sh.col+'" stroke-width="3"/>';
    }
    rows+='<div style="background:rgba(255,255,255,.05);border:2px solid '+sh.col+'44;border-radius:14px;padding:8px;text-align:center">'
      +'<div style="font-family:Fredoka,sans-serif;font-size:.8rem;color:'+C.dim+';margin-bottom:4px">'+(i+1)+'</div>'
      +svg(170,155,s)
      +'</div>';
  });
  rows+='</div>';

  var html=card(
    chip('🔍 מצא את ה'+target.name+'!',C.yellow)
    +rows
    +'<div style="text-align:center;font-family:Rubik,sans-serif;font-size:.82rem;color:'+C.dim+'">כתוב את המספר (1-4)</div>'
  ,C.yellow,'איזו צורה היא '+target.name+'?','🔷');

  return mkQ(diff,'איזו צורה היא '+target.name+'? כתוב מספרה (1–4)',correctIdx,html,'💡 מספר '+correctIdx+' הוא '+target.name,'📐 גיאומטריה');
}

function g2_symmetry(diff){
  var shapes=[
    {name:'ריבוע',axes:4,pts:'75,55 225,55 225,185 75,185',col:C.blue},
    {name:'מלבן',axes:2,pts:'40,80 260,80 260,170 40,170',col:C.teal},
    {name:'משולש שווה-צלעות',axes:3,pts:'150,30 255,195 45,195',col:C.green},
    {name:'עיגול',axes:999,col:C.orange,isCircle:true,cx:150,cy:115,r:85},
    {name:'מעוין',axes:2,pts:'150,25 255,112 150,195 45,112',col:C.purple},
  ];
  var sh=_pick(shapes);
  var axisColors=[C.yellow,C.pink,C.lime,C.teal];
  var axLines='';
  if(sh.axes>=1) axLines+='<line x1="150" y1="22" x2="150" y2="215" stroke="'+axisColors[0]+'" stroke-width="2.5" stroke-dasharray="8,5" opacity=".8"/>';
  if(sh.axes>=2) axLines+='<line x1="28" y1="118" x2="272" y2="118" stroke="'+axisColors[1]+'" stroke-width="2.5" stroke-dasharray="8,5" opacity=".8"/>';
  if(sh.axes>=3) axLines+='<line x1="42" y1="42" x2="258" y2="194" stroke="'+axisColors[2]+'" stroke-width="2.5" stroke-dasharray="6,4" opacity=".7"/>';
  if(sh.axes>=4) axLines+='<line x1="258" y1="42" x2="42" y2="194" stroke="'+axisColors[3]+'" stroke-width="2.5" stroke-dasharray="6,4" opacity=".7"/>';
  if(sh.axes===999){
    axLines='';
    for(var a=0;a<180;a+=20){
      var r1=a*Math.PI/180;
      axLines+='<line x1="'+(150+86*Math.cos(r1)).toFixed(1)+'" y1="'+(115+86*Math.sin(r1)).toFixed(1)
        +'" x2="'+(150-86*Math.cos(r1)).toFixed(1)+'" y2="'+(115-86*Math.sin(r1)).toFixed(1)
        +'" stroke="'+axisColors[a/20%4]+'" stroke-width="1.2" stroke-dasharray="4,4" opacity=".45"/>';
    }
  }
  var shapeEl=sh.isCircle
    ?'<circle cx="'+sh.cx+'" cy="'+sh.cy+'" r="'+sh.r+'" fill="'+sh.col+'28" stroke="'+sh.col+'" stroke-width="3"/>'
    :'<polygon points="'+sh.pts+'" fill="'+sh.col+'28" stroke="'+sh.col+'" stroke-width="3"/>';

  var displayAxes=sh.axes===999?'∞':sh.axes;
  var answerVal=sh.axes===999?99:sh.axes;

  var html=card(
    chip('✨ ספור צירי סימטריה!',sh.col)
    +'<div style="text-align:center;margin-bottom:8px">'
    +svg(300,240,glowFilter('gsym',sh.col)+shapeEl+axLines)
    +'</div>'
    +fact('🪞','ציר סימטריה חוצה לשני חצאים שווים',C.dim)
    +(sh.axes===999?fact('♾️','עיגול — אינסוף צירים! כתוב 99',C.yellow):'')
  ,sh.col,'סימטריה: '+sh.name,'🪞');

  return mkQ(diff,
    sh.axes===999?'כמה צירי סימטריה לעיגול? (כתוב 99)':'כמה צירי סימטריה יש ל'+sh.name+'?',
    answerVal, html,
    '💡 '+sh.name+' — '+displayAxes+' צירי סימטריה',
    '📐 גיאומטריה');
}

function g2_measureRuler(diff){
  // Show a ruler with an object on it, count cm
  var objs=[
    {name:'עיפרון ✏️',emoji:'✏️',len:diff==='easy'?_rnd(2,6):_rnd(4,12)},
    {name:'גזר 🥕',emoji:'🥕',len:diff==='easy'?_rnd(2,5):_rnd(3,10)},
    {name:'מכחול 🖌️',emoji:'🖌️',len:diff==='easy'?_rnd(3,7):_rnd(4,11)},
  ];
  var obj=_pick(objs);
  var len=obj.len;
  var pixPerCm=22, rulerW=Math.max(len+3,8)*pixPerCm, ox=20, oy=90;
  var body='';
  // Ruler base
  body+='<rect x="'+ox+'" y="'+oy+'" width="'+(rulerW)+'" height="32" fill="'+C.yellow+'22" stroke="'+C.yellow+'" stroke-width="2" rx="4"/>';
  // Tick marks and numbers
  for(var i=0;i<=len+2;i++){
    var tx2=ox+i*pixPerCm;
    body+='<line x1="'+tx2+'" y1="'+oy+'" x2="'+tx2+'" y2="'+(i%5===0?oy-12:oy-6)+'" stroke="'+C.yellow+'" stroke-width="'+(i%5===0?2:1)+'" opacity="0.8"/>';
    if(i%2===0) body+=tx(tx2,oy-15,i,C.dim,10);
  }
  body+=tx(ox+rulerW/2,oy+20,'ס"מ',C.yellow,11);
  // Object drawn above ruler
  body+='<rect x="'+ox+'" y="'+(oy-44)+'" width="'+(len*pixPerCm)+'" height="28" rx="8" fill="'+C.green+'44" stroke="'+C.green+'" stroke-width="2.5"/>';
  body+=tx(ox+len*pixPerCm/2,oy-24,obj.emoji,'',22);
  // Start/end arrows
  body+='<line x1="'+ox+'" y1="'+(oy-48)+'" x2="'+ox+'" y2="'+(oy-8)+'" stroke="'+C.green+'" stroke-width="1.5" stroke-dasharray="3,2" opacity=".6"/>';
  body+='<line x1="'+(ox+len*pixPerCm)+'" y1="'+(oy-48)+'" x2="'+(ox+len*pixPerCm)+'" y2="'+(oy-8)+'" stroke="'+C.green+'" stroke-width="1.5" stroke-dasharray="3,2" opacity=".6"/>';

  var html=card(
    chip('📏 קרא את הסרגל!',C.green)
    +'<div style="text-align:center;margin-bottom:8px;overflow-x:auto">'
    +svg(rulerW+50,130,body)
    +'</div>'
    +fact('📐','מתחיל מ-0, נגמר ב-?',C.dim)
  ,C.green,'מדידה: '+obj.emoji,'📏');

  return mkQ(diff,'כמה ס"מ ארוך ה'+obj.name+'?',len,html,'💡 הספר מ-0 עד הסוף: '+len+' ס"מ','📏 מדידה');
}

// ════════════════════════════════════════════════════════════════
// GRADE 3 — Perimeter with labeled shapes, grids, angles
// ════════════════════════════════════════════════════════════════

function g3_perimeterSquare(diff){
  var s=diff==='easy'?_rnd(2,8):diff==='medium'?_rnd(5,15):_rnd(8,25);
  var answer=4*s;
  var c=pal(0);
  var sx=75, sy=40, side=150;
  var body=glowFilter('gsq',c[0])
    +'<rect x="'+sx+'" y="'+sy+'" width="'+side+'" height="'+side+'" fill="'+c[0]+'22" stroke="'+c[0]+'" stroke-width="3.5" rx="6" filter="url(#gsq)"/>';
  // Right angle boxes
  body+=rightAngle(sx,sy+side-10,10);
  body+=rightAngle(sx+side-10,sy,10);
  body+=rightAngle(sx,sy,10);
  body+=rightAngle(sx+side-10,sy+side-10,10);
  // Dimension labels on all 4 sides
  body+=dimLabel(sx,sy-2,sx+side,sy-2,s+' ס"מ',c[1],16);
  body+=dimLabel(sx+side+2,sy,sx+side+2,sy+side,s+' ס"מ',c[1],16);
  body+=dimLabel(sx,sy+side+2,sx+side,sy+side+2,s+' ס"מ',c[1],-16);
  body+=dimLabel(sx-2,sy,sx-2,sy+side,s+' ס"מ',c[1],-16);
  // Question mark in center
  body+=tx(sx+side/2,sy+side/2+8,'?',C.white,28,'middle','900');

  var html=card(
    chip('🟦 ריבוע — כל הצלעות שוות!',c[0])
    +'<div style="text-align:center;margin-bottom:10px">'+svg(300,250,body)+'</div>'
    +fact('📐','היקף = 4 × צלע = 4 × '+s,C.dim)
    +fact('🧮','= '+answer+' ס"מ',C.green)
  ,c[0],'היקף ריבוע','📐');

  return mkQ(diff,'מה היקף הריבוע שצלעו '+s+' ס"מ?',answer,html,'💡 4 × '+s+' = '+answer,'📐 היקף');
}

function g3_perimeterRect(diff){
  var w=diff==='easy'?_rnd(3,8):diff==='medium'?_rnd(5,16):_rnd(6,24);
  var h=_rnd(2,Math.max(3,w-1));
  var answer=2*(w+h);
  var c=pal(2);
  var pw=Math.min(w*11,200), ph=Math.min(Math.max(h*11,55),140);
  var ox=(300-pw)/2, oy=(220-ph)/2+10;
  var body=glowFilter('grc',c[0])
    +'<rect x="'+ox+'" y="'+oy+'" width="'+pw+'" height="'+ph+'" fill="'+c[0]+'22" stroke="'+c[0]+'" stroke-width="3.5" rx="6" filter="url(#grc)"/>';
  body+=rightAngle(ox,oy,10);
  body+=dimLabel(ox,oy-4,ox+pw,oy-4,w+' ס"מ',c[1],18);
  body+=dimLabel(ox-4,oy,ox-4,oy+ph,h+' ס"מ',c[1],18);
  body+=tx(ox+pw/2,oy+ph/2+8,'?',C.white,26,'middle','900');

  var html=card(
    chip('▭ מלבן — שני זוגות שווים!',c[0])
    +'<div style="text-align:center;margin-bottom:10px">'+svg(300,230,body)+'</div>'
    +fact('📐','היקף = 2×('+w+'+'+h+') = 2×'+(w+h)+' = '+answer+' ס"מ',C.dim)
  ,c[0],'היקף מלבן','📐');

  return mkQ(diff,'מה היקף המלבן? ('+w+' ס"מ × '+h+' ס"מ)',answer,html,'💡 2×('+w+'+'+h+') = '+answer,'📐 היקף');
}

function g3_perimeterTriangle(diff){
  var a=_rnd(3,diff==='hard'?18:10);
  var b=_rnd(3,diff==='hard'?16:10);
  var c2=_rnd(3,diff==='hard'?14:9);
  var answer=a+b+c2;
  var c=pal(1);
  var body=glowFilter('gtr',c[0])
    +'<polygon points="150,28 262,198 38,198" fill="'+c[0]+'22" stroke="'+c[0]+'" stroke-width="3.5" filter="url(#gtr)"/>';
  // Label each side
  body+=dimLabel(38,198,262,198,a+' ס"מ',c[1],-18); // bottom
  body+=dimLabel(262,198,150,28,b+' ס"מ',c[1],18);   // right
  body+=dimLabel(150,28,38,198,c2+' ס"מ',c[1],-18);  // left
  body+=tx(150,132,'?',C.white,26,'middle','900');

  var html=card(
    chip('🔺 משולש — שלוש צלעות!',c[0])
    +'<div style="text-align:center;margin-bottom:10px">'+svg(300,235,body)+'</div>'
    +fact('📐','היקף = '+a+' + '+b+' + '+c2+' = '+answer+' ס"מ',C.dim)
  ,c[0],'היקף משולש','📐');

  return mkQ(diff,'מה היקף המשולש? (צלעות '+a+', '+b+', '+c2+' ס"מ)',answer,html,'💡 '+a+'+'+b+'+'+c2+' = '+answer,'📐 היקף');
}

function g3_gridArea(diff){
  var cols=diff==='easy'?_rnd(2,5):diff==='medium'?_rnd(3,8):_rnd(4,11);
  var rows=diff==='easy'?_rnd(2,5):diff==='medium'?_rnd(2,7):_rnd(3,9);
  var answer=cols*rows;
  var cell=Math.min(Math.floor(200/Math.max(cols,rows)),30);
  var gw=cols*cell, gh=rows*cell;
  var ox=(300-gw)/2, oy=Math.max((220-gh)/2,18);
  var c=pal(3);
  var body='';
  // Colored cells with alternating shade
  for(var r=0;r<rows;r++){
    for(var cl=0;cl<cols;cl++){
      var hue=((r*cols+cl)/(rows*cols)*90+180)|0;
      body+='<rect x="'+(ox+cl*cell)+'" y="'+(oy+r*cell)+'" width="'+cell+'" height="'+cell
        +'" fill="hsla('+hue+',65%,62%,.5)" stroke="rgba(255,255,255,.2)" stroke-width="1" rx="2"/>';
      // Number each cell
      if(cell>=22) body+=tx(ox+cl*cell+cell/2,oy+r*cell+cell/2+5,r*cols+cl+1,'rgba(0,0,0,.6)',cell>=26?10:8);
    }
  }
  // Border
  body+='<rect x="'+ox+'" y="'+oy+'" width="'+gw+'" height="'+gh+'" fill="none" stroke="'+c[0]+'" stroke-width="2.5" rx="4"/>';
  // Dimension arrows
  body+=dimLabel(ox,oy-6,ox+gw,oy-6,cols+'',c[1],16);
  body+=dimLabel(ox-6,oy,ox-6,oy+gh,rows+'',c[0],16);

  var html=card(
    chip('⬛ ספור ריבועים! '+cols+' × '+rows,c[0])
    +'<div style="text-align:center;margin-bottom:10px">'+svg(300,240,body)+'</div>'
    +fact('🧮','שורות × עמודות = '+rows+' × '+cols+' = '+answer,C.dim)
  ,c[0],'שטח בגריד','📐');

  return mkQ(diff,'כמה ריבועים בגריד?',answer,html,'💡 '+rows+' × '+cols+' = '+answer,'📐 שטח');
}

function g3_angleType(diff){
  var cases=[
    {deg:90,name:'ישרה',num:2,col:C.teal,emoji:'🔲'},
    {deg:45,name:'חדה',num:1,col:C.green,emoji:'⚡'},
    {deg:30,name:'חדה',num:1,col:C.green,emoji:'⚡'},
    {deg:60,name:'חדה',num:1,col:C.green,emoji:'⚡'},
    {deg:120,name:'קהה',num:3,col:C.orange,emoji:'🔔'},
    {deg:135,name:'קהה',num:3,col:C.orange,emoji:'🔔'},
    {deg:150,name:'קהה',num:3,col:C.orange,emoji:'🔔'},
  ];
  var pool=diff==='easy'?cases.slice(0,3):cases;
  var ch=_pick(pool);
  var cx=140, cy=160, r=105;
  var rad=ch.deg*Math.PI/180;
  var x2=cx+r*Math.cos(-rad), y2=cy+r*Math.sin(-rad);
  var body=glowFilter('gag',ch.col)
    +'<line x1="'+cx+'" y1="'+cy+'" x2="'+(cx+r)+'" y2="'+cy+'" stroke="'+ch.col+'" stroke-width="5" stroke-linecap="round" filter="url(#gag)"/>'
    +'<line x1="'+cx+'" y1="'+cy+'" x2="'+x2.toFixed(1)+'" y2="'+y2.toFixed(1)+'" stroke="'+ch.col+'" stroke-width="5" stroke-linecap="round" filter="url(#gag)"/>';
  // Arc
  var arad=ch.deg*Math.PI/180;
  var ax1=cx+40*Math.cos(-arad), ay1=cy+40*Math.sin(-arad);
  body+='<path d="M'+(cx+40)+','+cy+' A40,40 0 0,0 '+ax1.toFixed(1)+','+ay1.toFixed(1)+'" fill="'+ch.col+'22" stroke="'+ch.col+'" stroke-width="2.5"/>';
  if(ch.deg===90) body+=rightAngle(cx,cy-10,10);
  // Angle label
  var midRad=ch.deg/2*Math.PI/180;
  body+=tx(cx+62*Math.cos(-midRad),cy+62*Math.sin(-midRad)+5,ch.deg+'°',C.yellow,17,'middle','700');
  // Dot at vertex
  body+='<circle cx="'+cx+'" cy="'+cy+'" r="7" fill="'+ch.col+'"/>';

  var html=card(
    chip(ch.emoji+' זיהוי זוויות!',ch.col)
    +'<div style="text-align:center;margin-bottom:10px">'+svg(285,195,body)+'</div>'
    +'<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:4px">'
    +'<div style="background:'+C.green+'22;border:1.5px solid '+C.green+'66;border-radius:10px;padding:7px 12px;font-family:Rubik,sans-serif;font-size:.78rem;color:'+C.green+'">1 ⚡ חדה<br><span style="font-size:.7rem;opacity:.7">&lt;90°</span></div>'
    +'<div style="background:'+C.teal+'22;border:1.5px solid '+C.teal+'66;border-radius:10px;padding:7px 12px;font-family:Rubik,sans-serif;font-size:.78rem;color:'+C.teal+'">2 🔲 ישרה<br><span style="font-size:.7rem;opacity:.7">=90°</span></div>'
    +'<div style="background:'+C.orange+'22;border:1.5px solid '+C.orange+'66;border-radius:10px;padding:7px 12px;font-family:Rubik,sans-serif;font-size:.78rem;color:'+C.orange+'">3 🔔 קהה<br><span style="font-size:.7rem;opacity:.7">&gt;90°</span></div>'
    +'</div>'
  ,ch.col,'זיהוי זוויות','📐');

  return mkQ(diff,'איזה סוג זווית? (1=חדה  2=ישרה  3=קהה)',ch.num,html,'💡 '+ch.deg+'° → זווית '+ch.name,'📐 זוויות');
}

function g3_missingPerim(diff){
  // Given perimeter, find missing side
  var isSquare=Math.random()<.5;
  var c=pal(4);
  var body, answer, text, hint;
  if(isSquare){
    var perim=_rnd(2,8)*4, s=perim/4;
    answer=s;
    text='היקף ריבוע הוא '+perim+' ס"מ. מה צלעו?';
    hint='💡 '+perim+' ÷ 4 = '+s;
    var side=140, sx=80, sy=40;
    body=glowFilter('gms',c[0])
      +'<rect x="'+sx+'" y="'+sy+'" width="'+side+'" height="'+side+'" fill="'+c[0]+'22" stroke="'+c[0]+'" stroke-width="3" rx="6" filter="url(#gms)"/>';
    body+=dimLabel(sx,sy-4,sx+side,sy-4,'?',C.yellow,18);
    body+=tx(sx+side/2,sy+side/2+8,'היקף = '+perim+' ס"מ',C.white,14,'middle','600');
  } else {
    var w=_rnd(3,10), h=_rnd(2,w-1), perim2=2*(w+h);
    answer=h;
    text='מלבן ברוחב '+w+' ס"מ והיקף '+perim2+' ס"מ. מה גובהו?';
    hint='💡 '+perim2+'÷2 - '+w+' = '+h;
    var pw=Math.min(w*12,200), ph2=Math.min(Math.max(h*12,55),140);
    var ox=(300-pw)/2, oy=(220-ph2)/2;
    body=glowFilter('gmr',c[0])
      +'<rect x="'+ox+'" y="'+oy+'" width="'+pw+'" height="'+ph2+'" fill="'+c[0]+'22" stroke="'+c[0]+'" stroke-width="3" rx="6" filter="url(#gmr)"/>';
    body+=dimLabel(ox,oy-4,ox+pw,oy-4,w+' ס"מ',c[1],18);
    body+=dimLabel(ox-4,oy,ox-4,oy+ph2,'?',C.yellow,18);
    body+=tx(ox+pw/2,oy+ph2/2+8,'היקף = '+perim2+' ס"מ',C.white,13,'middle','600');
  }

  var html=card(
    chip('🔍 מצא את הצלע החסרה!',C.yellow)
    +'<div style="text-align:center;margin-bottom:10px">'+svg(300,230,body)+'</div>'
    +fact('💡',hint,C.dim)
  ,c[0],'צלע חסרה','🔍');

  return mkQ(diff,text,answer,html,hint,'📐 היקף');
}

// ════════════════════════════════════════════════════════════════
// GRADE 4 — Areas, right triangles, angles in triangles
// ════════════════════════════════════════════════════════════════

function g4_areaRect(diff){
  var w=diff==='easy'?_rnd(3,9):diff==='medium'?_rnd(5,16):_rnd(7,25);
  var h=diff==='easy'?_rnd(2,8):diff==='medium'?_rnd(4,14):_rnd(5,20);
  var answer=w*h;
  var c=pal(2);
  var pw=Math.min(w*11,195), ph=Math.min(Math.max(h*11,60),145);
  var ox=(300-pw)/2, oy=(220-ph)/2+8;
  // Grid fill
  var body='';
  var cellW=pw/Math.min(w,8), cellH=ph/Math.min(h,8);
  for(var ri=0;ri<Math.min(h,8);ri++)
    for(var ci=0;ci<Math.min(w,8);ci++)
      body+='<rect x="'+(ox+ci*cellW).toFixed(1)+'" y="'+(oy+ri*cellH).toFixed(1)
        +'" width="'+(cellW-.5).toFixed(1)+'" height="'+(cellH-.5).toFixed(1)
        +'" fill="'+c[0]+((ri+ci)%2===0?'33':'22')+'" rx="1"/>';
  body+=glowFilter('gar',c[0])
    +'<rect x="'+ox+'" y="'+oy+'" width="'+pw+'" height="'+ph+'" fill="none" stroke="'+c[0]+'" stroke-width="3.5" rx="6" filter="url(#gar)"/>';
  body+=dimLabel(ox,oy-5,ox+pw,oy-5,w+' ס"מ',c[1],18);
  body+=dimLabel(ox-5,oy,ox-5,oy+ph,h+' ס"מ',c[1],18);
  body+=tx(ox+pw/2,oy+ph/2+8,'?',C.white,30,'middle','900');
  if(w>8) body+=tx(ox+pw/2,oy+ph-18,'(…ועוד)',C.dim,9);

  var html=card(
    chip('📐 שטח מלבן = אורך × רוחב',c[0])
    +'<div style="text-align:center;margin-bottom:10px">'+svg(300,240,body)+'</div>'
    +fact('🧮',w+' × '+h+' = '+answer+' ס"מ²',C.dim)
  ,c[0],'שטח מלבן','📐');

  return mkQ(diff,'מה שטח המלבן? ('+w+' × '+h+' ס"מ)',answer,html,'💡 '+w+' × '+h+' = '+answer,'📐 שטח');
}

function g4_areaTriangle(diff){
  var base, height;
  do {
    base=diff==='easy'?_rnd(2,8)*2:diff==='medium'?_rnd(3,12)*2:_rnd(4,18)*2;
    height=diff==='easy'?_rnd(2,7):diff==='medium'?_rnd(3,12):_rnd(4,18);
  } while((base*height)%2!==0);
  var answer=base*height/2;
  var c=pal(1);
  var bpx=Math.min(base*10,210), hpx=Math.min(Math.max(height*10,65),155);
  var ox=(300-bpx)/2, oy=18;
  var tipX=ox+bpx/2;
  var body=glowFilter('gta',c[0])
    +'<polygon points="'+tipX+','+oy+' '+(ox+bpx)+','+(oy+hpx)+' '+ox+','+(oy+hpx)+'"'
    +' fill="'+c[0]+'28" stroke="'+c[0]+'" stroke-width="3.5" filter="url(#gta)"/>';
  // Height line (dashed)
  body+='<line x1="'+tipX+'" y1="'+oy+'" x2="'+tipX+'" y2="'+(oy+hpx)+'" stroke="'+C.yellow+'" stroke-width="2" stroke-dasharray="6,4"/>';
  body+=rightAngle(tipX,oy+hpx-10,10);
  // Labels
  body+=dimLabel(ox,oy+hpx+6,ox+bpx,oy+hpx+6,base+' ס"מ',c[1],-18);
  body+=tx(tipX+14,oy+hpx/2,height+' ס"מ',C.yellow,12,'start','600');
  body+=tx(tipX,oy+hpx/2,'?',C.white,28,'middle','900');

  var html=card(
    chip('🔺 שטח משולש = (בסיס × גובה) ÷ 2',c[0])
    +'<div style="text-align:center;margin-bottom:10px">'+svg(300,230,body)+'</div>'
    +fact('🧮','('+base+' × '+height+') ÷ 2 = '+answer+' ס"מ²',C.dim)
  ,c[0],'שטח משולש','📐');

  return mkQ(diff,'מה שטח המשולש? (בסיס '+base+', גובה '+height+' ס"מ)',answer,html,'💡 ('+base+'×'+height+')÷2 = '+answer,'📐 שטח');
}

function g4_angleSumTriangle(diff){
  var a=_rnd(35,80), b=_rnd(25,100-a), cv2=180-a-b;
  if(cv2<=5||cv2>=170) return g4_angleSumTriangle(diff);
  var hide=_pick([0,1,2]), vals=[a,b,cv2];
  var answer=vals[hide];
  var lbPos=[[150,55],[238,190],[58,190]];
  var c=pal(3);
  var body=glowFilter('gat',c[0])
    +'<polygon points="150,28 268,196 32,196" fill="'+c[0]+'22" stroke="'+c[0]+'" stroke-width="3.5" filter="url(#gat)"/>';
  vals.forEach(function(v,i){
    var lbl=i===hide?'?°':v+'°';
    var col=i===hide?C.yellow:C.white;
    body+='<circle cx="'+lbPos[i][0]+'" cy="'+(lbPos[i][1]-10)+'" r="20" fill="'+(i===hide?C.yellow+'33':c[0]+'22')+'" stroke="'+(i===hide?C.yellow:c[0])+'66" stroke-width="1.5"/>';
    body+=tx(lbPos[i][0],lbPos[i][1]-4,lbl,col,14,'middle','700');
  });
  body+=tx(150,130,'180°',C.dim,12,'middle','500');

  var known=vals.filter(function(_,i){return i!==hide;});
  var html=card(
    chip('🔺 סכום זוויות משולש = 180°!',c[0])
    +'<div style="text-align:center;margin-bottom:10px">'+svg(300,225,body)+'</div>'
    +fact('🧮',known.join(' + ')+' + ? = 180',C.dim)
    +fact('💡','? = 180 - '+(known[0]+known[1])+' = '+answer+'°',C.yellow)
  ,c[0],'זוויות במשולש','📐');

  return mkQ(diff,'מצא את הזווית החסרה במשולש (סכום = 180°)',answer,html,'💡 180 - '+(known[0]+known[1])+' = '+answer,'📐 זוויות');
}

function g4_areaSquare(diff){
  var s=diff==='easy'?_rnd(2,9):diff==='medium'?_rnd(5,15):_rnd(7,22);
  var answer=s*s;
  var c=pal(0);
  var side=148, sx=76, sy=38;
  // Grid fill
  var body='';
  var cells=Math.min(s,6);
  var cw=side/cells;
  for(var ri=0;ri<cells;ri++)
    for(var ci=0;ci<cells;ci++)
      body+='<rect x="'+(sx+ci*cw).toFixed(1)+'" y="'+(sy+ri*cw).toFixed(1)+'" width="'+(cw-1).toFixed(1)+'" height="'+(cw-1).toFixed(1)+'" fill="'+c[0]+(( ri+ci)%2===0?'44':'28')+'" rx="2"/>';
  body+=glowFilter('gas',c[0])
    +'<rect x="'+sx+'" y="'+sy+'" width="'+side+'" height="'+side+'" fill="none" stroke="'+c[0]+'" stroke-width="3.5" rx="6" filter="url(#gas)"/>';
  body+=rightAngle(sx,sy+side-10,10);
  body+=rightAngle(sx+side-10,sy,10);
  body+=dimLabel(sx,sy-5,sx+side,sy-5,s+' ס"מ',c[1],18);
  body+=dimLabel(sx+side+5,sy,sx+side+5,sy+side,s+' ס"מ',c[1],18);
  body+=tx(sx+side/2,sy+side/2+8,'?',C.white,28,'middle','900');

  var html=card(
    chip('🟦 שטח ריבוע = צלע²',c[0])
    +'<div style="text-align:center;margin-bottom:10px">'+svg(300,255,body)+'</div>'
    +fact('🧮',s+' × '+s+' = '+answer+' ס"מ²',C.dim)
  ,c[0],'שטח ריבוע','📐');

  return mkQ(diff,'מה שטח הריבוע? (צלע = '+s+' ס"מ)',answer,html,'💡 '+s+'² = '+answer,'📐 שטח');
}

function g4_dragResize(diff){
  var fw=diff==='easy'?_rnd(3,6):diff==='medium'?_rnd(4,10):_rnd(5,14);
  var th=diff==='easy'?_rnd(2,6):diff==='medium'?_rnd(3,10):_rnd(4,15);
  var answer=fw*th;
  var c=pal(2);
  var html=card(
    chip('🎮 גרור לשנות גובה!',c[0])
    +'<div style="text-align:center;padding:4px">'
    +'<canvas id="rzC" width="280" height="155" style="display:block;margin:0 auto;border-radius:12px;background:rgba(255,255,255,.04)"></canvas>'
    +'<div style="margin-top:8px;display:flex;align-items:center;gap:8px;justify-content:center">'
    +'<span style="color:'+c[0]+';font-family:Rubik,sans-serif;font-size:.8rem">📏 גובה:</span>'
    +'<input type="range" id="rzSl" min="1" max="20" value="4" step="1" style="flex:1;max-width:160px;accent-color:'+c[0]+'" oninput="window._rzD(this.value)">'
    +'<span id="rzV" style="color:'+C.yellow+';font-weight:900;font-family:Rubik,sans-serif;min-width:22px">4</span>'
    +'</div>'
    +'<div id="rzA" style="color:'+c[0]+';font-family:Rubik,sans-serif;font-size:1rem;font-weight:700;margin-top:4px"></div>'
    +'<div style="color:'+C.dim+';font-size:.72rem;font-family:Rubik,sans-serif;margin-top:3px">כשהשטח = '+answer+', כתוב אותו למטה! 🎯</div>'
    +'</div>'
    +'<script>window._rzD=function(h){h=parseInt(h);'
    +'var cv=document.getElementById("rzC");if(!cv)return;'
    +'var ctx=cv.getContext("2d"),W='+fw+',sc=Math.min(Math.floor(140/Math.max(W,h)),14);'
    +'var pw=W*sc,ph=Math.min(h*sc,135),ox=(280-pw)/2,oy=8;'
    +'ctx.clearRect(0,0,280,155);'
    +'var g=ctx.createLinearGradient(ox,oy,ox+pw,oy+ph);'
    +'g.addColorStop(0,"'+c[0]+'cc");g.addColorStop(1,"'+c[1]+'66");'
    +'ctx.fillStyle=g;ctx.beginPath();ctx.roundRect(ox,oy,pw,ph,6);ctx.fill();'
    +'ctx.strokeStyle="'+c[0]+'";ctx.lineWidth=2.5;ctx.stroke();'
    +'// Grid lines\n'
    +'ctx.strokeStyle="rgba(255,255,255,.12)";ctx.lineWidth=1;'
    +'for(var i=1;i<W;i++){ctx.beginPath();ctx.moveTo(ox+i*sc,oy);ctx.lineTo(ox+i*sc,oy+ph);ctx.stroke();}'
    +'for(var j=1;j<h;j++){ctx.beginPath();ctx.moveTo(ox,oy+j*sc);ctx.lineTo(ox+pw,oy+j*sc);ctx.stroke();}'
    +'ctx.fillStyle="#fff";ctx.font="bold 13px Rubik";ctx.textAlign="center";'
    +'ctx.fillText(W+"×"+h+"="+W*h,ox+pw/2,oy+ph/2+(ph>28?6:-10));'
    +'// W label\n'
    +'ctx.fillStyle="'+c[1]+'";ctx.font="11px Rubik";'
    +'ctx.fillText("← "+W+" →",ox+pw/2,oy+ph+14);'
    +'document.getElementById("rzV").textContent=h;'
    +'document.getElementById("rzA").textContent="שטח = "+W+"×"+h+" = "+W*h+" ס"מ²";'
    +'window._shapeAnswer&&window._shapeAnswer(W*h);'
    +'};window._rzD(4);<\/script>'
  ,c[0],'שנה גובה עד שטח = '+answer,'🎮');

  return mkQ(diff,'שנה גובה המלבן עד שהשטח יהיה '+answer+'. כתוב '+answer+'.',answer,html,'💡 '+fw+' × גובה = '+answer+' → גובה = '+th,'📐 שטח');
}

// ════════════════════════════════════════════════════════════════
// GRADE 5 — L-shapes, circles, Pythagoras intro
// ════════════════════════════════════════════════════════════════

function g5_lShape(diff){
  var W, H, w, h;
  do {
    W=diff==='hard'?_rnd(7,16):_rnd(5,12);
    H=_rnd(4,W);
    w=_rnd(2,W-2);
    h=_rnd(2,H-2);
  } while(w>=W||h>=H);
  var answer=W*H-w*h;
  var c=pal(4);
  var sc=Math.min(14,Math.floor(162/Math.max(W,H)));
  var Wp=W*sc, Hp=H*sc, wp=w*sc, hp=h*sc;
  var ox=Math.max((300-Wp)/2,22), oy=Math.max((230-Hp)/2,18);

  // Main L-shape polygon
  var pts=[
    ox+','+oy,
    (ox+Wp)+','+oy,
    (ox+Wp)+','+(oy+hp),
    (ox+Wp-wp)+','+(oy+hp),
    (ox+Wp-wp)+','+(oy+Hp),
    ox+','+(oy+Hp)
  ].join(' ');
  // Grid fill
  var body='';
  for(var ri=0;ri<H;ri++){
    for(var ci=0;ci<W;ci++){
      // Skip cut corner
      if(ci>=W-w && ri<h) continue;
      body+='<rect x="'+(ox+ci*sc)+'" y="'+(oy+ri*sc)+'" width="'+(sc-1)+'" height="'+(sc-1)+'" fill="'+c[0]+(( ri+ci)%2===0?'44':'22')+'" rx="1"/>';
    }
  }
  body+=glowFilter('gls',c[0])
    +'<polygon points="'+pts+'" fill="none" stroke="'+c[0]+'" stroke-width="3.5" filter="url(#gls)"/>';
  // Dashed cut area
  body+='<rect x="'+(ox+Wp-wp)+'" y="'+oy+'" width="'+wp+'" height="'+hp+'" fill="'+C.red+'11" stroke="'+C.red+'" stroke-width="1.5" stroke-dasharray="5,3" rx="3"/>';
  body+=tx(ox+Wp-wp/2,oy+hp/2+5,'🚫',C.red,16);
  // Dimensions
  body+=dimLabel(ox,oy-5,ox+Wp,oy-5,W+'',c[1],18);
  body+=dimLabel(ox-5,oy,ox-5,oy+Hp,H+'',c[0],18);
  body+=dimLabel(ox+Wp-wp,oy+hp+5,ox+Wp,oy+hp+5,w+'',C.red,-14);
  body+=tx(ox+Wp-wp/2,oy-5,h+'',C.red,11,'middle','600');
  // Answer zone
  body+=tx(ox+Wp/4,oy+Hp/2+8,'?',C.white,28,'middle','900');

  var html=card(
    chip('🔡 צורת L — מלבן פחות פינה',c[0])
    +'<div style="text-align:center;margin-bottom:10px">'+svg(300,240,body)+'</div>'
    +fact('🧮',W+'×'+H+' - '+w+'×'+h+' = '+(W*H)+' - '+(w*h)+' = '+answer,C.dim)
  ,c[0],'שטח צורת L','📐');

  return mkQ(diff,'מה שטח הצורה? ('+W+'×'+H+' פחות '+w+'×'+h+')',answer,html,'💡 '+W*H+' - '+w*h+' = '+answer,'📐 שטח');
}

function g5_circlePerimArea(diff){
  var r=diff==='easy'?_rnd(2,5):diff==='medium'?_rnd(3,9):_rnd(4,14);
  var d=2*r;
  var askArea=Math.random()<.5;
  var answer=askArea?Math.round(3.14*r*r):Math.round(2*3.14*r);
  var c=pal(5);
  var cr=Math.min(r*9,95), cx=150, cy=118;

  var body=glowFilter('gcr',c[0])
    +'<circle cx="'+cx+'" cy="'+cy+'" r="'+cr+'" fill="'+c[0]+'28" stroke="'+c[0]+'" stroke-width="3.5" filter="url(#gcr)"/>';
  // Concentric ring effect
  body+='<circle cx="'+cx+'" cy="'+cy+'" r="'+(cr*.6).toFixed(0)+'" fill="none" stroke="'+c[0]+'22" stroke-width="1.5"/>';
  // Radius line
  body+='<line x1="'+cx+'" y1="'+cy+'" x2="'+(cx+cr)+'" y2="'+cy+'" stroke="'+C.yellow+'" stroke-width="2.5"/>';
  body+='<circle cx="'+cx+'" cy="'+cy+'" r="5" fill="'+C.yellow+'"/>';
  // Diameter dashed
  if(!askArea){
    body+='<line x1="'+(cx-cr)+'" y1="'+cy+'" x2="'+(cx+cr)+'" y2="'+cy+'" stroke="'+C.pink+'" stroke-width="1.5" stroke-dasharray="5,4" opacity=".5"/>';
    body+=tx(cx,cy+cr+18,'d = '+d+' ס"מ',C.pink,11);
  }
  body+=tx(cx+cr/2+3,cy-10,'r = '+r,C.yellow,13,'middle','700');
  body+=tx(cx,cy+(askArea?8:0),askArea?'π×r²':'2πr',C.dim,12,'middle','500');
  body+=tx(cx,cy+(askArea?28:20),'= ?',C.white,22,'middle','900');

  var html=card(
    chip(askArea?'⭕ שטח עיגול = π × r²':'⭕ היקף עיגול = 2 × π × r',c[0])
    +'<div style="text-align:center;margin-bottom:10px">'+svg(300,230,body)+'</div>'
    +fact('🧮',askArea?'3.14 × '+r+'² = 3.14 × '+r*r+' ≈ '+answer+' ס"מ²':'2 × 3.14 × '+r+' ≈ '+answer+' ס"מ',C.dim)
    +fact('💡','π ≈ 3.14, r = '+r+' ס"מ',C.dim)
  ,c[0],(askArea?'שטח':'היקף')+' עיגול','⭕');

  return mkQ(diff,
    askArea?'מה שטח העיגול? (r='+r+', π=3.14, עגל למספר שלם)':'מה היקף העיגול? (r='+r+', π=3.14, עגל למספר שלם)',
    answer, html,
    askArea?'💡 3.14×'+r*r+'≈'+answer:'💡 2×3.14×'+r+'≈'+answer,
    '📐 עיגול');
}

function g5_extAngle(diff){
  var a=_rnd(40,80), b=_rnd(30,100-a), cv3=180-a-b;
  if(cv3<=5) return g5_extAngle(diff);
  var ext=a+b;
  var c=pal(3);
  var body=glowFilter('gea',c[0])
    +'<polygon points="50,195 250,195 150,55" fill="'+c[0]+'22" stroke="'+c[0]+'" stroke-width="3.5" filter="url(#gea)"/>';
  // Angle labels
  body+='<circle cx="145" cy="72" r="18" fill="'+c[0]+'33" stroke="'+c[0]+'66" stroke-width="1.5"/>';
  body+=tx(150,77,a+'°',C.white,12,'middle','700');
  body+='<circle cx="225" cy="181" r="18" fill="'+c[0]+'33" stroke="'+c[0]+'66" stroke-width="1.5"/>';
  body+=tx(232,186,b+'°',C.white,12,'middle','700');
  body+='<circle cx="65" cy="181" r="18" fill="'+c[0]+'33" stroke="'+c[0]+'66" stroke-width="1.5"/>';
  body+=tx(58,186,cv3+'°',C.white,12,'middle','700');
  // Extended line
  body+='<line x1="50" y1="195" x2="10" y2="195" stroke="'+C.pink+'" stroke-width="3" stroke-linecap="round"/>';
  // Exterior angle arc
  body+='<path d="M30,195 A25,25 0 0,1 50,'+(195-25)+'" fill="'+C.pink+'22" stroke="'+C.pink+'" stroke-width="2.5"/>';
  body+='<circle cx="20" cy="180" r="18" fill="'+C.pink+'33" stroke="'+C.pink+'" stroke-width="1.5"/>';
  body+=tx(17,185,'?°',C.yellow,13,'middle','700');
  body+=tx(140,140,'זווית חיצונית',C.dim,10,'middle','500');

  var html=card(
    chip('🔺 זווית חיצונית = סכום 2 הזוויות הרחוקות!',c[0])
    +'<div style="text-align:center;margin-bottom:10px">'+svg(300,230,body)+'</div>'
    +fact('🧮','? = '+a+' + '+b+' = '+ext+'°',C.dim)
    +fact('💡','הזווית החיצונית (ורודה) שווה לסכום שתי הזוויות הרחוקות',C.yellow)
  ,c[0],'זווית חיצונית','📐');

  return mkQ(diff,'מה הזווית החיצונית של המשולש? (זוויות: '+a+'°, '+b+'°, '+cv3+'°)',ext,html,'💡 '+a+'+'+b+' = '+ext,'📐 זוויות');
}

function g5_pythagorasIntro(diff){
  var triples=[[3,4,5],[5,12,13],[8,15,17],[6,8,10],[9,12,15]];
  var sc=diff==='easy'?1:diff==='medium'?_rnd(1,2):_rnd(1,3);
  var tri=_pick(triples);
  var a=tri[0]*sc, b=tri[1]*sc, cv4=tri[2]*sc;
  var hideC=Math.random()<.65;
  var answer=hideC?cv4:a;
  var c=pal(5);
  var bpx=Math.min(b*10,195), apx=Math.min(a*10,155), ox=45, oy=18;

  var body=glowFilter('gpy',c[0])
    +'<polygon points="'+ox+','+(oy+apx)+' '+(ox+bpx)+','+(oy+apx)+' '+ox+','+oy+'"'
    +' fill="'+c[0]+'22" stroke="'+c[0]+'" stroke-width="3.5" filter="url(#gpy)"/>';
  body+=rightAngle(ox,oy+apx-11,11);
  // Small squares on sides to illustrate a²+b²=c²
  if(diff!=='easy'){
    body+='<rect x="'+(ox-28)+'" y="'+oy+'" width="26" height="'+apx+'" fill="'+c[0]+'15" stroke="'+c[0]+'33" stroke-width="1" stroke-dasharray="3,2"/>';
    body+=tx(ox-15,oy+apx/2,a+'²',c[0],9,'middle','600');
    body+='<rect x="'+ox+'" y="'+(oy+apx+4)+'" width="'+bpx+'" height="22" fill="'+c[1]+'15" stroke="'+c[1]+'33" stroke-width="1" stroke-dasharray="3,2"/>';
    body+=tx(ox+bpx/2,oy+apx+15,b+'²',c[1],9,'middle','600');
  }
  body+=dimLabel(ox,oy+apx+6,ox+bpx,oy+apx+6,'b='+b,c[1],-18);
  body+=dimLabel(ox-6,oy,ox-6,oy+apx,hideC?'a='+a:'a=?',c[0],18);
  body+=tx((ox+(ox+bpx))/2-8,oy+apx/2,hideC?'c=?':'c='+cv4,C.yellow,18,'middle','700');
  body+=tx(150,215,'a² + b² = c²',C.dim,12,'middle','500');

  var html=card(
    chip('📐 משפט פיתגורס!',c[0])
    +'<div style="text-align:center;margin-bottom:10px">'+svg(300,230,body)+'</div>'
    +fact('🧮',hideC?'a²+b²=c² → '+a+'²+'+b+'²=c²':'c²-b²=a² → '+cv4+'²-'+b+'²=a²',C.dim)
    +fact('💡',hideC?'c = √('+(a*a+b*b)+') = '+cv4:'a = √('+(cv4*cv4-b*b)+') = '+a,C.yellow)
  ,c[0],'משפט פיתגורס','📐');

  return mkQ(diff,hideC?'a='+a+', b='+b+'. מה c (היתר)?':'c='+cv4+', b='+b+'. מה a?',
    answer, html,
    hideC?'💡 c=√('+(a*a+b*b)+')='+cv4:'💡 a=√('+(cv4*cv4-b*b)+')='+a,
    '📐 גיאומטריה');
}

// ════════════════════════════════════════════════════════════════
// GRADE 6 — Circle area, polygon angles, L-shapes, scale
// ════════════════════════════════════════════════════════════════

function g6_circleArea(diff){
  var r=diff==='easy'?_rnd(2,6):diff==='medium'?_rnd(3,10):_rnd(4,14);
  var answer=Math.round(3.14*r*r);
  var c=pal(4);
  var cr=Math.min(r*9,100), cx=150, cy=115;

  var body=glowFilter('gca',c[0])
    +'<circle cx="'+cx+'" cy="'+cy+'" r="'+cr+'" fill="'+c[0]+'28" stroke="'+c[0]+'" stroke-width="3.5" filter="url(#gca)"/>';
  // Sector visualization of π
  for(var i=0;i<3;i++){
    var ang1=i*120*Math.PI/180, ang2=(i+1)*120*Math.PI/180;
    var x1=cx+cr*Math.cos(ang1), y1=cy+cr*Math.sin(ang1);
    var x2=cx+cr*Math.cos(ang2), y2=cy+cr*Math.sin(ang2);
    body+='<path d="M'+cx+','+cy+' L'+x1.toFixed(1)+','+y1.toFixed(1)+' A'+cr+','+cr+' 0 0,1 '+x2.toFixed(1)+','+y2.toFixed(1)+' Z" fill="'+c[i%2===0?0:1]+(i===0?'44':'22')+'" stroke="rgba(255,255,255,.3)" stroke-width="1"/>';
  }
  body+='<line x1="'+cx+'" y1="'+cy+'" x2="'+(cx+cr)+'" y2="'+cy+'" stroke="'+C.yellow+'" stroke-width="2.5"/>';
  body+='<circle cx="'+cx+'" cy="'+cy+'" r="5" fill="'+C.yellow+'"/>';
  body+=tx(cx+cr/2+3,cy-10,'r='+r,C.yellow,13,'middle','700');
  body+=tx(cx,cy+cr+18,'π × r²',C.dim,11);
  body+=tx(cx,cy+cr+32,'= 3.14 × '+r*r+' ≈ '+answer+' ס"מ²',C.white,12);

  var html=card(
    chip('⭕ שטח עיגול = π × r²',c[0])
    +'<div style="text-align:center;margin-bottom:10px">'+svg(300,240,body)+'</div>'
    +fact('🧮','3.14 × '+r+'² = 3.14 × '+r*r+' = '+answer+' ס"מ²',C.dim)
    +fact('💡','π ≈ 3.14 (פאי)',C.yellow)
  ,c[0],'שטח עיגול','⭕');

  return mkQ(diff,'מה שטח העיגול? (r='+r+' ס"מ, π=3.14, עגל שלם)',answer,html,'💡 3.14×'+r*r+'≈'+answer,'📐 שטח עיגול');
}

function g6_polyAngleSum(diff){
  var n=diff==='easy'?_pick([4,5]):diff==='medium'?_pick([5,6,7]):_pick([6,7,8,9]);
  var total=(n-2)*180;
  var known=[], sum=0;
  var maxPer=Math.floor(total*.7/(n-1));
  for(var i=0;i<n-1;i++){
    var v=_rnd(20,Math.min(maxPer,total-sum-(n-1-i)*20));
    if(v<10||v>180){ return g6_polyAngleSum(diff); }
    known.push(v); sum+=v;
  }
  var answer=total-sum;
  if(answer<10||answer>180) return g6_polyAngleSum(diff);
  var c=pal(2);
  var polys={4:'65,45 235,45 255,185 45,185',5:'150,25 245,95 210,205 90,205 55,95',
    6:'150,22 232,68 232,162 150,208 68,162 68,68',7:'150,20 224,55 252,135 214,200 86,200 48,135 76,55',
    8:'150,18 210,40 248,100 248,150 210,210 150,225 90,210 52,150 52,100 90,40'};
  var pts=polys[Math.min(n,8)]||polys[6];
  var body=glowFilter('gpa',c[0])
    +'<polygon points="'+pts+'" fill="'+c[0]+'22" stroke="'+c[0]+'" stroke-width="3.5" filter="url(#gpa)"/>';
  body+=tx(150,118,n+'-צלע',C.dim,14,'middle','600');
  body+=tx(150,140,'סכום = '+total+'°',C.white,13,'middle','700');
  body+=tx(150,160,sum+'° + ?° = '+total+'°',C.yellow,11,'middle','600');

  var html=card(
    chip('🔷 סכום זוויות פנימיות',c[0])
    +'<div style="text-align:center;margin-bottom:10px">'+svg(300,240,body)+'</div>'
    +'<div style="font-family:Rubik,sans-serif;font-size:.82rem;color:'+C.dim+';margin-bottom:6px">זוויות ידועות: '+known.join('°, ')+'°</div>'
    +fact('📐','(n-2)×180 = ('+n+'-2)×180 = '+total+'°',C.dim)
    +fact('🧮',total+' - '+sum+' = '+answer+'°',C.yellow)
  ,c[0],'סכום זוויות '+n+'-צלע','📐');

  return mkQ(diff,'ב-'+n+'-צלע (סכום='+total+'°): זוויות: '+known.join('°, ')+'°, ?°. מה הזווית החסרה?',answer,html,'💡 '+total+' - '+sum+' = '+answer,'📐 זוויות');
}

function g6_pythagoras(diff){
  var triples=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29]];
  var sc=diff==='easy'?1:diff==='medium'?_rnd(1,3):_rnd(2,4);
  var tri=_pick(triples);
  var a=tri[0]*sc, b=tri[1]*sc, cv5=tri[2]*sc;
  var hideC=Math.random()<.6;
  var answer=hideC?cv5:a;
  var c=pal(5);
  var bpx=Math.min(b*7,195), apx=Math.min(a*7,155), ox=45, oy=18;

  var body=glowFilter('gp6',c[0])
    +'<polygon points="'+ox+','+(oy+apx)+' '+(ox+bpx)+','+(oy+apx)+' '+ox+','+oy+'"'
    +' fill="'+c[0]+'22" stroke="'+c[0]+'" stroke-width="3.5" filter="url(#gp6)"/>';
  body+=rightAngle(ox,oy+apx-11,11);
  // Illustrative squares
  body+='<rect x="'+(ox-30)+'" y="'+oy+'" width="28" height="'+apx+'" fill="'+c[0]+'18" stroke="'+c[0]+'44" stroke-width="1.5" stroke-dasharray="4,3"/>';
  body+=tx(ox-16,oy+apx/2,a+'²='+a*a,c[0],9,'middle','600');
  body+='<rect x="'+ox+'" y="'+(oy+apx+5)+'" width="'+bpx+'" height="24" fill="'+c[1]+'18" stroke="'+c[1]+'44" stroke-width="1.5" stroke-dasharray="4,3"/>';
  body+=tx(ox+bpx/2,oy+apx+17,b+'²='+b*b,c[1],9,'middle','600');
  body+=dimLabel(ox-6,oy,ox-6,oy+apx,hideC?'a='+a:'a=?',c[0],18);
  body+=dimLabel(ox,oy+apx+34,ox+bpx,oy+apx+34,'b='+b,c[1],-18);
  body+=tx((ox+ox+bpx)/2-8,oy+apx/2,hideC?'c=?':'c='+cv5,C.yellow,18,'middle','700');
  body+=tx(160,215,'a²+b²=c²',C.dim,11,'middle','500');

  var html=card(
    chip('📐 פיתגורס: a²+b²=c²',c[0])
    +'<div style="text-align:center;margin-bottom:10px">'+svg(300,245,body)+'</div>'
    +fact('🧮',hideC?a+'²+'+b+'²='+( a*a+b*b)+'=c²':'c²-b²='+( cv5*cv5-b*b)+'=a²',C.dim)
    +fact('💡',hideC?'c=√'+(a*a+b*b)+'='+cv5:'a=√'+(cv5*cv5-b*b)+'='+a,C.yellow)
  ,c[0],'פיתגורס','📐');

  return mkQ(diff,hideC?'a='+a+', b='+b+'. חשב c.':'c='+cv5+', b='+b+'. חשב a.',
    answer, html,
    hideC?'💡 c=√('+(a*a+b*b)+')='+cv5:'💡 a=√('+(cv5*cv5-b*b)+')='+a,
    '📐 גיאומטריה');
}

function g6_scaleFactor(diff){
  var oW=_rnd(3,8), oH=_rnd(2,7), sc2=diff==='easy'?_rnd(2,3):diff==='medium'?_rnd(2,4):_rnd(2,5);
  var askArea=Math.random()<.5;
  var nW=oW*sc2, nH=oH*sc2;
  var answer=askArea?nW*nH:2*(nW+nH);
  var c=pal(0);
  var pw=Math.min(nW*9,185), ph=Math.min(nH*9,130);
  var spw=Math.min(oW*9,65), sph=Math.min(oH*9,50);
  var ox=80, oy=Math.max((230-ph)/2,18);

  var body=glowFilter('gsf',c[0])
    +'<rect x="'+ox+'" y="'+oy+'" width="'+pw+'" height="'+ph+'" fill="'+c[0]+'22" stroke="'+c[0]+'" stroke-width="3" rx="6" filter="url(#gsf)"/>'
    +'<rect x="'+ox+'" y="'+oy+'" width="'+spw+'" height="'+sph+'" fill="'+c[1]+'44" stroke="'+c[1]+'" stroke-width="2.5" stroke-dasharray="5,3" rx="4"/>';
  body+=tx(ox+spw/2,oy+sph/2+5,oW+'×'+oH,c[1],9,'middle','700');
  body+=dimLabel(ox,oy-5,ox+pw,oy-5,nW+'',c[0],18);
  body+=dimLabel(ox-5,oy,ox-5,oy+ph,nH+'',c[0],18);
  body+=tx(ox+pw/2,oy+ph/2+8,'×'+sc2+' גדול יותר',C.white,13,'middle','700');
  body+=tx(ox+pw/2,oy+ph+14,'?',C.yellow,20,'middle','900');

  var html=card(
    chip('📏 מקדם הגדלה ×'+sc2,c[0])
    +'<div style="text-align:center;margin-bottom:10px">'+svg(300,240,body)+'</div>'
    +fact('📐',askArea?'שטח חדש = '+nW+'×'+nH:'היקף חדש = 2×('+nW+'+'+nH+')',C.dim)
    +fact('🧮','= '+answer+(askArea?' ס"מ²':' ס"מ'),C.yellow)
  ,c[0],'מקדם הגדלה','📏');

  return mkQ(diff,askArea?'מלבן '+oW+'×'+oH+' הוגדל פי '+sc2+'. שטח חדש?':'מלבן '+oW+'×'+oH+' הוגדל פי '+sc2+'. היקף חדש?',
    answer, html,
    askArea?'💡 '+nW+'×'+nH+'='+answer:'💡 2×('+nW+'+'+nH+')='+answer,
    '📐 גיאומטריה');
}

// ════════════════════════════════════════════════════════════════
// MEASUREMENT special questions
// ════════════════════════════════════════════════════════════════

function g_measureTime(diff){
  var cases=[
    {q:'שעה = כמה דקות?',a:60,h:'1 שעה = 60 דקות',emoji:'⏰'},
    {q:'דקה = כמה שניות?',a:60,h:'1 דקה = 60 שניות',emoji:'⏱️'},
    {q:'שעה = כמה שניות?',a:3600,h:'60 × 60 = 3600',emoji:'⏰'},
    {q:'יום = כמה שעות?',a:24,h:'1 יום = 24 שעות',emoji:'🌞'},
    {q:'שבוע = כמה ימים?',a:7,h:'1 שבוע = 7 ימים',emoji:'📅'},
    {q:'שנה = כמה חודשים?',a:12,h:'1 שנה = 12 חודשים',emoji:'📆'},
  ];
  var pool=diff==='easy'?cases.slice(0,3):diff==='medium'?cases.slice(0,5):cases;
  var ch=_pick(pool);
  var c=pal(2);

  // Clock face SVG
  var body=glowFilter('gtm',c[0])
    +'<circle cx="150" cy="110" r="90" fill="'+c[0]+'18" stroke="'+c[0]+'" stroke-width="3" filter="url(#gtm)"/>'
    +'<circle cx="150" cy="110" r="80" fill="rgba(0,0,0,.3)"/>';
  // Hour marks
  for(var i=0;i<12;i++){
    var ang=i*30*Math.PI/180;
    var r1=68, r2=i%3===0?80:74;
    body+='<line x1="'+(150+r1*Math.sin(ang)).toFixed(1)+'" y1="'+(110-r1*Math.cos(ang)).toFixed(1)
      +'" x2="'+(150+r2*Math.sin(ang)).toFixed(1)+'" y2="'+(110-r2*Math.cos(ang)).toFixed(1)
      +'" stroke="'+C.white+'" stroke-width="'+(i%3===0?2.5:1.5)+'" opacity="0.6"/>';
  }
  // Hands
  body+='<line x1="150" y1="110" x2="150" y2="47" stroke="'+C.white+'" stroke-width="4" stroke-linecap="round"/>'; // hour
  body+='<line x1="150" y1="110" x2="193" y2="93" stroke="'+C.yellow+'" stroke-width="3" stroke-linecap="round"/>'; // minute
  body+='<circle cx="150" cy="110" r="6" fill="'+c[0]+'"/>';
  body+=tx(150,ch.a<100?215:210,ch.emoji+'  '+ch.q,C.white,13);

  var html=card(
    chip(ch.emoji+' מדידת זמן!',c[0])
    +'<div style="text-align:center;margin-bottom:10px">'+svg(300,230,body)+'</div>'
    +fact('💡',ch.h,C.yellow)
  ,c[0],'מדידת זמן','⏰');

  return mkQ(diff,ch.q,ch.a,html,'💡 '+ch.h,'📏 מדידה');
}

function g_measureLength(diff){
  var units=[
    {from:'מ\'',to:'ס"מ',factor:100,emoji:'📏',story:'חדר שאורכו 3 מ\' — כמה ס"מ?',val:3},
    {from:'ק"מ',to:'מ\'',factor:1000,emoji:'🚗',story:'מרחק 2 ק"מ — כמה מ\'?',val:2},
    {from:'ס"מ',to:'מ"מ',factor:10,emoji:'📐',story:'קרש 25 ס"מ — כמה מ"מ?',val:25},
    {from:'ק"מ',to:'ס"מ',factor:100000,emoji:'🛣️',story:'כביש 1 ק"מ — כמה ס"מ?',val:1},
  ];
  var pool=diff==='easy'?units.slice(0,2):diff==='medium'?units.slice(0,3):units;
  var u=_pick(pool);
  var val=diff==='easy'?_rnd(1,5):diff==='medium'?_rnd(2,10):_rnd(2,20);
  var answer=val*u.factor;
  var c=pal(0);

  // Ruler visual
  var rulerW=240, pixPerUnit=rulerW/Math.max(val+1,6);
  var body='';
  // Ruler base
  body+='<rect x="30" y="70" width="'+rulerW+'" height="35" fill="'+c[0]+'22" stroke="'+c[0]+'" stroke-width="2" rx="6"/>';
  // Object bar
  body+='<rect x="30" y="60" width="'+(val*pixPerUnit)+'" height="20" fill="'+c[1]+'55" stroke="'+c[1]+'" stroke-width="2" rx="5"/>';
  body+=tx(30+val*pixPerUnit/2,72,u.emoji+' '+val+' '+u.from,C.white,11);
  // Tick marks
  for(var i=0;i<=Math.min(val+1,8);i++){
    var tx3=30+i*pixPerUnit;
    body+='<line x1="'+tx3+'" y1="70" x2="'+tx3+'" y2="'+(i%5===0?58:64)+'" stroke="'+c[0]+'" stroke-width="'+(i%5===0?2:1)+'" opacity=".7"/>';
    body+=tx(tx3,56,i,C.dim,9);
  }
  body+=tx(150,130,val+' '+u.from+' = ? '+u.to,C.white,14);
  body+=tx(150,155,'× '+u.factor,C.yellow,12);

  var html=card(
    chip(u.emoji+' המרת יחידות אורך!',c[0])
    +'<div style="text-align:center;margin-bottom:10px">'+svg(300,175,body)+'</div>'
    +fact('📏','1 '+u.from+' = '+u.factor+' '+u.to,C.dim)
    +fact('🧮',val+' × '+u.factor+' = '+answer,C.yellow)
  ,c[0],'המרת אורך','📏');

  return mkQ(diff,val+' '+u.from+' = כמה '+u.to+'?',answer,html,'💡 '+val+' × '+u.factor+' = '+answer,'📏 מדידה');
}

function g_measureWeight(diff){
  var val=diff==='easy'?_rnd(1,5):diff==='medium'?_rnd(2,10):_rnd(3,20);
  var toLg=Math.random()<.5;
  var answer=toLg?val*1000:val;
  if(!toLg) { val=val*1000; }
  var c=pal(3);

  // Scale SVG
  var body=glowFilter('gwt',c[0]);
  // Balance base
  body+='<rect x="125" y="195" width="50" height="12" fill="'+c[0]+'" rx="5"/>';
  body+='<rect x="145" y="100" width="10" height="95" fill="'+c[0]+'88" rx="3"/>';
  // Beam
  body+='<rect x="48" y="98" width="204" height="8" fill="'+c[0]+'" rx="4"/>';
  // Pans
  body+='<ellipse cx="80" cy="106" rx="45" ry="10" fill="'+c[0]+'66" stroke="'+c[0]+'" stroke-width="2"/>';
  body+='<ellipse cx="220" cy="106" rx="45" ry="10" fill="'+c[0]+'66" stroke="'+c[0]+'" stroke-width="2"/>';
  // Strings
  body+='<line x1="52" y1="102" x2="52" y2="106" stroke="'+c[0]+'" stroke-width="1.5"/>';
  body+='<line x1="108" y1="102" x2="108" y2="106" stroke="'+c[0]+'" stroke-width="1.5"/>';
  body+='<line x1="196" y1="102" x2="196" y2="106" stroke="'+c[0]+'" stroke-width="1.5"/>';
  body+='<line x1="244" y1="102" x2="244" y2="106" stroke="'+c[0]+'" stroke-width="1.5"/>';
  // Items on pans
  if(toLg){
    body+=tx(80,88,val+' ק"ג',C.white,13,'middle','700');
    body+=tx(220,88,'? גרם',C.yellow,13,'middle','700');
  } else {
    body+=tx(80,88,(val)+' גרם',C.white,13,'middle','700');
    body+=tx(220,88,'? ק"ג',C.yellow,13,'middle','700');
  }
  body+=tx(150,225,'⚖️ 1 ק"ג = 1000 גרם',C.dim,11);

  var html=card(
    chip('⚖️ המרת משקל!',c[0])
    +'<div style="text-align:center;margin-bottom:10px">'+svg(300,240,body)+'</div>'
    +fact('📏','1 ק"ג = 1000 גרם',C.dim)
    +fact('🧮',toLg?val+' × 1000 = '+answer+' גרם':val+' ÷ 1000 = '+answer+' ק"ג',C.yellow)
  ,c[0],'המרת משקל','⚖️');

  return mkQ(diff,toLg?val+' ק"ג = כמה גרם?':val+' גרם = כמה ק"ג?',answer,html,
    toLg?'💡 '+val+' × 1000 = '+answer:'💡 '+val+' ÷ 1000 = '+answer,
    '📏 מדידה');
}

// ════════════════════════════════════════════════════════════════
// GRADE-BASED ROUTER
// ════════════════════════════════════════════════════════════════
window.genShapesInteractive = function(diff) {
  var grade = window._grade || 'ב';

  if(grade === 'א'){
    var pool=[g2_countSides, g2_shapeFamily, g2_measureRuler];
    var w=[3,2,2];
    return _wp(pool,w)(diff);
  }

  if(grade === 'ב'){
    var pool=[g2_countSides, g2_shapeFamily, g2_symmetry, g2_measureRuler];
    var w=diff==='easy'?[4,3,2,2]:diff==='medium'?[3,2,3,2]:[2,2,3,3];
    return _wp(pool,w)(diff);
  }

  if(grade === 'ג'){
    var pool=[g3_perimeterSquare, g3_perimeterRect, g3_perimeterTriangle, g3_gridArea, g3_angleType, g3_missingPerim, g2_symmetry, g_measureTime];
    var w=diff==='easy'?[3,3,2,3,2,1,2,2]:diff==='medium'?[2,2,2,2,2,2,2,2]:[2,2,2,1,2,3,1,2];
    return _wp(pool,w)(diff);
  }

  if(grade === 'ד'){
    var pool=[g4_areaRect, g4_areaTriangle, g4_areaSquare, g4_angleSumTriangle, g4_dragResize, g3_perimeterRect, g3_perimeterTriangle, g_measureLength, g_measureTime];
    var w=diff==='easy'?[3,2,3,2,1,2,1,2,2]:diff==='medium'?[2,2,2,2,2,2,2,2,2]:[2,2,2,3,2,1,1,2,2];
    return _wp(pool,w)(diff);
  }

  if(grade === 'ה'){
    var pool=[g5_lShape, g5_circlePerimArea, g5_extAngle, g5_pythagorasIntro, g4_areaTriangle, g4_areaRect, g_measureLength, g_measureWeight];
    var w=diff==='easy'?[2,2,1,1,3,3,2,2]:diff==='medium'?[2,2,2,2,2,2,2,2]:[2,3,2,3,1,1,2,2];
    return _wp(pool,w)(diff);
  }

  if(grade === 'ו'){
    var pool=[g6_circleArea, g6_pythagoras, g6_polyAngleSum, g6_scaleFactor, g5_lShape, g5_circlePerimArea, g_measureLength, g_measureWeight];
    var w=diff==='easy'?[3,1,2,2,2,2,2,2]:diff==='medium'?[2,2,2,2,2,2,2,2]:[2,2,3,2,2,2,2,2];
    return _wp(pool,w)(diff);
  }

  // Fallback
  return g3_perimeterSquare(diff);
};

function _wp(arr,w){
  var t=w.reduce(function(a,b){return a+b;},0);
  var r=Math.random()*t;
  for(var i=0;i<arr.length;i++){r-=w[i];if(r<=0)return arr[i];}
  return arr[arr.length-1];
}

})();
