import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

class SocketService {
  public socket: Socket | null = null;

  connect(token?: string) {
    if (this.socket?.connected) {
      return;
    }
    this.socket = io(SOCKET_URL, {
      auth: { token },
      withCredentials: true,
      transports: ['websocket'],
    });

    this.socket.on('connect', () => console.log('Socket connected)'));
    this.socket.on('connect_error', (err) =>
      console.log('Connection error:', err.message),
    );
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const socketService = new SocketService();
