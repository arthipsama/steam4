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

  sqlQuery += ' ORDER BY "Orders"."CreateDate" DESC';
  
    pool.query(sqlQuery, (err, result) => {
      if (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      res.json(result.rows);
    });
  });

  router.get('/orderadmin/getbyid/:ordersid', (req, res) => {
    const ordersid = req.params.ordersid;
  
    const sqlQuery = `
      SELECT "Orders".*, "User".*
      FROM "Orders"
      JOIN "User" ON "Orders"."userid" = "User"."userid"
      WHERE "Orders"."ordersid" = $1
    `;
  
    pool.query(sqlQuery, [ordersid], (err, result) => {
      if (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      res.json(result.rows.length > 0 ? result.rows[0] : null);
    });
  });


  router.get('/orderadmin/details/:ordersid', (req, res) => {
    const ordersid = req.params.ordersid;
  
    const sqlQuery = `
      SELECT 
      "OrdersDetails".*, 
      "Product".*,
      "CategoryProduct".*,
      "OrdersDetails"."quantity" AS "OrdersDetailsQuantity",
      "OrdersDetails"."price" AS "OrdersDetailsPrice"
    FROM "OrdersDetails"
    JOIN "Product" ON "OrdersDetails"."productid" = "Product"."productid"
    JOIN "CategoryProduct" ON "Product"."categoryproductid" = "CategoryProduct"."categoryproductid"
    WHERE "OrdersDetails"."ordersid" = $1
    `;
  
    pool.query(sqlQuery, [ordersid], (err, result) => {
      if (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      res.json(result.rows);
    });
  });

  router.put('/orderadmin/update/:ordersid', (req, res) => {
    const ordersid = req.params.ordersid;
    const { paymentstatus, remark } = req.body;
    if (!ordersid) {
      res.status(400).json({ error: 'ordersid is required' });
      return;
    }
    const sqlUpdateQuery = `
      UPDATE "Orders"
      SET
        "paymentstatus" = $1,
        "remark" = $2,
        "UpdateDate" = CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Bangkok'
      WHERE
        "ordersid" = $3 RETURNING *
    `;
   
    pool.query(sqlUpdateQuery, [paymentstatus, remark, ordersid], (err, result) => {
      if (err) {
        console.error('Error executing update query', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      if(paymentstatus == 'Approved'){
        const sqlUpdateSaleCountAndQuantity = `
          WITH order_summary AS (
            SELECT od.productid, SUM(od.quantity) AS TotalQuantity
            FROM public."OrdersDetails" od
            INNER JOIN "Orders" o ON od.ordersid = o.ordersid
            WHERE o.ordersid = $1
            GROUP BY od.productid
          )
          UPDATE public."Product" p
          SET salecount = p.salecount + os.TotalQuantity,
              quantity = p.quantity - os.TotalQuantity
          FROM order_summary os
          WHERE p.productid = os.productid;
        `;
        
        pool.query(sqlUpdateSaleCountAndQuantity, [ordersid], (err, result) => {
          if (err) {
            console.error('Error updating salecount and quantity', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }
          res.json({ message: 'Order and inventory updated successfully' });
        });
      } else {
        res.json({ message: 'Order updated successfully' });
      }
    });
});
  
  

// Other room-related routes go here...

module.exports = router;
