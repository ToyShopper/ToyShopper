const router = require('express').Router()

/* This is how cart and item look like:
<<item>>
{id: 1, title: 'sample product', price: 19.99, quantity: 2}

<<cart>>
{
  items: {
    '1': {id: 1, title: 'sample product', price: 19.99, quantity: 2}
  },
  total: 39.98
}
*/

router.get('/', (req, res, next) => {
  let cart = req.session.cart || {items: {}, total: 0 };
  cart.total = calculateTotal(cart.items);
  Object.keys(cart.items).forEach(itemId => {
    const item = cart.items[itemId];
    if (item.quantity === 0) {
      delete cart.items[item.id];
    }
  });
  req.session.cart = cart;
  res.json(cart);
})

router.post('/', (req, res, next) => {
  let cart = req.session.cart || {items: {}, total: 0 };
  const item = req.body;
  if (cart.items[item.id]) {
    cart.items[item.id].quantity += Number(item.quantity);
  } else {
    cart.items[item.id] = item;
  }
  cart.total = calculateTotal(cart.items);
  req.session.cart = cart;
  res.json(cart);
});

router.put('/', (req, res, next) => {
  let cart = req.session.cart || {items: {}, total: 0};
  const items = req.body;
  Object.keys(items).forEach(itemId => {
    const item = items[itemId];
    cart.items[itemId].quantity = Number(item.quantity);
    if (item.quantity === 0) {
      delete cart.items[item.id];
    }
  });
  cart.total = calculateTotal(cart.items);
  req.session.cart = cart;
  res.json(cart);
});

router.delete('/:id', (req, res, next) => {
  let cart = req.session.cart || { items: {}, total: 0 };
  const itemId = req.params.id;
  if (cart.items[itemId]) {
    delete cart.items[itemId];
  }
  cart.total = calculateTotal(cart.items);
  req.session.cart = cart;
  res.json(cart);
});

function calculateTotal(items) {
  const totalAmount = Object.keys(items).reduce((total, itemId) => {
    const item = items[itemId];
    return total + Number(item.price) * Number(item.quantity);
  }, 0);
  return Math.round(totalAmount * 100) / 100;
}

module.exports = router;
