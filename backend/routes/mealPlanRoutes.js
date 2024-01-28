const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const isAuthenticated = require("../authMiddleware");

router.get("/recipe", isAuthenticated, async (req, res) => {
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

router.get("/name", isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.userId;

    const mealPlans = await new Promise((resolve, reject) => {
      db.all(
        'SELECT "ID", "MPName" FROM "MealPlan_FP" WHERE "UserID" = ?',
        [userId],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });

    res.json({ mealPlans });
  } catch (error) {
    console.error("Error fetching meal plans:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/Fp', async (req, res) => {
  try {
    const query = 'SELECT MPName, MP_Image FROM MealPlan_FP';

    const mealPlans = await new Promise((resolve, reject) => {
      db.all(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          // Modify the results to include base64-encoded image data
          const modifiedResults = results.map((plan) => {
            const base64Image = plan.MP_Image.toString("base64");
            return {
              MPName: plan.MPName,
              MP_Image: `data:image/jpeg;base64,${base64Image}`,
            };
          });

          resolve(modifiedResults);
        }
      });
    });

    res.json({ mealPlans });
  } catch (error) {
    console.error('Error fetching meal plans:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/:mealplanName', async (req, res) => {
  console.log("test");
  const selectedMealplanName = req.params.mealplanName;
  const query = 'SELECT MPName, description FROM MealPlan_FP WHERE MPName = ?';

  try {
    const result = await new Promise((resolve, reject) => {
      db.get(query, [selectedMealplanName], (err, queryResult) => {
        if (err) {
          console.error('Error fetching meal plan details:', err.message);
          reject(err);
        } else {
          console.log('Result:', queryResult);
          console.log("Meal Plan Name:", selectedMealplanName);

          resolve(queryResult);
        }
      });
    });

    if (result) {
      return res.json({
        MPName: result.MPName,
        description: result.description
      });
    } else {
      return res.status(404).json({ error: 'Meal plan not found' });
    }
  } catch (error) {
    console.error('Unexpected error:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
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

  router.get('/mealplans', async (req, res) => {
    try {
      console.log("testing");
      const query = 'SELECT MPname FROM MealPlan_FP';
      db.all(query, (err, results) => {
        if (err) {
          console.error('Error fetching meal plans:', err.message);
          res.status(500).json({ error: 'Internal Server Error', details: err.message });
          return;
        }
        console.log("testing8");
        const mealPlans = results.map((row) => row.MPname);
        res.json({ mealPlans });
      });
      console.log("testing11");
    } catch (error) {
      console.error('Unexpected error:', error.message);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  });

  router.get('/:mealplanName', async (req, res) => {
    console.log("testing1");
    const mealplanName = req.params.mealplanName;
  
    console.log("testing2");
    const query = 'SELECT * FROM MealPlan_FP WHERE MPName = ?';
  
    db.get(query, [mealplanName], (err, result) => {
      if (err) {
        console.error('Error fetching meal plan details:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      if (result) {
        res.json({ 
          description: result.description
        });
      } else {
        res.status(404).json({ error: 'Meal plan not found' });
      }
    });
  });

  router.get('/:mealplanName/recipes', async (req, res) => {
    const mealplanName = req.params.mealplanName;
  
    console.log(`Fetching recipes for meal plan: ${mealplanName}`);
  
    const query = 'SELECT Recipe1, Recipe2, Recipe3 FROM MealPlan_FP WHERE MPname = ?';
  
    try {
      const result = await new Promise((resolve, reject) => {
        db.get(query, [mealplanName], (err, queryResult) => {
          if (err) {
            console.error('Error fetching meal plan recipes:', err.message);
            reject(err);
          } else {
            console.log('Meal plan recipes fetched successfully');
            resolve(queryResult);
          }
        });
      });
  
      if (result) {
        const recipes = {
          Recipe1: result.Recipe1 ? JSON.parse(result.Recipe1) : [],
          Recipe2: result.Recipe2 ? JSON.parse(result.Recipe2) : [],
          Recipe3: result.Recipe3 ? JSON.parse(result.Recipe3) : [],
        };
  
        console.log('Recipes:', recipes);
  
        res.json({ recipes });
      } else {
        console.log('Meal plan not found');
        res.status(404).json({ error: 'Meal plan not found' });
      }
    } catch (error) {
      console.error('Unexpected error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post('/api/updateMealPlan', async (req, res) => {
    try {
      const { userID, dayOfWeek, updatedInfo } = req.body;
  
      // Perform the database update here based on the provided parameters
  
      // Respond with a success message
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error updating meal plan:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  

module.exports = router;
