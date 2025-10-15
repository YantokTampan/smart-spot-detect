import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ParkingLot } from '@/types/parking';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ParkingSpotGrid } from '@/components/ParkingSpotGrid';

interface ParkingDetailsProps {
  lot: ParkingLot;
}

export const ParkingDetails = ({ lot }: ParkingDetailsProps) => {
  const navigate = useNavigate();
  const [selectedFloor, setSelectedFloor] = useState(1);
  const maxFloor = Math.max(...lot.spots.map(s => s.floor));
  
  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background border-b px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{lot.name}</h1>
            <p className="text-sm text-muted-foreground">{lot.address}</p>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6">
            <div className="text-3xl font-bold text-success mb-2">{lot.availableSpots}</div>
            <div className="text-sm text-muted-foreground">Available Spots</div>
          </Card>
          <Card className="p-6">
            <div className="text-3xl font-bold mb-2">{lot.distance}</div>
            <div className="text-sm text-muted-foreground">Distance</div>
          </Card>
        </div>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Parking Map</h2>
          
          <Tabs value={selectedFloor.toString()} onValueChange={(v) => setSelectedFloor(Number(v))}>
            <TabsList className="mb-6">
              {Array.from({ length: maxFloor }, (_, i) => i + 1).map(floor => (
                <TabsTrigger key={floor} value={floor.toString()}>
                  Floor {floor}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {Array.from({ length: maxFloor }, (_, i) => i + 1).map(floor => (
              <TabsContent key={floor} value={floor.toString()}>
                <ParkingSpotGrid spots={lot.spots} floor={floor} />
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="flex gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-success/20 border-2 border-success" />
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-destructive/20 border-2 border-destructive" />
              <span>Occupied</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
