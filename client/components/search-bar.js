import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {fetchProductsBySearch} from '../store/products';
import history from '../history';

/* -----------------    COMPONENT     ------------------ */
class SearchBar extends Component {
  constructor() {
    super();
    this.state = {keyword: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({keyword: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    const keyword = this.state.keyword;
    this.setState({ keyword: '' });
    this.props.searchProducts(keyword);
  }

  render() {
    return (
    <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
          action={{ icon: 'search' }}
          onChange={this.handleChange}
          value={this.state.keyword}
          placeholder="Search Products..." />
        </Form>
    </div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapDispatch = (dispatch) => ({
  searchProducts: (keyword) => {
    dispatch(fetchProductsBySearch(keyword));
    history.push('/products/search/' + keyword);
  }
});

export default connect(null, mapDispatch)(SearchBar);

