import { useState } from "react";
import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";
import QUESTION from "../data/questions.js";

const TIMER = 10000;
const TIMER_ANSWERED = 1000;
const TIMER_CHECK_ANSWER = 2000;

export default function Question({
  questionIndex,
  onSelectAnswer,
  onSkipAnswer,
}) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timer = TIMER;

  if (answer.selectedAnswer) {
    timer = TIMER_ANSWERED;
  }

  if (answer.isCorrect !== null) {
    timer = TIMER_CHECK_ANSWER;
  }

  const handleSelectAnswer = (answer) => {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: answer === QUESTION[questionIndex].answers[0],
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, TIMER_CHECK_ANSWER);
    }, TIMER_ANSWERED);
  };

  let answerState = "";

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{QUESTION[questionIndex].text}</h2>
      <Answers
        answers={QUESTION[questionIndex].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
