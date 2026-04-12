import React from "react";

const MovieDetails = ({ movie }) => {
  if (!movie) return null;

  const year = movie.release_date ? movie.release_date.split("/").pop() : "N/A";

  const rating = movie.vote_average
    ? Number(movie.vote_average).toFixed(1)
    : "N/A";

  const runtime = movie.runtime ? `${movie.runtime} min` : "N/A";

  const genres = movie.genres || "N/A";

  const overview = movie.overview || movie.description || "";

  return (
    <div className="movie-info">
      <h1>{movie.title}</h1>
      {movie.tagline && (
        <p
          style={{
            fontStyle: "italic",
            color: "rgba(255,255,255,0.6)",
            marginBottom: "0.5rem",
          }}
        >
          {movie.tagline}
        </p>
      )}
      <div className="meta-row">
        <span>{rating} ⭐</span>
        <span>{year}</span>
        <span>{runtime}</span>
        <span>{genres}</span>
      </div>
      <p>{overview}</p>
    </div>
  );
};

export default MovieDetails;
