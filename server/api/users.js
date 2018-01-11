const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email', 'firstName', 'lastName']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:id/', (req, res, next) => {
  User.findById(req.params.id)
  .then(user => res.json(user))
  .catch(next);
});

router.put('/:id/', function (req, res, next) {
  console.log(req.body)
  User.update({
    isAdmin: true
  }, {
    where: {id: req.params.id}
  }
  )
  .then(user => res.json(user));
});
