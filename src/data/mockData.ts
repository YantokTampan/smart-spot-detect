import { ParkingLot } from '@/types/parking';

export const mockParkingLots: ParkingLot[] = [
  {
    id: '1',
    name: 'Central Plaza Parking',
    address: '123 Main Street, Downtown',
    totalSpots: 150,
    availableSpots: 23,
    distance: '0.3 km',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    spots: Array.from({ length: 150 }, (_, i) => ({
      id: `spot-1-${i}`,
      number: `A${i + 1}`,
      status: Math.random() > 0.7 ? 'available' : Math.random() > 0.5 ? 'occupied' : 'reserved',
      type: i % 10 === 0 ? 'disabled' : i % 15 === 0 ? 'electric' : 'standard',
      floor: Math.floor(i / 50) + 1,
    })),
  },
  {
    id: '2',
    name: 'Shopping Center Garage',
    address: '456 Commerce Ave',
    totalSpots: 200,
    availableSpots: 45,
    distance: '0.7 km',
    coordinates: { lat: 40.7138, lng: -74.0070 },
    spots: Array.from({ length: 200 }, (_, i) => ({
      id: `spot-2-${i}`,
      number: `B${i + 1}`,
      status: Math.random() > 0.6 ? 'available' : Math.random() > 0.5 ? 'occupied' : 'reserved',
      type: i % 8 === 0 ? 'disabled' : i % 12 === 0 ? 'electric' : i % 20 === 0 ? 'compact' : 'standard',
      floor: Math.floor(i / 50) + 1,
    })),
  },
  {
    id: '3',
    name: 'North Station Parking',
    address: '789 Station Road',
    totalSpots: 100,
    availableSpots: 67,
    distance: '1.2 km',
    coordinates: { lat: 40.7148, lng: -74.0050 },
    spots: Array.from({ length: 100 }, (_, i) => ({
      id: `spot-3-${i}`,
      number: `C${i + 1}`,
      status: Math.random() > 0.4 ? 'available' : Math.random() > 0.5 ? 'occupied' : 'reserved',
      type: i % 12 === 0 ? 'disabled' : i % 10 === 0 ? 'electric' : 'standard',
      floor: Math.floor(i / 50) + 1,
    })),
  },
];
