/* react tools */
import React, { useState, useEffect } from 'react';

/* components */
import CrosswordGrid from './components/CrosswordGrid';
import CompletionBanner from './components/CompletionBanner';

/* css */
import './App.css';

/* our lovely home */
function App() {
  
  /* initialize states that will hold data */
  const [crossword, setCrossword] = useState(null); /* for the crossword data from db */
  const [userGrid, setUserGrid] = useState(null); /* for the clients crossword */
  const [isPuzzleComplete, setIsPuzzleComplete] = useState(false); /* is puzzle complete flag */

  /* focus and directional vars */
  const [currentFocus, setCurrentFocus] = useState({ rowIndex: 1, cellIndex: 1 }); /* begin at 1, 1 (for now) */
  const [direction, setDirection] = useState('across'); /* initially set to across */


  /* fetch a crossword from our db */
  async function fetchCrossword() {
    try {
      /* hit the crossword endpoint */
      const response = await fetch('http://localhost:5001/complete-crosswords');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      /* set the first item from fetched array as crossword data */
      setCrossword(data[0]); 

      /* create a new grid based on the crossword */
      const blankGrid = data[0].grid.map(row => row.map(cell => cell === '*' ? '*' : ''));
      setUserGrid(blankGrid);
    
    /* failed to fetch crossword */
    } catch (error) {
      console.error("Could not fetch crossword", error);
    }
  }

  /* do this when we mount (fetch crossword) */
  useEffect(() => {
    fetchCrossword();
  }, []); /* [] : on initial render */

  /* helper to move focus to next available cell */
  const moveToNextCell = (rowIndex, cellIndex) => {
    /* across logic */
    if (direction === 'across') {
      /* next expected index */
      const nextCellIndex = cellIndex + 1;
      /* must be within bounds and non black */
      if (nextCellIndex < crossword.width && userGrid[rowIndex][nextCellIndex] !== '*') {
        setCurrentFocus({ rowIndex, cellIndex: nextCellIndex });
      }
    }
    /* down logic */
    else if (direction === 'down') {
      const nextRowIndex = rowIndex + 1;
      /* must be within bounds and non black */
      if (nextRowIndex < crossword.height && userGrid[nextRowIndex][cellIndex] !== '*') {
        setCurrentFocus({ rowIndex: nextRowIndex, cellIndex });
      }
    }
  };

  /* helper to check if the puzzle is complete */
  const checkPuzzleComplete = () => {
    /* iterate over our puzzle */
    for (let i = 0; i < crossword.grid.length; i++) {
      for (let j = 0; j < crossword.grid[i].length; j++) {
        /* ignore black spaces */
        if (crossword.grid[i][j] === '*') continue;
        /* return false if no match */
        if (userGrid[i][j] !== crossword.grid[i][j]) return false;
      }
    }
    
    /* if we have not returned false, must be true! */
    return true;
  };

  /* actions that occur when the grid is updated */
  const onGridUpdate = (rowIndex, cellIndex, newValue) => {
    
    /* set the userGrid in accordance with the change */
    setUserGrid(currentGrid => {
      const newGrid = [...currentGrid];
      newGrid[rowIndex][cellIndex] = newValue;

      /* a cell has been updated. see if the puzzle is complete */
      const isComplete = checkPuzzleComplete();
      if (isComplete) {
        setIsPuzzleComplete(true); /* state that controls congratulations banner */
      }
      
      /* return updated grid */
      return newGrid;
    });

    /* if it is not blank, shift focus forward */
    if (newValue) {
      moveToNextCell(rowIndex, cellIndex);
    }
  };

  /* what the client sees. display userGrid */
  return (
    <div className="App">
      {isPuzzleComplete && <CompletionBanner />}
      <header className="App-header">
        <h1>crossword fight</h1>
      </header>
      {userGrid ? (
        <CrosswordGrid
        height={crossword.height}
        width={crossword.width}
        gridData={userGrid}
        onGridUpdate={onGridUpdate}
        currentFocus={currentFocus}
        moveToNextCell={moveToNextCell}
      />
      ) : (
        <p>Loading crossword...</p>
      )}
    </div>
  );
}

export default App;
