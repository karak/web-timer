import React from "react";

export function toTwoDigits(n: number): string {
  return n.toFixed(0).padStart(2, "0");
}

/**
 * @see TimerDisplay props.
 */
export interface TimerDisplayProps {
    /** Time to show in milliseconds */
    time: number;
}

/**
 * Display time.
 */
export const TimerDisplay: React.FC<TimerDisplayProps> = ({ time }) => {
  const totalSeconds = Math.floor(time / 1000);
  const mm = toTwoDigits(Math.floor(totalSeconds / 60));
  const ss = toTwoDigits(totalSeconds % 60);

  return (
    <span className="timer-display">
      {mm}:{ss}
    </span>
  );
}
