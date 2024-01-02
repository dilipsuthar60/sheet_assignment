import React from "react";
import data from "../data.js";
import CustomDataGrid from "./CustomDataGrid.js";

const Grid = () => {
  const convertToTitle = (columnNumber) => {
    let ans = "";
    while (columnNumber > 0) {
      let code = --columnNumber % 26;
      ans = String.fromCharCode(code + 65) + ans;
      columnNumber = (columnNumber - code) / 26;
    }
    return ans;
  };
  const tableId = "A";
  const rows = Array.from({ length: 50 }, (_, i) => i + 1);
  const columns = Array.from({ length: 80 }, (_, i) => convertToTitle(i + 1));
  const width = "40px";
  const height = "30px";
  const backgroundImage =
    "https://images.unsplash.com/photo-1682687982046-e5e46906bc6e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  // const backgroundImage = "";
  return (
    <CustomDataGrid
      tableId={tableId}
      rows={rows}
      columns={columns}
      data={data}
      backgroundImage={backgroundImage}
      width={width}
      height={height}
    />
  );
};

export default Grid;
