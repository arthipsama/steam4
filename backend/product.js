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
  pool.query('SELECT p.productid, p."ImgProduct" , p."ProductName", p.price, p."Description", od."quantity", od."ordersid", p."saleprice" FROM public."Product" p left join public."OrdersDetails" od on p.productid = od.productid left join public."Orders" o on od.ordersid = o.ordersid where o."userid" = $1', [userid], (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(result.rows);
  });
});

// router.post('/addToCart', async (req, res) => {
//   const { userid, productid, quantity, price } = req.body;
//   try {
//      const result = await pool.query('SELECT * FROM public."Orders" WHERE userid = $1', [userid]);
//      if (result.rowCount > 0) {
//        const detailsResult = await pool.query('INSERT INTO public."OrdersDetails" (ordersid, productid, quantity, price) VALUES ($1, $2, $3, $4);', [result.rows[0].ordersid, productid, quantity, price]);
//        res.json(detailsResult.rows);
//      } else {
//        throw new Error('No orders found for this user');
//      }
//   } catch (err) {
//      console.error('Error executing query', err);
//      res.status(500).json({ error: 'Internal Server Error' });
//   }
//  });

router.post('/addToCart', async (req, res) => {
  const { userid, productid, quantity, price } = req.body;
  try {
    const result = await pool.query('SELECT * FROM public."Orders" WHERE userid = $1', [userid]);
    if (result.rowCount > 0) {
      // Check if the product already exists in the cart
      const existingOrderDetail = await pool.query('SELECT * FROM public."OrdersDetails" WHERE ordersid = $1 AND productid = $2', [result.rows[0].ordersid, productid]);
      if (existingOrderDetail.rowCount > 0) {
        // Update the quantity and calculate the new price
        const newQuantity = existingOrderDetail.rows[0].quantity + quantity;
        const newPrice = newQuantity * price;
        await pool.query('UPDATE public."OrdersDetails" SET quantity = $1, price = $2 WHERE ordersid = $3 AND productid = $4', [newQuantity, newPrice, result.rows[0].ordersid, productid]);
      } else {
        // Insert the new product into the cart
        await pool.query('INSERT INTO public."OrdersDetails" (ordersid, productid, quantity, price) VALUES ($1, $2, $3, $4);', [result.rows[0].ordersid, productid, quantity, price]);
      }
      res.json(existingOrderDetail.rows);
    } else {
      throw new Error('No orders found for this user');
    }
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/deleteProductInCart', (req, res) => {
  const { productid, ordersid } = req.body;
  pool.query('DELETE FROM public."OrdersDetails" WHERE "productid" = $1 AND "ordersid" = $2', [productid, ordersid], (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.status(200).json({ message: 'Successfully deleted product' });
  });
});
