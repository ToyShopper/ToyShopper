const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
  text: {
    type: Sequelize.TEXT,
    validate: {
      len: [5, 600]
    }
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 5,
    }
  }
});

module.exports = Review;
