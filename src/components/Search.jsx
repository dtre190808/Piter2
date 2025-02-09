import { useState, useEffect } from 'react';
import '../index.css';

function Search({ search, onSearch }) {
  const [query, setQuery] = useState(search);


  useEffect(() => {
    setQuery(search);
  }, [search]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value); 
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      onSearch(query); 
    }
  };

  return (
    <input
      className="search"
      type="text"
      placeholder="Поиск..."
      value={query}
      onChange={handleChange}
      onKeyDown={handleKeyDown} 
    />
  );
}

export default Search;