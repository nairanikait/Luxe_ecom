const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const { connectCloudinary } = require('./config/cloudinary');
const userRouter = require('./routes/userRoute');
const productRouter = require('./routes/productRoute');
const orderRouter = require('./routes/orderRoute');

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Middlewares
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' })); // Allow parsing of base64 image uploads
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Database & Service Connections
connectDB();
connectCloudinary();

// API Endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
  res.send("LUXE E-Commerce API is running...");
});

// Start Server
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

module.exports = app;
