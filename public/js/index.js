let socket = io();
        
socket.on('connect', function () {
  console.log('Connected to server');

  socket.emit('createMessage', {
    from:'Aaron',
    to: 'jen',
    text:'Hey this is ridi'
  })
});

socket.on('disconnect', function () {
  console.log('Disconnected from Server')
})

socket.on('newEmail', function(data){
  console.log('New Email');
  console.log(data);

});

socket.on('newMessage', (message) => {
  console.log('newMessage', message);
});

