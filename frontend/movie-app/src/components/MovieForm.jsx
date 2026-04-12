import React, { useState, useEffect } from "react";

const MovieForm = ({ onSave, onCancel, movie }) => {
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [runtime, setRuntime] = useState("");
  const [genres, setGenres] = useState("");
  const [voteAverage, setVoteAverage] = useState("");
  const [poster, setPoster] = useState("");

  useEffect(() => {
    if (movie) {
      setTitle(movie.title || "");
      setOverview(movie.overview || movie.description || "");
      setReleaseDate(movie.release_date || "");
      setRuntime(movie.runtime || "");
      setGenres(movie.genres || movie.genre || "");
      setVoteAverage(movie.vote_average || movie.rating || "");
      setPoster(movie.poster || "");
    } else {
      setTitle("");
      setOverview("");
      setReleaseDate("");
      setRuntime("");
      setGenres("");
      setVoteAverage("");
      setPoster("");
    }
  }, [movie]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: movie?.id || Date.now(),
      title,
      overview,
      release_date: releaseDate,
      runtime: runtime ? Number(runtime) : "",
      genres,
      vote_average: voteAverage ? Number(voteAverage) : "",
      poster,
    });
  };

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        placeholder="Overview / Description"
        value={overview}
        onChange={(e) => setOverview(e.target.value)}
      />
      <input
        placeholder="Release Date (e.g. 11/5/2014)"
        value={releaseDate}
        onChange={(e) => setReleaseDate(e.target.value)}
      />
      <input
        type="number"
        placeholder="Runtime (minutes)"
        value={runtime}
        onChange={(e) => setRuntime(e.target.value)}
      />
      <input
        placeholder="Genres (e.g. Action, Drama)"
        value={genres}
        onChange={(e) => setGenres(e.target.value)}
      />
      <input
        type="number"
        step="0.1"
        min="0"
        max="10"
        placeholder="Rating (0 - 10)"
        value={voteAverage}
        onChange={(e) => setVoteAverage(e.target.value)}
      />
      <input
        placeholder="Poster URL (optional)"
        value={poster}
        onChange={(e) => setPoster(e.target.value)}
      />

      <div className="form-actions">
        <button type="submit">{movie ? "Update" : "Add"}</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default MovieForm;
