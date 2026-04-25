
import { useMovie } from "../context/MovieContext";
import MovieCarousel from "../components/MovieCarousel";
import MovieDetails from "../components/MovieDetails";
import SearchBar from "../components/SearchBar";
import MovieForm from "../components/MovieForm";
import Button from "../components/Button";
import Logo from "../components/Logo";

import type { Movie, MovieContextType } from "../types/movie";


export default function Home() {
  const { state, dispatch, addMovie, editMovie, removeMovie } = useMovie() as MovieContextType;
  
  const movie = state.hoveredMovie || state.selectedMovie;

  const handleSave = async (movieData: Omit<Movie, "id"> | Partial<Movie>) => {
    try {
      if (state.editingMovie) {
        await editMovie(state.editingMovie.id, movieData);
      } else {
        await addMovie(movieData as Omit<Movie, "id">);
      }
    } catch (err) {
      console.error("Error saving movie:", err);
    }
  };

  const handleDelete = async () => {
    if (!state.selectedMovie) return;
    try {
      await removeMovie(state.selectedMovie.id);
    } catch (err) {
      console.error("Error deleting movie:", err);
    }
  };

  return (
    <div
      id="app"
      style={{
        backgroundImage: movie?.poster ? `url(${movie.poster})` : "none",
      }}
    >
      <header className="header">
        <Logo />
        <SearchBar onSearch={(q: string) => dispatch({ type: "SEARCH", payload: q })} />
        <Button
          label="Add Movie"
          onclick={() => dispatch({ type: "SHOW_FORM" })}
          variant="primary"
        />
      </header>

      {state.status === "loading" && (
        <p style={{ textAlign: "center", marginTop: "2rem", color: "#aaa" }}>
          Loading movies...
        </p>
      )}

      {state.status === "error" && (
        <p style={{ textAlign: "center", marginTop: "2rem", color: "#e74c3c" }}>
          Failed to load movies. Make sure the server is running on port 5000.
        </p>
      )}

      {state.showForm && (
        <MovieForm
          movie={state.editingMovie}
          onSave={handleSave}
          onCancel={() => dispatch({ type: "HIDE_FORM" })}
        />
      )}

      {state.status === "empty" && (
        <p style={{ textAlign: "center", marginTop: "2rem", color: "#aaa" }}>
          No results found
        </p>
      )}

      {state.filteredMovies.length > 0 && (
        <>
          <MovieDetails movie={movie} />
          <MovieCarousel
            movies={state.filteredMovies}
            selectedMovie={state.selectedMovie}
            onSelect={(m: Movie) => dispatch({ type: "SET_SELECTED", payload: m })}
            onHover={(m: Movie) => dispatch({ type: "SET_HOVERED", payload: m })}
            onLeave={() => dispatch({ type: "CLEAR_HOVER" })}
          />
        </>
      )}

      {state.selectedMovie && (
        <div className="movie-actions">
          <Button
            label="Edit"
            variant="primary"
            onclick={() =>
              dispatch({ type: "SHOW_FORM", payload: state.selectedMovie || undefined })
            }
          />
          <Button label="Delete" variant="danger" onclick={handleDelete} />
        </div>
      )}
    </div>
  );
}
