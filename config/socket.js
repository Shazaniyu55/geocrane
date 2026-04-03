// config/socket.js
let io;

const initSocket = (server) => {
  const { Server } = require("socket.io");

  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log(" User connected:", socket.id);

    // Join responder room
    socket.on("joinResponder", (role) => {
      socket.join(role); // police, fire, hospital
    });

    socket.on("disconnect", () => {
      console.log(" User disconnected:", socket.id);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};

module.exports = { initSocket, getIO };