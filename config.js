// ══ GAME CONFIG ══
let cfg = {
  ptsEasy:5, ptsMed:10, ptsHard:18, ptsWordBonus:8,
  ptsWrong:1, ptsHint:2, maxAttempts:3, hintTime:180,
  streakBonus3:5, streakBonus5:10, streakBonus10:20
};

let st = {
  score:0, level:0, xp:0, streak:0, maxStreak:0,
  learnedTopics:[], dailyDone:false, dailyDate:'', history:[],
  examTopics:['add','sub','mul'], examDiff:'mix',
  totalSolved:0, correctCount:0,
  specialGlowColor:null, specialBadgeColor:null
};

let qs = {
  pool:[], idx:0, cat:'add', diff:'easy',
  current:null, attempts:0, hintUsed:false,
  hintSecs:180, hintInterval:null,
  isDaily:false, isDailyIdx:0, isMistakes:false,
  isExam:false, examPool:[], examIdx:0,
  examScore:0, examTimer:null, examSecs:600, done:false
};

window.st  = st;
window.cfg = cfg;

const LEVELS = [
  { n:'מתמטיקאי מתחיל', xp:50,       e:'🌱' },
  { n:'סוחר המספרים',   xp:120,      e:'📊' },
  { n:'גיבור חשבון',    xp:250,      e:'⚡' },
  { n:'קוסם המספרים',   xp:450,      e:'🔮' },
  { n:'אלוף חשבון',     xp:700,      e:'🏆' },
  { n:'מייסטרו מתמטיקה',xp:1000,     e:'🌟' },
  { n:'אגדת המספרים',   xp:1400,     e:'💫' },
  { n:'לאינסוף ומעבר!', xp:Infinity, e:'🚀' }
];

const GRADE_FILES = {
  'א':'grade1.js','ב':'grade2.js','ג':'grade3.js',
  'ד':'grade4.js','ה':'grade5.js','ו':'grade6.js'
};

// ══ CATEGORY DEFINITIONS ══
const ALL_CATS = [
  // ── חשבון ──
  { id:'add',             cls:'add',      icon:'➕', name:'חיבור',              sub:'מספרים גדולים' },
  { id:'sub',             cls:'sub',      icon:'➖', name:'חיסור',              sub:'עם ובלי לווה' },
  { id:'mul',             cls:'mul',      icon:'✖️', name:'כפל',                sub:'לוח הכפל' },
  { id:'div',             cls:'div',      icon:'➗', name:'חילוק',              sub:'חלוקה שווה' },
  { id:'word',            cls:'word',     icon:'📖', name:'מילוליות',           sub:'בעיות עם סיפור' },
  { id:'fractions',       cls:'',         icon:'½',  name:'שברים',              sub:'חלקים של שלם',              borderColor:'#54a0ff' },
  { id:'fractions_intro', cls:'',         icon:'½',  name:'שברים (מבוא)',       sub:'½ ¼ ¾ — חלקים ראשוניים',  borderColor:'#74b9ff' },

  // ── מספרים מתקדמים ──
  { id:'percentages',     cls:'',         icon:'💯', name:'אחוזים',             sub:'חלקים מתוך 100',           borderColor:'#fd79a8' },
  { id:'ratio',           cls:'',         icon:'⚖️', name:'יחס ופרופורציה',     sub:'יחס בין כמויות',           borderColor:'#e17055' },
  { id:'negative_numbers',cls:'',         icon:'➖', name:'מספרים שליליים',     sub:'מתחת לאפס',                borderColor:'#636e72' },
  { id:'order_of_ops',    cls:'',         icon:'🔢', name:'סדר פעולות',         sub:'כפל לפני חיבור',           borderColor:'#a29bfe' },

  // ── גיאומטריה ──
  { id:'shapes',          cls:'',         icon:'📐', name:'גיאומטריה',          sub:'צורות אינטראקטיביות',      borderColor:'#ff9ff3' },
  { id:'shapes2d',        cls:'',         icon:'🔷', name:'צורות 2D',            sub:'זיהוי וספירת צלעות',       borderColor:'#a29bfe' },
  { id:'symmetry',        cls:'',         icon:'🔁', name:'סימטריה',            sub:'צירי סימטריה',             borderColor:'#fd79a8' },
  { id:'perimeter',       cls:'',         icon:'📏', name:'היקף',               sub:'סכום כל הצלעות',           borderColor:'#00cec9' },
  { id:'area',            cls:'',         icon:'📐', name:'שטח',                sub:'שטח צורות שונות',          borderColor:'#6c5ce7' },
  { id:'angles',          cls:'',         icon:'📐', name:'זוויות',             sub:'חדה, ישרה, קהה',           borderColor:'#fdcb6e' },
  { id:'shapes3d',        cls:'',         icon:'🧊', name:'גופים 3D',            sub:'פנים, קצוות, קודקודים',   borderColor:'#74b9ff' },
  { id:'coordinates',     cls:'',         icon:'🗺️', name:'קואורדינטות',        sub:'נקודות על הצירים',         borderColor:'#55efc4' },
  { id:'volume3d',        cls:'',         icon:'🧊', name:'נפח',                sub:'נפח קוביות וגלילים',       borderColor:'#0984e3' },

  // ── יישומי חיים ──
  { id:'measurement',     cls:'',         icon:'📏', name:'מדידה',              sub:'אורך, משקל, זמן, נפח',    borderColor:'#fab1a0' },
  { id:'time',            cls:'',         icon:'⏰', name:'זמן',                sub:'שעות, דקות, חישובים',     borderColor:'#fdcb6e' },
  { id:'money',           cls:'',         icon:'💰', name:'כסף',                sub:'חישובי כסף ועסקים',       borderColor:'#55efc4' },
  { id:'speed',           cls:'',         icon:'🚗', name:'מהירות-זמן-מרחק',   sub:'מהירות, זמן, מרחק',       borderColor:'#e17055' },
  { id:'data',            cls:'',         icon:'📊', name:'נתונים וסטטיסטיקה',  sub:'ממוצע, חציון, טווח',      borderColor:'#6c5ce7' },

  // ── ספירה ודפוסים ──
  { id:'counting',        cls:'',         icon:'🔢', name:'ספירה',              sub:'ספירה וסדרות',             borderColor:'#2ed573' },
  { id:'compare',         cls:'',         icon:'⚖️', name:'השוואה',             sub:'גדול, קטן, הפרש',         borderColor:'#1e90ff' },
  { id:'patterns1',       cls:'',         icon:'🔄', name:'דפוסים וסדרות',      sub:'מה יבוא אחר כך?',         borderColor:'#ff6348' },

  // ── מיוחד ──
  { id:'minigames',       cls:'mul',      icon:'🎮', name:'מיני-משחקים',        sub:'דיג, מבוך, חלל',          borderColor:'#ffd43b', special:'minigames' },
  { id:'learn',           cls:'learn',    icon:'🎓', name:'בואו נלמד!',         sub:'חומר חדש',                 special:'learn' },
  { id:'history',         cls:'history',  icon:'📊', name:'היסטוריה',           sub:'כל הפתרונות',              special:'history' },
  { id:'mistakes',        cls:'mistakes', icon:'🔄', name:'טעויות',             sub:'שיפור עצמי',               special:'mistakes' },
  { id:'exam',            cls:'test',     icon:'🏆', name:'מבחן',               sub:'בחר נושאים',               special:'exam' },
  { id:'friends',         cls:'',         icon:'👥', name:'חברים',              sub:'לוח תוצאות',               borderColor:'#2ed573', special:'friends' },
  { id:'settings',        cls:'settings', icon:'⚙️', name:'הגדרות',             sub:'הורים',                    special:'settings' },
];

const CAT_NAMES = {
  add:'➕ חיבור', sub:'➖ חיסור', mul:'✖️ כפל', div:'➗ חילוק',
  word:'📖 מילוליות', fractions:'½ שברים', fractions_intro:'½ שברים',
  percentages:'💯 אחוזים', ratio:'⚖️ יחס ופרופורציה',
  negative_numbers:'➖ מספרים שליליים', order_of_ops:'🔢 סדר פעולות',
  shapes:'📐 גיאומטריה', shapes2d:'🔷 צורות 2D', symmetry:'🔁 סימטריה',
  perimeter:'📏 היקף', area:'📐 שטח', angles:'📐 זוויות',
  shapes3d:'🧊 גופים 3D', coordinates:'🗺️ קואורדינטות', volume3d:'🧊 נפח',
  measurement:'📏 מדידה', time:'⏰ זמן', money:'💰 כסף',
  speed:'🚗 מהירות-זמן-מרחק', data:'📊 נתונים וסטטיסטיקה',
  counting:'🔢 ספירה', compare:'⚖️ השוואה', patterns1:'🔄 דפוסים',
};

const LOCKED_TOPICS = {
  div:'division', shapes:'shapes', fractions:'fractions',
};

// ══ BRAINROT / GAME THEMES ══
const BRAINROT_LABELS = [
  'תרגיל הבריינרוט','הסיגמה של המתמטיקה',
  'ריצה W','לא L','פתרון הגיוסי','מבחן הסקיבידי','המצב גריז'
];

const GAME_THEMES = [
  { name:'מיינקראפט', items:['⛏️','💎','🪨','🌲','🔥','🐷','🧱'], label:'⛏️ מיינקראפט' },
  { name:'רובלוקס',   items:['🎮','🏗️','🤖','🎲','💰','🌈','🎯'], label:'🎮 רובלוקס' },
  { name:'פוקימון',   items:['⚡','🔥','💧','🌿','👾','🌀','💥'], label:'⚡ פוקימון' },
  { name:'מריו',      items:['🍄','⭐','🪙','🎯','🌟','🎪','🚩'], label:'🍄 מריו' },
  { name:'פורטנייט',  items:['🏆','💥','🔫','🎯','⭐','🌟','🏅'], label:'🏆 פורטנייט' },
  { name:'כדורגל',    items:['⚽','🏃','🥅','🏅','🎯','⭐','🌟'], label:'⚽ כדורגל' },
  { name:'חייזרים',   items:['👾','🛸','🌌','⭐','💫','🔭','🚀'], label:'👾 חייזרים' }
];

const THEME_LOOT = {
  'מיינקראפט':['יהלומים','גוש אבן','עצי עץ','קוביות זהב'],
  'רובלוקס':  ['רובוקסים','בניות','כלי נשק','מטבעות'],
  'פוקימון':  ['כרטיסי פוקימון','פוקיבולים','תגים','מדליות'],
  'מריו':     ['מטבעות','פטריות','כוכבים','מפתחות'],
  'פורטנייט': ['חומרי בנייה','נשקים','תחמושת','ניצחונות'],
  'כדורגל':   ['שערים','כרטיסים','ניקוד','כרטיסי שחקן'],
  'חייזרים':  ['ספינות','לייזרים','כוכבים','תחנות חלל']
};
