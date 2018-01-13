import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchOrders } from '../store/orders';
import { Item } from 'semantic-ui-react';

/* -----------------    COMPONENT     ------------------ */

class Orders extends Component {

  componentDidMount() {
    this.props.loadOrders();
  }

  renderOrder(order) {
    return (
      <Item key={order.id} as={Link} to={'/orders/' + order.id}>
        <Item.Content>
          <Item.Header>Order #{order.id}</Item.Header>
          <Item.Meta>Ordered on {new Date(order.orderedAt).toTimeString()}</Item.Meta>
          <Item.Description>Order Status: {order.status}</Item.Description>
          <Item.Description>Order Total: $ {Number(order.total).toFixed(2)}</Item.Description>
        </Item.Content>
        {order.user &&
        (<Item.Content>
          <Item.Header>User</Item.Header>
          <Item.Description>{order.user.fullName}</Item.Description>
        </Item.Content>)
        }
      </Item>
    )
  }

  render() {
    const { orders } = this.props;
    return (
      <div>
        {orders.length > 0 &&
          <Item.Group divided>
            {orders.map(order => this.renderOrder(order))}
          </Item.Group>
        }
      </div>
    )
  }
}

const mapState = ({ orders }) => ({ orders });

const mapDispatch = dispatch => ({
  loadOrders: () => dispatch(fetchOrders())
})

export default connect(mapState, mapDispatch)(Orders)
