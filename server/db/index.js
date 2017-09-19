var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".



// SEE BELOW FROM MYSQL NPM FOR CONNECTING TO MYSQL:
const connection = mysql.createConnection({
  user: 'root',
  password: 'plantlife',
  database: 'chat'
});

connection.connect();

exports.query = function (queryString) {
  connection.query(queryString, function (error, results, fields) {
    if (error) { throw error; }
    console.log('Results sent back are: ', results);
  });

};

exports.userPost = function (username) {
  let queryString = `INSERT IGNORE INTO users (username) VALUES ("${username}")`;
  connection.query(queryString, function (error, results, fields) {
    if (error) { throw error; }
    console.log(`${username} inserted into user table`);
  });

};

exports.userGet = function (callback) {
  let queryString = 'SELECT * FROM users';
  connection.query(queryString, function (error, results, fields) {
    if (error) { throw error; }
    console.log('User GET successful');
    callback(results);
  });

};

exports.messagePost = function (username, message, roomname) {
  let queryString = `INSERT INTO messages (text, username_id, roomname) VALUES ("${message}", (SELECT id FROM users WHERE username = "${username}"), "${roomname}")`;
  connection.query(queryString, function (error, results, fields) {
    if (error) { throw error; }
    console.log(`${message} from ${username} inserted into messages table`);
  });

};

exports.messageGet = function (callback) {
  let queryString = 'SELECT users.username, messages.text, messages.roomname, messages.id FROM messages INNER JOIN users ON messages.username_id = users.id';
  connection.query(queryString, function (error, results, fields) {
    if (error) { throw error; }
    console.log('Message GET successful');
    callback(results);
  });

};
