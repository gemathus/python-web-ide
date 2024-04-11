import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { Socket } from "socket.io-client";

interface ISocketContext {
  socket: Socket | null;
  isReady: boolean;
}

const SocketContext = createContext<ISocketContext>({
  socket: null,
  isReady: false,
});

interface SocketProviderProps {
  children: React.ReactNode;
}

const SOCKET_URL = "ws://127.0.0.1:5001";

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const socketInstance: Socket = io(SOCKET_URL, {
      transports: ["websocket"],
    });

    setSocket(socketInstance);
    socketInstance.on("connect", () => {
      console.log("Socket connected");
      setIsReady(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsReady(false);
    });

    socketInstance.on("connect_error", (error) => {
      console.error("Connection Error:", error);
    });

    // Clean up on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isReady }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
