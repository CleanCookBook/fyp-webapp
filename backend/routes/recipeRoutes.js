// recipeRoutes.js

const express = require("express");
const router = express.Router();
const db = require("../db");

// Search for recipes
router.get('/search', async (req, res) => {
  const { query } = req.query;
  console.log('Received query:', query);

  try {
    const sql = 'SELECT * FROM Recipe_Np WHERE Rname LIKE ?';
    const params = `%${query}%`;

    console.log('Executing SQL query:', sql);
    console.log('Query parameters:', params);

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

    const results = await executeQuery(sql, params);

    console.log('Query results:', results);

    if (results.length > 0) {
      // Recipes with the specified Rname exist
      res.json(results);
    } else {
      // No recipes found with the specified Rname
      res.json({ error: 'Recipe not found' });
    }
  } catch (error) {
    console.error('Error fetching search results:', error);
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
