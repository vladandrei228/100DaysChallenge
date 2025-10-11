import { Courier, Package, Plan, Route } from "./types";
import { distance, computeRouteDistance } from "./utils";
import { DEPOT, START_HOUR, LATE_PENALTY_PER_HOUR, COURIER_SPEED } from "./constants";

/**
 * assignPackages:
 * - deterministic greedy:
 *   1. Sort packages by deliveryWindow[0], tie-break by id
 *   2. For each package, iterate couriers in order and assign to the first courier
 *      whose remaining capacity >= package.weight
 * - returns a Map courierId -> assigned Package[]
 */
export function assignPackages(couriers: Courier[], packages: Package[]): Map<string, Package[]> {
  // copy+sort deterministically
  const sorted = [...packages].sort((a, b) => {
    if (a.deliveryWindow[0] !== b.deliveryWindow[0]) return a.deliveryWindow[0] - b.deliveryWindow[0];
    return a.id.localeCompare(b.id);
  });

  // track current used weight per courier (starts 0)
  const used = new Map<string, number>();
  const assigned = new Map<string, Package[]>();
  couriers.forEach((c) => {
    used.set(c.id, 0);
    assigned.set(c.id, []);
  });

  for (const p of sorted) {
    for (const c of couriers) {
      const current = used.get(c.id) ?? 0;
      if (current + p.weight <= c.maxWeight) {
        assigned.get(c.id)!.push(p);
        used.set(c.id, current + p.weight);
        break; // assigned, move to next package
      }
    }
    // if no courier can take this package it remains unassigned (silently)
    // Optionally you could record unassigned packages if desired.
  }

  return assigned;
}

/**
 * buildRoute: deterministic nearest-neighbor ordering + lateness calculation
 */
export function buildRoute(courier: Courier, assigned: Package[]): Route {
  // If nothing assigned, return empty route
  if (!assigned || assigned.length === 0) {
    return {
      courierId: courier.id,
      packages: [],
      totalDistance: 0,
      latenessPenalty: 0
    };
  }

  // Nearest-neighbor deterministic:
  // start at depot, repeatedly pick the closest unvisited package;
  // tie-break by package id.
  const remaining = [...assigned];
  const ordered: Package[] = [];
  let currentPos = DEPOT;

  while (remaining.length > 0) {
    // find min distance item(s)
    let bestIdx = 0;
    let bestDist = distance(currentPos, remaining[0].location);
    for (let i = 1; i < remaining.length; i++) {
      const d = distance(currentPos, remaining[i].location);
      if (d < bestDist) {
        bestDist = d;
        bestIdx = i;
      } else if (d === bestDist) {
        // tie-break by id
        if (remaining[i].id.localeCompare(remaining[bestIdx].id) < 0) {
          bestIdx = i;
        }
      }
    }
    const next = remaining.splice(bestIdx, 1)[0];
    ordered.push(next);
    currentPos = next.location;
  }

  // Compute totalDistance via computeRouteDistance
  const totalDistance = computeRouteDistance(ordered.map((p) => p.location), DEPOT);

  // Compute lateness: simulate incremental arrival times
  let penalty = 0;
  let traveled = 0; // distance traveled so far
  let prevPos = DEPOT;
  for (const p of ordered) {
    // travel from prevPos to this package
    const leg = distance(prevPos, p.location);
    traveled += leg;
    const arrival = START_HOUR + traveled / COURIER_SPEED;
    if (arrival > p.deliveryWindow[1]) {
      const latenessHours = arrival - p.deliveryWindow[1];
      penalty += latenessHours * LATE_PENALTY_PER_HOUR;
    }
    prevPos = p.location;
  }

  return {
    courierId: courier.id,
    packages: ordered,
    totalDistance,
    latenessPenalty: penalty
  };
}

/**
 * buildPlan: perform assignment, build routes for each courier, compute plan.score
 */
export function buildPlan(couriers: Courier[], packages: Package[]): Plan {
  const assignment = assignPackages(couriers, packages);

  const routes: Route[] = [];
  let score = 0;

  for (const c of couriers) {
    const assignedPkgs = assignment.get(c.id) ?? [];
    const route = buildRoute(c, assignedPkgs);
    routes.push(route);
    score += route.totalDistance + route.latenessPenalty;
  }

  return { routes, score };
}
