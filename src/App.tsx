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
  startTime: number;
  maxTime: number;
  currentTime: number;
  isActive: boolean;
}

export class App extends React.Component<{}, AppState> {
  private intervalId: NodeJS.Timer | undefined;
  private stopWatch: StopWatch;

  constructor(props: {}) {
    super(props);
    this.state = {
      startTime: 0,
      maxTime: MAX_TIME,
      currentTime: 0,
      isActive: false,
    };
    this.stopWatch = new StopWatch(() => {
      this.setState({
        currentTime: new Date().getTime(),
      });
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
      const ellapsedTime = this.state.currentTime - this.state.startTime;
      const currentTime = new Date().getTime();
      const startTime =  currentTime - ellapsedTime;
      this.stopWatch.start();
      this.setState({ isActive: true, startTime, currentTime });
    }
  }

  render() {
    const { currentTime, startTime, maxTime } = this.state;
    const ellapsedTime = maxTime - (currentTime - startTime);
    const positiveEllapsedTime = ellapsedTime > 0 ? ellapsedTime : 0;
    const startStopButtonLabel = this.state.isActive ? "STOP" : "START";
    return (
      <div>
        <CssBaseline/>
        <Container>
          <TimerDisplay time={positiveEllapsedTime} />
          <br />
          <Button size="large" onClick={this.handleStartStopButtonClicked}>
            {startStopButtonLabel}
          </Button>
        </Container>
      </div>
    );
  }
}
