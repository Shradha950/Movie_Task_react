import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReplyIcon from '@mui/icons-material/Reply';

const SingleMovie = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Hook to navigate programmatically
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/movies/${id}`)
            .then(response => {
                setMovie(response.data);
            })
            .catch(error => console.error('Error fetching movie:', error));
    }, [id]);

    if (!movie) return <p>Loading...</p>;

    return (
        <div className='flex flex-col lg:grid grid-cols-5 h-screen gap-5 relative'>
            {/* Back Button */}
            <button 
                onClick={() => navigate(-1)} 
                className='absolute top-4 right-4 border border-purple-400 bg-transprent text-purple-400 font-semibold rounded-lg shadow-md hover:bg-purple-400 hover:text-white transition duration-200 ease-in-out px-4 py-2'
            >
                <ReplyIcon/>
              
            </button>

            <div className='col-span-2 flex p-4 border border-gray-700 rounded-lg justify-center shadow-md m-2'>
                <img src={movie.poster} alt={movie.title} className='rounded-lg' />
            </div>
            <div className='col-span-3 flex flex-col justify-start items-start my-auto gap-2 p-2'>
                <h1 className='text-4xl font-bold text-purple-300'>{movie.title}</h1>
                <p className='text-base text-left'>{movie.description}</p>
                <p className='text-base'>
                    <span className='font-medium text-purple-300'>Release Year:</span> {movie.release_year}
                </p>
                <p className='text-base'>
                    <span className='font-medium text-purple-300'>Rating:</span> {movie.rating}
                </p>
                <p className='text-base'>
                    <span className='font-medium text-purple-300'>Genres:</span> {movie.genre}
                </p>
                <div className='w-28 h-10 mt-2'>
                    <button className='w-full h-full bg-transparent text-white font-semibold rounded-sm shadow-md hover:bg-purple-400 hover:border-purple-400 transition duration-200 ease-in-out border border-purple-300'>
                        Play Trailer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SingleMovie;
