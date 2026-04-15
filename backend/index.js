const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mock Data (In-memory Storage)
let movies = [
  { 
    _id: "1", 
    title: "Inception", 
    poster: "https://via.placeholder.com/300x450?text=Inception", 
    rating: 8.8, 
    description: "A thief who steals corporate secrets through the use of dream-sharing technology.", 
    year: 2010,
    genres: "Action, Sci-Fi",
    runtime: 148
  },
  { 
    _id: "2", 
    title: "Interstellar", 
    poster: "https://via.placeholder.com/300x450?text=Interstellar", 
    rating: 8.6, 
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", 
    year: 2014,
    genres: "Adventure, Drama",
    runtime: 169
  }
];

// Routes

// Get all movies
app.get('/api/movies', (req, res) => {
  res.json(movies);
});

// Get a single movie
app.get('/api/movies/:id', (req, res) => {
  const movie = movies.find(m => m._id === req.params.id);
  if (!movie) return res.status(404).send('Movie not found');
  res.json(movie);
});

// Create a movie
app.post('/api/movies', (req, res) => {
  const newMovie = {
    _id: Date.now().toString(), // Generate a simple ID
    ...req.body
  };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

// Update a movie
app.put('/api/movies/:id', (req, res) => {
  const index = movies.findIndex(m => m._id === req.params.id);
  if (index === -1) return res.status(404).send('Movie not found');
  
  movies[index] = { ...movies[index], ...req.body };
  res.json(movies[index]);
});

// Delete a movie
app.delete('/api/movies/:id', (req, res) => {
  const initialLength = movies.length;
  movies = movies.filter(m => m._id !== req.params.id);
  
  if (movies.length === initialLength) return res.status(404).send('Movie not found');
  res.json({ message: "Movie deleted successfully" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT} (Running without Database)`));
