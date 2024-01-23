const { Pool } = require('pg');
const express = require('express');
const router = express.Router();
router.use(express.json());


const pool = new Pool({
  user: 'admin',
  host: '34.142.167.72',
  database: 'postgres',
  password: '12345',
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM "public"."User" WHERE "UserName" = $1 AND "Password" = $2';
  pool.query(query, [username, password], (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (result.rows.length === 0) {
      res.json(null);
    } else {
      res.json(result.rows[0]);
    }
  });
});

module.exports = router;


router.post('/register', (req, res) => {
  const { username, password, firstname, lastname, phonenumber, email, contact } = req.body;

  if (!username && !password && !firstname && !lastname) {
    const query = 'INSERT INTO "public"."User" ("UserName", "Password", "FirstName", "LastName", "PhoneNumber", "Email", "Contact", roleid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    pool.query(query, [username, password, firstname, lastname, phonenumber, email, contact, '1'], (err, result) => {
      if (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json({ message: 'User registered successfully' });
    });
  } else {
    res.status(400).json({ error: 'Username cannot be null' });
    return;
  }
});


