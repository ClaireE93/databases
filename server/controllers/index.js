var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) { //NOTE: Need to send to MODEL functions?

    }, // a function which handles a get request for all messages
    post: function (req, res) {
      const messageObj = req.body;
      models.messages.post(messageObj); //TODO: This needs to be a promise;
      res.statusCode = 200;
      res.end('User posted to users table');

    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log('IN GET CONTROLLER', req.json);
    },
    post: function (req, res) {
      const userObj = req.body;
      models.users.post(userObj); //TODO: This needs to be a promise;
      res.statusCode = 200;
      res.end('User posted to users table');
    }
  }
};
