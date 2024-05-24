const mysql = require("mysql2");
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});
connection.once("connect", () => {
  console.log("Connected to database");
});
connection.once("error", (error) => {
  console.log("something went wrong: ", error);
});
module.exports = connection;
