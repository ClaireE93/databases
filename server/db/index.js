var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".



// SEE BELOW FROM MYSQL NPM FOR CONNECTING TO MYSQL:
const connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'chat'
});

connection.connect();

exports.query = function (queryString) {
  connection.query(queryString, function (error, results, fields) {
    if (error) { throw error; }
    console.log('Results sent back are: ', results);
  });

  connection.end();
};
