import React, { useState, useEffect } from "react";
import { fetchPoster } from "../utils/fetchPoster";
import { useMovie } from "../context/MovieContext";

const MovieCard = ({ movie, isSelected, onClick, onHover, onLeave }) => {
  const { dispatch } = useMovie();
  const [poster, setPoster] = useState(movie.poster || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (movie.poster) {
      setPoster(movie.poster);
      return;
    }

    setLoading(true);
    fetchPoster(movie.title)
      .then((url) => {
        if (url) {
          setPoster(url);
          dispatch({
            type: "UPDATE_POSTER",
            payload: { id: movie.id, poster: url },
          });
        }
      })
      .finally(() => setLoading(false));
  }, [movie.id, movie.poster]);

  return (
    <div
      className={`movie-card ${isSelected ? "selected" : ""}`}
      onClick={() => onClick({ ...movie, poster })}
      onMouseEnter={() => onHover({ ...movie, poster })}
      onMouseLeave={onLeave}
    >
      {poster ? (
        <img src={poster} alt={movie.title} />
      ) : (
        <div className="movie-card-placeholder">
          {loading ? "..." : movie.title}
        </div>
      )}
      <div className="movie-title">{movie.title}</div>
    </div>
  );
};

export default MovieCard;
