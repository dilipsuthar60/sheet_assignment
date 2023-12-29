import React, { useState, useEffect } from "react";
import "../App.css";

const CustomDataGrid = ({ tableId, rows, columns, data, backgroundImage }) => {
  const [selectedCells, setSelectedCells] = useState([]);
  const [tooltipContent, setTooltipContent] = useState("");
  const [currentActiveCell, setCurrentActiveCell] = useState(null);
  console.log(backgroundImage);
  const generateCellId = (row, column) => {
    if (row < 10) {
      row = `0${row}`;
    }
    return `${tableId}#${row}${column}`;
  };

  const handleCellClick = (row, column) => {
    const cellId = generateCellId(row, column);
    setCurrentActiveCell(cellId);
    setSelectedCells([...selectedCells, cellId]);
  };

  const handleCellMouseOver = (row, column) => {
    const cellId = generateCellId(row, column);
    const cellData = data.find((item) => item.id === cellId);
    if (cellData && cellData.type === "S") {
      setTooltipContent(cellData.property);
    } else {
      setTooltipContent("");
    }
  };

  useEffect(() => {}, []);

  return (
    <div
      className={`custom-data-grid ${
        backgroundImage ? "background-image" : ""
      }`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="table-header">
        <div className="table-header-cell table-id">
          {currentActiveCell ? currentActiveCell : tableId}
        </div>
        {columns.map((column) => (
          <div key={column} className="table-header-cell">
            {column}
          </div>
        ))}
      </div>
      <div className="table-body">
        {rows.map((row, index) => (
          <div key={row + index} className="table-row">
            <div className="table-header-cell row-number">{row}</div>
            {columns.map((column) => {
              const cellId = generateCellId(row, column);
              const cellData = data.find((item) => item.id === cellId) || {};
              const isSelected = selectedCells.includes(cellId);
              const cellStyle = {
                backgroundColor: cellData.color || "",
                cursor: "pointer",
              };

              return (
                <>
                  <div
                    key={column + row}
                    className={`hover-text table-cell ${
                      isSelected ? "selected" : ""
                    }`}
                    style={cellStyle}
                    onClick={() => handleCellClick(row, column)}
                    onMouseOver={() => handleCellMouseOver(row, column)}
                  >
                    {cellData.content || ""}
                    {tooltipContent && (
                      <span className="tooltip-text top">{tooltipContent}</span>
                    )}
                  </div>
                </>
              );
            })}
          </div>
        ))}
      </div>
      {/* {backgroundImage && (
        <div
          className="background-image"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
      )} */}
    </div>
  );
};

export default CustomDataGrid;
