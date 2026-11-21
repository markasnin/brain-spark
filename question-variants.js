/* Original short-form exercises. The instructions use the same terminology across topics. */
const variantInstructions = {
  missing:['השלימו את המספר החסר','Find the missing number','Найди пропущенное число','أوجد العدد الناقص','Trouve le nombre manquant','Знайди пропущене число'],
  calculate:['חשבו','Calculate','Вычисли','احسب','Calcule','Обчисли'],
  tens:['מהי ספרת העשרות?','What is the tens digit?','Какова цифра десятков?','ما رقم العشرات؟','Quel est le chiffre des dizaines ?','Яка цифра десятків?'],
  round:['עגלו לכפולה הקרובה ביותר של המספר המצוין','Round to the nearest multiple of the given number','Округли до ближайшего кратного указанного числа','قرّب إلى أقرب مضاعف للعدد المحدد','Arrondis au multiple le plus proche du nombre indiqué','Округли до найближчого кратного вказаного числа'],
  numerator:['כתבו את המונה החסר','Write the missing numerator','Запиши пропущенный числитель','اكتب البسط الناقص','Écris le numérateur manquant','Запиши пропущений чисельник'],
  denominator:['כתבו את המכנה החסר','Write the missing denominator','Запиши пропущенный знаменатель','اكتب المقام الناقص','Écris le dénominateur manquant','Запиши пропущений знаменник'],
  remainder:['כתבו את השארית בתרגיל החילוק','Write the remainder','Запиши остаток от деления','اكتب باقي القسمة','Écris le reste de la division','Запиши остачу від ділення'],
  minimum:['כתבו את המספר הקטן ביותר','Write the smallest number','Запиши наименьшее число','اكتب العدد الأصغر','Écris le plus petit nombre','Запиши найменше число'],
  maximum:['כתבו את המספר הגדול ביותר','Write the largest number','Запиши наибольшее число','اكتب العدد الأكبر','Écris le plus grand nombre','Запиши найбільше число'],
  mean:['חשבו את הממוצע','Find the mean','Найди среднее арифметическое','احسب المتوسط الحسابي','Calcule la moyenne','Знайди середнє арифметичне'],
  range:['חשבו את ההפרש בין הערך הגדול לקטן','Find the difference between the largest and smallest values','Найди разность наибольшего и наименьшего значений','احسب الفرق بين أكبر وأصغر قيمة','Calcule la différence entre la plus grande et la plus petite valeur','Знайди різницю між найбільшим і найменшим значеннями'],
  equivalent:['השלימו את המספר החסר כך ששני היחסים יהיו שווים','Complete the equivalent ratio','Дополни равное отношение','أكمل النسبة المكافئة','Complète le rapport équivalent','Доповни рівне відношення'],
  percent:['כתבו כאחוז. הזינו מספר בלבד','Convert to percent. Enter the number only','Вырази в процентах. Введи только число','حوّل إلى نسبة مئوية. أدخل العدد فقط','Convertis en pourcentage. Saisis seulement le nombre','Вирази у відсотках. Введи лише число'],
  solve:['פתרו את המשוואה. הזינו את ערכו של x','Solve the equation. Enter the value of x','Реши уравнение. Введи значение x','حلّ المعادلة. أدخل قيمة x','Résous l’équation. Saisis la valeur de x','Розв’яжи рівняння. Введи значення x'],
  identity:['השלימו מספר כך שהשוויון יתקיים לכל ערך של x','Fill in the number that makes the equality true for every value of x','Впишите число, при котором равенство верно для любого x','أكملوا العدد بحيث تتحقق المساواة لكل قيمة لـ x','Complète pour que l’égalité soit vraie pour toute valeur de x','Впишіть число, щоб рівність виконувалася для кожного значення x'],
  substitute:['הציבו בביטוי את הערך הנתון של x וחשבו את ערך הביטוי','Evaluate the expression at the given value of x','Вычисли значение выражения при заданном x','احسب قيمة التعبير عند قيمة x المعطاة','Calcule la valeur de l’expression pour la valeur donnée de x','Обчисли значення виразу за вказаного значення x'],
  coefficient:['כנסו איברים דומים וכתבו את המקדם של x','Combine like terms and write the coefficient of x','Приведи подобные слагаемые и запиши коэффициент при x','اجمع الحدود المتشابهة واكتب معامل x','Réduis l’expression et écris le coefficient de x','Зведи подібні доданки й запиши коефіцієнт при x'],
  sides:['כמה צלעות יש למצולע?','How many sides does the polygon have?','Сколько сторон у многоугольника?','كم ضلعًا للمضلع؟','Combien de côtés a le polygone ?','Скільки сторін має многокутник?'],
  angle:['חשבו את גודל הזווית המסומנת במעלות','Find the marked angle in degrees','Найди отмеченный угол в градусах','احسب قياس الزاوية المحددة بالدرجات','Calcule l’angle indiqué en degrés','Знайди величину позначеного кута в градусах'],
  area:['חשבו את השטח ביחידות ריבועיות','Find the area in square units','Найди площадь в квадратных единицах','احسب المساحة بوحدات مربعة','Calcule l’aire en unités carrées','Знайди площу в квадратних одиницях'],
  perimeter:['חשבו את ההיקף ביחידות אורך','Find the perimeter in length units','Найди периметр в единицах длины','احسب المحيط بوحدات الطول','Calcule le périmètre en unités de longueur','Знайди периметр в одиницях довжини'],
  volume:['חשבו את הנפח ביחידות מעוקבות','Find the volume in cubic units','Найди объём в кубических единицах','احسب الحجم بوحدات مكعبة','Calcule le volume en unités cubes','Знайди об’єм у кубічних одиницях'],
  diameter:['חשבו את הקוטר לפי הרדיוס המסומן','Use the marked radius to find the diameter','Найди диаметр по отмеченному радиусу','احسب القطر من نصف القطر المحدد','Calcule le diamètre à partir du rayon indiqué','Знайди діаметр за позначеним радіусом'],
  radius:['חשבו את הרדיוס לפי הקוטר המסומן','Use the marked diameter to find the radius','Найди радиус по отмеченному диаметру','احسب نصف القطر من القطر المحدد','Calcule le rayon à partir du diamètre indiqué','Знайди радіус за позначеним діаметром'],
  xcoord:['כתבו את שיעור ה-x של הנקודה','Write the x-coordinate of the point','Запиши координату x точки','اكتب الإحداثي x للنقطة','Écris l’abscisse du point','Запиши координату x точки'],
  ycoord:['כתבו את שיעור ה-y של הנקודה','Write the y-coordinate of the point','Запиши координату y точки','اكتب الإحداثي y للنقطة','Écris l’ordonnée du point','Запиши координату y точки'],
  hypotenuse:['חשבו את אורך היתר','Find the length of the hypotenuse','Найди длину гипотенузы','احسب طول الوتر','Calcule la longueur de l’hypoténuse','Знайди довжину гіпотенузи'],
  leg:['חשבו את אורך הניצב החסר','Find the missing leg length','Найди длину неизвестного катета','احسب طول الضلع القائم الناقص','Calcule la longueur du côté perpendiculaire manquant','Знайди довжину невідомого катета'],
  graphChange:['בכמה השתנה הערך בין שעה 1 לשעה 3? כתבו את גודל השינוי','By how much did the value change from hour 1 to hour 3? Give the size of the change','На сколько изменилось значение с 1-го до 3-го часа? Укажи величину изменения','كم تغيّرت القيمة بين الساعة 1 والساعة 3؟ اكتب مقدار التغير','De combien la valeur a-t-elle changé entre la 1re et la 3e heure ? Donne l’amplitude du changement','На скільки змінилося значення з 1-ї до 3-ї години? Укажи величину зміни'],
  graphMax:['באיזו שעה נמדד הערך הגבוה ביותר?','At what hour was the highest value measured?','В какой час было измерено наибольшее значение?','في أي ساعة سُجّلت أعلى قيمة؟','À quelle heure la valeur mesurée était-elle la plus élevée ?','О котрій годині виміряли найбільше значення?'],
  reflect:['שקפו את הנקודה ביחס לציר y. כתבו את שיעור ה-x החדש','Reflect the point across the y-axis. Write the new x-coordinate','Отрази точку относительно оси y. Запиши новую координату x','اعكس النقطة حول المحور y. اكتب الإحداثي x الجديد','Effectue la symétrie par rapport à l’axe y. Écris la nouvelle abscisse','Відобрази точку відносно осі y. Запиши нову координату x'],
  turn:['סובבו את הנקודה ב-180° סביב הראשית. כתבו את שיעור ה-y החדש','Rotate the point 180° about the origin. Write the new y-coordinate','Поверни точку на 180° вокруг начала координат. Запиши новую координату y','دوّر النقطة 180° حول نقطة الأصل. اكتب الإحداثي y الجديد','Tourne le point de 180° autour de l’origine. Écris la nouvelle ordonnée','Поверни точку на 180° навколо початку координат. Запиши нову координату y'],
};
const variantHint = ['היעזרו בנתוני השאלה ובדקו את התוצאה','Use the given information and check your result','Используй данные и проверь результат','استخدم المعطيات وتحقق من النتيجة','Utilise les données et vérifie ton résultat','Скористайся даними й перевір результат'];
uiTranslations.set(variantHint[0],variantHint.slice(1));

const variants = {
  add: [
    (a,b)=>['missing',`□ + ${b} = ${a+b}`,a],
    (a,b)=>['missing',`${a} + □ = ${a+b}`,b],
    (a,b)=>['calculate',`${a+b} = ${a} + ${b};  (${a} + 1) + ${b} = □`,a+b+1],
  ],
  sub: [
    (a,b)=>['missing',`□ − ${b} = ${a}`,a+b],
    (a,b)=>['missing',`${a+b} − □ = ${a}`,b],
    (a,b)=>['calculate',`${a+b+1} − (${b} + 1) = □`,a],
  ],
  mul: [
    (a,b)=>['missing',`□ × ${b} = ${a*b}`,a],
    (a,b)=>['missing',`${a} × □ = ${a*b}`,b],
    (a,b)=>['calculate',`${a} × ${b} + ${a} = □`,a*(b+1)],
  ],
  div: [
    (a,b)=>['missing',`□ ÷ ${b} = ${a}`,a*b],
    (a,b)=>['missing',`${a*b} ÷ □ = ${a}`,b],
    (a,b)=>['missing',`${a*b} ÷ ${b} = □`,a],
  ],
  place: [
    (a,b,g)=>['tens',`${({'א':0,'ב':100,'ג':1000,'ד':10000}[g]||0)*b+10*a+b%10}`,a],
    (a,b)=>['missing',`${a*10+b%10} = □ + ${b%10}`,a*10],
    (a,b)=>['missing',`${a}, ${a+b}, □, ${a+3*b}`,a+2*b],
  ],
  rounding: [
    (a,b)=>['round',`${10*a+4} → 10`,10*a],
    (a,b)=>['round',`${10*a+7} → 10`,10*(a+1)],
    (a,b)=>['round',`${100*a+65} → 100`,100*(a+1)],
  ],
  fractions_half: [
    (a,b)=>[['חילקו '+2*a+' תפוחים לשתי קבוצות שוות. כמה תפוחים יש בחצי מהכמות?','There are '+2*a+' apples in two equal groups. How many apples are in half the total?',''+2*a+' яблок разделили на две равные группы. Сколько яблок в половине?','وُزّعت '+2*a+' تفاحة على مجموعتين متساويتين. كم تفاحة في نصف الكمية؟','On répartit '+2*a+' pommes en deux groupes égaux. Combien y en a-t-il dans la moitié ?',2*a+' яблук поділили на дві рівні групи. Скільки яблук у половині?'],'',a],
    (a,b)=>[['יש '+4*a+' מדבקות. כמה מדבקות יש ברבע מהכמות?','There are '+4*a+' stickers. How many are in a quarter of the total?','Есть '+4*a+' наклеек. Сколько наклеек в четверти от общего числа?','هناك '+4*a+' ملصقًا. كم ملصقًا في ربع الكمية؟','Il y a '+4*a+' autocollants. Combien y en a-t-il dans un quart du total ?', 'Є '+4*a+' наліпок. Скільки наліпок у чверті від їхньої кількості?'],'',a],
  ],
  fractions_unit: [
    (a,b)=>unitFractionVariant(a,5),
    (a,b)=>unitFractionVariant(b,6),
    (a,b)=>unitFractionVariant(a,3),
  ],
  fractions: [
    (a,b)=>['numerator',`${a}/10 = __/20`,2*a],
    (a,b)=>['denominator',`1/${b} = 2/□`,2*b],
    (a,b,g)=>g==='ד'?['numerator',`1/8 + ${a%6+1}/8 = __/8`,a%6+2]:['numerator',`1/4 + ${a%3+1}/8 = __/8`,a%3+3],
    (a,b,g)=>g==='ו'?['calculate',`${a}/4 ÷ 1/4`,a]:['numerator',`7/10 − ${b%5+1}/10 = __/10`,6-b%5],
    (a,b,g)=>g==='ו'?['calculate',`1/2 × ${2*a}/5 × 5`,a]:['numerator',`3/4 − ${b%3+1}/8 = __/8`,5-b%3],
  ],
  order: [
    (a,b)=>['calculate',`${a} + ${b} × 2`,a+2*b],
    (a,b)=>['calculate',`(${a} + ${b}) × 2`,2*(a+b)],
    (a,b)=>['calculate',`${a*b} ÷ ${b} + 3 × 2`,a+6],
  ],
  decimals: [
    (a,b)=>['calculate',`${a}.25 + ${b}.5`,a+b+.75],
    (a,b)=>['missing',`${a}.75 − □ = ${a}.25`,.5],
    (a,b,g)=>g==='ו'?['calculate',`${a}.5 × 4`,4*a+2]:['minimum',`${a}.04, ${a}.4, ${a}.14`,a+.04],
    (a,b,g)=>g==='ו'?['calculate',`${10*a+5}.5 ÷ 10`,(100*a+55)/100]:['maximum',`${a}.25, ${a}.5, ${a}.05`,a+.5],
  ],
  percent: [
    (a,b)=>['percent',`${a%9+1}/10`,10*(a%9+1)],
    (a,b)=>['calculate',`25% × ${4*a}`,a],
    (a,b)=>['calculate',`75% × ${4*a}`,3*a],
    (a,b,g)=>g==='ו'?['missing',`80% × □ = ${8*a}`,10*a]:['calculate',`10% × ${10*a}`,a],
  ],
  ratio:[
    (a,b)=>['equivalent',`1:${a} = 3:□`,3*a],
    (a,b)=>['equivalent',`2:${b} = □:${4*b}`,8],
    (a,b)=>['equivalent',`${2*a}:${2*b} = ${a}:□`,b],
  ],
  negatives:[
    (a,b)=>['calculate',`−${a} + ${b}`,b-a],
    (a,b)=>['calculate',`${a} − (−${b})`,a+b],
    (a,b)=>['minimum',`−${a}, 0, ${b}`,-a],
    (a,b,g)=>g==='ז'?['calculate',`(−${a}) × (−${b})`,a*b]:['maximum',`−${a+b}, −${a}, −${a+1}`,-a],
    (a,b,g)=>g==='ז'?['calculate',`(−${a*b}) ÷ ${b}`,-a]:['missing',`−${a+b} + □ = −${a}`,b],
  ],
  powers:[
    (a,b)=>['calculate',`√${a*a}`,a],
    (a,b)=>['calculate',`${a}² − ${b}`,a*a-b],
    (a,b)=>['calculate',`(−${a})² + √${b*b}`,a*a+b],
  ],
  algebra:[
    (a,b)=>substitutionVariant(a,`2x + ${b}`,2*a+b),
    (a,b)=>substitutionVariant(-a,`3x − ${b}`,-3*a-b),
    (a,b)=>['coefficient',`${a}x + ${b}x − x + 7`,a+b-1],
    (a,b)=>['coefficient',`${a}(2x + 1) − ${b}x`,2*a-b],
    (a,b)=>['coefficient',`4(x − ${a}) + ${b}(x + 1)`,4+b],
    (a,b)=>['identity',`${a}(x + ${b}) = ${a}x + □`,a*b],
  ],
  equations:[
    (a,b)=>['solve',`x − ${b} = ${a}`,a+b],
    (a,b)=>['solve',`${b}x = ${a*b}`,a],
    (a,b)=>['solve',`3x + ${b} = ${3*a+b}`,a],
    (a,b)=>['solve',`2(x + ${b}) = ${2*(a+b)}`,a],
    (a,b)=>['solve',`5x − ${a} = 3x + ${a}`,a],
  ],
  data:[
    (a,b)=>surveyChart('bars',a,b),
    (a,b,g)=>surveyChart('אבג'.includes(g)?'pictures':'paired',a,b),
    (a,b,g)=>surveyChart('וז'.includes(g)?'pie':'pictures',a,b),
    (a,b,g)=>'אבגד'.includes(g)?['maximum',`${a}, ${a+b}, ${b}`,a+b]:['mean',`${a}, ${a+b}, ${a+2*b}`,a+b],
    (a,b,g)=>'אבגד'.includes(g)?['minimum',`${a+1}, ${a}, ${a+b}`,a]:['range',`${a+b}, ${a}, ${a+2*b}`,2*b],
  ],
  probability:[
    (a,b)=>marbleProbability(a,4*a),
    (a,b)=>marbleProbability(3*a,a),
    (a,b)=>marbleProbability(3*a,2*a),
  ],
  measurement:[
    (a,b)=>['missing',`${a} cm + □ cm = ${a+b} cm`,b],
    (a,b,g)=>'אב'.includes(g)?['missing',`${a+b} cm − ${b} cm = □ cm`,a]:['missing',`${a} m = □ cm`,100*a],
    (a,b,g)=>'אב'.includes(g)?['missing',`${a} cm + ${b} cm = □ cm`,a+b]:['missing',`${100*a+10*b} cm = ${a} m + □ cm`,10*b],
  ],
  word:[
    (a,b)=>[['בסל היו '+(a+b)+' תפוחים. לקחו '+b+'. כמה נותרו?','There were '+(a+b)+' apples. '+b+' were taken. How many remain?','Было '+(a+b)+' яблок. Взяли '+b+'. Сколько осталось?','كان هناك '+(a+b)+' تفاحة. أُخذت '+b+'. كم بقي؟','Il y avait '+(a+b)+' pommes. On en prend '+b+'. Combien en reste-t-il ?','Було '+(a+b)+' яблук. Забрали '+b+'. Скільки залишилося?' ],'',a],
    (a,b)=>[['על מדף אחד '+a+' ספרים ועל מדף אחר '+b+'. כמה ספרים יש בסך הכול?','One shelf has '+a+' books and another has '+b+'. How many are there in all?','На одной полке '+a+' книг, на другой '+b+'. Сколько книг всего?','على رفّ '+a+' كتب وعلى رفّ آخر '+b+'. كم كتابًا في المجموع؟','Il y a '+a+' livres sur une étagère et '+b+' sur une autre. Combien en tout ?','На одній полиці '+a+' книжок, на іншій '+b+'. Скільки їх разом?'],'',a+b],
    (a,b,g)=>'הו'.includes(g)?shoppingVariant(a,b):meetingVariant(a,b),
  ],
  shapes:[
    (a,b,g)=>polygonVariant(3+a%3),
    (a,b,g)=>'אב'.includes(g)?polygonVariant(4+b%3):rectangleVariant(a,b,'perimeter'),
    (a,b,g)=>'אבג'.includes(g)?polygonVariant(3+b%4):rectangleVariant(a,b,'area'),
  ],
  area:[
    (a,b)=>rectangleVariant(a,b,'area'),
    (a,b)=>['area','',a*b,diagram('משולש',outline('M52 162H268L52 46Z')+dimension(160,186,2*a)+dimension(35,103,b))],
    (a,b)=>['area','',3*a,diagram('מקבילית',outline('M52 163H227L264 49H89Z')+'<path d="M89 49V163" class="diagram-guide"/>'+dimension(159,185,a)+dimension(109,109,3))],
  ],
  angles:[
    (a,b)=>['angle','',90-(a*4+10),diagram('משולש ישר זווית',outline('M65 42V161H260Z')+corner(65,161)+dimension(222,150,a*4+10+'°')+dimension(85,83,'?'))],
    (a,b)=>['angle','',180-(a*8+25),anglePicture(0,(a*8+5)/10)],
    (a,b)=>['angle','',180-2*(25+a*3),diagram('משולש שווה שוקיים',outline('M52 162H268L160 38Z')+dimension(160,71,'?')+dimension(91,154,25+a*3+'°')+dimension(228,154,25+a*3+'°'))],
  ],
  circle:[
    (a,b)=>['diameter','',2*a,circleVariant(a,false)],
    (a,b)=>['radius','',a,circleVariant(2*a,true)],
  ],
  volume:[
    (a,b)=>['volume','',a*b*3,solidVariant(a,b,3)],
    (a,b)=>['volume','',a*a*a,solidVariant(a,a,a)],
    (a,b)=>['volume','',a*b*5,solidVariant(a,b,5)],
  ],
  coordinates:[
    (a,b)=>['ycoord','',b,coordinatePicture([[a,b]],{firstQuadrant:true,hideLabels:true})],
    (a,b)=>['xcoord','',a,coordinatePicture([[a,5]],{firstQuadrant:true,hideLabels:true})],
    (a,b)=>['ycoord','',a,coordinatePicture([[4,a]],{firstQuadrant:true,hideLabels:true})],
  ],
  transforms:[
    (a,b)=>['reflect',`(${a}, ${b})`,-a,coordinatePicture([[a,b]],{markOrigin:true})],
    (a,b)=>['turn',`(${a}, −${b})`,b,coordinatePicture([[a,-b]],{markOrigin:true})],
    (a,b)=>['reflect',`(−${a}, ${b})`,a,coordinatePicture([[-a,b]],{markOrigin:true})],
  ],
  pythagoras:[
    (a,b)=>rightTriangleVariant(3*a,4*a,5*a,false),
    (a,b)=>rightTriangleVariant(5*a,12*a,13*a,true),
    (a,b)=>rightTriangleVariant(6*a,8*a,10*a,false),
  ],
  graphs:[
    (a,b)=>surveyChart('paired',a,b),
    (a,b)=>surveyChart('pie',a,b),
    (a,b)=>['graphMax','',2,{kind:'graph',axis:'גובה המים',unit:'ס״מ',values:[a,a+2,a+b+4,a+1]}],
    (a,b)=>['graphChange','',b,{kind:'graph',axis:'מרחק',unit:'ק״מ',values:[a,a+2,a+3,a+2+b]}],
    (a,b)=>['graphChange','',b,{kind:'graph',axis:'גובה המים',unit:'ס״מ',values:[a+2,a+b+4,a+b,a+4]}],
  ],
};

function substitutionVariant(value,expression,answer) {
  const assignment = `⁦x = ${String(value).replace('-','−')}⁩`;
  return [[`הציבו ${assignment} וחשבו את ערך הביטוי`,`Use ${assignment} to evaluate the expression`,
    `Подставьте ${assignment} и вычислите значение выражения`,`عوّضوا ${assignment} واحسبوا قيمة التعبير`,
    `Calcule la valeur de l’expression pour ${assignment}`,`Підставте ${assignment} й обчисліть значення виразу`],expression,answer];
}

function surveyChart(type,a,b) {
  const values=[a,b,a+b];
  const second=[b,a+b,a];
  const fruit=['🍎','🍐','🍊'];
  const target=a%3;
  const symbol=fruit[target];
  const count=[`כמה ילדים בחרו בפרי ${symbol}?`,`How many children chose ${symbol}?`,`Сколько детей выбрали ${symbol}?`,`كم طفلًا اختار ${symbol}؟`,`Combien d’enfants ont choisi ${symbol} ?`,`Скільки дітей обрали ${symbol}?`];
  const compare=[`כמה ילדים בשתי הקבוצות יחד בחרו בפרי ${symbol}?`,`How many children across both groups chose ${symbol}?`,`Сколько детей в двух группах вместе выбрали ${symbol}?`,`كم طفلًا في المجموعتين معًا اختار ${symbol}؟`,`Combien d’enfants des deux groupes réunis ont choisi ${symbol} ?`,`Скільки дітей у двох групах разом обрали ${symbol}?`];
  const total=4*(a+b);
  const percent=25*(1+a%2);
  const pie=[`בסקר השתתפו ${total} ילדים. לפי דיאגרמת העיגול, כמה מהם בחרו בפרי ${symbol}?`,`A survey included ${total} children. Use the pie chart to find how many chose ${symbol}.`,`В опросе участвовали ${total} детей. По круговой диаграмме определите, сколько выбрали ${symbol}.`,`شارك ${total} طفلًا في استطلاع. بحسب المخطط الدائري، كم منهم اختار ${symbol}؟`,`Parmi les ${total} enfants interrogés, combien ont choisi ${symbol} selon le diagramme circulaire ?`,`В опитуванні взяли участь ${total} дітей. За круговою діаграмою визначте, скільки обрали ${symbol}.`];
  if(type==='pie') {
    values[target]=percent;
    values[(target+1)%3]=25;
    values[(target+2)%3]=75-percent;
  }
  const paired=type==='paired';
  return [type==='pie'?pie:paired?compare:count,'',type==='pie'?total*percent/100:values[target]+(paired?second[target]:0),
    {kind:'survey',type,values,second,fruit}];
}

function unitFractionVariant(part,groups) {
  const total=part*groups;
  return [[
    `בקופסה ${total} חרוזים. החלק של החרוזים הכחולים הוא ⁦1/${groups}⁩ מכלל החרוזים. כמה חרוזים כחולים בקופסה?`,
    `A box contains ${total} beads. One out of every ${groups} beads is blue. How many blue beads are there?`,
    `В коробке ${total} бусин. Одна из каждых ${groups} бусин синяя. Сколько синих бусин в коробке?`,
    `في علبة ${total} خرزة. واحدة من كل ${groups} خرزات زرقاء. كم خرزة زرقاء في العلبة؟`,
    `Une boîte contient ${total} perles. Une perle sur ${groups} est bleue. Combien de perles sont bleues ?`,
    `У коробці ${total} намистин. Одна з кожних ${groups} намистин синя. Скільки синіх намистин у коробці?`
  ],'',part];
}

function marbleProbability(blue,red) {
  return [[
    `בשקית ${blue} גולות כחולות ו-${red} גולות אדומות. מוציאים גולה אחת באקראי. מה ההסתברות, באחוזים, להוציא גולה כחולה?`,
    `A bag contains ${blue} blue marbles and ${red} red marbles. One marble is drawn at random. What is the probability, as a percentage, of drawing a blue marble?`,
    `В мешке ${blue} синих и ${red} красных шариков. Наугад вынимают один шарик. Какова вероятность в процентах, что он синий?`,
    `في كيس ${blue} كرة زرقاء و${red} كرة حمراء. نسحب كرة واحدة عشوائيًا. ما احتمال سحب كرة زرقاء بالنسبة المئوية؟`,
    `Un sac contient ${blue} billes bleues et ${red} billes rouges. On tire une bille au hasard. Quelle est la probabilité, en pourcentage, de tirer une bille bleue ?`,
    `У мішку ${blue} синіх і ${red} червоних кульок. Навмання виймають одну кульку. Яка ймовірність у відсотках, що вона синя?`
  ],'',100*blue/(blue+red)];
}

function meetingVariant(a,b) {
  const children=2*a+b;
  return [[
    'נרשמו '+children+' ילדים. בכל קבוצה יש שני ילדים. כמה קבוצות מלאות אפשר ליצור?',
    children+' children signed up. Each group has two children. How many full groups can be made?',
    'Записались '+children+' детей. В группе по два ребёнка. Сколько полных групп получится?',
    'سجّل '+children+' طفلًا. في كل مجموعة طفلان. كم مجموعة كاملة يمكن تكوينها؟',
    children+' enfants se sont inscrits. Chaque groupe compte deux enfants. Combien de groupes complets peut-on former ?',
    'Записалося '+children+' дітей. У групі по двоє дітей. Скільки повних груп можна утворити?',
  ],'',Math.floor(children/2)];
}

function shoppingVariant(a,b) {
  const budget=10*a+5*b;
  return [[
    'התקציב הוא '+budget+' ₪. קונים '+a+' מחברות ב-8 ₪ למחברת ו-'+b+' עפרונות ב-3 ₪ לעיפרון. כמה שקלים נשארו?',
    'The budget is ₪'+budget+'. Buy '+a+' notebooks at ₪8 each and '+b+' pencils at ₪3 each. How many shekels are left?',
    'Бюджет — '+budget+' шекелей. Купили '+a+' тетрадей по 8 шекелей и '+b+' карандашей по 3 шекеля. Сколько шекелей осталось?',
    'الميزانية '+budget+' شيكلًا. اشتُريت '+a+' دفاتر بسعر 8 شواكل للدفتر و'+b+' أقلام بسعر 3 شواكل للقلم. كم شيكلًا بقي؟',
    'Le budget est de '+budget+' ₪. On achète '+a+' cahiers à 8 ₪ et '+b+' crayons à 3 ₪. Combien de shekels reste-t-il ?',
    'Бюджет — '+budget+' шекелів. Купили '+a+' зошитів по 8 шекелів і '+b+' олівців по 3 шекелі. Скільки шекелів залишилося?',
  ],'',budget-8*a-3*b];
}

function rectangleVariant(a,b,kind) {
  return [kind,'',kind==='area'?a*b:2*(a+b),
    diagram('מלבן',outline('M59 44H258V164H59Z')+dimension(159,185,a)+dimension(36,106,b))];
}
function polygonVariant(sides) {
  const points = Array.from({length:sides},(_,i)=>{
    const angle = (i/sides-.25)*Math.PI*2;
    return [160+72*Math.cos(angle),105+72*Math.sin(angle)].join(' ');
  });
  return ['sides','',sides,diagram('מצולע',outline('M'+points.join('L')+'Z'))];
}
function circleVariant(amount, diameter) {
  return diagram('מעגל','<circle data-outline cx="160" cy="105" r="70" class="diagram-outline"/>'+
    `<path class="diagram-guide" d="M${diameter?90:160} 105H230"/>`+dimension(diameter?160:196,94,amount));
}
function solidVariant(a,b,c) {
  return diagram('תיבה',outline('M63 79H213V166H63Z')+
    '<path class="diagram-guide" d="M63 79L108 43H258L213 79M258 43V130L213 166"/>'+
    dimension(134,187,a)+dimension(43,125,b)+dimension(250,159,c));
}
function rightTriangleVariant(a,b,c,missingLeg) {
  return [missingLeg?'leg':'hypotenuse','',missingLeg?b:c,diagram('משולש ישר זווית',
    outline('M59 40V163H261Z')+corner(59,163)+dimension(39,103,a)+dimension(158,185,missingLeg?'?':b)+
    dimension(177,90,missingLeg?c:'?')+pythagorasLegs(59,40,59,163,261,163))];
}

function makeQuestionVariant(grade,cat,diff,index) {
  const level = curriculumDifficulties.indexOf(diff);
  const arithmetic = ['add','sub','mul','div'].includes(cat);
  const upper = ['ד','ה','ו'].includes(grade);
  const first = rnd(2, level===0 ? 5 : arithmetic && upper ? 25 : 8);
  const second = rnd(2, level===2 && arithmetic && upper ? 18 : level===2 ? 9 : 6);
  const [kind,math,answer,visual] = variants[cat][index](first,second,grade);
  const labels = Array.isArray(kind) ? kind : variantInstructions[kind];
  const withMath = label => math ? `${label.replace(/[?.؟]$/u,'')}: ⁦${math}⁩` : label;
  const [text,...translations] = labels.map(withMath);
  return {type:'num',cat,diff,text,answer,pts:ptsForQ(cat,diff),
    localized:translations.slice(0,3), extraLocalizations:{fr:translations[3],uk:translations[4]},
    variantKey:`${cat}:variant:${index}`, ...(visual?{visual}:{}), explanation:variantHint[0], hint:{type:'text',msg:variantHint[0]}};
}
