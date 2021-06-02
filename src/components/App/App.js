import React, { Component } from "react";
import Layout from "../Layout/Layout";

import { propsLayout } from "./utilities/props";
import styles from "./App.module.css";

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <Layout {...propsLayout} />
      </div>
    );
  }
}

export default App;