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
  points: number;
  maxPoints: number;
  highScore: number;
  dispatch: (action: ActionType) => void;
};

export default function FinishScreen({
  points,
  maxPoints,
  highScore,
  dispatch,
}: Props) {
  const percentage = Math.round((points / maxPoints) * 100);

  let emoji;

  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "😀";
  if (percentage > 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of
        {" " + maxPoints} ({percentage}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>

      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({
            type: "restartQuiz",
          });
        }}
      >
        Restart Quiz
      </button>
    </>
  );
}
