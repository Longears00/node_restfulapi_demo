
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodekb', {
    useMongoClient: true,
  });
const db = mongoose.connection;

//check connection
db.once('openUri', ()=> {
    console.log('connection mongodb');
  });

//check db
db.on('error', (err)=> {
    console.log(err);
  });

const productsRouter = require('./api/routes/products');
const orderRouter = require('./api/routes/order');
const userRouter = require('./api/routes/user');
exports.test = function (req, res) {
  res.render('test');
};

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));

//extend : false not allow pass rich body params
app.use(bodyParser.urlencoded({ extended: true }));
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

  next();
});

//middleware products
app.use('/products', productsRouter);
app.use('/order', orderRouter);
app.use('/user', userRouter);

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
