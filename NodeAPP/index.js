const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const mongoURI = 'mongodb://mongo:27017/myapp';

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Define user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
const User = mongoose.model('User', userSchema);

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Serve the registration form
app.get('/register', (req, res) => {
  res.send(`
    <form method="POST" action="/register">
      <label for="name">Name:</label>
      <input type="text" name="name" id="name" required>
      <br>
      <label for="email">Email:</label>
      <input type="email" name="email" id="email" required>
      <br>
      <label for="password">Password:</label>
      <input type="password" name="password" id="password" required>
      <br>
      <button type="submit">Register</button>
    </form>
  `);
});

// Handle registration form submission
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  // Create a new user
  const newUser = new User({ name, email, password });
  // Save the user to the database
  newUser.save()
    .then(() => {
      res.send('User registered successfully');
    })
    .catch(err => {
      console.log(err);
      res.send('Error registering user');
    });
});

// Serve the login form
app.get('/login', (req, res) => {
  res.send(`
    <form method="POST" action="/login">
      <label for="email">Email:</label>
      <input type="email" name="email" id="email" required>
      <br>
      <label for="password">Password:</label>
      <input type="password" name="password" id="password" required>
      <br>
      <button type="submit">Login</button>
    </form>
  `);
});

// Handle login form submission
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // Find the user in the database
  User.findOne({ email, password })
    .then(user => {
      if (user) {
        res.send(`Welcome ${user.name}`);
      } else {
        res.send('Invalid email or password');
      }
    })
    .catch(err => {
      console.log(err);
      res.send('Error logging in');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
