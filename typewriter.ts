type TypeWriterProps = {
  wordList: string[];
  typeSpeed: number;
  pauseTime: number;
  elementRef: HTMLElement | string;
};

class TypeWriter {
  private wordList: string[];
  private typeSpeed: number;
  private pauseTime: number;
  private letterIdx = 0;
  private wordIdx = 0;
  private paused = false;
  private element: HTMLElement;

  constructor({
    wordList,
    elementRef,
    typeSpeed = 100,
    pauseTime = 1000,
  }: TypeWriterProps) {
    this.typeSpeed = typeSpeed;
    this.pauseTime = pauseTime;
    this.wordList = wordList;
    this.element =
      typeof elementRef === "string"
        ? document.querySelector(elementRef)
        : elementRef;
  }

  private get word() {
    return this.wordList[this.wordIdx];
  }

  private get cursor() {
    return this.word[this.letterIdx];
  }

  private typeKey() {
    if (this.paused) return;
    this.element.textContent = this.word.substring(0, ++this.letterIdx);
  }

  private backspace() {
    if (this.paused) return;
    this.element.textContent = this.word.slice(0, -1);
  }

  private next() {
    if (this.paused) return;
    this.letterIdx = 0;
    this.wordIdx = (this.wordIdx + 1) % this.wordList.length;
    this.start();
  }

  start() {
    const wordLength = this.wordList[this.wordIdx].length;
    const pauseForMs = this.typeSpeed * wordLength + this.pauseTime;

    for (let i = 0; i < wordLength; i++) {
      setTimeout(this.typeKey.bind(this), this.typeSpeed * i);
    }

    setTimeout(() => {
      for (let j = wordLength; j >= 0; j--) {
        setTimeout(this.backspace.bind(this), this.typeSpeed * j);
      }

      setTimeout(this.next.bind(this), pauseForMs);
    }, pauseForMs);
  }

  stop() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
  }
}
