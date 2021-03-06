import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';
const UPDATE_CART_ITEM_QUANTITIES = 'UPDATE_CART_ITEM_QUANTITIES';

/**
 * ACTION CREATORS
 */
const getCart = cart => ({ type: GET_CART, cart })
const addItemToCart = (cart) => ({ type: ADD_ITEM_TO_CART, cart });
const removeItemFromCart = (cart) => ({type: REMOVE_ITEM_FROM_CART, cart});
const updateCartItemQuantities = (cart) => ({type: UPDATE_CART_ITEM_QUANTITIES, cart});

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

export const removeFromCart = (item) => dispatch => {
  axios.delete('/api/cart/' + item.id)
  .then(res => dispatch(removeItemFromCart(res.data)))
  .catch(err => console.log(err));
}

export const updateQuantities = (items) => dispatch => {
  axios.put('/api/cart/', items)
  .then(res => dispatch(updateCartItemQuantities(res.data)))
  .catch(err => console.log(err));
}

/**
 * REDUCER
 */
export default function (state = {items: {}, total: 0}, action) {
  switch (action.type) {
    case GET_CART:
    case ADD_ITEM_TO_CART:
    case REMOVE_ITEM_FROM_CART:
      return action.cart;
    case UPDATE_CART_ITEM_QUANTITIES:
      return action.cart;
    default:
      return state
  }
}
