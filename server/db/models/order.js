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
    type: Sequelize.ENUM('CREATED', 'PROCESSING', 'CANCELLED', 'COMPLETED')
  },
  email: {
    type: Sequelize.STRING,
    validate : {
      isEmail: true,
    }
  }
});

module.exports = Order;
