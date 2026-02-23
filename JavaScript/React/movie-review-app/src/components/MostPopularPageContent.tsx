import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { GENRES, type Genre, GENRE_TO_TMDB_IDS, type Movie } from '../types/movie';

const MostPopularPageContent = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<'all' | Genre>('all');
  const [loading, setLoading] = useState(true);

  const showStatus = (message: string) => {
    setStatusMessage(message);
    window.setTimeout(() => {
      setStatusMessage('');
    }, 4000);
  };

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        let url = '/api/movies?type=popular';

        if (selectedGenre !== 'all' && selectedGenre in GENRE_TO_TMDB_IDS) {
          const genreIds = GENRE_TO_TMDB_IDS[selectedGenre].join(',');
          url = `/api/movies?type=by_genre&genres=${genreIds}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to load movies');
        }

        const data = (await response.json()) as { movies?: Movie[] };
        const loadedMovies = Array.isArray(data.movies) ? data.movies : [];

        if (loadedMovies.length === 0) {
          showStatus('No movies found.');
        } else {
          setMovies(loadedMovies);
          showStatus('Loaded movies from TMDB.');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Failed to load movies', errorMessage);
        showStatus('Failed to load movies.');
      } finally {
        setLoading(false);
      }
    };

    void loadMovies();
  }, [selectedGenre]);

  const updateMovieRating = (_targetMovie: Movie, _rating: number) => {
    // Note: Ratings are now read-only from TMDB
    // This is kept for future local rating feature if needed
    console.log('Rating updates are not persisted in TMDB API mode');
  };

  const filteredMovies = movies;

  return (
    <div className="container min-w-screen flex flex-col items-center justify-center gap-4 px-4 py-8">
      {statusMessage && (
        <div
          className="rounded bg-amber-100 px-4 py-2 text-sm font-semibold text-slate-900"
          role="status"
          aria-live="polite"
        >
          {statusMessage}
        </div>
      )}
      {loading && (
        <div className="rounded bg-amber-100 px-4 py-2 text-sm font-semibold text-slate-900">
          Loading movies...
        </div>
      )}
      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-wrap items-center justify-center gap-3 rounded bg-slate-900/40 p-3 text-amber-100">
          <label htmlFor="genreFilter" className="text-sm font-semibold">
            Filter by genre
          </label>
          <select
            id="genreFilter"
            value={selectedGenre}
            onChange={(event) => setSelectedGenre(event.target.value as 'all' | Genre)}
            className="rounded border border-amber-200 bg-slate-900 px-3 py-2 text-sm"
            disabled={loading}
          >
            <option value="all">All</option>
            {GENRES.map((genre) => (
              <option key={genre} value={genre}>
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </option>
            ))}
          </select>
        </div>
        {filteredMovies.length === 0 && !loading ? (
          <p className="text-center text-amber-100">No movies found.</p>
        ) : (
          <ul className="grid grid-cols-4 gap-4 movie-list">
            {filteredMovies.map((movie, index) => (
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
      </div>
    </div>
  );
};

export default MostPopularPageContent;
