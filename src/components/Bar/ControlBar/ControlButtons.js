import React, { Fragment } from "react";
import ControlButton from "../../UI/Button/ControlButton/ControlButton";
import { Col } from "antd";

import styles from "./ControlBar.module.css";

const ControlButtons = (props) => {
  const types = ["day", "week", "month"];
  return (
    <Fragment>
      {
        types.map(type =>
          <Col key={type} className={[styles.col, styles.w12].join(" ")}>
            <ControlButton type={type} />
          </Col>
        )
      }
    </Fragment>
  );
};

export default ControlButtons;