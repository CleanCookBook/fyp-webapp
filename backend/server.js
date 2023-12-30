const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const newsfeedRoutes = require('./routes/NewsfeedRoutes'); 
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const aboutmeRoutes = require('./routes/aboutmeRoutes');
const cors = require("cors");
const db = require("./db"); // Import the database module
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3001;
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');

const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
};

app.use(
  cors({
    origin: "http://localhost:3000", // Adjust this to your actual Next.js app origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: "Content-Type",
  })
);

app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: null} // Adjust the maxAge to a larger value in milliseconds
  })
);


app.use(bodyParser.json());

app.use('/api', authRoutes(isAuthenticated)); 
app.use('/api/profile', profileRoutes);
app.use('/api/news', newsfeedRoutes);
app.use('/api/user', userRoutes);
app.use('/api/recipe', recipeRoutes);
app.use('/api/aboutme', aboutmeRoutes);
app.get('/home', isAuthenticated, (req, res) => {
  res.json({ message: 'Welcome to the home page!' });
});


// Handle requests to the root path
app.get("/", (req, res) => {
  res.send("Hello, this is your server!");
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
