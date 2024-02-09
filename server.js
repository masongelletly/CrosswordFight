// I AM AN EXPRESS SERVER
// server.js
const express = require('express');
const mongoose = require('mongoose');
const PuzzleWord = require('./puzzle_word');
const Crossword = require('./complete_crossword');

// Cross Origin Sharing :: from port x to port y 
const cors = require('cors');

// init our app and use cors
const app = express();
app.use(cors());

const PORT = process.env.PORT || 5001;

// Connection string (Crossword DB)
const uri = "mongodb+srv://masongelletly:bingBang@crosswordfight.yvqpvw4.mongodb.net/Crossword?retryWrites=true&w=majority";

// Hello World!
app.get('/', (req, res) => {
  res.send('Hello World!');
});

/* PuzzleWord Endpoint */
app.get('/puzzle-words', async (req, res) => {
    try {
      const words = await PuzzleWord.find(); // Finds all documents in the puzzle_words collection
      res.json(words);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

/* Crossword Endpoint*/
app.get('/complete-crosswords', async (req, res) => {
    try {
      const words = await Crossword.find(); // Finds all documents in the complete-crosswords collection
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
  