import React, { Suspense } from "react";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { Spin } from 'antd';
import { Switch } from "react-router-dom";

import Routes from "./Routes";

const Screen = (props) => (
  <ErrorBoundary>
    <Suspense fallback={<Spin size="large" />}>
      <Switch>
        <Routes />
      </Switch>
    </Suspense>
  </ErrorBoundary>
);

export default Screen;