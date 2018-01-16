const router = require('express').Router();
const { Product } = require('../db/models');
const { Category } = require('../db/models');

router.get('/', (req, res, next) => {
  Category.findAll()
  .then(categories => res.json(categories));
})

router.post('/', (req, res, next) => {
  Category.create(req.body)
  .then(category => res.json(category))
})

router.get('/:category/products', (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    Category.findOne({
      where: { name: req.params.category },
    })
      .then(category => {
        return Product.findAll({
          include: [{ model: Category, where: { id: category.id } }],
        });
      })
      .then(products => res.json(products))
      .catch(next);
  } else {
    Category.findOne({
      where: { name: req.params.category },
    })
      .then(category => {
        return Product.findAll({
          where: {
            quantity: {
              $gt: 0,
            },
          },
          include: [{ model: Category, where: { id: category.id } }],
        });
      })
      .then(products => res.json(products))
      .catch(next);
  }
});

module.exports = router;
