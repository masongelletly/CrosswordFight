// WE ARE GOING TO QUERY THE DB
// puzzleword.js

const mongoose = require('mongoose');

// Define the schema
const puzzleWordSchema = new mongoose.Schema({
  word: String,
  clue: String,
  length: Number,
  difficulty: String
}, { collection: 'puzzle_words' });

const PuzzleWord = mongoose.model('PuzzleWord', puzzleWordSchema);

module.exports = PuzzleWord;