// filterRoutes.js

const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  console.log("testing");

  try {
    const dp_tags = JSON.parse(req.query.dietaryPreferences);
    const allergy_tags = JSON.parse(req.query.allergies);
    const cTime = req.query.cookingTime;
    const calorie = req.query.calories;

    const conditions = [];
    const params = [];

    if (dp_tags && dp_tags.length > 0) {
      conditions.push(`dp_tags IN (${dp_tags.map(() => '?').join(', ')})`);
      params.push(...dp_tags);
    }

    if (allergy_tags && allergy_tags.length > 0) {
      // Use AND to check that all allergies are present in the array
      conditions.push(`(${allergy_tags.map(() => 'allergy_tags LIKE ?').join(' AND ')})`);
      params.push(...allergy_tags.map(tag => `%${tag}%`));
    }

    if (cTime) {
      conditions.push('(cTime IS NULL OR cTime <= ?)');
      params.push(cTime);
    }

    if (calorie) {
      // Extracting numeric value from the 'calories' string
      const targetCalories = parseInt(calorie);

      // Using LIKE to match the numeric value in the 'calorie' column
      conditions.push('(calorie LIKE ? OR calorie IS NULL)');
      params.push(`%${targetCalories} kcal%`);
    }

    const conditionsString = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const sql = `SELECT Rname FROM Recipe_Np ${conditionsString}`;

    console.log("Executing SQL query:", sql);
    console.log("Query parameters:", params);

    db.all(sql, params, (err, rows) => {
      if (err) {
        console.error('Database query error:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      // Assuming you want to send the result back to the client
      res.json({ result: rows });
      console.log(rows); // Log the result to the console
    });
  } catch (error) {
    console.error('Error parsing JSON:', error.message);
    res.status(400).json({ error: 'Bad Request' });
  }
});

module.exports = router;
