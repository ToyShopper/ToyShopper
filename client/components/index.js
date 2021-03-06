/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './main'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as Products} from './products'
export {default as ProductDetail} from './product-detail'
export {default as Cart} from './cart'
export {default as UserList} from './user-list'
export {AllProducts, ProductsByCategory, ProductsBySearch} from './products'
export {default as UserDetail} from './user-detail'
export {default as Checkout} from './checkout'
export {AllOrders, MyOrders} from './orders'
export {default as OrderDetail} from './order-detail'
export {AddProductForm, EditProductForm} from './product-form'
export {default as ForgotPassForm} from './forgot'
export {default as ResetPassForm} from './reset'
export {default as SearchBar} from './search-bar'

