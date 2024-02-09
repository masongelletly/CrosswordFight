// Mongoose Schema for a puzzleword
// puzzleword.js

const mongoose = require('mongoose');

// Define the schema
const puzzleWordSchema = new mongoose.Schema({
  word: String,
  clue: String,
  length: Number,
  difficulty: String
}, { collection: 'puzzle_words' });

// puzzleword model
const PuzzleWord = mongoose.model('PuzzleWord', puzzleWordSchema);

// export 
module.exports = PuzzleWord;