class Dice {
  constructor(sides) {
    if (sides < 3) {
      throw new Error('Dice must have at least 3 sides');
    }

    this.sides = sides;
    this.history = [];
    this.maxHistory = 100;
  }

  getHistory() {
    return this.history;
  }

  clearHistory() {
    this.history = [];
  }

  /**
  * Represents a dice roll
  * @param  {number} times  Number of times the dice is rolled
  * @return {array}         Array with the result of the rolls
  */
  roll(times = 1) {

    if (typeof times !== 'number' || times < 1) {
      throw new Error('You must provide a valid number greater than 0');
    }

    let result = [];

    for (let i = 0; i < times; i++) {
      const roll = Math.floor(Math.random() * this.sides + 1);
      result.push(roll);
    }

    // Append results to history and get rid of results beyond the max allowed
    this.history = [...this.history, ...result];

    if (this.history.length > this.maxHistory) {
      this.history.splice(0, this.history.length - this.maxHistory);
    }

    return result;
  }

  /**
  * Represents a dice roll with special conditions
  * @param  {number}         times    Number of times the dice is rolled
  * @param  {array|function} options  Options to filter down results of the roll
  * @return {array}                   Array with the result of the rolls
  */
  rollWithOptions(times = 1, options = undefined) {

    let exclude = [];

    switch (typeof options) {
      case 'object':
        return this._rollWithArray(times, options);
      case 'function':
        return this._rollWithFunction(times, options);
      default:
        return this.roll(times);
    }
  }


  /**
  * Represents a dice roll with special conditions
  * @param  {number}  times    Number of times the dice is rolled
  * @param  {array}   options  Array of numbers to exclude from the results
  * @return {array}            Array with the result of the rolls
  */
  _rollWithArray(times, arr) {
    if (!arr.hasOwnProperty('length')) {
      throw new Error('You must provide an array or a function')
    }

    const exclude = Array.from(new Set(arr));

    if (exclude.some(num => typeof num !== 'number')) {
      throw new Error('You can only specify numbers to exclude');
    }

    if (arr.length >= this.sides) {
      throw new Error('You cannot exclude all options!');
    }

    let result = this.roll(times).filter(dice => !exclude.includes(dice));
    let repeat = 0;

    while (result.length < times) {
      repeat = times - result.length;
      result = result.concat(this.roll(repeat).filter(dice => !exclude.includes(dice)));
    }

    return result;
  }

  /**
  * Represents a dice roll with special conditions
  * @param  {number}    times    Number of times the dice is rolled
  * @param  {function}  options  Filters down results based on custom behavior
  * @return {array}              Array with the result of the rolls
  */
  _rollWithFunction(times, fn) {
    if (typeof fn !== 'function') {
      throw new Error('You must provide an array or a function');
    }

    let result = this.roll(times).filter(fn);
    let repeat = 0;

    while (result.length < times) {
      repeat = times - result.length;
      result = result.concat(this.roll(repeat).filter(fn));
    }

    return result;
  }
}
