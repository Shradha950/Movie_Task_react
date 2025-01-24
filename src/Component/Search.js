import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const Search = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    onSearchChange(value);  
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent form submission if inside a form
    onSearchChange(searchTerm); // Trigger search with current term
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearchSubmit} className="flex items-center">
        <input
          type="text"
          placeholder="Search by Title"
          value={searchTerm}
          onChange={handleSearchChange}
          className='rounded-md h-8 border border-gray-300 p-2'
        />
       
      </form>
    </div>
  );
}

export default Search;
