const express = require('express');
const cors = require('cors');
const app = express();
const roomRouter = require('./room'); 
const loginRouter = require('./auth');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); // ให้ใช้ cors ก่อนการใช้ Router

app.use(express.static('public'));
app.use('/api', roomRouter);
app.use('/api', loginRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
