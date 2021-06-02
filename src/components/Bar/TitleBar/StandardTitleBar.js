import React from "react";
import { Row, Col } from 'antd';

import "./TitleBar.css";

const StandardTitleBar = ({ icon, title }) => (
  <Row className="titleBar">
    <Col className="col wa icon">{icon}</Col>
    <Col className="col wb textFormat">{title}</Col>
  </Row>
);

export default StandardTitleBar;