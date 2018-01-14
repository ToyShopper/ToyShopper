const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
  price: {
    type: Sequelize.DECIMAL
  },
  primaryImageURL: {
    type: Sequelize.STRING,
    defaultValue:
      'https://target.scene7.com/is/image/Target/14025792?wid=520&hei=520&fmt=pjpeg',
  },
  secondaryImages: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
  averageRating: {
    type: Sequelize.DECIMAL,
    defaultValue: 5,
  },
});

module.exports = Product;
