import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { TimerDisplay } from "./TimerDisplay";
import StopWatch from "./StopWatch";

const INITIAL_TIME = 3 * 60; // seconds
const INTERVAL = 1000; // ms

const MAX_TIME = 3 * 60 * 1000; // three minutes

export interface AppState {
  startTime: number;
  maxTime: number;
  currentTime: number;
}

export class App extends React.Component<{}, AppState> {
  private intervalId: NodeJS.Timer | undefined;
  private stopWatch: StopWatch;

  constructor(props: {}) {
    super(props);
    const currentTime = new Date().getTime();
    this.state = {
      startTime: currentTime,
      maxTime: MAX_TIME,
      currentTime: currentTime,
    };
    this.stopWatch = new StopWatch(() => {
      this.setState({
        currentTime: new Date().getTime(),
      });
    }, INTERVAL);
  }

  componentDidMount() {
    this.stopWatch.start();
  }
  componentWillUnmount() {
    this.stopWatch.stop();
  }
  render() {
    const { currentTime, startTime, maxTime } = this.state;
    const time = maxTime - (currentTime - startTime);
    const positiveTime = time > 0 ? time : 0;
    return (
      <div>
        <CssBaseline/>
        <Container>
          <TimerDisplay time={positiveTime} />
        </Container>
      </div>
    );
  }
}
