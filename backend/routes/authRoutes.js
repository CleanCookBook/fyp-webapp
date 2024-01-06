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
        console.log('User:', user);
  
        if (user.UserType === 'nutritionist') {
          // Check NutritionistSignUp table for pending status
          const nutritionistQuery = 'SELECT * FROM NutritionistSignUp WHERE UserID = ?';
          db.get(nutritionistQuery, [user.UserID], (err, nutritionistData) => {
            if (err) {
              console.error('Database query error:', err.message);
              res.status(500).json({ error: 'Internal Server Error' });
              return;
            }
  
            console.log('Nutritionist Data:', nutritionistData);
  
            if (nutritionistData && nutritionistData.Status === 'Pending') {
              console.log('Nutritionist account is pending');
              res.status(401).json({ error: 'Nutritionist account is pending approval' });
            } else {
              console.log('Login successful');
              req.session.userId = user.UserID;
              res.json({ message: 'Login successful', user });
            }
          });
        } else {
          console.log('Login successful for non-nutritionist user');
          // For non-nutritionist users, proceed with login
          req.session.userId = user.UserID;
          res.json({ message: 'Login successful', user });
        }
      } else {
        console.log('Invalid credentials');
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
