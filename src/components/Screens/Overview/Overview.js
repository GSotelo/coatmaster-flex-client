import React, { Component } from "react";
import DownloadButton from "../../UI/Button/DonwloadButton/DownloadButton";
import UpdateButton from "../../UI/Button/Standard/StandardButton";
import Datepicker from "../../UI/Datepicker/Datepicker";
import Dropdown from "../../UI/Dropdown/Dropdown";
import LineChart from "./utilities/LineChart";
import TitleBar from "../../Bar/TitleBar/StandardTitleBar";

import styles from "./Overview.module.css";
import connectLocalServer from "./utilities/connectServer";
import { createDropdownOptions, validateData } from "./utilities/miscellaneous";
import {
  propsTitleBarTT,
  propsToasterUpdateFailed,
  propsToasterDanger,
  propsToasterSuccessfulUpdate
} from "./utilities/props";
import { toaster } from "evergreen-ui";
import {
  getAvgValueFromReport,
  getMinValueFromReport,
  getMaxValueFromReport
} from "../../../utils/metrics";

import _ from "lodash";

class Overview extends Component {

  state = {
    api: {
      localServer: {
        applications: [],
        blocks: [],
        status: false,
        applicationId: -1,
        blockId: -1,
        report: {},
        reportIsRequired: false
      }
    },

    metrics: {
      max: -1,
      min: -1,
      avg: -1
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
    const { applications, applicationId, blocks, blockId } = dataLocalServer;
    const optionsAPL = createDropdownOptions(applications, validateData);
    const optionsBLK = createDropdownOptions(blocks, validateData);

    console.log("[componentDidMount]  [optionsAPL]", optionsAPL);
    console.log("[componentDidMount]  [optionsBLK]", optionsBLK);

    let report = {};
    const reqBody = {
      query: {
        configurationIds: [applicationId],
        sampleIds: [blockId],
        //last: 5
      }
    };

    try {
      report = await connectLocalServer.getReport(reqBody);
    } catch (err) {
      console.error("[componentDidMount] Cannot get data for report");
      return;
    }

    console.log("[componentDidMount]  Report during did mount");
    console.dir(report);

    // At this point fetch data is valid
    const metrics = {
      avg: getAvgValueFromReport(report),
      min: getMinValueFromReport(report),
      max: getMaxValueFromReport(report)
    };

    this.setState(prevState => {
      const nextState = { ...prevState };
      nextState.api.localServer = dataLocalServer;
      nextState.api.localServer.report = { ...report, applicationId, blockId };
      nextState.dropdown.options.optionsAPL = optionsAPL;
      nextState.dropdown.options.optionsBLK = optionsBLK;
      nextState.metrics = metrics;
      return nextState;
    });
  }

  componentWillUnmount() {
    console.log("[componentWillUnmount]");
    // Here is a good place for some clean up
    //const reportDataForTableOverview = this.state.api.localServer.report;
    const reportDataForTableOverview = JSON.stringify(this.state.api.localServer.report);
    localStorage.setItem('report', reportDataForTableOverview);
  }

  updateDropdownState = async (e, data, id) => {
    // Controlled dropdown
    const { value } = data; // Depends on the dropdown's API
    const selector = `currentValue${id}`;

    // When I call this method all applications are loaded into the state
    const index = value - 1;
    if (id === "APL") {
      const applicationsIsEmpty = _.isEmpty(this.state.api.localServer.applications);

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

      // Once "blocks" contains valid data, the first block id is taken for displaying in the UI
      const blockId = blocks[0].id;
      const optionsBLK = createDropdownOptions(blocks, validateData);

      this.setState(prevState => {
        console.log("up2");
        const nextUpdate = { ...prevState };
        nextUpdate.api.localServer.applicationId = applicationId;
        nextUpdate.api.localServer.blockId = blockId;
        nextUpdate.api.localServer.blocks = blocks;
        nextUpdate.dropdown.options.optionsBLK = optionsBLK;
        nextUpdate.dropdown.currentValue[selector] = value;
        nextUpdate.api.localServer.reportIsRequired = true;
        return nextUpdate;
      });
    }

    if (id === "BLK") {
      //const applicationId = this.state.api.localServer.applicationId;
      const blockId = this.state.api.localServer.blocks[index]?.id;

      this.setState(prevState => {
        const nextUpdate = { ...prevState };
        nextUpdate.dropdown.currentValue[selector] = value;
        nextUpdate.api.localServer.blockId = blockId;
        nextUpdate.api.localServer.reportIsRequired = true;
        return nextUpdate;
      });
    }
  }

  // Create report data
  createReport = async (applicationId, blockId) => {
    console.log("[createReport]");

    // Create report if applicationId / blockId have meaninful values
    const invalidData = (applicationId === -1) || (blockId === -1);

    if (invalidData) {
      console.error("[createReport] Invalid applicationId or blockId");
      toaster.danger(...propsToasterDanger);
      return;
    }

    this.setState(prevState => {
      const nextUpdate = { ...prevState };
      nextUpdate.api.localServer.applicationId = applicationId;
      nextUpdate.api.localServer.blockId = blockId;
      nextUpdate.api.localServer.reportIsRequired = true;
      // nextState.api.localServer.report = { ...report, applicationId, blockId };
      return nextUpdate;
    })
  }

  async componentDidUpdate(prevProps, prevState) {
    console.log("[componentDidUpdate] applicationId", this.state.api.localServer.applicationId);
    console.log("[componentDidUpdate] blockId", this.state.api.localServer.blockId);

    // This values are always available because of the fallback data
    const applicationId = this.state.api.localServer.applicationId;
    const blockId = this.state.api.localServer.blockId;

    if (this.state.api.localServer.reportIsRequired) {
      console.log("[componentDidUpdate] Generate new report");
      let report = {};
      const reqBody = {
        query: {
          configurationIds: [applicationId],
          sampleIds: [blockId],
          //last: 3 // Select the last "n" elements to display in chart
        }
      }

      try {
        report = await connectLocalServer.getReport(reqBody);
      } catch (err) {
        console.error("[componentDidUpdate] Cannot get data for report");
        toaster.danger(...propsToasterUpdateFailed);
        return;
      }

      toaster.success(...propsToasterSuccessfulUpdate);
      console.log("[componentDidUpdate] The following report was created: ");
      console.dir(report);

      // create metrics based on given report
      const metrics = {
        avg: getAvgValueFromReport(report),
        min: getMinValueFromReport(report),
        max: getMaxValueFromReport(report)
      };

      this.setState(prevState => {
        const nextState = { ...prevState };
        nextState.api.localServer.report = { ...report, applicationId, blockId };
        nextState.api.localServer.reportIsRequired = false;
        nextState.metrics = metrics;
        return nextState;
      })
    }
  }

  createDropdownProps = (ids) => {
    const baseProps = {
      placeholder: "Select",
      onChange: this.updateDropdownState
    };

    return ids.map((id, index) => (
      {
        ...baseProps,
        options: this.state.dropdown.options[`options${id}`],
        value: this.state.dropdown.currentValue[`currentValue${id}`],
        id,
        key: index
      }
    ));
  }

  updateData(applicationId, blockId) {
    console.log("[updateData] applicationId: ", applicationId);
    console.log("[updateData] blockId: ", blockId);
    this.createReport(applicationId, blockId);
  }

  render() {
    console.log("[Render] Updating UI interface");

    // Extract some class methods / fields
    const { createDropdownProps } = this;
    const { applicationId, blockId } = this.state.api.localServer;
    const { max, min, avg } = this.state.metrics;

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
      controls,
      metrics,
      formatText
    } = styles;

    // Dropdown components
    const dropdownIds = ["APL", "BLK"];
    const dropdownProps = createDropdownProps(dropdownIds);
    const [DropdownAPL, DropdownBLK] = dropdownProps.map(prop => <Dropdown {...prop} />);

    // Line chart
    const dataLineChartTT = this.state.api.localServer.report;
    const LineChartTT = <LineChart id="TT" data={dataLineChartTT} />;

    return (
      <div className={overview}>
        <div className={contentBox} >
          <div className={titleBox}>
            <TitleBar {...propsTitleBarTT} />
          </div>

          <div className={controlTrendBox}>
            <div className={controlBox}>
              <div className={controls}>
                <div>
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
                    <DownloadButton data={dataLineChartTT}>
                      Download
                    </DownloadButton>

                    <UpdateButton
                      updater={this.updateData.bind(this, applicationId, blockId)}>
                      Update
                    </UpdateButton>
                  </div>
                </div>
              </div>

              <div className={metrics}>
                <div className={labelDropdownBox}>
                  <span className={labelBox}>Maximum (u):</span>
                  <div className={formatText}>{max}</div>
                </div>

                <div className={labelDropdownBox}>
                  <span className={labelBox}>Average (u):</span>
                  <div className={formatText}>{avg}</div>
                </div>

                <div className={labelDropdownBox}>
                  <span className={labelBox}>Minimum (u):</span>
                  <div className={formatText}>{min}</div>
                </div>
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
