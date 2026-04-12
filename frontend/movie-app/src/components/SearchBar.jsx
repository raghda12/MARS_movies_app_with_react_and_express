import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSearch(query);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() === "") onSearch("");
  };

  return (
    <div className="search-wrap">
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={() => onSearch(query)}>🔍</button>
    </div>
  );
};

export default SearchBar;
