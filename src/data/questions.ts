export interface Question {
  id: number;
  text: string;
  correct: "vrai" | "faux";
}

export const questions: Question[] = [
  {
    id: 1,
    text: "Massinissa a de mauvais souvenirs de ses vacances.",
    correct: "faux",
  },
  {
    id: 2,
    text: "Le fennec vit dans le désert.",
    correct: "vrai",
  },
  {
    id: 3,
    text: "Il a de longues oreilles.",
    correct: "vrai",
  },
  {
    id: 4,
    text: "Il a une petite queue.",
    correct: "faux",
  },
];
