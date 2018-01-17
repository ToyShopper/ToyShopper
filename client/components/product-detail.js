import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProductDetail, addNewCategoryToProduct, deleteCategoryFromProduct } from '../store/product';
import { addToCart } from '../store/cart';
import { fetchReviewsForProduct, addReview } from '../store/reviews';
import { fetchAllCategories } from '../store/categories';
import { Item, Comment, Form, Header, Rating, Segment, Button, Divider, Label, Dropdown } from 'semantic-ui-react';
import Markdown from 'react-markdown';


/* -----------------    COMPONENT     ------------------ */

class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 5,
      text: '',
      quantity: 1,
      newCategoryName: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleQuantitySubmit = this.handleQuantitySubmit.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
  }

  componentDidMount() {
    this.props.loadProductDetail();
    this.props.loadReviews();
    this.props.loadAllCategories();
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
      price: Number(product.price),
      imageURL: product.imageURL,
      quantity: Number(this.state.quantity),
    }
    this.props.addItemToCart(item);
  }

  handleRatingChange(event, { rating }) {
    this.setState({ rating });
  }

  handleSubmitReview() {
    return (event) => {
      const { submitReview } = this.props;
      const { rating, text } = this.state;
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
            Written on {new Date(review.createdAt).toDateString()}, {new Date(review.createdAt).toTimeString()}
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

  renderAddCategoryBox() {
    const { product, categories, addCategoryToProduct } = this.props;

    // filter out categories this product already has
    const filteredCategories = categories.filter(category =>
      product.categories.findIndex(productCategory =>
        productCategory.id === category.id) === -1
    );
    const categoryOptions = filteredCategories.map(category => ({
      key: category.id,
      text: category.name,
      value: category,
      onClick: (event, data) => {
        addCategoryToProduct(product, data.value)
      },
    }));

    return (
      <Dropdown
        button size="small" className="icon" icon="tag" floating labeled search
        options={categoryOptions} text="Add A Category To This Product"
      />
    );
  }

  renderCategories(categories) {
    const { isAdmin, product, removeCategoryFromProduct } = this.props;

    return (
      <Item.Group>
        <Item>
          {categories.map(category => (
            <Label key={category.id} tag>
              {category.name}
              {isAdmin &&
                <Label
                  as={Button} color="red" floating circular
                  onClick={() => removeCategoryFromProduct(product, category)}>X</Label>}
            </Label>))}
        </Item>
        <Item>{isAdmin && this.renderAddCategoryBox()}</Item>
      </Item.Group>)
  }

  render() {
    const { product, reviews, isAdmin, isLoggedIn } = this.props;
    return (
      <div>
        {isAdmin && <Segment>
          <Button as={Link} to={'/products/' + product.id + '/edit'} floated="right">Edit this product</Button>
          <Divider horizontal>Admin Only</Divider>
        </Segment>}
        {product.id && (
          <Segment>
            <Item>
              <Header as="h1" dividing>{product.title}</Header>
              <Item.Content>
                {isAdmin && <Item.Content as="h4">Product ID: {product.id}</Item.Content>}
                <Item.Image size="large" src={product.imageURL} />
                <Item.Extra as="h4">Average Review Rating: {Number(product.averageRating).toFixed(2)} <Rating maxRating={5} defaultRating={product.averageRating} icon="star" disabled />
                </Item.Extra>
                <Item.Extra as="h4">Price: ${Number(product.price).toFixed(2)}</Item.Extra>
                <Item.Extra>
                  {this.renderCategories(product.categories)}
                </Item.Extra>
                <Item.Meta as="h4">Item Description</Item.Meta>
                <Item.Description as={Markdown}>{product.description}</Item.Description>
                {product.quantity > 0 ?
                  <Form name="quantity" onSubmit={(event) => this.handleQuantitySubmit(event, product)}>
                    <Form.Input id="quantity" label="Quantity" value={this.state.quantity} onChange={this.handleChange('quantity')} action={{ labelPosition: 'left', icon: 'add to cart', content: 'Add to Cart' }} />
                  </Form> : <h4>This product is out of stock.</h4>}
              </Item.Content>
            </Item>
          </Segment>
        )}
        <Comment.Group>
          {reviews.length > 0 && (<div>
            <Header as="h2" dividing>Reviews for this product</Header>
            {reviews.map(review => this.renderReview(review))}
          </div>)}
          {isLoggedIn && this.renderAddReviewForm()}
        </Comment.Group>
      </div>)
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ product, reviews, user, categories }) => ({
  product, reviews, categories,
  isAdmin: user && user.role === 'admin',
  isLoggedIn: !!user.id,
});

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
  },
  addCategoryToProduct: (product, category) => {
    return dispatch(addNewCategoryToProduct(product, category));
  },
  removeCategoryFromProduct: (product, category) => {
    return dispatch(deleteCategoryFromProduct(product, category));
  },
  loadAllCategories: () => {
    return dispatch(fetchAllCategories());
  },
});

export default connect(mapState, mapDispatch)(ProductDetail);
