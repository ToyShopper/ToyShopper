import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_PRODUCT_DETAIL = 'GET_PRODUCT_DETAIL';
const UPDATE_PRODUCT_DETAIL = 'UPDATE_PRODUCT_DETAIL';

/**
 * ACTION CREATORS
 */
const getProductDetail = product => ({ type: GET_PRODUCT_DETAIL, product });
const updateProductDetail = product => ({type: UPDATE_PRODUCT_DETAIL, product});

/**
 * THUNK CREATORS
 */
export const fetchProductDetail = (productId) => dispatch =>
  axios.get('/api/products/' + productId)
  .then(res => {
    return dispatch(getProductDetail(res.data))
  })
  .catch(err => console.log(err))

export const editProductDetail = product => dispatch =>
  axios.put('/api/products/' + product.id, product)
  .then(res => {
    dispatch(updateProductDetail(res.data));
    history.push('/products/' + product.id);
  })

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case GET_PRODUCT_DETAIL:
      return action.product;
    case UPDATE_PRODUCT_DETAIL:
      return action.product;
    default:
      return state;
  }
}
