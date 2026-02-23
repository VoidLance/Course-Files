import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import { GENRES, type Genre, type Movie } from '../../types/movie';
import { defaultMovies } from '../../data/defaultMovies';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'movies.json');

const MAX_NAME_LENGTH = 100;
const MAX_ALT_LENGTH = 150;
const MAX_DESCRIPTION_LENGTH = 1000;
const MAX_IMAGE_LENGTH = 5000;
const MAX_GENRES = 5;

const sanitizeString = (value: unknown, maxLength: number): string => {
  if (typeof value !== 'string') {
    return '';
  }
  return value.trim().slice(0, maxLength);
};

const sanitizeMovie = (value: unknown): Movie | null => {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const record = value as Record<string, unknown>;
  const name = sanitizeString(record.name, MAX_NAME_LENGTH);
  const img = sanitizeString(record.img, MAX_IMAGE_LENGTH);
  const alt = sanitizeString(record.alt, MAX_ALT_LENGTH);
  const description = sanitizeString(record.description, MAX_DESCRIPTION_LENGTH);

  // Safely convert rating to a number
  let rating = 0;
  if (typeof record.rating === 'number') {
    rating = record.rating;
  } else if (typeof record.rating === 'string') {
    const parsed = parseFloat(record.rating);
    rating = Number.isFinite(parsed) ? parsed : 0;
  }

  const genresRaw = Array.isArray(record.genres) ? record.genres : [];
  const normalizedGenres = genresRaw
    .filter((genre): genre is string => typeof genre === 'string')
    .map((genre) => genre.trim().toLowerCase())
    .filter((genre): genre is Genre => (GENRES as readonly string[]).includes(genre))
    .filter((genre, index, array) => array.indexOf(genre) === index)
    .slice(0, MAX_GENRES);

  // Validate required fields (allow empty description)
  if (!name || !img || !alt) {
    console.error('Missing required field:', { name, img, alt });
    return null;
  }

  if (normalizedGenres.length === 0) {
    console.error('No valid genres found in:', record.genres);
    return null;
  }

  const clampedRating = Math.round(Math.min(5, Math.max(0, rating)));
  return {
    name,
    img,
    alt,
    description,
    rating: clampedRating,
    genres: normalizedGenres,
  };
};

const normalizeMovie = (value: Movie): Movie => {
  const normalizedGenres = Array.isArray(value.genres)
    ? value.genres
        .map((genre) => genre.trim().toLowerCase())
        .filter((genre): genre is Genre => (GENRES as readonly string[]).includes(genre))
        .filter((genre, index, array) => array.indexOf(genre) === index)
        .slice(0, MAX_GENRES)
    : [];

  return {
    ...value,
    genres: normalizedGenres,
  };
};

const readMovies = async (): Promise<Movie[]> => {
  try {
    const raw = await fs.readFile(dataFilePath, 'utf-8');
    const parsed = JSON.parse(raw) as { movies?: Movie[] };
    return Array.isArray(parsed.movies)
      ? parsed.movies.map((movie) => normalizeMovie(movie))
      : [];
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
};

const writeMovies = async (movies: Movie[]) => {
  const payload = JSON.stringify({ movies }, null, 2);
  await fs.writeFile(dataFilePath, payload, 'utf-8');
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const movies = await readMovies();
    if (movies.length === 0) {
      await writeMovies(defaultMovies);
      res.status(200).json({ movies: defaultMovies });
      return;
    }
    res.status(200).json({ movies });
    return;
  }

  if (req.method === 'POST') {
    const { movies } = req.body as { movies?: Movie[] };
    if (!Array.isArray(movies)) {
      res.status(400).json({ message: 'movies must be an array' });
      return;
    }

    const sanitizedMovies = movies
      .map((movie, index) => {
        const sanitized = sanitizeMovie(movie);
        if (!sanitized) {
          console.error(`Movie ${index} failed sanitization:`, movie);
        }
        return sanitized;
      })
      .filter((movie): movie is Movie => movie !== null);

    if (sanitizedMovies.length === 0) {
      console.error(`All ${movies.length} movies failed sanitization`);
      res.status(400).json({ message: 'no valid movies provided' });
      return;
    }

    await writeMovies(sanitizedMovies);
    res.status(200).json({ movies: sanitizedMovies });
    return;
  }

  if (req.method === 'DELETE') {
    await writeMovies([]);
    res.status(200).json({ movies: [] });
    return;
  }

  res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
  res.status(405).json({ message: 'Method Not Allowed' });
}
