"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const players_json_1 = __importDefault(require("./players.json"));
// TODO 1: load JSON as Player[]
const players = players_json_1.default;
// TODO 2: compute leaderboard with ranks (handle ties)
function computeLeaderboard(players) {
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    const ranks = [];
    for (let i = 0; i < sortedPlayers.length; i++) {
        const player = sortedPlayers[i];
        ranks.push({ ...player, rank: i + 1 });
        if (i > 0 && player.score === sortedPlayers[i - 1].score) {
            ranks[ranks.length - 1].rank = ranks[ranks.length - 2].rank;
        }
    }
    return ranks;
}
// TODO 3: compute statistics
// function computeStatistics(players: Player[]): ??? {}
// TODO 4: compute top 3 performers
// function topPerformers(players: Player[]): Player[] {}
// TODO 5: compute score trends
// function scoreTrends(players: Player[]): {id: string, name: string, change: number}[] {}
// TODO 6: call your functions and print results
computeLeaderboard(players);
