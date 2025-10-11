import { getMoviesAboveRating, getTopMovies, groupByGenre } from "../src/movie";

describe("Movie Ratings Explorer", () => {
  it("should return movies above a rating", () => {
    const titles = getMoviesAboveRating(8.8).map(m => m.title);
    expect(titles).toContain("Inception");
    expect(titles).toContain("The Dark Knight");
  });

  it("should return top 2 movies by rating", () => {
    const top = getTopMovies(2).map(m => m.title);
    expect(top).toEqual(["The Dark Knight", "Inception"]);
  });

  it("should group movies by genre", () => {
    const grouped = groupByGenre();
    expect(Object.keys(grouped)).toContain("Sci-Fi");
    expect(grouped["Sci-Fi"].length).toBeGreaterThan(1);
  });

  it("should handle empty results gracefully", () => {
    expect(getMoviesAboveRating(9.5)).toEqual([]);
    expect(getTopMovies(0)).toEqual([]);
  });
});
