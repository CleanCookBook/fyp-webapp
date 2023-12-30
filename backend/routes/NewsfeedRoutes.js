const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  // Fetch all news items from the database
  const query = 'SELECT title, source, link FROM NewsFeed';

  db.all(query, [], (err, newsItems) => {
    if (err) {
      console.error('Error fetching news items:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (newsItems.length > 0) {
      res.json(newsItems);
    } else {
      res.status(404).json({ error: 'No news items found' });
    }
  });
});

module.exports = router;
