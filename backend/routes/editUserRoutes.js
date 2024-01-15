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

const aboutMeQuery = `
  SELECT
    height,
    Weight,
    allergy,
    BMI,
    DietMethod,
    DietaryPreferance,
    HealthGoal
  FROM
    AboutMe
  WHERE
    UserID = ?
`;

router.get('/userInfo/:userId', (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId);

    db.get(aboutMeQuery, [userId], (err, profileData) => {
      if (err) {
        console.error('Database query error:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      if (profileData) {
        res.json(profileData);
      } else {
        res.status(404).json({ error: 'Profile data not found' });
      }
    });
  } catch (error) {
    console.error('Error fetching profile data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/update-AboutMe/:userId', async (req, res) => {
  const userId = req.params.userId; // Get the user ID from the URL parameters

  const {
    DietaryPreferance,
    allergy,
    DietMethod,
    HealthGoal,
    height,
    Weight,
    BMI,
  } = req.body;

  try {
    // Assuming you have a table named 'AboutMe' with a column 'UserID' to identify the user
    const updateAboutMeQuery = `
      UPDATE AboutMe
      SET
        DietaryPreferance = ?,
        allergy = ?,
        DietMethod = ?,
        HealthGoal = ?,
        height = ?,
        Weight = ?,
        BMI = ?
      WHERE UserID = ?
    `;

    const params = [
      JSON.stringify(DietaryPreferance),
      JSON.stringify(allergy),
      JSON.stringify(DietMethod),
      JSON.stringify(HealthGoal),
      height,
      Weight,
      BMI,
      userId,
    ];

    db.run(updateAboutMeQuery, params, function (err) {
      if (err) {
        console.error('Database update error:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ success: true });
      }
    });
  } catch (error) {
    console.error('Error updating About Me:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  
  
  module.exports = router;