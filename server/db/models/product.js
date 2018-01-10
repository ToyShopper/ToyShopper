const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.DECIMAL,
    get() {
      return '$' + this.getDataValue('price').toLocaleString('en-US', { style: 'currency', currency: 'USD'});
    }
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: 'https://target.scene7.com/is/image/Target/14025792?wid=520&hei=520&fmt=pjpeg'
  },
  quantity: {
    type: Sequelize.INTEGER
  }
});

module.exports = Product;
