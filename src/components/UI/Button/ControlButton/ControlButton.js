import React from "react";
import { ReactComponent as Day } from "../../../../assets/svg/day.svg";
import { ReactComponent as Week } from "../../../../assets/svg/week.svg";
import { ReactComponent as Month } from "../../../../assets/svg/month.svg";

import styles from "./ControlButton.module.css";

const ControlButton = ({ type }) => {

  return (
    <div
      className={styles.controlButton}
      onClick={() => console.log("[ControlButton] Click event")}
    >
      {type === "day" && <Day />}
      {type === "week" && <Week />}
      {type === "month" && <Month />}
    </div>
  );
}
export default ControlButton;