const { Pool } = require('pg');
const express = require('express');
const router = express.Router();

const pool = new Pool({
  user: 'admin',
  host: '34.142.167.72',
  database: 'postgres',
  password: '12345',
});

router.get('/product', (req, res) => {
  pool.query('SELECT * FROM public."Product"', (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(result.rows);
  });
});

module.exports = router;

router.post('/orders', (req, res) => {
  const { userid } = req.body;
  pool.query('SELECT * FROM public."Orders" WHERE userid = $1', [userid], (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (result.rowCount > 0) {
      pool.query('SELECT * FROM public."OrdersDetails" WHERE ordersid = $1', [result.rows[0].ordersid], (err, detailsResult) => {
        if (err) {
          console.error('Error executing query', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        res.json(detailsResult.rows);
      });
    } else {
      pool.query('INSERT INTO public."Orders" (userid) VALUES ($1) RETURNING *', [userid], (err, insertResult) => {
        if (err) {
          console.error('Error executing query', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        res.json(insertResult.rows[0]);
      });
    }
  });
});

router.post('/cart', (req, res) => {
  const { userid } = req.body;
  pool.query('select p.productid, p."ImgProduct" , p."ProductName", p.price, p."Description", od."quantity" from public."Product" p left join public."OrdersDetails" od on p.productid = od.productid left join public."Orders" o on od.ordersid = o.ordersid where o."userid" = $1', [userid], (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(result.rows);
  });
});