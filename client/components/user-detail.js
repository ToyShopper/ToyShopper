import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserDetail } from '../store/userToEdit';
import { putUser } from '../store/users'

class UserDetail extends Component {
  componentDidMount() {
    this.props.loadUserDetail();
  }

  render() {
    const {userToEdit} = this.props;
    const {handleSubmit} = this.props;
    //console.log(userToEdit)
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Name: </label>
            <input type="text" name="firstName" value={userToEdit.firstName}/>
          </div>
          <div>
            <label>Last Name: </label>
            <input type="text" name="lastName" defaultValue={userToEdit.lastName}/>
          </div>
          <div>
            <label>E-Mail Address: </label>
            <input type="text" name="email" defaultValue={userToEdit.email}/>
          </div>
          <div>
            <label>Street Address: </label>
            <input type="text" name="streetAddress" defaultValue={userToEdit.streetAddress}/>
          </div>
          <div>
            <label>City: </label>
            <input type="text" name="city" defaultValue={userToEdit.city}/>
          </div>
          <div>
            <label>State: </label>
            <input type="text" name="state" defaultValue={userToEdit.state}/>
          </div>
          <div>
            <label>Zip Code: </label>
            <input type="text" name="zipCode" defaultValue={userToEdit.zipCode}/>
          </div>
          <div>
            <label>State: </label>
            <input type="text" name="state" defaultValue={userToEdit.state}/>
          </div>
          <div>
            <label>Admin: </label>
            <input type="checkbox" name="isAdmin"/>
          </div>
          <div>
            <button type="submit">Update User</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapState = ({ userToEdit }) => ({ userToEdit });

const mapDispatch = (dispatch, ownProps) => ({
  loadUserDetail: () => {
    const userId = ownProps.match.params.id;
    return dispatch(fetchUserDetail(userId));
  },
  handleSubmit (event) {
    event.preventDefault();
    const userId = ownProps.match.params.userId; //maybe id instead of productId
    const user = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      streetAddress: event.target.streetAddress.value,
      city: event.target.city.value,
      state: event.target.state.value,
      zipCode: event.target.zipCode.value,
      isAdmin: event.target.isAdmin.value //checkbox needs to be done differently
    };
    return dispatch(putUser(user, userId))
      .then(() => {
        location.hash = '/users';
      })
  }
});

export default connect(mapState, mapDispatch)(UserDetail);
