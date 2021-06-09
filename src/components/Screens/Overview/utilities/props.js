import { ReactComponent as Thickness } from "../../../../assets/svg/thickness.svg";
import { DownloadOutlined } from '@ant-design/icons';


export const propsTitleBarTT = {
  icon: <Thickness />,
  title: "Thickness measured",
  type: 1
};

export const propsDownloadBtn = {
  icon: <DownloadOutlined />,
  key: "download",
  type: "primary",
};

/**
 * [propsToasterDanger]: Alert configuration if API request fails
 */
 export const propsToasterDanger = [
  "Error",
  {
    description:"Invalid application or block id"
  }
];

/**
 * [propsToasterServerStatus]: Alert configuration if API request fails
 */
 export const propsToasterServerStatus = [
  "Error",
  {
    description:"Local server is offline"
  }
];

/**
 * [propsToasterServerApplications]: Alert configuration if API request fails
 */
 export const propsToasterServerApplications = [
  "Error",
  {
    description:"Local server: Not possible to fetch applications"
  }
];

/**
 * [propsToasterServerBlocks]: Alert configuration if API request fails
 */
 export const propsToasterServerBlocks = [
  "Error",
  {
    description:"Local server: Not possible to fetch blocks"
  }
];

/**
 * [propsToasterServerBlocks]: Alert configuration if API request fails
 */
 export const propsToasterInvalidLineData = [
  "Error",
  {
    description:"Local server: Application / Block data is corrupted. Delete -.- values from your measurements"
  }
];

/**
 * [propsToasterInvalidReport]: Alert configuration if API request fails
 */
 export const propsToasterUpdateFailed = [
  "Error",
  {
    description:"It's not possible to fetch data for report. Update process failed"
  }
];

/**
 * [propsToasterInvalidReport]: Alert configuration if API request fails
 */
 export const propsToasterSuccessfulUpdate= [
  "Successful update",
  {
    description:"Your data is now up to date"
  }
];

/**
 * [propsFailedStatusLocalServer]: Alert configuration if API request fails
 */
 export const propsFailedStatusLocalServer= [
  "Local server is offline",
  {
    description:"It is not possible to connect to local server"
  }
];

/**
 * [propsEmptyApplications]: Alert configuration if API request fails
 */
 export const propsEmptyApplications= [
  "Applications",
  {
    description:"It is not possible to fetch data for applications"
  }
];

/**
 * [propsEmptyBlocks]: Alert configuration if API request fails
 */
export const propsEmptyBlocks= [
  "Blocks",
  {
    description:"It is not possible to fetch data for blocks"
  }
];

/**
 * [propsFailedReport]: Alert configuration if API request fails
 */
 export const propsFailedReport= [
  "Report failed",
  {
    description:"It is not possible to fetch data for report"
  }
];

