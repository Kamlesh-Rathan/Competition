const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ username, email, password: hashedPassword });
    const token = jwt.sign({ userId: newUser._id }, 'secretkey', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error signing up' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ userId: existingUser._id }, 'secretkey', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

module.exports = router;
