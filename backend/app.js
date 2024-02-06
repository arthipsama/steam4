const express = require('express');
const cors = require('cors');
const app = express();
const roomRouter = require('./room'); 
const authRouter = require('./auth');
const userRouter = require('./user');
const productRouter = require('./product');
const dashboardRouter = require('./dashboard');
const useradminRouter = require('./user-admin');
const contactmeadminRouter = require('./contact-admin');
const productadminRouter = require('./product-admin');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit:  50000}));

app.use(cors(corsOptions)); // ให้ใช้ cors ก่อนการใช้ Router

app.use(express.static('public'));
app.use('/api', roomRouter);
app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', productRouter);
app.use('/api', dashboardRouter);
app.use('/api', useradminRouter);
app.use('/api', contactmeadminRouter);
app.use('/api', productadminRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
