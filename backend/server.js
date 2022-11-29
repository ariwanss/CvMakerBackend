const express = require('express');
const dotenv = require('dotenv').config();
const connectDb = require('./config/db');
const { errorHandler } = require('./middlewares/errorMiddleware');

const app = express();
connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/api/cv', require('./routes/cvItemRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);

app.listen(5000, () => { console.log('server started') });