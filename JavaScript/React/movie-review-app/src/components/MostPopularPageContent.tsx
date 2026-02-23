import { useEffect, useState } from 'react';
import MovieList from './MovieList';
import { GENRES, type Genre, type Movie } from '../types/movie';
import { defaultMovies } from '../data/defaultMovies';

const MostPopularPageContent = () => {
  const [movies, setMovies] = useState<Movie[]>(defaultMovies);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<'all' | Genre>('all');

  const showStatus = (message: string) => {
    setStatusMessage(message);
    window.setTimeout(() => {
      setStatusMessage('');
    }, 4000);
  };

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
      showStatus('Saved movies.');
    } catch (error) {
      console.error('Failed to save movies', error);
      showStatus('Failed to save movies.');
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
        if (storedMovies.length > 0) {
          setMovies(storedMovies);
          showStatus('Loaded saved movies.');
        } else {
          setMovies(defaultMovies);
          await saveMovies(defaultMovies);
          showStatus('Initialized default movies.');
        }
      } catch (error) {
        console.error('Failed to load movies', error);
        showStatus('Failed to load saved movies.');
      }
    };

    void loadMovies();
  }, []);

  const addMovie = (movie: Movie) => {
    setMovies((prevMovies) => {
      const nextMovies = [...prevMovies, movie];
      void saveMovies(nextMovies);
      return nextMovies;
    });
  };

  const updateMovieGenres = (targetMovie: Movie, genres: Genre[]) => {
    const safeGenres: Genre[] = genres.length > 0 ? genres : ['anime'];
    setMovies((prevMovies) => {
      const nextMovies = prevMovies.map((movie) =>
        movie === targetMovie ? { ...movie, genres: safeGenres } : movie,
      );
      void saveMovies(nextMovies);
      return nextMovies;
    });
  };

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

  const resetMovies = async () => {
    const confirmed = window.confirm('Reset movies back to defaults?');
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch('/api/movies', { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Reset failed');
      }
    } catch (error) {
      console.error('Failed to reset movies', error);
      showStatus('Failed to reset movies.');
      return;
    }

    setMovies(defaultMovies);
    await saveMovies(defaultMovies);
    showStatus('Movies reset to defaults.');
  };

  const filteredMovies =
    selectedGenre === 'all'
      ? movies
      : movies.filter((movie) => movie.genres.includes(selectedGenre));

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
      <button
        type="button"
        onClick={resetMovies}
        className="rounded bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900"
      >
        Reset Movies
      </button>
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
          >
            <option value="all">All</option>
            {GENRES.map((genre) => (
              <option key={genre} value={genre}>
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <MovieList
          movies={filteredMovies}
          addMovie={addMovie}
          updateMovieGenres={updateMovieGenres}
          updateMovieRating={updateMovieRating}
        />
      </div>
    </div>
  );
};

export default MostPopularPageContent;
