import React, { Fragment } from "react";

import styles from "./Layout.module.css";

const Layout = ({ topBar, sideBar, screen }) => (
  <Fragment>
    <header className={styles.header}>
      {topBar}
    </header>
    <main className={styles.main}>
      <aside className={styles.sideBar}>
        {sideBar}
      </aside>
      <section className={styles.screen}>
        {screen}
      </section>
    </main>
    <footer className={styles.footer} />
  </Fragment>
);

export default Layout;