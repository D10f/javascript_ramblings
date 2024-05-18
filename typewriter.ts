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

type TypeWriterProps = {
  wordList: string[];
  typeSpeed: number;
  deleteSpeed: number;
  showTextDuration: number;
  pauseBeforeNext: number;
  elementRef: HTMLElement | string;
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

  constructor({
    wordList,
    elementRef,
    typeSpeed = 100,
    deleteSpeed = 100,
    showTextDuration = 1000,
    pauseBeforeNext = 1000,
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
  }

  private get word() {
    return this.wordList[this.wordIdx];
  }

  private get cursor() {
    return this.word[this.letterIdx];
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

    for (let i = 0; i < wordLength; i++) {
      setTimeout(this.typeKey.bind(this), this.typeSpeed * i);
    }

    setTimeout(() => {
      for (let j = wordLength; j >= 0; j--) {
        setTimeout(this.backspace.bind(this), this.deleteSpeed * j);
      }

      setTimeout(this.next.bind(this), pauseBeforeNext);
    }, showTextDuration);
  }
}

const typeWriter = new TypeWriter({
  wordList: ubuntuCodenames,
  elementRef: "#target",
  typeSpeed: 75,
  deleteSpeed: 40,
  showTextDuration: 500,
  pauseBeforeNext: 500,
});

typeWriter.start();
