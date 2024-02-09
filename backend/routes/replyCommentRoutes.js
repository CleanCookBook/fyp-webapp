const express = require("express");
const router = express.Router();
const db = require("../db");
const isAuthenticated = require("../authMiddleware");

// Submit a new reply to a comment on a review
// Backend route to fetch replies with usernames for a specific review
router.get('/:commentId', async (req, res) => {
    const reviewId = req.params.commentId;
    console.log(reviewId);
  
    try {
      // Query the database to fetch replies and usernames for the specified review
      const repliesWithUsernames = await new Promise((resolve, reject) => {
        db.all(`
          SELECT commentReply.commentReply, User.Username
          FROM commentReply
          JOIN User ON commentReply.UserID = User.UserID
          WHERE commentReply.commentID = ?
        `, [reviewId], (err, rows) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(rows);
        });
      });
  
      // Send the fetched replies with usernames as a JSON response
      res.json({ repliesWithUsernames });
    } catch (error) {
      console.error('Error fetching replies with usernames:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

router.post('/replies/:commentId', isAuthenticated, async (req, res) => {
  const { userId, file_name, commentReply, comment } = req.body;
  const commentId = req.params.commentId ;

  console.log("Received Review ID:", commentId );

  // Check if reviewId is valid
  if (!commentId) {
    console.error('Error: reviewId is undefined');
    return res.status(400).json({ error: 'reviewId is undefined' });
  }

  try {
    // Check if the review with the given reviewId exists
    const existingReview = await db.get('SELECT commentID FROM comment WHERE commentID = ?', [commentId]);
    if (!existingReview) {
      console.error('Error: Review with the given reviewId does not exist');
      return res.status(404).json({ error: 'Review not found' });
    }

    // Insert the new reply into the database
    const result = await db.run(
      'INSERT INTO commentReply (UserID, commentID, file_name, commentReply, comment) VALUES (?, ?, ?, ?, ?)',
      [userId, commentId, file_name, commentReply, comment]
    );

    const newReplyId = result.lastID;

    // Log the details of the submitted reply
    console.log('New Reply Submitted:');
    console.log('UserID:', userId);
    console.log('commentID:', commentId);
    console.log('file_name:', file_name);
    console.log('Reply:', commentReply);
    console.log('Comment:', comment);

    res.status(201).json({ message: 'Reply submitted successfully'});
  } catch (error) {
    console.error('Error submitting reply:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});






module.exports = router;