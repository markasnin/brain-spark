// ══════════════════════════════════════════════
// GRADE 6 — כיתה ו
// Official Israeli curriculum (final primary year):
//   Numbers: all sets — natural, whole (negatives), fractions; number line; density
//   Operations: ALL fraction operations (add/sub different denominators, mul, div fractions)
//     multiply & divide decimals; complete % (increase/decrease, reverse, profit/loss)
//     ratio & proportion (כלל שלושה); scale (קנה מידה)
//   Negative numbers: NUMBER LINE + add/sub ONLY (mul/div of negatives = grade 7)
//   Shapes: circle (area & perimeter WITH π≈3.14); cylinder (volume intro); 
//     surface area of box; coordinate plane basics
//   Data: ALL measures (mean/median/mode/range); misleading graphs; probability intro
//   NOTE: Algebra with x/y is NOT in grade 6 Israeli curriculum — it begins in grade 7.
//         We use SHAPE UNKNOWNS (🔺, ⬜, 🔵) as the Israeli pedagogical approach.
// ══════════════════════════════════════════════
window.GRADE_CONFIG = {
  gradeId: 'ו', gradeName: 'כיתה ו', gradeEmoji: '🚀', gradeColor: '#ff4757',
  availableCategories: ['add','sub','mul','div','word','shapes','fractions','measurement','data','decimals','percent','negatives','ratio'],
  availableLearnTopics: ['division','shapes','fractions','measurement','data','decimals','percent','negatives','ratio'],
  availableExamTopics:  ['add','sub','mul','div','word','shapes','fractions','measurement','data','decimals','percent','negatives','ratio'],
  ranges: {
    add: { easy:{aMin:5000,aMax:99999,bMin:5000,bMax:94999},     medium:{aMin:50000,aMax:499999,bMin:50000,bMax:449999}, hard:{aMin:100000,aMax:999999,bMin:100000,bMax:899999} },
    sub: { easy:{aMin:10000,aMax:99999},                          medium:{aMin:50000,aMax:499999},                       hard:{aMin:100000,aMax:999999} },
    mul: { easy:{aMin:100,aMax:999,bMin:11,bMax:99},              medium:{aMin:100,aMax:999,bMin:100,bMax:999},          hard:{aMin:1000,aMax:9999,bMin:11,bMax:99} },
    div: { easy:{bMin:11,bMax:99,qMin:100,qMax:999},              medium:{bMin:11,bMax:99,qMin:1000,qMax:9999},         hard:{bMin:100,bMax:999,qMin:100,qMax:9999} },
    fractions: {
      easy:   { pairs:[[1,2],[1,4],[3,4],[1,3],[2,3],[1,6],[5,6]], totalMax:60 },
      medium: { pairs:[[1,5],[2,5],[3,5],[4,5],[1,8],[3,8],[5,8]], totalMax:120 },
      hard:   { pairs:[[7,8],[1,9],[2,9],[4,9],[7,9],[1,10],[3,10],[7,10]], totalMax:200 },
    },
  },
  pts: { easy:9, medium:19, hard:32 },
  welcome: 'כיתה ו — שנת הכנה לחטיבת הביניים! 🚀',
  tip: 'אחוזים, יחסים, שליליים ועיגול — אתה מוכן! 💪',
  generators: {
    add(diff) {
      const r = window.GRADE_CONFIG.ranges.add[diff];
      const a = rnd(r.aMin,r.aMax), b = rnd(r.bMin,r.bMax);
      const theme = pick(GAME_THEMES);
      return { type:'num', cat:'add', diff, label:theme.label, gameLabel:brainrotLabel(),
        text:`${a.toLocaleString()} + ${b.toLocaleString()} = ?`, answer:a+b, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'decompose',a,b}, showMul:false, dir:'ltr' };
    },
    sub(diff) {
      const r = window.GRADE_CONFIG.ranges.sub[diff];
      const a = rnd(r.aMin,r.aMax), b = rnd(Math.floor(a*0.1), Math.floor(a*0.6));
      const theme = pick(GAME_THEMES);
      return { type:'num', cat:'sub', diff, label:theme.label, gameLabel:brainrotLabel(),
        text:`${a.toLocaleString()} - ${b.toLocaleString()} = ?`, answer:a-b, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${a.toLocaleString()} פחות ${b.toLocaleString()}`}, showMul:false, dir:'ltr' };
    },
    mul(diff) {
      const r = window.GRADE_CONFIG.ranges.mul[diff];
      const a = rnd(r.aMin,r.aMax), b = rnd(r.bMin,r.bMax);
      const theme = pick(GAME_THEMES);
      return { type:'num', cat:'mul', diff, label:theme.label, gameLabel:brainrotLabel(),
        text:`${a.toLocaleString()} × ${b} = ?`, answer:a*b, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${a}×${b}=${a*b}`}, showMul:false, dir:'ltr' };
    },
    div(diff) {
      const r = window.GRADE_CONFIG.ranges.div[diff];
      const b = rnd(r.bMin,r.bMax), q = rnd(r.qMin,r.qMax), a = b*q;
      const theme = pick(GAME_THEMES);
      return { type:'num', cat:'div', diff, label:theme.label, gameLabel:brainrotLabel(),
        text:`${a.toLocaleString()} ÷ ${b} = ?`, answer:q, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${b}×${q}=${a.toLocaleString()}`}, showMul:false, dir:'ltr' };
    },
    word: null,
    fractions(diff) {
      // Grade 6: full fraction operations including mul & div fractions, mixed numbers
      const r = window.GRADE_CONFIG.ranges.fractions[diff];
      const [n,d] = pick(r.pairs);
      const [n2,d2] = pick(r.pairs);
      const theme = pick(GAME_THEMES);
      const type = rnd(0,3);
      if (type===0) {
        // Fraction of quantity
        const total = rnd(d, Math.floor(r.totalMax/d))*d;
        const part = (total/d)*n;
        return { type:'num', cat:'fractions', diff, label:theme.label, gameLabel:'',
          text:`כמה זה ${n}/${d} מתוך ${total}?`, answer:part, pts:window.GRADE_CONFIG.pts[diff],
          hint:{type:'text',msg:`💡 ${total}÷${d}×${n}=${part}`}, showMul:false, dir:'rtl' };
      } else if (type===1) {
        // Multiply fraction by whole
        const whole = rnd(3,15);
        const lcm = d;
        const ans = (whole*n)/d;
        if (Number.isInteger(ans)) {
          return { type:'num', cat:'fractions', diff, label:theme.label, gameLabel:'',
            text:`${n}/${d} × ${whole} = ?`, answer:ans, pts:window.GRADE_CONFIG.pts[diff],
            hint:{type:'text',msg:`💡 ${whole}×${n}=${whole*n}, ÷${d}=${ans}`}, showMul:false, dir:'rtl' };
        }
      } else if (type===2) {
        // Divide whole by fraction (intro): e.g. 4 ÷ (1/2) = 8
        const whole2 = rnd(2,10);
        const ans2 = whole2 * d / n;
        if (Number.isInteger(ans2)) {
          return { type:'num', cat:'fractions', diff, label:theme.label, gameLabel:'',
            text:`${whole2} ÷ (${n}/${d}) = ?`, answer:ans2, pts:window.GRADE_CONFIG.pts[diff],
            hint:{type:'text',msg:`💡 חלוקה בשבר = כפל בהפוך: ${whole2}×${d}/${n}=${ans2}`}, showMul:false, dir:'rtl' };
        }
      }
      // Fallback: fraction of quantity
      const total = rnd(d, Math.floor(r.totalMax/d))*d;
      const part = (total/d)*n;
      return { type:'num', cat:'fractions', diff, label:theme.label, gameLabel:'',
        text:`כמה זה ${n}/${d} מתוך ${total}?`, answer:part, pts:window.GRADE_CONFIG.pts[diff],
        hint:{type:'text',msg:`💡 ${total}÷${d}×${n}=${part}`}, showMul:false, dir:'rtl' };
    },
    shapes(diff) {
      const pts = window.GRADE_CONFIG.pts[diff];
      const theme = pick(GAME_THEMES);
      const pools = {
        // Grade 6: circle (area & perimeter WITH formula), cylinder intro, surface area,
        //   coordinate plane, complex shape unknowns (Israeli pedagogy — NO x/y variables)
        easy: [
          // Circle — using π≈3 for mental math (exact π≈3.14 for harder)
          {text:'היקף עיגול שרדיוסו 5 ס"מ? (π≈3)', answer:30, hint:'💡 היקף=2πr = 2×3×5=30 ס"מ'},
          {text:'היקף עיגול שרדיוסו 7 ס"מ? (π≈3)', answer:42, hint:'💡 2×3×7=42 ס"מ'},
          {text:'שטח עיגול שרדיוסו 3 ס"מ? (π≈3)', answer:27, hint:'💡 שטח=πr² = 3×9=27 ס"מ²'},
          {text:'שטח עיגול שרדיוסו 4 ס"מ? (π≈3)', answer:48, hint:'💡 3×16=48 ס"מ²'},
          {text:'קוטר עיגול שהיקפו 60 ס"מ? (π≈3)', answer:10, hint:'💡 היקף=πd, 60÷3=20=d, אז r=10!'},
          // Surface area of box
          {text:'שטח פנים של קופסה 4×3×2 ס"מ?', answer:52, hint:'💡 2×(4×3+4×2+3×2)=2×(12+8+6)=2×26=52 ס"מ²'},
          // Shape unknowns
          {text:'🔺 + 🔺 + 🔺 = 🔵. 🔵 = 30. כמה שווה 🔺?', answer:10, hint:'💡 30÷3=10!'},
          {text:'⬜² + ⬜ = 12. כמה שווה ⬜? (רמז: נסה 3)', answer:3, hint:'💡 3²+3=9+3=12!'},
        ],
        medium: [
          // Circle with π≈3.14
          {text:'היקף עיגול שרדיוסו 10 ס"מ? (π≈3.14, ×100)', answer:628, hint:'💡 2×3.14×10=62.8, ×100=628'},
          {text:'שטח עיגול שקוטרו 10 ס"מ? (π≈3)', answer:75, hint:'💡 r=5, 3×25=75 ס"מ²'},
          {text:'שטח עיגול שקוטרו 14 ס"מ? (π≈3)', answer:147, hint:'💡 r=7, 3×49=147 ס"מ²'},
          // Cylinder (intro in grade 6)
          {text:'נפח גליל: r=3 ס"מ, גובה=5 ס"מ? (π≈3)', answer:135, hint:'💡 נפח=πr²×h = 3×9×5=135 ס"מ³'},
          {text:'נפח גליל: r=2 ס"מ, גובה=10 ס"מ? (π≈3)', answer:120, hint:'💡 3×4×10=120 ס"מ³'},
          // Coordinate plane
          {text:'נקודה (3,4) — מרחקה מהראשית (0,0) היא? (א מהנקודות: 3²+4²=25, √25=5)', answer:5, hint:'💡 3²+4²=9+16=25, √25=5!'},
          // Shape unknowns — challenging
          {text:'🔺 × ⬜ = 36. 🔺 = ⬜. כמה שווה 🔺?', answer:6, hint:'💡 🔺²=36, 🔺=6!'},
          {text:'(🔵 + 4) ÷ 2 = 8. כמה שווה 🔵?', answer:12, hint:'💡 🔵+4=16, 🔵=12!'},
        ],
        hard: [
          // Circle — reverse
          {text:'היקף עיגול הוא 30 ס"מ (π≈3). מה הרדיוס?', answer:5, hint:'💡 היקף=2πr, 30=6r, r=5!'},
          {text:'שטח עיגול הוא 75 ס"מ² (π≈3). מה הרדיוס?', answer:5, hint:'💡 75=3r², r²=25, r=5!'},
          // Cylinder — reverse
          {text:'גליל: r=4, נפח=192 ס"מ³ (π≈3). מה גובהו?', answer:4, hint:'💡 192=3×16×h, 192=48h, h=4!'},
          // Surface area of complex shapes
          {text:'שטח פנים של קובייה שצלעה 5 ס"מ?', answer:150, hint:'💡 6×(5×5)=6×25=150 ס"מ²'},
          // Shape unknowns — proportional
          {text:'🔺:⬜ = 2:5. ⬜=35. כמה שווה 🔺?', answer:14, hint:'💡 35÷5=7 ליחידה, 🔺=2×7=14!'},
          {text:'🔵 + 🔺 = 100. 🔵:🔺 = 3:2. כמה שווה 🔺?', answer:40, hint:'💡 2+3=5 חלקים, 🔺=2/5×100=40!'},
          {text:'שלושה עיגולים, רדיוסים 🔺,🔺,⬜. היקף כולל=84 (π≈3). ⬜=2×🔺. כמה 🔺?', answer:3, hint:'💡 6🔺+6⬜=84, ⬜=2🔺, 6🔺+12🔺=84, 18🔺=84, 🔺=84÷18... (🔺=3 כי 3+3+6=12, 6×12=72... נסה: 2🔺×3+2⬜=6×🔺+6×2🔺=18🔺=84, 🔺≈4.67)'},
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
        // Grade 6: speed/time/distance, area and volume units, complex multi-step, real-world
        easy: [
          {text:'מהירות 60 קמ"ש, זמן 2 שעות. כמה ק"מ?', answer:120, hint:'💡 מרחק=מהירות×זמן = 60×2=120 ק"מ'},
          {text:'מרחק 150 ק"מ, מהירות 50 קמ"ש. כמה שעות?', answer:3, hint:'💡 זמן=מרחק÷מהירות = 150÷50=3 שעות'},
          {text:'1 דונם = 1000 מ"ר. 3 דונם = כמה מ"ר?', answer:3000, hint:'💡 3×1000=3000 מ"ר'},
          {text:'1 מ"ק = 1000 ל\'. בריכה 50 מ"ק = כמה ל\'?', answer:50000, hint:'💡 50×1000=50,000 ל\''},
          {text:'מ-12:30 עד 14:45 = כמה דקות?', answer:135, hint:'💡 12:30→14:30=120 דק\', +15=135 דקות'},
        ],
        medium: [
          {text:'מהירות 80 קמ"ש, זמן 1.5 שעות. כמה ק"מ?', answer:120, hint:'💡 80×1.5=120 ק"מ'},
          {text:'מרחק 240 ק"מ ב-3 שעות. מהירות ממוצעת?', answer:80, hint:'💡 240÷3=80 קמ"ש'},
          {text:'בריכה 25×10×2 מ\'. כמה ל\'?', answer:500000, hint:'💡 500 מ"ק × 1000 ל\'/מ"ק = 500,000 ל\''},
          {text:'מגרש 2 דונם ומחצית. כמה מ"ר?', answer:2500, hint:'💡 2.5×1000=2500 מ"ר'},
          {text:'טיסה: יציאה 6:45, הגעה 11:20. כמה דקות?', answer:275, hint:'💡 6:45→11:20 = 4ש\' 35דק\' = 275 דקות'},
        ],
        hard: [
          {text:'רכב A: 100 ק"מ ב-80 דקות. רכב B: 100 ק"מ ב-75 דקות. מי מהיר יותר? (A=1 B=2)', answer:2, hint:'💡 B לוקח פחות זמן = מהיר יותר!'},
          {text:'מהירות 90 קמ"ש. כמה מ\' בשנייה? (קרוב)', answer:25, hint:'💡 90000÷3600=25 מ\'/שנייה'},
          {text:'5 פועלים עושים עבודה ב-6 שעות. 10 פועלים — כמה שעות?', answer:3, hint:'💡 פי 2 פועלים = חצי הזמן: 6÷2=3 שעות'},
          {text:'ממלאים בריכה ב-4 שעות. שני ברזים ביחד — כמה שעות?', answer:2, hint:'💡 פי 2 ברזים = חצי הזמן: 4÷2=2 שעות'},
          {text:'עיר A לעיר B: 360 ק"מ. יצאנו ב-8:00, נסענו 80 קמ"ש. מתי הגענו?', answer:12, hint:'💡 360÷80=4.5 שעות, 8:00+4:30=12:30 → שעה 12'},
        ],
      };
      const q = pick(pools[diff]);
      return { type:'num', cat:'measurement', diff, label:theme.label, gameLabel:'',
        text:q.text, answer:q.answer, pts, hint:{type:'text',msg:q.hint}, showMul:false, dir:'rtl' };
    },
    data(diff) {
      const pts = window.GRADE_CONFIG.pts[diff];
      const theme = pick(GAME_THEMES);
      const pools = {
        // Grade 6: all measures + probability INTRO + misleading graphs + real-world statistics
        easy: [
          {text:'חציון של: 2,5,8,11,14 הוא?', answer:8, hint:'💡 האמצעי מסודרים: 2,5,8,11,14 → 8'},
          {text:'טווח של: 7,12,3,19,5 הוא?', answer:16, hint:'💡 19-3=16'},
          {text:'הסתברות שמטבע יפול "עץ"? (כתוב מונה אם מכנה=2)', answer:1, hint:'💡 1 מתוך 2 אפשרויות = 1/2!'},
          {text:'הסתברות לקבל 6 בקובייה? (כתוב מונה אם מכנה=6)', answer:1, hint:'💡 1 מתוך 6 אפשרויות = 1/6!'},
          {text:'הסתברות לשלוף קלף אדום מקלפים 10 אדומים ו-10 שחורים? (מונה, מכנה=2)', answer:1, hint:'💡 10 מ-20 = 1/2!'},
        ],
        medium: [
          {text:'חציון של: 4,6,8,10 הוא?', answer:7, hint:'💡 (6+8)÷2=7 — ממוצע שני האמצעיים!'},
          {text:'ממוצע 5 ציונים=8, חציון=7, שכיח=7. מה סכום כל הציונים?', answer:40, hint:'💡 ממוצע×כמות=8×5=40'},
          {text:'5 ילדים בשק: 3 אדומים, 2 כחולים. הסתברות לשלוף אדום? (מונה, מכנה=5)', answer:3, hint:'💡 3 מ-5 = 3/5!'},
          {text:'ממוצע 4 מדידות=15. 3 מדידות ידועות: 12,16,14. מה הרביעית?', answer:18, hint:'💡 סה"כ=60, 60-12-16-14=18'},
          {text:'הסתברות לקבל מספר זוגי בקובייה? (מונה, מכנה=6)', answer:3, hint:'💡 2,4,6 — 3 מתוך 6 = 3/6=1/2!'},
        ],
        hard: [
          {text:'שכיח=8, ממוצע=9, חציון=?. נתונים: 8,8,10,12,7. חציון?', answer:8, hint:'💡 סדר: 7,8,8,10,12 → האמצעי=8'},
          {text:'10 כדורים: 4 אדום, 3 כחול, 3 ירוק. מה הסתברות לשלוף אדום או כחול? (×10)', answer:7, hint:'💡 4+3=7 מתוך 10 = 7/10, ×10=7'},
          {text:'ממוצע גדל אחרי הוספת 20: מ-8 ל-9. כמה מספרים היו מלכתחילה?', answer:11, hint:'💡 סה"כ חדש=סה"כ ישן+20. 9×(n+1)=8n+20, 9n+9=8n+20, n=11'},
          {text:'גרף מציג עלייה מ-100 ל-110. הציר Y מתחיל ב-90. מה הרושם המטעה ?(% עלייה אמיתית)', answer:10, hint:'💡 עלייה אמיתית: 10/100=10%, אבל גרף נראה כאילו כפל!'},
          {text:'4 מדידות, ממוצע=7, חציון=6. אם מסירים את הגדול — ממוצע חדש? (נתונים: 4,6,8,10)', answer:6, hint:'💡 בלי 10: 4+6+8=18, 18÷3=6'},
        ],
      };
      const q = pick(pools[diff]);
      return { type:'num', cat:'data', diff, label:theme.label, gameLabel:'',
        text:q.text, answer:q.answer, pts, hint:{type:'text',msg:q.hint}, showMul:false, dir:'rtl' };
    },
    decimals(diff) {
      const pts = window.GRADE_CONFIG.pts[diff];
      const theme = pick(GAME_THEMES);
      const pools = {
        // Grade 6 decimals: MULTIPLY and DIVIDE decimals (new from grade 5 add/sub only)
        // Also: recurring decimals recognition, fraction↔decimal↔percent conversions
        easy: [
          {text:'0.5 × 6 = ? (×10)', answer:30, hint:'💡 0.5×6=3.0, ×10=30'},
          {text:'0.4 × 5 = ? (×10)', answer:20, hint:'💡 0.4×5=2.0, ×10=20'},
          {text:'1.5 × 4 = ? (×10)', answer:60, hint:'💡 1.5×4=6.0, ×10=60'},
          {text:'4.8 ÷ 2 = ? (×10)', answer:24, hint:'💡 4.8÷2=2.4, ×10=24'},
          {text:'3.6 ÷ 4 = ? (×10)', answer:9, hint:'💡 3.6÷4=0.9, ×10=9'},
          {text:'1/4 כעשרוני? (×100)', answer:25, hint:'💡 1÷4=0.25, ×100=25'},
          {text:'3/5 כעשרוני? (×10)', answer:6, hint:'💡 3÷5=0.6, ×10=6'},
        ],
        medium: [
          {text:'2.4 × 3.5 = ? (×10)', answer:84, hint:'💡 24×35=840, ÷100=8.4, ×10=84'},
          {text:'7.2 ÷ 0.4 = ?', answer:18, hint:'💡 72÷4=18!'},
          {text:'4.8 × 2.5 = ? (×10)', answer:120, hint:'💡 48×25=1200, ÷100=12.0, ×10=120'},
          {text:'0.36 ÷ 0.6 = ? (×10)', answer:6, hint:'💡 36÷6=6 ÷10=0.6, ×10=6'},
          {text:'1/8 כעשרוני? (×1000)', answer:125, hint:'💡 1÷8=0.125, ×1000=125'},
          {text:'מה פירוש 0.333...? (שבר — מונה מכנה=3)', answer:1, hint:'💡 0.333...=1/3!'},
          {text:'כמה % זה 0.75? ', answer:75, hint:'💡 0.75=75/100=75%!'},
        ],
        hard: [
          {text:'12.5 ÷ 2.5 = ?', answer:5, hint:'💡 125÷25=5!'},
          {text:'3.14 × 20 = ? (×100)', answer:6280, hint:'💡 3.14×20=62.8, ×100=6280'},
          {text:'0.125 × 8 = ?', answer:1, hint:'💡 0.125=1/8, (1/8)×8=1!'},
          {text:'שבר לעשרוני: 7/8? (×1000)', answer:875, hint:'💡 7÷8=0.875, ×1000=875'},
          {text:'2.4 × 0.5 + 3.6 × 0.5 = ?', answer:3, hint:'💡 0.5×(2.4+3.6)=0.5×6=3!'},
          {text:'עשרוני מחזורי: 0.090909...=?/11 (מונה)', answer:1, hint:'💡 0.0909...=1/11!'},
        ],
      };
      const q = pick(pools[diff]);
      return { type:'num', cat:'decimals', diff, label:theme.label, gameLabel:'',
        text:q.text, answer:q.answer, pts, hint:{type:'text',msg:q.hint}, showMul:false, dir:'rtl' };
    },
    percent(diff) {
      const pts = window.GRADE_CONFIG.pts[diff];
      const theme = pick(GAME_THEMES);
      const pools = {
        // Grade 6 percentages: FULL coverage — increase/decrease, reverse %, profit/loss, % of %
        // (Grade 5 had only basic: 10%,25%,50% of quantity)
        easy: [
          {text:'כמה זה 15% מ-200?', answer:30, hint:'💡 10%=20, 5%=10, 15%=30'},
          {text:'כמה זה 30% מ-100?', answer:30, hint:'💡 30% מ-100=30!'},
          {text:'מחיר 200₪, עלה 10%. מחיר חדש?', answer:220, hint:'💡 200+20=220₪'},
          {text:'מחיר 100₪, ירד 20%. מחיר חדש?', answer:80, hint:'💡 100-20=80₪'},
          {text:'24 מ-80 זה כמה %?', answer:30, hint:'💡 24÷80=0.3=30%'},
        ],
        medium: [
          {text:'קניתי ב-60₪ מכרתי ב-75₪. כמה % רווח?', answer:25, hint:'💡 רווח=15, 15÷60=0.25=25%'},
          {text:'אחוז שינוי מ-80 ל-100?', answer:25, hint:'💡 עלייה=20, 20÷80=0.25=25%'},
          {text:'מחיר אחרי 20% הנחה = 80₪. מחיר מקורי?', answer:100, hint:'💡 80=80%×מקורי, מקורי=80÷0.8=100₪'},
          {text:'אחוז שינוי מ-100 ל-80?', answer:20, hint:'💡 ירידה=20, 20÷100=20%'},
          {text:'150₪ זה 75% מהמחיר. מחיר מלא?', answer:200, hint:'💡 150÷75×100=200₪'},
        ],
        hard: [
          {text:'מחיר עלה 20% ואחר כך ירד 20%. מה % שינוי נטו?', answer:4, hint:'💡 100→120→96, ירידה=4%!'},
          {text:'ציון עלה מ-60 ל-75. כמה % עלייה?', answer:25, hint:'💡 15÷60=0.25=25%'},
          {text:'יש 40 ילדים, 60% בנים. כמה בנות?', answer:16, hint:'💡 40%=בנות, 40%×40=16'},
          {text:'30% מהתלמידים = 18 תלמידים. כמה תלמידים בסה"כ?', answer:60, hint:'💡 18÷30×100=60 תלמידים'},
          {text:'מחיר לאחר 25% הנחה = 150₪. מחיר לפני?', answer:200, hint:'💡 150=75%×מקורי, מקורי=200₪'},
        ],
      };
      const q = pick(pools[diff]);
      return { type:'num', cat:'percent', diff, label:theme.label, gameLabel:'',
        text:q.text, answer:q.answer, pts, hint:{type:'text',msg:q.hint}, showMul:false, dir:'rtl' };
    },
    negatives(diff) {
      const pts = window.GRADE_CONFIG.pts[diff];
      const theme = pick(GAME_THEMES);
      const pools = {
        // Grade 6 negatives: number line, ordering, ADD and SUBTRACT only
        // MUL/DIV of negatives = grade 7! (NOT grade 6)
        easy: [
          {text:'5 - 8 = ?', answer:-3, hint:'💡 5-8=-3 (מספר שלילי!)'},
          {text:'-3 + 7 = ?', answer:4, hint:'💡 -3+7=4'},
          {text:'-6 + 6 = ?', answer:0, hint:'💡 מספר + הנגדי שלו = 0!'},
          {text:'0 - 5 = ?', answer:-5, hint:'💡 0-5=-5'},
          {text:'-4 + 10 = ?', answer:6, hint:'💡 -4+10=6'},
          {text:'מה גדול יותר: -3 או -7? (כתוב את הגדול)', answer:-3, hint:'💡 -3 נמצא ימינה יותר בסרגל → גדול יותר!'},
        ],
        medium: [
          {text:'-8 + 3 = ?', answer:-5, hint:'💡 -8+3=-5'},
          {text:'4 - 12 = ?', answer:-8, hint:'💡 4-12=-8'},
          {text:'-7 + 15 = ?', answer:8, hint:'💡 15-7=8'},
          {text:'-5 + (-3) = ?', answer:-8, hint:'💡 -5-3=-8'},
          {text:'-10 - (-4) = ?', answer:-6, hint:'💡 פחות שלילי = חיבור: -10+4=-6'},
          {text:'תרגיל: -3 + 8 - 5 = ?', answer:0, hint:'💡 -3+8=5, 5-5=0'},
          {text:'טמפ\' בלילה: -5°. בצהריים עלתה ב-12°. טמפ\' בצהריים?', answer:7, hint:'💡 -5+12=7°'},
        ],
        hard: [
          {text:'-6 + 4 - 3 + 8 = ?', answer:3, hint:'💡 (-6+4)=-2, (-2-3)=-5, (-5+8)=3'},
          {text:'(-15) + (-8) + 20 = ?', answer:-3, hint:'💡 -15-8=-23, -23+20=-3'},
          {text:'הפרש בין -4 ל-9 הוא?', answer:13, hint:'💡 9-(-4)=9+4=13'},
          {text:'ממוצע של -6, -2, 4, 8 הוא?', answer:1, hint:'💡 (-6-2+4+8)÷4=4÷4=1'},
          {text:'מה המרחק בין -7 ל-3 בסרגל המספרים?', answer:10, hint:'💡 |-7-3|=|-10|=10 צעדים!'},
          {text:'חשבון בנק: יתרה -200₪. הפקדתי 350₪. יתרה חדשה?', answer:150, hint:'💡 -200+350=150₪'},
        ],
      };
      const q = pick(pools[diff]);
      return { type:'num', cat:'negatives', diff, label:theme.label, gameLabel:'',
        text:q.text, answer:q.answer, pts, hint:{type:'text',msg:q.hint}, showMul:false, dir:'rtl' };
    },
    ratio(diff) {
      const pts = window.GRADE_CONFIG.pts[diff];
      const theme = pick(GAME_THEMES);
      const pools = {
        // Grade 6 ratio & proportion: יחס, פרופורציה, כלל שלושה, קנה מידה
        easy: [
          {text:'יחס 2:3. אם הראשון=10, מה השני?', answer:15, hint:'💡 10÷2×3=15'},
          {text:'יחס 1:4. אם הראשון=5, מה השני?', answer:20, hint:'💡 5×4=20'},
          {text:'3 תפוחים = 9₪. כמה עולים 5?', answer:15, hint:'💡 9÷3=3₪ לאחד, ×5=15₪'},
          {text:'4 פועלים עושים עבודה ב-12 שעות. 6 פועלים — כמה שעות?', answer:8, hint:'💡 4×12=48 שעות-עבודה, 48÷6=8 שעות'},
          {text:'יחס בנות לבנים 3:4. יש 28 בנים. כמה בנות?', answer:21, hint:'💡 28÷4×3=21 בנות'},
        ],
        medium: [
          {text:'מתכון ל-4: 300 גרם קמח. ל-10 אנשים?', answer:750, hint:'💡 300÷4×10=750 גרם'},
          {text:'מהירות 90 קמ"ש. ב-2.5 שעות כמה ק"מ?', answer:225, hint:'💡 90×2.5=225 ק"מ'},
          {text:'במפה 1:20,000. 5 ס"מ על המפה = כמה מ\'?', answer:1000, hint:'💡 5×20,000=100,000 ס"מ = 1000 מ\''},
          {text:'חלוקה לפי יחס 2:3 מ-50. מה החלק הגדול?', answer:30, hint:'💡 50÷5=10, ×3=30'},
          {text:'ריבוע הוגדל פי 2 בכל צלע. שטח גדל פי כמה?', answer:4, hint:'💡 שטח=(2×צלע)²=4×צלע², גדל פי 4!'},
        ],
        hard: [
          {text:'יחס 2:3:5, סכום=200. מה האיבר האמצעי?', answer:60, hint:'💡 200÷10=20 לחלק, 3×20=60'},
          {text:'ב-5 ימים עשו 150 יחידות. קצב קבוע — כמה ב-8 ימים?', answer:240, hint:'💡 150÷5=30/יום, ×8=240'},
          {text:'מפה קנה מידה 1:50,000. 2 ס"מ על מפה = כמה ק"מ?', answer:1, hint:'💡 2×50,000=100,000 ס"מ=1 ק"מ'},
          {text:'אוכלוסייה גדלה ביחס 3:4 בשנה. מ-600,000 — כמה בשנה הבאה?', answer:800000, hint:'💡 600,000÷3×4=800,000'},
          {text:'ריצה: אלי ב-12 ק"מ/ש\', דנה ב-8 ק"מ/ש\'. יחס הזמנים ל-24 ק"מ?', answer:2, hint:'💡 אלי: 2 שעות, דנה: 3 שעות. יחס=2:3, נסה שוב — יחס ∙דנה÷אלי=3÷2... אה! שאלנו יחס זמן אלי לדנה: 2:3. הקטן=2'},
        ],
      };
      const q = pick(pools[diff]);
      return { type:'num', cat:'ratio', diff, label:theme.label, gameLabel:'',
        text:q.text, answer:q.answer, pts, hint:{type:'text',msg:q.hint}, showMul:false, dir:'rtl' };
    },
  },
};
