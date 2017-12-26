
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');

router.get('/', (req, res, next)=> {
    Order.find()
.select('product quantity _id')
.populate('product', 'name')
    .exec().then(docs=> {
        res.status('200').json({
            message: 'orders works',
            orders: docs,
          });
      }).catch(err=>console.log(err));

  });

router.post('/', (req, res, next)=> {
    Product.findById(req.body.productId)
    .then(doc=> {
        if (!doc) {
          return res.status(400).json({
              message: err,
            });
        }

        const order = new Order({
            product: req.body.productId,
            quantity: req.body.quantity,
          });
        return order.save();
      }).then(result=> {
        console.log(result);
        res.status('201').json({
            message: 'create products',
            createdProduct: {
              name: result.name,
              id: result._id,
              request: {
                  type: 'GET',
                  url: 'localhost:3000/order/' + result._id,
                },
            },
          });
      }).catch(err=> {
          res.status('500').json({
              message: err,
            });
        });

  });

router.get('/:orderId', (req, res, next)=> {
    const id = req.params.id;
    Order.findById(id).exec().then(doc=> {
        console.log(doc);
        if (doc)
        {
          res.status(200).json(doc);
        } else {
          res.status(404).json('no');
        }
      }).catch(err=>  {console.log(err);});
  });

router.delete('/:orderId', (req, res, next)=> {
    const id = req.params.id;
    Order.remove({ _id: id }).exec().then(result=> {
        res.status(200).json(result);
      }).catch(err=>console.log(err));
  });

module.exports = router;
