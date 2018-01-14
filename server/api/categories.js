const router = require('express').Router();
const { Product } = require('../db/models');
const { Category } = require('../db/models');

router.get('/:category', (req, res, next) => {
  Category.findOne({ where: { name: req.params.category }, include:[{model: Product}] })
    .then(products => {
      res.json(products);
    })
    // .then(id => {
    //   Product.findAll({
    //     where: {
    //       quantity: { $gt: 0 },
    //       CategoryId: id,
    //     },
    //   }).then(products => res.json(products));
    // });
});

module.exports = router;
