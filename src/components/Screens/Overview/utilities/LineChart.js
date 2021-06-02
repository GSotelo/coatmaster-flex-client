import React from "react";
import Line from "../../../UI/Graph/Line/Line";
import { createDateObject } from "../../../../utils/time";

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

const LineChart = ({ data, id }) => {
  const layout = layoutTT;
  let lineData;

  const fallback = [
    {
      id,
      data: [{ x: new Date().toISOString(), y: 0 }]
    }
  ];

  let dataArray;
  try {
    dataArray = data.tuples.map(el => (
      {
        x: createDateObject(el[5], "YYYY-MM-DDTHH:mm:ss").$d.toISOString(), // "2019-09-12T22:46:27"
        y: el[6]
      }
    ));

    lineData = [{ id, data: dataArray }];
  } catch (err) {
    console.error("[LineChart] Cannot get data from empty array")
    lineData = fallback;
  }

  return (
    <Line {...layout} data={lineData} />
  );
};

export default LineChart;