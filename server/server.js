

// Global Imports
const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

// Local Imports
const {msgGen, msgLocGen} = require('./utils/message');
const {isUnique, isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');


// Constants
const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath, {}));
io.on('connection', (socket) => {
  console.log('new user connected: ');
  

  socket.on('join', (params, callback) => {

    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and Roomname are required');
      
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit('newMessage', msgGen('Admin', 'Welcome to the Chat App'));
    socket.broadcast.to(params.room).emit('newMessage', msgGen('Admin',  params.name + ' has joined')); 
    callback();
  });

  socket.on('createMessage', (message, callback)=>{
    console.log('createMessage', message);
    callback();
    let user = users.getUser(socket.id);
    if(user && isRealString(message.text)){
      io.to(user.room).emit('newMessage', msgGen(user.name, message.text));
    }

  });

  socket.on('createLocationMessage', (coords) => {
    let user = users.getUser(socket.id);

    io.to(user.room).emit('newLocationMessage', msgLocGen(user.name, coords));
    console.log(coords);
  });

  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', msgGen('', user.name + " has left"));
    }
  });

});



// Lastestes
server.listen(PORT, ()=> {
  console.log('Serving on port: ' + PORT);
});