const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db"); // Import the database module
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3001;
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');

app.use(
  cors({
    origin: "http://localhost:3000", // Adjust this to your actual Next.js app origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: "Content-Type",
  })
);

app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: null} // Adjust the maxAge to a larger value in milliseconds
  })
);


app.use(bodyParser.json());

app.get("/api/check-auth", (req, res) => {
  // Check if the user is authenticated based on session information
  if (req.session && req.session.userId) {
    res.status(200).json({ message: "Authenticated" });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});


// Handle requests to the root path
app.get("/", (req, res) => {
  res.send("Hello, this is your server!");
});

let userData = null;
let userData1 = null;

app.post("/api/signup", (req, res) => {
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
      // User with same username exists, return an error
      res.status(400).json({ error: "Username already exists" });
    } else {
      // User does not exist, proceed with signup
      res.status(200).json({ success: true });
    }
  });
});

app.post("/api/quiz", (req, res) => {
  userData1 = req.body;
  console.log("Received quiz data:", userData1);
  res.status(200).json({ success: true });
});

app.post("/api/create-account", (req, res) => {
  const isChecked = req.body.checked;
  //add another function for username cannot be duplicate
  if (isChecked) {
    console.log("Terms are accepted.");
    console.log("userData:", userData);
    console.log("userData1:", userData1);

    if (userData && userData1) {
      // Insert data into the "User" table
      db.run(
        "INSERT INTO User (Username, password, email, FName, LName, gender, dob) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          userData.username,
          userData.password,
          userData.email,
          userData.firstName,
          userData.lastName,
          userData.gender,
          userData.dob,
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

const isAuthenticated = (req, res, next) => {
  console.log("Checking authentication...");

  if (req.session && req.session.userId) {
    console.log("User is authenticated. Proceeding...");
    return next();
  } else {
    console.log("User is not authenticated. Sending 401 Unauthorized...");
    res.status(401).json({ error: "Unauthorized" });
  }
};


// Protected route example: '/home'
app.get('/home', isAuthenticated, (req, res) => {
  // If the user is authenticated, render the home page
  res.json({ message: "Welcome to the home page!" });
});


app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  console.log("Received login request:", { username, password });

  const query = "SELECT * FROM User WHERE Username = ? AND password = ?";
  db.get(query, [username, password], (err, user) => {
    if (err) {
      console.error("Database query error:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    console.log("Result of database query:", user);

    if (user) {
      // Store user ID in the session
      req.session.userId = user.UserID;
    
      console.log("Session after login:", req.session); // Log the session
      res.json({ message: "Login successful", user });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });
});


app.get("/api/profile", (req, res) => {
    console.log("Session in profile route:", req.session); // Log the session
  const userId = req.session.userId;// Replace with your actual session variable name

  if (!userId) {
    res.status(401).json({ error: "Unauthorized access" });
    return;
  }

  // Query your database to retrieve user profile data
  const profileQuery = `
    SELECT Username, dob, gender, email, FName, LName
    FROM User
    WHERE UserID = ?
  `;

  db.get(profileQuery, [userId], (err, userProfile) => {
    if (err) {
      console.error("Database query error:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (userProfile) {
      res.json({ userProfile });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });
});

app.get('/api/aboutme', async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized access' });
      return;
    }

    const aboutMeQuery = `
      SELECT User.FName, User.Username, AboutMe.height, AboutMe.Weight, AboutMe.allergy, 
             AboutMe.BMI, AboutMe.DietMethod, AboutMe.DietaryPreferance, AboutMe.HealthGoal
      FROM User
      LEFT JOIN AboutMe ON User.UserID = AboutMe.UserID
      WHERE User.UserID = ?
    `;

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
// server.js

app.get('/api/logout', (req, res) => {

  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json({ message: 'Logout successful' });
  });
});

// Add this to your server.js file

app.post("/api/update-profile", (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
      res.status(401).json({ error: "Unauthorized access" });
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
      [
          ...name.split(" "),
          dob,
          gender,
          email,
          userId,
      ],
      (err) => {
          if (err) {
              console.error("Error updating profile:", err.message);
              res.status(500).json({ error: `Internal Server Error: ${err.message}` });
          } else {
              res.json({ success: true });
          }
      }
  );
});

app.post("/api/reset-password", (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    res.status(401).json({ error: "Unauthorized access" });
    return;
  }

  const { oldPassword, newPassword } = req.body;

  // Fetch the current password from the database
  const getPasswordQuery = 'SELECT password FROM User WHERE UserID = ?';
  db.get(getPasswordQuery, [userId], (err, row) => {
    if (err) {
      console.error("Error fetching password:", err.message);
      res.status(500).json({ error: `Internal Server Error: ${err.message}` });
      return;
    }

    if (!row || row.password !== oldPassword) {
      // The old password is incorrect
      res.status(401).json({ error: "Incorrect old password" });
      return;
    }

    // Update the password in the database
    const updatePasswordQuery = 'UPDATE User SET password = ? WHERE UserID = ?';
    db.run(updatePasswordQuery, [newPassword, userId], (err) => {
      if (err) {
        console.error("Error updating password:", err.message);
        res.status(500).json({ error: `Internal Server Error: ${err.message}` });
      } else {
        res.json({ success: true });
      }
    });
  });
});

app.get('/api/search', async (req, res) => {
  const { query } = req.query;
  console.log('Received query:', query);

  try {
    const sql = 'SELECT * FROM Recipe_Np WHERE Rname LIKE ?';
    const params = `%${query}%`;

    console.log('Executing SQL query:', sql);
    console.log('Query parameters:', params);

    // Function to execute a SQL query and return a promise
    function executeQuery(sql, params) {
      return new Promise((resolve, reject) => {
        db.all(sql, params, (err, results) => {
          if (err) {
            reject(err);
          } else {
            // Extract only the desired columns for each result
            const extractedResults = results.map(result => ({
              Rname: result.Rname,
            }));
            resolve(extractedResults);
          }
        });
      });
    }

    const results = await executeQuery(sql, params);

    console.log('Query results:', results);

    if (results.length > 0) {
      // Recipes with the specified Rname exist
      res.json(results);
    } else {
      // No recipes found with the specified Rname
      res.json({ error: 'Recipe not found' });
    }
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Handle API request to retrieve data
app.get("/api/data", (req, res) => {
  // Query your database and send data as JSON
  db.all("SELECT * FROM User", (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // Send an HTML response with the retrieved data
    const htmlResponse = `<h1>Retrieved Data</h1><pre>${JSON.stringify(
      rows,
      null,
      2
    )}</pre>`;
    res.send(htmlResponse);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
