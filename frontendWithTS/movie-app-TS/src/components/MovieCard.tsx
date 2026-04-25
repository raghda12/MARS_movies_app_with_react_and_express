
import React, { useState, useEffect } from "react";
import { fetchPoster } from "../utils/fetchPoster";
import { useMovie } from "../context/MovieContext";
import type { MovieCardProps } from "../types/movie";

const MovieCard: React.FC<MovieCardProps> = ({ movie, isSelected, onclick, onHover, onLeave }) => {
  const { dispatch } = useMovie() as any;
  const [poster, setPoster] = useState<string | null>(movie.poster || null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (movie.poster) {
      setPoster(movie.poster);
      return;
    }

    setLoading(true);
    fetchPoster(movie.title)
      .then((url:any) => {
        if (url) {
          setPoster(url);
          dispatch({
            type: "UPDATE_POSTER",
            payload: { id: movie.id, poster: url },
          });
        }
      })
      .finally(() => setLoading(false));
  }, [movie.id, movie.poster, movie.title, dispatch]);

  return (
    <div
      className={`movie-card ${isSelected ? "selected" : ""}`}
      onClick={() => onclick({ ...movie, poster: movie.poster })}
      onMouseEnter={() => onHover({ ...movie, poster: movie.poster})}
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
