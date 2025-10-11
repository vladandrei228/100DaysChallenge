export type Location = { x: number; y: number };

export type Package = {
  id: string;
  location: Location;
  weight: number;
  deliveryWindow: [number, number]; // hours, e.g. [8, 12]
};

export type Courier = {
  id: string;
  maxWeight: number;
};

export type Route = {
  courierId: string;
  packages: Package[];      // ordered delivery sequence
  totalDistance: number;
  latenessPenalty: number;
};

export type Plan = {
  routes: Route[];
  score: number; // totalDistance + total lateness penalties
};
