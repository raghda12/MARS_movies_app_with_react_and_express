export interface Movie {
  id: string | number;
  title: string;
  poster?: string;

  overview?: string;
  description?: string;
  release_date?: string;
  runtime?: number;
  genres?: string;
  genre?: string;
  vote_average?: number;
  rating?: number;
  tagline?: string;

  [key: string]: any;
}
export interface MovieCardProps{
  movie: Movie;
  isSelected: boolean;
  onclick: (movie: Movie) => void;
  onHover: (movie: Movie) => void;
  onLeave: () => void;  
}
export interface MovieCarouselProps{
  movies: Movie[];
  selectedMovie: Movie | null;
  onSelect: (movie: Movie) => void;
  onHover: (movie: Movie) => void;
  onLeave: () => void;
}
export interface MovieDetailsProps {
  movie: Movie | null;
}
export interface MovieFormProps{
  onSave: (movie: Partial<Movie>) => void;
  onCancel: () => void;
  movie?: Movie | null;
}
export interface MovieState {
 movies: Movie[],
  filteredMovies: Movie[],
  selectedMovie: Movie | null,
  hoveredMovie: Movie | null,
  status: "loading" | "idle" | "error" | "empty",
  showForm: boolean,
  editingMovie: Movie | null,
  error: string | null,

}
export type Action =  | { type: "SET_MOVIES"; payload: Movie[] }
  | { type: "SET_LOADING" }
  | { type: "SET_ERROR"; payload: string }
  | { type: "SET_SELECTED"; payload: Movie | null }
  | { type: "SET_HOVERED"; payload: Movie | null }
  | { type: "CLEAR_HOVER" }
  | { type: "SEARCH"; payload: string }
  | { type: "ADD_MOVIE"; payload: Movie }
  | { type: "UPDATE_MOVIE"; payload: Movie }
  | { type: "DELETE_MOVIE"; payload: string | number }
  | { type: "SHOW_FORM"; payload?: Movie }
  | { type: "HIDE_FORM" }
  | { type: "UPDATE_POSTER"; payload: { id: string | number; poster: string } };
  

export interface MovieContextType {
  state: MovieState;
  dispatch: React.Dispatch<Action>;
  addMovie: (movieData: Omit<Movie, "id">) => Promise<void>;
  editMovie: (id: string | number, movieData: Partial<Movie>) => Promise<void>;
  removeMovie: (id: string | number) => Promise<void>;
  search: (query: string) => Promise<void>;
}