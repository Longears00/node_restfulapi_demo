
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=> {

});

router.post('/', (req, res, next)=> {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity,
      };
    res.status('201').json({
        message: 'products works',
        createOder: order,
      });
  });

router.get('/:orderId', (req, res, next)=> {

});

router.delete('/:orderId', (req, res, next)=> {

});

module.exports = router;
