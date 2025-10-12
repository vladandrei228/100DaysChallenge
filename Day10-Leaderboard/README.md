# Day 10: TypeScript Leaderboard Challenge

## Overview

This project is a **pure TypeScript problem-solving challenge** designed to improve my skills in:

- TypeScript types and strict typing  
- Array manipulations (sorting, filtering)  
- Ranking logic with ties  
- String formatting and console output  

I worked with a small dataset of players (`players.json`) and implemented functions to compute:

- Leaderboard with ranks  
- Player lookup by ID, name, or minimum score  
- Total and average scores  
- Top 3 performers  
- Custom sorting by name or date  
- A readable leaderboard summary  

This challenge focuses purely on **logic and TypeScript**, no React, UI, or backend is involved.

---

## Tasks

1. Define the `Player` type in TypeScript.  
2. Compute a leaderboard with ranks (handle ties).  
3. Implement player lookup functions:
   - By ID  
   - By minimum score  
   - By name substring (case-insensitive)  
4. Compute score stats:
   - Total score  
   - Average score  
   - Number of players above a threshold  
5. Sort players by name or date.  
6. Get top 3 players (including ties).  
7. Generate a formatted leaderboard summary string.

---

## Installation

1: Clone the repository:

```bash
git clone <your-repo-url>
cd Day10-Leaderboard
```

2: Install dependencies:

```bash
npm install
```

3: Run the project with:

```bash
npx ts-node src/index.ts
```

> Alternatively, compile to JavaScript and run with Node:

```bash
npx tsc
node dist/index.js
```

---

## Notes

- Focus on TypeScript type safety — no `any` types for core logic.  
- Handle ties correctly when assigning ranks.  
- Keep all functions pure — return values instead of printing inside the function.  
- Optional: format the leaderboard nicely with padding or emojis for top ranks.

---

## Author

**Vlad-Andrei Gruia**  
100 Days of Code Challenge — Day 10
