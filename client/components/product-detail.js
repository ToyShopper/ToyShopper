import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProductDetail } from '../store/product';
import { addToCart } from '../store/cart';
import { fetchReviewsForProduct, addReview } from '../store/reviews';
import { Item, Comment, Form, Header, Rating, Segment, Button, Divider } from 'semantic-ui-react'

/* -----------------    COMPONENT     ------------------ */

class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 5,
      text: '',
      quantity: 1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleQuantitySubmit = this.handleQuantitySubmit.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
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

  handleQuantitySubmit(event, product) {
    event.preventDefault();
    const item = {
      id: product.id,
      title: product.title,
      price: product.price,
      imageURL: product.imageURL,
      quantity: Number(this.state.quantity),
    }
    this.props.addItemToCart(item);
  }

  handleRatingChange(event, {rating}) {
    this.setState({rating});
  }

  handleSubmitReview() {
    return (event) => {
    const {submitReview} = this.props;
    const {rating, text} = this.state;
    const newReview = {
      rating: rating,
      text: text,
      productId: Number(this.props.match.params.id),
    };
    this.setState({ text: '', rating: 5 });
    submitReview(newReview);
    }
  }

  renderReview(review) {
    return (
      <Comment key={review.id}>
        <Comment.Avatar src="https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png?w=300" />
        <Comment.Content>
          <Comment.Author>{!review.user ? '' : review.user.fullName}</Comment.Author>
          <Rating maxRating={5} defaultRating={review.rating} icon="star" disabled />
          <Comment.Metadata>
            Written on {new Date(review.createdAt).toTimeString()}
          </Comment.Metadata>
          <Comment.Text>{review.text}</Comment.Text>
        </Comment.Content>
      </Comment>
    )
  }

  renderAddReviewForm() {
    return (
      <Form name="review" reply onSubmit={this.handleSubmitReview()}>
        <h3>Write a review for this product</h3>
        <Form.TextArea
        cols={100} rows={10} value={this.state.text}
        onChange={this.handleChange('text')} />
        <Form.Group>
          <h4>Give a rating: </h4>
          <Rating
          maxRating={5} defaultRating={5} icon="star"
          onRate={this.handleRatingChange} />
          <Form.Button content="Add Review" position="right" labelPosition="left" icon="edit" primary />
        </Form.Group>
      </Form>)
  }

  render() {
    const { product, reviews, user } = this.props;
    return (
      <div>
        {user.role === 'admin' && <Segment>
          <Button as={Link} to={'/products/' + product.id + '/edit'} floated="right">Edit this product</Button>
          <Divider horizontal>Admin Only</Divider>
        </Segment>}
        {product.id && (
          <Segment>
            <Item>
              <Header as="h1" dividing>{product.title}</Header>
              <Item.Content>
                <Item.Image size="large" src={product.imageURL} />
                <Item.Extra as="h4">Price: ${product.price}</Item.Extra>
                <Item.Meta as="h4">Item Description</Item.Meta>
                <Item.Description as="p">{product.description}</Item.Description>
                <Form name="quantity" onSubmit={(event) => this.handleQuantitySubmit(event, product)}>
                  <Form.Input id="quantity" label="Quantity" value={this.state.quantity} onChange={this.handleChange('quantity')} action={{ labelPosition: 'left', icon: 'add to cart', content: 'Add to Cart' }} />
                </Form>
              </Item.Content>
            </Item>
          </Segment>
        )}
        <Comment.Group>
          {reviews.length > 0 && (<div>
            <Header as="h2" dividing>Reviews for this product</Header>
            {reviews.map(review => this.renderReview(review))}
          </div>)}
          {user.id && this.renderAddReviewForm()}
        </Comment.Group>
      </div>)
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ product, reviews, user }) => ({ product, reviews, user });

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
  submitReview: (review) => {
    return dispatch(addReview(review));
  }
});

export default connect(mapState, mapDispatch)(ProductDetail);
