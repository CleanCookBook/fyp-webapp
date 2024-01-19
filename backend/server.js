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
  // console.log("testing4");

  // try {
    // let dp_tags = req.query.dietaryPreferences.split(',');
    let dp_tags = JSON.parse(req.query.dietaryPreferences);console.log('tes',dp_tags);
    let allergy_tags = req.query.allergies.split(',');
    let cTime = req.query.cookingTime;
    let calorie = req.query.calories;
    let params = "Halal";


    console.log("req.query:", req.query);
    const sql = "SELECT * FROM Recipe_Np WHERE dp_tags LIKE '%"+params+"'";
  //   // const sql = 'SELECT * FROM Recipe_Np WHERE dp_tags LIKE ? AND allergy_tags LIKE ? AND cTime <= ? AND calorie <= ?';
  //   // const params = [
  //   //   `%${dp_tags.join(',')}%`,
  //   //   `%${allergy_tags.join(',')}%`,
  //   //   cTime,
  //   //   calorie
  //   // ];

  //   console.log("testing3");
    console.log('Executing SQL query:', sql);
  //   console.log('Query parameters:', params);

  //   // Function to execute a SQL query and return a promise
  //   function executeQuery(sql, params) {
  //     return new Promise((resolve, reject) => {
  //       db.all(sql, params, (err, results) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           // Extract only the desired columns for each result
  //           const extractedResults = results.map(result => ({
  //             Rname: result.Rname,
  //           }));
  //           resolve(extractedResults);
  //         }
  //       });
  //     });
  //   }

  //   // Function to retrieve all recipes
  //   async function getRecipes() {
  //     const sql = 'SELECT * FROM Recipe_Np';

  //     try {
  //       const results = await executeQuery(sql, []);

  //       return results;
  //     } catch (error) {
  //       throw new Error('Error fetching recipes: ' + error);
  //     }
  //   }

  //   try {
  //     // Call the getRecipes function to retrieve all recipes
  //     const recipes = await getRecipes();
  
  //     res.json(recipes);
  //   } catch (error) {
  //     console.error('Error fetching recipes:', error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }

  //   const results = await executeQuery(sql, params);

  //   console.log('Query results:', results);

  //   if (results.length > 0) {
  //     // Recipes with the specified Rname exist
  //     res.json(results);
  //   } else {
  //     // No recipes found with the specified Rname
  //     res.json({ error: 'Recipe not found' });
  //   }
  // } catch (error) {
  //   console.error('Error fetching search results:', error);
  //   res.status(500).json({ error: 'Internal Server Error' });
  // }
});

// // Create a new recipe
// app.post('/api/createRecipe', async (req, res) => {
//   console.log(req.body);
//   console.log('Received createRecipe request:', req.body);

//   try {
//     const {
//       recipeName,
//       imageUrl,
//       recipeDescription,
//       cookingTime,
//       recipeIngredients
//     } = req.body;

//     // Insert data into the database
//     const insertQuery = `
//       INSERT INTO Recipe_Np (Rname, image, description, cTime, ingredients)
//       VALUES (?, ?, ?, ?, ?)
//     `;

//     db.run(
//       insertQuery,
//       [recipeName, imageUrl, recipeDescription, cookingTime, recipeIngredients],
//       function (err) {
//         if (err) {
//           console.error('Error creating recipe:', err.message);
//           res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//           res.status(201).json({ success: true, message: 'Recipe created successfully.' });
//         }
//       }
//     );
//   } catch (error) {
//     console.error('Error creating recipe:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
  
  // Your filter parameters
  // let params = [req.query.dietaryPreferences, req.query.allergies, req.query.cookingTime, req.query.calories];
  // console.log(req.query.dietaryPreferences);
  // console.log(params.dietaryPreferences);

  // // Your SQL query
  // let sql = 'SELECT * FROM Recipe_Np WHERE 1=1';
  // //let sql = `SELECT * FROM Recipe_Np WHERE dp_tags = "Halal"`;
  // //let sql = `SELECT * FROM Recipe_Np WHERE dp_tags = ? AND allergy_tags = ? AND cTime <= ? AND calorie <= ?`;
  // console.log(sql);
  
  // db.all(sql, params, (err, rows) => {
  //   if (err) {
  //     throw err;
  //   }
  //   res.json(rows);
  // });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
