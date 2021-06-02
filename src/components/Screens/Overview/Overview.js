import React, { Component } from "react";
import Button from "../../UI/Button/DonwloadButton/DownloadButton";
import Datepicker from "../../UI/Datepicker/Datepicker";
import Dropdown from "../../UI/Dropdown/Dropdown";
import LineChart from "./utilities/LineChart";
import TitleBar from "../../Bar/TitleBar/StandardTitleBar";

import styles from "./Overview.module.css";
import connectLocalServer from "./utilities/connectServer";
import { createDropdownOptions, validateData } from "./utilities/miscellaneous";
import { propsTitleBarTT, propsDownloadBtn } from "./utilities/props";
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
        report: {}
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
        last: 5 // This might be the key to filter elements by date
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

    this.setState(prevState => {
      const nextState = { ...prevState };
      nextState.api.localServer = dataLocalServer;
      nextState.api.localServer.report = { ...report, applicationId, blockId };
      nextState.dropdown.options.optionsAPL = optionsAPL;
      nextState.dropdown.options.optionsBLK = optionsBLK;
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
        //nextUpdate.api.localServer.report = report;
        return nextUpdate;
      });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    console.log("[componentDidUpdate]");
    console.log("[componentDidUpdate] appid", this.state.api.localServer.applicationId);
    console.log("[componentDidUpdate] blockid", this.state.api.localServer.blockId);

    // Here I should request the report data... (aveces sale undefined)
    const applicationId = this.state.api.localServer.applicationId;
    const blockId = this.state.api.localServer.blockId;

    const reportIsEmpty = _.isEmpty(this.state.api.localServer.report);
    console.log("[componentDidUpdate] reportIsEmpty", reportIsEmpty);
    console.log("[componentDidUpdate] report value", this.state.api.localServer.report);

    // Aqui tengo que comparar cuando tengo que crear un nuevo reporte. La data del estado reporte va ir directo 
    // al grafico de linea para ser filtrado despues acorde al formato del line chart

    const reportApplicationId = this.state.api.localServer.report.applicationId;
    const reportBlockId = this.state.api.localServer.report.blockId;
    let createReport = false;

    console.log("[componentDidUpdate] reportApplicationId", reportApplicationId);
    console.log("[componentDidUpdate] reportBlockId", reportBlockId);

    // if (!(applicationId === reportApplicationId) && (blockId === reportBlockId)) {
    //   console.log("Create new report");
    //   createReport = true;
    // }

    if ((reportApplicationId !== applicationId) || (blockId !== reportBlockId)) {
      console.log("Create new report");
      createReport = true;
    }

    console.log("[componentDidUpdate] create report needed", createReport);

    if (createReport) {
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

      this.setState(prevState => {
        const nextState = {...prevState};
        nextState.api.localServer.report = { ...report, applicationId, blockId };
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
        key:index
      }
    ));
  }

  render() {
    console.log("[Render] UI Rerendering...")
    console.log("[Render] Report:")
    console.log("[Render]", this.state.api.localServer.report);
    // DOM reference to download JSON files
   
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
                <Button data={dataLineChartTT}>
                  Download
                </Button>
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
