// Download Express and require it, then add () at its back 
// You do not need to download http, just require http as it is already downloaded by 
//    default, then add .createServer(app) OR .Server(app) at its back inorder to create
//    a server.
// Download Socket.io and require it, connect it to the http server 
//    by adding (http) at its back 
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// const cors = require('cors');
// app.use(cors({
//   origin: 'http://localhost:19006/'
// }));
// app.use(cors({
//     origin: 'https://www.section.io'
// }));

// What to do once there is a connection(NB: Remember we are using io based on 
//    the fact that it is a constant)
// When there is a connection console.log tells us that there is aconnection
// But when a user disconnects socket.on console.log tells us 
//    the reason for the disconnection
// Add messages when sockets open and close connections
io.on('connection', socket => {
  console.log(`[${socket.id}] socket connected`);
  socket.on('disconnect', reason => {
    console.log(`[${socket.id}] socket disconnected - ${reason}`);
  });
});

// Broadcast the current server time as global message, every 1s
setInterval(() => {
  io.sockets.emit('time-msg', { time: new Date().toISOString() });
}, 1000);

// Show the index.html by default
app.get('/', (req, res) => res.sendFile('index.html'));

// Start the express server
http.listen(3000, function(){
  console.log('listening on *:3000');
});