import React, { useContext } from "react";
import { Dropdown } from 'semantic-ui-react';
import GraphContext  from "../../Context/GraphContext";

import styles from "./Dropdown.module.css";

const ControlledDropdown = ({ options, placeholder }) => {

  const { id, currentValueDropdown, updateDropdownState } = useContext(GraphContext);

  return (
    <Dropdown
      className={styles.dropdown}
      options={options}
      placeholder={placeholder || "Select"}
      selection
      onChange={(e, { value }) => updateDropdownState(e, { value }, id)}
      value={currentValueDropdown}
    />
  );
};

export default ControlledDropdown;