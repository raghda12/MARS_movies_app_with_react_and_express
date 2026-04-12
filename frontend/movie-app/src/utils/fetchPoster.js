export const fetchPoster = async (title) => {
  const API_BASE = "https://api.imdbapi.dev";

  try {
    const response = await fetch(
      `${API_BASE}/search/titles?query=${encodeURIComponent(title)}&limit=1`,
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (data.titles && data.titles.length > 0) {
      const movie = data.titles[0];
      return movie.primaryImage?.url || null;
    }

    return null;
  } catch (err) {
    console.error("Error fetching poster for:", title, err);
    return null;
  }
};
