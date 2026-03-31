// ══ LEARN TOPICS & LESSONS ══

const LEARN_TOPICS = [
  { id: 'division',   n: 'חילוק',      icon: '➗', desc: 'לחלק שווה בשווה' },
  { id: 'shapes',     n: 'גיאומטריה',  icon: '📐', desc: 'צורות, זוויות, צלעות' },
  { id: 'fractions',  n: 'שברים',      icon: '½',  desc: 'חלקים של שלם' },
  { id: 'measurement',n: 'מדידה',      icon: '📏', desc: 'אורך, משקל, זמן' }
];

const LESSONS = {
  division: {
    title: '➗ חילוק',
    html: `
      <div class="lesson-title">➗ חילוק!</div>
      <div class="lsec"><h3>🤔 מה זה חילוק?</h3><p>לחלק דברים בשווה!</p>
        <div class="lexample">🍕🍕🍕🍕🍕🍕 ÷ 2 = 🍕🍕🍕</div>
      </div>
      <div class="lsec"><h3>💡 הקשר לכפל</h3>
        <div class="lexample">3 × 4 = 12 ↔ 12 ÷ 4 = 3</div>
      </div>
      <div class="lsec"><h3>🎯 דוגמאות</h3>
        <div class="lstep"><div class="lstepn">1</div><div>10 ÷ 2 = <strong>5</strong></div></div>
        <div class="lstep"><div class="lstepn">2</div><div>15 ÷ 3 = <strong>5</strong></div></div>
        <div class="lstep"><div class="lstepn">3</div><div>24 ÷ 6 = <strong>4</strong></div></div>
      </div>`
  },
  shapes: {
    title: '📐 גיאומטריה',
    html: `
      <div class="lesson-title">📐 צורות</div>
      <div class="lsec"><h3>🔺 משולש</h3><p>3 צלעות, 3 פינות</p></div>
      <div class="lsec"><h3>⬜ ריבוע</h3><p>4 צלעות שוות</p></div>
      <div class="lsec"><h3>▭ מלבן</h3><p>4 צלעות, 2 זוגות</p></div>
      <div class="lsec"><h3>⭕ עיגול</h3><p>אין פינות!</p></div>
      <div class="lsec"><div class="lexample rtl">מחומש=5, משושה=6</div></div>`
  },
  fractions: {
    title: '½ שברים',
    html: `
      <div class="lesson-title">½ שברים</div>
      <div class="lsec"><h3>🍕 מה זה שבר?</h3>
        <div class="lexample">1/2 = חצי | 1/4 = רבע</div>
      </div>
      <div class="lsec"><h3>🎯 חישוב</h3>
        <div class="lstep"><div class="lstepn">1</div><div>1/2 מ-8: 8÷2=<strong>4</strong></div></div>
        <div class="lstep"><div class="lstepn">2</div><div>3/4 מ-12: (12÷4)×3=<strong>9</strong></div></div>
      </div>`
  },
  measurement: {
    title: '📏 מדידה',
    html: `
      <div class="lesson-title">📏 מדידה</div>
      <div class="lsec"><h3>📏 אורך</h3>
        <div class="lstep"><div class="lstepn">📐</div><div>1מ'=100ס"מ | 1ק"מ=1000מ'</div></div>
      </div>
      <div class="lsec"><h3>⚖️ משקל</h3>
        <div class="lstep"><div class="lstepn">⚖️</div><div>1ק"ג=1000גרם</div></div>
      </div>
      <div class="lsec"><h3>⏰ זמן</h3>
        <div class="lstep"><div class="lstepn">⏰</div><div>שעה=60דקות | דקה=60שניות</div></div>
      </div>`
  }
};

function openLearn() {
  const c = document.getElementById('learnTopics');
  c.innerHTML = '';
  LEARN_TOPICS.forEach(t => {
    const done = st.learnedTopics.includes(t.id);
    const el = document.createElement('div');
    el.className = 'ltopic' + (done ? ' ltdone' : '');
    el.innerHTML = `<div class="lt-icon">${t.icon}</div><div class="lt-info"><div class="lt-name">${t.n}</div><div class="lt-desc">${t.desc}</div></div><span class="lt-badge ${done?'ltdone-b':'ltnew'}">${done?'✅ למדת':'🆕 חדש'}</span>`;
    el.onclick = () => openLesson(t.id);
    c.appendChild(el);
  });
  show('learn-scr');
}

function openLesson(id) {
  const lesson = LESSONS[id];
  if (!lesson) return;
  const c = document.getElementById('lessonContent');
  c.innerHTML = lesson.html;
  const btn = document.createElement('button');
  btn.className = 'lgo';
  btn.textContent = '✅ הבנתי! פתח לתרגול';
  btn.onclick = () => {
    if (!st.learnedTopics.includes(id)) {
      st.learnedTopics.push(id);
      save();
      addPts(15);
      showPtsPop(15);
      showToast(`🎉 +15! ${lesson.title} נפתח!`);
    }
    show('home');
    setTimeout(updateHome, 100);
  };
  c.appendChild(btn);
  show('lesson-scr');
}
