import React from "react";
import { DatePicker } from 'antd';

import "./Datepicker.css";

const { RangePicker } = DatePicker;

const Datepicker = () => {
  return (
    <RangePicker
      allowClear={false}
      onChange={a => console.log("[Datepicker] Timefram has changes !")}
      className="datepicker"
    />
  );
};

export default Datepicker;