import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targerTime }) {
  const timer = useRef();
  const dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targerTime * 1000);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targerTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  const handleReset = () => {
    setTimeRemaining(targerTime * 1000);
  }

  const handleStart = () => {
    timer.current = setInterval(() => {
      setTimeRemaining((preTimeRemaining) => preTimeRemaining - 10);
    }, 10);
  };

  const handleStop = () => {
    dialog.current.open();
    clearInterval(timer.current);
  };

  return (
    <>
      <ResultModal ref={dialog} targerTime={targerTime} remainingTime={timeRemaining} onReset={handleReset} />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targerTime} second{targerTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running..." : "Timer inractive"}
        </p>
      </section>
    </>
  );
}
