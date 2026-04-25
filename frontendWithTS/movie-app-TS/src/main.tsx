import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { MovieProvider } from "./context/MovieContext";

createRoot(document.getElementById("root") as HTMLElement).render(
  <MovieProvider>
    <App />
  </MovieProvider>,
);
