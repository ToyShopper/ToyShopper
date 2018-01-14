const Sequelize = require('sequelize');
const db = require('../db');

const Address = db.define('address', {
  streetAddress: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING,
    validate: {
      allowNull: false,
      len: 2,
    },
  },
  zipCode: {
    type: Sequelize.INTEGER,
    validate: {
      len: 5,
    },
  },
});

module.exports = Address;
