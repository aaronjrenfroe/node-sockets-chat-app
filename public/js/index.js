let socket = io();

jQuery('#join-form').on('submit', (event) => {
event.preventDefault();
let name = jQuery('[name=name]').val().toLowerCase();
let room = jQuery('[name=room]').val().toLowerCase();
if( typeof name === 'string' 
&& typeof room === 'string' 
&& room.trim().length > 0 
&& name.trim().length > 0
&& name.toLocaleUpperCase() != 'admin'){

  socket.emit('validateUserName', {name,room} , (isUnique) =>{
    if(isUnique){
      let parms = jQuery.param({name, room});
      window.location.href = '/chat.html?'+parms;
    }else{
      alert('There is another user in that room with the same name. try another name');
    }
  });
  

}else{
  alert('Name and Room Name are required');
}
});

// Room Invites
let params = jQuery.deparam(window.location.search);

if(params.room){
let room = jQuery('[name=room]');
room.val(params.room);
}