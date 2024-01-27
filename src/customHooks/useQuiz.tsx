import { useContext } from "react";
import { QuizContext } from "../contexts/QuizContext";
import { QuizContextType } from "../types/allTypes";

function useQuiz() {
  const context = useContext(QuizContext) as QuizContextType;
  if (context === undefined)
    throw new Error("QuizContext is used outside the Provider");

  return context;
}

export { useQuiz };
