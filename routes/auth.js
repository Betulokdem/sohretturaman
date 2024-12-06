// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Kullanıcı kaydı (signup)
router.post('/signup', async (req, res) => {
  const { user_name, email, password } = req.body;

  try {
    // Kullanıcıyı oluştur
    const user = new User({
      user_name,
      email,
      password,
    });

    await user.save();
    res.status(201).json({
      message: 'Kullanıcı başarıyla oluşturuldu',
      user: { user_name, email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Kullanıcı oluşturulurken bir hata oluştu' });
  }
});

// Kullanıcı girişi (login)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Email ile kullanıcıyı bul
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Geçersiz email veya şifre' });
    }

    // Şifreyi doğrula
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Geçersiz email veya şifre' });
    }

    // JWT token oluştur
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ message: 'Başarıyla giriş yapıldı', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Giriş yaparken bir hata oluştu' });
  }
});

module.exports = router;

