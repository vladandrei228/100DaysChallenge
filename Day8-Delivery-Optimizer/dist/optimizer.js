"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignPackages = assignPackages;
exports.buildRoute = buildRoute;
exports.buildPlan = buildPlan;
const utils_1 = require("./utils");
const constants_1 = require("./constants");
/**
 * assignPackages:
 * - deterministic greedy:
 *   1. Sort packages by deliveryWindow[0] (earliest window start), tie-break by id
 *   2. For each package, iterate couriers in order and assign to the first courier
 *      whose remaining capacity >= package.weight
 * - returns a Map courierId -> assigned Package[]
 */
function assignPackages(couriers, packages) {
    // TODO: implement deterministic greedy assignment ensuring capacity constraint
    const sorted = packages.sort((a, b) => a.deliveryWindow[0] - b.deliveryWindow[0]);
    const load = new Map();
    const assigned = new Map();
    couriers.forEach(c => {
        load.set(c.id, c.maxWeight);
        assigned.set(c.id, []);
    });
    for (const p of sorted) {
        for (const c of couriers) {
            const used = load.get(c.id);
            if (used + p.weight <= c.maxWeight) {
                assigned.get(c.id).push(p);
                load.set(c.id, used + p.weight);
                break;
            }
        }
    }
    return assigned;
}
/**
 * buildRoute: given a courier and its assigned packages (unordered),
 * returns a Route with packages ordered by deterministic nearest-neighbor starting from depot.
 * Also computes totalDistance and latenessPenalty using START_HOUR and COURIER_SPEED.
 */
function buildRoute(courier, assigned) {
    // TODO:
    // 1. Order packages using deterministic nearest-neighbor (choose smallest distance; tie-break by id)
    // 2. Compute totalDistance via computeRouteDistance
    // 3. Simulate arrival times and compute lateness penalty: if arrival > window[1], penalty += (arrival - window[1]) * LATE_PENALTY_PER_HOUR
    const sorted = assigned.sort((a, b) => (0, utils_1.distance)(a.location, constants_1.DEPOT) - (0, utils_1.distance)(b.location, constants_1.DEPOT));
    const totalDistance = (0, utils_1.computeRouteDistance)(sorted.map(p => p.location), constants_1.DEPOT);
    let penalty = 0;
    for (const p of sorted) {
        const arrival = constants_1.START_HOUR + totalDistance / constants_1.COURIER_SPEED;
        if (arrival > p.deliveryWindow[1])
            penalty += (arrival - p.deliveryWindow[1]) * constants_1.LATE_PENALTY_PER_HOUR;
    }
    return { packages: sorted, totalDistance, latenessPenalty: penalty, courierId: courier.id };
}
/**
 * buildPlan: perform assignment, build routes for each courier, compute plan.score
 */
function buildPlan(couriers, packages) {
    // TODO: call assignPackages, buildRoute for each courier, compute score = sum distances + sum penalties
    let score = 0;
    for (const c of couriers) {
        const assigned = assignPackages(couriers, packages);
        const route = buildRoute(c, assigned.get(c.id));
        score += route.totalDistance + route.latenessPenalty;
    }
    return { routes: [], score };
}
