import {doc, collection, getDoc, setDoc, deleteDoc, writeBatch, onSnapshot, query, where, runTransaction, serverTimestamp} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

const labels = {
 shared:'תנו לילד את הקוד. אחרי שישלח בקשה, אשרו אותה כאן.|Share this code with your child. When they send a request, accept it here.|Передайте код ребёнку. Когда придёт запрос, подтвердите его здесь.|شارك الرمز مع طفلك. عندما يرسل طلبًا، وافق عليه هنا.|Donnez ce code à votre enfant, puis acceptez sa demande ici.|Передайте код дитині. Коли надійде запит, підтвердьте його тут.',
 assigned:'נשלח|Assigned|Назначено|أُرسلت|Envoyé|Призначено',
 review:'צפייה בתשובות|Review answers|Посмотреть ответы|مراجعة الإجابات|Voir les réponses|Переглянути відповіді',
 all:'הכול|All|Все|الكل|Toutes|Усі',
 wrong:'לא נכון|Incorrect|Неверно|غير صحيح|Incorrect|Неправильно',
 submitted:'התשובה שניתנה|Submitted answer|Ответ ребёнка|إجابة الطفل|Réponse donnée|Відповідь дитини',
 expected:'התשובה הנכונה|Correct answer|Правильный ответ|الإجابة الصحيحة|Bonne réponse|Правильна відповідь',
 unavailable:'לא נשמרה|Not recorded|Не сохранён|لم تُحفظ|Non enregistrée|Не збережено',
 noMatches:'אין תשובות להצגה|No matching answers|Таких ответов нет|لا توجد إجابات مطابقة|Aucune réponse correspondante|Немає таких відповідей',
 dashboard:'מסך ההורה|Parent dashboard|Кабинет родителя|لوحة ولي الأمر|Espace parent|Кабінет батьків',
 family:'המשפחה שלי|My family|Моя семья|عائلتي|Ma famille|Моя родина',
 parent:'חשבון הורה|Parent account|Аккаунт родителя|حساب ولي الأمر|Compte parent|Обліковий запис батьків',
 child:'חשבון ילד|Child account|Детский аккаунт|حساب الطفل|Compte enfant|Дитячий обліковий запис',
 code:'הקוד שלך לקישור ילד|Your code to share with your child|Ваш код для ребёнка|رمزك لربط الطفل|Code à partager avec votre enfant|Ваш код для дитини',
 enter:'הקוד שקיבלת מההורה|Code from your parent|Код от родителя|رمز ولي الأمر|Code de ton parent|Код від батьків',
 link:'בקשת קישור|Request a link|Запросить связь|طلب الربط|Demander le lien|Запит на зв’язок',
 accept:'אישור קישור|Accept link|Принять запрос|قبول الربط|Accepter le lien|Прийняти запит',
 remove:'ביטול קישור|Remove link|Удалить связь|إلغاء الربط|Supprimer le lien|Прибрати зв’язок',
 tasks:'משימות מההורים|Parent assignments|Задания от родителей|مهام من ولي الأمر|Devoirs des parents|Завдання від батьків',
 children:'הילדים שלי|My children|Мои дети|أطفالي|Mes enfants|Мої діти',
 build:'משימה חדשה|New assignment|Новое задание|مهمة جديدة|Nouveau devoir|Нове завдання',
 category:'נושא|Topic|Тема|الموضوع|Thème|Тема',
 skill:'סוג תרגיל|Skill|Навык|نوع التمرين|Compétence|Вміння',
 level:'רמת קושי|Difficulty|Сложность|الصعوبة|Difficulté|Складність',
 count:'מספר שאלות|Question count|Число вопросов|عدد الأسئلة|Nombre de questions|Кількість питань',
 add:'הוספת קבוצה|Add questions|Добавить вопросы|أضف أسئلة|Ajouter des questions|Додати запитання',
 send:'שליחת משימה|Assign task|Назначить задание|إرسال المهمة|Envoyer le devoir|Призначити завдання',
 pending:'ממתין לאישור|Waiting for approval|Ожидание подтверждения|بانتظار الموافقة|En attente|Очікує підтвердження',
 answered:'נענו|Answered|Ответов|تمت الإجابة|Réponses|Відповідей',
 correct:'נכון|Correct|Верно|صحيح|Justes|Правильно',
 done:'הושלם|Completed|Завершено|اكتملت|Terminé|Завершено',
 start:'פתיחת משימה|Open assignment|Открыть задание|فتح المهمة|Ouvrir le devoir|Відкрити завдання',
 error:'הפעולה לא נשמרה. בדקו את החיבור וההרשאות ונסו שוב.|Could not save or load. Check your connection and access, then try again.|Не удалось сохранить или загрузить. Проверьте связь и доступ.|تعذّر الحفظ أو التحميل. تحقق من الاتصال والصلاحيات.|Échec du chargement ou de l’enregistrement. Vérifiez la connexion et les droits.|Не вдалося зберегти або завантажити. Перевірте зв’язок і доступ.',
 empty:'אין עדיין משימות|No assignments yet|Заданий пока нет|لا توجد مهام بعد|Aucun devoir pour le moment|Завдань поки немає',
 limit:'בחרו בין 1 ל־100 שאלות במשימה|Choose 1–100 questions per assignment|Выберите 1–100 вопросов|اختر من 1 إلى 100 سؤال|Choisissez entre 1 et 100 questions|Оберіть 1–100 питань',
 submit:'בדיקת תשובה|Check answer|Проверить ответ|تحقق من الإجابة|Vérifier la réponse|Перевірити відповідь',
 number:'כתבו תשובה במספרים|Enter a number|Введите число|أدخل عددًا|Écris un nombre|Введи число',
 wrongGrade:'המשימה נכתבה לכיתה אחרת|This assignment is for a different grade|Задание для другого класса|هذه المهمة لصف آخر|Devoir pour une autre classe|Завдання для іншого класу'
};
for(const row of Object.values(labels)){const [he,...others]=row.split('|');uiTranslations.set(he,others);}
const label=key=>labels[key].split('|')[0];
const translated=key=>interfaceText(label(key));
const root=document.getElementById('familyBody');
const banner=document.getElementById('familyBanner');
let adminPractice=false;
let uid,role,links=[],tasks=[],selected=null,active=null,subscriptions=[];
const db=()=>window._fb.db;
const profile=id=>doc(db(),'familyProfiles',id);
const pair=(parent,child)=>parent+'_'+child;
const linkRef=id=>doc(db(),'familyLinks',id);
const familyTasks=(parent,child)=>collection(linkRef(pair(parent,child)),'tasks');
const taskRef=t=>doc(familyTasks(t.parent,t.child),t.id);
const taskListeners=new Map();
function element(tag,text){const node=document.createElement(tag);if(text!==undefined)node.textContent=text;return node;}
function action(text,fn){
 const btn=element('button',text);btn.type='button';btn.className='practice-choice family-button';
 btn.onclick=async()=>{btn.disabled=true;try{await fn();}catch(e){console.warn('Family action',e.code);showToast(label('error'));}finally{btn.disabled=false;}};
 return btn;
}
function reset(){
 adminPractice=false;
 for(const stop of taskListeners.values())stop();taskListeners.clear();
 subscriptions.forEach(stop=>stop());subscriptions=[];uid=null;role=null;links=[];tasks=[];selected=null;active=null;
 root.replaceChildren();banner.replaceChildren();
}
function listen(path,field,receive){
 const session=uid;
 subscriptions.push(onSnapshot(query(collection(db(),path),where(field,'==',uid)),snap=>{
   if(session!==uid)return;
   receive(snap.docs.map(d=>({...d.data(),id:d.id})));refresh();
 },()=>{if(session===uid)showToast(label('error'));}));
}
async function init(user){
 reset();if(!user)return;
 uid=user.uid;
 const snap=await getDoc(profile(uid));
 if(uid!==user.uid)return;
 role=snap.data()?.role;
 adminPractice=role==='parent' && snap.data()?.adminPractice===true;
 if(role==='child' && GRADE_FILES[window._grade] && snap.data().grade!==window._grade)await window._fb.updateDoc(profile(uid),{grade:window._grade});
 if(role){
   const field=role==='parent'?'parent':'child';
   listen('familyLinks',field,rows=>{
     links=rows;
     const accepted=new Set(rows.filter(l=>l.accepted).map(l=>l.id));
     for(const [id,stop] of taskListeners)if(!accepted.has(id)){
       stop();taskListeners.delete(id);
       if(tasks.some(t=>t.id===active && pair(t.parent,t.child)===id)){active=null;render();}
       tasks=tasks.filter(t=>pair(t.parent,t.child)!==id);
     }
     for(const l of rows.filter(l=>l.accepted && !taskListeners.has(l.id))){
       taskListeners.set(l.id,onSnapshot(familyTasks(l.parent,l.child),snap=>{
         if(uid!==user.uid||!taskListeners.has(l.id))return;
         tasks=tasks.filter(t=>pair(t.parent,t.child)!==l.id)
           .concat(snap.docs.map(d=>({...d.data(),id:d.id})))
           .sort((a,b)=>(b.created?.seconds||0)-(a.created?.seconds||0));refresh();
       },()=>{if(uid===user.uid && taskListeners.has(l.id))showToast(label('error'));}));
     }
   });
 }
 refresh();if(parentHomeOnly())open();
}
// Only a privileged Firebase writer can add adminPractice to a family profile.
function parentHomeOnly(){return role==='parent' && !adminPractice;}
function open(){active=null;selected=null;show('familyScreen');render();}
function refresh(){
 banner.replaceChildren(action(label(adminPractice?'dashboard':'family'),open));
 const pending=tasks.filter(t=>!t.completed);
 if(role==='child'&&pending.length)banner.prepend(action(translated('tasks')+' · '+pending.length,()=>{open();}));
 if(document.getElementById('familyScreen').classList.contains('on')&&!active&&!selected)render();
 if(selected&&!links.some(l=>l.child===selected&&l.accepted)){selected=null;render();}
 if(selected)renderReports(document.getElementById('familyReports'),selected);
}
async function choose(value){
 await setDoc(profile(uid),value==='child' && GRADE_FILES[window._grade]?{role:value,grade:window._grade}:{role:value});await init(window._fbUser);open();
}
function render(){
 root.replaceChildren();root.append(element('h1',label('family')));
 if(!role){root.append(action(label('parent'),()=>choose('parent')),action(label('child'),()=>choose('child')));return;}
 if(role==='parent'){
   root.append(element('label',label('code')));const code=element('input');code.readOnly=true;code.value=uid;code.onclick=()=>code.select();code.dir='ltr';code.setAttribute('aria-label',label('code'));root.append(code,element('p',label('shared')),element('h2',label('children')));
 }else{
   const list=element('section');root.append(list);renderReports(list,uid);
   const input=element('input');input.setAttribute('aria-label',label('enter'));input.placeholder=label('enter');input.dir='ltr';
   root.append(element('label',label('enter')),input,action(label('link'),async()=>{
     const parent=input.value.trim();if(!/^[\w-]{10,128}$/.test(parent)||parent===uid)throw Error();
     await setDoc(linkRef(pair(parent,uid)),{parent,child:uid,name:window._displayName||window._username,accepted:false});
   }));
 }
 for(const l of links){
   const card=element('section');card.className='family-row';
   if(role==='parent'){
     if(l.accepted)card.append(action(l.name,()=>editor(l)));
     else card.append(element('strong',l.name),action(label('accept'),()=>window._fb.updateDoc(linkRef(l.id),{accepted:true})));
   }else card.append(element('strong',l.accepted?label('parent'):label('pending')),element('small',l.parent));
   card.append(action(label('remove'),async()=>{if(confirm(interfaceText(label('remove'))+'?'))await deleteDoc(linkRef(l.id));}));root.append(card);
 }

}
function renderReports(host,child){
 if(!host)return;
 const previous=new Map([...host.querySelectorAll('details[data-task]')].map(d=>[d.dataset.task,{open:d.open,filter:d.querySelector('select').value}]));
 host.replaceChildren(element('h2',label('tasks')));
 const rows=tasks.filter(t=>t.child===child&&links.some(l=>l.accepted&&l.parent===t.parent&&l.child===child));
 if(!rows.length)host.append(element('p',label('empty')));
 for(const t of rows){
   const card=element('section');card.className='family-row';
   if(t.created)card.append(element('time',translated('assigned')+' · '+t.created.toDate().toLocaleString(document.documentElement.lang)));
   const progress=element('progress');progress.max=t.total;progress.value=t.index;progress.setAttribute('aria-label',label('answered'));card.append(progress);
   let offset=0;
   for(const part of t.parts){const attempts=t.answers.slice(offset,offset+part.count);offset+=part.count;card.append(element('span',interfaceText(CAT_NAMES[part.cat]||part.cat)+' × '+part.count+(attempts.length?' · '+translated('correct')+' '+attempts.filter(Boolean).length+'/'+attempts.length:'')));}
   card.append(element('strong',translated('answered')+' '+t.index+'/'+t.total+' · '+translated('correct')+' '+t.correct));
   if(t.completed)card.append(element('time',translated('done')+' · '+t.completed.toDate().toLocaleString(document.documentElement.lang)));
   else if(role==='child')card.append(action(label('start'),()=>play(t)));
   if(role==='parent' && t.answers.length)card.append(reviewAnswers(t,previous.get(t.id)));
   host.append(card);
 }
}
function exampleText(choice){
 const q=choice.make();
 const template=document.createElement('template');
 template.innerHTML=questionPrompt(q);
 return template.content.querySelector('[data-language="'+activeLanguage+'"]').textContent;
}
function field(host,title,control){const l=element('label');l.append(element('span',label(title)),control);host.append(l);return control;}
function options(select,items){select.replaceChildren(...items.map(([v,text])=>new Option(text,v)));}
async function editor(link){
 const session=uid;
 selected=link.child;
 const snap=await getDoc(profile(link.child));
 if(uid!==session||selected!==link.child||!links.some(l=>l.id===link.id&&l.accepted))return;
 const grade=snap.data()?.grade;
 if(!GRADE_FILES[grade])throw Error();
 selected=link.child;
 const catalog=Object.keys(worksheetGrades[grade]||curriculum[grade]);
 root.replaceChildren(element('h1',link.name+' · '+interfaceText('כיתה '+grade)),element('h2',label('build')));
 const cat=field(root,'category',element('select')),difficulty=field(root,'level',element('select')),skill=field(root,'skill',element('select'));
 const count=field(root,'count',element('input'));count.type='number';count.min=1;count.max=100;count.value=5;
 const draft=element('section'),parts=[];
 options(cat,catalog.map(id=>[id,CAT_NAMES[id]]));
 const levels=[['easy','קל'],['medium','בינוני'],['hard','קשה']];
 function selectLevels(){const choices=practiceChoices(grade,cat.value);options(difficulty,levels.filter(([d])=>choices.some(c=>c.diff===d&&c.make)));selectSkills();}
 function selectSkills(){
   const choices=practiceChoices(grade,cat.value);
   const entries=choices.flatMap((c,i)=>c.make&&c.diff===difficulty.value?[[String(i),(c.label||exampleText(c))+(c.limit?' '+c.limit:'')]]:[]);
   options(skill,[['mixed','תרגול משולב'],...entries]);
 }
 cat.onchange=selectLevels;difficulty.onchange=selectSkills;selectLevels();
 function draw(){draft.replaceChildren();parts.forEach((p,i)=>{const item=element('div');item.className='family-row';item.append(element('span',p.caption+' × '+p.count),action('×',()=>{parts.splice(i,1);draw();}));draft.append(item);});}
 const id=doc(familyTasks(uid,link.child)).id;
 root.append(action(label('add'),()=>{
   const n=Number(count.value);
   if(!Number.isInteger(n)||n<1||parts.reduce((sum,p)=>sum+p.count,n)>100){showToast(label('limit'));return;}
   parts.push({cat:cat.value,diff:difficulty.value,skill:skill.value,count:n,caption:[cat,difficulty,skill].map(s=>s.selectedOptions[0].text).join(' · ')});draw();
 }),draft,action(label('send'),async()=>{
   if(!parts.length){showToast(label('limit'));return;}
   const total=parts.reduce((sum,p)=>sum+p.count,0);
   await setDoc(taskRef({id,parent:uid,child:link.child}),{parent:uid,child:link.child,grade,parts:parts.map(({caption,...p})=>p),total,index:0,correct:0,answers:[],created:serverTimestamp(),completed:null});
   await editor(link);
 }));
 const reports=element('section');reports.id='familyReports';root.append(reports);renderReports(reports,selected);
}
// Keep the original task seed so existing assignments can also be reviewed.
function assignmentQuestion(task,index){
 let offset=index;
 const part=task.parts.find(part=>{if(offset<part.count)return true;offset-=part.count;return false;});
 return seededPractice(task.id+'-'+index,()=>{
   const choices=practiceChoices(task.grade,part.cat);
   const choice=part.skill==='mixed'?pick(choices.filter(c=>c.make&&c.diff===part.diff)):choices[Number(part.skill)];
   return {...choice.make(),cat:part.cat,grade:task.grade};
 });
}
function snapshotQuestion(q){
 const prompt=document.createElement('template');
 prompt.innerHTML=questionPrompt(q);
 for(const frac of prompt.content.querySelectorAll('.math-fraction')){if(frac.children.length===2)frac.replaceWith([...frac.children].map(n=>n.textContent).join('/'));}
 for(const br of prompt.content.querySelectorAll('br'))br.replaceWith(' ');
 return Object.fromEntries([...prompt.content.children].map(node=>[node.dataset.language,node.textContent]));
}
function reviewAnswers(task,previous){
 const details=element('details');details.dataset.task=task.id;details.className='answer-review';
 details.append(element('summary',label('review')));
 const filter=element('select');filter.setAttribute('aria-label',label('review'));
 options(filter,['all','correct','wrong'].map(key=>[key,label(key)]));filter.value=previous?.filter||'all';
 const list=element('ol');details.append(filter,list);
 function draw(){
   list.replaceChildren();
   for(const [index,correct] of task.answers.entries()){
     if(filter.value!=='all' && correct!==(filter.value==='correct'))continue;
     const saved=task.responses?.find(entry=>entry.index===index);
     const item=element('li');item.value=index+1;
     const status=element('strong',label(correct?'correct':'wrong'));status.className=correct?'answer-right':'answer-wrong';item.append(status);
     const q=assignmentQuestion(task,index),prompt=element('div');prompt.innerHTML=questionPrompt(q);
     const matches=!saved||saved.prompts.he===snapshotQuestion(q).he;
     if(!matches){
       prompt.replaceChildren();
       for(const [language,source] of Object.entries(saved.prompts)){
         const text=element('span',source);text.className='question-language';text.dataset.language=language;text.hidden=language!==activeLanguage;text.dir='auto';prompt.append(text);
       }
     }
     item.append(prompt);
     if(matches && (q.visual||q.shapeHtml)){const visual=element('div');visual.className='choice-preview';visual.inert=true;item.append(visual);list.append(item);mountQuestionVisual(visual,q);visual.querySelectorAll('.visual-controls,button').forEach(n=>n.remove());}
     const expected=saved?.expected??(q.fraction?q.fraction.join('/'):String(q.answer));
     for(const [title,value] of [['submitted',saved?.value??(correct?expected:label('unavailable'))],['expected',expected]]){
       const row=element('div');row.append(element('span',label(title)),document.createTextNode(' · '),element('bdi',value));item.append(row);
     }
     list.append(item);
   }
   if(!list.children.length)list.append(element('li',label('noMatches')));
 }
 details.ontoggle=()=>{if(details.open)draw();};filter.onchange=draw;details.open=!!previous?.open;
 return details;
}
function play(t){
 if(window.GRADE_CONFIG?.gradeId!==t.grade){showToast(label('wrongGrade'));return;}
 active=t.id;root.replaceChildren();
 const q=assignmentQuestion(t,t.index);
 root.append(element('h2',CAT_NAMES[q.cat]),element('small',(t.index+1)+' / '+t.total));
 const prompt=element('div');prompt.className='study-question';prompt.innerHTML=questionPrompt(q);
 const visual=element('div');visual.className='question-visual';visual.id='familyVisual';
 const input=element('input');input.id='familyAnswer';input.type=q.fraction?'text':'number';input.step='any';input.placeholder='?';input.setAttribute('aria-label',interfaceText('תשובה'));
 const answerLabel=element('label',usesTriangle(q)?'▲ =':interfaceText('תשובה'));answerLabel.htmlFor=input.id;root.append(prompt,visual,answerLabel,input);mountQuestionVisual(visual,q);
 const submit=action(label('submit'),async()=>{
   const answer=numericAnswer(input.value,q.fraction);if(!Number.isFinite(answer)){showToast(label('number'));return;}
   const correct=Math.abs(answer-q.answer)<1e-8;
   const submission={index:t.index,value:input.value.trim(),expected:q.fraction?q.fraction.join('/'):String(q.answer),prompts:snapshotQuestion(q)};
   const save=withDetails=>runTransaction(db(),async tx=>{
     const ref=taskRef(t),current=(await tx.get(ref)).data();
     if(current.index!==t.index)return false;
     tx.update(ref,{...(withDetails?{responses:[...(current.responses||[]),submission]}:{}),index:t.index+1,correct:current.correct+Number(correct),answers:[...current.answers,correct],completed:t.index+1===t.total?serverTimestamp():null});return true;
   });
   let applied;
   try{applied=await save(true);}catch(error){
     if(error.code!=='permission-denied')throw error;
     // Projects running the previous rules still accept the original progress update.
     applied=await save(false);
   }
   if(active!==t.id)return;
   const next=(await getDoc(taskRef(t))).data();if(active!==t.id)return;
   if(applied)showToast(correct?'✅ '+interfaceText('נכון!'):'✏️ '+interfaceText('תשובה')+' '+(q.fraction?q.fraction.join('/'):q.answer));
   if(next.completed)open();else play({...next,id:t.id});
 });
 root.append(submit);input.onkeydown=e=>{if(e.key==='Enter')submit.click();};input.focus();
}
window.familyAccounts={init,open,reset,isParent:()=>role==='parent',parentHomeOnly,syncGrade:async grade=>{
 if(role!=='child')return;
 const batch=writeBatch(db());
 batch.update(profile(uid),{grade});batch.set(doc(db(),'users',uid),{grade},{merge:true});
 await batch.commit();
}};

