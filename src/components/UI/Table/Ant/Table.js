import { Table } from 'antd';
import "./Table.css"

import { ReactComponent as Product } from "../../../../assets/svg/product.svg";
import { ReactComponent as Application } from "../../../../assets/svg/documents.svg";
import { ReactComponent as PeakHigh } from "../../../../assets/svg/peakHigh.svg";
import { ReactComponent as PeakLow } from "../../../../assets/svg/peakLow.svg";
import { ReactComponent as Runtime } from "../../../../assets/svg/runtime.svg";
import statusOk from "../../../../assets/icons/statusAllrightBig.ico";
import statusWarning from "../../../../assets/icons/statusWarningBig.ico";
import statusAlert from "../../../../assets/icons/statusAlertBig.ico";
import { ReactComponent as Thickness } from "../../../../assets/svg/thickness.svg";

import _ from 'lodash';
import { toaster } from "evergreen-ui";

const propsToasterInvalidData = [
  "Error",
  {
    description: "Cannot process data from invalid report"
  }
];


const TableCell = ({ icon, label }) => (
  <div className="tableCell">
    <span className="icon">{icon}</span>
    <span className="label">{label}</span>
  </div>
)

const columns = [
  {
    title: 'Application',
    dataIndex: 'application',
    key: 'c1',
    render: (arr) => <TableCell icon={arr[0]} label={arr[1]} />,
  },
  {
    title: 'Block',
    dataIndex: 'block',
    key: 'c2',
    render: (arr) => <TableCell icon={arr[0]} label={arr[1]} />,
  },
  {
    title: 'Measurement',
    dataIndex: 'measurement',
    key: 'c3',
    render: (arr) => <TableCell icon={arr[0]} label={arr[1]} />,
  },
  {
    title: 'Timestamp',
    dataIndex: 'timestamp',
    key: 'c4',
    render: (arr) => <TableCell icon={arr[0]} label={arr[1]} />,
  },
  {
    title: 'Validation',
    dataIndex: 'validation',
    key: 'c5',
    render: icon => <TableCell icon={icon} />,
  }
];

// Contains data in the format table columns need
const fallback = [
  {
    key: '1',
    application: [<Application />, "Error"],
    block: [<Product />, "Error"],
    measurement: [<Thickness />, -1],
    timestamp: [<Runtime />, "Error"],
    validation: <img src={statusAlert} alt="status-alert" />,
  }
];

const processDataFromReport = (report, threshold) => {
  console.log("[processDataFromReport]");

  if (_.isEmpty(report)) {
    return;
  }

  const reportAsObject = JSON.parse(report);
  let dataForTable;

  // The report tuples might have eventually values like "-.-". Remove this.
  

  try {
    const filteredTuples = reportAsObject.tuples.filter(el => el[6] !== "-.-");
    dataForTable = filteredTuples.map((el, index) => {
      // Validation
      const measurement = el[6];
      const { lowerLimit, upperLimit } = threshold;
      let validationIcon = <img src={statusAlert} alt="status-alert" />;

      if ((measurement >= lowerLimit) && (measurement <= upperLimit)) {
        validationIcon = <img src={statusOk} alt="status-ok" />;
      }

      return {
        key: index,
        application: [<Application />, el[1]],
        block: [<Product />, el[3]],
        measurement: [<Thickness />, measurement],
        timestamp: [<Runtime />, el[5]],
        validation: validationIcon,
      }
    });

  } catch (error) {
    toaster.danger(...propsToasterInvalidData);
    return fallback;
  }

  return dataForTable;
}


const CustomTable = ({ report, threshold }) => {
  const dataTable = processDataFromReport(report, threshold);

  return (
    <Table
      className="table"
      columns={columns}
      dataSource={dataTable}
      pagination={{ defaultPageSize: 5 }}
    />
  )
}

export default CustomTable