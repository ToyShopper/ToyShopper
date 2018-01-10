import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProductDetail } from '../store/product';

/* -----------------    COMPONENT     ------------------ */

class ProductDetail extends Component {
  componentDidMount() {
    this.props.loadProductDetail();
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
        <button>Add to Cart</button>
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
  }
});

export default connect(mapState, mapDispatch)(ProductDetail);
