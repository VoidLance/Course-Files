import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { type Movie } from '../types/movie';

interface FilteredMoviePageProps {
  title: string;
  apiType: 'popular' | 'top_rated' | 'by_genre';
  genreIds?: number[];
  emptyMessage: string;
}

const FilteredMoviePage = ({ title, apiType, genreIds, emptyMessage }: FilteredMoviePageProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        let url = '/api/movies';

        if (apiType === 'top_rated') {
          url = '/api/movies?type=top_rated';
        } else if (apiType === 'by_genre' && genreIds) {
          url = `/api/movies?type=by_genre&genres=${genreIds.join(',')}`;
        } else {
          url = '/api/movies?type=popular';
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to load movies');
        }

        const data = (await response.json()) as { movies?: Movie[] };
        const storedMovies = Array.isArray(data.movies) ? data.movies : [];
        setMovies(storedMovies);

        if (storedMovies.length === 0) {
          setStatusMessage(emptyMessage);
        }
      } catch (error) {
        console.error('Failed to load movies', error instanceof Error ? error.message : 'Unknown error');
        setStatusMessage('Failed to load movies.');
      } finally {
        setLoading(false);
      }
    };

    void loadMovies();
  }, [apiType, genreIds, emptyMessage]);

  const updateMovieRating = (_targetMovie: Movie, _rating: number) => {
    // Note: Ratings are now read-only from TMDB
    // This is kept for future local rating feature if needed
    console.log('Rating updates are not persisted in TMDB API mode');
  };

  return (
    <section className="flex w-full flex-col items-center gap-6">
      <h2 className="text-2xl font-semibold text-amber-100">{title}</h2>
      {statusMessage && (
        <div className="rounded bg-amber-100 px-4 py-2 text-sm font-semibold text-slate-900">
          {statusMessage}
        </div>
      )}
      {loading && (
        <div className="rounded bg-amber-100 px-4 py-2 text-sm font-semibold text-slate-900">
          Loading movies...
        </div>
      )}
      {movies.length === 0 && !loading ? (
        <p className="text-amber-100">{emptyMessage}</p>
      ) : (
        <ul className="grid grid-cols-4 gap-4 mt-8 movie-list">
          {movies.map((movie, index) => (
            <li key={String(movie.id ?? `${movie.name}-${index}`)}>
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
