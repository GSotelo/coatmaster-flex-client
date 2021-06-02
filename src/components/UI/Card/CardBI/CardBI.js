import React, { Fragment } from "react";
import "./CardBI.css"

const CardBI = (props) => {
  return (
    <div className="cardBI">
      <div className="titleBox">
        <div className="iconBox">{props.icon}</div>
        <div className="title">{props.title}</div>

      </div>
      <div className="rowContainer">
        {
          props.data.map(({ key, icon, description, value, units, showUnitsFirst, multiIcon }) =>
            <div key={key} className="row">
              {!multiIcon && <div className="iconBox">{icon}</div>}
              {
                multiIcon &&
                <div className="iconBox multiIcon">
                  {
                    multiIcon.map((icon, index) => <Fragment key={index}> {icon}</Fragment>)
                  }
                </div>
              }

              <div className="contentBox">
                <div className="description">{description}</div>
                {showUnitsFirst && <div className="value">{units} {value} </div>}
                {!showUnitsFirst && <div className="value">{value} {units}</div>}
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default CardBI;