import { useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import { ParkingLotCard } from '@/components/ParkingLotCard';
import { ParkingDetails } from './ParkingDetails';
import { useParkingData } from '@/hooks/useParkingData';
import { ParkingLot } from '@/types/parking';
import { Input } from '@/components/ui/input';

const Index = () => {
  const [selectedLot, setSelectedLot] = useState<ParkingLot | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const parkingLots = useParkingData();
  
  const filteredLots = parkingLots.filter(lot => 
    lot.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  if (selectedLot) {
    const currentLot = parkingLots.find(lot => lot.id === selectedLot.id) || selectedLot;
    return <ParkingDetails lot={currentLot} onBack={() => setSelectedLot(null)} />;
  }
  
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4">
            <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-3">
              <MapPin className="w-10 h-10" />
              Smart Spot Detect
            </h1>
          </div>
          <p className="text-lg opacity-90 mb-4">Data parkir real-time dari kampus</p>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-foreground/60" />
            <Input
              type="text"
              placeholder="Cari parkiran..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
            />
          </div>
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
          {filteredLots.length > 0 ? (
            filteredLots.map(lot => (
              <ParkingLotCard key={lot.id} lot={lot} onSelect={setSelectedLot} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              Tidak ada parkiran yang ditemukan
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
