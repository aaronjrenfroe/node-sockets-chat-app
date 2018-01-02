
 jQuery('#join-form').on('submit', (event) => {
  event.preventDefault();
  let name = jQuery('[name=name]').val();
  let room = jQuery('[name=room]').val();
  if( typeof name === 'string' 
  && typeof room === 'string' 
  && room.trim().length > 0 
  && name.trim().length > 0
  && name.toLocaleUpperCase() != 'admin'){

    let parms = jQuery.param({name, room});
    window.location.href = '/chat.html?'+parms;

  }else{
    alert('Name and Room Name are required')
  }
 });

 // Room Invites
 let params = jQuery.deparam(window.location.search);

 if(params.room){
  let room = jQuery('[name=room]');
  room.val(params.room);
 }