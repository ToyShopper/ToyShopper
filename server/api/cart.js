const router = require('express').Router()
//const { Product } = require('../db/models')

router.get('/', (req, res, next) => {
  let cart = req.session.cart || {items: {}, total: 0 };
  res.json(cart);
})

router.post('/', (req, res, next) => {
  // item
  // {id: 1, title: 'sample product', price: 19.99, quantity: 2}
  // cart
  // {items: {1: {id: 1, title: 'sample product', price: 19.99, quantity: 2}},
  // total: 39.98}
  let cart = req.session.cart || {items: {}, total: 0 };
  const item = req.body;
  if (cart.items[item.id]) {
    cart.items[item.id].quantity += item.quantity;
  } else {
    cart.items[item.id] = item;
  }
  cart.total = calculateTotal(cart.items);
  req.session.cart = cart;
  res.status(201).json(req.session.cart);
});

function calculateTotal(items) {
  return Object.keys(items).reduce((total, itemId) => {
    const item = items[itemId];
    return total + item.price * item.quantity;
  }, 0);
}

module.exports = router;
