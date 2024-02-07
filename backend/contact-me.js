const { Pool } = require('pg');
const express = require('express');
const router = express.Router();


const pool = new Pool({
  user: 'admin',
  host: '34.142.167.72',
  database: 'postgres',
  password: '12345',
});

router.post('/contactme', (req, res) => {
    const { email, name, subject, message, userid } = req.body;
    pool.query(`INSERT INTO public."ContactMe" (userid, textname, email, textmessage,  "CreateDate",  "read", "subject")VALUES ($5, $2, $1, $4,  CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Bangkok',  false, $3);`,[email, name, subject, message, userid], (err, result) => {
      if (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json({ message: 'Insert successful' });
    });
  });
  
  module.exports = router;