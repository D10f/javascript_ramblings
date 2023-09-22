export function resizeArray(
  arr: any[],
  newSize = arr.length * 2,
  defaultValue = null,
) {
  const currentSize = arr.length;
  arr.length = newSize;
  arr.fill(defaultValue, currentSize, newSize);
}
