const router = require('express').Router();
const { Product } = require('../db/models');
const { Review } = require('../db/models');
const { User } = require('../db/models');
const { Category } = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  Product.findAll({
    // explicitly select only the columns needed
    where: { quantity: { $gt: 0 } },
    include: [{ model: Category }],
    attributes: ['id', 'title', 'price', 'imageURL', 'secondaryImages'],
  })
    .then(products => res.json(products))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Product.create(req.body).then(product => res.json(product))
  .catch(next);
});

router.get('/search/:keyword', (req, res, next) => {
  Product.findAll({
    where: {
      quantity: { $gt: 0 },
      title: { $iLike: '%' + req.params.keyword + '%' },
    },
    include: [{ model: Category }],
  })
    .then(products => res.json(products))
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
      { model: Category },
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

router.put('/:id', (req, res, next) => {
  Product.findById(req.params.id).then(product => {
    product.update(req.body).then(newProduct => res.json(newProduct))
    .catch(next);
  });
});
