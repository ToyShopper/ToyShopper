import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_REVIEWS_FOR_PRODUCT = 'GET_REVIEWS_FOR_PRODUCT';
const ADD_REVIEW_FOR_PRODUCT = 'ADD_REVIEW_FOR_PRODUCT';

/**
 * ACTION CREATORS
 */
const getReviewsForProduct = reviews => ({ type: GET_REVIEWS_FOR_PRODUCT, reviews });
const addReviewForProduct = review => ({type: ADD_REVIEW_FOR_PRODUCT, review})

/**
 * THUNK CREATORS
 */
export const fetchReviewsForProduct = (productId) => dispatch =>
  axios.get('/api/reviews/products/' + productId)
    .then(res => dispatch(getReviewsForProduct(res.data)))
    .catch(err => console.log(err));

export const addReview = review => dispatch =>
  axios.post('/api/reviews', review)
    .then(res => {
      dispatch(addReviewForProduct(res.data));
    })
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_REVIEWS_FOR_PRODUCT:
      return action.reviews;
    case ADD_REVIEW_FOR_PRODUCT:
      return [...state, action.review];
    default:
      return state;
  }
}
