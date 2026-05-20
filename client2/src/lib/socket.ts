import { io } from "socket.io-client";

export const socket = io(
  process.env.NEXT_PUBLIC_API_URL as string,
  {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  }
);
export const setupSocket = (io: any) => {
  io.on("connection", (socket: any) => {
    console.log(`⚡ Client connected: ${socket.id}`);

    socket.on("disconnect", (reason: string) => {
      console.log(
        `❌ Client disconnected: ${socket.id}`
      );

      console.log(`Reason: ${reason}`);
    });

    socket.on("error", (error: any) => {
      console.error("Socket Error:", error);
    });
  });
};