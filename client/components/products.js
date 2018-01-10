import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/products';

/* -----------------    COMPONENT     ------------------ */

class Products extends Component {
  componentDidMount() {
    this.props.loadProducts();
  }

  render() {
    const {products} = this.props;
    return (
      <div>
        <h1>All Products</h1>
        {products.length > 0 &&
          <ul>
            {
              products.map(product => (
                <li key={product.id}>
                  <img src={product.imageURL} />
                  <br />
                  <Link to={'/products/' + product.id}>{product.name}</Link>
                  <p>Price: ${product.price}</p>
                </li>
              ))
            }
          </ul>
        }
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ products }) => ({ products });

const mapDispatch = dispatch => ({
  loadProducts: () => dispatch(fetchProducts())
});

export default connect(mapState, mapDispatch)(Products);
