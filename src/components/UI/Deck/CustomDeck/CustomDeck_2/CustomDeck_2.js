import React from "react";
import Card from "../../../Card/CardWithFooter/CardWithFooter";

import processDataDeck from "../../../../../utils/processDataDeck";
import styles from "./CustomDeck_2.module.css";
import { ReactComponent as Total } from "../../../../../assets/svg/total.svg";
import { ReactComponent as Average } from "../../../../../assets/svg/average.svg";

const { setFooterLabel, setFooterValue } = processDataDeck;

/**
 * This component renders card elements for
 * showing total and average values. It can 
 * be found on the following screens:
 * "Fresh powder"
 */
const Deck = ({ data, timeRange, units, orientation }) => {
  // Controlling how cards are displayed (horizontally or vertically)
  let customStyle;
  if (orientation === "h") {
    customStyle = styles.horizontalDeck;
  }

  if (orientation === "v") {
    customStyle = styles.verticalDeck;
  }

  // The structure "data" is defined by the "state" object of each "Screen" component
  const { avgTimeRange, avgPrevTimeRange } = data.average;
  const { totalTimeRange, totalPrevTimeRange } = data.total;

  /**
   *  Configuration for each "Card" element.
   *  1st element: Total value
   *  2nd element: Average value
   */
  const configDeck = [
    {
      id: "total",
      icon: <Total />,
      label: setFooterLabel(timeRange, totalTimeRange, totalPrevTimeRange),
      previousValue: setFooterValue(timeRange, totalPrevTimeRange, units),
      units,
      value: totalTimeRange,
    },
    {
      id: "average",
      icon: <Average />,
      label: setFooterLabel(timeRange, avgTimeRange, avgPrevTimeRange),
      previousValue: setFooterValue(timeRange, avgPrevTimeRange, units),
      units,
      value: avgTimeRange,
    },
  ];

  // Custom deck UI component
  return (
    <div className={customStyle}>
      {
        configDeck.map(el => (
          <div
            className={styles.cardBox}
            key={el.id}
          >
            <Card {...el} />
          </div>
        ))
      }
    </div>
  );
};
export default Deck;


