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
  const { username, password, firstname, lastname, phoneNumber, email, contact } = req.body;
  const lowerCaseUsername = username.toLowerCase();
  const lowerCaseEmail = email.toLowerCase();

  if (username.length >  0 && password.length >  0 && firstname.length >  0) {
    const checkUsernameQuery = 'SELECT * FROM "public"."User" WHERE LOWER("UserName") = $1';
    pool.query(checkUsernameQuery, [lowerCaseUsername], (err, resultUser) => {
      if (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      if (resultUser.rows.length >  0) {
        // Username already exists (case-insensitive), send response  1
        res.json(1);
        return;
      }

      const checkEmailQuery = 'SELECT * FROM "public"."User" WHERE LOWER("Email") = $1';
      pool.query(checkEmailQuery, [lowerCaseEmail], (err, resultEmail) => {
        if (err) {
          console.error('Error executing query', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        if (resultEmail.rows.length >  0) {
          // Email already exists (case-insensitive), send response  2
          res.json(2);
          return;
        }

        if(resultEmail.rows.length == 0 && resultUser.rows.length == 0){
          const insertQuery = 'INSERT INTO "public"."User" ("UserName", "Password", "FirstName", "LastName", "PhoneNumber", "Email", "Contact", "Role") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
          pool.query(insertQuery, [lowerCaseUsername, password, firstname, lastname, phoneNumber, lowerCaseEmail, contact, 'USER'], (err, result) => {
            if (err) {
              console.error('Error executing query', err);
              res.status(500).json({ error: 'Internal Server Error' });
              return;
            }
            res.json(3);
            return;
          });
        }
      });
    });
  }
});



 router.post('/newpassword', (req, res) => {
  const { oldPassword, newPassword, userid } = req.body;

  const query = 'SELECT * FROM "public"."User" WHERE "userid" = $1 AND "Password" = $2';
  pool.query(query, [userid, oldPassword], (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (result.rowCount > 0) {
      const existingOrderDetail = pool.query('update public."User" set "Password" = $1 where userid = $2', [newPassword, userid]); 
      res.json(true);
      return;
    } else {
      console.error('Error executing query', err);
      res.json(false);
      return;
    }
  });
});