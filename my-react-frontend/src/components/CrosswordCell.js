// src/components/CrosswordCell.js

import React from 'react';

function CrosswordCell({ value, onChange }) {
  return (
    <input
      type="text"
      maxLength="1"
      value={value}
      onChange={onChange}
      className="crossword-cell"
      // Additional properties for styling and focus management can be added here
    />
  );
}

export default CrosswordCell;
