var db = require('../db');

module.exports = {
  messages: {
    get: function (callback, query) {
      db.messageGet(callback, query);
    },
    post: function (messageObj, callback) {
      const { username, text, roomname } = messageObj;
      db.messagePost(username, text, roomname, callback);
    }
  },

  users: {
    get: function (callback) {
      db.userGet(callback);
    },
    post: function (userObj, callback) {
      db.userPost(userObj.username, callback);
    }
  }
};
