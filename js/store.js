const Store = (() => {
  const KEY = "saa-c03-study-v2";
  const OLD_KEY = "saa-c03-study-v1";

  const empty = () => ({
    theme: "light",
    mode: "learn",
    lessons: {},
    exams: {},
    cards: {},
    labs: {},
    studio: {},
    skills: {},
    lastLesson: null,
    streak: { last: null, count: 0 },
  });

  let data = empty();

  function load() {
    try {
      let raw = localStorage.getItem(KEY);
      if (!raw) {
        const old = localStorage.getItem(OLD_KEY);
        if (old) {
          const parsed = JSON.parse(old);
          parsed.theme = "light";
          data = Object.assign(empty(), parsed);
          save();
          return data;
        }
      } else {
        data = Object.assign(empty(), JSON.parse(raw));
        return data;
      }
    } catch (e) {
      data = empty();
    }
    return data;
  }

  function save() {
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  function touchStreak() {
    const t = today();
    if (data.streak.last === t) return;
    const y = new Date();
    y.setDate(y.getDate() - 1);
    const ymd = y.toISOString().slice(0, 10);
    data.streak.count = data.streak.last === ymd ? data.streak.count + 1 : 1;
    data.streak.last = t;
    save();
  }

  load();

  return {
    get: () => data,
    save,
    load,
    touchStreak,
    setTheme(theme) {
      data.theme = theme;
      save();
    },
    setMode(mode) {
      data.mode = mode === "exam" ? "exam" : "learn";
      save();
    },
    markLab(id) {
      data.labs[id] = { done: true, at: Date.now() };
      save();
    },
    toggleSkill(id) {
      data.skills = data.skills || {};
      data.skills[id] = !data.skills[id];
      save();
    },
    markStudio(id, score, total) {
      data.studio[id] = { score, total, at: Date.now() };
      save();
    },
    markRead(id) {
      data.lessons[id] = Object.assign(
        { quizScore: 0, quizTotal: 0 },
        data.lessons[id],
        { read: true },
      );
      data.lastLesson = id;
      save();
    },
    saveQuiz(id, score, total) {
      data.lessons[id] = Object.assign({ read: true }, data.lessons[id], {
        quizScore: score,
        quizTotal: total,
        quizAt: Date.now(),
      });
      data.lastLesson = id;
      save();
    },
    saveExam(id, payload) {
      data.exams[id] = payload;
      save();
    },
    cardBox(id) {
      return (data.cards[id] && data.cards[id].box) || 1;
    },
    rateCard(id, knew) {
      const box = this.cardBox(id);
      data.cards[id] = { box: knew ? Math.min(5, box + 1) : 1, at: Date.now() };
      save();
    },
    reset() {
      data = empty();
      save();
    },
  };
})();
