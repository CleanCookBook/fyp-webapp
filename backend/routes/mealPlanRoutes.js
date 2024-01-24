const express = require("express");
const router = express.Router();
const db = require("../db");
const isAuthenticated = require("../authMiddleware");

router.get("/", isAuthenticated, async (req, res) => {
    try {
      // Assuming that the user ID is stored in the session
      const userId = req.session.userId;
  
      // Fetch recipes based on the user ID
      const userRecipes = await db.query(
        'SELECT "Rname" FROM "Recipe_Np" WHERE "UserID" = $1',
        [userId]
      );
  
      // Extract recipe names from the result
      const recipeOptions = userRecipes.rows.map((recipe) => recipe.Rname);
  
      res.json({ recipeOptions });
      console.log("Recipe Options:",recipeOptions)
    } catch (error) {
      console.error("Error fetching recipes:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  module.exports = router;
  