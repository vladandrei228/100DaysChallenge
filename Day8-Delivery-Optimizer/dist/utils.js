"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distance = distance;
exports.computeRouteDistance = computeRouteDistance;
// Euclidean distance between two points
function distance(a, b) {
    // TODO: implement Euclidean distance
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}
// Given an ordered list of package locations, compute round-trip distance depot -> ... -> depot
function computeRouteDistance(pkgs, depot) {
    // TODO: depot -> p0 -> p1 -> ... -> depot
    if (pkgs.length === 0)
        return 0;
    let total = distance(depot, pkgs[0]);
    for (let i = 0; i < pkgs.length; i++) {
        total += distance(pkgs[i], pkgs[i + 1]);
    }
    total += distance(pkgs[pkgs.length - 1], depot);
    return total;
}
