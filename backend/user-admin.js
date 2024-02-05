const { Pool } = require('pg');
const express = require('express');
const router = express.Router();

const pool = new Pool({
  user: 'admin',
  host: '34.142.167.72',
  database: 'postgres',
  password: '12345',
});

router.get('/useradmin/getall', (req, res) => {
  pool.query('SELECT * FROM public."User"', (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(result.rows);
  });
});

router.get('/useradmin/getbyid/:id', (req, res) => {
  const userId = req.params.id;

  pool.query('SELECT * FROM public."User" WHERE userid = $1', [userId], (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(result.rows[0]);
    }
  });
});

// Node.js
router.post('/useradmin/add', (req, res) => {
  const { FirstName, UserName, Email, PhoneNumber, Password, Role } = req.body;

  // ตรวจสอบความถูกต้องของข้อมูลที่รับมาจาก Angular
  if (!FirstName || !UserName || !Email || !PhoneNumber || !Password || !Role) {
    res.status(400).json({ error: 'Invalid data. Please provide all required fields.' });
    return;
  }

  // ตรวจสอบว่า Username ที่รับมาซ้ำกับในฐานข้อมูลหรือไม่
  const checkUsernameQuery = 'SELECT * FROM public."User" WHERE "UserName" = $1';
  pool.query(checkUsernameQuery, [UserName], (err, result) => {
    if (err) {
      console.error('Error checking username', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (result.rows.length > 0) {
      res.status(400).json({ error: 'Username already exists' });
      return;
    }

    // ถ้า Username ไม่ซ้ำกันก็ทำการ INSERT
    const addUserQuery = `
      INSERT INTO public."User" ("FirstName", "UserName", "Email", "PhoneNumber", "Password", "Role")
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    // ทำการ execute คำสั่ง SQL
    pool.query(addUserQuery, [FirstName, UserName, Email, PhoneNumber, Password, Role], (err, result) => {
      if (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.json(result.rows[0]); // ส่งข้อมูลผู้ใช้ที่ถูกเพิ่มกลับไปยัง Angular
    });
  });
});




module.exports = router;