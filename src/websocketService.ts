// services/websocketService.ts
class WebSocketService {
  private socket: WebSocket | null = null;

  public connect(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(url);

      this.socket.onopen = () => {
        console.log("WebSocket Connected");
        resolve();
      };

      this.socket.onerror = (error) => {
        console.error("WebSocket Error", error);
        reject(error);
      };

      this.socket.onclose = () => {
        console.log("WebSocket Disconnected");
      };
    });
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
  }

  public sendMessage(message: string): void {
    if (this.socket) {
      this.socket.send(message);
    }
  }

  public onMessage(callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.onmessage = (event) => {
        callback(event.data);
      };
    }
  }
}

export const websocketService = new WebSocketService();
