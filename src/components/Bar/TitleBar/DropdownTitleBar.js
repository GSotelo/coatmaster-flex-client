import React from "react";
import { Row, Col } from 'antd';

import "./TitleBar.css";

const DropdownTitleBar = ({ dropdown, icon, title }) => (
  <Row className="titleBar">
    <Col className="col wx icon">{icon}</Col>
    <Col className="col wy textFormat">{title}</Col>
    <Col className="col wz textFormat">{dropdown}</Col>
  </Row>
);

export default DropdownTitleBar;