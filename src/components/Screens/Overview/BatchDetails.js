import React, { Component } from 'react';
import Card from "../../UI/Card/CardBI/CardBI";

import styles from "./Overview.module.css";
import { Row, Col } from "antd";
import { 
  basePropsSI, 
  basePropsEC,
  basePropsTC,
  basePropsCC,
  basePropsCI,
  basePropsIT,
  basePropsBI 
} from "./utilities/propsBatchDetails";

// Arrow function, then no ";" needed
const createPropsCard = (objSrc, data) => {
  const { baseData, ...otherProps } = objSrc;
  const updatedData = baseData.map((el, i) => ({...el, ...data[i] }));
  return { ...otherProps, data: updatedData };
}

class BatchDetails extends Component {

  render() {
    const {
      batchDetails,
      left,
      right,
      top,
      bottom
    } = styles;

    // Raw data (arrays)
    const { detailsData, overviewData } = this.props.data.processedData;
    const { index } = this.props.data;

    // Target specific batch based on selected row
    const batchDetailsData = detailsData[index];
    const batchOverviewData = overviewData[index];

    // Unpacking data for selected batch (Details data)
    const {
      batchInformation,
      systemInformation,
      estimatedCosts,
      totalConsumption,
      colorChange,
      conveyorInformation,
      instrumentation
    } = batchDetailsData;

    /**
     * Processing data for all cards based on server response
     */
    // Data for cards
    const defaultValue = "--.--";

    const dataSI = [
      { description: "Coating time", units: "h", value: systemInformation?.coatingTime || defaultValue },
      { description: "Standby time", units: "h", value: systemInformation?.standbyTime || defaultValue },
      { description: "Downtimes", units: "h", value: systemInformation?.downTime || defaultValue }
    ];

    // Estimated costs
    const dataEC = [
      { description: "Powder", units: "€", value: estimatedCosts?.powder || defaultValue },
      { description: "Energy", units: "€", value: estimatedCosts?.energy || defaultValue },
      { description: "Air", units: "€", value: estimatedCosts?.air || defaultValue }
    ];

    // Total consumption
    const dataTC = [
      { description: "Powder", units: "kg", value: totalConsumption?.powder || defaultValue},
      { description: "Energy", units: "kW", value: totalConsumption?.energy || defaultValue },
      { description: "Air", units: "m3", value: totalConsumption?.air || defaultValue }
    ];
   
    // Color change
    const dataCC = [
      { description: "Total time", units: "h", value: colorChange?.totalTime || defaultValue },
      { description: "Total number", units: "#", value: colorChange?.totalNumber || defaultValue },
      { description: "Coated surface", units: "m2", value: colorChange?.coatedSurface || defaultValue }
    ];

    // Conveyor information
    const dataCI = [
      { description: "Stop time", units: "h", value: conveyorInformation?.stopTime || defaultValue },
      { description: "Average speed", units: "m/min", value: conveyorInformation?.averageSpeed || defaultValue },
      { description: "Throughput", units: "m", value: conveyorInformation?.throughput || defaultValue }
    ];
 
    // Instrumentation
    const dataIT = [
      {
        description: "Temperature",
        units: "°C",
        value: instrumentation?.temperature ?
          `${instrumentation?.temperature[0]}-
          ${instrumentation?.temperature[1]}-
          ${instrumentation?.temperature[2]}
          `: defaultValue
      },
      {
        description: "Humidity",
        units: "%",
        value: instrumentation?.humidity ?
          `${instrumentation?.humidity[0]}-
          ${instrumentation?.humidity[1]}-
          ${instrumentation?.humidity[2]}
          `: defaultValue
      },
      { 
        description: "Pressure (Avg)", 
        units: "bar", 
        value: instrumentation?.pressure ?
        `${instrumentation?.pressure[0]}-
        ${instrumentation?.pressure[1]}-
        ${instrumentation?.pressure[2]}
        `: defaultValue 
      }
    ];

    // Instrumentation
    const dataBI = [
      { description: "Bath number", value: batchOverviewData?.batchNumber || defaultValue },
      { description: "Date", value: batchOverviewData?.date || defaultValue },
      { description: "Start time", value: batchOverviewData?.startTime || defaultValue },
      { description: "Stop time", value: batchOverviewData?.stopTime || defaultValue },
      { description: "Duration", units: "h", value: batchOverviewData?.duration || defaultValue },
      { description: "Color code", value: batchOverviewData?.color || defaultValue },
      { description: "Product", value: batchInformation?.product || defaultValue },
      { description: "Coated products", value: batchInformation?.coatedProducts || defaultValue },
    ];

    // Props for all cards
    const argsArr = [
      [basePropsBI,dataBI],
      [basePropsSI, dataSI],
      [basePropsEC, dataEC],
      [basePropsTC, dataTC],
      [basePropsCC, dataCC],
      [basePropsCI, dataCI],
      [basePropsIT, dataIT]
    ];

    const [
      propsBI,
      propsSI,
      propsEC,
      propsTC,
      propsCC,
      propsCI,
      propsIT
    ] = argsArr.map( args => createPropsCard(...args));

    return (
      <Row className={batchDetails}>
        <Col className={left}>
          <Card {...propsBI} />
        </Col>

        <Col className={right}>
          <div className={top}>
            <Card {...propsSI} />
            <Card {...propsEC} />
            <Card {...propsTC} />
          </div>
          <div className={bottom}>
            <Card {...propsCC} />
            <Card {...propsCI} />
            <Card {...propsIT} />
          </div>
        </Col>
      </Row>
    );
  }
}

export default BatchDetails;