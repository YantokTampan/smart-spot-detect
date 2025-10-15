import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ParkingLotCard } from '@/components/ParkingLotCard';
import { ParkingDetails } from './ParkingDetails';
import { mockParkingLots } from '@/data/mockData';
import { ParkingLot } from '@/types/parking';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLot, setSelectedLot] = useState<ParkingLot | null>(null);
  
  const filteredLots = mockParkingLots.filter(lot =>
    lot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lot.address.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  if (selectedLot) {
    return <ParkingDetails lot={selectedLot} />;
  }
  
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-3">
            <MapPin className="w-10 h-10" />
            Smart Spot Detect
          </h1>
          <p className="text-lg opacity-90 mb-6">Find and reserve parking spots in real-time</p>
          
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by location or parking lot name..."
              className="pl-12 h-14 text-lg bg-card text-foreground"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Nearby Parking Lots</h2>
          <p className="text-muted-foreground">
            {filteredLots.length} parking {filteredLots.length === 1 ? 'lot' : 'lots'} found
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLots.map((lot) => (
            <ParkingLotCard key={lot.id} lot={lot} onSelect={setSelectedLot} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
