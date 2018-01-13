import axios from 'axios';

// ACTION TYPES

const GET_ORDERS = 'GET_ORDERS';

// ACTION CREATORS

const getOrders = orders => ({
  type: GET_ORDERS, orders
});

// THUNK CREATORS

export const fetchOrders = () => dispatch => {
  axios.get('/api/orders/')
  .then(res => dispatch(getOrders(res.data)))
  .catch(err => console.log(err));
};

// REDUCER

export default function (state = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
    default:
      return state;
  }
}
