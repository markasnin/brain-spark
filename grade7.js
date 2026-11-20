(() => {
  const topics = ['coordinates','negatives','angles','transforms','powers','area',
    'algebra','volume','probability','pythagoras','equations','graphs'];

  // Grade 7 uses the existing grade 6 point values.
  window.GRADE_CONFIG = {
    gradeId: 'ז',
    gradeName: 'כיתה ז',
    gradeEmoji: '🧭',
    gradeColor: '#7dd3fc',
    availableCategories: topics,
    availableExamTopics: topics,
    availableLearnTopics: [],
    pts: { easy:9, medium:19, hard:32 },
    welcome: 'ברוכים הבאים לכיתה ז׳!',
    tip: 'מתחילים מצירים, מספרים מכוונים וזוויות.',
  };
})();
