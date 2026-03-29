// ══ SPECIAL USERS ══
// Add or edit special users here.
// Keys must match the cleaned username (lowercase, Hebrew/alphanumeric only).

const SPECIAL_USERS = {
  'asasin': {
    title: 'אלוהי המספרים 👑⚡',
    badge: '⚡👑',
    color: '#00d2d3',
    glowColor: '#00d362',
    badgeColor: '#00d2d3',
    scoreDisplay: (n) => '♾️',
    streakDisplay: (n) => '♾️',
    allUnlocked: true,
    defaultGradeLabel: ' המנהל 🎓',
    pinTop: true
  },
  'יאן': {
    title: 'V.I.P 💎',
    badge: '💎',
    color: '#00d362',
    glowColor: '#00d362',
    badgeColor: '#00d362',
    scoreDisplay: (n) => `💎 ${n.toLocaleString()}`,
    streakDisplay: (n) => `🔥 ${n} ברצף 💎`,
    pinTop: false
  }
};
