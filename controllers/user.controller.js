const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const connection = require("../configs/db.config");

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: "1h" });
};

const userController = {
  signup: async (req, res) => {
    try {
      const { username, password } = req.body;

      connection.execute("SELECT * FROM Users WHERE Username = ?", [username], async (error, existingUsers) => {
        if (error) {
          console.error("Error checking existing user: ", error);
          return res.status(500).json({ message: "Internal server error." });
        }

        if (existingUsers.length > 0) {
          return res.status(400).json({ message: "Username already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        connection.execute("INSERT INTO Users (Username, Password) VALUES (?, ?)", [username, hashedPassword], (error, result) => {
          if (error) {
            console.error("Error creating user: ", error);
            return res.status(500).json({ message: "Internal server error." });
          }
          res.status(201).json({ message: "User created successfully." });
        });
      });
    } catch (error) {
      console.error("Error creating user: ", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      connection.execute("SELECT * FROM Users WHERE Username = ?", [username], async (error, users) => {
        if (error) {
          console.error("Error fetching user: ", error);
          return res.status(500).json({ message: "Internal server error." });
        }

        if (users.length === 0) {  
          return res.status(401).json({ message: "Invalid username or password." });
        }

        const user = users[0];

        const isPasswordValid = await bcrypt.compare(password, user.Password);

        if (!isPasswordValid) {
          return res.status(401).json({ message: "Invalid username or password." });
        }
        const token = generateToken(user.Id);

        res.status(200).json({ token });
      });
    } catch (error) {
      console.error("Error logging in: ", error);
      res.status(500).json({ message: "Internal server error." });
    }
  }
};

module.exports = userController;
