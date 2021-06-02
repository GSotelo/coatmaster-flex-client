import React from "react";
import { Row, Col } from 'antd';

import "./TitleBar.css";

const TwoIconsTitleBar = ({ icon1, icon2, title }) => (
  <Row className="titleBar">
    <Col className="col wc icon">{icon1}{icon2}</Col>
    <Col className="col wd textFormat">{title}</Col>
  </Row>
);

export default TwoIconsTitleBar;