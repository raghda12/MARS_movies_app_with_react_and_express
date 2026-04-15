import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onCancel();
  };

  // Portal يرسم المودل مباشرة داخل document.body — خارج #app تماماً
  return createPortal(
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-header">
          <h2>{movie ? "Edit Movie" : "Add Movie"}</h2>
          <button className="modal-close" onClick={onCancel}>
            ✕
          </button>
        </div>

        <form className="movie-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title *</label>
            <input
              placeholder="e.g. Inception"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Overview</label>
            <input
              placeholder="Short description of the movie"
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Release Date</label>
              <input
                placeholder="e.g. 11/5/2014"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Runtime (min)</label>
              <input
                type="number"
                placeholder="e.g. 148"
                value={runtime}
                onChange={(e) => setRuntime(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Genres</label>
              <input
                placeholder="e.g. Action, Drama"
                value={genres}
                onChange={(e) => setGenres(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Rating (0–10)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                placeholder="e.g. 8.5"
                value={voteAverage}
                onChange={(e) => setVoteAverage(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Poster URL</label>
            <input
              placeholder="https://..."
              value={poster}
              onChange={(e) => setPoster(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {movie ? "Update Movie" : "Add Movie"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
};

export default MovieForm;
