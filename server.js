const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
require('dotenv').config();



connectDB();

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);



const PORT = process.env.PORT || 5000;
const DEV_MODE = process.env.DEV_MODE || 'development';

console.log(`Node Server Running In ${DEV_MODE} Mode on port no ${PORT}`);
