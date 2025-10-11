"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMoviesAboveRating = getMoviesAboveRating;
exports.getTopMovies = getTopMovies;
exports.groupByGenre = groupByGenre;
const movies_json_1 = __importDefault(require("./data/movies.json"));
// TODO: return all movies with rating ≥ minRating
function getMoviesAboveRating(minRating) {
    return movies_json_1.default.filter(m => m.rating >= minRating);
}
// TODO: return top n movies sorted by rating desc, then title asc
function getTopMovies(n) {
    const sorted = movies_json_1.default.sort((a, b) => b.rating - a.rating || a.title.localeCompare(b.title));
    return sorted.slice(0, n);
}
// TODO: group movies by genre into a map { genre: Movie[] }
function groupByGenre() {
    const genre = new Map();
    movies_json_1.default.forEach(m => genre.set(m.genre, [...(genre.get(m.genre) || []), m]));
    return genre;
}
