const express = require('express');

const feedRoutes = require('./routes/feed');

const app = express();

//GET /feed/posts
app.use('/posts', feedRoutes);

app.listen(8080);