const BASE_URL = "http://localhost:5000/api";
export const fetchAllMovies = async () => {
  const res = await fetch(`${BASE_URL}/movies`);
  if (!res.ok) throw new Error("Failed to fetch movies");
  const movies = await res.json();
  return movies;
};

export const createMovie = async (movieData) => {
  const res = await fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movieData),
  });
  if (!res.ok) throw new Error("Failed to create movie");
  const newMovie = await res.json();
  return newMovie;
};

export const updateMovie = async (id, movieData) => {
  const res = await fetch(`${BASE_URL}/movies/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movieData),
  });
  if (!res.ok) throw new Error("Failed to update movie");
  const updatedMovie = await res.json();
  return updatedMovie;
};

export const deleteMovie = async (id) => {
  const res = await fetch(`${BASE_URL}/movies/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete movie");
  const updatedMovie = await res.json();
  return updatedMovie;
};
export const searchMovies = async (query) => {
  const res = await fetch(`${BASE_URL}/movies?search=${query}`);
  if (!res.ok) throw new Error("Search failed");
  return await res.json();
};
