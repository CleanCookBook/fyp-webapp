// recipeRoutes.js

const express = require("express");
const router = express.Router();
const multer = require("multer");
const db = require("../db");


// Assuming 'uploads' is the folder where you want to save the images

const storage = multer.memoryStorage(); // Use memory storage for handling in-memory file processing
const upload = multer({ storage: storage });


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

let temporaryRecipeData = null;

router.post('/createRecipe', upload.fields([
  { name: 'recipeImage', maxCount: 1 }, // Assuming 'recipeImage' is the field name for the image
]), (req, res) => {
  try {
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
      description, allergy_tags, dp_tags, tips_tricks, info, cTime, calorie
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
    recipeData.nutritionalFacts                           // calorie (you need to update this based on your needs)
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

  // const recipeData = req.body;
  // console.log("Received createRecipe data:", recipeData);

  // // Check if a recipe with the same name already exists
  // const checkRecipeQuery = "SELECT * FROM Recipe_Np WHERE Rname = ?";
  // db.get(checkRecipeQuery, [recipeData.recipeName], (err, existingRecipe) => {
  //   if (err) {
  //     console.error("Database query error:", err.message);
  //     res.status(500).json({ error: "Internal Server Error" });
  //     return;
  //   }

  //   if (existingRecipe) {
  //     // Recipe with the same name exists, return an error
  //     res.status(400).json({ error: "Recipe with the same name already exists" });
  //   } else {
  //     // Recipe does not exist, proceed with creating the recipe
  //     res.status(200).json({ success: true });

  //     const insertRecipeQuery = `
  //       INSERT INTO Recipe_Np (Rname, image, description, cTime, ingredients, instruction, calorie, info, tips_tricks)
  //       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  //     `;

  //     db.run(
  //       insertRecipeQuery,
  //       [
  //         recipeData.recipeName, 
  //         recipeData.imageUrl, 
  //         recipeData.recipeDescription, 
  //         recipeData.cookingTime, 
  //         recipeData.recipeIngredients,
  //         recipeData.recipeSteps,
  //         recipeData.nutritionalFacts,
  //         recipeData.funFacts,
  //         recipeData.tips,
  //       ],
  //       function (err) {
  //         if (err) {
  //           console.error('Error creating recipe:', err.message);
  //           res.status(500).json({ error: 'Internal Server Error' });
  //           return;
  //         }

  //         res.status(201).json({ success: true, message: 'Recipe created successfully.' });
  //       }
  //     );
  //   }
  // });



// router.post('/createRecipe', (req, res) => {
//   const recipeData = req.body;
//   console.log("Received createRecipe data:", recipeData);

//   // // Check if a recipe with the same name already exists
//   // const checkRecipeQuery = "SELECT * FROM Recipe_Np WHERE Rname = ?";
//   // db.get(checkRecipeQuery, [recipeData.recipeName], (err, existingRecipe) => {
//   //   if (err) {
//   //     console.error("Database query error:", err.message);
//   //     res.status(500).json({ error: "Internal Server Error" });
//   //     return;
//   //   }

//     // if (existingRecipe) {
//     //   // Recipe with the same name exists, return an error
//     //   res.status(400).json({ error: "Recipe with the same name already exists" });
//     // } else {
//       // Recipe does not exist, proceed with creating the recipe
//       // const insertRecipeQuery = `
//       //   INSERT INTO Recipe_Np (Rname, image, description, cTime, ingredients)
//       //   VALUES (?, ?, ?, ?, ?)
//       // `;

//       db.run(
//         insertRecipeQuery,
//         [recipeData.recipeName, recipeData.imageUrl, recipeData.recipeDescription, recipeData.cookingTime, recipeData.recipeIngredients],
//         function (err) {
//           if (err) {
//             console.error('Error creating recipe:', err.message);
//             res.status(500).json({ error: 'Internal Server Error' });
//             return;
//           }

//           res.status(201).json({ success: true, message: 'Recipe created successfully.' });
//         }
//       );
//     }
//   );


// // Create a new recipe
// router.post('/createRecipe', async (req, res) => {
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

// router.get('/filter', async (req, res) => {
//   const { dietaryPreferences, allergies, cookingTime, calories } = req.query;

//   try {
//     let sql = 'SELECT * FROM Recipe_Np WHERE 1=1';

//     if (dietaryPreferences) {
//       sql += ` AND diet IN (${dietaryPreferences.map(() => '?').join(',')})`;
//     }

//     if (allergies) {
//       sql += ` AND allergies IN (${allergies.map(() => '?').join(',')})`;
//     }

//     if (cookingTime) {
//       sql += ' AND cookingTime <= ?';
//     }

//     if (calories) {
//       sql += ' AND calories <= ?';
//     }

//     const params = [...dietaryPreferences, ...allergies, cookingTime, calories].filter(Boolean);

//     console.log('Executing SQL query:', sql);
//     console.log('Query parameters:', params);

//     db.all(sql, params, (err, results) => {
//       if (err) {
//         console.error('Error fetching filtered recipes:', err.message);
//         res.status(500).json({ error: 'Internal Server Error' });
//         return;
//       }

//       console.log('Query results:', results);

//       res.json(results);
//     });
//   } catch (error) {
//     console.error('Error fetching filtered recipes:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

module.exports = router;
