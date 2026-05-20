export const setupSocket = (io: any) => {
  io.on("connection", (socket: any) => {
    console.log(`⚡ Client connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });
  });
};