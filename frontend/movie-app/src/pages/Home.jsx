import { useMovie } from "../context/MovieContext";
import MovieCarousel from "../components/MovieCarousel";
import MovieDetails from "../components/MovieDetails";
import SearchBar from "../components/SearchBar";
import MovieForm from "../components/MovieForm";
import Button from "../components/Button";
import Logo from "../components/Logo";

export default function Home() {
  const { state, dispatch, addMovie, editMovie, removeMovie } = useMovie();
  const movie = state.hoveredMovie || state.selectedMovie;

  const handleSave = async (movieData) => {
    try {
      if (state.editingMovie) {
        await editMovie(state.editingMovie.id, movieData);
      } else {
        await addMovie(movieData);
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
        <SearchBar onSearch={(q) => dispatch({ type: "SEARCH", payload: q })} />
        <Button
          label="Add Movie"
          onClick={() => dispatch({ type: "SHOW_FORM" })}
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
            onSelect={(m) => dispatch({ type: "SET_SELECTED", payload: m })}
            onHover={(m) => dispatch({ type: "SET_HOVERED", payload: m })}
            onLeave={() => dispatch({ type: "CLEAR_HOVER" })}
          />
        </>
      )}

      {state.selectedMovie && (
        <div className="movie-actions">
          <Button
            label="Edit"
            variant="primary"
            onClick={() =>
              dispatch({ type: "SHOW_FORM", payload: state.selectedMovie })
            }
          />
          <Button label="Delete" variant="danger" onClick={handleDelete} />
        </div>
      )}
    </div>
  );
}
