import _ from "lodash";

const validateData = (report) => {
  let yValues;
  try {
    const filteredData = report.tuples.filter(el => el[6] !== "-.-");
    yValues = filteredData.map(el => parseFloat(el[6]));
  } catch (error) {
    throw new Error("[validateData]: Invalid report data");
  }
  return yValues;
}

export const getAvgValueFromReport = (report) => {
  let result;
  try {
    result = validateData(report);
  } catch (error) {
    console.error("[getAvgValueFromReport] Cannot calculate average from report");
    return -1;
  }
  return _.round(_.mean(result), 2);
}

export const getMaxValueFromReport = (report) => {
  let result;
  try {
    result = validateData(report);
  } catch (error) {
    console.error("[getAvgValueFromReport] Cannot calculate average from report");
    return -1;
  }
  return _.round(_.max(result), 2);
}
export const getMinValueFromReport = (report) => {
  let result;
  try {
    result = validateData(report);
  } catch (error) {
    console.error("[getAvgValueFromReport] Cannot calculate average from report");
    return -1;
  }
  return _.round(_.min(result), 2);
}