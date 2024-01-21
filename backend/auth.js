const { Pool } = require('pg');
const express = require('express');
const router = express.Router();

const pool = new Pool({
  user: 'admin',
  host: '34.142.167.72',
  database: 'postgres',
  password: '12345',
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  pool.query('SELECT * FROM user WHERE username = $1 AND password = $2', [username, password], (err, result) => {
     if (err) {
       console.error('Error executing query', err);
       res.status(500).json({ error: 'Internal Server Error' });
       return;
     }
     if (result.rowCount === 0) {
       res.status(401).json({ error: 'Invalid username or password' });
     } else {
       res.json(result.rows[0]);
     }
  });
 });
  
// Other room-related routes go here...

module.exports = router;