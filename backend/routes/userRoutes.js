const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require('multer');


let userData = null;
let userData1 = null;
let userData2 = null;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Move the upload middleware here
router.post("/upload", upload.fields([
  { name: 'licenseImage', maxCount: 1 },
  { name: 'userPhoto', maxCount: 1 },
  { name: 'experienceFile', maxCount: 1 },
  { name: 'testimonyFile', maxCount: 1 }
]), (req, res) => {
  console.log("Received files:", req.files);
  // Access the uploaded files using req.files
  const licenseImage = req.files['licenseImage'][0];
  const userPhoto = req.files['userPhoto'][0];
  const experienceFile = req.files['experienceFile'][0];
  const testimonyFile = req.files['testimonyFile'][0];

  userData2 = {
    
    licenseImage: licenseImage,
    userPhoto: userPhoto,
    experienceFile: experienceFile,
    testimonyFile: testimonyFile,
  };

  res.json({ message: 'Files uploaded successfully' });
});

router.post("/signup", (req, res) => {
  userData = req.body;
  console.log("Received signup data:", userData);

  // Check if a user with the same username already exists
  const checkUserQuery = "SELECT * FROM User WHERE Username = ?";
  db.get(checkUserQuery, [userData.username], (err, user) => {
    if (err) {
      console.error("Database query error:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (user) {
      // User with the same username exists, return an error
      res.status(400).json({ error: "Username already exists" });
    } else {
      // User does not exist, proceed with signup
      res.status(200).json({ success: true });
    }
  });
});

router.post("/quiz", (req, res) => {
  userData1 = req.body;
  console.log("Received quiz data:", userData1);
  res.status(200).json({ success: true });
});

router.post("/create-account-n", (req, res) => {
  const isChecked = req.body.checked;

  if (isChecked) {
    console.log("Terms are accepted.");
    console.log("userData:", userData);
    console.log("userData1:", userData2);

    if (userData && userData2) {
      // Insert data into the "User" table
      db.run(
        "INSERT INTO User (Username, password, email, FName, LName, gender, dob, UserType) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          userData.username,
          userData.password,
          userData.email,
          userData.firstName,
          userData.lastName,
          userData.gender,
          userData.dob,
          userData.userType, // Set the user type to 'nutritionist'
        ],
        function (err) {
          if (err) {
            console.error("Error inserting into User table:", err.message);
            res.status(500).json({ error: "Internal Server Error" });
            return;
          }

          // Insert data into the "NutritionistSignUp" table
          const userId = this.lastID; // ID of the last inserted row in the "User" table
          const {
            linkedInURL,
            licenseImage,
            userPhoto,
            experienceFile,
            testimonyFile,
          } = userData2;

          db.run(
            "INSERT INTO NutritionistSignUp (UserID, LinkedInURL, LicenseImage, UserPhoto, ExperienceFile, TestimonyFile) VALUES (?, ?, ?, ?, ?, ?)",
            [
              userId,
              linkedInURL,
              licenseImage.buffer, // Assuming licenseImage is a multer file object
              userPhoto.buffer,    // Assuming userPhoto is a multer file object
              experienceFile.buffer,// Assuming experienceFile is a multer file object
              testimonyFile.buffer, 
            ],
            function (err) {
              if (err) {
                console.error(
                  "Error inserting into NutritionistSignUp table:",
                  err.message
                );
                res.status(500).json({ error: "Internal Server Error" });
                return;
              }
              // Reset userData and userData1 after successful insertion
              userData = null;
              userData2 = null;

              res.status(200).json({ success: true });
            }
          );
        }
      );
    } else {
      res
        .status(400)
        .json({ error: "Data not received from signup and quiz pages or username already taken" });
    }
  } else {
    res.status(400).json({ error: "Terms not accepted" });
  }
});

router.post("/create-account", (req, res) => {
  const isChecked = req.body.checked;
  
  if (isChecked) {
    console.log("Terms are accepted.");
    console.log("userData:", userData);
    console.log("userData1:", userData1);

    if (userData && userData1) {
      // Insert data into the "User" table
      db.run(
        "INSERT INTO User (Username, password, email, FName, LName, gender, dob, UserType) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          userData.username,
          userData.password,
          userData.email,
          userData.firstName,
          userData.lastName,
          userData.gender,
          userData.dob,
          userData.userType
        ],
        function (err) {
          if (err) {
            console.error("Error inserting into User table:", err.message);
            res.status(500).json({ error: "Internal Server Error" });
            return;
          }

          // Insert data into the "AboutMe" table
          const userId = this.lastID; // ID of the last inserted row in the "User" table
          const {
            currentWeight,
            currentHeight,
            dietaryPreferences,
            allergies,
            cookingTime,
            healthGoals,
            dietMethods,
          } = userData1;

          // Calculate BMI
          const heightInMeters = currentHeight / 100;
          const bmi = (currentWeight / (heightInMeters * heightInMeters)).toFixed(2);

          db.run(
            "INSERT INTO AboutMe (height, Weight, allergy, BMI, UserID, cookingTime, DietMethod, DietaryPreferance, HealthGoal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
              currentHeight,
              currentWeight,
              JSON.stringify(allergies),
              bmi, // Include BMI in the array of values
              userId,
              JSON.stringify(cookingTime),
              JSON.stringify(dietMethods),
              JSON.stringify(dietaryPreferences),
              JSON.stringify(healthGoals),
            ],
            function (err) {
              if (err) {
                console.error(
                  "Error inserting into AboutMe table:",
                  err.message
                );
                res.status(500).json({ error: "Internal Server Error" });
                return;
              }
              // Reset userData and userData1 after successful insertion
              userData = null;
              userData1 = null;

              res.status(200).json({ success: true });
            }
          );
        }
      );
    } else {
      res
        .status(400)
        .json({ error: "Data not received from signup and quiz pages or username already taken" });
    }
  } else {
    res.status(400).json({ error: "Terms not accepted" });
  }
});

module.exports = router;
