// src/components/CrosswordGrid.js

import React from 'react';
import CrosswordCell from './CrosswordCell'; // Adjust the import path based on your file structure

function CrosswordGrid({ height, width, gridData, onGridUpdate }) {
  // Function to handle cell changes
  const onCellChange = (rowIndex, cellIndex, newValue) => {
    // Logic to update the grid's state
    onGridUpdate(rowIndex, cellIndex, newValue);
  };

  return (
    <div style={{ display: 'grid', gridTemplateRows: `repeat(${height}, 1fr)`, gridTemplateColumns: `repeat(${width}, 1fr)` }}>
      {gridData ? gridData.map((row, rowIndex) =>
        row.map((cellValue, cellIndex) => (
          <CrosswordCell
            key={`${rowIndex}-${cellIndex}`}
            value={cellValue}
            onChange={(e) => onCellChange(rowIndex, cellIndex, e.target.value)}
          />
        ))
      ) : null}
    </div>
  );
}

export default CrosswordGrid;
