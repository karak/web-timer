import "./style.scss";
import React from "react";
import ReactDOM from "react-dom";

function toTwoDigits(n: number): string {
  return n.toFixed(0).padStart(2, "0");
}

const INITIAL_TIME = 3 * 60; // seconds
const INTERVAL = 1; // ms

/**
 * Display time.
 * @param time: number - time in milliseconds
 */
const TimerDisplay: React.FC<{ time: number }> = ({ time }) => {
  const totalSeconds = Math.floor(time / 1000);
  const mm = toTwoDigits(Math.floor(totalSeconds / 60));
  const ss = toTwoDigits(totalSeconds % 60);

  return (
    <span className="timer-display">
      {mm}:{ss}
    </span>
  );
};

const MAX_TIME = 3 * 60 * 1000; // three minutes

interface AppState {
  startTime: number;
  maxTime: number;
  currentTime: number;
}
class App extends React.Component<{}, AppState> {
  private intervalId: NodeJS.Timer | undefined;

  constructor(props: {}) {
    super(props);
    const currentTime = new Date().getTime();
    this.state = {
      startTime: currentTime,
      maxTime: MAX_TIME,
      currentTime: currentTime,
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState({
        currentTime: new Date().getTime(),
      });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId!);
  }
  render() {
    const { currentTime, startTime, maxTime } = this.state;
    const time = maxTime - (currentTime - startTime);
    const positiveTime = time > 0 ? time : 0;
    return <TimerDisplay time={positiveTime} />;
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
