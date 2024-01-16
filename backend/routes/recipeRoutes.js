// recipeRoutes.js

const express = require("express");
const router = express.Router();
const multer = require("multer");
const db = require("../db");
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
};


// Assuming 'uploads' is the folder where you want to save the images

const storage = multer.memoryStorage(); // Use memory storage for handling in-memory file processing
const upload = multer({ storage: storage });

let temporaryRecipeData = null;

router.post('/createRecipe', upload.fields([
  { name: 'recipeImage', maxCount: 1 },
]), isAuthenticated, (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized access' });
      return;
    }
    // Access the uploaded image using the specified field name
    const uploadedImage = req.files['recipeImage'][0];

    // Access other form fields
    const { recipeName, recipeDescription, cookingTimeValue, recipeIngredients } = req.body;

    // Store the data temporarily
    temporaryRecipeData = {
      recipeName,
      recipeDescription,
      cookingTimeValue,
      recipeIngredients,
      uploadedImage,
      userId,
    };

    // Process the data as needed
    console.log("Received data:", temporaryRecipeData)

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error processing recipe data:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});



router.post('/createRecipeSecond', (req, res) => {
  const recipeData = req.body;
  console.log("Received data:", recipeData);
  const FirstRecipeData = temporaryRecipeData;
  console.log("First Data:",FirstRecipeData)

  // Assuming "Recipe_Np" table structure matches the provided schema
  const sql = `
    INSERT INTO Recipe_Np (
      Rname, instruction, ratings, review, ingredients, image,
      description, allergy_tags, dp_tags, tips_tricks, info, cTime, calorie, UserID
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    FirstRecipeData.recipeName,
    recipeData.recipeSteps,      // instruction
    "",                          // ratings (empty for now, update based on your needs)
    "",                          // review (empty for now, update based on your needs)
    FirstRecipeData.recipeIngredients,// ingredients
    FirstRecipeData.uploadedImage.buffer,         // image
    FirstRecipeData.recipeDescription,
    "",                          // allergy_tags (empty for now, update based on your needs)
    "",                          // dp_tags (empty for now, update based on your needs)
    recipeData.tips,             // tips_tricks (empty for now, update based on your needs)
    recipeData.funFacts,         // info (empty for now, update based on your needs)
    FirstRecipeData.cookingTimeValue,
    recipeData.nutritionalFacts,
    FirstRecipeData.userId,                           // calorie (you need to update this based on your needs)
  ];

  console.log("SQL Statement:", sql);
  console.log("Values:", values);

  db.run(sql, values, function (err) {
    if (err) {
      console.error("Error inserting recipe:", err.message);
      res.status(500).json({ success: false, error: err.message });
    } else {
      console.log(`Recipe inserted with ID ${this.lastID}`);
      res.status(200).json({ success: true });
    }
  });
});

  


// Search for recipes
router.get('/search', async (req, res) => {
  const { query } = req.query;

    // const sql = 'SELECT * FROM Recipe_Np WHERE Rname is not null and Rname LIKE ?';
    // const params = `%${query}%`;

    // Function to execute a SQL query and return a promise
    function executeQuery(sql, params) {
      return new Promise((resolve, reject) => {
        db.all(sql, params, (err, results) => {
          if (err) {
            reject(err);
          } else {
            // Extract only the desired columns for each result
            const extractedResults = results.map(result => ({
              Rname: result.Rname,
            }));
            resolve(extractedResults);
          }
        });
      });
    }

    // Function to retrieve all recipes
    async function getRecipes() {
      // const sql = 'SELECT * FROM Recipe_Np';
      const sql = 'SELECT * FROM Recipe_Np WHERE Rname is not null and Rname LIKE ?';
      const params = `%${query}%`;

      try {
        // const results = await executeQuery(sql, []);
        const results = await executeQuery(sql, params);

        return results;
      } catch (error) {
        throw new Error('Error fetching recipes: ' + error);
      }
    }

    try {
      // Call the getRecipes function to retrieve all recipes
      const recipes = await getRecipes(); console.log("recipes", recipes);
  
      // res.json(recipes);

      if (recipes.length > 0) {
        // Recipes with the specified Rname exist
        res.json(recipes);
      } else {
        // No recipes found with the specified Rname
        res.json({ error: 'Recipe not found' });
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get details of a specific recipe
router.get('/:recipeName', async (req, res) => {
  const recipeName = req.params.recipeName;

  // Fetch the description and image from the database based on the recipeName
  const query = 'SELECT description, image, ratings, ingredients, instruction, info, calorie, tips_tricks, cTime FROM Recipe_Np WHERE Rname = ?';

  db.get(query, [recipeName], (err, result) => {
    if (err) {
      console.error('Error fetching recipe details:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (result) {
      res.json({ description: result.description, image: result.image, ratings: result.ratings, 
        ingredients:result.ingredients, instruction:result.instruction, info:result.info, 
        calorie:result.calorie,tips_tricks:result.tips_tricks, cTime:result.cTime });
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  });
});

  

module.exports = router;
