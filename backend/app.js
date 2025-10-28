const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

app.use(express.json());
app.use('/api/auth', authRoutes);

mongoose.connect('mongodb+srv://username:password@cluster-name.mongodb.net/database-name', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.log('Error connecting to MongoDB:', error);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
