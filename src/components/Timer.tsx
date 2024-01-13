import { useEffect } from "react";
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
  timer: number;
  dispatch: (action: ActionType) => void;
};

export default function Timer({ timer, dispatch }: Props) {
  useEffect(() => {
    const timerId = setInterval(() => {
      dispatch({
        type: "decreaseTime",
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [dispatch]);

  const seconds = String(timer - Math.floor(timer / 60) * 60).padStart(2, "0");
  const minutes = String(Math.floor(timer / 60)).padStart(2, "0");

  return <div className="timer">{`${minutes}:${seconds}`}</div>;
}
