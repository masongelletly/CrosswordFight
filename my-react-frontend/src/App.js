// Import the necessary hooks from React
import React, { useState, useEffect } from 'react';
import CrosswordGrid from './components/CrosswordGrid'; // Adjust the path as necessary

function App() {
  // State to hold the complete crossword data
  const [crossword, setCrossword] = useState(null);
  console.log("starting up our app")

  // Asynchronous function to fetch a complete crossword puzzle from the backend
  async function fetchCrossword() {
    console.log("fetching crossword")
    try {
      const response = await fetch('http://localhost:5001/complete-crosswords');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCrossword(data[0]); // Store the crossword data in state
      console.log(data); // print to terminal
    } catch (error) {
      console.error("Could not fetch crossword", error);
    }
  }

  // useEffect to run fetchCrossword when the component mounts
  useEffect(() => {
    fetchCrossword();
  }, []);

  // Render the crossword grid in the browser
  return (
    <div className="App">
      <h1>  Crossword Puzzle</h1>
      {crossword ? (
        <CrosswordGrid
          height={crossword.height}
          width={crossword.width}
          gridData={crossword.grid}
          onGridUpdate={() => {}} // Placeholder function, implement if needed
        />
      ) : (
        <p>Loading crossword...</p>
      )}
    </div>
  );
}

export default App;
