export interface KeyboardTrainingLesson {
  id: number;
  title: string;
  newKeys: string[];
  reviewKeys: string[];
  exercises: string[];
}

export const keyboardTrainingLessons: KeyboardTrainingLesson[] = [
  {
    id: 1,
    title: "F und J",
    newKeys: ["f", "j"],
    reviewKeys: [],
    exercises: [
      "fff jjj fff jjj",
      "fj fj fj fj",
      "fff jjj fj fj",
      "fjj fjf jff",
    ],
  },
  {
    id: 2,
    title: "D und K",
    newKeys: ["d", "k"],
    reviewKeys: ["f", "j"],
    exercises: [
      "ddd kkk ddd kkk",
      "dk dk dk dk",
      "fd jk fd jk",
      "df kd df kd",
    ],
  },
  {
    id: 3,
    title: "S und L",
    newKeys: ["s", "l"],
    reviewKeys: ["f", "j", "d", "k"],
    exercises: [
      "sss lll sss lll",
      "sl sl sl sl",
      "sd lk sd lk",
      "fs jl dk sl",
    ],
  },
  {
    id: 4,
    title: "A und Ö",
    newKeys: ["a", "ö"],
    reviewKeys: ["s", "d", "f", "j", "k", "l"],
    exercises: [
      "aaa ööö aaa ööö",
      "aö aö aö aö",
      "as öl as öl",
      "af ösd aj ök",
    ],
  },
  {
    id: 5,
    title: "Grundreihe",
    newKeys: ["a", "s", "d", "f", "j", "k", "l", "ö"],
    reviewKeys: [],
    exercises: [
      "asdf jklö asdf jklö",
      "fdsa ölkj fdsa ölkj",
      "as df jk lö as df jk lö",
      "a s d f j k l ö",
    ],
  },
  {
    id: 6,
    title: "E und I",
    newKeys: ["e", "i"],
    reviewKeys: ["a", "s", "d", "f", "j", "k", "l", "ö"],
    exercises: [
      "eee iii eee iii",
      "ei ie ei ie",
      "de ki se li",
      "asdf ei jklö ie",
    ],
  },
  {
    id: 7,
    title: "R und U",
    newKeys: ["r", "u"],
    reviewKeys: ["e", "i", "a", "s", "d", "f", "j", "k", "l", "ö"],
    exercises: [
      "rrr uuu rrr uuu",
      "ru ur ru ur",
      "er ui er ui",
      "asd fru jkl öui",
    ],
  },
  {
    id: 8,
    title: "T und Z",
    newKeys: ["t", "z"],
    reviewKeys: ["r", "u", "e", "i", "a", "s", "d", "f", "j", "k", "l", "ö"],
    exercises: [
      "ttt zzz ttt zzz",
      "tz zt tz zt",
      "tr zu tr zu",
      "asdf tzu jklö uzt",
    ],
  },
  {
    id: 9,
    title: "W und O",
    newKeys: ["w", "o"],
    reviewKeys: ["t", "z", "r", "u", "e", "i", "a", "s", "d", "f", "j", "k", "l", "ö"],
    exercises: [
      "www ooo www ooo",
      "wo ow wo ow",
      "we oi we oi",
      "asdf woe jklö iow",
    ],
  },
  {
    id: 10,
    title: "Q und P",
    newKeys: ["q", "p"],
    reviewKeys: ["w", "o", "t", "z", "r", "u", "e", "i", "a", "s", "d", "f", "j", "k", "l", "ö"],
    exercises: [
      "qqq ppp qqq ppp",
      "qp pq qp pq",
      "qw op qw op",
      "asdf qop jklö poq",
    ],
  },
  {
    id: 11,
    title: "C und M",
    newKeys: ["c", "m"],
    reviewKeys: ["q", "w", "e", "r", "t", "z", "u", "i", "o", "p", "a", "s", "d", "f", "j", "k", "l", "ö"],
    exercises: [
      "ccc mmm ccc mmm",
      "cm mc cm mc",
      "dc km sc lm",
      "asdf cm jklö mc",
    ],
  },
  {
    id: 12,
    title: "V und N",
    newKeys: ["v", "n"],
    reviewKeys: ["c", "m", "a", "s", "d", "f", "j", "k", "l", "ö"],
    exercises: [
      "vvv nnn vvv nnn",
      "vn nv vn nv",
      "dv kn sv ln",
      "asdf vn jklö nv",
    ],
  },
  {
    id: 13,
    title: "B",
    newKeys: ["b"],
    reviewKeys: ["v", "n", "c", "m", "a", "s", "d", "f", "j", "k", "l", "ö"],
    exercises: [
      "bbb bbb bbb bbb",
      "vb bn vb bn",
      "ab df jb kl",
      "asdf bvn jklö mcb",
    ],
  },
  {
    id: 14,
    title: "X und Y",
    newKeys: ["x", "y"],
    reviewKeys: ["q", "w", "e", "r", "t", "z", "u", "i", "o", "p", "a", "s", "d", "f", "j", "k", "l", "ö", "c", "v", "b", "n", "m"],
    exercises: [
      "xxx yyy xxx yyy",
      "xy yx xy yx",
      "ax sy dx fy",
      "qwer xyu asdf yxcv",
    ],
  },
  {
    id: 15,
    title: "Grundalphabet wiederholen",
    newKeys: [],
    reviewKeys: ["q", "w", "e", "r", "t", "z", "u", "i", "o", "p", "a", "s", "d", "f", "j", "k", "l", "ö", "y", "x", "c", "v", "b", "n", "m"],
    exercises: [
      "asdf jklö qwer tzui yxcv bnm",
      "qwer asdf yxcv tzui jklö bnm",
      "af sj dk fl öa jp qu wi er to",
      "qaz wsx edc rfv tgb zhn ujm iko plö",
    ],
  },
];

const LAST_LESSON_ID = keyboardTrainingLessons[keyboardTrainingLessons.length - 1]?.id ?? 1;

export function getKeyboardLessonById(lessonId: number): KeyboardTrainingLesson {
  const clampedLessonId = Math.min(Math.max(Math.floor(lessonId || 1), 1), LAST_LESSON_ID);
  return keyboardTrainingLessons.find((lesson) => lesson.id === clampedLessonId) ?? keyboardTrainingLessons[0];
}

export function getLastKeyboardLessonId() {
  return LAST_LESSON_ID;
}
