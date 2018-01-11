import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, putUser } from '../store/users';

class UserList extends Component {
  componentDidMount() {
    this.props.loadUsers();
  }

  render() {
    const {users} = this.props;
    return (
      <div>
        <h1>All Users</h1>
        {users.length > 0 &&
          <ul>
            {users.map(user => (
              <li key={user.id}>
                {user.fullName}
                <button name={user.id} onClick={() => this.props.changeUserRole(user)}>{user.role === 'admin' ? 'Demote User' : 'Promote User'}</button>
              </li>
            ))}
          </ul>
        }
      </div>
    )
  }
}

const mapState = ({ users }) => ({ users });

const mapDispatch = dispatch => ({
  loadUsers: () => dispatch(fetchUsers()),
  changeUserRole: (user) => {
    console.log(user)
    //console.log(event.target.role)
    let role = ''
    user.role === 'admin' ? role = 'user' : role = 'admin';
    const updateUser = {role};
    return dispatch(putUser(updateUser, user.id))
  }
});

export default connect(mapState, mapDispatch)(UserList)
