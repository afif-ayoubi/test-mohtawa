const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const connection = require("../configs/db.config"); 

const verifyToken = promisify(jwt.verify);

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).send("Unauthenticated");

    const decoded = await verifyToken(token, process.env.SECRET_KEY);

    connection.query("SELECT * FROM Users WHERE Id = ?", [decoded.Id], (err, results) => {
      if (err) {
        console.error("Error querying database: ", err);
        return res.status(500).send("Internal server error.");
      }

      if (results.length === 0)  return res.status(401).send("Unauthenticated");
      

      req.user = results[0];
      next();
    });
  } catch (error) {
    console.log("Internal server error: ", error);
    return res.status(500).send("Internal server error.");
  }
};

module.exports = authMiddleware;
