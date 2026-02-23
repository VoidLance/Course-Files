import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FilteredMoviePage from '../components/FilteredMoviePage';

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
            apiType="top_rated"
            emptyMessage="No highly rated movies found."
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
