import { useState, useEffect } from 'react';
import { socketService, ParkingStatusUpdate } from '@/services/socketService';
import { ParkingLot, ParkingSpot } from '@/types/parking';

const createSpotsForLot = (lotId: string, prefix: string, count: number): ParkingSpot[] => {
  const spots: ParkingSpot[] = [];
  const floorsCount = Math.ceil(count / 10);
  
  for (let i = 1; i <= count; i++) {
    const floor = Math.ceil(i / 10);
    spots.push({
      id: `${lotId}-${prefix}${i}`,
      number: `${prefix}${i}`,
      status: Math.random() > 0.5 ? 'available' : 'occupied',
      type: 'standard',
      floor: floor,
    });
  }
  
  return spots;
};

const createFilkomSpots = (): ParkingSpot[] => {
  const spots: ParkingSpot[] = [];
  
  // A1-A10 (Floor 1)
  for (let i = 1; i <= 10; i++) {
    spots.push({
      id: `filkom-A${i}`,
      number: `A${i}`,
      status: 'available',
      type: 'standard',
      floor: 1,
    });
  }
  
  // B1-B10 (Floor 2)
  for (let i = 1; i <= 10; i++) {
    spots.push({
      id: `filkom-B${i}`,
      number: `B${i}`,
      status: 'available',
      type: 'standard',
      floor: 2,
    });
  }
  
  return spots;
};

const getRandomSpotCount = () => Math.floor(Math.random() * (30 - 14 + 1)) + 14;

const initialParkingLots: ParkingLot[] = [
  {
    id: 'filkom',
    name: 'Parkiran Filkom',
    address: 'Fakultas Ilmu Komputer',
    totalSpots: 20,
    availableSpots: 20,
    coordinates: { lat: -7.9525, lng: 112.6146 },
    spots: createFilkomSpots(),
  },
  {
    id: 'ftp',
    name: 'Parkiran FTP',
    address: 'Fakultas Teknologi Pertanian',
    totalSpots: getRandomSpotCount(),
    availableSpots: 0,
    coordinates: { lat: -7.9526, lng: 112.6148 },
    spots: [],
  },
  {
    id: 'fk',
    name: 'Parkiran FK',
    address: 'Fakultas Kedokteran',
    totalSpots: getRandomSpotCount(),
    availableSpots: 0,
    coordinates: { lat: -7.9528, lng: 112.6150 },
    spots: [],
  },
  {
    id: 'elektro',
    name: 'Parkiran Elektro',
    address: 'Fakultas Teknik Elektro',
    totalSpots: getRandomSpotCount(),
    availableSpots: 0,
    coordinates: { lat: -7.9527, lng: 112.6147 },
    spots: [],
  },
  {
    id: 'mesin',
    name: 'Parkiran Mesin',
    address: 'Fakultas Teknik Mesin',
    totalSpots: getRandomSpotCount(),
    availableSpots: 0,
    coordinates: { lat: -7.9529, lng: 112.6149 },
    spots: [],
  },
];

// Initialize spots for non-Filkom lots
initialParkingLots.forEach(lot => {
  if (lot.id !== 'filkom') {
    lot.spots = createSpotsForLot(lot.id, lot.id.toUpperCase().substring(0, 1), lot.totalSpots);
    lot.availableSpots = lot.spots.filter(s => s.status === 'available').length;
  }
});

export const useParkingData = () => {
  const [parkingLots, setParkingLots] = useState<ParkingLot[]>(initialParkingLots);

  useEffect(() => {
    socketService.connect();

    const handleStatusUpdate = (data: ParkingStatusUpdate) => {
      setParkingLots(prev => {
        return prev.map(lot => {
          // Only update Filkom parking lot with real-time data
          if (lot.id === 'filkom') {
            const updatedSpots = lot.spots.map(spot => {
              const backendStatus = data[spot.number];
              if (backendStatus) {
                return {
                  ...spot,
                  status: backendStatus === 'kosong' ? 'available' : 'occupied' as 'available' | 'occupied',
                };
              }
              return spot;
            });

            const availableCount = updatedSpots.filter(s => s.status === 'available').length;

            return {
              ...lot,
              spots: updatedSpots,
              availableSpots: availableCount,
            };
          }
          return lot;
        });
      });
    };

    socketService.onStatusUpdate('parking-data', handleStatusUpdate);

    return () => {
      socketService.offStatusUpdate('parking-data');
      socketService.disconnect();
    };
  }, []);

  return parkingLots;
};
