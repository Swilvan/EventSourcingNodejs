(function(){
  'use strict';

  class User {

    constructor(id, userName, password) {
      this.id = id;
      this.userName = userName;
      this.password = password;
      this.events = [];
    }

    setUserName(userName) {
      return new User(this.id, userName, this.password);
    }

    setPassword(password) {
      return new User(this.id, this.userName, password);
    }

    current(){
      return this.events.reduce((state, event)=> event.apply(state), this);
    }
  }

  class CreateUser {

    constructor(id, userName) {
      this.id = id;
      this.userName = userName;
    }

    static new({id, userName}){
      return new CreateUser(id, userName);
    }

    apply() {
      return new User(this.id, this.userName);
    }
  }

  class UserNameChanged {

    constructor(userName) {
      this.userName = userName;
    }

    static new({name}){
      console.log(name);
      return new UserNameChanged(name);
    }

    apply(user) {
      console.log(`Processing UserNameChanged event from ${user.userName} to ${this.userName}`);
      return user.setUserName(this.userName);
    }
  }

  class PasswordChanged {

    constructor(password) {
      this.password = password;
    }

    apply(user) {
      return user.setPassword(this.password);
    }
  }

  module.exports = {
    CreateUser: CreateUser,
    UserNameChanged: UserNameChanged,
    PasswordChanged: PasswordChanged
  };

})();