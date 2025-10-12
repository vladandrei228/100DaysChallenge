// index.ts
import { Player } from "./types";
import playersData from "./players.json";

// TODO 1: load JSON as Player[]
const players: Player[] = playersData as Player[];
 type RankedPlayers = Player & { rank: number };

// TODO 2: compute leaderboard with ranks (handle ties)
function computeLeaderboard(players: Player[]): RankedPlayers[] {
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    const ranks: RankedPlayers[] = [];
    for (let i = 0; i < sortedPlayers.length; i++) {
        const player = sortedPlayers[i];
        ranks.push({ ...player, rank: i + 1 });
        if (i > 0 && player.score === sortedPlayers[i - 1].score) {
            ranks[ranks.length - 1].rank = ranks[ranks.length - 2].rank;
        }
    }
    return ranks;
}


// TODO 3: Lookup player by ID
function getPlayerById(players: Player[], id: string): Player | undefined {
  return players.find((player) => player.id === id);
}

// TODO 4: Lookup players by minimum score
function getPlayersByScore(players: Player[], minScore: number): Player[] {
  return players.filter((player) => player.score >= minScore);
}

// TODO 5: Lookup players by name substring (case-insensitive)
function getPlayersByName(players: Player[], search: string): Player[] {
  return players.filter((player) => player.name.toLowerCase().includes(search.toLowerCase()));
}

// TODO 6: Total score
function totalScore(players: Player[]): number {
  return players.reduce((total, player) => total + player.score, 0);
}

// TODO 7: Average score
function averageScore(players: Player[]): number {
    const total = totalScore(players);
    const count = players.length;
    if (count > 0) {
      return total / count;
    }
    return 0;
}

// TODO 8: Count players above a score threshold
function countPlayersAbove(players: Player[], threshold: number): number {
  return players.filter((player) => player.score > threshold).length;
}

// TODO 9: Sort players by name ascending
function sortByName(players: Player[]): Player[] {
  return players.sort((a, b) => a.name.localeCompare(b.name));
}

// TODO 10: Sort players by date ascending
function sortByDate(players: Player[]): Player[] {
  return players.sort((a,b) => a.date.localeCompare(b.date));
}

// TODO 11: Get top 3 players by score (include ties)
function top3Players(players: Player[]): Player[] {
  const leaderboard = computeLeaderboard(players);
  let i = 0;
  const top3: Player[] = [];
  while (leaderboard[i].rank <= 3) {
    top3.push(leaderboard[i]);
    i++;
  }
  return top3;
}

// TODO 12: Generate a leaderboard summary string
function leaderboardSummary(players: Player[]): string {
  const ranked = computeLeaderboard(players);
  let output = "Rank | Name       | Score\n";
  output += "------------------------\n";

  for (const p of ranked) {
    const namePadded = p.name.padEnd(10, " ");
    output += `#${p.rank}   | ${namePadded} | ${p.score}\n`;
  }

  return output;
}



// TODO 6: call your functions and print results

// 1. Compute leaderboard with ranks
const rankedPlayers = computeLeaderboard(players);
console.log("=== Leaderboard ===");
rankedPlayers.forEach(p => {
  console.log(`#${p.rank} ${p.name} - ${p.score}`);
});
console.log("\n");

// 2. Lookup player by ID
const playerId = "p3";
console.log(`=== Player with ID ${playerId} ===`);
console.log(getPlayerById(players, playerId));
console.log("\n");

// 3. Lookup players by minimum score
const minScore = 800;
console.log(`=== Players with score >= ${minScore} ===`);
console.log(getPlayersByScore(players, minScore));
console.log("\n");

// 4. Lookup players by name substring
const nameSearch = "a";
console.log(`=== Players with name containing "${nameSearch}" ===`);
console.log(getPlayersByName(players, nameSearch));
console.log("\n");

// 5. Total score
console.log("=== Total score ===");
console.log(totalScore(players));
console.log("\n");

// 6. Average score
console.log("=== Average score ===");
console.log(averageScore(players));
console.log("\n");

// 7. Count players above a threshold
const threshold = 700;
console.log(`=== Number of players with score above ${threshold} ===`);
console.log(countPlayersAbove(players, threshold));
console.log("\n");

// 8. Sort players by name ascending
console.log("=== Players sorted by name ===");
console.log(sortByName(players));
console.log("\n");

// 9. Sort players by date ascending
console.log("=== Players sorted by date ===");
console.log(sortByDate(players));
console.log("\n");

// 10. Top 3 players by score (include ties)
console.log("=== Top 3 players ===");
console.log(top3Players(players));
console.log("\n");

// 11. Leaderboard summary
console.log("=== Leaderboard Summary ===");
console.log(leaderboardSummary(players));
console.log("\n");
