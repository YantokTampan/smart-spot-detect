import { io, Socket } from 'socket.io-client';

const BACKEND_URL = 'https://tesbackend.onrender.com';

export interface ParkingStatusUpdate {
  [slot: string]: 'kosong' | 'penuh';
}

class SocketService {
  private socket: Socket | null = null;
  private listeners: Map<string, (data: ParkingStatusUpdate) => void> = new Map();

  connect() {
    if (this.socket?.connected) {
      return;
    }

    console.log('Connecting to backend:', BACKEND_URL);
    
    this.socket = io(BACKEND_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity,
    });

    this.socket.on('connect', () => {
      console.log('Connected to backend');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from backend');
    });

    this.socket.on('status_parkir_batch', (data: ParkingStatusUpdate) => {
      console.log('Received parking status update:', data);
      this.listeners.forEach(callback => callback(data));
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  onStatusUpdate(id: string, callback: (data: ParkingStatusUpdate) => void) {
    this.listeners.set(id, callback);
  }

  offStatusUpdate(id: string) {
    this.listeners.delete(id);
  }
}

export const socketService = new SocketService();
