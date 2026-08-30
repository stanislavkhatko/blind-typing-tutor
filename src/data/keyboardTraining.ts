export interface KeyboardTrainingLesson {
  id: string;
  title: string;
  patterns: string[];
}

export const keyboardTrainingLessons: KeyboardTrainingLesson[] = [
  {
    id: "home-row-fj",
    title: "F und J",
    patterns: [
      "fff jjj fff jjj",
      "fj fj fj fj",
      "jf jf jf jf",
      "ffff jjjj ffff jjjj",
    ],
  },
  {
    id: "home-row-dk",
    title: "D und K",
    patterns: [
      "ddd kkk ddd kkk",
      "dk dk dk dk",
      "kd kd kd kd",
      "dddd kkkk dddd kkkk",
    ],
  },
  {
    id: "home-row-sl",
    title: "S und L",
    patterns: [
      "sss lll sss lll",
      "sl sl sl sl",
      "ls ls ls ls",
      "ssss llll ssss llll",
    ],
  },
  {
    id: "home-row-a-oe",
    title: "A und Ö",
    patterns: [
      "aaa ööö aaa ööö",
      "aö aö aö aö",
      "öa öa öa öa",
      "aaaa öööö aaaa öööö",
    ],
  },
  {
    id: "home-row-combo",
    title: "Grundreihe",
    patterns: [
      "asdf jklö asdf jklö",
      "fdsa ölkj fdsa ölkj",
      "asdf jklö",
      "fdsa ölkj",
    ],
  },
];

