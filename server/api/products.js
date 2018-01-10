const router = require('express').Router()
const { Product } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Product.findAll({
    // explicitly select only the columns needed
    attributes: ['id', 'name', 'price', 'imageURL']
  })
    .then(products => res.json(products))
    .catch(next)
})
