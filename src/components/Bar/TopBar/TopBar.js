import React from "react";
import { Row, Col } from "antd";

import styles from "./TopBar.module.css";

const TopBar = (props) => {
  return (
    <Row className={styles.h100}>
      {
        Object.entries(props).map(([key, value]) =>
          <Col
            key={key}
            xs={8}
            className={styles.h100}
          >
            {value}
          </Col>)
      }
    </Row>
  );
};

export default TopBar;