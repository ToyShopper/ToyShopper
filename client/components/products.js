import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchProducts,
  fetchProductsByCategory,
  fetchProductsBySearch,
} from '../store/products';
import { addCategory } from '../store/categories';
import { Item, Label, Button, Segment, Divider, Rating, Card, Image, Form } from 'semantic-ui-react'

/* -----------------    COMPONENT     ------------------ */

class Products extends Component {
  componentDidMount() {
    this.props.loadProducts();
  }

  render() {
    const { products, displayName, isAdmin, onAddCategory } = this.props;
    return (
      <div>
        {/* {this.user && this.user.isAdmin &&  */}
        {isAdmin && <Segment>
          <Button as={Link} to="/products/add" floated="right">Add a new product</Button>
          <Divider horizontal>Admin Only</Divider>
          <Form name="new-category" onSubmit={(event) => onAddCategory(event.target.newCategoryName.value)}>
            <Form.Input id="newCategoryName" label="Create A New Category" action={{ labelPosition: 'left', icon: 'tag', content: 'Create New Category' }} />
          </Form>
        </Segment>}
        <h1>{displayName}</h1>
        {products.length > 0 && (
          <Card.Group>
            {products.map(product => (
            <Card key={product.id} raised color="grey" link>
              <Image src={product.imageURL} href={'/products/' + product.id} />
              <Card.Content href={'/products/' + product.id}>
                <Card.Header>
                  {product.title}
                </Card.Header>
                {isAdmin && <Card.Meta>
                  Inventory: {product.quantity}
                </Card.Meta>}
                <br/>
                <Card.Description as="h4">
                Price: ${Number(product.price).toFixed(2)}
                </Card.Description>
                </Card.Content>
                <Card.Content>
                {product.categories ? product.categories.map(category => (
                    <Label key={category.id} as={Link} to={'/categories/' + category.name + '/products'} tag>
                    {category.name}
                    </Label>)) : null}
                </Card.Content>
                <Card.Content >

                <Card.Description>
                  Average Rating:
                {Number(product.averageRating).toFixed(2)} <br/> <Rating maxRating={5} defaultRating={product.averageRating} icon="star" disabled />
                </Card.Description>
                </Card.Content>
            </Card>

            ))}
          </Card.Group>
        )}
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapAllProductsState = ({ user, products, categories }) => ({
  user, products, categories,
  displayName: 'All Products',
  isAdmin: user && user.role === 'admin',
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
  onAddCategory: (categoryName) => {
    return dispatch(addCategory({ name: categoryName }));
  }
});
const mapFilteredDispatch = (dispatch, ownProps) => ({
  loadProducts: () =>
    dispatch(fetchProductsByCategory(ownProps.match.params.category)),
  onAddCategory: (categoryName) => {
    return dispatch(addCategory({ name: categoryName }));
  }
});
const mapSearchDispatch = (dispatch, ownProps) => ({
  loadProducts: () =>
    dispatch(fetchProductsBySearch(ownProps.match.params.keyword)),
  onAddCategory: (categoryName) => {
    return dispatch(addCategory({ name: categoryName }));
  }
});

export const AllProducts = connect(mapAllProductsState, mapAllDispatch)(Products);
export const ProductsByCategory = connect(mapProductsByCategoryState, mapFilteredDispatch)(
  Products,
);
export const ProductsBySearch = connect(mapProductsBySearchState, mapSearchDispatch)(Products);
