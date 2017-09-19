var mysql = require('mysql');
var Sequelize = require('sequelize');
const db = new Sequelize('chat', 'root', 'plantlife');


const User = db.define('users', {
  username: { type: Sequelize.STRING, allowNull: false, unique: true },
});

const Message = db.define('Messages', {
  text: Sequelize.STRING,
  roomname: Sequelize.STRING,
});

Message.belongsTo(User);

User.sync();
Message.sync();

exports.userPost = function (username, callback) {
  User.findOrCreate({where: { username }})
  .then(() => {
    callback(null);
  })
  .catch((err) => {
    callback(err);
  });
};

exports.userGet = function (callback) {
  User.findAll({ attributes: ['username']})
  .then((users) => {
    callback(users);
  }).catch((err) => {
    callback(null, err);
  });
};

exports.messagePost = function(username, text, roomname, callback) {
  User.findOne({ attributes: ['id'],
    where: {username} })
    .then((user) => {
      const obj = {text, roomname};
      obj.userId = user.id;
      return Message.create(obj);
    })
    .then(() => {
      callback(null);
    })
    .catch((err) => {
      callback(err);
    });
};

exports.messageGet = function (callback, query = '') {
  let order;
  if (query === 'order=-createdAt') {
    order = ['id', 'DESC'];
  } else {
    order = ['id', 'ASC'];
  }
  Message.findAll({ attributes: ['text', 'roomname', 'id', 'createdAt'],
    order: [order],
    include: [
      {model: User,
        required: true,
        attributes: ['username'],
        where: { id: Sequelize.col('messages.userId') }
      }
    ]
  }
  )
  .then((messages) => {
    const resultsArr = [];
    messages.forEach((message) => {
      const messageObj = message.dataValues;
      const { username } = messageObj.user.dataValues;
      const { text, roomname, id, createdAt } = messageObj;
      const finalObj = { username, text, roomname, id, createdAt };
      resultsArr.push(finalObj);
    });
    return resultsArr;
  })
  .then((results) => {
    callback(results);
  });
};
