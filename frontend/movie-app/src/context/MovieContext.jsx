import React, { createContext, useReducer, useContext } from "react";
import { movies as initialMovies } from "../data/movies";

const MovieContext = createContext();

const initialState = {
  movies: initialMovies,
  filteredMovies: initialMovies,
  selectedMovie: initialMovies[0] || null,
  hoveredMovie: null,
  status: "idle",
  showForm: false,
  editingMovie: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SELECTED":
      return { ...state, selectedMovie: action.payload };

    case "SET_HOVERED":
      return { ...state, hoveredMovie: action.payload };

    case "CLEAR_HOVER":
      return { ...state, hoveredMovie: null };

    case "UPDATE_POSTER": {
      const { id, poster } = action.payload;
      const updateList = (list) =>
        list.map((m) => (m.id === id ? { ...m, poster } : m));
      return {
        ...state,
        movies: updateList(state.movies),
        filteredMovies: updateList(state.filteredMovies),
        selectedMovie:
          state.selectedMovie?.id === id
            ? { ...state.selectedMovie, poster }
            : state.selectedMovie,
        hoveredMovie:
          state.hoveredMovie?.id === id
            ? { ...state.hoveredMovie, poster }
            : state.hoveredMovie,
      };
    }

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
        m.id === action.payload.id ? action.payload : m,
      );
      const filteredUpdated = state.filteredMovies.map((m) =>
        m.id === action.payload.id ? action.payload : m,
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
      const remaining = state.movies.filter((m) => m.id !== action.payload);
      const filteredRemaining = state.filteredMovies.filter(
        (m) => m.id !== action.payload,
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

    default:
      return state;
  }
};

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovie = () => useContext(MovieContext);
