export default class StopWatch {
  private intervalId: NodeJS.Timer | undefined;
  private interval: number;
  private startTime: number = 0;
  private currentTime: number = 0;
  private callback: () => void;

  constructor(callback: (elapsedTime: number) => void, interval: number) {
    this.interval = interval;
    this.callback = () => {
      this.refreshElapsedTime();
      callback(this.getElapsedTime());
    }
  }

  private refreshElapsedTime() {
    const currentTime = new Date().getTime();
    this.currentTime = currentTime;
  }

  private getElapsedTime() {
    return this.currentTime - this.startTime;
  }

  start(): void {
    const ellapsedTime = this.getElapsedTime();
    this.refreshElapsedTime();
    this.startTime =  this.currentTime - ellapsedTime;
    this.intervalId = setInterval(this.callback, this.interval);
  }

  stop(): void {
    clearInterval(this.intervalId!);
    this.callback();
  }
}
