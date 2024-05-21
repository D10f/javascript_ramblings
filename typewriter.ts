const ubuntuCodenames = [
  "Warty Warthog",
  "Hoary Hedgehog",
  "Breezy Badger",
  "Dapper Drake",
  "Edgy Eft",
  "Feisty Fawn",
  "Gutsy Gibbon",
  "Hardy Heron",
  "Intrepid Ibex",
  "Jaunty Jackalope",
  "Karmic Koala",
  "Lucid Lynx",
  "Maverick Meerkat",
  "Natty Narwhal",
  "Oneiric Ocelot",
  "Precise Pangolin",
  "Quantal Quetzal",
  "Raring Ringtail",
  "Saucy Salamander",
  "Utopic Unicorn",
  "Vivid Vervet",
  "Wily Werewolf",
  "Yakkety Yak",
  "Zesty Zapus",
  "Artful Aardvark",
  "Cosmic Cuttlefish",
  "Disco Dingo",
  "Eoan Ermine",
  "Groovy Gorilla",
  "Hirsute Hippo",
  "Impish Indri",
  "Kinetic Kudu",
  "Lunar Lobster",
  "Trusty Tahr",
  "Xenial Xerus",
  "Bionic Beaver",
  "Focal Fossa",
  "Jammy Jellyfish",
  "Mantic Minotaur",
  "Noble Numbat",
];

type TypeWriterCursorType = "line" | "block" | "underline";

type TypeWriterCursorOptions = {
  type: TypeWriterCursorType;
  color?: string;
  blinkingSpeed?: number;
};

type TypeWriterCursor = TypeWriterCursorOptions & {
  elementRef: HTMLSpanElement;
};

type TypeWriterProps = {
  wordList: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  showTextDuration?: number;
  pauseBeforeNext?: number;
  elementRef: HTMLElement | string;
  cursor?: TypeWriterCursorType | TypeWriterCursorOptions;
};

class TypeWriter {
  private wordList: string[];
  private typeSpeed: number;
  private deleteSpeed: number;
  private showTextDuration: number;
  private pauseBeforeNext: number;
  private element: HTMLElement;
  private letterIdx = 0;
  private wordIdx = 0;
  private cursor: TypeWriterCursor;

  constructor({
    wordList,
    elementRef,
    typeSpeed = 100,
    deleteSpeed = 100,
    showTextDuration = 1000,
    pauseBeforeNext = 1000,
    cursor = null,
  }: TypeWriterProps) {
    this.typeSpeed = typeSpeed;
    this.deleteSpeed = deleteSpeed;
    this.showTextDuration = showTextDuration;
    this.pauseBeforeNext = pauseBeforeNext;
    this.wordList = wordList;
    this.element =
      typeof elementRef === "string"
        ? document.querySelector(elementRef)
        : elementRef;

    this.setCursor(cursor);
  }

  private setCursor(
    cursorOptions: TypeWriterCursorType | TypeWriterCursorOptions,
  ) {
    if (!cursorOptions) return;

    const _cursor: TypeWriterCursor =
      typeof cursorOptions === "string"
        ? {
            type: "block",
            color: "currentColor",
            blinkingSpeed: 0,
            elementRef: null,
          }
        : { ...cursorOptions, elementRef: null };

    this.cursor = {
      type: _cursor.type || "block",
      color: _cursor.color || "currentColor",
      blinkingSpeed: _cursor.blinkingSpeed || 0,
      elementRef: document.createElement("span"),
    };

    this.cursor.elementRef = document.createElement("span");
    this.cursor.elementRef.className = `typewriter_this.cursor typewriter_this.cursor--${this.cursor.type}`;
    this.cursor.elementRef.style.color = this.cursor.color;

    switch (this.cursor.type) {
      case "block":
        this.cursor.elementRef.textContent = "❚";
        break;
      case "line":
        this.cursor.elementRef.textContent = "|";
        break;
      case "underline":
        this.cursor.elementRef.textContent = "_";
        break;
    }

    if (this.cursor.blinkingSpeed > 0) {
      this.cursor.elementRef.classList.add("typewriter_this.cursor--blink");
      this.cursor.elementRef.style.animationDuration = `${this.cursor.blinkingSpeed}ms`;
    }

    this.element.insertAdjacentElement("afterend", this.cursor.elementRef);
  }

  private toggleCursorBlink() {
    if (this.cursor.blinkingSpeed <= 0) return;
    this.cursor.elementRef.classList.toggle("typewriter__cursor--blink");
  }

  private get word() {
    return this.wordList[this.wordIdx];
  }

  private typeKey() {
    this.element.textContent = this.word.substring(0, ++this.letterIdx);
  }

  private backspace() {
    this.element.textContent = this.word.substring(0, --this.letterIdx);
  }

  private next() {
    this.letterIdx = 0;
    this.wordIdx = (this.wordIdx + 1) % this.wordList.length;
    this.start();
  }

  start() {
    const wordLength = this.wordList[this.wordIdx].length;
    const showTextDuration =
      this.typeSpeed * wordLength + this.showTextDuration;
    const pauseBeforeNext =
      this.deleteSpeed * wordLength + this.pauseBeforeNext;

    this.toggleCursorBlink();

    for (let i = 0; i < wordLength; i++) {
      setTimeout(this.typeKey.bind(this), this.typeSpeed * i);
    }

    setTimeout(this.toggleCursorBlink.bind(this), this.typeSpeed * wordLength);
    setTimeout(this.toggleCursorBlink.bind(this), showTextDuration);

    setTimeout(() => {
      for (let j = wordLength; j >= 0; j--) {
        setTimeout(this.backspace.bind(this), this.deleteSpeed * j);
      }
      setTimeout(
        this.toggleCursorBlink.bind(this),
        this.deleteSpeed * wordLength,
      );

      setTimeout(this.next.bind(this), pauseBeforeNext);
    }, showTextDuration);
  }
}

const typeWriter = new TypeWriter({
  wordList: ubuntuCodenames,
  elementRef: "#typewriter",
  typeSpeed: 120,
  deleteSpeed: 80,
  showTextDuration: 2000,
  pauseBeforeNext: 2000,
  cursor: {
    type: "block",
    color: "#333",
    blinkingSpeed: 800,
  },
});

typeWriter.start();
