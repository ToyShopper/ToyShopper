import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchProducts,
  fetchProductsByCategory,
  fetchProductsBySearch,
} from '../store/products';

/* -----------------    COMPONENT     ------------------ */

class Products extends Component {
  componentDidMount() {
    this.props.loadProducts();
  }

  render() {
    const { products } = this.props;
    return (
      <div>
        {this.props.match ? (
          <h1>All {this.props.match.params.category} Products </h1>
        ) : (
          <h1>All Products</h1>
        )}
        {products.length > 0 && (
          <ul>
            {products.map(product => (
              <li key={product.id}>
                <img src={product.imageURL} />
                <br />
                <Link to={'/products/' + product.id}>{product.title}</Link>
                <p>Price: ${product.price}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ products }) => ({ products });

const mapAllDispatch = dispatch => ({
  loadProducts: () => dispatch(fetchProducts()),
});
const mapFilteredDispatch = (dispatch, ownProps) => ({
  loadProducts: () =>
    dispatch(fetchProductsByCategory(ownProps.match.params.category)),
});
const mapSearchDispatch = (dispatch, ownProps) => ({
  loadProducts: () =>
    dispatch(fetchProductsBySearch(ownProps.match.params.keyword)),
});

export const AllProducts = connect(mapState, mapAllDispatch)(Products);
export const ProductsByCategory = connect(mapState, mapFilteredDispatch)(
  Products,
);
export const ProductsBySearch = connect(mapState, mapSearchDispatch)(Products);
