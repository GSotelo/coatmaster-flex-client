import _ from "lodash";
import { createDateObject } from "./time";

const getAverage = (arr) => {
  if (_.isEmpty(arr)) {
    return 0;
  }
  return _.round(_.mean(arr), 2);
};

const getMaxValueFromArray = (arr) => {
  if (_.isEmpty(arr)) {
    return 0;
  }
  return _.round(_.max(arr), 2);
};

const getMinValueFromArray = (arr) => {
  if (_.isEmpty(arr)) {
    return 0;
  }
  return _.round(_.min(arr), 2);
};

const getTotalValueFromArray = (arr) => {
  if (_.isEmpty(arr)) {
    return 0;
  }
  return _.round(_.sum(arr), 2);
};

const filterArrayByObjectProperty = (arr, property) => {
  if (_.isEmpty(arr)) {
    return false;
  }
  return _.map(arr, property);
};

const groupByIsSameorBeforeDate = (arr, date, func, timeRange) => {
  if (_.isEmpty(arr)) {
    return false;
  }

  if (!("x" in arr[0])) {
    return false;
  }

  return _.filter(arr, ({ x }) => func(x).isSameOrBefore(date, "day"));
};

const groupByAfterDate = (arr, date, func, timeRange) => {
  if (_.isEmpty(arr)) {
    return false;
  }

  if (!("x" in arr[0])) {
    return false;
  }

  return _.filter(arr, ({ x }) => func(x).isAfter(date, "day") === true);
};

/**
 * 
 * @param {*} arr Array as data source
 * @param {*} date Date as string (i.e. "2021-04-08T23:59:00.000Z")
 * @param {*} func Function to create a "Dayjs" object from "date"
 * @param {*} timeRange String value as "day", "week", "month"
 * @returns Array with filtered data
 */
const groupDataByDate = (arr, breakpoint, func1, func2, func3, timeRange) => {
  if (_.isEmpty(arr)) {
    return false;
  }

  // If "timeRange" comes from datepicker, there is no need to group data
  if (timeRange instanceof Array) {
    return { prevData: false, currentData: arr };
  }

  const prevData = func2(arr, breakpoint, func1, timeRange);
  const currentData = func3(arr, breakpoint, func1, timeRange);
  return { prevData, currentData };
};

const run = (data, fallbackData, timeRange) => {
  // If API request fails, then "arr" holds "undefined" or "false"
  if (typeof data === "undefined" || data === false) {
    console.error("[groupDataByDate.run]: There is no data to process");
    return fallbackData;
  }

  // Divides "arr" in two parts: before and after breakpoint
  const breakpoint = createDateObject(new Date()).subtract(1, timeRange);

  const argsGroupDataByDate = [
    data,
    breakpoint,
    createDateObject,
    groupByIsSameorBeforeDate,
    groupByAfterDate,
    timeRange
  ];

  const groupedData = groupDataByDate(...argsGroupDataByDate);

  // If group data fails, the result is "false"
  if (typeof groupedData == "boolean") {
    return fallbackData;
  }

  // Destructuring grouped data
  if (!("prevData" in groupedData) || !("currentData" in groupedData)) {
    return fallbackData;
  }

  // Grouped data
  return groupedData;
}

const groupData = {
  filterArrayByObjectProperty,
  getAverage,
  getMaxValueFromArray,
  getMinValueFromArray,
  getTotalValueFromArray,
  run
};

export default groupData;