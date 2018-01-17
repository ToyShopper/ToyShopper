import axios from 'axios';

/**
 * ACTION TYPES
 */

const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';

/**
 * ACTION CREATORS
 */

const getAllCategories = (categories) => ({ type: GET_ALL_CATEGORIES, categories })

/**
 * THUNK CREATORS
 */

export const fetchAllCategories = () => dispatch =>
  axios.get('/api/categories')
    .then(res => {
      return dispatch(getAllCategories(res.data))
    })

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
}
