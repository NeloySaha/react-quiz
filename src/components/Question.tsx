import { useQuiz } from "../customHooks/useQuiz";
import Options from "./Options";

export default function Question() {
  const { questions, activeQuestionIndex } = useQuiz();
  const questionObj = questions[activeQuestionIndex];

  return (
    <div>
      <h3>{questionObj.question}</h3>

      <Options />
    </div>
  );
}
