"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const movie_1 = require("./movie");
function visualize() {
    console.log("🎬 Movie Ratings Explorer Demo");
    try {
        console.log("\nMovies above rating 8.7:");
        console.table((0, movie_1.getMoviesAboveRating)(8.7));
        console.log("\nTop 3 Movies:");
        console.table((0, movie_1.getTopMovies)(3));
        console.log("\nMovies grouped by genre:");
        const grouped = (0, movie_1.groupByGenre)();
        for (const genre in grouped) {
            console.log(`\n📂 ${genre}`);
            console.table(grouped.get(genre));
        }
    }
    catch (err) {
        console.error("⚠️ Functions not implemented yet:", err.message);
    }
}
visualize();
