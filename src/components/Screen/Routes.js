import React, { Fragment } from "react";
import { Route } from "react-router-dom";

import {
  BatchInformation,
  TableCoatmasterFlex
} from "./utilities/lazyLoad";

const productionCategory = [
  {
    key: "overview",
    path: "/coatmaster-flex/overview",
    screen: <BatchInformation />
  },
  {
    key: "overview",
    path: "/coatmaster-flex/table",
    screen: <TableCoatmasterFlex />
  }
];

const routeCategories = [
  productionCategory
];

const rootItems = routeCategories.map(routeCategory =>
  routeCategory.map(route =>
    <Route key={route.key} path={route.path}>
      {route.screen}
    </Route>
  )
);

const Routes = (props) => (
  <Fragment>
    <Route exact path="/">
      <BatchInformation />
    </Route>
    {rootItems}
  </Fragment>
);

export default Routes;

