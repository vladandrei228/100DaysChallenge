import { useState, type ReactElement } from "react";

type Category = {
  id: string;
  name: string;
  amount: number; // in dollars
  targetPct: number; // percentage (can be any non-negative; normalized if sum !== 100)
};

type Transfer = {
  fromId: string;
  toId: string;
  amount: number; // dollars (two-decimals)
};

export default function App(): ReactElement {
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Savings", amount: 4000, targetPct: 50 },
    { id: "2", name: "Investments", amount: 2000, targetPct: 30 },
    { id: "3", name: "Fun", amount: 1000, targetPct: 10 },
    { id: "4", name: "Emergency", amount: 500, targetPct: 10 },
  ]);

  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [error, setError] = useState<string | null>(null);

  function handleRebalance() {
    setError(null);
    try {
      const t = computeTransfers(categories);
      setTransfers(t);
    } catch (err) {
      if (err){
        setError(String(err));
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-2">Day 4: Budget Rebalancer</h1>
        <p className="text-sm text-gray-500 mb-4">
          Click <strong>Rebalance</strong> to compute minimal transfers to reach target percentages.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="font-semibold mb-2">Categories</h2>
            <div className="space-y-2">
              {categories.map((c) => (
                <div key={c.id} className="p-3 border rounded flex items-center gap-3">
                  <div className="w-28">
                    <input
                    title="Name"
                      type="text"
                      value={c.name}
                      onChange={(e) =>
                        setCategories((prev) => prev.map((p) => (p.id === c.id ? { ...p, name: e.target.value } : p)))
                      }
                      className="w-full px-2 py-1 border rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm">Amount</div>
                    <input
                    title="Amount"
                      type="number"
                      step="0.01"
                      value={c.amount}
                      onChange={(e) =>
                        setCategories((prev) => prev.map((p) => (p.id === c.id ? { ...p, amount: Number(e.target.value) } : p)))
                      }
                      className="w-full px-2 py-1 border rounded"
                    />
                  </div>
                  <div className="w-28">
                    <div className="text-sm">Target %</div>
                    <input
                    title="Target %"
                      type="number"
                      step="0.1"
                      value={c.targetPct}
                      onChange={(e) =>
                        setCategories((prev) => prev.map((p) => (p.id === c.id ? { ...p, targetPct: Number(e.target.value) } : p)))
                      }
                      className="w-full px-2 py-1 border rounded"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3">
              <button onClick={handleRebalance} className="bg-blue-600 text-white px-4 py-2 rounded">
                Rebalance
              </button>
            </div>

            {error && <div className="mt-2 text-red-600">{error}</div>}
          </div>

          <div>
            <h2 className="font-semibold mb-2">Transfers</h2>
            <div className="p-3 border rounded min-h-[200px]">
              {!transfers.length && <div className="text-gray-400">No transfers yet — press Rebalance.</div>}
              {!!transfers.length && (
                <ul className="space-y-2">
                  {transfers.map((t, i) => (
                    <li key={i} className="flex justify-between">
                      <div>
                        From <strong>{categories.find((c) => c.id === t.fromId)?.name}</strong> to{" "}
                        <strong>{categories.find((c) => c.id === t.toId)?.name}</strong>
                      </div>
                      <div className="font-mono">${t.amount.toFixed(2)}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * computeTransfers
 * - Uses integer cents to avoid floating rounding issues.
 * - Normalizes targetPct if sums != 100.
 * - Distributes rounding leftover cents fairly by fractional remainder so targets sum to total exactly.
 */
function computeTransfers(categories: Category[]): Transfer[] {
  if (!categories || categories.length === 0) return [];

  // 1) Total in cents
  const total = categories.reduce((s, c) => s + c.amount, 0);
  const totalCents = Math.round(total * 100);
  if (totalCents === 0) return [];

  // 2) Normalize target percentages if they don't sum to 100
  const sumPct = categories.reduce((s, c) => s + c.targetPct, 0);
  if (sumPct <= 0) throw new Error("Sum of target percentages must be > 0");
  const normalized = categories.map((c) => ({
    ...c,
    normPct: (c.targetPct / sumPct) * 100,
  }));

  // 3) Compute exact floating "target" in cents, and each category's actual amount in cents
  type _Temp = {
    id: string;
    amountCents: number;
    exactTarget: number; // fractional cents possible
  };
  const temp: _Temp[] = normalized.map((c) => ({
    id: c.id,
    amountCents: Math.round(c.amount * 100),
    exactTarget: (totalCents * c.normPct) / 100,
  }));

  // 4) Break exactTarget into base cents and fractional remainder; distribute leftover cents deterministically
  const baseAndFrac = temp.map((t, idx) => {
    const base = Math.floor(t.exactTarget);
    const frac = t.exactTarget - base;
    return { idx, base, frac };
  });

  const sumBases = baseAndFrac.reduce((s, b) => s + b.base, 0);
  const remaining = totalCents - sumBases; // number of cents left to distribute (>=0, < categories.length)
  // sort by fractional descending, tie-breaker by index for determinism
  baseAndFrac.sort((a, b) => {
    if (b.frac !== a.frac) return b.frac - a.frac;
    return a.idx - b.idx;
  });

  const targetCentsArr = new Array<number>(temp.length).fill(0);
  for (const entry of baseAndFrac) {
    targetCentsArr[entry.idx] = entry.base;
  }
  for (let k = 0; k < remaining; k++) {
    targetCentsArr[baseAndFrac[k].idx] += 1;
  }

  // 5) Compute deltas (positive = surplus cents, negative = deficit cents)
  const deltas = temp.map((t, idx) => ({
    id: t.id,
    amountCents: t.amountCents,
    targetCents: targetCentsArr[idx],
    delta: t.amountCents - targetCentsArr[idx],
  }));

  // 6) Build surplus and deficit lists (values in cents, deficits as positive numbers)
  const surpluses = deltas
    .filter((d) => d.delta > 0)
    .map((d) => ({ id: d.id, cents: d.delta }))
    .sort((a, b) => b.cents - a.cents);

  const deficits = deltas
    .filter((d) => d.delta < 0)
    .map((d) => ({ id: d.id, cents: -d.delta })) // positive deficit amount
    .sort((a, b) => b.cents - a.cents);

  // 7) Greedy pair largest surplus -> largest deficit
  const transfersCents: { fromId: string; toId: string; cents: number }[] = [];
  let i = 0;
  let j = 0;
  while (i < surpluses.length && j < deficits.length) {
    const s = surpluses[i];
    const d = deficits[j];
    const move = Math.min(s.cents, d.cents);
    if (move > 0) {
      transfersCents.push({ fromId: s.id, toId: d.id, cents: move });
    }
    s.cents -= move;
    d.cents -= move;
    if (s.cents === 0) i++;
    if (d.cents === 0) j++;
  }

  // 8) Convert cents to dollars (two decimals)
  const transfers: Transfer[] = transfersCents.map((t) => ({
    fromId: t.fromId,
    toId: t.toId,
    amount: Math.round(t.cents) / 100,
  }));

  return transfers;
}
