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
  
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', (message) => {
  console.log(message);
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My Location</a>');
  
  li.text(`${message.from}: `)
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', (event) => {
  event.preventDefault();
  let element = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: element.val()
  }, () => {
    console.log("Ack");
    element.val('');
  });
});


let locationbutton = jQuery('#sendLocation');

locationbutton.on('click', () => {
  console.log('Button was pressed');
  if(!navigator.geolocation){
    return alert('Geolaction not supported by your browser');
  }
  let originalButtonText = locationbutton.text();
  locationbutton.text('Getting Location');
  locationbutton.attr('disabled', 'disabled');

  navigator.geolocation.getCurrentPosition((pos) =>{
    console.log(pos);
    locationbutton.text('Sending Location');
    socket.emit('createLocationMessage', {
      lat: pos.coords.latitude,
      long: pos.coords.longitude
    });
    locationbutton.removeAttr('disabled');
    locationbutton.text(originalButtonText);
  }, (error) => {
    locationbutton.removeAttr('disabled');
    locationbutton.text(originalButtonText);
    alert('Unable to get location');
  });

});
