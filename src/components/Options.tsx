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
  questionObj: QuestionType;
  dispatch: (action: ActionType) => void;
  currentAnswer: number | null;
};
export default function Options({
  questionObj,
  dispatch,
  currentAnswer,
}: Props) {
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
