import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../store/orders';
import { Card } from 'semantic-ui-react';

/* -----------------    COMPONENT     ------------------ */

class Orders extends Component {

  componentDidMount() {
    this.props.loadOrders();
  }

  render() {
    const { orders } = this.props;
    return (
      <div>
        <Card />
        {orders.length > 0 &&
          <ul>
            {orders.map(order => (
              <li key={order.id}>
              {order.id}</li>
            ))}
          </ul>}
      </div>
    )
  }
}

const mapState = ({ orders }) => ({ orders });

const mapDispatch = dispatch => ({
  loadOrders: () => dispatch(fetchOrders())
})

export default connect(mapState, mapDispatch)(Orders)
