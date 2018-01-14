const router = require('express').Router();
const { Product } = require('../db/models');
const { Review } = require('../db/models');
const { User } = require('../db/models');
const { ProductCategory } = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  Product.findAll({
    // explicitly select only the columns needed
    where: { quantity: { $gt: 0 } },
    attributes: ['id', 'title', 'price', 'imageURL'],
  })
    .then(products => res.json(products))
    .catch(next);
});

router.get('/add', (req, res, next) => {
  res.send('add user here');
});

router.post('/add', (req, res, next) => {
  Product.create(req.body)
  .then(product => res.json(product));
});

router.get('/search/:keyword', (req, res, next) => {
  Product.findAll({
    where: {
      quantity: { $gt: 0 },
      title: { $like: '%' + req.params.keyword + '%' },
    },
  })
    .then(products => {
      res.json(products);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Product.findOne({
    where: {
      quantity: { $gt: 0 },
      id: req.params.id,
    },
  })
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

router.put('/:id', (req, res, next) => {
  Product.findById(req.params.id)
  .then(product => {
    product.update(req.body)
    .then(newProduct => res.json(newProduct));
  });
});
