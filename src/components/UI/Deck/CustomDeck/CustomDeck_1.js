import React, { Fragment } from "react";
import Card from "../../Card/CustomCard/CustomCard_1";
import HorizontalCards from "../../Cards/HorizontalCards/HorizontalCards";

import processDataDeck from "../../../../utils/processDataDeck";


const { setFooterLabel, setFooterValue } = processDataDeck;

/**
 * This component was designed to work in conjuntion with 
 * the "CustomCard_1" component. It renders card elements 
 * for showing average, maximum and minimum values. It can
 * be found on the following screens:
 * "Air pressure"
 * "Humidity and temperature"
 * "Electricity and air"
 */
const Deck = ({ data, timeRange, units }) => {
  // The structure "data" is defined by the "state" object of each "Screen" component
  const { avgTimeRange, avgPrevTimeRange } = data.average;

  /**
   *  Configuration for each "Card" element.
   *  1st element: Blue card showing current and previous values
   *  2nd element: Maximum value based on provided data
   *  3rd element: Minimum value based on provided data
   */
  const configDeck = [
    {
      label: setFooterLabel(timeRange, avgTimeRange, avgPrevTimeRange),
      previousValue: setFooterValue(timeRange, avgPrevTimeRange, units),
      type: 1,
      value: avgTimeRange,
      units
    },
    {
      type: 2,
      value: data.maxValue,
      units
    },
    {
      type: 3,
      value: data.minValue,
      units
    }
  ];

  const Cards = configDeck.map(el => <Card {...el} />);

  // Custom deck UI component
  return (
    <Fragment>
      <HorizontalCards cards={Cards} />
    </Fragment>
  );

};

export default Deck;