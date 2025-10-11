import { buildPlan } from "./optimizer";
import { Courier, Package } from "./types";

const couriers: Courier[] = [
  { id: "c1", maxWeight: 50 },
  { id: "c2", maxWeight: 50 },
];

const packages: Package[] = [
  { id: "p1", location: { x: 1, y: 1 }, weight: 10, deliveryWindow: [8, 10] },
  { id: "p2", location: { x: 5, y: 5 }, weight: 15, deliveryWindow: [9, 12] },
  { id: "p3", location: { x: 3, y: 7 }, weight: 20, deliveryWindow: [10, 13] },
  { id: "p4", location: { x: 8, y: 3 }, weight: 15, deliveryWindow: [11, 15] },
];

const plan = buildPlan(couriers, packages);
console.log("Plan:", JSON.stringify(plan, null, 2));
