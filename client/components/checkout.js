import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCart } from '../store/cart';
import { confirmOrder } from '../store/orders';
import { Item, Form, Segment } from 'semantic-ui-react'

/* -----------------    COMPONENT     ------------------ */

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadCart();
  }

  handleChange(name) {
    return event => {
      this.setState({
        [name]: event.target.value,
      });
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const { cart, confirm } = this.props;
    let orderItems = Object.keys(cart.items).map(itemId => cart.items[itemId])
      .map(item => ({ productId: item.id, quantity: item.quantity, priceAtOrder: item.price }));
    const newOrder = {
      order_items: orderItems,
      status: 'BEING PREPARED',
      total: cart.total,
      orderedAt: Date.now(),
    }
    confirm(newOrder);
  }

  renderItem(item) {
    return (
      <Item key={item.id}>
        <Item>
          <Item.Image size="small" src={item.imageURL} />
        </Item>
        <Item.Content>
          <Item.Header as="h3">{item.title}</Item.Header>
          <Item.Description as="h4">Price: ${item.price}</Item.Description>
          <Item.Description as="h4">Quantity: {item.quantity}</Item.Description>
        </Item.Content>
      </Item>
    )
  }

  render() {
    const { cart } = this.props;
    return (
      <div>
        <h1>Checkout</h1>
        <Segment raised>
          <Item.Group divided>
            {
              Object.keys(cart.items).map(itemId => this.renderItem(cart.items[itemId]))
            }
          </Item.Group>
        </Segment>
        <h3>Total: ${cart.total}</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Button positive>Confirm Your Order</Form.Button>
        </Form>
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ cart }) => ({ cart });

const mapDispatch = dispatch => ({
  loadCart: () => dispatch(fetchCart()),
  confirm: (order) => dispatch(confirmOrder(order)),
});

export default connect(mapState, mapDispatch)(Checkout);
