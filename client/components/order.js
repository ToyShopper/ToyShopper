import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrder } from '../store/order';
import { Card, Item } from 'semantic-ui-react';

class Order extends Component {
  componentDidMount() {
    this.props.loadOrder();
  }

  renderOrderItem(item) {
    return (
      <Item key={item.id}>
        <Item.Content>
          <Item.Image src={item.product.imageURL} size="tiny" />
          <Item.Header>{item.product.title}</Item.Header>
          <Item.Description>Quantity: {item.quantity}</Item.Description>
          <Item.Description>Price: ${Number(item.priceAtOrder).toFixed(2)}</Item.Description>
        </Item.Content>
      </Item>
    );
  }

  render() {
    const { order } = this.props;
    return (
      <div>
        {order.id &&
          (
            <div>
              <Card fluid>
                <Card.Header as="h1">Order #{order.id}</Card.Header>
                <Card.Meta>Ordered on {new Date(order.orderedAt).toTimeString()}</Card.Meta>
                <Card.Description>Status:  {order.status}</Card.Description>
                <Card.Description>Total: $ {Number(order.total).toFixed(2)}</Card.Description>
              </Card>
              <Item.Group divided>
                <Item.Header as="h2">Order Items</Item.Header>
                {order.order_items.map(item => this.renderOrderItem(item))}
              </Item.Group>
            </div>
          )
        }
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
