import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, putUser, deleteUser } from '../store/users';
import { sendPasswordResetEmail } from '../store/orders';
import { Item, Button, Segment } from 'semantic-ui-react'

class UserList extends Component {
  componentDidMount() {
    this.props.loadUsers();
  }

  render() {
    const { users } = this.props;
    return (
      <div>
        <h1>All Users</h1>
        <Segment raised>
          {users.length > 0 &&
            <Item.Group divided>
              {users.map(user => (
                <Item key={user.id}>
                  <Item.Content>
                    <Item.Header as="h3">Name: {user.fullName}</Item.Header>
                    <Item.Description as="h4">Role: {user.role}</Item.Description>
                  </Item.Content>
                  <Item.Content>
                    <Button name={user.id} onClick={() => this.props.changeUserRole(user)}>{user.role === 'admin' ? 'Demote User' : 'Promote User'}</Button>
                    <Button name={user.id} onClick={() => this.props.removeUser(user.id)}>Delete User</Button>
                    <Button name={user.id} onClick={() => this.props.triggerReset(user.email)}>Trigger Password Reset</Button>
                  </Item.Content>
                </Item>
              ))}
            </Item.Group>
          }
        </Segment>
      </div>
    )
  }
}

const mapState = ({ users }) => ({ users });

const mapDispatch = dispatch => ({
  loadUsers: () => dispatch(fetchUsers()),
  changeUserRole: (user) => {
    let role = ''
    user.role === 'admin' ? role = 'user' : role = 'admin';
    const updateUser = { role };
    return dispatch(putUser(updateUser, user.id))
  },
  removeUser: (userId) => {
    return dispatch(deleteUser(userId));
  },
  triggerReset: (email) => {
    return dispatch(sendPasswordResetEmail({email}))
  }
});

export default connect(mapState, mapDispatch)(UserList)
