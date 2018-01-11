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
              console.log(user.isAdmin)
              <li key={user.id}>
              <Link to={'/users/' + user.id} >
                {user.isAdmin} {user.isAdmin}
              </Link>
              <button>{user.isAdmin ? 'Demote User' : 'Promote User'}</button>
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
