import { Table } from 'antd';
import "./Table.css"

import { ReactComponent as Product } from "../../../../assets/svg/product.svg";
import { ReactComponent as PeakHigh } from "../../../../assets/svg/peakHigh.svg";
import { ReactComponent as PeakLow } from "../../../../assets/svg/peakLow.svg";
import { ReactComponent as Runtime } from "../../../../assets/svg/runtime.svg";
import statusOk from "../../../../assets/icons/statusAllrightBig.ico";
import statusWarning from "../../../../assets/icons/statusWarningBig.ico";
import statusAlert from "../../../../assets/icons/statusAlertBig.ico";
import { ReactComponent as Thickness } from "../../../../assets/svg/thickness.svg";

const TableCell = ({ icon, label }) => (
  <div className="tableCell">
    <span className="icon">{icon}</span>
    <span className="label">{label}</span>
  </div>
);

const columns = [
  {
    title: 'Region',
    dataIndex: 'region',
    key: 'c1',
    render: (arr) => <TableCell icon={arr[0]} label={arr[1]} />,
  },
  {
    title: 'Upper limit',
    dataIndex: 'upperLimit',
    key: 'c2',
    render: (arr) => <TableCell icon={arr[0]} label={arr[1]} />,
  },
  {
    title: 'Lower limit',
    dataIndex: 'lowerLimit',
    key: 'c3',
    render: (arr) => <TableCell icon={arr[0]} label={arr[1]} />,
  },
  {
    title: 'Measurement',
    dataIndex: 'measurement',
    key: 'c4',
    render: (arr) => <TableCell icon={arr[0]} label={arr[1]} />,
  },
  {
    title: 'Timestamp',
    dataIndex: 'timestamp',
    key: 'c5',
    render: (arr) => <TableCell icon={arr[0]} label={arr[1]} />,
  },
  {
    title: 'Validation',
    dataIndex: 'validation',
    key: 'c6',
    render: icon => <TableCell icon={icon} />,
  }
];

const data = [
  {
    key: '1',
    region: [<Product />, "ROI 1"],
    upperLimit: [<PeakHigh />, 105],
    lowerLimit: [<PeakLow />, 94],
    measurement: [<Thickness />, 94],
    timestamp: [<Runtime />, "04/11/2021 10:15"],
    validation: <img src={statusOk} alt="status-ok" />,
  },
  {
    key: '2',
    region: [<Product />, "ROI 2"],
    upperLimit: [<PeakHigh />, 97],
    lowerLimit: [<PeakLow />, 83],
    measurement: [<Thickness />, 94],
    timestamp: [<Runtime />, "05/11/2021 10:15"],
    validation: <img src={statusOk} alt="status-ok" />,
  },
  {
    key: '3',
    region: [<Product />, "ROI 3"],
    upperLimit: [<PeakHigh />, 103],
    lowerLimit: [<PeakLow />, 91],
    measurement: [<Thickness />, 103],
    timestamp: [<Runtime />, "06/11/2021 10:15"],
    validation: <img src={statusWarning} alt="status-warning" />,
  },
  {
    key: '4',
    region: [<Product />, "ROI 4"],
    upperLimit: [<PeakHigh />, 87],
    lowerLimit: [<PeakLow />, 79],
    measurement: [<Thickness />, 84],
    timestamp: [<Runtime />, "07/11/2021 10:15"],
    validation: <img src={statusOk} alt="status-ok" />,
  },
  {
    key: '5',
    region: [<Product />, "ROI 5"],
    upperLimit: [<PeakHigh />, 99],
    lowerLimit: [<PeakLow />, 83],
    measurement: [<Thickness />, 97],
    timestamp: [<Runtime />, "08/11/2021 10:15"],
    validation: <img src={statusOk} alt="status-ok" />,
  },
  {
    key: '6',
    region: [<Product />, "ROI 6"],
    upperLimit: [<PeakHigh />, 102],
    lowerLimit: [<PeakLow />, 91],
    measurement: [<Thickness />, 115],
    timestamp: [<Runtime />, "09/11/2021 10:15"],
    validation: <img src={statusAlert} alt="status-alert" />,
  },
  {
    key: '7',
    region: [<Product />, "ROI 7"],
    upperLimit: [<PeakHigh />, 96],
    lowerLimit: [<PeakLow />, 83],
    measurement: [<Thickness />, 89],
    timestamp: [<Runtime />, "10/11/2021 10:15"],
    validation: <img src={statusOk} alt="status-ok" />,
  },
  {
    key: '8',
    region: [<Product />, "ROI 8"],
    upperLimit: [<PeakHigh />, 105],
    lowerLimit: [<PeakLow />, 94],
    measurement: [<Thickness />, 94],
    timestamp: [<Runtime />, "11/11/2021 10:15"],
    validation: <img src={statusOk} alt="status-ok" />,
  },
  {
    key: '9',
    region: [<Product />, "ROI 9"],
    upperLimit: [<PeakHigh />, 105],
    lowerLimit: [<PeakLow />, 94],
    measurement: [<Thickness />, 94],
    timestamp: [<Runtime />, "12/11/2021 10:15"],
    validation: <img src={statusOk} alt="status-ok" />,
  },
  {
    key: '10',
    region: [<Product />, "ROI 10"],
    upperLimit: [<PeakHigh />, 105],
    lowerLimit: [<PeakLow />, 974],
    measurement: [<Thickness />, 94],
    timestamp: [<Runtime />, "13/11/2021 10:15"],
    validation: <img src={statusOk} alt="status-ok" />,
  },
];

const CustomTable = (props) => (
  <Table
    className="table"
    columns={columns}
    dataSource={data}
    pagination={{defaultPageSize:7}}
  />
);

export default CustomTable;