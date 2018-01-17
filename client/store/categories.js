import axios from 'axios';

/**
 * ACTION TYPES
 */

const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
const ADD_NEW_CATEGORY = 'ADD_NEW_CATEGORY';

/**
 * ACTION CREATORS
 */

const getAllCategories = (categories) => ({ type: GET_ALL_CATEGORIES, categories });
const addNewCategory = (category) => ({type: ADD_NEW_CATEGORY, category})


/**
 * THUNK CREATORS
 */

export const fetchAllCategories = () => dispatch =>
  axios.get('/api/categories')
    .then(res => {
      return dispatch(getAllCategories(res.data))
    })

export const addCategory = (category) => dispatch =>
  axios.post('/api/categories', category)
  .then(res => {
    return dispatch(addNewCategory(res.data))
  })

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return action.categories;
    case ADD_NEW_CATEGORY:
      return [...state, action.category];
    default:
      return state;
  }
}
