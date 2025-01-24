import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SingleMovie from './Component/SingleMovie';
import { Header } from './Component/Header';
import { FavoritesProvider } from './Component/FavoritesProvider';
import FavouritesPage from './Component/FavouritePage';
function App() {
  return (
    <FavoritesProvider>
    <Router>
      <div className="App">
      <Routes>
        <Route path='/' element={<Header/>}/>
        <Route path="/movies/:id" element={<SingleMovie />} />
    <Route path='/favourite' element={<FavouritesPage/>}/>
    </Routes>
    </div>
    </Router>
    </FavoritesProvider>
  );
}

export default App;
