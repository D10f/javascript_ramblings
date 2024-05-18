/**
 * Exactly what it sounds like: converts input string into camelCase.
 */
export function toCamelCase(str = "", pattern = /[\s_\-]+/) {
  let res = "";
  if (!str) return res;
  const words = str.split(pattern);

  for (let i = 0; i < words.length; ++i) {
    if (i === 0) res += words[i].toLowerCase();
    else res += words[i][0].toUpperCase() + words[i].substring(1).toLowerCase();
  }

  return res;
}
