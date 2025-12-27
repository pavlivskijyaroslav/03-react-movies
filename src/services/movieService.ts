import type { Movie } from '../types/movie';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_URL;

interface MovieServiceProps {
  results: Movie[];
}
const fetchMovies = async (query: string): Promise<Movie[]> => {
  const url = `${BASE_URL}/search/movie`;

  const { data } = await axios.get<MovieServiceProps>(url, {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  return data.results;
};
export default fetchMovies;
