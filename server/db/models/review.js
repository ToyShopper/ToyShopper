const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
  text: {
    type: Sequelize.TEXT,
    validate: {
      len: [5, 600]
    }
  }
});

module.exports = Review;
