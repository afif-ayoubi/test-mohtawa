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

function createTableIfNotExists(tableName, createQuery, successMessage) {
  connection.query(`SHOW TABLES LIKE '${tableName}'`, (err, results) => {
    if (err) {
      console.error(`Error checking ${tableName} table existence: `, err);
      return; 
    }

    if (results.length === 0) {
      connection.query(createQuery, (err) => {
        if (err) {
          console.error(`Error creating ${tableName} table: `, err);
          return;
        }
        console.log(`${tableName} table created successfully`);
      });
    } else {
      console.log(`${tableName} table already exists`);
    }
  });
}

connection.on("connect", () => {
  console.log("Connected to database");
});

connection.on("error", (error) => {
  console.log("Something went wrong: ", error);
});

createTableIfNotExists("Users", createUserTableQuery, "Users");

createTableIfNotExists("Books", createBookTableQuery, "Books");

module.exports = connection;