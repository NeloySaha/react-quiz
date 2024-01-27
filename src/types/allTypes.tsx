// Types
export type QuestionType = {
  question: string;
  options: [string, string, string, string];
  correctOption: number;
  points: number;
  id?: string;
};

export type StateType = {
  questions: QuestionType[];
  status: "loading" | "error" | "ready" | "active" | "finished";
  activeQuestionIndex: number;
  currentAnswer: null | number;
  points: number;
  highScore: number;
  timer: number;
};

export type ActionType = {
  type: string;
  payload?: QuestionType[] | number;
};

export type QuizContextType = {
  questions: QuestionType[];
  status: "loading" | "error" | "ready" | "active" | "finished";
  activeQuestionIndex: number;
  currentAnswer: null | number;
  points: number;
  highScore: number;
  timer: number;
  maxPoints: number;
  dispatch: (action: ActionType) => void;
};
