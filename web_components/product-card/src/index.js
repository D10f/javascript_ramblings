import VanillaTilt from "vanilla-tilt";
import "./styles.scss";

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  VanillaTilt.init(card, {
    max: 8,
  });
});
