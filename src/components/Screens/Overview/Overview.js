import React, { Component } from "react";
import Datepicker from "../../UI/Datepicker/Datepicker";
import Dropdown from "../../UI/Dropdown/Dropdown";
import LineChart from "./utilities/LineChart";
import TitleBar from "../../Bar/TitleBar/StandardTitleBar";
import { Button } from 'antd';

import styles from "./Overview.module.css";
import { propsTitleBarTT, propsDownloadBtn } from "./utilities/props";
import _ from "lodash";


// TEST MODE
import connectLocalServer from "./utilities/connectServer";
import { createDropdownOptions, validateData } from "./utilities/miscellaneous";
class Overview extends Component {
  state = {
    api: {
      localServer: {
        applications: [],
        blocks: [],
        status: false,
        applicationId: []
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
    const { applications, blocks } = dataLocalServer;
    const optionsAPL = createDropdownOptions(applications, validateData);
    const optionsBLK = createDropdownOptions(blocks, validateData);

    this.setState(prevState => {
      const nextState = { ...prevState };
      nextState.api.localServer = dataLocalServer;
      nextState.dropdown.options.optionsAPL = optionsAPL;
      nextState.dropdown.options.optionsBLK = optionsBLK;
      return nextState;
    });
  }

  updateDropdownState = async (e, data, id) => {
    // Controlled dropdown
    const { value } = data; // Depends on the dropdown's API
    const selector = `currentValue${id}`;

    this.setState(prevState => {
      const nextUpdate = { ...prevState };
      nextUpdate.dropdown.currentValue[selector] = value;
      return nextUpdate;
    });

    
    // When the selected application changes, the block should change too (optionsBLK)
    
    if (id === "APL") {
      let applicationId, blocks;
      try {
        console.log("APL DD VALUE", value);
        const application = this.state.api.localServer.applications[value - 1];
        applicationId = application.id;
        blocks = await connectLocalServer.getBlocks(applicationId);
      } catch (err) {
        console.error("[updateDropdownState]: Not possible to fetch data for optionsBLK");
        return;
      }

      // Updates "optionsBLK" data based on current selected application
      const optionsBLK = createDropdownOptions(blocks, validateData);
      this.setState(prevState => {
        const nextState = { ...prevState };
        nextState.dropdown.options.optionsBLK = optionsBLK;
        nextState.api.localServer.applicationId = applicationId;
        return nextState;
      })
    }

    if (id === "BLK") {
      console.log("BLK DD VALUE", value);
      console.log("app id", this.state.api.localServer.applicationId);
      const applications = this.state.api.localServer.applications;
      const blocks = this.state.api.localServer.blocks;
      const configId = _.isEmpty(applications) ? applications[0].id : applications[value-1].id;
      const sampleId = _.isEmpty(blocks) ? blocks[0].id : blocks[value-1].id;
      
      console.log("blocks", blocks);
      console.log("blocks empty", _.isEmpty(blocks));
      console.log("applications", applications);
      console.log("applications empty", _.isEmpty(applications));
      console.log("application id", configId);
      //console.log("application id", configId);

      //const sampleId = blocks? blocks[value-1].id:this.state.api.localServer.blocks[0].id;
     
      try {
        const reqBody = {
          query: {
            configurationIds: [configId],
            sampleIds: [sampleId],
            last: 5
          }
        };

        console.dir(reqBody);
        const response = await connectLocalServer.getReport(reqBody);
        console.dir(response);

      } catch (err) {
        console.error("[updateDropdownState]: Not possible to fetch data for measurement report");
      }
    }   
  }

  createDropdownProps = (ids) => {
    const baseProps = {
      placeholder: "Select",
      onChange: this.updateDropdownState
    }

    return ids.map(id => (
      {
        ...baseProps,
        options: this.state.dropdown.options[`options${id}`],
        value: this.state.dropdown.currentValue[`currentValue${id}`],
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
