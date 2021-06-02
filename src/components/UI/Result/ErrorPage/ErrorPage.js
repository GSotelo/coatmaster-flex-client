import React from "react";
import { Result, Button } from "antd";

import styles from "./ErrorPage.module.css";

const ErrorPage = () => (
    <Result
        className={styles.errorPage}
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist"
        extra={<Button type="primary"><a href="/">Refresh page</a></Button>}
    />
);

export default ErrorPage;
