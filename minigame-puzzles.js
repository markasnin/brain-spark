/* Two short, grade-adaptive math games. Progress is scoped to each round. */
function createArcadePuzzle(mode) {
  const trail = mode === 'trail';
  const rounds = trail ? 5 : 4;
  let round, question, choices, message, digits, difficulty, started, unlocked;

  function startRound() {
    const diff = difficulty === 'mix' ? (round===0?'easy':round===rounds-1?'hard':'medium') : difficulty;
    question = minigameQuestion(diff);
    if (!trail) return;
    const answer = question.answer;
    const increment = Number.isInteger(answer) ? 1 : 0.1;
    const offsets = answer>=2 ? [-2,-1,1] : [1,2,3];
    choices = [answer,...offsets.map(offset=>Number((answer+increment*offset).toFixed(6)))];
    for (let i=choices.length-1;i>0;i--) {
      const j=rnd(0,i);
      [choices[i],choices[j]]=[choices[j],choices[i]];
    }
  }

  function open() {
    round=0; message=''; digits=[]; difficulty='mix'; started=false; unlocked=false;
    show('minigameScreen');
    render();
  }

  function render() {
    const done = trail ? round === rounds : unlocked;
    const codeReady = !trail && round === rounds && !unlocked;
    const screen = document.getElementById('minigameScreen');
    screen.innerHTML = `<section id="${trail?'trailWrap':'vaultWrap'}" class="arcade-stage arcade-puzzle" data-mode="${mode}">
      <header class="arcade-heading">
        <h1>${trail?'🧭 שביל המספרים':'🔐 כספת המספרים'}</h1>
        <button class="back" type="button" data-menu>← מיני-משחקים</button>
      </header>
      <div class="puzzle-scene">
      <div class="puzzle-track" aria-label="${round} / ${rounds}">
        ${Array.from({length:rounds},(_,i)=>`<span class="puzzle-step${i<round?' is-cleared':i===round?' is-current':''}">${trail?(i<round?'✓':i===round?'🧭':i+1):(digits[i]??'•')}</span>`).join('')}
        <span class="puzzle-finish" aria-hidden="true">${done?'🏆':trail?'🏁':'🔒'}</span>
      </div>
      </div>
      ${!started ? `<div class="puzzle-card puzzle-start">
        <h2>בחר רמת קושי:</h2>
        <div class="puzzle-difficulties">
          ${[['easy','קל'],['medium','בינוני'],['hard','קשה'],['mix','תערובת']].map(([id,label])=>
            `<button type="button" data-difficulty="${id}">${label}</button>`).join('')}
        </div>
      </div>` : codeReady ? `<div class="puzzle-card">
        <h2>הקלידו את הספרות לפי הסדר</h2>
        <form class="puzzle-form" data-code><input aria-label="קוד הכספת" type="text" inputmode="numeric" pattern="[0-9]{4}" maxlength="4" autocomplete="off" required><button class="auth-btn" type="submit">פתח את הכספת</button></form>
        <output aria-live="polite" class="puzzle-message">${message}</output>
      </div>` : done? `<div class="puzzle-card puzzle-win"><h2>${trail?'מצאתם את האוצר!':'הכספת נפתחה!'}</h2>
          <button class="auth-btn" type="button" data-replay>שחק שוב</button></div>` :
        `<div class="puzzle-card"><div class="puzzle-prompt" dir="${question.dir||'auto'}">${questionPrompt(question)}</div>
          ${trail ? `<div class="puzzle-choices">${choices.map((value,i)=>`<button type="button" data-choice="${i}">${value}</button>`).join('')}</div>` :
          `<form class="puzzle-form"><input aria-label="התשובה:" type="number" step="any" inputmode="decimal" required><button class="auth-btn" type="submit">בדוק</button></form>`}
          <details class="puzzle-hint" hidden><summary>רמז</summary><div class="question-visual" hidden></div></details>
          <output aria-live="polite" class="puzzle-message">${message}</output>
        </div>`}
    </section>`;
    screen.querySelector('[data-menu]').addEventListener('click',window.openMinigames);
    screen.querySelector('[data-replay]')?.addEventListener('click',open);
    for (const button of screen.querySelectorAll('[data-difficulty]')) {
      button.addEventListener('click',()=>{
        difficulty=button.dataset.difficulty;
        started=true;
        startRound();
        render();
      });
    }
    const hint = screen.querySelector('.puzzle-hint');
    if (hint) {
      const visual = hint.querySelector('.question-visual');
      mountQuestionVisual(visual,question);
      hint.hidden = visual.hidden;
    }
    for (const button of screen.querySelectorAll('[data-choice]')) {
      button.addEventListener('click',()=>checkAnswer(choices[Number(button.dataset.choice)]));
    }
    screen.querySelector('form')?.addEventListener('submit',event=>{
      event.preventDefault();
      const form = event.currentTarget;
      const value = form.querySelector('input').value;
      if (form.hasAttribute('data-code')) {
        if (value === digits.join('')) { unlocked=true; render(); }
        else screen.querySelector('output').textContent='לא נכון, נסה שוב';
        return;
      }
      checkAnswer(numericAnswer(value));
    });
  }

  function checkAnswer(value) {
    if (value !== question.answer) {
      message='לא נכון, נסה שוב';
      const screen=document.getElementById('minigameScreen');
      screen.querySelector('output').textContent=message;
      return;
    }
    if (!trail) digits.push(String(Math.trunc(Math.abs(question.answer)) % 10));
    round++;
    message=round===rounds?'':'נכון!';
    if (round<rounds) startRound();
    render();
    document.querySelector('#minigameScreen .puzzle-card :is(button,input)')?.focus();
  }

  return {open,exit:()=>show('home')};
}

window.TrailGame = createArcadePuzzle('trail');
window.VaultGame = createArcadePuzzle('vault');
