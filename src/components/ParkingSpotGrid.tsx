import { ParkingSpot } from '@/types/parking';
import { Car, Zap, Accessibility } from 'lucide-react';

interface ParkingSpotGridProps {
  spots: ParkingSpot[];
  floor: number;
}

export const ParkingSpotGrid = ({ spots, floor }: ParkingSpotGridProps) => {
  const floorSpots = spots.filter(spot => spot.floor === floor);
  
  const getSpotColor = (status: ParkingSpot['status']) => {
    switch (status) {
      case 'available':
        return 'bg-success/20 border-success hover:bg-success/30';
      case 'occupied':
        return 'bg-destructive/20 border-destructive';
      case 'reserved':
        return 'bg-warning/20 border-warning';
    }
  };
  
  const getSpotIcon = (type: ParkingSpot['type']) => {
    switch (type) {
      case 'electric':
        return <Zap className="w-3 h-3" />;
      case 'disabled':
        return <Accessibility className="w-3 h-3" />;
      default:
        return <Car className="w-3 h-3" />;
    }
  };
  
  return (
    <div className="grid grid-cols-10 gap-2">
      {floorSpots.map((spot) => (
        <div
          key={spot.id}
          className={`aspect-square rounded border-2 flex flex-col items-center justify-center text-xs transition-all ${getSpotColor(spot.status)} ${spot.status === 'available' ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
        >
          {getSpotIcon(spot.type)}
          <span className="font-medium mt-1">{spot.number}</span>
        </div>
      ))}
    </div>
  );
};
