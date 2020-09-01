import React, { useState } from "react";
import Deck from "./Deck/deck.js";
import Card from "./components/Card";
import "./App.css";

const deck = new Deck();
deck.createDeck();
deck.shuffle();

function App() {
  let count = 1; // use this to render one of dealer's cards with back side

  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);

  const [startGame, setStartGame] = useState(false);
  const [stay, setStay] = useState(false);

  const cards = deck.getCards();

  let playerPoints = calCardValues(playerCards);
  let dealerPoints = calCardValues(dealerCards);

  console.log(dealerPoints);

  const handleStart = () => {
    setPlayerCards([...playerCards, cards.pop(), cards.pop()]);
    setDealerCards([...dealerCards, cards.pop(), cards.pop()]);

    setStartGame(true);
  };

  const handleStay = () => {
    // if (dealerPoints < 17) {
    //   setDealerCards([...dealerCards, cards.pop()]);
    // }
    setStay(true);
    // comparePoints(dealerPoints, playerPoints);
  };

  const handleHit = () => {
    if (playerCards.length >= 5) {
      alert("You should stay");
      return;
    }
    setPlayerCards([...playerCards, cards.pop()]);
  };

  return (
    <div className='App'>
      <div className='dealer'>
        <div className='cards'>
          {dealerCards.map((card) => (
            <Card card={card} key={card.id} dealer={count++} stay={stay} />
          ))}
        </div>
      </div>
      {!startGame ? (
        <button
          className={`btnStart ${startGame && `btnDone`}`}
          onClick={handleStart}>
          Start
        </button>
      ) : (
        <div className='choices-group'>
          <button className='hit-btn' onClick={handleHit}>
            Hit
          </button>
          <button className='stay-btn' onClick={handleStay}>
            Stay
          </button>
        </div>
      )}
      <div className='players'>
        <div className='cards'>
          {playerCards.map((card) => (
            <Card card={card} key={card.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

function calCardValues(cardsArr) {
  const cardsLetter = ["J", "Q", "K"];
  let total = 0;

  cardsArr.forEach((card) => {
    if (cardsLetter.indexOf(card.value) !== -1) {
      total += 10;
    } else {
      if (card.value === "A") {
        if (total <= 10) {
          total += 11;
        } else {
          total += 1;
        }
      } else {
        total += parseInt(card.value);
      }
    }
  });

  return total;
}

function comparePoints(dealerPoints, playerPoints) {
  if (dealerPoints === playerPoints) {
    alert("Draw");
    return;
  }
  if (dealerPoints > playerPoints && dealerPoints <= 21) {
    alert("Dealer Win");
    return;
  }
  if (dealerPoints < playerPoints && playerPoints <= 21) {
    alert("Player Win");
    return;
  }
}

export default App;
