
import React, { useState } from "react";
interface SearchBarProps {
  onSearch: (query: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");

  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSearch(query);
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
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
