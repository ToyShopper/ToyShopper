import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';

/**
 * ACTION CREATORS
 */
const getCart = cart => ({ type: GET_CART, cart })
const addItemToCart = (cart) => ({ type: ADD_ITEM_TO_CART, cart });
/**
 * THUNK CREATORS
 */
export const fetchCart = () => dispatch => {
  axios.get('/api/cart')
    .then(res =>
      dispatch(getCart(res.data)))
    .catch(err => console.log(err))
}

export const addToCart = (item) => dispatch => {
  axios.post('/api/cart', item)
  .then(res => dispatch(addItemToCart(res.data)))
  .catch(err => console.log(err));
}

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case ADD_ITEM_TO_CART:
      return action.cart;
    default:
      return state
  }
}
