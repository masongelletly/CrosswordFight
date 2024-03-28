/* react tools */
import React from 'react';

/* components */
import CrosswordCell from './CrosswordCell';

/* css */
import './CrosswordGrid.css';

/* represents a crossword grid, a grid of cells */
function CrosswordGrid({ height, width, gridData, onGridUpdate, currentFocus, moveToNextCell }) {

  /* visuals of the grid */
  return (
    <div 
      className="crossword-grid"
      style={{
        gridTemplateColumns: `repeat(${width}, 40px)`, /* based on crossword.width */
        gridTemplateRows: `repeat(${height}, 40px)`, /* based on crossword.height */
      }}
    >
      {gridData.map((row, rowIndex) =>
        row.map((cellValue, cellIndex) => (
          <CrosswordCell
            key={`${rowIndex}-${cellIndex}`}
            value={cellValue}
            onChange={(e) => onGridUpdate(rowIndex, cellIndex, e.target.value)}
            isFocused={currentFocus.rowIndex === rowIndex && currentFocus.cellIndex === cellIndex}
            moveToNextCell={() => moveToNextCell(rowIndex, cellIndex)}
          />
        ))
      )}
    </div>
  );
}

/* export */
export default CrosswordGrid;
