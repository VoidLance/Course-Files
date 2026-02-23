import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FilteredMoviePage from '../components/FilteredMoviePage';
import { type Movie } from '../types/movie';

const filterHighestRated = (movies: Movie[]) => {
  if (movies.length === 0) {
    return [];
  }
  const count = Math.max(1, Math.ceil(movies.length * 0.2));
  const normalized = movies.map((movie) => ({
    movie,
    rating: Math.round(movie.rating),
  }));
  const sorted = [...normalized].sort((first, second) => second.rating - first.rating);
  const topMovies = sorted.slice(0, count);
  const totalRating = topMovies.reduce((sum, entry) => sum + entry.rating, 0);
  const averageRating = totalRating / topMovies.length;
  return normalized
    .filter((entry) => entry.rating >= averageRating)
    .map((entry) => entry.movie);
};

export default function HighlyRatedPage() {
  return (
    <>
      <Head>
        <title>Highly Rated Movies</title>
        <meta name="description" content="Highest rated movies" />
      </Head>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-8">
          <FilteredMoviePage
            title="Highly Rated Movies"
            filterMovies={filterHighestRated}
            emptyMessage="No highly rated movies yet."
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
