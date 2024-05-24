const mysql = require("mysql2");
require("dotenv").config();
const createBookTableQuery = require("../tables/book");

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

connection.query(createBookTableQuery, (err) => {
  if (err) {
    console.error("Error creating Book table: " + err.stack);
    return;
  }
  console.log("Book table created or already exists");
});

module.exports = connection;
