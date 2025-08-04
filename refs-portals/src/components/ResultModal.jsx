import { createPortal } from "react-dom";
import { useImperativeHandle, useRef } from "react";

export default function ResultModal({
  targerTime,
  ref,
  remainingTime,
  onReset,
}) {
  const dialog = useRef();

  const userLost = remainingTime <= 0;
  const formattedRemaingTime = (remainingTime / 1000).toFixed(2);

  const score = Math.round((1 - remainingTime / (targerTime * 1000)) * 100);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
        /*
            If dialog change to a different element, you can:
            - Edit your logic here to handle the opening of the dialog.
        */
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLost && <h2>Your lost!</h2>}
      {!userLost && <h2>Your score is {score}!</h2>}
      <p>
        The target time was <strong>{targerTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formattedRemaingTime} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  );
}
