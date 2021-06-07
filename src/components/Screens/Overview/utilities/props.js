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