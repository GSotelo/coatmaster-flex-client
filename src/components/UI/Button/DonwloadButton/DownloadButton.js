/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, Fragment } from "react";
import { Button } from 'antd';

import onDownload from "../../../../utils/downloadData";
import { DownloadOutlined } from '@ant-design/icons';

const propsDownloadBtn = {
  icon: <DownloadOutlined />,
  key: "download",
  type: "primary",
};

const DownloadButton = ({ data, children }) => {
  // Init ref to download link
  const donwloadLink = useRef(null);

  return (
    <Fragment>
      <Button
        {...propsDownloadBtn}
        onClick={(e) => onDownload(e, data, donwloadLink)}
      >
        {children}
      </Button>
      <a
        ref={donwloadLink}
        style={{ display: "none" }}
      >
        downloadLink
      </a>
    </Fragment>
  )
}

export default DownloadButton
