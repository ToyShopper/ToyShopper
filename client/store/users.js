import axios from 'axios';
import history from '../history';

// ACTION TYPES

const GET_USERS = 'GET_USERS';
const UPDATE_USER = 'UPDATE_USER';

// ACTION CREATORS

const getUsers = users => ({
  type: GET_USERS, users
});

// neccessary?
const updateUser = updatedUser => ({
  type: UPDATE_USER, updatedUser
});

// THUNK CREATORS

export const fetchUsers = () =>  dispatch => {
    axios.get('/api/users/')
    .then(res => dispatch(getUsers(res.data)) )
    .catch(err => console.log(err));
};

export const putUser = (updatedUser, userId) => dispatch => {
  axios.put('/api/users/' + userId, updatedUser)
    .then(() => {
      dispatch(fetchUsers());
    })
    .catch(err => console.log(err));
  };

export const deleteUser = (userId) => dispatch => {
  axios.delete('/api/users/' + userId)
  .then(() => {
    dispatch(fetchUsers());
  })
  .catch(err => console.log(err));
};

// REDUCER

export default function (state = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    case UPDATE_USER:
      return state.map(user => {
        if (user.id === action.user.id) {
          return action.user;
        }
        else {
          return user;
        }
      });
    default:
      return state;
  }
}
