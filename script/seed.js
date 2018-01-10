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
const {User, Product} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),


  ])

  const products = await Promise.all([
    Product.create({name: 'Baby Starters Plush Snuggle Buddy , Sugar N Spice Doll', price: 12.60, imageURL: 'https://images-na.ssl-images-amazon.com/images/I/41InACBfmhL._AC_US240_FMwebp_QL65_.jpg'}).then(),
    Product.create({name: 'Sock Monkey Hooded Towel and 2 Washcloth Set by Baby', price: 17.62, imageURL: 'https://images-na.ssl-images-amazon.com/images/I/51hXthat5oL._AC_US240_FMwebp_QL65_.jpg'}),
    Product.create({name: 'Rashti & Rashti My First Year Picture Frame, Silver', price: 18.99, imageURL: 'https://images-na.ssl-images-amazon.com/images/I/512kUUmpbWL._AC_US240_FMwebp_QL65_.jpg'}),
    Product.create({name: 'Baby Starters Sock Monkey Blanket', price: 17.99, imageURL: 'https://images-na.ssl-images-amazon.com/images/I/51+8BLb2OSL._AC_US240_FMwebp_QL65_.jpg'}),
    Product.create({name: 'Babystarters Sock Monkey Sweater Knit Plush Toy', price: 21.00, imageURL: 'https://images-na.ssl-images-amazon.com/images/I/51ckaVeINkL._AC_US240_FMwebp_QL65_.jpg'})
  ])
  .then(products => console.log(products))
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  });
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
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
