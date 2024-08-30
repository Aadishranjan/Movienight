const mongoose = require('mongoose');

// Define the schema for the movie
const movieSchema = new mongoose.Schema({
  moviename: {
    type: String,
    required: true,
    unique: true
  },
  filesize: {
    type: String,
    required: true
  },
  downloadlink: {
    type: String,
    required: true
  },
  filesize2: {
    type: String,
    required: true
  },
  downloadlink2: {
    type: String,
    required: true
  },
  movietype: {
    Array,
    default: []
  },
  language: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageurl: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

// Create Movie model
module.exports = mongoose.model('Movie', movieSchema);
