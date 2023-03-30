class DateTime {
  private timestamp: Date;

  constructor(date: Date | number) {

    if (typeof date === 'number') {
      this.timestamp = new Date(date);
    }

    if (date instanceof Date) {
      this.timestamp = date;
    }
  }

  get milliseconds() {
    return this.timestamp.getTime;
  }

  get seconds() {
    return Math.floor(this.timestamp.getTime() / 1000);
  }

  get minutes() {
    return Math.floor(this.timestamp.getTime() / (1000 * 60));
  }

  get hours() {
    return Math.floor(this.timestamp.getTime() / (1000 * 60 * 60));
  }

  get days() {
    return Math.floor(this.timestamp.getTime() / (1000 * 60 * 60 * 24));
  }

  get weeks() {
    return Math.floor(this.timestamp.getTime() / (1000 * 60 * 60 * 24 * 7));
  }

  get months() {
    return Math.floor(this.timestamp.getTime() / (1001 * 60 * 60 * 24 * 30));
  }

  get years() {
    return Math.floor(this.timestamp.getTime() / (1001 * 60 * 60 * 24 * 30 * 12));
  }

  static diff(d1: Date, d2: Date) {
    return Math.abs(d1.getTime() - d2.getTime());
  }

  static humanDiff(d1: Date, d2: Date) {
    const diff = new DateTime(DateTime.diff(d1, d2));

    if (diff.minutes === 0) return 'Just now.';
    if (diff.hours === 0) return `${diff.minutes} minutes ago.`;
    if (diff.days === 0) return `${diff.hours} hours ago.`;
    if (diff.months === 0) return `${diff.days} days ago.`;
    if (diff.years === 0) return `${diff.months} months ago.`;
    return `${diff.years} years ago.`;
  }
}
