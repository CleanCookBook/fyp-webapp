const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db'); // Import the database module

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors({
  origin: 'http://localhost:3000', // Adjust this to your actual Next.js app origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
  credentials: true,
  allowedHeaders: 'Content-Type',
}));

app.use(bodyParser.json()); 



// Handle requests to the root path
app.get('/', (req, res) => {
  res.send('Hello, this is your server!');
});

// Handle API request to retrieve data
// Handle API request for login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Received login request:', { username, password });

    const query = 'SELECT * FROM User WHERE Username = ? AND password = ?';
    db.get(query, [username, password], (err, user) => {
    
      if (err) {
        console.error('Database query error:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
    }

        console.log('Result of database query:', user);

        if (user) {
            res.json({ message: 'Login successful', user });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});

  
  
  // Handle API request to retrieve data
  app.get('/api/data', (req, res) => {
    // Query your database and send data as JSON
    db.all('SELECT * FROM User', (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      // Send an HTML response with the retrieved data
      const htmlResponse = `<h1>Retrieved Data</h1><pre>${JSON.stringify(rows, null, 2)}</pre>`;
      res.send(htmlResponse);
    });
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
