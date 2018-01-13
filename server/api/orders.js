const router = require('express').Router();
const db = require('../db');
const { Order } = require('../db/models');
const { OrderItem } = require('../db/models');
const { User } = require('../db/models');
const { Product } = require('../db/models');


module.exports = router;

router.get('/', (req, res, next) => {
  Order.findAll({
    attributes: ['id', 'total', 'orderedAt', 'status'],
    include: [{model: OrderItem, attributes: ['id', 'quantity', 'priceAtOrder', 'productId']}, {model: User, attributes: ['id', 'email', 'firstName', 'lastName']}]
  })
  .then(orders => res.json(orders))
  .catch(next);
});

router.get('/:id', (req, res, next) => {
  Order.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'total', 'orderedAt', 'status'],
    include: [
      {model: OrderItem, attributes: ['id', 'quantity', 'priceAtOrder', 'productId'], include: [Product]},
      {model: User, attributes: ['id', 'email', 'firstName', 'lastName']}
    ]
  })
  .then(order => res.json(order))
  .catch(next);
});

router.post('/', (req, res, next) => {
  // 1. get the current user. create a user with the given email address if not exists (for now, we will skip this part)
  // 2. create a new order with given user id (for now, we will leave user id blank)
  // 3. create order items using the order id above and given product ids
  // 4. empty the shopping cart
  const newOrder = req.body;
  Order.create(newOrder, {include: [OrderItem]})
  .then(order => {
    req.session.cart = {items: {}, total: 0};
    res.json(order)
  })
  .catch(next);
});

router.delete('/:id', (req, res, next) => {
  OrderItem.destroy({
    where: {
      orderId: req.params.id
    }
  })
  .then(Order.destroy({
    where: {
      id: req.params.id
    }
  }))
  .then(() => res.status(204).end())
  .catch(next);
});
