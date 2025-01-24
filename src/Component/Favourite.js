import React from 'react';
import { Link } from 'react-router-dom';

const Favourite = ({ favorites }) => {
    return (
        <Link to="/favourite" style={{textDecoration:'none',
          fontSize:'28px' }}>
                ❤️ 
            </Link>
                
    );
};

export default Favourite;



