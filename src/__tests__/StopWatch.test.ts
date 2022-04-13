import StopWatch from "../StopWatch";

const INTERVAL = 1000;

describe("StopWatch", () => {
  beforeAll(() => jest.useFakeTimers());

  afterAll(() => jest.useRealTimers());

  it("should call callback after ticked", () => {
    const fn = jest.fn();
    const stopWatch = new StopWatch(fn, INTERVAL);
    stopWatch.start();
    jest.advanceTimersByTime(INTERVAL);
    expect(fn).toHaveBeenCalled();
  });

  it("should call callback after ticked less", () => {
    const fn = jest.fn();
    const stopWatch = new StopWatch(fn, INTERVAL);
    stopWatch.start();
    jest.advanceTimersByTime(INTERVAL - 1);
    expect(fn).not.toHaveBeenCalled();
  });

  it("shouldn't call callback when stopped", () => {
    const fn = jest.fn();
    const stopWatch = new StopWatch(fn, INTERVAL);
    stopWatch.start();
    jest.advanceTimersByTime(INTERVAL / 2);
    stopWatch.stop();
    jest.advanceTimersByTime(INTERVAL);
    expect(fn).not.toHaveBeenCalled();
  });

  it("should call callback when restarted", () => {
    const fn = jest.fn();
    const stopWatch = new StopWatch(fn, INTERVAL);
    stopWatch.start();
    stopWatch.stop();
    stopWatch.start();
    jest.advanceTimersByTime(INTERVAL);
    expect(fn).toHaveBeenCalled();
  });
});