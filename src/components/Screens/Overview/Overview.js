import React, { Component } from "react";
import Datepicker from "../../UI/Datepicker/Datepicker";
import Dropdown from "../../UI/Dropdown/Dropdown";
import LineChart from "./utilities/LineChart";
import TitleBar from "../../Bar/TitleBar/StandardTitleBar";

import styles from "./Overview.module.css";
import { propsTitleBarTT, propsDownloadBtn } from "./utilities/props";
import { Button } from 'antd';

class Overview extends Component {
  state = {
    api: {
      dataTT: []
    }
  }

  async componentDidMount() {
    // Fallback data for table
    //const response = await getDataForTable();
    // this.setState({ api: { dataTableBI: response.data } });
  }

  render() {
    // Extract some class methods / fields
    const { dataTT } = this.state.api;
    const {
      buttonBox,
      contentBox,
      controlBox,
      datepickerBox,
      labelDropdownBox,
      trendBox,
      overview,
      titleBox,
      controlTrendBox,
      dropdownBox,
      labelBox,
    } = styles;

    // Dropdowns (Application / Block)
    const DropdownAPL = <Dropdown placeholder="Select application" />;
    const DropdownBLK = <Dropdown placeholder="Select block" />;

    // Line chart
    const LineChartTT = <LineChart id="TT" data={[]} />;

    return (
      <div className={overview}>
        <div className={contentBox} >
          <div className={titleBox}>
            <TitleBar {...propsTitleBarTT} />
          </div>

          <div className={controlTrendBox}>
            <div className={controlBox}>
              <div className={datepickerBox}>
                <Datepicker />
              </div>

              <div className={labelDropdownBox}>
                <span className={labelBox}>Application:</span>
                <div className={dropdownBox}>{DropdownAPL}</div>
              </div>

              <div className={labelDropdownBox}>
                <span className={labelBox}>Block:</span>
                <div className={dropdownBox}>{DropdownBLK}</div>
              </div>

              <div className={buttonBox}>
                <Button {...propsDownloadBtn}>Donwload</Button>
              </div>
            </div>

            <div className={trendBox}>
              {LineChartTT}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Overview;
