
import React, { useState } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";
import type { MovieFormProps } from "../types/movie";
const MovieForm: React.FC<MovieFormProps> = ({ onSave, onCancel, movie }) => {
  const [title, setTitle] = useState<string>(() => movie?.title ?? "");
  const [overview, setOverview] = useState<string>(
    () => movie?.overview || movie?.description || "",
  );
  const [releaseDate, setReleaseDate] = useState<string>(
    () => movie?.release_date ?? "",
  );
  const [runtime, setRuntime] = useState<number | string>(
    () => movie?.runtime ?? "",
  );
  const [genres, setGenres] = useState<string>(
    () => movie?.genres || movie?.genre || "",
  );
  const [voteAverage, setVoteAverage] = useState<number | string>(
    () => movie?.vote_average ?? movie?.rating ?? "",
  );
  const [poster, setPoster] = useState<string>(() => movie?.poster ?? "");

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      overview,
      release_date: releaseDate,
      runtime: runtime ? Number(runtime) : undefined,
      genres,
      vote_average: voteAverage ? Number(voteAverage) : undefined,
      poster,
    });
  };

  const handleOverlayClick = (e:React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onCancel();
  };
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
            <Button
              type="button"
              onclick={onCancel}
              label={"Cancel"}
              variant="btn-cancel"
            />
            <Button
              type="submit"
              variant="submit"
              label={movie ? "Update Movie" : "Add Movie"}
            />
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
};

export default MovieForm;
