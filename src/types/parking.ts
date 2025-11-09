export interface ParkingSpot {
  id: string;
  number: string;
  status: 'available' | 'occupied';
  type: 'standard';
  floor: number;
}

export interface ParkingLot {
  id: string;
  name: string;
  address: string;
  totalSpots: number;
  availableSpots: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  spots: ParkingSpot[];
}
