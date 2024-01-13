type QuestionType = {
  question: string;
  options: [string, string, string, string];
  correctOption: number;
  points: number;
  id?: string;
};

type ActionType = {
  type: string;
  payload?: QuestionType[] | number;
};

type Props = {
  dispatch: (action: ActionType) => void;
  currentAnswer: number | null;
  currentQuestion: number;
  totalQuestions: number;
};

export default function NextButton({
  dispatch,
  currentAnswer,
  currentQuestion,
  totalQuestions,
}: Props) {
  if (currentAnswer === null) return null;

  if (currentQuestion < totalQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({
            type: "nextQuestion",
          });
        }}
      >
        Next
      </button>
    );
  }

  if (currentQuestion === totalQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({
            type: "finishQuiz",
          });
        }}
      >
        Finish
      </button>
    );
  }
}
