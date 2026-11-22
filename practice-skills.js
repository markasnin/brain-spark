const skillText = [
  ['מה נתרגל? בחרו מסלול אחד.','Choose one skill to practice.','Выберите один навык для тренировки.','اختاروا مهارة واحدة للتدرّب عليها.','Choisis une compétence à travailler.','Оберіть одну навичку для тренування.'],
  ['מציאת המספר החסר','Find the missing number','Найди неизвестное число','إيجاد العدد المجهول','Trouver le nombre manquant','Знайди невідоме число'],
  ['מספרים עד','Numbers up to','Числа до','أعداد حتى','Nombres jusqu’à','Числа до'],
  ['תרגול משולב','Mixed practice','Смешанная тренировка','تدريب متنوع','Entraînement varié','Змішана практика'],
  ['התחילו כאן','Start here','Начните здесь','ابدؤوا هنا','Commence ici','Почніть тут'],
  ['גורמים עד','Factors up to','Множители до','عوامل حتى','Facteurs jusqu’à','Множники до'],
  ['חילוק ללא שארית','Exact division','Деление без остатка','قسمة دون باقٍ','Division sans reste','Ділення без остачі'],
  ['מחלק ומנה עד','Divisor and quotient up to','Делитель и частное до','المقسوم عليه وناتج القسمة حتى','Diviseur et quotient jusqu’à','Дільник і частка до'],
  ['חיבור','Addition','Сложение','جمع','Addition','Додавання'],
  ['חיסור','Subtraction','Вычитание','طرح','Soustraction','Віднімання'],
  ['כפל','Multiplication','Умножение','ضرب','Multiplication','Множення'],
  ['חילוק','Division','Деление','قسمة','Division','Ділення'],
  ['עוד מסלולים','More skills','Ещё навыки','مهارات أخرى','Autres compétences','Інші навички'],
  ['ספירת קודקודים','Counting vertices','Подсчёт вершин','عدّ الرؤوس','Compter les sommets','Лічба вершин'],
  ['זוויות ישרות','Right angles','Прямые углы','الزوايا القائمة','Angles droits','Прямі кути'],
  ['ספירת צלעות','Counting sides','Подсчёт сторон','عدّ الأضلاع','Compter les côtés','Лічба сторін'],
  ['היקף','Perimeter','Периметр','المحيط','Périmètre','Периметр'],
  ['שטח','Area','Площадь','المساحة','Aire','Площа'],
  ['הצבה','Substitution','Подстановка','التعويض','Substitution','Підстановка'],
  ['כינוס איברים דומים','Combining like terms','Приведение подобных слагаемых','جمع الحدود المتشابهة','Réduire les termes semblables','Зведення подібних доданків'],
  ['חוק הפילוג','Distributive property','Распределительное свойство','خاصية التوزيع','Distributivité','Розподільна властивість'],
  ['זהויות','Identities','Тождества','المتطابقات','Identités','Тотожності'],
  ['דיאגרמת עמודות','Bar charts','Столбчатые диаграммы','مخططات الأعمدة','Diagrammes en barres','Стовпчасті діаграми'],
  ['דיאגרמת תמונות','Pictograms','Пиктограммы','المخططات المصوّرة','Pictogrammes','Піктограми'],
  ['עמודות כפולות','Double bar charts','Парные столбчатые диаграммы','الأعمدة المزدوجة','Diagrammes à doubles barres','Подвійні стовпчасті діаграми'],
  ['דיאגרמת עיגול','Pie charts','Круговые диаграммы','المخططات الدائرية','Diagrammes circulaires','Кругові діаграми'],
  ['מספר עוקב','The next number','Следующее число','العدد التالي','Le nombre suivant','Наступне число'],
  ['עשרות ויחידות','Tens and ones','Десятки и единицы','العشرات والآحاد','Dizaines et unités','Десятки й одиниці'],
  ['סדרות','Number sequences','Числовые последовательности','متتاليات الأعداد','Suites de nombres','Числові послідовності'],
  ['ספרת המאות','Hundreds digit','Цифра сотен','رقم المئات','Chiffre des centaines','Цифра сотень'],
  ['פירוק המספר','Decomposing numbers','Разложение числа','تحليل العدد','Décomposer un nombre','Розкладання числа'],
  ['רדיוס','Radius','Радиус','نصف القطر','Rayon','Радіус'],
  ['קוטר','Diameter','Диаметр','القطر','Diamètre','Діаметр'],
  ['בחרו סוג תרגיל','Choose a question type','Выберите тип задания','اختاروا نوع التمرين','Choisis un type d’exercice','Оберіть тип завдання'],
];
for (const [he,...other] of skillText) uiTranslations.set(he,other);

const numberLimits = {
  'א':[5,10,20], 'ב':[20,50,100], 'ג':[100,500,1000],
  'ד':[1000,10000,100000], 'ה':[1000,10000,1000000], 'ו':[1000,10000,1000000]
};
const operations=['add','sub','mul','div'];
const operationSigns={add:'+',sub:'−',mul:'×',div:'÷'};
const operationNames={add:'חיבור',sub:'חיסור',mul:'כפל',div:'חילוק'};

function operationLimit(grade,cat,level) {
  if(cat==='add'||cat==='sub') return numberLimits[grade][level];
  return ({'ב':[2,5,10],'ג':[5,10,12],'ד':[10,20,50],'ה':[10,25,100],'ו':[10,25,100]}[grade]||[2,5,10])[level];
}

function operationQuestion(grade,cat,diff,unknown) {
  const level=curriculumDifficulties.indexOf(diff);
  const op=unknown||cat;
  const limit=operationLimit(grade,op,level);
  let a,b,answer;
  if(op==='add'||op==='sub'){
    const whole=rnd(1,limit);
    const part=rnd(0,whole);
    [a,b,answer]=op==='add'?[part,whole-part,whole]:[whole,part,whole-part];
  } else {
    const factor=rnd(1,limit), other=rnd(1,limit);
    [a,b,answer]=op==='mul'?[factor,other,factor*other]:[factor*other,factor,other];
  }
  const symbol=operationSigns[op];
  const hint={type:'text',msg:variantHint[0]};
  if(!unknown) return {type:'num',cat,diff,hint,dir:'ltr',text:`${a} ${symbol} ${b} = ?`,answer,pts:ptsForQ(cat,diff)};
  const hideFirst=rnd(0,1)===0;
  const variable=grade==='ג'||'דהו'.includes(grade)?'x':'□';
  const equation=`${hideFirst?variable:a} ${symbol} ${hideFirst?b:variable} = ${answer}`;
  const labels=variantInstructions.missing.map(label=>`${label}: ⁦${equation}⁩`);
  return {type:'num',cat,diff,hint,text:labels[0],answer:hideFirst?a:b,pts:ptsForQ(cat,diff),
    localized:labels.slice(1,4),extraLocalizations:{fr:labels[4],uk:labels[5]}};
}

function missingOps(grade) {
  return grade==='א'?['add','sub']:operations;
}

function practiceChoices(grade,cat) {
  const choices=[];
  if(operations.includes(cat)){
    curriculumDifficulties.forEach((diff,i)=>{
      const limit=operationLimit(grade,cat,i);
      const label=cat==='mul'?'גורמים עד':cat==='div'?'מחלק ומנה עד':'מספרים עד';
      choices.push({diff,label,limit,make:()=>operationQuestion(grade,cat,diff)});
    });
    // Equal sharing and grouping have their own illustrated word problems.
    if(cat!=='div'||grade!=='ב') return choices;
  }
  if(cat==='unknown'){
    return missingOps(grade).map((op,i)=>{
      const diff=curriculumDifficulties[Math.min(i,2)];
      return {diff,label:operationNames[op],make:()=>operationQuestion(grade,cat,diff,op)};
    });
  }
  if(cat==='shapes' && 'אב'.includes(grade)){
    const prompts=[
      ['כמה קודקודים יש למצולע?','How many vertices does the polygon have?','Сколько вершин у многоугольника?','كم رأسًا للمضلّع؟','Combien de sommets a le polygone ?','Скільки вершин має многокутник?'],
      ['כמה זוויות ישרות יש בצורה?','How many right angles does the shape have?','Сколько прямых углов у фигуры?','كم زاوية قائمة في الشكل؟','Combien d’angles droits a la figure ?','Скільки прямих кутів має фігура?']
    ];
    return ['ספירת צלעות','ספירת קודקודים','זוויות ישרות','תרגול משולב'].map((label,i)=>{
      if(i===3) return {label,diff:'mix'};
      const diff=curriculumDifficulties[i];
      return {label,diff,make:()=>{
        const q=makeQuestionVariant(grade,cat,diff,0);
        if(i===0) return q;
        if(i===2){
          const shape=pick([['M60 48H253V155H60Z',4],['M60 45V160H255Z',1],['M60 158L155 40L248 158Z',0]]);
          q.visual=diagram('מצולע',outline(shape[0]));
          q.answer=shape[1];
        }
        const labels=prompts[i-1];
        return {...q,text:labels[0],localized:labels.slice(1,4),extraLocalizations:{fr:labels[4],uk:labels[5]}};
      }};
    });
  }
  (curriculum[grade]?.[cat]||[]).forEach((_,i)=>{
    const diff=curriculumDifficulties[i];
    const names=cat==='algebra'?['הצבה','כינוס איברים דומים','חוק הפילוג']:
      cat==='place'&&grade==='א'?['מספר עוקב','עשרות ויחידות','סדרות']:
      cat==='place'&&'בג'.includes(grade)?['ספרת המאות','פירוק המספר','סדרות']:[];
    choices.push({diff,label:names[i],make:()=>curriculumQuestion(grade,cat,diff)});
  });
  if(!operations.includes(cat)) (variants[cat]||[]).forEach((_,i)=>{
    if(grade==='א'&&cat==='word'&&i===2) return;
    const diff=curriculumDifficulties[Math.min(i,2)];
    const names={
      shapes:['ספירת צלעות','אב'.includes(grade)?'ספירת צלעות':'היקף','אבג'.includes(grade)?'ספירת צלעות':'שטח'],
      algebra:['הצבה','הצבה','כינוס איברים דומים','חוק הפילוג','חוק הפילוג','זהויות'],
      circle:['קוטר','רדיוס'],
      data:['דיאגרמת עמודות','אבג'.includes(grade)?'דיאגרמת תמונות':'עמודות כפולות','וז'.includes(grade)?'דיאגרמת עיגול':'דיאגרמת תמונות'],
    };
    choices.push({diff,label:names[cat]?.[i],make:()=>makeQuestionVariant(grade,cat,diff,i)});
  });
  choices.push({diff:'mix',label:'תרגול משולב'});
  return choices;
}

function buildPracticeChoices(cat) {
  const grid=document.getElementById('practiceChoices');
  grid.replaceChildren();
  const grade=window.GRADE_CONFIG.gradeId;
  const more=document.createElement('details');
  more.className='choice-more';
  const summary=document.createElement('summary');
  summary.textContent='עוד מסלולים';
  more.append(summary);
  const extra=document.createElement('div');
  extra.className='practice-choices';
  more.append(extra);
  practiceChoices(grade,cat).forEach((choice,i)=>{
    const sample=choice.make?.();
    const button=document.createElement('button');
    button.type='button';
    button.className='practice-choice';
    const title=document.createElement('strong');
    if(choice.label){
      const label=document.createElement('span');
      label.textContent=choice.label;
      title.append(label);
      if(choice.limit) title.append(' '+choice.limit);
    } else title.innerHTML=questionPrompt(sample);
    button.append(title);
    if(sample && choice.label){
      const example=document.createElement('small');
      example.innerHTML=questionPrompt(sample);
      button.append(example);
    }
    if(sample?.visual||sample?.shapeHtml){
      const preview=document.createElement('div');
      preview.className='choice-preview';
      preview.inert=true;
      preview.setAttribute('aria-hidden','true');
      mountQuestionVisual(preview,sample);
      preview.querySelectorAll('button,.visual-controls,.visual-feedback').forEach(el=>el.remove());
      if(preview.textContent.trim()||preview.querySelector('svg'))button.append(preview);
    }
    if(!i){
      const badge=document.createElement('small');
      badge.className='choice-start';
      badge.textContent='התחילו כאן';
      button.prepend(badge);
    }
    button.onclick=()=>startCat(choice.diff,choice.make);
    (i<3?grid:extra).append(button);
  });
  if(extra.childElementCount) grid.append(more);
}
