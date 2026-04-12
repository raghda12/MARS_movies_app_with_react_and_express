import React, { useRef } from "react";
import MovieCard from "./MovieCard";

const MovieCarousel = ({
  movies,
  selectedMovie,
  onSelect,
  onHover,
  onLeave,
}) => {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (!carouselRef.current) return;
    const amount = 200;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="carousel-section">
      <button className="ctrl-btn" onClick={() => scroll("left")}>
        ◀
      </button>
      <div className="carousel" ref={carouselRef}>
        {movies.map((m) => (
          <MovieCard
            key={m.id}
            movie={m}
            isSelected={selectedMovie?.id === m.id}
            onClick={onSelect}
            onHover={onHover}
            onLeave={onLeave}
          />
        ))}
      </div>
      <button className="ctrl-btn" onClick={() => scroll("right")}>
        ▶
      </button>
    </div>
  );
};

export default MovieCarousel;
