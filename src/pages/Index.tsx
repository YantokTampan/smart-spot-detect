import { useState } from 'react';
import { MapPin, Wifi } from 'lucide-react';
import { ParkingLotCard } from '@/components/ParkingLotCard';
import { ParkingDetails } from './ParkingDetails';
import { useParkingData } from '@/hooks/useParkingData';
import { ParkingLot } from '@/types/parking';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [selectedLot, setSelectedLot] = useState<ParkingLot | null>(null);
  const parkingLot = useParkingData();
  
  if (selectedLot) {
    return <ParkingDetails lot={selectedLot} />;
  }
  
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-3">
              <MapPin className="w-10 h-10" />
              Smart Spot Detect
            </h1>
            <Badge variant="secondary" className="flex items-center gap-2">
              <Wifi className="w-4 h-4 animate-pulse" />
              Live
            </Badge>
          </div>
          <p className="text-lg opacity-90">Data parkir real-time dari kampus</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Status Parkir Kampus</h2>
          <p className="text-muted-foreground">
            Terhubung dengan sistem parkir kampus secara real-time
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ParkingLotCard key={parkingLot.id} lot={parkingLot} onSelect={setSelectedLot} />
        </div>
      </div>
    </div>
  );
};

export default Index;
