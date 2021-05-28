import axiosCoatmasterFlex from "../../../../api/axios";
import _ from "lodash";


const getStatus = async (url) => {
  let response;
  try {
    response = await axiosCoatmasterFlex.get(url);
  } catch (err) {
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
    throw new Error("blocks");
  }

  return response.data;
}


const getReport = async (reqBody) => {
  let response;
  try {
    response = await axiosCoatmasterFlex.post("/measurement/report", reqBody);
  } catch (err) {
    
    console.error("[getReport] Not possible to fetch data");
    return [];
  }

  return response.data;
}


const startup = async (customAppId) => {
  let applications = [];
  let blocks = [];
  let status = false;

  // Fallback matches object structure of "this.state.api.localServer"
  const fallback = { applications: [], blocks: [], status: false };

  try {
    status = await getStatus("status");
    applications = await getApplications("configurations");
  } catch (err) {
    if (err.message === "status") {
      console.error("[getStatus]: Not possible to fetch local server status");
      return fallback;
    }

    if (err.message === "applications") {
      console.error("[getApplications]: Not possible to fetch applications");
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
    return fallback;
  }

  return { applications, blocks, status };
}

const connectLocalServer = {
  getBlocks,
  startup,
  getReport,
};

export default connectLocalServer;