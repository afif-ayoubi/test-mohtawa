require("./apis/configs/db.config.js");

const bookRouter = require("./apis/routes/book.routes");
const userRoutes = require("./apis/routes/user.routes");
require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/books", bookRouter);

app.listen(3001, (err) => {
  if (err) throw err;
  console.log("Server is running on port 3001");
});
