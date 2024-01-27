import { useEffect } from "react";
import { useQuiz } from "../customHooks/useQuiz";

export default function Timer() {
  const { timer, dispatch } = useQuiz();

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
