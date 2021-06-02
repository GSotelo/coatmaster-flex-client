import React, { Fragment } from 'react';
import RadioGroup from "../Standard/RadioGroup";
import "./TwoRadioGroup.css";

const TwoRadioGroup = ({ options, onChange }) => {
  return (
    <Fragment>
      <RadioGroup customClass="twoRadioGroup" options={options} onChange={onChange} />
    </Fragment>
  )
}

export default TwoRadioGroup;
