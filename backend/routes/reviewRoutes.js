// reviewRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:recipeName', async (req, res) => {
  const { recipeName } = req.params;

  const query = `
    SELECT review.comment, user.Username
    FROM review
    INNER JOIN User ON review.UserID = User.UserID
    WHERE review.Rname = ?
  `;

  try {
    const reviews = await new Promise((resolve, reject) => {
      db.all(query, [recipeName], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(rows);
      });
    });

    res.json({ reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
