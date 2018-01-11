import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCart, removeFromCart } from '../store/cart';

/* -----------------    COMPONENT     ------------------ */

class Cart extends Component {
  componentDidMount() {
    this.props.loadCart();
  }

  render() {
    const { cart, removeItem } = this.props;
    console.log(cart);
    return (
      <div>
        <h1>Shopping Cart</h1>
        {!(Object.keys(cart.items).length > 0) ?
          (<p>Your shopping cart is empty.</p>) :
          (
            <ul>
              {
                Object.keys(cart.items).map(itemId => {
                  const item = cart.items[itemId];
                  return (
                    <li key={item.id}>
                      <br />
                      <p>{item.title}</p>
                      <p>Price: ${item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                      <button onClick={() => removeItem(item)}>Remove</button>
                    </li>
                  )
                })
              }
            </ul>
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
});

export default connect(mapState, mapDispatch)(Cart);
