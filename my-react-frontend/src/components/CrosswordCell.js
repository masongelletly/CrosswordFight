/* react tools */
import React, { useEffect, useRef } from 'react'; 

/* css */
import './CrosswordCell.css';

/* represents a cell in a crossword grid */
function CrosswordCell({ value, onChange, isFocused, moveToNextCell }) {

  /* bool to represent if we consider this cell a black space */
  const isBlackSpace = value === '*';

  /* conditionally set CSS */
  const cellClassName = isBlackSpace ? "crossword-cell black-space" : "crossword-cell";
  const readOnly = isBlackSpace;
  const inputRef = useRef(null);

  /* runs after the component renders */
  useEffect(() => {
    if (isFocused) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  /* actions when an input is changed in the cell */
  const handleInputChange = (e) => {
    onChange(e);
    if (e.target.value.trim().length === 1) { // Move to the next cell only if one character is entered
      moveToNextCell();
    }
  };

  /* visuals of the cell */
  return (
    <input
    ref={inputRef}
    type="text"
    maxLength="1"
    value={isBlackSpace ? '' : value}
    onChange={handleInputChange}
    className={cellClassName}
    readOnly={readOnly}
    />
  );
}

/* export */
export default CrosswordCell;
