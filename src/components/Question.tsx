import Options from "./Options";

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

export default function Question({
  questionObj,
  dispatch,
  currentAnswer,
}: Props) {
  const { question } = questionObj;

  return (
    <div>
      <h3>{question}</h3>

      <Options
        questionObj={questionObj}
        dispatch={dispatch}
        currentAnswer={currentAnswer}
      />
    </div>
  );
}
