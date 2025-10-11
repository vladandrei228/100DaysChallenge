import movies from "./data/movies.json";

export type Movie = {
  id: number;
  title: string;
  genre: string;
  rating: number;
  year: number;
};

// TODO: return all movies with rating ≥ minRating
export function getMoviesAboveRating(minRating: number): Movie[] {
  return movies.filter(m => m.rating >= minRating);
}

// TODO: return top n movies sorted by rating desc, then title asc
export function getTopMovies(n: number): Movie[] {
  const sorted = movies.sort((a,b) => b.rating - a.rating || a.title.localeCompare(b.title));
  return sorted.slice(0, n);
}

// TODO: group movies by genre into a map { genre: Movie[] }
export function groupByGenre(): Record<string, Movie[]> {
  return movies.reduce((acc, movie) => {
    if (!acc[movie.genre]) {
      acc[movie.genre] = [];
    }
    acc[movie.genre].push(movie);
    return acc;
  }, {} as Record<string, Movie[]>);
}