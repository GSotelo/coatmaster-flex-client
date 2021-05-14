import React from "react";
import Line from "../../../UI/Graph/Line/Line";

import _ from "lodash";

/**
 * General notes:
 * The following objects are used to
 * customize graph templates (Line, 
 * Bar, Pie), which can be found in the 
 * UI folder. The graph templates are 
 * based on nivo library ;)
 */


/**
 * [layoutTT]: Thickness trend
 */
const layoutTT = {
  colors: "#86a315",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Thickness (um)"
};

const processDataLine = (data, fallback) => {
  return fallback;
}

const LineChart = ({ data, id }) => {
  const layout = layoutTT;

  const fallback = [
    {
      id,
      data: [{ x: new Date().toISOString(), y: 0 }]
    }
  ];

  const lineData = processDataLine(data, fallback);

  return (
    <Line {...layout} data={lineData} />
  );
};

export default LineChart;