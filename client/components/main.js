import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout } from '../store'
import {SearchBar} from './index'
import { Container, Menu, Image } from 'semantic-ui-react'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const { children, handleClick, isLoggedIn, isAdmin, user } = props

  return (
    <div>
      <Menu fixed="top" size="large" inverted>
        <Container>
          <Menu.Item as={Link} to="/home" header>
            <Image size="small" src="/logo.png" style={{ marginRight: '1.5em' }} />
          </Menu.Item>
          <Menu.Item as={Link} to="/products">Products</Menu.Item>
          <Menu.Item as={Link} to="/cart">Cart</Menu.Item>
          {isLoggedIn && <Menu.Item as={Link} to={'/orders/users/' + user.id}>My Orders</Menu.Item>}
          {isAdmin && <Menu.Item as={Link} to="/orders">All Orders</Menu.Item>}
          {isAdmin && <Menu.Item as={Link} to="/users">Users</Menu.Item>}
          <div className="right menu">
            <Menu.Item>
              <SearchBar />
            </Menu.Item>
          </div>
          {
            isLoggedIn
              ? <div className="right menu">
                {/* The navbar will show these links after you log in */}
                <Menu.Item as="a" href="#" onClick={handleClick}>Logout</Menu.Item>
              </div>
              : <div className="right menu">
                {/* The navbar will show these links before you log in */}
                <Menu.Item as={Link} to="/login">Login</Menu.Item>
                <Menu.Item as={Link} to="/signup">Sign Up</Menu.Item>
              </div>
          }
        </Container>
      </Menu>
      <Container style={{ marginTop: '9em' }}>
        {children}
      </Container>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isAdmin: state.user && state.user.role === 'admin',
    isLoggedIn: !!state.user.id,
    user: state.user,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
