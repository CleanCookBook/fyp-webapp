const express = require("express");
const router = express.Router();
const db = require("../db");
const fs = require("fs");
const multer = require("multer");
const isAuthenticated = require("../authMiddleware");

router.get("/", isAuthenticated, async (req, res) => {
  try {
    // Assuming that the user ID is stored in the session
    const userId = req.session.userId;

    // Fetch recipes based on the user ID using a promise
    const recipeOptions = await new Promise((resolve, reject) => {
      db.all(
        'SELECT "Rname" FROM "Recipe_Np" WHERE "UserID" = ?',
        [userId],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            const recipeNames = rows.map((row) => row.Rname);
            resolve(recipeNames);
          }
        }
      );
    });

    res.json({ recipeOptions });
    console.log("Recipe Options:", recipeOptions);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const storage = multer.memoryStorage(); // Store image as buffer in memory
const upload = multer({ storage: storage });

router.post("/upload", isAuthenticated, upload.single("MP_Image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    let mealPlanName,
      mealPlanDescription,
      selectedDpTags,
      selectedAllergyTags,
      currentUser;
      
    if (req.is("application/json")) {
      // If the content type is JSON, parse the data from req.body
      ({
        mealPlanName,
        mealPlanDescription,
        selectedDpTags,
        selectedAllergyTags,
        currentUser,
        recipeArray1,
        recipeArray2,
        recipeArray3,
      } = req.body);
    } else {
      // If the content type is form data, use the existing approach
      mealPlanName = req.body.mealPlanName;
      mealPlanDescription = req.body.mealPlanDescription;
      selectedDpTags = req.body.selectedDpTags;
      selectedAllergyTags = req.body.selectedAllergyTags;
      currentUser = req.body.currentUser;
    }

    const mealPlanImageBuffer = req.file.buffer;

    // Convert the recipes arrays from strings to actual arrays
    const recipeArray1 = JSON.parse(req.body.recipeArray1);
    const recipeArray2 = JSON.parse(req.body.recipeArray2);
    const recipeArray3 = JSON.parse(req.body.recipeArray3);

    // Insert data into the "MealPlan_FP" table
    const insertQuery = `
      INSERT INTO MealPlan_FP
      (MPName, MP_Image, allergy_tags, description, Recipe1, Recipe2, Recipe3, UserID, DP_tags)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const userId = req.session.userId; // Assuming currentUser has the UserID

    await db.run(insertQuery, [
      mealPlanName,
      mealPlanImageBuffer,
      Array.isArray(selectedAllergyTags)
        ? selectedAllergyTags.join(",")
        : selectedAllergyTags,
      mealPlanDescription,
      JSON.stringify(recipeArray1), // Recipe1
      JSON.stringify(recipeArray2), // Recipe2
      JSON.stringify(recipeArray3), // Recipe3
      userId,
      Array.isArray(selectedDpTags)
        ? selectedDpTags.join(",")
        : selectedDpTags,
    ]);

    res.status(201).json({ message: "Meal plan created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
