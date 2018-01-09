const Sequelize = require('sequelize');
const db = require('../db');

const ProductCategory = db.define('product_category', {
  category: {
    type: Sequelize.STRING
  }
});

module.exports = ProductCategory;
