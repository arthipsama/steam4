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
  const {username} = req.body;
  const {password} = req.body;
  // const trueUsername = "'" + username + "'";
   
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
// router.post('/login', (req, res) => {
//   pool.query('SELECT * FROM "public"."User" WHERE User', (err, result) => {
//     if (err) {
//       console.error('Error executing query', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//       return;
//     }
//     res.json(result.rows);
//   });
// });
// module.exports = router;


// router.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   pool.query('SELECT * FROM user WHERE username = $1 AND password = $2', [username, password], (err, result) => {
//      if (err) {
//        console.error('Error executing query', err);
//        res.status(500).json({ error: 'Internal Server Error' });
//        return;
//      }
//      if (result.rowCount === 0) {
//        res.status(401).json({ error: 'Invalid username or password' });
//      } else {
//        res.json(result.rows[0]);
//      }
//   });
//  });
  
// Other room-related routes go here...

