import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCart, removeFromCart, updateQuantities } from '../store/cart';

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
        [itemId]: Object.assign({}, this.state[itemId], {quantity: Number(event.target.value)}),
      });
      console.log('HANDLE CHANGE:', this.state);
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateItemQuantities(this.state);
  }

  handleDelete(item) {
    const {removeItem} = this.props;
    let items = Object.assign({}, this.state);
    delete items[item.id];
    console.log('HANDLE DELETE (items)', items)
    this.setState(items, () => console.log('HANDLE DELETE (state)', this.state));
    removeItem(item);
  }

  renderItem(item) {
    return (
      <li key={item.id}>
        <br />
        <p>{item.title}</p>
        <p>Price: ${item.price}</p>
        Quantity:
        <input
          id={'quantity_' + item.id}
          value={this.state[item.id].quantity}
          onChange={this.handleChange(item.id)} />
        <button onClick={() => this.handleDelete(item)}>Remove</button>
      </li>
    )
  }

  render() {
    const { cart } = this.props;
    return (
      <div>
        <h1>Shopping Cart</h1>
        {Object.keys(cart.items).length === 0 &&
          (<p>Your shopping cart is empty.</p>)}
        {Object.keys(this.state).length > 0  &&
          (<form onSubmit={this.handleSubmit}>
            <ul>
              {
                Object.keys(cart.items).map(itemId => this.renderItem(cart.items[itemId]))
              }
            </ul>
              <button type="submit">Update</button>
            </form>
          )
        }
        <p>Total: ${cart.total}</p>
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
