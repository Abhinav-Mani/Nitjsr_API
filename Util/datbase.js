const mysql2 = require("mysql2");

const pool = mysql2.createPool({
  host     : process.env.HOST,
  port     : process.env.DATABASEPORT,
  user     : process.env.USER,
  password : process.env.PASSWORD,
  database : process.env.DATABASE
});

module.exports = pool.promise();

