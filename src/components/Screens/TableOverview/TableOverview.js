import React, { Component } from "react";
import TitleBar from "../../Bar/TitleBar/StandardTitleBar";
import Table from "../../UI/Table/Ant/Table";

import styles from "./TableOverview.module.css";
import {
  propsTitleBar
} from "./utils/props";
import _, { set } from "lodash";

class TableOverview extends Component {

  state = {
    report:{}
  }

  componentDidMount() {
    this.setState({ report: localStorage.getItem("report") });
  }

  componentWillUnmount() {
    console.log("[componentWillUnmount: TableOverview ");
    delete localStorage.report;
  }

  render() {
    console.log("[Render] TableOverview");

    // Data for report
    const dataForReport = this.state.report;

    // CSS classes
    const {
      tableOverview,
      content,
      headerBox,
      main,
      titleBarBox,
      tableBox
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
            <div className={tableBox}>
              <Table report={dataForReport} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TableOverview;
