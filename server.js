// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

dotenv.config(); // .env dosyasını kullanmak için

const app = express();

// Middleware
app.use(express.json()); // JSON formatında verileri almak için

// MongoDB bağlantısını yap
connectDB();

// API rotalarını bağla
app.use('/api/auth', authRoutes);

// Sunucu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});

