var db = require('../db');

module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    post: function (messageObj) {
      const { username, message, roomname } = messageObj;
      db.messagePost(username, message, roomname);
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above. Get all users, post for a user
    get: function () {},
    post: function (userObj) {
      db.userPost(userObj.username);
    }
  }
};
