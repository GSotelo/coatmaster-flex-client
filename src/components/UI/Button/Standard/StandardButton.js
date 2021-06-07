import React, { Fragment } from "react";
import { Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

const propsDownloadBtn = {
  icon: <ReloadOutlined />,
  key: "update",
  type: "primary",
};


const StandardButton = ({ updater, children }) => {
  return (
    <Fragment>
      <Button
        {...propsDownloadBtn}
       // onClick={(e) => updater(e)}
        onClick={updater}
      >
        {children}
      </Button>
    </Fragment>
  )
}

export default StandardButton
