import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_PRODUCT_DETAIL = 'GET_PRODUCT_DETAIL';
const UPDATE_PRODUCT_DETAIL = 'UPDATE_PRODUCT_DETAIL';
const ADD_CATEGORY_TO_PRODUCT = 'ADD_CATEGORY_TO_PRODUCT';
const REMOVE_CATEGORY_FROM_PRODUCT = 'REMOVE_CATEGORY_FROM_PRODUCT';
const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';

/**
 * ACTION CREATORS
 */
const getProductDetail = product => ({ type: GET_PRODUCT_DETAIL, product });
const updateProductDetail = product => ({type: UPDATE_PRODUCT_DETAIL, product});
const addCategoryToProduct = product => ({type: ADD_CATEGORY_TO_PRODUCT, product});
const getAllCategories = (categories) => ({type: GET_ALL_CATEGORIES, categories})
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

// export const addNewCategoryToProduct = (product, category) => dispatch =>
//   axios.get('/api/categories/')
//   .then(categories => {
//     // axios.post('api/products/' + product.id + '/categories' + category.id)
//     // .then(res => {
//     //   console.log(res);
//     //   const updatedProduct = Object.assign({}, product, {categories: product.categories});
//     //   console.log('New product:' + updatedProduct);
//     //   dispatch(addCategoryToProduct(updatedProduct));
//     // })
//   })

export const fetchAllCategories = () => dispatch =>
  axios.get('/api/categories')
  .then(res => {
    return dispatch(getAllCategories(res.data))
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
    case ADD_CATEGORY_TO_PRODUCT:
    case REMOVE_CATEGORY_FROM_PRODUCT:
      return action.product;
    case GET_ALL_CATEGORIES:
      return action.categories
    default:
      return state;
  }
}
