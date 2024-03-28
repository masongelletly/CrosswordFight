// Import the necessary hooks from React
import React, { useState, useEffect } from 'react';
import CrosswordGrid from './components/CrosswordGrid';
import CompletionBanner from './components/CompletionBanner';
import './App.css';

/* our lovely home */
function App() {
  
  /* initialize states that will hold data */
  const [crossword, setCrossword] = useState(null); /* for the crossword data from db */
  const [userGrid, setUserGrid] = useState(null); /* for the clients crossword */
  const [isPuzzleComplete, setIsPuzzleComplete] = useState(false); /* is puzzle complete flag */


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

  /* do this when we mount */
  useEffect(() => {
    fetchCrossword();
  }, []); /* [] : on initial render */

  /* Function to check if the puzzle is complete */
  const checkPuzzleComplete = () => {
    for (let i = 0; i < crossword.grid.length; i++) {
      for (let j = 0; j < crossword.grid[i].length; j++) {
        // Ignore black spaces
        if (crossword.grid[i][j] === '*') continue;
        // If any cell does not match the solution, return false
        if (userGrid[i][j] !== crossword.grid[i][j]) return false;
      }
    }
    // If all cells match, return true
    return true;
  };

  /* update the userGrid when a user changes a cell value and check if the puzzle is complete */
  const onGridUpdate = (rowIndex, cellIndex, newValue) => {
    setUserGrid(currentGrid => {
      const newGrid = [...currentGrid];
      newGrid[rowIndex][cellIndex] = newValue;
      
      // Call the checkPuzzleComplete function
      const isComplete = checkPuzzleComplete();
      if (isComplete) {
        // Puzzle is complete. Do something here, like showing a message.
        console.log('Puzzle completed!');
        setIsPuzzleComplete(true); // Update state to show the banner
      }
      
      return newGrid;
    });
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
        />
      ) : (
        <p>Loading crossword...</p>
      )}
    </div>
  );
}

export default App;
