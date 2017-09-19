var models = require('../models');
const urlParse = require('url');

module.exports = {
  messages: {
    get: function (req, res) {
      const callback = function(body) {
        const { method, url } = req;
        const responseBody = { method, url};
        responseBody.results = body;
        res.statusCode = 200;
        res.end(JSON.stringify(responseBody));
      };

      const { url } = req;
      const parsedUrl = urlParse.parse(url);
      console.log('parsedUrl', parsedUrl);
      models.messages.get(callback, parsedUrl.query);
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      let messageObj;
      if (typeof req.body === 'string') {
        messageObj = JSON.parse(req.body);
      } else {
        messageObj = req.body;
      }

      models.messages.post(messageObj);
      res.statusCode = 200;
      res.end('User posted to users table');
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      const callback = function(body) {
        const { method, url } = req;
        const responseBody = { method, url};
        responseBody.results = body;
        res.statusCode = 200;
        res.end(JSON.stringify(responseBody));
      };

      models.messages.get(callback);
    },
    post: function (req, res) {
      let userObj;
      if (typeof req.body === 'string') {
        userObj = JSON.parse(req.body);
      } else {
        userObj = req.body;
      }
      models.users.post(userObj); //TODO: This needs to be a promise;
      res.statusCode = 200;
      res.end('User posted to users table');
    }
  }
};
