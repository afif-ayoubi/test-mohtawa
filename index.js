const express = require("express");
require("./configs/db.config.js");
require("dotenv").config();
const app = express();
const bookRouter = require("./routes/book.routes");
app.use("/api/books", bookRouter);
app.use(express.json());
app.listen(3001, (err) => {
  if (err) throw err;
  console.log("Server is running on port 3001");
  
});
