const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const mealPlanRoutes = require("./routes/mealPlanRoutes");
const newsfeedRoutes = require("./routes/NewsfeedRoutes");
const chatRoutes = require("./routes/chatRoutes");
const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const filterRoutes = require("./routes/filterRoutes");
const bookMarkRoutes = require("./routes/bookMarkRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const aboutmeRoutes = require("./routes/aboutmeRoutes");
const editUserRoutes = require("./routes/editUserRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const editRecipeRoutes = require("./routes/editRecipeRoutes");
const registrationRoutes = require("./routes/registrationRoutes")
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
app.use("/api/filter", filterRoutes);
app.use("/api/aboutme", aboutmeRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/edit", editUserRoutes);
app.use("/api/bookmark", bookMarkRoutes);
app.use("/api/editRecipe", editRecipeRoutes);
app.use("/api/mealPlan", mealPlanRoutes);
app.use("/api/registration",  registrationRoutes);

app.use("/api/announce", announcementRoutes);
app.get("/home", isAuthenticated, (req, res) => {
  res.json({ message: "Welcome to the home page!" });
});

// Handle requests to the root path
app.get("/", (req, res) => {
  res.send("Hello, this is your server!");
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});