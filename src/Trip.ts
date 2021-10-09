
export interface Trip {
  id: number;
  waypoints: Array<WayPoint>;
  price: Price;
}

interface WayPoint {
    place: Place;
}

interface Price {
    amount: number;
    currency: string;
}

interface Place {
    city: string;
}
