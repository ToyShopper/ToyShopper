const router = require('express').Router();
const { Order, User } = require('../db/models');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAILER_GMAIL_ADDRESS,
    pass: process.env.MAILER_GMAIL_PASSWORD,
  }
});


router.post('/:id', (req, res, next) => {
  Order.findOne({
    where: {
      id: req.params.id
    },
    include: [User]
  })
  .then((order) => {
    if (order.status === 'PROCESSING' || order.status === 'COMPLETED') {
      const mailOptions = {
        to: order.user.email,
        from: process.env.MAILER_GMAIL_ADDRESS,
        subject: 'The status of your order has changed',
        text: 'Order # ' + order.id + '\n\nThe status of your order is now: ' + order.status + '.\n\nThank you for shopping with us.'
      };
      transporter.sendMail(mailOptions);
    }
    res.sendStatus(200);
  })
  .catch(err => console.log(err));
});

module.exports = router;
