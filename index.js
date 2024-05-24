const express = require("express");
const connect=require("./configs/db.config");
require("dotenv").config();
const app = express();

app.use(express.json());
app.listen(3001, (err) => {
    if (err) throw err;
    console.log("Server is running on port 3001");
    connect();
  });
  