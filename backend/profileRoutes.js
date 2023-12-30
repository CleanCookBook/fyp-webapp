// profileRoutes.js
const express = require('express');
const router = express.Router();
const db = require('./db'); // Import your database module here

const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
};

// Route for fetching user profile
router.get('/', isAuthenticated, (req, res) => {
  const userId = req.session.userId;

  // Query your database to retrieve user profile data
  const profileQuery = `
    SELECT Username, dob, gender, email, FName, LName
    FROM User
    WHERE UserID = ?
  `;

  db.get(profileQuery, [userId], (err, userProfile) => {
    if (err) {
      console.error('Database query error:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (userProfile) {
      res.json({ userProfile });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });
});

// Route for updating user profile
router.post('/update-profile', isAuthenticated, (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    res.status(401).json({ error: 'Unauthorized access' });
    return;
  }

  const { name, dob, gender, email } = req.body;

  // Perform the database update with the new data
  const updateProfileQuery = `
    UPDATE User
    SET FName = ?, LName = ?, dob = ?, gender = ?, email = ?
    WHERE UserID = ?
  `;

  db.run(
    updateProfileQuery,
    [...name.split(' '), dob, gender, email, userId],
    (err) => {
      if (err) {
        console.error('Error updating profile:', err.message);
        res.status(500).json({ error: `Internal Server Error: ${err.message}` });
      } else {
        res.json({ success: true });
      }
    }
  );
});

module.exports = router;
