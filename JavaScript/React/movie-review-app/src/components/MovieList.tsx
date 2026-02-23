import { useState } from 'react';
import MovieCard from './MovieCard';
import { GENRES, type Genre, type Movie } from '../types/movie';

const MovieList = ({
  movies,
  addMovie,
  updateMovieGenres,
  updateMovieRating,
}: {
  movies: Movie[];
  addMovie: (movie: Movie) => void;
  updateMovieGenres?: (movie: Movie, genres: Genre[]) => void;
  updateMovieRating?: (movie: Movie, rating: number) => void;
}) => {
  const [newMovie, setNewMovie] = useState<Movie>({
    name: '',
    img: '/images/placeholder.svg',
    alt: '',
    description: '',
    rating: 0,
    genres: [],
  });

  const [imageSource, setImageSource] = useState<'file' | 'url'>('file'); // Track whether the user is using file upload or URL

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setNewMovie({ ...newMovie, img: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMovie({ ...newMovie, img: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMovie.genres.length === 0) {
      window.alert('Please select at least one genre.');
      return;
    }
    addMovie(newMovie);
    setNewMovie({
      name: '',
      img: '/images/placeholder.svg',
      alt: '',
      description: '',
      rating: 0,
      genres: [],
    });
  };

  const handleGenreToggle = (genre: Genre) => {
    setNewMovie((prevMovie) => {
      const hasGenre = prevMovie.genres.includes(genre);
      return {
        ...prevMovie,
        genres: hasGenre
          ? prevMovie.genres.filter((item) => item !== genre)
          : [...prevMovie.genres, genre],
      };
    });
  };

  const handleExistingGenreToggle = (movie: Movie, genre: Genre) => {
    if (!updateMovieGenres) {
      return;
    }

    const hasGenre = movie.genres.includes(genre);
    const nextGenres = hasGenre
      ? movie.genres.filter((item) => item !== genre)
      : [...movie.genres, genre];
    updateMovieGenres(movie, nextGenres);
  };

  const handleExistingRating = (movie: Movie, rating: number) => {
    if (!updateMovieRating) {
      return;
    }
    updateMovieRating(movie, Math.round(rating));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex text-amber-50 flex-col gap-4 p-2 max-h-200 bg-gray-800 rounded-lg">
        <input
          type="text"
          placeholder="Movie Name"
          value={newMovie.name}
          onChange={(e) => setNewMovie({ ...newMovie, name: e.target.value })}
          className="p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Alt Text"
          value={newMovie.alt}
          onChange={(e) => setNewMovie({ ...newMovie, alt: e.target.value })}
          className="p-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={newMovie.description}
          onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
          className="p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Rating (0-5)"
          value={newMovie.rating}
          onChange={(e) => setNewMovie({ ...newMovie, rating: Math.round(parseFloat(e.target.value) || 0) })}
          className="p-2 rounded"
          min="0"
          max="5"
          step="1"
          required
        />
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-amber-100">Genres</p>
          <div className="flex flex-wrap gap-3">
            {GENRES.map((genre) => (
              <label key={genre} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={newMovie.genres.includes(genre)}
                  onChange={() => handleGenreToggle(genre)}
                />
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">
            <input
              type="radio"
              name="imageSource"
              value="file"
              checked={imageSource === 'file'}
              onChange={() => setImageSource('file')}
              className="mr-2"
            />
            Upload Image
          </label>
          {imageSource === 'file' && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="p-2 rounded"
            />
          )}
          <label className="text-sm">
            <input
              type="radio"
              name="imageSource"
              value="url"
              checked={imageSource === 'url'}
              onChange={() => setImageSource('url')}
              className="mr-2"
            />
            Enter Image URL
          </label>
          {imageSource === 'url' && (
            <input
              type="url"
              placeholder="Image URL"
              value={typeof newMovie.img === 'string' ? newMovie.img : ''}
              onChange={handleImageUrlChange}
              className="p-2 rounded"
            />
          )}
        </div>
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Add Movie
        </button>
      </form>

      <ul className="grid grid-cols-4 gap-4 mt-8 movie-list">
        {movies.map((movie, index) => (
          <li key={index}>
            <MovieCard
              name={movie.name}
              img={movie.img}
              alt={movie.alt}
              description={movie.description}
              rating={movie.rating}
              genres={movie.genres}
              onRate={updateMovieRating ? (rating: number) => handleExistingRating(movie, rating) : undefined}
            />
            {updateMovieGenres && (
              <div className="mt-3 rounded bg-slate-900/40 p-3 text-amber-100">
                <p className="text-sm font-semibold">Edit genres</p>
                <div className="mt-2 flex flex-wrap gap-3">
                  {GENRES.map((genre) => (
                    <label key={`${movie.name}-${genre}`} className="flex items-center gap-2 text-xs">
                      <input
                        type="checkbox"
                        checked={movie.genres.includes(genre)}
                        onChange={() => handleExistingGenreToggle(movie, genre)}
                      />
                      {genre.charAt(0).toUpperCase() + genre.slice(1)}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default MovieList;

