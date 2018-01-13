import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrder } from '../store/order';
import { Card, Divider, List } from 'semantic-ui-react';

class Order extends Component {
  componentDidMount() {
    this.props.loadOrder();
  }
  render() {
    const { order } = this.props;
    return (
      <div>
        {order.id &&
        <Card>
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
          <Card.Content>
            <Card.Header>Order Items</Card.Header>
            <List>
              {order.order_items.map(item => (
                <List.Item key={item.id}>
                  <Divider/>
                  <List.Content>
                    <List.Header>{item.product.title}</List.Header>
                    <List.Description>{'Quantity: ' + item.product.quantity}</List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Card.Content>
        </Card>}
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ order }) => ({ order });

const mapDispatch = (dispatch, ownProps) => ({
  loadOrder: () => {
    const orderId = ownProps.match.params.id;
    return dispatch(fetchOrder(orderId));
  }
});

export default connect(mapState, mapDispatch)(Order);
