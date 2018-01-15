import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCart } from '../store/cart';
import { confirmOrder } from '../store/orders';
import { Item, Form, Segment } from 'semantic-ui-react'

/* -----------------    COMPONENT     ------------------ */

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props.initialValue);
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
    const { cart, confirm, user } = this.props;
    const {email, ...address} = this.state;
    const orderItems = Object.keys(cart.items).map(itemId => cart.items[itemId])
      .map(item => ({ productId: item.id, quantity: item.quantity, priceAtOrder: item.price }));
    const newOrder = {
      order_items: orderItems,
      status: 'CREATED',
      total: cart.total,
      orderedAt: Date.now(),
      email: email,
      address: address,
      userId: user.id,
    };
    confirm(newOrder);
  }

  renderInputField({ name, label }) {
    return (name &&
      <Form.Group key={name} widths={1}>
        <Form.Input
          name={name} label={label}
          placeholder={label} value={this.state[name]}
          onChange={this.handleChange(name)}
        />
      </Form.Group>
    );
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

  renderAddressForm(fields) {
    return (
      <Form.Group width={1}>
        {fields && fields.map(field => this.renderInputField(field))}
      </Form.Group>
    );
  }

  render() {
    const { cart, fields } = this.props;
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
        <Segment raised>
        <Form onSubmit={this.handleSubmit}>
          {this.renderAddressForm(fields)}
          <Form.Group>
          <Form.Button positive>Confirm Your Order</Form.Button>
          </Form.Group>
        </Form>
        </Segment>
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */
const fields = [
  { name: 'streetAddress', label: 'Street Address' },
  { name: 'city', label: 'City' },
  { name: 'state', label: 'State'},
  { name: 'zipCode', label: 'Zip Code' },
  { name: 'email', label: 'Email'},
];
const initialValue = {
  streetAddress: '',
  city: '',
  state: '',
  zipCode: '',
}
const mapState = state => ({ cart: state.cart, user: state.user, fields: fields, initialValue });

const mapDispatch = dispatch => ({
  loadCart: () => dispatch(fetchCart()),
  confirm: (order) => dispatch(confirmOrder(order)),
});

export default connect(mapState, mapDispatch)(Checkout);
