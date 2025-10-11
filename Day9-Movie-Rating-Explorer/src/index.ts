import { getMoviesAboveRating, getTopMovies, groupByGenre } from "./movie";

function visualize() {
  console.log("🎬 Movie Ratings Explorer Demo");

  try {
    console.log("\nMovies above rating 8.7:");
    console.table(getMoviesAboveRating(8.7));

    console.log("\nTop 3 Movies:");
    console.table(getTopMovies(3));

    console.log("\nMovies grouped by genre:");
    const grouped = groupByGenre();
    for (const genre in grouped) {
      console.log(`\n📂 ${genre}`);
      console.table(grouped[genre]);
    }
  } catch (err: any) {
    console.error("⚠️ Functions not implemented yet:", err.message);
  }
}

visualize();
