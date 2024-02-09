// Import the necessary hooks from React
import React, { useState, useEffect } from 'react';
import CrosswordGrid from './components/CrosswordGrid'; // Adjust the path as necessary

/* our lovely home */
function App() {
  
  /* initialize states that will hold data */
  const [crossword, setCrossword] = useState(null); /* for the crossword data from db */
  const [userGrid, setUserGrid] = useState(null); /* for the clients crossword */

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

  /* update the userGrid when a user changes a cell value */
  const onGridUpdate = (rowIndex, cellIndex, newValue) => {
    setUserGrid(currentGrid => {
      const newGrid = [...currentGrid];
      newGrid[rowIndex][cellIndex] = newValue;
      return newGrid;
    });
  };

  /* what the client sees. display userGrid */
  return (
    <div className="App">
      <h1> Crossword Puzzle</h1>
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
