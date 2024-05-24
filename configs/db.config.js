const mysql = require("mysql2");
require("dotenv").config();
const createBookTableQuery = require("../tables/books");
const createUserTableQuery = require("../tables/users");

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.on("connect", () => {
  console.log("Connected to database");
});

connection.on("error", (error) => {
  console.log("Something went wrong: ", error);
});

connection.query("SHOW TABLES LIKE 'Users'", (err, results) => {
  if (err) {
    console.error("Error checking Users table existence: ", err);
    return;
  }

  if (results.length === 0) {
    connection.query(createUserTableQuery, (err, results) => {
      if (err) {
        console.error("Error creating Users table: ", err);
        return;
      }
      console.log("Users table created successfully");
    });
  } else {
    console.log("Users table already exists");
  }
});

connection.query(createBookTableQuery, (err, results) => {
  if (err) {
    console.error("Error creating Book table: ", err);
    return;
  }
  if (results.warningCount > 0) {
    console.log("Book table already exists or was created with warnings");
  } else {
    console.log("Book table created successfully");
  }
});

module.exports = connection;
