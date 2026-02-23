import Link from "next/link";

const Header = () => {
return (
  <>
  <h1 className="text-center text-3xl p-3 rounded-xl local-font bg-amber-100 text-mist-700">Movie Review</h1>
<nav className="bg-taupe-500 text-mist-700 items-center justify-center m-1 flex text-center rounded-lg p-2">
      <ul className="m-2 p-2 flex flex-wrap justify-center">
      <li>
      <Link href="/most-popular" className="rounded-lg border border-3 border-rose-400 m-2 p-2 bg-amber-100">Most Popular Movies</Link>
      </li>
      <li>
      <Link href="/highly-rated" className="rounded-lg border-3 border-rose-400 p-2 m-2 bg-amber-100">Highly Rated</Link>
      </li>
      <li>
      <Link href="/action" className="rounded-lg border-3 border-rose-400 p-2 m-2 bg-amber-100">Action</Link>
      </li>
      <li>
      <Link href="/fantasy" className="rounded-lg border-3 border-rose-400 p-2 m-2 bg-amber-100">Fantasy</Link>
      </li>
      <li>
      <Link href="/romance" className="rounded-lg border-3 border-rose-400 p-2 m-2 bg-amber-100">Romance</Link>
      </li>
      <li>
      <Link href="/comedy" className="rounded-lg border-3 border-rose-400 p-2 m-2 bg-amber-100">Comedy</Link>
      </li>
      </ul>
      </nav>
      </>
);
};

export default Header
