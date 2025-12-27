import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import fetchMovies from '../../services/movieService';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader.module/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import type { Movie } from '../../types/movie';

function App() {
  const [isLoader, setIsLodaer] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const handleSearch = async (query: string) => {
    try {
      setMovies([]);
      setIsError(null);
      setIsLodaer(true);
      const items = await fetchMovies(query);
      setMovies(items);
      if (items.length === 0) {
        toast.error('No movies found for your request.');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setIsError(error.message);
      }
    } finally {
      setIsLodaer(false);
    }
  };

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <MovieGrid movies={movies} onSelect={openModal} />
      <Toaster position="top-center" reverseOrder={false} />
      {isLoader ? <Loader /> : null}
      {isError ? <ErrorMessage /> : null}
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </>
  );
}

export default App;
