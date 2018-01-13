const router = require('express').Router();
const { Product } = require('../db/models');
const { ProductCategory } = require('../db/models');

router.get('/:category', (req, res, next) => {
  ProductCategory.findOne({ where: { name: req.params.category } })
    .then(category => {
      return category.id;
    })
    .then(id => {
      Product.findAll({
        where: {
          quantity: { $gt: 0 },
          CategoryId: id,
        },
      }).then(products => res.json(products));
    });
});

module.exports = router;
