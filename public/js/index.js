let socket = io();
        
socket.on('connect', function () {
  console.log('Connected to server');

});

socket.on('disconnect', function () {
  console.log('Disconnected from Server')
})

socket.on('newEmail', function(data){
  console.log('New Email');
  console.log(data);

});

socket.on('newMessage', (message) => {
  console.log(message);
  
  var li = jQuery('<li></li>')
  li.text(`${message.from}: ${message.text}`)
  jQuery('#messages').append(li);
});

socket.emit('createMessage',{from:'Frank', text:'This is some text'}, (data)=> {
  console.log( data ,'Got it');
});

jQuery('#message-form').on('submit', (event) => {
  event.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, () => {
    console.log("Ack");
  });
});