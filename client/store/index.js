import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import products from './products'
import product from './product'
import cart from './cart'
import users from './users'
import userToEdit from './userToEdit'


const reducer = combineReducers({user, products, product, users, cart, userToEdit})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './products'
export * from './product'
export * from './cart'
export * from './users'
export * from './userToEdit'

