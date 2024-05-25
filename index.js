const express = require("express");
require("./configs/db.config.js");

const bookRouter = require("./routes/book.routes");
const userRoutes = require("./routes/user.routes");

require("dotenv").config();
const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/books", bookRouter);


app.listen(3001, (err) => {
  if (err) throw err;
  console.log("Server is running on port 3001");
  
});
