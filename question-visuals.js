/* Shared presentation for practice, exams and minigames. */
function questionPrompt(q) {
  const escape = text => text.replace(/[&<>"']/g, char =>
    ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'})[char]);
  const translated = Object.keys(supportedLanguages).map(language => {
    const index = ['en','ru','ar'].indexOf(language);
    const text = (index >= 0 && q.localized?.[index]) || interfaceText(q.text,language);
    const tokens = /\u2066([^\u2069]+)\u2069|([−-]?\d+(?:[.,]\d+)*)(?:\s*([÷/])\s*([−-]?\d+(?:[.,]\d+)*))?[%°]?/g;
    let format = '';
    let cursor = 0;
    for (const match of text.matchAll(tokens)) {
      const [token, expression, numerator, operator, denominator] = match;
      format += escape(text.slice(cursor, match.index));
      if (operator && q.cat === 'div') {
        format += `<bdi dir="ltr" class="math-token math-fraction" aria-label="${numerator} ÷ ${denominator}"><span aria-hidden="true">${numerator}</span><span aria-hidden="true">${denominator}</span></bdi>`;
      } else {
        format += `<bdi dir="ltr" class="math-token">${escape(expression ?? token)}</bdi>`;
      }
      cursor = match.index + token.length;
    }
    format += escape(text.slice(cursor));
    return `<span class="question-language" data-language="${language}" dir="auto"${language===activeLanguage?'':' hidden'}>${format}</span>`;
  });
  return translated.join('');
}

function mountQuestionVisual(container, q) {
  container.replaceChildren();
  container.hidden = false;
  if (q.visual?.kind === 'graph') {
    mountGraph(container, q.visual);
  } else if (q.visual?.kind === 'algebra') {
    mountAlgebra(container, q.visual);
  } else if (q.visual?.kind === 'shape') {
    mountShape(container, q.visual);
  } else if (q.shapeHtml) {
    container.innerHTML = q.shapeHtml;
    if (['shapes','area','angles','measurement','volume','circle'].includes(q.cat)) {
      const svg = container.querySelector('svg');
      if (svg) addShapeExplorer(container, svg);
    }
  } else {
    const arithmetic = q.dir === 'ltr' && q.text.match(/^(\d+)\s*([+−-])\s*(\d+)\s*=\s*\?$/);
    if (arithmetic && +arithmetic[1] + (arithmetic[2]==='+' ? +arithmetic[3] : 0) <= 20) {
      mountCounters(container, +arithmetic[1], arithmetic[2]==='+' ? '+' : '−', +arithmetic[3]);
      return;
    }
    const fraction = q.text.match(/(?:^|\s)([1-9])\/([2-9])(?=\s|$)/);
    if (fraction && ['fractions','fractions_unit'].includes(q.cat) && +fraction[1] < +fraction[2]) {
      mountFraction(container, +fraction[1], +fraction[2]);
    } else {
      container.hidden = true;
    }
  }
}

function mountGraph(container, {values, unit, axis, xStart = 0, label = 'שעה'}) {
  const top = Math.ceil(Math.max(...values) / 5) * 5;
  const stride = Math.max(1, Math.ceil(top / 25));
  const y = value => 169 - value/top*140;
  const x = index => 53 + index * 240/(values.length-1);
  const ticks = [0,1,2,3,4,5].map(i => Math.round(i*top/5/stride)*stride);
  ticks[5] = top;
  const guides = [...new Set(ticks)].map(value =>
    `<path d="M42 ${y(value)}H304" class="plot-grid"/><text x="32" y="${y(value)+4}" text-anchor="end">${value}</text>`).join('');
  const dots = values.map((value,i) =>
    `<circle data-point="${i}" cx="${x(i)}" cy="${y(value)}" r="5" class="plot-dot" />
      <text x="${x(i)}" y="190" text-anchor="middle">${i+xStart}</text>`).join('');
  container.innerHTML = `<svg class="practice-plot" viewBox="0 0 322 215" role="img" aria-label="גרף ${axis} לפי זמן">
    ${guides}<path d="M42 22V169H304" class="plot-axis"/>
    <polyline points="${values.map((value,i)=>x(i)+','+y(value)).join(' ')}" class="plot-series"/>
    <path class="plot-guide" data-guide/>${dots}
    <text x="52" y="15" text-anchor="start">${axis} (${unit})</text>
    <text x="175" y="209" text-anchor="middle">זמן (שעות)</text>
  </svg>
  <div class="visual-controls" role="group" aria-label="בחירת נקודה בגרף">
    ${values.map((_,i)=>`<button type="button" data-index="${i}" aria-pressed="false">${label} ${i+xStart}</button>`).join('')}
  </div><output class="visual-feedback" aria-live="polite">בחרו שעה כדי לקרוא את הערך שלה.</output>`;
  const buttons = [...container.querySelectorAll('[data-index]')];
  const points = [...container.querySelectorAll('[data-point]')];
  const guide = container.querySelector('[data-guide]');
  const output = container.querySelector('output');
  function select(index) {
    buttons.forEach((button,i) => button.setAttribute('aria-pressed', String(i===index)));
    points.forEach((point,i) => point.classList.toggle('is-selected', i===index));
    guide.setAttribute('d', `M42 ${y(values[index])}H${x(index)}V169`);
    output.textContent = `שעה ${index+xStart} · ${values[index]} ${unit}`;
  }
  buttons.forEach((button,i) => button.addEventListener('click', () => select(i)));
  points.forEach((point,i) => point.addEventListener('click', () => select(i)));
}

function mountAlgebra(container, {terms, note, choiceLabel = 'בדקו איבר', joiner = ''}) {
  container.innerHTML = `<div class="algebra-board" dir="ltr" role="group" aria-label="${choiceLabel}">
    ${terms.map(([label],i)=>`<button type="button" data-term="${i}" aria-pressed="false">${label}</button>`).join(joiner)}
  </div><output class="visual-feedback" aria-live="polite">${note}</output>`;
  const buttons = [...container.querySelectorAll('[data-term]')];
  const output = container.querySelector('output');
  buttons.forEach((button,i) => button.addEventListener('click', () => {
    buttons.forEach((other,j) => other.setAttribute('aria-pressed', String(i===j)));
    output.textContent = terms[i][1];
  }));
}

function mountShape(container, {body, label}) {
  container.innerHTML = `<svg class="shape-diagram" viewBox="0 0 320 210" role="img" aria-label="${label}">${body}</svg>`;
  addShapeExplorer(container, container.firstElementChild);
}

function addShapeExplorer(container, svg) {
  const shape = svg.querySelector('[data-outline]') || [...svg.querySelectorAll('polygon, rect, circle, ellipse, path')]
    .find(part => !part.closest('defs') && part.getAttribute('stroke') && part.getAttribute('fill') !== 'none');
  if (!shape) return;
  const guides = [...svg.querySelectorAll('.diagram-guide, .diagram-cut')];
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'shape-explore';
  button.textContent = 'הדגשת הצורה';
  button.setAttribute('aria-pressed','false');
  function toggle() {
    const selected = shape.classList.toggle('shape-selected');
    button.setAttribute('aria-pressed', String(selected));
  }
  button.addEventListener('click', toggle);
  shape.addEventListener('click', toggle);
  const controls = document.createElement('div');
  controls.className = 'visual-controls';
  controls.append(button);
  if (guides.length) {
    const guideButton = document.createElement('button');
    guideButton.type = 'button';
    guideButton.textContent = 'הדגשת קווי עזר';
    guideButton.setAttribute('aria-pressed','false');
    guideButton.addEventListener('click', () => {
      const selected = guideButton.getAttribute('aria-pressed') === 'false';
      guideButton.setAttribute('aria-pressed', String(selected));
      guides.forEach(guide => guide.classList.toggle('shape-selected', selected));
    });
    controls.append(guideButton);
  }
  container.append(controls);
}

function mountFraction(container, numerator, denominator) {
  container.innerHTML = `<div class="fraction-tiles" dir="ltr" role="img" aria-label="${numerator} חלקים צבועים מתוך ${denominator}">
    ${Array.from({length:denominator},(_,i)=>`<i class="${i<numerator?'is-filled':''}"></i>`).join('')}
  </div>`;
}

function curriculumVisual(grade, cat, level, n) {
  if (grade === 'ז') {
    if (cat === 'graphs') return [
      {kind:'graph', axis:'מחיר', unit:'₪', values:Array.from({length:5}, (_,i)=>5+n*i)},
      {kind:'graph', axis:'גובה המים', unit:'ס״מ', values:[n+2,n+8,n+5]},
      {kind:'graph', axis:'מרחק', unit:'ק״מ', xStart:2, values:Array.from({length:4}, (_,i)=>8+n*(i+2))},
    ][level];
    if (cat === 'algebra') return [
      {kind:'algebra', note:'לחצו על האיברים כדי לבדוק איך מציבים.', terms:[
        ['8','דמי הכניסה נשארים 8 ₪.'],['+ 3x',`במקום x מציבים ${n}. עכשיו חשבו 3 כפול ${n}.`],
      ]},
      {kind:'algebra', note:'לחצו על כל איבר. אילו איברים מכילים x?', terms:[
        [`${n+4}x`,`איבר עם x. המקדם שלו הוא ${n+4}.`],['− 2x','איבר עם x ומקדם שלילי.'],
        ['+ 3x','איבר עם x ומקדם חיובי.'],['+ 5','זה איבר קבוע. הוא נשאר בנפרד.'],
      ]},
      {kind:'algebra', note:'לחצו כדי לראות על איזה איבר חוק הפילוג פועל.', terms:[
        [`${n}(`,`הגורם ${n} כופל את שני האיברים שבתוך הסוגריים.`],['2x','כפלו את המקדם 2 בגורם שמחוץ לסוגריים.'],
        ['+ 3)','גם את 3 כופלים באותו גורם. התוצאה כאן היא קבועה.'],['− 4x','האיבר מחוץ לסוגריים. מפחיתים אותו אחרי פתיחת הסוגריים.'],
      ]},
    ][level];
    if (cat === 'equations') return [
      {kind:'algebra', note:'לחצו בצדדים כדי לחשוב על הצעד הבא.', joiner:'<strong>=</strong>', terms:[
        ['x + 7','איך מבטלים את 7 כדי לבודד את x?'],[`${n+7}`,'בצעו את אותה פעולה גם בצד הזה.'],
      ]},
      {kind:'algebra', note:'איזו פעולה תשמור על השוויון?', joiner:'<strong>=</strong>', terms:[
        ['3(x − 2)','הגורם 3 כופל את כל הסוגריים.'],[`${3*n}`,'חלקו גם את הצד הזה ב-3 לפני שתבודדו את x.'],
      ]},
      {kind:'algebra', note:'כל צד מציג את המחיר של קבוצה אחת.', joiner:'<strong>=</strong>', terms:[
        ['5 + 4x','הקבוצה הראשונה משלמת 5 ₪ ועוד 4 ₪ למשתתף.'],[`${2*n+5} + 2x`,'לקבוצה השנייה דמי כניסה שונים. x הוא אותו מספר משתתפים.'],
      ]},
    ][level];
    if (cat === 'angles') return anglePicture(level, n);
    if (cat === 'coordinates' && level > 0) return coordinatePicture(level === 1 ? [[-n,3]] : [[-n,-2],[5,-2]]);
    if (cat === 'transforms') return [
      coordinatePicture([[n,3]], true),
      diagram('מלבן לפני הזזה', outline('M42 65H194V148H42Z') + dimension(118,166,n+6) + '<path d="M208 106h64m-13-12 13 12-13 12" class="diagram-guide"/>'),
      coordinatePicture([[4,-n]], true),
    ][level];
    if (cat === 'pythagoras') return [
      diagram('שני שבילים ניצבים והשביל האלכסוני', outline('M58 39V164H248Z') + corner(58,164) + dimension(34,107,3*n) + dimension(150,182,4*n) + dimension(167,93,'?')),
      diagram('מלבן עם אלכסון', outline('M48 42H263V166H48Z') + '<path d="M48 166L263 42" class="diagram-guide"/>' + dimension(155,192,5*n) + dimension(178,86,13*n) + dimension(280,107,'?')),
      coordinatePicture([[-n,-n],[5*n,7*n]]),
    ][level];
  }
  if (cat === 'area') {
    if (grade === 'ה') return [
      diagram('מלבן', outline('M65 48H253V153H65Z') + dimension(160,178,n+4) + dimension(44,102,3)),
      diagram('מקבילית עם גובה', outline('M54 158H231L268 54H91Z') + '<path d="M91 54V158" class="diagram-guide"/>' + dimension(111,110,5) + dimension(143,182,n+4)),
      diagram('מלבן עם משולש לגזירה', outline('M48 45H266V164H48Z') + '<path d="M48 164L154 104 266 164Z" class="diagram-cut"/>' + dimension(156,185,n+6) + dimension(286,100,8) + dimension(154,138,4)),
    ][level];
    return [
      diagram('משולש עם גובה לבסיס', outline('M50 162H269L135 45Z') + '<path d="M135 45V162" class="diagram-guide"/>' + dimension(152,108,5) + dimension(162,186,2*n)),
      diagram('טרפז עם שני בסיסים וגובה', outline('M45 161H276L220 56H102Z') + '<path d="M102 56V161" class="diagram-guide"/>' + dimension(157,39,n+2) + dimension(160,185,n+6) + dimension(118,112,4)),
      diagram('מלבן עם פינה חתוכה', outline('M47 45H267V161H101V111H47Z') + '<path d="M47 111V161H101" class="diagram-guide"/>' + dimension(156,26,n+8) + dimension(284,107,7) + dimension(72,102,3)),
    ][level];
  }
  if (cat === 'circle') {
    const line = level === 1 ? 'M64 102H256' : 'M160 102H256';
    return diagram('מעגל עם ' + (level===1?'קוטר':'רדיוס'),
      '<circle data-outline cx="160" cy="102" r="96" class="diagram-outline"/>' +
      `<path d="${line}" class="diagram-guide"/><circle cx="160" cy="102" r="4" fill="#17283c"/>` +
      dimension(level===1?118:210,91,level===1?2*n:n));
  }
  if (cat === 'volume') {
    if (level===2) return diagram('מנסרה משולשת', outline('M55 144V70L152 144Z') +
      '<path d="M55 70L145 35 242 109 152 144M242 109L145 109 55 144M145 35V109" class="diagram-guide"/>' +
      (grade==='ז'?dimension(34,110,5)+dimension(103,163,2*n):dimension(91,126,`${n+6} סמ״ר`)) + dimension(225,143,8));
    const cube = grade==='ו' && level===1;
    return diagram(cube?'קובייה':'תיבה', outline('M56 74H207V163H56Z') +
      '<path d="M56 74L104 34H255L207 74M255 34V123L207 163" class="diagram-guide"/>' +
      dimension(132,186,n) + dimension(37,123,cube?n:5) + dimension(249,153,cube?n:4));
  }
  return null;
}

function diagram(label, body) {
  return {kind:'shape',label,body};
}

function outline(path) {
  return `<path data-outline d="${path}" class="diagram-outline"/>`;
}

function dimension(x, y, label) {
  return `<text x="${x}" y="${y}" class="diagram-label" text-anchor="middle">${label}</text>`;
}

function corner(x,y) {
  return `<path d="M${x} ${y-13}h13v13" class="diagram-guide"/>`;
}

function anglePicture(level,n) {
  if (level===0) {
    const deg = (10*n+20)*Math.PI/180;
    const x=160+80*Math.cos(deg), y=151-80*Math.sin(deg);
    const labelAngle=deg/2, unknownAngle=(Math.PI+deg)/2;
    return diagram('זוויות צמודות על קו ישר',
      outline(`M33 151H287 M160 151L${x} ${y}`) +
      dimension(160+61*Math.cos(labelAngle),151-61*Math.sin(labelAngle),10*n+20+'°') +
      dimension(160+61*Math.cos(unknownAngle),151-61*Math.sin(unknownAngle),'?'));
  }
  if (level===1) return diagram('משולש ישר זווית', outline('M64 40V163H270Z') +
    corner(64,163) + dimension(83,84,5*n+25+'°') + dimension(218,151,'?'));
  return diagram('משולש שווה שוקיים', outline('M52 166H268L160 38Z') +
    dimension(160,76,`x + ${3*n}°`) + dimension(90,156,'x') + dimension(232,156,'x'));
}

function coordinatePicture(points, hasGuide=false) {
  const max = Math.max(5,...points.flat().map(Math.abs));
  const projectX = x => 160 + x/max*120;
  const projectY = y => 103 - y/max*80;
  const markers = points.map(([x,y],i) =>
    `<circle ${i===0?'data-outline':''} class="diagram-point" cx="${projectX(x)}" cy="${projectY(y)}" r="6"/>`+
    dimension(projectX(x)+(x<0?30:-24),projectY(y)-10,`(${x}, ${y})`)).join('');
  const line = points.length===2
    ? `<path class="diagram-guide" d="M${projectX(points[0][0])} ${projectY(points[0][1])}L${projectX(points[1][0])} ${projectY(points[1][1])}"/>` : '';
  const guide = hasGuide ? '<circle cx="160" cy="103" r="4" class="diagram-point"/>' : '';
  return diagram('מערכת צירים עם הנקודות הנתונות', '<path class="plot-axis" d="M32 103H288M160 16V189"/>' +
    dimension(296,108,'x') + dimension(160,14,'y') + line + guide + markers);
}

function mountMinigameVisual(root, question) {
  const prompt = root.querySelector('.minigame-prompt');
  if (!prompt || !question) return;
  const visual = document.createElement('div');
  visual.className = 'question-visual minigame-visual';
  // A span prompt can be inside a flex row with a timer badge.
  const anchor = prompt.tagName === 'SPAN' ? prompt.parentElement : prompt;
  anchor.after(visual);
  mountQuestionVisual(visual, question);
}

function mountCounters(container, first, operation, second) {
  const row = (count, kind) => Array.from({length:count}, () =>
    `<i class="counter ${kind}"></i>`).join('');
  const dots = operation === '+'
    ? row(first,'first') + row(second,'second')
    : row(first,'first');
  container.innerHTML = `<div class="counter-groups" dir="ltr" aria-hidden="true">${dots}</div>
    <output class="visual-feedback">${operation === '+' ? `${first} בקבוצה הכחולה, ${second} בקבוצה הסגולה` : `אפשר לסמן ${second} נקודות כדי לראות מה נשאר.`}</output>`;
  if (operation !== '−') return;
  const counters = [...container.querySelectorAll('.counter')];
  const group = container.querySelector('.counter-groups');
  group.removeAttribute('aria-hidden');
  const output = container.querySelector('output');
  const buttons = counters.map((dot,i) => {
    const button = document.createElement('button');
    button.className = dot.className;
    button.type = 'button';
    button.setAttribute('aria-label', `נקודה ${i+1}`);
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      const selected = button.classList.toggle('is-removed');
      button.setAttribute('aria-pressed', String(selected));
      output.textContent = `סימנתם ${group.querySelectorAll('.is-removed').length} מתוך ${second} נקודות להסרה.`;
    });
    return button;
  });
  group.replaceChildren(...buttons);
}
