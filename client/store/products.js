import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_PRODUCTS_BY_CATEGORY = 'GET_PRODUCTS_BY_CATEGORY';
const GET_PRODUCTS_BY_SEARCH = 'GET_PRODUCTS_BY_SEARCH';

/**
 * ACTION CREATORS
 */
const getProducts = products => ({ type: GET_PRODUCTS, products });
const getProductsByCategory = products => ({
  type: GET_PRODUCTS_BY_CATEGORY,
  products,
});
const getProductsBySearch = products => ({
  type: GET_PRODUCTS_BY_SEARCH,
  products,
});

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => dispatch =>
  axios
    .get('/api/products')
    .then(res => dispatch(getProducts(res.data)))
    .catch(err => console.log(err));

export const fetchProductsByCategory = category => dispatch =>
  axios
    .get(`/api/categories/${category}`)
    .then(res => dispatch(getProductsByCategory(res.data)))
    .catch(err => console.log(err));

export const fetchProductsBySearch = keyword => dispatch =>
  axios
    .get(`/api/products/search/${keyword}`)
    .then(res => dispatch(getProductsBySearch(res.data)))
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    case GET_PRODUCTS_BY_CATEGORY:
      return action.products;
    case GET_PRODUCTS_BY_SEARCH:
      return action.products;
    default:
      return state;
  }
}
