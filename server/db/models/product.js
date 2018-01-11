const Sequelize = require('sequelize');
const db = require('../db');

// OB/DK: totally non-urgent consider validations (e.g. unique title, required fields)
const Product = db.define('product', {
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  // OB/DK: you can store price as an INTEGER and measure in cents to avoid floating point math woes
  price: {
    // OB/DK: commented out code is "dead code", should generally be not in master (code hygiene); in this case, the code could be pasted into an issue
    type: Sequelize.DECIMAL// this will format the price: ,
    // get() {
    //   return '$' + this.getDataValue('price').toLocaleString('en-US', { style: 'currency', currency: 'USD'});
    // }
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
