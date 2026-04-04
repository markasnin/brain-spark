// ══ GAME CONFIG ══
let cfg = {
  ptsEasy:5,ptsMed:10,ptsHard:18,ptsWordBonus:8,
  ptsWrong:1,ptsHint:2,maxAttempts:3,hintTime:180,
  streakBonus3:5,streakBonus5:10,streakBonus10:20
};
let st = {
  score:0,level:0,xp:0,streak:0,maxStreak:0,
  learnedTopics:[],dailyDone:false,dailyDate:'',history:[],
  examTopics:['add','sub','mul'],examDiff:'mix',
  totalSolved:0,correctCount:0,
  specialGlowColor:null,specialBadgeColor:null
};
let qs = {
  pool:[],idx:0,cat:'add',diff:'easy',
  current:null,attempts:0,hintUsed:false,
  hintSecs:180,hintInterval:null,
  isDaily:false,isDailyIdx:0,isMistakes:false,
  isExam:false,examPool:[],examIdx:0,
  examScore:0,examTimer:null,examSecs:600,done:false
};
window.st=st; window.cfg=cfg;

const LEVELS=[
  {n:'מתמטיקאי מתחיל',xp:50,e:'🌱'},{n:'סוחר המספרים',xp:120,e:'📊'},
  {n:'גיבור חשבון',xp:250,e:'⚡'},{n:'קוסם המספרים',xp:450,e:'🔮'},
  {n:'אלוף חשבון',xp:700,e:'🏆'},{n:'מייסטרו מתמטיקה',xp:1000,e:'🌟'},
  {n:'אגדת המספרים',xp:1400,e:'💫'},{n:'לאינסוף ומעבר!',xp:Infinity,e:'🚀'}
];
const GRADE_FILES={'א':'grade1.js','ב':'grade2.js','ג':'grade3.js','ד':'grade4.js','ה':'grade5.js','ו':'grade6.js'};

// ══ CATEGORY DEFINITIONS ══
const ALL_CATS = [
  // ── כיתה א ──
  { id:'evens',           cls:'',         icon:'🔢', name:'מספרים וזוגיות',      sub:'זוגי, אי-זוגי, עוקב',    borderColor:'#2ed573' },
  // ── כיתה ב ──
  { id:'fractions_half',  cls:'',         icon:'½',  name:'חצי ורבע',            sub:'½ ¼ ללא סמלים',          borderColor:'#74b9ff' },
  // ── כיתה ג ──
  { id:'fractions_unit',  cls:'',         icon:'⅓',  name:'שברי יחידה',          sub:'½ ⅓ ¼ חלק של כמות',     borderColor:'#a29bfe' },
  { id:'rounding',        cls:'',         icon:'🔢', name:'עיגול ואומדן',         sub:'עיגול לעשרה/מאה',       borderColor:'#fdcb6e' },
  // ── כיתה ד ──
  { id:'decimal_intro',   cls:'',         icon:'🔢', name:'שברים עשרוניים',       sub:'עשיריות ומאיות',        borderColor:'#00cec9' },
  // ── כיתה ה ──
  { id:'decimals',        cls:'',         icon:'🔢', name:'שברים עשרוניים',       sub:'חיבור, חיסור, השוואה',  borderColor:'#00cec9' },
  { id:'percentages_intro',cls:'',        icon:'💯', name:'אחוזים — מבוא',        sub:'היכרות ראשונה',         borderColor:'#fd79a8' },
  // ── כיתה ו ──
  { id:'fractions_mul',   cls:'',         icon:'½',  name:'כפל שברים',            sub:'שבר × שבר',             borderColor:'#54a0ff' },
  { id:'fractions_div',   cls:'',         icon:'½',  name:'חילוק שברים',          sub:'הפוך וכפול',            borderColor:'#6c5ce7' },
  { id:'fractions_part',  cls:'',         icon:'½',  name:'חלק של כמות',          sub:'מציאת חלק וכמות בסיסית',borderColor:'#a29bfe' },
  { id:'decimals_mul',    cls:'',         icon:'🔢', name:'כפל/חילוק עשרוניים',   sub:'×10, ×100, ×שבר',       borderColor:'#00b894' },
  { id:'percentages',     cls:'',         icon:'💯', name:'אחוזים',               sub:'ערך האחוז + חישוב האחוז',borderColor:'#fd79a8' },
  { id:'ratio',           cls:'',         icon:'⚖️', name:'יחס',                  sub:'חלוקת כמות לפי יחס',    borderColor:'#e17055' },
  { id:'integers_intro',  cls:'',         icon:'➖', name:'מספרים שלמים',         sub:'שליליים על ישר המספרים', borderColor:'#636e72' },
  { id:'volume',          cls:'',         icon:'🧊', name:'נפח',                  sub:'תיבה, גליל',            borderColor:'#0984e3' },
  { id:'circle',          cls:'',         icon:'⭕', name:'מעגל',                 sub:'היקף ושטח',             borderColor:'#e84393' },
  { id:'scale',           cls:'',         icon:'🗺️', name:'קנה מידה',             sub:'מרחק מפה ↔ מציאות',    borderColor:'#55efc4' },
  // ── כל כיתה ──
  { id:'add',             cls:'add',      icon:'➕', name:'חיבור',               sub:'מספרים' },
  { id:'sub',             cls:'sub',      icon:'➖', name:'חיסור',               sub:'עם ובלי לווה' },
  { id:'mul',             cls:'mul',      icon:'✖️', name:'כפל',                 sub:'לוח הכפל' },
  { id:'div',             cls:'div',      icon:'➗', name:'חילוק',               sub:'חלוקה שווה' },
  { id:'word',            cls:'word',     icon:'📖', name:'מילוליות',            sub:'בעיות עם סיפור' },
  { id:'fractions',       cls:'',         icon:'½',  name:'שברים',               sub:'חלקים של שלם',           borderColor:'#54a0ff' },
  { id:'shapes',          cls:'',         icon:'📐', name:'גיאומטריה',           sub:'צורות אינטראקטיביות',    borderColor:'#ff9ff3' },
  { id:'shapes2d',        cls:'',         icon:'🔷', name:'צורות 2D',             sub:'זיהוי וספירת צלעות',    borderColor:'#a29bfe' },
  { id:'angles',          cls:'',         icon:'📐', name:'זוויות',              sub:'חדה, ישרה, קהה',         borderColor:'#fdcb6e' },
  { id:'perimeter',       cls:'',         icon:'📏', name:'היקף',                sub:'סכום כל הצלעות',        borderColor:'#00cec9' },
  { id:'area',            cls:'',         icon:'📐', name:'שטח',                 sub:'שטח צורות',             borderColor:'#6c5ce7' },
  { id:'shapes3d',        cls:'',         icon:'🧊', name:'גופים',               sub:'פנים, קצוות, קודקודים', borderColor:'#74b9ff' },
  { id:'measurement',     cls:'',         icon:'📏', name:'מדידה',               sub:'אורך, משקל, זמן, נפח',  borderColor:'#fab1a0' },
  { id:'data',            cls:'',         icon:'📊', name:'חקר נתונים',          sub:'ממוצע, גרף, טווח',      borderColor:'#6c5ce7' },
  // ── מיוחד ──
  { id:'minigames', cls:'mul',     icon:'🎮', name:'מיני-משחקים',  sub:'דיג, מבוך, חלל',  borderColor:'#ffd43b',special:'minigames' },
  { id:'learn',     cls:'learn',   icon:'📚', name:'תזכורת',        sub:'חוקים ונוסחאות',   special:'learn' },
  { id:'history',   cls:'history', icon:'📊', name:'היסטוריה',     sub:'כל הפתרונות',      special:'history' },
  { id:'mistakes',  cls:'mistakes',icon:'🔄', name:'טעויות',       sub:'שיפור עצמי',       special:'mistakes' },
  { id:'exam',      cls:'test',    icon:'🏆', name:'מבחן',         sub:'בחר נושאים',       special:'exam' },
  { id:'friends',   cls:'',        icon:'👥', name:'חברים',        sub:'לוח תוצאות',       borderColor:'#2ed573',special:'friends' },
  { id:'settings',  cls:'settings',icon:'⚙️', name:'הגדרות',       sub:'הורים',            special:'settings' },
];

const CAT_NAMES = {
  add:'➕ חיבור',sub:'➖ חיסור',mul:'✖️ כפל',div:'➗ חילוק',
  word:'📖 מילוליות',fractions:'½ שברים',shapes:'📐 גיאומטריה',
  shapes2d:'🔷 צורות 2D',angles:'📐 זוויות',perimeter:'📏 היקף',area:'📐 שטח',
  shapes3d:'🧊 גופים',measurement:'📏 מדידה',data:'📊 נתונים',
  evens:'🔢 מספרים וזוגיות',rounding:'🔢 עיגול',
  fractions_half:'½ חצי ורבע',fractions_unit:'⅓ שברי יחידה',
  decimal_intro:'🔢 שברים עשרוניים',decimals:'🔢 שברים עשרוניים',
  percentages_intro:'💯 אחוזים (מבוא)',percentages:'💯 אחוזים',
  fractions_mul:'½ כפל שברים',fractions_div:'½ חילוק שברים',
  fractions_part:'½ חלק של כמות',decimals_mul:'🔢 כפל עשרוניים',
  ratio:'⚖️ יחס',integers_intro:'➖ מספרים שלמים',
  volume:'🧊 נפח',circle:'⭕ מעגל',scale:'🗺️ קנה מידה',
};

const LOCKED_TOPICS={div:'division',shapes:'shapes',fractions:'fractions'};

const BRAINROT_LABELS=['תרגיל הבריינרוט','הסיגמה של המתמטיקה','ריצה W','לא L','פתרון הגיוסי','מבחן הסקיבידי','המצב גריז'];

const GAME_THEMES=[
  {name:'מיינקראפט',items:['⛏️','💎','🪨','🌲','🔥','🐷','🧱'],label:'⛏️ מיינקראפט'},
  {name:'רובלוקס',  items:['🎮','🏗️','🤖','🎲','💰','🌈','🎯'],label:'🎮 רובלוקס'},
  {name:'פוקימון',  items:['⚡','🔥','💧','🌿','👾','🌀','💥'],label:'⚡ פוקימון'},
  {name:'מריו',     items:['🍄','⭐','🪙','🎯','🌟','🎪','🚩'],label:'🍄 מריו'},
  {name:'פורטנייט', items:['🏆','💥','🔫','🎯','⭐','🌟','🏅'],label:'🏆 פורטנייט'},
  {name:'כדורגל',   items:['⚽','🏃','🥅','🏅','🎯','⭐','🌟'],label:'⚽ כדורגל'},
  {name:'חייזרים',  items:['👾','🛸','🌌','⭐','💫','🔭','🚀'],label:'👾 חייזרים'}
];
const THEME_LOOT={
  'מיינקראפט':['יהלומים','גוש אבן','עצי עץ','קוביות זהב'],
  'רובלוקס':['רובוקסים','בניות','כלי נשק','מטבעות'],
  'פוקימון':['כרטיסי פוקימון','פוקיבולים','תגים','מדליות'],
  'מריו':['מטבעות','פטריות','כוכבים','מפתחות'],
  'פורטנייט':['חומרי בנייה','נשקים','תחמושת','ניצחונות'],
  'כדורגל':['שערים','כרטיסים','ניקוד','כרטיסי שחקן'],
  'חייזרים':['ספינות','לייזרים','כוכבים','תחנות חלל']
};
