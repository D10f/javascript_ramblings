interface ITextTransition {
  element: HTMLElement;
  newText: string;
  maxDuration: number;
  entropy: number;
  rate: number;
  highlight: string | string[] | false;
}

interface ITransitionCharObject {
  charCode: number;
  done: boolean;
}

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
}: ITextTransition) {
  let match = false;
  let timeout: number;
  let interval: number;

  timeout = setTimeout(() => (match = true), maxDuration);

  const currentTextCharCodeArray: number[] = element.textContent!
    .split("")
    .map((letter: string) => letter.charCodeAt(0));

  const newTextCharCodeArray: number[] = newText
    .split("")
    .map((letter: string) => letter.charCodeAt(0));

  let transitionTextCharCodeArray: ITransitionCharObject[] = new Array().fill({ charCode: 0, done: false });

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

    if (!match) {
      element.textContent = newText;
      clearTimeout(timeout);
      clearInterval(interval);
      return;
    }

    if (!highlight) {
      element.textContent = transitionTextCharCodeArray
        .map(({ charCode }: ITransitionCharObject) =>
          String.fromCharCode(charCode)
        )
        .join("");
    } else {
      element.innerHTML = transitionTextCharCodeArray
        .map(({ charCode, done }: ITransitionCharObject) => {
          let color = '';

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
    }
  }, rate);
}
