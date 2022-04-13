export default class StopWatch {
  private intervalId: NodeJS.Timer | undefined;
  private interval: number;
  private currentValue: number = 0;
  private callback: () => void;

  constructor(callback: (currentValue: number) => void, interval: number) {
    this.interval = interval;
    this.callback = () => callback(this.currentValue);
  }

  start(): void {
    this.intervalId = setInterval(this.callback, this.interval);
  }

  stop(): void {
    clearInterval(this.intervalId!);
  }
}
