import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../store/users';

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
  loadUsers: () => dispatch(fetchUsers())
});

export default connect(mapState, mapDispatch)(UserList)
