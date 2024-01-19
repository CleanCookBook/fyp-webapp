const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const newsfeedRoutes = require('./routes/NewsfeedRoutes'); 
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const bookMarkRoutes = require('./routes/bookMarkRoutes')
const aboutmeRoutes = require('./routes/aboutmeRoutes');
const editUserRoutes = require('./routes/editUserRoutes')
const reviewRoutes = require('./routes/reviewRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const editRecipeRoutes = require('./routes/editRecipeRoutes');
const isAuthenticated = require('./authMiddleware'); 
const cors = require("cors");
const db = require("./db"); // Import the database module
const session = require('express-session');
const multer = require('multer'); 
const app = express();
const PORT = process.env.PORT || 3001;
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');

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
// Configure Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use('/api', authRoutes(isAuthenticated)); 
app.use('/api/profile', profileRoutes);
app.use('/api/user', userRoutes);
app.use('/api/news', newsfeedRoutes);
app.use('/api/recipe', recipeRoutes);
app.use('/api/aboutme', aboutmeRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/edit', editUserRoutes);
app.use('/api/bookmark', bookMarkRoutes);
app.use('/api/editRecipe', editRecipeRoutes);
app.use('/api/announce', announcementRoutes);
app.get('/home', isAuthenticated, (req, res) => {
  res.json({ message: 'Welcome to the home page!' });
});

// Handle requests to the root path
app.get("/", (req, res) => {
  res.send("Hello, this is your server!");
});

app.get('/api/filter', async (req, res) => {
  console.log("testing");

  try {
    let dp_tags = JSON.parse(req.query.dietaryPreferences);
    let allergy_tags = JSON.parse(req.query.allergies);
    let cTime = req.query.cookingTime;
    let calorie = req.query.calories;

    const sql = 'SELECT Rname FROM Recipe_Np WHERE dp_tags IN (?) AND allergy_tags IN (?) AND (cTime = "" OR cTime <= ?) AND (calorie = "" OR calorie <= ?)';
    const params = [dp_tags, allergy_tags, cTime, calorie];

    console.log('Executing SQL query:', sql);
    console.log('Query parameters:', params);

    // console.log('Dietary Preferences:', dp_tags);
    // console.log('Allergies:', allergy_tags);
    // console.log('Cooking Time:', cTime);
    // console.log('Calories:', calorie);

    const results = await new Promise((resolve, reject) => {
      db.all(sql, params, (err, results) => {
        if (err) {
          reject(err);
        } else {
          const extractedResults = results.map(result => ({
            Rname: result.Rname,
          }));
          resolve(extractedResults);
        }
      });
    });

    console.log('Query results:', results);

    if (results.length > 0) {
      // Recipes with the specified Rname exist
      res.json(results);
    } else {
      // No recipes found with the specified Rname
      res.json({ error: 'Recipe not found' });
    }
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Move the executeQuery function outside the route handling function
function executeQuery(sql, params) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        const extractedResults = results.map(result => ({
          Rname: result.Rname,
        }));
        resolve(extractedResults);
      }
    });
  });
}



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
