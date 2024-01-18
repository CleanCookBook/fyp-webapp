const express = require('express');
const router = express.Router();
const db = require('../db');
const isAuthenticated = require("../authMiddleware");

router.post('/favorite', isAuthenticated, async (req, res) => {
  const userId = req.userId; // Use req.userId from authMiddleware
  const { recipeName, isFavorite } = req.body;

  try {
    console.log(`Received POST request to /favorite for user ${userId}, recipe ${recipeName}, isFavorite ${isFavorite}`);

    // Update your logic to mark/unmark the recipe as a favorite for the user
    console.log('Executing update logic...');

    // If the user is marking the recipe as a favorite, insert into the Bookmark table
    if (isFavorite) {
      console.log(`Inserting into Bookmark table for user ${userId}, recipe ${recipeName}...`);
      const insertBookmarkQuery = `
        INSERT INTO Bookmark (UserID, RName)
        VALUES (?, ?)
      `;

      db.run(insertBookmarkQuery, [userId, recipeName], function (err) {
        if (err) {
          console.error('Error inserting bookmark:', err.message);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          console.log('Bookmark inserted successfully.');
          res.status(200).json({ success: true, message: 'Favorite status updated successfully.' });
        }
      });
    } else {
      // Handle the case when the user is removing the recipe from favorites
      console.log('Handling case for removing the recipe from favorites...');
      // ...
    }
  } catch (error) {
    console.error('Error updating favorite status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/showFavorites', isAuthenticated, async (req, res) => {
    const userId = req.userId;
  
    try {
      // Fetch user's bookmarks from the Bookmark table
      const getBookmarksQuery = `
        SELECT RName
        FROM Bookmark
        WHERE UserID = ?
      `;
  
      console.log(`Fetching bookmarks for user ${userId}...`);
  
      const bookmarks = await new Promise((resolve, reject) => {
        db.all(getBookmarksQuery, [userId], (err, rows) => {
          if (err) {
            console.error('Error fetching bookmarks:', err);
            reject(err);
          } else {
            const recipeNames = rows.map(row => row.RName);
            console.log('Recipe names fetched successfully:', recipeNames);
            resolve(rows);
          }
        });
      });
  
      console.log('Sending bookmarks as the response:', bookmarks);
  
      res.status(200).json({ favorites: bookmarks });
    } catch (error) {
      console.error('Error fetching user bookmarks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post('/isFavorite', isAuthenticated, async (req, res) => {
    const userId = req.userId;
    const { recipeName } = req.body;

    try {
        // Check if the recipe is in the user's favorites
        const isFavoriteQuery = `
        SELECT COUNT(*) AS count
        FROM Bookmark
        WHERE UserID = ? AND RName = ?
      `;

        const isFavorite = await new Promise((resolve, reject) => {
            db.get(isFavoriteQuery, [userId, recipeName], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.count > 0);
                }
            });
        });

        res.status(200).json({ isFavorite });
    } catch (error) {
        console.error('Error checking if the recipe is a favorite:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add this route in your bookmark.js or another appropriate file
router.post('/removeFavorite', isAuthenticated, async (req, res) => {
    const userId = req.userId;
    const { recipeName } = req.body;

    try {
        // Remove the recipe from the user's favorites
        const removeFavoriteQuery = `
            DELETE FROM Bookmark
            WHERE UserID = ? AND RName = ?
        `;

        await new Promise((resolve, reject) => {
            db.run(removeFavoriteQuery, [userId, recipeName], (err) => {
                if (err) {
                    console.error('Error removing the recipe from favorites:', err);
                    reject(err);
                } else {
                    console.log('Recipe Removed from Favorites!');
                    resolve();
                }
            });
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error removing the recipe from favorites:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/username', isAuthenticated, async (req, res) => {
    const userId = req.userId;
  
    try {
      // Fetch user information, including first name
      const getUserInfoQuery = `
        SELECT FName
        FROM User
        WHERE UserID = ?
      `;
  
      const userInfo = await new Promise((resolve, reject) => {
        db.get(getUserInfoQuery, [userId], (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
  
      if (userInfo) {
        res.status(200).json({ firstName: userInfo.FName });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching user information:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;

