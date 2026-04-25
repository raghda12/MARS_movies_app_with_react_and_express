
import React, { createContext, useReducer, useContext, useEffect } from "react";
import {
  fetchAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  searchMovies,
} from "../services/api";
import type {MovieContextType , MovieState, Action , Movie} from "../types/movie";

const MovieContext = createContext<MovieContextType | undefined>(undefined);

const initialState: MovieState = {
  movies: [],
  filteredMovies: [],
  selectedMovie: null,
  hoveredMovie: null,
  status: "loading",
  showForm: false,
  editingMovie: null,
  error: null,
};

const reducer: React.Reducer<MovieState, Action> = (state, action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return {
        ...state,
        movies: action.payload,
        filteredMovies: action.payload,
        selectedMovie: action.payload[0] || null,
        status: "idle",
        error: null,
      };
    case "SET_LOADING":
      return { ...state, status: "loading" };
    case "SET_ERROR":
      return { ...state, status: "error", error: action.payload };

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
        status: "idle",
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
        status: "idle",
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

export const MovieProvider = ({ children }:{children: React.ReactNode}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchAllMovies()
      .then((movies) => dispatch({ type: "SET_MOVIES", payload: movies }))
      .catch((err) => dispatch({ type: "SET_ERROR", payload: (err as Error).message }));
  }, []);

  const addMovie = async (movieData: Omit<Movie, "id">) => {
    const newMovie = await createMovie(movieData);
    dispatch({ type: "ADD_MOVIE", payload: newMovie });
  };

  const editMovie = async (id: string | number, movieData: Partial<Movie>) => {
    const updated = await updateMovie(id, movieData);
    dispatch({ type: "UPDATE_MOVIE", payload: updated });
  };

  const removeMovie = async (id: string | number) => {
    await deleteMovie(id);
    dispatch({ type: "DELETE_MOVIE", payload: id });
  };

  const search = async (query: string) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const results = await searchMovies(query);
      dispatch({ type: "SET_MOVIES", payload: results });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: (err as Error).message });
    }
  };
  return (
    <MovieContext.Provider
      value={{ state, dispatch, addMovie, editMovie, removeMovie, search }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovie = (): MovieContextType => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error("useMovie must be used within a MovieProvider");
  }
  return context;
};
