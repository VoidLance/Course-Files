export const GENRES = ['action', 'fantasy', 'romance', 'comedy', 'anime'] as const;

export type Genre = (typeof GENRES)[number];

export interface Movie {
  name: string;
  img: string;
  alt: string;
  description: string;
  rating: number; // Integer 0-5
  genres: Genre[]; // String union from GENRES
}
