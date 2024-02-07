const { Pool } = require('pg');
const express = require('express');
const router = express.Router();

const pool = new Pool({
  user: 'admin',
  host: '34.142.167.72',
  database: 'postgres',
  password: '12345',
});

  router.get('/orderadmin/getall', (req, res) => {
    const { searchOrderName, selectedStatus } = req.query;
  
    let sqlQuery = `
      SELECT "Orders".*, "User".*
      FROM "Orders"
      JOIN "User" ON "Orders"."userid" = "User"."userid"
      WHERE "Orders"."paymentstatus" IS NOT NULL
    `;
  
  // เพิ่มเงื่อนไขถ้ามีค่า searchOrderName ถูกส่งมา
  if (searchOrderName) {
    sqlQuery += ` AND LOWER("User"."UserName") LIKE LOWER('%${searchOrderName}%')`;
  }

  // เพิ่มเงื่อนไขถ้ามีค่า selectedStatus ถูกส่งมา
  if (selectedStatus && selectedStatus.toLowerCase() !== 'all') {
    sqlQuery += ` AND LOWER("Orders"."paymentstatus") LIKE LOWER('%${selectedStatus}%')`;
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
  

// Other room-related routes go here...

module.exports = router;
