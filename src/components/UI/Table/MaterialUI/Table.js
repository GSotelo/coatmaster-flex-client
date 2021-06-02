import React from "react";
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import "./Table.css";

const Table = ({ rows, columns, pageSize, onCellDoubleClick, enableToolbar }) => {
  return (
    <DataGrid
      components={{ Toolbar: enableToolbar && GridToolbar }}
      columns={columns}
      className="dataTable"
      pageSize={pageSize}
      rows={rows}
      onCellDoubleClick={(params) => onCellDoubleClick(params)}
      disableSelectionOnClick={true}
    />
  );
};

export default Table;