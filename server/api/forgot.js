const router = require('express').Router();
const { User } = require('../db/models');
const crypto = require('crypto');
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAILER_GMAIL_ADDRESS,
    pass: process.env.MAILER_GMAIL_PASSWORD,
  }
});


router.post('/', (req, res, next) => {
  console.log('hits post')
  let token = crypto.randomBytes(20).toString('hex');
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then((user) => {
    console.log(user)
    user.resetPasswordToken = token.toString();
    user.resetPasswordExpires = Date.now() + 3600000;
    user.save();
    return user;
  })
  .then(user => {
    console.log('hits spread', user)
    const mailOptions = {
      to: user.email,
      from: process.env.MAILER_GMAIL_ADDRESS,
      text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
      'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
      'http://' + req.headers.host + '/reset/' + token + '\n\n' +
      'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    };
    console.log('mailoptions', mailOptions)
    transporter.sendMail(mailOptions);
  })
  .catch(err => console.log(err));
});

module.exports = router;
