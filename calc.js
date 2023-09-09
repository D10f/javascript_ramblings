/**
 * Simple calculator implemented using JavaScript arithmetic.
 *
 * Fully-featured calculator using an AST-based math interpreted:
 * https://github.com/D10f/calculator_parser
 *
 * Codepen with graphical interface:
 * https://codepen.io/D10f/pen/XWoMJZE
 *
 * TODO:
 *   - Fix Bugs.
 *   - Implement modulus operator.
 *   - (web version only) Handle input.
 *   - (web version only) Handle keyboard events.
 *   - (web version only) Allow delete single characters from input.
 *   - (web version only) Implement input history.
 *   - (web version only) Display result of operation separately from input;
 *
 * KNOWN BUGS:
 *   - Divide by 0 returns Infinity.
 *   - (web version only) Cannot handle negative numbers.
 */

const assert = require("assert");

function calculate(expression) {
  let [left, operator, ...right] = expression;

  if (expression.length === 0) return 1;
  if (expression.length === 1) return Number(left) || 1;

  if (left === "(") {
    const _expression = reduceExpression(expression);
    return calculate([calculate(_expression[0]), ..._expression[1]]);
  } else if (left === ")") {
    throw new Error("Malformed expression!");
  }

  if (right[0] === "(") {
    const _expression = reduceExpression(right);
    right = [calculate(_expression[0]), ..._expression[1]];
  } else if (right[0] === ")") {
    throw new Error("Malformed expression!");
  }

  let _left;
  let _right;

  switch (operator) {
    case "+":
      return left + calculate(right);

    case "-":
      return left - calculate(right);

    case "*":
      _left = left * right[0];
      _right = right.slice(1);
      return _right.length === 0 ? _left : calculate([_left, ..._right]);

    case "/":
      _left = left / right[0];
      _right = right.slice(1);
      return _right.length === 0 ? _left : calculate([_left, ..._right]);

    case "^":
      _left = left ** right[0];
      _right = right.slice(1);
      return _right.length === 0 ? _left : calculate([_left, ..._right]);
  }
}

function reduceExpression(expression) {
  let parenCount = 0;

  for (let i = 0; i < expression.length; i++) {
    switch (expression[i]) {
      case ")":
        parenCount--;
        break;
      case "(":
        parenCount++;
        break;
    }
    if (parenCount === 0)
      return [expression.slice(1, i), expression.slice(i + 1)];
  }

  throw new Error("Malformed expression!");
}

assert.throws(() => calculate(["(", 2, "+", 2]), "Error: Malformed expression");
assert.throws(
  () => calculate([")", 2, "+", 2]),
  "Error: Malformed expression!",
);
assert.throws(() => calculate([2, "+", ")"]), "Error: Malformed expression!");

assert.strictEqual(calculate([]), 1);
assert.strictEqual(calculate(["+"]), 1);
assert.strictEqual(calculate([23]), 23);
assert.strictEqual(calculate([5, "+", 6]), 11);
assert.strictEqual(calculate([5, "+", 6, "*", 8]), 53);
assert.strictEqual(calculate([5, "*", 6, "+", 8]), 38);
assert.strictEqual(calculate([5, "+", 6, "*", 8, "*", 2]), 101);
assert.strictEqual(calculate([5, "*", 6, "+", 8, "*", 2]), 46);
assert.strictEqual(calculate([5, "*", 6, "/", 8, "*", 2]), 7.5);
assert.strictEqual(calculate([5, "*", 6, "/", "(", 8, "*", 2, ")"]), 1.875);
assert.strictEqual(calculate([5, "*", 6, "-", 8, "/", 2]), 26);
assert.strictEqual(calculate([5, "^", 2]), 25);
assert.strictEqual(calculate([-20, "+", 33]), 13);
assert.strictEqual(calculate([-20, "-", 33]), -53);
assert.strictEqual(calculate(["(", 5, "+", 6, ")", "*", 8]), 88);

assert.strictEqual(
  calculate(["(", 5, "+", "(", 6, "+", 2, "^", 2, ")", ")", "*", 8]),
  120,
);
assert.strictEqual(
  calculate(["(", 5, "*", "(", 6, "+", 2, "^", 2, ")", ")", "*", 8]),
  400,
);
assert.strictEqual(calculate([8, "*", "(", 2, "+", 2, ")"]), 32);
assert.strictEqual(calculate([37, "*", 5]), 185);
assert.strictEqual(calculate([37, "*", 0]), 0);
assert.strictEqual(calculate([37, "/", 0]), Infinity);

console.log("All assertions passed!");
