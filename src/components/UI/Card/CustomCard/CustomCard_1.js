import CardWithFooter from "../CardWithFooter/CardWithFooter";
import CardWithoutFooter from "../CardWithoutFooter/CardWithoutFooter";

import { ReactComponent as Average } from "../../../../assets/svg/average.svg";
import { ReactComponent as PeakHigh } from "../../../../assets/svg/peakHigh.svg";
import { ReactComponent as PeakLow } from "../../../../assets/svg/peakLow.svg";

/**
 * This component was designed to work in 
 * conjuntion with "CustomDeck_1" component
 */
const Card = (props) => {
  if (props.type === 1) {
    return (
      <CardWithFooter
        {...props}
        icon={<Average />}
      />
    );
  }

  if (props.type === 2) {
    return (
      <CardWithoutFooter
        {...props}
        icon={<PeakHigh />}
      />
    );
  }

  if (props.type === 3) {
    return (
      <CardWithoutFooter
        {...props}
        icon={<PeakLow />}
      />
    );
  }
};

export default Card;
