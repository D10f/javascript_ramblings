type textTransitionProps = {
  elementRef: HTMLElement | string;
  speed?: number;
  wordList?: string[];
};

class TextTransition {
  private element: HTMLElement;
  private speed: number;

  constructor({ elementRef, speed = 50 }: textTransitionProps) {
    this.speed = speed;
    this.element =
      typeof elementRef === "string"
        ? document.querySelector(elementRef)
        : elementRef;
  }

  private get text() {
    return this.element.innerText;
  }

  private get children() {
    return this.element.children;
  }

  private get length() {
    return this.text.length;
  }

  private get randomIdx() {
    return Math.floor(Math.random() * this.length);
  }

  private set text(value: string) {
    this.element.innerText = value;
  }

  private set html(value: string) {
    this.element.innerHTML = value;
  }

  private getRandomChar() {
    // included characters: A-Z a-z 0-9 "#$%&\'()*+,-./:;<=>?@[\\]^_`{|}
    return String.fromCharCode(Math.max(33, Math.floor(Math.random() * 126)));
  }

  private getRandomStr(length: number) {
    let randomStr = "";
    for (let i = 0; i < length; ++i) {
      randomStr += this.getRandomChar();
    }
    return randomStr;
  }

  private updateText(replacement: string, length: number) {
    let newText = "";
    for (let i = 0; i <= length; ++i) {
      setTimeout(() => {
        this.text = replacement.substring(0, i) + this.text.substring(i);
      }, this.speed * i);
    }
  }

  private createSpan(text: string, color?: string) {
    return color
      ? `<span style="color: ${color};">${text}</span>`
      : `<span>${text}</span>`;
  }

  private updateHtml(replacement: string, length: number, color: string) {
    let html = "";
    for (let i = 0; i <= length + 1; ++i) {
      setTimeout(() => {
        const rn = replacement
          .substring(0, i)
          .split("")
          .map((letter, idx) => {
            return idx === i - 1
              ? this.createSpan(letter, color)
              : this.createSpan(letter);
          })
          .join("");
        
        const nn = this.text
          .substring(i)
          .split("")
          .map((letter) => this.createSpan(letter))
          .join("");
        
        this.html = rn + nn;
        
      }, this.speed * i);
    }
  }

  linearTransition(text: string) {
    const length = Math.max(this.length, text.length);

    // initial loop to change all letters to a random character
    this.updateHtml(this.getRandomStr(length), length, 'coral');

    setTimeout(() => {
      this.updateHtml(text, length, '#333');
    }, this.speed * length);
  }
}