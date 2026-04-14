const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  overview: { type: String },
  description: { type: String }, // Keeping both for compatibility
  release_date: { type: String },
  year: { type: Number },
  runtime: { type: Number },
  genres: { type: String },
  vote_average: { type: Number },
  rating: { type: Number },
  poster: { type: String, required: true }
});

module.exports = mongoose.model('Movie', MovieSchema);
