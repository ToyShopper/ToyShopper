const router = require('express').Router();
const { User } = require('../db/models');
const crypto = require('crypto');

router.post('/forgot', (req, res, next) => {
  crypto.randomBytes(20, (err, buf) => {
    let token = buf.toString('hex');
    console.log(token);
    next(err, token)
  });
  })

