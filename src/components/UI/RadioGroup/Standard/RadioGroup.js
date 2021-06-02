import React from 'react';
import { Radio } from 'antd';

import "./RadioGroup.css";

const { Group, Button } = Radio;

const RadioButton = ({ options, customClass, onChange }) => {
  const classes = `radioButtons ${customClass}`;

  /**
   * The "onChange" callback is passed through the parent component.
   * The callback associated to "RadioButton" is generated using arrow 
   * functions, in case I need to pass params back to the parent component
   * callback
   */
  return (
    <div className={classes}>
      <Group
        defaultValue={1}
        size="large"
        onChange={e => onChange(e)}
      >
        {
          options.map(({ value, description }) => (
            <Button
              key={value}
              value={value}>
              {description}
            </Button>
          ))}
      </Group>
    </div>
  )
}

export default RadioButton;
