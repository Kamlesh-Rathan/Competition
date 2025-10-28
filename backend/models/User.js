const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  xp: Number,
  level: Number,
  studyCoins: Number,
  streak: Number
});
const User = mongoose.model('User', userSchema);
module.exports = User;
