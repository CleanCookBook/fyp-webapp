const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./server/database.db');

// Create your database schema and tables here

// Example:
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL
    )
  `);
});

db.close();
