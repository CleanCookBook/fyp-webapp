const session = require('express-session');
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db"); // Import the database module

const app = express();
const PORT = process.env.PORT || 3001;

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
    cookie: { maxAge: 600000 } // Adjust the maxAge to a larger value in milliseconds
  })
);


app.use(bodyParser.json());


// Handle requests to the root path
app.get("/", (req, res) => {
  res.send("Hello, this is your server!");
});

let userData = null;
let userData1 = null;

app.post("/api/signup", (req, res) => {
  userData = req.body;
  console.log("Received signup data:", userData);
  res.status(200).json({ success: true });
});

app.post("/api/quiz", (req, res) => {
  userData1 = req.body;
  console.log("Received quiz data:", userData1);
  res.status(200).json({ success: true });
});

app.post("/api/create-account", (req, res) => {
  const isChecked = req.body.checked;

  if (isChecked) {
    console.log("Terms are accepted.");
    console.log("userData:", userData);
    console.log("userData1:", userData1);

    if (userData && userData1) {
      // Insert data into the "User" table
      db.run(
        "INSERT INTO User (Username, password, email, FName, LName) VALUES (?, ?, ?, ?, ?)",
        [
          userData.username,
          userData.password,
          userData.email,
          userData.firstName,
          userData.lastName,
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
          const bmi = currentWeight / (heightInMeters * heightInMeters);

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
        .json({ error: "Data not received from signup and quiz pages" });
    }
  } else {
    res.status(400).json({ error: "Terms not accepted" });
  }
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
    SELECT Username, dob, gender, email
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
