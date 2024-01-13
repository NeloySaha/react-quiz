import { useEffect, useReducer } from "react";

import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

// Types
type QuestionType = {
  question: string;
  options: [string, string, string, string];
  correctOption: number;
  points: number;
  id?: string;
};

type StateType = {
  questions: QuestionType[];
  status: "loading" | "error" | "ready" | "active" | "finished";
  activeQuestionIndex: number;
  currentAnswer: null | number;
  points: number;
  highScore: number;
  timer: number;
};

type ActionType = {
  type: string;
  payload?: QuestionType[] | number;
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

function App() {
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
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}

        {status === "error" && <Error />}

        {status === "ready" && (
          <StartScreen questionAmount={questions.length} dispatch={dispatch} />
        )}

        {status === "active" && (
          <>
            <Progress
              currentQuestion={activeQuestionIndex}
              totalQuestions={questions.length}
              points={points}
              maxPoints={maxPoints}
              currentAnswer={currentAnswer}
            />

            <Question
              questionObj={questions[activeQuestionIndex]}
              dispatch={dispatch}
              currentAnswer={currentAnswer}
            />

            <Footer>
              <Timer timer={timer} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                currentAnswer={currentAnswer}
                currentQuestion={activeQuestionIndex}
                totalQuestions={questions.length}
              />
            </Footer>
          </>
        )}

        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
