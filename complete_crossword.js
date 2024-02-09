// Mongoose Schema for a complete_crossword
// crossword.js

const mongoose = require('mongoose');

// Define the schema for a crossword puzzle
const crosswordSchema = new mongoose.Schema({
  title: String,
  date: Date,
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  height: {
    type: Number,
    required: true
  },
  width: {
    type: Number,
    required: true
  },
  grid: {
    type: [[String]],
    required: true
  },
  clues: {
    across: [{
      number: Number,
      clue: String
    }],
    down: [{
      number: Number,
      clue: String
    }]
  },
  solutions: {
    across: [{
      number: Number,
      solution: String
    }],
    down: [{
      number: Number,
      solution: String
    }]
  }
}, { collection: 'complete_puzzles' });

// crossword model
const Crossword = mongoose.model('Crossword', crosswordSchema);

// export 
module.exports = Crossword;
