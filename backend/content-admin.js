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
router.get('/content/getall', (req, res) => {
    const { ContentName } = req.query;
  
    let sqlQuery = 'SELECT * FROM public."Content"';
    let queryParams = [];
  
    if (ContentName) {
      // If ContentName is provided, filter the results based on ContentName (case-insensitive)
      sqlQuery = 'SELECT * FROM "Content" WHERE LOWER("ContentName") LIKE LOWER($1)';
      queryParams.push(`%${ContentName}%`);
    } else {
      // If ContentName is not provided, retrieve all content
      sqlQuery = 'SELECT * FROM "Content"';
    }
  
    pool.query(sqlQuery, queryParams, (err, result) => {
      if (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(result.rows);
    });
  });

// Add the following route in your existing code
router.post('/content/add', (req, res) => {
  const { ContentName, type, Description, ImgContentPath } = req.body;

  // Check if required fields are provided
  if (!ContentName || !ImgContentPath) {
    res.status(400).json({ error: 'Invalid data. Missing required fields.' });
    return;
  }

  // Insert new content into the "Content" table with CreateDate
  const sqlQuery = `
    INSERT INTO "Content" ("ContentName", "type", "Description", "ImgContentPath", "CreateDate")
    VALUES ($1, $2, $3, $4, current_timestamp AT TIME ZONE 'Asia/Bangkok')
    RETURNING *;
  `;

  const values = [ContentName, type , Description || null, ImgContentPath];

  pool.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Return the newly added content
    res.json(result.rows[0]);
  });
});


router.get('/content/getbyid/:id', (req, res) => {
  const contentId = req.params.id;

  pool.query('SELECT * FROM public."Content" WHERE contentid = $1', [contentId], (err, result) => {
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

router.put('/content/edit/:contentid', (req, res) => {
  const { ContentName, type, Description, ImgContentPath } = req.body;
  const { contentid } = req.params;

  // Check if required fields are provided
  if (!ContentName) {
    res.status(400).json({ error: 'Invalid data. Missing required fields.' });
    return;
  }

  // Update content in the "Content" table with the given contentid
  const sqlQuery = `
    UPDATE "Content"
    SET "ContentName" = $1, "type" = $2, "Description" = $3, "ImgContentPath" = $4 , "UpdateDate" = current_timestamp AT TIME ZONE 'Asia/Bangkok'
    WHERE "contentid" = $5
    RETURNING *;
  `;

  const values = [ContentName, type, Description || null, ImgContentPath, contentid];

  pool.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Check if any content was updated
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Content not found' });
    } else {
      // Return the updated content
      res.json(result.rows[0]);
    }
  });
});

router.delete('/content/delete/:contentid', (req, res) => {
  const { contentid } = req.params;

  // Delete content from the "Content" table with the given contentid
  const sqlQuery = `
    DELETE FROM "Content"
    WHERE "contentid" = $1
    RETURNING *;
  `;

  pool.query(sqlQuery, [contentid], (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Check if any content was deleted
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Content not found' });
    } else {
      // Return the deleted content
      res.json(result.rows[0]);
    }
  });
});



// Other room-related routes go here...

module.exports = router;
