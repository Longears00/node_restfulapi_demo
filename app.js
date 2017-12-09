
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const productsRouter = require('./api/routes/products');
const orderRouter = require('./api/routes/order');

app.use(morgan('dev'));

//extend : false not allow pass rich body params
app.use(bodyParser.urlencoded({ extend: false }));
app.use(bodyParser.json());

//middleware cross resource
app.use((req, res, next)=> {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Accept,Authorization');
  if (req.method ===  'OPTIONS')
  {
    res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
    return res.status(200).json({});
  }
});

//middleware products
app.use('/products', productsRouter);
app.use('/order', orderRouter);

app.use((req, res, next) => {
  const error = new Error('not found');
  error.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: {
      message: error.message,
    }, });
});

module.exports = app;
