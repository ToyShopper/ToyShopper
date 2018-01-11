import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';

/**
 * ACTION CREATORS
 */
const getCart = cart => ({ type: GET_CART, cart })
const addItemToCart = (cart) => ({ type: ADD_ITEM_TO_CART, cart });
const removeItemFromCart = (cart) => ({type: REMOVE_ITEM_FROM_CART, cart});
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
  // OB/DK: ideally report errors to the user, not the developer, e.g. this: https://tomchentw.github.io/react-toastr/
  .catch(err => console.log(err));
}

/**
 * REDUCER
 */
// OB/DK: you could reduce all the actions into one, maybe called "SET_CART"
export default function (state = {items: {}, total: 0}, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case ADD_ITEM_TO_CART:
      return action.cart;
    case REMOVE_ITEM_FROM_CART:
      return action.cart;
    default:
      return state
  }
}
