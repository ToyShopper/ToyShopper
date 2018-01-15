const router = require('express').Router();
const { Review } = require('../db/models');
const { User } = require('../db/models');

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
      res.json(associated);
    });
});
