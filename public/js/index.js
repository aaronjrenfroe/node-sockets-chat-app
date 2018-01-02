

 jQuery('#join-form').on('submit', (event) => {
  event.preventDefault();
  let name = jQuery('[name=name]').val();
  let room = jQuery('[name=room]').val();
  if( typeof name === 'string' 
  && typeof room === 'string' 
  && room.trim().length > 0 
  && name.trim().length > 0){

    let parms = jQuery.param({name, room});
    window.location.href = '/chat.html?'+parms;
    
  }else{
    alert('Name and Room Name are required')
  }
 });