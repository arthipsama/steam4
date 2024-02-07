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

// ในไฟล์ที่เกี่ยวข้องกับ route
router.post('/productadmin/add', (req, res) => {
  const {
    ProductName,
    categoryproductid,
    Price,
    saleprice,
    Quantity,
    Desciption,
    ImgProduct
  } = req.body;

  // ตรวจสอบความถูกต้องของข้อมูลที่ส่งมา
  if (!ProductName || !categoryproductid || !Price || !Quantity || !ImgProduct) {
    res.status(400).json({ error: 'Invalid data. Missing required fields.' });
    return;
  }

  const sqlQuery = `
    INSERT INTO "Product" ("ProductName", "categoryproductid", "price", "saleprice", "quantity", "Description", "ImgProduct" , "CreateDate")
    VALUES ($1, $2, $3, $4, $5, $6, $7, current_timestamp AT TIME ZONE 'Asia/Bangkok')
    RETURNING *;
  `;

  // ปรับค่า saleprice เพื่อให้มีค่า null ได้
  const values = [ProductName, categoryproductid, Price, saleprice || null, Quantity, Desciption, ImgProduct];

  pool.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json(result.rows[0]);
  });
});



router.get('/productadmin/getcategory', (req, res) => {
  pool.query('SELECT * FROM "CategoryProduct"', (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(result.rows);
  });
});

// ในไฟล์ที่เกี่ยวข้องกับ route
router.delete('/productadmin/delete/:productid', (req, res) => {
  const productId = req.params.productid;

  if (!productId) {
    res.status(400).json({ error: 'Invalid data. Missing required fields.' });
    return;
  }

  const sqlQuery = `
    DELETE FROM "Product"
    WHERE "productid" = $1
    RETURNING *;
  `;

  const values = [productId];

  pool.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Product not found.' });
      return;
    }

    res.json(result.rows[0]);
  });
});

//edit prodcut
router.get('/productadmin/getbyid/:productid', (req, res) => {
  const productId = req.params.productid;

  if (!productId) {
    res.status(400).json({ error: 'Invalid data. Missing required fields.' });
    return;
  }

  const sqlQuery = `
    SELECT "Product".*, "CategoryProduct".*
    FROM "Product"
    JOIN "CategoryProduct" ON "Product"."categoryproductid" = "CategoryProduct"."categoryproductid"
    WHERE "Product"."productid" = $1;
  `;

  const values = [productId];

  pool.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Product not found.' });
      return;
    }

    res.json(result.rows[0]);
  });
});

router.put('/productadmin/edit/:productid', (req, res) => {
  const productId = req.params.productid;

  if (!productId) {
    res.status(400).json({ error: 'Invalid data. Missing required fields.' });
    return;
  }

  const {
    ProductName,
    categoryproductid,
    price,
    saleprice,
    quantity,
    Description,
    ImgProduct,
  } = req.body;

  // ตรวจสอบความถูกต้องของข้อมูลที่ส่งมา
  if (!ProductName || !categoryproductid || !price || !ImgProduct) {
    res.status(400).json({ error: 'Invalid data. Missing required fields.' });
    return;
  }

  const sqlQuery = `
    UPDATE "Product"
    SET "ProductName" = $1, "categoryproductid" = $2, "price" = $3, "saleprice" = $4, "quantity" = $5, "Description" = $6, "ImgProduct" = $7
    WHERE "productid" = $8
    RETURNING *;
  `;

  // ปรับค่า saleprice เพื่อให้มีค่า null ได้
  const values = [ProductName, categoryproductid, price, saleprice || null, quantity, Description, ImgProduct, productId];

  pool.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Product not found.' });
      return;
    }

    res.json(result.rows[0]);
  });
});



module.exports = router;