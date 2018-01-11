import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserDetail } from '../store/userToEdit';

class UserDetail extends Component {
  componentDidMount() {
    this.props.loadUserDetail();
  }

  render() {
    console.log('render detail')
    const {user} = this.props;
    return (
      <div>
        <h1>test</h1>
      </div>
    )
  }
}

const mapState = ({ userToEdit }) => ({ userToEdit });

const mapDispatch = (dispatch, ownProps) => ({
  loadUserDetail: () => {
    const userId = ownProps.match.params.id;
    return dispatch(fetchUserDetail(userId));
  }
});

export default connect(mapState, mapDispatch)(UserDetail);
