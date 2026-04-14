import { useMovie } from "./context/MovieContext";
import MovieCarousel from "./components/MovieCarousel";
import MovieDetails from "./components/MovieDetails";
import SearchBar from "./components/SearchBar";
import MovieForm from "./components/MovieForm";
import Button from "./components/Button";
import Logo from "./components/Logo";

function App() {
  const { state, dispatch } = useMovie();
  const movie = state.hoveredMovie || state.selectedMovie;

  const handleSave = async (movieData) => {
    try {
      const isUpdate = !!movieData._id;
      const url = isUpdate 
        ? `http://localhost:5000/api/movies/${movieData._id}` 
        : "http://localhost:5000/api/movies";
      const method = isUpdate ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movieData),
      });

      if (!response.ok) throw new Error("Failed to save movie");

      const savedMovie = await response.json();
      dispatch({
        type: isUpdate ? "UPDATE_MOVIE" : "ADD_MOVIE",
        payload: savedMovie,
      });
    } catch (error) {
      console.error("Error saving movie:", error);
      alert("Error saving movie. Check console for details.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/movies/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete movie");

      dispatch({ type: "DELETE_MOVIE", payload: id });
    } catch (error) {
      console.error("Error deleting movie:", error);
      alert("Error deleting movie.");
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

      {state.showForm && (
        <MovieForm
          movie={state.editingMovie}
          onSave={handleSave}
          onCancel={() => dispatch({ type: "HIDE_FORM" })}
        />
      )}

      {state.status === "loading" && <p style={{ textAlign: "center", color: "white" }}>Loading movies...</p>}

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
          <Button
            label="Delete"
            variant="danger"
            onClick={() => handleDelete(state.selectedMovie._id)}
          />
        </div>
      )}
    </div>
  );
}

export default App;
