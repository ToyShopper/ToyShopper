import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCT_DETAIL = 'GET_PRODUCT_DETAIL'

/**
 * ACTION CREATORS
 */
const getProductDetail = product => ({ type: GET_PRODUCT_DETAIL, product })

/**
 * THUNK CREATORS
 */
export const fetchProductDetail = (productId) =>
  dispatch =>
    axios.get('/api/products/' + productId)
      .then(res =>
        dispatch(getProductDetail(res.data)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case GET_PRODUCT_DETAIL:
      return action.product
    default:
      return state
  }
}
