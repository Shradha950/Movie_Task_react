import React from 'react';
import { useFavorites } from './FavoritesProvider';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ReplyIcon from '@mui/icons-material/Reply';
import { useNavigate } from 'react-router-dom';

const FavouritesPage = () => {
  const { favorites, removeFavorite } = useFavorites();
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };
  return (
    <div className='h-screen'>
      <div className="flex items-center justify-between relative pt-3">
        {/* Back Button */}
        <div className="h-10 w-10 border border-gray-700 flex items-center justify-center rounded-lg hover:bg-gray-200 cursor-pointer absolute left-5">
          <ReplyIcon className="text-gray-300 hover:text-gray-700" style={{ fontSize: '24px' }} onClick={handleBackClick} />
        </div>

        {/* Title */}
        <h1 className="text-lg font-bold mx-auto">My Favorite Movies</h1>
      </div>


      <div className='grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 p-5'>
        {favorites.length === 0 ? (
          <p>No favorite movies found.</p>
        ) : (
          favorites.map(movie => (
            <div key={movie.id} className='flex flex-col shadow-2xl border border-gray-700 rounded-lg p-2  justify-center'>
              <div className='flex justify-center'>
                <img className='rounded-lg p-2' style={{ width: '230px', height: '300px' }} src={movie.poster} alt={movie.title} />
              </div>
              <div className='flex justify-between'> <h3 className='text-xl font-medium' >{movie.title}</h3>
                {/* Remove button */}
                <button onClick={() => removeFavorite(movie)} style={{ marginLeft: '10px' }}><DeleteOutlineIcon style={{ color: "red" }} /></button></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FavouritesPage;
