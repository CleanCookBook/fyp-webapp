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

  router.get("/:userID", async (req, res) => {
    const userID = req.params.userID;

    // Fetch user details from the database based on the userID
    const query = "SELECT * FROM User WHERE UserID = ?";

    db.get(query, [userID], (err, user) => {
        if (err) {
            console.error("Error fetching user details:", err.message);
            res.status(500).json({ success: false, error: "Internal Server Error" });
            return;
        }

        if (user) {
            res.json({ success: true, user });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    });
});

// Import necessary modules
// Update user details
router.post("/update-profile", async (req, res) => {
  const updatedDetails = req.body; // Assuming your request body contains the updated details
  console.log(updatedDetails)

  try {
    // Update User table with the new details
    await db.run(
      "UPDATE User SET Username = ?, FName = ?, LName = ?, dob = ?, gender = ?, email = ? WHERE UserID = ?", 
      [
        updatedDetails.username,
        updatedDetails.FName,
        updatedDetails.LName,
        updatedDetails.dob,
        updatedDetails.gender,
        updatedDetails.email,
        // Assuming you're storing UserID in the database
        // Adjust this based on your actual primary key
        // If your primary key is different, replace 'UserID' with the correct column name
        updatedDetails.UserID,
      ]
    );
    

    console.log("User details updated successfully");
    res.json({ success: true, message: "User details updated successfully." });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;







  
  
  module.exports = router;