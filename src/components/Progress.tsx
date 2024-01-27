import { useQuiz } from "../customHooks/useQuiz";

// true means 1
// false means 0

export default function Progress() {
  const {
    points,
    maxPoints,
    currentAnswer,
    questions,
    activeQuestionIndex: currentQuestion,
  } = useQuiz();
  const totalQuestions = questions.length;

  return (
    <header className="progress">
      <progress
        value={currentQuestion + Number(currentAnswer !== null)}
        max={totalQuestions}
      />

      <p>
        Question <strong>{currentQuestion + 1}</strong> / {totalQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}
