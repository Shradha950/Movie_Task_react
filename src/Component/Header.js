import React, { useState, useEffect } from 'react';
import MoviePoster from './MoviePoster';
import "./Component.css";
import img from "./Logos.jpg";
import Favourite from './Favourite';
import axios from 'axios';
import { Footer } from './Footer';

export const Header = () => {
    const [favorites, setFavorites] = useState([]);
    const [allMovies, setAllMovies] = useState([]); // Store all movies
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(''); // State for selected genre

    const handleAddToFavorites = (movie) => {
        if (!favorites.find(fav => fav.id === movie.id)) {
            setFavorites([...favorites, movie]);
        }
    };

    useEffect(() => {
        axios.get('https://movie-task-react.vercel.app/movies')
            .then(response => {
                console.log("Fetched Movies:", response.data); // Log fetched movies
                setAllMovies(response.data);
                setFilteredMovies(response.data);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }, []);

    // Function to handle genre selection
    const handleSelectGenre = (genre) => {
      setSelectedGenre(genre);
      if (genre === 'All') {
          setFilteredMovies(allMovies); // Show all movies
      } else {
          const filtered = allMovies.filter(movie => 
              movie.genre?.includes(genre) // Check if genre is included in the movie's genres
          );
          console.log(`Filtered Movies for ${genre}:`, filtered); // Log filtered results
          setFilteredMovies(filtered);
      }
  };

    // Define available genres
    const genres = ["All", "Horror", "Crime", "Drama", "Action", "Biography", "Fantasy", "Romance","Adventure"];

    return (
        <div>
            <header className="header">
                <div className="logo">
                    <img src={img} alt="Logo" />
                </div>
                <div className='grid grid-cols-4 lg:flex flex-row gap-1 ' >
                    {/* Genre Buttons */}
                    {genres.map((genre) => (
                        <button key={genre} onClick={() => handleSelectGenre(genre)} className="genre-button">
                            {genre}
                        </button>
                    ))}
                </div>
                <Favourite favorites={favorites} />
            </header>
            <MoviePoster 
                onAddToFavorites={handleAddToFavorites} 
                movies={filteredMovies}
            />
            <Footer />
        </div>
    );
};

export default Header;
