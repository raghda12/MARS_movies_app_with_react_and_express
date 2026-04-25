
import React, { useRef } from "react";
import MovieCard from "./MovieCard";
import type { MovieCarouselProps } from "../types/movie";

const MovieCarousel:React.FC<MovieCarouselProps> = ({
  movies,
  selectedMovie,
  onSelect,
  onHover,
  onLeave,
}) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
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
            onclick={onSelect}
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
