import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProductDetail } from '../store/product';
import {addToCart} from '../store/cart';

/* -----------------    COMPONENT     ------------------ */

class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadProductDetail();
  }

  handleChange(name) {
    return event => {
      this.setState({
        [name]: event.target.value,
      }
    )};
  }

  handleSubmit(event, product) {
    event.preventDefault();
    const item = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: Number(this.state.quantity),
    }
    this.props.addItemToCart(item);
  }

  render() {
    const { product } = this.props;
    return product.id ? (
      <div>
        <h1>Product Detail</h1>
        <img src={product.imageURL} />
        <br />
        {product.title}
        <br />
        <p>Price: ${product.price}</p>
        <form onSubmit={(event) => this.handleSubmit(event, product)}>
          <label htmlFor="quantity">Quantity</label>
          <input id="quantity" value={this.state.quantity} onChange={this.handleChange('quantity')} />
          <button type="submit">Add to Cart</button>
        </form>
      </div>
    ) : (<div />);
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ product }) => ({ product });

const mapDispatch = (dispatch, ownProps) => ({
  loadProductDetail: () => {
    const productId = ownProps.match.params.id;
    return dispatch(fetchProductDetail(productId));
  },
  addItemToCart: (item) => {
    return dispatch(addToCart(item));
  }
});

export default connect(mapState, mapDispatch)(ProductDetail);
