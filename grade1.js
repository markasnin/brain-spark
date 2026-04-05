// ══════════════════════════════════════════════
// GRADE 1 — כיתה א (תשפ"ה / תשפ"ו)
// Official Israeli curriculum (משרד החינוך):
//   Numbers: 0–100, place value (tens/ones)
//   Operations: add/sub up to 20 (extending to 30)
//   Number line, even/odd, counting sequences
//   Shapes: circle/triangle/square/rectangle — sides & corners
//   Measurement: non-standard → standard (cm), comparing lengths/weights
//   NO fractions, NO decimals, NO multiplication, NO division
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'א', gradeName: 'כיתה א', gradeEmoji: '🌱', gradeColor: '#2ed573',
  availableCategories: ['add', 'sub', 'shapes', 'measurement'],
  availableLearnTopics: ['shapes', 'measurement'],
  availableExamTopics:  ['add', 'sub', 'shapes', 'measurement'],
  ranges: {
    add: { easy:{aMin:1,aMax:9,bMin:1,bMax:9},    medium:{aMin:5,aMax:15,bMin:1,bMax:10}, hard:{aMin:10,aMax:20,bMin:1,bMax:10} },
    sub: { easy:{aMin:2,aMax:9},                   medium:{aMin:5,aMax:15},                hard:{aMin:10,aMax:20} },
  },
  pts: { easy:3, medium:6, hard:10 },
  welcome: 'ברוך הבא לכיתה א! חיבור, חיסור, צורות ומדידה! 🌱',
  tip: 'ספור על האצבעות — זה בסדר גמור! 🤞',
  generators: {
    add(diff) {
      const r = window.GRADE_CONFIG.ranges.add[diff];
      const a = rnd(r.aMin,r.aMax), b = rnd(r.bMin,r.bMax);
      // Ensure sum stays in grade 1 range
      const safeB = diff==='easy' ? Math.min(b, 10-a) || 1 : b;
      const theme = pick(GAME_THEMES);
      return { type:'num', cat:'add', diff, label:theme.label, gameLabel:brainrotLabel(),
        text:`${a} + ${safeB} = ?`, answer:a+safeB, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'decompose',a,b:safeB}, showMul:false, dir:'ltr' };
    },
    sub(diff) {
      const r = window.GRADE_CONFIG.ranges.sub[diff];
      const a = rnd(r.aMin,r.aMax), b = rnd(1, a-1);
      const theme = pick(GAME_THEMES);
      return { type:'num', cat:'sub', diff, label:theme.label, gameLabel:brainrotLabel(),
        text:`${a} - ${b} = ?`, answer:a-b, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'cubes',total:a,remove:b}, showMul:false, dir:'ltr' };
    },
    shapes(diff) {
      const pts = window.GRADE_CONFIG.pts[diff];
      const theme = pick(GAME_THEMES);
      const pools = {
        // Grade 1 shapes: identifying shapes, counting sides/corners, even/odd, number line basics
        easy: [
          {text:'כמה צלעות יש למשולש?', answer:3, hint:'💡 ספור את הקווים של המשולש!'},
          {text:'כמה פינות יש למשולש?', answer:3, hint:'💡 3 צלעות = 3 פינות!'},
          {text:'כמה צלעות יש לריבוע?', answer:4, hint:'💡 לריבוע 4 צלעות שוות!'},
          {text:'כמה פינות יש לריבוע?', answer:4, hint:'💡 4 פינות ישרות!'},
          {text:'כמה צלעות יש למלבן?', answer:4, hint:'💡 2 ארוכות ו-2 קצרות = 4!'},
          {text:'לעיגול יש כמה צלעות?', answer:0, hint:'💡 לעיגול אין צלעות — הוא עגול!'},
          {text:'מה המספר שאחרי 5?', answer:6, hint:'💡 5+1=6!'},
          {text:'מה המספר שלפני 4?', answer:3, hint:'💡 4-1=3!'},
          {text:'מה המספר שאחרי 9?', answer:10, hint:'💡 9+1=10!'},
          {text:'האם 2 זוגי? (כן=1 לא=0)', answer:1, hint:'💡 2 מתחלק ב-2 בדיוק — זוגי!'},
          {text:'האם 3 זוגי? (כן=1 לא=0)', answer:0, hint:'💡 3 לא מתחלק ב-2 — אי-זוגי!'},
          {text:'האם 6 זוגי? (כן=1 לא=0)', answer:1, hint:'💡 6÷2=3 — זוגי!'},
        ],
        medium: [
          {text:'כמה צלעות יש למחומש?', answer:5, hint:'💡 חמש = 5 צלעות!'},
          {text:'כמה צלעות יש למשושה?', answer:6, hint:'💡 שש = 6 צלעות!'},
          {text:'כמה עשרות יש ב-23?', answer:2, hint:'💡 23 = 2 עשרות + 3 יחידות'},
          {text:'כמה יחידות יש ב-37?', answer:7, hint:'💡 37 = 3 עשרות + 7 יחידות'},
          {text:'כמה יחידות יש ב-54?', answer:4, hint:'💡 54 = 5 עשרות + 4 יחידות'},
          {text:'10 + 5 = ?', answer:15, hint:'💡 עשרה ועוד חמש = חמישה עשר!'},
          {text:'20 + 3 = ?', answer:23, hint:'💡 עשרים ועוד שלוש!'},
          {text:'האם 10 זוגי? (כן=1 לא=0)', answer:1, hint:'💡 10÷2=5 — זוגי!'},
          {text:'האם 7 זוגי? (כן=1 לא=0)', answer:0, hint:'💡 7 הוא אי-זוגי!'},
          {text:'מה גדול יותר: 13 או 8?', answer:13, hint:'💡 13 נמצא ימינה בסרגל המספרים!'},
          // Challenge: shape unknowns (שאלות אתגר with shapes)
          {text:'🔺 + 🔺 = 6. כמה שווה 🔺?', answer:3, hint:'💡 צריך 2 מספרים שווים שסכומם 6. 3+3=6!'},
          {text:'⬜ + ⬜ = 8. כמה שווה ⬜?', answer:4, hint:'💡 4+4=8!'},
        ],
        hard: [
          {text:'כמה עשרות יש ב-80?', answer:8, hint:'💡 80 = 8 עשרות!'},
          {text:'30 + ? = 50. מה החסר?', answer:20, hint:'💡  50 - 30 = 20!'},
          {text:'מה המספר שמגיע לפני 40?', answer:39, hint:'💡 40 - 1 = 39!'},
          // Shape unknowns — grade 1 style (concrete, with pictures in question)
          {text:'🔺 + 3 = 7. כמה שווה 🔺?', answer:4, hint:'💡 7 - 3 = 4!'},
          {text:'⬜ - 2 = 5. כמה שווה ⬜?', answer:7, hint:'💡 5 + 2 = 7!'},
          {text:'🔵 + 🔵 + 🔵 = 9. כמה שווה 🔵?', answer:3, hint:'💡 9 ÷ 3 = 3!'},
          {text:'ספור קדימה מ-37: 37, 38, 39, ?', answer:40, hint:'💡 אחרי 39 מגיע 40!'},
          {text:'ספור אחורה מ-22: 22, 21, 20, ?', answer:19, hint:'💡 לפני 20 מגיע 19!'},
        ],
      };
      const q = pick(pools[diff]);
      return { type:'num', cat:'shapes', diff, label:theme.label, gameLabel:'',
        text:q.text, answer:q.answer, pts, hint:{type:'text',msg:q.hint}, showMul:false, dir:'rtl' };
    },
    measurement(diff) {
      const pts = window.GRADE_CONFIG.pts[diff];
      const theme = pick(GAME_THEMES);
      const pools = {
        // Grade 1 measurement: comparing, ordering, basic units (no conversions with decimals)
        easy: [
          {text:'מה ארוך יותר: עיפרון של 10 ס"מ או סרגל של 15 ס"מ? (עיפרון=1 סרגל=2)', answer:2, hint:'💡 15 > 10, הסרגל ארוך יותר!'},
          {text:'מה כבד יותר: ספר או נוצה? (ספר=1 נוצה=2)', answer:1, hint:'💡 ספר כבד הרבה יותר מנוצה!'},
          {text:'מה גבוה יותר: עץ או ספסל? (עץ=1 ספסל=2)', answer:1, hint:'💡 עץ גבוה הרבה יותר!'},
          {text:'כמה ס"מ יש ב-1 מטר?', answer:100, hint:'💡 מטר = 100 ס"מ!'},
          {text:'כמה דקות יש בשעה?', answer:60, hint:'💡 שעה = 60 דקות!'},
          {text:'כמה שניות יש בדקה?', answer:60, hint:'💡 דקה = 60 שניות!'},
        ],
        medium: [
          {text:'חבל של 5 ס"מ ועוד חבל של 3 ס"מ. כמה ס"מ ביחד?', answer:8, hint:'💡 5+3=8 ס"מ'},
          {text:'סרגל 20 ס"מ. קטעתי 6 ס"מ. כמה נשאר?', answer:14, hint:'💡 20-6=14 ס"מ'},
          {text:'כמה ס"מ ב-2 מטר?', answer:200, hint:'💡 2×100=200 ס"מ'},
          {text:'2 עפרונות, כל אחד 8 ס"מ. כמה ס"מ ביחד?', answer:16, hint:'💡 8+8=16 ס"מ'},
          {text:'שעון מראה 3:00. עוד 2 שעות יהיה השעה?', answer:5, hint:'💡 3+2=5 — השעה 5:00!'},
        ],
        hard: [
          {text:'3 מטר = כמה ס"מ?', answer:300, hint:'💡 3×100=300 ס"מ'},
          {text:'2 שעות = כמה דקות?', answer:120, hint:'💡 2×60=120 דקות'},
          {text:'שעה אחת וחצי = כמה דקות?', answer:90, hint:'💡 60+30=90 דקות'},
          {text:'ילד גבוה 120 ס"מ. כמה מטר ועוד ס"מ? (כמה ס"מ מעל מטר)', answer:20, hint:'💡 120-100=20 ס"מ מעל מטר'},
          {text:'מחבר 15 ס"מ. שולחן ארוך פי 10. כמה ס"מ?', answer:150, hint:'💡 15×10=150 ס"מ'},
        ],
      };
      const q = pick(pools[diff]);
      return { type:'num', cat:'measurement', diff, label:theme.label, gameLabel:'',
        text:q.text, answer:q.answer, pts, hint:{type:'text',msg:q.hint}, showMul:false, dir:'rtl' };
    },
  },
};
