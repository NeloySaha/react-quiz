import { useQuiz } from "../customHooks/useQuiz";

export default function StartScreen() {
  const { questions, dispatch } = useQuiz();
  const questionAmount = questions.length;

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
