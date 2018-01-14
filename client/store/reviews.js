import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_REVIEWS_FOR_PRODUCT = 'GET_REVIEWS_FOR_PRODUCT';

/**
 * ACTION CREATORS
 */
const getReviewsForProduct = reviews => ({ type: GET_REVIEWS_FOR_PRODUCT, reviews });

/**
 * THUNK CREATORS
 */
export const fetchReviewsForProduct = (productId) => dispatch =>
  axios
    .get('/api/products/' + productId + '/reviews')
    .then(res => dispatch(getReviewsForProduct(res.data)))
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_REVIEWS_FOR_PRODUCT:
      return action.reviews;
    default:
      return state;
  }
}
