import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCart, removeFromCart, updateQuantities } from '../store/cart';
import { Item, Button, Input, Icon, Segment } from 'semantic-ui-react'


/* -----------------    COMPONENT     ------------------ */

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, props.cart);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.loadCart();
  }

  componentWillReceiveProps(props) {
    this.setState(props.cart);
  }

  handleChange(item) {
    console.log('STATE:', this.state);
    return event => {
      let quantity = isNaN(event.target.value) ? 0 : Number(event.target.value);
      let itemToChange = Object.assign({}, this.state[item.id]);
      itemToChange.quantity = quantity;
      this.setState({
        items: Object.assign({}, this.state.items, {
          [item.id]: itemToChange
        }),
      });
    };
  }

  handleSubmit() {
    const {updateItemQuantities} = this.props;
    updateItemQuantities(this.state.items);
  }

  handleDelete(item) {
    const { removeItem } = this.props;
    removeItem(item);
  }

  renderItem(item) {
    return (
      <Item key={item.id}>
        <Item>
          <Item.Image size="small" src={item.imageURL} />
        </Item>
        <Item>
          <Item.Header as="h3">{item.title}</Item.Header>
          <Item.Description as="h4">Price: ${Number(item.price).toFixed(2)}</Item.Description>
          <Input
            id={'quantity_' + item.id}
            label={{size: 'tiny', color: 'grey', content: 'Quantity'}}
            labelPosition="left"
            type="number" min={0}
            value={this.state.items[item.id].quantity}
            onChange={this.handleChange(item)} />
          <Button onClick={() => this.handleDelete(item)} icon labelPosition="left">
            <Icon name="trash" />Remove Item</Button>
        </Item>
      </Item>
    )
  }

  render() {
    const { cart } = this.props;
    const items = !cart.items ? [] : Object.keys(cart.items).map(itemId => cart.items[itemId]);
    return (
      <div>
        <h1>Shopping Cart</h1>
        <Segment raised>
        {items.length === 0 &&
          (<h3>Your shopping cart is empty.</h3>)}
        {items.length > 0 &&
          (
            <Item.Group divided>
              {
                items.map(item => this.renderItem(item))
              }
            </Item.Group>
          )
        }
        </Segment>
        <Button onClick={() => this.handleSubmit()}>Update Quantities</Button>
        <h3>Total: ${Number(cart.total).toFixed(2)}</h3>
        <Button as={Link} to="/checkout" disabled={!Object.keys(cart.items).length} positive>Checkout</Button>
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
