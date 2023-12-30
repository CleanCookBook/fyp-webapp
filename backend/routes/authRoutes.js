// authRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Import your database module here
const crypto = require('crypto');

// Middleware to check if the user is authenticated
module.exports = (isAuthenticated) => {
  // Route to check if the user is authenticated
  router.get('/check-auth', isAuthenticated, (req, res) => {
    res.status(200).json({ message: 'Authenticated' });
  });

  // Route for user login
  router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM User WHERE Username = ? AND password = ?';
    db.get(query, [username, password], (err, user) => {
      if (err) {
        console.error('Database query error:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      if (user) {
        req.session.userId = user.UserID;
        res.json({ message: 'Login successful', user });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    });
  });

  // Route for user logout
  router.get('/logout', isAuthenticated, (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json({ message: 'Logout successful' });
    });
  });

  return router;
};
