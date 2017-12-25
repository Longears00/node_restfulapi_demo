
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');

router.get('/', (req, res, next)=> {
    Product.find().exec().then(docs=> {
        console.log(docs);
        res.status('200').json({
            message: 'products works',
          });
      }).catch(err=>console.log(err));

  });

router.post('/', (req, res, next)=> {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
      });
    product.save().then(result=> {
        console.log(result);
        res.status('201').json({
            message: 'products works',
            createdProduct: product,
          });
      }).catch(err=> {
        console.log(err);
      });
  });

router.get('/:id', (req, res, next)=> {
    const id = req.params.id;
    Product.findById(id).exec().then(doc=> {
        console.log(doc);
        if (doc)
        {
          res.status(200).json(doc);
        } else {
          res.status(404).json('no');
        }
      }).catch(err=>  {console.log(err);});
  });

router.patch('/:id', (req, res, next)=> {
    const id = req.params.id;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }

    console.log(updateOps);

    Product.update({ _id: id }, {
        $set: { updateOps },
      }).exec().then(res=> {
        console.log(res);
      }).catch(result=> {
        console.log(result);
      });

  });

router.delete('/:id', (req, res, next)=> {
      const id = req.params.id;
      Product.remove({ _id: id }).exec().then(result=> {
          res.status(200).json(result);
        }).catch(err=>console.log(err));
    });

module.exports = router;
