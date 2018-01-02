[{
  id: String,
  name: String,
  room: String
}]

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)


class Users {

  constructor(){
    this.users = []
  }

  addUser(id, name, room){
    var user = {id, name, room};
    this.users.push(user);

  }
  removeUser(id){
    // return user that was removed
    let removed;
  
    this.users = this.users.filter((user) => {
      if (user.id === id) { removed = user; }
      return user.id !== id
    });
  
    return removed;
  }

  getUser(id){
    let user = this.users.filter((user) => user.id === id);
    return user[0];
  }

  getUserList(room){
    let users = this.users.filter((user) => user.room === room );
    let names = users.map((user) => user.name);
    return names;
  }
}

module.exports = { Users };