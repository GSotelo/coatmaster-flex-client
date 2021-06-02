import React from "react";
import logo from "../../assets/icons/logo.png";

import styles from "./Logo.module.css"

const Logo = (props) => (
  <div className={styles.logoBox}>
    <img 
      src={logo} 
      alt="logo" 
      className={styles.logo}
    />
  </div>
);

export default Logo;