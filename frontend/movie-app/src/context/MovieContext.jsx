import React, { createContext, useReducer, useContext, useEffect } from "react";

const MovieContext = createContext();

const initialState = {
  movies: [],
  filteredMovies: [],
  selectedMovie: null,
  hoveredMovie: null,
  status: "loading", // idle, empty, loading, error
  showForm: false,
  editingMovie: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return {
        ...state,
        movies: action.payload,
        filteredMovies: action.payload,
        selectedMovie: action.payload[0] || null,
        status: action.payload.length ? "idle" : "empty",
      };

    case "SET_SELECTED":
      return { ...state, selectedMovie: action.payload };

    case "SET_HOVERED":
      return { ...state, hoveredMovie: action.payload };

    case "CLEAR_HOVER":
      return { ...state, hoveredMovie: null };

    case "SEARCH": {
      const query = action.payload.toLowerCase().trim();
      const filtered = query
        ? state.movies.filter((m) => m.title.toLowerCase().includes(query))
        : state.movies;
      return {
        ...state,
        filteredMovies: filtered,
        selectedMovie: filtered[0] || null,
        status: filtered.length ? "idle" : "empty",
      };
    }

    case "ADD_MOVIE": {
      const updated = [...state.movies, action.payload];
      return {
        ...state,
        movies: updated,
        filteredMovies: updated,
        selectedMovie: action.payload,
        showForm: false,
        editingMovie: null,
        status: "idle",
      };
    }

    case "UPDATE_MOVIE": {
      const updated = state.movies.map((m) =>
        m._id === action.payload._id ? action.payload : m,
      );
      const filteredUpdated = state.filteredMovies.map((m) =>
        m._id === action.payload._id ? action.payload : m,
      );
      return {
        ...state,
        movies: updated,
        filteredMovies: filteredUpdated,
        selectedMovie: action.payload,
        showForm: false,
        editingMovie: null,
      };
    }

    case "DELETE_MOVIE": {
      const remaining = state.movies.filter((m) => m._id !== action.payload);
      const filteredRemaining = state.filteredMovies.filter(
        (m) => m._id !== action.payload,
      );
      return {
        ...state,
        movies: remaining,
        filteredMovies: filteredRemaining,
        selectedMovie: filteredRemaining[0] || null,
        status: filteredRemaining.length ? "idle" : "empty",
      };
    }

    case "SHOW_FORM":
      return { ...state, showForm: true, editingMovie: action.payload || null };

    case "HIDE_FORM":
      return { ...state, showForm: false, editingMovie: null };

    case "SET_STATUS":
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/movies");
        const data = await response.json();
        dispatch({ type: "SET_MOVIES", payload: data });
      } catch (error) {
        console.error("Error fetching movies:", error);
        dispatch({ type: "SET_STATUS", payload: "error" });
      }
    };
    fetchMovies();
  }, []);

  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovie = () => useContext(MovieContext);
