const Sequelize = require('sequelize');
const db = require('../db');

// OB/DK: categories don't "need" to be a model, if we had a category field that is a string, it would simplify looking it up; however a model gives you the ability to manage categories as a tree
// OB/DK: you only "need" to make a table when information (rows) are dynamic to the user

// OB/DK: my first impression was that this was a join table (based on its name)
const ProductCategory = db.define('product_category', {
  name: {
    type: Sequelize.STRING
  }
});

module.exports = ProductCategory;
