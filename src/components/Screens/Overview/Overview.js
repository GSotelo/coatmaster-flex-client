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

    // When I call this method all applications are loaded into the state
    const index = value - 1;
    if (id === "APL") {
      const applicationsIsEmpty = _.isEmpty(this.state.api.localServer.applications);

      console.log(this.state.api.localServer.applications);

      if (applicationsIsEmpty) {
        console.error("[updateDropdownState] Applications data is empty");
        return;
      }
      const applicationId = this.state.api.localServer.applications[index].id;
      console.log("applicationId");
      console.log(applicationId);

      let blocks;
      try {
        blocks = await connectLocalServer.getBlocks(applicationId);
      } catch (error) {
        console.error("[updateDropdownState] Cannot get data for blocks");
        return;
      }
      console.log("blocks");
      console.dir(blocks);

      const optionsBLK = createDropdownOptions(blocks, validateData);
      console.log("optionsBLK");
      console.dir(optionsBLK);

      this.setState(prevState => {
        const nextUpdate = { ...prevState };
        nextUpdate.api.localServer.applicationId = applicationId;
        nextUpdate.api.localServer.blocks = blocks;
        nextUpdate.dropdown.options.optionsBLK = optionsBLK;
        nextUpdate.dropdown.currentValue[selector] = value;
        return nextUpdate;
      });
    }

    if (id === "BLK") {
      console.log("application id");
      console.dir(this.state.api.localServer.applicationId);
      const applicationId = this.state.api.localServer.applicationId;
      const blockId = this.state.api.localServer.blocks[index]?.id;

      console.log("blocks");
      console.dir(this.state.api.localServer.blocks);

      console.log("block id");
      console.dir(blockId);

      let reportData = [];
      const reqBody = {
        query: {
          configurationIds: [applicationId],
          sampleIds: [blockId],
          last: 5
        }
      }

      try {
        reportData = await connectLocalServer.getReport(reqBody);
      } catch (err) {
        console.error("[updateDropdownState] Cannot get data for blocks");
        return;
      }
      console.log("reportData");
      console.dir(reportData);

      this.setState(prevState => {
        const nextUpdate = { ...prevState };
        nextUpdate.dropdown.currentValue[selector] = value;
        return nextUpdate;
      });
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
