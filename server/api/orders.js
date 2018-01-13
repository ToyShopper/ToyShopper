const router = require('express').Router();
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
