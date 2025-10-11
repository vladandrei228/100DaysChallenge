import { buildPlan, assignPackages, buildRoute } from "../src/optimizer";
import { Courier, Package } from "../src/types";
import { DEPOT } from "../src/constants";

// --------------------
// 1) Distance / Route helpers
// --------------------
test("distance and computeRouteDistance basic", () => {
  expect(true).toBe(true); // Placeholder: implement after utils functions
});

// --------------------
// 2) Assignment tests
// --------------------
test("assignPackages respects capacity and deterministic", () => {
  const couriers: Courier[] = [{ id: "c1", maxWeight: 20 }, { id: "c2", maxWeight: 20 }];
  const packages: Package[] = [
    { id: "a", location: { x: 0, y: 1 }, weight: 15, deliveryWindow: [8, 12] },
    { id: "b", location: { x: 1, y: 1 }, weight: 10, deliveryWindow: [8, 12] },
    { id: "c", location: { x: 2, y: 2 }, weight: 5, deliveryWindow: [8, 12] },
  ];

  const assignment = assignPackages(couriers, packages);

  // Check capacity: no courier has assigned weight > maxWeight
  for (const c of couriers) {
    const assigned = assignment.get(c.id) ?? [];
    const total = assigned.reduce((s, p) => s + p.weight, 0);
    expect(total).toBeLessThanOrEqual(c.maxWeight);
  }

  // Deterministic: calling again yields same assignment
  const assignment2 = assignPackages(couriers, packages);
  expect(JSON.stringify(Array.from(assignment.entries()))).toBe(
    JSON.stringify(Array.from(assignment2.entries()))
  );
});

// --------------------
// 3) Route tests
// --------------------
test("buildRoute computes lateness penalty when delivery late", () => {
  const courier: Courier = { id: "c1", maxWeight: 100 };
  const packages: Package[] = [
    { id: "late", location: { x: 100, y: 0 }, weight: 1, deliveryWindow: [8, 9] }, // far away -> late
  ];
  const route = buildRoute(courier, packages);
  expect(route.latenessPenalty).toBeGreaterThan(0);
});

test("buildRoute returns 0 lateness if deliveries on time", () => {
  const courier: Courier = { id: "c1", maxWeight: 100 };
  const packages: Package[] = [
    { id: "onTime", location: { x: 1, y: 0 }, weight: 1, deliveryWindow: [8, 12] },
  ];
  const route = buildRoute(courier, packages);
  expect(route.latenessPenalty).toBe(0);
  expect(route.totalDistance).toBeGreaterThan(0);
});

// --------------------
// 4) Plan tests
// --------------------
test("buildPlan produces correct plan and score", () => {
  const couriers: Courier[] = [
    { id: "c1", maxWeight: 20 },
    { id: "c2", maxWeight: 20 },
  ];
  const packages: Package[] = [
    { id: "p1", location: { x: 1, y: 1 }, weight: 10, deliveryWindow: [8, 10] },
    { id: "p2", location: { x: 5, y: 5 }, weight: 15, deliveryWindow: [9, 12] },
    { id: "p3", location: { x: 3, y: 7 }, weight: 5, deliveryWindow: [10, 13] },
  ];

  const plan = buildPlan(couriers, packages);
  expect(plan.routes.length).toBe(couriers.length);

  // Score must be numeric and positive
  expect(typeof plan.score).toBe("number");
  expect(plan.score).toBeGreaterThan(0);

  // Each courier's route packages sum ≤ maxWeight
  for (const route of plan.routes) {
    const totalWeight = route.packages.reduce((s, p) => s + p.weight, 0);
    const courier = couriers.find(c => c.id === route.courierId)!;
    expect(totalWeight).toBeLessThanOrEqual(courier.maxWeight);
  }
});

test("buildPlan is deterministic", () => {
  const couriers: Courier[] = [
    { id: "c1", maxWeight: 50 },
    { id: "c2", maxWeight: 50 },
  ];
  const packages: Package[] = [
    { id: "a", location: { x: 1, y: 1 }, weight: 10, deliveryWindow: [8, 12] },
    { id: "b", location: { x: 2, y: 2 }, weight: 15, deliveryWindow: [9, 13] },
    { id: "c", location: { x: 3, y: 3 }, weight: 20, deliveryWindow: [10, 14] },
  ];

  const plan1 = buildPlan(couriers, packages);
  const plan2 = buildPlan(couriers, packages);
  expect(JSON.stringify(plan1)).toBe(JSON.stringify(plan2));
});

// --------------------
// 5) Edge case tests
// --------------------
test("buildPlan handles no packages gracefully", () => {
  const couriers: Courier[] = [{ id: "c1", maxWeight: 20 }];
  const packages: Package[] = [];
  const plan = buildPlan(couriers, packages);
  expect(plan.routes.length).toBe(couriers.length);
  expect(plan.score).toBe(0);
  for (const route of plan.routes) {
    expect(route.packages.length).toBe(0);
    expect(route.totalDistance).toBe(0);
    expect(route.latenessPenalty).toBe(0);
  }
});

test("buildPlan handles packages too heavy for any courier", () => {
  const couriers: Courier[] = [{ id: "c1", maxWeight: 10 }];
  const packages: Package[] = [
    { id: "huge", location: { x: 0, y: 0 }, weight: 50, deliveryWindow: [8, 12] },
  ];
  const plan = buildPlan(couriers, packages);
  // Courier gets nothing assigned
  expect(plan.routes[0].packages.length).toBe(0);
  expect(plan.score).toBe(0);
});
