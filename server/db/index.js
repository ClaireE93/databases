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




exports.userPost = function (username) {
  User.create({username})
  .catch((err) => {
    // console.error(err);
  });
};

exports.userGet = function (callback) {

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
  // const queryString = 'SELECT users.username, messages.text, messages.roomname, messages.id FROM messages INNER JOIN users ON messages.username_id = users.id ORDER BY id DESC LIMIT 20'
  Message.findAll({ attributes: ['text', 'roomname', 'id', 'createdAt'],
    order: [
     ['id', 'DESC']
    ],
    include: [
      {model: User,
        required: true,
        attributes: ['username'],
        where: { id: Sequelize.col('messages.userId') }
      }
    ]
  })
  .then((messages) => {
    const resultsArr = [];
    messages.forEach((message) => {
      const messageObj = message.dataValues;
      const { username } = messageObj.user.dataValues;
      console.log('message Obj is', messageObj);
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


// model: ServiceCollection,
//       required: true,
//       include: [{model: Client, required: true }]}

// 'SELECT users.username, messages.text, messages.roomname, messages.id FROM messages INNER JOIN users ON messages.username_id = users.id ORDER BY id DESC LIMIT 20';


















// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".



// SEE BELOW FROM MYSQL NPM FOR CONNECTING TO MYSQL:
// const connection = mysql.createConnection({
//   user: 'root',
//   password: 'plantlife',
//   database: 'chat'
// });
//
// connection.connect();
//
// exports.query = function (queryString) {
//   connection.query(queryString, function (error, results, fields) {
//     if (error) { throw error; }
//     console.log('Results sent back are: ', results);
//   });
//
// };
//
// exports.userPost = function (username) {
//   let queryString = `INSERT IGNORE INTO users (username) VALUES ("${username}")`;
//   connection.query(queryString, function (error, results, fields) {
//     if (error) { throw error; }
//     console.log(`${username} inserted into user table`);
//   });
//
// };
//
// exports.userGet = function (callback) {
//   let queryString = 'SELECT * FROM users';
//   connection.query(queryString, function (error, results, fields) {
//     if (error) { throw error; }
//     console.log('User GET successful');
//     callback(results);
//   });
//
// };
//
// exports.messagePost = function (username, message, roomname) {
//   let queryString = `INSERT INTO messages (text, username_id, roomname) VALUES ("${message}", (SELECT id FROM users WHERE username = "${username}"), "${roomname}")`;
//   connection.query(queryString, function (error, results, fields) {
//     if (error) { throw error; }
//     console.log(`${message} from ${username} inserted into messages table`);
//   });
//
// };
//
// exports.messageGet = function (callback, query = '') {
//   let queryString;
//   if (query = 'order=-createdAt') {
//     queryString = 'SELECT users.username, messages.text, messages.roomname, messages.id FROM messages INNER JOIN users ON messages.username_id = users.id ORDER BY id DESC LIMIT 20';
//   } else {
//     queryString = 'SELECT users.username, messages.text, messages.roomname, messages.id FROM messages INNER JOIN users ON messages.username_id = users.id LIMIT 20';
//   }
//   connection.query(queryString, function (error, results, fields) {
//     if (error) { throw error; }
//     console.log('Message GET successful');
//     callback(results);
//   });
//
// };
