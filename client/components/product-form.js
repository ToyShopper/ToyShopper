import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addProduct } from '../store/products';
import { fetchProductDetail, editProductDetail } from '../store/product';
import { Form, Segment } from 'semantic-ui-react';

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = props.initialValues;
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.load();
  }

  componentWillReceiveProps() {
    this.setState(this.props.product);
  }

  handleChange(name) {
    return event => {
      this.setState({[name]: event.target.value});
    };
  }

  renderInputField({ name, label, type = 'text', step = 1 }) {
    return (
      <Form.Group key={name}>
        {type === 'text' &&
          <Form.Input
          name={name} label={label}
          placeholder={label} value={this.state[name]}
          onChange={this.handleChange(name)} />}
        {type === 'number' &&
          <Form.Input
          name={name} label={label} type={type} step={step}
          placeholder={label} value={this.state[name]}
          onChange={this.handleChange(name)} />}
      </Form.Group>
    );
  }

  render() {
    const { name, displayName, handleSubmit, fields } = this.props;
    return (this.state &&
      <div>
        <h1>{displayName}</h1>
        <Segment>
          <div>
            <Form name={name} onSubmit={(event) => handleSubmit(event, this.state)}>
              {fields.map(field => this.renderInputField(field))}
              <div>
                <Form.Button>{displayName}</Form.Button>
              </div>
            </Form>
          </div>
        </Segment>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const fields = [
  { name: 'title', label: 'Title' },
  { name: 'description', label: 'Description' },
  { name: 'price', label: 'Price', type: 'number', step: 0.01 },
  { name: 'imageURL', label: 'Image URL' },
  { name: 'quantity', label: 'Quantity', type: 'number' }
];

const mapAddFormState = (state) => ({
  name: 'add-product',
  displayName: 'Add a New Product',
  initialValues: {title: '', description: '', price: 0, imageURL: '', quantity: 0},
  product: { title: '', description: '', price: 0, imageURL: '', quantity: 0 },
  fields: fields,
  // error: state.user.error
});

const mapEditFormState = (state) => ({
  name: 'edit-product',
  displayName: 'Update Product',
  initialValues: { title: '', description: '', price: 0, imageURL: '', quantity: 0 },
  product: state.product,
  fields: fields,
});

const mapAddFormDispatch = (dispatch) => ({
  load: () => ({}),
  handleSubmit: (event, product) => {
    event.preventDefault();
    dispatch(addProduct(product));
  },
});

const mapEditFormDispatch = (dispatch, ownProps) => ({
  load: () => dispatch(fetchProductDetail(ownProps.match.params.id)),
  handleSubmit: (event, product) => {
    event.preventDefault();
    dispatch(editProductDetail(product));
  },
});

export const AddProductForm = connect(mapAddFormState, mapAddFormDispatch)(ProductForm);
export const EditProductForm = connect(mapEditFormState, mapEditFormDispatch)(ProductForm);

/**
 * PROP TYPES
 */
ProductForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  // error: PropTypes.object
};
