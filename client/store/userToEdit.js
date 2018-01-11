import axios from 'axios'
import history from '../history'

// ACTION TYPES

const GET_USER_TO_EDIT = 'GET_USER_TO_EDIT';

// ACTION CREATORS

const getUserToEdit = user => ({type: GET_USER_TO_EDIT, user});

// THUNK CREATORS

export const fetchUserDetail = (userId) =>
  dispatch =>
    axios.get('api/users/' +  userId)
      .then(res => {
        console.log('hits thunk', userId, history)
        return dispatch(getUserToEdit(res.data));
      })
      .catch(err => console.log(err));

// REDUCER

export default function (state = {}, action) {
  switch (action.type) {
    case GET_USER_TO_EDIT:
      return action.user;
    default:
      return state;
  }
}
