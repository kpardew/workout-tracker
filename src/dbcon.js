var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'YOUR_DATABASE_HOST',
  user            : 'YOUR_DATABASE_USER_NAME',
  password        : 'YOUR_DATABASE_PASSWORD',
  database        : 'YOUR_DATABASE'
});

module.exports.pool = pool;
