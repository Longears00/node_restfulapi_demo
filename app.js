
const express = require('express');
const app = express();

const productsRouter = require('./api/routers/products');

//middleware products
app.use('/products', productsRouter);

module.exports = app;
