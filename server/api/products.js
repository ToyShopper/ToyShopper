const router = require('express').Router()
const { Product } = require('../db/models')
const { Review } = require('../db/models')
const { User } = require('../db/models')
const { ProductCategory } = require('../db/models')


module.exports = router

router.get('/', (req, res, next) => {
  Product.findAll({
    // explicitly select only the columns needed
    attributes: ['id', 'title', 'price', 'imageURL']
  })
    .then(products => res.json(products))
    .catch(next)
})

// OB/DK: this route is not exactly modern RESTful standard
/*
GET /api/products/category/apparelOrWhatever <= does this come back with products? or categories?
...or...
GET /api/products/apparelOrWhatever <= also potentially unclear
...consider...
GET /api/categories/apparelOrWhatever/products <= this is more standard
...or...
GET /api/products?categoryName=apparelOrWhatever <= also standard
*/
router.get('/category/:category', (req, res, next) => {
  ProductCategory.findOne({where:{name:req.params.category}})
  .then(category => {
    return category.id})
    .then(id => {
      // OB/DK: looks like you're using a category ID to find a product
      Product.findAll({where:{id}}) // OB/DK: watch out, this will resolve with an array of products
      // OB/DK: nested .then below (could lead to issues)
      .then(product => res.json(product))
    })
    // OB/DK: no .catch
  })
// OB/DK: funky indentation above


router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id)
  .then(product => res.json(product))
  .catch(next)
})

// OB/DK: could do a query string here instead, e.g. /api/reviews?productId=4
router.get('/:id/reviews', (req, res, next) => {
  Review.findAll({
    where: {
      productId: req.params.id
    },
    include: [{
      model: User,
      attributes: ['firstName', 'lastName']
    }]
  })
  .then(reviews => res.json(reviews))
  .catch(next);
});
