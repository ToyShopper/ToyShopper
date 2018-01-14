import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProductDetail } from '../store/product';
import { addToCart } from '../store/cart';
import { fetchReviewsForProduct } from '../store/reviews';
import { Item, Comment, Form, Header, Rating, Segment, Button, Divider } from 'semantic-ui-react'

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
    this.props.loadReviews();
  }

  handleChange(name) {
    return event => {
      this.setState({
        [name]: event.target.value,
      }
      )
    };
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

  renderReview(review) {
    return (
      <Comment key={review.id}>
        <Comment.Avatar src='https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png?w=300' />
        <Comment.Content>
          <Comment.Author>{review.user.fullName}</Comment.Author>
          <Rating maxRating={5} defaultRating={Math.ceil(Math.random()*6)} icon='star' disabled />
          <Comment.Metadata>
            Written on {new Date(review.createdAt).toTimeString()}
          </Comment.Metadata>
          <Comment.Text>{review.text}</Comment.Text>
        </Comment.Content>
      </Comment>
    )
  }

  render() {
    const { product, reviews } = this.props;
    return (
      <div>
        {product.id && (
          <Item>
            <Header as="h1" dividing>{product.title}</Header>
            <Item.Content>
            <Item.Image size="large" src={product.imageURL} />
            <Item.Extra as="h4">Price: ${product.price}</Item.Extra>
            <Item.Meta as="h4">Item Description</Item.Meta>
            <Item.Description as="p">{product.description}</Item.Description>
            <Form onSubmit={(event) => this.handleSubmit(event, product)}>
              <Form.Input id="quantity" label="Quantity" value={this.state.quantity} onChange={this.handleChange('quantity')} action={{ labelPosition: 'left', icon: 'add to cart', content: 'Add to Cart' }} />
            </Form>
            </Item.Content>
          </Item>
        )}
        {reviews && (<Comment.Group>
          <Header as="h2" dividing>Reviews for this product</Header>
          {reviews.map(review => this.renderReview(review))}
        </Comment.Group>)}

        {/* {this.user && this.user.isAdmin &&  */}
        <Segment>
          <Button as={Link} to={'/products/' + product.id + '/edit'} floated="right">Edit this product</Button>
          <Divider horizontal>Admin Only</Divider>
        </Segment>
      </div>)
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ product, reviews }) => ({ product, reviews });

const mapDispatch = (dispatch, ownProps) => ({
  loadProductDetail: () => {
    return dispatch(fetchProductDetail(ownProps.match.params.id));
  },
  loadReviews: () => {
    return dispatch(fetchReviewsForProduct(ownProps.match.params.id));
  },
  addItemToCart: (item) => {
    return dispatch(addToCart(item));
  },
});

export default connect(mapState, mapDispatch)(ProductDetail);
