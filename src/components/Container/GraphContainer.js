import React, { Component } from "react";
import ControlBar from "../Bar/ControlBar/ControlBar";
import DropdownTitleBar from "../Bar/TitleBar/DropdownTitleBar";
import StandardTitleBar from "../Bar/TitleBar/StandardTitleBar";
import TwoIconsTitleBar from "../Bar/TitleBar/TwoIconsTitleBar";
import { Row, Col } from "antd";

import "./GraphContainer.css";

/**
 * General notes:
 * This component provides a container in which you can 
 * input three main elements: title bar, control bar and
 * graph. All mentioned elements can be found in the UI
 * folder. The css style applied to this component is global.
 * That means we can override css classes from more specific 
 * components.
 */

class GraphContainer extends Component {

  render() {
    const {
      dropdown,
      graph,
      icon,
      icon1,
      icon2,
      title,
      type,
      controlBarVisibility
    } = this.props;

    /**
     * Allows to set visibility of control bar. This helps to hide
     * the control bar when the provided space is too narrow. 
     * Default value: Control bar is visible
     */
    const setControlBarVisibility = typeof controlBarVisibility !== 'undefined' ? controlBarVisibility : true;

    return (
      <Row className="graphContainer">
        <Col className="titleBox">
          {
            type === 1 &&
            <StandardTitleBar
              icon={icon}
              title={title}
            />
          }
          {
            type === 2 &&
            <TwoIconsTitleBar
              icon1={icon1}
              icon2={icon2}
              title={title}
            />
          }
          {
            type === 3 &&
            <DropdownTitleBar
              dropdown={dropdown}
              icon={icon}
              title={title}
            />
          }
        </Col>

        {
          setControlBarVisibility &&
          <Col className="controlBox">
            <ControlBar />
          </Col>
        }

        <Col className="graphBox">
          {graph}
        </Col>
      </Row>
    );
  }
}

export default GraphContainer;