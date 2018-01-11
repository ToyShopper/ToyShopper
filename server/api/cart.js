const router = require('express').Router()
// OB/DK: dead code
//const { Product } = require('../db/models')

router.get('/', (req, res, next) => {
  let cart = req.session.cart || {items: {}, total: 0 };
  res.json(cart);
})

// OB/DK: the router handler body is a little long, consider making utility functions for the cart, or a cart class
// OB/DK: consider renaming the route POST /api/cart/items
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
  res.json(req.session.cart);
});

// OB/DK: consider renaming to DELETE /api/cart/items
router.delete('/:id', (req, res, next) => {
  let cart = req.session.cart || { items: {}, total: 0 };
  const itemId = req.params.id;
  if (cart.items[itemId]) {
    delete cart.items[itemId];
  }
  cart.total = calculateTotal(cart.items);
  req.session.cart = cart;
  res.json(req.session.cart);
});

function calculateTotal(items) {
  return Object.keys(items).reduce((total, itemId) => {
    const item = items[itemId];
    return total + item.price * item.quantity;
  }, 0);
}

module.exports = router;
