/**
* Changes the order of the items within an array, without changing the original.
* @return {array}   Copy of the original array with the items in random order.
*/
Array.prototype.shuffle = function() {

  const copy   = [...this];
  const length = this.length;
  const result = new Array(length);

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * copy.length);
    const randomItem = copy.splice(index, 1)[0];
    result[i] = randomItem;
  }

  return result;
};


/**
* Changes the order of the items within an array, without changing the original.
* @param  {object}  options Object specifying indexes on the output array that match values at index from input array
* @return {array}   Copy of the original array with the items in random order.
*/
Array.prototype.shuffleWithOptions = function(options = {}) {

  const copy = [...this];
  const result = new Array(this.length);

  if (!options.hasOwnProperty('inputIdx') || !options.hasOwnProperty('outputIdx')) {
    throw new Error('Missing required option properties.');
  }

  if (!options.inputIdx.hasOwnProperty('length') || !options.outputIdx.hasOwnProperty('length')) {
    throw new Error('options must be specified as arrays');
  }

  // Filter out any duplicates and check if lengths still match
  const inputIdx  = Array.from(new Set(options.inputIdx));
  const outputIdx = Array.from(new Set(options.outputIdx));

  if (inputIdx.length !== outputIdx.length || inputIdx.length < 1) {
    throw new Error('Input and output arrays must contain same number of elements and at least 1 element.')
  }

  const invalidInput = inputIdx.some(item => {
    return typeof item !== 'number' || item < 0 || item >= copy.length;
  });

  const invalidOutput = outputIdx.some(item => {
    return typeof item !== 'number' || item < 0 || item >= copy.length;
  });

  if (invalidInput || invalidOutput) {
    throw new Error('Must contain positive integers within array length');
  }

  // Error checking done: at this point we have two arrays of equal length and
  // numbers ranging from 0 to array length - 1.

  for (let i = 0; i < inputIdx.length; i++) {
    const insertIdx   = outputIdx[i];
    const insertValue = this[inputIdx[i]];
    const removeFromArr = copy.findIndex(item => item === insertValue);

    result[insertIdx] = insertValue;
    copy.splice(removeFromArr, 1);
  }

  for (let i = 0; i < this.length; i++) {

    // If options were provided some spots will be defined already, skip them.
    if (result[i] !== undefined) {
      continue;
    }

    const index = Math.floor(Math.random() * copy.length);
    const randomItem = copy.splice(index, 1)[0];
    result[i] = randomItem;
  }

  return result;
};
