/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User, Product, Category, Review, Order, OrderItem} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', firstName: 'Cody', lastName: 'G', streetAddress: '123 Maple Ave', city: 'New York', state: 'NY', zipCode: '10001', role: 'admin'}),
    User.create({email: 'murphy@email.com', password: '123', firstName: 'Murph', lastName: 'Y', streetAddress: '456 Elm Stret', city: 'New Orleans', state: 'LA', zipCode: '70118', role: 'user'}),
  ]);

  const categories = await Promise.all([
    Category.create({
      name: 'Baby'
    }),
    Category.create({
      name: 'Apparel'
    }),
    Category.create({
      name: 'Nursery'
    })
  ]);


  const products = await Promise.all([
    Product.create({title: 'Baby Starters Plush Snuggle Buddy , Sugar N Spice Doll', price: 12.60, primaryImageURL: 'https://images-na.ssl-images-amazon.com/images/I/41InACBfmhL._AC_US240_FMwebp_QL65_.jpg', quantity: 3, description: 'a cool toy'})
    .then(product => product.addCategories([1])),
    Product.create({title: 'Sock Monkey Hooded Towel and 2 Washcloth Set by Baby', price: 17.62, primaryImageURL: 'https://images-na.ssl-images-amazon.com/images/I/51hXthat5oL._AC_US240_FMwebp_QL65_.jpg', quantity: 4, description: 'a cool toy'})
    .then(product => product.addCategories([1, 2])),
    Product.create({title: 'Rashti & Rashti My First Year Picture Frame, Silver', price: 18.99, primaryImageURL: 'https://images-na.ssl-images-amazon.com/images/I/512kUUmpbWL._AC_US240_FMwebp_QL65_.jpg', quantity: 0, description: 'a cool toy'})
    .then(product => product.addCategories([3]))
    ,
    Product.create({title: 'Baby Starters Sock Monkey Blanket', price: 17.99, primaryImageURL: 'https://images-na.ssl-images-amazon.com/images/I/51+8BLb2OSL._AC_US240_FMwebp_QL65_.jpg', quantity: 10, description: 'a cool toy'})
    .then(product => product.addCategories([1, 3]))
    ,
    Product.create({title: 'Babystarters Sock Monkey Sweater Knit Plush Toy', price: 21.00, primaryImageURL: 'https://images-na.ssl-images-amazon.com/images/I/51ckaVeINkL._AC_US240_FMwebp_QL65_.jpg', quantity: 5, description: 'a cool toy'})
    .then(product => product.addCategories([1, 2]))
  ])
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  });

  const reviews = await Promise.all([
    Review.create({
      text: 'this product is pretty cool',
      rating: 5
    })
    .then(review => {
      review.setUser(1);
      review.setProduct(1);
    }),
    Review.create({
      text: 'this product is not cool',
      rating: 2
    })
    .then(review => {
      review.setUser(2);
      review.setProduct(1);
    }),
    Review.create({
      text: 'this product is just ok',
      rating: 3
    })
    .then(review => {
      review.setUser(1);
      review.setProduct(2);
    }),
    Review.create({
      text: 'this product stinks',
      rating: 0
    })
    .then(review => {
      review.setUser(2);
      review.setProduct(3);
    })
  ]);

  const orders = await Promise.all([
    Order.create({
      total: 15,
      orderedAt: Date.now(),
      status: 'CREATED'
    })
    .then(order => {
      order.setUser(1);
    }),
    Order.create({
      total: 100.25,
      orderedAt: Date.now(),
      status: 'PROCESSING'
    })
    .then(order => {
      order.setUser(1);
    }),
    Order.create({
      total: 1337.88,
      orderedAt: Date.now(),
      status: 'COMPLETED'
    })
    .then(order => {
      order.setUser(2);
    })
  ]);

  const orderItems = await Promise.all([
    OrderItem.create({
      quantity: 1,
      priceAtOrder: 12
    })
    .then(orderItem => {
      orderItem.setProduct(1);
      orderItem.setOrder(1);
    }),
    OrderItem.create({
      quantity: 1,
      priceAtOrder: 20
    })
    .then(orderItem => {
      orderItem.setProduct(2);
      orderItem.setOrder(1);
    }),
    OrderItem.create({
      quantity: 2,
      priceAtOrder: 5.64
    })
    .then(orderItem => {
      orderItem.setProduct(3);
      orderItem.setOrder(1);
    }),
    OrderItem.create({
      quantity: 17,
      priceAtOrder: 35.5
    })
    .then(orderItem => {
      orderItem.setProduct(4);
      orderItem.setOrder(1);
    }),
    OrderItem.create({
      quantity: 1,
      priceAtOrder: 99999.33
    })
    .then(orderItem => {
      orderItem.setProduct(5);
      orderItem.setOrder(2);
    }),
    OrderItem.create({
      quantity: 6,
      priceAtOrder: 123.56
    })
    .then(orderItem => {
      orderItem.setProduct(1);
      orderItem.setOrder(2);
    }),
    OrderItem.create({
      quantity: 21,
      priceAtOrder: 5.87
    })
    .then(orderItem => {
      orderItem.setProduct(2);
      orderItem.setOrder(2);
    }),
    OrderItem.create({
      quantity: 6,
      priceAtOrder: 123.56
    })
    .then(orderItem => {
      orderItem.setProduct(3);
      orderItem.setOrder(3);
    }),
    OrderItem.create({
      quantity: 6,
      priceAtOrder: 123.56
    })
    .then(orderItem => {
      orderItem.setProduct(4);
      orderItem.setOrder(3);
    }),
    OrderItem.create({
      quantity: 6,
      priceAtOrder: 123.56
    })
    .then(orderItem => {
      orderItem.setProduct(5);
      orderItem.setOrder(3);
    })
  ]);
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${categories.length} categories`)
  console.log(`seeded ${reviews.length} reviews`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${orderItems.length} order items`)




  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
