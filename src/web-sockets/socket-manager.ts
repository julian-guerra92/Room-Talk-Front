import { Manager, Socket } from 'socket.io-client';

export class SocketManager {
   private static instance: SocketManager;
   private socket: Socket | null;

   private constructor() {
      this.socket = null;
   }

   public static getInstance(): SocketManager {
      if (!SocketManager.instance) {
         SocketManager.instance = new SocketManager();
      }
      return SocketManager.instance;
   }

   private connect(userId: string): Socket {
      const manager = new Manager('http://localhost:8080', {
         query: {
            userId
         }
      });
      this.socket?.removeAllListeners();
      this.socket = manager.socket('/');
      this.addSocketListeners();
      return this.socket;
   }

   private addSocketListeners() {
      this.socket?.on('connect', () => {
         console.log('Connected to server');
      });

      this.socket?.on('disconnect', () => {
         console.log('Disconnected from server');
      });

      this.socket?.on('chat-connection', (payload: any) => {
         console.log(payload)
      });
   }

   public getSocket(userId: string): Socket {
      if (!this.socket) {
         this.socket = this.connect(userId);
      }
      return this.socket;
   }

   public disconnectSocket() {
      this.socket?.disconnect();
      this.socket = null;
   }

   public chatConnection(chatId: string, type: string) {
      this.socket?.emit('chat-connection', { chatId, type });
   }

   public chatDisconnection() {
      this.socket?.emit('chat-disconnection');
   }

   public sendMessage(message: string) {
      this.socket?.emit('chat-message', { message });
   }


}