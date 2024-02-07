const { Pool } = require('pg');
const express = require('express');
const router = express.Router();

const pool = new Pool({
  user: 'admin',
  host: '34.142.167.72',
  database: 'postgres',
  password: '12345',
});

// Define API routes for room operations
router.get('/dashboard/user', (req, res) => {
    pool.query('SELECT "userid" FROM "User"', (err, result) => {
      if (err) {
        console.error('Error executing query User', err);
        res.status(500).json({ error: 'Internal Server Error User' });
        return;
      }
      res.json(result.rows);
    });
  });
  

  router.get('/dashboard/product', (req, res) => {
    pool.query('SELECT view FROM "Product"', (err, result) => {
      if (err) {
        console.error('Error executing query Product', err);
        res.status(500).json({ error: 'Internal Server Error Product' });
        return;
      }
      res.json(result.rows);
    });
});


  router.get('/dashboard/order', (req, res) => {
    pool.query('SELECT totalprice FROM "Orders"', (err, result) => {
      if (err) {
        console.error('Error executing query Orders', err);
        res.status(500).json({ error: 'Internal Server Error Orders' });
        return;
      }
      res.json(result.rows);
    });
  });

  router.get('/dashboard/contact', (req, res) => {
    pool.query('SELECT "contactmeid" FROM "ContactMe"', (err, result) => {
      if (err) {
        console.error('Error executing query contact', err);
        res.status(500).json({ error: 'Internal Server Error contact' });
        return;
      }
      res.json(result.rows);
    });
  });


  router.get('/dashboard/product/most5', (req, res) => {
    // สร้าง SQL query สำหรับการดึงข้อมูล product และ salecount
    const sqlQuery = `
      SELECT *
      FROM
        "Product"
      ORDER BY
        "salecount" DESC,
        "productid" ASC
      LIMIT 5
    `;
  
    pool.query(sqlQuery, (err, result) => {
      if (err) {
        console.error('Error executing query Product', err);
        res.status(500).json({ error: 'Internal Server Error Product' });
        return;
      }

      res.json(result.rows);
    });
  });

  router.get('/dashboard/product/view5', (req, res) => {
    // สร้าง SQL query สำหรับการดึงข้อมูล product และ view
    const sqlQuery = `
      SELECT *
      FROM
        "Product"
      ORDER BY
        "view" DESC,
        "productid" ASC
      LIMIT 5
    `;
  
    pool.query(sqlQuery, (err, result) => {
      if (err) {
        console.error('Error executing query Product', err);
        res.status(500).json({ error: 'Internal Server Error Product' });
        return;
      }

      res.json(result.rows);
    });
  });

// Other room-related routes go here...

module.exports = router;
