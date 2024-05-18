/**
 * Merges two objects or arrays together
 */
function deepMerge(a: any, b: any) {
  if (Array.isArray(a)) {
    return [...a, ...b];
  }

  const res = { ...a };

  for (const key of Object.keys(b)) {
    if (typeof a[key] === "object" || Array.isArray(a[key])) {
      res[key] = deepMerge(a[key], b[key]);
    } else {
      res[key] = b[key];
    }
  }

  return res;
}
