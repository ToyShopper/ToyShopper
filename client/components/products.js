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

  // componentWillReceiveProps() {
  //   this.props.loadProducts();
  // }

  render() {
    const { products, displayName, user } = this.props;
    return (
      <div>
        {/* {this.user && this.user.isAdmin &&  */}
        {user && user.role === 'admin' && <Segment>
          <Button as={Link} to="/products/add" floated="right">Add a new product</Button>
          <Divider horizontal>Admin Only</Divider>
        </Segment>}
        <h1>{displayName}</h1>
        {products.length > 0 && (
          <Segment raised>
          <Item.Group divided>
            {products.map(product => (
              <Item key={product.id}>
                <Item.Image src={product.imageURL} />
                <Item.Content>
                  <Item.Header as={Link} to={'/products/' + product.id}>{product.title}</Item.Header>
                  <Item.Description as="h4">Price: ${Number(product.price).toFixed(2)}</Item.Description>
                  <Item.Extra>
                    {product.categories ? product.categories.map(category => (
                    <Label key={category.id} as={Link} to={'/categories/' + category.name + '/products'} tag>
                    {category.name}
                    </Label>)) : null}
                  </Item.Extra>
                </Item.Content>
              </Item>
            ))}
          </Item.Group>
          </Segment>
        )}
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapAllProductsState = ({ user, products }) => ({
  user,
  products,
  displayName: 'All Products',
});
const mapProductsByCategoryState = ({ products }, ownProps) => ({
  products,
  displayName: 'All ' + ownProps.match.params.category + ' Products',
});
const mapProductsBySearchState = ({ products }, ownProps) => ({
  products,
  displayName: 'All Products with Keyword: ' + ownProps.match.params.keyword,
});

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

export const AllProducts = connect(mapAllProductsState, mapAllDispatch)(Products);
export const ProductsByCategory = connect(mapProductsByCategoryState, mapFilteredDispatch)(
  Products,
);
export const ProductsBySearch = connect(mapProductsBySearchState, mapSearchDispatch)(Products);
