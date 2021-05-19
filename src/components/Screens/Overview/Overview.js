import React, { Component } from "react";
import Datepicker from "../../UI/Datepicker/Datepicker";
import Dropdown from "../../UI/Dropdown/Dropdown";
import LineChart from "./utilities/LineChart";
import TitleBar from "../../Bar/TitleBar/StandardTitleBar";

import styles from "./Overview.module.css";
import { propsTitleBarTT, propsDownloadBtn } from "./utilities/props";
import { Button } from 'antd';


// TEST MODE
import connectLocalServer from "./utilities/connectServer";
import { createDropdownOptions, validateDataAPL, validateDataBLK } from "./utilities/miscellaneous";
import _ from "lodash";
import { DataGrid } from "@material-ui/data-grid";
class Overview extends Component {
  state = {
    api: {
      localServer: {
        status: false,
        applications: []
      }
    },

    dropdown: {
      options: {
        optionsAPL: [],
        optionsBLK: []
      },
      currentValue: {
        currentValueAPL: 1,
        currentValueBLK: 1
      }
    }
  }

  async componentDidMount() {
    // Get data from local server
    const dataAPL = await connectLocalServer.getApplications();
    const dataBLK = await connectLocalServer.getBlocks(dataAPL, 5021);

    // Create options for dropdowns (Application, blocks)
    const optionsAPL = createDropdownOptions(dataAPL, validateDataAPL, "applications");
    const optionsBLK = createDropdownOptions(dataBLK, validateDataBLK, "data");

    this.setState(prevState => {
      const nextState = { ...prevState };
      nextState.dropdown.options.optionsAPL = optionsAPL;
      nextState.dropdown.options.optionsBLK = optionsBLK;
    });

    this.updateState(dataAPL);
  }

  updateDropdownState = (e, data, id) => {
    const { value } = data;
    const selector = `currentValue${id}`;

    this.setState(prevState => {
      const nextUpdate = { ...prevState };
      nextUpdate.dropdown.currentValue[selector] = value;
      return { nextUpdate };
    });
  }



  updateState = (data) => {
    if (_.isEmpty(data)) {
      return;
    }
    this.setState({ api: { localServer: data } });
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
    const propsDropdownAPL = {
      id: "APL",
      onChange: this.updateDropdownState,
      placeholder: "Select application",
      options: this.state.dropdown.options.optionsAPL,
      value: this.state.dropdown.currentValue.currentValueAPL,
    }

    const propsDropdownBLK = {
      id: "blk",
      onChange: this.updateDropdownState,
      placeholder: "Select block",
      options: this.state.dropdown.options.optionsBLK,
      value: this.state.dropdown.currentValue.currentValueBLK,
    }

    const DropdownAPL = <Dropdown {...propsDropdownAPL} />;
    const DropdownBLK = <Dropdown {...propsDropdownBLK} />;

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
