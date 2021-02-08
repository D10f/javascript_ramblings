/**
* Changes the order of the items within an array, without changing the original.
* @param  {object}  options Optional: Object specifying index values to left unchanged.
* @return {array}   Copy of the original array with the items in random order.
*/
Array.prototype.shuffle = function(options = {}) {

  const copy = [...this];
  const result = new Array(this.length);
  const properties = Object.getOwnPropertyNames(options);

  if (properties) {

    if (properties.length > this.length) {
      throw new Error('Unable to proccess more items than there are!')
    }

    for (const [targetIdx, originIdx] of Object.entries(options)) {

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

  const length = copy.length;

  for (let i = 0; i < length; i++) {
    if (result[i] !== undefined) {
      continue;
    }

    const index = Math.floor(Math.random() * copy.length);
    const randomItem = copy.splice(index, 1)[0];
    result[i] = randomItem;
  }

  return result;
};
