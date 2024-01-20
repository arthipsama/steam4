// backend/app.js (หรือ server.js)
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const roomRouter = require('./room'); // ตรวจสอบชื่อไฟล์ที่สามารถเป็นไปได้

const app = express();

app.use(bodyParser.json());
app.use(cors());

// ตรวจสอบว่าคุณได้ให้บริการเส้นทาง '/api/room' หรือไม่
app.use('/api', roomRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
