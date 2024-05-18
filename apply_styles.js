const assert = require("assert");
const { describe, mock, test } = require("node:test");

describe("tests the applyStyles function", () => {
  const elem = { style: {} };
  const toCamelCase = mock.fn();

  function applyStyles(element, styles) {
    styles
      .trim()
      .split(";")
      .forEach((style) => {
        const [prop, value] = style.trim().split(":");

        if (!prop) return;

        // @ts-ignore
        element.style[toCamelCase(prop)] = value;
      });
  }

  test("Correctly parses input into valid CSS", () => {
    applyStyles(elem, "font-size: 20px; background-color: red;");
    assert.strictEqual(toCamelCase.mock.calls.length, 2);
    assert.deepEqual(toCamelCase.mock.calls[0].arguments, ["font-size"]);
    assert.deepEqual(toCamelCase.mock.calls[1].arguments, ["background-color"]);
  });

  test("Correctly handles template strings", () => {
    const x = 27.34;
    const y = 55.02;

    applyStyles(
      elem,
      `
      top: ${y}px;
      left: ${x}px;
      `,
    );

    assert.strictEqual(toCamelCase.mock.calls.length, 2);

    assert.deepEqual(toCamelCase.mock.calls[0].arguments, ["top"]);
    assert.deepEqual(toCamelCase.mock.calls[1].arguments, ["left"]);
  });
});
