const express = require("express");
const router = express.Router();
const db = require("../db");


router.delete("/:userID", async (req, res) => {
    const userID = req.params.userID;
    console.log("Received DELETE request for userID:", userID);
  
    try {
      await db.run("BEGIN TRANSACTION");
  
      // Delete from AboutMe table
      await db.run("DELETE FROM AboutMe WHERE UserID = ?", [userID]);
  
      // Delete from User table
      await db.run("DELETE FROM User WHERE UserID = ?", [userID]);
  
      await db.run("COMMIT");
      console.log("Transaction committed successfully");
  
      res.json({ success: true, message: "User and related AboutMe record deleted successfully." });
    } catch (error) {
      await db.run("ROLLBACK");
      console.error("Error deleting user and AboutMe record:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.delete("/partner/:userID", async (req, res) => {
    const userID = req.params.userID;
    console.log("Received DELETE request for partner userID:", userID);
  
    try {
      await db.run("BEGIN TRANSACTION");
  
      // Delete from NutritionistSignUp table
      await db.run("DELETE FROM NutritionistSignUp WHERE UserID = ?", [userID]);
  
      // Delete from User table
      await db.run("DELETE FROM User WHERE UserID = ?", [userID]);
  
      await db.run("COMMIT");
      console.log("Transaction committed successfully");
  
      res.json({ success: true, message: "Partner and related records deleted successfully." });
    } catch (error) {
      await db.run("ROLLBACK");
      console.error("Error deleting partner and related records:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

  router.patch('/approve/:userId', async (req, res) => {
    const { userId } = req.params;
    const { status } = req.body;
  
    try {
      const result = await new Promise((resolve, reject) => {
        db.run('UPDATE NutritionistSignUp SET Status = ? WHERE UserID = ?', [status, userId], (err) => {
          if (err) {
            reject(err);
          } else {
            resolve({ success: true });
          }
        });
      });
  
      if (result.success) {
        res.json({ success: true, message: `User with ID ${userId} status updated successfully` });
      } else {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  
  
  module.exports = router;