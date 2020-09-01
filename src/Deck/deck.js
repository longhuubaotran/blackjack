import { v4 as uuid } from "uuid";

export default class Deck {
  constructor() {
    this.cards = [];
  }

  createDeck() {
    const values = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
      "A",
    ];
    const suits = ["spade", "club", "diamond", "heart"];

    values.forEach((value) => {
      suits.forEach((suit) => {
        const id = uuid();
        this.cards.push({ value, suit, id });
      });
    });
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const rnd = (Math.random() * (i + 1)) | 0;
      [this.cards[i], this.cards[rnd]] = [this.cards[rnd], this.cards[i]];
    }
  }

  getCards() {
    return this.cards;
  }
}
