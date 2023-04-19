const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

// Create connection pool to MySQL database
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "mydb"
});

// Create express app
const app = express();

// Use bodyParser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Handle login requests
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  pool.query("SELECT * FROM users WHERE username=? AND password=?", [username, password], (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    } else if (results.length == 1) {
      res.send("Login successful");
    } else {
      res.send("Incorrect username or password");
    }
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
