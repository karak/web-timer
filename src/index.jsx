import "./style.scss";
import React from "react";
import ReactDOM from "react-dom";

function toTwoDigits(n) {
  return n.toFixed(0).padStart(2, "0");
}

const INITIAL_TIME = 3 * 60; // seconds
const INTERVAL = 1; // ms

/**
 * Display time.
 * @param time: number - time in milliseconds
 */
const TimerDisplay = ({ time }) => {
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

class App extends React.Component {
  constructor(props) {
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
    clearInterval(this.intervalId);
  }
  render() {
    const { currentTime, startTime, maxTime } = this.state;
    const time = maxTime - (currentTime - startTime);
    const positiveTime = time > 0 ? time : 0;
    return <TimerDisplay time={positiveTime} />;
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
