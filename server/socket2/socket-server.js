const socketio = require('socket.io');

let io;

function init(server) {
  console.log("sock init");
  io = socketio(server,{
    cors: {
        origin: ["http://127.0.0.1:3000"],
    }});

  io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);


    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
  
    socket.on("send_message", (data) => {
      console.log(data);
      socket.to(data.room).emit("receive_message", data);
    });

    
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
}

function getIO() {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
}



module.exports = {
  init,
  getIO,
};
