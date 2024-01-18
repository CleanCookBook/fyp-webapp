const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const storage = multer.memoryStorage(); // Use memory storage for handling in-memory file processing
const upload = multer({ storage: storage });

const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
};

let announcementData = null;

router.post('/announcement', upload.fields([{ name: 'announcementImage', maxCount: 1 }]), isAuthenticated, (req, res) => {
  console.log("test");

  try {
    const userId = req.session.userId; // Assuming you have a user object attached to the request
    console.log("test1");

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized access' });
      return;
    }

    const { announcementName } = req.body;
    const uploadedImage = req.files && req.files['announcementImage'] && req.files['announcementImage'][0];
    console.log('req.files:', req.files);

    if (!uploadedImage) {
      res.status(400).json({ error: 'No valid files provided' });
      return;
    }
    console.log('uploadedImage:', uploadedImage);

    // Process the data as needed
    console.log("Received data:", { announcementName, userId });

    const sql = `
      INSERT INTO BPAnnouncement (file_name, announcementFile, UserID) VALUES (?, ?, ?)
    `;

    const values = [
      announcementName,
      uploadedImage.buffer,
      userId,
    ];

    console.log("SQL Statement:", sql);
    console.log("Values:", values);

    db.run(sql, values, function (err) {
      if (err) {
        console.error('Database Error:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`Announcement inserted with ID ${this.lastID}`);
        res.sendStatus(200);
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/user-announcements', isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.userId;

    // Fetch recipes for the authenticated user using a Promise
    const announcements = await new Promise((resolve, reject) => {
      const sql = 'SELECT file_name FROM BPAnnouncement WHERE UserID = ?';
      db.all(sql, [userId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    console.log('Fetched announcements:', announcements);

    res.json(announcements);
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
