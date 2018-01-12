import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProductDetail } from '../store/product';
import {addToCart} from '../store/cart';
import { Item, Form } from 'semantic-ui-react'

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
      <Item>
        <Item.Header as="h1">{product.title}</Item.Header>
        <Item.Image size="large" src={product.imageURL} />
        <Item.Extra as="h4">Price: ${product.price}</Item.Extra>
        <Item.Meta as="h4">Item Description</Item.Meta>
        <Item.Description as="p">{product.description}</Item.Description>
        <Form onSubmit={(event) => this.handleSubmit(event, product)}>
          <Form.Input id="quantity" label="Quantity" value={this.state.quantity} onChange={this.handleChange('quantity')} />
          <Form.Button>Add to Cart</Form.Button>
        </Form>
      </Item>
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
