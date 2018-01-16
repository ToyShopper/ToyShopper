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
  Product.create(req.body)
    .then(product => res.json(product))
    .catch(next);
});

router.get('/search/:keyword', (req, res, next) => {
  Product.findAll({
    where: {
      quantity: { $gt: 0 },
      title: { $iLike: '%' + req.params.keyword + '%' },
    },
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
      {
        model: Category,
      },
    ],
  })
    .then(product => {
      res.json(product);
    })
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
  Product.findOne({
    where: {
      id: req.params.id,
    },
    include: [{ model: Category }],
  })
    .then(product => {
      product.update(req.body);
      res.json(product);
    })
    .catch(next);
});

// Category.findOne({
//   where: {
//     name: req.body.categoryName,
//   },
// }).then(category => {
//   return Product.findOne({
//     where: {
//       id: req.params.id,
//     },
//     include: [{ model: Category }],
//   })
//     .then(product => {
//       product
//         .addCategory(category)
//         .then(updatedProduct => {
//           return updatedProduct;
//         })
//         res.json(product)
//     })
//     .catch(next);
// });

//TO-DO: find cleaner way to accomplish this
router.put('/addCategory/:id', (req, res, next) => {
  Category.findOne({
    where: {
      name: req.body.categoryName,
    },
  })
    .then(category => {
      Product.findOne({
        where: {
          id: req.params.id,
        },
      }).then(product => {
        product
          .addCategory(category)
          .then(() => {
            return Product.findOne({
              where: {
                id: req.params.id,
              },
              include: [{ model: Category }],
            });
          })
          .then(newProduct => {
            res.json(newProduct);
          });
      });
    })
    .catch(next);
});

//TO-DO: find cleaner way to accomplish this
router.put('/removeCategory/:id', (req, res, next) => {
  Category.findOne({
    where: {
      name: req.body.categoryName,
    },
  })
    .then(category => {
      Product.findOne({
        where: {
          id: req.params.id,
        },
      }).then(product => {
        product
          .removeCategory(category)
          .then(() => {
            return Product.findOne({
              where: {
                id: req.params.id,
              },
              include: [{ model: Category }],
            });
          })
          .then(newProduct => {
            res.json(newProduct);
          });
      });
    })
    .catch(next);
});
