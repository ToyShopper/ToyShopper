import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchOrder, updateOrderStatus } from '../store/order';
import { Item, Segment, Step } from 'semantic-ui-react';

class OrderDetail extends Component {
  componentDidMount() {
    this.props.loadOrder();
  }

  changeOrderStatus(status) {
    const { order, updateOrder } = this.props;
    const updated = Object.assign({}, order, { status: status });
    updateOrder(updated);
  }

  renderOrderStatus() {
    const { order, user } = this.props;
    let created = { key: 'CREATED', active: order.status === 'CREATED', icon: 'cart', title: 'Created', description: 'Customer just made an order' };
    let cancelled = { key: 'CANCELLED', active: order.status === 'CANCELLED', icon: 'info', title: 'Cancelled', description: 'The order is cancelled' };
    let processing = { key: 'PROCESSING', active: order.status === 'PROCESSING', icon: 'payment', title: 'Processing', description: 'Waiting to be processed' };
    let completed = { key: 'COMPLETED', active: order.status === 'COMPLETED', icon: 'truck', title: 'Completed', description: 'On the way to the customer' };

    if (user && user.role === 'admin') {
      created.onClick = (event) => this.changeOrderStatus('CREATED');
      processing.onClick = (event) => this.changeOrderStatus('PROCESSING');
      completed.onClick = (event) => this.changeOrderStatus('COMPLETED');
      cancelled.onClick = (event) => this.changeOrderStatus('CANCELLED');
    }

    const steps = [created, processing, completed, cancelled];

    return (
      <Step.Group items={steps} />
    );
  }

  renderOrderItem(item) {
    return (
      <Item key={item.id}>
        <Item.Content>
          <Item.Image src={item.product.imageURL} size="tiny" />
          <Item.Header as={Link} to={'/products/' + item.product.id}>{item.product.title}</Item.Header>
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
              <Item>
                <Item.Header as="h1">Order #{order.id}</Item.Header>
              <Item.Meta>Ordered on {new Date(order.orderedAt).toDateString()}, {new Date(order.orderedAt).toTimeString()}</Item.Meta>
                <Item.Description>Customer Email Address: {order.email}</Item.Description>
                {order.status && this.renderOrderStatus()}

                <Item.Description as="h3">Total: $ {Number(order.total).toFixed(2)}</Item.Description>
              </Item>
              <Segment raised>
                <Item.Group divided>
                  <Item.Header as="h2">Order Items</Item.Header>
                  {order.order_items && order.order_items.map(item => this.renderOrderItem(item))}
                </Item.Group>
              </Segment>
            </div>
          )
        }
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ order, user }) => ({ order, user });

const mapDispatch = (dispatch, ownProps) => ({
  loadOrder: () => {
    const orderId = ownProps.match.params.id;
    return dispatch(fetchOrder(orderId));
  },
  updateOrder: (order) => dispatch(updateOrderStatus(order))
});

export default connect(mapState, mapDispatch)(OrderDetail);
