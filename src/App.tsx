import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { TimerDisplay } from "./TimerDisplay";
import StopWatch from "./StopWatch";

const INITIAL_TIME = 3 * 60; // seconds
const INTERVAL = 1000; // ms

const MAX_TIME = 3 * 60 * 1000; // three minutes

export interface AppState {
  maxTime: number;
  elapsedTime: number;
  isActive: boolean;
}

export class App extends React.Component<{}, AppState> {
  private intervalId: NodeJS.Timer | undefined;
  private stopWatch: StopWatch;

  constructor(props: {}) {
    super(props);
    this.state = {
      maxTime: MAX_TIME,
      elapsedTime: 0,
      isActive: false,
    };
    this.stopWatch = new StopWatch((elapsedTime) => {
      this.setState({ elapsedTime });
    }, INTERVAL);

    this.handleStartStopButtonClicked = this.handleStartStopButtonClicked.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    this.stopWatch.stop();
  }

  private handleStartStopButtonClicked() {
    if (this.state.isActive) {
      this.stopWatch.stop();
      this.setState({ isActive: false });
    } else {
      this.stopWatch.start();
      this.setState({ isActive: true });
    }
  }

  render() {
    const { elapsedTime, maxTime } = this.state;
    const time = maxTime - elapsedTime;
    const positiveTime = time > 0 ? time : 0;
    const startStopButtonLabel = this.state.isActive ? "STOP" : "START";
    return (
      <div>
        <CssBaseline/>
        <Container>
          <TimerDisplay time={positiveTime} />
          <br />
          <Button size="large" onClick={this.handleStartStopButtonClicked}>
            {startStopButtonLabel}
          </Button>
        </Container>
      </div>
    );
  }
}
