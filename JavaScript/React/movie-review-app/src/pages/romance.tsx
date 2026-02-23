import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FilteredMoviePage from '../components/FilteredMoviePage';
import { GENRE_TO_TMDB_IDS } from '../types/movie';

export default function RomancePage() {
  return (
    <>
      <Head>
        <title>Romance Movies</title>
        <meta name="description" content="Romance movies" />
      </Head>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-8">
          <FilteredMoviePage
            title="Romance Movies"
            apiType="by_genre"
            genreIds={GENRE_TO_TMDB_IDS.romance}
            emptyMessage="No romance movies found."
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
