// I AM AN EXPRESS SERVER
// server.js
const express = require('express');
const mongoose = require('mongoose');
const PuzzleWord = require('./PuzzleWord');

const app = express();
const PORT = process.env.PORT || 5001;

// Connection string (Crossword DB)
const uri = "mongodb+srv://masongelletly:bingBang@crosswordfight.yvqpvw4.mongodb.net/Crossword?retryWrites=true&w=majority";

// Hello World!
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Include the PuzzleWord model if it's defined in a separate file
app.get('/puzzle-words', async (req, res) => {
    try {
      const words = await PuzzleWord.find(); // Finds all documents in the puzzle_words collection
      res.json(words);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

// We are listening!
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Atlas DB connection
// user: masongelletly
// pw: bingBang
mongoose.connect(uri, { })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
  