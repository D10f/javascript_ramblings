class Dice {
  constructor(sides) {
    this.sides = sides;
    this.history = [];
  }

  _roll* () {
    while (true) {
      yield Math.floor(Math.random() * this.sides) + 1;
    }
  }

  roll(repeat = 1, options = {}) {
    if (repeat < 1) {
      throw new Error('Invalid number not greater than 0');
    }

    let results = [];

    for (let i = 0; i < repeat; i++) {
      results.push(this._roll());
    }

    this.history = [...this.history, ...results];

    return results.length === 1 ? results[0] : results;
  }

  applyOptions(roll, options) {
    let result = [...roll];

    if (options.hasOwnProperty('min')) {
      result = roll.filter(n => n >= options.min);
    }
    if (options.hasOwnProperty('max')) {
      result = roll.filter(n => n <= options.max);
    }

    const diff = roll.length - result.length;

    if (!diff) {
      return result;
    }

    result = this.applyOptions(result)

  }

  recall(items = 1) {
    return this.history.slice(this.history.length - items);
  }
};
