const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const connection = require("../configs/db.config");

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: "1h" });
};

const userController = {
  signup: async (req, res) => {
    try {
      const { username, password } = req.body;

      const [existingUsers] = await connection.query("SELECT * FROM Users WHERE Username = ?", [username]);

      if (existingUsers.length > 0) {
        return res.status(400).json({ message: "Username already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await connection.query("INSERT INTO Users (Username, Password) VALUES (?, ?)", [username, hashedPassword]);

      res.status(201).json({ message: "User created successfully." });
    } catch (error) {
      console.error("Error creating user: ", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const [users] = await connection.query("SELECT * FROM Users WHERE Username = ?", [username]);

      if (users.length === 0) {  
        return res.status(401).json({ message: "Invalid username or password." });
      }

      const user = users[0];

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid username or password." });
      }
      const token = generateToken(user.Id);

      res.status(200).json({ token });
    } catch (error) {
      console.error("Error logging in: ", error);
      res.status(500).json({ message: "Internal server error." });
    }
  }
};

module.exports = userController;
