
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

//give user a token
router.post('/login', (req, res, next)=> {
    User.find({ email: req.body.email }).exec()
    .then(user=> {
        if (user.length >= 1) {
          //give user json web token
          const token = jwt.sign({ email: user.email }, process.env.jwt,
          {
              expiresIn: '1h',
            });
          return res.status(200).json({
            message: 'user not exists',
            token: token,
          });
        }else {
          return res.status(401).json({
            message: 'user not exists',
          });
        }
      }).catch(err=>console.log(err));
  });

router.post('/signup', (req, res, next)=> {
    User.find({ email: req.body.email }).exec()
    .then(user=> {
        if (user.length >= 1) {
          return res.status(409).json({
              message: 'user already has one',
            });
        } else {
          const user = new User({
              email: req.body.email,
              password: req.body.password,
            });
          return user.save().then(result=> {
              res.status(200).json({
                  message: 'user created',
                });
            });
        }
      }).catch(err=>console.log(err));
  });

router.delete('/:id', (req, res, next)=> {
    const id = req.params.id;
    User.remove({ _id: id }).exec().then(result=> {
        res.status(200).json(result);
      }).catch(err=>console.log(err));
  });
module.exports = router;
