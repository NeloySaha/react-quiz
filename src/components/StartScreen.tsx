type QuestionType = {
  question: string;
  options: [string, string, string, string];
  correctOption: number;
  points: number;
  id?: string;
};

type ActionType = {
  type: string;
  payload?: QuestionType[];
};

type PropsType = {
  questionAmount: number;
  dispatch: (action: ActionType) => void;
};

export default function StartScreen({ questionAmount, dispatch }: PropsType) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz 🤓</h2>
      <h3>{questionAmount} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "startQuiz" });
        }}
      >
        Let's start
      </button>
    </div>
  );
}
