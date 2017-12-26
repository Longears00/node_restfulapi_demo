
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
  });

const fileFilter = (req, file, cb)=> {
    if (file.mimetype === 'image/png')
    {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

const upload = multer({ storage: storage, limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.get('/', (req, res, next)=> {
    Product.find().exec().then(docs=> {
        res.status('200').json({
            message: 'products works',
          });
      }).catch(err=>console.log(err));

  });

//single one file only
router.post('/', upload.single('file'), (req, res, next)=> {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path,
      });
    product.save().then(result=> {
        console.log(result);
        res.status('201').json({
            message: 'create products',
            createdProduct: {
              name: result.name,
              id: result._id,
              request: {
                  type: 'GET',
                  url: 'localhost:3000/products/' + result._id,
                },
            },
          });
      }).catch(err=> {
          res.status('500').json({
              message: err,
            });
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
