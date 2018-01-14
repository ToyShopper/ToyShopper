const router = require('express').Router();
const { Product } = require('../db/models');
const { Review } = require('../db/models');
const { User } = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  Product.findAll({
    // explicitly select only the columns needed
    attributes: ['id', 'title', 'price', 'imageURL', 'secondaryImages'],
  })
    .then(products => res.json(products))
    .catch(next);
});

router.get('/search/:keyword', (req, res, next) => {
  Product.findAll({
    where: { title: { $like: '%' + req.params.keyword + '%' } },
  })
    .then(products => res.json(products))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(next);
});

router.get('/:id/reviews', (req, res, next) => {
  Review.findAll({
    where: {
      productId: req.params.id,
    },
    include: [
      {
        model: User,
        attributes: ['firstName', 'lastName'],
      },
    ],
  })
    .then(reviews => res.json(reviews))
    .catch(next);
});
