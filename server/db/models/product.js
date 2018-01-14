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
    type: Sequelize.DECIMAL, // this will format the price: ,
    // get() {
    //   return '$' + this.getDataValue('price').toLocaleString('en-US', { style: 'currency', currency: 'USD'});
    // }
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
    type: Sequelize.VIRTUAL,
    set (valueToBeSet) { // defines the 'setter'
     this.setDataValue('averageRating', valueToBeSet)
     // this setter will automatically set the 'name' property to be uppercased
   }, get() {
     return this.getDataValue('averageRating')
   }
  }
});

module.exports = Product;
