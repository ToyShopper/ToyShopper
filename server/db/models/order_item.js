const Sequelize = require('sequelize');
const db = require('../db');

const OrderItem = db.define('order_item', {
  quantity: {
    type: Sequelize.INTEGER
  },
  priceAtOrder: {
    type: Sequelize.DECIMAL
  }
});

module.exports = OrderItem;
