import axiosCoatmasterFlex from "../../../../api/axios";
import _ from "lodash";


const getStatus = async (url) => {
  let response;
  try {
    response = await axiosCoatmasterFlex(url);
  } catch (err) {
    console.error("[connectServer]", err);
  }
}

// Applications or configurations (indistinct)
const getApplications = async () => {
  let response;

  try {
    const urls = ["status", "configurations"];
    response = await Promise.all(urls.map(async url => axiosCoatmasterFlex.get(url)));
  } catch (err) {
    console.error("[connectServer]", err);
    return [];
  }

  const status = response[0]?.data;
  const applications = response[1]?.data;

  return { status, applications };
}

// Blocks or samples (indistinct)
const getBlocks = async (data, appId) => {
  let response;
  const dataIsEmpty = _.isEmpty(data);
  const noApplicationsKey = !("applications" in data);

  if (dataIsEmpty && noApplicationsKey ){
    return [];
  }

  try {
    response = await axiosCoatmasterFlex.get("/samples", { params: { configId: appId } });
  } catch (err) {
    console.error("[connectServer]", err);
    return [];
  }

  return response;
}

const connectLocalServer = {
  getApplications,
  getBlocks
};

export default connectLocalServer;