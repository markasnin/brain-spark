// c0–c2 select existing curriculum templates by level, vN selects variant N,
// and named entries select a generator below. Each entry is a focused worksheet skill. Reuse only the listed templates from
// the general pools so a mixed session or exam respects the same grade boundary.
const worksheetGrades = {
  א: {
    add:'operation', sub:'operation', unknown:'unknown', place:'count5 count10 names10 names20 sequence board20 board50 board100 even largest sign gematria',
    word:'pictureStory v0 v1', shapes:'v0 corners', measurement:'measureRule c1', clock:'clock'
  },
  ב: {
    add:'operation column hundreds', sub:'operation column hundreds', mul:'operation table', div:'operation c0 c1',
    unknown:'unknown', place:'c0 c1 c2 even makeNumber gematria', divisibility:'divides', rounding:'compareEstimate', order:'v0 v1',
    word:'compareStory v0 v1 c0 c1 c2', fractions_half:'shaded shadeCells v0 v1', shapes:'v0 corners faces transform',
    area:'tiles', measurement:'clock c1 c2', data:'v0 v1 totalTable'
  },
  ג: {
    add:'operation column', sub:'operation column', mul:'operation column distribute shift',
    div:'operation quotient remainder', unknown:'unknown', place:'c1 c2 largest digit makeNumber sign gematria',
    rounding:'c0 c1 c2', divisibility:'c0 c1 c2', order:'v0 v1 v2', word:'compareStory multiplyCompare c0 c1 c2',
    fractions_unit:'v0 v1 v2', fractions:'shaded compareFractions fractionBenchmark estimateFraction', shapes:'corners triangleType rightAngles', angles:'classifyAngle',
    measurement:'time mass capacity'
  },
  ד: {
    add:'column', sub:'column', mul:'column distribute', div:'quotient', unknown:'unknown',
    divisibility:'c0 c1 c2 factor', order:'c0 c1 c2 power', word:'c0 c1 c2',
    place:'gematria signedLine', rounding:'compareEstimate', fractions:'shaded shadeCells c0 c1 v2 fractionSum wholeTimes',
    decimals:'tenths', shapes:'diagonal symmetry triangleType pairLines', area:'v0 perimeter',
    volume:'c0 c1 c2 faces net', measurement:'calendar mass', data:'v0 v1 totalTable'
  },
  ה: {
    add:'column', sub:'column', mul:'column', div:'quotient compareEstimate', unknown:'mixed reduce', order:'v1 v2', word:'c0 c1 c2', fractions:'v0 reduce mixed common fractionSum fractionDifference compareFractions wholeTimes fractionLine',
    decimals:'tenths decimalColumn decimalSub v2 decimalRound decimalSeq', percent:'v0 c0 c2',
    shapes:'diagonal congruent pairLines height', angles:'classifyAngle', area:'v0 v1 v2 trapezoid perimeter',
    data:'v0 v1 totalTable average c1 c2'
  },
  ו: {
    fractions:'shaded shadeCells fractionLine c0 c1 c2 fractionProduct fractionDivision wholeFromPart', decimals:'decimalProduct decimalDivide c1',
    unknown:'wholeFromPart wholeStory', percent:'c0 percentTable c1 c2', ratio:'c0 c1 c2 recipe', word:'wholeStory c0 c1 c2 rate', order:'v2 power',
    place:'roman', circle:'c0 c1 c2', area:'v0 v1 v2 trapezoid', volume:'c0 c1 c2 cone cylinder surface faces net',
    measurement:'areaUnits mass currency', data:'v1 totalTable average median mode', probability:'v0 v1 v2'
  }
};

const worksheetPrompts = {
  compareStory:'במדף העליון # ספרים. במדף התחתון יש @ ספרים פחות. כמה ספרים יש במדף התחתון?|There are # books on the top shelf. The bottom shelf has @ fewer. How many are on the bottom shelf?|На верхней полке # книг. На нижней на @ меньше. Сколько книг на нижней полке?|على الرف العلوي # كتابًا. على الرف السفلي أقل بـ @ كتب. كم كتابًا على الرف السفلي؟|Il y a # livres sur l’étagère du haut. Celle du bas en a @ de moins. Combien en a-t-elle ?|На верхній полиці # книжок. На нижній на @ менше. Скільки книжок на нижній полиці?',
  pictureStory:'כמה תפוחים יש בשני הסלים יחד?|How many apples are in the two baskets altogether?|Сколько всего яблок в двух корзинах?|كم تفاحة في السلتين معًا؟|Combien de pommes y a-t-il dans les deux paniers en tout ?|Скільки всього яблук у двох кошиках?',
  multiplyCompare:'לנועה יש # חרוזים. לאמיר יש פי @ חרוזים מנועה. כמה חרוזים יש לשניהם יחד?|Noa has # beads. Amir has @ times as many. How many beads do they have altogether?|У Ноа # бусин. У Амира в @ раз больше. Сколько у них бусин вместе?|لدى نوعا # خرزة. لدى أمير @ أضعاف ما لدى نوعا. كم خرزة لديهما معًا؟|Noa a # perles. Amir en a @ fois autant. Combien de perles ont-ils en tout ?|У Ноа # намистин. В Аміра у @ разів більше. Скільки намистин у них разом?',
  wholeStory:'נועם קרא # עמודים, שהם @ מתוך כל % חלקים שווים של הספר. כמה עמודים יש בספר?|Noam read # pages, which make up @ of the book’s % equal parts. How many pages are in the book?|Ноам прочитал # страниц, что составляет @ из % равных частей книги. Сколько страниц в книге?|قرأ نوعام # صفحة، وهي @ من أصل % أجزاء متساوية من الكتاب. كم صفحة في الكتاب؟|Noam a lu # pages, soit @ des % parts égales du livre. Combien de pages contient le livre ?|Ноам прочитав # сторінок, що становить @ із % рівних частин книжки. Скільки сторінок у книжці?',
  sign:'איזה סימן מתאים בין המספרים? בחרו את מספר הסימן.|Which sign belongs between the numbers? Choose the number of the sign.|Какой знак нужен между числами? Выбери номер знака.|أي إشارة تناسب العددين؟ اختر رقم الإشارة.|Quel signe convient entre les nombres ? Choisis le numéro du signe.|Який знак треба поставити між числами? Вибери номер знака.',
  shadeCells:'צבעו # מהמלבן בלחיצה על המשבצות.|Shade # of the rectangle by tapping the cells.|Закрась # прямоугольника, нажимая на клетки.|لوّن # من المستطيل بالضغط على المربعات.|Colorie # du rectangle en touchant les cases.|Зафарбуй # прямокутника, натискаючи на клітинки.',
  fractionResult:'חשבו וכתבו את התוצאה כשבר או כמספר שלם.|Calculate. Enter a fraction or a whole number.|Вычисли. Запиши дробь или целое число.|احسب واكتب الناتج كسرًا أو عددًا صحيحًا.|Calcule. Écris une fraction ou un entier.|Обчисли. Запиши дріб або ціле число.',
  percentTable:'השלימו בטבלה את הכמות המתאימה לאחוז המסומן.|Complete the table with the quantity for the indicated percentage.|Впиши в таблицу величину для указанного процента.|أكمل الجدول بالكمية الموافقة للنسبة المحددة.|Complète le tableau avec la quantité correspondant au pourcentage indiqué.|Впиши в таблицю величину для вказаного відсотка.',
  estimateFraction:'כתבו את השלם הקרוב ביותר לשבר.|Write the whole number nearest to this fraction.|Запиши ближайшее целое число к этой дроби.|اكتب أقرب عدد صحيح إلى هذا الكسر.|Écris l’entier le plus proche de cette fraction.|Запиши найближче до дробу ціле число.',
  transform:'איזה שרטוט מציג הזזה של המשולש הראשון? כתבו את מספרו.|Which picture shows a translation of the first triangle? Enter its number.|На каком рисунке первый треугольник перенесён параллельно? Введи номер.|أي رسم يُظهر إزاحة للمثلث الأول؟ اكتب رقمه.|Quel dessin montre une translation du premier triangle ? Écris son numéro.|На якому рисунку перший трикутник паралельно перенесено? Вкажи номер.',
  congruent:'איזה משולש חופף למשולש הראשון? כתבו את מספרו.|Which triangle is congruent to the first? Enter its number.|Какой треугольник равен первому? Введи номер.|أي مثلث يطابق المثلث الأول؟ اكتب رقمه.|Quel triangle est superposable au premier ? Écris son numéro.|Який трикутник дорівнює першому? Вкажи номер.',
  pairLines:'איזה זוג ישרים הוא #? כתבו את מספר השרטוט.|Which pair of lines is #? Enter the diagram number.|Какая пара прямых #? Введи номер рисунка.|أي زوج من المستقيمات #؟ اكتب رقم الرسم.|Quelle paire de droites est # ? Écris le numéro du dessin.|Яка пара прямих #? Вкажи номер рисунка.',
  triangleType:'איזה משולש הוא ישר־זווית? כתבו את מספרו.|Which triangle is right-angled? Enter its number.|Какой треугольник прямоугольный? Введи номер.|أي مثلث قائم الزاوية؟ اكتب رقمه.|Quel triangle est rectangle ? Écris son numéro.|Який трикутник прямокутний? Вкажи номер.',
  net:'מקפלים את הפריסה לגוף. כמה קודקודים יהיו לו?|Fold the net into a solid. How many vertices will it have?|Сложи тело из развёртки. Сколько у него вершин?|تخيّل طيّ الشبكة إلى مجسّم. كم رأسًا سيكون له؟|Plie ce patron pour former un solide. Combien aura-t-il de sommets ?|Склади тіло з розгортки. Скільки воно матиме вершин?',
  fractionLine:'איזה שבר מסומן על הישר? כתבו את המונה כשהמכנה הוא #.|Which fraction is marked? Enter its numerator when the denominator is #.|Какая дробь отмечена? Введи числитель при знаменателе #.|أي كسر محدد على المستقيم؟ اكتب البسط عندما يكون المقام #.|Quelle fraction est indiquée ? Écris son numérateur pour un dénominateur de #.|Який дріб позначено? Введи чисельник, якщо знаменник #.',
  totalTable:'בטבלה רשום מספר הספרים שנקראו בכל חודש. כמה ספרים נקראו בשלושת החודשים יחד?|The table shows books read each month. How many were read over the three months?|В таблице указано число книг за каждый месяц. Сколько книг прочитали за три месяца?|يبين الجدول عدد الكتب المقروءة كل شهر. كم كتابًا قُرئ في الأشهر الثلاثة معًا؟|Le tableau indique les livres lus chaque mois. Combien en a-t-on lu en trois mois ?|Таблиця показує кількість прочитаних за кожен місяць книжок. Скільки прочитано за три місяці?',
  makeNumber:'הרכיבו מהספרות הנתונות את המספר הגדול ביותר. השתמשו בכל ספרה פעם אחת.|Make the largest possible number using each digit once.|Составь наибольшее число, используя каждую цифру один раз.|كوّن أكبر عدد ممكن مستخدمًا كل رقم مرة واحدة.|Forme le plus grand nombre en utilisant chaque chiffre une fois.|Утвори найбільше число, використавши кожну цифру один раз.',
  compareEstimate:'בלי לחשב במדויק, איזה תרגיל נותן תוצאה גדולה יותר? כתבו 1 או 2.|Without calculating exactly, which expression is greater? Enter 1 or 2.|Не вычисляя точно, выбери выражение с большим значением. Введи 1 или 2.|دون حساب دقيق، أي تعبير قيمته أكبر؟ اكتب 1 أو 2.|Sans calculer exactement, quelle expression est la plus grande ? Écris 1 ou 2.|Без точного обчислення визнач, який вираз більший. Введи 1 або 2.',
  fractionBenchmark:'איזה שבר גדול מחצי? כתבו את מספרו.|Which fraction is greater than one half? Enter its number.|Какая дробь больше половины? Введи её номер.|أي كسر أكبر من النصف؟ اكتب رقمه.|Quelle fraction est supérieure à un demi ? Écris son numéro.|Який дріб більший за половину? Вкажи його номер.',
  measureRule:'מדדו את אורך הקטע בסנטימטרים לפי הסרגל.|Use the ruler to find the length of the line in centimetres.|Найди длину отрезка в сантиметрах по линейке.|استخدم المسطرة لقياس طول القطعة بالسنتيمترات.|Mesure la longueur du segment en centimètres avec la règle.|Виміряй за лінійкою довжину відрізка в сантиметрах.',
  count:'כמה נקודות יש במסגרת?|How many dots are in the frame?|Сколько точек в рамке?|كم نقطة في الإطار؟|Combien de points y a-t-il dans le cadre ?|Скільки крапок у рамці?',
  clock:'איזו שעה מראה השעון? כתבו את השעה השלמה.|What hour does the clock show? Enter the hour.|Какой час показывают часы? Введите часы.|ما الساعة التي تشير إليها ساعة الحائط؟ اكتب عدد الساعات.|Quelle heure indique cette horloge ? Écris les heures.|Котру годину показує годинник? Вкажи години.',
  minutes:'כמה דקות עברו מאז השעה העגולה?|How many minutes past the hour is it?|Сколько минут прошло с начала часа?|كم دقيقة مضت منذ بداية الساعة؟|Combien de minutes se sont écoulées depuis le début de l’heure ?|Скільки хвилин минуло від початку години?',
  even:'כתבו את המספר הזוגי היחיד.|Write the only even number.|Запиши единственное чётное число.|اكتب العدد الزوجي الوحيد.|Écris le seul nombre pair.|Запиши єдине парне число.',
  gematria:'כתבו בספרות את ערך האותיות.|Write the numerical value of the Hebrew letters.|Запиши числовое значение еврейских букв.|اكتب القيمة العددية للحروف العبرية.|Écris la valeur numérique des lettres hébraïques.|Запиши числове значення єврейських літер.',
  names:'כתבו את המספר בספרות.|Write the number in digits.|Запиши число цифрами.|اكتب العدد بالأرقام.|Écris le nombre en chiffres.|Запиши число цифрами.',
  shaded:'איזה חלק מהמלבן צבוע? כתבו את המונה כשהמכנה הוא #.|What fraction of the rectangle is shaded? Enter the numerator for denominator #.|Какая часть прямоугольника закрашена? Запиши числитель при знаменателе #.|أي كسر من المستطيل ملوّن؟ اكتب البسط إذا كان المقام #.|Quelle fraction du rectangle est coloriée ? Écris le numérateur pour le dénominateur #.|Яку частину прямокутника зафарбовано? Запиши чисельник для знаменника #.',
  corners:'כמה קודקודים יש למצולע?|How many vertices does the polygon have?|Сколько вершин у многоугольника?|كم رأسًا للمضلع؟|Combien de sommets a ce polygone ?|Скільки вершин у многокутника?',
  faces:'כמה פאות יש לגוף?|How many faces does this solid have?|Сколько граней у этого тела?|كم وجهًا لهذا المجسّم؟|Combien de faces a ce solide ?|Скільки граней має це тіло?',
  symmetry:'כמה צירי סימטריה יש למצולע המשוכלל?|How many lines of symmetry does this regular polygon have?|Сколько осей симметрии у правильного многоугольника?|كم محور تماثل لهذا المضلّع المنتظم؟|Combien d’axes de symétrie possède ce polygone régulier ?|Скільки осей симетрії має правильний многокутник?',
  diagonal:'כמה אלכסונים אפשר להעביר מהקודקוד המסומן?|How many diagonals can you draw from the marked vertex?|Сколько диагоналей можно провести из отмеченной вершины?|كم قطرًا يمكنك رسمه من الرأس المحدّد؟|Combien de diagonales peux-tu tracer depuis le sommet marqué ?|Скільки діагоналей можна провести з позначеної вершини?',
  angle:'איזו זווית היא #? כתבו את מספר התרשים.|Which angle is #? Enter its diagram number.|Какой угол #? Введи номер рисунка.|أي زاوية #؟ اكتب رقم الرسم.|Quel angle est # ? Écris le numéro du dessin.|Який кут #? Вкажи номер рисунка.',
  height:'איזה קטע הוא גובה לבסיס המודגש? כתבו את מספרו.|Which segment is the height to the highlighted base? Enter its number.|Какой отрезок является высотой к выделенному основанию? Введи его номер.|أي قطعة هي الارتفاع على القاعدة المحددة؟ اكتب رقمها.|Quel segment est la hauteur relative à la base en couleur ? Écris son numéro.|Який відрізок є висотою до виділеної основи? Вкажи його номер.',
  median:'מצאו את החציון.|Find the median.|Найди медиану.|أوجد الوسيط.|Trouve la médiane.|Знайди медіану.',
  mode:'מצאו את השכיח.|Find the mode.|Найди моду.|أوجد المنوال.|Trouve le mode.|Знайди моду.',
  digit:'מהו ערך הספרה # במספר הנתון?|What is the value of the digit # in this number?|Каково разрядное значение цифры # в числе?|ما القيمة المنزلية للرقم # في العدد؟|Quelle est la valeur du chiffre # dans ce nombre ?|Яке розрядне значення цифри # у цьому числі?',
  divides:'איזה מספר מתחלק ב־# ללא שארית?|Which number is divisible by #?|Какое число делится на # без остатка?|أي عدد يقبل القسمة على # دون باقٍ؟|Quel nombre est divisible par # ?|Яке число ділиться на # без остачі?',
  factor:'כתבו את הגורם הראשוני החסר.|Enter the missing prime factor.|Введи пропущенный простой множитель.|اكتب العامل الأولي الناقص.|Écris le facteur premier manquant.|Введи пропущений простий множник.',
  common:'מצאו את המכנה המשותף הקטן ביותר.|Find the least common denominator.|Найди наименьший общий знаменатель.|أوجد أصغر مقام مشترك.|Trouve le plus petit dénominateur commun.|Знайди найменший спільний знаменник.',
  compareFractions:'איזה שבר גדול יותר? כתבו את מספרו (1 או 2).|Which fraction is larger? Enter its number (1 or 2).|Какая дробь больше? Введи её номер (1 или 2).|أي كسر أكبر؟ اكتب رقمه (1 أو 2).|Quelle fraction est la plus grande ? Écris son numéro (1 ou 2).|Який дріб більший? Вкажи його номер (1 або 2).',
  roman:'כתבו בספרות רגילות את המספר הרומי.|Write the Roman numeral in ordinary digits.|Запиши римское число арабскими цифрами.|اكتب العدد الروماني بالأرقام المعتادة.|Écris le nombre romain en chiffres arabes.|Запиши римське число звичайними цифрами.',
  surface:'חשבו את שטח הפנים הכולל של הגליל. כתבו את המקדם של π.|Find the total surface area of the cylinder. Enter the coefficient of π.|Найди полную площадь поверхности цилиндра. Введи коэффициент при π.|احسب مساحة السطح الكلية للأسطوانة. اكتب معامل π.|Calcule l’aire totale du cylindre. Écris le coefficient de π.|Знайди повну площу поверхні циліндра. Введи коефіцієнт при π.',
  cone:'חשבו את נפח החרוט. כתבו את המקדם של π.|Find the cone’s volume. Enter the coefficient of π.|Найди объём конуса. Введи коэффициент при π.|احسب حجم المخروط. اكتب معامل π.|Calcule le volume du cône. Écris le coefficient de π.|Знайди об’єм конуса. Запиши коефіцієнт при π.',
  cylinder:'חשבו את נפח הגליל. כתבו את המקדם של π.|Find the cylinder’s volume. Enter the coefficient of π.|Найди объём цилиндра. Введи коэффициент при π.|احسب حجم الأسطوانة. اكتب معامل π.|Calcule le volume du cylindre. Écris le coefficient de π.|Знайди об’єм циліндра. Запиши коефіцієнт при π.',
  recipe:'ל־# מנות צריך @ גרם קמח. כמה גרם דרושים ל־% מנות?|A recipe for # servings uses @ g of flour. How many grams do % servings need?|Для # порций нужно @ г муки. Сколько граммов нужно для % порций?|تحتاج # حصص إلى @ غرامًا من الدقيق. كم غرامًا تحتاج % حصص؟|Pour # portions, il faut @ g de farine. Combien de grammes faut-il pour % portions ?|Для # порцій потрібно @ г борошна. Скільки грамів потрібно для % порцій?',
  rate:'מכונה אורזת # קופסאות ב־@ דקות בקצב קבוע. כמה קופסאות תארוז ב־% דקות?|A machine packs # boxes in @ minutes at a constant rate. How many will it pack in % minutes?|Машина упаковывает # коробок за @ минут с постоянной скоростью. Сколько упакует за % минут?|تعبئ آلة # علبة في @ دقائق بمعدل ثابت. كم علبة تعبئ في % دقائق؟|Une machine emballe # boîtes en @ minutes à cadence constante. Combien en emballe-t-elle en % minutes ?|Машина пакує # коробок за @ хвилин зі сталою швидкістю. Скільки запакує за % хвилин?',
  calendar:'כמה ימים יש ב־# שבועות ועוד @ ימים?|How many days are in # weeks and @ more days?|Сколько дней в # неделях и ещё @ днях?|كم يومًا في # أسابيع و@ أيام إضافية؟|Combien de jours y a-t-il dans # semaines et @ jours de plus ?|Скільки днів у # тижнях і ще @ днях?',
  currency:'שער ההמרה בתרגיל הוא # שקלים לאירו. כמה שקלים שווים @ אירו?|Use # shekels per euro. How many shekels are @ euros worth?|Курс в задаче — # шекеля за евро. Сколько шекелей стоят @ евро?|سعر الصرف في المسألة # شواكل لليورو. كم شيكلًا يساوي @ يورو؟|Dans cet exercice, un euro vaut # shekels. Combien valent @ euros en shekels ?|Курс у задачі — # шекелі за євро. Скільки шекелів коштують @ євро?'
};

function worksheetDiagram(body) {
  return diagram('',body);
}

function worksheetLine(x,y,u,v,color='#51669b',width=3) {
  return `<line x1="${x}" y1="${y}" x2="${u}" y2="${v}" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`;
}

function worksheetGrid(cols,rows,cell,label,shade=()=>false) {
  const size=Math.min(46,260/cols,145/rows);
  let body='';
  for(let r=0;r<rows;r++) for(let c=0;c<cols;c++){
    const x=160+(c-cols/2)*size,y=99+(r-rows/2)*size;
    body+=`<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${shade(r,c)?'#50c9ad':'#f0f4ff'}" stroke="#50679c"/>`;
    const value=cell(r,c);
    if(value!=='') body+=dimension(x+size/2,y+size/2+6,value);
  }
  return diagram(label,body);
}

function worksheetPolygon(n,mark=false) {
  const points=Array.from({length:n},(_,i)=>{
    const angle=2*Math.PI*i/n-Math.PI/2;
    return [160+74*Math.cos(angle),102+74*Math.sin(angle)];
  });
  let body=outline('M'+points.map(p=>p.join(' ')).join('L')+'Z');
  if(mark) body+=`<circle cx="${points[0][0]}" cy="${points[0][1]}" r="6" fill="#d75821"/>`;
  return worksheetDiagram(body);
}

function worksheetClock(hour,minutes) {
  const hand=(units,length,width)=>worksheetLine(160,100,160+length*Math.sin(units*Math.PI/30),100-length*Math.cos(units*Math.PI/30),'#334570',width);
  let body='<circle cx="160" cy="100" r="85" stroke="#51669b" stroke-width="3" fill="#f4f7ff"/>';
  for(let i=1;i<=12;i++) body+=dimension(160+68*Math.sin(i*Math.PI/6),107-68*Math.cos(i*Math.PI/6),i);
  return worksheetDiagram(body+hand(5*hour+minutes/12,37,6)+hand(minutes,56,3));
}

function worksheetShuffle(items){
  const result=items.slice();
  for(let i=result.length-1;i>0;i--){ const j=rnd(0,i); [result[i],result[j]]=[result[j],result[i]]; }
  return result;
}

function worksheetProblem(grade,cat,diff,key){
  const a=rnd(2,9), b=rnd(2,8);
  const scale='אבגדהו'.indexOf(grade);
  let instruction='calculate', math='', answer, visual, fraction, values=[];
  switch(key){
    case 'pictureStory': {
      const x=rnd(1,5),y=rnd(1,5);
      const basket=(n,offset)=>outline(`M${offset} 125q48 46 96 0Z`)+Array.from({length:n},(_,i)=>dimension(offset+21+(i%3)*24,116-Math.floor(i/3)*23,'🍎')).join('');
      visual=worksheetDiagram(basket(x,38)+basket(y,180));answer=x+y;instruction=key;break;
    }
    case 'compareStory':values=[rnd(15,60),b];answer=values[0]-b;instruction=key;break;
    case 'multiplyCompare':values=[a+b,b];answer=(a+b)*(1+b);instruction=key;break;
    case 'wholeStory':values=[2*a,2,b+1];answer=(b+1)*a;instruction=key;break;
    case 'sign': {
      const limit=[20,100,9999][scale],x=rnd(1,limit),y=rnd(0,3)?rnd(1,limit):x;
      math=`${x}   …   ${y}      (1) <    (2) =    (3) >`;answer=x<y?1:x===y?2:3;instruction=key;break;
    }
    case 'estimateFraction': {
      const n=2*a+pick([-1,1]);
      math=`${n}/4`;answer=Math.round(n/4);instruction=key;break;
    }
    case 'percentTable': {
      const total=20*a,percent=pick([5,10,15,20,25,35,40,45,50,75]);
      visual=worksheetGrid(2,2,(r,c)=>[['100%',percent+'%'],[total,'▲']][r][c],'');
      instruction=key;answer=total*percent/100;break;
    }
    case 'fractionProduct': case 'fractionDivision': case 'fractionSum': case 'fractionDifference': {
      const d=rnd(3,10),e=rnd(2,8),n=rnd(1,d-1),m=rnd(1,e-1);
      if(key==='fractionProduct'){math=`${n}/${d} × ${m}/${e}`;fraction=[n*m,d*e];}
      if(key==='fractionDivision'){math=`${n}/${d} ÷ ${m}/${e}`;fraction=[n*e,d*m];}
      if(key==='fractionSum'){math=`${n}/${d} + 1/${2*d}`;fraction=[2*n+1,2*d];}
      if(key==='fractionDifference'){math=`${n}/${d} − 1/${2*d}`;fraction=[2*n-1,2*d];}
      const [num,den]=fraction;
      let x=num,y=den;
      while(y){[x,y]=[y,x%y];}
      fraction=[num/x,den/x];answer=num/den;instruction='fractionResult';break;
    }
    case 'decimalSub': math=`${a+b}.3 − ${b}.65`;answer=(100*a-35)/100;break;
    case 'decimalColumn': {
      const x=100*a+rnd(0,99), y=100*b+rnd(0,99);
      visual=worksheetDiagram(`<g direction="ltr" font-family="monospace" font-size="29" fill="#233459" text-anchor="end"><text x="222" y="77">${(x/100).toFixed(2)}</text><text x="222" y="118">${(y/100).toFixed(2)}</text><text x="100" y="118">+</text></g>`+worksheetLine(91,130,230,130));
      answer=(x+y)/100;break;
    }
    case 'makeNumber': {
      const digits=worksheetShuffle([0,1,2,3,4,5,6,7,8,9]).slice(0,scale===1?3:4);
      math=digits.join('    ');answer=Number(digits.sort((x,y)=>y-x).join(''));instruction=key;break;
    }
    case 'compareEstimate': {
      const x=scale>=4?10*a+b:10*a, y=scale>=4?b+1:b,op=scale>=4?'÷':'+';
      const terms=[`${x} ${op} ${y}`,`${x} ${op} ${y+1}`];
      const order=worksheetShuffle([0,1]);answer=order.indexOf(op==='÷'?0:1)+1;
      math=order.map((j,i)=>`(${i+1})  ${terms[j]}`).join('     ');instruction=key;break;
    }
    case 'fractionBenchmark': {
      const options=worksheetShuffle([0,1]);const halves=[`${a-1}/${2*a}`,`${b+1}/${2*b}`];
      math=options.map((n,i)=>`(${i+1})  ${halves[n]}`).join('    ');answer=options.indexOf(1)+1;instruction=key;break;
    }
    case 'fractionLine': {
      const d=rnd(2,6),end=scale>=4?2:1;answer=rnd(1,end*d-1);values=[d];
      let body=worksheetLine(26,100,294,100);
      for(let i=0;i<=end*d;i++){
        const x=30+260*i/(end*d);body+=worksheetLine(x,93,x,107);
        if(i%d===0)body+=dimension(x,138,i/d);
        if(i===answer)body+=`<circle cx="${x}" cy="100" r="7" fill="#ad3674"/>`;
      }
      visual=worksheetDiagram(body);instruction=key;break;
    }
    case 'measureRule': {
      const start=grade==='א'?0:rnd(0,3);answer=rnd(1,10-start);instruction=key;
      let body=worksheetLine(23+27*start,76,23+27*(start+answer),76,'#ad3674',6)+worksheetLine(23,101,293,101);
      for(let i=0;i<=10;i++)body+=worksheetLine(23+27*i,101,23+27*i,114)+dimension(23+27*i,139,i);
      visual=worksheetDiagram(body);break;
    }
    case 'transform': case 'congruent': {
      const correct=rnd(1,2);answer=correct;instruction=key;
      const path='M0 0H42L0 -35Z';
      const shape=(x,transform)=>'<g transform="translate('+x+' 114) '+transform+'">'+outline(path)+'</g>';
      const good=key==='congruent'?'rotate(90)':'',bad=key==='congruent'?'scale(.65)':'rotate(-90)';
      visual=worksheetDiagram(shape(36,'')+worksheetLine(110,45,110,166)+shape(172,correct===1?good:bad)+shape(260,correct===2?good:bad)+dimension(177,177,1)+dimension(263,177,2));break;
    }
    case 'triangleType': case 'pairLines': {
      const order=worksheetShuffle([0,1,2]),wanted=key==='triangleType'?0:rnd(0,1);
      answer=order.indexOf(wanted)+1;instruction=key;
      values=[wanted===0?['מקביל','parallel','параллельна','متوازٍ','parallèle','паралельна']:['מאונך','perpendicular','перпендикулярна','متعامد','perpendiculaire','перпендикулярна']];
      const paths=['M8 55H74L8 8Z','M5 55L41 6L76 55Z','M2 55H77L19 28Z'];
      const lines=[worksheetLine(8,24,74,24)+worksheetLine(8,48,74,48),worksheetLine(6,35,76,35)+worksheetLine(42,8,42,62),worksheetLine(5,25,77,51)+worksheetLine(7,49,72,13)];
      visual=worksheetDiagram(order.map((n,i)=>`<g transform="translate(${13+101*i} 49)">${key==='triangleType'?outline(paths[n]):lines[n]}</g>`+dimension(55+101*i,151,i+1)).join(''));break;
    }
    case 'net': {
      const cube=rnd(0,1);const square=(x,y)=>`<rect x="${x}" y="${y}" width="37" height="37" stroke="#50679c" fill="#bfe6f1"/>`;
      const cross=[[86,82],[123,82],[160,82],[197,82],[123,45],[123,119]];
      visual=worksheetDiagram(cube?cross.map(p=>square(...p)).join(''):outline('M123 82H179V138H123ZM123 82L151 36L179 82M179 82L225 110L179 138M179 138L151 184L123 138M123 138L77 110L123 82'));
      answer=cube?8:5;instruction=key;break;
    }
    case 'totalTable': {
      const nums=[a*5,b*3,rnd(3,20)];answer=nums.reduce((s,n)=>s+n,0);
      visual=worksheetGrid(3,2,(r,c)=>r===0?['I','II','III'][c]:nums[c],'');instruction=key;break;
    }
    case 'count5':case 'count10': {
      answer=rnd(1,key==='count5'?5:10); instruction='count';
      visual=worksheetGrid(5,2,(r,c)=>r*5+c<answer?'●':'',''); break;
    }
    case 'names10':case 'names20': {
      const words=['אחת שתיים שלוש ארבע חמש שש שבע שמונה תשע עשר','one two three four five six seven eight nine ten','один два три четыре пять шесть семь восемь девять десять','واحد اثنان ثلاثة أربعة خمسة ستة سبعة ثمانية تسعة عشرة','un deux trois quatre cinq six sept huit neuf dix','один два три чотири п’ять шість сім вісім дев’ять десять'];
      const teens=['אחת עשרה|שתים עשרה|שלוש עשרה|ארבע עשרה|חמש עשרה|שש עשרה|שבע עשרה|שמונה עשרה|תשע עשרה|עשרים','eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty','одиннадцать|двенадцать|тринадцать|четырнадцать|пятнадцать|шестнадцать|семнадцать|восемнадцать|девятнадцать|двадцать','أحد عشر|اثنا عشر|ثلاثة عشر|أربعة عشر|خمسة عشر|ستة عشر|سبعة عشر|ثمانية عشر|تسعة عشر|عشرون','onze|douze|treize|quatorze|quinze|seize|dix-sept|dix-huit|dix-neuf|vingt','одинадцять|дванадцять|тринадцять|чотирнадцять|п’ятнадцять|шістнадцять|сімнадцять|вісімнадцять|дев’ятнадцять|двадцять'];
      answer=key==='names10'?rnd(1,10):rnd(11,20);
      values=[answer>10?teens.map(w=>w.split('|')[answer-11]):words.map(w=>w.split(' ')[answer-1])];instruction='names';
      break;
    }
    case 'sequence': {
      const step=pick([1,2,5]), start=rnd(0,20-3*step);
      math=[start,start+step,'▲',start+3*step].join(', '); answer=start+2*step;instruction='missing';break;
    }
    case 'board20':case 'board50':case 'board100': {
      const end=Number(key.slice(5)),start=rnd(0,end/10-2)*10+rnd(1,7),index=rnd(0,7);
      answer=start+10*Math.floor(index/4)+index%4;instruction='missing';
      visual=worksheetGrid(4,2,(r,c)=>r*4+c===index?'▲':start+10*r+c,'');break;
    }
    case 'even': {
      answer=2*rnd(1,scale?49:10); instruction='even';
      math=worksheetShuffle([answer,answer-1,Math.max(1,answer-3),answer===2?5:3]).join('   ·   ');break;
    }
    case 'largest': {
      const max=[20,100,9999][scale],numbers=Array.from({length:4},()=>rnd(1,max));
      math=numbers.join('   ·   ');answer=Math.max(...numbers);instruction='maximum';break;
    }
    case 'gematria': {
      if(scale>=2){
        const word=pick(['חלון','תיק','מחברת','סירה','פרח','רכבת','עפרון','מפה','ספריה','ספסל','גלידה','שמיכה','תמונה','כדור']);
        const letters='אבגדהוזחטיכלמנסעפצקרשת', finals={ך:'כ',ם:'מ',ן:'נ',ף:'פ',ץ:'צ'};
        const numerals=[1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100,200,300,400];
        answer=[...word].reduce((total,c)=>total+numerals[letters.indexOf(finals[c]||c)],0);
        math=word;instruction='gematria';break;
      }
      const units=rnd(1,9), tens=scale?rnd(1,9):0;
      math=('יכלמנסעפצ'[tens-1]||'')+'אבגדהוזחט'[units-1];answer=tens*10+units;
      if(answer===15||answer===16)math=answer===15?'ט״ו':'ט״ז';
      instruction='gematria';break;
    }
    case 'digit': {
      const digits=worksheetShuffle([1,2,3,4,5,6,7,8,9]).slice(0,4),i=rnd(0,3);
      math=digits.join('');answer=digits[i]*10**(3-i);values=[digits[i]];instruction='digit';break;
    }
    case 'clock': {
      const h=rnd(1,12),m=scale?5*rnd(0,11):0;
      visual=worksheetClock(h,m);answer=scale?m:h;instruction=scale?'minutes':'clock';break;
    }
    case 'column': {
      const upper=scale===1?99:scale===2?999:9999;
      const x=cat==='mul'?rnd(12,999):rnd(12,upper);
      const y=cat==='mul'?rnd(2,scale===2?9:scale===3?999:99):rnd(1,cat==='sub'?x:Math.max(1,upper-x));
      answer=cat==='mul'?x*y:cat==='add'?x+y:x-y;
      visual=worksheetDiagram(`<g direction="ltr" font-family="monospace" font-size="33" fill="#233459" text-anchor="end"><text x="220" y="76">${x}</text><text x="220" y="120">${y}</text><text x="90" y="120">${operationSigns[cat]}</text></g>`+worksheetLine(87,132,228,132));break;
    }
    case 'table': {
      const r=rnd(2,9),c=rnd(2,9);
      visual=worksheetGrid(3,3,(i,j)=>i===0?(j===0?'×':c+j-1):j===0?r+i-1:i===2&&j===2?'▲':(r+i-1)*(c+j-1),'');
      instruction='missing';answer=(r+1)*(c+1);break;
    }
    case 'shift': {const f=pick([10,100]);math=`${a*10+b} × ${f}`;answer=(a*10+b)*f;break;}
    case 'distribute':math=`${a} × ${10+b} = ${a} × 10 + ▲`;answer=a*b;instruction='missing';break;
    case 'quotient': {const d=scale>=3?rnd(11,35):rnd(2,9);answer=rnd(11,scale>=3?135:45);math=`${d*answer} ÷ ${d}`;break;}
    case 'remainder': {answer=rnd(1,b-1);math=`${a*b+answer} ÷ ${b}`;instruction='remainder';break;}
    case 'divides': {
      const divisor=pick([2,5,10]);answer=divisor*(a+b);instruction='divides';values=[divisor];
      math=worksheetShuffle([answer-1,answer,answer+1]).join('   ·   ');break;
    }
    case 'factor': {const p=pick([2,3,5,7]);answer=pick([2,3,5,7,11]);math=`${p*answer} = ${p} × ▲`;instruction='factor';break;}
    case 'power': {const p=rnd(2,3);math=`${a}${p===2?'²':'³'}`;answer=a**p;break;}
    case 'signedLine': {
      const start=-rnd(3,8), mark=rnd(1,5);answer=start+mark;instruction='missing';
      let body=worksheetLine(33,98,287,98);
      for(let i=0;i<7;i++)body+=worksheetLine(40+40*i,91,40+40*i,105)+dimension(40+40*i,134,i===mark?'▲':start+i);
      visual=worksheetDiagram(body);break;
    }
    case 'shadeCells': {
      const den=pick(scale===1?[2,4]:[3,4,5,6]),num=scale===1?1:rnd(1,den-1),groups=scale===1?1:2;
      answer=num*groups;instruction=key;values=['⁦'+num+'/'+den+'⁩'];
      visual={kind:'shadeCells',cells:den*groups,columns:den};break;
    }
    case 'shaded': {
      const den=pick(scale===1?[2,4]:[3,4,5,6,8,10]),rows=den%2===0?2:1;
      answer=scale===1?1:rnd(1,den-1);instruction='shaded';values=[den];
      visual=worksheetGrid(den/rows,rows,()=>'', '',(r,c)=>r*(den/rows)+c<answer);break;
    }
    case 'compareFractions': {
      const d=rnd(2,7), flip=rnd(0,1);
      const pair=flip?[d,d+1]:[d+1,d];
      const num=scale===2?1:rnd(1,d-1);
      math=`(1)  ${num}/${pair[0]}      (2)  ${num}/${pair[1]}`;answer=flip?1:2;instruction=key;break;
    }
    case 'hundreds': {
      const x=rnd(1,8),y=rnd(1,10-x);
      math=`${100*(cat==='sub'?x+y:x)} ${operationSigns[cat]} ${100*y}`;answer=100*(cat==='sub'?x:x+y);break;
    }
    case 'common': {
      const [d,e,l]=pick([[4,6,12],[6,9,18],[8,12,24],[3,5,15],[4,10,20]]);
      math=`1/${d}    ;    1/${e}`;answer=l;instruction='common';break;
    }
    case 'mixed':math=`${a} + 1/${b} = ▲/${b}`;answer=a*b+1;instruction='numerator';break;
    case 'reduce':math=`${a*(b-1)}/${a*b} = ▲/${b}`;answer=b-1;instruction='numerator';break;
    case 'wholeTimes':math=`${a} × 1/${b} = ▲/${b}`;answer=a;instruction='numerator';break;
    case 'wholeFromPart':math=`2/${b+1} × ▲ = ${2*a}`;answer=(b+1)*a;instruction='missing';break;
    case 'tenths':math=`${a*10+b}/10 = ▲`;answer=a+b/10;instruction='missing';break;
    case 'decimalProduct':math=`${a}.5 × 0.${b}`;answer=(10*a+5)*b/100;break;
    case 'decimalDivide':math=`${(a*b/10).toFixed(1)} ÷ 0.${b}`;answer=a;break;
    case 'decimalRound':math=`${a}.${b}${a} → 0.1`;answer=Math.round((100*a+10*b+a)/10)/10;instruction='round';break;
    case 'decimalSeq':math=[a/10,(a+b)/10,'▲',(a+3*b)/10].join(', ');answer=(a+2*b)/10;instruction='missing';break;
    case 'time':case 'mass':case 'capacity':case 'areaUnits': {
      const [unit,target,multiplier]={time:['h','min',60],mass:['kg','g',1000],capacity:['L','mL',1000],areaUnits:['m²','cm²',10000]}[key];
      const n=scale===5?a/4:a;
      math=`${n} ${unit} = ▲ ${target}`;answer=n*multiplier;instruction='missing';break;
    }
    case 'recipe': case 'rate': {
      const batch=rnd(2,6),size=key==='recipe'?25*a:b,desired=batch+rnd(1,8);
      values=key==='recipe'?[batch,batch*size,desired]:[batch*size,batch,desired];
      instruction=key;answer=size*desired;break;
    }
    case 'currency': values=[pick([3.5,4,4.5]),5*a];answer=values[0]*values[1];instruction=key;break;
    case 'calendar':values=[a,b];instruction=key;answer=7*a+b;break;
    case 'corners':case 'diagonal':case 'symmetry': {
      const n=rnd(3,key==='corners'&&scale===0?6:8);
      visual=worksheetPolygon(n,key==='diagonal');answer=key==='diagonal'?n-3:n;instruction=key;break;
    }
    case 'rightAngles':case 'classifyAngle': {
      const angles=worksheetShuffle([rnd(30,65),90,rnd(115,148)]);
      const type=rnd(0,2),term=[['חדה','acute','острый','حادة','aigu','гострий'],['ישרה','right','прямой','قائمة','droit','прямий'],['קהה','obtuse','тупой','منفرجة','obtus','тупий']][key==='rightAngles'?1:type];
      const i=key==='rightAngles'?1:type;answer=angles.indexOf([...angles].sort((x,y)=>x-y)[i])+1;
      instruction='angle';values=[term];
      visual=worksheetDiagram(angles.map((deg,j)=>{const x=48+103*j,t=deg*Math.PI/180;return worksheetLine(x,115,x+42,115)+worksheetLine(x,115,x+42*Math.cos(t),115-42*Math.sin(t))+dimension(x+8,152,j+1);}).join(''));break;
    }
    case 'height': {
      const xs=worksheetShuffle([95,155,211]);answer=xs.indexOf(155)+1;
      visual=worksheetDiagram(outline('M48 153L155 42L272 153Z')+worksheetLine(48,153,272,153,'#c65e23',5)+xs.map((x,i)=>worksheetLine(155,42,x,153)+dimension(x,180,i+1)).join(''));instruction=key;break;
    }
    case 'faces': {
      const pyramid=rnd(0,1);
      visual=pyramid?worksheetDiagram(outline('M52 135L168 166L260 122L148 96Z')+outline('M52 135L155 34L260 122M155 34L168 166')+worksheetLine(155,34,148,96)):solidVariant(a,b,3);
      answer=pyramid?5:6;instruction=key;break;
    }
    case 'tiles': {const w=rnd(2,6),h=rnd(2,4);visual=worksheetGrid(w,h,()=>'', '');answer=w*h;instruction='area';break;}
    case 'perimeter': {const v=rectangleVariant(a,b,'perimeter');visual=v[3];answer=v[2];instruction='perimeter';break;}
    case 'trapezoid': {
      const top=a,bottom=a+2*b,h=rnd(2,8);answer=(a+b)*h;
      visual=worksheetDiagram(outline('M42 150H275L215 57H100Z')+worksheetLine(100,57,100,150)+dimension(159,42,top)+dimension(160,180,bottom)+dimension(119,111,h));instruction='area';break;
    }
    case 'cone':case 'cylinder':case 'surface': {
      const h=3*b;answer=key==='surface'?2*a*(a+h):a*a*(key==='cone'?b:h);
      const body=key==='cone'?outline('M76 145L160 36L244 145'):outline('M76 145V50M244 145V50')+'<ellipse cx="160" cy="50" rx="84" ry="18" fill="none" stroke="#51669b" stroke-width="3"/>';
      visual=worksheetDiagram(body+'<ellipse cx="160" cy="145" rx="84" ry="18" fill="none" stroke="#51669b" stroke-width="3"/>'+worksheetLine(160,145,244,145)+dimension(203,138,a)+worksheetLine(160,145,160,key==='cone'?36:50)+dimension(141,104,h));instruction=key;break;
    }
    case 'average':case 'median':case 'mode': {
      const numbers=key==='mode'?[a,a,a+b,a+b+2,a+b+3]:[a,a+b,a+2*b,a+3*b,a+4*b];
      math=worksheetShuffle(numbers).join(', ');answer=key==='mode'?a:a+2*b;instruction=key==='average'?'mean':key;break;
    }
    case 'roman': {
      answer=rnd(1,39);math='X'.repeat(Math.floor(answer/10))+['','I','II','III','IV','V','VI','VII','VIII','IX'][answer%10];instruction=key;break;
    }
    default: throw new Error('Unknown worksheet skill '+key);
  }
  const prompts=worksheetPrompts[instruction]?.split('|')||variantInstructions[instruction];
  const texts=prompts.map((prompt,i)=>{
    if(instruction==='names')return prompt+' '+values[0][i];
    const filled=prompt.replace(/[#@%]/g,token=>{
      const v=values['#@%'.indexOf(token)];return Array.isArray(v)?v[i]:v??token;
    });
    return math?filled+'\n⁦'+math+'⁩':filled;
  });
  return {type:'num',grade,cat,diff,text:texts[0],localized:texts.slice(1,4),extraLocalizations:{fr:texts[4],uk:texts[5]},
    answer,visual,...(fraction?{fraction}:{}),diagramUnknown:Boolean(visual && ['board20','board50','board100','table','signedLine','percentTable'].includes(key)),variantKey:cat+':'+key,pts:ptsForQ(cat,diff),hint:{type:'text',msg:variantHint[0]}};
}

// Keep skill titles short enough to scan on a phone in each supported language.
const worksheetTitles={
 count:'ספירה|Counting|Счёт|العدّ|Dénombrer|Лічба',
 hundreds:'מאות שלמות|Whole hundreds|Круглые сотни|المئات الكاملة|Centaines entières|Круглі сотні',
 board:'לוח המספרים|Number grid|Числовая таблица|لوحة الأعداد|Tableau des nombres|Числова таблиця',
 names:'שמות המספרים|Number names|Названия чисел|أسماء الأعداد|Noms des nombres|Назви чисел',
 even:'זוגי ואי־זוגי|Even and odd|Чётные и нечётные|زوجي وفردي|Pairs et impairs|Парні й непарні',
 gematria:'גימטרייה|Hebrew numerals|Еврейские числа|الأرقام العبرية|Numération hébraïque|Єврейські числа',
 column:'חישוב במאונך|Column arithmetic|Вычисления столбиком|الحساب العمودي|Calcul posé|Обчислення стовпчиком',
 table:'לוח הכפל|Multiplication grid|Таблица умножения|جدول الضرب|Table de multiplication|Таблиця множення',
 clock:'קריאת שעון|Reading a clock|Чтение часов|قراءة الساعة|Lire l’heure|Читання годинника',
 shaded:'שברים בצורות|Shaded fractions|Доли фигуры|كسور بالأشكال|Fractions coloriées|Частини фігури',
 quotient:'חילוק ארוך|Long division|Деление столбиком|القسمة المطوّلة|Division posée|Ділення стовпчиком',
 shift:'כפל בעשרות ובמאות|Multiplying by 10 and 100|Умножение на 10 и 100|الضرب في 10 و100|Multiplier par 10 et 100|Множення на 10 і 100',
 fractionSum:'חיבור שברים|Adding fractions|Сложение дробей|جمع الكسور|Addition de fractions|Додавання дробів',
 fractionDifference:'חיסור שברים|Subtracting fractions|Вычитание дробей|طرح الكسور|Soustraction de fractions|Віднімання дробів',
 mixed:'מספרים מעורבים|Mixed numbers|Смешанные числа|الأعداد الكسرية|Nombres mixtes|Мішані числа',
 reduce:'צמצום שברים|Simplifying fractions|Сокращение дробей|اختزال الكسور|Simplifier des fractions|Скорочення дробів',
 wholeTimes:'כפל שבר בשלם|Fractions times whole numbers|Умножение дроби на целое|ضرب كسر في عدد صحيح|Multiplier par un entier|Множення дробу на ціле',
 tenths:'משבר פשוט לעשרוני|Fractions to decimals|Из дроби в десятичную запись|من الكسر إلى العدد العشري|Fractions et décimaux|Перехід до десяткових дробів',
 decimalProduct:'כפל עשרוניים|Decimal multiplication|Умножение десятичных дробей|ضرب الأعداد العشرية|Multiplier des décimaux|Множення десяткових дробів',
 decimalDivide:'חילוק עשרוניים|Decimal division|Деление десятичных дробей|قسمة الأعداد العشرية|Diviser des décimaux|Ділення десяткових дробів',
 decimalRound:'עיגול לעשיריות|Rounding to tenths|Округление до десятых|التقريب إلى الأعشار|Arrondir au dixième|Округлення до десятих',
 power:'חזקות|Powers|Степени|القوى|Puissances|Степені',
 signedLine:'מספרים שליליים על הישר|Negatives on a number line|Отрицательные числа на прямой|الأعداد السالبة على المستقيم|Nombres négatifs sur une droite|Від’ємні числа на прямій',
 trapezoid:'שטח טרפז|Area of a trapezoid|Площадь трапеции|مساحة شبه المنحرف|Aire du trapèze|Площа трапеції',
 mass:'יחידות מסה|Units of mass|Единицы массы|وحدات الكتلة|Unités de masse|Одиниці маси',
 capacity:'יחידות קיבול|Units of capacity|Единицы вместимости|وحدات السعة|Unités de capacité|Одиниці місткості',
 time:'יחידות זמן|Units of time|Единицы времени|وحدات الزمن|Unités de temps|Одиниці часу',
 areaUnits:'יחידות שטח|Area units|Единицы площади|وحدات المساحة|Unités d’aire|Одиниці площі',
 fractionDivision:'חילוק שברים|Dividing fractions|Деление дробей|قسمة الكسور|Division de fractions|Ділення дробів',
 wholeFromPart:'מציאת השלם לפי החלק|Finding the whole|Нахождение целого по части|إيجاد الكل من الجزء|Retrouver le tout|Знаходження цілого за частиною'
};
for(const row of Object.values(worksheetTitles)){
  const [he,...others]=row.split('|'); uiTranslations.set(he,others);
}

function worksheetChoices(grade,cat){
  const keys=worksheetGrades[grade]?.[cat];
  if(!keys)return [];
  const choices=[];
  for(const [index,key] of keys.split(' ').entries()){
    if(key==='operation'){
      curriculumDifficulties.forEach((diff,i)=>{
        const label=cat==='mul'?'גורמים עד':cat==='div'?'מחלק ומנה עד':'מספרים עד';
        choices.push({diff,label,limit:operationLimit(grade,cat,i),make:()=>operationQuestion(grade,cat,diff)});
      });
      continue;
    }
    if(key==='unknown'){
      missingOps(grade).forEach((op,i)=>{
        const diff=curriculumDifficulties[Math.min(i,2)];
        choices.push({label:operationNames[op],diff,make:()=>operationQuestion(grade,cat,diff,op)});
      });
      continue;
    }
    const source=/^([cv])(\d+)$/.exec(key);
    const level=source?Math.min(2,Number(source[2])):Math.min(index,2);
    const diff=curriculumDifficulties[level];
    const band=/^(count|names|board)(\d+)$/.exec(key);
    const label=worksheetTitles[band?.[1]||key]?.split('|')[0];
    let make=()=>worksheetProblem(grade,cat,diff,key);
    if(source?.[1]==='c') make=()=>curriculumQuestion(grade,cat,diff);
    if(source?.[1]==='v') make=()=>makeQuestionVariant(grade,cat,diff,Number(source[2]));
    choices.push({label,limit:band?(key==='names20'?'11–20':('1–'+band[2])):undefined,diff,make});
  }
  return choices;
}

function worksheetQuestion(grade,cat,diff){
  const options=worksheetChoices(grade,cat);
  const matching=options.filter(choice=>choice.diff===diff);
  const q=pick(matching.length?matching:options).make();
  return {...q,diff,pts:ptsForQ(cat,diff)};
}
