/**
 * Changes the contents of the target HTML with a new value, transitioning characters individually in a random fashion.
 */
function textTransition({
  element,
  newText,
  maxDuration = 1000,
  entropy = 0.8,
  rate = 125,
  highlight = "#f4c862",
}) {
  let match = false;
  let interval;
  let timeout;

  timeout = setTimeout(() => (match = true), maxDuration);

  let currentTextCharCodeArray = element.textContent
    .split("")
    .map((letter) => letter.charCodeAt(0));

  let newTextCharCodeArray = newText
    .split("")
    .map((letter) => letter.charCodeAt(0));

  let transitionTextCharCodeArray = new Array(newText.length);

  interval = setInterval(() => {
    transitionTextCharCodeArray = newTextCharCodeArray.map((charCode, idx) => {
      if (
        charCode === currentTextCharCodeArray[idx] ||
        charCode === transitionTextCharCodeArray[idx]?.charCode ||
        Math.random() > entropy
      ) {
        return {
          charCode,
          done: true,
        };
      }

      // included characters: A-Z a-z 0-9 "#$%&\'()*+,-./:;<=>?@[\\]^_`{|}
      const randomNum = Math.max(32, Math.floor(Math.random() * 126));

      return {
        charCode: randomNum,
        done: false,
      };
    });

    if (match) {
      element.textContent = newText;
      clearTimeout(timeout);
      clearInterval(interval);
      return;
    }

    if (!highlight) {
      element.textContent = transitionTextCharCodeArray
        .map(({ charCode }) => String.fromCharCode(charCode))
        .join("");
      return;
    }

    element.innerHTML = transitionTextCharCodeArray
      .map(({ charCode, done }) => {
        let color = "";

        if (highlight instanceof Array) {
          color = highlight[Math.floor(Math.random() * highlight.length)];
        }

        return done
          ? `<span>${String.fromCharCode(charCode)}</span>`
          : `<span style="color: ${color || highlight}">${String.fromCharCode(
              charCode
            )}</span>`;
      })
      .join("");
  }, rate);
}
