import React, { useContext } from "react";
import { DatePicker } from 'antd';

import "./Datepicker.css";

import  GraphContext  from "../../Context/GraphContext";

const { RangePicker } = DatePicker;

const Datepicker = () => {
  const { id, getDataFromServer } = useContext(GraphContext);
  return (
    <RangePicker
      // onChange={(a, b) => {
      //   getDataFromServer(id, a);
      // }} 
      allowClear={false}
      onChange={a => getDataFromServer(id, a)}
      className="datepicker"
    />
  );
};

export default Datepicker;