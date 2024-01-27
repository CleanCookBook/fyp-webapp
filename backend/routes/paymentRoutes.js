const express = require('express');
const router = express.Router();
const db = require('../db'); // Import your database module here
const isAuthenticated = require("../authMiddleware");

router.post('/updatePaidStatus', isAuthenticated, async (req, res) => {
  const userId = req.userId;
  const { status } = req.body;

  // Logging the status and userId for debugging
  console.log('Status:', status);

  try {
    // Update the bookmark entry in the database
    const updatePaymentQuery = `
      UPDATE User
      SET Paid = ?
      WHERE UserID = ?
    `;

    await new Promise((resolve, reject) => {
      db.run(updatePaymentQuery, [status, userId], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    res.status(200).json({ message: 'Paid status updated successfully' });
  } catch (error) {
    console.error('Error updating Paid status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;