const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  // OB/DK: might be redundant with info stored in order_item, not necessarily bad thing, just a tradeoff
  total: {
    type: Sequelize.DECIMAL
  },
  orderedAt: {
    type: Sequelize.DATE
  },
  status: {
    // OB/DK: you can address linter issues by changing rules that are not relevant
    type: Sequelize.ENUM('SHIPPED', 'EN ROUTE', 'BEING PREPARED')
  }
});

module.exports = Order;
