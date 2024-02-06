const { Pool } = require('pg');
const express = require('express');
const router = express.Router();

const pool = new Pool({
  user: 'admin',
  host: '34.142.167.72',
  database: 'postgres',
  password: '12345',
});

router.get('/productadmin/getall', (req, res) => {
  const { searchProductName, selectedStatus } = req.query;

  let sqlQuery = `
    SELECT "Product".*, "CategoryProduct".*
    FROM "Product"
    JOIN "CategoryProduct" ON "Product"."categoryproductid" = "CategoryProduct"."categoryproductid"
  `;

  // เพิ่มเงื่อนไขถ้ามีค่า searchProductName ถูกส่งมา
  if (searchProductName) {
    sqlQuery += ` WHERE LOWER("Product"."ProductName") LIKE LOWER('%${searchProductName}%')`;
  }

  // เพิ่มเงื่อนไขถ้ามีค่า selectedStatus ถูกส่งมา
  if (selectedStatus && selectedStatus.toLowerCase() !== 'all') {
    sqlQuery += ` AND LOWER("CategoryProduct"."CategoryProductName") LIKE LOWER('%${selectedStatus}%')`;
  }

  pool.query(sqlQuery, (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json(result.rows);
  });
});


module.exports = router;