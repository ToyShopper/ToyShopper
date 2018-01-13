import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCart, removeFromCart, updateQuantities } from '../store/cart';
import { Item, Button, Form, Icon } from 'semantic-ui-react'


/* -----------------    COMPONENT     ------------------ */

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.loadCart();
  }

  componentWillReceiveProps(props) {
    this.setState(props.cart.items);
  }

  handleChange(itemId) {
    return event => {
      this.setState({
        [itemId]: Object.assign({}, this.state[itemId], { quantity: Number(event.target.value) }),
      });
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateItemQuantities(this.state);
  }

  handleDelete(item) {
    const { removeItem } = this.props;
    let items = Object.assign({}, this.state);
    delete items[item.id];
    this.setState(items);
    removeItem(item);
  }

  renderItem(item) {
    return (
      <Item key={item.id}>
        <Item.Content>
          <Item.Header>{item.title}</Item.Header>
          <Item.Description as="h4">Price: ${item.price}</Item.Description>
            <Form.Input
              id={'quantity_' + item.id}
              label="Quantity"
              labelPosition="right"
              value={this.state[item.id].quantity}
              onChange={this.handleChange(item.id)} />
            <Button onClick={() => this.handleDelete(item)} icon labelPosition="left">
              <Icon name="ban" />Remove Item
            </Button>
        </Item.Content>
      </Item>
    )
  }

  render() {
    const { cart } = this.props;
    return (
      <div>
        <h1>Shopping Cart</h1>
        {Object.keys(cart.items).length === 0 &&
          (<p>Your shopping cart is empty.</p>)}
        {Object.keys(this.state).length > 0 &&
          (<Form onSubmit={this.handleSubmit}>
            <Item.Group divided>
              {
                Object.keys(cart.items).map(itemId => this.renderItem(cart.items[itemId]))
              }
              <Form.Button>Update Quantities</Form.Button>
            </Item.Group>
          </Form>
          )
        }
        <h3>Total: ${cart.total}</h3>
        <Button as={Link} to="/checkout" disabled={!Object.keys(cart.items).length}>Checkout</Button>
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ cart }) => ({ cart });

const mapDispatch = dispatch => ({
  loadCart: () => dispatch(fetchCart()),
  removeItem: (item) => dispatch(removeFromCart(item)),
  updateItemQuantities: (items) => dispatch(updateQuantities(items)),
});

export default connect(mapState, mapDispatch)(Cart);
