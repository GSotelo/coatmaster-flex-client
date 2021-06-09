import React, { Component } from "react";
import TitleBar from "../../Bar/TitleBar/StandardTitleBar";
import Table from "../../UI/Table/Ant/Table";
import UpdateButton from "../../UI/Button/Standard/StandardButton";

import styles from "./TableOverview.module.css";
import {
  propsTitleBar
} from "./utils/props";
import _ from "lodash";
import axiosCoatmasterFlex from "../../../api/axios";

class TableOverview extends Component {

  state = {
    report: {},
    threshold: {
      lowerLimit: -1,
      upperLimit: -1
    }
  }

  async componentDidMount() {
    this.setState({ report: localStorage.getItem("report") });

    // Request threshold values
    let response;

    try {
      response = await axiosCoatmasterFlex("/pphd_configuration/threshold");
    } catch (error) {
      console.error("[componentDidMount] Not possible to fecth threshold data");
      return;
    }

    const threshold = response.data;

    this.setState(prevState => {
      const nextState = { ...prevState };
      nextState.threshold = threshold;
      return nextState;
    });
  }

  componentWillUnmount() {
    console.log("[componentWillUnmount: TableOverview ");
    delete localStorage.report;
  }

  updateData() {
   console.log("Update table data");
   window.open("/coatmaster-flex/table", "_self");
   window.close();
  }

  render() {
    console.log("[Render] TableOverview");

    // Data for report
    const dataForReport = this.state.report;

    // Thresholds value
    const { upperLimit, lowerLimit } = this.state.threshold;

    // CSS classes
    const {
      tableOverview,
      content,
      headerBox,
      main,
      titleBarBox,
      tableBox,
      controlsBox,
      labelBox,
      labelText,
      labelValue

    } = styles;
    return (
      <div className={tableOverview}>
        <div className={content}>
          <div className={headerBox}>
            <div className={titleBarBox}>
              <TitleBar {...propsTitleBar} />
            </div>
          </div>

          <div className={main}>

            <div className={controlsBox}>
              <div className={labelBox}>
                <span className={labelText}> Upper limit:</span>
                <span className={labelValue} >{upperLimit}</span>
              </div>

              <div className={labelBox}>
                <span className={labelText} >Lower limit:</span>
                <span className={labelValue} >{lowerLimit}</span>
              </div>

              <div className={labelBox}>
                <UpdateButton
                  updater={this.updateData.bind(this,)}
                >
                  Update
                </UpdateButton>
              </div>
            </div>

            <div className={tableBox}>
              <Table report={dataForReport} threshold={{ upperLimit, lowerLimit }} />
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default TableOverview;
