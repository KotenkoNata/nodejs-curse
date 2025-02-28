const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const todoRoutes = require('./routes/todos');

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log('Some middleware');
  next();
})

app.use(todoRoutes);

app.listen(3000);
