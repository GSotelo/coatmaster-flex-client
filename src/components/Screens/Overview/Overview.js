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
import { propsTitleBarTT, propsDownloadBtn, propsToasterDanger } from "./utilities/props";
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
        //last: 5 // This might be the key to filter elements by date
      }
    }

    console.log("[componentDidMount] Trying to get report with app and block id", applicationId, blockId);
    try {
      report = await connectLocalServer.getReport(reqBody);
    } catch (err) {
      console.error("[componentDidMount] Cannot get data for report");
      return;
    }

    console.log("[componentDidMount]  Report during did mount");
    console.dir(report);

    // At this point report data is valid...
    const metrics = {
      avg: getAvgValueFromReport(report),
      min: getMinValueFromReport(report),
      max: getMaxValueFromReport(report)
    }


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

  updateDropdownState = async (e, data, id) => {
    // Controlled dropdown
    const { value } = data; // Depends on the dropdown's API
    const selector = `currentValue${id}`;

    // this.setState(prevState => {
    //   console.log("up1");
    //   const nextUpdate = { ...prevState };
    //   nextUpdate.dropdown.currentValue[selector] = value;
    //   return nextUpdate;
    // });

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

      const blockId = blocks[0].id;
      console.log("blockId");
      console.dir(blockId);

      const optionsBLK = createDropdownOptions(blocks, validateData);
      console.log("optionsBLK");
      console.dir(optionsBLK);

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
      console.log("APL dd value", this.state.dropdown.currentValue.currentValueAPL);
      console.log("BLK dd value", this.state.dropdown.currentValue.currentValueBLK);

      console.log("application id");
      console.dir(this.state.api.localServer.applicationId);
      const applicationId = this.state.api.localServer.applicationId;
      const blockId = this.state.api.localServer.blocks[index]?.id;

      console.log("blocks");
      console.dir(this.state.api.localServer.blocks);

      console.log("block id");
      console.dir(blockId);

      // let report = {};
      // const reqBody = {
      //   query: {
      //     configurationIds: [applicationId],
      //     sampleIds: [blockId],
      //     last: 5 // This might be the key to filter elements by date
      //   }
      // }

      // try {
      //   report = await connectLocalServer.getReport(reqBody);
      // } catch (err) {
      //   console.error("[updateDropdownState] Cannot get data for report");
      //   return;
      // }
      // console.log("report");
      // console.dir(report);

      this.setState(prevState => {
        console.log("up3");
        const nextUpdate = { ...prevState };
        nextUpdate.dropdown.currentValue[selector] = value;
        nextUpdate.api.localServer.blockId = blockId;
        nextUpdate.api.localServer.reportIsRequired = true;
        //nextUpdate.api.localServer.report = report;
        return nextUpdate;
      });
    }
  }

  // Create report data
  createReport = async (applicationId, blockId) => {
    console.error("[createReport] Trying to get new data");

    const invalidData = (applicationId === -1) || (blockId === -1);

    // Validation of applicationId and blockId
    if (invalidData) {
      console.error("[createReport] Invalid applicationId or blockId");
      toaster.danger(...propsToasterDanger);
      return;
    }

    // console.log("[componentDidUpdate] Generate a new report");
    // let report = {};
    // const reqBody = {
    //   query: {
    //     configurationIds: [applicationId],
    //     sampleIds: [blockId],
    //   }
    // }

    // console.log("[componentDidUpdate] reqBody", reqBody);

    // try {
    //   report = await connectLocalServer.getReport(reqBody);
    // } catch (err) {
    //   console.error("[componentDidUpdate] Cannot get data for report");
    //   return;
    // }
    // console.log("[componentDidUpdate] report");
    // console.dir(report);

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
    console.log("[componentDidUpdate]");
    console.log("[componentDidUpdate] appid", this.state.api.localServer.applicationId);
    console.log("[componentDidUpdate] blockid", this.state.api.localServer.blockId);

    console.log("[componentDidUpdate] report is required", this.state.api.localServer.reportIsRequired);

    // Here I should request the report data... (aveces sale undefined)
    const applicationId = this.state.api.localServer.applicationId;
    const blockId = this.state.api.localServer.blockId;

    const reportIsEmpty = _.isEmpty(this.state.api.localServer.report);
    //console.log("[componentDidUpdate] reportIsEmpty", reportIsEmpty);
    //console.log("[componentDidUpdate] report value", this.state.api.localServer.report);


    const reportApplicationId = this.state.api.localServer.report.applicationId;
    const reportBlockId = this.state.api.localServer.report.blockId;


    console.log("[componentDidUpdate] reportApplicationId", reportApplicationId);
    console.log("[componentDidUpdate] reportBlockId", reportBlockId);

    if (this.state.api.localServer.reportIsRequired) {
      console.log("[componentDidUpdate] Generate a new report");
      let report = {};
      const reqBody = {
        query: {
          configurationIds: [applicationId],
          sampleIds: [blockId],
          //last: 5 // This might be the key to filter elements by date
        }
      }

      console.log("[componentDidUpdate] reqBody", reqBody);

      try {
        report = await connectLocalServer.getReport(reqBody);
      } catch (err) {
        console.error("[componentDidUpdate] Cannot get data for report");
        return;
      }
      console.log("[componentDidUpdate] report");
      console.dir(report);

      // Here good place to create a report
      const metrics = {
        avg: getAvgValueFromReport(report),
        min: getMinValueFromReport(report),
        max: getMaxValueFromReport(report)
      }

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
    }

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
    console.log("The app id vs block id");
    // Get application id
    console.log("applicationId: ", applicationId);

    // Get block id
    console.log("blockId: ", blockId);

    // Update data
    this.createReport(applicationId, blockId);
  }


  render() {
    console.log("[Render] UI Rerendering...")
    console.log("[Render] Report:")
    console.log("[Render]", this.state.api.localServer.report);
    // DOM reference to download JSON files

    // TEMP MODE
    const { applicationId, blockId } = this.state.api.localServer;
    const { max, min, avg } = this.state.metrics;

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
      controls,
      metrics,
      formatText
    } = styles;

    // Dropdown components
    const dropdownIds = ["APL", "BLK"];
    const dropdownProps = createDropdownProps(dropdownIds);
    const [DropdownAPL, DropdownBLK] = dropdownProps.map(prop => <Dropdown {...prop} />)

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
                  <span className={labelBox}>Average (u)</span>
                  <div className={formatText}>{avg}</div>
                </div>

                <div className={labelDropdownBox}>
                  <span className={labelBox}>Minimum (u)</span>
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
