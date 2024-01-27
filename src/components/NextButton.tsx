import { useQuiz } from "../customHooks/useQuiz";

export default function NextButton() {
  const {
    dispatch,
    currentAnswer,
    activeQuestionIndex: currentQuestion,
    questions,
  } = useQuiz();
  const totalQuestions = questions.length;

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
