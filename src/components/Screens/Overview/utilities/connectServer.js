import axiosCoatmasterFlex from "../../../../api/axios";
import _ from "lodash";
import { toaster } from "evergreen-ui";
import {
  propsToasterServerStatus,
  propsToasterServerApplications,
  propsToasterServerBlocks,
  propsFailedStatusLocalServer,
  propsEmptyApplications,
  propsEmptyBlocks,
  propsFailedReport
} from "./props";

const getStatus = async (url) => {
  let response;
  try {
    response = await axiosCoatmasterFlex.get(url);
  } catch (err) {
    toaster.danger(...propsFailedStatusLocalServer);
    throw new Error("status");
  }

  return response.data;
}

// Applications or configurations (indistinct)
const getApplications = async (url) => {
  let response;

  try {
    response = await axiosCoatmasterFlex.get(url);
  } catch (err) {
    toaster.danger(...propsEmptyApplications);
    throw new Error("applications");
  }

  return response.data;
}

// Blocks or samples (indistinct)
const getBlocks = async (appId) => {
  let response;

  try {
    response = await axiosCoatmasterFlex.get("/samples", { params: { configId: appId } });
  } catch (err) {
    toaster.danger(...propsEmptyBlocks);
    throw new Error("blocks");
  }

  return response.data;
}


const getReport = async (reqBody) => {
  let response;
  try {
    response = await axiosCoatmasterFlex.post("/measurement/report", reqBody);
  } catch (err) {
    toaster.danger(...propsFailedReport);
    throw new Error("[getReport] Not possible to fetch data");
  }

  return response.data;
}


const startup = async (customAppId) => {
  let applications = [];
  let blocks = [];
  let status = false;
  let applicationId = -1;
  let blockId = -1;
  let report = {}

  // Fallback matches object structure of "this.state.api.localServer"
  const fallback = { applications, blocks, status, blockId, applicationId, report };

  try {
    status = await getStatus("status");
    applications = await getApplications("configurations");
  } catch (err) {
    if (err.message === "status") {
      console.error("[getStatus]: Not possible to fetch local server status");
      toaster.danger(...propsToasterServerStatus);
      return fallback;
    }

    if (err.message === "applications") {
      console.error("[getApplications]: Not possible to fetch applications");
      toaster.danger(...propsToasterServerApplications);
      return fallback;
    }
  }

  // Using first application id during "componentDidMount" 
  const [appId] = _.map(applications, "id");

  try {
    blocks = await getBlocks(customAppId || appId);
    console.log(blocks)
  } catch (error) {
    console.error("[getBlocks]: Not possible to fetch blocks");
    toaster.danger(...propsToasterServerBlocks);
    return fallback;
  }

  // Using first block id during "componentDidMount" 
  blockId = blocks[0]?.id;

  return { applications, blocks, status, report, blockId, applicationId: appId };
}

const connectLocalServer = {
  getBlocks,
  startup,
  getReport,
};

export default connectLocalServer;