import { Location } from "./types";

// Euclidean distance between two points
export function distance(a: Location, b: Location): number {
  // TODO: implement Euclidean distance
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// Given an ordered list of package locations, compute round-trip distance depot -> ... -> depot
export function computeRouteDistance(pkgs: Location[], depot: Location) : number {
  // TODO: depot -> p0 -> p1 -> ... -> depot
  if(pkgs.length === 0) return 0;

  let total = distance(depot, pkgs[0]);

  for(let i = 0; i < pkgs.length - 1; i++) {
    total += distance(pkgs[i],pkgs[i+1]);
  }

  total += distance(pkgs[pkgs.length-1], depot)
  
  return total;
}
