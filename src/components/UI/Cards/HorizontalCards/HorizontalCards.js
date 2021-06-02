import React from "react";

import "./HorizontalCards.css"

const HorizontalCards = ({ cards }) => {
  return (
    <div className="deck">
      {
        cards.map((card, index) => <div key={index} className="cardBox">{card}</div>)
      }
    </div>
  );
}

export default HorizontalCards;