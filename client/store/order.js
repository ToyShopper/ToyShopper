import axios from 'axios';

// ACTION TYPES

const GET_ORDER = 'GET_ORDER';

// ACTION CREATORS

const getOrder = order => ({
  type: GET_ORDER, order
});

// THUNK CREATORS

export const fetchOrder = (ownerId) => dispatch => {
  axios.get('/api/orders/' + ownerId)
  .then(res => dispatch(getOrder(res.data)))
  .catch(err => console.log(err));
};

// REDUCER

export default function (state = [], action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order;
    default:
      return state;
  }
}
