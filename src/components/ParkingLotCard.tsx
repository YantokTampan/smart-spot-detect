import { ParkingLot } from '@/types/parking';
import { MapPin, Navigation, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ParkingLotCardProps {
  lot: ParkingLot;
  onSelect: (lot: ParkingLot) => void;
}

export const ParkingLotCard = ({ lot, onSelect }: ParkingLotCardProps) => {
  const availabilityPercentage = (lot.availableSpots / lot.totalSpots) * 100;
  
  return (
    <Card className="p-6 hover:shadow-lg transition-all cursor-pointer" onClick={() => onSelect(lot)}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">{lot.name}</h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {lot.address}
          </p>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${availabilityPercentage > 50 ? 'text-success' : availabilityPercentage > 20 ? 'text-warning' : 'text-destructive'}`}>
            {lot.availableSpots}
          </div>
          <div className="text-xs text-muted-foreground">of {lot.totalSpots} free</div>
        </div>
      </div>
      
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <span className="flex items-center gap-1">
          <Navigation className="w-4 h-4" />
          {lot.distance}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          ${lot.pricePerHour}/hr
        </span>
      </div>
      
      <div className="w-full bg-secondary rounded-full h-2 mb-4">
        <div 
          className={`h-2 rounded-full transition-all ${availabilityPercentage > 50 ? 'bg-success' : availabilityPercentage > 20 ? 'bg-warning' : 'bg-destructive'}`}
          style={{ width: `${availabilityPercentage}%` }}
        />
      </div>
      
      <Button className="w-full" onClick={(e) => { e.stopPropagation(); onSelect(lot); }}>
        View Details
      </Button>
    </Card>
  );
};
