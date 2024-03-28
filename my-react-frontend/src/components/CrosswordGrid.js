// src/components/CrosswordGrid.js

import React from 'react';
import CrosswordCell from './CrosswordCell'; // Adjust the import path based on your file structure
import './CrosswordGrid.css';

function CrosswordGrid({ height, width, gridData, onGridUpdate }) {
  // Function to handle cell changes
  const onCellChange = (rowIndex, cellIndex, newValue) => {
    // Logic to update the grid's state
    onGridUpdate(rowIndex, cellIndex, newValue);
  };

  return (
    <div className="crossword-grid" style={{ gridTemplateRows: `repeat(${height}, 40px)`, gridTemplateColumns: `repeat(${width}, 40px)` }}>
      {gridData.map((row, rowIndex) =>
        row.map((cellValue, cellIndex) => (
          <CrosswordCell
            key={`${rowIndex}-${cellIndex}`}
            value={cellValue}
            onChange={(e) => onCellChange(rowIndex, cellIndex, e.target.value)}
          />
        ))
      )}
    </div>
  );
  
}

export default CrosswordGrid;
