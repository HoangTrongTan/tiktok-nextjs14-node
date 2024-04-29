let onLineUser = [];

function socket_module(io) {

  io.on("connection", (socket) => {
    console.log("ONLINE USER", onLineUser, "SocketID: ", socket.id);
    socket.on("addNewUser", (userId) => { 
      !onLineUser.some((user) => user.userId === userId) &&
        onLineUser.push({
          userId,
          socketId: socket.id,
        });

      io.emit("getOnlineUsers", onLineUser);
    });
    
    socket.on("sendMessage", (message) => {
      const user = onLineUser.find((ite) => ite.userId === message.receiptId);
      console.log(">>>User: ", user, ">>>Messages: ", message, "SOCKET", socket.id);
      if (user) {
        io.to(user.socketId).emit("getMessage", message);
      }
    });
    
    socket.on("deleteChat", res => {
      const user = onLineUser.find((ite) => ite.userId === res);
      console.log(">>>User: ", user,  "SOCKET", socket.id);
      if (user) {
        io.to(user.socketId).emit("getMessage", res);
      }
    } );

    socket.on("like-message" , receiptId => {
      const user = onLineUser.find((ite) => ite.userId === receiptId);
      if (user) {
        io.to(user.socketId).emit("likeMessage", receiptId);
      }
    });
    socket.on("disconnect", () => {
      // on là lắng nghe sự kiện
      onLineUser = onLineUser.filter(user => user.socketId !== socket.id);
      socket.broadcast.emit("ended");
    });
  });
}
module.exports = socket_module;
