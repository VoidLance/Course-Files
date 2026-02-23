import { type Movie, TMDB_GENRE_MAP, type Genre } from '../types/movie';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  vote_average: number;
  popularity: number;
  release_date: string;
  genre_ids: number[];
}

/**
 * Convert TMDB genre IDs to our supported genres
 */
export const convertTMDBGenres = (tmdbGenreIds: number[]): Genre[] => {
  const genres = tmdbGenreIds
    .map((id) => TMDB_GENRE_MAP[id])
    .filter((genre): genre is Genre => genre !== undefined);

  // If no genres mapped, default to action
  return genres.length > 0 ? genres : ['action'];
};

/**
 * Convert TMDB movie to our Movie format
 */
export const convertTMDBMovie = (tmdbMovie: TMDBMovie): Movie => {
  const posterPath = tmdbMovie.poster_path
    ? `${TMDB_IMAGE_BASE_URL}${tmdbMovie.poster_path}`
    : '/images/placeholder.svg';

  // TMDB rating is 0-10, convert to 0-5
  const rating = Math.round((tmdbMovie.vote_average / 10) * 5);

  return {
    id: tmdbMovie.id,
    name: tmdbMovie.title,
    img: posterPath,
    alt: `${tmdbMovie.title} poster`,
    description: tmdbMovie.overview || 'No description available.',
    rating: Math.max(0, Math.min(5, rating)), // Clamp to 0-5
    genres: convertTMDBGenres(tmdbMovie.genre_ids),
    popularity: tmdbMovie.popularity,
    releaseDate: tmdbMovie.release_date,
  };
};

/**
 * Fetch popular movies from TMDB
 */
export const fetchPopularMovies = async (apiKey: string, page = 1): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/popular?api_key=${apiKey}&page=${page}&sort_by=popularity.desc`,
    );

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data = (await response.json()) as { results?: TMDBMovie[] };
    const tmdbMovies = data.results ?? [];

    return tmdbMovies.map(convertTMDBMovie);
  } catch (error) {
    console.error('Failed to fetch popular movies from TMDB:', error);
    return [];
  }
};

/**
 * Search movies by genre ID (combined from multiple genre IDs)
 */
export const fetchMoviesByGenre = async (
  apiKey: string,
  genreIds: number[],
  page = 1,
): Promise<Movie[]> => {
  try {
    const genreQuery = genreIds.join('|');
    const response = await fetch(
      `${TMDB_BASE_URL}/discover/movie?api_key=${apiKey}&with_genres=${genreQuery}&page=${page}&sort_by=popularity.desc`,
    );

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data = (await response.json()) as { results?: TMDBMovie[] };
    const tmdbMovies = data.results ?? [];

    return tmdbMovies.map(convertTMDBMovie);
  } catch (error) {
    console.error('Failed to fetch movies by genre from TMDB:', error);
    return [];
  }
};

/**
 * Search for movies by name
 */
export const searchMovies = async (apiKey: string, query: string): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`,
    );

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data = (await response.json()) as { results?: TMDBMovie[] };
    const tmdbMovies = data.results ?? [];

    return tmdbMovies.map(convertTMDBMovie);
  } catch (error) {
    console.error('Failed to search movies from TMDB:', error);
    return [];
  }
};

/**
 * Fetch top-rated movies
 */
export const fetchTopRatedMovies = async (apiKey: string, page = 1): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/top_rated?api_key=${apiKey}&page=${page}`,
    );

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data = (await response.json()) as { results?: TMDBMovie[] };
    const tmdbMovies = data.results ?? [];

    return tmdbMovies.map(convertTMDBMovie);
  } catch (error) {
    console.error('Failed to fetch top-rated movies from TMDB:', error);
    return [];
  }
};
