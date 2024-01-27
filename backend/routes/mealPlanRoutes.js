const express = require("express");
const router = express.Router();
const db = require("../db");
const isAuthenticated = require("../authMiddleware");

  // Backend route to fetch all meal plans
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


// Get details of a specific meal plan
router.get('/:mealplanName', async (req, res) => {
  console.log("testing1");
  const mealplanName = req.params.mealplanName;

  console.log("testing2");
  const query = 'SELECT * FROM MealPlan_FP WHERE MPname = ?';

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

  module.exports = router;
  