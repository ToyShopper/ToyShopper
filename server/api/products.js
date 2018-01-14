const router = require('express').Router();
const { Product } = require('../db/models');
const { Review } = require('../db/models');
const { User } = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  Product.findAll({
    // explicitly select only the columns needed
    where: { quantity: { $gt: 0 } },
    attributes: ['id', 'title', 'price', 'primaryImageURL', 'secondaryImages'],
  })
    .then(products => res.json(products))
    .catch(next);
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
    include: [
      {
        model: Review,
      },
    ],
  })
    .then(product => res.json(product))
    .catch(next);
});

function findAverageRating(product) {
  if (product.reviews.length) {
    let reviews = product.reviews;
    let averageRating =
      reviews
        .map(review => review.rating)
        .reduce((sum, rating) => sum + rating) / reviews.length;
  }
}

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
    .then(reviews => {
      res.json(reviews);
    })
    .catch(next);
});
