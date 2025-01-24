import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from '@mui/material';
import { useFavorites } from './FavoritesProvider';
import Search from './Search';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const MoviePoster = ({ movies }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredMovies, setFilteredMovies] = useState(movies); // State for filtered movies
    const { favorites, addFavorite, removeFavorite } = useFavorites();
    const navigate = useNavigate();

    useEffect(() => {
        if (!Array.isArray(movies)) {
            console.error('Expected movies to be an array but got:', movies);
            setIsLoading(false);
            return;
        }
        setFilteredMovies(movies); // Initialize filtered movies with full list
        setIsLoading(false);
    }, [movies]);

    const toggleFavorite = (movie) => {
        if (favorites.some(fav => fav.id === movie.id)) {
            removeFavorite(movie);
        } else {
            addFavorite(movie);
        }
    };

    // Handle search input change
    const handleSearchChange = (searchTerm) => {
        if (!searchTerm) {
            setFilteredMovies(movies); // Reset to full list if search term is empty
        } else {
            const filtered = movies.filter((movie) =>
                movie.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredMovies(filtered);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-2">
            {/* Search Bar */}
            <div className='flex justify-end mb-4 mt-2'>
                <Search onSearchChange={handleSearchChange} />
            </div>
            
            {/* Movies List or No Records Found */}
            <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4">
                {filteredMovies.length === 0 ? (
                    <p className="text-lg text-red-600 text-center flex justify-center">
                        No records found
                    </p>
                ) : (
                    filteredMovies.map((movie) => (
                        <div
                            className="flex flex-col shadow-2xl border border-gray-700 rounded-lg p-2 justify-center"
                            key={movie.id}
                        >
                            <div
                                className="flex justify-end cursor-pointer mb-2"
                                onClick={() => toggleFavorite(movie)}
                            >
                                {favorites.some((fav) => fav.id === movie.id) ? (
                                    <FavoriteIcon color="error" />
                                ) : (
                                    <FavoriteBorderIcon />
                                )}
                            </div>
                            <div className="text-center">
                                <img
                                    src={movie.poster || 'https://via.placeholder.com/300x400'}
                                    alt={movie.title}
                                    className="w-full h-auto max-h-84 object-cover mb-2 rounded-lg"
                                />
                                <p className="text-xl font-medium my-2">
                                    {movie.title}
                                </p>
                            </div>
                            <div className='flex justify-between'>
                                <div className='flex flex-col'>
                                    <div className='flex flex-row text-sm'>
                                        <p>{movie.genre}</p>
                                    </div>
                                    <div className='flex flex-row text-xs'>
                                        <h3>Rating :</h3>
                                        <p className='pl-1 font-bold'>{movie.rating}</p>
                                    </div>
                                </div>
                                <Button
                                    onClick={() => navigate(`/movies/${movie.id}`)} 
                                    className="mt-2 bg-transparent flex justify-end" style={{ minWidth: '0px' }}
                                >
                                    <VisibilityOutlinedIcon style={{ color: '#60b048', backgroundColor: "transparent" }} />
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MoviePoster;
