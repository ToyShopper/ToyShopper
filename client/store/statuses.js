import axios from 'axios'

// ACTION TYPES

const GET_STATUSES = 'GET_STATUSES';

// ACTION CREATORS

const getStatuses = statuses => ({
  type: GET_STATUSES, statuses
});

// THUNK CREATORS

export const fetchStatuses = () => dispatch => {
  axios.get('/api/orders/statuses')
  .then(res => dispatch(getStatuses(res.data)))
  .catch(err => console.log(err));
};

// REDUCER

export default (state = [], action) => {
  switch (action.type) {
    case GET_STATUSES:
      return action.statuses;
    default:
      return state;
  }
}
