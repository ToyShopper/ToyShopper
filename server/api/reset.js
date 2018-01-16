const router = require('express').Router();
const { User } = require('../db/models');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAILER_GMAIL_ADDRESS,
    pass: process.env.MAILER_GMAIL_PASSWORD,
  }
});


router.get('/:token', (req, res, next) => {
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now}
  })
  .then(user => {
    if (!user) {
      // handle token invalid or expired
      return res.redirect('/forgot');
    }
    res.sendStatus(200);
  });
});

router.post('/:token', (req, res, next) => {
  User.findOne({
    where: {
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now()}
    }
  })
  .then(user => {
    if (!user) {
      // handle token invalid or expired
      return res.redirect('/forgot');
    }
    user.password = req.body.password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    user.save();
    const mailOptions = {
      to: user.email,
      from: process.env.MAILER_GMAIL_ADDRESS,
      subject: 'Your password has been changed',
      text: 'Hello,\n\n' +
      'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
    };
    transporter.sendMail(mailOptions);
  })
  .catch(err => console.log(err));
});

module.exports = router;
