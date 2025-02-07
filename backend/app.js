const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const feedRoutes = require('./routes/feed');

const app = express();

app.use(bodyParser.json());

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers',  'Content-Type, Authorization');
  next();
});

app.use('/feed', feedRoutes);

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.5xgasid.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0`)
  .then(result=>{
  app.listen(8080);
})
  .catch(err => console.log(err));

app.listen(8080);