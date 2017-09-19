var db = require('../db');

module.exports = {
  messages: {
    get: function (callback, query) {
      db.messageGet(callback, query);
    }, // a function which produces all the messages
    post: function (messageObj) {
      const { username, text, roomname } = messageObj;
      db.messagePost(username, text, roomname);
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
