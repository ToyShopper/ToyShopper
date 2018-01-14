import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchProducts,
  fetchProductsByCategory,
  fetchProductsBySearch,
} from '../store/products';
import { Item, Label, Button, Segment, Divider } from 'semantic-ui-react'

/* -----------------    COMPONENT     ------------------ */

class Products extends Component {
  componentDidMount() {
    this.props.loadProducts();
  }

  render() {
    const { products } = this.props;
    return (
      <div>
        {/* {this.user && this.user.isAdmin &&  */}
        <Segment>
          <Button as={Link} to="/products/add" floated="right">Add a new product</Button>
          <Divider horizontal>Admin Only</Divider>
        </Segment>
        {this.props.match ? (
          <h1>All {this.props.match.params.category} Products </h1>
        ) : (
            <h1>All Products</h1>
          )}
        {products.length > 0 && (
          <Item.Group divided>
            {products.map(product => (
              <Item key={product.id}>
                <Item.Image src={product.imageURL} />
                <Item.Content>
                  <Item.Header as={Link} to={'/products/' + product.id}>{product.title}</Item.Header>
                  <Item.Description>Price: ${product.price}</Item.Description>
                  <Item.Extra>
                    <Label>{'Category: ' + product.CategoryId}</Label>
                  </Item.Extra>
                </Item.Content>
              </Item>
            ))}
          </Item.Group>
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
