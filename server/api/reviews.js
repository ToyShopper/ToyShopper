const router = require('express').Router();
const { Review } = require('../db/models');
const { User } = require('../db/models');
const { Product } = require('../db/models');

module.exports = router;

router.get('/products/:id', (req, res, next) => {
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

function findAverageRating(product) {
  if (product.reviews.length) {
    let reviews = product.reviews;
    let averageRating =
      reviews
        .map(review => review.rating)
        .reduce((sum, rating) => sum + rating) / reviews.length;
        return averageRating.toFixed(2);
  }
}

router.post('/', (req, res, next) => {
  let review = req.body;
  review.userId = review.userId || req.user.id;
  Review.create(review)
    .then(createdReview => Review.findById(createdReview.id, {
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName'],
        },
      ],
    }))
    .then(associated => {
      Product.findOne({
        where: {
          id: review.productId
        },
        include: [{
          model: Review
        }]
      })
      .then(product => {
        let averageRating = findAverageRating(product)
        console.log(averageRating);
        product.update({
          averageRating
        })
      })
      res.json(associated);
    });
});
