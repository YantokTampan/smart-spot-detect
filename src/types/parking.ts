export interface ParkingSpot {
  id: string;
  number: string;
  status: 'available' | 'occupied' | 'reserved';
  type: 'standard' | 'disabled' | 'electric' | 'compact';
  floor: number;
}

export interface ParkingLot {
  id: string;
  name: string;
  address: string;
  totalSpots: number;
  availableSpots: number;
  distance: string;
  pricePerHour: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  spots: ParkingSpot[];
}
