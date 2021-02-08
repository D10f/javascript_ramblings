/**
* Changes the order of the items within an array, without changing the original.
* @param  {object}  options Object specifying index location from original and result array.
* @return {array}   Copy of the original array with the items in random order.
*/
Array.prototype.shuffle = function(options = {}) {

  const copy = [...this];
  const result = new Array(this.length);
  const properties = Object.getOwnPropertyNames(options);

  if (properties) {

    // Error checking: cannot provide more indexes than there are items
    if (properties.length > this.length) {
      throw new Error('Unable to proccess more items than there are!')
    }

    for (const [originIdx, targetIdx] of Object.entries(options)) {

      // Error checking: can't use out of bound or invalid (non-integer) indexes
      if (
        isNaN(Number(targetIdx)) ||
        isNaN(Number(originIdx)) ||
        targetIdx < 0            ||
        targetIdx > this.length  ||
        originIdx < 0            ||
        originIdx > this.length
      ) {
        throw new Error('You must provide only indexes within array length')
      }

      result[targetIdx] = copy.splice(originIdx, 1)[0];
    }
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
