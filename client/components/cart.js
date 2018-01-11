import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCart } from '../store/cart';

/* -----------------    COMPONENT     ------------------ */

class Cart extends Component {
  componentDidMount() {
    this.props.loadCart();
  }

  render() {
    const { cart } = this.props;
    console.log(cart);
    return (
      <div>
        <h1>Shopping Cart</h1>
        {!cart.items ?
          (<p>Your shopping cart is empty</p>) :
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
});

export default connect(mapState, mapDispatch)(Cart);
