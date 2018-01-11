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

router.get('/category/:category', (req, res, next) => {
  ProductCategory.findOne({where:{name:req.params.category}})
  .then(category => {
    return category.id})
    .then(id => {
      Product.findAll({where:{id}})
      .then(product => res.json(product))
    })
  })


router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id)
  .then(product => res.json(product))
  .catch(next)
})


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
