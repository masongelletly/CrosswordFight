// src/components/CrosswordCell.js

import React from 'react';
import './CrosswordCell.css';

function CrosswordCell({ value, onChange }) {

  // Check if the value is an asterisk to determine if it is a 'black space'
  const isBlackSpace = value === '*';

  // Conditionally set the CSS class and the readOnly property
  const cellClassName = isBlackSpace ? "crossword-cell black-space" : "crossword-cell";
  const readOnly = isBlackSpace;

  return (
    <input
      type="text"
      maxLength="1"
      value={isBlackSpace ? '' : value} // If it is a black space, display nothing
      onChange={onChange}
      className={cellClassName}
      readOnly={readOnly} // Make the cell non-editable if it is a black space
    />
  );
}

export default CrosswordCell;
