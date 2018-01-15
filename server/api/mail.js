const router = require('express').Router();
const nodemailer = require('nodemailer');
// const { Order } = require('../db/models');
// const { OrderItem } = require('../db/models');
// const { User } = require('../db/models');
// const { Product } = require('../db/models');

module.exports = router;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAILER_GMAIL_ADDRESS,
    pass: process.env.MAILER_GMAIL_PASSWORD,
  }
});

const from = process.env.MAILER_GMAIL_ADDRESS;

router.post('/', (req, res, err) => {
  const mailOptions = Object.assign({from: from}, req.body);
  transporter.sendMail(mailOptions, (err, info) => {
    err ? console.log(err) : console.log(info);
  });
  res.send(mailOptions);
});
