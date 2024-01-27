import { createContext, useEffect, useReducer } from "react";
import {
  ActionType,
  QuestionType,
  QuizContextType,
  StateType,
} from "../types/allTypes";

type Props = {
  children: React.ReactNode;
};

// useReducer management parts
const initialState: StateType = {
  questions: [],
  status: "loading",
  activeQuestionIndex: 0,
  currentAnswer: null,
  points: 0,
  highScore: Number(localStorage.getItem("highestScore")) | 0,
  timer: 300,
};

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: (action.payload as QuestionType[]) ?? state.questions,
        status: "ready",
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "startQuiz":
      return { ...state, status: "active" };
    case "newAnswer": {
      const { correctOption, points } = state.questions.at(
        state.activeQuestionIndex
      ) as QuestionType;

      return {
        ...state,
        currentAnswer: (action.payload as number) ?? state.currentAnswer,
        points:
          correctOption === (action.payload as number)
            ? state.points + points
            : state.points,
      };
    }
    case "nextQuestion":
      return {
        ...state,
        currentAnswer: null,
        activeQuestionIndex: state.activeQuestionIndex + 1,
      };
    case "finishQuiz":
      return {
        ...state,
        status: "finished",
        highScore:
          state.highScore < state.points ? state.points : state.highScore,
      };
    case "restartQuiz":
      return {
        ...initialState,
        questions: state.questions,
        status: "active",
      };
    case "decreaseTime":
      return {
        ...state,
        timer: state.timer - 1,
        status: state.timer <= 0 ? "finished" : "active",
      };

    default:
      return initialState;
  }
}

const QuizContext = createContext<null | QuizContextType>(null);

function QuizProvider({ children }: Props) {
  const [
    {
      status,
      questions,
      activeQuestionIndex,
      currentAnswer,
      points,
      highScore,
      timer,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const maxPoints = questions.reduce(
    (acc, currentObj) => acc + currentObj.points,
    0
  );

  const getData = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}`);
      const data = await res.json();

      dispatch({
        type: "dataReceived",
        payload: data,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: "dataFailed",
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    localStorage.setItem("highestScore", `${highScore}`);
  }, [highScore]);
  return (
    <QuizContext.Provider
      value={{
        status,
        questions,
        activeQuestionIndex,
        currentAnswer,
        points,
        highScore,
        timer,
        maxPoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export { QuizProvider, QuizContext };
