const { Pool } = require('pg');
const express = require('express');
const router = express.Router();


const pool = new Pool({
  user: 'admin',
  host: '34.142.167.72',
  database: 'postgres',
  password: '12345',
});

router.put('/editProfile', (req, res) => {
    const { userid, firstname, lastname, phoneNumber, email, contact } = req.body;
  
    const query = 'UPDATE "public"."User" SET "FirstName" = $2, "LastName" = $3, "PhoneNumber" = $4, "Email" = $5, "Contact" = $6 WHERE "userid" = $1 RETURNING *';
    pool.query(query, [userid, firstname, lastname, phoneNumber, email, contact], (err, result) => {
       if (err) {
         console.error('Error executing query', err);
         res.status(500).json({ error: 'Internal Server Error' });
         return;
       }
       res.json({ message: 'Update successful' });
    });
});

router.post('/getUserData', (req, res) => {
    const { userid } = req.body;
    const query = 'select * from "public"."User" where userid = $1';
    pool.query(query, [userid], (err, result) => {
      if (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(result.rows);
    });
});

module.exports = router;