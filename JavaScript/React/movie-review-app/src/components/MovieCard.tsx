import Image from 'next/image';
import type { Movie } from '../types/movie';

interface MovieCardProps {
  name: Movie['name'];
  img: Movie['img'];
  alt: Movie['alt'];
  description: Movie['description'];
  rating: Movie['rating'];
  genres: Movie['genres'];
  onRate?: (rating: number) => void;
}

const formatGenre = (genre: string) => genre.charAt(0).toUpperCase() + genre.slice(1);

const MovieCard: React.FC<MovieCardProps> = ({
  name,
  img,
  alt,
  description,
  rating,
  genres,
  onRate,
}) => {
  const renderStars = () => {
    const normalizedRating = Math.max(0, Math.min(5, rating));
    const roundedRating = Math.round(normalizedRating);

    return (
      <div className="flex items-center gap-1" role="radiogroup" aria-label="Rate this movie">
        {Array.from({ length: 5 }, (_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= roundedRating;
          const label = `Rate ${starValue} star${starValue === 1 ? '' : 's'}`;
          return (
            <button
              key={`star-${starValue}`}
              type="button"
              onClick={onRate ? () => onRate(starValue) : undefined}
              className={`text-lg ${onRate ? 'cursor-pointer hover:text-amber-600' : 'cursor-default'}`}
              aria-pressed={isFilled}
              aria-label={label}
              disabled={!onRate}
            >
              {isFilled ? '★' : '☆'}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <section className="movie-card m-5 items-center flex flex-col max-w-md p-3 rounded-lg bg-taupe-200">
      <h2 className="text-xl p-3">{name}</h2>
      {img && <Image width={200} height={250} src={img} alt={alt} />}
      <div className="flex flex-wrap justify-center gap-2 pt-3 text-xs">
        {genres.map((genre) => (
          <span key={genre} className="rounded bg-amber-100 px-2 py-1 text-slate-900">
            {formatGenre(genre)}
          </span>
        ))}
      </div>
      <p className="p-3 text-md">{description}</p>
      <div className="rating">
        <span>Rating: </span>
        {renderStars()}
      </div>
    </section>
  );
};

export default MovieCard;

