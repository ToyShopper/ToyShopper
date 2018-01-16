const router = require('express').Router();
const { Product } = require('../db/models');
const { Category } = require('../db/models');

router.get('/:category/products', (req, res, next) => {
  Category.findOne({
    where: {name: req.params.category}
  })
  .then(category => {
    return Product.findAll({
      include: [{ model: Category, where: {id: category.id} }],
    });
  })
  .then(products => res.json(products))
  .catch(next);
});

module.exports = router;
