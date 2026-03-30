// ══ GAMEPLAY ══

// ── Grade config loader ──
async function loadGradeConfig(grade) {
  return new Promise((resolve) => {
    const file = GRADE_FILES[grade];
    if (!file) { resolve(); return; }
    const old = document.getElementById('gradeScript'); if (old) old.remove();
    const s   = document.createElement('script');
    s.id      = 'gradeScript';
    s.src     = file + '?v=' + Date.now();
    s.onload  = () => { applyGradeConfig(); resolve(); };
    s.onerror = () => { console.warn('Grade file not found, using defaults'); resolve(); };
    document.head.appendChild(s);
  });
}

function applyGradeConfig() {
  const gc = window.GRADE_CONFIG; if (!gc) return;
  (gc.availableLearnTopics||[]).forEach(t => { if(!st.learnedTopics.includes(t)) st.learnedTopics.push(t); });
  st.examTopics = st.examTopics.filter(t => (gc.availableExamTopics||[]).includes(t));
  if (st.examTopics.length===0) st.examTopics = (gc.availableExamTopics||['add']).slice(0,2);
}

async function selectGrade(grade) {
  window._grade = grade; window.fbSave();
  await loadGradeConfig(grade);
  document.querySelectorAll('.scr').forEach(s => s.classList.remove('on'));
  document.getElementById('home').classList.add('on');
  const gc = window.GRADE_CONFIG; if (gc?.welcome) showToast(gc.welcome);
  updateHome();
}

// ── Category ──
function openCat(cat) {
  if (LOCKED_TOPICS[cat] && !st.learnedTopics.includes(LOCKED_TOPICS[cat])) { showToast('🔒 קודם למד את הנושא הזה!'); return; }
  const gc = window.GRADE_CONFIG;
  if (gc && !gc.availableCategories.includes(cat)) { showToast('🔒 נושא זה לא זמין בכיתה שלך'); return; }
  qs.cat = cat; document.getElementById('diffTitle').textContent = CAT_NAMES[cat]||cat; show('diff-scr');
}

function startCat(diff) {
  qs.diff=diff; qs.isDaily=false; qs.isExam=false; qs.isMistakes=false;
  qs.pool=genPool(qs.cat,diff,10); qs.idx=0; show('q-scr'); loadQ(qs.pool[0]);
}

// ── Load question ──
function loadQ(q) {
  if (!q) return;
  qs.current=q; qs.attempts=0; qs.hintUsed=false; qs.done=false;
  document.getElementById('qCatLbl').textContent = CAT_NAMES[q.cat]||q.cat;
  document.getElementById('qScore').textContent  = st.score;
  const db=document.getElementById('qDiffBadge');
  db.className='lbadge '+(q.diff==='easy'?'easy':q.diff==='medium'?'med':'hard');
  db.textContent=q.diff==='easy'?'🌱 קל':q.diff==='medium'?'⚡ בינוני':'🔥 קשה';
  document.getElementById('qPtsPreview').textContent = q.pts;
  document.getElementById('qGameLabel').textContent  = (q.label||'')+(q.gameLabel?' — '+q.gameLabel:'');
  const dl=document.getElementById('dailyQLbl');
  if (qs.isDaily) { dl.style.display='block'; dl.textContent=`📅 שאלה יומית ${qs.isDailyIdx+1}/2`; } else dl.style.display='none';
  const qt=document.getElementById('qTxt'); qt.textContent=q.text; qt.style.direction=q.dir||'rtl';
  for(let i=0;i<3;i++) document.getElementById('ad'+i).className='adot';
  document.getElementById('hintBox').classList.remove('on');
  document.getElementById('fbBox').classList.remove('on');
  document.getElementById('qBtns').style.display='flex';
  document.getElementById('nextBtns').style.display='none';
  document.getElementById('moreBtn').style.display='none';
  const mv=document.getElementById('mulVis');
  if (q.showMul) { mv.style.display='block'; buildMulGroups(q.mulA,q.mulB,q.mulEmoji); buildMulTable(q.mulA,q.mulB); } else mv.style.display='none';
  const na=document.getElementById('numAnsWrap'),wa=document.getElementById('wordAnsWrap'),ew=document.getElementById('exprWrap');
  if (q.type==='word') {
    na.style.display='block'; wa.style.display='block'; ew.style.display='block';
    buildExpr(q.nums4expr||[],q.op4expr||'+');
    let ex=document.getElementById('multiStepBadge'); if(ex)ex.remove();
    if (q.multiStep) { const badge=document.createElement('div'); badge.id='multiStepBadge'; badge.className='multistep-badge'; badge.innerHTML='🔗 שאלה רב-שלבית!'; document.getElementById('qTxt').insertAdjacentElement('afterend',badge); }
    document.getElementById('wordInp').value='';
    document.getElementById('ansInp').value=''; document.getElementById('ansInp').placeholder='תשובה סופית (מספר)';
  } else {
    let ex=document.getElementById('multiStepBadge'); if(ex)ex.remove();
    na.style.display='block'; wa.style.display='none'; ew.style.display='none';
    document.getElementById('ansInp').value=''; document.getElementById('ansInp').placeholder='?'; document.getElementById('ansInp').className='ans-inp';
  }
  const sl=document.getElementById('streakLive');
  if (st.streak>=3) { sl.style.display='inline-flex'; const spu=SPECIAL_USERS[(window._username||'').toLowerCase()]; if(spu?.streakDisplay)sl.innerHTML=spu.streakDisplay(st.streak); else sl.innerHTML=`🔥 <span id="streakLiveCnt">${st.streak}</span>`; } else sl.style.display='none';
  startHintTimer(q);
  const inp=document.getElementById('ansInp'); if(inp)inp.disabled=false;
  const sb=document.querySelector('.bsubmit'); if(sb)sb.disabled=false;
  setTimeout(()=>document.getElementById('ansInp').focus(),200);
}

// ── Multiplication visual ──
function buildMulGroups(a,b,emoji) {
  const el=document.getElementById('mulGrps'); el.innerHTML='';
  for(let i=0;i<Math.min(a,8);i++){const g=document.createElement('div');g.className='mg';for(let j=0;j<Math.min(b,10);j++){const it=document.createElement('div');it.className='mi';it.textContent=emoji;g.appendChild(it);}el.appendChild(g);}
  if(a>8){const m=document.createElement('div');m.style.cssText='color:var(--txt2);font-size:.8rem;align-self:center;';m.textContent=`+${a-8} עוד`;el.appendChild(m);}
}
function buildMulTable(a,b) {
  const w=document.getElementById('mulTblWrap');let h='<table class="mul-table"><tr><td class="mth">×</td>';
  for(let j=1;j<=10;j++)h+=`<td class="${j===b?'mhl':'mth'}">${j}</td>`;h+='</tr>';
  for(let i=1;i<=10;i++){h+=`<tr><td class="${i===a?'mhl':'mth'}">${i}</td>`;for(let j=1;j<=10;j++)h+=`<td class="${i===a&&j===b?'mhl':''}">${i*j}</td>`;h+='</tr>';}
  h+='</table>';w.innerHTML=h;
}

// ── Expression builder ──
let exprState={op:null};
function buildExpr(nums4expr,op4expr){exprState={op:null};const inpA=document.getElementById('exprNumA'),inpB=document.getElementById('exprNumB');if(inpA)inpA.value='';if(inpB)inpB.value='';document.getElementById('exprOpDisplay').textContent='?';document.getElementById('exprOpDisplay').style.color='var(--txt2)';document.getElementById('exprResult').textContent='?';document.getElementById('exprResult').style.color='var(--txt2)';document.getElementById('exprFb').textContent='';['Plus','Minus','Times','Div'].forEach(n=>{const el=document.getElementById('op'+n);if(el)el.classList.remove('sel');});}
function pickOp(op){exprState.op=op;const display=document.getElementById('exprOpDisplay');const colors={'+':'var(--a3)','-':'var(--a1)','×':'var(--a2)','÷':'var(--a4)'};display.textContent=op;display.style.color=colors[op]||'var(--a2)';const map={'+':'Plus','-':'Minus','×':'Times','÷':'Div'};['Plus','Minus','Times','Div'].forEach(n=>{document.getElementById('op'+n)?.classList.remove('sel');});document.getElementById('op'+(map[op]))?.classList.add('sel');updateExprDisp();}
function clearExpr(){buildExpr([],null);}
function updateExprDisp(){const inpA=document.getElementById('exprNumA'),inpB=document.getElementById('exprNumB');if(!inpA||!inpB)return;const a=parseFloat(inpA.value),b=parseFloat(inpB.value),op=exprState.op;const resEl=document.getElementById('exprResult'),fbEl=document.getElementById('exprFb');if(isNaN(a)||isNaN(b)||!op){resEl.textContent='?';resEl.style.color='var(--txt2)';fbEl.textContent='';return;}let res;if(op==='+')res=a+b;else if(op==='-')res=a-b;else if(op==='×')res=a*b;else if(op==='÷'&&b!==0)res=a/b;if(res===undefined||!Number.isInteger(res)){resEl.textContent='?';fbEl.textContent='';return;}resEl.textContent=res;const q=qs.current;
if(q&&res===q.answer){resEl.style.color='var(--a3)';fbEl.textContent='';fbEl.style.color='var(--a3)';}
else{resEl.style.color='var(--txt2)';fbEl.textContent=a&&b?`= ${res}`:'';fbEl.style.color='var(--txt2)';}}

// ── Hint timer ──
function startHintTimer(q){qs.hintSecs=cfg.hintTime;const btn=document.getElementById('hintBtn');btn.disabled=true;if(qs.hintInterval)clearInterval(qs.hintInterval);updateHintLbl();qs.hintInterval=setInterval(()=>{qs.hintSecs--;updateHintLbl();if(qs.hintSecs<=0){clearInterval(qs.hintInterval);btn.disabled=false;document.getElementById('hintTmr').textContent='זמין!';}},1000);}
function updateHintLbl(){const m=Math.floor(qs.hintSecs/60),s=qs.hintSecs%60;document.getElementById('hintTmr').textContent=`${m}:${s.toString().padStart(2,'0')}`;}

function useHint(){if(qs.hintUsed)return;qs.hintUsed=true;addPts(-cfg.ptsHint);const q=qs.current;const h=q.hint||{};const hb=document.getElementById('hintBox');const hc=document.getElementById('hintContent');let html='';if(h.type==='cubes'){html+=`<p style="margin-bottom:7px">🧊 ${h.total} קוביות, מסיר ${h.remove}...</p><div class="cubes-row">`;for(let i=1;i<=Math.min(h.total,30);i++)html+=`<div class="cube ${i>h.total-h.remove?'cr':'cf'}">${i}</div>`;if(h.total>30)html+=`<span style="color:var(--txt2);font-size:.75rem">...עד ${h.total}</span>`;html+=`</div><p>${h.total} - ${h.remove} = <strong style="color:var(--a3)">${h.total-h.remove}</strong></p>`;}else if(h.type==='groups'){html+=`<p style="margin-bottom:7px">👉 ${h.a} קבוצות של ${h.b} ${h.emoji}</p><div class="mulvis-row">`;for(let i=0;i<Math.min(h.a,6);i++){html+='<div class="mg">';for(let j=0;j<Math.min(h.b,8);j++)html+=`<div class="mi">${h.emoji}</div>`;html+='</div>';}html+=`</div><p style="font-size:.82rem;direction:ltr">${h.a} × ${h.b} = <strong style="color:var(--a3)">${h.a*h.b}</strong></p>`;}else if(h.type==='decompose'){const{a,b}=h;const aT=Math.floor(a/10)*10,aU=a%10,bT=Math.floor(b/10)*10,bU=b%10;html+=`<p style="white-space:pre-line">📦 פרק לעשרות:\n${a}=${aT}+${aU}\n${b}=${bT}+${bU}\nעשרות: ${aT+bT}\nאחדות: ${aU+bU}\nסה"כ: <strong style="color:var(--a3)">${a+b}</strong></p>`;}else if(h.type==='word'){const steps=h.steps||[];html+=`<p>"ביחד"→➕ | "נשארו"→➖ | "לכל אחד"→✖️ | "חלוקה"→➗</p>`;if(h.hint)html+=`<p style="margin-top:6px;color:var(--a2)">💡 ${h.hint}</p>`;if(steps.length){html+=`<p style="margin-top:8px;font-weight:700;color:var(--a4)">📋 שלבים:</p>`;steps.forEach(s=>html+=`<p>→ ${s}</p>`);}}else html+=`<p>${h.msg||'💡 חשוב טוב!'}</p>`;hc.innerHTML=html;hb.classList.add('on');document.getElementById('hintBtn').disabled=true;}

// ── Submit ──
function submitAns() {
  const q = qs.current;
  if (!q || qs.done) return;
  const ansInpEl = document.getElementById('ansInp');
  if (ansInpEl?.disabled) return;

  // ── Word questions: validate equation FIRST ──
  if (q.type === 'word') {
    const userAns = parseInt(ansInpEl.value);
    if (isNaN(userAns)) { showToast('✏️ הכנס מספר בתשובה הסופית!'); return; }
    const wordInp = document.getElementById('wordInp');
    if (!wordInp?.value?.trim()) { showToast('✏️ כתוב משפט תשובה!'); return; }

    const userA  = parseFloat(document.getElementById('exprNumA')?.value);
    const userB  = parseFloat(document.getElementById('exprNumB')?.value);
    const userOp = exprState.op;

    const eqResult = checkWordEquation(userA, userOp, userB, q);
    const inp = ansInpEl;

    if (eqResult === 'correct') {
      // ✅ Right equation AND right answer → full points
      inp.classList.add('ok'); inp.classList.remove('bad');
      document.getElementById('ad'+qs.attempts).classList.add('ok');
      const pts = Math.max(q.pts - (qs.hintUsed ? cfg.ptsHint : 0) - qs.attempts * 2, 1);
      addPts(pts); showPtsPop(pts); handleStreak(true);
      showWordFb(document.getElementById('wordInp').value.trim(), q);
      recordHistory(q, userAns, true);
      spawnConf();
      endQ();

    } else if (eqResult === 'right-answer-wrong-equation') {
      // ❌ Right number but wrong equation → counts as wrong attempt, no points
      qs.attempts++;
      inp.classList.add('bad');
      document.getElementById('ad'+(qs.attempts-1)).classList.add('used');
      inp.value=''; setTimeout(()=>inp.classList.remove('bad'), 400);
      handleStreak(false);
      addPts(-cfg.ptsWrong);

      const correctEq = q.validOps && q.validOps[0];
      const opNames = {'+':'חיבור', '-':'חיסור', '×':'כפל', '÷':'חילוק'};

      if (qs.attempts >= cfg.maxAttempts) {
        const eqHint = correctEq
          ? `<br><br>💡 הפעולה הנכונה: <strong>${correctEq.a} ${correctEq.op} ${correctEq.b} = ${q.answer}</strong>`
          : '';
        showFb('bad', `❌ לא הצלחת`, `המספר ${q.answer} נכון — אבל המשוואה לא מתאימה לשאלה!${eqHint}<br><br>${q.steps?.map(s=>`→ ${s}`).join('<br>')||''}`);
        recordHistory(q, userAns, false);
        endQ();
      } else {
        const eqHint = correctEq
          ? `💡 רמז: הפעולה הנכונה היא <strong>${opNames[correctEq.op]||correctEq.op}</strong>`
          : '💡 חשוב שוב איזו פעולה מתאימה לשאלה';
        showFb('part', `⚠️ המספר נכון — אבל המשוואה שגויה!`, `${q.answer} נכון, אבל המשוואה שלך לא מתאימה לשאלה.<br>${eqHint}<br><br>נשארו ${cfg.maxAttempts - qs.attempts} ניסיון/ות`);
        setTimeout(()=>{ document.getElementById('fbBox').classList.remove('on'); inp.focus(); }, 2800);
      }

    } else {
      // ❌ Fully wrong
      qs.attempts++;
      inp.classList.add('bad');
      document.getElementById('ad'+(qs.attempts-1)).classList.add('used');
      addPts(-cfg.ptsWrong);
      inp.value=''; setTimeout(()=>inp.classList.remove('bad'), 400);
      handleStreak(false);

      if (qs.attempts >= cfg.maxAttempts) {
        showFb('bad', '❌ הפעם לא...', buildExpl(q));
        recordHistory(q, userAns, false);
        endQ();
      } else {
        showFb('bad', `😅 לא נכון! עוד ${cfg.maxAttempts - qs.attempts} ניסיון/ות`, '');
        setTimeout(()=>{ document.getElementById('fbBox').classList.remove('on'); inp.focus(); }, 1600);
      }
    }
    return;
  }

  // ── All other question types: just check the number ──
  const userAns = parseInt(ansInpEl.value);
  if (isNaN(userAns)) { showToast('✏️ הכנס מספר!'); return; }
  const ok = userAns === q.answer;
  const inp = ansInpEl;
  if (ok) {
    inp.classList.add('ok'); inp.classList.remove('bad');
    document.getElementById('ad'+qs.attempts).classList.add('ok');
    const pts = Math.max(q.pts - (qs.hintUsed ? cfg.ptsHint : 0) - qs.attempts * 2, 1);
    addPts(pts); showPtsPop(pts); handleStreak(true);
    showFb('ok', `🎉 ${pick(['מדהים!','אלוף!','גאון!','נפלא!','💯'])}`, `${q.answer} — נכון מאוד!`);
    recordHistory(q, userAns, true);
    spawnConf();
    endQ();
  } else {
    qs.attempts++;
    inp.classList.add('bad');
    document.getElementById('ad'+(qs.attempts-1)).classList.add('used');
    addPts(-cfg.ptsWrong);
    inp.value=''; setTimeout(()=>inp.classList.remove('bad'), 400);
    handleStreak(false);
    if (qs.attempts >= cfg.maxAttempts) {
      showFb('bad', '❌ הפעם לא...', buildExpl(q));
      recordHistory(q, userAns, false);
      endQ();
    } else {
      showFb('bad', `😅 לא נכון! עוד ${cfg.maxAttempts - qs.attempts} ניסיון/ות`, '');
      setTimeout(()=>{ document.getElementById('fbBox').classList.remove('on'); inp.focus(); }, 1600);
    }
  }
}

async function showWordFb(writtenText, q) {
  const example = q.exampleAnswer || `${q.answer}`;
  if (!writtenText) {
    showFb('ok', `🎉 נכון! (${q.answer})`, `✅ המשוואה נכונה!<br><br>📝 טיפ: בפעם הבאה כתוב גם משפט תשובה:<br>🌟 דוגמה: "${example}"`);
    return;
  }

  // Show loading state while AI grades
  showFb('ok', `🎉 נכון! בודק את המשפט שלך...`, `<div class="ai-loading">🤖 <span class="ai-dots">מעריך</span></div>`);

  try {
    const prompt = `אתה מורה מתמטיקה ישראלי המעריך משפט תשובה של תלמיד.

שאלה: "${q.text}"
התשובה הנכונה (מספר): ${q.answer}
משפט התשובה של התלמיד: "${writtenText}"
דוגמה למשפט מושלם: "${example}"

העריך את משפט התשובה של התלמיד. תן ציון מ-0 עד 100 ופידבק קצר בעברית.
קריטריונים לציון:
- האם המספר הנכון (${q.answer}) מופיע? (40 נקודות)
- האם המשפט עונה על השאלה בצורה הגיונית ומובנת? (30 נקודות)
- האם המשפט שלם ומנוסח בצורה ברורה? (20 נקודות)
- האם יש נקודה או סימן פיסוק בסוף? (10 נקודות)

ענה אך ורק ב-JSON תקני, ללא טקסט נוסף, ללא backticks:
{"score":NUMBER,"praises":["שבח1","שבח2"],"issues":["בעיה1"],"oneLiner":"משפט פידבק אחד קצר"}`;

    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 400,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await resp.json();
    const raw = data.content?.find(b => b.type === 'text')?.text || '{}';
    const clean = raw.replace(/```json|```/g, '').trim();
    const res = JSON.parse(clean);

    const score = Math.min(Math.max(parseInt(res.score) || 0, 0), 100);
    const praises = res.praises || [];
    const issues = res.issues || [];
    const oneLiner = res.oneLiner || '';
    const barColor = score>=80 ? 'var(--a3)' : score>=50 ? 'var(--a2)' : 'var(--a1)';
    const qualityBar = `<div class="quality-bar"><div class="quality-label"><span>איכות משפט</span><span style="color:${barColor}">${score}/100</span></div><div class="quality-outer"><div class="quality-inner" style="width:${score}%;background:${barColor}"></div></div></div>`;

    let body = '';
    if (praises.length) body += praises.map(p=>`✅ ${p}`).join('<br>') + '<br>';
    if (issues.length)  body += issues.map(i=>`⚠️ ${i}`).join('<br>') + '<br>';
    if (score < 80 && example) body += `<br>🌟 דוגמה: "${example}"`;
    body += qualityBar;
    if (oneLiner) body += `<br><span style="color:var(--txt2);font-size:.8rem">🤖 ${oneLiner}</span>`;

    const title = score>=80 ? `🌟 מצוין! חישוב + משפט מושלם!`
                : score>=50 ? `✅ נכון! המשפט יכול להיות טוב יותר`
                :             `✅ נכון! אבל כדאי לשפר את המשפט`;
    showFb('ok', title, body);

  } catch(e) {
    // Fallback to simple check if AI fails
    const hasAnswer = writtenText.includes(String(q.answer));
    showFb('ok', `🎉 נכון! (${q.answer})`,
      `${hasAnswer ? '✅ המשפט כולל את המספר הנכון' : `⚠️ כדאי לכלול את המספר ${q.answer} במשפט`}<br><br>🌟 דוגמה: "${example}"`);
  }
}

function buildExpl(q){if(q.cat==='word'){let s=`התשובה: <strong>${q.answer}</strong>`;if(q.steps?.length)s+=`<br><br>${q.steps.map(st=>`→ ${st}`).join('<br>')}`;s+=`<br><br>🌟 "${q.exampleAnswer||q.answer}"`;return s;}if(q.cat==='mul')return`התשובה: ${q.answer}<br>${q.mulA} × ${q.mulB} = ${q.answer}`;if(q.cat==='div')return`התשובה: ${q.answer}<br>${q.mulB} × ${q.answer} = ${q.mulB*q.answer}`;return`התשובה: ${q.answer}`;}

function showFb(type,title,txt){const b=document.getElementById('fbBox');b.className='fb-box on fb-'+type;document.getElementById('fbTitle').textContent=title;document.getElementById('fbText').innerHTML=(txt||'').replace(/\n/g,'<br>');}

function endQ(){qs.done=true;const inp=document.getElementById('ansInp');if(inp){inp.disabled=true;inp.blur();}const sb=document.querySelector('.bsubmit');if(sb)sb.disabled=true;document.getElementById('qBtns').style.display='none';document.getElementById('nextBtns').style.display='flex';if(qs.hintInterval){clearInterval(qs.hintInterval);qs.hintInterval=null;}document.getElementById('moreBtn').style.display=qs.idx>=qs.pool.length-1?'inline-flex':'none';}

function nextQ(){if(qs.isDaily){qs.isDailyIdx++;if(qs.isDailyIdx>=2){finishDaily();return;}qs.idx++;if(qs.idx<qs.pool.length)loadQ(qs.pool[qs.idx]);return;}qs.idx++;if(qs.idx>=qs.pool.length){genMore();return;}loadQ(qs.pool[qs.idx]);}
function skipQ(){addPts(-1);nextQ();}
function genMore(){qs.pool=[...qs.pool,...genPool(qs.cat,qs.diff,10)];nextQ();}
function exitToHome(){if(qs.hintInterval)clearInterval(qs.hintInterval);show('home');}

// ── Streak ──
function handleStreak(correct){if(correct){st.streak++;if(st.streak>st.maxStreak)st.maxStreak=st.streak;let bonus=0,msg='';if(st.streak===3){bonus=cfg.streakBonus3;msg=`🔥 רצף 3! +${bonus}`;}else if(st.streak===5){bonus=cfg.streakBonus5;msg=`⚡ רצף 5! +${bonus}`;}else if(st.streak===10||st.streak%10===0){bonus=cfg.streakBonus10;msg=`💥 רצף ${st.streak}!! +${bonus}`;}if(bonus>0){addPts(bonus);const sf=document.getElementById('strkFire');document.getElementById('sfVal').textContent=`🔥 ${st.streak}`;document.getElementById('sfLbl').textContent=msg;sf.classList.add('show');setTimeout(()=>sf.classList.remove('show'),2000);}const slEl=document.getElementById('streakLive');if(slEl)slEl.style.display='inline-flex';const spu=SPECIAL_USERS[(window._username||'').toLowerCase()];if(spu?.streakDisplay){if(slEl)slEl.innerHTML=spu.streakDisplay(st.streak);}else{const sc=document.getElementById('streakLiveCnt');if(sc)sc.textContent=st.streak;}}else{st.streak=0;document.getElementById('streakLive').style.display='none';}save();}

// ── Points & levels ──
function addPts(n){st.score=Math.max(0,st.score+n);st.xp=Math.max(0,st.xp+n);const lv=LEVELS[Math.min(st.level,LEVELS.length-1)];if(st.xp>=lv.xp&&st.level<LEVELS.length-1){st.xp-=lv.xp;st.level++;save();showLvup();}else save();const el=document.getElementById('qScore');if(el)el.textContent=st.score;}
function showPtsPop(n){const p=document.getElementById('ptsPop'),v=document.getElementById('ptsVal');v.textContent=(n>0?'+':'')+n;v.style.color=n>0?'var(--a2)':'var(--a1)';p.classList.add('on');setTimeout(()=>p.classList.remove('on'),1300);}
function showLvup(){const lv=LEVELS[Math.min(st.level,LEVELS.length-1)];document.getElementById('lvupIcon').textContent=lv.e;document.getElementById('lvupTitle').textContent=`עלית לרמה ${st.level+1}! ${lv.e}`;document.getElementById('lvupSub').textContent=`עכשיו אתה: ${lv.n}! 🎉`;document.getElementById('lvupOv').classList.add('on');spawnConf(40);}
function closeLvup(){document.getElementById('lvupOv').classList.remove('on');}
function spawnConf(n=20){const cols=['#ffd32a','#ff4757','#2ed573','#1e90ff','#9b59b6','#ff6348','#ff9f43'];for(let i=0;i<n;i++){const p=document.createElement('div');p.className='cf-p';p.style.cssText=`left:${rnd(10,90)}vw;top:0;background:${pick(cols)};border-radius:${rnd(0,50)}%;width:${rnd(6,14)}px;height:${rnd(6,14)}px;animation-delay:${rnd(0,10)/10}s;`;document.body.appendChild(p);setTimeout(()=>p.remove(),2200);}}

// ── History ──
function recordHistory(q,userAns,correct){st.totalSolved++;if(correct)st.correctCount++;st.history.push({q:q.text,answer:q.answer,userAns,correct,cat:q.cat,diff:q.diff,ts:Date.now(),qObj:q});if(st.history.length>200)st.history.shift();save();}

function openHistory(){show('history-scr');renderHistory('all');const total=st.history.length,ok=st.history.filter(h=>h.correct).length;document.getElementById('histStats').innerHTML=`<div style="background:var(--card);border-radius:13px;padding:12px;text-align:center;border:1px solid rgba(255,255,255,.07)"><div style="font-size:1.6rem;font-weight:900;color:var(--a2)">${total}</div><div style="font-size:.77rem;color:var(--txt2)">סה"כ</div></div><div style="background:var(--card);border-radius:13px;padding:12px;text-align:center;border:1px solid rgba(46,213,115,.2)"><div style="font-size:1.6rem;font-weight:900;color:var(--a3)">${ok}</div><div style="font-size:.77rem;color:var(--txt2)">נכון</div></div><div style="background:var(--card);border-radius:13px;padding:12px;text-align:center;border:1px solid rgba(255,71,87,.2)"><div style="font-size:1.6rem;font-weight:900;color:var(--a1)">${total-ok}</div><div style="font-size:.77rem;color:var(--txt2)">שגוי</div></div>`;}

function filterHist(type){['all','ok','bad'].forEach(t=>document.getElementById('hf'+t.charAt(0).toUpperCase()+t.slice(1)).style.background=t===type?'rgba(30,144,255,.2)':'rgba(255,255,255,.06)');renderHistory(type);}

function renderHistory(filter){const list=document.getElementById('histList');list.innerHTML='';const items=[...st.history].reverse().slice(0,50);const filtered=filter==='all'?items:items.filter(h=>filter==='ok'?h.correct:!h.correct);if(filtered.length===0){list.innerHTML='<div style="color:var(--txt2);text-align:center;padding:20px">אין פריטים להציג</div>';return;}const catNames={add:'חיבור',sub:'חיסור',mul:'כפל',div:'חילוק',word:'מילוליות',shapes:'גיאומטריה',fractions:'שברים'};filtered.forEach(h=>{const d=new Date(h.ts);const timeStr=`${d.getDate()}/${d.getMonth()+1} ${d.getHours()}:${d.getMinutes().toString().padStart(2,'0')}`;const el=document.createElement('div');el.className='hist-entry';el.innerHTML=`<div class="hist-icon">${h.correct?'✅':'❌'}</div><div class="hist-info"><div class="hist-q">${h.q}</div><div class="hist-meta">${catNames[h.cat]||h.cat} • ${h.diff==='easy'?'קל':h.diff==='medium'?'בינוני':'קשה'} • ${timeStr}</div>${!h.correct?`<div style="font-size:.78rem;color:var(--a1)">תשובה נכונה: ${h.answer}</div>`:''}</div><span class="hist-status ${h.correct?'hs-ok':'hs-bad'}">${h.correct?'✓':'✗'}</span>`;el.onclick=()=>retryFromHistory(h);list.appendChild(el);});}

function retryFromHistory(h){if(!h.qObj)return;qs.pool=[h.qObj];qs.idx=0;qs.isDaily=false;qs.isMistakes=false;qs.isExam=false;qs.cat=h.cat;qs.diff=h.diff;show('q-scr');loadQ(h.qObj);}

// ── Mistakes ──
function openMistakes(){show('mistakes-scr');const list=document.getElementById('mistakesList');list.innerHTML='';const mistakes=st.history.filter(h=>!h.correct&&h.qObj).slice(-20).reverse();document.getElementById('practiceMistakesBtn').style.display=mistakes.length>0?'block':'none';if(mistakes.length===0){list.innerHTML='<div style="color:var(--txt2);text-align:center;padding:24px">🌟 אין טעויות! כל הכבוד!</div>';return;}const catNames={add:'חיבור',sub:'חיסור',mul:'כפל',div:'חילוק',word:'מילוליות'};mistakes.forEach(h=>{const el=document.createElement('div');el.className='hist-entry';el.innerHTML=`<div class="hist-icon">🔄</div><div class="hist-info"><div class="hist-q">${h.q}</div><div class="hist-meta">${catNames[h.cat]||h.cat} • תשובה: <strong style="color:var(--a3)">${h.answer}</strong></div></div><button style="padding:6px 12px;background:rgba(255,159,67,.2);border:1px solid var(--streak);color:var(--streak);border-radius:8px;cursor:pointer;font-family:'Rubik',sans-serif;font-size:.8rem;white-space:nowrap;">תרגל</button>`;el.querySelector('button').onclick=(e)=>{e.stopPropagation();retryFromHistory(h);};list.appendChild(el);});}
function startMistakesPractice(){const mistakes=st.history.filter(h=>!h.correct&&h.qObj).slice(-20);if(mistakes.length===0){showToast('אין טעויות לתרגל!');return;}qs.pool=mistakes.map(h=>h.qObj);qs.idx=0;qs.isMistakes=true;qs.isDaily=false;qs.isExam=false;qs.cat=qs.pool[0].cat;qs.diff=qs.pool[0].diff;show('q-scr');loadQ(qs.pool[0]);}

// ── Daily ──
function startDaily(){if(st.dailyDone){showToast('✅ כבר השלמת את המשימה היומית!');return;}const gc=window.GRADE_CONFIG;const available=(gc?.availableCategories||['add','sub','mul']).filter(c=>['add','sub','mul'].includes(c));const cats=available.length>0?available:['add','sub'];qs.pool=[genQ(pick(cats),'medium'),genQ(pick(cats),'medium')];qs.idx=0;qs.isDaily=true;qs.isDailyIdx=0;qs.isMistakes=false;qs.isExam=false;qs.cat=qs.pool[0].cat;show('q-scr');loadQ(qs.pool[0]);}
function finishDaily(){st.dailyDone=true;save();addPts(20);showPtsPop(20);spawnConf(25);showToast('🎉 משימה יומית הושלמה! +20 בונוס!');setTimeout(()=>show('home'),2000);}

// ── Exam ──
const EXAM_CATS=[{id:'add',n:'➕ חיבור'},{id:'sub',n:'➖ חיסור'},{id:'mul',n:'✖️ כפל'},{id:'div',n:'➗ חילוק',needs:'division'},{id:'word',n:'📖 מילוליות'},{id:'shapes',n:'📐 גיאומטריה',needs:'shapes'},{id:'fractions',n:'½ שברים',needs:'fractions'}];

function openExamPre(){const gc=window.GRADE_CONFIG;const available=gc?.availableExamTopics||['add','sub','mul','word'];const g=document.getElementById('examTopicsGrid');g.innerHTML='';EXAM_CATS.forEach(cat=>{if(!available.includes(cat.id))return;const locked=cat.needs&&!st.learnedTopics.includes(cat.needs);const sel=st.examTopics.includes(cat.id);const b=document.createElement('button');b.className='etopic-btn'+(sel&&!locked?' sel':'')+(locked?' locked':'');b.textContent=cat.n+(locked?' 🔒':'');b.disabled=locked;b.onclick=()=>{if(locked)return;const i=st.examTopics.indexOf(cat.id);if(i>=0)st.examTopics.splice(i,1);else st.examTopics.push(cat.id);save();openExamPre();};g.appendChild(b);});['easy','medium','hard','mix'].forEach(d=>{const btn=document.getElementById('exD'+{easy:'e',medium:'m',hard:'h',mix:'x'}[d]);if(btn)btn.style.opacity=st.examDiff===d?1:.4;});document.getElementById('examPreInfo').textContent=`נושאים: ${st.examTopics.length} | 10 שאלות`;show('exam-pre-scr');}
function setExamDiff(d){st.examDiff=d;save();openExamPre();}
function startExam(){if(st.examTopics.length===0){showToast('בחר לפחות נושא אחד!');return;}qs.isExam=true;qs.isDaily=false;qs.isMistakes=false;qs.examPool=[];for(let i=0;i<10;i++){const cat=pick(st.examTopics);const diff=st.examDiff==='mix'?pick(['easy','medium','hard']):st.examDiff;qs.examPool.push(genQ(cat,diff));}qs.examIdx=0;qs.examScore=0;qs.examSecs=600;show('exam-scr');document.getElementById('examResults').style.display='none';document.getElementById('examQArea').style.display='block';loadExamQ();startExamTimer();}
function loadExamQ(){if(qs.examIdx>=qs.examPool.length){finishExam();return;}const q=qs.examPool[qs.examIdx];qs.current=q;qs.attempts=0;qs.hintUsed=false;qs.done=false;document.getElementById('examProg').textContent=`שאלה ${qs.examIdx+1}/10`;document.getElementById('examBar').style.width=((qs.examIdx+1)/10*100)+'%';const area=document.getElementById('examQArea');area.innerHTML=`<div class="gcard"><div style="display:flex;justify-content:space-between;margin-bottom:12px"><span class="lbadge ${q.diff==='easy'?'easy':q.diff==='medium'?'med':'hard'}">${q.diff==='easy'?'🌱 קל':q.diff==='medium'?'⚡ בינוני':'🔥 קשה'}</span><span class="pts-badge">+${q.pts}</span></div><div style="font-size:.78rem;color:var(--a6);text-align:center;margin-bottom:5px">${q.label||''}</div><div class="qtxt" style="direction:${q.dir||'rtl'}">${q.text}</div>${q.showMul?`<div id="emv" style="margin-bottom:10px"></div>`:''}<div class="ans-row"><input type="number" id="eInp" class="ans-inp" placeholder="?" onkeydown="if(event.key==='Enter')submitExamAns()"><div class="ans-eq">=</div></div><div class="atts" id="eAtts"><span style="color:var(--txt2);font-size:.8rem">ניסיונות:</span><div class="adot" id="ead0"></div><div class="adot" id="ead1"></div><div class="adot" id="ead2"></div></div><div class="fb-box" id="eFb"></div><div class="qbtns" id="eBtns"><button class="qbtn bsubmit" onclick="submitExamAns()">✅ בדוק</button></div><div class="qbtns" id="eNext" style="display:none"><button class="qbtn bnext" onclick="nextExamQ()">➡️ הבא</button></div></div>`;if(q.showMul){const emv=document.getElementById('emv');if(!emv)return;let h='<div class="mulvis-row">';for(let i=0;i<Math.min(q.mulA,6);i++){h+='<div class="mg">';for(let j=0;j<Math.min(q.mulB,8);j++)h+=`<div class="mi">${q.mulEmoji}</div>`;h+='</div>';}h+='</div>';emv.innerHTML=h;}setTimeout(()=>{const e=document.getElementById('eInp');if(e)e.focus();},150);}
function submitExamAns(){const q=qs.current;if(!q||qs.done)return;const inp=document.getElementById('eInp');if(inp?.disabled)return;const ua=parseInt(inp.value);if(isNaN(ua))return;const ok=ua===q.answer;if(ok){inp.classList.add('ok');document.getElementById('ead'+qs.attempts).classList.add('ok');qs.examScore+=q.pts;recordHistory(q,ua,true);const fb=document.getElementById('eFb');fb.className='fb-box on fb-ok';fb.innerHTML='<div class="fb-title">🎉 נכון!</div>';qs.done=true;if(inp){inp.disabled=true;inp.blur();}document.getElementById('eBtns').style.display='none';document.getElementById('eNext').style.display='flex';}else{qs.attempts++;document.getElementById('ead'+(qs.attempts-1)).classList.add('used');inp.classList.add('bad');inp.value='';setTimeout(()=>inp.classList.remove('bad'),400);if(qs.attempts>=3){recordHistory(q,ua,false);const fb=document.getElementById('eFb');fb.className='fb-box on fb-bad';fb.innerHTML=`<div class="fb-title">❌ לא הצלחת</div><div>תשובה: <strong>${q.answer}</strong></div>`;qs.done=true;if(inp){inp.disabled=true;inp.blur();}document.getElementById('eBtns').style.display='none';document.getElementById('eNext').style.display='flex';}}}
function nextExamQ(){qs.examIdx++;loadExamQ();}
function startExamTimer(){qs.examTimer=setInterval(()=>{qs.examSecs--;const m=Math.floor(qs.examSecs/60),s=qs.examSecs%60;document.getElementById('examTmr').textContent=`⏱️ ${m}:${s.toString().padStart(2,'0')}`;if(qs.examSecs<=0){clearInterval(qs.examTimer);finishExam();}},1000);}
function finishExam(){if(qs.examTimer)clearInterval(qs.examTimer);const total=qs.examPool.reduce((s,q)=>s+q.pts,0);const pct=Math.round(qs.examScore/total*100);let grade,msg;if(pct>=90){grade='A+ 🏆';msg='מדהים! גאון מתמטיקה!';}else if(pct>=75){grade='A 🌟';msg='מצוין מאוד!';}else if(pct>=60){grade='B ⚡';msg='טוב! אפשר לשפר!';}else if(pct>=40){grade='C 📚';msg='עוד קצת תרגול!';}else{grade='D 😊';msg='תלמד שוב ותנסה!';}addPts(Math.round(qs.examScore/10));document.getElementById('examQArea').style.display='none';const r=document.getElementById('examResults');r.style.display='block';r.innerHTML=`<div class="gcard" style="text-align:center"><div style="font-size:3rem;margin-bottom:8px">${pct>=75?'🏆':pct>=50?'⭐':'📚'}</div><div style="font-family:'Fredoka',sans-serif;font-size:2.5rem;color:var(--a2)">${grade}</div><div style="font-size:1rem;margin:10px 0">${msg}</div><div style="font-size:.9rem;color:var(--txt2)">${qs.examScore} / ${total} (${pct}%)</div><button class="lgo" style="margin-top:18px" onclick="show('home')">→ חזרה לבית</button></div>`;if(pct>=75)spawnConf(30);}
