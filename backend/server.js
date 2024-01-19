const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const newsfeedRoutes = require("./routes/NewsfeedRoutes");
const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const bookMarkRoutes = require("./routes/bookMarkRoutes");
const aboutmeRoutes = require("./routes/aboutmeRoutes");
const editUserRoutes = require("./routes/editUserRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const editRecipeRoutes = require("./routes/editRecipeRoutes");
const isAuthenticated = require("./authMiddleware");
const cors = require("cors");
const db = require("./db"); // Import the database module
const session = require("express-session");
const multer = require("multer");
const app = express();
const PORT = process.env.PORT || 3001;
const crypto = require("crypto");
const secretKey = crypto.randomBytes(32).toString("hex");

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
    cookie: { maxAge: null }, // Adjust the maxAge to a larger value in milliseconds
  })
);

app.use(bodyParser.json());
// Configure Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use("/api", authRoutes(isAuthenticated));
app.use("/api/profile", profileRoutes);
app.use("/api/user", userRoutes);
app.use("/api/news", newsfeedRoutes);
app.use("/api/recipe", recipeRoutes);
app.use("/api/aboutme", aboutmeRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/edit", editUserRoutes);
app.use("/api/bookmark", bookMarkRoutes);
app.use("/api/editRecipe", editRecipeRoutes);
app.use("/api/announce", announcementRoutes);
app.get("/home", isAuthenticated, (req, res) => {
  res.json({ message: "Welcome to the home page!" });
});

// Handle requests to the root path
app.get("/", (req, res) => {
  res.send("Hello, this is your server!");
});

app.get("/api/filter", async (req, res) => {
  console.log("testing");

  try {
    const dp_tags = JSON.parse(req.query.dietaryPreferences);
    const allergy_tags = JSON.parse(req.query.allergies);
    const cTime = req.query.cookingTime;
    const calorie = req.query.calories;

    const conditions = [];
    const params = [];

    if (dp_tags && dp_tags.length > 0) {
      conditions.push(`dp_tags IN (${dp_tags.map(() => '?').join(', ')})`);
      params.push(...dp_tags);
    }

    if (allergy_tags && allergy_tags.length > 0) {
      // Use AND to check that all allergies are present in the array
      conditions.push(`(${allergy_tags.map(() => 'allergy_tags LIKE ?').join(' AND ')})`);
      params.push(...allergy_tags.map(tag => `%${tag}%`));
    }

    if (cTime) {
      conditions.push('(cTime IS NULL OR cTime <= ?)');
      params.push(cTime);
    }

    if (calorie) {
      // Extracting numeric value from the 'calories' string
      const targetCalories = parseInt(calorie);

      // Using LIKE to match the numeric value in the 'calorie' column
      conditions.push('(calorie LIKE ? OR calorie IS NULL)');
      params.push(`%${targetCalories} kcal%`);
    }

    const conditionsString = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const sql = `SELECT Rname FROM Recipe_Np ${conditionsString}`;

    console.log("Executing SQL query:", sql);
    console.log("Query parameters:", params);

    db.all(sql, params, (err, rows) => {
      if (err) {
        console.error('Database query error:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      // Assuming you want to send the result back to the client
      res.json({ result: rows });
      console.log(rows); // Log the result to the console
    });
  } catch (error) {
    console.error('Error parsing JSON:', error.message);
    res.status(400).json({ error: 'Bad Request' });
  }
});




   

// Move the executeQuery function outside the route handling function


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
