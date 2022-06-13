enum CounterActions {
  STOPWATCH,
  COUNTDOWN,
}

/**
 * Classic stop-watch & countdown component
 */
class Counter {
  private startTime: number;
  private action: CounterActions;
  private currentCount: number;
  private currentAnimationId: number;

  constructor(startTime = 0, action = CounterActions.COUNTDOWN) {
    this.currentCount = startTime;
    this.action = action;
  }

  private updateCounter(timestamp: number) {
    this.currentCount = timestamp;

    if (
      this.action === CounterActions.COUNTDOWN &&
      Math.abs(this.currentCount) <= 0
    ) {
      return this.stop();
    }

    this.currentAnimationId = requestAnimationFrame(this.updateCounter);
  }

  start() {
    if (this.currentAnimationId) {
      return;
    }

    this.currentAnimationId = requestAnimationFrame(this.updateCounter);
  }

  stop() {
    cancelAnimationFrame(this.currentAnimationId);
    this.currentAnimationId = null;
  }

  getMilliseconds() {
    return this.currentCount;
  }

  getSeconds() {
    return Math.floor(Math.abs(this.currentCount) / 1_000) % 60;
  }

  getMinutes() {
    return Math.floor(Math.abs(this.currentCount) / 1_000 / 60) % 60;
  }

  getHours() {
    return Math.floor(Math.abs(this.currentCount) / 1_000 / 60 / 60);
  }
}
