import React, { Component } from 'react';
import {Link} from 'react-router-dom';
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
              <Link to={'/users/' + user.id} >
                {user.fullName}
              </Link>
              </li>
            ))}
          </ul>
        }
      </div>
    )
  }
}

const mapState = ({ users }) => ({ users });

// OB/DK: can use the object format for mapDispatchToProps for straightforward / common cases like below
/*
const mapDispatch = {loadUsers: fetchUsers};
*/
const mapDispatch = dispatch => ({
  loadUsers: () => dispatch(fetchUsers())
});

export default connect(mapState, mapDispatch)(UserList)
