import React from "react";

import "./CardWithFooter.css";

const CardWithFooter = ({ icon, label, previousValue, units, value }) => {

  return (
    <div className="cardWithFooter">
      <div className="header">{icon}</div>
      <div className="content">
        <div className="wrapper">
          <span className="value">{value}</span>
          <span className="units">{units}</span>
        </div>
      </div>
      <div className="footer">
        <div className="label"><span>{label}</span></div>
        <div className="value"><span className="bold">{previousValue}</span></div>
      </div>
    </div>
  );
};

export default CardWithFooter;