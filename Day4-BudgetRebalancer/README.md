# Day 4 — Budget Rebalancer

A short algorithmic frontend challenge (React + TypeScript + Tailwind). The goal is to compute a minimal set of transfers between budget categories so each category reaches its target percentage of the total budget. This README describes the problem, constraints, acceptance criteria, suggested algorithm, and how to run the starter project.

---

## Problem statement

You are given a list of categories. Each category has:

- `id`: string
- `name`: string
- `amount`: number — current money in that category
- `targetPct`: number — desired percentage of the **total** budget (0–100)

Write an algorithm that produces a small list of transfers (moves of money from one category to another) so that after applying these transfers each category's amount matches its target amount as closely as possible (within 0.01). Aim to **minimize the number of transfers** by pairing largest surpluses to largest deficits (greedy).

A transfer is `{ fromId, toId, amount }` where `amount` is positive and rounded to two decimals.

---

## Constraints & rules

- The sum of `targetPct` across all categories must be 100. If it is not, the algorithm should either normalize or throw an error (design choice — see hints).
- The total money is taken as the sum of `amount` across all categories.
- The target amount for a category = `(targetPct / 100) * total`.
- A category with `amount > target` is a **surplus**; with `amount < target` is a **deficit**.
- You may only move money between categories (no external inflows/outflows).
- Round transfer amounts to two decimals (cents). Avoid leaving tiny residuals due to rounding — it is acceptable to assign the tiny remainder to the first deficit or smallest-index deficit to balance rounding.
- Return an empty array if everything is already balanced within the rounding epsilon (≤ 0.01).

---

## Acceptance criteria

1. The returned transfers, when applied to the start amounts, produce category amounts within ±0.01 of their target amounts.
2. Transfers are from surplus categories to deficit categories only.
3. Transfer amounts are positive and rounded to two decimals.
4. The number of transfers is reasonably small — a greedy pairing of largest surplus to largest deficit is acceptable.
5. Edge cases handled: zero total, target percentages not summing to 100 (either handled explicitly or reported), already balanced.

---

## Suggested greedy algorithm (step-by-step)

1. Compute `total = sum(amount)`.
2. Compute each category's `targetAmount = roundToCents((targetPct/100) * total)` — keep full precision for internal calculations but plan to round transfers to 2 decimals.
3. For each category compute `delta = amount - targetAmount`. Positive delta = surplus, negative delta = deficit.
4. Build two lists: `surpluses` sorted descending by delta, and `deficits` sorted ascending by delta (most negative first by absolute value).
5. While both lists non-empty:
   - Take the largest surplus `s` and largest deficit `d`.
   - Transfer `x = min(s.delta, -d.delta)` from `s` to `d`.
   - Round `x` to two decimals for the transfer amount.
   - Subtract `x` from both deltas (remember deltas are in currency units).
   - If a delta becomes ≤ 0.005 in absolute value (i.e., within 0.01 rounding), consider it settled and remove from list.
6. If, after processing, a tiny residual remains because of rounding, assign it to the first deficit (or distribute deterministically) to make the final amounts match exactly within the accepted epsilon.

Notes:

- The goal is correctness and simplicity; this greedy approach minimizes transfers in most practical cases.
- Avoid repeatedly sorting, use indices or two-pointer technique for O(n log n) dominated by initial sort.
