import React from "react";
import ControlButtons from "./ControlButtons";
import DatePicker from "../../UI/Datepicker/Datepicker";
import { Row, Col } from 'antd';

import styles from "./ControlBar.module.css";

const ControlBar = () => {
  return (
    <Row className={styles.controlBar}>
      <ControlButtons />
      <Col className={[styles.col, styles.w58].join(" ")}>
        <DatePicker />
      </Col>
    </Row>
  );
};

export default ControlBar;