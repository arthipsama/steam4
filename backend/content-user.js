const { Pool } = require('pg');
const express = require('express');
const router = express.Router();


const pool = new Pool({
  user: 'admin',
  host: '34.142.167.72',
  database: 'postgres',
  password: '12345',
});

router.get('/contentuser', (req, res) => {
    pool.query('SELECT * FROM public."Content" WHERE type = TRUE', (err, result) => {
      if (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(result.rows);
    });
  });

module.exports = router;
