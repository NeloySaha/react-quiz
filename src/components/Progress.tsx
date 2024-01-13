type Props = {
  currentQuestion: number;
  totalQuestions: number;
  points: number;
  maxPoints: number;
  currentAnswer: null | number;
};

// true means 1
// false means 0

export default function Progress({
  currentQuestion,
  totalQuestions,
  points,
  maxPoints,
  currentAnswer,
}: Props) {
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
