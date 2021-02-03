const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');
const xss = require('xss-clean');
const mongoSanatize = require('express-mongo-sanitize');
const hpp = require('hpp');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/error');
const colors = require('colors');
const cookieParser = require('cookie-parser');

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(helmet());

app.use(xss());

app.use(mongoSanatize());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use(hpp());

app.use(cors());

const auth = require('./routes/auth');
const users = require('./routes/users');
const classes = require('./routes/classses');
const students = require('./routes/students');
const grades = require('./routes/grades');
const subjects = require('./routes/subjects');
const posts = require('./routes/posts');

app.use('/api/v2/auth', auth);
app.use('/api/v2/users', users);
app.use('/api/v2/classes', classes);
app.use('/api/v2/classes', students);
app.use('/api/v2/grades', grades);
app.use('/api/v2/subjects', subjects);
app.use('/api/v2/posts', posts);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
