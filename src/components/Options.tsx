import { useQuiz } from "../customHooks/useQuiz";

export default function Options() {
  const { questions, dispatch, currentAnswer, activeQuestionIndex } = useQuiz();
  const questionObj = questions[activeQuestionIndex];
  const { options, correctOption } = questionObj;

  const optionsJsx = options.map((option, index) => (
    <button
      key={option}
      className={`btn btn-option ${currentAnswer === index ? "answer" : ""} ${
        currentAnswer !== null &&
        (correctOption === index ? "correct" : "wrong")
      }`}
      disabled={currentAnswer !== null}
      onClick={() => {
        dispatch({
          type: "newAnswer",
          payload: index,
        });
      }}
    >
      {option}
    </button>
  ));
  return <div className="options">{optionsJsx}</div>;
}
