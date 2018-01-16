const router = require('express').Router();
const { Product } = require('../db/models');
const { Review } = require('../db/models');
const { Category } = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  // let's set up different query condition based on user's role
  let where = {},
    attributes = ['id', 'title', 'price', 'imageURL', 'secondaryImages'];
  if (req.user && req.user.role === 'admin') {
    // admins should be able to see product inventory
    attributes.push('quantity');
  } else {
    // only show available products for non admin users
    where = { quantity: { $gt: 0 } };
  }

  Product.findAll({
    where: where,
    include: [{ model: Category }],
    // explicitly select only the columns needed
    attributes: attributes,
  })
    .then(products => res.json(products))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(product => {
      res.json(product);
    })
    .catch(next);
});

router.get('/search/:keyword', (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    Product.findAll({
      where: {
        title: { $iLike: '%' + req.params.keyword + '%' },
      },
      include: [{ model: Category }],
    })
      .then(products => res.json(products))
      .catch(next);
  } else {
    Product.findAll({
      where: {
        quantity: { $gt: 0 },
        title: { $iLike: '%' + req.params.keyword + '%' },
      },
      include: [{ model: Category }],
    })
      .then(products => res.json(products))
      .catch(next);
  }
});

router.get('/:id', (req, res, next) => {
  Product.findOne({
    where: {
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
      let averageRating = findAverageRating(product)
      console.log(averageRating);
      product.update({averageRating})
      .then(updated => {
        res.json(updated)
      })
      // res.json(product);
    })
    .catch(next);
});

function findAverageRating(product) {
  if (product.reviews && product.reviews.length) {
    let reviews = product.reviews;
    let averageRating =
      reviews
        .map(review => review.rating)
        .reduce((sum, rating) => sum + rating) / reviews.length;
    return Number(averageRating.toFixed(2));
  } return 5;
}

router.post('/:id/categories', (req, res, next) => {
  Category.findOne({
    where: {
      name: req.body.name,
    },
  })
    .then(category => {
      if (!category) {
        Category.create(req.body).then(newCategory => {
          Product.findById(req.params.id).then(product => {
            product.addCategory(newCategory);
          });
        });
      } else {
        Product.findById(req.params.id).then(product => {
          product.addCategory(category);
        });
      }
    })
    .then(() => {
      res.status(201).end();
    })
    .catch(next);
});

router.delete('/:productId/categories/:categoryId', async (req, res, next) => {
  try {
    const {productId, categoryId} = req.params;
    const product = await Product.findById(productId);
    const category = await Category.findById(categoryId);
    const result = await product.removeCategory(category.id);
    res.status(204).json(result);
  } catch (err) {
    next(err);
  }
});
