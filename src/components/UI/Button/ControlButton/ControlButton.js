import React, { useContext } from "react";
import { ReactComponent as Day } from "../../../../assets/svg/day.svg";
import { ReactComponent as Week } from "../../../../assets/svg/week.svg";
import { ReactComponent as Month } from "../../../../assets/svg/month.svg";

import styles from "./ControlButton.module.css";

import { GraphContext } from "../../../Context/GraphContext";

const ControlButton = ({ type }) => {
  const timeRange = type;
  const { id, requestData } = useContext(GraphContext);
  return (
    <div
      className={styles.controlButton}
      onClick={() => {
        console.log(id, timeRange);
        requestData(id, timeRange);
      }}
    >
      {type === "day" && <Day />}
      {type === "week" && <Week />}
      {type === "month" && <Month />}
    </div>
  );
}
export default ControlButton;