import React from "react";
import { Dropdown } from 'semantic-ui-react';

import styles from "./Dropdown.module.css";

const ControlledDropdown = ({ options, value, id, onChange, placeholder }) => {

  return (
    <Dropdown
      className={styles.dropdown}
      options={options}
      placeholder={placeholder || "Select"}
      selection
      onChange={(e, data) => onChange(e, data, id)}
      value={value || 1}

    />
  );
};

export default ControlledDropdown;