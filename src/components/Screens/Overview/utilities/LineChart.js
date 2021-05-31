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

const processDataLine = (data, fallback) => {
  return fallback;
}

const LineChart = ({ data, id }) => {
  const layout = layoutTT;

  console.log("[LineChart] Data en linechart");
  console.dir(data);

  const sampleReport = {
    generatedDate: "2020-03-27T05:11:53.436+0000",
    tuples: [
        [
            "50,20",
            "Powder colour",
            "9352",
            "1",
            "358",
            "2019-09-12T22:46:27",
            "28.3",
            "WARNING_FIT",
            "36.366",
            "1",
            "500",
            "0",
            "200",
            "MICROMETRE"
        ],
        [
            "5020",
            "Powder colour",
            "9352",
            "1",
            "357",
            "2019-09-12T22:45:20",
            "19.3",
            "WARNING_FIT",
            "36.077",
            "1",
            "500",
            "0",
            "200",
            "MICROMETRE"
        ],
        [
            "5020",
            "Powder colour",
            "9352",
            "1",
            "356",
            "2019-09-12T22:45:14",
            "10.2",
            "WARNING_FIT",
            "36.077",
            "1",
            "500",
            "0",
            "200",
            "MICROMETRE"
        ],
        [
            "5020",
            "Powder colour",
            "9352",
            "1",
            "348",
            "2019-09-12T22:38:07",
            "8.95",
            "WARNING_FIT",
            "33.127",
            "1",
            "500",
            "0",
            "200",
            "MICROMETRE"
        ],
        [
            "5020",
            "Powder colour",
            "9352",
            "1",
            "347",
            "2019-09-12T22:37:50",
            "6.45",
            "WARNING_FIT",
            "32.644",
            "1",
            "500",
            "0",
            "200",
            "MICROMETRE"
        ]
    ],
    columnIds: [
        "application_id",
        "application_name",
        "sample_id",
        "sample_name",
        "measurement_id",
        "timestamp",
        "thickness",
        "diffusivity",
        "measurement_status",
        "temperature",
        "warning_lower",
        "warning_upper",
        "error_lower",
        "error_upper",
        "units"
    ],
    applicationId: 5020,
    blockId: 9352
}

  // Let's get tuple prop
  // "2019-09-12T22:46:27"
  const tupple = sampleReport.tuples;
  const dataForLineChart = tupple.map((el, index) => {
    return {
      x: createDateObject(el[5], "YYYY-MM-DDTHH:mm:ss").$d.toISOString(),
      y: el[6]
    }
  });

  console.log("[LineChart] dataForLineChart");
  console.dir(dataForLineChart);


  const fallback = [
    {
      id,
      data: [{ x: new Date().toISOString(), y: 0 }]
    }
  ];

  const demoDataLine = [
     {
       id,
       data:dataForLineChart
     }
  ]

  const lineData = processDataLine(data, fallback);

  return (
    <Line {...layout} data={demoDataLine} />
  );
};

export default LineChart;