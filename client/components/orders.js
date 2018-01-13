import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        {orders.length > 0 &&
          <Card.Group>
          {orders.map(order => (
            <Card key={order.id} as={Link} to={'/orders/' + order.id}>
              <Card.Content>
                <Card.Header>{'Order #: ' + order.id}</Card.Header>
                <Card.Meta>{'Ordered on ' + order.orderedAt}</Card.Meta>
                <Card.Description>{'Status: ' + order.status}</Card.Description>
                <Card.Description>{'Total: ' + order.total}</Card.Description>
              </Card.Content>
              <Card.Content>
                <Card.Header>User</Card.Header>
                <Card.Meta>{'ID #: ' + order.user.id}</Card.Meta>
                <Card.Description>{order.user.fullName}</Card.Description>
              </Card.Content>
            </Card>
          ))}
          </Card.Group>
        }
      </div>
          // <ul>
          //   {orders.map(order => (
          //     <li key={order.id}>
          //     {order.id}</li>
          //   ))}
          // </ul>}

    )
  }
}

const mapState = ({ orders }) => ({ orders });

const mapDispatch = dispatch => ({
  loadOrders: () => dispatch(fetchOrders())
})

export default connect(mapState, mapDispatch)(Orders)
