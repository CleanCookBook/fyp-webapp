const express = require('express');
const router = express.Router();
const db = require('../db');

const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    req.userId = req.session.userId;
    return next();
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
};

// API endpoint for handling feedback submissions
router.post('/feedbackForm', isAuthenticated, (req, res) => {
  console.log("testing");
  const { userId, feedbackType, comments } = req.body;

  // Insert feedback data into the Feedback table
  db.run('INSERT INTO Feedback (UserId, FeedbackType, Feedback) VALUES (?, ?, ?)', [userId, feedbackType, comments], function (err) {
    if (err) {
      console.error("Error inserting feedback into the database:", err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Feedback inserted successfully with ID:", this.lastID);
      res.status(200).send("Feedback submitted successfully");
    }
  });
});

module.exports = router;