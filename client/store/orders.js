import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const CONFIRM_NEW_ORDER = 'CONFIRM_NEW_ORDER'

/**
 * ACTION CREATORS
 */
const confirmNewOrder = order => ({ type: CONFIRM_NEW_ORDER, order })

/**
 * THUNK CREATORS
 */
export const confirmOrder = (newOrder) => dispatch =>
  axios.post('/api/orders/', newOrder)
    .then(res => {
      dispatch(confirmNewOrder(res.data));
      history.push('/cart');
    })
    .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case CONFIRM_NEW_ORDER:
      return [...state, action.order]
    default:
      return state
  }
}
