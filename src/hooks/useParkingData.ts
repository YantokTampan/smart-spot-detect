import { useState, useEffect } from 'react';
import { socketService, ParkingStatusUpdate } from '@/services/socketService';
import { ParkingLot, ParkingSpot } from '@/types/parking';

const createInitialSpots = (): ParkingSpot[] => {
  const spots: ParkingSpot[] = [];
  
  // A1-A10 (Floor 1)
  for (let i = 1; i <= 10; i++) {
    spots.push({
      id: `A${i}`,
      number: `A${i}`,
      status: 'available',
      type: i % 5 === 0 ? 'disabled' : i % 3 === 0 ? 'electric' : 'standard',
      floor: 1,
    });
  }
  
  // B1-B10 (Floor 2)
  for (let i = 1; i <= 10; i++) {
    spots.push({
      id: `B${i}`,
      number: `B${i}`,
      status: 'available',
      type: i % 5 === 0 ? 'disabled' : i % 3 === 0 ? 'electric' : 'standard',
      floor: 2,
    });
  }
  
  return spots;
};

export const useParkingData = () => {
  const [parkingLot, setParkingLot] = useState<ParkingLot>({
    id: 'campus-parking',
    name: 'Parkir Kampus',
    address: 'Kampus Utama',
    totalSpots: 20,
    availableSpots: 20,
    distance: '0 km',
    coordinates: { lat: 0, lng: 0 },
    spots: createInitialSpots(),
  });

  useEffect(() => {
    socketService.connect();

    const handleStatusUpdate = (data: ParkingStatusUpdate) => {
      setParkingLot(prev => {
        const updatedSpots = prev.spots.map(spot => {
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
          ...prev,
          spots: updatedSpots,
          availableSpots: availableCount,
        };
      });
    };

    socketService.onStatusUpdate('parking-data', handleStatusUpdate);

    return () => {
      socketService.offStatusUpdate('parking-data');
      socketService.disconnect();
    };
  }, []);

  return parkingLot;
};
