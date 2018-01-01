// Global Imports
const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

// Local Imports
const {msgGen} = require('./utils/message');

// nil

// Constants
const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath, {}))
io.on('connection', (socket) => {
  console.log('new user connected: ');
  
  socket.emit('newMessage', msgGen('admin', 'Welcome to the Chat App'));

  socket.broadcast.emit('newMessage', msgGen('admin', 'A new User has joined'));

  socket.on('createMessage', (message, callback)=>{
    console.log('createMessage', message);
    callback('server got your message');
    socket.emit('newMessage', msgGen(message.from, message.text));

  });
});

// Lastestes
server.listen(PORT, ()=> {
  console.log('Serving on port: ' + PORT);
});