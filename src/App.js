import React, { useState } from "react";
import Deck from "./Deck/deck.js";
import Card from "./components/Card";
import "./App.css";

function App() {
  let count = 1; // use this to render one of dealer's cards with back side

  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);

  const [startGame, setStartGame] = useState(false);
  const [stay, setStay] = useState(false);

  const deck = new Deck();
  deck.createDeck();
  deck.shuffle();

  const cards = deck.getCards();

  const handleStart = () => {
    setPlayerCards([...playerCards, cards.pop(), cards.pop()]);
    setDealerCards([...dealerCards, cards.pop(), cards.pop()]);

    setStartGame(true);
  };

  const handleStay = () => {
    setStay(true);
  };

  const handleHit = () => {
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

export default App;
