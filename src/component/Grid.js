import React from "react";
import jsonData from "../data.js";
import CustomDataGrid from "./CustomDataGrid.js";
import backgroundimg from "../assets/back-ground.jpeg";

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
  const width = 60; // your custum width
  const height = 60; // your custum height
  const backgroundImage = backgroundimg;
  const backgroundHeight = 1400;
  const backgroundWidth = 830;
  const backgroundPostionHeight = 60;
  const backgroundPostionWidth = 60;
  const tableId = "A";
  const rows = Array.from({ length: backgroundWidth / width }, (_, i) => i + 1);
  const columns = Array.from(
    { length: backgroundHeight / height - 1 }, // -1 bacause first columns
    (_, i) => convertToTitle(i + 1)
  );
  return (
    <CustomDataGrid
      tableId={tableId}
      rows={rows}
      columns={columns}
      jsonData={jsonData}
      backgroundImage={backgroundImage}
      backgroundHeight={backgroundHeight}
      backgroundWidth={backgroundWidth}
      backgroundPostionHeight={backgroundPostionHeight}
      backgroundPostionWidth={backgroundPostionWidth}
      width={width}
      height={height}
    />
  );
};

export default Grid;
