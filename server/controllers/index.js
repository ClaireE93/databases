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
      models.messages.get(callback, parsedUrl.query);
    },
    post: function (req, res) {
      let messageObj;
      if (typeof req.body === 'string') {
        messageObj = JSON.parse(req.body);
      } else {
        messageObj = req.body;
      }

      const callback = function(err) {
        if (err) {
          res.statusCode = 400;
          res.end('ERROR posting to table: ', err);
        } else {
          res.statusCode = 200;
          res.end('User posted to users table');
        }
      };

      models.messages.post(messageObj, callback);
    }
  },

  users: {
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
      const callback = (err) => {
        if (err) {
          res.statusCode = 400;
          res.end('FAILED to post user:', err);
        } else {
          res.statusCode = 200;
          res.end('User posted to users table');
        }
      };

      models.users.post(userObj, callback);
    }
  }
};
