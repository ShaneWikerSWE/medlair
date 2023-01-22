// Requires
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const multer = require('multer');
const multerConfig = require('./util/multerConfig');

// Defines
const express = require('express');
const app = require('express')();
const articleRoutes = require('./routes/article');
const authRoutes = require('./routes/auth');
const newsLetterRoutes = require('./routes/newsLetter');
const errorHandler = require('./middlewares/errorMiddleware');

// Middlewares
app.use(helmet());

app.use(cors());

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(
  multer({
    storage: multerConfig.fileStorage,
    fileFilter: multerConfig.fileFilter,
  }).single('image')
);

// Routes
app.use('/article', articleRoutes);
app.use('/auth', authRoutes);
app.use('/newsletter', newsLetterRoutes);

// ERROR MIDDLEWARE
app.use(errorHandler);

// Listening
app.listen(8080);
