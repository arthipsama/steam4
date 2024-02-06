const { Pool } = require('pg');
const express = require('express');
const router = express.Router();

const pool = new Pool({
  user: 'admin',
  host: '34.142.167.72',
  database: 'postgres',
  password: '12345',
});

router.get('/contactme/getall', (req, res) => {
  const { searchUserName, selectedRole } = req.query;

  // Build the SQL query with conditions based on searchUserName and selectedRole
  let sqlQuery = `
    SELECT "ContactMe".*, "User".*
    FROM "ContactMe"
    JOIN "User" ON "ContactMe"."userid" = "User"."userid"
  `;

  const params = [];

  // Check if searchUserName is provided
  if (searchUserName) {
    sqlQuery += ` WHERE LOWER("User"."UserName") LIKE LOWER($${params.length + 1})`;
    params.push(`%${searchUserName}%`);
  }

  // Check if selectedRole is provided and not empty
  if (selectedRole) {
    // If conditions are already present, use AND, otherwise start with WHERE
    sqlQuery += searchUserName ? ' AND' : ' WHERE';

    // Check if selectedRole is 'All'
    if (selectedRole.toUpperCase() === 'ALL') {
      sqlQuery += ' ("ContactMe"."read" = true OR "ContactMe"."read" = false)';
    } else if (selectedRole.toUpperCase() === 'READ') {
      sqlQuery += ' "ContactMe"."read" = true';
    } else if (selectedRole.toUpperCase() === 'NOT') {
      sqlQuery += ' "ContactMe"."read" = false';
    }
    // If the value is not 'ALL', 'READ', or 'NOT', include both true and false in the results
  }

  // Execute the query with parameterized values
  pool.query(sqlQuery, params, (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Transform the result to match the new interface ContactMeWithUserDTO
    const transformedResult = result.rows.map((row) => {
      return {
        contactmeid: row.contactmeid,
        textname: row.textname,
        email: row.email,
        read: row.read,
        subject: row.subject,
        textmessage: row.textmessage,
        CreateBy: row.CreateBy,
        CreateDate: row.CreateDate,
        UpdateBy: row.UpdateBy,
        UpdateDate: row.UpdateDate,
        user: {
          // Map user properties from the result
          // You might need to adjust this based on your actual User model
          userid: row.userid,
          UserName: row.UserName,
          Role: row.Role,
          // Add other user properties as needed
        },
      };
    });

    res.json(transformedResult);
  });
});

  // Define API route to get ContactMe data by contactmeid
router.get('/contactme/:contactmeid', (req, res) => {
    const contactmeid = req.params.contactmeid;
  
    // Ensure contactmeid is provided
    if (!contactmeid) {
      res.status(400).json({ error: 'contactmeid is required' });
      return;
    }
  
    const sqlQuery = `
      SELECT *
      FROM "ContactMe"
      WHERE "contactmeid" = $1;
    `;
  
    pool.query(sqlQuery, [contactmeid], (err, result) => {
      if (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      // Ensure that there's at least one result
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'ContactMe not found' });
        return;
      }
  
      // Return the first (and only) result
      res.json(result.rows[0]);
    });
  });


  // Update API route to handle contact update
router.put('/contactme/update/:contactmeid', (req, res) => {
    const contactmeid = req.params.contactmeid;
  
    // Ensure contactmeid is provided
    if (!contactmeid) {
      res.status(400).json({ error: 'contactmeid is required' });
      return;
    }
  
    const updatedContact = req.body;
  
    const sqlQuery = `
      UPDATE "ContactMe"
      SET
        "textname" = $1,
        "subject" = $2,
        "textmessage" = $3,
        "read" = $4,
        "UpdateDate" = CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Bangkok'
      WHERE "contactmeid" = $5
      RETURNING *;
    `;
  
    const values = [
      updatedContact.textname,
      updatedContact.subject,
      updatedContact.textmessage,
      updatedContact.read,
      contactmeid,
    ];
  
    pool.query(sqlQuery, values, (err, result) => {
      if (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'ContactMe not found' });
        return;
      }
  
      res.json(result.rows[0]);
    });
  });
  
  // Delete API route to handle contact deletion
router.delete('/contactme/delete/:contactmeid', (req, res) => {
  const contactmeid = req.params.contactmeid;

  // Ensure contactmeid is provided
  if (!contactmeid) {
    res.status(400).json({ error: 'contactmeid is required' });
    return;
  }

  const sqlQuery = `
    DELETE FROM "ContactMe"
    WHERE "contactmeid" = $1
    RETURNING *;
  `;

  pool.query(sqlQuery, [contactmeid], (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'ContactMe not found' });
      return;
    }

    res.json(result.rows[0]);
  });
});

  
  

// Other room-related routes go here...

module.exports = router;
