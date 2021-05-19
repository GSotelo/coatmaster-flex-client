import React, { Component } from "react";
import Datepicker from "../../UI/Datepicker/Datepicker";
import Dropdown from "../../UI/Dropdown/Dropdown";
import LineChart from "./utilities/LineChart";
import TitleBar from "../../Bar/TitleBar/StandardTitleBar";
import { Button } from 'antd';

import styles from "./Overview.module.css";
import { propsTitleBarTT, propsDownloadBtn } from "./utilities/props";


// TEST MODE
import connectLocalServer from "./utilities/connectServer";
import { createDropdownOptions, validateData } from "./utilities/miscellaneous";
class Overview extends Component {
  state = {
    api: {
      localServer: {
        applications: [],
        blocks: [],
        status: false
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
    const dataLocalServer = await connectLocalServer.startup();
    const optionsAPL = createDropdownOptions(dataLocalServer.applications, validateData);
    const optionsBLK = createDropdownOptions(dataLocalServer.blocks, validateData);

    this.setState(prevState => {
      const nextState = { ...prevState };
      nextState.api.localServer = dataLocalServer;
      nextState.dropdown.options.optionsAPL = optionsAPL;
      nextState.dropdown.options.optionsBLK = optionsBLK;
      return nextState;
    });
  }

  updateDropdownState = (e, data, id) => {
    const { value } = data;
    const selector = `currentValue${id}`;

    this.setState(prevState => {
      const nextUpdate = { ...prevState };
      nextUpdate.dropdown.currentValue[selector] = value;
      return { nextUpdate };
    });

    if(id==="BLK"){
      console.log("REQUEST REPORT");
      
      const reqBody = {
        query: {
          configurationIds: [5020],
          sampleIds: [],
          last: 2
        }
      };

      try {
        connectLocalServer.getReport(reqBody);
      } catch (error) {
        const fallback = "fallback";
        console.error("[getReport]: Request to local server failed")
        return fallback;
      }
    }
  }

  createDropdownProps = (ids) => {   
    const baseProps = {
      placeholder:"Select",
      onChange: this.updateDropdownState
    }

    return ids.map(id => (
      {
        ...baseProps,
        options:this.state.dropdown.options[`options${id}`],
        value:this.state.dropdown.currentValue[`currentValue${id}`],
        id,
      }
    ));
  }

  render() {
    // Extract some class methods / fields
    const { createDropdownProps } = this;

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

    // Dropdown components
    const dropdownIds = ["APL", "BLK"];
    const dropdownProps = createDropdownProps(dropdownIds);
    const [DropdownAPL, DropdownBLK] = dropdownProps.map(prop => <Dropdown {...prop} />)

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
