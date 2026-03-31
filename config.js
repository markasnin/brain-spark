// ══ GAME CONFIG ══
// Default point values, streak bonuses, etc.
// These are overridden by per-user settings saved in Firestore.

let cfg = {
  ptsEasy: 5,
  ptsMed: 10,
  ptsHard: 18,
  ptsWordBonus: 8,
  ptsWrong: 1,
  ptsHint: 2,
  maxAttempts: 3,
  hintTime: 180,
  streakBonus3: 5,
  streakBonus5: 10,
  streakBonus10: 20
};

// ══ PLAYER STATE ══
let st = {
  score: 0,
  level: 0,
  xp: 0,
  streak: 0,
  maxStreak: 0,
  learnedTopics: [],
  dailyDone: false,
  dailyDate: '',
  history: [],
  examTopics: ['add', 'sub', 'mul'],
  examDiff: 'mix',
  totalSolved: 0,
  correctCount: 0,
  specialGlowColor: null,
  specialBadgeColor: null
};

// ══ QUESTION SESSION STATE ══
let qs = {
  pool: [], idx: 0, cat: 'add', diff: 'easy',
  current: null, attempts: 0, hintUsed: false,
  hintSecs: 180, hintInterval: null,
  isDaily: false, isDailyIdx: 0,
  isMistakes: false,
  isExam: false, examPool: [], examIdx: 0,
  examScore: 0, examTimer: null, examSecs: 600,
  done: false
};

// ══ LEVELS ══
const LEVELS = [
  { n: 'מתמטיקאי מתחיל', xp: 50,       e: '🌱' },
  { n: 'סוחר המספרים',   xp: 120,      e: '📊' },
  { n: 'גיבור חשבון',    xp: 250,      e: '⚡' },
  { n: 'קוסם המספרים',   xp: 450,      e: '🔮' },
  { n: 'אלוף חשבון',     xp: 700,      e: '🏆' },
  { n: 'מייסטרו מתמטיקה',xp: 1000,     e: '🌟' },
  { n: 'אגדת המספרים',   xp: 1400,     e: '💫' },
  { n: 'לאינסוף ומעבר!', xp: Infinity, e: '🚀' }
];

// ══ GRADE FILE MAP ══
const GRADE_FILES = {
  'א': 'grade1.js',
  'ב': 'grade2.js',
  'ג': 'grade3.js',
  'ד': 'grade4.js',
  'ה': 'grade5.js',
  'ו': 'grade6.js'
};

// ══ CATEGORY DEFINITIONS ══
const ALL_CATS = [
  { id: 'add',      cls: 'add',     icon: '➕', name: 'חיבור',      sub: 'מספרים גדולים' },
  { id: 'sub',      cls: 'sub',     icon: '➖', name: 'חיסור',      sub: 'עם ובלי לווה' },
  { id: 'mul',      cls: 'mul',     icon: '✖️', name: 'כפל',        sub: 'לוח הכפל' },
  { id: 'div',      cls: 'div',     icon: '➗', name: 'חילוק',      sub: 'חלוקה שווה' },
  { id: 'word',     cls: 'word',    icon: '📖', name: 'מילוליות',   sub: 'בעיות עם סיפור' },
  { id: 'shapes',   cls: '',        icon: '📐', name: 'גיאומטריה', sub: 'צורות וצלעות',  borderColor: '#ff9ff3' },
  { id: 'fractions',cls: '',        icon: '½',  name: 'שברים',      sub: 'חלקים של שלם',  borderColor: '#54a0ff' },
  { id: 'learn',    cls: 'learn',   icon: '🎓', name: 'בואו נלמד!', sub: 'חומר חדש',      special: 'learn' },
  { id: 'history',  cls: 'history', icon: '📊', name: 'היסטוריה',   sub: 'כל הפתרונות',   special: 'history' },
  { id: 'mistakes', cls: 'mistakes',icon: '🔄', name: 'טעויות',     sub: 'שיפור עצמי',    special: 'mistakes' },
  { id: 'exam',     cls: 'test',    icon: '🏆', name: 'מבחן',       sub: 'בחר נושאים',    special: 'exam' },
  { id: 'friends',  cls: '',        icon: '👥', name: 'חברים',      sub: 'לוח תוצאות',    borderColor: '#2ed573', special: 'friends' },
  { id: 'settings', cls: 'settings',icon: '⚙️', name: 'הגדרות',     sub: 'הורים',          special: 'settings' },
];

const CAT_NAMES = {
  add: '➕ חיבור', sub: '➖ חיסור', mul: '✖️ כפל',
  div: '➗ חילוק', word: '📖 מילוליות',
  shapes: '📐 גיאומטריה', fractions: '½ שברים'
};

const LOCKED_TOPICS = { div: 'division', shapes: 'shapes', fractions: 'fractions' };

// ══ BRAINROT / GAME THEMES ══
const BRAINROT_LABELS = [
  'תרגיל הבריינרוט', 'הסיגמה של המתמטיקה',
  'ריצה W', 'לא L', 'פתרון הגיוסי', 'מבחן הסקיבידי', 'המצב גריז'
];

const GAME_THEMES = [
  { name: 'מיינקראפט', items: ['⛏️','💎','🪨','🌲','🔥','🐷','🧱'], label: '⛏️ מיינקראפט' },
  { name: 'רובלוקס',   items: ['🎮','🏗️','🤖','🎲','💰','🌈','🎯'], label: '🎮 רובלוקס' },
  { name: 'פוקימון',   items: ['⚡','🔥','💧','🌿','👾','🌀','💥'], label: '⚡ פוקימון' },
  { name: 'מריו',      items: ['🍄','⭐','🪙','🎯','🌟','🎪','🚩'], label: '🍄 מריו' },
  { name: 'פורטנייט',  items: ['🏆','💥','🔫','🎯','⭐','🌟','🏅'], label: '🏆 פורטנייט' },
  { name: 'כדורגל',    items: ['⚽','🏃','🥅','🏅','🎯','⭐','🌟'], label: '⚽ כדורגל' },
  { name: 'חייזרים',   items: ['👾','🛸','🌌','⭐','💫','🔭','🚀'], label: '👾 חייזרים' }
];

const THEME_LOOT = {
  'מיינקראפט': ['יהלומים','גוש אבן','עצי עץ','קוביות זהב'],
  'רובלוקס':   ['רובוקסים','בניות','כלי נשק','מטבעות'],
  'פוקימון':   ['כרטיסי פוקימון','פוקיבולים','תגים','מדליות'],
  'מריו':      ['מטבעות','פטריות','כוכבים','מפתחות'],
  'פורטנייט':  ['חומרי בנייה','נשקים','תחמושת','ניצחונות'],
  'כדורגל':    ['שערים','כרטיסים','ניקוד','כרטיסי שחקן'],
  'חייזרים':   ['ספינות','לייזרים','כוכבים','תחנות חלל']
};
