const express = require('express');
const cors = require('cors');
const app = express();
const roomRouter = require('./room'); 
const authRouter = require('./auth');
const userRouter = require('./user');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); // ให้ใช้ cors ก่อนการใช้ Router

app.use(express.static('public'));
app.use('/api', roomRouter);
app.use('/api', authRouter);
app.use('/api', userRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
