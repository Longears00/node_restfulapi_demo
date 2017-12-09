
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=> {
  res.status('200').json({
      message: 'products works',
    });
});

router.post('/', (req, res, next)=> {
    const product = {
        name: req.body.name,
        price: req.body.price,
      };
    res.status('201').json({
        message: 'products works',
        createdProduct: product,
      });
  });

router.get('/:id', (req, res, next)=> {
    const id = req.params.id;
    res.status('200').json({
        message: 'products works',
      });
  });

router.patch('/:id', (req, res, next)=> {
    const id = req.params.id;
    res.status('200').json({
        message: 'products works',
      });
  });

router.delete('/:id', (req, res, next)=> {
    const id = req.params.id;
    res.status('200').json({
        message: 'products works',
      });
  });

module.exports = router;
