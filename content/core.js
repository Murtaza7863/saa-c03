window.SAA = window.SAA || {
  lessons: [],
  exams: [],
  cards: [],
  compares: [],
  glossary: [],
  cheatsheet: "",
  extras: {},
  labs: [],
  studio: [],
  playbooks: [],
  bank: [],
};

function lesson(obj) {
  window.SAA.lessons.push(obj);
}

function exam(obj) {
  window.SAA.exams.push(obj);
}
