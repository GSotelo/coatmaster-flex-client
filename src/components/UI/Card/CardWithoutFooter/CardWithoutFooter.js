import React from "react";

import "./CardWithoutFooter.css";

const CardWithoutFooter = ({ icon, units, value }) => {

  return (
    <div className="cardWithoutFooter">
      <div className="header">{icon}</div>
      <div className="content">
          <span className="value">{value}</span>
          <span className="units">{units}</span>
      </div>
    </div>
  );
}

export default CardWithoutFooter;