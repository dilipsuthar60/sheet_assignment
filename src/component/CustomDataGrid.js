import React, { useState, useEffect } from "react";
import "../App.css";

const CustomDataGrid = ({
  tableId,
  rows,
  columns,
  jsonData,
  backgroundImage,
  backgroundHeight,
  backgroundWidth,
  backgroundPostionWidth,
  backgroundPostionHeight,
  height,
  width,
  setCellsIds,
  updateData,
}) => {
  const [selectedCells, setSelectedCells] = useState([]);
  const [tooltipContent, setTooltipContent] = useState("");
  const [currentActiveCell, setCurrentActiveCell] = useState(null);
  const [data, setData] = useState(jsonData);
  const generateCellId = (row, column) => {
    if (row < 10) {
      row = `0${row}`;
    }
    return `${tableId}#${row}${column}`;
  };

  const handleCellClick = (row, column) => {
    const cellId = generateCellId(row, column);
    // u can change the json property
    // const cellData = data.map((item) => {
    //   if (item.id == cellId) {
    //     return { ...item, content: "hi..." };
    //   }
    //   return item;
    // });
    // setData(cellData);
    setCurrentActiveCell(cellId);
    const present = selectedCells.includes(cellId);
    if (!present) {
      setSelectedCells((oldCellIds) => [...oldCellIds, cellId]);
      setCellsIds([...selectedCells, cellId]);
    } else {
      let newSelectedCells = selectedCells.filter((item) => item !== cellId);
      setSelectedCells(newSelectedCells);
      setCellsIds(newSelectedCells);
    }
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
  useEffect(() => {
    setData((prevData) => {
      return prevData.map((item) => {
        const updatedItem = updateData.find(
          (updated) => updated.id === item.id
        );
        return updatedItem || item;
      });
    });
  }, []);

  return (
    <div
      className={`custom-data-grid ${
        backgroundImage ? "background-image" : ""
      }`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: `${backgroundHeight}px  ${backgroundWidth}px`,
        backgroundPosition: `${backgroundPostionWidth}px  ${backgroundPostionHeight}px`,
      }}
    >
      <div className="table-header">
        <div
          style={{ minHeight: `${height}px`, minWidth: `${width}px` }}
          className="table-header-cell table-id"
        >
          {currentActiveCell ? currentActiveCell : "$"}
        </div>
        {columns.map((column) => (
          <div
            key={column}
            className="table-header-cell"
            style={{ minHeight: `${height}px`, minWidth: `${width}px` }}
          >
            {column}
          </div>
        ))}
      </div>
      <div className="table-body">
        {rows.map((row, index) => (
          <div key={row + index} className="table-row">
            <div
              style={{ minHeight: `${height}px`, minWidth: `${width}px` }}
              className="table-header-cell row-number"
            >
              {row}
            </div>
            {columns.map((column) => {
              const cellId = generateCellId(row, column);
              const cellData = data.find((item) => item.id === cellId) || {};
              const isSelected = selectedCells.includes(cellId);
              const cellStyle = {
                backgroundColor: cellData.color || "",
                cursor: "pointer",
                minWidth: width,
                minHeight: height,
              };

              return (
                <>
                  <div
                    key={cellId}
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
