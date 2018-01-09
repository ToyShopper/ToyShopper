const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.BLOB
  },
  price: {
    type: Sequelize.DOUBLE
  }
});

module.exports = Product;
