import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_PRODUCT_DETAIL = 'GET_PRODUCT_DETAIL';
const UPDATE_PRODUCT_DETAIL = 'UPDATE_PRODUCT_DETAIL';
const ADD_CATEGORY_TO_PRODUCT = 'ADD_CATEGORY_TO_PRODUCT';
const REMOVE_CATEGORY_FROM_PRODUCT = 'REMOVE_CATEGORY_FROM_PRODUCT';

/**
 * ACTION CREATORS
 */
const getProductDetail = product => ({ type: GET_PRODUCT_DETAIL, product });
const updateProductDetail = product => ({type: UPDATE_PRODUCT_DETAIL, product});
const addCategoryToProduct = product => ({type: ADD_CATEGORY_TO_PRODUCT, product});
const removeCategoryFromProduct = product => ({ type: REMOVE_CATEGORY_FROM_PRODUCT, product });

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

export const deleteCategoryFromProduct = (product, category) => dispatch =>
  axios.delete('/api/products/' + product.id + '/categories/' + category.id)
    .then(res => {
      const updatedProduct = Object.assign({}, product, {categories: product.categories.filter(elem => elem.id !== category.id)});
      dispatch(removeCategoryFromProduct(updatedProduct));
    })

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case GET_PRODUCT_DETAIL:
    case UPDATE_PRODUCT_DETAIL:
    case REMOVE_CATEGORY_FROM_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
