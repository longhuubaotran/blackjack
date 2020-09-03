import React, { useState, useEffect } from "react";
import Deck from "./Deck/deck.js";
import Card from "./components/Card";
import "./App.css";

const deck = new Deck();
deck.createDeck();
deck.shuffle();

function App() {
  let count = 1; // use this to render one of dealer's cards with back side
  console.log("render");
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [renderDone, setRenderDone] = useState(false);
  const [result, setResult] = useState("");

  const [startGame, setStartGame] = useState(false);
  const [stay, setStay] = useState(false);

  const cards = deck.getCards();

  let playerPoints = calCardValues(playerCards);
  let dealerPoints = calCardValues(dealerCards);

  useEffect(() => {
    if (renderDone) {
      let tempResult = comparePoints(dealerPoints, playerPoints);
      setResult(tempResult);
    }
  }, [renderDone]);

  const handleStart = () => {
    setPlayerCards([...playerCards, cards.pop(), cards.pop()]);
    setDealerCards([...dealerCards, cards.pop(), cards.pop()]);

    setStartGame(true);
  };

  const handleStay = () => {
    if (dealerPoints < 17) {
      const tempDealerCards = canDealerDraw(dealerPoints, cards);
      if (tempDealerCards.length !== 0) {
        setDealerCards([...dealerCards, ...tempDealerCards]);
      }
    }
    setStay(true);
    setRenderDone(true);
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
      {result !== "" && <h1 className='result'>{result}</h1>}
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
  if (
    dealerPoints === playerPoints ||
    (dealerPoints > 21 && playerPoints > 21)
  ) {
    return "Draw";
  }
  if (dealerPoints > 21) {
    return "Player Win";
  }
  if (playerPoints > 21) {
    return "Dealer Win";
  }
  if (playerPoints < dealerPoints) {
    return "Dealer Win";
  }
  if (playerPoints > dealerPoints) {
    return "Player Win";
  }
}

function canDealerDraw(dealerPoints, cards) {
  let tempPoints = dealerPoints;
  let tempCards = [];
  const cardsLetter = ["J", "Q", "K"];
  while (tempPoints < 17) {
    let card = cards.pop();
    if (cardsLetter.indexOf(card.value) !== -1) {
      tempPoints += 10;
    } else {
      if (card.value === "A") {
        if (tempPoints <= 10) {
          tempPoints += 11;
        } else {
          tempPoints += 1;
        }
      } else {
        tempPoints += parseInt(card.value);
      }
    }
    console.log(tempPoints, "temp points");
    tempCards.push(card);
  }
  return tempCards;
}

export default App;
