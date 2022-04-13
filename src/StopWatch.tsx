export default class StopWatch {
  private intervalId: NodeJS.Timer | undefined;
  private interval: number;
  private startTime: number = 0;
  private currentTime: number = 0;
  private callback: () => void;

  constructor(callback: (elapsedTime: number) => void, interval: number) {
    this.interval = interval;
    this.callback = () => callback(this.getElapsedTime());
  }

  private getElapsedTime() {
    return this.currentTime - this.startTime;
  }

  start(): void {
    const ellapsedTime = this.getElapsedTime();
    const currentTime = new Date().getTime();
    const startTime =  currentTime - ellapsedTime;
    this.currentTime = currentTime;
    this.startTime = startTime;
    this.intervalId = setInterval(this.callback, this.interval);
  }

  stop(): void {
    clearInterval(this.intervalId!);
  }
}
