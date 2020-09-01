import React, { useState } from "react";

const Card = ({ card, dealer, stay }) => {
  const { value, suit } = card;

  return (
    <div
      className={`card card-${suit} ${
        dealer === 1 && !stay && `card-back-side`
      }`}
      value={value}></div>
  );
};

export default Card;
