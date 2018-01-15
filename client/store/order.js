import axios from 'axios';


// ACTION TYPES

const GET_ORDER = 'GET_ORDER';
const UPDATE_ORDER ='UPDATE_ORDER';


// ACTION CREATORS

const getOrder = order => ({
  type: GET_ORDER, order
});

const updateOrder = order => ({type: UPDATE_ORDER, order});


// THUNK CREATORS

export const fetchOrder = (ownerId) => dispatch => {
  axios.get('/api/orders/' + ownerId)
  .then(res => dispatch(getOrder(res.data)))
  .catch(err => console.log(err));
};

export const updateOrderStatus = order => dispatch => {
  axios.put('/api/orders/' + order.id, order)
  .then(res => {
    dispatch(updateOrder(res.data))
  })
  .catch(err => console.log(err));
}

// REDUCER

export default function (state = {}, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order;
    case UPDATE_ORDER:
      return Object.assign({}, state, {status: action.order.status});
    default:
      return state;
  }
}
