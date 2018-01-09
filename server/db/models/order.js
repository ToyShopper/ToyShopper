const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  total: {
    type: Sequelize.DECIMAL
  },
  orderedAt: {
    type: Sequelize.DATE
  },
  status: {
    type: Sequelize.ENUM('SHIPPED', 'EN ROUTE', 'BEING PREPARED')
  }
});

module.exports = Order;
