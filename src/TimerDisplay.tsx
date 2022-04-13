import React from "react";
import { styled } from "@mui/system";

export function toTwoDigits(n: number): string {
  return n.toFixed(0).padStart(2, "0");
}

const StyledSpan = styled("span")({
  color: "#0af",
  fontFamily: "'Noto Sans Mono', monospace",
  fontSize: "80px",
});

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
    <StyledSpan>
      {mm}:{ss}
    </StyledSpan>
  );
}
