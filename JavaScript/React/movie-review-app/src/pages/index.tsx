import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MostPopularPageContent from '../components/MostPopularPageContent';

export default function Home() {
  return (
    <>
      <Head>
        <title>Most Popular Movies</title>
        <meta name="description" content="Most popular movies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-[#2e026d] to-[#15162c]">
        <MostPopularPageContent />
      </main>
      <Footer />
    </>
  );
}
