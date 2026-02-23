import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { type Movie } from '../types/movie';

interface FilteredMoviePageProps {
  title: string;
  filterMovies: (movies: Movie[]) => Movie[];
  emptyMessage: string;
}

const FilteredMoviePage = ({ title, filterMovies, emptyMessage }: FilteredMoviePageProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const saveMovies = async (nextMovies: Movie[]) => {
    try {
      const response = await fetch('/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movies: nextMovies }),
      });
      if (!response.ok) {
        throw new Error('Save failed');
      }
    } catch (error) {
      console.error('Failed to save movies', error);
      setStatusMessage('Failed to save movies.');
    }
  };

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const response = await fetch('/api/movies');
        if (!response.ok) {
          throw new Error('Failed to load movies');
        }
        const data = (await response.json()) as { movies?: Movie[] };
        const storedMovies = Array.isArray(data.movies) ? data.movies : [];
        setMovies(storedMovies);
      } catch (error) {
        console.error('Failed to load movies', error);
        setStatusMessage('Failed to load movies.');
      }
    };

    void loadMovies();
  }, []);

  const filteredMovies = filterMovies(movies);

  const updateMovieRating = (targetMovie: Movie, rating: number) => {
    const normalizedRating = Math.round(Math.min(5, Math.max(0, rating)));
    setMovies((prevMovies) => {
      const nextMovies = prevMovies.map((movie) =>
        movie === targetMovie ? { ...movie, rating: normalizedRating } : movie,
      );
      void saveMovies(nextMovies);
      return nextMovies;
    });
  };

  return (
    <section className="flex w-full flex-col items-center gap-6">
      <h2 className="text-2xl font-semibold text-amber-100">{title}</h2>
      {statusMessage && (
        <div className="rounded bg-amber-100 px-4 py-2 text-sm font-semibold text-slate-900">
          {statusMessage}
        </div>
      )}
      {filteredMovies.length === 0 ? (
        <p className="text-amber-100">{emptyMessage}</p>
      ) : (
        <ul className="grid grid-cols-4 gap-4 mt-8 movie-list">
          {filteredMovies.map((movie, index) => (
            <li key={`${movie.name}-${index}`}>
              <MovieCard
                name={movie.name}
                img={movie.img}
                alt={movie.alt}
                description={movie.description}
                rating={movie.rating}
                genres={movie.genres}
                onRate={(rating: number) => updateMovieRating(movie, rating)}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default FilteredMoviePage;
